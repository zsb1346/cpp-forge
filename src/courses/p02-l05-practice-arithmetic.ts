import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-arithmetic',
    chapter: 3,
    title: '算术练习',
    subtitle: '巩固加减乘除取模',
    description: '综合练习算术运算符和优先级，巩固前四课的内容。',
    objectives: ['熟练使用 + - * / % 运算符', '能正确处理优先级和整数截断'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '声明变量计算 8 乘以 7：',
      code: 'int a = 8 * 7;',
      hints: [
        '`*` 是乘号',
        '8 × 7 = 56',
        '别忘了分号',
      ],
    },
    {
      type: 'type-it',
      instruction: '计算 20 除以 3 的余数：',
      code: 'int b = 20 % 3;',
      hints: [
        '`%` 是取余运算符',
        '20 ÷ 3 = 6 余 2',
        '结果是 2',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`(4 + 6) / 2` 的结果是多少？',
      options: [
        { text: '5', correct: true, explanation: '括号先算：4+6=10，再 10÷2=5' },
        { text: '7', correct: false, explanation: '那是 4+6/2 的结果，没括号时才是' },
        { text: '8', correct: false, explanation: '括号改变顺序了' },
        { text: '4.5', correct: false, explanation: 'int/int 不会得小数' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`int x = 15 / 4;` 执行后 x 等于多少？',
      options: [
        { text: '3.75', correct: false, explanation: 'int 类型存不了小数' },
        { text: '4', correct: false, explanation: '直接砍掉小数，不四舍五入' },
        { text: '3', correct: true, explanation: '15÷4=3.75，砍掉 .75 得 3' },
        { text: '15', correct: false, explanation: '/ 是除法不是赋值' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '计算 (5+3)×2 的结果：',
      template: 'int x = (____ + ____) * ____;',
      answers: ['5', '3', '2'],
      hints: ['第一个空是 5', '第二个空是 3', '第三个空是 2'],
    },
    {
      type: 'fill-in',
      prompt: '计算 17 除以 5 的商：',
      template: 'int q = ____ / ____;',
      answers: ['17', '5'],
      hints: ['第一个空是被除数', '第二个空是除数'],
    },
    {
      type: 'type-it',
      instruction: '试试混合运算：',
      code: 'int c = 10 + 10 % 3;',
      hints: [
        '`%` 优先级高于 `+`',
        '先算 10%3=1，再算 10+1=11',
        '结果是 11',
      ],
    },
    {
      type: 'exposition',
      text: '你已经掌握了 C++ 的五个算术运算符。\n下一阶段我们要学——让程序跟人"说话"。',
    },
  ],
}

export default lesson
