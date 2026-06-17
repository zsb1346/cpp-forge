import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-views',
    chapter: 2,
    title: '视图基础',
    subtitle: '四大作用 · CREATE VIEW',
    description: '理解视图的概念和四大作用，学会用 CREATE VIEW 创建视图来简化查询、保护数据。',
    objectives: [
      '理解视图的本质——虚拟表',
      '掌握 CREATE VIEW 语法',
      '能说出视图的四个核心作用',
    ],
    estimatedMinutes: 13,
    pathway: {
      subject: 'sql',
      knowledgePoints: [{ id: 'sql.views.basics', label: '视图基础' }],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    // ── 1. 问题导入 ──
    {
      type: 'exposition',
      text: '我们要解决一个实际问题：你的数据库里有 `users` 表，包含 id、name、email、phone、password_hash、created_at。\n每次查用户信息，你都要写 `SELECT id, name, email FROM users`——选来选去都是那几列。\n能不能把这个"常用查询"存起来，下次直接调用？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '这就是 **视图（View）** 要解决的问题。\n视图是一个**虚拟表**——它不存数据，只存一个查询的"定义"。\n你可以把它当作一张表来查询，但实际上每次查视图，数据库都会执行它背后的那条 SELECT 语句。',
      code: '-- 创建视图：把常用查询存起来\nCREATE VIEW user_contacts AS\nSELECT id, name, email\nFROM users;\n\n-- 使用视图：像查表一样方便\nSELECT * FROM user_contacts;',
    },
    // ── 2. 概念卡 ──
    {
      type: 'concept-cards',
      instruction: '视图的四个核心作用：',
      cards: [
        { term: '简化查询', meaning: '把复杂的多表查询存为视图，每次查视图就行', example: 'CREATE VIEW ... AS SELECT ... JOIN ...' },
        { term: '数据安全', meaning: '只暴露需要的列，隐藏敏感字段', example: '暴露 name/email，隐藏 password_hash' },
        { term: '统一格式', meaning: '底层表结构变了，视图可以保持对外接口不变', example: '把列改名、计算表达式封装在视图里' },
        { term: '逻辑结构', meaning: '按业务角度组织数据，不关心物理存储', example: '各系平均分视图、月度销售汇总视图' },
      ],
    },
    // ── 3. animated-timeline: 视图 vs 基表 ──
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
      },
      scenes: [
        {
          narration: '这是原始的 users 表，包含敏感信息。',
          elements: [
            {
              type: 'code',
              id: 'table-code',
              code: '-- users 表结构',
              language: 'sql',
            },
            {
              type: 'table',
              id: 'users-table',
              headers: ['id', 'name', 'email', 'phone', 'password_hash'],
              rows: [
                [1, '小明', 'ming@e.com', '13800138001', '****'],
                [2, '小红', 'hong@e.com', '13800138002', '****'],
                [3, '小刚', 'gang@e.com', '13800138003', '****'],
              ],
            },
          ],
        },
        {
          mode: 'delta',
          narration: '我们创建一个视图，只暴露 name 和 email，隐藏电话和密码。',
          elements: [
            {
              type: 'code',
              id: 'table-code',
              code: 'CREATE VIEW user_contacts AS\nSELECT id, name, email\nFROM users;',
              language: 'sql',
              highlightedLines: [1, 2, 3],
            },
            {
              type: 'table',
              id: 'users-table',
              headers: ['name', 'email'],
              rows: [
                ['小明', 'ming@e.com'],
                ['小红', 'hong@e.com'],
                ['小刚', 'gang@e.com'],
              ],
              fadedRows: [0, 1, 2],
              highlightedCols: [0, 1],
            },
          ],
        },
        {
          mode: 'delta',
          narration: '现在查询视图 user_contacts，只能看到公开信息。电话号码和密码被安全隐藏了。',
          elements: [
            {
              type: 'code',
              id: 'table-code',
              code: 'SELECT * FROM user_contacts;\n-- 结果只包含 name 和 email',
              language: 'sql',
              highlightedLines: [1],
            },
            {
              type: 'table',
              id: 'users-view',
              headers: ['name', 'email'],
              rows: [
                ['小明', 'ming@e.com'],
                ['小红', 'hong@e.com'],
                ['小刚', 'gang@e.com'],
              ],
            },
          ],
        },
      ],
    },
    // ── 4. 创建视图的语法 ──
    {
      type: 'exposition',
      text: '创建视图的完整语法很简单：\n\n```sql\nCREATE VIEW 视图名 AS\nSELECT 列1, 列2, ...\nFROM 表名\nWHERE 条件;\n```\n\n注意：`CREATE VIEW ... AS` 后面必须是 SELECT 语句。\n视图创建后，你就可以像查询普通表一样查询它。',
    },
    // ── 5. 选择题：视图本质 ──
    {
      type: 'multiple-choice',
      question: '视图本质是什么？',
      options: [
        { text: '一张真实存储数据的表', correct: false, explanation: '视图不存数据，数据仍在原表' },
        { text: '一个保存好的 SELECT 查询', correct: true, explanation: '视图就是一个命名的查询，执行时才去查底层表' },
        { text: '一份数据备份', correct: false, explanation: '视图不是备份，修改视图可以反映到底层表' },
        { text: '一个索引', correct: false, explanation: '索引是加速查询的，视图是封装查询的' },
      ],
    },
    // ── 6. 选择题：视图 vs 基表 ──
    {
      type: 'multiple-choice',
      question: '修改了基表的数据后，视图中的数据会怎样？',
      options: [
        { text: '视图数据不会变', correct: false, explanation: '视图是虚拟表，每次查询都从基表读取最新数据' },
        { text: '视图自动同步更新', correct: true, explanation: '视图不存数据，查询时总能看到基表的最新状态' },
        { text: '视图需要手动刷新', correct: false, explanation: '不需要刷新，视图总是查基表的实时数据' },
        { text: '视图会报错', correct: false, explanation: '基表修改不影响视图的存在' },
      ],
    },
    // ── 7. compare-snippets: 直接查询 vs 视图查询 ──
    {
      type: 'compare-snippets',
      instruction: '比较两种查询方式：',
      question: '用视图查询相比直接查询好在哪？',
      snippets: [
        {
          id: 'direct',
          title: '直接查询',
          code: 'SELECT u.id, u.name, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.total > 100\nORDER BY o.total DESC;',
          correct: false,
          explanation: '每次都要写完整的 JOIN 查询，容易写错且重复劳动',
        },
        {
          id: 'view',
          title: '视图查询',
          code: 'CREATE VIEW big_orders AS\nSELECT u.id, u.name, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.total > 100;\n\nSELECT * FROM big_orders\nORDER BY total DESC;',
          correct: true,
          explanation: '创建一次视图，后续查询只需 SELECT * FROM 视图，大大简化操作',
        },
      ],
      compareBy: 'meaning',
    },
    // ── 8. type-it: 创建视图 ──
    {
      type: 'type-it',
      instruction: '创建一个名为 student_names 的视图，只显示学生姓名：',
      code: 'CREATE VIEW student_names AS\nSELECT name FROM students;',
      hints: [
        'CREATE VIEW 视图名 AS 是固定格式',
        '视图名建议用有意义的名称',
        'AS 后面跟 SELECT 查询语句',
      ],
    },
    // ── 9. 选择题：视图安全性 ──
    {
      type: 'multiple-choice',
      question: '为什么说视图可以提高数据安全性？',
      options: [
        { text: '视图会自动加密数据', correct: false, explanation: '视图不做加密，只是控制可见列' },
        { text: '视图可以只暴露部分列，隐藏敏感字段', correct: true, explanation: '创建视图时只 SELECT 安全列，敏感列就不在视图里' },
        { text: '视图要求输入密码', correct: false, explanation: '视图没有密码机制' },
        { text: '视图会对数据脱敏', correct: false, explanation: '视图不改变数据内容，只控制哪些列可见' },
      ],
    },
    // ── 10. scene: 视图隐藏敏感列 ──
    {
      type: 'scene',
      title: '用视图保护敏感数据',
      steps: [
        {
          text: '员工表 employees 包含工资信息，不能让所有人都能看到。',
          code: 'SELECT * FROM employees;\n-- id | name | salary | phone\n-- 1  | 张三  | 25000  | 138...\n-- 2  | 李四  | 18000  | 139...',
        },
        {
          text: '创建一个视图，只暴露基本联系信息，隐藏 salary 列。',
          code: 'CREATE VIEW employee_contacts AS\nSELECT id, name, phone\nFROM employees;',
        },
        {
          text: '普通员工查询 employee_contacts 只能看到允许的信息。工资数据被安全保护了。',
          code: 'SELECT * FROM employee_contacts;\n-- id | name | phone\n-- 1  | 张三  | 138...\n-- 2  | 李四  | 139...',
        },
      ],
      advanceMode: 'click',
    },
    // ── 11. fill-in: 补全创建视图 ──
    {
      type: 'fill-in',
      prompt: '创建一个名为 active_users 的视图，显示 id、name 和 email，条件是 status 为 active：',
      template: '____ ____ active_users AS\nSELECT id, name, email\n____ users\n____ status = \'active\';',
      answers: ['CREATE', 'VIEW', 'FROM', 'WHERE'],
      hints: ['第一个空是创建命令', '第二个空是创建视图的关键字', '第三个空指定数据来源表', '第四个空是条件子句'],
    },
    // ── 12. type-it: 创建多表关联视图 ──
    {
      type: 'type-it',
      instruction: '创建一个视图，连接 users 和 orders 表，显示用户名和订单金额：',
      code: 'CREATE VIEW user_order_totals AS\nSELECT u.name, o.total\nFROM users u\nJOIN orders o ON u.id = o.user_id;',
      hints: [
        '视图可以封装多表 JOIN 查询',
        'u 和 o 是表别名，可以简化书写',
        'JOIN ... ON 指定连接条件',
      ],
    },
    // ── 13. 选择题：视图 vs 表 ──
    {
      type: 'multiple-choice',
      question: '以下哪个操作不能直接在视图上执行？',
      options: [
        { text: 'SELECT * FROM 视图', correct: false, explanation: 'SELECT 是视图最常用的操作' },
        { text: '对简单视图执行 INSERT', correct: false, explanation: '有些简单视图支持 INSERT（但一般不推荐）' },
        { text: '在视图上创建索引', correct: true, explanation: '视图是虚拟表，不能直接创建索引。索引必须在基表上创建' },
        { text: '对视图使用 WHERE 过滤', correct: false, explanation: '可以对视图使用 WHERE 进一步过滤' },
      ],
    },
    // ── 14. exposition: 统一格式的例子 ──
    {
      type: 'exposition',
      text: '视图还有一个很实用的作用：**统一数据格式**。\n假设 base_salary 表里工资是美元，业务上需要有时显示美元、有时显示人民币。\n创建一个带格式转换的视图，应用层就不用操心汇率换算了。',
      code: 'CREATE VIEW salary_cny AS\nSELECT id, name,\n       salary * 7.2 AS salary_cny\nFROM base_salary;\n\nSELECT name, salary_cny FROM salary_cny\nWHERE salary_cny > 10000;',
    },
    // ── 15. 选择题：视图维护 ──
    {
      type: 'multiple-choice',
      question: '基表增加了一个新列，视图会自动包含这个新列吗？',
      options: [
        { text: '会自动包含', correct: false, explanation: '视图的定义在 CREATE VIEW 时就固定了 SELECT 哪些列' },
        { text: '不会，需要重新创建视图', correct: true, explanation: '视图定义时指定的列是固定的，新列不会自动加入' },
        { text: '基表不能加列', correct: false, explanation: 'ALTER TABLE 可以增加列' },
        { text: '视图会报错', correct: false, explanation: '视图不会因此报错，但也不显示新列' },
      ],
    },
    // ── 16. exposition: 更新视图的语法 ──
    {
      type: 'exposition',
      text: '更新视图定义需要使用 `CREATE OR REPLACE VIEW`：\n\n```sql\nCREATE OR REPLACE VIEW 视图名 AS\n新的 SELECT 语句;\n```\n\n或者先 DROP 再 CREATE。\n\n删除视图用：`DROP VIEW 视图名;`',
    },
    // ── 17. type-it: 创建汇总视图 ──
    {
      type: 'type-it',
      instruction: '创建一个视图显示每个用户的订单总数和总金额：',
      code: 'CREATE VIEW user_order_summary AS\nSELECT u.name,\n       COUNT(o.id) AS order_count,\n       SUM(o.total) AS total_spent\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.name;',
      hints: [
        'COUNT 计算订单数量',
        'SUM 计算总金额',
        'LEFT JOIN 确保没有订单的用户也显示',
        'GROUP BY 按用户分组统计',
      ],
    },
    // ── 18. 选择题：GROUP BY 视图 ──
    {
      type: 'multiple-choice',
      question: '视图的 SELECT 语句可以使用 GROUP BY 和聚合函数吗？',
      options: [
        { text: '不行，视图只能用简单的 SELECT', correct: false, explanation: '视图支持 GROUP BY、聚合函数、JOIN 等' },
        { text: '可以，视图支持 GROUP BY 和聚合', correct: true, explanation: '视图背后的 SELECT 可以使用任何标准 SQL 功能' },
        { text: '只能用 GROUP BY 不能用聚合函数', correct: false, explanation: '两者都可以用在视图定义的 SELECT 中' },
        { text: '只能用聚合函数不能用 GROUP BY', correct: false, explanation: '两者可以同时使用' },
      ],
    },
    // ── 19. fill-in: 补全删除视图 ──
    {
      type: 'fill-in',
      prompt: '补全删除视图的语句：',
      template: '____ ____ employee_contacts;',
      answers: ['DROP', 'VIEW'],
      hints: ['第一个空是删除命令', '第二个空指定删除的对象类型'],
    },
    // ── 20. exposition: 视图使用建议 ──
    {
      type: 'exposition',
      text: '使用视图的几个建议：\n- **不要嵌套太深**——视图套视图套视图，性能会变差\n- **简单视图可更新**——基于单表的简单视图支持 INSERT/UPDATE/DELETE，但不建议滥用\n- **命名规范**——习惯用 `v_` 前缀区分视图和表，如 `v_user_contacts`\n- **文档记录**——视图的定义逻辑最好写清楚，方便后来人理解',
    },
    // ── 21. 选择题：视图总结 ──
    {
      type: 'multiple-choice',
      question: '以下哪个说法**错误**？',
      options: [
        { text: '视图是一种虚拟表', correct: false, explanation: '正确，视图不存数据只存查询定义' },
        { text: '视图可以简化复杂查询', correct: false, explanation: '正确，把 JOIN 封装在视图里' },
        { text: '视图可以提高查询性能', correct: true, explanation: '视图不提高性能（通常还略慢），它的优势是简化、安全、统一' },
        { text: '视图可以保护敏感数据', correct: false, explanation: '正确，只暴露需要的列' },
      ],
    },
    // ── 22. exposition: 总结 ──
    {
      type: 'exposition',
      text: '视图的核心一句话：**把常用的 SELECT 存起来，给它取个名字，下次直接用。**\n- 简化查询：不用每次写复杂的 JOIN\n- 数据安全：隐藏敏感列\n- 统一格式：封装计算逻辑\n- 逻辑结构：按业务角度组织数据\n\n记住视图是"虚拟表"——它不存数据，查的时候才从基表读。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
