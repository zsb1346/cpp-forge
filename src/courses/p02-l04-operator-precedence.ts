import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'operator-precedence',
    chapter: 3,
    title: '运算顺序',
    subtitle: '优先级与括号',
    description: '理解乘除优先于加减，括号可以改变运算顺序。',
    objectives: ['知道 * / % 优先于 + -', '能用括号改变计算顺序'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '如果写了 `3 + 5 * 2`，先算加法还是先算乘法？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'C++ 的规则跟数学一样：**先乘除，后加减**。\n\n`3 + 5 * 2` → 先算 `5 * 2 = 10` → 再 `3 + 10 = 13`',
      code: 'int x = 3 + 5 * 2;  // x 是 13，不是 16',
    },
    {
      type: 'exposition',
      text: '用括号可以改变顺序——也是跟数学一样：\n\n`(3 + 5) * 2` → 先算 `3 + 5 = 8` → 再 `8 * 2 = 16`',
      code: 'int y = (3 + 5) * 2;  // y 是 16',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`int x = 7 / 2;` 执行后 x 是多少？',
      options: [
        { text: '3.5', correct: false, explanation: 'int/int 不会得到小数' },
        { text: '3', correct: true, explanation: '7÷2=3.5，砍掉小数得 3' },
        { text: '4', correct: false, explanation: '不四舍五入，直接砍掉' },
        { text: '2', correct: false, explanation: '7÷2 至少是 3' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`4 + 6 / 2` 的结果是多少？',
      options: [
        { text: '5', correct: false, explanation: '先算 6/2=3，4+3=7，不是 5' },
        { text: '7', correct: true, explanation: '先算除法 6/2=3，再算加法 4+3=7' },
        { text: '8', correct: false, explanation: '如果先加后除才是 5，但 C++ 先乘除' },
        { text: '10', correct: false, explanation: '4+6=10 再 ÷2 是不对的' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个涉及优先级的表达式：',
      code: 'int result = 2 + 3 * 4;',
      hints: [
        '先算 3*4=12，再加 2=14',
        '`*` 优先于 `+`',
        '检查分号',
      ],
    },
    {
      type: 'type-it',
      instruction: '用括号改变顺序：',
      code: 'int result = (2 + 3) * 4;',
      hints: [
        '括号里的先算：2+3=5',
        '再算 5*4=20',
        '乘号 `*` 不能省略',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，计算 (10-3)×2 的结果：',
      template: 'int x = (____ - ____) * ____;',
      answers: ['10', '3', '2'],
      hints: ['第一个空是被减数', '第二个空是减数', '第三个空是乘数'],
    },
    {
      type: 'exposition',
      text: '优先级速记：\n- `*` `/` `%` → 一级（先算）\n- `+` `-` → 二级（后算）\n- 括号 `()` → 最高级，最先算',
    },
  ],
}

export default lesson
