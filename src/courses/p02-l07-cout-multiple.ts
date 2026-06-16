import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'cout-multiple',
    chapter: 3,
    title: '输出多项',
    subtitle: '连续 << 输出',
    description: '学习用链式 << 一次性输出多个文字和变量。',
    objectives: ['能用多个 << 链式输出', '会使用 endl 换行'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '一次输出一个东西太慢了。你可以用多个 `<<` 连在一起输出多个东西。',
    },
    {
      type: 'exposition',
      text: '链式输出——就像接力一样：',
      code: 'std::cout << "年龄" << 18;',
    },
    {
      type: 'type-it',
      instruction: '链式输出文字和数字：',
      code: 'std::cout << "结果" << 100;',
      hints: [
        '第一个 `<<` 后面接文字要用双引号',
        '第二个 `<<` 后面直接写数字',
        '链式就是不断加 `<<`',
      ],
    },
    {
      type: 'exposition',
      text: '`endl` 是"换行"的意思——输出完内容后另起一行：',
      code: 'std::cout << "第一行" << std::endl << "第二行";',
    },
    {
      type: 'type-it',
      instruction: '用 endl 换行输出：',
      code: 'std::cout << "A" << std::endl << "B";',
      hints: [
        '`std::endl` 也有 std:: 前缀',
        'endl 要单独用一个 << 连接',
        '输出结果是 A 换行 B 在两行',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下哪个代码可以输出"你好"？',
      options: [
        { text: 'cout < "你好"', correct: false, explanation: '方向错了，是 << 不是 <' },
        { text: 'std::cout << "你好"', correct: true, explanation: '这是正确的输出写法' },
        { text: 'std::cout >> "你好"', correct: false, explanation: '>> 是 cin 用的，输出用 <<' },
        { text: 'cout "你好"', correct: false, explanation: '缺少了 << 符号' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：输出"总分"然后输出变量 score 的值：',
      template: 'std::cout << "____" << ____;',
      answers: ['总分', 'score'],
      hints: ['第一个空是输出的文字', '第二个空是变量名，不加引号'],
    },
    {
      type: 'type-it',
      instruction: '输出文字加变量：',
      code: 'int age = 10;\nstd::cout << "年龄" << age;',
      hints: [
        '先声明变量 age 并赋值',
        '输出变量时不要加双引号',
        '否则会直接显示变量名文字',
      ],
    },
    {
      type: 'exposition',
      text: '总结：链式 `<<` 可以一次性输出多项，`endl` 用来换行。',
    },
  ],
}

export default lesson
