import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase1-review',
    chapter: 2,
    title: '阶段 1 综合复习',
    subtitle: '值、名字、类型总复习',
    description: '涵盖全部 14 课核心概念的综合复习。',
    objectives: ['复习值、变量名、类型的概念', '巩固声明、赋值、初始化的语法'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '以下哪个是 C++ 里的"值"？',
      options: [
        { text: 'int', correct: false, explanation: 'int 是类型关键字' },
        { text: '42', correct: true, explanation: '42 是一个整数类型的值' },
        { text: 'cout', correct: false, explanation: 'cout 是输出工具' },
        { text: ';', correct: false, explanation: '分号是语法标记' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`3.14` 和 `\'3\'` 分别是什么类型？',
      options: [
        { text: 'int 和 char', correct: false, explanation: '3.14 有小数点，不是 int' },
        { text: 'double 和 char', correct: true, explanation: '3.14 是 double，\'3\' 是 char' },
        { text: 'double 和 int', correct: false, explanation: '\'3\' 有单引号，是 char 不是 int' },
        { text: 'char 和 double', correct: false, explanation: '搞反了' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`int score;` 和 `score = 100;` 分别是做什么？',
      options: [
        { text: '都是声明', correct: false, explanation: '第二行是赋值' },
        { text: '声明变量 和 给变量赋值', correct: true, explanation: '第一行声明，第二行赋值' },
        { text: '都是赋值', correct: false, explanation: '第一行是声明' },
        { text: '第一行赋值，第二行声明', correct: false, explanation: '搞反了' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'C++ 里 `x = x + 1;` 是什么意思？',
      options: [
        { text: 'x 等于 x+1，数学上成立', correct: false, explanation: '数学里这不成立，但 C++ 不是数学' },
        { text: '把 x+1 的结果存回 x', correct: true, explanation: '取 x 当前值，加 1，结果存回 x' },
        { text: '判断 x 是不是等于 x+1', correct: false, explanation: '= 是赋值不是判断' },
        { text: '给 x 加 1 但不保存', correct: false, explanation: '结果会存回 x' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '拼出"声明 int 变量 age 并初始化为 18"：',
      fragments: ['int', 'age', '=', '18', ';'],
      distractors: ['double', '18.0'],
    },
    {
      type: 'exposition',
      text: '阶段 1 我们学了：\n1. **值**——程序里的数据\n2. **名字**——值的标签\n3. **类型**——int、double、char、bool\n4. **声明**——创造变量\n5. **赋值**——放值进去\n6. **初始化**——一步到位\n7. **= 不是数学等于**\n8. **分号**——语句结束符',
    },
    {
      type: 'multiple-choice',
      question: '忘了分号编译器会怎样？',
      options: [
        { text: '自动补上', correct: false, explanation: '编译器不会帮你补' },
        { text: '报编译错误', correct: true, explanation: '分号是语法必需，没有就报错' },
        { text: '正常运行', correct: false, explanation: '分号不能省略' },
        { text: '只警告但不报错', correct: false, explanation: '不是警告，是编译错误' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '拼出"把 value 赋值为 3.14"（value 已声明为 double）：',
      fragments: ['value', '=', '3.14', ';'],
      distractors: ['double', 'int'],
    },
    {
      type: 'exposition',
      text: '恭喜完成阶段 1！你已经掌握了 C++ 最基础的数据概念。下一个阶段，我们要用这些积木做更多的事。',
    },
  ],
}

export default lesson
