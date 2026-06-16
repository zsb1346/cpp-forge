import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'const-value',
    chapter: 10,
    title: 'const 值',
    subtitle: '声明后不能改',
    description: '学习 const 关键字，让变量的值固定下来，一旦赋值就不能修改。',
    objectives: ['能用 const 声明常量', '理解 const 变量的不可修改性'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你已经知道变量可以这样声明：\n`int hp = 100;`\n然后随时可以改它的值。',
      code: 'int hp = 100;\nhp = 50;   // 变量可以改',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '但有时候你不想让某个值被修改——比如圆周率 3.14159，或者游戏里的最大等级上限。\n这时候用 `const` 关键字：',
      code: 'const int maxLevel = 99;\nmaxLevel = 100;  // 编译错误！const 不能改',
    },
    {
      type: 'type-it',
      instruction: '声明一个 const 常量：',
      code: 'const int maxPlayers = 4;',
      hints: [
        'const 放在类型前面',
        '声明时必须赋初始值',
        '之后不能再修改这个值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：声明一个整数变量用什么关键字？',
      options: [
        { text: 'float', correct: false, explanation: 'float 是浮点数类型' },
        { text: 'int', correct: true, explanation: 'int 用来声明整数变量' },
        { text: 'const', correct: false, explanation: 'const 表示不可修改，不是类型' },
        { text: 'string', correct: false, explanation: 'string 用来声明字符串' },
      ],
    },
    {
      type: 'exposition',
      text: '`const` 放在类型前面，告诉编译器：这个值永远不会变。\n如果你试图修改它，编译器会报错——这是好事，它帮你提前发现 bug。',
    },
    {
      type: 'concept-cards',
      instruction: '认识这两个概念：',
      cards: [
        { glyph: '📦', term: '变量', meaning: '值可以改的盒子', example: 'int hp = 100; hp = 50;' },
        { glyph: '🔒', term: '常量（const）', meaning: '值不能改的盒子', example: 'const int maxHP = 100;' },
      ],
    },
    {
      type: 'type-it',
      instruction: '声明一个 double 类型的常量：',
      code: 'const double pi = 3.14159;',
      hints: [
        'const double 表示一个不可修改的浮点数',
        'pi 是常量名，习惯上用有意义的名称',
        '之后写 pi = 3.14 会导致编译错误',
      ],
    },
    {
      type: 'exposition',
      text: '`const` 让代码更安全。\n比如游戏里最大背包格数是 20，用 const 声明后，不小心写到一半也不会误改它。',
      code: 'const int maxInventory = 20;\n// 100 行代码之后...\nmaxInventory = 30;  // 编译器会拦住你',
    },
    {
      type: 'multiple-choice',
      question: '以下哪条语句会导致编译错误？',
      options: [
        { text: 'const int x = 5;', correct: false, explanation: '声明 const 并初始化是正确的' },
        { text: 'int y = 10; y = 20;', correct: false, explanation: '普通变量可以修改' },
        { text: 'const int z = 5; z = 10;', correct: true, explanation: 'const 变量声明后不能修改' },
        { text: 'int a; a = 3;', correct: false, explanation: '先声明后赋值是合法的' },
      ],
    },
    {
      type: 'exposition',
      text: '**const 必须在声明时初始化**——不能先声明再赋值。\n因为 const 的意思是永远不变，如果声明时不赋值，后面就没机会了。',
      code: 'const int x;   // 编译错误，没有初始值\nconst int x = 5; // 正确',
    },
    {
      type: 'type-it',
      instruction: '正确的 const 声明方式：',
      code: 'const int starterPokemon = 3;',
      hints: [
        'const 声明必须同时给初始值',
        'starterPokemon 的值永远是 3',
        '不能分开写成 const int starterPokemon; starterPokemon = 3;',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个 const 声明是正确的？',
      options: [
        { text: 'const int x;', correct: false, explanation: 'const 声明时必须初始化' },
        { text: 'const x = 5;', correct: false, explanation: '缺少类型 int' },
        { text: 'int const x = 5;', correct: true, explanation: 'int const 和 const int 含义相同，都表示 x 不可修改' },
        { text: 'const int x = "hello";', correct: false, explanation: '类型不匹配，int 不能赋值为字符串' },
      ],
    },
    {
      type: 'exposition',
      text: '小知识：`const int` 和 `int const` 是等价的。\n但 C++ 社区习惯把 const 写在类型前面——`const int`。',
    },
    {
      type: 'fill-in',
      prompt: '声明一个 const 整数变量 maxScore 并赋值为 100。',
      template: '____ ____ ____ = ____;',
      answers: ['const', 'int', 'maxScore', '100'],
      hints: ['第一个空是 const 关键字', '第二个空是类型', '第三个空是变量名', '第四个空是初始值'],
    },
    {
      type: 'exposition',
      text: '什么时候该用 const？\n- 数学常量（pi、e）\n- 配置值（最大人数、超时时间）\n- 任何你不希望被意外修改的值\n\n好的习惯：默认用 const，直到确定需要修改才去掉。',
    },
    {
      type: 'type-it',
      instruction: '声明多个 const 常量：',
      code: 'const int minLevel = 1;\nconst int maxLevel = 100;\nconst double version = 2.0;',
      hints: [
        '可以在一课里声明多个 const',
        '每个 const 都必须初始化',
        'const 让代码意图更清晰',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'const 最主要的作用是什么？',
      options: [
        { text: '让程序运行更快', correct: false, explanation: 'const 不影响性能' },
        { text: '防止值被意外修改', correct: true, explanation: 'const 保证值不变，编译器帮你检查' },
        { text: '让变量名更好看', correct: false, explanation: '和变量名无关' },
        { text: '让变量可以重复赋值', correct: false, explanation: 'const 恰恰是禁止重复赋值' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：`const` = 不变。\n声明时必须初始化，之后不能改。编译器会帮你盯着——你只管放心写代码。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson