import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-comprehensive-sql',
    chapter: 4,
    title: '综合 SQL 挑战',
    subtitle: '10 道综合题 · 期末模拟',
    description: '10 道综合 SQL 题，覆盖 SELECT、WHERE、JOIN、聚合、子查询——全面检验 SQL 实战能力。',
    objectives: [
      '能够写出带 WHERE 和 ORDER BY 的查询',
      '能够使用 GROUP BY 和聚合函数统计信息',
      '能够完成多表 JOIN 查询',
      '能够写出含子查询的复杂查询',
      '能够识别并修正有语法错误的 SQL 语句',
    ],
    estimatedMinutes: 25,
    pathway: {
      subject: 'sql',
      knowledgePoints: [{ id: 'sql.comprehensive', label: '综合 SQL 挑战' }],
      contentKinds: ['challenge'],
      stage: 'production',
    },
  },
  blocks: [
    // ─────────────────────────────────────────────
    // 1. 挑战引入
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: 'SQL 语句练了不少，现在来一次综合实战。\n10 道题，覆盖 WHERE、ORDER BY、JOIN、聚合、子查询。',
      textAnimation: 'typewriter',
    },

    // ─────────────────────────────────────────────
    // 2. 场景：数据库概览
    // ─────────────────────────────────────────────
    {
      type: 'scene',
      title: '学生成绩数据库',
      steps: [
        { text: '本次挑战使用一个学生成绩管理数据库，共三张表。' },
        { code: 'student(sid, sname, sage, sclass)\n-- 学生表：学号、姓名、年龄、班级' },
        { code: 'course(cid, cname, ccredit)\n-- 课程表：课程号、名称、学分' },
        { code: 'sc(sid, cid, score)\n-- 选课表：学号、课号、成绩' },
        { text: '每道题都基于这三张表。准备好了吗？' },
      ],
    },

    // ─────────────────────────────────────────────
    // 3. predict-output: SELECT WHERE
    // ─────────────────────────────────────────────
    {
      type: 'predict-output',
      instruction: '预测以下查询的结果：',
      code: '-- student 表\n-- sid | sname | sage | sclass\n-- 101 | 张三  | 20   | 一班\n-- 102 | 李四  | 21   | 一班\n-- 103 | 王五  | 19   | 二班\n-- 104 | 赵六  | 20   | 二班\n\nSELECT sname, sage\nFROM student\nWHERE sclass = \'一班\';',
      expectedOutput: '张三  20\n李四  21',
      options: [
        {
          text: '张三 20，李四 21',
          correct: true,
          explanation: 'WHERE sclass = \'一班\' 筛选出一班的两名学生',
        },
        {
          text: '张三 20，王五 19',
          correct: false,
          explanation: '王五是二班的',
        },
        {
          text: '四个学生全部列出',
          correct: false,
          explanation: 'WHERE 条件只筛选一班',
        },
        {
          text: '报错，因为 sclass 没加引号',
          correct: false,
          explanation: '\'一班\' 用了正确的单引号',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 4. predict-output: ORDER BY
    // ─────────────────────────────────────────────
    {
      type: 'predict-output',
      instruction: '预测以下 ORDER BY 查询的结果：',
      code: 'SELECT sname, sage\nFROM student\nORDER BY sage DESC;',
      expectedOutput: '李四  21\n张三  20\n赵六  20\n王五  19',
      options: [
        {
          text: '李四 21，张三 20，赵六 20，王五 19',
          correct: true,
          explanation: 'DESC 表示降序，年龄从大到小排列',
        },
        {
          text: '王五 19，张三 20，赵六 20，李四 21',
          correct: false,
          explanation: '那是 ASC（升序），DESC 是降序',
        },
        {
          text: '张三 20，李四 21，王五 19，赵六 20',
          correct: false,
          explanation: 'ORDER BY 按 sage 排序，不是按 sname',
        },
        {
          text: '只输出李四一人',
          correct: false,
          explanation: 'ORDER BY 只排序，不会过滤数据',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 5. 聚合函数引入
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: '聚合函数帮我们从数据中提取统计信息。\n**COUNT** 计数，**AVG** 平均，**SUM** 求和，**MAX/MIN** 最值。',
    },

    // ─────────────────────────────────────────────
    // 6. type-it: GROUP BY + COUNT
    // ─────────────────────────────────────────────
    {
      type: 'type-it',
      instruction: '敲一个 GROUP BY 查询：统计每个班级有多少学生。',
      code: 'SELECT sclass, COUNT(*) AS stu_count\nFROM student\nGROUP BY sclass;',
      hints: [
        'COUNT(*) 统计每组的行数',
        'GROUP BY sclass 按班级分组',
        'AS 给结果列取别名',
      ],
    },

    // ─────────────────────────────────────────────
    // 7. 选择正确的 GROUP BY
    // ─────────────────────────────────────────────
    {
      type: 'multiple-choice',
      question: '要查询每门课的平均分，应该用哪个语句？',
      options: [
        {
          text: 'SELECT cid, score FROM sc GROUP BY cid;',
          correct: false,
          explanation: '没有聚合函数，GROUP BY 没有意义',
        },
        {
          text: 'SELECT cid, AVG(score) FROM sc GROUP BY cid;',
          correct: true,
          explanation: 'AVG 计算平均值，GROUP BY 按课程分组',
        },
        {
          text: 'SELECT cid, AVG(score) FROM sc;',
          correct: false,
          explanation: '没有 GROUP BY 会报错或只返回一行',
        },
        {
          text: 'SELECT cid, SUM(score) FROM sc GROUP BY cid;',
          correct: false,
          explanation: 'SUM 是求和不是平均',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 8. fix-code: 错误 JOIN
    // ─────────────────────────────────────────────
    {
      type: 'fix-code',
      instruction: '以下查询想列出学生的姓名和成绩，但语法有问题。请选择正确的修复方案。',
      buggyCode: 'SELECT sname, score\nFROM student, sc\nWHERE student.sid = sc.sid;',
      goal: '用标准 JOIN 语法重写这个查询',
      mode: 'choose-fix',
      fixes: [
        {
          text: 'SELECT sname, score FROM student JOIN sc ON student.sid = sc.sid;',
          correct: true,
          explanation: '正确。使用显式 JOIN 语法，关联条件写在 ON 子句中',
        },
        {
          text: 'SELECT sname, score FROM student JOIN sc;',
          correct: false,
          explanation: '缺少 ON 条件会产生笛卡尔积',
        },
        {
          text: 'SELECT sname, score FROM student, sc;',
          correct: false,
          explanation: '这是旧式逗号语法，和之前一样没有改进',
        },
        {
          text: 'SELECT sname, score FROM student JOIN sc WHERE student.sid = sc.sid;',
          correct: false,
          explanation: 'JOIN 的关联条件应该用 ON，不是 WHERE',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 9. compare-snippets: INNER vs LEFT JOIN
    // ─────────────────────────────────────────────
    {
      type: 'compare-snippets',
      instruction: '对比两个查询，理解它们的不同。',
      question: '如果某个学生没有选课记录，两个查询的结果有什么不同？',
      snippets: [
        {
          id: 'inner-join',
          title: 'INNER JOIN',
          code: 'SELECT s.sname, sc.score\nFROM student s\nJOIN sc ON s.sid = sc.sid;',
          correct: false,
          explanation: 'INNER JOIN 只返回有选课记录的学生',
          badge: '有匹配才返回',
        },
        {
          id: 'left-join',
          title: 'LEFT JOIN',
          code: 'SELECT s.sname, sc.score\nFROM student s\nLEFT JOIN sc ON s.sid = sc.sid;',
          correct: true,
          explanation: 'LEFT JOIN 保留所有学生，没选课的 score 显示 NULL',
          badge: '保留左表全部',
        },
      ],
      compareBy: 'meaning',
    },

    // ─────────────────────────────────────────────
    // 10. 子查询引入
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: '子查询就是查询里面再嵌套一个查询。\n场景：找出"成绩高于平均分"的学生。',
    },

    // ─────────────────────────────────────────────
    // 11. type-it: 子查询
    // ─────────────────────────────────────────────
    {
      type: 'type-it',
      instruction: '敲一个子查询：找出成绩高于平均分的学生姓名。',
      code: 'SELECT sname\nFROM student\nWHERE sid IN (\n  SELECT sid\n  FROM sc\n  WHERE score > (\n    SELECT AVG(score) FROM sc\n  )\n);',
      hints: [
        '最内层 AVG(score) 算出平均分',
        '中层 WHERE score > 平均分 筛选高分',
        '外层通过 sid IN 拿到对应学生姓名',
      ],
    },

    // ─────────────────────────────────────────────
    // 12. choose-next-line: 逐步构建多表查询
    // ─────────────────────────────────────────────
    {
      type: 'choose-next-line',
      instruction: '一步步构建查询：列出每个学生的姓名、选的课程名和分数，按分数降序排列。',
      context: '需要关联 student、sc、course 三张表，并按 score 排序。',
      steps: [
        {
          prompt: '第一步：SELECT 哪些列？',
          options: [
            {
              line: 'SELECT s.sname, c.cname, sc.score',
              correct: true,
              explanation: '从三张表分别取姓名、课程名、分数',
            },
            {
              line: 'SELECT *',
              correct: false,
              explanation: '用 * 会返回所有列，包含不需要的信息',
            },
            {
              line: 'SELECT s.sname, sc.score',
              correct: false,
              explanation: '遗漏了课程名 c.cname',
            },
          ],
        },
        {
          prompt: '第二步：FROM 表并给别名——',
          options: [
            {
              line: 'FROM student s',
              correct: true,
              explanation: '给 student 表起别名 s',
            },
            {
              line: 'FROM student',
              correct: false,
              explanation: '不加别名也可以，但三表 JOIN 加别名更清晰',
            },
            {
              line: 'FROM sc',
              correct: false,
              explanation: '通常从主表（student）开始',
            },
          ],
        },
        {
          prompt: '第三步：JOIN sc——关联条件？',
          options: [
            {
              line: 'JOIN sc ON s.sid = sc.sid',
              correct: true,
              explanation: '通过 sid 关联 student 和 sc',
            },
            {
              line: 'JOIN sc ON s.sname = sc.sid',
              correct: false,
              explanation: '姓名和编号类型不匹配',
            },
            {
              line: 'JOIN sc ON s.sid = sc.cid',
              correct: false,
              explanation: 'sid 和 cid 含义不同',
            },
          ],
        },
        {
          prompt: '第四步：JOIN course——关联条件？',
          options: [
            {
              line: 'JOIN course c ON sc.cid = c.cid',
              correct: true,
              explanation: '通过 cid 关联 sc 和 course',
            },
            {
              line: 'JOIN course c ON s.sid = c.cid',
              correct: false,
              explanation: 'student 的 sid 和 course 的 cid 无关',
            },
            {
              line: 'JOIN course c ON sc.sid = c.cid',
              correct: false,
              explanation: 'sc.sid 和 course.cid 没有对应关系',
            },
          ],
        },
        {
          prompt: '第五步：最后加上排序——',
          options: [
            {
              line: 'ORDER BY sc.score DESC',
              correct: true,
              explanation: '按分数降序排列',
            },
            {
              line: 'ORDER BY sc.score',
              correct: false,
              explanation: '默认 ASC 升序，题目要求降序需要 DESC',
            },
            {
              line: 'SORT BY sc.score DESC',
              correct: false,
              explanation: 'SQL 用 ORDER BY，不是 SORT BY',
            },
          ],
        },
      ],
      finalCode: 'SELECT s.sname, c.cname, sc.score\nFROM student s\nJOIN sc ON s.sid = sc.sid\nJOIN course c ON sc.cid = c.cid\nORDER BY sc.score DESC;',
    },

    // ─────────────────────────────────────────────
    // 13. fix-code: HAVING 错误
    // ─────────────────────────────────────────────
    {
      type: 'fix-code',
      instruction: '这个查询想找出平均分大于 85 的学生，但有一个常见错误。请选择正确的修复。',
      buggyCode: 'SELECT sid, AVG(score) AS avg_score\nFROM sc\nWHERE AVG(score) > 85\nGROUP BY sid;',
      goal: '在 GROUP BY 之后过滤聚合结果',
      mode: 'choose-fix',
      fixes: [
        {
          text: '把 WHERE 改为 HAVING：\nSELECT sid, AVG(score) FROM sc GROUP BY sid HAVING AVG(score) > 85;',
          correct: true,
          explanation: 'HAVING 用于条件，WHERE 不能直接用在聚合函数上',
        },
        {
          text: '把 WHERE AVG(score) > 85 移到 GROUP BY 前面',
          correct: false,
          explanation: 'AVG 在 GROUP BY 之后才能计算，无法提前过滤',
        },
        {
          text: '去掉 GROUP BY：SELECT sid, AVG(score) FROM sc WHERE AVG(score) > 85;',
          correct: false,
          explanation: '没有 GROUP BY 时 AVG 会对全表聚合，而且 WHERE 仍然不能用聚合',
        },
        {
          text: '用 WHERE 子查询：SELECT sid, AVG(score) FROM sc WHERE score > 85 GROUP BY sid;',
          correct: false,
          explanation: '这样是过滤原始分数 > 85，不是平均分 > 85',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 14. type-it: 复杂查询
    // ─────────────────────────────────────────────
    {
      type: 'type-it',
      instruction: '敲一个综合查询：查询每个学生的平均分，只显示平均分大于等于 80 的学生，按平均分降序排列。',
      code: "SELECT s.sname, AVG(sc.score) AS avg_score\nFROM student s\nJOIN sc ON s.sid = sc.sid\nGROUP BY s.sid, s.sname\nHAVING AVG(sc.score) >= 80\nORDER BY avg_score DESC;",
      hints: [
        '先 JOIN 再 GROUP BY',
        'HAVING 过滤分组后的结果',
        'ORDER BY 放在最后',
      ],
    },

    // ─────────────────────────────────────────────
    // 15. predict-output: 子查询结果预测
    // ─────────────────────────────────────────────
    {
      type: 'predict-output',
      instruction: '预测子查询的输出：',
      code: '-- sc 表\n-- sid | cid | score\n-- 101 | 1   | 85\n-- 101 | 2   | 92\n-- 102 | 1   | 78\n-- 103 | 1   | 90\n-- 103 | 3   | 88\n-- 104 | 2   | 65\n\nSELECT DISTINCT sclass\nFROM student\nWHERE sid IN (\n  SELECT sid\n  FROM sc\n  WHERE score >= 90\n);',
      expectedOutput: '一班\n二班',
      options: [
        {
          text: '一班',
          correct: false,
          explanation: '二班也有学生成绩 >= 90（王五 90 分）',
        },
        {
          text: '一班，二班',
          correct: true,
          explanation: '分数 >= 90 的学生有张三（101）和王五（103），分别来自一班和二班',
        },
        {
          text: '一班，一班，二班',
          correct: false,
          explanation: 'DISTINCT 会去重，不会重复输出班级',
        },
        {
          text: '王五，张三',
          correct: false,
          explanation: '查询选的是 sclass（班级），不是 sname（姓名）',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 16. fill-in: 多表查询补全
    // ─────────────────────────────────────────────
    {
      type: 'fill-in',
      prompt: '补全查询：列出选了"数据库原理"这门课的所有学生姓名和分数。',
      template: "SELECT s.sname, ____.score\nFROM student s\n____ sc ____ s.sid = sc.sid\nJOIN course c ____ sc.cid = c.cid\nWHERE ____.cname = '数据库原理';",
      answers: ['sc', 'JOIN', 'ON', 'ON', 'c'],
      hints: [
        'sc 表包含分数列',
        'JOIN 需要 ON 条件',
        '用 c 的别名引用 course 列',
      ],
    },

    // ─────────────────────────────────────────────
    // 17. type-it: 范围查询 BETWEEN
    // ─────────────────────────────────────────────
    {
      type: 'type-it',
      instruction: '敲一个用 BETWEEN 的查询：找出年龄在 19 到 21 岁之间的学生：',
      code: 'SELECT sname, sage, sclass\nFROM student\nWHERE sage BETWEEN 19 AND 21\nORDER BY sage;',
      hints: [
        'BETWEEN 包含两端边界值',
        'BETWEEN 19 AND 21 等价于 sage >= 19 AND sage <= 21',
        'ORDER BY 让结果按年龄排列',
      ],
    },

    // ─────────────────────────────────────────────
    // 18. fill-in: 补全 DISTINCT
    // ─────────────────────────────────────────────
    {
      type: 'fill-in',
      prompt: '补全查询：列出所有选修了课程的学生学号（不重复）。',
      template: 'SELECT ____ sid\n____ sc;',
      answers: ['DISTINCT', 'FROM'],
      hints: [
        'DISTINCT 去掉重复行',
        '数据来源是选课表 sc',
      ],
    },

    // ─────────────────────────────────────────────
    // 19. predict-output: 聚合结果预测
    // ─────────────────────────────────────────────
    {
      type: 'predict-output',
      instruction: '预测以下查询的输出：',
      code: '-- sc 表数据\n-- sid | cid | score\n-- 101 | 1   | 85\n-- 101 | 2   | 92\n-- 102 | 1   | 78\n-- 103 | 1   | 90\n-- 103 | 3   | 88\n-- 104 | 2   | 65\n\nSELECT COUNT(*) AS total_records,\n       AVG(score) AS avg_score\nFROM sc\nWHERE cid = 1;',
      expectedOutput: 'total_records: 3\navg_score: 84.33',
      options: [
        {
          text: 'total_records: 3，avg_score: 84.33',
          correct: true,
          explanation: 'cid=1 的记录有 3 条（85+78+90）/ 3 = 84.33',
        },
        {
          text: 'total_records: 6，avg_score: 83',
          correct: false,
          explanation: 'WHERE cid=1 只筛选课程 1 的数据，不是全部课程',
        },
        {
          text: 'total_records: 3，avg_score: 253',
          correct: false,
          explanation: '253 是分数总和 SUM 不是平均',
        },
        {
          text: 'total_records: 1，avg_score: 85',
          correct: false,
          explanation: 'cid=1 有 3 条记录，不是 1 条',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 20. 终极答题：选择正确子查询
    // ─────────────────────────────────────────────
    {
      type: 'multiple-choice',
      question: '以下哪个查询能正确找出"选课数大于 2 门"的学生姓名？',
      options: [
        {
          text: 'SELECT sname FROM student WHERE (SELECT COUNT(*) FROM sc WHERE sc.sid = student.sid) > 2;',
          correct: true,
          explanation: '关联子查询统计每个学生的选课数，WHERE 条件筛选 > 2',
        },
        {
          text: 'SELECT sname, COUNT(*) FROM student JOIN sc GROUP BY sname HAVING COUNT(*) > 2;',
          correct: false,
          explanation: '虽然逻辑接近，但 SELECT 多了 COUNT(*)，且需要排除 JOIN 导致的重复',
        },
        {
          text: 'SELECT sname FROM student WHERE sid IN (SELECT sid FROM sc WHERE COUNT(*) > 2);',
          correct: false,
          explanation: '子查询中不能在 WHERE 直接使用 COUNT(*)',
        },
        {
          text: 'SELECT sname FROM student, sc WHERE student.sid = sc.sid AND COUNT(sc.sid) > 2;',
          correct: false,
          explanation: 'WHERE 中不能直接使用 COUNT() 聚合函数',
        },
      ],
    },

    // ─────────────────────────────────────────────
    // 21. 复习总结
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: '这 10 道题覆盖了 SQL 的核心考点：\n\n1. SELECT + WHERE 条件筛选\n2. ORDER BY 排序（ASC/DESC）\n3. COUNT / AVG 等聚合函数\n4. GROUP BY 分组统计\n5. HAVING 过滤分组结果\n6. INNER JOIN vs LEFT JOIN\n7. 子查询\n8. BETWEEN 范围查询\n9. DISTINCT 去重\n10. 关联子查询',
    },

    // ─────────────────────────────────────────────
    // 22. 结语
    // ─────────────────────────────────────────────
    {
      type: 'exposition',
      text: 'SQL 是操作数据的核心技能，多写多练就能熟练。\n遇到复杂查询时，先拆解成小步骤，再组合起来。',
    },
  ],
}

export default lesson
