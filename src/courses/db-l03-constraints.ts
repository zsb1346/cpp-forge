import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-constraints',
    chapter: 1,
    title: '五大约束',
    subtitle: 'PK · FK · UNIQUE · CHECK · DEFAULT',
    description: '掌握 MySQL 五大约束的含义、语法和适用场景。',
    objectives: [
      '区分五大约束的作用',
      '能在 CREATE TABLE 语句中添加约束',
      '理解每种约束解决的问题',
    ],
    estimatedMinutes: 12,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.constraints', label: '五大约束' },
      ],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '我们要给表里的数据定规矩。\n\n学号不能重复。\n年龄不能是负数。\n性别只有男、女、其他。\n\n这些规矩在数据库里叫——约束。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'MySQL 有五大约束，\n每个约束解决一个问题：\n\n1. PRIMARY KEY — 主键，唯一标识一行\n2. FOREIGN KEY — 外键，引用另一张表\n3. UNIQUE — 值不能重复\n4. CHECK — 值必须符合条件\n5. DEFAULT — 不给值时用默认值',
    },
    {
      type: 'concept-cards',
      instruction: '五大约束速览：',
      cards: [
        {
          term: 'PRIMARY KEY',
          meaning: '每行数据的唯一标识，不能为空不能重复',
          example: 'student_id INT PRIMARY KEY',
        },
        {
          term: 'FOREIGN KEY',
          meaning: '引用另一张表的主键，保证数据完整性',
          example: 'dept_id INT REFERENCES dept(id)',
        },
        {
          term: 'UNIQUE',
          meaning: '列的值不能重复，但可以为 NULL',
          example: 'email VARCHAR(100) UNIQUE',
        },
        {
          term: 'CHECK',
          meaning: '限制列的值必须满足某个条件',
          example: 'age INT CHECK (age >= 0)',
        },
        {
          term: 'DEFAULT',
          meaning: '插入时如果不给值，就用默认值',
          example: 'status INT DEFAULT 0',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个约束可以保证"邮箱地址不重复"？',
      options: [
        {
          text: 'PRIMARY KEY',
          correct: false,
          explanation: 'PK 也能保证不重复，但一张表只能有一个 PK，且 PK 不能为 NULL。邮箱适合用 UNIQUE。',
        },
        {
          text: 'UNIQUE',
          correct: true,
          explanation: 'UNIQUE 约束保证列的值不重复，且可以存在多个 UNIQUE。',
        },
        {
          text: 'FOREIGN KEY',
          correct: false,
          explanation: '外键引用另一张表的主键，不保证当前列的值不重复。',
        },
        {
          text: 'DEFAULT',
          correct: false,
          explanation: 'DEFAULT 只提供默认值，不限制重复。',
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: '外键约束的主要作用是什么？',
      options: [
        {
          text: '加快查询速度',
          correct: false,
          explanation: '外键不直接提升查询速度，索引才提升速度。',
        },
        {
          text: '保证引用完整性',
          correct: true,
          explanation: '外键确保当前表的值在另一张表中存在，防止"孤儿数据"。',
        },
        {
          text: '防止数据重复',
          correct: false,
          explanation: '防重复是 UNIQUE 或主键的职责。',
        },
        {
          text: '节省磁盘空间',
          correct: false,
          explanation: '外键不会节省空间，反而需要额外存储。',
        },
      ],
    },
    {
      type: 'compare-snippets',
      instruction: '比较下面两个建表方案：',
      question: '哪个方案更好地使用了约束？',
      snippets: [
        {
          id: 'a',
          title: '方案 A',
          code: 'CREATE TABLE student (\n  id INT PRIMARY KEY,\n  email VARCHAR(100) UNIQUE,\n  age INT CHECK (age > 0),\n  status INT DEFAULT 1\n);',
          correct: true,
          badge: '完善',
          explanation: 'PK 防重复和空值，UNIQUE 防邮箱重复，CHECK 防止年龄≤0，DEFAULT 提供默认状态。',
        },
        {
          id: 'b',
          title: '方案 B',
          code: 'CREATE TABLE student (\n  id INT,\n  email VARCHAR(100),\n  age INT,\n  status INT\n);',
          correct: false,
          badge: '缺少约束',
          explanation: '没有任何约束：id 可以重复为空，email 可以重复，age 可以为负数，status 不知道默认值。',
        },
      ],
      compareBy: 'style',
    },
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
        layout: 'split-code',
      },
      scenes: [
        {
          narration: '第一步：先建一个空的员工表，\n只有字段没有约束。',
          mode: 'full',
          elements: [
            {
              type: 'code',
              id: 'constraint-step',
              code: 'CREATE TABLE emp (\n  id INT,\n  name VARCHAR(20),\n  email VARCHAR(100),\n  dept_id INT,\n  age INT,\n  salary DECIMAL(10,2)\n);',
              language: 'sql',
            },
            {
              type: 'table',
              id: 'constraint-guide',
              headers: ['约束', '语句', '作用'],
              rows: [
                ['无', '--', '没有任何限制'],
              ],
            },
          ],
        },
        {
          narration: '第二步：加 PRIMARY KEY——\nid 作为员工唯一标识。',
          mode: 'delta',
          elements: [
            {
              type: 'code',
              id: 'constraint-step',
              code: 'CREATE TABLE emp (\n  id INT PRIMARY KEY,  -- 新增\n  name VARCHAR(20),\n  email VARCHAR(100),\n  dept_id INT,\n  age INT,\n  salary DECIMAL(10,2)\n);',
              language: 'sql',
              highlightedLines: [2],
            },
            {
              type: 'table',
              id: 'constraint-guide',
              headers: ['约束', '语句', '作用'],
              rows: [
                ['PRIMARY KEY', 'id INT PK', '唯一标识员工'],
              ],
              highlightedRows: [0],
            },
          ],
        },
        {
          narration: '第三步：加 UNIQUE——\n邮箱不能重复。\n加 CHECK——年龄必须 ≥ 18。',
          mode: 'delta',
          elements: [
            {
              type: 'code',
              id: 'constraint-step',
              code: 'CREATE TABLE emp (\n  id INT PRIMARY KEY,\n  name VARCHAR(20),\n  email VARCHAR(100) UNIQUE,  -- 新增\n  dept_id INT,\n  age INT CHECK (age >= 18),  -- 新增\n  salary DECIMAL(10,2)\n);',
              language: 'sql',
              highlightedLines: [4, 6],
            },
            {
              type: 'table',
              id: 'constraint-guide',
              headers: ['约束', '语句', '作用'],
              rows: [
                ['PRIMARY KEY', 'id INT PK', '唯一标识员工'],
                ['UNIQUE', 'email UNIQUE', '邮箱不能重复'],
                ['CHECK', 'age >= 18', '必须成年'],
              ],
              highlightedRows: [1, 2],
              fadedRows: [0],
            },
          ],
        },
        {
          narration: '第四步：加 DEFAULT——\n默认工资设为 0。\n加 FOREIGN KEY——\ndept_id 引用部门表。',
          mode: 'delta',
          elements: [
            {
              type: 'code',
              id: 'constraint-step',
              code: 'CREATE TABLE emp (\n  id INT PRIMARY KEY,\n  name VARCHAR(20),\n  email VARCHAR(100) UNIQUE,\n  dept_id INT REFERENCES dept(id),  -- 新增\n  age INT CHECK (age >= 18),\n  salary DECIMAL(10,2) DEFAULT 0    -- 新增\n);',
              language: 'sql',
              highlightedLines: [5, 7],
            },
            {
              type: 'table',
              id: 'constraint-guide',
              headers: ['约束', '语句', '作用'],
              rows: [
                ['PRIMARY KEY', 'id INT PK', '唯一标识员工'],
                ['UNIQUE', 'email UNIQUE', '邮箱不能重复'],
                ['CHECK', 'age >= 18', '必须成年'],
                ['FOREIGN KEY', 'dept_id FK', '引用部门'],
                ['DEFAULT', 'salary DEFAULT 0', '默认工资 0'],
              ],
              highlightedRows: [3, 4],
              fadedRows: [0, 1, 2],
            },
          ],
        },
      ],
    },
    {
      type: 'type-it',
      instruction: '创建一个带约束的 course 表：',
      code: 'CREATE TABLE course (\n  id INT PRIMARY KEY,\n  name VARCHAR(50) UNIQUE,\n  credit INT CHECK (credit > 0),\n  status INT DEFAULT 1\n);',
      hints: [
        '主键用 id',
        '课程名不能重复用 UNIQUE',
        '学分大于 0 用 CHECK',
        '状态默认 1 用 DEFAULT',
      ],
    },
    {
      type: 'multiple-choice',
      question: '一张表最多可以有几个 PRIMARY KEY？',
      options: [
        {
          text: '0 个',
          correct: false,
          explanation: '虽然技术上可以没有 PK，但强烈建议每张表都有 PK。',
        },
        {
          text: '1 个',
          correct: true,
          explanation: 'PRIMARY KEY 每张表只有一个，但可以是联合主键（多个列）。',
        },
        {
          text: '多个',
          correct: false,
          explanation: '不能有多个 PK，但可以用多个 UNIQUE。',
        },
        {
          text: '取决于表大小',
          correct: false,
          explanation: '这不是由表大小决定的，关系模型规定每张表只有一个主键。',
        },
      ],
    },
    {
      type: 'fill-in',
      prompt: '约束的用途填空：',
      template: '____约束保证列值不重复，\n____约束保证引用完整性，\n____约束提供默认值。',
      answers: ['UNIQUE', 'FOREIGN KEY', 'DEFAULT'],
      hints: ['这个约束允许一个表有多个', '它引用了另一张表的主键', '不给值时自动填入'],
    },
    {
      type: 'exposition',
      text: 'PK 和 UNIQUE 的区别要分清：\n\nPK = 唯一 + 非空\n一张表只有一个\n\nUNIQUE = 唯一\n一张表可以有多个\n可以为 NULL',
    },
    {
      type: 'fill-in',
      prompt: 'PK 和 UNIQUE 的区别填空：',
      template: 'PK 不允许____值，\n而 UNIQUE 允许。\n一张表可以有____个 UNIQUE，\n但只有____个 PK。',
      answers: ['NULL', '多个', '一'],
      hints: ['PK 有这个限制', 'UNIQUE 的数量', 'PK 的数量'],
    },
    {
      type: 'exposition',
      text: 'FOREIGN KEY 还有一个重要概念：\n级联操作。\n\nON DELETE CASCADE：\n删除主表记录时，\n自动删除从表相关记录。\n\nON DELETE SET NULL：\n删除主表记录时，\n将从表外键设为 NULL。',
    },
    {
      type: 'exposition',
      text: '总结一下五大约束：\n\nPK — 唯一标识\nFK — 引用另一张表\nUNIQUE — 值不重复\nCHECK — 值满足条件\nDEFAULT — 默认值\n\n每个约束都是一条规则，\n让数据更规范、更可靠。',
    },
  ],
}

export default lesson
