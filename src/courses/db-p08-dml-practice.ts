import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'db-dml-practice',
    chapter: 3,
    title: '数据操作综合练习',
    subtitle: '增删改打字 · SQL 改错',
    description: '通过打字和纠错练习，掌握 INSERT / UPDATE / DELETE 的正确写法。',
    objectives: [
      '能熟练写出 INSERT 和 UPDATE 语句',
      '能发现并修复 DML 语句中的错误',
      '能预判 DML 操作后表的数据变化',
    ],
    estimatedMinutes: 12,
    pathway: {
      subject: 'sql',
      knowledgePoints: [
        { id: 'sql.dml.insert', label: 'INSERT 语句' },
        { id: 'sql.dml.update', label: 'UPDATE 语句' },
        { id: 'sql.dml.delete', label: 'DELETE 语句' },
      ],
      contentKinds: ['practice'],
      stage: 'recall',
    },
  },
  blocks: [
    {
      type: 'exposition',
      text: '动手之前先动脑。\n看看这些 DML 语句，你能不能一眼看出问题？',
    },
    {
      type: 'type-it',
      instruction: '往 products 表插入一条新商品记录：',
      code: "INSERT INTO products VALUES (1, '笔记本', 15.50);",
      hints: [
        'VALUES 中的值顺序要匹配表定义的列顺序',
        '数字 1 和 15.50 不加引号',
        "字符串 '笔记本' 要加单引号",
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪条 INSERT 语法正确？',
      options: [
        { text: "INSERT INTO users VALUES '张三', 20;", correct: false, explanation: 'VALUES 后面要用括号括起来' },
        { text: "INSERT INTO users VALUES ('张三', 20);", correct: true, explanation: 'VALUES (值1, 值2) 是标准语法' },
        { text: 'INSERT users VALUES ("张三", 20);', correct: false, explanation: 'SQL 字符串用单引号，不是双引号' },
        { text: 'INSERT INTO users (张三, 20);', correct: false, explanation: '缺少 VALUES 关键字' },
      ],
    },
    {
      type: 'fix-code',
      instruction: '这段 UPDATE 语句忘了 WHERE 条件。但还有另一个语法错误。',
      buggyCode: "UPDATE students SET name = '小明'\nSET age = 18\nWHERE id = 1;",
      goal: '修正语法错误，正确修改 id=1 的姓名和年龄。',
      fixes: [
        { text: '把第二个 SET 改成逗号', correct: true, explanation: '多列更新用逗号分隔，不需要重复 SET' },
        { text: '删掉 WHERE id = 1', correct: false, explanation: '删掉 WHERE 会更新所有行' },
        { text: '把 SET 改成 UPDATE', correct: false, explanation: 'SET 是 UPDATE 的子句，不是替换 UPDATE' },
        { text: '用 AND 连接两个 SET', correct: false, explanation: 'UPDATE 中没有 AND 连接 SET 的语法' },
      ],
      mode: 'choose-fix',
    },
    {
      type: 'type-it',
      instruction: '把上面的错误语句修正后敲一遍：',
      code: "UPDATE students SET name = '小明', age = 18 WHERE id = 1;",
      hints: [
        '多列更新用逗号分隔',
        'SET 只写一次',
        'WHERE 条件在最后',
      ],
    },
    {
      type: 'predict-output',
      instruction: '现有 orders 表，执行 SQL 后数据变成什么样？',
      code: '-- orders 表：\n-- id | product | quantity\n-- 1  | 鼠标    | 10\n-- 2  | 键盘    | 5\n-- 3  | 显示器  | 2\n\nUPDATE orders SET quantity = quantity + 5 WHERE id = 2;\nDELETE FROM orders WHERE id = 3;\n\n-- 执行后表里还剩哪些行？数量如何？',
      expectedOutput: 'id=1 鼠标 10（没变化），id=2 键盘 10（+5），id=3 被删了。',
      options: [
        { text: '鼠标(10), 键盘(10)', correct: true, explanation: '键盘 quantity=5+5=10，显示器被删除' },
        { text: '鼠标(10), 键盘(5), 显示器(2)', correct: false, explanation: 'DELETE FROM orders WHERE id=3 会删除显示器那一行' },
        { text: '鼠标(15), 键盘(10), 显示器(2)', correct: false, explanation: '鼠标 id=1 没被更新' },
        { text: '键盘(5), 显示器(2)', correct: false, explanation: '鼠标没有被删，还在表里' },
      ],
    },
    {
      type: 'fix-code',
      instruction: 'DELETE 语句有风险。',
      buggyCode: 'DELETE FROM employees;',
      goal: '删除 employees 表中部门为 "Sales" 的所有员工。',
      fixes: [
        { text: "DELETE FROM employees WHERE department = 'Sales';", correct: true, explanation: '加 WHERE 条件精确删除 Sales 部门' },
        { text: 'DELETE employees;', correct: false, explanation: '这仍然是全删，只是少了 FROM' },
        { text: "DELETE FROM employees WHERE department = Sales;", correct: false, explanation: 'Sales 是字符串，必须加单引号' },
        { text: 'REMOVE FROM employees;', correct: false, explanation: 'SQL 中用 DELETE，不是 REMOVE' },
      ],
      mode: 'choose-fix',
    },
    {
      type: 'multiple-choice',
      question: '关于 INSERT ... VALUES，以下哪个说法正确？',
      options: [
        { text: '一次只能插入一行', correct: false, explanation: '可以一次插入多行：VALUES (...), (...), (...)' },
        { text: '字符串值必须用双引号', correct: false, explanation: 'SQL 字符串标准是单引号' },
        { text: '列顺序可以和表定义不同', correct: false, explanation: '不指定列名时，必须按表定义的列顺序' },
        { text: '可以指定列名来部分插入', correct: true, explanation: 'INSERT INTO t (col1, col2) VALUES (v1, v2) 可以只插部分列' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习一次插入多行：',
      code: "INSERT INTO products (name, price) VALUES ('钢笔', 3.50), ('橡皮', 1.00), ('尺子', 2.00);",
      hints: [
        'VALUES 后面可以跟多组值',
        '每组值用括号，逗号分隔',
        '这里只插 name 和 price 两列',
      ],
    },
    {
      type: 'choose-next-line',
      instruction: '分步写出完整的 DML 指令：先在 orders 表插入一行，再修改数量。',
      context: '已有 orders 表，含 id, product, quantity 三列',
      steps: [
        {
          prompt: '插入一行数据：',
          options: [
            { line: "INSERT INTO orders VALUES (4, '桌子', 3);", correct: true, explanation: '标准 INSERT 语法' },
            { line: "INSERT orders VALUES (4, '桌子', 3);", correct: false, explanation: 'INSERT 需要 INTO 关键字' },
            { line: "ADD INTO orders VALUES (4, '桌子', 3);", correct: false, explanation: '添加数据用 INSERT，不用 ADD' },
          ],
        },
        {
          prompt: '把桌子的数量改为 5：',
          options: [
            { line: "UPDATE orders SET quantity = 5 WHERE id = 4;", correct: true, explanation: '用 id 定位要更新的行' },
            { line: "UPDATE orders SET quantity = 5;", correct: false, explanation: '没有 WHERE 会更新所有行' },
            { line: "UPDATE orders SET quantity = 5 WHERE product = '桌子';", correct: true, explanation: '也可以用产品名定位，但 id 更精确' },
          ],
        },
      ],
      finalCode: "INSERT INTO orders VALUES (4, '桌子', 3);\nUPDATE orders SET quantity = 5 WHERE id = 4;",
    },
    {
      type: 'fill-in',
      prompt: '补全 DELETE 语句，删除 price 为 NULL 的商品：',
      template: 'DELETE ____ products\n____ price IS NULL;',
      answers: ['FROM', 'WHERE'],
      hints: ['DELETE 后跟 FROM 表名', '条件用 WHERE'],
    },
    {
      type: 'type-it',
      instruction: '完整练习：插入 → 更新 → 删除：',
      code: "INSERT INTO students VALUES (5, '周八', 19);\nUPDATE students SET age = 20 WHERE id = 5;\nDELETE FROM students WHERE id = 5;",
      hints: [
        '先插入一条记录',
        '立刻更新这条记录的年龄',
        '最后又删除了这条记录',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'TRUNCATE 和 DELETE 最大的区别是什么？',
      options: [
        { text: 'DELETE 不能删数据', correct: false, explanation: 'DELETE 可以删数据，只是方式不同' },
        { text: 'TRUNCATE 不能加 WHERE', correct: true, explanation: 'TRUNCATE 不支持条件，只能清空全表' },
        { text: 'TRUNCATE 只能用在 MySQL', correct: false, explanation: 'TRUNCATE 是 SQL 标准，多种数据库支持' },
        { text: 'DELETE 不支持回滚', correct: false, explanation: 'DELETE 在事务中可以回滚' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '执行 `UPDATE products SET price = price * 1.1;` 后结果是什么？',
      options: [
        { text: '所有商品涨价 10%', correct: true, explanation: 'price = price * 1.1 让每行价格乘以 1.1' },
        { text: '所有商品价格变成 1.1', correct: false, explanation: 'price * 1.1 是乘法运算，不是赋值 1.1' },
        { text: '报错，price 不能引用自己', correct: false, explanation: 'SET 子句中可以用旧值计算新值' },
        { text: '只涨第一行', correct: false, explanation: '没有 WHERE 就是所有行' },
      ],
    },
    {
      type: 'exposition',
      text: '练习总结：\n- UPDATE 和 DELETE 一定要先确认 WHERE\n- INSERT 可插多行，用逗号分隔\n- 字符串用单引号，数字不用\n- TRUNCATE 不能加条件',
    },
  ],
}

export default lesson
