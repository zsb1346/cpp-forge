import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-comprehensive',
    chapter: 3,
    title: '综合练习',
    subtitle: '运算符+I/O+条件',
    description: '综合运用算术运算、输入输出和 if 条件编写完整程序。',
    objectives: ['能综合运用本阶段所学知识编写程序', '能独立完成输入→判断→输出的完整流程'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'code-runner',
      instruction: '写一个程序：输入两个整数，输出它们的和。如果和大于 100，再多输出"big"。',
      code: '#include <iostream>\nint main() {\n  int a, b;\n  std::cin >> a >> b;\n  int sum = a + b;\n  std::cout << sum;\n  if (sum > 100) {\n    std::cout << "big";\n  }\n}',
      editable: true,
      expectedOutput: '150big',
      comparison: 'trimmed',
    },
    {
      type: 'code-runner',
      instruction: '写一个程序：输入一个整数，判断它是正数、负数还是零。',
      code: '#include <iostream>\nint main() {\n  int n;\n  std::cin >> n;\n  if (n > 0) {\n    std::cout << "positive";\n  } else if (n < 0) {\n    std::cout << "negative";\n  } else {\n    std::cout << "zero";\n  }\n}',
      editable: true,
      expectedOutput: 'positive',
      comparison: 'trimmed',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`if (x > 0)` 中 x > 0 是什么类型的值？',
      options: [
        { text: 'int', correct: false, explanation: '比较的结果不是整数' },
        { text: 'bool', correct: true, explanation: '比较表达式产生 bool 值 true/false' },
        { text: 'string', correct: false, explanation: '比较不会产生字符串' },
        { text: 'char', correct: false, explanation: '比较结果不是单个字符' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`7 / 2` 的结果是什么？',
      options: [
        { text: '3.5', correct: false, explanation: 'int/int 会截断小数' },
        { text: '3', correct: true, explanation: '7÷2=3.5，小数部分被丢掉' },
        { text: '4', correct: false, explanation: '不四舍五入' },
        { text: '1', correct: false, explanation: '那是 7%2 的结果' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个完整的程序，输入年龄并判断是否成年（>=18）：',
      code: '#include <iostream>\nint main() {\n  int age;\n  std::cin >> age;\n  if (age >= 18) {\n    std::cout << "adult";\n  } else {\n    std::cout << "minor";\n  }\n}',
      hints: [
        '用 `>=` 判断大于等于',
        'age >= 18 为 true 则输出 adult',
        '否则输出 minor',
      ],
    },
    {
      type: 'type-it',
      instruction: '计算矩形面积并判断是否超过 100：',
      code: 'int w = 12, h = 10;\nint area = w * h;\nif (area > 100) {\n  std::cout << "大";\n}',
      hints: [
        '面积 = 宽 × 高',
        '12 × 10 = 120',
        '120 > 100 为 true',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`std::cout << "结果" << x;` 中，x 前需要加什么？',
      options: [
        { text: '要加双引号', correct: false, explanation: '变量名加引号会变成文字' },
        { text: '要加 <<', correct: true, explanation: '链式输出每个项目前都要加 <<' },
        { text: '要加逗号', correct: false, explanation: 'C++ 输出不用逗号分隔' },
        { text: '什么都不加', correct: false, explanation: '前面必须加 << 连接' },
      ],
    },
    {
      type: 'exposition',
      text: '你已经完成了阶段 2 的核心知识！\n只剩下两节综合复习课了——加油。',
    },
  ],
}

export default lesson
