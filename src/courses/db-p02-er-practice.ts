import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-er-practice',
    chapter: 1,
    title: 'E-R 图与联系类型专项',
    subtitle: '三要素 · 联系判断',
    description: '集中练习 E-R 图的三要素识别和实体间联系类型的判断。',
    objectives: [
      '能从描述中准确提取实体、属性、联系',
      '根据场景判断联系类型（1:1/1:n/m:n）',
    ],
    estimatedMinutes: 15,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.er-diagram', label: 'E-R 图' },
      ],
      contentKinds: ['practice'],
      stage: 'discrimination',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '给你一段业务描述，\n你能从中找出实体、属性和联系吗？\n\n判断联系类型是考试必考，\n我们通过大量场景来练。',
      textAnimation: 'typewriter',
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
          narration: '场景一："每个员工有一张门禁卡，\n一张门禁卡只分配给一个员工"',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'case-table',
              headers: ['场景', '实体 1', '实体 2', '联系类型', '判定理由'],
              rows: [
                ['员工 - 门禁卡', '员工', '门禁卡', '1:1', '两边都唯一对应'],
                ['班级 - 学生', '', '', '', ''],
                ['学生 - 课程', '', '', '', ''],
              ],
              highlightedRows: [0],
              fadedRows: [1, 2],
            },
          ],
        },
        {
          narration: '场景二："一个班级有多个学生，\n每个学生属于一个班级"',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'case-table',
              headers: ['场景', '实体 1', '实体 2', '联系类型', '判定理由'],
              rows: [
                ['员工 - 门禁卡', '员工', '门禁卡', '1:1', '两边都唯一对应'],
                ['班级 - 学生', '班级', '学生', '1:n', '班级(1)对学生(n)'],
                ['学生 - 课程', '', '', '', ''],
              ],
              highlightedRows: [1],
              fadedRows: [0, 2],
            },
          ],
        },
        {
          narration: '场景三："一个学生选多门课，\n一门课有多个学生选"',
          mode: 'delta',
          elements: [
            {
              type: 'table',
              id: 'case-table',
              headers: ['场景', '实体 1', '实体 2', '联系类型', '判定理由'],
              rows: [
                ['员工 - 门禁卡', '员工', '门禁卡', '1:1', '两边都唯一对应'],
                ['班级 - 学生', '班级', '学生', '1:n', '班级(1)对学生(n)'],
                ['学生 - 课程', '学生', '课程', 'm:n', '两边都是多个'],
              ],
              highlightedRows: [2],
              fadedRows: [0, 1],
            },
          ],
        },
      ],
    },
    {
      type: 'scene',
      title: 'E-R 图的绘制过程',
      steps: [
        {
          text: '1. 先找出所有实体。\n比如：学生、班级、老师、课程。',
        },
        {
          text: '2. 给每个实体加上它的属性。\n学生有：学号、姓名、年龄、性别。',
        },
        {
          text: '3. 画出实体之间的连线。\n学生属于班级，学生选了课程，\n老师教授课程。',
        },
        {
          text: '4. 在连线旁标出联系类型。\n学生-班级是 1:n，\n学生-课程是 m:n。',
        },
        {
          text: '5. 最后就是完整的 E-R 图了！\n实体框、属性椭圆、联系菱形，\n三类元素各有各的形状。',
        },
      ],
      advanceMode: 'click',
    },
    {
      type: 'multiple-choice',
      question: '"一个人只有一个出生日期，\n一个出生日期对应多个人"——\n这是什么联系？',
      options: [
        {
          text: '1:1',
          correct: false,
          explanation: '出生日期可以对应多个人，不是"一对一"的。',
        },
        {
          text: '1:n',
          correct: true,
          explanation: '人(1)对出生日期——哎等等，反过来看：一个出生日期对多个人，所以是...(1)对(n)。',
        },
        {
          text: 'm:n',
          correct: false,
          explanation: '一个人只有一个出生日期，不是多对多。',
        },
        {
          text: '无法确定',
          correct: false,
          explanation: '条件足够确定，是 1:n 关系。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '"丈夫和妻子（一夫一妻制）"——\n这是什么联系？',
      options: [
        {
          text: '1:1',
          correct: true,
          explanation: '一夫一妻制下，一个丈夫对应一个妻子。',
        },
        {
          text: '1:n',
          correct: false,
          explanation: '一夫一妻制下不允许多个配偶，所以不是 1:n。',
        },
        {
          text: 'm:n',
          correct: false,
          explanation: '没有多对多的特征。',
        },
        {
          text: '没有联系',
          correct: false,
          explanation: '丈夫和妻子之间当然存在婚姻联系。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '"医生和患者——\n一个医生看多个患者，\n一个患者可以看多个医生"——\n这是什么联系？',
      options: [
        {
          text: '1:1',
          correct: false,
          explanation: '两边都是"多个"，不是一对一。',
        },
        {
          text: '1:n',
          correct: false,
          explanation: '一个患者看多个医生就不是一对多了。',
        },
        {
          text: 'm:n',
          correct: true,
          explanation: '两边都可以对应多个实例，是多对多的典型场景。',
        },
        {
          text: '递归联系',
          correct: false,
          explanation: '虽然医生和患者都是人，但这是两个不同角色，不是递归。',
        },
      ],
    },
    {
      type: 'predict-output',
      instruction: '给定 E-R 描述，\n判断转换成关系模式需要几张表：',
      code: '实体：书（ISBN，书名，定价）\n实体：作者（身份证号，姓名）\n联系：撰写（一个作者写多本书，\n      一本书可能有多个作者）',
      expectedOutput: '三张表：书表、作者表、\n撰写关系表（m:n 需要第三张）',
      options: [
        {
          text: '两张表，外键放书表',
          correct: false,
          explanation: '这是 m:n 关系，不是 1:n，一张外键解决不了。',
        },
        {
          text: '两张表，外键放作者表',
          correct: false,
          explanation: '一本书有多个作者，一个作者有多本书，外键放哪边都会导致数据冗余。',
        },
        {
          text: '三张表：书、作者、撰写关系表',
          correct: true,
          explanation: 'm:n 必须拆分成两个 1:n，通过第三张关系表实现。',
        },
        {
          text: '一张表合并所有字段',
          correct: false,
          explanation: '合并会导致大量数据冗余，违反数据库设计原则。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '在 E-R 图中，联系的"度数"是指什么？',
      options: [
        {
          text: '关联的实体个数',
          correct: true,
          explanation: '联系的度数是指参与联系的实体数目。二元联系是 2 度。',
        },
        {
          text: '实体的属性数量',
          correct: false,
          explanation: '属性数量和联系度数无关。',
        },
        {
          text: '联系的类型（1:1 等）',
          correct: false,
          explanation: '联系类型是映射基数，不是度数。',
        },
        {
          text: '实体的实例数量',
          correct: false,
          explanation: '实例数量和概念层面的度数不一样。',
        },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '把场景和对应的联系类型连线：',
      fragments: [
        '国家 - 首都 → 1:1',
        '妈妈 - 孩子 → 1:n',
        '商品 - 订单 → m:n',
      ],
      distractors: [
        '国家 - 首都 → 1:n',
        '商品 - 订单 → 1:1',
      ],
    },
    {
      type: 'compare-snippets',
      instruction: '比较下面两个 E-R 设计：',
      question: '哪个正确地表达了"教师和课程"的关系？\n（假定一个教师教多门课，\n一门课只由一个教师教）',
      snippets: [
        {
          id: 'a',
          title: '设计 A',
          code: '教师(1)---<任教>---(n)课程',
          correct: true,
          badge: '正确',
          explanation: '1:n 的 E-R 表示：教师一边为 1，课程一边为 n。',
        },
        {
          id: 'b',
          title: '设计 B',
          code: '教师(1)---<任教>---(1)课程',
          correct: false,
          badge: '错误',
          explanation: '如果一门课只由一个教师教，但从教师看可以教多门课，应该是 1:n 不是 1:1。',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'fill-in',
      prompt: '根据描述填联系类型：',
      template: '（1）省份和城市 → ____\n（2）用户和手机号（实名制） → ____\n（3）歌手和歌曲 → ____',
      answers: ['1:n', '1:1', 'm:n'],
      hints: ['一个省有多个城市', '一个手机号只属于一个用户', '一个歌手唱多首歌，一首歌可由多个歌手唱'],
    },
    {
      type: 'scene',
      title: '1:1 关系在表里怎么存',
      steps: [
        {
          text: '1:1 关系中，外键可以放在任意一端。\n但通常放在访问更频繁的那端。',
        },
        {
          text: '例如"用户 - 身份证"：\n用户表 (id, name, id_card_num)\n身份证表 (id, issue_date)',
        },
        {
          text: '或者反过来：\n用户表 (id, name)\n身份证表 (id, issue_date, user_id)',
        },
        {
          text: '两种设计都是 1:1，\n区别只在于外键放哪边。',
        },
      ],
      advanceMode: 'click',
    },
    {
      type: 'multiple-choice',
      question: '"一个仓库可以存放多种商品，\n一种商品只能存放在一个仓库"——\n从商品的角度看，这是什么联系？',
      options: [
        {
          text: '1:1',
          correct: false,
          explanation: '从商品看是 1:1，但从仓库看是 1:n，整体是 1:n 关系。',
        },
        {
          text: '1:n',
          correct: true,
          explanation: '仓库(1)对商品(n)——一个仓库有多种商品，整体是 1:n。',
        },
        {
          text: 'm:n',
          correct: false,
          explanation: '一种商品只在一个仓库，不是多对多。',
        },
        {
          text: '看角度，无法确定',
          correct: false,
          explanation: '虽然从不同实体看映射不同，但整体明确是 1:n。',
        },
      ],
    },
    {
      type: 'predict-output',
      instruction: '下面的 E-R 片段会生成什么关系模式？',
      code: '实体：顾客（顾客ID，姓名）\n实体：住址（地址ID，街道，城市）\n联系：居住（一个顾客可以有\n      多个住址，一个住址只属于\n      一个顾客）',
      expectedOutput: '顾客表 + 住址表。\n外键 customer_id 放在住址表（n 端）',
      options: [
        {
          text: '一张大表：顾客+住址合并',
          correct: false,
          explanation: '一个顾客有多个地址时，合并会导致大量重复的顾客信息。',
        },
        {
          text: '两张表，住址表加顾客外键',
          correct: true,
          explanation: '1:n 关系中，外键放在 n 端（住址表），这是标准做法。',
        },
        {
          text: '两张表，顾客表加住址外键',
          correct: false,
          explanation: '一个顾客有多个住址，顾客表里放不下多个外键。',
        },
        {
          text: '三张表',
          correct: false,
          explanation: '只有 m:n 需要三张表，1:n 不需要额外关系表。',
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: 'E-R 图三要素填空：',
      template: 'E-R 图中，____用矩形表示，\n____用椭圆表示，\n____用菱形表示。',
      answers: ['实体', '属性', '联系'],
      hints: ['它是现实世界的对象', '它是对象的特征', '它是对象间的关联'],
    },
    {
      type: 'compare-snippets',
      instruction: '下面两段 SQL 设计哪个正确表达了 1:1 关系？',
      question: '"员工 - 工牌"是一个 1:1 关系，\n哪个建表方案正确？',
      snippets: [
        {
          id: 'a',
          title: '方案 A',
          code: 'CREATE TABLE emp (\n  id INT PRIMARY KEY,\n  name VARCHAR(50),\n  badge_id INT UNIQUE\n);\nCREATE TABLE badge (\n  id INT PRIMARY KEY\n);',
          correct: true,
          badge: '正确',
          explanation: 'UNIQUE 保证了 badge_id 不重复，实现 1:1。',
        },
        {
          id: 'b',
          title: '方案 B',
          code: 'CREATE TABLE emp (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);\nCREATE TABLE badge (\n  id INT PRIMARY KEY,\n  emp_id INT  -- 没有 UNIQUE\n);',
          correct: false,
          badge: '有问题',
          explanation: '没有 UNIQUE，一个员工可能被分配多个工牌，变成 1:n 了。',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'match-blocks',
      instruction: '把 E-R 要素和对应图形配对：',
      fragments: [
        '实体 → 矩形',
        '属性 → 椭圆',
        '联系 → 菱形',
      ],
      distractors: [
        '实体 → 三角形',
        '属性 → 正方形',
      ],
    },
    {
      type: 'fix-code',
      instruction: '设计中有错误，选择正确修复：',
      buggyCode: '-- 学生和课程是 m:n 关系\n-- 设计者这样建表：\nCREATE TABLE sc (\n  student_id INT,\n  course_id INT,\n  grade INT\n);',
      goal: 'sc 表缺少主键约束',
      mode: 'choose-fix',
      fixes: [
        {
          text: '用 student_id 做单列主键',
          correct: false,
          explanation: '一个学生选多门课，单列 student_id 会重复。',
        },
        {
          text: '用 (student_id, course_id) 做联合主键',
          correct: true,
          explanation: '联合主键可以确保同一个人选同一门课只出现一次。',
        },
        {
          text: '加一个 id 自增主键就行',
          correct: false,
          explanation: '自增 id 虽然不会重复，但无法防止同一个人重复选同一门课。',
        },
        {
          text: '不需要主键',
          correct: false,
          explanation: '每张表都应该有主键，这是关系模型的基本要求。',
        },
      ],
    },
    {
      type: 'exposition',
      text: '判断联系类型的核心方法：\n\n从两个方向分别问自己：\n"这个实体可以对应多少个\n另一个实体？"\n\n如果两边都是"一个"→ 1:1\n如果一边"一个"一边"多个"→ 1:n\n如果两边都是"多个"→ m:n',
    },
  ],
}

export default lesson
