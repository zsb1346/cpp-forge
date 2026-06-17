import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-data-types',
    chapter: 1,
    title: 'MySQL 数据类型详解',
    subtitle: 'CHAR · VARCHAR · INT · DECIMAL · DATE · DATETIME',
    description: '掌握 MySQL 常见数据类型的区别与选择场景。',
    objectives: [
      '区分 CHAR 和 VARCHAR 的适用场景',
      '区分 INT 和 DECIMAL 的精度差异',
      '区分 DATE 和 DATETIME 的范围不同',
      '能根据业务需求选择合适的数据类型',
    ],
    estimatedMinutes: 12,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.data-types', label: '数据类型' },
      ],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '我们要建一张表来存学生信息。\n学号用什么类型？姓名呢？\n年龄呢？成绩呢？\n\n类型选不对，后面会出大问题。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'MySQL 的数据类型很多，\n但最常用的可以归为三类：\n\n1. 字符串：CHAR、VARCHAR\n2. 数字：INT、DECIMAL\n3. 日期时间：DATE、DATETIME',
    },
    {
      type: 'concept-cards',
      instruction: '三大类六种类型速览：',
      cards: [
        {
          term: 'CHAR(n)',
          meaning: '固定长度字符串，不足补空格',
          example: 'CHAR(10) 始终占 10 字符',
        },
        {
          term: 'VARCHAR(n)',
          meaning: '可变长度字符串，按实际长度存',
          example: 'VARCHAR(10) 存"Hi"只占 2 字符',
        },
        {
          term: 'INT',
          meaning: '整数，无小数部分',
          example: '年龄、数量、计数',
        },
        {
          term: 'DECIMAL(m,d)',
          meaning: '精确小数，m 总位数 d 小数位',
          example: 'DECIMAL(10,2) 存金额',
        },
        {
          term: 'DATE',
          meaning: '仅日期，无时间部分',
          example: '2024-01-15',
        },
        {
          term: 'DATETIME',
          meaning: '日期+时间，精确到秒',
          example: '2024-01-15 14:30:00',
        },
      ],
    },
    {
      type: 'scroll-narrative',
      sections: [
        {
          text: '我们要创建一张学生表。\n先想好学号用什么类型。\n学号是固定长度，比如 12 位。',
          code: 'CREATE TABLE student (\n  stu_id CHAR(12),\n  -- 固定 12 位\n  name VARCHAR(50),\n  -- ...\n);',
          highlight: 'CHAR(12)',
        },
        {
          text: '姓名字段呢？\n名字有长有短，短的两个字，\n长的四个字甚至更多。\n用 VARCHAR 最合适。',
          code: 'CREATE TABLE student (\n  stu_id CHAR(12),\n  name VARCHAR(50),\n  -- 按实际长度存储\n  age INT,\n  -- ...\n);',
          highlight: 'VARCHAR(50)',
        },
        {
          text: '年龄用 INT。\n年龄是整数，不会出现小数。\n但成绩就不一样了——\n成绩可能有小数（85.5）。',
          code: 'CREATE TABLE student (\n  stu_id CHAR(12),\n  name VARCHAR(50),\n  age INT,\n  score DECIMAL(5,2),\n  -- 总 5 位，小数 2 位\n);',
          highlight: 'DECIMAL(5,2)',
        },
        {
          text: '入学日期用 DATE，\n只需要年月日。\n但注册时间呢？\n需要精确到几点几分。\n那就用 DATETIME。',
          code: 'CREATE TABLE student (\n  stu_id CHAR(12),\n  name VARCHAR(50),\n  age INT,\n  score DECIMAL(5,2),\n  enroll_date DATE,\n  created_at DATETIME\n);',
          highlight: 'DATE / DATETIME',
        },
      ],
    },
    {
      type: 'exposition',
      text: 'CHAR vs VARCHAR 是面试高频题。\n它们最大的区别在于：\nCHAR 固定长度，VARCHAR 可变。\n\nCHAR 适合长度固定的数据，\n如性别、学号、身份证号。\n\nVARCHAR 适合长度变化大的数据，\n如姓名、地址、简介。',
    },
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
        layout: 'split-table',
      },
      scenes: [
        {
          narration: 'CHAR(10) 存入 "abc"：\n固定占 10 个字符，\n后面补 7 个空格。\n读取时会自动去掉空格。',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'type-compare',
              headers: ['特性', 'CHAR(10)', 'VARCHAR(10)'],
              rows: [
                ['存入"abc"', '占 10 字符', '占 3 字符'],
                ['存储空间', '固定', '可变'],
                ['存取速度', '略快', '略慢'],
                ['适用场景', '固定长度', '可变长度'],
              ],
              highlightedRows: [0],
              fadedRows: [1, 2, 3],
            },
          ],
        },
        {
          narration: 'VARCHAR(10) 存入 "abc"：\n只占 3 个字符 + 1 字节长度。\n长度可变，省空间。\n但每次存取要多算长度。',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'type-compare',
              headers: ['特性', 'CHAR(10)', 'VARCHAR(10)'],
              rows: [
                ['存入"abc"', '占 10 字符', '占 3+1 字符'],
                ['存储空间', '固定', '可变'],
                ['存取速度', '略快', '略慢'],
                ['适用场景', '固定长度', '可变长度'],
              ],
              highlightedRows: [0, 1],
              fadedRows: [2, 3],
            },
          ],
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '身份证号（18 位）应该用什么类型？',
      options: [
        {
          text: 'INT',
          correct: false,
          explanation: '18 位数字超出 INT 范围，且身份证号不是数值，不需要计算。',
        },
        {
          text: 'CHAR(18)',
          correct: true,
          explanation: '身份证号长度固定为 18 位，CHAR(18) 是最高效的选择。',
        },
        {
          text: 'VARCHAR(18)',
          correct: false,
          explanation: 'VARCHAR 适合可变长度，身份证长度固定，用 CHAR 更好。',
        },
        {
          text: 'DECIMAL(18,0)',
          correct: false,
          explanation: '身份证号含字母（如 X），不能用数值类型。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '商品价格应该用什么类型？',
      options: [
        {
          text: 'INT',
          correct: false,
          explanation: 'INT 没有小数部分，价格如 19.99 无法存储。',
        },
        {
          text: 'FLOAT',
          correct: false,
          explanation: 'FLOAT 是近似值，金额计算会产生误差。',
        },
        {
          text: 'DECIMAL(10,2)',
          correct: true,
          explanation: 'DECIMAL 是精确小数，适合金额这种不能有误差的场景。',
        },
        {
          text: 'VARCHAR',
          correct: false,
          explanation: '字符串不能做数学计算，不能用来存价格。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '用户注册时间应该用什么类型？',
      options: [
        {
          text: 'DATE',
          correct: false,
          explanation: '注册时间需要精确到时分秒，DATE 只有年月日。',
        },
        {
          text: 'DATETIME',
          correct: true,
          explanation: 'DATETIME 包含日期和时间，适合记录注册时间这种需要精确时刻的场景。',
        },
        {
          text: 'TIMESTAMP',
          correct: false,
          explanation: 'TIMESTAMP 也能存时间，但有 2038 年上限问题，且依赖时区。',
        },
        {
          text: 'VARCHAR',
          correct: false,
          explanation: '不要用字符串存时间，无法做日期比较和计算。',
        },
      ],
    },
    {
      type: 'compare-snippets',
      instruction: '比较下面两个建表方案：',
      question: '哪个方案更合理？为什么？',
      snippets: [
        {
          id: 'a',
          title: '方案 A',
          code: 'CREATE TABLE user (\n  name VARCHAR(20),\n  gender CHAR(1),\n  salary DECIMAL(10,2),\n  birth DATE\n);',
          correct: true,
          badge: '推荐',
          explanation: '姓名用 VARCHAR（长度不固定），性别用 CHAR(1)（长度固定），工资用 DECIMAL，生日用 DATE——全部匹配业务特点。',
        },
        {
          id: 'b',
          title: '方案 B',
          code: 'CREATE TABLE user (\n  name CHAR(20),\n  gender VARCHAR(1),\n  salary INT,\n  birth DATETIME\n);',
          correct: false,
          badge: '不合理',
          explanation: '名字用 CHAR(20) 浪费空间，性别用 VARCHAR(1) 不如 CHAR(1) 高效，工资用 INT 存不了小数，生日用 DATETIME 多余（只需日期）。',
        },
      ],
      compareBy: 'style',
    },
    {
      type: 'type-it',
      instruction: '创建一个 product 表，\n包含合理的字段类型：',
      code: 'CREATE TABLE product (\n  id INT PRIMARY KEY,\n  name VARCHAR(100),\n  price DECIMAL(8,2),\n  stock INT,\n  description TEXT,\n  created_at DATETIME\n);',
      hints: [
        '主键用 INT',
        '商品名用 VARCHAR',
        '价格用 DECIMAL',
        '库存用 INT',
        '描述用 TEXT',
        '创建时间用 DATETIME',
      ],
    },
    {
      type: 'fill-in',
      prompt: '根据业务描述选择数据类型填空：',
      template: '（1）年龄 → ____\n（2）手机号（11 位） → ____\n（3）年度销售额 → ____',
      answers: ['INT 或 TINYINT', 'CHAR(11)', 'DECIMAL(12,2)'],
      hints: ['年龄是整数，且范围很小', '手机号长度固定', '金额需要精确小数'],
    },
    {
      type: 'exposition',
      text: '还有一个常见误区：\n能用 VARCHAR 就不用 CHAR？\n不对。\n\n固定长度的用 CHAR，\n可变长度的用 VARCHAR。\n\n选对类型可以节省存储空间，\n还能提高查询性能。',
    },
    {
      type: 'exposition',
      text: '对于数字类型，还有两点要注意：\n\n1. INT 有符号范围 -21 亿到 21 亿。\n   存储"点赞数"绰绰有余。\n\n2. DECIMAL 定义精度时，\n   DECIMAL(10,2) 表示总 10 位，\n   小数 2 位，整数 8 位。\n   存 99999999.99 都没问题。',
    },
    {
      type: 'fill-in',
      prompt: 'DECIMAL 含义填空：',
      template: 'DECIMAL(8,2) 表示总共有 ____ 位数字，\n其中 ____ 位是小数部分，\n____ 位是整数部分。',
      answers: ['8', '2', '6'],
      hints: ['第一个数字是总位数', '第二个数字是小数位数', '总位数减去小数位数'],
    },
    {
      type: 'exposition',
      text: '记住一个原则：\n选类型时先想业务含义，\n再看技术特性。\n\n价格不是数，是金额——用 DECIMAL。\nID 不是数，是标识——不够长时用 CHAR。\n学号不是数，是编码——用 CHAR。',
    },
  ],
}

export default lesson
