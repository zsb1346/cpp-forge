import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-acid-practice',
    chapter: 2,
    title: 'ACID 特性判断与事务语法',
    subtitle: '场景判断 · 事务改错',
    description: '通过密集练习巩固 ACID 四大特性的辨析能力和事务语法的熟练度。',
    objectives: [
      '能判断具体场景对应哪个 ACID 特性',
      '能发现并修复事务语法错误',
      '能正确使用 COMMIT 和 ROLLBACK',
    ],
    estimatedMinutes: 16,
    pathway: {
      subject: 'sql',
      knowledgePoints: [{ id: 'sql.transaction.acid', label: '事务与 ACID' }],
      contentKinds: ['practice'],
      stage: 'discrimination',
    },
  },
  blocks: [
    // ── 1. 选择题：ACID 特性判断 ──
    {
      type: 'multiple-choice',
      question: '"事务 A 正在转账，事务 B 查询余额时看不到 A 的中间状态。"这属于哪个特性？',
      options: [
        { text: '原子性', correct: false, explanation: '原子性保证操作整体性，不是可见性问题' },
        { text: '一致性', correct: false, explanation: '一致性关注数据是否符合规则' },
        { text: '隔离性', correct: true, explanation: '隔离性保证并发事务互不可见中间状态' },
        { text: '持久性', correct: false, explanation: '持久性关注提交后的数据保存' },
      ],
    },
    // ── 2. 选择题：事务语法识别 ──
    {
      type: 'multiple-choice',
      question: '以下哪条语句用于**提交**事务？',
      options: [
        { text: 'START TRANSACTION', correct: false, explanation: '这是开启事务的语句' },
        { text: 'COMMIT', correct: true, explanation: 'COMMIT 提交事务，让修改永久生效' },
        { text: 'ROLLBACK', correct: false, explanation: 'ROLLBACK 是回滚撤销' },
        { text: 'SAVEPOINT', correct: false, explanation: 'SAVEPOINT 设置保存点，不是提交' },
      ],
    },
    // ── 3. 选择题：原子性场景 ──
    {
      type: 'multiple-choice',
      question: '事务中有 3 条 UPDATE，第 2 条执行失败。数据库自动撤销了第 1 条的修改。这是？',
      options: [
        { text: '原子性', correct: true, explanation: '原子性保证事务内操作全做或全不做，部分失败即整体回滚' },
        { text: '一致性', correct: false, explanation: '一致性是结果校验，而非失败处理机制' },
        { text: '隔离性', correct: false, explanation: '隔离性不涉及事务内部的失败处理' },
        { text: '持久性', correct: false, explanation: '持久性与回滚行为无关' },
      ],
    },
    // ── 4. predict-output: 给定场景，判断 ACID 特性 ──
    {
      type: 'predict-output',
      instruction: '分析这个场景对应哪个 ACID 特性：',
      code: '-- 场景：电商下单\nSTART TRANSACTION;\nUPDATE products SET stock = stock - 1 WHERE id = 1;\nUPDATE orders SET status = \'paid\' WHERE id = 100;\n-- 如果减库存成功但改状态失败\n-- 数据库自动撤销减库存操作',
      expectedOutput: '原子性',
      options: [
        { text: '原子性', correct: true, explanation: '部分操作失败后自动撤销全部已做操作，是原子性的体现' },
        { text: '一致性', correct: false, explanation: '一致性要求最终结果合规，但撤销操作取决于原子性' },
        { text: '隔离性', correct: false, explanation: '场景中没有其他并发事务' },
        { text: '持久性', correct: false, explanation: '事务还未提交，不涉及持久性' },
      ],
    },
    // ── 5. 选择题：持久性场景 ──
    {
      type: 'multiple-choice',
      question: '银行系统每秒要记录大量转账日志。设计者确保每条日志写入磁盘后才通知用户"转账成功"。这是？',
      options: [
        { text: '原子性', correct: false, explanation: '日志写入磁盘不是原子性的体现' },
        { text: '一致性', correct: false, explanation: '这里没有提到业务规则的校验' },
        { text: '隔离性', correct: false, explanation: '与并发无关' },
        { text: '持久性', correct: true, explanation: '写入磁盘后再确认，保证提交数据不丢失——持久性的核心' },
      ],
    },
    // ── 6. fix-code: 事务语法错误 ──
    {
      type: 'fix-code',
      instruction: '这个事务缺少结束语句，请选择正确的修复方案：',
      buggyCode: 'START TRANSACTION;\nUPDATE accounts SET balance = 900 WHERE name = \'A\';\nUPDATE accounts SET balance = 600 WHERE name = \'B\';',
      goal: '补上事务结束语句，让修改永久生效',
      mode: 'choose-fix',
      fixes: [
        { text: '末尾加 COMMIT;', correct: true, explanation: 'COMMIT 提交事务，让修改永久保存' },
        { text: '末尾加 ROLLBACK;', correct: false, explanation: 'ROLLBACK 会撤销全部修改，不是我们想要的' },
        { text: '末尾加 END;', correct: false, explanation: 'SQL 中没有 END 作为事务结束的语法' },
        { text: '把第一行改成 COMMIT;', correct: false, explanation: 'COMMIT 必须在操作之后执行' },
      ],
    },
    // ── 7. predict-output: 事务执行结果 ──
    {
      type: 'predict-output',
      instruction: '以下事务执行完毕后，A 账户的余额是多少？（初始：A=1000, B=500）',
      code: 'START TRANSACTION;\nUPDATE accounts SET balance = 800 WHERE name = \'A\';\nUPDATE accounts SET balance = 700 WHERE name = \'B\';\nROLLBACK;',
      expectedOutput: '1000',
      options: [
        { text: '1000', correct: true, explanation: 'ROLLBACK 撤销了全部修改，余额回到初始值 1000' },
        { text: '800', correct: false, explanation: 'ROLLBACK 会撤销已经执行的 UPDATE' },
        { text: '700', correct: false, explanation: '这是 B 被修改后的值，也被 ROLLBACK 撤销了' },
        { text: '报错', correct: false, explanation: 'ROLLBACK 是合法的结束方式，不会报错' },
      ],
    },
    // ── 8. fill-in: 补全 ACID 定义 ──
    {
      type: 'fill-in',
      prompt: '补全 ACID 四个特性的描述：',
      template: 'A 代表____性——事务内的操作要么全做要么全不做。\nC 代表____性——事务前后数据都符合规则。\nI 代表____性——并发事务互不干扰。\nD 代表____性——提交后数据永久保存。',
      answers: ['原子', '一致', '隔离', '持久'],
      hints: ['第一个：操作不可分割', '第二个：数据合法性', '第三个：互不干扰', '第四个：不丢失'],
    },
    // ── 9. match-blocks: ACID 匹配 ──
    {
      type: 'match-blocks',
      instruction: '将 ACID 特性与其描述配对排列（先特性名后描述）：',
      fragments: ['原子性', '操作全做或全不做', '一致性', '数据符合业务规则', '隔离性', '并发互不干扰', '持久性', '提交后不丢失'],
      distractors: ['全做或全丢失', '并发互相可见'],
    },
    // ── 10. 选择题：隔离级别场景 ──
    {
      type: 'multiple-choice',
      question: '事务 A 执行了 UPDATE 但未 COMMIT，事务 B 能否看到修改后的值？',
      options: [
        { text: '能看到，两种隔离级别都一样', correct: false, explanation: '不同隔离级别行为不同' },
        { text: '取决于隔离级别：READ UNCOMMITTED 能看到', correct: true, explanation: '最低隔离级别下可以脏读；多数数据库默认不允许' },
        { text: '任何级别都不能看到', correct: false, explanation: 'READ UNCOMMITTED 允许读取未提交数据' },
        { text: '任何级别都能看到', correct: false, explanation: '多数数据库默认禁止脏读' },
      ],
    },
    // ── 11. type-it: 完整的库存扣减事务 ──
    {
      type: 'type-it',
      instruction: '输入一个商品下单的事务（扣库存 + 创建订单）：',
      code: 'START TRANSACTION;\nUPDATE products SET stock = stock - 1 WHERE id = 100;\nINSERT INTO orders (user_id, product_id) VALUES (1, 100);\nCOMMIT;',
      hints: [
        '先减库存再建订单，确保数据一致',
        'UPDATE 用 WHERE 定位到具体商品',
        'INSERT INTO 后跟表名和字段值',
      ],
    },
    // ── 12. 选择题：事务边界 ──
    {
      type: 'multiple-choice',
      question: '以下哪个操作**不应该**放在事务中？',
      options: [
        { text: '更新用户余额', correct: false, explanation: '余额修改需要事务保证' },
        { text: '创建订单记录', correct: false, explanation: '订单创建通常需要事务' },
        { text: '查询当前时间', correct: true, explanation: '查时间是一个只读操作，不需要事务' },
        { text: '扣减商品库存', correct: false, explanation: '库存扣减需要事务保证' },
      ],
    },
    // ── 13. predict-output: 一致性场景 ──
    {
      type: 'predict-output',
      instruction: '以下事务执行后，账户总额会发生什么变化？（A=1000, B=500）',
      code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE name = \'A\';\nUPDATE accounts SET balance = balance + 200 WHERE name = \'B\';\nCOMMIT;',
      expectedOutput: '总额从 1500 变成 1600，违反一致性',
      options: [
        { text: '总额仍然是 1500，正常', correct: false, explanation: 'A 减 100 B 加 200，总和变化了 100' },
        { text: '总额变成 1600，违反了一致性', correct: true, explanation: '减 100 加 200 导致总金额变化，破坏了转账规则' },
        { text: '数据库自动拒绝执行', correct: false, explanation: '数据库不会自动检测业务逻辑错误，需要应用程序保证' },
        { text: '只执行了第一条 UPDATE', correct: false, explanation: '两条都会执行，因为没有语法错误' },
      ],
    },
    // ── 14. 选择题：ROLLBACK 范围 ──
    {
      type: 'multiple-choice',
      question: '一个事务中执行了 5 条 SQL，然后 ROLLBACK。数据库会怎么处理？',
      options: [
        { text: '只撤销第 5 条', correct: false, explanation: 'ROLLBACK 作用于整个事务级别' },
        { text: '撤销全部 5 条', correct: true, explanation: 'ROLLBACK 让数据库回到 START TRANSACTION 之前的状态' },
        { text: '第 1-4 条保存，只撤销第 5 条', correct: false, explanation: '事务不可拆分' },
        { text: '报错说语句太多不能回滚', correct: false, explanation: 'ROLLBACK 没有数量限制' },
      ],
    },
    // ── 15. type-it: 带余额检查的转账 ──
    {
      type: 'type-it',
      instruction: '输入一个安全的转账事务（确保余额足够才扣款）：',
      code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 300\n  WHERE name = \'A\' AND balance >= 300;\nUPDATE accounts SET balance = balance + 300\n  WHERE name = \'B\';\nCOMMIT;',
      hints: [
        'AND balance >= 300 是余额检查条件',
        '如果余额不够，UPDATE 影响 0 行，不会扣错钱',
        '所有操作没问题再用 COMMIT 提交',
      ],
    },
    // ── 16. fix-code: 选择正确的交易结束方式 ──
    {
      type: 'fix-code',
      instruction: '事务改错了数据，应该怎么结束？',
      buggyCode: 'START TRANSACTION;\nDELETE FROM orders WHERE id = 5;\n-- 删错了！应该撤销',
      goal: '安全撤销当前事务的全部操作',
      mode: 'choose-fix',
      fixes: [
        { text: '执行 ROLLBACK', correct: true, explanation: 'ROLLBACK 撤销当前事务的所有修改，恢复原状' },
        { text: '执行 COMMIT 再想办法', correct: false, explanation: 'COMMIT 会让错误永久生效' },
        { text: '关闭数据库连接', correct: false, explanation: '不提交也不回滚就断开连接，事务会悬空占用锁资源' },
        { text: '什么都不做', correct: false, explanation: '事务处于打开状态，会占用数据库连接' },
      ],
    },
    // ── 17. 选择题：隔离性场景 ──
    {
      type: 'multiple-choice',
      question: '事务 A 修改了商品价格 100→80 但未提交。事务 B 查询时仍看到价格 100。这是？',
      options: [
        { text: '原子性保护', correct: false, explanation: '原子性与可见性无关' },
        { text: '一致性保护', correct: false, explanation: '一致性不控制中间状态是否可见' },
        { text: '隔离性保护', correct: true, explanation: '未提交的数据对其他事务不可见，这是隔离性' },
        { text: '持久性保护', correct: false, explanation: '持久性与提交前的可见性无关' },
      ],
    },
    // ── 18. match-blocks: 事务生命周期 ──
    {
      type: 'match-blocks',
      instruction: '按事务的正确流程排列：',
      fragments: ['START TRANSACTION', '执行 UPDATE', '执行 UPDATE', 'COMMIT'],
      distractors: ['ROLLBACK（只想提交所以不用）'],
    },
    // ── 19. 选择题：持久性实现 ──
    {
      type: 'multiple-choice',
      question: '数据库通常用什么机制保证持久性？',
      options: [
        { text: '在内存中缓存数据', correct: false, explanation: '内存数据断电就丢，不能保证持久性' },
        { text: '写日志（WAL）后再写数据', correct: true, explanation: '先写日志到磁盘，出问题后用日志恢复——WAL 机制' },
        { text: '定期自动备份', correct: false, explanation: '备份是灾备手段，不是持久性的主流实现' },
        { text: '使用 UPS 不断电', correct: false, explanation: '硬件层面的保障，不是数据库机制' },
      ],
    },
    // ── 20. predict-output: 嵌套事务行为 ──
    {
      type: 'predict-output',
      instruction: '以下代码执行后，最终数据的修改会被保存吗？',
      code: 'START TRANSACTION;\nUPDATE accounts SET balance = 0 WHERE name = \'A\';\n  START TRANSACTION;\n  UPDATE accounts SET balance = 500 WHERE name = \'A\';\nROLLBACK;',
      expectedOutput: 'A 余额回到 1000（两条修改都被撤销）',
      options: [
        { text: 'A 余额变成 500', correct: false, explanation: '外层 ROLLBACK 会撤销内层事务的操作' },
        { text: 'A 余额变成 0', correct: false, explanation: '外层 ROLLBACK 撤销全部操作' },
        { text: 'A 余额回到 1000', correct: true, explanation: '外层 ROLLBACK 撤销整个事务，包括内层 START TRANSACTION...COMMIT 中的操作' },
        { text: '报错说事务嵌套', correct: false, explanation: 'MySQL 等支持事务嵌套，内层操作受外层影响' },
      ],
    },
    // ── 21. type-it: 完整的下单事务 ──
    {
      type: 'type-it',
      instruction: '输入一个包含 INSERT 和 UPDATE 的事务：',
      code: 'START TRANSACTION;\nINSERT INTO orders (user_id, total) VALUES (1, 299);\nUPDATE users SET order_count = order_count + 1 WHERE id = 1;\nCOMMIT;',
      hints: [
        '先插入订单记录，再更新用户的订单数',
        '两个操作一起成功或一起失败',
        'INSERT 的字段名和 VALUES 要一一对应',
      ],
    },
    // ── 22. 选择题：事务最佳实践 ──
    {
      type: 'multiple-choice',
      question: '关于事务的使用，以下哪个做法**不好**？',
      options: [
        { text: '事务尽量简短，不包含无关操作', correct: false, explanation: '短事务是好实践，减少锁持有时间' },
        { text: '一个事务里只放业务相关的操作', correct: false, explanation: '合理，保证最小原子单位' },
        { text: '一个事务里放 100 条不相关的 SELECT', correct: true, explanation: '长事务占用数据库资源，只读操作不需要事务' },
        { text: '操作前检查数据是否符合条件', correct: false, explanation: '条件检查是好习惯' },
      ],
    },
    // ── 23. fill-in: 回顾填空 ──
    {
      type: 'fill-in',
      prompt: '补全事务结束语句的对应功能：',
      template: '____ —— 提交事务，修改永久生效\n____ —— 撤销事务，回到开始状态',
      answers: ['COMMIT', 'ROLLBACK'],
      hints: ['提交用这个关键字', '撤销用这个关键字'],
    },
    // ── 24. 选择题：ACID 综合 ──
    {
      type: 'multiple-choice',
      question: '以下哪个场景**必须**用事务？',
      options: [
        { text: '查询用户列表', correct: false, explanation: '单条只读查询不需要事务' },
        { text: '删除一条日志记录', correct: false, explanation: '单条删除操作一般不需要事务' },
        { text: '给用户充值，同时写入充值记录和更新余额', correct: true, explanation: '两个关联操作需要事务保证一致性' },
        { text: '修改用户昵称', correct: false, explanation: '单条简单更新不需要事务' },
      ],
    },
  ],
}

export default lesson
