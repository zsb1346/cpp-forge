import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'function-parameters',
    chapter: 5,
    title: '参数——让函数更灵活',
    subtitle: '接收外部数据',
    description: '学会用参数让函数接收调用者传入的数据。',
    objectives: ['能定义带参数的函数', '能调用带参数的函数并传入实参'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前定义的函数都是一次只做一件事——但每次做的都一样。\n如果想让函数每次**处理不同的数据**呢？用**参数**。',
    },
    {
      type: 'exposition',
      text: '参数写在 `()` 里，像变量声明一样：\n`void show(int x)`——这个函数接收一个 int 参数，函数体里可以用 x。',
      code: 'void show(int x) {\n  std::cout << "数值是：" << x << "\\n";\n}\n\nint main() {\n  show(5);    // 输出：数值是：5\n  show(99);   // 输出：数值是：99\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '定义一个带参数的函数，输出传入的数字：',
      code: '#include <iostream>\n\nvoid showNum(int n) {\n  std::cout << n << "\\n";\n}\n\nint main() {\n  showNum(10);\n  showNum(20);\n}',
      hints: [
        'int n 是参数，n 在函数体内就是传入的值',
        '调用时 showNum(10) 把 10 传给 n',
        '参数就像函数内部的一个变量',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：void 函数有什么特点？',
      options: [
        { text: '必须用 return 返回值', correct: false, explanation: 'void 函数不返回值' },
        { text: '只执行操作，不返回结果', correct: true, explanation: 'void 函数执行操作后不返回任何值' },
        { text: '不能有 cout 语句', correct: false, explanation: 'void 函数里可以有 cout' },
        { text: '只能调用一次', correct: false, explanation: '函数可以被调用任意多次' },
      ],
    },
    {
      type: 'exposition',
      text: '参数让函数变得灵活——同一个函数，传不同的值做不同的事：\n`greet("小明")` 输出"你好小明"，`greet("小红")` 输出"你好小红"',
    },
    {
      type: 'type-it',
      instruction: '定义一个带 string 参数的问候函数：',
      code: '#include <iostream>\n#include <string>\n\nvoid greet(std::string name) {\n  std::cout << "你好" << name << "\\n";\n}\n\nint main() {\n  greet("小明");\n  greet("小红");\n}',
      hints: [
        'string 类型做参数需要包含 <string>',
        '传入的字符串在函数体内作为 name 使用',
        '参数 name 的值由调用时传入的内容决定',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`void show(int x)` 中 `x` 叫什么？',
      options: [
        { text: '函数名', correct: false, explanation: '函数名是 show，不是 x' },
        { text: '返回值', correct: false, explanation: 'void 表示没有返回值' },
        { text: '参数（形参）', correct: true, explanation: 'x 是函数定义时的参数，叫形式参数' },
        { text: '函数体', correct: false, explanation: '函数体是花括号里的代码' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全函数定义，接收一个 int 参数并输出它的两倍：',
      template: 'void showDouble(int ____) {\n  cout << ____ * 2 << "\\n";\n}',
      answers: ['x', 'x'],
      hints: ['第一个空是参数名', '第二个空用同一个参数名乘以 2'],
    },
    {
      type: 'code-runner',
      instruction: '定义一个带参数的函数，输出传入数字的平方：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid showSquare(int x) {\n  cout << x * x << endl;\n}\n\nint main() {\n  showSquare(4);\n  showSquare(7);\n}',
      expectedOutput: '16\n49',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '参数让函数从"只会做一件事"变成"能做一类事"——\n传什么数据进来，函数就处理什么数据。',
    },
  ],
}

export default lesson
