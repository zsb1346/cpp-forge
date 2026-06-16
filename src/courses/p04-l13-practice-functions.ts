import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-functions',
    chapter: 5,
    title: '函数综合练习',
    subtitle: '巩固 06-12',
    description: '综合练习函数的定义、调用、返回值和参数。',
    objectives: ['能独立定义各种函数', '能综合运用函数的知识'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '定义一个 void 函数并调用三次：',
      code: '#include <iostream>\n\nvoid cheer() {\n  std::cout << "加油！\\n";\n}\n\nint main() {\n  cheer();\n  cheer();\n  cheer();\n}',
      hints: [
        'void 函数不返回任何值',
        '调用时写函数名加括号',
        '调用三次 cheer() 输出三行',
      ],
    },
    {
      type: 'code-runner',
      instruction: '定义函数返回两个数中较小的值：',
      code: '#include <iostream>\nusing namespace std;\n\nint min(int a, int b) {\n  if (a < b) return a;\n  else return b;\n}\n\nint main() {\n  cout << min(15, 8);\n}',
      expectedOutput: '8',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '定义函数输出 n 次星号：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid printStars(int n) {\n  for (int i = 0; i < n; i++) {\n    cout << "*";\n  }\n  cout << endl;\n}\n\nint main() {\n  printStars(5);\n  printStars(3);\n}',
      expectedOutput: '*****\n***',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全函数，接收两个整数参数并返回它们的和：',
      template: 'int add(int a, int b) {\n  return ____ + ____;\n}',
      answers: ['a', 'b'],
      hints: ['用参数 a 和 b 相加', 'return 后面跟计算结果'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个函数定义是正确的？',
      options: [
        { text: 'void sayHi() { return "Hi"; }', correct: false, explanation: 'void 函数不能返回值' },
        { text: 'int getNum() { return 10; }', correct: true, explanation: 'int 类型的函数返回整数 10，语法正确' },
        { text: 'void sayHi() return;', correct: false, explanation: '函数体必须用 {} 括起来' },
        { text: 'int getNum() { cout << 10; }', correct: false, explanation: 'int 函数必须有 return 语句返回 int 值' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：以下哪种情况应该用 getline 而不是 cin>>？',
      options: [
        { text: '读入一个整数', correct: false, explanation: '读整数用 cin>> 就够了' },
        { text: '读入包含空格的文字', correct: true, explanation: 'cin>> 遇到空格会停，getline 读一整行' },
        { text: '读入一个字符', correct: false, explanation: '读单个字符不需要 getline' },
        { text: '读入一个浮点数', correct: false, explanation: '读浮点数用 cin>> 即可' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个函数计算圆的面积（半径作为参数）：',
      code: '#include <iostream>\n\ndouble area(double r) {\n  return 3.14 * r * r;\n}\n\nint main() {\n  std::cout << area(5);\n}',
      hints: [
        'double 类型函数返回浮点数',
        '参数 r 是半径',
        'area(5) 返回值是 3.14 * 25 = 78.5',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全调用：让函数输出 "你好小明"',
      template: 'void greet(string name) {\n  cout << "你好" << ____ << "\\n";\n}\n\nint main() {\n  greet("____");\n}',
      answers: ['name', '小明'],
      hints: ['第一个空：输出参数 name', '第二个空：调用时传入的名字'],
    },
  ],
}

export default lesson
