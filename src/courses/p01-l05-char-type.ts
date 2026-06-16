import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'char-type',
    chapter: 2,
    title: 'char——单个字符',
    subtitle: '认识字符类型',
    description: '认识 char 类型，字符用单引号括起来。',
    objectives: ['知道 char 代表字符类型', '能正确写出字符字面量'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '一个字母、一个数字、一个标点——只要一个，用 `char`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '认识 char：',
      cards: [
        { glyph: '📦', term: 'char', meaning: '字符类型，装一个字符', example: 'char / int' },
        { glyph: '🔤', term: "'A'", meaning: '字符值，用单引号', example: "'a' / '?' / '7'" },
        { glyph: '🚫', term: '"A"', meaning: '双引号是字符串，不是 char', example: '"A" 是文字，不是字符' },
      ],
    },
    {
      type: 'exposition',
      text: '`char` 只装 **一个** 字符，而且用 **单引号** 括起来。',
      code: "'A'   // ✅ 一个字符，char\na'    // ✅ 小写字母也可以\n'?'   // ✅ 标点也可以\n'7'   // ✅ 数字字符（不是数字7）\n' '   // ✅ 空格也可以\n'AB'  // ❌ 两个字符，char 装不下",
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：`3.14` 是什么类型？',
      options: [
        { text: 'int', correct: false, explanation: '有小数点，不是 int' },
        { text: 'double', correct: true, explanation: '3.14 有小数点，是 double 类型' },
        { text: 'char', correct: false, explanation: 'char 是单引号括起来的单个字符' },
        { text: 'bool', correct: false, explanation: 'bool 只有 true 和 false' },
      ],
    },
    {
      type: 'type-it',
      instruction: '试着输入一个 char 类型的值：',
      code: "'A'",
      hints: [
        '字符要用单引号括起来',
        '引号里面只能放一个字符',
        '字符可以是大写字母、小写字母、数字或标点',
      ],
    },
    {
      type: 'exposition',
      text: '常见 char 值：`\'A\'` 到 `\'Z\'`、`\'a\'` 到 `\'z\'`、`\'0\'` 到 `\'9\'`、还有 `\'!\'`、`\'?\'`、`\' \'`（空格）。\n\n注意：`\'7\'` 是字符"7"，不是数字 7。它们是不同的东西。',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是正确的 char 值？',
      options: [
        { text: '"A"', correct: false, explanation: '双引号是字符串，不是 char' },
        { text: "'A'", correct: true, explanation: '单引号括起来的单个字符，正确' },
        { text: "'AB'", correct: false, explanation: '两个字符，char 只能装一个' },
        { text: 'A', correct: false, explanation: '没有引号，C++ 不认识这是字符' },
      ],
    },
    {
      type: 'exposition',
      text: '记住三个要点：\n1. `char` = 一个字符\n2. 用单引号 `\' \'` 包着\n3. 里面只能有一个字符',
    },
  ],
}

export default lesson
