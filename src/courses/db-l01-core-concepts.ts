import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-core-concepts',
    chapter: 1,
    title: '数据库核心概念',
    subtitle: 'DB/DBMS/DBS · 数据模型 · E-R 图',
    description: '厘清 DB、DBMS、DBS 三者的关系，理解数据模型层次与 E-R 图的基本要素。',
    objectives: [
      '区分 DB、DBMS、DBS 三个概念',
      '理解概念模型与逻辑模型的区别',
      '掌握 E-R 图的三要素',
      '判断实体间的联系类型（1:1/1:n/m:n）',
    ],
    estimatedMinutes: 12,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.db-core-concepts', label: '数据库核心概念' },
      ],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '学了半个学期数据库，你有没有想过：\nDB、DBMS、DBS 这三兄弟到底谁是谁？\n我们平时说的"装了个 MySQL"，\n这里头哪一个是 DB、哪一个是 DBMS？',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '先来认识三个基础术语：',
      cards: [
        {
          term: 'DB',
          meaning: '数据库——存数据的仓库本身',
          example: '一个叫 "student_db" 的文件集合',
        },
        {
          term: 'DBMS',
          meaning: '数据库管理系统——管理数据库的软件',
          example: 'MySQL、Oracle、SQL Server',
        },
        {
          term: 'DBS',
          meaning: '数据库系统——DB + DBMS + 人 + 硬件',
          example: '学校选课系统背后就是一套 DBS',
        },
      ],
    },
    {
      type: 'compare-snippets',
      instruction: '把描述拖拽到对应的术语上：',
      question: '下面几个描述分别对应哪个概念？',
      snippets: [
        {
          id: 'a',
          title: '描述一',
          code: '一张张表组成的数据集合，\n存在硬盘上的文件',
          correct: false,
          badge: 'DB',
          explanation: 'DB 就是数据本身的物理存储。',
        },
        {
          id: 'b',
          title: '描述二',
          code: '负责增删改查的底层软件，\n提供 SQL 接口',
          correct: false,
          badge: 'DBMS',
          explanation: 'DBMS 是操作 DB 的软件层。',
        },
        {
          id: 'c',
          title: '描述三',
          code: '包含了软件、数据、管理员、\n硬件的整体运行环境',
          correct: false,
          badge: 'DBS',
          explanation: 'DBS 是站在全局看整个系统。',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'exposition',
      text: '简单来说：\nDB 是"米缸"——数据本身。\nDBMS 是"饭勺"——操作工具。\nDBS 是"厨房"——整个环境。',
    },
    {
      type: 'multiple-choice',
      question: '我们在终端输入 `mysql -u root -p`，启动的是什么？',
      options: [
        {
          text: 'DB',
          correct: false,
          explanation: 'DB 是数据文件，不是可执行程序。你敲的是 mysql 这个软件。',
        },
        {
          text: 'DBMS',
          correct: true,
          explanation: 'mysql 命令行客户端连接的是 MySQL DBMS，它是管理数据库的软件。',
        },
        {
          text: 'DBS',
          correct: false,
          explanation: 'DBS 太大了，涵盖人、硬件、制度，不是单指一个软件。',
        },
        {
          text: 'SQL',
          correct: false,
          explanation: 'SQL 是查询语言，不是软件。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个属于 DBMS 的功能？',
      options: [
        {
          text: '存储数据的物理文件',
          correct: false,
          explanation: '文件属于 DB，不是 DBMS。DBMS 是管理这些文件的工具。',
        },
        {
          text: '提供数据的增删改查接口',
          correct: true,
          explanation: 'DBMS 的核心功能就是提供数据定义、操纵、控制的能力。',
        },
        {
          text: '编写业务逻辑代码',
          correct: false,
          explanation: '业务逻辑是应用程序做的事，不是 DBMS 的职责。',
        },
        {
          text: '设计 E-R 图',
          correct: false,
          explanation: 'E-R 图是设计阶段的产物，DBMS 是运行时的工具。',
        },
      ],
    },
    {
      type: 'exposition',
      text: '弄清了三个 D 的关系，\n我们再来看数据库设计的核心步骤。\n\n设计数据库，不是上来就建表。\n我们先要回答：现实世界长什么样？',
    },
    {
      type: 'concept-cards',
      instruction: '数据库设计分三个层次：',
      cards: [
        {
          term: '概念模型',
          meaning: '用人的语言描述世界，跟计算机无关',
          example: 'E-R 图就是概念模型的代表',
        },
        {
          term: '逻辑模型',
          meaning: '用数据库的语言描述，跟具体产品有关',
          example: '关系模型：表、行、列',
        },
        {
          term: '物理模型',
          meaning: '数据在磁盘上怎么存，跟硬件有关',
          example: '索引文件、数据页、B+ 树',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'E-R 图属于上面哪一层？',
      options: [
        {
          text: '物理模型',
          correct: false,
          explanation: 'E-R 图不关心数据怎么存磁盘，跟硬件无关。',
        },
        {
          text: '概念模型',
          correct: true,
          explanation: 'E-R 图用实体和联系描述现实世界，与计算机无关。',
        },
        {
          text: '逻辑模型',
          correct: false,
          explanation: '逻辑模型已经用表、键等结构表达了，E-R 图更抽象。',
        },
        {
          text: '都不是',
          correct: false,
          explanation: 'E-R 图是最经典的概念模型工具。',
        },
      ],
    },
    {
      type: 'exposition',
      text: '既然提到了 E-R 图，\n我们来拆解一下它的三要素。\n\n这三个要素认识清楚，\n后面画图才不会乱。',
    },
    {
      type: 'concept-cards',
      instruction: 'E-R 图的三要素：',
      cards: [
        {
          term: '实体',
          meaning: '现实世界中可区分的对象',
          example: '学生、课程、老师',
        },
        {
          term: '属性',
          meaning: '实体的特征描述',
          example: '学号、姓名、年龄',
        },
        {
          term: '联系',
          meaning: '实体之间的关联关系',
          example: '学生选了课',
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: '回忆 E-R 图三要素填空：',
      template: 'E-R 图的三要素是 ____、____ 和 ____。',
      answers: ['实体', '属性', '联系'],
      hints: ['第一个是现实世界的对象', '第二个是对象的特征', '第三个是对象间的关联'],
    },
    {
      type: 'exposition',
      text: '实体之间的联系有三种类型。\n\n这是考试中判断最容易出错的地方，\n我们一个一个看。',
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
          narration: '1:1 联系——一个实体对应另一个实体的一个实例。\n典型例子：一个学生只有一个学号。',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'rel-table',
              headers: ['关系类型', '场景举例', 'E-R 图示'],
              rows: [
                ['1:1', '学生 - 学号', '每个学生对应唯一学号'],
                ['1:n', '', ''],
                ['m:n', '', ''],
              ],
              highlightedRows: [0],
              fadedRows: [1, 2],
            },
          ],
        },
        {
          narration: '1:n 联系——一个实体对应多个实例。\n典型例子：一个班级有多个学生。',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'rel-table',
              headers: ['关系类型', '场景举例', 'E-R 图示'],
              rows: [
                ['1:1', '学生 - 学号', '每个学生对应唯一学号'],
                ['1:n', '班级 - 学生', '一个班级包含多个学生'],
                ['m:n', '', ''],
              ],
              highlightedRows: [1],
              fadedRows: [0, 2],
            },
          ],
        },
        {
          narration: 'm:n 联系——多个实体对应多个实例。\n典型例子：学生与课程——\n一个学生选多门课，一门课被多个学生选。',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'rel-table',
              headers: ['关系类型', '场景举例', 'E-R 图示'],
              rows: [
                ['1:1', '学生 - 学号', '每个学生对应唯一学号'],
                ['1:n', '班级 - 学生', '一个班级包含多个学生'],
                ['m:n', '学生 - 课程', '一个学生选多门课，一门课被多个学生选'],
              ],
              highlightedRows: [2],
              fadedRows: [0, 1],
            },
          ],
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '"一个部门有多位员工，一位员工只属于一个部门"——这是哪种联系？',
      options: [
        {
          text: '1:1',
          correct: false,
          explanation: '1:1 是"一个对一个"，这里一个部门对多个员工，所以不是。',
        },
        {
          text: '1:n',
          correct: true,
          explanation: '部门(1)对员工(n)是一对多的关系，这是典型的 1:n。',
        },
        {
          text: 'm:n',
          correct: false,
          explanation: 'm:n 是多对多，但员工只属于一个部门，不是多对多。',
        },
        {
          text: '无法判断',
          correct: false,
          explanation: '条件足够判断：从部门看员工是多个，所以是 1:n。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '"乘客和座位（一人一座）"是什么联系？',
      options: [
        {
          text: '1:1',
          correct: true,
          explanation: '一个乘客对应一个座位，一个座位也只会分配给一个乘客。',
        },
        {
          text: '1:n',
          correct: false,
          explanation: '如果一人多座才是 1:n，但这里明确说了"一人一座"。',
        },
        {
          text: 'm:n',
          correct: false,
          explanation: '没有多对多的特征：多个乘客对应多个座位不是同时发生的。',
        },
        {
          text: '不确定',
          correct: false,
          explanation: '"一人一座"就是 1:1 的典型描述。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '"学生选课——一个学生可以选多门课，一门课也可以被多个学生选"是什么联系？',
      options: [
        {
          text: '1:1',
          correct: false,
          explanation: '两边都是"多个"就不是 1:1。',
        },
        {
          text: '1:n',
          correct: false,
          explanation: '如果一门课只能被一个学生选才是 1:n，但这里一门课被多个学生选。',
        },
        {
          text: 'm:n',
          correct: true,
          explanation: '两边都可以有多个对应实例，典型的 m:n（多对多）。',
        },
        {
          text: '没有联系',
          correct: false,
          explanation: '学生和课程之间明显存在选课关系。',
        },
      ],
    },
    {
      type: 'type-it',
      instruction: '打出一段 SQL 创建语句，\n其中包含一个 1:n 关系的表达思路：\n（提示：外键放在多的一端）',
      code: '-- 部门表（1 的一端）\nCREATE TABLE dept (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\n\n-- 员工表（n 的一端）\nCREATE TABLE emp (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  dept_id INT,\n  FOREIGN KEY (dept_id) REFERENCES dept(id)\n);',
      hints: [
        '先写部门表，再写员工表',
        '外键 dept_id 放在员工表里',
        'FOREIGN KEY 指向部门表的 id',
      ],
    },
    {
      type: 'exposition',
      text: '概念模型设计好后，\n下一步就是把它转换成关系模式。\n也就是把 E-R 图变成一张张表。',
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
          narration: '第一步：每个实体变成一张表。\n"学生"实体 → student 表\n"课程"实体 → course 表',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'er-map',
              headers: ['E-R 元素', '关系模式', '备注'],
              rows: [
                ['学生实体', 'student 表', '包含学号、姓名等字段'],
                ['课程实体', 'course 表', '包含课程号、名称等字段'],
                ['选课联系(m:n)', '', '需要额外处理'],
              ],
              highlightedRows: [0, 1],
              fadedRows: [2],
            },
          ],
        },
        {
          narration: '第二步：实体的属性变成表的列。\n学号 → stu_id 列\n姓名 → name 列\n年龄 → age 列',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'er-map',
              headers: ['E-R 元素', '关系模式', '备注'],
              rows: [
                ['学生实体', 'student 表', '包含学号、姓名等字段'],
                ['属性：学号', 'stu_id 列', '成为主键'],
                ['属性：姓名', 'name 列', '普通字段'],
                ['选课联系(m:n)', '', '需要额外处理'],
              ],
              highlightedRows: [1, 2],
              fadedRows: [0, 3],
            },
          ],
        },
        {
          narration: '第三步：m:n 联系变成独立的关系表。\n选课联系 → sc 表\n包含学生 ID 和课程 ID 作为外键。',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'er-map',
              headers: ['E-R 元素', '关系模式', '备注'],
              rows: [
                ['学生实体', 'student 表', '包含学号、姓名等字段'],
                ['课程实体', 'course 表', '包含课程号、名称等字段'],
                ['选课联系(m:n)', 'sc 表', 'stu_id + course_id 联合主键'],
              ],
              highlightedRows: [2],
              fadedRows: [0, 1],
            },
          ],
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: 'E-R 图转关系模式的一个关键规则填空：',
      template: '多对多联系需要转换为一个独立的____，\n其主键由两个____共同组成。',
      answers: ['关系表', '外键（或实体主键）'],
      hints: ['m:n 不能直接用一个外键表达', '联合主键来自两端实体的主键'],
    },
    {
      type: 'exposition',
      text: '今天我们理清了 DB/DBMS/DBS 的区别，\n认识了概念模型到逻辑模型的转换，\n还学会了 E-R 图的三要素和三种联系。\n\n下面进入练习课，\n把这些知识用起来！',
    },
  ],
}

export default lesson
