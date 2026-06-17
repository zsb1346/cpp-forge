import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-ddl',
    chapter: 3,
    title: 'DDL 建库建表',
    subtitle: 'CREATE / DROP / ALTER · 数据类型实战',
    description: '学习用 DDL 语句创建数据库和表，掌握常用数据类型。',
    objectives: [
      '能用 CREATE DATABASE 和 USE 选择数据库',
      '能用 CREATE TABLE 创建带字段的表',
      '理解 INT / VARCHAR / DATE 等常用数据类型',
      '能区分 DROP 和 ALTER 的用途',
    ],
    estimatedMinutes: 14,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.ddl.create', label: 'CREATE 语句' },
        { id: 'sql.ddl.alter', label: 'ALTER 语句' },
        { id: 'sql.ddl.drop', label: 'DROP 语句' },
        { id: 'sql.datatypes', label: '数据类型' },
      ],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '建房子要先打地基，存数据要先建数据库。\nDDL 就是 SQL 中"打地基"的那组命令。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'DDL 全称 Data Definition Language。\n它负责定义数据的"容器"结构，不操作数据本身。',
      code: 'DDL = 定义结构\nDML = 操作数据',
    },
    {
      type: 'concept-cards',
      instruction: '三大 DDL 命令速览：',
      cards: [
        { term: 'CREATE', meaning: '创建数据库或表', example: 'CREATE DATABASE db;' },
        { term: 'ALTER', meaning: '修改已有表的结构', example: 'ALTER TABLE t ADD COLUMN ...' },
        { term: 'DROP', meaning: '删除数据库或表', example: 'DROP TABLE t;' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'DDL 的职责是什么？',
      options: [
        { text: '查询表中的数据', correct: false, explanation: '查询数据属于 DML，不是 DDL' },
        { text: '定义数据的结构', correct: true, explanation: 'DDL 负责创建和修改表结构' },
        { text: '插入新数据行', correct: false, explanation: '插入属于 DML 的 INSERT' },
        { text: '删除数据行', correct: false, explanation: '删除数据也属于 DML' },
      ],
    },
    {
      type: 'exposition',
      text: '第一步：创建数据库。\n数据库就像一个大文件夹，里面放很多表。',
      code: 'CREATE DATABASE shop;  -- 创建一个叫 shop 的数据库\n\nUSE shop;                  -- 切换到 shop 数据库\n-- 后面的操作都在 shop 里进行',
    },
    {
      type: 'type-it',
      instruction: '敲一条 CREATE DATABASE 语句：',
      code: 'CREATE DATABASE school;',
      hints: [
        '关键字 CREATE DATABASE 后跟数据库名',
        '数据库名一般用英文小写',
        '末尾要加分号',
      ],
    },
    {
      type: 'exposition',
      text: '有了数据库，接下来建表。\nCREATE TABLE 是最核心的 DDL 命令：',
      code: 'CREATE TABLE students (\n  id INT,\n  name VARCHAR(50),\n  age INT\n);',
    },
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
      },
      scenes: [
        {
          narration: '先确定表名 students，表示存学生信息',
          mode: 'full',
          elements: [
            { type: 'code', id: 'code1', code: 'CREATE TABLE students (\n  id INT,\n  name VARCHAR(50),\n  age INT\n);', language: 'sql', highlightedLines: [1] },
            { type: 'table', id: 'table1', headers: ['字段名', '类型', '说明'], rows: [['id', 'INT', '整型'], ['name', 'VARCHAR(50)', '变长字符串'], ['age', 'INT', '整型']] },
          ],
        },
        {
          narration: 'id 字段用 INT，存整数类型的学生编号',
          elements: [
            { type: 'code', id: 'code1', code: 'CREATE TABLE students (\n  id INT,\n  name VARCHAR(50),\n  age INT\n);', language: 'sql', highlightedLines: [2] },
            { type: 'table', id: 'table1', headers: ['字段名', '类型', '说明'], rows: [['id', 'INT', '整型'], ['name', 'VARCHAR(50)', '变长字符串'], ['age', 'INT', '整型']], highlightedRows: [0] },
          ],
        },
        {
          narration: 'name 字段用 VARCHAR(50)，最多存 50 个字符的名字',
          elements: [
            { type: 'code', id: 'code1', code: 'CREATE TABLE students (\n  id INT,\n  name VARCHAR(50),\n  age INT\n);', language: 'sql', highlightedLines: [3] },
            { type: 'table', id: 'table1', headers: ['字段名', '类型', '说明'], rows: [['id', 'INT', '整型'], ['name', 'VARCHAR(50)', '变长字符串'], ['age', 'INT', '整型']], highlightedRows: [1] },
          ],
        },
        {
          narration: 'age 字段也是 INT，存年龄整数',
          elements: [
            { type: 'code', id: 'code1', code: 'CREATE TABLE students (\n  id INT,\n  name VARCHAR(50),\n  age INT\n);', language: 'sql', highlightedLines: [4] },
            { type: 'table', id: 'table1', headers: ['字段名', '类型', '说明'], rows: [['id', 'INT', '整型'], ['name', 'VARCHAR(50)', '变长字符串'], ['age', 'INT', '整型']], highlightedRows: [2] },
          ],
        },
      ],
    },
    {
      type: 'exposition',
      text: '常用数据类型：\n- INT：整数\n- VARCHAR(n)：变长字符串，n 是最大长度\n- DATE：日期（年-月-日）\n- DECIMAL(m,n)：精确小数',
      code: 'CREATE TABLE products (\n  id INT,\n  name VARCHAR(100),\n  price DECIMAL(10,2),\n  created_at DATE\n);',
    },
    {
      type: 'multiple-choice',
      question: 'VARCHAR(100) 表示什么？',
      options: [
        { text: '固定 100 个字符', correct: false, explanation: 'VARCHAR 是变长的，只占实际长度' },
        { text: '最多存 100 个字符', correct: true, explanation: 'VARCHAR(100) 表示最多 100 字符' },
        { text: '存 100 个整数', correct: false, explanation: 'VARCHAR 存字符串，不是整数' },
        { text: '存 100 个日期', correct: false, explanation: '日期用 DATE 类型' },
      ],
    },
    {
      type: 'exposition',
      text: 'ALTER TABLE 用来修改已有表的结构。\n可以加列、删列、改列的类型。',
      code: 'ALTER TABLE students\nADD email VARCHAR(100);\n-- 给 students 表增加 email 列\n\nALTER TABLE students\nDROP COLUMN age;\n-- 删除 age 列',
    },
    {
      type: 'choose-next-line',
      instruction: '给 products 表增加一个 stock 列：',
      context: '已有表 products，需加库存字段',
      steps: [
        {
          prompt: '第一行怎么写？',
          options: [
            { line: 'ALTER TABLE products', correct: true, explanation: 'ALTER TABLE 后跟表名' },
            { line: 'ALTER products ADD', correct: false, explanation: '需要完整的 ALTER TABLE 语法' },
            { line: 'CHANGE TABLE products', correct: false, explanation: 'CHANGE TABLE 不是 SQL 关键字' },
          ],
        },
        {
          prompt: '如何加 stock 列？',
          options: [
            { line: 'ADD stock INT;', correct: true, explanation: 'ADD 列名 类型 是正确的语法' },
            { line: 'ADD COLUMN stock;', correct: false, explanation: '缺少数据类型' },
            { line: 'CREATE stock INT;', correct: false, explanation: '修改结构要用 ALTER，不是 CREATE' },
          ],
        },
      ],
      finalCode: 'ALTER TABLE products\nADD stock INT;',
    },
    {
      type: 'type-it',
      instruction: '敲完整的建表语句，包含多种数据类型：',
      code: 'CREATE TABLE orders (\n  id INT,\n  customer_name VARCHAR(50),\n  total DECIMAL(10,2),\n  order_date DATE\n);',
      hints: [
        '每列用逗号分隔，最后一列没有逗号',
        'VARCHAR 要指定长度',
        'DECIMAL(10,2) 表示总共 10 位，小数 2 位',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'DROP TABLE students 会做什么？',
      options: [
        { text: '清空 students 表的数据', correct: false, explanation: '清空数据是 DELETE 或 TRUNCATE' },
        { text: '删除 students 表的结构和数据', correct: true, explanation: 'DROP 会把整张表连结构带数据删除' },
        { text: '重命名 students 表', correct: false, explanation: '重命名用 RENAME TABLE' },
        { text: '修改 students 表的结构', correct: false, explanation: '修改结构用 ALTER TABLE' },
      ],
    },
    {
      type: 'exposition',
      text: 'DROP vs DELETE 的区别：\n- DROP：删除整张表（结构 + 数据），不可恢复\n- DELETE：只删数据，表还在\n- TRUNCATE：清空数据，但保留表结构',
      code: 'DROP TABLE students;    -- 表消失\nDELETE FROM students;  -- 数据没了，表还在\nTRUNCATE students;     -- 清数据，速度比 DELETE 快',
    },
    {
      type: 'fill-in',
      prompt: '补全语句：创建一个 categories 表，包含 id 和 name 字段：',
      template: 'CREATE TABLE categories (\n  ____ INT,\n  name ____\n);',
      answers: ['id', 'VARCHAR(50)'],
      hints: ['id 是整数，用 INT', 'name 是字符串，用 VARCHAR'],
    },
    {
      type: 'exposition',
      text: '数据类型选择小贴士：\n- 数字用 INT 或 DECIMAL\n- 短文本用 VARCHAR(n)\n- 日期用 DATE\n- 是/否用 BOOLEAN 或 TINYINT',
    },
    {
      type: 'multiple-choice',
      question: '要存商品价格（精确到分），用什么类型？',
      options: [
        { text: 'INT', correct: false, explanation: 'INT 是整数，不能存小数' },
        { text: 'VARCHAR', correct: false, explanation: 'VARCHAR 存文本，不能做数学运算' },
        { text: 'DECIMAL(10,2)', correct: true, explanation: 'DECIMAL 能精确存小数，适合金额' },
        { text: 'DATE', correct: false, explanation: 'DATE 存日期，不能存价格' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习完整的数据库操作流程：',
      code: 'CREATE DATABASE bookstore;\nUSE bookstore;\nCREATE TABLE books (\n  id INT,\n  title VARCHAR(200),\n  price DECIMAL(10,2)\n);',
      hints: [
        '先建库，再 USE，最后建表',
        '注意每句以分号结尾',
        'VARCHAR 长度要够存书名',
      ],
    },
    {
      type: 'exposition',
      text: '今天学的 DDL 三兄弟：\n- CREATE 建库建表\n- ALTER 改表结构\n- DROP 删库删表\n\n记住：DDL 操作的都是"结构"，不是"数据"。',
    },
  ],
}

export default lesson
