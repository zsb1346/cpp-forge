import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'type-mismatch',
    chapter: 2,
    title: '类型不匹配会怎样',
    subtitle: '类型错误初体验',
    description: '演示不同类型之间赋值会出现的问题。',
    objectives: ['理解类型不匹配的后果', '知道 int 不能正确存小数'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '如果把一个 double 值放进 int 变量——会发生什么？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`int` 只能装整数。如果你强行放一个小数进去，它会**截断**——丢掉小数部分。',
      code: 'int x;\nx = 3.14;    // 3.14 是 double，但 x 是 int\n// 结果 x 变成 3（小数部分 .14 被丢了）',
    },
    {
      type: 'exposition',
      text: '类似地：\n- 把 `true` 放进 int → `true` 变成 `1`，`false` 变成 `0`\n- 把 `\'A\'` 放进 int → 变成 ASCII 码 `65`\n- 把 `"hello"` 放进 int → **编译错误，完全不行**',
      code: 'int a;\na = true;     // a 变成 1\na = false;    // a 变成 0\na = \'A\';      // a 变成 65\n\ndouble b;\nb = 10;       // 10 变成 10.0，没问题',
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：`int x = 5;` 是什么写法？',
      options: [
        { text: '只声明', correct: false, explanation: '既是声明也是赋值（初始化）' },
        { text: '初始化（声明+赋值）', correct: true, explanation: '初始化是在声明时同时赋值' },
        { text: '只赋值', correct: false, explanation: '赋值只是 = 的那部分' },
        { text: '比较', correct: false, explanation: '= 是赋值，不是比较' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '如果 `int x = 3.99;`，x 的值是多少？',
      options: [
        { text: '3.99', correct: false, explanation: 'int 装不了小数' },
        { text: '4', correct: false, explanation: '不是四舍五入，是直接截断' },
        { text: '3', correct: true, explanation: 'int 直接丢掉小数部分，变成 3' },
        { text: '编译报错', correct: false, explanation: 'C++ 允许这样做（会有警告但能运行）' },
      ],
    },
    {
      type: 'exposition',
      text: '类型不匹配不一定会报错——C++ 有时会悄悄帮你转换。但结果可能不是你想的那样。\n\n好习惯：**值跟类型要匹配**。整数放 int，小数放 double，字符放 char。',
    },
    {
      type: 'multiple-choice',
      question: '`bool b = 5;` 会发生什么？',
      options: [
        { text: '编译错误', correct: false, explanation: 'C++ 会把 5 转成 true' },
        { text: 'b 变成 true', correct: true, explanation: 'C++ 中，非 0 值转 bool 就是 true' },
        { text: 'b 变成 false', correct: false, explanation: '5 不是 0，所以是 true' },
        { text: 'b 变成 5', correct: false, explanation: 'bool 只能装 true/false' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是类型不匹配的声明？',
      options: [
        { text: 'int x = 100;', correct: false, explanation: '100 是整数，和 int 匹配' },
        { text: 'double y = 3.14;', correct: false, explanation: '3.14 是 double，匹配' },
        { text: 'int z = 2.5;', correct: true, explanation: '2.5 是 double，int 装了会截断' },
        { text: 'char c = \'?\';', correct: false, explanation: 'char 装字符，匹配' },
      ],
    },
  ],
}

export default lesson
