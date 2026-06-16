import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'what-is-scope',
    chapter: 5,
    title: '作用域',
    subtitle: '{} 划定范围',
    description: '理解变量的"活动范围"——花括号划定边界。',
    objectives: ['理解作用域是变量有效的范围', '能识别变量的作用域边界'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '一个变量不是在整个程序中都有效的——它只在**花括号 {} 限定的范围内**有效。\n这个范围就叫**作用域**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '认识作用域的核心概念：',
      cards: [
        { glyph: '📦', term: '{}', meaning: '花括号划定作用域的边界', example: 'int main() {  // 作用域开始' },
        { glyph: '🎯', term: '作用域', meaning: '变量有效的那段代码区域', example: '出了 {} 就失效' },
        { glyph: '🚪', term: '变量生命周期', meaning: '进入作用域时创建，退出时销毁', example: '在 {} 内声明，在 } 处消失' },
      ],
    },
    {
      type: 'exposition',
      text: '函数体就是作用域——main 里声明的变量只能在 main 里用：',
      code: 'int main() {\n  int x = 10;  // x 的作用域：从这行到 main 的 }\n  std::cout << x;  // ✅ 可以\n}\n// 到这里 x 就"消失"了',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`void show(int n)` 中的参数 n 属于哪种情况？',
      options: [
        { text: 'n 是全局变量，整个程序都能用', correct: false, explanation: '参数 n 只在 show 函数内有效' },
        { text: 'n 是函数的参数，只在函数体内有效', correct: true, explanation: '参数的作用域就是它所在的函数体' },
        { text: 'n 是返回值，不在作用域讨论范围内', correct: false, explanation: 'n 是参数不是返回值' },
        { text: 'n 在所有函数中都能用', correct: false, explanation: '参数作用域仅限于所属函数' },
      ],
    },
    {
      type: 'exposition',
      text: '同一个作用域里不能有同名变量。但不同的作用域可以用相同的名字——互不影响。',
      code: 'void funcA() {\n  int x = 1;  // 自己的 x\n}\n\nvoid funcB() {\n  int x = 2;  // 另一个 x，和 funcA 的 x 没关系\n}',
    },
    {
      type: 'type-it',
      instruction: '观察不同函数中同名变量互不影响：',
      code: '#include <iostream>\n\nvoid showA() {\n  int x = 10;\n  std::cout << "A: " << x << "\\n";\n}\n\nvoid showB() {\n  int x = 99;\n  std::cout << "B: " << x << "\\n";\n}\n\nint main() {\n  showA();\n  showB();\n}',
      hints: [
        'showA 和 showB 各有自己的变量 x',
        '两个 x 互不干扰',
        '每个 x 只在自己的函数内有效',
      ],
    },
    {
      type: 'multiple-choice',
      question: '一个在 main 函数 {} 内声明的 int 变量，可以在另一个函数中使用吗？',
      options: [
        { text: '可以，因为它是 int 类型', correct: false, explanation: '能不能用取决于作用域，不是类型' },
        { text: '不能，因为它的作用域只限于 main 函数', correct: true, explanation: 'main 内的变量只在 main 的作用域有效' },
        { text: '可以，只要变量名不冲突', correct: false, explanation: '作用域限制和变量名无关' },
        { text: '不能，除非变量名是 x', correct: false, explanation: '变量名不影响作用域规则' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，看不同函数中变量的作用域：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid test() {\n  int y = 200;\n  cout << "test 中: " << y << endl;\n}\n\nint main() {\n  int y = 100;\n  cout << "main 中: " << y << endl;\n  test();\n  cout << "回到 main: " << y << endl;\n}',
      expectedOutput: 'main 中: 100\ntest 中: 200\n回到 main: 100',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '记住：**{} 就是墙**——墙里面声明的变量，出墙就没。\n下一课我们看怎么突破这个限制（全局变量）。',
    },
  ],
}

export default lesson
