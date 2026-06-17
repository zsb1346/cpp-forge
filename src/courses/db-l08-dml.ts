import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-dml',
    chapter: 3,
    title: '数据操作 INSERT / UPDATE / DELETE',
    subtitle: '增删改语法 · TRUNCATE vs DELETE',
    description: '学习用 DML 语句对表中的数据进行增、删、改操作。',
    objectives: [
      '能用 INSERT 向表中添加数据',
      '能用 UPDATE 修改已有数据',
      '能用 DELETE 删除数据行',
      '能区分 TRUNCATE 和 DELETE 的区别',
    ],
    estimatedMinutes: 14,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.dml.insert', label: 'INSERT 语句' },
        { id: 'sql.dml.update', label: 'UPDATE 语句' },
        { id: 'sql.dml.delete', label: 'DELETE 语句' },
        { id: 'sql.dml.truncate', label: 'TRUNCATE 语句' },
      ],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '表建好了，里面是空的。\n接下来学怎么往表里放数据、改数据、删数据。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'DML（Data Manipulation Language）负责操作数据本身。\n三个核心操作：增（INSERT）、改（UPDATE）、删（DELETE）。',
    },
    {
      type: 'concept-cards',
      instruction: '三大 DML 命令速览：',
      cards: [
        { term: 'INSERT', meaning: '插入新的数据行', example: 'INSERT INTO t VALUES (1, "a");' },
        { term: 'UPDATE', meaning: '修改已有行的列值', example: 'UPDATE t SET x=2 WHERE id=1;' },
        { term: 'DELETE', meaning: '删除指定行', example: 'DELETE FROM t WHERE id=1;' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'DML 中哪个命令用来添加新数据？',
      options: [
        { text: 'SELECT', correct: false, explanation: 'SELECT 是查询，不是添加数据' },
        { text: 'INSERT', correct: true, explanation: 'INSERT 专门用来插入新行' },
        { text: 'UPDATE', correct: false, explanation: 'UPDATE 是修改已有数据' },
        { text: 'CREATE', correct: false, explanation: 'CREATE 是 DDL，用来建表' },
      ],
    },
    {
      type: 'exposition',
      text: 'INSERT 的基本语法：\n指定表名和要插入的值。',
      code: 'INSERT INTO students VALUES (1, \'张三\', 20);\n-- 按列顺序依次赋值\n\nINSERT INTO students (name, age) VALUES (\'李四\', 22);\n-- 指定列名，其他列用默认值',
    },
    {
      type: 'type-it',
      instruction: '往 students 表插入一条完整记录：',
      code: "INSERT INTO students VALUES (1, '张三', 20);",
      hints: [
        '字符串值用单引号括起来',
        '数字直接写，不加引号',
        '值顺序要和表定义的列顺序一致',
      ],
    },
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
      },
      scenes: [
        {
          narration: '初始状态：students 表是空的',
          mode: 'full',
          elements: [
            { type: 'table', id: 't1', headers: ['id', 'name', 'age'], rows: [] },
          ],
        },
        {
          narration: '执行 INSERT：插入第一行数据',
          elements: [
            { type: 'code', id: 'c1', code: "INSERT INTO students VALUES (1, '张三', 20);", language: 'sql' },
            { type: 'table', id: 't1', headers: ['id', 'name', 'age'], rows: [[1, '张三', 20]] },
          ],
        },
        {
          narration: '再插入两行，表里现在有三条记录',
          elements: [
            { type: 'code', id: 'c1', code: "INSERT INTO students VALUES (2, '李四', 22);\nINSERT INTO students VALUES (3, '王五', 21);", language: 'sql' },
            { type: 'table', id: 't1', headers: ['id', 'name', 'age'], rows: [[1, '张三', 20], [2, '李四', 22], [3, '王五', 21]] },
          ],
        },
        {
          narration: '执行 UPDATE：把 id=1 的年龄改为 21',
          elements: [
            { type: 'code', id: 'c1', code: "UPDATE students SET age = 21 WHERE id = 1;", language: 'sql', highlightedLines: [1] },
            { type: 'table', id: 't1', headers: ['id', 'name', 'age'], rows: [[1, '张三', 21], [2, '李四', 22], [3, '王五', 21]], highlightedRows: [0] },
          ],
        },
        {
          narration: '执行 DELETE：删除 id=3 的那行',
          elements: [
            { type: 'code', id: 'c1', code: "DELETE FROM students WHERE id = 3;", language: 'sql', highlightedLines: [1] },
            { type: 'table', id: 't1', headers: ['id', 'name', 'age'], rows: [[1, '张三', 21], [2, '李四', 22]], dimmedRows: [2] },
          ],
        },
      ],
    },
    {
      type: 'exposition',
      text: 'UPDATE 的关键是 WHERE 子句。\n不加 WHERE 会更新所有行！',
      code: 'UPDATE students SET age = 30;      -- ❌ 所有人的年龄都变成 30\n\nUPDATE students SET age = 30 WHERE id = 1; -- ✅ 只改 id=1',
    },
    {
      type: 'multiple-choice',
      question: '执行 `UPDATE products SET price = 10;` 后会发生什么？',
      options: [
        { text: '只更新第一行', correct: false, explanation: '没有 WHERE 条件，会更新所有行' },
        { text: '更新所有行的 price 为 10', correct: true, explanation: 'UPDATE 不加 WHERE = 全表更新' },
        { text: '报错，必须加 WHERE', correct: false, explanation: '语法上 WHERE 可省略，但很危险' },
        { text: '只更新 price 为 NULL 的行', correct: false, explanation: '没有 WHERE 条件就是全部行' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一条 UPDATE，只修改指定学生的姓名：',
      code: "UPDATE students SET name = '赵六' WHERE id = 2;",
      hints: [
        'SET 后面写 列名 = 新值',
        '字符串记得加单引号',
        'WHERE id = 2 只改第二行',
      ],
    },
    {
      type: 'exposition',
      text: 'DELETE 也和 WHERE 绑定。\n不加 WHERE = 删光全表。',
      code: 'DELETE FROM students WHERE id = 1;  -- 删一行\n\nDELETE FROM students;                   -- 删全部（危险！）',
    },
    {
      type: 'compare-snippets',
      instruction: '对比两种"清空表"的方式：',
      question: 'DELETE vs TRUNCATE，哪个更快？哪个保留表结构？',
      snippets: [
        {
          id: 'del',
          title: 'DELETE',
          code: 'DELETE FROM students;\n-- 逐行删除，慢\n-- 表结构保留\n-- 可以用 ROLLBACK 恢复',
          correct: false,
          badge: '逐行删',
          explanation: 'DELETE 逐行删除，速度慢，但可以回滚',
        },
        {
          id: 'trunc',
          title: 'TRUNCATE',
          code: 'TRUNCATE students;\n-- 直接清空，快\n-- 表结构保留\n-- 不可回滚',
          correct: true,
          badge: '整体删',
          explanation: 'TRUNCATE 直接清空表，速度快，但不能回滚',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'multiple-choice',
      question: 'TRUNCATE 和 DELETE 的共同点是？',
      options: [
        { text: '都可回滚', correct: false, explanation: 'TRUNCATE 不可回滚，DELETE 在事务内可回滚' },
        { text: '都只删除数据，保留表结构', correct: true, explanation: '两者都只删数据，表结构还在' },
        { text: '都逐行删除', correct: false, explanation: 'DELETE 逐行删，TRUNCATE 整体删' },
        { text: '都需要 WHERE 条件', correct: false, explanation: 'TRUNCATE 不支持 WHERE' },
      ],
    },
    {
      type: 'predict-output',
      instruction: '现有 students 表如下。执行以下 SQL 后，表里还有哪些行？',
      code: '-- students 表初始数据\n-- id | name | age\n-- 1  | 张三  | 20\n-- 2  | 李四  | 22\n-- 3  | 王五  | 21\n\nDELETE FROM students WHERE age < 22;\n\n-- 执行后表里还有哪些行？',
      expectedOutput: 'id=2 (李四,22) 和 id=3 (王五,21) 还在。id=1 (张三,20) 被删了。\n\n-- 结果表：\n-- id | name | age\n-- 2  | 李四  | 22\n-- 3  | 王五  | 21',
      options: [
        { text: '只剩 id=2 李四', correct: false, explanation: '王五 21 不满足 age < 22，所以还在' },
        { text: 'id=2 李四 和 id=3 王五 还在', correct: true, explanation: '删除条件 age < 22，只删了张三' },
        { text: '全部被删光', correct: false, explanation: '条件 age < 22 只匹配到 id=1 这一行' },
        { text: '只删了王五', correct: false, explanation: '王五 21 不满足 age < 22' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习：先插入数据，再更新其中一行：',
      code: "INSERT INTO students VALUES (4, '陈七', 23);\nUPDATE students SET age = 24 WHERE id = 4;",
      hints: [
        '先 INSERT 加一行数据',
        '再用 UPDATE 修改这行',
        '用 WHERE id = 4 精确定位',
      ],
    },
    {
      type: 'exposition',
      text: '小结：\n- INSERT 加行\n- UPDATE 改值（别忘了 WHERE！）\n- DELETE 删行（别忘了 WHERE！）\n- TRUNCATE 快速清表，不可恢复',
    },
    {
      type: 'multiple-choice',
      question: 'TRUNCATE 比 DELETE 快的原因是什么？',
      options: [
        { text: 'TRUNCATE 不写日志', correct: false, explanation: 'TRUNCATE 只记录少量日志，但不完全是"不写"' },
        { text: 'TRUNCATE 直接重置表，不逐行操作', correct: true, explanation: 'TRUNCATE 是整体操作，DELETE 逐行删' },
        { text: 'TRUNCATE 只删第一行', correct: false, explanation: 'TRUNCATE 清空所有行' },
        { text: 'TRUNCATE 不需要权限', correct: false, explanation: 'TRUNCATE 也需要权限' },
      ],
    },
    {
      type: 'exposition',
      text: '记住一条黄金法则：\n增删改之前，先 SELECT 看一下要影响哪些行。\n尤其是 UPDATE 和 DELETE，WHERE 条件一定要精确。',
    },
  ],
}

export default lesson
