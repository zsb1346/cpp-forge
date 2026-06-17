import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-basic-query-practice',
    chapter: 3,
    title: '基础查询专项练习',
    subtitle: '结果预判 · 补全语句',
    description: '通过预判查询结果和补全语句，巩固 SELECT 查询技能。',
    objectives: [
      '能根据数据表和 SQL 预判查询结果',
      '能补全不完整的查询语句',
      '能修复查询语句中的语法错误',
    ],
    estimatedMinutes: 14,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.select.basics', label: 'SELECT 基础' },
        { id: 'sql.where', label: 'WHERE 条件过滤' },
        { id: 'sql.order-by', label: 'ORDER BY 排序' },
        { id: 'sql.limit', label: 'LIMIT 限制行数' },
        { id: 'sql.distinct', label: 'DISTINCT 去重' },
      ],
      contentKinds: ['practice'],
      stage: 'recall',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '光会写 SQL 还不够。\n真正的能力是——看一眼数据和 SQL，就知道结果。',
    },
    {
      type: 'predict-output',
      instruction: '已知 products 表，猜猜查询结果：',
      code: '-- products 表：\n-- id | name   | price | category\n-- 1  | 鼠标   | 29.9  | 外设\n-- 2  | 键盘   | 99.0  | 外设\n-- 3  | 显示器 | 1299  | 显示器\n-- 4  | 耳机   | 199   | 音频\n\nSELECT name, price FROM products WHERE price < 100;',
      expectedOutput: '鼠标(29.9) 和 键盘(99.0)。显示器 1299 和耳机 199 都 >= 100。',
      options: [
        { text: '鼠标(29.9), 键盘(99.0)', correct: true, explanation: '只有 price < 100 的鼠标和键盘符合条件' },
        { text: '鼠标(29.9), 键盘(99.0), 耳机(199)', correct: false, explanation: '耳机 199 不小于 100' },
        { text: '所有商品', correct: false, explanation: 'WHERE price < 100 只筛选价格小于 100 的' },
        { text: '键盘(99.0), 显示器(1299)', correct: false, explanation: '显示器 1299 不小于 100' },
      ],
    },
    {
      type: 'predict-output',
      instruction: '再来一个，包含 ORDER BY 和 LIMIT：',
      code: '-- products 表同上\n\nSELECT name, price FROM products\nWHERE category = \'外设\'\nORDER BY price DESC\nLIMIT 1;',
      expectedOutput: '键盘(99.0)。外设类有鼠标(29.9)和键盘(99.0)，降序排键盘第一。',
      options: [
        { text: '鼠标(29.9)', correct: false, explanation: 'DESC 降序，价格高的在前面' },
        { text: '键盘(99.0)', correct: true, explanation: '外设里键盘最贵，降序排第一' },
        { text: '显示器(1299)', correct: false, explanation: '显示器不属于外设类' },
        { text: '鼠标和键盘都返回', correct: false, explanation: 'LIMIT 1 只返回一行' },
      ],
    },
    {
      type: 'type-it',
      instruction: '查询所有价格大于 50 的商品名称和价格：',
      code: 'SELECT name, price FROM products WHERE price > 50;',
      hints: [
        'SELECT 后跟要显示的列名',
        'WHERE 条件用 price > 50',
        '列名用逗号分隔',
      ],
    },
    {
      type: 'multiple-choice',
      question: '想要查价格从高到低，怎么写？',
      options: [
        { text: 'ORDER BY price ASC', correct: false, explanation: 'ASC 是升序（从低到高）' },
        { text: 'ORDER BY price DESC', correct: true, explanation: 'DESC 是降序（从高到低）' },
        { text: 'SORT BY price', correct: false, explanation: 'SQL 中用 ORDER BY，不是 SORT BY' },
        { text: 'ORDER BY price HIGH', correct: false, explanation: '没有 HIGH 这个关键字' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全查询：显示不重复的商品类别：',
      template: 'SELECT ____ category FROM products;',
      answers: ['DISTINCT'],
      hints: ['去重关键字是 DISTINCT'],
    },
    {
      type: 'choose-next-line',
      instruction: '分步构建查询：找价格最低的商品。',
      context: 'products 表，需要查出 price 最小的那件商品的所有信息',
      steps: [
        {
          prompt: '第一行怎么写？',
          options: [
            { line: 'SELECT * FROM products', correct: true, explanation: 'SELECT * 查所有列' },
            { line: 'SELECT products', correct: false, explanation: '需要指定列名或 *' },
            { line: 'FROM products SELECT *', correct: false, explanation: 'SELECT 在前，FROM 在后' },
          ],
        },
        {
          prompt: '如何排序让价格最低的排第一？',
          options: [
            { line: 'ORDER BY price ASC', correct: true, explanation: 'ASC 升序，最低价排第一' },
            { line: 'ORDER BY price DESC', correct: false, explanation: 'DESC 降序，最高价排第一' },
            { line: 'SORT BY price', correct: false, explanation: 'SQL 中没有 SORT BY' },
          ],
        },
        {
          prompt: '只取第一行：',
          options: [
            { line: 'LIMIT 1;', correct: true, explanation: 'LIMIT 1 只返回第一行' },
            { line: 'LIMIT 1', correct: true, explanation: '分号可以省略，但最好加上' },
            { line: 'TOP 1;', correct: false, explanation: 'SQL Server 用 TOP，多数数据库用 LIMIT' },
          ],
        },
      ],
      finalCode: 'SELECT * FROM products ORDER BY price ASC LIMIT 1;',
    },
    {
      type: 'fix-code',
      instruction: '这个查询有语法错误：',
      buggyCode: "SELECT name, price FROM products\nWHERE category = '外设'\nORDER BY price DSC\nLIMIT 3;",
      goal: '查询外设类中价格最高的前三件商品。',
      fixes: [
        { text: '把 DSC 改成 DESC', correct: true, explanation: '降序关键字是 DESC，不是 DSC' },
        { text: '把 LIMIT 3 改成 LIMIT 5', correct: false, explanation: '数量没错，问题是 DESC 写成了 DSC' },
        { text: '把 WHERE 改成 HAVING', correct: false, explanation: 'WHERE 过滤行没错，不需要 HAVING' },
        { text: '把 ORDER BY 去掉', correct: false, explanation: '需要排序才能得到最高价的前三' },
      ],
      mode: 'choose-fix',
    },
    {
      type: 'compare-snippets',
      instruction: '对比两个查询：',
      question: '哪个查询会返回重复的类别名？',
      snippets: [
        {
          id: 's1',
          title: '查询 A',
          code: 'SELECT category FROM products;',
          correct: true,
          badge: '有重复',
          explanation: '普通 SELECT 包含所有行，包括重复的类别',
        },
        {
          id: 's2',
          title: '查询 B',
          code: 'SELECT DISTINCT category FROM products;',
          correct: false,
          badge: '无重复',
          explanation: 'DISTINCT 去掉重复值',
        },
      ],
      compareBy: 'output',
    },
    {
      type: 'type-it',
      instruction: '查外设类中 price 大于 50 的商品，按价格降序排列：',
      code: "SELECT name, price FROM products WHERE category = '外设' AND price > 50 ORDER BY price DESC;",
      hints: [
        'AND 连接多个条件',
        '字符串用单引号',
        'DESC 表示降序',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'LIMIT 5 OFFSET 2 表示什么？',
      options: [
        { text: '取前 5 行，跳过第 2 行', correct: false, explanation: 'OFFSET 2 跳过前 2 行' },
        { text: '跳过前 2 行，取接下来的 5 行', correct: true, explanation: 'OFFSET 是偏移量，LIMIT 是取几行' },
        { text: '取第 2 到第 5 行', correct: false, explanation: 'OFFSET 2 跳过 2 行，LIMIT 5 取 5 行' },
        { text: '取第 5 行到第 2 行', correct: false, explanation: '顺序反了' },
      ],
    },
    {
      type: 'predict-output',
      instruction: '看看 DISTINCT 的效果：',
      code: "-- students 表：\n-- id | city\n-- 1  | 北京\n-- 2  | 上海\n-- 3  | 北京\n-- 4  | 广州\n-- 5  | 上海\n\nSELECT DISTINCT city FROM students ORDER BY city;",
      expectedOutput: '北京、上海、广州（去重后排序）',
      options: [
        { text: '北京、上海、北京、广州、上海', correct: false, explanation: 'DISTINCT 会去掉重复值' },
        { text: '北京、上海、广州', correct: true, explanation: 'DISTINCT 去重后再排序' },
        { text: '上海、北京、广州', correct: false, explanation: 'DISTINCT 会去重，但 ORDER BY city 使结果是 北京、上海、广州' },
        { text: '北京、广州、上海', correct: false, explanation: 'ORDER BY city 会按字母排序' },
      ],
    },
    {
      type: 'fix-code',
      instruction: '又有一个错误查询：',
      buggyCode: 'SELECT name price FROM products\nLIMIT 5;',
      goal: '查询所有商品名称和价格。',
      fixes: [
        { text: 'name, price 之间加逗号', correct: true, explanation: '多个列名用逗号分隔' },
        { text: '把 LIMIT 5 去掉', correct: false, explanation: 'LIMIT 没问题，问题是缺少逗号' },
        { text: '给 name 加引号', correct: false, explanation: '列名不需要引号' },
        { text: '把 price 改成 prices', correct: false, explanation: '列名没错，是逗号的问题' },
      ],
      mode: 'choose-fix',
    },
    {
      type: 'type-it',
      instruction: '综合查询：找出价格在 50 到 500 之间的商品，按价格升序：',
      code: "SELECT name, price, category FROM products WHERE price BETWEEN 50 AND 500 ORDER BY price;",
      hints: [
        'BETWEEN 包含边界值',
        '默认升序可以不写 ASC',
        '可以查多列',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'SELECT * 的性能问题是什么？',
      options: [
        { text: '会返回不需要的列，浪费资源', correct: true, explanation: 'SELECT * 返回所有列，可能传输不需要的数据' },
        { text: '会报语法错误', correct: false, explanation: 'SELECT * 语法完全正确' },
        { text: '只用在外设类', correct: false, explanation: 'SELECT * 可用于任何表' },
        { text: '不能和 WHERE 一起用', correct: false, explanation: 'SELECT * 可以和任何子句一起用' },
      ],
    },
    {
      type: 'exposition',
      text: '练习要点：\n- 先读 WHERE 条件，再看 ORDER BY 和 LIMIT\n- DISTINCT 去重，BETWEEN 查范围\n- 列名用逗号分隔\n- DESC 降序，ASC 升序',
    },
  ],
}

export default lesson
