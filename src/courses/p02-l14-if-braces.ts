import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'if-braces',
    chapter: 3,
    title: '花括号',
    subtitle: '花括号划定范围',
    description: '理解 if 语句中花括号 {} 的作用，以及没有 {} 时的陷阱。',
    objectives: ['理解花括号的作用是划定代码块', '知道 if 不加花括号只控制一行'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`if` 后面的花括号 `{ }` 用来划出一个**范围**——条件成立时要把哪些代码包在一起。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '花括号把多行代码"捆"成一个整体：',
      code: 'if (score >= 60) {\n  std::cout << "及格了";\n  std::cout << "继续加油";\n}\n// 两行都在 if 里面',
    },
    {
      type: 'exposition',
      text: '如果不加花括号，`if` 只控制**紧跟着的一行**代码：',
      code: 'if (score >= 60)\n  std::cout << "及格了";\n  std::cout << "这条不受 if 控制";',
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下哪个是 if 语句的正确格式？',
      options: [
        { text: 'if x > 5 { }', correct: false, explanation: 'if 后面的条件必须用括号 () 包住' },
        { text: 'if (x > 5) { }', correct: true, explanation: '条件放 () 里，代码放 {} 里' },
        { text: 'if (x > 5) [ ]', correct: false, explanation: '方括号不是 C++ 的代码块' },
        { text: 'if x > 5 then { }', correct: false, explanation: 'C++ 的 if 不需要 then' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个带花括号的 if 语句，包含两个输出：',
      code: 'if (5 > 3) {\n  std::cout << "成立";\n  std::cout << "确实";\n}',
      hints: [
        '花括号把两行输出包在一起',
        '两行输出都会被执行',
        '注意每行输出末尾都要分号',
      ],
    },
    {
      type: 'type-it',
      instruction: '试试没有花括号的情况：',
      code: 'if (5 > 3)\n  std::cout << "第一行";\nstd::cout << "第二行";',
      hints: [
        '第二行虽然缩进了，但不受 if 控制',
        '缩进只是给人看的，C++ 只看花括号',
        '运行后两行都会输出，因为第二行不受 if 影响',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下代码会输出什么？\n`if (false)`\n`  std::cout << "A";`\n`  std::cout << "B";`',
      options: [
        { text: 'A 和 B 都不输出', correct: false, explanation: '第二行没有花括号，B 不受 if 控制' },
        { text: '只输出 B', correct: true, explanation: 'A 在 if 里面不输出，B 在 if 外面所以输出' },
        { text: 'A 和 B 都输出', correct: false, explanation: '条件为 false，A 不执行，但 B 不受控制' },
        { text: '只输出 A', correct: false, explanation: '条件为 false，A 也不输出' },
      ],
    },
    {
      type: 'exposition',
      text: '好习惯：**不管 if 后面有几行代码，都加上花括号**。\n这样更清晰，也不会犯"只控制一行"的错误。',
    },
  ],
}

export default lesson
