import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'assign-value',
    chapter: 2,
    title: '把值放进变量',
    subtitle: '学会 x = 5; 的语法',
    description: '学习赋值语句：用 = 把值放到变量里。',
    objectives: ['能用 = 给变量赋值', '理解赋值是把右边的值存入左边的变量'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '变量声明好了，但里面是空的。怎么放值进去？\n用 **赋值**：`变量 = 值;`',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '格式：**变量名 = 值;**\n\n比如 `score = 100;` 意思是"把 100 放到 score 变量里"。',
      code: 'int score;      // 先声明变量\nscore = 100;    // 赋值：把 100 放进去\n\ndouble pi;\npi = 3.14;      // 赋值：把 3.14 放进去',
    },
    {
      type: 'type-it',
      instruction: '声明一个 char 变量 ch，再给它赋值 \'X\'：',
      code: 'char ch;\nch = \'X\';',
      hints: [
        '先声明：类型 + 名字 + 分号',
        '再赋值：变量名 = 值 + 分号',
        'char 的值要用单引号括起来',
      ],
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：`int x;` 的作用是什么？',
      options: [
        { text: '把 x 设为 0', correct: false, explanation: '声明不会设值，只是创造变量' },
        { text: '创造变量 x，能装整数', correct: true, explanation: '声明就是创造一个有名字的变量' },
        { text: '输出 x 的值', correct: false, explanation: '声明不输出东西' },
        { text: '删除变量 x', correct: false, explanation: '声明是创造，不是删除' },
      ],
    },
    {
      type: 'exposition',
      text: '赋值的关键理解：**= 是把右边的值，放进左边的变量**。\n好比把书放进书包：`书包 = 书;`\n左边是书包（变量），右边是书（值）。',
    },
    {
      type: 'multiple-choice',
      question: '`grade = \'A\';` 这个语句中，哪个是变量？',
      options: [
        { text: 'grade', correct: true, explanation: 'grade 是变量名，在 = 左边' },
        { text: "'A'", correct: false, explanation: "'A' 是字符值，在 = 右边" },
        { text: '=', correct: false, explanation: '= 是赋值符号' },
        { text: '类型', correct: false, explanation: '这里没有类型，赋值不需要类型' },
      ],
    },
    {
      type: 'exposition',
      text: '赋值和声明是两回事：\n- 声明 = 创造变量（`int x;`）\n- 赋值 = 放值进去（`x = 5;`）\n\n先有声明，才能赋值。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个顺序是正确的？',
      options: [
        { text: '先赋值，再声明', correct: false, explanation: '变量还没创造，不能赋值' },
        { text: '先声明，再赋值', correct: true, explanation: '声明创造变量，赋值放值进去' },
        { text: '声明和赋值同时就行', correct: false, explanation: '虽然可以一行写（以后学），但逻辑上必须先声明存在' },
        { text: '不需要声明，直接赋值', correct: false, explanation: '不声明就没有变量可以放值' },
      ],
    },
  ],
}

export default lesson
