import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'static-in-class-review',
    chapter: 10,
    title: 'static 成员回顾',
    subtitle: '属于类的成员',
    description: '回顾并深化 static 成员变量和 static 成员函数——属于整个类而不是某个对象的成员。',
    objectives: ['能定义 static 成员变量和函数', '理解 static 成员属于类而非对象'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '普通成员变量属于**每个对象**——每个对象都有自己的副本。\n而 static 成员变量属于**整个类**——所有对象共享同一个副本。',
      code: 'class Hero {\npublic:\n  string name;      // 每个对象都有自己的 name\n  static int count; // 所有 Hero 共享同一个 count\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'static 成员变量需要在类外面单独定义（分配存储空间）：',
      code: '// Hero.h\nclass Hero {\n  static int count;  // 声明\n};\n// Hero.cpp\nint Hero::count = 0;  // 定义并初始化',
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07-16：static 成员变量属于谁？',
      options: [
        { text: '属于每个对象', correct: false, explanation: 'static 成员属于类，所有对象共享' },
        { text: '属于类本身', correct: true, explanation: 'static 成员是类级别的，不是对象级别的' },
        { text: '属于 main 函数', correct: false, explanation: 'static 成员属于类' },
        { text: '属于编译器', correct: false, explanation: 'static 是语言特性' },
      ],
    },
    {
      type: 'exposition',
      text: '访问 static 成员变量有两种方式：\n1. 通过对象：`hero.count`\n2. 通过类名：`Hero::count`（推荐，更清晰）',
    },
    {
      type: 'type-it',
      instruction: '定义一个带 static 成员的类：',
      code: 'class Player {\npublic:\n  string name;\n  static int totalPlayers;\n  Player(string n) : name(n) {\n    totalPlayers++;\n  }\n};\nint Player::totalPlayers = 0;',
      hints: [
        'static int totalPlayers 是所有 Player 共有的',
        '每次创建 Player 对象，totalPlayers 加 1',
        '类外面用 int Player::totalPlayers = 0; 定义',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是正确的 static 成员访问方式？',
      options: [
        { text: 'Player.totalPlayers', correct: false, explanation: 'C++ 用 :: 访问 static 成员，不是 .' },
        { text: 'Player::totalPlayers', correct: true, explanation: '类名::静态成员 是标准方式' },
        { text: 'totalPlayers', correct: false, explanation: '需要类名限定' },
        { text: 'Player->totalPlayers', correct: false, explanation: '-> 是指针访问，不用于 static 成员' },
      ],
    },
    {
      type: 'exposition',
      text: 'static 成员函数：只能访问 static 成员变量，不能访问普通成员变量。\n因为 static 函数不依赖具体对象——调用时不传 this 指针。',
      code: 'class Hero {\n  static int count;\n  int hp;\npublic:\n  static int getCount() { return count; }  // 可以\n  static int getHp() { return hp; }         // 编译错误！不能访问非 static 成员\n};',
    },
    {
      type: 'concept-cards',
      instruction: 'static 成员的关键区别：',
      cards: [
        { glyph: '👥', term: '普通成员', meaning: '每个对象一份，用对象.访问', example: 'hero.name' },
        { glyph: '🌟', term: 'static 成员', meaning: '整个类一份，用类名::访问', example: 'Hero::count' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '定义 static 成员变量并初始化。',
      template: 'class Item {\n  ____ ____ totalItems;\n};\n____ ____ ____ = 0;',
      answers: ['static', 'int', 'int', 'Item', 'totalItems'],
      hints: ['第一空：声明为静态', '第二空：类型', '第三到五空：类外定义'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 07：static 局部变量和 static 成员变量有什么共同点？',
      options: [
        { text: '它们的生命周期都是整个程序运行期间', correct: true, explanation: '所有 static 变量都存活到程序结束' },
        { text: '它们都在函数内部', correct: false, explanation: 'static 成员变量在类中，不在函数内' },
        { text: '它们都不能被初始化', correct: false, explanation: 'static 变量必须初始化' },
        { text: '它们都可以被外部随意访问', correct: false, explanation: 'static 局部变量有函数作用域限制' },
      ],
    },
    {
      type: 'exposition',
      text: 'static 成员函数的用途：\n- 工厂函数（创建对象）\n- 管理全局状态（总对象数、配置）\n- 工具函数（不依赖具体对象）',
    },
    {
      type: 'type-it',
      instruction: '写一个完整的 static 成员例子：',
      code: 'class Student {\n  string name;\npublic:\n  static int count;\n  Student(string n) : name(n) { count++; }\n  ~Student() { count--; }\n  static int getCount() { return count; }\n};\nint Student::count = 0;',
      hints: [
        '构造函数中 count++，析构函数中 count--',
        'static int getCount() 返回当前学生总数',
        '通过 Student::getCount() 调用',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 static 成员函数。',
      template: 'class Math {\n  ____ ____ max(int a, int b) {\n    return (a > b) ? a : b;\n  }\n};',
      answers: ['static', 'int'],
      hints: ['第一空：声明为静态函数', '第二空：返回值类型'],
    },
    {
      type: 'multiple-choice',
      question: 'static 成员函数为什么不能访问普通成员变量？',
      options: [
        { text: '语法不允许', correct: false, explanation: '根本原因是没有 this 指针' },
        { text: '因为没有 this 指针，不知道访问哪个对象的成员', correct: true, explanation: 'static 函数不绑定到具体对象' },
        { text: '因为编译器禁止', correct: false, explanation: '根本原因是没有 this 指针' },
        { text: '因为 static 函数只能调 static 函数', correct: false, explanation: '这只是限制之一' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个带 static 成员变量的完整类：',
      code: 'class User {\n  string name;\npublic:\n  static int totalUsers;\n  User(string n) : name(n) { totalUsers++; }\n  ~User() { totalUsers--; }\n  static int getCount() { return totalUsers; }\n};\nint User::totalUsers = 0;',
      hints: [
        'totalUsers 是 static，所有 User 对象共享',
        '构造函数和析构函数分别增减',
        'getCount 是 static 函数，通过 User::getCount() 调用',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：访问 static 成员变量。',
      template: 'int count = ____::____;',
      answers: ['User', 'totalUsers'],
      hints: ['第一空：类名', '第二空：static 成员变量名'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 07：static 局部变量和 static 成员变量在生命周期上有什么共同点？',
      options: [
        { text: '都在函数返回时销毁', correct: false, explanation: 'static 变量不随函数返回销毁' },
        { text: '都存活到程序结束', correct: true, explanation: '所有 static 变量的生命周期都是整个程序' },
        { text: '都在栈上分配', correct: false, explanation: 'static 变量不在栈上' },
        { text: '都是每个对象一份', correct: false, explanation: 'static 成员是所有对象共享的' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'static 成员函数练习：',
      code: 'class MathUtils {\npublic:\n  static int square(int x) { return x * x; }\n  static int cube(int x) { return x * x * x; }\n};\n\nint main() {\n  cout << MathUtils::square(5);\n  cout << MathUtils::cube(3);\n}',
      hints: [
        'MathUtils::square 直接通过类名调用',
        '不需要创建 MathUtils 对象',
        'static 函数没有 this 指针',
      ],
    },
    {
      type: 'exposition',
      text: '总结：static 成员是"属于类"的成员。\n- static 变量：所有对象共享一份\n- static 函数：不需要对象就能调用\n- 两者都通过 `类名::` 访问',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson