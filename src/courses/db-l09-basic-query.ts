import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-basic-query',
    chapter: 3,
    title: 'SELECT 基础查询',
    subtitle: 'WHERE · ORDER BY · LIMIT · DISTINCT',
    description: '学习 SELECT 查询语句，掌握过滤、排序、限制和去重。',
    objectives: [
      '能用 SELECT 查询指定列',
      '能用 WHERE 过滤行',
      '能用 ORDER BY 排序',
      '能用 LIMIT 限制返回行数',
      '能用 DISTINCT 去重',
    ],
    estimatedMinutes: 15,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.select.basics', label: 'SELECT 基础' },
        { id: 'sql.where', label: 'WHERE 条件过滤' },
        { id: 'sql.order-by', label: 'ORDER BY 排序' },
        { id: 'sql.limit', label: 'LIMIT 限制行数' },
        { id: 'sql.distinct', label: 'DISTINCT 去重' },
      ],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '数据存进去了，怎么拿回来？\nSELECT 是 SQL 中最常用的命令——它是"查"。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '最简单的查询：\n`SELECT * FROM students;`\n`*` 表示"所有列"，整张表的数据都会显示出来。',
      code: 'SELECT * FROM students;\n-- 结果：所有列 × 所有行',
    },
    {
      type: 'type-it',
      instruction: '写一条最简单的 SELECT 查询所有列：',
      code: 'SELECT * FROM students;',
      hints: [
        'SELECT 后面跟要查的列',
        '* 表示所有列',
        'FROM 后面跟表名',
      ],
    },
    {
      type: 'exposition',
      text: '查全部太粗暴了。\n可以只查关心的列：',
      code: 'SELECT name, age FROM students;\n-- 只返回 name 和 age 两列',
    },
    {
      type: 'concept-cards',
      instruction: 'SELECT 的 5 个关键子句：',
      cards: [
        { term: 'SELECT 列', meaning: '指定要查哪些列', example: 'SELECT name, age' },
        { term: 'FROM 表', meaning: '指定从哪张表查', example: 'FROM students' },
        { term: 'WHERE 条件', meaning: '过滤行', example: 'WHERE age > 18' },
        { term: 'ORDER BY', meaning: '按某列排序', example: 'ORDER BY age DESC' },
        { term: 'LIMIT n', meaning: '只取前 n 行', example: 'LIMIT 5' },
      ],
    },
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
      },
      scenes: [
        {
          narration: '原始 students 表，共 4 条记录',
          mode: 'full',
          elements: [
            { type: 'table', id: 't1', headers: ['id', 'name', 'age', 'city'], rows: [[1, '张三', 20, '北京'], [2, '李四', 22, '上海'], [3, '王五', 19, '北京'], [4, '赵六', 25, '广州']] },
          ],
        },
        {
          narration: 'WHERE age >= 20：只保留年龄 >= 20 的行',
          elements: [
            { type: 'code', id: 'c1', code: 'SELECT * FROM students WHERE age >= 20;', language: 'sql' },
            { type: 'table', id: 't1', headers: ['id', 'name', 'age', 'city'], rows: [[1, '张三', 20, '北京'], [2, '李四', 22, '上海'], [4, '赵六', 25, '广州']], highlightedRows: [0, 1, 3], dimmedRows: [2] },
          ],
        },
        {
          narration: 'ORDER BY age：按年龄从小到大排序',
          elements: [
            { type: 'code', id: 'c1', code: 'SELECT * FROM students WHERE age >= 20 ORDER BY age;', language: 'sql' },
            { type: 'table', id: 't1', headers: ['id', 'name', 'age', 'city'], rows: [[1, '张三', 20, '北京'], [2, '李四', 22, '上海'], [4, '赵六', 25, '广州']] },
          ],
        },
        {
          narration: 'LIMIT 2：只取前两行结果',
          elements: [
            { type: 'code', id: 'c1', code: 'SELECT * FROM students WHERE age >= 20 ORDER BY age LIMIT 2;', language: 'sql' },
            { type: 'table', id: 't1', headers: ['id', 'name', 'age', 'city'], rows: [[1, '张三', 20, '北京'], [2, '李四', 22, '上海']], dimmedRows: [2] },
          ],
        },
      ],
    },
    {
      type: 'exposition',
      text: '子句的执行顺序（重要！）：\nFROM → WHERE → SELECT → ORDER BY → LIMIT\n\n先是拿到哪张表，再过滤，再选列，再排序，最后截取。',
    },
    {
      type: 'multiple-choice',
      question: 'SQL 中 WHERE 子句的作用是什么？',
      options: [
        { text: '对结果排序', correct: false, explanation: '排序用 ORDER BY，不是 WHERE' },
        { text: '限制返回行数', correct: false, explanation: '限制行数用 LIMIT' },
        { text: '按条件过滤行', correct: true, explanation: 'WHERE 后跟条件，只返回符合条件的行' },
        { text: '给列起别名', correct: false, explanation: '别名用 AS 关键字' },
      ],
    },
    {
      type: 'type-it',
      instruction: '查询年龄大于 18 的学生姓名和城市：',
      code: "SELECT name, city FROM students WHERE age > 18;",
      hints: [
        'SELECT 后跟要查的列名',
        'WHERE 后跟条件 age > 18',
        '可以只选关心的列，不用 *',
      ],
    },
    {
      type: 'exposition',
      text: 'ORDER BY 排序：\n- 默认升序（ASC）\n- DESC 表示降序',
      code: 'SELECT name, age FROM students ORDER BY age;\n-- 年龄从小到大\n\nSELECT name, age FROM students ORDER BY age DESC;\n-- 年龄从大到小',
    },
    {
      type: 'multiple-choice',
      question: 'ORDER BY age DESC 表示什么？',
      options: [
        { text: '按年龄升序', correct: false, explanation: 'DESC 表示降序（从大到小）' },
        { text: '按年龄降序', correct: true, explanation: 'DESC = descending，降序' },
        { text: '只显示年龄列', correct: false, explanation: 'ORDER BY 控制排序，不控制显示列' },
        { text: '按名字排序', correct: false, explanation: '按 age 列排序，不是名字' },
      ],
    },
    {
      type: 'predict-output',
      instruction: 'students 表数据如下，猜猜查询结果：',
      code: '-- id | name | age\n-- 1  | 张三  | 20\n-- 2  | 李四  | 22\n-- 3  | 王五  | 19\n-- 4  | 赵六  | 25\n\nSELECT name FROM students WHERE age >= 20 ORDER BY age LIMIT 2;\n\n-- 返回哪些名字？',
      expectedOutput: '张三, 李四（年龄 >=20 的有张三20、李四22、赵六25，排序后取前两个）',
      options: [
        { text: '张三, 李四', correct: true, explanation: '年龄>=20 的有 3 行，排序后取前 2 个' },
        { text: '王五, 张三', correct: false, explanation: '王五 19 不满足 age>=20' },
        { text: '赵六, 李四', correct: false, explanation: '排序后年龄小的在前，赵六 25 排最后' },
        { text: '张三, 王五', correct: false, explanation: '王五 19 不满足条件' },
      ],
    },
    {
      type: 'exposition',
      text: 'DISTINCT 去重：\n同一列中有重复值时，只返回不同的值。',
      code: 'SELECT city FROM students;\n-- 北京、上海、北京、广州\n\nSELECT DISTINCT city FROM students;\n-- 北京、上海、广州（去重）',
    },
    {
      type: 'compare-snippets',
      instruction: '对比普通查询和 DISTINCT 查询的区别：',
      question: '下面哪个查询能拿到所有不重复的城市名？',
      snippets: [
        {
          id: 's1',
          title: '普通查询',
          code: 'SELECT city FROM students;\n-- 结果：北京、上海、北京、广州',
          correct: false,
          badge: '有重复',
          explanation: '普通 SELECT 会包含重复值',
        },
        {
          id: 's2',
          title: 'DISTINCT 查询',
          code: 'SELECT DISTINCT city FROM students;\n-- 结果：北京、上海、广州',
          correct: true,
          badge: '去重',
          explanation: 'DISTINCT 去掉重复值，只保留不同的值',
        },
      ],
      compareBy: 'output',
    },
    {
      type: 'fill-in',
      prompt: '补全查询：找出 age 最小的前 3 个学生姓名：',
      template: 'SELECT name FROM students\n____ BY age\n____ 3;',
      answers: ['ORDER', 'LIMIT'],
      hints: ['排序用 ORDER BY', '限制行数用 LIMIT'],
    },
    {
      type: 'multiple-choice',
      question: 'SQL 子句的正确顺序是什么？',
      options: [
        { text: 'SELECT → FROM → WHERE → ORDER BY → LIMIT', correct: true, explanation: '这是 SQL 中正确的子句顺序' },
        { text: 'SELECT → WHERE → FROM → LIMIT → ORDER BY', correct: false, explanation: 'FROM 必须在 WHERE 之前' },
        { text: 'FROM → SELECT → WHERE → ORDER BY → LIMIT', correct: false, explanation: 'SELECT 在 FROM 之前' },
        { text: 'SELECT → FROM → LIMIT → WHERE → ORDER BY', correct: false, explanation: 'WHERE 在 ORDER BY 和 LIMIT 之前' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合查询：查北京的学生，按年龄降序，只取第一行：',
      code: "SELECT name, age FROM students WHERE city = '北京' ORDER BY age DESC LIMIT 1;",
      hints: [
        "WHERE 条件 city = '北京'",
        'DESC 降序排列',
        'LIMIT 1 只取第一行',
      ],
    },
    {
      type: 'exposition',
      text: '这节课的要点：\n- SELECT + FROM + WHERE + ORDER BY + LIMIT\n- 子句有固定顺序\n- 先用 WHERE 过滤，再排序，最后 LIMIT\n- DISTINCT 去重',
    },
  ],
}

export default lesson
