import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'int-type',
    chapter: 2,
    title: 'int——整数的盒子',
    subtitle: '认识整数类型',
    description: '认识 int 类型，理解类型规定了一个变量能装什么值。',
    objectives: ['知道 int 代表整数类型', '能分辨哪些值可以放进 int'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '不同类型的值，用不同的"盒子"来装。整数的盒子叫 `int`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '认识 int：',
      cards: [
        { glyph: '📦', term: 'int', meaning: '整数类型，装整数', example: 'int / double' },
        { glyph: '🔢', term: '42', meaning: 'int 类型的值', example: '整数，没有小数点' },
        { glyph: '🚫', term: '3.14', meaning: '不是 int，是小数', example: 'int 不装小数点' },
      ],
    },
    {
      type: 'exposition',
      text: '`int` 就像一个贴了标签"只装整数"的盒子。\n你可以放 `0`、`99`、`-5`、`10000`。但不能放 `3.14`（那是小数）。',
      code: '42    // ✅ 整数，可以放进 int\n99    // ✅ 整数\n-5    // ✅ 整数\n3.14  // ❌ 小数，不能放进 int',
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：名字和值是什么关系？',
      options: [
        { text: '名字就是值', correct: false, explanation: '名字和值是两个不同的东西' },
        { text: '名字是值的标签', correct: true, explanation: '名字贴在值上面，方便引用' },
        { text: '值不能有名字', correct: false, explanation: '值可以有名字' },
        { text: '一个值只能有一个名字', correct: false, explanation: '可以有多个名字指向同一个值' },
      ],
    },
    {
      type: 'type-it',
      instruction: '试着输入一个 int 类型的值：',
      code: '42',
      hints: [
        '直接写数字就行，不用加引号',
        '整数不要带小数点',
        '可以写正数、负数或 0',
      ],
    },
    {
      type: 'exposition',
      text: '常见的 int 值：\n- `0`\n- `100`\n- `-5`\n- `9999`\n\n这些都没有小数点。有小数点的就不是 int。',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个值是 int 类型？',
      options: [
        { text: '3.14', correct: false, explanation: '有小数点，是 double 不是 int' },
        { text: '100', correct: true, explanation: '100 是整数，没有小数点' },
        { text: "'A'", correct: false, explanation: '这是字符，不是整数' },
        { text: 'true', correct: false, explanation: '这是布尔值，不是整数' },
      ],
    },
    {
      type: 'exposition',
      text: '记住：`int` = 整数盒子。只装整数，不装小数、不装字符、不装文字。',
    },
  ],
}

export default lesson
