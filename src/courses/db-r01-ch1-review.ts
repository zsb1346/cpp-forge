import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-ch1-review',
    chapter: 1,
    title: '第1章综合复习',
    subtitle: '跨章节易混点集中对比',
    description: '综合回顾 Chapter 1 全部核心概念，聚焦易混淆的知识对比。',
    objectives: [
      '区分 PK 和 UNIQUE 的异同',
      '区分 CHAR 和 VARCHAR 的适用场景',
      '区分 DB 和 DBMS 的概念',
      '区分 1:n 和 m:n 的联系判断',
    ],
    estimatedMinutes: 12,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.ch1-review', label: '第1章综合复习' },
      ],
      contentKinds: ['review'],
      stage: 'recall',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '第一章学了好几个主题，\n有些概念长得太像了。\n\nPK vs UNIQUE 有什么区别？\nCHAR vs VARCHAR 什么时候用？\n\n我们来一场集中对比复习。',
      textAnimation: 'typewriter',
    },
    {
      type: 'compare-snippets',
      instruction: '比较 PK 和 UNIQUE 的定义：',
      question: '下面哪个说法正确描述了 PK？',
      snippets: [
        {
          id: 'a',
          title: '说法 A',
          code: '唯一标识一行数据，\n不能为 NULL，\n一张表只能有一个。',
          correct: true,
          badge: 'PK',
          explanation: 'PK = 非空 + 唯一 + 单表一个。这是关系模型最基础的约束。',
        },
        {
          id: 'b',
          title: '说法 B',
          code: '值不能重复，\n但可以为 NULL，\n一张表可以有多个。',
          correct: false,
          badge: 'UNIQUE',
          explanation: '这是 UNIQUE 的特征，不是 PK。UNIQUE 允许多个 NULL，一张表可以有多个 UNIQUE。',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'multiple-choice',
      question: '表里有一列 `id INT UNIQUE`，\n以下哪个说法是对的？',
      options: [
        {
          text: 'id 不能为 NULL',
          correct: false,
          explanation: 'UNIQUE 允许 NULL 值，多个 NULL 是允许的。只有 PK 才同时要求非空。',
        },
        {
          text: 'id 可以有重复值',
          correct: false,
          explanation: 'UNIQUE 约束就是防止重复的，有 UNIQUE 的列不能有重复值。',
        },
        {
          text: 'id 可以有一个 NULL 值',
          correct: true,
          explanation: 'UNIQUE 约束列允许一个 NULL 值（MySQL 允许多个 NULL 也不报错，但标准 SQL 只允许一个）。',
        },
        {
          text: '这张表不能有 PK',
          correct: false,
          explanation: 'UNIQUE 和 PK 可以并存，UNIQUE 不是 PK。',
        },
      ],
    },
    {
      type: 'compare-snippets',
      instruction: '比较 CHAR 和 VARCHAR 的定义：',
      question: '下面哪个应该用 CHAR？',
      snippets: [
        {
          id: 'a',
          title: '场景 A',
          code: '手机号（11 位，\n所有用户长度一致）',
          correct: true,
          badge: 'CHAR',
          explanation: '手机号长度固定为 11，CHAR(11) 最合适，效率也高。',
        },
        {
          id: 'b',
          title: '场景 B',
          code: '用户昵称（大部分 2~8 字，\n最长允许 20 字）',
          correct: false,
          badge: 'VARCHAR',
          explanation: '昵称长度不固定，用 VARCHAR 节省空间。如果 CHAR(20) 大部分空间都浪费了。',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是 DB 而非 DBMS？',
      options: [
        {
          text: 'MySQL 安装包',
          correct: false,
          explanation: 'MySQL 安装包安装的是 DBMS（数据库管理系统），不是数据本身。',
        },
        {
          text: 'Oracle 数据库软件',
          correct: false,
          explanation: 'Oracle 是 DBMS 产品，不是 DB。',
        },
        {
          text: '.mdf 数据文件',
          correct: true,
          explanation: '.mdf 是 SQL Server 的主数据文件，存放的是数据本身，属于 DB 范畴。',
        },
        {
          text: 'Navicat 客户端工具',
          correct: false,
          explanation: 'Navicat 是连接 DBMS 的客户端工具，不属于 DB。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个不是 DBMS 的功能？',
      options: [
        {
          text: '提供 SQL 接口执行查询',
          correct: false,
          explanation: '提供 SQL 接口是 DBMS 的核心功能之一。',
        },
        {
          text: '管理用户权限',
          correct: false,
          explanation: '用户权限管理是 DBMS 的安全管理功能。',
        },
        {
          text: '绘制 E-R 图',
          correct: true,
          explanation: 'E-R 图是设计阶段的产物，一般用专门的建模工具绘制，不是 DBMS 的内置功能。',
        },
        {
          text: '备份和恢复数据',
          correct: false,
          explanation: '备份恢复是 DBMS 的重要功能。',
        },
      ],
    },
    {
      type: 'predict-output',
      instruction: '猜一下下面这个场景中，\n外键应该放在哪张表：',
      code: '实体：作者（作者ID，姓名）\n实体：文章（文章ID，标题，内容）\n联系：一个作者可以写多篇文章，\n      一篇文章只由一个作者写',
      expectedOutput: '外键 author_id 放在文章表（n 端）',
      options: [
        {
          text: '外键放在作者表',
          correct: false,
          explanation: '一个作者有多篇文章，作者表放不下多个外键。',
        },
        {
          text: '外键放在文章表',
          correct: true,
          explanation: '1:n 中外键放在 n 端（文章表），每篇文章记录它所属的作者。',
        },
        {
          text: '建第三张关系表',
          correct: false,
          explanation: '只有 m:n 才需要第三张表，1:n 用外键就够。',
        },
        {
          text: '不需要外键，合并成一张表',
          correct: false,
          explanation: '合并在同一张表会导致大量重复的作者信息。',
        },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '把概念和它的含义配对（跨本章多个主题）：',
      fragments: [
        'DBS → 包含所有要素的数据库系统',
        'FK → 引用另一张表的主键',
        'CHECK → 限制列的值范围',
        'E-R 图 → 概念模型的工具',
      ],
      distractors: [
        'FK → 唯一标识一行',
        'E-R 图 → 逻辑模型的工具',
      ],
    },
    {
      type: 'fill-in',
      prompt: '易混概念填空：',
      template: '（1）____允许 NULL 值，____不允许。\n（2）____存固定长度，____存可变长度。\n（3）____是数据，____是管理软件。',
      answers: ['UNIQUE', 'PRIMARY KEY', 'CHAR', 'VARCHAR', 'DB', 'DBMS'],
      hints: ['第一个空允许 NULL', '第三个空长度固定', '第五个空是数据本身'],
    },
    {
      type: 'multiple-choice',
      question: '"一个产品属于一个分类，\n一个分类下有多个产品"——\n这是哪种联系？',
      options: [
        {
          text: '1:1',
          correct: false,
          explanation: '一个分类下有多个产品，不是一对一的。',
        },
        {
          text: '1:n',
          correct: true,
          explanation: '分类(1)对产品(n)，典型的一对多关系。',
        },
        {
          text: 'm:n',
          correct: false,
          explanation: '一个产品只属于一个分类，不是多对多。',
        },
        {
          text: '递归联系',
          correct: false,
          explanation: '产品-分类不是同一个实体的自联系。',
        },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '把数据类型和最适合的业务场景配对：',
      fragments: [
        'CHAR(11) → 手机号',
        'DECIMAL(10,2) → 商品价格',
        'DATE → 出生日期',
        'INT → 库存数量',
      ],
      distractors: [
        'DECIMAL(10,2) → 年龄',
        'CHAR(11) → 邮箱',
      ],
    },
    {
      type: 'fix-code',
      instruction: '下面这个建表语句有多处错误：',
      buggyCode: 'CREATE TABLE product (\n  id INT,            -- 问题1\n  name VARCHAR(200),  -- 无问题\n  price INT,          -- 问题2\n  created_at DATE     -- 问题3\n);',
      goal: 'id 需要唯一标识，price 可能有小数，\ncreated_at 需要精确到时间',
      mode: 'choose-fix',
      fixes: [
        {
          text: 'id→INT PK, price→DECIMAL(10,2),\ncreated_at→DATETIME',
          correct: true,
          explanation: 'PK 唯一标识，DECIMAL 精确存金额，DATETIME 含时间部分。',
        },
        {
          text: 'id→INT UNIQUE, price→FLOAT,\ncreated_at→TIMESTAMP',
          correct: false,
          explanation: 'UNIQUE 允许 NULL 不适合做标识，FLOAT 有精度问题。',
        },
        {
          text: 'id→VARCHAR, price→INT,\ncreated_at→DATE 不变',
          correct: false,
          explanation: 'id 用 VARCHAR 效率低，price 用 INT 存不了小数，created_at 需要时间。',
        },
        {
          text: '不加 PK，保持现状',
          correct: false,
          explanation: '没有 PK 的表无法唯一标识一行，会产生数据冗余和混乱。',
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: 'E-R 图转关系模式填空：',
      template: '1:1 关系中外键放在____端都可，\n1:n 关系中外键放在____端，\nm:n 关系需要____表。',
      answers: ['任意一', 'n', '第三张'],
      hints: ['1:1 的外键位置比较灵活', '1:n 有固定规则', 'm:n 需要额外处理'],
    },
    {
      type: 'exposition',
      text: '复习结束！\n第一章的核心就四个区分：\n\n1. DB / DBMS / DBS\n2. 概念模型 / 逻辑模型 / 物理模型\n3. CHAR / VARCHAR / INT / DECIMAL\n4. PK / FK / UNIQUE / CHECK / DEFAULT\n\n这些都分清了，\n第一章就过关了。',
    },
  ],
}

export default lesson
