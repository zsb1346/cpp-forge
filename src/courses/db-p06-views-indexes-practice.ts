import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-views-indexes-practice',
    chapter: 2,
    title: '视图与索引综合练习',
    subtitle: '适用场景 · 辨析判断',
    description: '通过对比场景巩固视图和索引的判断能力，练习 CREATE VIEW 和 CREATE INDEX 语法。',
    objectives: [
      '能判断何时该用视图、何时不该用',
      '能判断何时该建索引、何时不该建',
      '能区分视图和索引的适用场景',
    ],
    estimatedMinutes: 15,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.views.basics', label: '视图基础' },
        { id: 'sql.indexes.basics', label: '索引基础' },
      ],
      contentKinds: ['practice'],
      stage: 'discrimination',
    },
  },
  blocks: [
    // ── 1. 选择题：视图用途 ──
    {
      type: 'multiple-choice',
      question: '以下哪个场景**最适合**用视图？',
      options: [
        { text: '需要加速一条频繁执行的查询', correct: false, explanation: '加速查询应该用索引，视图不提高性能' },
        { text: '希望把常用的 JOIN 查询封装起来，方便后续使用', correct: true, explanation: '视图的核心作用就是简化复杂查询' },
        { text: '需要保证某列的值不能重复', correct: false, explanation: '唯一性应该用 UNIQUE 约束或唯一索引' },
        { text: '需要提高 INSERT 的速度', correct: false, explanation: '视图不影响 INSERT 性能' },
      ],
    },
    // ── 2. 选择题：索引用途 ──
    {
      type: 'multiple-choice',
      question: '以下哪个场景**最适合**建索引？',
      options: [
        { text: '一张只有 20 行配置信息的表', correct: false, explanation: '小表全表扫描比索引更快' },
        { text: '一张 500 万行的大表，user_id 列频繁出现在 WHERE 条件中', correct: true, explanation: '大表 + 高频查询列 = 索引最佳场景' },
        { text: '一张每秒写入 1 万行日志的表', correct: false, explanation: '高频写入场景下索引会严重拖慢写入速度' },
        { text: '性别列，只有 2 种值', correct: false, explanation: '低区分度列索引效果很差' },
      ],
    },
    // ── 3. compare-snippets: 视图 vs 表查询 ──
    {
      type: 'compare-snippets',
      instruction: '比较两种获取用户订单信息的方式：',
      question: '哪种方式更适合长期维护？',
      snippets: [
        {
          id: 'direct-query',
          title: '直接查询',
          code: 'SELECT u.id, u.name, o.order_date, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.total > 100\nORDER BY o.order_date DESC;',
          correct: false,
          explanation: '每次都要写完整的 JOIN，容易出错且代码重复',
        },
        {
          id: 'view-query',
          title: '视图查询',
          code: 'CREATE VIEW user_orders_view AS\nSELECT u.id, u.name, o.order_date, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.total > 100;\n\nSELECT * FROM user_orders_view\nORDER BY order_date DESC;',
          correct: true,
          explanation: '封装一次，后续只查视图，维护更方便、代码更简洁',
        },
      ],
      compareBy: 'meaning',
    },
    // ── 4. predict-output: 场景判断——视图或索引 ──
    {
      type: 'predict-output',
      instruction: '判断以下场景应该用视图还是索引：',
      code: '-- 场景：产品经理说"每次查员工信息都要写\n-- SELECT id, name, department FROM employees，\n-- 能不能简化一下？"',
      expectedOutput: '视图',
      options: [
        { text: '视图', correct: true, explanation: '需要把常用查询存起来复用，是视图的典型用途' },
        { text: '索引', correct: false, explanation: '没有 WHERE 条件加速的问题，只是简化重复查询' },
        { text: '两个都用', correct: false, explanation: '问题只是简化查询，不需要索引' },
        { text: '两个都不用', correct: false, explanation: '视图可以完美解决简化重复查询的问题' },
      ],
    },
    // ── 5. predict-output: 场景判断二 ──
    {
      type: 'predict-output',
      instruction: '判断以下场景应该用视图还是索引：',
      code: '-- 场景：SELECT * FROM orders WHERE user_id = 42;\n-- orders 表有 200 万行，这条查询要 3 秒。\n-- 需要在 user_id 上做什么？',
      expectedOutput: '索引',
      options: [
        { text: '视图', correct: false, explanation: '视图不加速查询，解决不了 3 秒的问题' },
        { text: '索引', correct: true, explanation: 'WHERE user_id 的查询慢，在 user_id 上建索引可以加速' },
        { text: '事务', correct: false, explanation: '事务不解决查询性能问题' },
        { text: '不用管，3 秒正常', correct: false, explanation: '200 万行大表的 WHERE 查询应该用索引优化' },
      ],
    },
    // ── 6. 选择题：视图更新 ──
    {
      type: 'multiple-choice',
      question: '如果视图定义的 SELECT 使用了 DISTINCT，该视图能不能执行 INSERT？',
      options: [
        { text: '可以，和普通表一样', correct: false, explanation: '包含 DISTINCT、聚合函数、GROUP BY 的视图通常不可更新' },
        { text: '不能，这种视图是只读的', correct: true, explanation: '复杂视图（DISTINCT、GROUP BY、聚合函数等）不可更新' },
        { text: '能插入但不保证正确', correct: false, explanation: '数据库会直接拒绝修改复杂视图' },
        { text: '插入后再通过视图看不到新数据', correct: false, explanation: '修改复杂视图的操作会被拒绝' },
      ],
    },
    // ── 7. fill-in: 创建视图 ──
    {
      type: 'fill-in',
      prompt: '创建一个名为 v_user_info 的视图，显示 active 用户的 id、name：',
      template: '____ ____ v_user_info AS\nSELECT id, name\n____ users\n____ status = \'active\';',
      answers: ['CREATE', 'VIEW', 'FROM', 'WHERE'],
      hints: ['第一个空是创建命令', '第二个空指定对象类型', '第三个空指定数据源', '第四个空是筛选条件'],
    },
    // ── 8. match-blocks: 场景匹配 ──
    {
      type: 'match-blocks',
      instruction: '将场景与解决方案配对排列（先场景后方案）：',
      fragments: ['频繁查询的 WHERE 条件加速', '建索引', '简化重复的复杂查询', '创建视图', '隐藏敏感列', '创建视图只选安全列'],
      distractors: ['用事务包装', 'DROP 表重建'],
    },
    // ── 9. 选择题：索引最适合的列 ──
    {
      type: 'multiple-choice',
      question: 'orders 表有以下列，哪列最适合建索引？',
      options: [
        { text: 'status（3 种值：pending/done/cancelled）', correct: false, explanation: '区分度偏低，3 种值过滤效果有限' },
        { text: 'created_at（每天新增数千条，经常 WHERE 按日期范围查询）', correct: true, explanation: '高区分度 + 频繁范围查询，非常适合索引' },
        { text: 'is_deleted（2 种值：0 或 1）', correct: false, explanation: '低区分度列不适合索引' },
        { text: 'notes（文本备注，很少作为查询条件）', correct: false, explanation: '几乎不用来查询的列没必要建索引' },
      ],
    },
    // ── 10. fix-code: 修改视图定义 ──
    {
      type: 'fix-code',
      instruction: '视图 user_contacts 创建后，发现忘了包含 email 列，应该怎么修改？',
      buggyCode: 'CREATE VIEW user_contacts AS\nSELECT id, name\nFROM users;',
      goal: '把 email 列也加入视图',
      mode: 'choose-fix',
      fixes: [
        { text: '用 ALTER VIEW 添加 email', correct: false, explanation: 'SQL 没有 ALTER VIEW 语法，要用 CREATE OR REPLACE VIEW' },
        { text: '使用 CREATE OR REPLACE VIEW', correct: true, explanation: 'CREATE OR REPLACE VIEW 可以更新视图定义' },
        { text: '直接 INSERT INTO 视图', correct: false, explanation: 'INSERT 不能修改视图定义' },
        { text: '在表上加 email 索引', correct: false, explanation: '索引和视图定义无关' },
      ],
    },
    // ── 11. predict-output: 场景判断三 ──
    {
      type: 'predict-output',
      instruction: '判断以下场景应该用视图还是索引：',
      code: '-- 场景：公司的员工表包含 salary 列。\n-- HR 希望普通员工查询时只能看到 name 和 email。',
      expectedOutput: '视图',
      options: [
        { text: '视图', correct: true, explanation: '创建一个不包含 salary 列的视图，给普通员工用' },
        { text: '索引', correct: false, explanation: '索引不解决数据可见性问题' },
        { text: '唯一约束', correct: false, explanation: '唯一约束不涉及列级别的可见性控制' },
        { text: '删除 salary 列', correct: false, explanation: '删除列会丢失数据，HR 自己还需要看' },
      ],
    },
    // ── 12. 选择题：复合索引 ──
    {
      type: 'multiple-choice',
      question: '复合索引 (department, created_at) 能加速以下哪个查询？',
      options: [
        { text: 'SELECT * FROM employees WHERE created_at > \'2024-01-01\'', correct: false, explanation: '缺少最左列 department，无法使用此复合索引' },
        { text: 'SELECT * FROM employees WHERE department = \'IT\' ORDER BY created_at DESC', correct: true, explanation: '先按 department 筛选，再按 created_at 排序，复合索引完美匹配' },
        { text: 'SELECT * FROM employees ORDER BY department', correct: false, explanation: '没有 WHERE 条件，用全索引扫描不如直接读表' },
        { text: 'SELECT * FROM employees WHERE department = \'IT\' AND salary > 5000', correct: false, explanation: 'salary 不在索引中，索引只能帮助 department 筛选' },
      ],
    },
    // ── 13. type-it: 创建索引 ──
    {
      type: 'type-it',
      instruction: '在 orders 表的 user_id 列上创建索引：',
      code: 'CREATE INDEX idx_orders_user_id\nON orders(user_id);',
      hints: [
        'CREATE INDEX 后跟索引名',
        '索引名一般用 idx_表名_列名 的格式',
        'ON 后指定表名和列名',
      ],
    },
    // ── 14. 选择题：视图 vs 索引 ──
    {
      type: 'multiple-choice',
      question: '关于"存储空间"，以下哪个说法正确？',
      options: [
        { text: '视图和索引都不占额外空间', correct: false, explanation: '索引要占磁盘空间，视图不占' },
        { text: '视图不占空间，索引占空间', correct: true, explanation: '视图是虚拟表不存数据，索引需要额外的存储结构' },
        { text: '视图和索引都占空间', correct: false, explanation: '视图不占物理存储空间' },
        { text: '索引不占空间，视图占空间', correct: false, explanation: '说反了' },
      ],
    },
    // ── 15. fill-in: 补全创建索引 ──
    {
      type: 'fill-in',
      prompt: '在 products 表的 category_id 列上创建索引：',
      template: 'CREATE ____ idx_products_category\n____ products(____);',
      answers: ['INDEX', 'ON', 'category_id'],
      hints: ['第一个空是索引关键字', '第二个空指定目标表和列', '第三个空是列名'],
    },
    // ── 16. 选择题：视图与基表关系 ──
    {
      type: 'multiple-choice',
      question: '如果删除一个视图，它对应的基表会怎样？',
      options: [
        { text: '基表也会被删除', correct: false, explanation: '视图只是查询的封装，DROP VIEW 不影响基表' },
        { text: '基表不受任何影响', correct: true, explanation: '视图是虚拟表，删除视图不会碰基表的数据和结构' },
        { text: '基表数据会自动备份', correct: false, explanation: 'DROP VIEW 不会触发任何备份操作' },
        { text: '基表会变成只读', correct: false, explanation: '基表不受视图存亡影响' },
      ],
    },
    // ── 17. match-blocks: 归类配对 ──
    {
      type: 'match-blocks',
      instruction: '将下面描述分别归为"视图"或"索引"的用途（先类别后描述）：',
      fragments: ['视图', '封装复杂查询', '索引', '加速 WHERE 查询', '视图', '隐藏敏感列'],
      distractors: ['保证数据一致性', '创建表结构'],
    },
    // ── 18. fix-code: 索引选择 ──
    {
      type: 'fix-code',
      instruction: '开发者在 gender 列上建了索引。请判断是否合理，若不合理请选择正确方案。',
      buggyCode: 'CREATE INDEX idx_users_gender\nON users(gender);\n-- gender 只有 \'M\' 和 \'F\' 两种值',
      goal: '判断索引是否合理，选择最佳做法',
      mode: 'choose-fix',
      fixes: [
        { text: '没问题，索引总是好的', correct: false, explanation: '低区分度列建索引无意义，反而增加维护开销' },
        { text: '应该删除这个索引，低区分度列不适合', correct: true, explanation: '只有 2 种值，全表扫描可能比用索引更快' },
        { text: '改成唯一索引即可', correct: false, explanation: 'gender 显然不是唯一的，唯一索引会报错' },
        { text: '改成复合索引 (gender, name)', correct: false, explanation: '加列不能解决低区分度问题' },
      ],
    },
    // ── 19. type-it: 创建视图 ──
    {
      type: 'type-it',
      instruction: '创建一个视图显示所有价格大于 100 的商品：',
      code: 'CREATE VIEW expensive_products AS\nSELECT id, name, price\nFROM products\nWHERE price > 100;',
      hints: [
        '视图中也可以包含 WHERE 条件',
        '视图名用有意义的名称',
        '查视图时还能再加条件过滤',
      ],
    },
    // ── 20. 选择题：索引维护 ──
    {
      type: 'multiple-choice',
      question: '一个表经常执行 INSERT 操作，索引会带来什么影响？',
      options: [
        { text: 'INSERT 变快，因为索引帮数据排好序了', correct: false, explanation: 'INSERT 时需要同时更新索引，反而变慢' },
        { text: 'INSERT 变慢，因为需要同时更新索引', correct: true, explanation: '每次插入数据都要写入索引结构，索引越多 INSERT 越慢' },
        { text: 'INSERT 速度不变', correct: false, explanation: '索引会影响写入性能' },
        { text: 'INSERT 可能失败', correct: false, explanation: '索引不会导致 INSERT 失败（除非唯一索引冲突）' },
      ],
    },
    // ── 21. predict-output: 场景判断四 ──
    {
      type: 'predict-output',
      instruction: '以下场景应该创建视图还是索引？',
      code: '-- 场景：每次要查"本月销售额最高的 10 个商品"时，\n-- 都要写一段很长的 JOIN + GROUP BY + ORDER BY。\n-- 希望以后直接调用。',
      expectedOutput: '视图',
      options: [
        { text: '视图', correct: true, explanation: '把复杂的聚合查询封装成视图，以后直接 SELECT * FROM 视图' },
        { text: '索引', correct: false, explanation: '索引加速查找但无法封装查询逻辑' },
        { text: '两个都要', correct: false, explanation: '只需视图就够，索引不是必须的' },
        { text: '存储过程', correct: false, explanation: '视图就够用，不需要存储过程' },
      ],
    },
    // ── 22. 选择题：索引 vs 视图总结 ──
    {
      type: 'multiple-choice',
      question: '关于视图和索引的关系，哪个说法正确？',
      options: [
        { text: '视图内部会自动创建索引', correct: false, explanation: '视图不存储数据，不会自动建索引' },
        { text: '视图和索引可以一起使用，视图封装查询，索引加速该查询', correct: true, explanation: '视图封装逻辑，索引加速底层表的查询，两者互补' },
        { text: '有视图就不需要索引了', correct: false, explanation: '视图不解决查询速度问题' },
        { text: '有索引就不需要视图了', correct: false, explanation: '索引不解决查询封装问题' },
      ],
    },
    // ── 23. type-it: 删除视图 ──
    {
      type: 'type-it',
      instruction: '删除名为 v_old_report 的视图：',
      code: 'DROP VIEW v_old_report;',
      hints: [
        'DROP VIEW 后跟视图名',
        '删除视图不会影响基表数据',
        '如果视图不存在会报错',
      ],
    },
    // ── 24. fill-in: 总结填空 ──
    {
      type: 'fill-in',
      prompt: '补全视图和索引的核心区别：',
      template: '视图是____表，不存数据。\n索引是____结构，加速查询。',
      answers: ['虚拟', '数据'],
      hints: ['视图不是真实表', '索引是一种树形结构'],
    },
  ],
}

export default lesson
