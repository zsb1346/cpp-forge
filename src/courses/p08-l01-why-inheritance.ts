import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-inheritance',
    chapter: 9,
    title: '为什么需要继承',
    subtitle: '共享公共部分',
    description: '多个类有相同逻辑时，抽到基类避免重复代码。',
    objectives: ['能识别多个类中的重复成员', '能说出继承解决的核心问题'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '假设你在写一个游戏，里面有`Hero`和`Enemy`两种角色。\n你发现它们有大量相同的成员……',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '先看`Hero`类的定义：',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n  int level;\n  void takeDamage(int d) { hp -= d; }\n  void heal(int a) { hp += a; }\n};',
    },
    {
      type: 'exposition',
      text: '再看`Enemy`类的定义：',
      code: 'class Enemy {\npublic:\n  string name;\n  int hp;\n  int level;\n  void takeDamage(int d) { hp -= d; }\n  void attack() { cout << "攻击!"; }\n};',
    },
    {
      type: 'exposition',
      text: '发现了吗？`name`、`hp`、`level`、`takeDamage`——**完全一样**。\n这就是重复代码问题。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：在上一阶段中，class 定义末尾必须有什么？',
      options: [
        { text: '花括号 }', correct: false, explanation: '花括号是必须的，但不是末尾的唯一要求' },
        { text: '分号 ;', correct: true, explanation: 'class 定义末尾必须有分号，否则编译报错' },
        { text: 'return 0', correct: false, explanation: 'class 定义不需要 return' },
        { text: 'public:', correct: false, explanation: 'public: 是可选的访问权限标签' },
      ],
    },
    {
      type: 'exposition',
      text: '重复代码的问题：\n- 改一个地方要改好几个类\n- 容易漏改造成 bug\n- 代码变长、难维护',
    },
    {
      type: 'exposition',
      text: 'C++ 提供了**继承（inheritance）**来解决这个问题。\n把公共的部分提取出来，放到一个**基类**里。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '认识继承的两个核心角色：',
      cards: [
        { glyph: '👴', term: '基类 (Base)', meaning: '公共的、被继承的类', example: 'Character' },
        { glyph: '👦', term: '派生类 (Derived)', meaning: '继承基类的类', example: 'Hero : public Character' },
        { glyph: '📋', term: '继承语法', meaning: 'class 派生 : public 基类', example: 'class B : public A {};' },
        { glyph: '♻️', term: '代码复用', meaning: '一次定义，多处使用', example: '减少重复' },
      ],
    },
    {
      type: 'exposition',
      text: '我们把公共部分提取成一个`Character`基类：',
      code: 'class Character {\npublic:\n  string name;\n  int hp;\n  int level;\n  void takeDamage(int d) { hp -= d; }\n};',
    },
    {
      type: 'exposition',
      text: '然后让`Hero`和`Enemy`从它继承：',
      code: 'class Hero : public Character {\npublic:\n  void heal(int a) { hp += a; }\n};\n\nclass Enemy : public Character {\npublic:\n  void attack() { cout << "攻击!"; }\n};',
    },
    {
      type: 'type-it',
      instruction: '定义一个 Character 基类，包含 name 和 hp：',
      code: 'class Character {\npublic:\n  string name;\n  int hp;\n};',
      hints: [
        'class 关键字后跟基类名 Character',
        '成员 name 类型是 string',
        '成员 hp 类型是 int',
      ],
    },
    {
      type: 'exposition',
      text: '现在`Hero`只有自己特有的`heal`方法，公共的`name`、`hp`、`takeDamage`都从`Character`继承。**代码量减少了，维护也更容易。**',
    },
    {
      type: 'multiple-choice',
      question: '继承最主要解决什么问题？',
      options: [
        { text: '让程序跑得更快', correct: false, explanation: '继承不直接影响运行速度' },
        { text: '消除重复代码', correct: true, explanation: '继承的核心价值是把公共代码提到基类，避免重复' },
        { text: '让类变得更多', correct: false, explanation: '继承的目标是减少重复，不是增加类' },
        { text: '隐藏所有数据', correct: false, explanation: '隐藏数据是封装的事情，不是继承' },
      ],
    },
    {
      type: 'exposition',
      text: '现实中的类比：\n**动物**是基类，**狗**和**猫**是派生类。\n都有名字、年龄（公共的），但叫声不同（特有的）。',
    },
    {
      type: 'exposition',
      text: '继承体现的是**"is-a"**关系：\n- Hero **is a** Character（英雄是一种角色）\n- Enemy **is a** Character（敌人是一种角色）\n- 派生类对象同时也是基类对象',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个描述符合继承的 "is-a" 关系？',
      options: [
        { text: 'Car has a Engine（汽车有引擎）', correct: false, explanation: '这是"has-a"组合关系，不是继承' },
        { text: 'Dog is an Animal（狗是一种动物）', correct: true, explanation: '"is-a"关系正是继承的语义' },
        { text: 'Player uses a Weapon（玩家使用武器）', correct: false, explanation: '这是使用关系，不是继承' },
        { text: 'Book contains Pages（书包含页）', correct: false, explanation: '这是包含关系，不是继承' },
      ],
    },
    {
      type: 'exposition',
      text: '本课要点：\n1. 重复代码 → 维护困难\n2. 继承 → 提取公共到基类\n3. "is-a" 关系判断是否该用继承',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课我们将学习继承的具体语法，`class B : public A` 到底怎么写。',
    },
    {
      type: 'exposition',
      text: '记住：继承不是让代码变多，而是让重复变少。',
    },
  ],
}

export default lesson
