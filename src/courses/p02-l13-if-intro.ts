import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'if-intro',
    chapter: 3,
    title: 'if 语句',
    subtitle: '如果……就……',
    description: '学习用 if 语句让程序根据条件决定是否执行代码。',
    objectives: ['能用 if 语句写简单条件分支', '理解 if 后面的条件必须是 bool 值'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '程序有时需要"看情况决定"——如果某个条件成立，就做一件事。\nC++ 里用 `if` 来实现。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '最简单的 `if`：\n\n`if (条件) {  // 如果条件为 true\n    // 执行这里的代码\n}`',
      code: 'int score = 85;\nif (score >= 60) {\n    std::cout << "及格了";\n}',
    },
    {
      type: 'concept-cards',
      instruction: '认识 if 语句的三个部件：',
      cards: [
        { glyph: '🤔', term: 'if', meaning: '如果……就……，条件关键字', example: 'if (x > 0)' },
        { glyph: '🔲', term: '(条件)', meaning: '放比较表达式的位置，结果是 bool', example: '(score >= 60)' },
        { glyph: '📦', term: '{ }', meaning: '花括号，包住条件成立时要执行的代码', example: '{ cout << "ok"; }' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个简单的 if 语句：',
      code: 'if (5 > 3) {\n  std::cout << "大了";\n}',
      hints: [
        '`if` 后面跟括号，括号里是条件',
        '条件 `5 > 3` 结果是 true',
        '花括号 `{ }` 包住要执行的代码',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`bool r = (10 != 10);` 执行后 r 是什么？',
      options: [
        { text: 'true', correct: false, explanation: '10 等于 10，所以"不等于"是假的' },
        { text: 'false', correct: true, explanation: '10 == 10，所以 10 != 10 是 false' },
        { text: '10', correct: false, explanation: '比较结果不是数字' },
        { text: '报错', correct: false, explanation: '语法正确不会报错' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个判断分数的 if 语句：',
      code: 'int score = 90;\nif (score >= 60) {\n  std::cout << "通过";\n}',
      hints: [
        '先声明变量 score 为 90',
        '条件 score >= 60 为 true',
        '花括号里是要执行的输出',
      ],
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序拼出 if 语句：',
      fragments: ['if', '(score >= 60)', '{', 'std::cout << "ok";', '}'],
      distractors: ['while'],
    },
    {
      type: 'type-it',
      instruction: '输入一个完整的包含 if 的程序：',
      code: '#include <iostream>\nint main() {\n  int x = 10;\n  if (x > 5) {\n    std::cout << "x 大于 5";\n  }\n}',
      hints: [
        '完整的程序要有 main 函数',
        '条件 x > 5 为 true',
        '花括号包住输出语句',
      ],
    },
    {
      type: 'exposition',
      text: '`if` 就是让程序"做决定"的工具。\n如果条件为 true，就执行花括号里的代码；如果为 false，就跳过。',
    },
  ],
}

export default lesson
