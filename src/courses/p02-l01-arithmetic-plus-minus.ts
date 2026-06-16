import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'arithmetic-plus-minus',
    chapter: 3,
    title: '加减运算',
    subtitle: '加法与减法',
    description: '学习用 + 和 - 做运算，理解表达式能计算出新值。',
    objectives: ['能用 + 和 - 写出算术表达式', '理解表达式会计算产生一个新值'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '现在我们要让程序"算数"。需要用**运算符**来告诉计算机做计算。',
    },
    {
      type: 'exposition',
      text: '`+` 就是加法运算符，跟数学里的加号一样：',
      code: 'int sum = 3 + 5;  // sum 得到 8',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '输入一个加法表达式：',
      code: 'int total = 10 + 20;',
      hints: [
        '`int` 后面要加空格再写变量名',
        '`+` 两边各加一个空格更清晰',
        '末尾的分号 `;` 不能丢',
      ],
    },
    {
      type: 'exposition',
      text: '`-` 是减法运算符，同样跟数学一样：',
      code: 'int diff = 100 - 30;  // diff 得到 70',
    },
    {
      type: 'type-it',
      instruction: '输入一个减法表达式：',
      code: 'int result = 50 - 15;',
      hints: [
        '先打类型 `int`，再取变量名',
        '`-` 前后可以加空格',
        '检查最后有没有分号',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`int level = 3;` 中，哪个是变量名？',
      options: [
        { text: 'int', correct: false, explanation: 'int 是类型关键字，不是变量名' },
        { text: 'level', correct: true, explanation: 'level 就是变量名，存着值 3' },
        { text: '=', correct: false, explanation: '= 是赋值运算符' },
        { text: '3', correct: false, explanation: '3 是赋给变量的值' },
      ],
    },
    {
      type: 'exposition',
      text: '关键概念：**表达式**。\n`3 + 5` 叫"表达式"——它会被计算成一个新值。\n计算结果 `8` 再通过 `=` 存进变量。',
    },
    {
      type: 'type-it',
      instruction: '输入一个混合了加减的表达式：',
      code: 'int value = 50 + 30 - 10;',
      hints: [
        'C++ 从左往右算：先 50+30=80，再 80-10=70',
        '`+` 和 `-` 同一优先级，所以按顺序算',
        '写完检查分号',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`int x = 7 + 8;` 执行后，x 的值是多少？',
      options: [
        { text: '7', correct: false, explanation: '7+8 已经计算了，x 存的是计算结果' },
        { text: '8', correct: false, explanation: '8 只是加法的右边部分' },
        { text: '15', correct: true, explanation: '7+8 算出 15，再赋给 x' },
        { text: '78', correct: false, explanation: 'C++ 不会把数字拼成字符串' },
      ],
    },
    {
      type: 'exposition',
      text: '记住两个要点：\n1. `+` 和 `-` 做加减运算\n2. 一段能算出值的代码叫"表达式"',
    },
  ],
}

export default lesson
