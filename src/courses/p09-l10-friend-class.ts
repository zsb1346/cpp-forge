import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'friend-class',
    chapter: 10,
    title: '友元类',
    subtitle: '整个类都是朋友',
    description: '学习友元类——一个类声明另一个类为友元，对方的所有成员函数都能访问私有成员。',
    objectives: ['能声明友元类', '理解友元类的使用场景'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '除了单个函数，还可以把**整个类**声明为友元。\n这样那个类的所有成员函数都能访问你的私有成员。',
      code: 'class Engine {\n  int fuel;\npublic:\n  Engine() : fuel(100) {}\n  friend class Mechanic;  // Mechanic 的所有函数都能访问 Engine 的私有\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '当 Mechanic 是 Engine 的友元类：\nMechanic 里任何成员函数都可以读写 Engine 的私有成员。',
      code: 'class Mechanic {\npublic:\n  void refill(Engine& e) {\n    e.fuel = 100;  // 友元类，可以访问\n  }\n  void check(Engine& e) {\n    cout << e.fuel; // 友元类，可以访问\n  }\n};',
    },
    {
      type: 'multiple-choice',
      question: '回顾 09：friend 函数可以访问什么？',
      options: [
        { text: '只能访问 public 成员', correct: false, explanation: 'friend 可以访问所有成员' },
        { text: '可以访问 private 和 public 成员', correct: true, explanation: 'friend 突破 private 限制' },
        { text: '只能访问 private 成员', correct: false, explanation: 'friend 可以访问所有成员' },
        { text: '不能访问任何成员', correct: false, explanation: 'friend 正是为了访问私有成员' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '友元函数 vs 友元类：',
      cards: [
        { glyph: '🤝', term: '友元函数', meaning: '单个外部函数获得访问权限', example: 'friend void func();' },
        { glyph: '👥', term: '友元类', meaning: '整个类的所有函数获得权限', example: 'friend class B;' },
      ],
    },
    {
      type: 'exposition',
      text: '典型场景：**迭代器模式**。\n比如一个容器类和它的迭代器类——迭代器需要访问容器的内部结构，通常把迭代器声明为容器的友元类。',
    },
    {
      type: 'type-it',
      instruction: '声明友元类：',
      code: 'class BankAccount {\nprivate:\n  double balance;\npublic:\n  BankAccount() : balance(0) {}\n  friend class BankManager;\n};\n\nclass BankManager {\npublic:\n  void deposit(BankAccount& a, double amt) {\n    a.balance += amt;  // 可以访问 private\n  }\n  double getBalance(const BankAccount& a) {\n    return a.balance;  // 可以访问 private\n  }\n};',
      hints: [
        'friend class BankManager 写在了 BankAccount 里',
        'BankManager 所有成员函数都能访问 BankAccount 的私有',
        '不需要每个函数单独声明 friend',
      ],
    },
    {
      type: 'multiple-choice',
      question: '友元类关系具有传递性吗？\n如果 A 声明 B 是友元，B 声明 C 是友元，A 是 C 的友元吗？',
      options: [
        { text: '是的，友元可以传递', correct: false, explanation: 'C++ 友元不能传递' },
        { text: '不是，友元不能传递', correct: true, explanation: '友元关系是独立的，必须显式声明' },
        { text: '取决于编译器的实现', correct: false, explanation: '语言标准明确规定不能传递' },
        { text: '只有声明为 public 才能传递', correct: false, explanation: '友元完全不支持传递' },
      ],
    },
    {
      type: 'exposition',
      text: '注意：\n1. 友元关系不能传递（A→B，B→C 不代表 A→C）\n2. 友元关系不能继承（父类的友元不是子类的友元）\n3. 友元是单向的（A 声明 B 是友元，不代表 A 能访问 B 的私有）',
    },
    {
      type: 'type-it',
      instruction: '两个类互为友元的场景：',
      code: 'class B;  // 前向声明\n\nclass A {\n  int secretA;\npublic:\n  friend class B;\n  void accessB(B& other);\n};\n\nclass B {\n  int secretB;\npublic:\n  friend class A;\n};\n\nvoid A::accessB(B& other) {\n  other.secretB = 42;  // A 是 B 的友元，可以访问\n}',
      hints: [
        'A 声明 B 是友元，B 声明 A 是友元',
        '需要前向声明 class B; 提前告诉编译器 B 存在',
        '互为友元可以实现紧密协作的两个类',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个关于友元类的说法正确？',
      options: [
        { text: '友元类的所有成员函数都可以访问私有成员', correct: true, explanation: '这就是友元类的定义' },
        { text: '友元类只能访问 public 成员', correct: false, explanation: '友元类可以访问所有成员' },
        { text: '友元类只有一个函数能访问私有成员', correct: false, explanation: '所有函数都可以' },
        { text: '友元类不能被继承', correct: false, explanation: '友元类本身可以继承' },
      ],
    },
    {
      type: 'exposition',
      text: '什么时候用友元类？\n- 两个类紧密耦合（比如容器和迭代器）\n- 一个类是另一个类的辅助类（比如 Builder 模式）\n- 测试类需要访问被测试类的内部',
    },
    {
      type: 'fill-in',
      prompt: '补全友元类声明。',
      template: 'class Car {\n  int speed;\npublic:\n  ____ ____ ____;  // 让 Driver 能访问私有\n};',
      answers: ['friend', 'class', 'Driver'],
      hints: ['第一空：friend 关键字', '第二空：class 关键字', '第三空：友元类名'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 09-10：friend 的核心作用是？',
      options: [
        { text: '提高程序性能', correct: false, explanation: 'friend 不影响性能' },
        { text: '允许外部访问类的私有成员', correct: true, explanation: 'friend 突破封装限制' },
        { text: '让类可以被继承', correct: false, explanation: 'friend 和继承无关' },
        { text: '让函数自动内联', correct: false, explanation: 'friend 和内联无关' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义两个互为友元的类：',
      code: 'class Engine;\n\nclass Car {\n  int speed;\npublic:\n  friend class Mechanic;\n  friend void race(Car& a, Car& b);\n};\n\nclass Mechanic {\npublic:\n  void fix(Car& c) {\n    c.speed = 0;\n  }\n};',
      hints: [
        'Car 声明 Mechanic 是友元',
        'Mechanic 的所有函数都能访问 Car 的私有',
        '前向声明 class Engine; 让编译器提前知道',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 09-10：以下说法正确的是？',
      options: [
        { text: 'friend 函数可以有 this 指针', correct: false, explanation: 'friend 函数不是成员函数，没有 this' },
        { text: 'friend class 的所有成员函数都有权限', correct: true, explanation: '友元类的每个成员函数都能访问私有成员' },
        { text: 'friend 关系可以继承', correct: false, explanation: '友元不能继承' },
        { text: 'friend 只能在 public 区域声明', correct: false, explanation: 'friend 声明可以在类的任何区域' },
      ],
    },
    {
      type: 'exposition',
      text: '一个常见模式：**容器类 + 迭代器类**。\n迭代器需要访问容器的内部结构，通常把迭代器声明为友元类。',
      code: 'class MyVector {\n  int* data;\n  int size;\npublic:\n  friend class Iterator;  // 迭代器可以访问内部\n};',
    },
    {
      type: 'fill-in',
      prompt: '补全：声明友元类。',
      template: 'class A {\n  ____ ____ ____;  // B 是 A 的友元\n};',
      answers: ['friend', 'class', 'B'],
      hints: ['第一空：friend 关键字', '第二空：class 关键字', '第三空：友元类名'],
    },
    {
      type: 'exposition',
      text: '总结：\n- `friend class X;` 让 X 的所有成员函数都能访问你的私有成员\n- 友元关系不能传递、不能继承、是单向的\n- 适度使用——必要时破封装，不必时保持封装',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson