import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-all-p2',
    chapter: 3,
    title: '阶段大练习',
    subtitle: '阶段2全面练习',
    description: '覆盖算术运算符、输入输出、条件判断的综合大练习。',
    objectives: ['巩固本阶段全部知识点', '能独立解决需要组合多种知识的编程题'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '输入一个计算表达式，求 (8+2)*3 的值：',
      code: 'int r = (8 + 2) * 3;',
      hints: [
        '括号里的先算：8+2=10',
        '再算 10*3=30',
        '结果 r 是 30',
      ],
    },
    {
      type: 'code-runner',
      instruction: '写一个程序：输入一个整数，如果它能同时被 3 和 5 整除，输出"yes"，否则输出"no"。\n（输入 15，输出 yes）',
      code: '#include <iostream>\nint main() {\n  int n;\n  std::cin >> n;\n  if (n % 3 == 0 && n % 5 == 0) {\n    std::cout << "yes";\n  } else {\n    std::cout << "no";\n  }\n}',
      editable: true,
      expectedOutput: 'yes',
      comparison: 'trimmed',
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下哪个是输出换行的正确写法？',
      options: [
        { text: 'std::cout << endl', correct: false, explanation: 'endl 需要 std:: 前缀' },
        { text: 'std::cout << std::endl', correct: true, explanation: 'endl 需要 std:: 前缀' },
        { text: 'std::cout >> std::endl', correct: false, explanation: '输出用 << 而不是 >>' },
        { text: 'cout.endline()', correct: false, explanation: 'C++ 没有这种写法' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`int x = 10 / 3;` 执行后 x 的值是？',
      options: [
        { text: '3.33', correct: false, explanation: 'int/int 不会有小数' },
        { text: '3', correct: true, explanation: '10÷3=3.333…，截断得 3' },
        { text: '4', correct: false, explanation: '不四舍五入' },
        { text: '1', correct: false, explanation: '那是 10%3 的结果' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`if (score = 100)` 这行代码有什么问题？',
      options: [
        { text: '没有语法错误，但可能会造成逻辑错误', correct: true, explanation: '= 是赋值，score 被改成 100，且条件永远成立' },
        { text: '语法错误，不能编译', correct: false, explanation: '= 在 if 条件里是合法的，只是逻辑不对' },
        { text: '它在检查 score 是否为 100', correct: false, explanation: '== 才是检查相等的' },
        { text: 'score 的值不会变', correct: false, explanation: '赋值后 score 会变成 100' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：输入两个数，输出较大的那个：',
      template: 'int a, b;\nstd::cin >> ____ >> ____;\nif (____ > ____) {\n  std::cout << a;\n} else {\n  std::cout << b;\n}',
      answers: ['a', 'b', 'a', 'b'],
      hints: ['前两个空是 cin 要存入的变量名', '第三个空是判断条件左边的变量', '第四个空是判断条件右边的变量'],
    },
    {
      type: 'type-it',
      instruction: '输入一个判断闰年的条件（能被 4 整除）：',
      code: 'int year = 2024;\nif (year % 4 == 0) {\n  std::cout << "闰年";\n}',
      hints: [
        '`year % 4` 取年份除以 4 的余数',
        '余数为 0 就是能被 4 整除',
        '2024 % 4 == 0 为 true',
      ],
    },
    {
      type: 'exposition',
      text: '很大进步！你已经把阶段 2 的所有知识都练习了一遍。\n还剩最后一节综合复习课。',
    },
  ],
}

export default lesson
