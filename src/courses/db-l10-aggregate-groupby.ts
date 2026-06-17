import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-aggregate-groupby',
    chapter: 3,
    title: '聚合函数与分组查询',
    subtitle: 'COUNT / SUM / AVG / MAX / MIN · GROUP BY · HAVING',
    description: '学习用聚合函数做统计，用 GROUP BY 分组，用 HAVING 过滤分组。',
    objectives: [
      '会用 COUNT / SUM / AVG / MAX / MIN 做统计',
      '能用 GROUP BY 对数据分组',
      '能区分 WHERE 和 HAVING 的用法',
    ],
    estimatedMinutes: 15,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.aggregate.count', label: 'COUNT 计数' },
        { id: 'sql.aggregate.sum', label: 'SUM 求和' },
        { id: 'sql.aggregate.avg', label: 'AVG 平均值' },
        { id: 'sql.aggregate.max-min', label: 'MAX/MIN 最值' },
        { id: 'sql.group-by', label: 'GROUP BY 分组' },
        { id: 'sql.having', label: 'HAVING 过滤分组' },
      ],
      contentKinds: ['lesson'],
      stage: 'recognition',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '查具体数据只是 SQL 的第一步。\n更常见的是：全班平均分多少？销量最高的商品是哪个？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '聚合函数就是用来做这些"统计计算"的。\n它们把多行数据压缩成一个结果。',
      code: 'SELECT COUNT(*) FROM students;  -- 总共有多少学生\nSELECT AVG(age) FROM students;     -- 平均年龄\nSELECT MAX(price) FROM products;   -- 最高价格',
    },
    {
      type: 'concept-cards',
      instruction: '5 个聚合函数：',
      cards: [
        { term: 'COUNT(列)', meaning: '统计行数（非空）', example: 'COUNT(*)' },
        { term: 'SUM(列)', meaning: '数值列求和', example: 'SUM(price)' },
        { term: 'AVG(列)', meaning: '数值列平均值', example: 'AVG(age)' },
        { term: 'MAX(列)', meaning: '找最大值', example: 'MAX(salary)' },
        { term: 'MIN(列)', meaning: '找最小值', example: 'MIN(score)' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'AVG(price) 返回什么？',
      options: [
        { text: '所有 price 的总和', correct: false, explanation: '求和是 SUM(price)' },
        { text: '所有 price 的平均值', correct: true, explanation: 'AVG 就是 average 平均' },
        { text: 'price 的最大值', correct: false, explanation: '最大值是 MAX(price)' },
        { text: 'price 不为空的行数', correct: false, explanation: '计数是 COUNT(price)' },
      ],
    },
    {
      type: 'type-it',
      instruction: '统计 students 表的总人数：',
      code: 'SELECT COUNT(*) FROM students;',
      hints: [
        'COUNT(*) 统计所有行',
        '也可以用 COUNT(id)',
        '括号不要漏',
      ],
    },
    {
      type: 'exposition',
      text: '聚合函数 + GROUP BY = 分组统计。\n先分组，再在每个组里做聚合。',
      code: "SELECT category, COUNT(*), AVG(price)\nFROM products\nGROUP BY category;\n-- 每个类别有多少商品、均价是多少",
    },
    {
      type: 'animated-timeline',
      config: {
        narrationPosition: 'overlay',
        showStepIndicator: true,
      },
      scenes: [
        {
          narration: '原始 products 表，共 6 件商品',
          mode: 'full',
          elements: [
            { type: 'table', id: 't1', headers: ['id', 'name', 'price', 'category'], rows: [[1, '鼠标', 29.9, '外设'], [2, '键盘', 99, '外设'], [3, '显示器', 1299, '显示器'], [4, '耳机', 199, '音频'], [5, '音箱', 399, '音频'], [6, 'U盘', 49, '外设']] },
          ],
        },
        {
          narration: 'GROUP BY category：按类别分成 3 组',
          elements: [
            { type: 'code', id: 'c1', code: 'SELECT category, COUNT(*) FROM products GROUP BY category;', language: 'sql' },
            { type: 'table', id: 't2', headers: ['category', 'count'], rows: [['外设', 3], ['显示器', 1], ['音频', 2]] },
          ],
        },
        {
          narration: '再加 AVG(price)：算每个类别的平均价格',
          elements: [
            { type: 'code', id: 'c1', code: 'SELECT category, AVG(price) FROM products GROUP BY category;', language: 'sql' },
            { type: 'table', id: 't2', headers: ['category', 'avg(price)'], rows: [['外设', 59.3], ['显示器', 1299], ['音频', 299]] },
          ],
        },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'GROUP BY 的作用是什么？',
      options: [
        { text: '对结果排序', correct: false, explanation: '排序用 ORDER BY' },
        { text: '按某列的值分组，每组算一个结果', correct: true, explanation: 'GROUP BY 把相同值的行分到一组' },
        { text: '限制分组数量', correct: false, explanation: '限制行数用 LIMIT' },
        { text: '合并两个表', correct: false, explanation: '合并表用 JOIN' },
      ],
    },
    {
      type: 'type-it',
      instruction: '统计每个城市的学生人数：',
      code: "SELECT city, COUNT(*) FROM students GROUP BY city;",
      hints: [
        'GROUP BY 后跟分组列名',
        'COUNT(*) 统计每组行数',
        '分组列要写在 SELECT 里',
      ],
    },
    {
      type: 'compare-snippets',
      instruction: 'WHERE 和 HAVING 看起来很像，但时机不同。',
      question: 'WHERE 和 HAVING 哪个在 GROUP BY 之后执行？',
      snippets: [
        {
          id: 'w',
          title: 'WHERE（分组前过滤）',
          code: "SELECT category, AVG(price)\nFROM products\nWHERE category != '显示器'\nGROUP BY category;\n-- 先排除显示器，再分组",
          correct: false,
          badge: '分组前',
          explanation: 'WHERE 在 GROUP BY 之前过滤行',
        },
        {
          id: 'h',
          title: 'HAVING（分组后过滤）',
          code: "SELECT category, AVG(price)\nFROM products\nGROUP BY category\nHAVING AVG(price) > 100;\n-- 先分组，再保留均价 > 100 的组",
          correct: true,
          badge: '分组后',
          explanation: 'HAVING 在 GROUP BY 之后过滤分组',
        },
      ],
      compareBy: 'meaning',
    },
    {
      type: 'exposition',
      text: '完整的执行顺序：\nFROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT\n\nWHERE 过滤行，HAVING 过滤组。顺序不能搞反。',
    },
    {
      type: 'multiple-choice',
      question: '要过滤 GROUP BY 后的组，应该用哪个？',
      options: [
        { text: 'WHERE', correct: false, explanation: 'WHERE 在 GROUP BY 之前执行' },
        { text: 'HAVING', correct: true, explanation: 'HAVING 在 GROUP BY 之后，可以过滤分组' },
        { text: 'FILTER', correct: false, explanation: 'SQL 中没有 FILTER 关键字' },
        { text: 'LIMIT', correct: false, explanation: 'LIMIT 限制行数，不能过滤分组' },
      ],
    },
    {
      type: 'predict-output',
      instruction: '预测这条分组查询的结果：',
      code: "-- students 表：\n-- id | name | age | city\n-- 1  | 张三  | 20  | 北京\n-- 2  | 李四  | 22  | 上海\n-- 3  | 王五  | 19  | 北京\n-- 4  | 赵六  | 25  | 广州\n-- 5  | 陈七  | 23  | 上海\n\nSELECT city, AVG(age) FROM students\nGROUP BY city\nHAVING AVG(age) >= 21;",
      expectedOutput: '上海(22.5) 和 广州(25)。北京平均 19.5 小于 21，被 HAVING 过滤掉了。',
      options: [
        { text: '北京(19.5), 上海(22.5), 广州(25)', correct: false, explanation: '北京平均年龄 19.5，被 HAVING AVG(age) >= 21 过滤掉了' },
        { text: '上海(22.5), 广州(25)', correct: true, explanation: '北京 avg=19.5 < 21 被过滤，上海 avg=22.5，广州 avg=25' },
        { text: '上海(22), 广州(25)', correct: false, explanation: '上海平均是 (22+23)/2 = 22.5' },
        { text: '北京(19.5), 上海(22.5)', correct: false, explanation: '广州 avg=25 也满足条件' },
      ],
    },
    {
      type: 'exposition',
      text: 'HAVING 支持聚合函数条件，WHERE 不支持。\n这是因为 HAVING 在分组之后执行，能看到聚合结果。',
      code: 'WHERE AVG(price) > 100   -- ❌ 语法错误\nHAVING AVG(price) > 100  -- ✅ 正确',
    },
    {
      type: 'fill-in',
      prompt: '补全查询：统计每个类别的商品数量和平均价格，只显示均价高于 50 的类别：',
      template: 'SELECT category, COUNT(*), AVG(price)\nFROM products\n____ BY category\n____ AVG(price) > 50;',
      answers: ['GROUP', 'HAVING'],
      hints: ['分组用 GROUP BY', '分组后过滤用 HAVING'],
    },
    {
      type: 'type-it',
      instruction: '完整练习：统计每个城市的平均年龄，只显示平均年龄小于 25 的：',
      code: "SELECT city, AVG(age) FROM students GROUP BY city HAVING AVG(age) < 25;",
      hints: [
        'GROUP BY 后跟 city',
        'AVG(age) 算平均年龄',
        'HAVING 过滤组',
      ],
    },
    {
      type: 'exposition',
      text: 'MAX / MIN 的特殊用法：\n找每门课的最高分、最便宜的商品——结合 GROUP BY 使用。',
      code: "SELECT category, MAX(price) AS highest_price\nFROM products\nGROUP BY category;\n-- 每类商品中最贵的价格",
    },
    {
      type: 'multiple-choice',
      question: 'COUNT(*) 和 COUNT(列名) 的区别是什么？',
      options: [
        { text: '没区别，结果一样', correct: false, explanation: 'COUNT(列名) 不统计 NULL 值' },
        { text: 'COUNT(*) 统计所有行，COUNT(列名) 不统计 NULL', correct: true, explanation: 'COUNT(*) 包括所有行，COUNT(col) 跳过 NULL' },
        { text: 'COUNT(*) 只统计非空列', correct: false, explanation: 'COUNT(*) 统计全部行' },
        { text: 'COUNT(列名) 更快', correct: false, explanation: '通常 COUNT(*) 会被优化得更快' },
      ],
    },
    {
      type: 'exposition',
      text: '这节课总结：\n- 5 个聚合函数：COUNT / SUM / AVG / MAX / MIN\n- GROUP BY 分组，HAVING 过滤组\n- WHERE 在分组前，HAVING 在分组后\n- 执行顺序：WHERE → GROUP BY → HAVING → ORDER BY',
    },
  ],
}

export default lesson
