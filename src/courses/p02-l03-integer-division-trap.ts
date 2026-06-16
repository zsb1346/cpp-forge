import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'integer-division-trap',
    chapter: 3,
    title: '整除陷阱',
    subtitle: '5/2 等于 2 不是 2.5',
    description: '理解 int 除以 int 的结果会被截断，小数部分直接丢掉。',
    objectives: ['知道 int/int 的结果会截断小数', '能预测整数除法的结果'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有个地方**新手一定会意外**——我们先来试一下。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '猜猜看：`5 / 2` 在 C++ 里等于多少？\n\n你可能想说 2.5。但 C++ 的答案是——**2**。',
      code: 'int result = 5 / 2;  // result 是 2，不是 2.5',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`10 % 3` 的结果是什么？',
      options: [
        { text: '3', correct: false, explanation: '10÷3=3 余 1，% 是取余数不是商' },
        { text: '1', correct: true, explanation: '10 ÷ 3 余 1，所以结果是 1' },
        { text: '0', correct: false, explanation: '10 不是 3 的倍数，有余数' },
        { text: '10', correct: false, explanation: '% 是取余运算，不会返回原数' },
      ],
    },
    {
      type: 'exposition',
      text: '原因：两个 `int` 相除，结果还是 `int`。\nC++ 直接把小数部分**砍掉**（截断），不四舍五入。\n\n`5 / 2` = 2.5 → 砍掉 .5 → **2**',
      code: 'int a = 7 / 3;  // 7÷3=2.333… 砍掉小数 → 2\nint b = 9 / 4;  // 9÷4=2.25  砍掉小数 → 2',
    },
    {
      type: 'multiple-choice',
      question: '`int x = 8 / 3;` 执行后，x 的值是多少？',
      options: [
        { text: '2.67', correct: false, explanation: 'int 类型不能存小数' },
        { text: '3', correct: false, explanation: '不四舍五入，直接砍掉小数' },
        { text: '2', correct: true, explanation: '8÷3=2.666…，砍掉小数得 2' },
        { text: '1', correct: false, explanation: '8÷3 至少是 2，不是 1' },
      ],
    },
    {
      type: 'type-it',
      instruction: '试试整数除法，看看结果是多少：',
      code: 'int result = 5 / 2;',
      hints: [
        '整数除法只保留整数部分',
        '5 ÷ 2 = 2.5，砍掉小数后是 2',
        '变量名和类型要写对',
      ],
    },
    {
      type: 'type-it',
      instruction: '再来一个：',
      code: 'int value = 10 / 4;',
      hints: [
        '10 ÷ 4 = 2.5',
        '小数部分被砍掉，结果是 2',
        '不是 2.5，因为结果是 int 类型',
      ],
    },
    {
      type: 'exposition',
      text: '如果想得到小数结果，需要用 `double` 类型（我们以后会学）。\n\n现在只要记住：**int ÷ int = int，小数直接丢掉**。',
    },
    {
      type: 'exposition',
      text: '配上有趣的 % 取余：`5 % 2` = 1（余数），`5 / 2` = 2（商）。\n两个配合就能完整描述"除法结果"。',
    },
  ],
}

export default lesson
