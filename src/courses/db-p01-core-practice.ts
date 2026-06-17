import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-core-practice',
    chapter: 1,
    title: '核心概念密集练习',
    subtitle: 'DB/DBMS/DBS · 数据模型',
    description: '通过大量场景题，巩固 DB、DBMS、DBS 的辨析和数据模型层次的区分。',
    objectives: [
      '在真实场景中快速区分 DB/DBMS/DBS',
      '判断给定的描述属于哪个数据模型层次',
    ],
    estimatedMinutes: 15,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.db-core-concepts', label: '数据库核心概念' },
      ],
      contentKinds: ['practice'],
      stage: 'discrimination',
    },
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '公司采购了 Oracle 数据库软件，\n技术团队把它安装到服务器上。\n这个"Oracle 软件"属于什么？',
      options: [
        {
          text: 'DB',
          correct: false,
          explanation: '软件不是数据本身。Oracle 安装包不是数据库文件。',
        },
        {
          text: 'DBMS',
          correct: true,
          explanation: 'Oracle 是数据库管理系统，它负责管理数据库的创建、查询和维护。',
        },
        {
          text: 'DBS',
          correct: false,
          explanation: 'DBS 还包含数据、管理员、硬件等，光一个软件不够。',
        },
        {
          text: 'SQL',
          correct: false,
          explanation: 'SQL 是语言，Oracle 是 DBMS 产品。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '班主任打开了一个叫 `students_backup.mdf` 的文件，\n这个文件是什么？',
      options: [
        {
          text: 'DBMS',
          correct: false,
          explanation: '.mdf 是 SQL Server 的数据文件，不是管理软件。',
        },
        {
          text: 'DB',
          correct: true,
          explanation: '.mdf 文件存储的就是数据库中的数据，属于 DB 的范畴。',
        },
        {
          text: 'DBS',
          correct: false,
          explanation: 'DBS 是系统整体概念，一个数据文件只是其中的一部分。',
        },
        {
          text: '备份工具',
          correct: false,
          explanation: '.mdf 是主数据文件，不是备份工具。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '学校选课系统运行时，\n包含了 MySQL 服务、选课数据、\n服务器和网管员。这整体叫什么？',
      options: [
        {
          text: 'DB',
          correct: false,
          explanation: 'DB 仅有数据部分，这里还包含了软件、硬件和人。',
        },
        {
          text: 'DBMS',
          correct: false,
          explanation: 'DBMS 只有管理软件，不包含数据文件和人。',
        },
        {
          text: 'DBS',
          correct: true,
          explanation: '数据库系统 = 数据库 + 数据库管理系统 + 硬件 + 人员。',
        },
        {
          text: '应用程序',
          correct: false,
          explanation: '选课系统的前端是应用程序，但整体架构属于 DBS。',
        },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '把术语和它的核心描述配对：',
      fragments: [
        'DB → 存储的原始数据',
        'DBMS → 管理数据的软件',
        'DBS → 包含软硬件人的整体',
      ],
      distractors: [
        'DB → 查询数据的语言',
        'DBS → 操作系统的一种',
      ],
    },
    {
      type: 'multiple-choice',
      question: '你在命令行输入 `mysqld` 启动了一个守护进程，\n这个进程属于什么？',
      options: [
        {
          text: 'DB',
          correct: false,
          explanation: '进程是运行中的程序，不是数据文件。',
        },
        {
          text: 'DBMS',
          correct: true,
          explanation: 'mysqld 是 MySQL 的服务端进程，是 DBMS 的核心组件。',
        },
        {
          text: 'DBS',
          correct: false,
          explanation: '仅仅是 DBMS 进程，不包含数据、硬件等完整系统。',
        },
        {
          text: '数据库实例',
          correct: false,
          explanation: '数据库实例包含内存结构，但根本上还是属于 DBMS 范畴。',
        },
      ],
    },
    {
      type: 'compare-snippets',
      instruction: '阅读以下场景，判断每个描述对应什么：',
      question: '下面三个场景分别对应 DB/DBMS/DBS 的哪个？',
      snippets: [
        {
          id: 'a',
          title: '场景 A',
          code: '小王把导出的 SQL 文件\n交给了同事',
          correct: false,
          badge: 'DB',
          explanation: 'SQL 文件包含的是数据或结构定义，属于 DB 范畴。',
        },
        {
          id: 'b',
          title: '场景 B',
          code: 'DBA 设置了用户权限\n并开启了慢查询日志',
          correct: false,
          badge: 'DBMS',
          explanation: '权限管理和日志监控都是 DBMS 的管理功能。',
        },
        {
          id: 'c',
          title: '场景 C',
          code: '公司投入资金搭建了\n数据库运维平台',
          correct: false,
          badge: 'DBS',
          explanation: '含资金、平台、人员等要素，是 DBS 层面。',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个选项正确描述了 DB 和 DBMS 的关系？',
      options: [
        {
          text: 'DB 就是 DBMS 的简称',
          correct: false,
          explanation: '它们是不同的概念，DB 是数据，DBMS 是管理软件。',
        },
        {
          text: 'DBMS 通过 SQL 操作 DB',
          correct: true,
          explanation: 'DBMS 是软件层，用户通过 SQL 语句让 DBMS 操作 DB 中的数据。',
        },
        {
          text: 'DB 包含了 DBMS',
          correct: false,
          explanation: '反过来，DBS 才包含 DB 和 DBMS。',
        },
        {
          text: 'DBMS 就是数据文件',
          correct: false,
          explanation: 'DBMS 是软件程序，数据文件是 DB。',
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: '根据描述填入对应的术语（DB/DBMS/DBS）：',
      template: '（1）MySQL 安装包 → ____\n（2）硬盘上的 student.sql 文件 → ____\n（3）银行核心交易系统整体架构 → ____',
      answers: ['DBMS', 'DB', 'DBS'],
      hints: ['软件安装包属于管理系统', '文件里的内容是数据', '整体环境包含所有要素'],
    },
    {
      type: 'exposition',
      text: '做对了吗？如果还有混淆，\n记住一个口诀：\n\n"DB 是米，DBMS 是锅，\nDBS 是整个厨房。"',
    },
    {
      type: 'predict-output',
      instruction: '阅读下面的 E-R 设计描述，\n判断它将转换成什么关系模式：',
      code: '实体：教师（工号，姓名，职称）\n实体：课程（课程号，名称，学分）\n联系：任教（一个教师教多门课，\n      一门课只由一个教师教）',
      expectedOutput: '教师表（工号 PK，姓名，职称）\n课程表（课程号 PK，名称，学分，\n        工号 FK）',
      options: [
        {
          text: '教师表和课程表分开，课程表里加工号外键',
          correct: true,
          explanation: '1:n 关系中，外键放在 n 的一端（课程表）。',
        },
        {
          text: '教师表和课程表分开，教师表里加课程号外键',
          correct: false,
          explanation: '外键应该放在多的一端。一个教师教多门课，放教师表会导致数据冗余。',
        },
        {
          text: '建一张独立的任教表',
          correct: false,
          explanation: '只有 m:n 才需要独立关系表，1:n 用外键即可。',
        },
        {
          text: '合并在同一张表里',
          correct: false,
          explanation: '两个不同实体通常各自建表，不合并。',
        },
      ],
    },
    {
      type: 'fix-code',
      instruction: '下面的 E-R 转关系模式方案有错，\n请选择正确的修复方式：',
      buggyCode: '-- 学生选课（m:n）\nCREATE TABLE student (\n  id INT PRIMARY KEY\n);\nCREATE TABLE course (\n  id INT PRIMARY KEY,\n  student_id INT  -- 这里放外键\n);',
      goal: '正确表达学生和课程之间的 m:n 关系',
      mode: 'choose-fix',
      fixes: [
        {
          text: '在 student 表里加 course_id 外键',
          correct: false,
          explanation: '不管外键放哪头，m:n 都需要第三张表。',
        },
        {
          text: '创建第三张 sc 表来记录选课关系',
          correct: true,
          explanation: 'm:n 必须拆分为独立的关系表，包含两个外键。',
        },
        {
          text: '去掉外键，只保留两张表',
          correct: false,
          explanation: '没有外键就无法表达选课关系了。',
        },
        {
          text: '把所有字段放一张表',
          correct: false,
          explanation: '合在一张表会产生大量冗余。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '"商品的类别和商品"——\n一个类别包含多种商品，\n一种商品只属于一个类别。\n这是什么联系？',
      options: [
        {
          text: '1:1',
          correct: false,
          explanation: '类别对商品是"一对多"，不是一对一。',
        },
        {
          text: '1:n',
          correct: true,
          explanation: '类别(1)对商品(n)，标准的一对多关系。',
        },
        {
          text: 'm:n',
          correct: false,
          explanation: '一种商品只属于一个类别，不是多对多。',
        },
        {
          text: '没有联系',
          correct: false,
          explanation: '类别和商品之间存在明确的所属关系。',
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: '判断联系类型填空：',
      template: '（1）人和身份证 → ____\n（2）作者和书 → ____\n（3）演员和电影 → ____',
      answers: ['1:1', '1:n', 'm:n'],
      hints: ['一个人对应一张身份证', '一个作者可以写多本书', '一个演员演多部电影，一部电影有多个演员'],
    },
    {
      type: 'multiple-choice',
      question: '在选择 DBMS 时，\n以下哪个因素是应该优先考虑的？',
      options: [
        {
          text: '是否免费',
          correct: false,
          explanation: '价格是因素之一，但更重要的是能否满足业务需求。',
        },
        {
          text: '能否支持业务需要的数据量',
          correct: true,
          explanation: '选择 DBMS 首先要看它能否承载业务场景的数据规模。',
        },
        {
          text: '是不是最新版本',
          correct: false,
          explanation: '最新≠最合适，稳定性和兼容性更重要。',
        },
        {
          text: '安装包的大小',
          correct: false,
          explanation: '安装包大小与技术能力无关。',
        },
      ],
    },
    {
      type: 'compare-snippets',
      instruction: '比较两个数据模型描述：',
      question: '哪个属于概念模型，哪个属于逻辑模型？',
      snippets: [
        {
          id: 'a',
          title: '描述 A',
          code: '用矩形框表示实体，\n菱形框表示联系，\n椭圆框表示属性',
          correct: false,
          badge: '概念模型',
          explanation: 'E-R 图是概念模型的代表，与具体数据库无关。',
        },
        {
          id: 'b',
          title: '描述 B',
          code: 'CREATE TABLE student (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);',
          correct: false,
          badge: '逻辑模型',
          explanation: 'SQL 建表语句是关系模型（逻辑模型）的体现。',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'predict-output',
      instruction: '如果 E-R 图中有两个实体：\n"顾客"和"订单"，联系是：\n一个顾客可以有多个订单，\n一个订单只属于一个顾客。',
      code: '请判断：转换时需要几张表？\n外键放在哪里？',
      expectedOutput: '两张表：顾客表和订单表。\n外键放在订单表（n 端）。',
      options: [
        {
          text: '两张表，外键放顾客表',
          correct: false,
          explanation: '外键放多的一端（订单），不是少的一端。',
        },
        {
          text: '两张表，外键放订单表',
          correct: true,
          explanation: '顾客(1)对订单(n)，外键 cust_id 放在订单表。',
        },
        {
          text: '三张表，额外建一张关系表',
          correct: false,
          explanation: '只有 m:n 才需要三张表，1:n 用外键就行。',
        },
        {
          text: '一张表合并所有字段',
          correct: false,
          explanation: '不同实体应该分开建表，合在一起会产生冗余。',
        },
      ],
    },
    {
      type: 'fix-code',
      instruction: '下面这段对数据库三级模式的描述有误，\n选择正确的修改：',
      buggyCode: '概念模型是直接对应\n数据库表结构的模型。',
      goal: '准确描述概念模型的定义',
      mode: 'choose-fix',
      fixes: [
        {
          text: '概念模型是用人的语言描述现实世界',
          correct: true,
          explanation: '概念模型跟计算机无关，描述的是现实世界的抽象。',
        },
        {
          text: '概念模型就是物理存储模型',
          correct: false,
          explanation: '物理模型才关心存储，概念模型不关心。',
        },
        {
          text: '概念模型就是建表语句',
          correct: false,
          explanation: '建表语句是逻辑模型（关系模型），不是概念模型。',
        },
        {
          text: '概念模型只包含数据不包含联系',
          correct: false,
          explanation: '概念模型同样描述实体间的联系。',
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: '数据模型的三层次填空：',
      template: '从抽象到具体，数据库设计依次经历：\n____模型 → ____模型 → ____模型。',
      answers: ['概念', '逻辑', '物理'],
      hints: ['最抽象的层次', '中间层次，如表结构', '最具体的层次，如存储方式'],
    },
    {
      type: 'multiple-choice',
      question: '小明说："我电脑上装了 SQL Server，\n我的数据库系统就建好了。"\n他这句话有什么问题？',
      options: [
        {
          text: '没有，SQL Server 就是数据库系统',
          correct: false,
          explanation: '装了 DBMS 不等于就有了完整的数据库系统。',
        },
        {
          text: '他只装了 DBMS，还需要有数据库和运行环境',
          correct: true,
          explanation: 'DBS 包含 DB + DBMS + 硬件 + 人员，只装软件不够。',
        },
        {
          text: 'SQL Server 不是数据库系统',
          correct: false,
          explanation: 'SQL Server 是 DBMS，是 DBS 的一部分但不是全部。',
        },
        {
          text: '他应该用 MySQL 才对',
          correct: false,
          explanation: '用什么产品不是重点，概念理解才是关键。',
        },
      ],
    },
    {
      type: 'exposition',
      text: '密集练习到这里结束！\n核心要点再回顾：\n\nDB = 数据本身\nDBMS = 管理数据的软件\nDBS = 整个数据库系统\n\n概念模型 → 逻辑模型 → 物理模型\n是从抽象到具体的过程。',
    },
  ],
}

export default lesson
