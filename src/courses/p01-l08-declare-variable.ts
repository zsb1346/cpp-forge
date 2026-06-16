import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'declare-variable',
    chapter: 2,
    title: '声明一个变量',
    subtitle: '学会 int x; 的语法',
    description: '学习声明变量的语法格式：类型 + 名字 + 分号。',
    objectives: ['能用 int x; 格式声明变量', '理解声明是"创造"一个新变量'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '学会了各种类型，现在来学怎么**创造**一个变量。\n声明 = 告诉程序"我要一个变量"。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '格式很简单：**类型 + 名字 + 分号**\n\n比如 `int score;` 就是说："我要一个叫 score 的变量，它能装整数。"',
      code: 'int score;    // 声明 int 变量，叫 score\ndouble pi;    // 声明 double 变量，叫 pi\nchar grade;   // 声明 char 变量，叫 grade\nbool isOK;    // 声明 bool 变量，叫 isOK',
    },
    {
      type: 'concept-cards',
      instruction: '声明语句的三个部分：',
      cards: [
        { glyph: '📦', term: 'int', meaning: '类型：规定能装什么值', example: 'int / double / char / bool' },
        { glyph: '🏷️', term: 'score', meaning: '名字：你给变量取的名字', example: '自己定' },
        { glyph: '🔚', term: ';', meaning: '分号：语句结束标记', example: '不能忘' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：`true` 是什么类型？',
      options: [
        { text: 'int', correct: false, explanation: 'true 不是整数' },
        { text: 'double', correct: false, explanation: 'true 不是小数' },
        { text: 'char', correct: false, explanation: 'true 不是字符' },
        { text: 'bool', correct: true, explanation: 'true 是 bool 类型的值' },
      ],
    },
    {
      type: 'type-it',
      instruction: '试着声明一个 int 类型的变量，名字叫 age：',
      code: 'int age;',
      hints: [
        '格式是：类型 + 空格 + 名字 + 分号',
        '类型用小写 int，名字取 age，然后分号结束',
        '别忘了末尾的分号 ;',
      ],
    },
    {
      type: 'exposition',
      text: '声明之前，变量不存在。声明之后，变量就**被创造出来**了。\n好比你在游戏里新建了一个存档——现在它存在了，但里面还没放东西。',
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序排列，声明一个 double 类型的变量 height：',
      fragments: ['double', 'height', ';'],
      distractors: ['int', '='],
    },
    {
      type: 'multiple-choice',
      question: '`int x;` 这句代码做了什么？',
      options: [
        { text: '把 0 放到变量 x 里', correct: false, explanation: '声明只是创造变量，没有放值进去' },
        { text: '创造了一个叫 x 的 int 变量', correct: true, explanation: '声明就是在创造变量' },
        { text: '把 x 的值打印出来', correct: false, explanation: '声明不会打印任何东西' },
        { text: '删除了变量 x', correct: false, explanation: '声明是创造，不是删除' },
      ],
    },
  ],
}

export default lesson
