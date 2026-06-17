import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-join-subquery',
    chapter: 3,
    title: 'JOIN 与子查询',
    subtitle: 'INNER / LEFT · 子查询嵌套',
    description: '学习用 JOIN 关联多张表，用子查询嵌套查询。',
    objectives: [
      '理解 INNER JOIN 和 LEFT JOIN 的区别',
      '能用 JOIN 关联两张表查询数据',
      '理解子查询的概念和执行流程',
      '能写简单的子查询',
    ],
    estimatedMinutes: 15,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.join.inner', label: 'INNER JOIN' },
        { id: 'sql.join.left', label: 'LEFT JOIN' },
        { id: 'sql.subquery', label: '子查询' },
      ],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '真实世界的数据，不会只存在一张表里。\n用户和订单分开存，订单和商品也分开存。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'JOIN 就是"把两张表拼在一起"的工具。\n通过共用的"键"，把相关的行连起来。',
      code: '-- 两张表通过 id 关联\nSELECT * FROM students\nJOIN scores ON students.id = scores.student_id;',
    },
    {
      type: 'concept-cards',
      instruction: '三种常用 JOIN：',
      cards: [
        { term: 'INNER JOIN', meaning: '只保留两表匹配的行', example: 'A JOIN B ON A.id = B.aid' },
        { term: 'LEFT JOIN', meaning: '保留左表全部，右表无匹配填 NULL', example: 'A LEFT JOIN B ON A.id = B.aid' },
        { term: 'ON 条件', meaning: '指定两表如何匹配', example: 'ON users.id = orders.user_id' },
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
          narration: '两张原始表：students（左）和 scores（右）',
          mode: 'full',
          elements: [
            { type: 'table', id: 't1', headers: ['id', 'name'], rows: [[1, '张三'], [2, '李四'], [3, '王五']] },
            { type: 'text', id: 'spacer', content: '', variant: 'body' },
            { type: 'table', id: 't2', headers: ['student_id', 'score'], rows: [[1, 85], [2, 92], [4, 78]] },
          ],
        },
        {
          narration: 'INNER JOIN：只有双方都匹配的行才留下。王五没成绩被排除，赵六不在学生表也被排除。',
          elements: [
            { type: 'code', id: 'c1', code: 'SELECT s.name, sc.score FROM students s\nINNER JOIN scores sc ON s.id = sc.student_id;', language: 'sql' },
            { type: 'table', id: 't3', headers: ['name', 'score'], rows: [['张三', 85], ['李四', 92]] },
          ],
        },
        {
          narration: 'LEFT JOIN：左表 students 全部保留。王五没成绩，score 显示 NULL。',
          elements: [
            { type: 'code', id: 'c1', code: 'SELECT s.name, sc.score FROM students s\nLEFT JOIN scores sc ON s.id = sc.student_id;', language: 'sql' },
            { type: 'table', id: 't3', headers: ['name', 'score'], rows: [['张三', 85], ['李四', 92], ['王五', 'NULL']] },
          ],
        },
      ],
    },
    {
      type: 'exposition',
      text: 'INNER JOIN 就像"交集"：两表都有才留。\nLEFT JOIN 就像"左表全部加右表补充"：左表一定有。',
    },
    {
      type: 'compare-snippets',
      instruction: '对比 INNER JOIN 和 LEFT JOIN 的结果：',
      question: '哪个查询能查到所有学生（包括没成绩的）？',
      snippets: [
        {
          id: 'ij',
          title: 'INNER JOIN',
          code: "SELECT s.name, sc.score\nFROM students s\nINNER JOIN scores sc\nON s.id = sc.student_id;",
          correct: false,
          badge: '有成绩',
          explanation: 'INNER JOIN 只返回有成绩的学生',
        },
        {
          id: 'lj',
          title: 'LEFT JOIN',
          code: "SELECT s.name, sc.score\nFROM students s\nLEFT JOIN scores sc\nON s.id = sc.student_id;",
          correct: true,
          badge: '全部学生',
          explanation: 'LEFT JOIN 返回所有学生，没成绩的显示 NULL',
        },
      ],
      compareBy: 'output',
    },
    {
      type: 'multiple-choice',
      question: 'LEFT JOIN 保留哪张表的全部数据？',
      options: [
        { text: '右表全部', correct: false, explanation: 'LEFT JOIN 保留左表全部' },
        { text: '左表全部', correct: true, explanation: 'LEFT JOIN = 左表所有行都保留' },
        { text: '两张表都保留全部', correct: false, explanation: 'LEFT JOIN 只保证左表全部保留' },
        { text: '不保留任何表', correct: false, explanation: 'LEFT JOIN 至少保留左表全部' },
      ],
    },
    {
      type: 'type-it',
      instruction: '查询每个学生的姓名和对应的成绩：',
      code: "SELECT s.name, sc.score FROM students s INNER JOIN scores sc ON s.id = sc.student_id;",
      hints: [
        '给表起别名：students s，scores sc',
        '关联条件：s.id = sc.student_id',
        'SELECT 里用别名.列名',
      ],
    },
    {
      type: 'exposition',
      text: '表别名让查询更简洁：\n- `FROM students s` 给 students 起别名 s\n- 用 `s.name` 而不是 `students.name`\n- 多表查询中别名几乎是必须的',
    },
    {
      type: 'multiple-choice',
      question: 'ON s.id = sc.student_id 的作用是什么？',
      options: [
        { text: '给两个表排序', correct: false, explanation: 'ON 指定关联条件，不是排序' },
        { text: '指定哪两列相关联', correct: true, explanation: 'ON 说明左表的 id = 右表的 student_id' },
        { text: '过滤结果行', correct: false, explanation: '过滤用 WHERE，ON 是 JOIN 的条件' },
        { text: '创建新列', correct: false, explanation: 'ON 不创建列，只关联行' },
      ],
    },
    {
      type: 'scroll-narrative',
      sections: [
        {
          text: '子查询就是"查询里嵌套另一个查询"。\n先执行内层查询，结果作为外层查询的输入。',
          code: '-- 先查"平均年龄"，再查"年龄大于平均值的"\nSELECT * FROM students\nWHERE age > (\n  SELECT AVG(age) FROM students\n);',
        },
        {
          text: '内层查询 `SELECT AVG(age)` 先算出一个数值。\n然后外层查询用这个数值做条件过滤。',
          code: '-- 内层先执行：SELECT AVG(age) FROM students → 22\n-- 外层再执行：SELECT * FROM students WHERE age > 22',
          highlight: '> (',
        },
        {
          text: '也可以用在 FROM 里——把子查询结果当成一张临时表。',
          code: 'SELECT * FROM (\n  SELECT * FROM students WHERE age > 20\n) AS adults\nWHERE city = \'北京\';',
        },
      ],
    },
    {
      type: 'predict-output',
      instruction: '猜猜这个子查询的结果：',
      code: "-- students 表：\n-- id | name | age\n-- 1  | 张三  | 20\n-- 2  | 李四  | 22\n-- 3  | 王五  | 19\n-- 4  | 赵六  | 25\n\nSELECT name FROM students\nWHERE age > (\n  SELECT AVG(age) FROM students\n);\n\n-- 平均年龄是？谁大于平均年龄？",
      expectedOutput: '平均年龄 21.5。年龄大于 21.5 的是 李四(22) 和 赵六(25)。',
      options: [
        { text: '张三(20), 李四(22)', correct: false, explanation: '平均年龄 21.5，张三 20 小于平均值' },
        { text: '李四(22), 赵六(25)', correct: true, explanation: '平均 age 21.5，22 和 25 都大于 21.5' },
        { text: '全部', correct: false, explanation: '王五 19 和 张三 20 都小于平均年龄' },
        { text: '赵六(25)', correct: false, explanation: '李四 22 也大于 21.5' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全子查询：找出年龄最大的学生：',
      template: "SELECT name FROM students\nWHERE age = (\n  ____ MAX(age) ____ students\n);",
      answers: ['SELECT', 'FROM'],
      hints: ['子查询以 SELECT 开头', 'FROM 后跟表名'],
    },
    {
      type: 'exposition',
      text: '子查询的两种使用位置：\n- WHERE 子句：把结果当条件\n- FROM 子句：把结果当临时表（需要别名）',
      code: '-- 子查询在 WHERE 中\nWHERE age > (SELECT AVG(age) FROM students)\n\n-- 子查询在 FROM 中\nFROM (SELECT * FROM students WHERE age > 20) AS t',
    },
    {
      type: 'multiple-choice',
      question: '子查询 `(SELECT AVG(age) FROM students)` 返回什么？',
      options: [
        { text: '所有学生的年龄列表', correct: false, explanation: 'AVG 是聚合函数，返回单个数值' },
        { text: '一个数字（平均年龄）', correct: true, explanation: 'AVG 返回单一值，可当作标量使用' },
        { text: '一张新表', correct: false, explanation: 'AVG 返回一个值，不是表' },
        { text: '报错', correct: false, explanation: '这是标准标量子查询，语法正确' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习 JOIN：查询用户及其订单信息：',
      code: "SELECT u.name, o.product, o.quantity FROM users u INNER JOIN orders o ON u.id = o.user_id;",
      hints: [
        'u 是 users 的别名，o 是 orders 的别名',
        'ON 条件是 u.id = o.user_id',
        'SELECT 选需要的列即可',
      ],
    },
    {
      type: 'exposition',
      text: '这节课的两个核心：\n- JOIN：把多张表"拼"在一起查\n- 子查询：嵌套查询，内层结果给外层用\n\nJOIN 是横向扩展（加列），子查询是纵向嵌套（加条件）。',
    },
  ],
}

export default lesson
