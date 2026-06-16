import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'double-type',
    chapter: 2,
    title: 'double——装小数的盒子',
    subtitle: '认识浮点类型',
    description: '认识 double 类型，理解 double 和 int 的区别。',
    objectives: ['知道 double 代表浮点类型', '能区分 int 和 double'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '整数用 `int`，那小数呢？用 `double`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '认识 double：',
      cards: [
        { glyph: '📦', term: 'double', meaning: '浮点类型，装带小数点的数', example: 'double / int' },
        { glyph: '🔟', term: '3.14', meaning: 'double 类型的值', example: '带小数点的数' },
        { glyph: '⚖️', term: 'int vs double', meaning: 'int 不装小数，double 可以', example: '3 vs 3.0' },
      ],
    },
    {
      type: 'exposition',
      text: '`double` 可以装带小数点的数字：`3.14`、`0.5`、`-2.0`、`99.99`。\n\n而 `int` 只能装整数。`3` 是 int，`3.0` 是 double。',
      code: '// int（整数）：\n3\n-5\n100\n\n// double（小数）：\n3.0\n-5.0\n99.99',
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：`int` 是什么？',
      options: [
        { text: '一种值', correct: false, explanation: 'int 是类型，不是值本身' },
        { text: '整数类型，只能装整数', correct: true, explanation: 'int 就是整数类型' },
        { text: '一个名字', correct: false, explanation: 'int 是关键字，不是变量名' },
        { text: '一个小数', correct: false, explanation: 'int 装整数，不装小数' },
      ],
    },
    {
      type: 'exposition',
      text: '为什么需要两种？整数和小数在计算机里存的方式不一样。\n\n`int` 更省空间，`double` 可以表示更精确的值（尤其是小数部分）。\n\n简单记住：**整数用 int，小数用 double**。',
    },
    {
      type: 'multiple-choice',
      question: '`3.0` 是什么类型？',
      options: [
        { text: 'int', correct: false, explanation: '虽然 3.0 等于 3，但它带了小数点，是 double' },
        { text: 'double', correct: true, explanation: '有小数点就是 double 类型' },
        { text: '既是 int 也是 double', correct: false, explanation: '一个值只能是一种类型' },
        { text: '都不是', correct: false, explanation: '3.0 是有效的 double 值' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是 double 类型的值？',
      options: [
        { text: '100', correct: false, explanation: '没有小数点，是 int' },
        { text: '0.5', correct: true, explanation: '带了小数点，是 double' },
        { text: "'A'", correct: false, explanation: '字符类型，不是 double' },
        { text: 'true', correct: false, explanation: '布尔类型，不是 double' },
      ],
    },
    {
      type: 'exposition',
      text: '区别很简单：**看有没有小数点**。\n有小数点 → double。没有小数点 → int。',
    },
  ],
}

export default lesson
