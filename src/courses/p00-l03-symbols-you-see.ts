import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'symbols-you-see',
    chapter: 1,
    title: '代码里有哪些符号',
    subtitle: '认全常见符号',
    description: '认识 C++ 代码里常见的符号：() {} ; = + - * / < > " \' 等。',
    objectives: ['能认出代码中的常见符号', '知道每个符号的基本用途', '能区分不同类型的括号'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '打开任意一段 C++ 代码，你会看到一堆符号。\n别慌——这些符号不多，一个一个认。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '先认识三种括号：',
      cards: [
        { glyph: '⬅️➡️', term: '() 圆括号', meaning: '函数调用、条件判断、数学运算用', example: 'if (x > 5)' },
        { glyph: '📦', term: '{} 花括号', meaning: '代码块——包裹一组语句', example: '{ int x = 5; }' },
        { glyph: '📐', term: '[] 方括号', meaning: '数组下标、访问元素', example: 'arr[0]' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '再认识常用符号：',
      cards: [
        { glyph: '🔚', term: '; 分号', meaning: '语句结束标记，每行代码末尾一般都有', example: 'int x = 5;' },
        { glyph: '✏️', term: '= 等号', meaning: '赋值——把右边的值放进左边', example: 'x = 5' },
        { glyph: '🔤', term: '" " 双引号', meaning: '包裹文本（字符串）', example: '"Hello"' },
        { glyph: '🔤', term: "' ' 单引号", meaning: '包裹单个字符', example: "'A'" },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '最后认识运算符号：',
      cards: [
        { glyph: '➕', term: '+ -', meaning: '加和减', example: 'a + b' },
        { glyph: '✖️', term: '* /', meaning: '乘和除', example: 'a * b' },
        { glyph: '🔍', term: '< >', meaning: '比较：小于 / 大于', example: 'x > 0' },
      ],
    },
    {
      type: 'type-it',
      instruction: '试着敲出这一行，感受这些符号：',
      code: 'int score = 0;',
      hints: [
        '`int` 和 `score` 之间有一个空格',
        '`=` 是赋值符号，不是数学等于',
        '末尾有一个分号 `;` 别忘了',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`if (x > 0)` 中，圆括号 `()` 的作用是什么？',
      options: [
        { text: '包裹一组语句', correct: false, explanation: '那是花括号 {} 的用途' },
        { text: '包裹条件判断', correct: true, explanation: '圆括号用来包裹 if 的判断条件' },
        { text: '表示数组', correct: false, explanation: '方括号 [] 才表示数组' },
        { text: '表示字符串', correct: false, explanation: '双引号 "" 表示字符串' },
      ],
    },
    {
      type: 'type-it',
      instruction: '再敲一行，注意括号的成对出现：',
      code: 'cout << "Hello";',
      hints: [
        '`cout` 和 `<<` 之间有空格',
        '双引号 `"` 要成对出现',
        '末尾分号 `;` 不能丢',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：编译器的任务是什么？',
      options: [
        { text: '把源代码翻译成机器指令', correct: true, explanation: '编译器负责把人类代码变成机器能懂的指令' },
        { text: '写代码', correct: false, explanation: '写代码的是程序员，不是编译器' },
        { text: '显示文字', correct: false, explanation: '那是程序运行后的输出' },
        { text: '管理文件', correct: false, explanation: '那是操作系统的功能' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：你现在认识了 () {} [] ; = "" \' \' + - * / < >\n这些符号会反复出现在所有 C++ 代码中。\n不用一次全记住——见得多了自然就熟了。',
    },
  ],
}

export default lesson
