import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-er-to-schema',
    chapter: 4,
    title: 'E-R 图转关系模式',
    subtitle: '设计 · 建表 · 约束',
    description: '从 E-R 图出发，设计社团管理系统的数据库表结构，写出带约束的建表语句。',
    objectives: [
      '能够从需求中识别实体和联系',
      '能够为实体分配主键并设计外键',
      '能够写出带约束的 CREATE TABLE 语句',
      '能够编写多表 JOIN 查询和聚合查询',
    ],
    estimatedMinutes: 20,
    pathway: {
      subject: 'sql',
      knowledgePoints: [{ id: 'sql.er-to-schema', label: 'E-R 图转关系模式' }],
      contentKinds: ['challenge'],
      stage: 'production',
    },
  },
  blocks: [
    // ─────────────────────────────────────────────
    // 1. 问题引入
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: '学校里有几十个社团，每年招新几百人。\n如何用数据库来管理这些信息？',
      textAnimation: 'typewriter',
    },

    // ─────────────────────────────────────────────
    // 2. 场景：需求分析
    // ─────────────────────────────────────────────
    {
      type: 'scene',
      title: '社团管理需求',
      steps: [
        { text: '教务老师说：我需要记录每个社团的信息——名称、成立时间。' },
        { text: '还要记录学生信息——姓名、班级。' },
        { text: '最重要的是：谁加入了哪个社团、什么时候加入的。' },
        { text: '三个关键信息对应三张表：club、user、join_club。' },
        { text: '设计数据库的第一步：从需求中识别实体和联系。' },
      ],
    },

    // ─────────────────────────────────────────────
    // 3. E-R 转关系模式
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: '需求清楚了，看看背后的设计方法。\n**E-R 图 → 关系模式 → CREATE TABLE** 是标准流程。',
    },

    // ─────────────────────────────────────────────
    // 4. 概念卡：E-R 核心概念
    // ─────────────────────────────────────────────
    {
      type: 'concept-cards',
      instruction: '复习 E-R 图的四个核心概念：',
      cards: [
        {
          term: '实体',
          meaning: '现实世界中可区分的对象，如一个社团、一个学生',
          example: 'club',
        },
        {
          term: '属性',
          meaning: '实体的特征，如社团的名称、成立时间',
          example: 'cname, ctime',
        },
        {
          term: '联系',
          meaning: '实体之间的关系，如"学生加入社团"',
          example: 'join_club',
        },
        {
          term: '主键',
          meaning: '能唯一确定一行记录的列或列组合',
          example: 'cid, sid',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 5. 识别实体（多选）
    // ─────────────────────────────────────────────
    {
      type: 'multiple-choice',
      question: '在这个社团管理场景中，哪些属于"实体"？（多选）',
      mode: 'multiple',
      options: [
        {
          text: '社团（club）',
          correct: true,
          explanation: '社团是真实存在的对象，有独立属性',
        },
        {
          text: '学生（user）',
          correct: true,
          explanation: '每个学生都是独立的实体',
        },
        {
          text: '入社记录（join_club）',
          correct: true,
          explanation: '入社记录自身有属性（jid、jtime），属于联系实体',
        },
        {
          text: '社团名称（cname）',
          correct: false,
          explanation: 'cname 是社团实体的属性，不是实体本身',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 6. 联系类型（单选）
    // ─────────────────────────────────────────────
    {
      type: 'multiple-choice',
      question: '社团和学生之间是什么类型的联系？',
      options: [
        {
          text: '一对一（1:1）：一个社团只能有一个学生',
          correct: false,
          explanation: '一个社团明显有多名学生',
        },
        {
          text: '一对多（1:N）：一个社团有多个学生',
          correct: false,
          explanation: '一个学生也可以加多个社团，所以不是 1:N',
        },
        {
          text: '多对多（M:N）：一个学生可加多个社团，一个社团有多个学生',
          correct: true,
          explanation: 'M:N 联系需要用中间表 join_club 来记录',
        },
        {
          text: '没有联系',
          correct: false,
          explanation: '社团和学生明显有关联',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 7. 实体转表
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: '每个实体变成一张表，属性变成列。\n第一步：确定主键——用哪个列唯一标识一行。',
    },

    // ─────────────────────────────────────────────
    // 8. type-it: CREATE TABLE club
    // ─────────────────────────────────────────────
    {
      type: 'type-it',
      instruction: '敲出 club 表的建表语句，包含主键和 NOT NULL 约束：',
      code: 'CREATE TABLE club (\n  cid INT PRIMARY KEY,\n  cname VARCHAR(50) NOT NULL,\n  ctime DATE\n);',
      hints: [
        'PRIMARY KEY 放在 cid 后面',
        'VARCHAR(50) 适合长度可变的名称',
        'DATE 类型存储年月日',
      ],
    },

    // ─────────────────────────────────────────────
    // 9. fill-in: CREATE TABLE user
    // ─────────────────────────────────────────────
    {
      type: 'fill-in',
      prompt: '补全 user 表的建表语句，补充缺失的主键和 NOT NULL 约束：',
      template: 'CREATE TABLE user (\n  sid ____,\n  sname ____(30) NOT NULL,\n  sclass VARCHAR(20)\n);',
      answers: ['INT PRIMARY KEY', 'VARCHAR'],
      hints: ['主键用 INT PRIMARY KEY 格式', 'VARCHAR 类型存储字符串'],
    },

    // ─────────────────────────────────────────────
    // 10. 外键介绍
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: '联系怎么反映在表里？用 **外键（FOREIGN KEY）**。\njoin_club 的 cid 指向 club，sid 指向 user。',
    },

    // ─────────────────────────────────────────────
    // 11. type-it: CREATE TABLE join_club
    // ─────────────────────────────────────────────
    {
      type: 'type-it',
      instruction: '敲 join_club 表的建表语句，包含两个外键约束：',
      code: 'CREATE TABLE join_club (\n  jid INT PRIMARY KEY,\n  cid INT NOT NULL,\n  sid INT NOT NULL,\n  jtime DATE,\n  FOREIGN KEY (cid) REFERENCES club(cid),\n  FOREIGN KEY (sid) REFERENCES user(sid)\n);',
      hints: [
        'FOREIGN KEY 引用另一个表的主键',
        'cid 引用 club(cid)',
        'sid 引用 user(sid)',
      ],
    },

    // ─────────────────────────────────────────────
    // 12. 识别外键（多选）
    // ─────────────────────────────────────────────
    {
      type: 'multiple-choice',
      question: 'join_club 表中哪些列是外键？（多选）',
      mode: 'multiple',
      options: [
        {
          text: 'jid',
          correct: false,
          explanation: 'jid 是 join_club 自身的主键',
        },
        {
          text: 'cid',
          correct: true,
          explanation: 'cid 引用 club(cid)',
        },
        {
          text: 'sid',
          correct: true,
          explanation: 'sid 引用 user(sid)',
        },
        {
          text: 'jtime',
          correct: false,
          explanation: 'jtime 是普通日期属性',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 13. predict-output: DESCRIBE 表结构
    // ─────────────────────────────────────────────
    {
      type: 'predict-output',
      instruction: 'DESCRIBE 用来查看表结构。下面哪个选项最接近执行结果？',
      code: 'DESCRIBE join_club;',
      expectedOutput: 'Field  Type         Null  Key  Default\njid    INT          NO    PRI  NULL\ncid    INT          NO    MUL  NULL\nsid    INT          NO    MUL  NULL\njtime  DATE         YES         NULL',
      options: [
        {
          text: 'jid INT, cid INT, sid INT, jtime DATE',
          correct: false,
          explanation: 'DESCRIBE 输出包含 Field、Type、Null、Key 等多列',
        },
        {
          text: '一个包含 Field、Type、Null、Key 等列的表格',
          correct: true,
          explanation: 'DESCRIBE 输出表结构的元数据，PRI=主键，MUL=外键',
        },
        {
          text: 'join_club 表中的所有数据行',
          correct: false,
          explanation: 'DESCRIBE 查看表结构，不是查询数据',
        },
        {
          text: '编译错误',
          correct: false,
          explanation: 'DESCRIBE 是合法的 MySQL 命令',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 14. 转入查询
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: '表设计好了，来写查询。\n目标：找出"围棋社"的所有成员。',
    },

    // ─────────────────────────────────────────────
    // 15. choose-next-line: 逐步构建 JOIN
    // ─────────────────────────────────────────────
    {
      type: 'choose-next-line',
      instruction: '一步步构建 SQL 查询：列出"围棋社"所有成员的姓名和班级。',
      context: '需要做三表 JOIN：club → join_club → user。从 SELECT 开始。',
      steps: [
        {
          prompt: '第一步：先选要查的列——',
          options: [
            {
              line: 'SELECT u.sname, u.sclass',
              correct: true,
              explanation: '正确。从 user 表选姓名和班级',
            },
            {
              line: 'SELECT *',
              correct: false,
              explanation: '用 * 会返回所有列，太多不必要信息',
            },
            {
              line: 'SELECT c.cname, u.sname',
              correct: false,
              explanation: '题目要姓名和班级，不用社团名称',
            },
          ],
        },
        {
          prompt: '第二步：FROM 应该写哪个表？',
          options: [
            {
              line: 'FROM user u',
              correct: true,
              explanation: '从 user 表开始，给它别名 u',
            },
            {
              line: 'FROM join_club jc',
              correct: false,
              explanation: '从 join_club 开始也可以，但用主表更清晰',
            },
            {
              line: 'FROM club c',
              correct: false,
              explanation: '最终需要用户信息，从 user 开始更直接',
            },
          ],
        },
        {
          prompt: '第三步：JOIN join_club——关联条件是什么？',
          options: [
            {
              line: 'JOIN join_club jc ON u.sid = jc.sid',
              correct: true,
              explanation: '通过 sid 关联 user 和 join_club',
            },
            {
              line: 'JOIN join_club jc ON u.sname = jc.sid',
              correct: false,
              explanation: '姓名和编号类型不匹配',
            },
            {
              line: 'JOIN join_club jc ON u.sid = jc.jid',
              correct: false,
              explanation: 'sid 和 jid 含义不同，不能关联',
            },
          ],
        },
        {
          prompt: '第四步：再 JOIN club——关联条件？',
          options: [
            {
              line: 'JOIN club c ON jc.cid = c.cid',
              correct: true,
              explanation: '通过 cid 关联 join_club 和 club',
            },
            {
              line: 'JOIN club c ON u.sid = c.cid',
              correct: false,
              explanation: 'user 的 sid 和 club 的 cid 没有关联',
            },
            {
              line: 'JOIN club c ON 1 = 1',
              correct: false,
              explanation: '笛卡尔积没有意义，需要正确的关联条件',
            },
          ],
        },
        {
          prompt: '第五步：WHERE 条件过滤——',
          options: [
            {
              line: "WHERE c.cname = '围棋社'",
              correct: true,
              explanation: '只筛选围棋社的成员',
            },
            {
              line: 'WHERE c.cname = 围棋社',
              correct: false,
              explanation: '字符串要加单引号',
            },
            {
              line: 'WHERE u.sclass = "一班"',
              correct: false,
              explanation: '题目要找的是围棋社成员',
            },
          ],
        },
      ],
      finalCode: "SELECT u.sname, u.sclass\nFROM user u\nJOIN join_club jc ON u.sid = jc.sid\nJOIN club c ON jc.cid = c.cid\nWHERE c.cname = '围棋社';",
    },

    // ─────────────────────────────────────────────
    // 16. type-it: 完整 JOIN 查询
    // ─────────────────────────────────────────────
    {
      type: 'type-it',
      instruction: '完整敲一遍上一步得到的 JOIN 查询，巩固多表关联语法：',
      code: "SELECT u.sname, u.sclass\nFROM user u\nJOIN join_club jc ON u.sid = jc.sid\nJOIN club c ON jc.cid = c.cid\nWHERE c.cname = '围棋社';",
      hints: [
        '第一行选要查的列',
        'JOIN 要加 ON 条件',
        '字符串值用单引号括起来',
      ],
    },

    // ─────────────────────────────────────────────
    // 17. 聚合查询选择（单选）
    // ─────────────────────────────────────────────
    {
      type: 'multiple-choice',
      question: '要统计每个社团有多少成员，应该用哪个查询？',
      options: [
        {
          text: 'SELECT cname, sid FROM club JOIN join_club;',
          correct: false,
          explanation: '没有聚合函数，不能统计数量',
        },
        {
          text: 'SELECT cname, COUNT(sid) FROM club JOIN join_club GROUP BY cname;',
          correct: true,
          explanation: 'COUNT 统计成员数，GROUP BY 按社团分组',
        },
        {
          text: 'SELECT cname, SUM(sid) FROM club JOIN join_club GROUP BY cname;',
          correct: false,
          explanation: 'SUM 是求和，不是计数',
        },
        {
          text: 'SELECT cname, COUNT(sid) FROM club JOIN join_club;',
          correct: false,
          explanation: '缺少 GROUP BY 会导致语法错误或只返回一行',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 18. fill-in: GROUP BY + HAVING
    // ─────────────────────────────────────────────
    {
      type: 'fill-in',
      prompt: '补全查询：列出成员数大于 3 的社团名称和人数。',
      template: "SELECT c.cname, ____(jc.sid) AS member_count\nFROM club c\nLEFT ____ join_club jc ____ c.cid = jc.cid\nGROUP ____ c.cid, c.cname\n____ COUNT(jc.sid) > 3;",
      answers: ['COUNT', 'JOIN', 'ON', 'BY', 'HAVING'],
      hints: [
        'COUNT 统计记录数量',
        'LEFT JOIN 保留没有成员的社团',
        'GROUP BY 按社团分组',
        'HAVING 过滤聚合后的结果',
      ],
    },

    // ─────────────────────────────────────────────
    // 19. predict-output: 查询结果
    // ─────────────────────────────────────────────
    {
      type: 'predict-output',
      instruction: '假设数据库有以下数据，预测查询结果：',
      code: '-- club 表\n-- cid | cname  | ctime\n-- 1   | 围棋社  | 2020-09-01\n-- 2   | 篮球社  | 2021-03-15\n-- 3   | 音乐社  | 2022-01-10\n\n-- join_club 表\n-- jid | cid | sid | jtime\n-- 1   | 1   | 101 | 2024-09-10\n-- 2   | 1   | 102 | 2024-09-10\n-- 3   | 2   | 101 | 2024-09-11\n-- 4   | 2   | 103 | 2024-09-12\n-- 5   | 3   | 102 | 2024-09-15\n\nSELECT c.cname, COUNT(jc.sid) AS member_count\nFROM club c\nLEFT JOIN join_club jc ON c.cid = jc.cid\nGROUP BY c.cid, c.cname;',
      expectedOutput: '围棋社 | 2\n篮球社 | 2\n音乐社 | 1',
      options: [
        {
          text: '围棋社 2，篮球社 2，音乐社 1',
          correct: true,
          explanation: 'LEFT JOIN 保留所有社团，COUNT 统计每个社团的 join_club 记录数',
        },
        {
          text: '围棋社 2，篮球社 2，音乐社 0',
          correct: false,
          explanation: '音乐社在 join_club 中有 1 条记录（sid=102）',
        },
        {
          text: '围棋社 1，篮球社 2，音乐社 1',
          correct: false,
          explanation: '围棋社有 2 条 join_club 记录（101 和 102）',
        },
        {
          text: '只有两行：围棋社和篮球社',
          correct: false,
          explanation: 'LEFT JOIN 不会丢失 club 中的行',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 20. animated-timeline: 最终 schema 展示
    // ─────────────────────────────────────────────
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
      },
      scenes: [
        {
          narration: 'club 表存储社团基本信息，cid 是主键。',
          mode: 'full',
          elements: [
            {
              type: 'table',
              id: 'schema-club',
              headers: ['列名', '类型', '约束'],
              rows: [
                ['cid', 'INT', 'PRIMARY KEY'],
                ['cname', 'VARCHAR(50)', 'NOT NULL'],
                ['ctime', 'DATE', ''],
              ],
            },
          ],
        },
        {
          narration: 'user 表存储学生信息，sid 是主键。',
          mode: 'full',
          elements: [
            {
              type: 'table',
              id: 'schema-user',
              headers: ['列名', '类型', '约束'],
              rows: [
                ['sid', 'INT', 'PRIMARY KEY'],
                ['sname', 'VARCHAR(30)', 'NOT NULL'],
                ['sclass', 'VARCHAR(20)', ''],
              ],
            },
          ],
        },
        {
          narration: 'join_club 是关联表，用外键连接 club 和 user。',
          mode: 'full',
          elements: [
            {
              type: 'table',
              id: 'schema-join-club',
              headers: ['列名', '类型', '约束'],
              rows: [
                ['jid', 'INT', 'PRIMARY KEY'],
                ['cid', 'INT', 'FK -> club(cid)'],
                ['sid', 'INT', 'FK -> user(sid)'],
                ['jtime', 'DATE', ''],
              ],
            },
          ],
        },
        {
          narration: '完整关系模式：club <-- join_club --> user。M:N 联系通过中间表实现。',
          mode: 'full',
          elements: [
            {
              type: 'text',
              id: 'schema-summary',
              content: 'club(cid, cname, ctime)\nuser(sid, sname, sclass)\njoin_club(jid, cid, sid, jtime)',
              variant: 'body',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 21. 总结
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: '这节课我们走完了数据库设计的完整流程：\n需求分析 -> E-R 设计 -> 关系模式 -> CREATE TABLE -> 查询。\n\n掌握了：实体识别、主键外键、多对多联系、多表 JOIN、聚合分组。',
    },
  ],
}

export default lesson
