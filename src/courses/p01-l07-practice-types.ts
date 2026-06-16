import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-types',
    chapter: 2,
    title: '类型练习课',
    subtitle: '巩固 int/double/char/bool',
    description: '综合练习四种基本类型的辨析。',
    objectives: ['能区分四种基本类型', '能根据值判断其类型'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '`99` 是什么类型？',
      options: [
        { text: 'int', correct: true, explanation: '没有小数点，是整数 int' },
        { text: 'double', correct: false, explanation: '没有小数点，不是 double' },
        { text: 'char', correct: false, explanation: '没有单引号，不是 char' },
        { text: 'bool', correct: false, explanation: '只有 true/false 才是 bool' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`3.14` 是什么类型？',
      options: [
        { text: 'int', correct: false, explanation: '有小数点，不是 int' },
        { text: 'double', correct: true, explanation: '有小数点，是 double' },
        { text: 'char', correct: false, explanation: '没有单引号，不是 char' },
        { text: 'bool', correct: false, explanation: '只有 true/false 才是 bool' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`\'X\'` 是什么类型？',
      options: [
        { text: 'int', correct: false, explanation: '有单引号，不是 int' },
        { text: 'double', correct: false, explanation: '没有小数点，不是 double' },
        { text: 'char', correct: true, explanation: '单引号括起来的单个字符就是 char' },
        { text: 'bool', correct: false, explanation: '只有 true/false 才是 bool' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '四种类型快速对照：',
      cards: [
        { glyph: '🔢', term: 'int', meaning: '整数，无小数点', example: '0 / 99 / -5' },
        { glyph: '🔟', term: 'double', meaning: '小数，带小数点', example: '3.14 / 0.5' },
        { glyph: '🔤', term: 'char', meaning: '单个字符，单引号', example: "'A' / '?'" },
        { glyph: '✅', term: 'bool', meaning: '真或假', example: 'true / false' },
      ],
    },
    {
      type: 'exposition',
      text: '做题的时候问自己三个问题：\n1. 有没有小数点？→ 有就是 double，没有继续\n2. 有没有单引号？→ 有就是 char，没有继续\n3. 是不是 true/false？→ 是就是 bool，不是就是 int',
    },
    {
      type: 'multiple-choice',
      question: '`"hello"` 是这四种类型之一吗？',
      options: [
        { text: '是 char', correct: false, explanation: '双引号不是 char，char 用单引号' },
        { text: '不是，这是字符串，没学到', correct: true, explanation: '双引号括起来的是字符串，这课还没学到' },
        { text: '是 double', correct: false, explanation: '没有小数点' },
        { text: '是 bool', correct: false, explanation: '不是 true/false' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`false` 是什么类型？',
      options: [
        { text: 'int', correct: false, explanation: 'false 不是整数' },
        { text: 'double', correct: false, explanation: '没有小数点' },
        { text: 'char', correct: false, explanation: '没有单引号' },
        { text: 'bool', correct: true, explanation: 'false 是 bool 类型的一个值' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`0` 和 `\'0\'` 有什么区别？',
      options: [
        { text: '没有区别', correct: false, explanation: '一个 int 一个 char，完全不同' },
        { text: '0 是 int，\'0\' 是 char', correct: true, explanation: '0 是数字，\'0\' 是字符，类型不同' },
        { text: '0 是 char，\'0\' 是 int', correct: false, explanation: '搞反了' },
        { text: '0 是 bool，\'0\' 是 int', correct: false, explanation: '0 是整数，不是 bool' },
      ],
    },
    {
      type: 'exposition',
      text: '熟练了吗？之后我们会用这些类型来声明变量。',
    },
  ],
}

export default lesson
