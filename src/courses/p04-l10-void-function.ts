import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'void-function',
    chapter: 5,
    title: 'void——不返回值的函数',
    subtitle: '只做事不还结果',
    description: '理解 void 函数只执行操作，不返回任何值。',
    objectives: ['能定义 void 函数', '能区分 void 和有返回值的函数'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前面我们用的 `void` 函数：**只做事，不还结果**。\n比如输出一句话、画个分隔线——这些函数不需要返回任何东西。',
    },
    {
      type: 'concept-cards',
      instruction: '认识 void 和相关概念：',
      cards: [
        { glyph: '🈳', term: 'void', meaning: '没有返回值——函数执行完不返回任何值', example: 'void show() { ... }' },
        { glyph: '📤', term: 'int / double', meaning: '有返回值——函数会返回一个结果', example: 'int get() { return 5; }' },
        { glyph: '🔙', term: 'return;', meaning: 'void 函数也可以写 return，但后面不能跟值', example: 'return;  // 提前结束' },
      ],
    },
    {
      type: 'exposition',
      text: '`void` 函数里没有 `return 值`，执行完花括号就自动结束：',
      code: 'void showTip() {\n  std::cout << "提示：输入数字\\n";\n}\n// 执行完花括号，自动返回调用处',
    },
    {
      type: 'type-it',
      instruction: '定义一个 void 函数输出当前分数：',
      code: '#include <iostream>\n\nvoid showScore() {\n  std::cout << "当前分数: 100\\n";\n}\n\nint main() {\n  showScore();\n}',
      hints: [
        'void 表示不返回值',
        '函数体里没有 return 语句',
        '调用 showScore() 会输出一行文字',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`return 5;` 中的 5 是什么？',
      options: [
        { text: '函数名', correct: false, explanation: '函数名是 add() 这种，5 是数值' },
        { text: '返回值', correct: true, explanation: 'return 后面的值就是函数返回的结果' },
        { text: '参数', correct: false, explanation: '参数是函数括号里的东西，不是 return 后面跟的' },
        { text: '变量类型', correct: false, explanation: '变量类型是 int、double 这种关键字' },
      ],
    },
    {
      type: 'exposition',
      text: '对比两种情况：\n- `void` 函数：**执行操作，不返回结果** → `showMenu()`\n- 有返回值的函数：**算出结果并返回** → `int add() { return a+b; }`',
    },
    {
      type: 'type-it',
      instruction: '定义一个 void 函数画分隔线：',
      code: '#include <iostream>\n\nvoid printLine() {\n  std::cout << "----------\\n";\n}\n\nint main() {\n  std::cout << "标题\\n";\n  printLine();\n  std::cout << "内容\\n";\n}',
      hints: [
        'printLine 函数只输出一条分隔线',
        '每次调用 printLine() 就画一条线',
        'void 函数执行完自动回到 main 继续',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是 void 函数的正确说法？',
      options: [
        { text: 'void 函数必须用 return 返回一个值', correct: false, explanation: 'void 函数不返回任何值，不能有 return 值' },
        { text: 'void 函数只执行代码，不返回结果', correct: true, explanation: 'void 函数执行操作，不需要返回结果' },
        { text: 'void 函数不能有 cout', correct: false, explanation: 'void 函数里可以有 cout，只是不能 return 值' },
        { text: 'void 函数没有函数体', correct: false, explanation: '所有函数都必须有函数体 {}' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '定义一个 void 函数输出个人信息并调用：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid showInfo() {\n  cout << "姓名: Xiao\\n";\n  cout << "年龄: 18\\n";\n}\n\nint main() {\n  showInfo();\n  showInfo();\n}',
      expectedOutput: '姓名: Xiao\n年龄: 18\n姓名: Xiao\n年龄: 18',
      comparison: 'trimmed',
      editable: true,
    },
  ],
}

export default lesson
