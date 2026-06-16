import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-var-declare',
    chapter: 2,
    title: '声明与赋值练习',
    subtitle: '巩固 08-12',
    description: '综合练习声明、赋值、初始化各种写法。',
    objectives: ['能熟练写出声明和赋值语句', '能区分声明、赋值、初始化'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '声明一个 double 变量 price（先声明，先不赋值）：',
      code: 'double price;',
      hints: [
        '声明格式：类型 + 空格 + 名字 + 分号',
        'double 表示这个变量装小数',
        '别忘了最后的 ;',
      ],
    },
    {
      type: 'type-it',
      instruction: '给 price 赋值 19.99：',
      code: 'price = 19.99;',
      hints: [
        '赋值格式：变量名 = 值 + 分号',
        '= 是赋值，不是等于',
        '19.99 是 double 类型的值',
      ],
    },
    {
      type: 'fill-in',
      prompt: '一行搞定：声明一个 int 变量 level 并初始化为 1。',
      template: '____ ____ = ____;',
      answers: ['int', 'level', '1'],
      hints: ['第一个空是类型', '第二个空是变量名', '第三个空是初始值'],
    },
    {
      type: 'match-blocks',
      instruction: '按顺序拼出"声明 int 变量 count，再赋值 10"：',
      fragments: ['int', 'count', ';', 'count', '=', '10', ';'],
      distractors: ['double', 'int'],
    },
    {
      type: 'multiple-choice',
      question: '`int x = 5;` 和 `int x; x = 5;` 有什么区别？',
      options: [
        { text: '完全不一样的结果', correct: false, explanation: '两种写法效果一样' },
        { text: '结果一样，只是写法不同', correct: true, explanation: '初始化是一步到位，分开写分两步' },
        { text: '第一句会报错', correct: false, explanation: '两句都合法' },
        { text: '第二句会报错', correct: false, explanation: '两句都合法' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个写法是正确的？',
      options: [
        { text: 'int x = 5', correct: false, explanation: '缺分号 ;' },
        { text: 'x = 5;', correct: false, explanation: '还没声明 x，不能直接用' },
        { text: 'int x = 5;', correct: true, explanation: '正确：声明 int 变量 x 并初始化为 5' },
        { text: 'int = x 5;', correct: false, explanation: '顺序错了' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`char c = \'A\';` 中，哪部分是类型？',
      options: [
        { text: 'c', correct: false, explanation: 'c 是变量名' },
        { text: "'A'", correct: false, explanation: "'A' 是字符值" },
        { text: 'char', correct: true, explanation: 'char 是类型，表示字符类型' },
        { text: '=', correct: false, explanation: '= 是赋值符号' },
      ],
    },
    {
      type: 'exposition',
      text: '总结三种写法：\n1. 先声明再赋值：`int x; x = 5;`\n2. 声明+初始化：`int x = 5;`\n3. 只声明：`int x;`（以后赋值）\n\n熟练之后，大部分时候用第二种。',
    },
    {
      type: 'match-blocks',
      instruction: '声明并初始化一个 bool 变量 isDone 为 false：',
      fragments: ['bool', 'isDone', '=', 'false', ';'],
      distractors: ['true', 'int'],
    },
  ],
}

export default lesson
