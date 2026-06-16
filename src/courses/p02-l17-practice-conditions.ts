import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-conditions',
    chapter: 3,
    title: '条件练习',
    subtitle: '巩固 if/else',
    description: '综合练习 if/else 分支和比较运算符的使用。',
    objectives: ['能熟练使用 if-else 编写分支程序', '能正确处理 == 和 = 的区别'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '判断一个数是否大于 0：',
      code: 'int x = 5;\nif (x > 0) {\n  std::cout << "正数";\n}',
      hints: [
        'x > 0 是条件',
        '正数的意思是大于 0',
        '后面可以加 else 处理非正数',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 if-else 判断奇偶：',
      code: 'int n = 8;\nif (n % 2 == 0) {\n  std::cout << "偶数";\n} else {\n  std::cout << "奇数";\n}',
      hints: [
        '`n % 2` 取 n 除以 2 的余数',
        '余数为 0 是偶数',
        '8 是偶数，输出"偶数"',
      ],
    },
    {
      type: 'code-runner',
      instruction: '补全代码：输入一个数，如果大于等于 60 输出"pass"，否则输出"fail"。',
      code: '#include <iostream>\nint main() {\n  int score;\n  std::cin >> score;\n  if (score >= 60) {\n    std::cout << "pass";\n  } else {\n    std::cout << "fail";\n  }\n}',
      editable: true,
      expectedOutput: 'pass',
      comparison: 'trimmed',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`if (x = 0)` 会怎样？',
      options: [
        { text: 'x 等于 0 时进入 if', correct: false, explanation: '= 是赋值不是比较' },
        { text: '永远不进 if', correct: true, explanation: 'x=0 的值是 0，0 被视为 false' },
        { text: '永远进入 if', correct: false, explanation: '赋值 0 的结果是 0（false）' },
        { text: '会报错', correct: false, explanation: '语法没错，是逻辑错误' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个运算符表示"大于等于"？',
      options: [
        { text: '>', correct: false, explanation: '> 只是大于' },
        { text: '>=', correct: true, explanation: '>= 是大于或等于' },
        { text: '=>', correct: false, explanation: '顺序颠倒了' },
        { text: '≤', correct: false, explanation: 'C++ 不能用数学符号' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '写一个程序：输入一个整数，如果它能被 2 整除输出"yes"，否则输出"no"。\n（输入 4，输出 yes）',
      code: '#include <iostream>\nint main() {\n  int n;\n  std::cin >> n;\n  if (n % 2 == 0) {\n    std::cout << "yes";\n  } else {\n    std::cout << "no";\n  }\n}',
      editable: true,
      expectedOutput: 'yes',
      comparison: 'trimmed',
    },
    {
      type: 'type-it',
      instruction: '比较两个数的大小：',
      code: 'int a = 7, b = 3;\nif (a > b) {\n  std::cout << "a 大";\n} else {\n  std::cout << "b 大或相等";\n}',
      hints: [
        '一行可以声明两个变量：int a=7, b=3',
        '比较 a > b',
        '7 > 3 为 true',
      ],
    },
    {
      type: 'exposition',
      text: '你已经掌握条件判断了！下一课我们要把算术、I/O、条件**全部结合起来**做一个综合练习。',
    },
  ],
}

export default lesson
