import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'what-is-value',
    chapter: 2,
    title: '什么是"值"',
    subtitle: '认识程序里的数据',
    description: '认识程序中各种数据的样子：数字、字符、文字、真假值。',
    objectives: ['能说出什么是"值"', '能认出程序中不同类型的值', '知道值是由字面量写出来的'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你有没有在程序里见过这些——`42`、`3.14`、`\'A\'`、`"你好"`、`true`？\n这些都是"**值**"（value）。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '值就是程序里的原始数据。写一个 `42`，它就是数字 42。写一个 `"你好"`，它就是一段文字。\n值在程序里不需要别人帮忙，自己就能存在。',
      code: '42\n3.14\n\'A\'\n"你好"\ntrue',
    },
    {
      type: 'concept-cards',
      instruction: '值有不同种类，先认识一下：',
      cards: [
        { glyph: '🔢', term: '42', meaning: '整数，不带小数点', example: '0 / 99 / -5' },
        { glyph: '🔟', term: '3.14', meaning: '小数，带小数点', example: '0.5 / -2.0' },
        { glyph: '🔤', term: "'A'", meaning: '单个字符，用单引号', example: "'a' / '?'" },
        { glyph: '✅', term: 'true', meaning: '布尔值，真或假', example: 'true / false' },
      ],
    },
    {
      type: 'exposition',
      text: '每种值都有自己的样子：\n- 整数直接写数字\n- 小数要带小数点\n- 字符用单引号包着\n- 文字用双引号包着\n- 布尔只有 `true` 和 `false`',
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 0 的内容：程序是什么？',
      options: [
        { text: '一台电脑', correct: false, explanation: '电脑是硬件，不是程序本身' },
        { text: '一组按顺序执行的指令', correct: true, explanation: '对，程序就是一条条指令按顺序组成' },
        { text: '一个文件', correct: false, explanation: '程序存在文件里，但本质是指令集合' },
        { text: '一个键盘', correct: false, explanation: '键盘是输入设备' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是 C++ 里的"值"？',
      options: [
        { text: 'int', correct: false, explanation: 'int 是类型关键字，不是值' },
        { text: '42', correct: true, explanation: '42 就是一个整数类型的值' },
        { text: 'cout', correct: false, explanation: 'cout 是输出用的工具' },
        { text: 'main', correct: false, explanation: 'main 是函数名' },
      ],
    },
    {
      type: 'exposition',
      text: '一句话：**值 = 程序里的数据**。数字是值，文字是值，字符是值，真假也是值。\n\n接下来我们要学的是——怎么给这些值取个名字，方便后面用它。',
    },
    {
      type: 'multiple-choice',
      question: '"你好" 这个值属于哪一类？',
      options: [
        { text: '整数', correct: false, explanation: '文字不是整数' },
        { text: '文字（字符串）', correct: true, explanation: '双引号括起来的是字符串值' },
        { text: '字符', correct: false, explanation: '字符用单引号，而且只有一个字符' },
        { text: '布尔', correct: false, explanation: '布尔只有 true 和 false' },
      ],
    },
  ],
}

export default lesson
