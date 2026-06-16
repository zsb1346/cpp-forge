import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'function-return',
    chapter: 5,
    title: 'return——返回值',
    subtitle: '函数还你一个结果',
    description: '学会用 return 让函数返回计算结果。',
    objectives: ['能用 return 返回函数结果', '能使用有返回值的函数'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有些函数不只是"做事情"，还要**算出一个结果交回来**。\n比如"计算两个数的和"——函数应该把结果返回给你。',
    },
    {
      type: 'concept-cards',
      instruction: '认识 return 相关的概念：',
      cards: [
        { glyph: '📤', term: 'int', meaning: '返回值类型——函数要返回的类型', example: 'int add() { return 5; }' },
        { glyph: '🔙', term: 'return', meaning: '返回语句——后面跟要返回的值', example: 'return 3 + 4;' },
        { glyph: '📋', term: 'double', meaning: '函数可以返回各种类型', example: 'int / double / string' },
      ],
    },
    {
      type: 'exposition',
      text: '定义有返回值的函数：**把 void 换成返回的类型，函数体内用 return 返回一个值**',
      code: 'int getNumber() {\n  return 42;\n}\n\nint main() {\n  int x = getNumber();  // x = 42\n  std::cout << x;\n}',
    },
    {
      type: 'type-it',
      instruction: '定义一个返回整数的函数并调用：',
      code: '#include <iostream>\n\nint getFive() {\n  return 5;\n}\n\nint main() {\n  int x = getFive();\n  std::cout << x;\n}',
      hints: [
        '返回值类型 int 代替了 void',
        '函数体内用 return 后跟要返回的值',
        '调用 getFive() 的结果赋值给变量 x',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：调用函数时程序执行流程是怎样的？',
      options: [
        { text: '从 main 开头重新执行', correct: false, explanation: '调用函数不是从头开始，是跳到函数体执行' },
        { text: '跳到函数体执行，执行完回到调用位置继续', correct: true, explanation: '调用函数时跳转，返回后继续执行后续代码' },
        { text: '只在函数定义处执行', correct: false, explanation: '定义只是声明，不调用就不会执行' },
        { text: '先执行函数体，再执行 main', correct: false, explanation: '程序总是从 main 开始执行' },
      ],
    },
    {
      type: 'exposition',
      text: '`return` 除了返回一个值，还会**立即结束函数的执行**。\nreturn 后面的代码不会再执行了。',
      code: 'int test() {\n  return 1;\n  std::cout << "这行不会被执行";  // ❌ 不会执行\n}',
    },
    {
      type: 'type-it',
      instruction: '定义函数计算两个数的和：',
      code: '#include <iostream>\n\nint add() {\n  int a = 3;\n  int b = 7;\n  return a + b;\n}\n\nint main() {\n  std::cout << add();\n}',
      hints: [
        'return a + b 先计算 a+b 的结果再返回',
        '调用 add() 相当于得到 10',
        'cout 可以直接输出函数返回的值',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全函数，让它返回 100：',
      template: 'int getHundred() {\n  return ____;\n}',
      answers: ['100'],
      hints: ['return 后面跟要返回的值', '数字直接写，不需要引号'],
    },
    {
      type: 'code-runner',
      instruction: '定义并调用一个返回两数之差的函数：',
      code: '#include <iostream>\nusing namespace std;\n\nint getDiff() {\n  int x = 10;\n  int y = 3;\n  return x - y;\n}\n\nint main() {\n  cout << getDiff();\n}',
      expectedOutput: '7',
      comparison: 'trimmed',
      editable: true,
    },
  ],
}

export default lesson
