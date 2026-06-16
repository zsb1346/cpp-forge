import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'init-list',
    chapter: 8,
    title: '初始化列表',
    subtitle: '在函数体前初始化',
    description: '用初始化列表在构造函数函数体执行之前初始化成员变量。',
    objectives: ['能写出带初始化列表的构造函数', '理解初始化列表的作用'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '除了在构造函数体里赋值，C++ 还提供了一种更"原生"的方式——**初始化列表**。',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  Hero(string n, int h)\n    : name(n), hp(h)    // ← 初始化列表\n  {\n    // 函数体这里是空的\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '初始化列表写在构造函数参数列表后面，用**冒号 `:`** 开头：\n`构造函数(参数) : 成员1(值1), 成员2(值2) { }`',
      code: 'Hero(string n, int h) : name(n), hp(h) {\n  // name 和 hp 在进入函数体之前就已经初始化好了\n}',
    },
    {
      type: 'concept-cards',
      instruction: '认识初始化列表的结构：',
      cards: [
        { glyph: '🆕', term: ': 冒号', meaning: '告诉编译器：接下来是初始化列表', example: 'Hero() : name(n), hp(h)' },
        { glyph: '🧩', term: '成员(值)', meaning: '用括号里的值初始化成员变量', example: 'name(n) 相当于 name = n' },
        { glyph: '⚡', term: '初始化 vs 赋值', meaning: '初始化列表是初始化，函数体里是赋值', example: '初始化在进入函数体前完成' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：构造函数可以重载的条件是什么？',
      options: [
        { text: '函数名不同', correct: false, explanation: '构造函数名必须相同' },
        { text: '参数个数或类型不同', correct: true, explanation: '重载靠不同的参数列表区分' },
        { text: '返回值类型不同', correct: false, explanation: '构造函数没有返回值' },
        { text: '写的顺序不同', correct: false, explanation: '顺序不决定重载' },
      ],
    },
    {
      type: 'exposition',
      text: '初始化列表和函数体赋值的区别：\n- 初始化列表：**初始化**——在成员变量被创建时直接设置值\n- 函数体赋值：**先创建（默认初始化），再赋值**',
      code: '// 初始化列表 —— 一步到位\nHero(string n, int h) : name(n), hp(h) { }\n\n// 函数体赋值 —— 先创建再赋值\nHero(string n, int h) {\n  name = n;  // name 先被默认构造，再赋值\n  hp = h;\n}',
    },
    {
      type: 'type-it',
      instruction: '写一个带初始化列表的构造函数：',
      code: 'class Player {\npublic:\n  string name;\n  int level;\n\n  Player(string n, int l) : name(n), level(l) {\n  }\n};',
      hints: [
        'name(n) 表示用参数 n 初始化成员 name',
        '多个初始化用逗号隔开',
        '函数体可以是空的，初始化已在列表完成',
      ],
    },
    {
      type: 'type-it',
      instruction: '初始化列表的另一种写法（一个参数）：',
      code: 'class Enemy {\npublic:\n  string type;\n  int hp;\n\n  Enemy(string t) : type(t), hp(50) {\n  }\n};',
      hints: [
        'hp(50) 直接用固定值初始化，不依赖参数',
        'type(t) 用参数 t 初始化 type',
        '初始化列表在函数体之前执行',
      ],
    },
    {
      type: 'multiple-choice',
      question: '初始化列表的语法标志是什么？',
      options: [
        { text: '冒号 : 在参数列表后面', correct: true, explanation: '构造函数参数列表后面的 : 开始初始化列表' },
        { text: '等号 =', correct: false, explanation: '等号是赋值，不是初始化列表语法' },
        { text: '花括号 {}', correct: false, explanation: '花括号是函数体' },
        { text: '箭头 ->', correct: false, explanation: '箭头是指针访问' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全初始化列表的构造函数：',
      template: 'class Book {\npublic:\n  string title;\n  int pages;\n\n  ____(string t, int p) ____ ____(t), ____(p) {\n  }\n};',
      answers: ['Book', ':', 'title', 'pages'],
      hints: ['第一空：构造函数名', '第二空：初始化列表开始的冒号', '第三、四空：成员变量名'],
    },
    {
      type: 'exposition',
      text: '有些成员**必须**用初始化列表：\n1. `const` 成员（不能赋值）\n2. 引用 `&` 成员（必须初始化）\n3. 没有默认构造函数的类类型成员',
      code: 'class Example {\nprivate:\n  const int id;       // 必须用初始化列表\n  string &ref;         // 必须用初始化列表\n  NoDefault obj;       // 必须用初始化列表\n\npublic:\n  Example(int i, string &r)\n    : id(i), ref(r), obj(0) {\n  }\n};',
    },
    {
      type: 'type-it',
      instruction: '用初始化列表初始化 const 成员：',
      code: 'class Hero {\npublic:\n  const int id;\n  string name;\n\n  Hero(int i, string n) : id(i), name(n) {\n  }\n};',
      hints: [
        'const int id 一旦初始化就不能改',
        '初始化列表是初始化 const 的唯一方式',
        '不能在函数体里给 id 赋值',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'const 成员变量为什么必须用初始化列表？',
      options: [
        { text: '因为 const 变量不能赋值，只能初始化', correct: true, explanation: 'const 变量一旦创建就不能改，必须在创建时初始化' },
        { text: '因为 const 关键字只能在初始化列表里用', correct: false, explanation: 'const 是类型修饰符，不限于初始化列表' },
        { text: '没有为什么，只是习惯', correct: false, explanation: '这是 C++ 的语法规则' },
        { text: '函数体里也可以用', correct: false, explanation: '函数体里是赋值，const 变量不能赋值' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全带 const 成员的初始化列表：',
      template: 'class Item {\npublic:\n  const ____ id;\n  string name;\n\n  Item(int i, string n) ____ ____(i), ____(n) {\n  }\n};',
      answers: ['int', ':', 'id', 'name'],
      hints: ['第一空：id 的类型', '第二空：初始化列表开始', '第三、四空：被初始化的成员'],
    },
    {
      type: 'exposition',
      text: '总结：初始化列表的优势\n1️⃣ 更高效——直接初始化，不经过默认构造再赋值\n2️⃣ 必须用——const、引用等成员只能初始化\n3️⃣ 更清晰——一眼看出每个成员的初始值',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '什么时候**建议**用初始化列表？\n1️⃣ 所有情况——它更高效\n2️⃣ 必须用的情况——const、引用、无默认构造的类成员\n3️⃣ 代码更清晰——一眼看出成员怎么初始化',
    },
    {
      type: 'fill-in',
      prompt: '补全初始化列表：',
      template: 'class Hero {\n  string name;\n  int hp;\npublic:\n  Hero(string n, int h) ____ ____(n), ____(h) { }\n};',
      answers: [':', 'name', 'hp'],
      hints: ['第一空：冒号开始初始化列表', '第二空：初始化 name 成员', '第三空：初始化 hp 成员'],
    },
    {
      type: 'type-it',
      instruction: '用初始化列表初始化多个类型：',
      code: 'class Stats {\npublic:\n  const int id;\n  string name;\n  double rate;\n\n  Stats(int i, string n, double r) : id(i), name(n), rate(r) {}\n};',
      hints: [
        'const int id 必须用初始化列表',
        '多个成员用逗号隔开',
        '和声明顺序保持一致',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行带初始化列表的完整例子：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n  string name;\n  int hp;\n\n  Hero(string n, int h) : name(n), hp(h) {\n  }\n\n  void show() {\n    cout << name << " HP:" << hp << endl;\n  }\n};\n\nint main() {\n  Hero h1("勇者", 100);\n  Hero h2("法师", 80);\n  h1.show();\n  h2.show();\n}',
      expectedOutput: '勇者 HP:100\n法师 HP:80',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
