import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-io',
    chapter: 3,
    title: '输入输出练习',
    subtitle: '巩固 cin/cout',
    description: '综合练习 cin 和 cout 的输入输出编程。',
    objectives: ['熟练使用 cin 和 cout', '能写出完整的输入→处理→输出程序'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '写一个程序，输出你的年龄：',
      code: '#include <iostream>\nint main() {\n  std::cout << 18;\n}',
      hints: [
        '要有 #include <iostream>',
        'int main() { } 包住代码',
        '数字 18 不用加引号',
      ],
    },
    {
      type: 'code-runner',
      instruction: '写一个程序：输入两个数，输出它们的和。',
      code: '#include <iostream>\nint main() {\n  int a, b;\n  std::cin >> a >> b;\n  std::cout << a + b;\n}',
      editable: true,
      expectedOutput: '30',
      comparison: 'trimmed',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`std::cout << "值" << x;` 这条语句中，x 前面需要引号吗？',
      options: [
        { text: '需要，变量名也要加引号', correct: false, explanation: '加引号会变成文字"x"而不是变量的值' },
        { text: '不需要，变量名直接写', correct: true, explanation: '变量名不加引号，输出的是变量的值' },
        { text: '需要加单引号', correct: false, explanation: '单引号是字符字面量' },
        { text: '看情况', correct: false, explanation: '规则是固定的：变量不加引号' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输出文字并换行：',
      code: 'std::cout << "Hello" << std::endl;',
      hints: [
        '`endl` 是换行符',
        '前面也要加 `<<`',
        '别忘了还有 `std::`',
      ],
    },
    {
      type: 'multiple-choice',
      question: '程序运行到 `std::cin >> x;` 时会发生什么？',
      options: [
        { text: '程序结束', correct: false, explanation: 'cin 不会结束程序' },
        { text: '程序停下来等你输入', correct: true, explanation: 'cin 会等待用户输入后按回车' },
        { text: '输出 x 的值', correct: false, explanation: 'cin 是输入不是输出' },
        { text: '直接跳过', correct: false, explanation: 'cin 不会跳过，会等待输入' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '编一个程序：输入一个整数，输出这个数的两倍。\n（输入 7，输出 14）',
      code: '#include <iostream>\nint main() {\n  int n;\n  std::cin >> n;\n  std::cout << n * 2;\n}',
      editable: true,
      expectedOutput: '14',
      comparison: 'trimmed',
    },
    {
      type: 'type-it',
      instruction: '输入一个带提示的输入输出完整程序：',
      code: '#include <iostream>\nint main() {\n  std::cout << "输入数字：";\n  int x;\n  std::cin >> x;\n  std::cout << "你输入了" << x;\n}',
      hints: [
        '先用 cout 输出提示文字',
        '再用 cin 读取输入',
        '最后用 cout 输出结果',
      ],
    },
    {
      type: 'exposition',
      text: '输入输出的基本功已经练好了。\n下一阶段开始——让程序自己"做决定"。',
    },
  ],
}

export default lesson
