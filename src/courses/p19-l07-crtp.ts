import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'crtp',
    chapter: 20,
    title: 'CRTP',
    subtitle: '奇怪递归模板模式',
    description: 'Curiously Recurring Template Pattern——派生类把自己作为模板参数传给基类，实现静态多态。',
    objectives: ['能理解 CRTP 的原理', '能用 CRTP 实现静态多态'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**CRTP（Curiously Recurring Template Pattern）**——名字很吓人，其实就是：\n`class Derived : public Base<Derived>`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### CRTP 的基本结构\n\n派生类把自己作为模板参数传给基类：',
      code: 'template <typename T>\nclass Base {\npublic:\n  void interface() {\n    static_cast<T*>(this)->implementation();\n  }\n};\n\nclass Derived : public Base<Derived> {\npublic:\n  void implementation() {\n    cout << "Derived 实现";\n  }\n};',
    },
    {
      type: 'exposition',
      text: '### 静态多态\n\n虚函数（virtual）是**动态多态**——运行时通过 vtable 查找。\nCRTP 是**静态多态**——编译时就确定了调哪个函数，没有运行时开销。',
      code: '// 静态多态（CRTP）——编译时决定\nDerived d;\nd.interface();  // 编译时就确定调 Derived::implementation',
    },
    {
      type: 'exposition',
      text: '### 为什么叫「奇怪递归」？\n\n`Derived` 继承 `Base<Derived>`，而 `Base` 又用 `Derived` 做模板参数——形成递归依赖。\n编译器在实例化 `Base<Derived>` 时，只需要 `Derived` 的前置声明，不需要完整定义。',
    },
    {
      type: 'concept-cards',
      instruction: 'CRTP 的核心要点：',
      cards: [
        { glyph: '🔄', term: '奇怪递归', meaning: '派生类作为基类的模板参数', example: 'Derived : Base<Derived>' },
        { glyph: '⚡', term: '静态多态', meaning: '编译时确定函数调用，无 vtable 开销', example: 'static_cast<T*>(this)' },
        { glyph: '📋', term: '编译时多态', meaning: '不同模板实例化生成不同代码', example: '模板编译期展开' },
        { glyph: '📈', term: '零开销', meaning: '没有虚函数表的运行时成本', example: '比 virtual 更快' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个 CRTP 基类和派生类：',
      code: 'template <typename T>\nclass ShapeBase {\npublic:\n  void draw() {\n    static_cast<T*>(this)->drawImpl();\n  }\n};\n\nclass Circle : public ShapeBase<Circle> {\npublic:\n  void drawImpl() {\n    cout << "画圆形";\n  }\n};',
      hints: [
        'ShapeBase 是模板类，参数 T 是派生类',
        'draw 内部将 this 转为 T*',
        'Circle 继承 ShapeBase<Circle>',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p12-05：模板类在什么时候实例化？',
      options: [
        { text: '编译器读取代码时', correct: false, explanation: '模板不会提前实例化' },
        { text: '使用时才实例化', correct: true, explanation: '模板在实例化时才生成具体代码' },
        { text: '链接阶段', correct: false, explanation: '模板实例化在编译阶段' },
        { text: '运行时', correct: false, explanation: '模板是编译时机制' },
      ],
    },
    {
      type: 'exposition',
      text: '### CRTP 的应用：对象计数\n\n统计当前有多少个派生类对象存活：',
      code: 'template <typename T>\nclass ObjectCounter {\n  static int count;\nprotected:\n  ObjectCounter() { ++count; }\n  ObjectCounter(const ObjectCounter&) { ++count; }\n  ~ObjectCounter() { --count; }\npublic:\n  static int alive() { return count; }\n};\n\ntemplate <typename T>\nint ObjectCounter<T>::count = 0;',
    },
    {
      type: 'exposition',
      text: '### 使用对象计数\n\n任何继承 `ObjectCounter` 的类都能统计实例数：',
      code: 'class Widget : public ObjectCounter<Widget> {\n  // Widget 自动获得 alive() 方法\n};\n\nint main() {\n  Widget a, b;\n  cout << Widget::alive();  // 输出 2\n}',
    },
    {
      type: 'type-it',
      instruction: '实现 ObjectCounter CRTP：',
      code: 'template <typename T>\nclass ObjectCounter {\n  static int count;\nprotected:\n  ObjectCounter() { ++count; }\n  ~ObjectCounter() { --count; }\npublic:\n  static int alive() { return count; }\n};\n\ntemplate <typename T>\nint ObjectCounter<T>::count = 0;',
      hints: [
        '构造时 count 加一',
        '析构时 count 减一',
        'alive 是静态方法，通过类名调用',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'CRTP 和虚函数相比，主要优势是什么？',
      options: [
        { text: '代码更短', correct: false, explanation: 'CRTP 代码量不一定更少' },
        { text: '没有运行时开销', correct: true, explanation: 'CRTP 在编译时确定调用，没有 vtable 开销' },
        { text: '支持运行时多态', correct: false, explanation: 'CRTP 是静态多态，不支持运行时' },
        { text: '语法更简单', correct: false, explanation: 'CRTP 语法比虚函数更复杂' },
      ],
    },
    {
      type: 'exposition',
      text: '### CRTP vs 虚函数\n\n| 特性 | CRTP | 虚函数 |\n|------|------|--------|\n| 绑定时间 | 编译时 | 运行时 |\n| 性能 | 零开销 | vtable 间接调用 |\n| 灵活性 | 静态 | 动态 |\n| 代码体积 | 模板膨胀 | 共享一份代码 |\n| 适用场景 | 性能敏感、固定继承层次 | 需要运行时多态 |',
    },
    {
      type: 'code-runner',
      instruction: '实现 CRTP 静态多态：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nclass AnimalBase {\npublic:\n  void speak() {\n    static_cast<T*>(this)->speakImpl();\n  }\n};\n\nclass Dog : public AnimalBase<Dog> {\npublic:\n  void speakImpl() {\n    cout << "汪汪";\n  }\n};\n\nclass Cat : public AnimalBase<Cat> {\npublic:\n  void speakImpl() {\n    cout << "喵喵";\n  }\n};\n\nint main() {\n  Dog d;\n  Cat c;\n  d.speak();\n  c.speak();\n  return 0;\n}',
      expectedOutput: '汪汪喵喵',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: 'CRTP 中 base 类如何调用 derived 类的方法？',
      options: [
        { text: '直接调用 derived 的方法名', correct: false, explanation: 'base 不知道 derived 的类型信息' },
        { text: '通过 static_cast<T*>(this)', correct: true, explanation: '将 this 转为派生类指针再调用方法' },
        { text: '通过 dynamic_cast', correct: false, explanation: 'CRTP 不用运行时类型转换' },
        { text: '通过虚函数表', correct: false, explanation: 'CRTP 没有虚函数表' },
      ],
    },
    {
      type: 'type-it',
      instruction: '实现一个完整的 CRTP 示例：',
      code: 'template <typename T>\nclass Counter {\n  static int count;\nprotected:\n  Counter() { ++count; }\n  Counter(const Counter&) { ++count; }\n  ~Counter() { --count; }\npublic:\n  static int alive() { return count; }\n};\n\nclass Player : public Counter<Player> {\npublic:\n  Player() = default;\n};\n\nint main() {\n  Player p1, p2;\n  cout << Player::alive();  // 2\n}',
      hints: [
        '拷贝构造也要增加计数',
        'alive 是静态方法返回 count',
        '每个派生类有独立的 counter',
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- CRTP：派生类把自己传给基类模板\n- 实现**静态多态**，编译时确定调用\n- 零运行时开销，适合性能敏感场景\n- 典型应用：对象计数、代码复用、运算符重载',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一节：C++ 惯用法练习——动手操练 Pimpl 和 CRTP。',
    },
    {
      type: 'exposition',
      text: 'CRTP 的核心模式：`static_cast<T*>(this)->method()`。记住这个写法，就看懂了所有 CRTP 代码。',
    },
  ],
}

export default lesson
