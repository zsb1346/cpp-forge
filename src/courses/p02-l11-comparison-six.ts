import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'comparison-six',
    chapter: 3,
    title: '比较符号',
    subtitle: '六种比较运算符',
    description: '认识 C++ 的六种比较运算符：> < >= <= == !=。',
    objectives: ['能认出六种比较运算符', '理解每种运算符的含义'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '程序经常需要"比较"——判断一个数是不是比另一个大、是不是相等。\nC++ 提供了**六种比较运算符**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '六种比较运算符一览：',
      cards: [
        { glyph: '📈', term: '>', meaning: '大于，左边比右边大', example: '5 > 3' },
        { glyph: '📉', term: '<', meaning: '小于，左边比右边小', example: '2 < 8' },
        { glyph: '📊', term: '>=', meaning: '大于等于，左边 ≥ 右边', example: '5 >= 5' },
        { glyph: '📊', term: '<=', meaning: '小于等于，左边 ≤ 右边', example: '3 <= 4' },
        { glyph: '⚖️', term: '==', meaning: '等于，两边相等（两个等号）', example: '3 == 3' },
        { glyph: '🚫', term: '!=', meaning: '不等于，两边不相等', example: '5 != 3' },
      ],
    },
    {
      type: 'exposition',
      text: '特别注意：**等于比较用两个 `=` 号**——`==`。\n一个 `=` 是赋值，两个 `=` 才是比较是否相等。这是新手最容易搞混的地方。',
      code: 'int x = 5;     // = 赋值\nbool r = (x == 5); // == 比较',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`std::cout << "A" << std::endl << "B";` 会输出什么？',
      options: [
        { text: 'AB 在一行', correct: false, explanation: 'endl 会换行' },
        { text: 'A 换行 B', correct: true, explanation: 'endl 的作用就是换行' },
        { text: '只输出 A', correct: false, explanation: 'B 也会输出' },
        { text: '报错', correct: false, explanation: '语法是正确的' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个大于比较：',
      code: 'bool r = (10 > 5);',
      hints: [
        '`bool` 是布尔类型，存 true/false',
        '10 > 5 是 true（真）',
        '括号可以加也可以不加，习惯加括号更清晰',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是"大于等于"运算符？',
      options: [
        { text: '=>', correct: false, explanation: '符号顺序反了，等于号在后面' },
        { text: '>=', correct: true, explanation: '先大于号再等于号，表示 ≥' },
        { text: '>==', correct: false, explanation: '多了一个等号' },
        { text: '≥', correct: false, explanation: 'C++ 里不能用数学符号' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个不等于比较：',
      code: 'bool r = (8 != 3);',
      hints: [
        '`!=` 是"不等于"',
        '8 不等于 3，结果是 true',
        '注意 `!` 和 `=` 之间没有空格',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`3 < 5` 是什么意思？',
      options: [
        { text: '3 大于 5', correct: false, explanation: '< 是小于号' },
        { text: '3 小于 5', correct: true, explanation: '< 表示左 < 右' },
        { text: '3 等于 5', correct: false, explanation: '== 才是等于' },
        { text: '3 不等于 5', correct: false, explanation: '!= 才是不等于' },
      ],
    },
    {
      type: 'exposition',
      text: '六种比较运算符记牢了。\n下一课看比较的结果到底是什么——它不只是一个"对不对"，而是有一个具体的值。',
    },
  ],
}

export default lesson
