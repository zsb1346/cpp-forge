import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-advanced-query-practice',
    chapter: 3,
    title: '高级查询综合练习',
    subtitle: 'JOIN · 分组 · 子查询 混合训练',
    description: '通过综合练习，巩固 JOIN、分组聚合和子查询的综合使用。',
    objectives: [
      '能写出带 JOIN 和 GROUP BY 的复杂查询',
      '能修复多表查询中的错误',
      '能预判 JOIN 查询的结果',
      '能使用子查询解决问题',
    ],
    estimatedMinutes: 14,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.join.inner', label: 'INNER JOIN' },
        { id: 'sql.join.left', label: 'LEFT JOIN' },
        { id: 'sql.subquery', label: '子查询' },
        { id: 'sql.aggregate.count', label: 'COUNT 计数' },
        { id: 'sql.group-by', label: 'GROUP BY 分组' },
      ],
      contentKinds: ['practice'],
      stage: 'production',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '前面的技能，现在要组合起来用了。\n一张表不够，要 JOIN；查完要分组；还要嵌套子查询。',
    },
    {
      type: 'predict-output',
      instruction: '预测 JOIN 查询的结果：',
      code: "-- users 表：\n-- id | name\n-- 1  | 张三\n-- 2  | 李四\n-- 3  | 王五\n\n-- orders 表：\n-- id | user_id | product | amount\n-- 1  | 1       | 鼠标    | 29.9\n-- 2  | 1       | 键盘    | 99.0\n-- 3  | 2       | 显示器  | 1299\n\nSELECT u.name, COUNT(o.id) AS order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.name;",
      expectedOutput: '张三(2单), 李四(1单), 王五(0单)。LEFT JOIN 保留了王五。',
      options: [
        { text: '张三(2), 李四(1)', correct: false, explanation: 'LEFT JOIN 会保留王五，order_count 为 0' },
        { text: '张三(2), 李四(1), 王五(0)', correct: true, explanation: 'LEFT JOIN 保留所有用户，王五没订单所以是 0' },
        { text: '张三(2), 李四(1), 王五(null)', correct: false, explanation: 'COUNT(o.id) 对 NULL 返回 0，不是 null' },
        { text: '张三(1), 李四(1), 王五(1)', correct: false, explanation: '张三有 2 个订单，不是 1 个' },
      ],
    },
    {
      type: 'predict-output',
      instruction: '再来一个含子查询的：',
      code: "-- products 表：\n-- id | name   | price | category\n-- 1  | 鼠标   | 29.9  | 外设\n-- 2  | 键盘   | 99    | 外设\n-- 3  | 显示器 | 1299  | 显示器\n-- 4  | 耳机   | 199   | 音频\n-- 5  | 音箱   | 399   | 音频\n\nSELECT name, price FROM products\nWHERE price > (\n  SELECT AVG(price) FROM products\n)\nORDER BY price DESC;\n\n-- 平均价格是多少？哪些商品高于平均？",
      expectedOutput: '平均价格约 405.18。高于平均的：显示器(1299)、音箱(399)。耳机(199) 小于平均。',
      options: [
        { text: '显示器(1299), 音箱(399), 耳机(199)', correct: false, explanation: '耳机 199 < 平均 405.18，不符合条件' },
        { text: '显示器(1299), 音箱(399)', correct: true, explanation: '平均价格 405.18，只有显示器和音箱高于此值' },
        { text: '全部商品', correct: false, explanation: '鼠标 29.9 和键盘 99 都小于平均值' },
        { text: '显示器(1299)', correct: false, explanation: '音箱 399 > 平均 405.18 不正确。等等，399 < 405.18...' },
      ],
    },
    {
      type: 'type-it',
      instruction: '查询每位用户的订单总数（包含没下过单的用户）：',
      code: "SELECT u.name, COUNT(o.id) AS order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name;",
      hints: [
        'LEFT JOIN 保留所有用户',
        'COUNT(o.id) 统计每人的订单数',
        'GROUP BY u.name 按名字分组',
      ],
    },
    {
      type: 'multiple-choice',
      question: '上面的查询中，为什么用 LEFT JOIN 而不是 INNER JOIN？',
      options: [
        { text: 'LEFT JOIN 性能更好', correct: false, explanation: '性能取决于数据和索引，不是选择 JOIN 类型的理由' },
        { text: '要保留没下过单的用户', correct: true, explanation: 'LEFT JOIN 保证没有订单的用户也出现在结果中' },
        { text: 'LEFT JOIN 语法更简单', correct: false, explanation: '两者语法复杂度相同' },
        { text: 'INNER JOIN 不支持 COUNT', correct: false, explanation: 'INNER JOIN 可以和任何聚合函数配合' },
      ],
    },
    {
      type: 'fix-code',
      instruction: '这个查询试图找出每个类别中最贵的商品，但有错误：',
      buggyCode: "SELECT name, MAX(price) FROM products GROUP BY category;",
      goal: '正确查出每个类别中价格最高的商品名称和价格。',
      fixes: [
        { text: '这个查询有逻辑错误，name 和 MAX(price) 可能不匹配', correct: true, explanation: 'name 不在 GROUP BY 中，返回的 name 不一定是最高价商品的名称' },
        { text: '把 MAX(price) 改成 MIN(price)', correct: false, explanation: '改为最低价仍然有同一个问题' },
        { text: '去掉 GROUP BY category', correct: false, explanation: '去掉 GROUP BY 就变成全局最高价了' },
        { text: '没有错误', correct: false, explanation: 'SQL 语法的确能执行，但逻辑上 name 列的值不确定' },
      ],
      mode: 'choose-fix',
    },
    {
      type: 'choose-next-line',
      instruction: '分步构建复杂查询：找到总消费超过 100 的用户。',
      context: 'users 表和 orders 表关联，orders 有 amount 列表示金额',
      steps: [
        {
          prompt: '第一步：关联两张表',
          options: [
            { line: 'SELECT u.name, SUM(o.amount) AS total', correct: true, explanation: 'JOIN 两个表并计算总消费' },
            { line: 'SELECT u.name, o.amount', correct: false, explanation: '需要 SUM 聚合来计算总消费' },
            { line: 'SELECT users, orders', correct: false, explanation: '需要明确的列名和 JOIN' },
          ],
        },
        {
          prompt: '如何关联并分组？',
          options: [
            { line: 'FROM users u INNER JOIN orders o ON u.id = o.user_id\nGROUP BY u.name', correct: true, explanation: 'INNER JOIN 只保留有订单的用户' },
            { line: 'FROM users u JOIN orders o GROUP BY u.name', correct: false, explanation: 'JOIN 需要 ON 条件' },
            { line: 'FROM users, orders GROUP BY u.name', correct: false, explanation: '没有 JOIN 条件会产生笛卡尔积' },
          ],
        },
      ],
      finalCode: "SELECT u.name, SUM(o.amount) AS total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nGROUP BY u.name\nHAVING total > 100;",
    },
    {
      type: 'compare-snippets',
      instruction: '对比两种查询方式：',
      question: '哪个查询能查出"高于平均价格"的商品？',
      snippets: [
        {
          id: 'sub',
          title: '使用子查询',
          code: 'SELECT name, price FROM products\nWHERE price > (\n  SELECT AVG(price) FROM products\n);',
          correct: true,
          badge: '子查询',
          explanation: '子查询先算出平均值，外层再用这个值过滤',
        },
        {
          id: 'having',
          title: '使用 HAVING',
          code: 'SELECT name, price FROM products\nHAVING price > AVG(price);',
          correct: false,
          badge: '错误',
          explanation: 'HAVING 用于分组后过滤，这里没 GROUP BY，且 AVG 不能这么用',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'type-it',
      instruction: '练习子查询：查 price 高于所有商品平均价格的商品：',
      code: "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products);",
      hints: [
        '子查询先用括号括起来',
        'AVG(price) 算出平均值',
        '外层 WHERE price > 子查询结果',
      ],
    },
    {
      type: 'multiple-choice',
      question: '子查询 `(SELECT AVG(price) FROM products)` 在查询中执行了几次？',
      options: [
        { text: '每行执行一次', correct: false, explanation: '标量子查询对外层每行只执行一次（数据库会优化）' },
        { text: '只执行一次', correct: true, explanation: '标量子查询只执行一次，结果缓存复用' },
        { text: '两次', correct: false, explanation: '标准标量子查询执行一次就够了' },
        { text: '取决于数据量', correct: false, explanation: '不依赖行数，只执行一次' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全查询：查每个类别中商品的数量和平均价格，只显示商品数大于 1 的类别：',
      template: "SELECT category, COUNT(*), AVG(price)\nFROM products\n____ BY category\n____ COUNT(*) > 1;",
      answers: ['GROUP', 'HAVING'],
      hints: ['分组用 GROUP BY', '过滤组用 HAVING'],
    },
    {
      type: 'fix-code',
      instruction: '这个 JOIN 查询有语法错误：',
      buggyCode: "SELECT u.name, o.product\nFROM users u\nINNER JOIN orders o\nON users.id = orders.user_id;",
      goal: '正确查询用户姓名和购买的商品名称。',
      fixes: [
        { text: '把 users.id 改成 u.id，orders.user_id 改成 o.user_id', correct: true, explanation: '用了别名 u 和 o，ON 条件中也要用别名' },
        { text: '去掉 INNER', correct: false, explanation: 'INNER 可以省略但这不是错误' },
        { text: '把 ON 改成 WHERE', correct: false, explanation: 'JOIN 的条件要用 ON，不是 WHERE' },
        { text: '给 users 加别名', correct: false, explanation: '已经有别名了，问题在 ON 条件中用了原名' },
      ],
      mode: 'choose-fix',
    },
    {
      type: 'type-it',
      instruction: '综合练习：找出有 2 个以上订单的用户：',
      code: "SELECT u.name, COUNT(o.id) AS cnt FROM users u INNER JOIN orders o ON u.id = o.user_id GROUP BY u.name HAVING cnt >= 2;",
      hints: [
        'INNER JOIN 连接两表',
        'GROUP BY 按用户分组',
        'HAVING 过滤订单数 >= 2',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'INNER JOIN 和 LEFT JOIN 结果行数一样多的条件是什么？',
      options: [
        { text: '左表行数多于右表', correct: false, explanation: '行数是不是一样取决于匹配情况' },
        { text: '右表的每条记录都在左表有匹配', correct: false, explanation: '关键是左表的所有行在右表都有匹配' },
        { text: '左表的每条记录在右表都有匹配', correct: true, explanation: '当左表所有行都在右表有对应行时，INNER=LEFT' },
        { text: '两张表行数相等', correct: false, explanation: '行数相等不代表每行都能匹配上' },
      ],
    },
    {
      type: 'exposition',
      text: '综合练习总结：\n- JOIN 关联多表，LEFT 保左表全部\n- GROUP BY 分组配合聚合函数\n- HAVING 过滤分组结果\n- 子查询嵌套，先内后外\n- 多表查询记得用别名',
    },
  ],
}

export default lesson
