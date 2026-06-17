import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-data-types-practice',
    chapter: 1,
    title: '数据类型选择实战',
    subtitle: '场景判断 · 类型选用',
    description: '根据业务需求判断应该使用哪种 MySQL 数据类型。',
    objectives: [
      '根据业务场景选择合适的数据类型',
      '能识别建表语句中的类型错误',
    ],
    estimatedMinutes: 15,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.data-types', label: '数据类型' },
      ],
      contentKinds: ['practice'],
      stage: 'discrimination',
    },
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '业务需求：存用户昵称，\n最长 50 字，但大部分很短。\n应该选什么类型？',
      options: [
        {
          text: 'CHAR(50)',
          correct: false,
          explanation: '大部分昵称很短，但 CHAR(50) 每次都占 50 字符，浪费空间。',
        },
        {
          text: 'VARCHAR(50)',
          correct: true,
          explanation: '按实际长度存储，"Tom"只占 3 字符，高效又灵活。',
        },
        {
          text: 'TEXT',
          correct: false,
          explanation: 'TEXT 适合大段文本，昵称很短，用 VARCHAR 更高效。',
        },
        {
          text: 'CHAR(10)',
          correct: false,
          explanation: '最长 50 字，CHAR(10) 存不下。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '业务需求：存图书 ISBN，\n固定 13 位数字。应该选什么？',
      options: [
        {
          text: 'INT',
          correct: false,
          explanation: '13 位数字超出 INT 范围（最大 21 亿），且 ISBN 是编码不是数值。',
        },
        {
          text: 'CHAR(13)',
          correct: true,
          explanation: 'ISBN 长度固定为 13，用 CHAR(13) 最合适。',
        },
        {
          text: 'VARCHAR(13)',
          correct: false,
          explanation: '虽然也能存，但长度固定时 CHAR 效率更高。',
        },
        {
          text: 'DECIMAL(13,0)',
          correct: false,
          explanation: 'ISBN 不是用来计算的数字，不应该用数值类型。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '业务需求：存员工的月薪，\n可能有小数（如 8500.50）。\n应该选什么？',
      options: [
        {
          text: 'INT',
          correct: false,
          explanation: 'INT 存不了小数，8500.50 会被截断为 8500。',
        },
        {
          text: 'FLOAT',
          correct: false,
          explanation: 'FLOAT 是近似值，金额计算会产生 0.01 级的误差，不能用于钱。',
        },
        {
          text: 'DECIMAL(10,2)',
          correct: true,
          explanation: 'DECIMAL 精确存储，适合工资、价格等不能有误差的场景。',
        },
        {
          text: 'DOUBLE',
          correct: false,
          explanation: 'DOUBLE 也是近似值，同样不适合金额。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '业务需求：存文章的发布日期。\n只需要年月日，不需要时间。\n应该选什么？',
      options: [
        {
          text: 'DATETIME',
          correct: false,
          explanation: 'DATETIME 包含时间部分，不需要的精度反而浪费空间。',
        },
        {
          text: 'DATE',
          correct: true,
          explanation: 'DATE 只存年月日，正好满足需求。',
        },
        {
          text: 'TIMESTAMP',
          correct: false,
          explanation: 'TIMESTAMP 跟时区有关且包含时间，纯日期用 DATE 就够了。',
        },
        {
          text: 'VARCHAR',
          correct: false,
          explanation: '不要用字符串存时间，无法做日期比较和排序。',
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: '给下面的需求选类型：',
      template: '（1）点赞数（0~99999）→ ____\n（2）电子邮件地址 → ____\n（3）性别（男/女/其他）→ ____',
      answers: ['INT', 'VARCHAR(100)', 'CHAR(1)'],
      hints: ['点赞数是整数，范围不大', '邮箱长度不固定', '只需 1 个字符'],
    },
    {
      type: 'predict-output',
      instruction: '下面的 INSERT 语句执行后，\nprice 字段实际存进去的值是多少？',
      code: 'CREATE TABLE product (\n  price DECIMAL(5,2)\n);\nINSERT INTO product VALUES (123.456);',
      expectedOutput: '123.46（四舍五入保留 2 位小数）',
      options: [
        {
          text: '123.456，原样存储',
          correct: false,
          explanation: 'DECIMAL(5,2) 只能存 2 位小数，多余位数会四舍五入。',
        },
        {
          text: '123.46',
          correct: true,
          explanation: 'DECIMAL(5,2) 保留两位小数，第三位 6 会进位。',
        },
        {
          text: '123.45',
          correct: false,
          explanation: '不是直接截断，而是四舍五入，456 的第三位是 6，应该进 1。',
        },
        {
          text: '报错',
          correct: false,
          explanation: 'MySQL 不会报错，会自动四舍五入到指定位数。',
        },
      ],
    },
    {
      type: 'predict-output',
      instruction: '猜一下下面这个插入的结果：',
      code: 'CREATE TABLE t (\n  val CHAR(5)\n);\nINSERT INTO t VALUES (\'ab\');\nSELECT LENGTH(val) FROM t;',
      expectedOutput: '结果是 5（CHAR 补空格到固定长度）',
      options: [
        {
          text: '2',
          correct: false,
          explanation: '虽然存的是"ab"，但 CHAR(5) 会补空格到 5 位。取数据时自动去空格，但 LENGTH 函数算的是存储长度。',
        },
        {
          text: '5',
          correct: true,
          explanation: 'CHAR(5) 存入"ab"后实际存储为"ab   "（5 字符），LENGTH 返回 5。',
        },
        {
          text: '3',
          correct: false,
          explanation: 'CHAR 不是 VARCHAR，会补齐到指定长度。',
        },
        {
          text: '不确定',
          correct: false,
          explanation: 'CHAR 的填充行为是确定的，LENGTH 返回字段定义长度。',
        },
      ],
    },
    {
      type: 'fix-code',
      instruction: '下面建表语句中，\n哪些字段类型选错了？',
      buggyCode: 'CREATE TABLE student (\n  id INT,\n  name CHAR(50),      -- 问题\n  gender VARCHAR(1),   -- 问题\n  score FLOAT,         -- 问题\n  birthday DATETIME    -- 问题\n);',
      goal: '根据业务调整类型：姓名最长 10 字，\n性别 1 字符，成绩精确到 2 位小数，\n生日只需要日期',
      mode: 'choose-fix',
      fixes: [
        {
          text: 'name→VARCHAR(10),\ngender→CHAR(1),\nscore→DECIMAL(5,2),\nbirthday→DATE',
          correct: true,
          explanation: '名字用 VARCHAR(10) 省空间，性别用 CHAR(1) 合理，成绩用 DECIMAL(5,2) 精确，生日用 DATE 只存日期。',
        },
        {
          text: 'name→TEXT,\ngender→CHAR(2),\nscore→INT,\nbirthday→VARCHAR',
          correct: false,
          explanation: 'TEXT 太长，分数用 INT 无小数，生日用字符串无法比较。',
        },
        {
          text: 'name→CHAR(10),\ngender→CHAR(2),\nscore→DOUBLE,\nbirthday→DATE',
          correct: false,
          explanation: '姓名用 CHAR 浪费空间（大部分名字不足 10 字），DOUBLE 有精度问题。',
        },
        {
          text: '不需要改，都正确',
          correct: false,
          explanation: 'CHAR(50) 浪费，FLOAT 不精确，DATETIME 过于精细，都需要调整。',
        },
      ],
    },
    {
      type: 'type-it',
      instruction: '创建一个 order 表来存电商订单：',
      code: 'CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  total DECIMAL(10,2),\n  status CHAR(1),\n  created_at DATETIME\n);',
      hints: [
        '订单总金额需要精确',
        '状态可用单个字符表示',
        '创建时间需要精确时刻',
      ],
    },
    {
      type: 'type-it',
      instruction: '创建一个 employee 表：',
      code: 'CREATE TABLE employee (\n  id INT PRIMARY KEY,\n  name VARCHAR(20),\n  phone CHAR(11),\n  salary DECIMAL(8,2),\n  hire_date DATE\n);',
      hints: [
        '姓名长度不固定',
        '手机号 11 位固定长度',
        '工资用 DECIMAL',
        '入职日期只存年月日',
      ],
    },
    {
      type: 'match-blocks',
      instruction: '把业务字段和推荐类型配对：',
      fragments: [
        'QQ 号 → INT',
        '博客内容 → TEXT',
        '订单创建时间 → DATETIME',
        '性别 → CHAR(1)',
      ],
      distractors: [
        'QQ 号 → VARCHAR',
        '博客内容 → CHAR',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'DECIMAL(8,2) 能存的最大值是多少？',
      options: [
        {
          text: '999999.99',
          correct: false,
          explanation: '8 位总位数，算一下：整数部分最多 6 位（8-2=6），所以最大是 999999.99。',
        },
        {
          text: '999999.99',
          correct: true,
          explanation: '总 8 位，小数 2 位，整数 6 位。最大整数 999999，加上 .99 就是 999999.99。',
        },
        {
          text: '99999999.99',
          correct: false,
          explanation: '总位数只有 8 位，不能有 8 位整数 + 2 位小数。',
        },
        {
          text: '9999.99',
          correct: false,
          explanation: '总位数是 8，不是 6。整数部分有 6 位。',
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: '类型选择口诀填空：',
      template: '固定长度用 ____，\n可变长度用 ____，\n金额用 ____，\n整数用 ____。',
      answers: ['CHAR', 'VARCHAR', 'DECIMAL', 'INT'],
      hints: ['长度固定的字符串类型', '长度可变的字符串类型', '精确小数的类型', '整数的标准类型'],
    },
    {
      type: 'fix-code',
      instruction: '下面这个表建的有问题，\n看看哪里出错了：',
      buggyCode: 'CREATE TABLE article (\n  id INT,\n  title VARCHAR(200),\n  like_count DECIMAL(10,2),  -- 问题\n  publish_time VARCHAR(20)    -- 问题\n);',
      goal: '点赞数是整数，发布时间的类型不合理',
      mode: 'choose-fix',
      fixes: [
        {
          text: 'like_count→INT,\npublish_time→DATETIME',
          correct: true,
          explanation: '点赞数不会有小数，用 INT 足够。发布时间需要日期比较，用 DATETIME。',
        },
        {
          text: 'like_count→CHAR,\npublish_time→DATE',
          correct: false,
          explanation: 'CHAR 不能用于计数，DATE 没有时间部分。',
        },
        {
          text: 'like_count→FLOAT,\npublish_time→INT',
          correct: false,
          explanation: 'FLOAT 有精度问题，INT 不能存日期。',
        },
        {
          text: '不用改，都合理',
          correct: false,
          explanation: 'DECIMAL(10,2) 存点赞数太浪费，VARCHAR 存时间无法做日期运算。',
        },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '把数据类型和特性配对：',
      fragments: [
        'CHAR → 固定长度，存满为止',
        'VARCHAR → 按实际长度存',
        'DECIMAL → 精确数字',
        'DATE → 仅存年月日',
      ],
      distractors: [
        'CHAR → 变长补空格',
        'DECIMAL → 近似值',
      ],
    },
    {
      type: 'fill-in',
      prompt: 'DECIMAL 参数填空：',
      template: 'DECIMAL(10,3) 中，\n10 表示____，\n3 表示____，\n整数部分最多____位。',
      answers: ['总位数', '小数位数', '7'],
      hints: ['第一个参数的含义', '第二个参数的含义', '10 减 3 的结果'],
    },
    {
      type: 'exposition',
      text: '选类型的黄金法则总结：\n\n1. 是不是数字？要计算吗？\n   → 是→ INT 或 DECIMAL\n   → 不是→ 字符串\n\n2. 字符串长度固定吗？\n   → 固定→ CHAR\n   → 不固定→ VARCHAR\n\n3. 要不要精确小数？\n   → 要→ DECIMAL\n   → 不要→ INT 或 FLOAT',
    },
  ],
}

export default lesson
