import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'cin-cout-combo',
    chapter: 3,
    title: '交互编程',
    subtitle: '输入→处理→输出',
    description: '组合 cin 和 cout 写出完整的输入输出交互程序。',
    objectives: ['能写出 cin 输入→计算→cout 输出的完整程序'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '现在是时候把输入、处理和输出连起来——做一个"完整的交互程序"。',
    },
    {
      type: 'exposition',
      text: '经典的"输入→计算→输出"三步走：',
      code: 'int x;\nstd::cin >> x;       // 1. 输入\nint y = x * 2;       // 2. 计算\nstd::cout << y;      // 3. 输出',
    },
    {
      type: 'type-it',
      instruction: '输入一个完整的交互程序：',
      code: '#include <iostream>\nint main() {\n  int n;\n  std::cin >> n;\n  std::cout << n + 10;\n}',
      hints: [
        '先声明变量 n',
        'cin 读取输入存进 n',
        'cout 输出计算结果 n+10',
      ],
    },
    {
      type: 'exposition',
      text: '注意：`n + 10` 是一个表达式，先算出结果再输出。\n`cout` 可以直接输出表达式的结果。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下哪个符号用于 cin 输入？',
      options: [
        { text: '<<', correct: false, explanation: '<< 是 cout 输出用的' },
        { text: '>>', correct: true, explanation: '>> 用于 cin，从键盘提取数据' },
        { text: '&&', correct: false, explanation: '&& 是逻辑与运算符' },
        { text: '||', correct: false, explanation: '|| 是逻辑或运算符' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个输入数字、输出加倍的程序：',
      code: '#include <iostream>\nint main() {\n  int x;\n  std::cin >> x;\n  std::cout << x * 2;\n}',
      hints: [
        'cin 读取输入到 x',
        '表达式 x*2 计算两倍值',
        '运行后在终端输入数字试试',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行下面的程序：输入一个整数，它会输出这个数加 5 的结果。',
      code: '#include <iostream>\nint main() {\n  int num;\n  std::cin >> num;\n  std::cout << num + 5;\n}',
      editable: true,
      expectedOutput: '15',
      comparison: 'trimmed',
    },
    {
      type: 'exposition',
      text: '这个模式你会反复用到：**输入→计算→输出**。\n后面学条件判断后，还能让程序做更智能的事情。',
    },
  ],
}

export default lesson
