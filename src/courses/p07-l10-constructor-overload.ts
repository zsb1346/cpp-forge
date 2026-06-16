import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'constructor-overload',
    chapter: 8,
    title: '多个构造函数',
    subtitle: '重载构造函数',
    description: '构造函数可以重载——同一个类可以有多种创建方式。',
    objectives: ['能定义多个不同参数的重载构造函数'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '一个类可以有**多个构造函数**，只要参数不同就行——这叫**重载**。',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  Hero() {                    // 无参\n    name = "无名";\n    hp = 100;\n  }\n\n  Hero(string n) {            // 一个参数\n    name = n;\n    hp = 100;\n  }\n\n  Hero(string n, int h) {     // 两个参数\n    name = n;\n    hp = h;\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '不同的构造函数提供了**多种创建对象的方式**：',
      code: 'Hero h1;                // 无参 → 无名, 100\nHero h2("勇者");          // 一个参 → 勇者, 100\nHero h3("法师", 80);     // 两个参 → 法师, 80',
    },
    {
      type: 'multiple-choice',
      question: '回顾：构造函数的函数名必须是什么？',
      options: [
        { text: 'init', correct: false, explanation: '构造函数名必须和类名相同' },
        { text: '和类名一样', correct: true, explanation: '这是 C++ 的规定' },
        { text: 'constructor', correct: false, explanation: 'C++ 用类名作为构造函数名' },
        { text: '可以随便取', correct: false, explanation: '必须和类名一致' },
      ],
    },
    {
      type: 'exposition',
      text: '重载的关键：**参数个数或类型不同**。编译器根据传入的参数决定调用哪个。',
      code: 'Hero h1;               // → 调 Hero()\nHero h2("勇者");        // → 调 Hero(string)\nHero h3("勇者", 100);   // → 调 Hero(string, int)',
    },
    {
      type: 'type-it',
      instruction: '定义一个带三个构造函数的类：',
      code: 'class Enemy {\npublic:\n  string type;\n  int hp;\n  int level;\n\n  Enemy() {\n    type = "史莱姆";\n    hp = 30;\n    level = 1;\n  }\n\n  Enemy(string t) {\n    type = t;\n    hp = 50;\n    level = 1;\n  }\n\n  Enemy(string t, int h, int l) {\n    type = t;\n    hp = h;\n    level = l;\n  }\n};',
      hints: [
        '三个构造函数参数个数不同',
        '无参→默认史莱姆',
        '一个参数→自定义种类，中等血量',
        '三个参数→完全自定义',
      ],
    },
    {
      type: 'type-it',
      instruction: '使用不同的构造函数创建对象：',
      code: 'Enemy e1;\nEnemy e2("魔王");\nEnemy e3("巨龙", 500, 10);',
      hints: [
        'e1 使用无参构造，默认值',
        'e2 使用一个参数构造',
        'e3 使用三个参数构造',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是合法的构造函数重载？',
      options: [
        { text: 'Hero() 和 Hero(string)', correct: true, explanation: '参数个数不同，可以重载' },
        { text: 'Hero() 和 Hero()', correct: false, explanation: '两个一模一样的构造函数不行' },
        { text: 'Hero(string) 和 Hero(string)', correct: false, explanation: '参数列表完全一样，不是重载' },
        { text: 'void Hero() 和 Hero()', correct: false, explanation: '构造函数不能有返回值，void 也不合法' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全重载构造函数：',
      template: 'class Score {\npublic:\n  int value;\n\n  ____() {\n    ____ = 0;\n  }\n\n  ____(int v) {\n    ____ = v;\n  }\n};',
      answers: ['Score', 'value', 'Score', 'value'],
      hints: ['第一空：无参构造函数名', '第二空：初始化 value', '第三空：带参构造函数名'],
    },
    {
      type: 'exposition',
      text: '注意陷阱：如果定义了带参构造函数，**无参构造可能就不存在了**（编译器不自动生成了）：',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  Hero(string n, int h) {\n    name = n;\n    hp = h;\n  }\n};\n\nHero h1;                    // ❌ 编译错误！无参构造不存在\nHero h2("勇者", 100);       // ✅',
    },
    {
      type: 'multiple-choice',
      question: '如果类里只定义了 `Hero(string n)`，下面哪个创建对象的方式会报错？',
      options: [
        { text: 'Hero h("勇者");', correct: false, explanation: '这个匹配带参构造函数' },
        { text: 'Hero h;', correct: true, explanation: '没有定义无参构造函数，所以会报错' },
        { text: 'Hero h = Hero("勇者");', correct: false, explanation: '这个也匹配带参构造' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习：定义类时确保有无参构造：',
      code: 'class Player {\npublic:\n  string name;\n  int level;\n\n  Player() {\n    name = "新玩家";\n    level = 1;\n  }\n\n  Player(string n, int l) {\n    name = n;\n    level = l;\n  }\n};\n\nPlayer p1;\nPlayer p2("高手", 10);',
      hints: [
        '同时提供无参和带参构造函数',
        '无参构造给默认值',
        '两种创建方式都可用',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：确保两种创建方式都可用：',
      template: 'class Item {\npublic:\n  string name;\n  int count;\n\n  ____() {\n    ____ = "未知";\n    ____ = 0;\n  }\n\n  Item(string n, int c) {\n    name = ____;\n    count = ____;\n  }\n};',
      answers: ['Item', 'name', 'count', 'n', 'c'],
      hints: ['第一空：无参构造', '第二空和第三空：初始化成员', '第四空和第五空：从参数赋值'],
    },
    {
      type: 'exposition',
      text: '构造函数也可以有默认参数——用一个函数覆盖多种情况：',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  Hero(string n = "无名", int h = 100) {\n    name = n;\n    hp = h;\n  }\n};\n\nHero h1;                 // 无名, 100\nHero h2("勇者");         // 勇者, 100\nHero h3("法师", 80);     // 法师, 80',
    },
    {
      type: 'type-it',
      instruction: '用默认参数的构造函数：',
      code: 'class Player {\npublic:\n  string name;\n  int level;\n\n  Player(string n = "新玩家", int l = 1) {\n    name = n;\n    level = l;\n  }\n};\n\nPlayer p1;\nPlayer p2("高手");\nPlayer p3("大神", 99);',
      hints: [
        '默认参数让同一个构造函数有多种用法',
        '不传参就用默认值，传了就覆盖',
        '默认参数在声明时写在参数列表里',
      ],
    },
    {
      type: 'exposition',
      text: '注意：默认参数和函数重载**不要混用**，否则会造成二义性：',
      code: 'class Hero {\npublic:\n  Hero() { }           // ─┐\n  Hero(string n = "无名") { } // ─┤ 冲突！\n};  // Hero() 和 Hero("无名") 弄不清了',
    },
    {
      type: 'fill-in',
      prompt: '补全带默认参数的构造函数：',
      template: 'class Enemy {\npublic:\n  string type;\n  int hp;\n\n  ____(string t = "史莱姆", ____ h = 30) {\n    ____ = t;\n    ____ = h;\n  }\n};',
      answers: ['Enemy', 'int', 'type', 'hp'],
      hints: ['第一空：构造函数名', '第二空：hp 参数的类型', '第三四空：给成员变量赋值'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种是合法的构造函数重载？',
      options: [
        { text: 'Hero(string) 和 Hero(int)', correct: true, explanation: '参数类型不同，可以重载' },
        { text: 'Hero() 和 Hero()', correct: false, explanation: '参数列表完全相同不行' },
        { text: 'Hero(string) 和 Hero(string n)', correct: false, explanation: '参数名不同但类型相同，是同一个签名' },
        { text: 'int Hero() 和 Hero()', correct: false, explanation: '构造函数不能有返回值' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行重载构造函数的例子：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n  string name;\n  int hp;\n\n  Hero() {\n    name = "无名";\n    hp = 100;\n  }\n\n  Hero(string n, int h) {\n    name = n;\n    hp = h;\n  }\n};\n\nint main() {\n  Hero h1;\n  Hero h2("勇者", 200);\n  Hero h3("法师", 80);\n  cout << h1.name << ":" << h1.hp << endl;\n  cout << h2.name << ":" << h2.hp << endl;\n  cout << h3.name << ":" << h3.hp << endl;\n}',
      expectedOutput: '无名:100\n勇者:200\n法师:80',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
