import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-ddl-practice',
    chapter: 3,
    title: 'DDL 建表专项练习',
    subtitle: '语法打字 · 建表改错',
    description: '通过打字和改错练习，巩固 CREATE TABLE 和 ALTER TABLE 的写法。',
    objectives: [
      '能快速写出带多种数据类型的 CREATE TABLE',
      '能识别并修复 DDL 语句中的语法错误',
      '能正确排序 DDL 命令的执行流程',
    ],
    estimatedMinutes: 12,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.ddl.create', label: 'CREATE 语句' },
        { id: 'sql.ddl.alter', label: 'ALTER 语句' },
        { id: 'sql.ddl.drop', label: 'DROP 语句' },
        { id: 'sql.datatypes', label: '数据类型' },
      ],
      contentKinds: ['practice'],
      stage: 'recall',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '纸上谈兵结束了。现在轮到你的手指来记住 DDL。',
    },
    {
      type: 'type-it',
      instruction: '创建一个 employees 表，包含 id、name 和 salary：',
      code: 'CREATE TABLE employees (\n  id INT,\n  name VARCHAR(50),\n  salary DECIMAL(10,2)\n);',
      hints: [
        '三列：id(INT), name(VARCHAR), salary(DECIMAL)',
        'DECIMAL(10,2) 适合存工资',
        '最后一列后面不要逗号',
      ],
    },
    {
      type: 'type-it',
      instruction: '创建一张完整的订单表：',
      code: 'CREATE TABLE orders (\n  id INT,\n  product VARCHAR(100),\n  quantity INT,\n  price DECIMAL(8,2),\n  order_date DATE\n);',
      hints: [
        '五列：id, product, quantity, price, order_date',
        'DATE 类型不需要指定长度',
        'DECIMAL(8,2) 表示最多 8 位，其中 2 位小数',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'ALTER TABLE 时，新增列的关键字是什么？',
      options: [
        { text: 'CREATE COLUMN', correct: false, explanation: 'ALTER 内部用 ADD 新增列' },
        { text: 'ADD', correct: true, explanation: 'ALTER TABLE t ADD COLUMN 是标准语法' },
        { text: 'INSERT', correct: false, explanation: 'INSERT 是 DML，用来加数据，不是加列' },
        { text: 'NEW', correct: false, explanation: 'NEW 不是 SQL 关键字' },
      ],
    },
    {
      type: 'fix-code',
      instruction: '下面这条 CREATE TABLE 有语法错误。找出来并修正。',
      buggyCode: 'CREATE TABLE users\n  id INT,\n  name VARCHAR(50),\n  age INT\n);',
      goal: '修正语法错误，让语句能正确执行。',
      fixes: [
        { text: '第一行末尾加左括号 (', correct: true, explanation: 'CREATE TABLE users ( 需要在表名后跟左括号' },
        { text: '把 VARCHAR 改成 INT', correct: false, explanation: 'VARCHAR 类型本身没错，问题是缺少左括号' },
        { text: '删掉最后一行的 )', correct: false, explanation: '右括号是对的，但缺了左括号' },
        { text: '把 id INT 改成 id VARCHAR', correct: false, explanation: 'id 用 INT 是合理的，问题是缺少左括号' },
      ],
      mode: 'choose-fix',
    },
    {
      type: 'type-it',
      instruction: '把刚才的错误语句修正后敲一遍：',
      code: 'CREATE TABLE users (\n  id INT,\n  name VARCHAR(50),\n  age INT\n);',
      hints: [
        'CREATE TABLE 表名 ( 列定义 )',
        '左括号在表名之后',
        '右括号之后加分号',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'DROP DATABASE shop 会怎样？',
      options: [
        { text: '只删除 shop 中的一张表', correct: false, explanation: 'DROP DATABASE 删整个库，不是一张表' },
        { text: '删除 shop 数据库及其所有表', correct: true, explanation: 'DROP DATABASE 把整个库和里面的表全删了' },
        { text: '清空 shop 的数据但保留结构', correct: false, explanation: '那是 TRUNCATE 或 DELETE，不是 DROP DATABASE' },
        { text: '报错，必须先 USE shop', correct: false, explanation: 'DROP DATABASE 不需要先 USE，直接指定库名即可' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '把 DDL 命令和它的功能配对（按正确顺序排列）：',
      fragments: [
        'CREATE TABLE → 创建新表',
        'ALTER TABLE → 修改表结构',
        'DROP TABLE → 删除整张表',
        'TRUNCATE → 清空表数据',
      ],
      distractors: [
        'INSERT INTO → 插入数据行',
        'SELECT → 查询数据',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 ALTER TABLE 语句：给 employees 表增加 hire_date 列：',
      template: '____ employees\nADD ____ DATE;',
      answers: ['ALTER TABLE', 'hire_date'],
      hints: ['修改表用 ALTER TABLE', '新列名后跟类型'],
    },
    {
      type: 'choose-next-line',
      instruction: '创建一张 courses 表，分两步完成：',
      context: '需要建一张课程表，有 id, title, credits 三个字段',
      steps: [
        {
          prompt: '第一行怎么写？',
          options: [
            { line: 'CREATE TABLE courses (', correct: true, explanation: 'CREATE TABLE 表名 ( 是标准开头' },
            { line: 'CREATE courses TABLE (', correct: false, explanation: '关键字顺序是 CREATE TABLE' },
            { line: 'NEW TABLE courses (', correct: false, explanation: '建表要用 CREATE，不是 NEW' },
          ],
        },
        {
          prompt: 'id 和 title 字段怎么定义？',
          options: [
            { line: 'id INT,\n  title VARCHAR(100),', correct: true, explanation: 'id 用 INT，title 用 VARCHAR' },
            { line: 'id VARCHAR,\n  title INT,', correct: false, explanation: 'id 一般用 INT，title 应该是 VARCHAR' },
            { line: 'id INT title VARCHAR(100),', correct: false, explanation: '字段定义要用逗号分隔' },
          ],
        },
      ],
      finalCode: 'CREATE TABLE courses (\n  id INT,\n  title VARCHAR(100),\n  credits INT\n);',
    },
    {
      type: 'fix-code',
      instruction: 'ALTER TABLE 语句也有问题。',
      buggyCode: 'ALTER TABLE students\nADD age;',
      goal: '给 students 表添加 age 列，类型为 INT。',
      fixes: [
        { text: 'ADD age INT', correct: true, explanation: 'ADD 列名 类型，缺少类型会报错' },
        { text: 'ADD INT age', correct: false, explanation: '类型在列名之后' },
        { text: 'CREATE age INT', correct: false, explanation: 'ALTER 内部用 ADD，不用 CREATE' },
        { text: 'ADD age VARCHAR', correct: false, explanation: '年龄应该是 INT，不是 VARCHAR' },
      ],
      mode: 'choose-fix',
    },
    {
      type: 'multiple-choice',
      question: '为什么 VARCHAR 要指定长度（如 VARCHAR(50)）？',
      options: [
        { text: '不指定长度会报语法错误', correct: true, explanation: 'VARCHAR 必须指定最大长度' },
        { text: '长度越长查询越快', correct: false, explanation: 'VARCHAR 越长反而可能更慢' },
        { text: 'VARCHAR 不存数据，只存长度', correct: false, explanation: 'VARCHAR 存的是字符串，长度是约束' },
        { text: '长度只对中文有效', correct: false, explanation: '长度对所有字符都有效' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合练习：创建一张完整的库存表：',
      code: 'CREATE TABLE inventory (\n  item_id INT,\n  item_name VARCHAR(100),\n  quantity INT,\n  warehouse VARCHAR(50),\n  last_updated DATE\n);',
      hints: [
        'item_id 用 INT 作为编号',
        'item_name 用 VARCHAR(100)',
        'last_updated 记录日期',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面的表设计，哪个数据类型最合适？\n列：is_active（表示是否启用）',
      options: [
        { text: 'VARCHAR(10)', correct: false, explanation: '存是/否用布尔类型更合适' },
        { text: 'INT', correct: false, explanation: 'INT 浪费空间，布尔有专门的类型' },
        { text: 'BOOLEAN 或 TINYINT', correct: true, explanation: '布尔值用 BOOLEAN 或 TINYINT(1) 更合适' },
        { text: 'DATE', correct: false, explanation: 'DATE 存日期，不适合存布尔状态' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全删除列的 ALTER TABLE 语句：',
      template: 'ALTER TABLE products\n____ COLUMN price;',
      answers: ['DROP'],
      hints: ['删除列用 DROP COLUMN'],
    },
    {
      type: 'exposition',
      text: '回顾一下练习中的关键点：\n- CREATE TABLE 后要跟左括号\n- 每列写 列名 + 类型\n- VARCHAR 必须指定长度\n- ALTER 用 ADD / DROP 修改列',
    },
  ],
}

export default lesson
