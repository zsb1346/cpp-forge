import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'construction-chain',
    chapter: 9,
    title: '构造函数的调用链',
    subtitle: '从基类开始构造',
    description: '创建派生类对象时，先调用基类构造函数，再调派生类构造函数。',
    objectives: ['能解释构造函数的调用顺序', '能写出派生类的构造函数'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '当创建派生类对象时，构造函数不是只调一个，而是**调两个**——先基类，再派生类。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 调用顺序\n\n1. 基类的构造函数（先初始化继承来的部分）\n2. 派生类的构造函数（再初始化自己的部分）\n\n就像盖房子：**先打地基，再盖上层**。',
    },
    {
      type: 'exposition',
      text: '看个例子：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n  Base() { cout << "基类构造 "; }\n};\n\nclass Derived : public Base {\npublic:\n  Derived() { cout << "派生类构造"; }\n};\n\nint main() {\n  Derived d;\n  // 输出：基类构造 派生类构造\n}',
    },
    {
      type: 'type-it',
      instruction: '定义基类和派生类，在构造函数中输出信息：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n  Base() { cout << "B"; }\n};\n\nclass Derived : public Base {\npublic:\n  Derived() { cout << "D"; }\n};',
      hints: [
        'Base 构造输出 B',
        'Derived 构造输出 D',
        '创建 Derived 对象时会先输出 B 再输出 D',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：派生类用什么符号连接基类？',
      options: [
        { text: 'extends', correct: false, explanation: 'extends 是 Java 的关键字' },
        { text: ':', correct: true, explanation: 'C++ 用冒号表示继承关系' },
        { text: '->', correct: false, explanation: '-> 是指针访问符号' },
        { text: 'inherits', correct: false, explanation: 'C++ 没有 inherits 关键字' },
      ],
    },
    {
      type: 'exposition',
      text: '### 给基类构造函数传参\n\n如果基类构造函数需要参数，派生类必须通过**初始化列表**传递。',
      code: 'class Base {\npublic:\n  string name;\n  Base(string n) : name(n) { }\n};\n\nclass Derived : public Base {\npublic:\n  int level;\n  Derived(string n, int l) : Base(n), level(l) { }\n};',
    },
    {
      type: 'exposition',
      text: '关键语法：\n`派生类构造(参数) : 基类构造(参数), 成员(值) { }`\n- 基类构造在冒号后的初始化列表中调用\n- 派生类自己的成员也可以在这里初始化',
    },
    {
      type: 'type-it',
      instruction: '写一个派生类构造函数，通过初始化列表传给基类：',
      code: 'class Base {\npublic:\n  int id;\n  Base(int i) : id(i) { }\n};\n\nclass Derived : public Base {\npublic:\n  int level;\n  Derived(int i, int l) : Base(i), level(l) { }\n};',
      hints: [
        'Derived 构造参数传给 Base(i)',
        '初始化列表用 : 开头',
        '多个初始化用逗号隔开',
      ],
    },
    {
      type: 'exposition',
      text: '### 析构顺序相反\n\n析构函数的调用顺序和构造**相反**：\n1. 先调派生类析构\n2. 再调基类析构\n\n就像拆房子：**先拆上层，再拆地基**。',
    },
    {
      type: 'exposition',
      text: '完整示例：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n  Base() { cout << "构造基类 "; }\n  ~Base() { cout << "析构基类 "; }\n};\n\nclass Derived : public Base {\npublic:\n  Derived() { cout << "构造派生 "; }\n  ~Derived() { cout << "析构派生 "; }\n};\n\nint main() {\n  Derived d;\n} // 输出：构造基类 构造派生 析构派生 析构基类',
    },
    {
      type: 'multiple-choice',
      question: '创建派生类对象时，构造函数的调用顺序是？',
      options: [
        { text: '先派生类，再基类', correct: false, explanation: '必须先构造基类部分，再构造派生类部分' },
        { text: '先基类，再派生类', correct: true, explanation: '基类是基础，必须先初始化' },
        { text: '同时调用', correct: false, explanation: 'C++ 保证严格顺序，先基类后派生类' },
        { text: '只调派生类构造', correct: false, explanation: '派生类构造会自动调用基类构造' },
      ],
    },
    {
      type: 'exposition',
      text: '### 如果基类没有默认构造函数\n\n如果基类只有带参数的构造函数，派生类**必须**显式调用它。\n否则编译错误。',
      code: 'class Base {\npublic:\n  Base(int x) { }  // 没有默认构造\n};\n\nclass Derived : public Base {\npublic:\n  Derived() : Base(0) { }  // 必须显式调用\n};',
    },
    {
      type: 'type-it',
      instruction: '带参数基类构造，派生类必须传参：',
      code: 'class Base {\npublic:\n  Base(int x) { }\n};\n\nclass Derived : public Base {\npublic:\n  Derived() : Base(99) { }\n};',
      hints: [
        'Base 没有默认构造函数',
        'Derived 必须在初始化列表传参',
        'Base(99) 将 99 传给基类构造',
      ],
    },
    {
      type: 'multiple-choice',
      question: '析构函数的调用顺序是怎样的？',
      options: [
        { text: '先基类，再派生类', correct: false, explanation: '析构顺序和构造相反' },
        { text: '先派生类，再基类', correct: true, explanation: '先销毁派生类部分，再销毁基类部分' },
        { text: '同时调用', correct: false, explanation: 'C++ 保证严格顺序' },
        { text: '只调派生类析构', correct: false, explanation: '两个析构都会调用' },
      ],
    },
    {
      type: 'exposition',
      text: '### 传递多个参数\n\n如果基类构造函数需要多个参数，同样在初始化列表中传递：',
      code: 'class Base {\npublic:\n  Base(string n, int h) : name(n), hp(h) { }\n  string name;\n  int hp;\n};\n\nclass Derived : public Base {\npublic:\n  Derived() : Base("英雄", 100) { }\n};',
    },
    {
      type: 'exposition',
      text: '总结：\n- 构造顺序：**基类 → 派生类**（从上到下）\n- 析构顺序：**派生类 → 基类**（从下到上）\n- 传参方式：**初始化列表 `: Base(args)`**\n- 基类无默认构造 → 派生类必须显式传参',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 记住这个类比\n\n把派生类对象想象成三明治：\n- 底层 = 基类部分（先做）\n- 上层 = 派生类部分（后做）\n- 吃的时候先吃上层（派生类析构），再吃底层（基类析构）',
    },
    {
      type: 'exposition',
      text: '下一课是练习课，通过动手练习巩固继承基础。',
    },
  ],
}

export default lesson
