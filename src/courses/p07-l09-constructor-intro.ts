import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'constructor-intro',
    chapter: 8,
    title: '构造函数',
    subtitle: '创建时自动执行',
    description: '构造函数在对象创建时自动执行，用于初始化成员变量。',
    objectives: ['能定义构造函数', '理解构造函数在创建对象时自动调用'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '每次创建对象都要手动给成员变量赋值，很麻烦。\n**构造函数**就是解决这个问题的——它在对象创建时**自动执行**。',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  // 构造函数：名字和类名相同，没有返回值\n  Hero() {\n    name = "无名";\n    hp = 100;\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '构造函数的规则：\n1️⃣ 函数名**必须和类名一样**\n2️⃣ **没有返回值**（不能写 void）\n3️⃣ 创建对象时**自动调用**，不能手动调用',
      code: 'Hero h;   // 创建对象 → 自动调用 Hero() 构造函数\n// 不需要写 h.Hero() —— 自动执行的',
    },
    {
      type: 'concept-cards',
      instruction: '认识构造函数的特点：',
      cards: [
        { glyph: '🏗️', term: '构造函数', meaning: '创建对象时自动执行的函数', example: 'Hero() { ... }' },
        { glyph: '📛', term: '类名相同', meaning: '函数名必须和类名完全一致', example: 'class Hero { Hero() {...} };' },
        { glyph: '🚫', term: '无返回值', meaning: '不能写 void，也不能写其他类型', example: 'Hero() 不是 void Hero()' },
        { glyph: '🤖', term: '自动调用', meaning: '创建对象时自动执行，无需手写', example: 'Hero h; → 自动调 Hero()' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：成员函数的定义放在哪里？',
      options: [
        { text: '在 main 函数里面', correct: false, explanation: '成员函数在类定义内部' },
        { text: '在类定义的花括号里面', correct: true, explanation: '成员函数和成员变量都放在 class 的 {} 里' },
        { text: '在另一个文件里', correct: false, explanation: '虽然可以分开写，但定义还是在类里或类外' },
        { text: '在注释里', correct: false, explanation: '注释不是代码' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个带构造函数的类：',
      code: 'class Player {\npublic:\n  string name;\n  int level;\n\n  Player() {\n    name = "新玩家";\n    level = 1;\n  }\n};',
      hints: [
        '构造函数名和类名一样：Player',
        '没有返回值类型',
        '创建对象时自动初始化 name 和 level',
      ],
    },
    {
      type: 'exposition',
      text: '有了构造函数，创建对象时成员变量**自动就有了初始值**：',
      code: 'Player p;            // name="新玩家", level=1\ncout << p.name;      // 输出"新玩家"\ncout << p.level;     // 输出 1',
    },
    {
      type: 'type-it',
      instruction: '创建多个对象，每个都自动初始化：',
      code: 'class ScoreBoard {\npublic:\n  int score;\n  int level;\n\n  ScoreBoard() {\n    score = 0;\n    level = 1;\n  }\n};\n\nScoreBoard s1, s2;\n// s1.score=0, s1.level=1\n// s2.score=0, s2.level=1',
      hints: [
        '每个对象创建时都执行构造函数',
        's1 和 s2 各自有独立的 score 和 level',
        '构造函数确保每个对象都有合理的初始值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '构造函数的函数名叫什么？',
      options: [
        { text: '和类名一样', correct: true, explanation: '构造函数名必须和类名完全相同' },
        { text: 'constructor', correct: false, explanation: 'C++ 不用 constructor 这个名字' },
        { text: 'init', correct: false, explanation: 'init 不是构造函数，只是普通函数' },
        { text: '可以随意取名', correct: false, explanation: '必须和类名相同' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序拼出带构造函数的类：',
      fragments: ['class', 'Hero', '{', 'public:', 'Hero()', '{', 'cout << "创建!";', '}', '};'],
      distractors: ['void Hero()', 'constructor'],
    },
    {
      type: 'exposition',
      text: '构造函数可以有**参数**——这样可以在创建时传入不同的初始值：',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  Hero(string n, int h) {\n    name = n;\n    hp = h;\n  }\n};\n\nHero h1("勇者", 100);\nHero h2("法师", 80);',
    },
    {
      type: 'type-it',
      instruction: '定义带参数的构造函数：',
      code: 'class Enemy {\npublic:\n  string type;\n  int hp;\n\n  Enemy(string t, int h) {\n    type = t;\n    hp = h;\n  }\n};\n\nEnemy e1("史莱姆", 30);\nEnemy e2("魔王", 500);',
      hints: [
        '构造函数参数 t 和 h 接收外部传入的值',
        '创建对象时用 Enemy("史莱姆", 30) 传入参数',
        '每个对象可以有不同的初始值',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全带参数的构造函数：',
      template: 'class Book {\npublic:\n  string title;\n  int pages;\n\n  ____(string t, ____ p) {\n    ____ = t;\n    pages = ____;\n  }\n};',
      answers: ['Book', 'int', 'title', 'p'],
      hints: ['第一空：构造函数名', '第二空：参数类型', '第三空：给成员变量赋值'],
    },
    {
      type: 'multiple-choice',
      question: '`Hero h("勇者", 100);` 这行代码做了什么？',
      options: [
        { text: '定义了一个函数', correct: false, explanation: '这是创建对象并初始化' },
        { text: '创建 Hero 对象并调用带参构造函数', correct: true, explanation: '"勇者" 和 100 传给构造函数参数' },
        { text: '调用了普通成员函数', correct: false, explanation: '构造函数是在创建对象时自动调用的' },
        { text: '声明了一个类', correct: false, explanation: '类已经定义好了，这是在创建对象' },
      ],
    },
    {
      type: 'type-it',
      instruction: '同时有无参和带参构造函数的类：',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  Hero() {\n    name = "无名";\n    hp = 100;\n  }\n\n  Hero(string n, int h) {\n    name = n;\n    hp = h;\n  }\n};',
      hints: [
        '无参构造给默认值',
        '带参构造允许自定义初始值',
        '两种创建方式都合法',
      ],
    },
    {
      type: 'exposition',
      text: '如果类里**没有定义任何构造函数**，编译器会生成一个**默认构造函数**——它什么都不做，成员变量保持未初始化。',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n  // 编译器自动生成: Hero() { }\n};\n\nHero h;  // 调编译器生成的默认构造\n// h.name 和 h.hp 未初始化！',
    },
    {
      type: 'multiple-choice',
      question: '一旦你定义了任意一个带参构造函数，默认构造函数还会自动生成吗？',
      options: [
        { text: '会，永远自动生成', correct: false, explanation: '一旦自定义了构造函数，编译器就不再自动生成默认构造' },
        { text: '不会，编译器不再自动生成', correct: true, explanation: '所以如果也需要无参构造，要自己显式定义' },
        { text: '取决于参数个数', correct: false, explanation: '任何自定义构造函数都会阻止默认构造的自动生成' },
        { text: '取决于编译器版本', correct: false, explanation: '这是 C++ 标准规定，和编译器版本无关' },
      ],
    },
    {
      type: 'type-it',
      instruction: '确保同时有无参和带参构造函数：',
      code: 'class Enemy {\npublic:\n  string type;\n  int hp;\n\n  Enemy() {\n    type = "史莱姆";\n    hp = 30;\n  }\n\n  Enemy(string t, int h) {\n    type = t;\n    hp = h;\n  }\n};\n\nEnemy e1;           // 无参构造\nEnemy e2("魔王", 500); // 带参构造',
      hints: [
        '同时提供无参和带参构造是常见的做法',
        '无参构造给默认值',
        '带参构造允许自定义',
      ],
    },
    {
      type: 'exposition',
      text: '构造函数的核心要点：\n1️⃣ 函数名=类名，无返回值\n2️⃣ 创建对象时自动调用\n3️⃣ 可以重载（多个不同参数）\n4️⃣ 自定义了构造函数，默认构造就不自动生成了',
      textAnimation: 'typewriter',
    },
    {
      type: 'code-runner',
      instruction: '运行带构造函数的完整例子：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n  string name;\n  int hp;\n\n  Hero() {\n    name = "无名";\n    hp = 100;\n  }\n\n  Hero(string n, int h) {\n    name = n;\n    hp = h;\n  }\n};\n\nint main() {\n  Hero h1;\n  Hero h2("勇者", 200);\n  cout << h1.name << " HP:" << h1.hp << endl;\n  cout << h2.name << " HP:" << h2.hp << endl;\n}',
      expectedOutput: '无名 HP:100\n勇者 HP:200',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
