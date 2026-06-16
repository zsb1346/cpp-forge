import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'do-while',
    chapter: 4,
    title: 'do-while——至少执行一次',
    subtitle: '和 while 的区别',
    description: '学习 do-while 语法以及和 while 的关键区别。',
    objectives: ['能用 do-while 实现至少执行一次的循环'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`do-while` 和 `while` 只有一个关键区别：\n**先执行一次循环体，再判断条件。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'do-while 语法：',
      code: 'do {\n  // 循环体——至少执行一次\n} while (条件);  // 注意这里有分号！',
    },
    {
      type: 'exposition',
      text: '和 while 的执行顺序对比：\n\n`while`：先判断条件 → 再执行循环体\n`do-while`：先执行循环体 → 再判断条件\n\n**所以 do-while 至少执行一次，即使条件一开始就是 false**。',
    },
    {
      type: 'concept-cards',
      instruction: 'while vs do-while：',
      cards: [
        { glyph: '🚪', term: 'while', meaning: '先检票再进——条件 false 就不进', example: 'while (条件) { }' },
        { glyph: '🎢', term: 'do-while', meaning: '先坐一次再检票——至少执行一次', example: 'do { } while (条件);' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个 do-while 循环——即使条件一开始就 false，它也会执行一次：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 10;\n  do {\n    cout << "执行了！i=" << i << endl;\n  } while (i < 5);\n  cout << "结束";\n}',
      hints: ['`i=10`，条件 `i < 5` 一开始就 false', '但 do-while 会先执行一次循环体', '输出："执行了！i=10" 然后才判断条件退出'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：知道循环次数时，推荐用哪种循环？',
      options: [
        { text: 'while', correct: false, explanation: 'while 适合不知道次数、条件驱动的场景' },
        { text: 'for', correct: true, explanation: '次数明确时 for 更紧凑、更清晰' },
        { text: 'do-while', correct: false, explanation: 'do-while 适合至少执行一次的场景' },
        { text: 'if', correct: false, explanation: 'if 不是循环，是条件判断' },
      ],
    },
    {
      type: 'exposition',
      text: 'do-while 最常见的场景：**用户输入验证**。\n先让用户输入一次，如果不对就让他重新输入。',
      code: 'int score;\ndo {\n  cout << "请输入成绩（0-100）：";\n  cin >> score;\n} while (score < 0 || score > 100);\n// 用户至少输入一次，不对就继续问',
    },
    {
      type: 'type-it',
      instruction: '敲一个"猜数字"风格的 do-while——至少问一次：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int num;\n  do {\n    cout << "输入一个正数：";\n    cin >> num;\n  } while (num <= 0);\n  cout << "你输入了：" << num;\n}',
      hints: ['do-while 保证至少输入一次', '条件 `num <= 0` 时继续问', '注意 do-while 末尾的分号 `;`'],
    },
    {
      type: 'exposition',
      text: '**重要：do-while 末尾有分号！**\n这是初学者最容易犯的语法错误——\n`while` 末尾不加分号，`do-while` 末尾**必须加分号**。',
      code: 'do {\n  // ...\n} while (条件);  // ← 这个分号不能少！',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个描述是 do-while 和 while 的**正确区别**？',
      options: [
        { text: 'do-while 语法更简单', correct: false, explanation: 'do-while 多了一个 do 关键字和末尾分号' },
        { text: 'do-while 至少执行一次循环体', correct: true, explanation: 'do-while 先执行再判断，所以至少执行一次' },
        { text: 'while 至少执行一次', correct: false, explanation: 'while 先判断条件，false 就直接跳过，可能一次都不执行' },
        { text: 'do-while 不需要花括号', correct: false, explanation: 'do-while 同样需要花括号包住循环体' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个计数用的 do-while——从 1 数到 5：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int i = 1;\n  do {\n    cout << i << " ";\n    i++;\n  } while (i <= 5);\n}',
      hints: ['别忘了末尾的 `;`', '先执行再判断，i=1→输出→i++→判断i<=5', '输出：1 2 3 4 5'],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 2：`int x = 5; x = x + 3; cout << x;` 中 `=` 是什么作用？',
      options: [
        { text: '数学等于，判断 x 是否等于 x+3', correct: false, explanation: 'C++ 中 = 是赋值，不是数学等于' },
        { text: '赋值，把 x+3 的结果写入 x', correct: true, explanation: '= 把右边计算结果赋给左边的变量' },
        { text: '比较，看左右是否相等', correct: false, explanation: '== 才是比较是否相等' },
        { text: '输出符号', correct: false, explanation: 'cout << 才是输出，= 是赋值' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 do-while，让用户输入密码直到不为空（用 `password != ""` 判断）：',
      template: 'string password;\ndo {\n  cout << "输入密码：";\n  ____ >> ____;\n} while (password ____ "");',
      answers: ['cin', 'password', '=='],
      hints: ['第一空：输入用 cin', '第二空：把输入存到 password 变量', '第三空：密码为空时继续问'],
    },
    {
      type: 'exposition',
      text: '三种循环对照：\n\n| 特性 | while | for | do-while |\n|------|-------|-----|----------|\n| 先判断？ | ✅ | ✅ | ❌ 先执行 |\n| 可能 0 次？ | ✅ | ✅ | ❌ 至少 1 次 |\n| 末尾分号？ | ❌ | ❌ | ✅ |\n| 适合次数已知？ | 一般 | ✅ | 一般 |',
    },
    {
      type: 'code-runner',
      instruction: '运行并观察——把条件和循环体互换一下，看看 do-while 的独特行为：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 100;\n  do {\n    cout << "x 的值是：" << x << endl;\n    x = x + 10;\n  } while (x < 50);\n  cout << "结束，x = " << x;\n}',
      expectedOutput: 'x 的值是：100\n结束，x = 100',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '记住：**do-while 至少执行一次**。\n当你需要"至少做一次，再做不做看情况"时就用它。',
    },
    {
      type: 'exposition',
      text: '下一课是综合练习课——把你学的三种循环都练一遍。',
    },
  ],
}

export default lesson
