import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-loops-arrays',
    chapter: 4,
    title: '循环与数组综合练习',
    subtitle: '巩固 09-11',
    description: '综合运用数组和循环解决遍历、求和、查找等实际问题。',
    objectives: ['能独立用循环处理数组', '能实现求和、查找最大值等操作'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'code-runner',
      instruction: '题目 1：求数组所有元素的总和。把 TODO 替换成累加代码：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int scores[8] = {85, 92, 78, 90, 88, 76, 95, 82};\n  int total = 0;\n  // TODO: 用循环累加所有元素\n  for (int i = 0; i < 8; i++) {\n    total = total + scores[i];\n  }\n  cout << "总分：" << total;\n}',
      expectedOutput: '总分：686',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'exposition',
      text: '题目 1 是"累加模式"——遍历每个元素，累加到一个变量。\n这是数组操作中最基本的模式。',
    },
    {
      type: 'code-runner',
      instruction: '题目 2：找出数组中的最大值。把 TODO 替换成找最大值的代码：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int data[6] = {45, 78, 23, 91, 56, 67};\n  int max = data[0];\n  // TODO: 循环比较找出最大值\n  for (int i = 1; i < 6; i++) {\n    if (data[i] > max) {\n      max = data[i];\n    }\n  }\n  cout << "最大值：" << max;\n}',
      expectedOutput: '最大值：91',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：遍历数组，统计数组中正数的个数：',
      template: 'int nums[7] = {-3, 5, -1, 8, 0, -6, 4};\nint count = 0;\nfor (int i = 0; i < ____; i++) {\n  if (nums[i] ____ 0) {\n    ____;\n  }\n}\ncout << count;',
      answers: ['7', '>', 'count++'],
      hints: ['第一空：数组长度是 7', '第二空：正数是大于 0', '第三空：统计个数每次加 1'],
    },
    {
      type: 'exposition',
      text: '**三种常见数组操作：**\n1. **求和**：累加每个元素\n2. **找最大/最小**：比较并更新\n3. **计数**：符合条件就 +1',
    },
    {
      type: 'code-runner',
      instruction: '题目 3：统计数组中偶数的个数。补全 TODO 部分：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[10] = {3, 8, 15, 22, 7, 10, 33, 18, 5, 24};\n  int evenCount = 0;\n  // TODO: 遍历数组，判断每个元素是否为偶数\n  for (int i = 0; i < 10; i++) {\n    if (arr[i] % 2 == 0) {\n      evenCount++;\n    }\n  }\n  cout << "偶数个数：" << evenCount;\n}',
      expectedOutput: '偶数个数：5',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`for (int i = 0; i < 5; i++) { cout << arr[i]; }` 中 `i` 的范围是？',
      options: [
        { text: '1 到 5', correct: false, explanation: 'i 从 0 开始，不是 1' },
        { text: '0 到 4', correct: true, explanation: 'i=0,1,2,3,4 共 5 次，和数组下标一致' },
        { text: '0 到 5', correct: false, explanation: 'i=5 时条件 i<5 为 false，不会执行' },
        { text: '1 到 4', correct: false, explanation: 'i 从 0 开始，到 4 结束' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，把数组所有元素的值翻倍：',
      template: 'int arr[5] = {1, 2, 3, 4, 5};\nfor (int i = 0; i < 5; ____) {\n  arr[i] = arr[i] ____ 2;\n}',
      answers: ['i++', '*'],
      hints: ['第一空：每次循环加 1', '第二空：翻倍用乘法'],
    },
    {
      type: 'code-runner',
      instruction: '题目 4：倒序输出数组元素。补全 TODO 部分（提示：从最后一个下标开始往前）：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[5] = {10, 20, 30, 40, 50};\n  // TODO: 倒序输出（从下标 4 到 0）\n  for (int i = 4; i >= 0; i--) {\n    cout << arr[i] << " ";\n  }\n}',
      expectedOutput: '50 40 30 20 10',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：以下哪个运算符能判断左值是否**不等于**右值？',
      options: [
        { text: '!=', correct: true, explanation: '!= 是不等于运算符，左值不等于右值时返回 true' },
        { text: '!', correct: false, explanation: '! 是逻辑非（取反）运算符' },
        { text: '==', correct: false, explanation: '== 是等于运算符，判断是否相等' },
        { text: '<>', correct: false, explanation: 'C++ 没有 <> 运算符' },
      ],
    },
    {
      type: 'exposition',
      text: '所有课程中最重要的模式总结：\n\n`for` + `数组` = **遍历**\n这是编程里最基础、最常用的组合。\n\n后面的字符串处理、排序、查找等等，都是这个模式的扩展。',
    },
    {
      type: 'code-runner',
      instruction: '终极挑战：计算数组中所有元素的乘积。补全 TODO：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[5] = {2, 3, 4, 5, 6};\n  int product = 1;\n  // TODO: 累乘所有元素\n  for (int i = 0; i < 5; i++) {\n    product = product * arr[i];\n  }\n  cout << "乘积：" << product;\n}',
      expectedOutput: '乘积：720',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '复习本阶段核心：以下哪种循环至少保证执行一次循环体？',
      options: [
        { text: 'for', correct: false, explanation: 'for 和 while 一样，条件为 false 就可能一次都不执行' },
        { text: 'while', correct: false, explanation: 'while 先检查条件，false 就跳过' },
        { text: 'do-while', correct: true, explanation: 'do-while 先执行一次再判断条件' },
        { text: 'if', correct: false, explanation: 'if 是条件判断，不是循环' },
      ],
    },
    {
      type: 'exposition',
      text: '阶段 3 完成！你学会了：\n- 三种循环：`for`、`while`、`do-while`\n- 避免死循环\n- 数组的声明和访问\n- 用循环遍历数组',
    },
    {
      type: 'exposition',
      text: '下一阶段：**字符串与函数**——你会学到更强大的工具来组织代码。',
    },
  ],
}

export default lesson
