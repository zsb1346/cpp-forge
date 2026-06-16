import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'function-definition',
    chapter: 5,
    title: '定义一个函数',
    subtitle: '返回值+名字+()',
    description: '学会定义一个函数的完整语法。',
    objectives: ['能写出函数的定义语法', '能定义一个简单的函数'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '定义一个函数的语法是：\n**返回值类型 + 函数名 + () + {}**\n`void sayHi() { 代码 }`',
      code: 'void sayHi() {\n  std::cout << "你好";\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '认识函数定义的四个部分：',
      cards: [
        { glyph: '📤', term: 'void', meaning: '返回值类型——表示这个函数不返回结果', example: 'void / int / double' },
        { glyph: '🏷️', term: 'sayHi', meaning: '函数名——你取的名字，见名知意', example: 'showMenu / calculate' },
        { glyph: '📞', term: '()', meaning: '括号——放参数的地方，没有就空着', example: '() / (int x)' },
        { glyph: '📦', term: '{}', meaning: '花括号——函数体，放要执行的代码', example: '{ cout << "Hi"; }' },
      ],
    },
    {
      type: 'exposition',
      text: '函数定义要写在 `main` 函数**外面**，通常在 main 前面：',
      code: '#include <iostream>\n\nvoid showStar() {\n  std::cout << "★\\n";\n}\n\nint main() {\n  showStar();\n}',
    },
    {
      type: 'type-it',
      instruction: '定义一个输出问候语的函数：',
      code: '#include <iostream>\n\nvoid greet() {\n  std::cout << "Hello!\\n";\n}\n\nint main() {\n  greet();\n}',
      hints: [
        '函数定义放在 main 前面',
        '花括号 { } 括住函数体',
        '函数名后面要有一对圆括号 ()',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：为什么需要函数？',
      options: [
        { text: '为了让程序更短', correct: false, explanation: '变短是结果，本质是避免重复代码' },
        { text: '为了避免重复写相同的代码', correct: true, explanation: '函数把重复代码包起来，需要时调用即可' },
        { text: '为了加快运行速度', correct: false, explanation: '函数不直接提升运行速度' },
        { text: '为了不需要写 main 函数', correct: false, explanation: '程序仍然需要 main 函数作为入口' },
      ],
    },
    {
      type: 'exposition',
      text: '函数名要**见名知意**——看到名字就知道这个函数干什么。\n比如 `showMenu`、`printScore`、`calculateSum`。',
    },
    {
      type: 'type-it',
      instruction: '定义一个显示菜单的函数：',
      code: '#include <iostream>\n\nvoid showMenu() {\n  std::cout << "1. 开始游戏\\n";\n  std::cout << "2. 设置\\n";\n  std::cout << "3. 退出\\n";\n}\n\nint main() {\n  showMenu();\n}',
      hints: [
        'showMenu 函数体里有三行 cout',
        '每个 cout 输出一行菜单选项',
        'main 里调用 showMenu() 执行整个函数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是合法的函数定义？',
      options: [
        { text: 'void myFunc() { cout << "Hi"; }', correct: true, explanation: '返回值类型 + 函数名 + () + {}，全部正确' },
        { text: 'myFunc void() { cout << "Hi"; }', correct: false, explanation: '返回值类型必须写在函数名前面' },
        { text: 'void myFunc { cout << "Hi"; }', correct: false, explanation: '函数名后面必须有 ()' },
        { text: 'void myFunc() cout << "Hi";', correct: false, explanation: '函数体必须用花括号 {} 括起来' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '定义一个输出分隔线的函数并调用：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid printLine() {\n  cout << "=========\\n";\n}\n\nint main() {\n  printLine();\n  cout << "C++\\n";\n  printLine();\n}',
      expectedOutput: '=========\nC++\n=========',
      comparison: 'trimmed',
      editable: true,
    },
  ],
}

export default lesson
