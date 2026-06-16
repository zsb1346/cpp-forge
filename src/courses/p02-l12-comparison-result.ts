import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'comparison-result',
    chapter: 3,
    title: '比较结果',
    subtitle: '结果是布尔值',
    description: '理解比较表达式产生 true 或 false 两种布尔值。',
    objectives: ['理解比较表达式的结果是 bool 类型', '能说出任意比较的结果是 true 还是 false'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '比较运算符不只是"问一个问题"——它**会产生一个值**。\n这个值叫**布尔值**，只有两个：`true`（真）和 `false`（假）。',
    },
    {
      type: 'exposition',
      text: '`5 > 3` 这个表达式的结果是 `true`（因为 5 确实大于 3）。\n`2 > 8` 的结果是 `false`。\n\n比较表达式 → 产生 true/false。',
      code: 'bool b1 = (5 > 3);  // b1 是 true\nbool b2 = (2 > 8);  // b2 是 false',
    },
    {
      type: 'type-it',
      instruction: '把比较结果存入 bool 变量：',
      code: 'bool isBigger = (10 > 3);',
      hints: [
        '`bool` 是布尔类型关键字',
        '10 > 3 结果是 true',
        '变量名 `isBigger` 可以自己取',
      ],
    },
    {
      type: 'exposition',
      text: '`true` 和 `false` 是 C++ 的关键字，本身就是值。\n你可以把它们直接赋给变量：',
      code: 'bool done = true;\nbool failed = false;',
    },
    {
      type: 'multiple-choice',
      question: '回顾：哪个运算符表示"不等于"？',
      options: [
        { text: '==', correct: false, explanation: '== 是"等于"比较' },
        { text: '!=', correct: true, explanation: '!= 是"不等于"，! 表示否定' },
        { text: '=<', correct: false, explanation: '这个符号不存在' },
        { text: '><', correct: false, explanation: '这个符号在 C++ 里没有意义' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入判断是否等于的比较：',
      code: 'bool eq = (7 == 7);',
      hints: [
        '`==` 是两个等号，判断两边是否相等',
        '7 == 7 是 true',
        '千万不要写成 `=`（一个等号是赋值）',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`int x = 4; bool r = (x > 5);` 执行后 r 是什么？',
      options: [
        { text: 'true', correct: false, explanation: '4 > 5 是假的' },
        { text: 'false', correct: true, explanation: '4 不大于 5，所以是 false' },
        { text: '4', correct: false, explanation: '比较结果是 true/false，不是 4' },
        { text: '5', correct: false, explanation: '比较结果不是数值' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- 比较表达式产生布尔值 `true` 或 `false`\n- `bool` 类型变量用来存 true/false\n- 下一课：用这些 true/false 让程序"做决定"！',
    },
  ],
}

export default lesson
