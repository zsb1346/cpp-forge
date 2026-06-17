import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-constraints-practice',
    chapter: 1,
    title: '约束判断与建表练习',
    subtitle: '约束配对 · 语法改错',
    description: '通过大量练习掌握五大约束的应用场景和正确写法。',
    objectives: [
      '能根据需求选择合适的约束',
      '能识别并修复建表语句中的约束错误',
    ],
    estimatedMinutes: 15,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.constraints', label: '五大约束' },
      ],
      contentKinds: ['practice'],
      stage: 'discrimination',
    },
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '业务需求："员工工号不能为空，\n且要唯一标识每个员工。"\n应该用什么约束？',
      options: [
        {
          text: 'UNIQUE',
          correct: false,
          explanation: 'UNIQUE 能防重复，但不能防 NULL，且不是"标识"的含义。',
        },
        {
          text: 'PRIMARY KEY',
          correct: true,
          explanation: 'PK = 非空 + 唯一，正是用来唯一标识每行数据的。',
        },
        {
          text: 'FOREIGN KEY',
          correct: false,
          explanation: '外键是引用其他表的，不是标识本表数据。',
        },
        {
          text: 'NOT NULL',
          correct: false,
          explanation: 'NOT NULL 只能防空，不能防重复。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '业务需求："文章的分类 ID 必须是\n分类表中存在的值。"\n应该用什么约束？',
      options: [
        {
          text: 'PRIMARY KEY',
          correct: false,
          explanation: 'PK 只约束当前表，不保证引用的完整性。',
        },
        {
          text: 'UNIQUE',
          correct: false,
          explanation: 'UNIQUE 不涉及跨表引用关系。',
        },
        {
          text: 'FOREIGN KEY',
          correct: true,
          explanation: '外键约束确保文章表的 category_id 在分类表中存在。',
        },
        {
          text: 'CHECK',
          correct: false,
          explanation: 'CHECK 只能检查当前列的值，不能查另一张表。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '业务需求："用户年龄必须在 0~150 之间。"\n应该用什么约束？',
      options: [
        {
          text: 'DEFAULT',
          correct: false,
          explanation: 'DEFAULT 只提供默认值，不能限制取值范围。',
        },
        {
          text: 'UNIQUE',
          correct: false,
          explanation: 'UNIQUE 防重复，年龄重复是正常的。',
        },
        {
          text: 'CHECK',
          correct: true,
          explanation: 'CHECK (age >= 0 AND age <= 150) 可以限制年龄范围。',
        },
        {
          text: 'FOREIGN KEY',
          correct: false,
          explanation: '跟跨表引用无关。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: "业务需求：\"如果插入订单时没填状态，\n自动设为'待支付'。\"\n应该用什么约束？",
      options: [
        {
          text: 'NOT NULL',
          correct: false,
          explanation: 'NOT NULL 只是不允许为空，不会自动填值。',
        },
        {
          text: 'DEFAULT',
          correct: true,
          explanation: "DEFAULT '待支付' 可以在插入时自动填入默认值。",
        },
        {
          text: 'CHECK',
          correct: false,
          explanation: 'CHECK 只做检查，不填值。',
        },
        {
          text: 'UNIQUE',
          correct: false,
          explanation: '跟设置默认值无关。',
        },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '把需求和对应的约束配对：',
      fragments: [
        '不能有重复的昵称 → UNIQUE',
        '引用用户表的 ID → FOREIGN KEY',
        '分数必须在 0~100 → CHECK',
        '不填时用当前时间 → DEFAULT',
      ],
      distractors: [
        '引用用户表的 ID → PRIMARY KEY',
        '分数范围 → NOT NULL',
      ],
    },
    {
      type: 'fix-code',
      instruction: '下面建表语句缺少一个重要约束，\n选择正确的补充：',
      buggyCode: 'CREATE TABLE student (\n  id INT,  -- 缺什么？\n  name VARCHAR(20),\n  email VARCHAR(100)\n);',
      goal: 'id 需要唯一标识每个学生',
      mode: 'choose-fix',
      fixes: [
        {
          text: '把 id 改为 id INT PRIMARY KEY',
          correct: true,
          explanation: 'PK 唯一标识每行数据，保证 id 不重复也不为空。',
        },
        {
          text: '在 name 上加 UNIQUE',
          correct: false,
          explanation: 'name 加 UNIQUE 不解决 id 的标识问题。',
        },
        {
          text: '在 email 上加 UNIQUE',
          correct: false,
          explanation: 'email 唯一不解决 id 的问题。',
        },
        {
          text: '加 DEFAULT 0',
          correct: false,
          explanation: '默认值不解决唯一标识的问题。',
        },
      ],
    },
    {
      type: 'fix-code',
      instruction: '下面的建表语句有逻辑错误：',
      buggyCode: 'CREATE TABLE emp (\n  id INT PRIMARY KEY,\n  name VARCHAR(20),\n  dept_id INT,\n  FOREIGN KEY (dept_id) REFERENCES emp(id)  -- 问题\n);',
      goal: 'dept_id 应该引用部门表的 id，\n不是员工表本身',
      mode: 'choose-fix',
      fixes: [
        {
          text: 'FOREIGN KEY 应指向 dept 表：\nREFERENCES dept(id)',
          correct: true,
          explanation: '外键 dept_id 应该引用部门表的主键，而不是员工表自己的 id。',
        },
        {
          text: '去掉 FOREIGN KEY',
          correct: false,
          explanation: '去掉外键可以运行，但失去了引用完整性保证。',
        },
        {
          text: '改成 REFERENCES emp(dept_id)',
          correct: false,
          explanation: '外键必须引用另一张表的主键，不能引用非主键列。',
        },
        {
          text: '把 dept_id 改成 PRIMARY KEY',
          correct: false,
          explanation: '一张表只能有一个 PK，且 department_id 不是员工标识。',
        },
      ],
    },
    {
      type: 'choose-next-line',
      instruction: '创建一张带完整约束的订单表，\n一步步添加约束：',
      context: 'CREATE TABLE orders (\n  id INT,\n  total DECIMAL(10,2),\n  user_id INT,\n  status VARCHAR(20)\n);',
      steps: [
        {
          prompt: '第一步：id 需要唯一标识订单，\n应该加什么？',
          options: [
            { line: 'id INT PRIMARY KEY', correct: true, explanation: 'PK 是订单表的唯一标识。' },
            { line: 'id INT UNIQUE', correct: false, explanation: 'UNIQUE 不能防 NULL，PK 更合适。' },
            { line: 'id INT NOT NULL', correct: false, explanation: 'NOT NULL 只能防空，不能防重复。' },
          ],
        },
        {
          prompt: '第二步：user_id 需要引用用户表，\n应该加什么？',
          options: [
            { line: 'user_id INT REFERENCES users(id)', correct: true, explanation: 'FOREIGN KEY 保证引用的用户 ID 在 users 表中存在。' },
            { line: 'user_id INT PRIMARY KEY', correct: false, explanation: 'user_id 不是订单的唯一标识，不应是 PK。' },
            { line: 'user_id INT UNIQUE', correct: false, explanation: '一个用户可以有多个订单，user_id 允许重复。' },
          ],
        },
        {
          prompt: '第三步：status 不填时默认"待支付"，\n应加什么？',
          options: [
            { line: "status VARCHAR(20) DEFAULT '待支付'", correct: true, explanation: "DEFAULT 在不填值时会自动填入'待支付'。" },
            { line: "status VARCHAR(20) CHECK (status = '待支付')", correct: false, explanation: 'CHECK 限制值必须等于某个值，不允许其他状态了。' },
            { line: 'status VARCHAR(20) NOT NULL', correct: false, explanation: 'NOT NULL 不能设置默认值。' },
          ],
        },
      ],
      finalCode: "CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  total DECIMAL(10,2),\n  user_id INT REFERENCES users(id),\n  status VARCHAR(20) DEFAULT '待支付'\n);",
    },
    {
      type: 'type-it',
      instruction: '创建带约束的 product 表：\n(id, name, price, stock, category_id)',
      code: 'CREATE TABLE product (\n  id INT PRIMARY KEY,\n  name VARCHAR(50) UNIQUE,\n  price DECIMAL(10,2) CHECK (price > 0),\n  stock INT DEFAULT 0,\n  category_id INT REFERENCES category(id)\n);',
      hints: [
        'id 是主键',
        '商品名不能重复',
        '价格必须大于 0',
        '库存默认 0',
        '分类 ID 是外键',
      ],
    },
    {
      type: 'fill-in',
      prompt: '建表语句填空，补全约束关键字：',
      template: 'CREATE TABLE emp (\n  id INT ____,\n  name VARCHAR(20) ____,\n  age INT ____ (age >= 18),\n  salary DECIMAL(10,2) ____ 0\n);',
      answers: ['PRIMARY KEY', 'NOT NULL', 'CHECK', 'DEFAULT'],
      hints: ['唯一标识约束', '不能为空', '条件检查', '默认值'],
    },
    {
      type: 'type-it',
      instruction: '创建带级联删除的外键引用：\n删除部门时自动删除该部门员工',
      code: 'CREATE TABLE dept (\n  id INT PRIMARY KEY,\n  name VARCHAR(20)\n);\n\nCREATE TABLE emp (\n  id INT PRIMARY KEY,\n  dept_id INT,\n  FOREIGN KEY (dept_id)\n    REFERENCES dept(id)\n    ON DELETE CASCADE\n);',
      hints: [
        '先建部门表',
        '外键引用部门表主键',
        'ON DELETE CASCADE 实现级联',
      ],
    },
    {
      type: 'fill-in',
      prompt: '约束数量填空：',
      template: '一张表可以有____个 PRIMARY KEY，\n可以有____个 UNIQUE，\n可以有____个 FOREIGN KEY。',
      answers: ['1', '多个', '多个'],
      hints: ['PK 的数量限制', 'UNIQUE 的数量', 'FK 的数量'],
    },
    {
      type: 'match-blocks',
      instruction: '把约束名和作用配对：',
      fragments: [
        'PRIMARY KEY → 唯一标识 + 非空',
        'FOREIGN KEY → 跨表引用',
        'UNIQUE → 值不重复',
        'CHECK → 条件检查',
        'DEFAULT → 默认值',
      ],
      distractors: [
        'UNIQUE → 大小写检查',
        'CHECK → 查另一张表',
      ],
    },
    {
      type: 'fix-code',
      instruction: '下面这个 CHECK 约束有问题：',
      buggyCode: 'CREATE TABLE user (\n  id INT PRIMARY KEY,\n  gender CHAR(1) CHECK (gender IN (\'M\'))\n);',
      goal: '性别应该允许 M、F 和 O 三种',
      mode: 'choose-fix',
      fixes: [
        {
          text: "CHECK (gender IN ('M', 'F', 'O'))",
          correct: true,
          explanation: 'IN 列表可以包含多个允许的值，性别应该有三种选项。',
        },
        {
          text: '去掉 CHECK 约束',
          correct: false,
          explanation: '去掉约束后可以插入任意字符，不够严谨。',
        },
        {
          text: "改成 DEFAULT 'M'",
          correct: false,
          explanation: 'DEFAULT 不限制其他值，不解决取值限制问题。',
        },
        {
          text: '用 UNIQUE 代替',
          correct: false,
          explanation: 'UNIQUE 防重复，不限制取值范围。',
        },
      ],
    },
    {
      type: 'exposition',
      text: '综合练习结束！\n五大约束记忆口诀：\n\n"主键唯一不能空，\n外键引用别家表，\n唯一不重可多空，\n检查条件把关口，\n默认没值时自动填。"',
    },
  ],
}

export default lesson
