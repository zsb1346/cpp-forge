import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-transaction-acid',
    chapter: 2,
    title: '事务与 ACID',
    subtitle: '原子性 · 一致性 · 隔离性 · 持久性',
    description: '理解事务的四个核心特性，学会用 COMMIT 和 ROLLBACK 控制事务生命周期。',
    objectives: [
      '理解事务的四个ACID特性',
      '学会使用 START TRANSACTION / COMMIT / ROLLBACK',
      '能分析转账场景中的事务行为',
    ],
    estimatedMinutes: 14,
    pathway: {
      subject: 'sql',
      knowledgePoints: [{ id: 'sql.transaction.acid', label: '事务与 ACID' }],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    // ── 1. 问题导入 ──
    {
      type: 'exposition',
      text: '我们要从一个常见的场景开始——银行转账。\nA 给 B 转 100 元，要执行两步：扣 A 的钱、加 B 的钱。\n如果扣 A 成功了，但加 B 的时候系统崩溃了，那 100 元去哪了？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '这个问题就是 `事务`（Transaction）要解决的。\n事务把多个操作打包成一个**不可分割的整体**。\n要么全部成功，要么全部撤销，绝不出现"做了一半"的情况。',
    },
    // ── 2. ACID 概念卡 ──
    {
      type: 'concept-cards',
      instruction: '事务的四个核心特性，合称 ACID：',
      cards: [
        { term: 'A — 原子性', meaning: '事务内的操作全做或全不做，不可分割', example: '扣钱和加钱要么都成要么都撤' },
        { term: 'C — 一致性', meaning: '事务前后数据都符合业务规则', example: '转账后总金额不变' },
        { term: 'I — 隔离性', meaning: '事务之间互不干扰', example: '你转账不影响我查询' },
        { term: 'D — 持久性', meaning: '提交后数据永久保存', example: 'COMMIT 后断电也不丢' },
      ],
    },
    // ── 3. animated-timeline: 转账全流程 ──
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
      },
      scenes: [
        {
          narration: '转账开始前，A 账户 1000 元，B 账户 500 元。',
          elements: [
            {
              type: 'code',
              id: 'query',
              code: '-- 转账前查询余额',
              language: 'sql',
            },
            {
              type: 'table',
              id: 'balances',
              headers: ['账户', '余额'],
              rows: [['A', 1000], ['B', 500]],
            },
          ],
        },
        {
          mode: 'delta',
          narration: '第一步：START TRANSACTION 开启事务。',
          elements: [
            {
              type: 'code',
              id: 'query',
              code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100\n  WHERE name = \'A\';',
              language: 'sql',
              highlightedLines: [1],
            },
          ],
        },
        {
          mode: 'delta',
          narration: '第二步：从 A 扣除 100 元。余额变成 900。',
          duration: 800,
          elements: [
            {
              type: 'code',
              id: 'query',
              code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100\n  WHERE name = \'A\';\nUPDATE accounts SET balance = balance + 100\n  WHERE name = \'B\';',
              language: 'sql',
              highlightedLines: [2],
            },
            {
              type: 'table',
              id: 'balances',
              headers: ['账户', '余额'],
              highlightedRows: [0],
              rows: [['A', 900], ['B', 500]],
            },
          ],
        },
        {
          mode: 'delta',
          narration: '第三步：给 B 增加 100 元。余额变成 600。',
          duration: 800,
          elements: [
            {
              type: 'code',
              id: 'query',
              code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100\n  WHERE name = \'A\';\nUPDATE accounts SET balance = balance + 100\n  WHERE name = \'B\';',
              highlightedLines: [4],
            },
            {
              type: 'table',
              id: 'balances',
              headers: ['账户', '余额'],
              highlightedRows: [1],
              rows: [['A', 900], ['B', 600]],
            },
          ],
        },
        {
          mode: 'delta',
          narration: '第四步：COMMIT 提交事务。修改永久生效。两账户确认不变：总额 1500。',
          elements: [
            {
              type: 'code',
              id: 'query',
              code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100\n  WHERE name = \'A\';\nUPDATE accounts SET balance = balance + 100\n  WHERE name = \'B\';\nCOMMIT;',
              language: 'sql',
              highlightedLines: [5],
            },
            {
              type: 'table',
              id: 'balances',
              headers: ['账户', '余额'],
              rows: [['A', 900], ['B', 600]],
              highlightedRows: [0, 1],
            },
            {
              type: 'text',
              id: 'total',
              content: '总金额：1500（不变）→ 一致性 ✓',
              variant: 'label',
            },
          ],
        },
      ],
    },
    // ── 4. 原子性 deep ──
    {
      type: 'exposition',
      text: '**原子性（Atomicity）** 是事务最基本的保证。\n事务里所有操作视为一个整体，不能拆开。\n如果任何一步失败，数据库会把已做的操作全部**回滚（ROLLBACK）**。',
      code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE name = \'A\';\n-- 假设这里系统崩溃了\n-- 数据库自动 ROLLBACK，A 的 100 元不会丢\nROLLBACK;',
    },
    // ── 5. 一致性 deep ──
    {
      type: 'exposition',
      text: '**一致性（Consistency）** 保证事务前后数据都符合业务规则。\n比如转账前后总金额必须相等、账户余额不能为负数。\n如果事务破坏规则，数据库会拒绝它。',
      code: '-- 一致性检查：转账前后总额不变\nSTART TRANSACTION;\nUPDATE accounts SET balance = balance - 200 WHERE name = \'A\';\nUPDATE accounts SET balance = balance + 200 WHERE name = \'B\';\n-- A:800 + B:700 = 1500（不变 ✓）\nCOMMIT;',
    },
    // ── 6. 隔离性 deep ──
    {
      type: 'exposition',
      text: '**隔离性（Isolation）** 保证并发执行的事务互不干扰。\n两个事务同时操作同一数据时，一个事务看不到另一个未提交的中间状态。\n就像在排队，一个接一个处理，不会乱。',
      code: '-- 事务1：转账\nSTART TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE name = \'A\';\n-- 此时事务2查询 A，看到的还是原值 1000\n-- 因为事务1还未 COMMIT\nCOMMIT;',
    },
    // ── 7. 持久性 deep ──
    {
      type: 'exposition',
      text: '**持久性（Durability）** 指一旦 COMMIT，数据就永久保存。\n即使提交后立刻断电、系统崩溃，数据也不会丢。\n数据库通过**写日志**（WAL）机制保证：在回复用户"成功"之前，已经把修改写到了磁盘上。',
    },
    // ── 8. 选择题：ACID 场景判断 ──
    {
      type: 'multiple-choice',
      question: '转账时扣钱成功但加钱失败，数据库自动回滚了扣钱操作。这体现了哪个特性？',
      options: [
        { text: '原子性', correct: true, explanation: '原子性保证事务内的操作全做或全不做，部分失败时回滚全部' },
        { text: '一致性', correct: false, explanation: '一致性关注数据规则是否被破坏，决定回滚的是原子性' },
        { text: '隔离性', correct: false, explanation: '隔离性处理并发事务间的干扰' },
        { text: '持久性', correct: false, explanation: '持久性关注提交后的数据是否丢失' },
      ],
    },
    // ── 9. COMMIT vs ROLLBACK 对比 ──
    {
      type: 'compare-snippets',
      instruction: '对比两种事务结束方式：',
      question: 'COMMIT 和 ROLLBACK 的效果有什么本质区别？',
      snippets: [
        {
          id: 'commit',
          title: 'COMMIT',
          code: 'START TRANSACTION;\nUPDATE accounts SET balance = 900 WHERE name = \'A\';\nUPDATE accounts SET balance = 600 WHERE name = \'B\';\nCOMMIT;',
          correct: false,
          explanation: 'COMMIT 使所有修改永久生效，持久性开始发挥作用',
        },
        {
          id: 'rollback',
          title: 'ROLLBACK',
          code: 'START TRANSACTION;\nUPDATE accounts SET balance = 900 WHERE name = \'A\';\nUPDATE accounts SET balance = 600 WHERE name = \'B\';\nROLLBACK;',
          correct: true,
          explanation: 'ROLLBACK 撤销所有修改，数据回到事务开始前的状态',
        },
      ],
      compareBy: 'meaning',
    },
    // ── 10. type-it: 基本事务语法 ──
    {
      type: 'type-it',
      instruction: '输入一个完整的转账事务：',
      code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE name = \'A\';\nUPDATE accounts SET balance = balance + 100 WHERE name = \'B\';\nCOMMIT;',
      hints: [
        '事务以 START TRANSACTION 开头',
        '中间写多条 SQL 操作语句',
        'COMMIT 表示全部确认提交',
      ],
    },
    // ── 11. 选择题：COMMIT 后数据 ──
    {
      type: 'multiple-choice',
      question: '事务执行 COMMIT 后，突然断电重启。数据状态是？',
      options: [
        { text: '数据全部丢失，回到事务开始前', correct: false, explanation: '持久性保证提交后的数据不丢失' },
        { text: '数据正常保存，不受影响', correct: true, explanation: '持久性确保 COMMIT 后的数据即使断电也不会丢' },
        { text: '部分数据保存，部分丢失', correct: false, explanation: '原子性保证要么全部保存要么全部撤销' },
        { text: '数据库自动回滚', correct: false, explanation: '只有未 COMMIT 的事务才会在崩溃后回滚' },
      ],
    },
    // ── 12. type-it: ROLLBACK 事务 ──
    {
      type: 'type-it',
      instruction: '输入一个包含 ROLLBACK 的事务（假设发现余额不足需要撤销）：',
      code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 500 WHERE name = \'A\';\n-- 发现 A 余额不足\nROLLBACK;',
      hints: [
        'ROLLBACK 撤销当前事务的所有修改',
        '-- 是 SQL 注释，不会被实际执行',
        'ROLLBACK 后数据恢复原状',
      ],
    },
    // ── 13. fill-in: 补全事务 ──
    {
      type: 'fill-in',
      prompt: '补全转账事务语句，将 A 转 50 元给 B：',
      template: '____ TRANSACTION;\nUPDATE accounts SET balance = balance - 50 ____ name = \'A\';\nUPDATE accounts ____ balance = balance + 50 WHERE name = \'B\';\n____;',
      answers: ['START', 'WHERE', 'SET', 'COMMIT'],
      hints: ['第一个空是事务开启关键字', '第二个空是条件子句', '第三个空是赋值关键字', '最后一个空是提交确认'],
    },
    // ── 14. 选择题：ROLLBACK 场景 ──
    {
      type: 'multiple-choice',
      question: '事务执行到一半发现数据有问题，应该怎么做？',
      options: [
        { text: '直接关闭数据库连接', correct: false, explanation: '关闭连接可能导致数据不一致' },
        { text: '执行 ROLLBACK 回滚事务', correct: true, explanation: 'ROLLBACK 安全地撤销已执行的操作' },
        { text: '继续执行完再修复', correct: false, explanation: '继续执行会把错误数据写入数据库' },
        { text: '不管它，下次自动好了', correct: false, explanation: '未提交的事务不会自动消失，会占用锁资源' },
      ],
    },
    // ── 15. 选择题：隔离性 ──
    {
      type: 'multiple-choice',
      question: '两个事务同时进行，事务 A 未提交时，事务 B 看不到 A 的修改。这是哪个特性？',
      options: [
        { text: '原子性', correct: false, explanation: '原子性关注操作的整体性' },
        { text: '一致性', correct: false, explanation: '一致性关注数据规则' },
        { text: '隔离性', correct: true, explanation: '隔离性保证了事务间互不干扰' },
        { text: '持久性', correct: false, explanation: '持久性关注提交后数据不丢' },
      ],
    },
    // ── 16. 隔离级别简介 ──
    {
      type: 'exposition',
      text: '隔离性有不同的"级别"，从低到高：\n- READ UNCOMMITTED（可读到未提交数据）\n- READ COMMITTED（只能读到已提交数据）\n- REPEATABLE READ（同一事务内多次读取结果一致）\n- SERIALIZABLE（事务完全串行执行）\n级别越高，数据越准确，但性能越低。多数数据库默认用 `READ COMMITTED` 或 `REPEATABLE READ`。',
    },
    // ── 17. 选择题：隔离级别场景 ──
    {
      type: 'multiple-choice',
      question: '银行系统要求"一个事务内多次查询余额必须一致"，该用哪个隔离级别？',
      options: [
        { text: 'READ UNCOMMITTED', correct: false, explanation: '可能读到其他事务未提交的数据' },
        { text: 'READ COMMITTED', correct: false, explanation: '其他事务提交后，再次查询结果可能变化' },
        { text: 'REPEATABLE READ', correct: true, explanation: '同一事务内多次读取结果一致，适合银行系统' },
        { text: 'SERIALIZABLE', correct: false, explanation: '虽然可以但性能开销大，REPEATABLE READ 就够了' },
      ],
    },
    // ── 18. type-it: 更完整的转账事务 ──
    {
      type: 'type-it',
      instruction: '带着条件判断输入一个安全的转账事务：',
      code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 200\n  WHERE name = \'A\' AND balance >= 200;\nUPDATE accounts SET balance = balance + 200\n  WHERE name = \'B\';\nCOMMIT;',
      hints: [
        'WHERE 条件中 AND balance >= 200 确保余额足够',
        '如果 A 余额不足，第一行影响 0 行，不会扣钱',
        '事务结束后用 COMMIT 确认',
      ],
    },
    // ── 19. 选择题：ACID 综合 ──
    {
      type: 'multiple-choice',
      question: '以下哪个场景**不**适合用事务？',
      options: [
        { text: 'A 向 B 转账 500 元', correct: false, explanation: '转账是事务的经典场景' },
        { text: '查询用户表中所有用户的姓名', correct: true, explanation: '单条查询不需要事务，事务用于多条关联操作' },
        { text: '订单创建时同时扣库存', correct: false, explanation: '下订单扣库存需要事务保证一致性' },
        { text: '注册用户时写入用户表和日志表', correct: false, explanation: '多表写入需要事务保证' },
      ],
    },
    // ── 20. 总结 ──
    {
      type: 'exposition',
      text: '事务是数据库保证数据正确性的**核心机制**。\n- 用 `START TRANSACTION` 开启\n- 用 `COMMIT` 确认提交\n- 用 `ROLLBACK` 撤销回滚\n\nACID 四个特性：原子性让操作不可分割、一致性让数据不出错、隔离性让并发不打架、持久性让提交不丢失。',
      textAnimation: 'typewriter',
    },
    // ── 21. fill-in: 总结填空 ──
    {
      type: 'fill-in',
      prompt: '填写 ACID 四个特性的名称：',
      template: 'A = ____性\nC = ____性\nI = ____性\nD = ____性',
      answers: ['原子', '一致', '隔离', '持久'],
      hints: ['第一个特性：操作不可分割', '第二个特性：数据符合规则', '第三个特性：互不干扰', '第四个特性：提交后不丢'],
    },
    // ── 22. 选择题：巩固 ──
    {
      type: 'multiple-choice',
      question: '事务中已经执行了两条 UPDATE，现在执行 ROLLBACK。数据库会怎么做？',
      options: [
        { text: '只撤销最后一条 UPDATE', correct: false, explanation: 'ROLLBACK 撤销事务内的全部操作' },
        { text: '撤销整个事务的全部操作', correct: true, explanation: 'ROLLBACK 让数据库回到 START TRANSACTION 之前的状态' },
        { text: '报错说不能回滚', correct: false, explanation: '未提交的事务都可以回滚' },
        { text: '只撤销第一条 UPDATE', correct: false, explanation: 'ROLLBACK 作用于整个事务' },
      ],
    },
  ],
}

export default lesson
