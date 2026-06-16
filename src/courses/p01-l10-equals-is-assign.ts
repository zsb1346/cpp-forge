import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'equals-is-assign',
    chapter: 2,
    title: '= 不是数学等于',
    subtitle: '破除最大误解',
    description: '破除 = 是"数学等于"的最大误解，理解赋值语义。',
    objectives: ['理解 = 是赋值不是等于', '能解释赋值的过程是"把右边放进左边"'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '很多人刚开始学 C++ 时最大的误解：**= 不是等于号**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '数学里：`a = 5` 意思是"a 等于 5"。\n\nC++ 里：`a = 5` 意思是"把 5 放进 a 这个变量里"。\n\n一个是"判断"，一个是"操作"。完全不一样。',
      code: 'int x;\nx = 10;    // 把 10 放进 x\n// 读作："x 赋值 10" 或 "把 10 赋给 x"\n// 不要读作 "x 等于 10"',
    },
    {
      type: 'concept-cards',
      instruction: '区分这两个关键符号：',
      cards: [
        { glyph: '✏️', term: '=', meaning: '赋值，把右边放进左边', example: 'x = 5 表示 x 变成 5' },
        { glyph: '⚖️', term: '==', meaning: '等于，比较左右是否相等', example: 'x == 5 问 x 是不是 5' },
        { glyph: '🔄', term: 'x = x + 1', meaning: '数学里不可能，C++ 可以', example: '取 x 加 1，再存回 x' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '上节课学的：`score = 100;` 做了什么？',
      options: [
        { text: '判断 score 是不是等于 100', correct: false, explanation: '那是 == 做的事，= 是赋值' },
        { text: '把 100 放进 score 变量', correct: true, explanation: '= 就是把右边的值放进左边变量' },
        { text: '创造了一个叫 score 的变量', correct: false, explanation: '声明才能创造变量，= 是赋值' },
        { text: '删除了 score 变量', correct: false, explanation: '赋值不会删除变量' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'C++ 里 `x = 5;` 应该怎么读？',
      options: [
        { text: 'x 等于 5', correct: false, explanation: '那是数学读法，C++ 里是赋值' },
        { text: 'x 赋值 5，或把 5 赋给 x', correct: true, explanation: '对的，强调"操作"的含义' },
        { text: 'x 和 5 一样', correct: false, explanation: '那是 == 比较符的意思' },
        { text: 'x 变成 5 了吗', correct: false, explanation: '这是疑问句，代码是命令句' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一段代码，展示 = 的赋值本质：',
      code: 'int x;\nx = 5;\nx = x + 1;',
      hints: [
        '先声明 x，再赋值 5，最后 x = x + 1',
        '`x = x + 1` 意思是：取 x 当前值（5），加 1 得 6，再存回 x',
        '数学里 "x = x + 1" 不可能成立，但 C++ 里这是日常工作',
      ],
    },
    {
      type: 'exposition',
      text: '记住这个最重要的区别：\n- **数学**：`=` 表示两边相等\n- **C++**：`=` 表示右边值 → 左边变量\n\n`x = x + 1` 在数学里是假话，在 C++ 里是日常工作。',
    },
    {
      type: 'multiple-choice',
      question: '执行完 `x = 3;` 之后，又执行 `x = x + 2;`，x 现在是多少？',
      options: [
        { text: '3', correct: false, explanation: 'x + 2 用 x 原来的值 3，得 5，不是 3' },
        { text: '5', correct: true, explanation: '取 x 的值 3，加 2 得 5，再存回 x' },
        { text: '2', correct: false, explanation: 'x + 2 的结果是 5，不是 2' },
        { text: '不确定', correct: false, explanation: '结果是确定的：x = 3 + 2 = 5' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是"判断 x 是不是等于 5"的写法？',
      options: [
        { text: 'x = 5;', correct: false, explanation: '这是赋值，把 5 放进去' },
        { text: 'x == 5', correct: true, explanation: '== 才是比较判断' },
        { text: 'int x = 5;', correct: false, explanation: '这是声明+初始化，也不是比较' },
        { text: 'x = 5 == x;', correct: false, explanation: '太复杂了，不直接' },
      ],
    },
  ],
}

export default lesson
