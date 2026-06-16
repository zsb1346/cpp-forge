import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'multiply-divide-mod',
    chapter: 3,
    title: '乘除取模',
    subtitle: '乘法、除法、取模',
    description: '学习用 * / % 做运算，理解 % 是整除取余数。',
    objectives: ['能用 * / % 写出算术表达式', '理解 % 是取余运算符'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '除了加减，C++ 还有三个常用运算符：`*` `/` `%`。',
    },
    {
      type: 'concept-cards',
      instruction: '认识这三个新运算符：',
      cards: [
        { glyph: '✖️', term: '*', meaning: '乘法，跟数学里的 × 一样', example: '3 * 4 得 12' },
        { glyph: '➗', term: '/', meaning: '除法，跟数学里的 ÷ 一样', example: '10 / 2 得 5' },
        { glyph: '🔢', term: '%', meaning: '取余，整除后剩下的数', example: '7 % 3 得 1' },
      ],
    },
    {
      type: 'exposition',
      text: '先看乘法——用 `*` 号：',
      code: 'int product = 6 * 7;  // product 得到 42',
    },
    {
      type: 'type-it',
      instruction: '输入一个乘法表达式：',
      code: 'int area = 5 * 8;',
      hints: [
        '`*` 是乘号，不是字母 x',
        '`*` 两边加空格更清晰',
        '别忘了末尾分号',
      ],
    },
    {
      type: 'exposition',
      text: '除法用 `/`：',
      code: 'int share = 10 / 2;  // share 得到 5',
    },
    {
      type: 'type-it',
      instruction: '输入一个除法表达式：',
      code: 'int half = 20 / 4;',
      hints: [
        '`/` 是除号，不是反斜杠 \\',
        '确保符号打对了',
        '最后要有分号',
      ],
    },
    {
      type: 'exposition',
      text: '`%` 是**取余**（也叫取模）：\n`7 % 3` 就是"7 除以 3，余数是多少"。\n7 ÷ 3 = 2 余 **1**，所以 `7 % 3` 结果是 `1`。',
      code: 'int remainder = 7 % 3;  // remainder 得到 1',
    },
    {
      type: 'type-it',
      instruction: '输入一个取余表达式：',
      code: 'int leftover = 10 % 3;',
      hints: [
        '`%` 在两数中间，像加减乘除一样',
        '10 ÷ 3 = 3 余 1，结果应该是 1',
        '写完检查符号和分号',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`int total = 10 + 5 - 3;` 这条语句中用了几个运算符？',
      options: [
        { text: '1 个', correct: false, explanation: '仔细数数，不止一个' },
        { text: '2 个', correct: true, explanation: '一个 + 和一个 -，共两个运算符' },
        { text: '3 个', correct: false, explanation: 'int 和 = 不是运算符' },
        { text: '4 个', correct: false, explanation: '太多了' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：`*` 乘、`/` 除、`%` 取余。\n下一课有个重要的陷阱要告诉你！',
    },
  ],
}

export default lesson
