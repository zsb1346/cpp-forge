import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'code-is-text',
    chapter: 1,
    title: '代码是写给谁看的',
    subtitle: '人和机器都能读',
    description: '理解源代码是给人类读的，编译器把它翻译成机器能执行的指令。',
    objectives: ['理解源代码是人写的文本', '知道编译器的作用是把代码翻译成机器指令', '区分"源代码"和"程序"'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上节课我们说过——程序是一组指令。\n那么问题来了：这些指令是用什么语言写的？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '计算机只懂 **机器语言**（一堆 0 和 1）。\n但你让人写 0 和 1 来编程……那也太痛苦了。',
    },
    {
      type: 'exposition',
      text: '所以人类发明了 **编程语言**——\n用一种接近人类语言的文字来写代码，\n再交给一个叫 **编译器** 的程序，翻译成机器能懂的 0 和 1。',
    },
    {
      type: 'concept-cards',
      instruction: '认识这三个角色：',
      cards: [
        { glyph: '✍️', term: '源代码', meaning: '人类写的、可读的文本代码', example: 'int a = 5;' },
        { glyph: '🔧', term: '编译器', meaning: '把源代码翻译成机器指令的工具', example: 'g++ 就是 C++ 编译器' },
        { glyph: '⚙️', term: '可执行程序', meaning: '翻译后的、计算机能直接运行的指令', example: '.exe 文件' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '源代码是用什么写的？',
      options: [
        { text: '0 和 1', correct: false, explanation: '那是机器语言，不是人类写的源代码' },
        { text: '接近人类语言的文字', correct: true, explanation: '源代码就是用编程语言写的文本，人类可读' },
        { text: '电路', correct: false, explanation: '电路是硬件，不是代码' },
        { text: '图片', correct: false, explanation: '代码是文本，不是图片' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '编译器（compiler）的作用是什么？',
      options: [
        { text: '运行程序', correct: false, explanation: '运行程序的是操作系统，不是编译器' },
        { text: '把源代码翻译成机器指令', correct: true, explanation: '编译器把人类写的代码翻译成机器能读懂的指令' },
        { text: '检查拼写错误', correct: false, explanation: '编译器会检查语法错误，但它的核心任务是翻译' },
        { text: '连接网络', correct: false, explanation: '编译器跟网络无关' },
      ],
    },
    {
      type: 'exposition',
      text: '所以整个过程是这样的：\n\n`你写源代码 → 编译器翻译 → 计算机执行`\n\n你——写代码（给人类读）\n编译器——翻译（给计算机读）\n计算机——运行（执行指令）',
    },
    {
      type: 'concept-cards',
      instruction: '总结一下：',
      cards: [
        { glyph: '📄', term: '源代码', meaning: '你写的、给人看的文本' },
        { glyph: '🔄', term: '编译', meaning: '把源代码翻译成机器指令' },
        { glyph: '▶️', term: '运行', meaning: '计算机执行翻译后的指令' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾上节课：程序是什么？',
      options: [
        { text: '一组按顺序执行的指令', correct: true, explanation: '对，程序就是按顺序执行的一组指令' },
        { text: '一个文件', correct: false, explanation: '程序以文件存在，但本质是指令' },
        { text: '编译器', correct: false, explanation: '编译器是翻译工具，不是程序本身' },
        { text: '电脑', correct: false, explanation: '电脑是硬件' },
      ],
    },
  ],
}

export default lesson
