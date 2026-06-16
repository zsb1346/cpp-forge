import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'what-is-value',
    chapter: 2,
    title: '什么是值',
    subtitle: '认识程序里的数据',
    description: '程序操作的基本材料就是"值"。数字、文字、真假……一切都是值。',
    objectives: [
      '能说出"值"是程序操作的基本数据',
      '能识别代码中的各种字面量',
      '能区分不同类型字面量的写法',
    ],
    estimatedMinutes: 7,
  },
  blocks: [
    {
      type: 'exposition',
      text: '程序看起来是一堆符号，但归根到底，它操作的是**数据**。这些数据有一个统称——**值**（value）。',
    },
    {
      type: 'exposition',
      text: '值有各种样子：`42` 是整数，`3.14` 是小数，`\'A\'` 是单个字母，`"hi"` 是一串文字，`true` 是真假值。它们都是"值"。',
    },
    {
      type: 'concept-cards',
      instruction: '认识几种常见的值：',
      cards: [
        { glyph: '🔢', term: '42', meaning: '整数字面量，直接写数字' },
        { glyph: '🔟', term: '3.14', meaning: '小数字面量，带小数点' },
        { glyph: '🔤', term: "'A'", meaning: '字符字面量，用单引号包围' },
        { glyph: '📝', term: '"hi"', meaning: '字符串字面量，用双引号包围' },
        { glyph: '✅', term: 'true', meaning: '布尔字面量，真或假' },
      ],
    },
    {
      type: 'exposition',
      text: '这种直接写在代码里的值，叫**字面量**（literal）。字面量就是"字面上的值"——它是什么，一眼就能看出来。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '试着输入一个整数字面量：',
      code: '42',
      hints: [
        '整数直接写数字就行，不需要加引号',
        '不用加分号，这里只是一个值',
      ],
    },
    {
      type: 'type-it',
      instruction: '试着输入一个小数字面量：',
      code: '3.14',
      hints: [
        '小数点用英文句号 .',
        '不要加引号，加了就成了字符串',
        '整数和差个小数的写法就差一个点',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是**字面量值**？',
      options: [
        { text: 'int', correct: false, explanation: 'int 是类型关键字，不是具体的值' },
        { text: '42', correct: true, explanation: '42 是直接写出来的整数值，它就是字面量' },
        { text: '变量', correct: false, explanation: '"变量"是中文概念名词，不是代码里的值' },
        { text: '=', correct: false, explanation: '= 是赋值符号，不是数据值' },
      ],
      mode: 'single',
    },
    {
      type: 'multiple-choice',
      question: '回顾：下面哪个最能描述"程序"？',
      options: [
        { text: '一堆看不懂的英文和符号', correct: false, explanation: '程序虽然用符号写，但每部分都有明确的意义' },
        { text: '操作数据的一系列指令', correct: true, explanation: '程序的核心就是告诉计算机怎么操作数据' },
        { text: '只有数学公式', correct: false, explanation: '程序不只处理数学，还处理文字、真假判断等' },
        { text: '随便写写就能运行的符号', correct: false, explanation: '程序有严格的语法规则，不能随便写' },
      ],
      mode: 'single',
    },
    {
      type: 'exposition',
      text: '记住核心：**值**就是程序操作的数据。代码里直接写出来的值叫**字面量**。不同种类的值写法不同，但本质上都是"数据"。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
