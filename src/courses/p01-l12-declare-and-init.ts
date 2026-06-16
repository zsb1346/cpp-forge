import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'declare-and-init',
    chapter: 2,
    title: '合二为一：声明+初始化',
    subtitle: '一行搞定',
    description: '学习把声明和赋值写在一行：int x = 5;',
    objectives: ['能用 int x = 5; 格式声明并初始化变量'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前是先声明、再赋值，分两行。\n其实可以**一行搞定**：`int x = 5;`',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '这叫**初始化**（initialization）——声明的同时放值进去，一步到位。',
      code: 'int x = 5;        // 声明 + 初始化\n// 相当于：\nint x;             // 先声明\nx = 5;             // 再赋值',
    },
    {
      type: 'type-it',
      instruction: '试试一行声明并初始化一个 double 变量：',
      code: 'double pi = 3.14;',
      hints: [
        '格式：类型 + 空格 + 名字 + = + 值 + 分号',
        '值要跟类型匹配，double 装小数',
        '等号两边可以加空格，但一行必须写完',
      ],
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：分号 `;` 的作用是什么？',
      options: [
        { text: '表示一行结束', correct: false, explanation: '分号表示语句结束，不一定是一行' },
        { text: '表示语句结束', correct: true, explanation: '分号告诉编译器这句话到此为止' },
        { text: '表示程序结束', correct: false, explanation: '程序结束不需要分号' },
        { text: '表示注释开始', correct: false, explanation: '注释用 //，不是分号' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序排列，声明并初始化一个 char 变量 grade 为 \'A\'：',
      fragments: ['char', 'grade', '=', "'A'", ';'],
      distractors: ['int', 'A'],
    },
    {
      type: 'fill-in',
      prompt: '一行搞定：声明一个 bool 变量 isReady 并设为 true。',
      template: '____ ____ = ____;',
      answers: ['bool', 'isReady', 'true'],
      hints: ['第一个空是类型', '第二个空是变量名', '第三个空是初始值'],
    },
    {
      type: 'exposition',
      text: '初始化 = 声明 + 赋值，一步到位。\n之后你大部分时间都会这样写。',
    },
    {
      type: 'multiple-choice',
      question: '`int x = 5;` 包含几个操作？',
      options: [
        { text: '1 个：声明', correct: false, explanation: '其实做了两件事' },
        { text: '2 个：声明 + 赋值', correct: true, explanation: '声明类型 int，同时赋值 5' },
        { text: '3 个：声明 + 赋值 + 输出', correct: false, explanation: '没有输出操作' },
        { text: '0 个：只是文本', correct: false, explanation: '这是可执行的代码' },
      ],
    },
    {
      type: 'exposition',
      text: '以后看到 `类型 名字 = 值;`，就知道这是在**声明并初始化**。',
    },
  ],
}

export default lesson
