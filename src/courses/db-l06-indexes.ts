import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-indexes',
    chapter: 2,
    title: '索引基础',
    subtitle: '加速查询 · 使用禁忌',
    description: '理解索引的查找加速原理、创建语法，以及"何时不该用索引"的常见误区。',
    objectives: [
      '理解索引的工作机制——类似书的目录',
      '掌握 CREATE INDEX 和查看索引的语法',
      '能判断哪些场景适合/不适合用索引',
    ],
    estimatedMinutes: 14,
    pathway: {
      subject: 'sql',
      knowledgePoints: [{ id: 'sql.indexes.basics', label: '索引基础' }],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    // ── 1. 问题导入 ──
    {
      type: 'exposition',
      text: '我们来思考一个问题：你的 `users` 表有 100 万条记录。执行 `SELECT * FROM users WHERE id = 999999;`——数据库怎么找到这条记录的？\n最笨的办法：从第 1 行开始，一行一行往下查，直到找到第 999999 行。这叫**全表扫描**。\n100 万行要查 100 万次——太慢了。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '怎么解决？想想你是如何在一本厚书里找到某个内容的——你不会一页一页翻，而是查**目录**。\n数据库的**索引（Index）** 就是书的目录。\n它记录"哪个值在哪一行"，让你一秒定位，不用翻遍全书。',
      code: '-- 创建索引：为 email 列建"目录"\nCREATE INDEX idx_users_email\nON users(email);\n\n-- 现在按 email 查询超快\nSELECT * FROM users WHERE email = \'a@b.com\';',
    },
    // ── 2. animated-timeline: 索引查询 vs 全表扫描 ──
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
      },
      scenes: [
        {
          narration: '假设 users 表有 6 条记录，我们要找 email = \'eve@e.com\'。没有索引时，数据库从第 1 行逐行比对。',
          elements: [
            {
              type: 'code',
              id: 'query',
              code: 'SELECT * FROM users WHERE email = \'eve@e.com\';',
              language: 'sql',
            },
            {
              type: 'table',
              id: 'scan',
              headers: ['行号', 'name', 'email'],
              rows: [
                ['①', 'Alice', 'alice@e.com'],
                ['②', 'Bob', 'bob@e.com'],
                ['③', 'Charlie', 'charlie@e.com'],
                ['④', 'Diana', 'diana@e.com'],
                ['⑤', 'Eve', 'eve@e.com'],
                ['⑥', 'Frank', 'frank@e.com'],
              ],
            },
          ],
        },
        {
          mode: 'delta',
          narration: '逐行扫描：第①行不匹配，继续。第②行不匹配……直到第⑤行才找到。一共比较了 5 次。',
          elements: [
            {
              type: 'table',
              id: 'scan',
              headers: ['行号', 'name', 'email'],
              rows: [['①', 'Alice', 'alice@e.com'], ['②', 'Bob', 'bob@e.com'], ['③', 'Charlie', 'charlie@e.com'], ['④', 'Diana', 'diana@e.com'], ['⑤', 'Eve', 'eve@e.com'], ['⑥', 'Frank', 'frank@e.com']],
              highlightedRows: [0],
              fadedRows: [1, 2, 3],
            },
          ],
        },
        {
          mode: 'delta',
          narration: '现在加索引。索引是另一种数据结构（B+树），它把 email 排序并记录位置。查找时只需 2-3 步就能定位。',
          elements: [
            {
              type: 'code',
              id: 'query',
              code: 'CREATE INDEX idx_email ON users(email);\n\nSELECT * FROM users WHERE email = \'eve@e.com\';',
              language: 'sql',
            },
            {
              type: 'text',
              id: 'index-label',
              content: "索引（B+树）按字母排序 email：\nalice → ①  bob → ②  charlie → ③\ndiana → ④  eve → ⑤  frank → ⑥\n\n'二分查找'：先找中间，缩小范围，3 步定位 ✓",
              variant: 'body',
            },
            {
              type: 'table',
              id: 'scan-index',
              headers: ['行号', 'name', 'email'],
              rows: [['①', 'Alice', 'alice@e.com'], ['②', 'Bob', 'bob@e.com'], ['③', 'Charlie', 'charlie@e.com'], ['④', 'Diana', 'diana@e.com'], ['⑤', 'Eve', 'eve@e.com'], ['⑥', 'Frank', 'frank@e.com']],
              highlightedRows: [4],
            },
          ],
        },
      ],
    },
    // ── 3. 概念卡 ──
    {
      type: 'concept-cards',
      instruction: '索引的关键概念：',
      cards: [
        { term: '索引（Index）', meaning: '一种加速查询的数据结构，像书的目录', example: 'CREATE INDEX idx_name ON t(col)' },
        { term: '全表扫描', meaning: '没有索引时逐行检查的慢速方法', example: '100 万行逐行比对' },
        { term: 'B+ 树', meaning: 'MySQL/PostgreSQL 默认索引结构，平衡查找树', example: '查找次数 = 树高度，约 3-4 层' },
        { term: '主键索引', meaning: '主键自动创建的特殊索引，唯一且非空', example: 'PRIMARY KEY (id) 自动建索引' },
      ],
    },
    // ── 4. 创建索引的语法 ──
    {
      type: 'exposition',
      text: '创建索引的语法：\n```sql\n-- 单列索引\nCREATE INDEX 索引名 ON 表名(列名);\n\n-- 唯一索引（值不能重复）\nCREATE UNIQUE INDEX 索引名 ON 表名(列名);\n\n-- 复合索引（多列组合查询）\nCREATE INDEX 索引名 ON 表名(列1, 列2);\n\n-- 查看表上的索引\nSHOW INDEX FROM 表名;  -- MySQL\n\\d 表名               -- PostgreSQL\n```',
    },
    // ── 5. 选择题：索引本质 ──
    {
      type: 'multiple-choice',
      question: '索引最适合类比什么？',
      options: [
        { text: '一本字典的单词表', correct: false, explanation: '整本字典相当于整个表' },
        { text: '字典前面的拼音索引', correct: true, explanation: '索引就是"关键字→位置"的映射，让你不用翻完整本书' },
        { text: '字典的封面', correct: false, explanation: '封面不包含查找信息' },
        { text: '字典的出版社信息', correct: false, explanation: '与查找数据无关' },
      ],
    },
    // ── 6. compare-snippets: 有索引 vs 无索引 ──
    {
      type: 'compare-snippets',
      instruction: '比较两种查询方式：',
      question: '哪个查询在 100 万行数据中执行更快？',
      snippets: [
        {
          id: 'no-index',
          title: '无索引查询',
          code: 'SELECT * FROM users\nWHERE email = \'someone@mail.com\';',
          correct: false,
          explanation: '没有索引时，数据库必须逐行扫描全部 100 万行，非常慢',
        },
        {
          id: 'with-index',
          title: '有索引查询',
          code: 'CREATE INDEX idx_email ON users(email);\n\nSELECT * FROM users\nWHERE email = \'someone@mail.com\';',
          correct: true,
          explanation: '有索引时数据库通过 B+ 树 3-4 步定位到数据，几乎瞬间完成',
        },
      ],
      compareBy: 'meaning',
    },
    // ── 7. 选择题：索引 vs 全表扫描 ──
    {
      type: 'multiple-choice',
      question: '以下哪种情况全表扫描比用索引更快？',
      options: [
        { text: '查询条件使用了 WHERE', correct: false, explanation: '用 WHERE 通常需要索引加速' },
        { text: '表里只有 10 条数据', correct: true, explanation: '数据量极小时，建索引的额外开销反而比直接扫描大' },
        { text: '查询用到了 ORDER BY', correct: false, explanation: 'ORDER BY 也可以用索引优化' },
        { text: '查询用到了 JOIN', correct: false, explanation: 'JOIN 也需要索引加速' },
      ],
    },
    // ── 8. concept-cards: 使用禁忌 ──
    {
      type: 'concept-cards',
      instruction: '什么时候**不要**用索引？',
      cards: [
        { term: '小表', meaning: '几十行的表，全表扫描比索引更快', example: '配置表、状态码表' },
        { term: '频繁写操作', meaning: 'INSERT/UPDATE/DELETE 也需要更新索引', example: '日志表每秒写入万次' },
        { term: '低区分度列', meaning: '值种类很少的列', example: '性别（男/女）、状态（0/1）' },
        { term: '从不查询的列', meaning: '索引不是免费的，不用就别建', example: '冗余备注字段' },
      ],
    },
    // ── 9. exposition: 索引的代价 ──
    {
      type: 'exposition',
      text: '索引**不是免费的**。它有三大代价：\n1. **存储空间**——索引本身要占磁盘，复合索引更占空间\n2. **写入变慢**——每次 INSERT/UPDATE/DELETE，除了改数据还要更新索引\n3. **维护成本**——索引需要定期重建（REBUILD）来消除碎片\n\n一句话：查询加速的代价是写入减速。',
    },
    // ── 10. 选择题：索引代价 ──
    {
      type: 'multiple-choice',
      question: '给一个表建了太多索引，最可能影响哪个操作？',
      options: [
        { text: 'SELECT 查询速度', correct: false, explanation: '索引加速 SELECT，但太多索引也不一定更快' },
        { text: 'INSERT 插入速度', correct: true, explanation: '每次插入都要更新所有索引，索引越多插入越慢' },
        { text: 'ALTER TABLE 修改表结构', correct: false, explanation: 'ALTER 受影响相对固定' },
        { text: 'DROP TABLE 删除表', correct: false, explanation: '删除表时索引一起被删' },
      ],
    },
    // ── 11. scene: 索引加速查询 ──
    {
      type: 'scene',
      title: '索引如何加速 ORDER BY',
      steps: [
        {
          text: '按创建时间排序查询最近注册的用户：',
          code: 'SELECT * FROM users\nORDER BY created_at DESC\nLIMIT 10;\n-- 无索引：数据库先读 100 万行，再排序，再取前 10',
        },
        {
          text: '在 created_at 上创建索引后，B+ 树已经排好序了。数据库只需从最后 10 条开始遍历即可。',
          code: 'CREATE INDEX idx_created_at\nON users(created_at);\n\nSELECT * FROM users\nORDER BY created_at DESC\nLIMIT 10;\n-- 有索引：直接走索引末尾 10 条，瞬间返回',
        },
        {
          text: '同理，WHERE + ORDER BY 组合也受益。索引先筛选再排序，几步完成。',
          code: 'CREATE INDEX idx_status_created\nON users(status, created_at);\n\n-- 复合索引：先按 status 筛选，再按 created_at 排序\nSELECT * FROM users\nWHERE status = \'active\'\nORDER BY created_at DESC\nLIMIT 10;',
        },
      ],
      advanceMode: 'click',
    },
    // ── 12. 选择题：复合索引 ──
    {
      type: 'multiple-choice',
      question: '复合索引 (a, b) 能加速以下哪个查询？',
      options: [
        { text: 'WHERE b = 1', correct: false, explanation: '复合索引遵循"最左前缀"原则，只查 b 不会用到 (a,b) 索引' },
        { text: 'WHERE a = 1 AND b = 2', correct: true, explanation: '复合索引可以加速"先 a 再 b"的查询' },
        { text: 'WHERE c = 3', correct: false, explanation: 'c 列不在索引中，无法使用此索引' },
        { text: 'WHERE b = 1 ORDER BY a', correct: false, explanation: '没有 a 的条件，无法用此索引的 a 部分排序' },
      ],
    },
    // ── 13. type-it: 创建索引 ──
    {
      type: 'type-it',
      instruction: '在 students 表的 email 列上创建索引：',
      code: 'CREATE INDEX idx_students_email\nON students(email);',
      hints: [
        'CREATE INDEX 后跟索引名',
        '索引名习惯用 idx_表名_列名',
        'ON 后指定表名和列名',
      ],
    },
    // ── 14. type-it: 创建唯一索引 ──
    {
      type: 'type-it',
      instruction: '在 products 表的 sku 列上创建唯一索引（SKU 不能重复）：',
      code: 'CREATE UNIQUE INDEX idx_products_sku\nON products(sku);',
      hints: [
        'UNIQUE 表示值不能重复',
        '如果已有重复 sku 会报错',
        '唯一索引也加速查询，同时保证唯一性',
      ],
    },
    // ── 15. fill-in: 补全创建索引 ──
    {
      type: 'fill-in',
      prompt: '在 orders 表的 user_id 列上创建索引：',
      template: '____ INDEX idx_orders_user_id\n____ orders(____);',
      answers: ['CREATE', 'ON', 'user_id'],
      hints: ['第一个空是创建关键字', '第二个空指定目标表', '第三个空指定列名'],
    },
    // ── 16. 选择题：索引与 WHERE 条件 ──
    {
      type: 'multiple-choice',
      question: 'WHERE status = \'active\' 且 status 列只有 2 种值（active/inactive）。为该列建索引有意义吗？',
      options: [
        { text: '有，索引永远比全表扫描快', correct: false, explanation: '低区分度列索引效果有限' },
        { text: '没有意义，区分度太低了', correct: true, explanation: '只有 2 种值，索引无法高效过滤。数据库可能还是走全表扫描' },
        { text: '有意义，能让排序更快', correct: false, explanation: 'ORDER BY status 也用不了这种低区分度索引' },
        { text: '必须建，否则无法查询', correct: false, explanation: '没有索引也能查，只是全表扫描' },
      ],
    },
    // ── 17. exposition: 如何查看索引 ──
    {
      type: 'exposition',
      text: '如何知道一个查询用了索引没有？\n用 `EXPLAIN` 关键字：\n\n```sql\nEXPLAIN SELECT * FROM users WHERE email = \'a@b.com\';\n```\n\n结果中的 `type` 列：\n- `ALL` = 全表扫描（没用到索引）\n- `ref` / `range` = 用到了索引\n- `const` = 最优，主键或唯一索引等值查找\n\n**EXPLAIN 是 SQL 优化的第一工具。**',
    },
    // ── 18. type-it: 使用 EXPLAIN ──
    {
      type: 'type-it',
      instruction: '输入 EXPLAIN 查询语句，分析查询计划：',
      code: 'EXPLAIN SELECT * FROM users\nWHERE email = \'test@example.com\';',
      hints: [
        'EXPLAIN 放在 SELECT 前面',
        '它不会实际执行查询，只显示执行计划',
        '看 type 列判断是否用到索引',
      ],
    },
    // ── 19. fill-in: 索引与查询 ──
    {
      type: 'fill-in',
      prompt: '补全索引删除语句：',
      template: '____ INDEX idx_students_email\n____ students;',
      answers: ['DROP', 'ON'],
      hints: ['第一个空是删除关键字', '第二个空指定目标表'],
    },
    // ── 20. exposition: 索引总结 ──
    {
      type: 'exposition',
      text: '用索引的三个建议：\n1. **优先对 WHERE、JOIN、ORDER BY 的列建索引**\n2. **不要在小表或低区分度列上建索引**\n3. **不要建太多索引**——查询变快了，写入变慢了\n\n索引就是"用空间换时间，用写入性能换查询性能"。',
    },
    // ── 21. 选择题：综合判断 ──
    {
      type: 'multiple-choice',
      question: '以下哪个列最适合建索引？',
      options: [
        { text: 'gender 列（只有男/女）', correct: false, explanation: '区分度太低，索引效果差' },
        { text: 'email 列（每个用户唯一）', correct: true, explanation: '高区分度 + WHERE 频繁查询 = 索引的最佳候选' },
        { text: 'memo 列（备注信息，很少查询）', correct: false, explanation: '从不查的列建索引白占空间' },
        { text: 'is_deleted 列（只有 0/1）', correct: false, explanation: '低区分度列不适合索引' },
      ],
    },
    // ── 22. exposition: 总结 ──
    {
      type: 'exposition',
      text: '索引核心一句话：**给查询的列建"目录"，加速查找，但每次写入都要更新目录。**\n- 目录：`CREATE INDEX`\n- 查找：B+ 树二分定位，3-4 步找到\n- 禁忌：小表、低区分度、频繁写入、从不查询的列',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
