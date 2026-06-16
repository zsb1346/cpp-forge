import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'cin-basics',
    chapter: 3,
    title: '输入基础',
    subtitle: '让程序听',
    description: '学习用 cin 从键盘读入数据并存入变量。',
    objectives: ['能用 cin 读取键盘输入', '理解 >> 是"从 cin 取数据"的符号'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前面学了输出（cout），现在学**输入（cin）**——让程序从键盘读取你打的东西。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`cin` 和 `>>` 配合使用，方向正好和 cout 相反：',
      code: 'int age;\nstd::cin >> age;\n// 程序会停下来等你输入数字',
    },
    {
      type: 'concept-cards',
      instruction: '认识输入相关的部件：',
      cards: [
        { glyph: '🎤', term: 'cin', meaning: '输入工具，从键盘读取数据', example: 'std::cin' },
        { glyph: '⬅️', term: '>>', meaning: '提取符号，从 cin 取数据存入变量', example: 'cin >> x' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个使用 cin 的程序：',
      code: '#include <iostream>\nint main() {\n  int x;\n  std::cin >> x;\n}',
      hints: [
        '需要先声明变量，再 cin >> 变量',
        '`>>` 方向朝右，和 cout 的 << 相反',
        '程序运行后会等你输入数字',
      ],
    },
    {
      type: 'exposition',
      text: '程序运行到 `cin >> x` 时会**停下来等待**——你在键盘上打字，按回车，输入的值就被存进 `x` 了。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：哪个代码是输出"结果"并换行？',
      options: [
        { text: 'std::cout << "结果" << std::endl', correct: true, explanation: '这是正确的链式输出加换行' },
        { text: 'std::cout >> "结果"', correct: false, explanation: '输出用 << 不是 >>' },
        { text: 'cout < "结果"', correct: false, explanation: '方向不对，而且缺 std::' },
        { text: 'std::cin << "结果"', correct: false, explanation: 'cin 是输入不是输出' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个带提示的输入程序：',
      code: '#include <iostream>\nint main() {\n  int x;\n  std::cout << "输入数字：";\n  std::cin >> x;\n}',
      hints: [
        '先用 cout 提示用户输入',
        '再用 cin 读取输入',
        '`>>` 方向是朝右的',
      ],
    },
    {
      type: 'code-runner',
      instruction: '点击运行，输入一个数字试试：',
      code: '#include <iostream>\nint main() {\n  int x;\n  std::cout << "请输入一个数：";\n  std::cin >> x;\n  std::cout << "你输入了：" << x;\n}',
      editable: false,
      comparison: 'none',
    },
    {
      type: 'exposition',
      text: '`cin` 让程序能"听到"你输入的内容。下一课我们把输入和输出组合起来用。',
    },
  ],
}

export default lesson
