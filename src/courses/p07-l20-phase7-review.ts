import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase7-review',
    chapter: 8,
    title: '阶段 7 综合复习',
    subtitle: '类与对象总复习',
    description: '全面回顾阶段 07 所有核心概念：类、对象、封装、构造、析构、this、static 等。',
    objectives: ['能全面回顾阶段 07 所有核心概念'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '阶段 07 我们学了 OOP 的基石——**类与对象**。\n这一课我们来全面回顾所有核心概念。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是定义类的正确语法？',
      options: [
        { text: 'class Hero { public: string name; int hp; };', correct: true, explanation: 'class + 类名 + {} + ;，完整正确' },
        { text: 'Hero class { public: string name; int hp; }', correct: false, explanation: 'class 必须在类名前面' },
        { text: 'class Hero { string name; int hp; }', correct: false, explanation: '缺 public: 和结尾分号' },
        { text: 'Class Hero { public: string name; int hp; };', correct: false, explanation: 'C++ 用 class 不是 Class' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下列关于 public 和 private 的说法哪个正确？',
      options: [
        { text: 'public 成员只能被类内部访问', correct: false, explanation: 'public 是公开的，谁都能访问' },
        { text: 'private 成员只能被类内部的成员函数访问', correct: true, explanation: 'private 限制访问权限到类内部' },
        { text: 'private 成员在 main 里也能访问', correct: false, explanation: 'main 在类外部，不能访问 private' },
        { text: 'public 和 private 没区别', correct: false, explanation: '区别很大，控制谁能访问' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '构造函数的特点是什么？',
      options: [
        { text: '函数名和类名相同，没有返回值', correct: true, explanation: '这是构造函数的两个核心特征' },
        { text: '函数名可以任意取，有返回值', correct: false, explanation: '构造函数名必须和类名相同，无返回值' },
        { text: '需要手动调用才会执行', correct: false, explanation: '构造函数在创建对象时自动调用' },
        { text: '只能有一个，不能重载', correct: false, explanation: '构造函数可以重载' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '析构函数的名称是什么？',
      options: [
        { text: '~类名()', correct: true, explanation: '波浪号 + 类名 = 析构函数' },
        { text: '类名()', correct: false, explanation: '那是构造函数' },
        { text: '~destructor()', correct: false, explanation: '不需要写 destructor 这个词' },
        { text: 'delete 类名()', correct: false, explanation: 'delete 是运算符，不是析构函数名' },
      ],
    },
    {
      type: 'exposition',
      text: '来回顾阶段 07 全部核心概念：',
    },
    {
      type: 'concept-cards',
      instruction: '阶段 07 核心概念一览：',
      cards: [
        { glyph: '📦', term: 'class', meaning: '把数据和函数打包的设计图', example: 'class Hero { ... };' },
        { glyph: '🎮', term: '对象', meaning: '根据类创建的具体实例', example: 'Hero h;' },
        { glyph: '🔓', term: 'public', meaning: '公开的，类外部可访问', example: 'public: void show();' },
        { glyph: '🔒', term: 'private', meaning: '私有的，只有类内部能碰', example: 'private: int hp;' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '更多核心概念：',
      cards: [
        { glyph: '🏗️', term: '构造函数', meaning: '创建对象时自动执行的函数', example: 'Hero() : hp(100) { }' },
        { glyph: '💀', term: '析构函数', meaning: '对象销毁时自动执行的函数', example: '~Hero() { }' },
        { glyph: '👈', term: 'this 指针', meaning: '成员函数中指向当前对象的指针', example: 'this->hp = 10;' },
        { glyph: '🔗', term: 'static 成员', meaning: '属于类本身，所有对象共享', example: 'static int count;' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '初始化列表的语法是？',
      options: [
        { text: 'Hero(int h) : hp(h) { }', correct: true, explanation: '参数列表后面的冒号 + 成员(值) 是初始化列表' },
        { text: 'Hero(int h) { hp = h; }', correct: false, explanation: '这是函数体赋值，不是初始化列表' },
        { text: 'Hero(int h) :: hp(h) { }', correct: false, explanation: '双冒号是作用域解析，不是初始化列表' },
        { text: 'Hero(int h) : { hp = h; }', correct: false, explanation: '冒号后必须直接跟初始化项' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '成员变量的初始化顺序由什么决定？',
      options: [
        { text: '初始化列表中的书写顺序', correct: false, explanation: '列表顺序不影响实际初始化顺序' },
        { text: '在类中的声明顺序', correct: true, explanation: '始终按照成员在类中声明的顺序初始化' },
        { text: '构造函数参数的顺序', correct: false, explanation: '参数顺序不影响初始化顺序' },
        { text: '编译器随机决定', correct: false, explanation: 'C++ 有明确规则：按声明顺序' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全一个完整的 Hero 类定义：',
      template: '____ Hero {\n____:\n  string name;\n  ____ hp;\n  static int ____;\n\n____:\n  ____(string n, int h) : ____(n), ____(h) {\n    ____++;\n  }\n\n  ____Hero() {\n    ____--;\n  }\n\n  ____ getName() ____ { return ____; }\n  int getHp() const { return ____; }\n\n  ____ int getCount() { return count; }\n};',
      answers: ['class', 'private', 'int', 'count', 'public', 'Hero', 'name', 'hp', 'count', '~', 'count', 'string', 'const', 'name', 'hp', 'static'],
      hints: ['第一空：关键字', '第二空：成员权限', '第三空：hp 的类型', '第四空：静态成员名', '第五空：接口权限', '第六空：构造函数名', '第七八空：初始化列表', '第十空：析构波浪号', '第十三空：const 关键字'],
    },
    {
      type: 'concept-cards',
      instruction: '阶段 07 的关键要点：',
      cards: [
        { glyph: '🔑', term: '封装', meaning: '数据 private + 接口 public，保护内部状态' },
        { glyph: '⚡', term: '构造 & 析构', meaning: '自动管理对象的创建和销毁' },
        { glyph: '🔄', term: '重载', meaning: '多个构造函数，不同参数列表' },
        { glyph: '📐', term: 'struct vs class', meaning: '只有默认权限不同' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'static 成员函数和普通成员函数的区别是？',
      options: [
        { text: 'static 函数没有 this 指针', correct: true, explanation: 'static 函数不属于对象，不能访问非 static 成员' },
        { text: 'static 函数不能定义', correct: false, explanation: 'static 函数完全可以定义' },
        { text: 'static 函数只能在 .h 文件中', correct: false, explanation: 'static 函数定义位置没有限制' },
        { text: '没有区别', correct: false, explanation: '有本质区别，static 函数没有 this' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '用 static 成员统计对象数量：',
      template: 'class Hero {\npublic:\n  static int count;\n  Hero() { ____++; }\n  ____Hero() { ____--; }\n};\n\nint ____::____ = 0;',
      answers: ['count', '~', 'count', 'Hero', 'count'],
      hints: ['第一空：构造时增加计数', '第二空：析构函数', '第三空：析构时减少计数', '第四五空：类外定义 static 成员'],
    },
    {
      type: 'exposition',
      text: '来做个最后的自我检查，你能否回答：\n1️⃣ class 和对象的关系是什么？\n2️⃣ public/private 控制什么？\n3️⃣ 构造和析构分别在什么时候执行？\n4️⃣ this 指向谁？\n5️⃣ static 成员和普通成员有什么区别？',
    },
    {
      type: 'multiple-choice',
      question: '如果你有一个 const 对象，它能调用哪些成员函数？',
      options: [
        { text: '只能调用 const 成员函数', correct: true, explanation: 'const 对象保证不被修改，只能调同样保证不修改的 const 函数' },
        { text: '能调用所有成员函数', correct: false, explanation: '非 const 函数可能修改对象被禁止' },
        { text: '不能调用任何成员函数', correct: false, explanation: 'const 函数可以调用' },
        { text: '只调能调用 static 函数', correct: false, explanation: 'const 对象可以调 const 成员函数' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 static 成员的计数代码：',
      template: 'class Counter {\n____:\n  static int count;\npublic:\n  Counter() { ____++; }\n  ____Counter() { ____--; }\n  static int getCount() { return ____; }\n};\n\nint ____::____ = 0;',
      answers: ['private', 'count', '~', 'count', 'count', 'Counter', 'count'],
      hints: ['第一空：成员权限', '第二空：构造时递增', '第三空：析构符号', '第四空：析构时递减', '第六七空：类外定义'],
    },
    {
      type: 'exposition',
      text: '恭喜完成阶段 07！\n你已经掌握了 C++ OOP 的基石——类与对象。\n下一阶段将学习更高级的 OOP 特性：继承和多态。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
