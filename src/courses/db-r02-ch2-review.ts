import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-ch2-review',
    chapter: 2,
    title: '第2章综合复习',
    subtitle: 'ACID · 视图 · 索引 易混点',
    description: '通过对比辨析，巩固事务/ACID、视图、索引三组核心概念的易混点和边界判断。',
    objectives: [
      '能辨析 ACID 四个特性的易混场景',
      '能区分视图和索引的用途边界',
      '能判断索引适用与不适用的情况',
    ],
    estimatedMinutes: 14,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.transaction.acid', label: '事务与 ACID' },
        { id: 'sql.views.basics', label: '视图基础' },
        { id: 'sql.indexes.basics', label: '索引基础' },
      ],
      contentKinds: ['review'],
      stage: 'discrimination',
    },
  },
  blocks: [
    // ── 1. compare-snippets: COMMIT vs ROLLBACK ──
    {
      type: 'compare-snippets',
      instruction: '对比 COMMIT 和 ROLLBACK 的效果：',
      question: '两个事务对数据的最终影响是什么？',
      snippets: [
        {
          id: 'commit-way',
          title: '事务 A：COMMIT',
          code: 'START TRANSACTION;\nUPDATE accounts SET balance = 0 WHERE name = \'A\';\nCOMMIT;',
          correct: false,
          explanation: 'COMMIT 保存修改，A 的余额永久变成 0',
        },
        {
          id: 'rollback-way',
          title: '事务 B：ROLLBACK',
          code: 'START TRANSACTION;\nUPDATE accounts SET balance = 0 WHERE name = \'A\';\nROLLBACK;',
          correct: true,
          explanation: 'ROLLBACK 撤销修改，A 的余额回到原来的值',
        },
      ],
      compareBy: 'meaning',
    },
    // ── 2. compare-snippets: ACID 易混对 ──
    {
      type: 'compare-snippets',
      instruction: '两个场景分别对应哪个 ACID 特性？',
      question: '区分原子性和一致性的不同侧重',
      snippets: [
        {
          id: 'atomicity-case',
          title: '场景 A',
          code: '-- 转账中服务器崩溃\nSTART TRANSACTION;\n-- 已扣 A 100 元（第 1 步）\n-- 还没给 B 加钱（第 2 步未完成）\n-- 重启后 A 的钱回来了',
          correct: false,
          explanation: '系统崩溃后撤销已执行的操作——这是原子性：操作全做或全不做',
        },
        {
          id: 'consistency-case',
          title: '场景 B',
          code: '-- 转账前总额 1500\nSTART TRANSACTION;\nUPDATE accounts SET balance = 0 WHERE name = \'A\';\nUPDATE accounts SET balance = 3000 WHERE name = \'B\';\n-- 总额变成 3000，多了 1500',
          correct: true,
          explanation: '总额异常变化，破坏了"转账前后总额不变"的规则——这是一致性问题',
        },
      ],
      compareBy: 'meaning',
    },
    // ── 3. compare-snippets: 视图 vs 表 ──
    {
      type: 'compare-snippets',
      instruction: '比较视图和表的本质区别：',
      question: '哪个说法准确描述了视图？',
      snippets: [
        {
          id: 'view-nature',
          title: '描述 A：视图是……',
          code: '视图是一个存储查询结果集的容器。\n查询视图时直接读取已存好的数据，\n不会再去查原表。',
          correct: false,
          explanation: '视图不存储数据，每次查询视图都会重新执行底层的 SELECT',
        },
        {
          id: 'table-nature',
          title: '描述 B：视图是……',
          code: '视图是一个命名的查询定义。\n它不存数据，只存 SELECT 语句。\n每次查询视图都实时从基表读取数据。',
          correct: true,
          explanation: '视图是虚拟表，只保存查询定义，数据实时从基表读取',
        },
      ],
      compareBy: 'meaning',
    },
    // ── 4. 选择题：ACID 辨析 ──
    {
      type: 'multiple-choice',
      question: '"事务 A 修改了商品价格从 100 改成 80 并已 COMMIT。此时系统宕机，重启后价格是 80。"这体现了什么？',
      options: [
        { text: '原子性', correct: false, explanation: '原子性不涉及提交后的数据保存' },
        { text: '一致性', correct: false, explanation: '一致性关注数据规则，这里规则没有问题' },
        { text: '隔离性', correct: false, explanation: '没有其他事务参与' },
        { text: '持久性', correct: true, explanation: 'COMMIT 后数据不丢失，即使宕机重启仍保留' },
      ],
    },
    // ── 5. 选择题：视图辨析 ──
    {
      type: 'multiple-choice',
      question: '视图 v_high_orders 定义为：SELECT * FROM orders WHERE total > 1000。\n查询 SELECT * FROM v_high_orders WHERE total > 2000 会怎么做？',
      options: [
        { text: '先查全部订单，再在视图结果中过滤 total > 2000', correct: false, explanation: '数据库不会先物化视图再过滤' },
        { text: '把视图定义和查询条件合并，变成 WHERE total > 1000 AND total > 2000', correct: true, explanation: '数据库会把视图的 WHERE 和查询的 WHERE 合并执行' },
        { text: '报错，不能对视图再加 WHERE', correct: false, explanation: '视图可以像表一样用 WHERE 过滤' },
        { text: '只应用视图的条件，忽略外部 WHERE', correct: false, explanation: '外部 WHERE 会与视图内部 WHERE 合并' },
      ],
    },
    // ── 6. 选择题：索引辨析 ──
    {
      type: 'multiple-choice',
      question: '以下哪条关于索引的说法是**错误**的？',
      options: [
        { text: '索引可以加速 WHERE 查询', correct: false, explanation: '正确，索引的主要作用就是加速过滤' },
        { text: '索引可以加速 ORDER BY', correct: false, explanation: '正确，B+ 树索引天然有序' },
        { text: '索引越多查询越快', correct: true, explanation: '索引过多会导致写入变慢、占用空间，且优化器可能选错索引' },
        { text: '索引会占用额外磁盘空间', correct: false, explanation: '正确，索引需要独立的存储结构' },
      ],
    },
    // ── 7. predict-output: 事务执行结果 ──
    {
      type: 'predict-output',
      instruction: '初始：A=1000, B=500。以下事务执行后 A 的余额是多少？',
      code: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 300 WHERE name = \'A\';\nUPDATE accounts SET balance = balance + 300 WHERE name = \'B\';\nROLLBACK;\n\nUPDATE accounts SET balance = balance - 50 WHERE name = \'A\';\nCOMMIT;',
      expectedOutput: '950（ROLLBACK 撤销了 -300，然后 -50 被 COMMIT）',
      options: [
        { text: '950', correct: true, explanation: 'ROLLBACK 撤销了第一个事务（回到 1000），然后 -50 并 COMMIT，结果是 950' },
        { text: '700', correct: false, explanation: '700 是 -300 后的值，但被 ROLLBACK 撤销了' },
        { text: '650', correct: false, explanation: '650（-300 和 -50 都被应用，但 ROLLBACK 撤销了第一个）' },
        { text: '500', correct: false, explanation: '500 是两次扣款都应用的值，但 ROLLBACK 撤销了第一次' },
      ],
    },
    // ── 8. match-blocks: 三层概念对应 ──
    {
      type: 'match-blocks',
      instruction: '将概念分类归入对应的主题（先主题后对应的描述）：',
      fragments: ['事务', 'ACID 四大特性', '视图', '封装查询定义', '索引', '加速数据查找'],
      distractors: ['加速写入速度', '存储数据副本'],
    },
    // ── 9. 选择题：综合场景 ──
    {
      type: 'multiple-choice',
      question: '你在设计一个电商系统。用户下单时要：①减库存 ②创建订单 ③更新用户积分。你应该怎么做？',
      options: [
        { text: '三条 SQL 各自独立执行', correct: false, explanation: '独立执行可能发生减库存成功但创建订单失败的问题' },
        { text: '用事务包装三条 SQL', correct: true, explanation: '事务保证三步操作要么全部成功要么全部回滚' },
        { text: '创建视图来连接三个操作', correct: false, explanation: '视图只封装查询，不能保证写操作的整体性' },
        { text: '为三条 SQL 各建一个索引', correct: false, explanation: '索引不解决操作一致性问题' },
      ],
    },
    // ── 10. compare-snippets: 索引好 vs 坏 ──
    {
      type: 'compare-snippets',
      instruction: '对比两个创建索引的场景：',
      question: '哪个场景建索引是合理的？',
      snippets: [
        {
          id: 'bad-index',
          title: '场景 A',
          code: '-- 性别列，只有 M/F 两种值\nCREATE INDEX idx_gender ON users(gender);\n\nSELECT * FROM users WHERE gender = \'F\';',
          correct: false,
          explanation: '低区分度列索引效果差，数据库可能还是走全表扫描',
        },
        {
          id: 'good-index',
          title: '场景 B',
          code: '-- email 列，每个用户唯一\nCREATE INDEX idx_email ON users(email);\n\nSELECT * FROM users WHERE email = \'someone@mail.com\';',
          correct: true,
          explanation: '高区分度 + 精确匹配 = 索引的最佳场景',
        },
      ],
      compareBy: 'meaning',
    },
    // ── 11. 选择题：事务与视图 ──
    {
      type: 'multiple-choice',
      question: '能不能在事务中使用视图？',
      options: [
        { text: '不能，事务和视图是互斥的概念', correct: false, explanation: '两者不互斥' },
        { text: '可以，视图的查询可以在事务中执行', correct: true, explanation: '在事务中查询视图完全合法，视图底层的基表操作也受事务控制' },
        { text: '只能查视图不能更新', correct: false, explanation: '简单视图的更新也在事务控制范围内' },
        { text: '事务中不能使用 DDL（CREATE VIEW）', correct: true, explanation: '等等，这个也是对的——大多数数据库不支持在事务中执行 DDL' },
      ],
      mode: 'multiple',
    },
    // ── 12. 选择题：隔离性与视图 ──
    {
      type: 'multiple-choice',
      question: '视图查询的隔离性由什么决定？',
      options: [
        { text: '视图本身的设置', correct: false, explanation: '视图没有独立的隔离性设置' },
        { text: '底层基表的隔离级别', correct: true, explanation: '视图的查询最终操作基表，隔离性由基表所在的数据库连接决定' },
        { text: '视图的 WHERE 条件', correct: false, explanation: 'WHERE 条件不影响隔离性' },
        { text: '视图的名字', correct: false, explanation: '名字不影响行为' },
      ],
    },
    // ── 13. fix-code: 事务逻辑错误 ──
    {
      type: 'fix-code',
      instruction: '这段代码想给 B 加 100 元，但存在逻辑问题。选正确的修复：',
      buggyCode: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE name = \'A\';\nUPDATE accounts SET balance = balance + 100 WHERE name = \'B\';\n-- 假设加钱时失败了\nCOMMIT;',
      goal: '正确处理加钱失败的情况',
      mode: 'choose-fix',
      fixes: [
        { text: '把 COMMIT 改成 ROLLBACK，撤销整个过程', correct: true, explanation: '加钱失败时应该 ROLLBACK 而不是 COMMIT，保证原子性' },
        { text: '继续 COMMIT，至少扣钱是成功的', correct: false, explanation: 'COMMIT 会保存扣钱结果，导致钱不见了——违反原子性和一致性' },
        { text: '再执行一次加钱操作', correct: false, explanation: '重复执行不能解决失败问题' },
        { text: '忽略错误，数据自己会恢复', correct: false, explanation: '数据库不会自动修复错误逻辑' },
      ],
    },
    // ── 14. predict-output: 索引选择 ──
    {
      type: 'predict-output',
      instruction: '判断以下场景是否应该建索引：',
      code: '-- products 表有 10 万行\n-- status 列有 5 种值（active/inactive/discontinued/pending/archived）\n-- 查询：SELECT * FROM products WHERE status = \'active\'',
      expectedOutput: '可以考虑建索引（5 种值区分度中等，10 万行有索引收益）',
      options: [
        { text: '应该建索引', correct: true, explanation: '10 万行 + 5 种值（20% 区分度），索引可以加速过滤' },
        { text: '不应该建索引', correct: false, explanation: '虽然区分度一般，但 10 万行数据下索引仍有明显收益' },
        { text: '必须建唯一索引', correct: false, explanation: 'status 不是唯一的' },
        { text: '建视图比索引好', correct: false, explanation: '视图不解决查询加速问题' },
      ],
    },
    // ── 15. match-blocks: 易混点配对 ──
    {
      type: 'match-blocks',
      instruction: '将易混概念配对排列（先概念后正确描述）：',
      fragments: ['视图是', '虚拟表，不存数据', '索引是', '加速查找的数据结构', '事务是', '保证数据一致性的机制'],
      distractors: ['存储数据的物理表', '减慢写入速度的工具'],
    },
    // ── 16. 选择题：综合辨析 ──
    {
      type: 'multiple-choice',
      question: '索引和视图的共同点是什么？',
      options: [
        { text: '两者都占用磁盘空间', correct: false, explanation: '视图不占用磁盘空间' },
        { text: '两者都用 CREATE 语句创建', correct: true, explanation: 'CREATE INDEX 和 CREATE VIEW 都是用 CREATE 语句' },
        { text: '两者都能加速查询', correct: false, explanation: '视图通常不加速查询' },
        { text: '两者都能修改数据', correct: false, explanation: '索引不能修改数据，只是辅助结构' },
      ],
    },
    // ── 17. 选择题：ACID 完整辨析 ──
    {
      type: 'multiple-choice',
      question: '"用户下单时同时扣减库存和创建订单，两个操作全部完成订单才生效。"这个要求对应 ACID 的哪个特性？',
      options: [
        { text: '原子性', correct: true, explanation: '两个操作必须全部完成或全部不做，正是原子性的定义' },
        { text: '一致性', correct: false, explanation: '一致性是关于数据规则的，这里侧重操作的完整性' },
        { text: '隔离性', correct: false, explanation: '这里没有并发事务的干扰问题' },
        { text: '持久性', correct: false, explanation: '还没有提交，不涉及持久性' },
      ],
    },
    // ── 18. fill-in: 总结填空 ──
    {
      type: 'fill-in',
      prompt: '补全本章三个核心概念的描述：',
      template: '____：保证多个操作要么全做要么全不做。\n____：把常用查询存起来，方便复用。\n____：加速 WHERE 条件查找的数据结构。',
      answers: ['事务', '视图', '索引'],
      hints: ['第一个保证数据一致性', '第二个是虚拟表', '第三个像书的目录'],
    },
    // ── 19. fix-code: 创建视图语法错误 ──
    {
      type: 'fix-code',
      instruction: '创建视图的语句少了什么？',
      buggyCode: 'CREATE VIEW user_names\nSELECT id, name\nFROM users;',
      goal: '补上缺失的关键字',
      mode: 'choose-fix',
      fixes: [
        { text: '在视图名后加 AS', correct: true, explanation: 'CREATE VIEW 视图名 AS SELECT ... 的 AS 不能少' },
        { text: '把 VIEW 改成 TABLE', correct: false, explanation: '我们要创建的是视图不是表' },
        { text: '在 users 后加分号', correct: false, explanation: '已经有了分号，问题是缺少 AS' },
        { text: '把 SELECT 改成 INSERT', correct: false, explanation: '视图必须基于 SELECT' },
      ],
    },
    // ── 20. predict-output: 事务与索引 ──
    {
      type: 'predict-output',
      instruction: '以下事务中，索引会影响什么？',
      code: 'START TRANSACTION;\nUPDATE products SET stock = stock - 1 WHERE id = 100;\nCOMMIT;',
      expectedOutput: '索引会让 UPDATE 中的 WHERE id = 100 更快定位到数据行',
      options: [
        { text: '事务的原子性', correct: false, explanation: '原子性与索引无关' },
        { text: 'UPDATE 的执行速度', correct: true, explanation: 'id 列通常有主键索引，能极快定位到 id=100 的行' },
        { text: 'COMMIT 的速度', correct: false, explanation: '索引不影响提交速度' },
        { text: 'ROLLBACK 的执行', correct: false, explanation: '回滚由日志实现，不受索引影响' },
      ],
    },
    // ── 21. 选择题：最终判断 ──
    {
      type: 'multiple-choice',
      question: '以下哪个场景应该同时使用视图和索引？',
      options: [
        { text: '需要加速一条简单的 SELECT 查询', correct: false, explanation: '只用索引就够了' },
        { text: '需要封装复杂查询，且该查询的 WHERE 条件涉及大表的列', correct: true, explanation: '视图封装查询逻辑，索引加速底层的大表查找，两者互补' },
        { text: '需要隐藏敏感数据列', correct: false, explanation: '只用视图就够了' },
        { text: '需要保证写入的原子性', correct: false, explanation: '应该用事务' },
      ],
    },
    // ── 22. exposition: 全章总结 ──
    {
      type: 'exposition',
      text: '第2章我们学了三个核心工具，每个解决不同的问题：\n\n**事务** —— 保证多条操作的一致性。用 START TRANSACTION / COMMIT / ROLLBACK。\n**视图** —— 封装常用查询。用 CREATE VIEW / CREATE OR REPLACE VIEW / DROP VIEW。\n**索引** —— 加速数据查找。用 CREATE INDEX / DROP INDEX，注意不要滥用。\n\n它们互不替代，各司其职，共同构建可靠的数据库应用。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
