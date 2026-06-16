import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'rtti-cost',
    chapter: 21,
    title: 'RTTI 成本',
    subtitle: '运行时类型信息的代价',
    description: '分析 typeid 和 dynamic_cast 的运行时开销——RTTI 到底有多"贵"。',
    objectives: ['能说出 RTTI 的三种主要开销', '能理解何时该用何时不该用 dynamic_cast', '能知道如何关闭 RTTI'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**RTTI（Run-Time Type Information）** 是 C++ 的运行时类型信息机制。\n它提供了两个主要功能：\n- `typeid` 表达式：获取对象的类型信息\n- `dynamic_cast`：安全向下转型',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '虽然 RTTI 很方便，但它**不是免费的**。\n代价体现在三个方面：\n1. **内存开销**：每个多态类需要额外的数据\n2. **时间开销**：`dynamic_cast` 需要遍历继承链\n3. **代码限制**：关闭 RTTI 后某些功能不可用',
    },
    {
      type: 'concept-cards',
      instruction: 'RTTI 的三大成本：',
      cards: [
        { glyph: '💾', term: '内存开销', meaning: '每个多态类增加 vtable 指针等 RTTI 数据', example: '约 8-16 字节每类' },
        { glyph: '⏱️', term: '时间开销', meaning: 'dynamic_cast 遍历继承链查找', example: 'O(继承深度) 时间' },
        { glyph: '🔒', term: '设计约束', meaning: '依赖 RTTI 的代码难以测试和扩展', example: '违背开闭原则' },
      ],
    },
    {
      type: 'exposition',
      text: '**1. 内存开销**：\n只要类有虚函数（多态），编译器就会为该类生成：\n- vtable（虚函数表）\n- type_info 对象（含类型名称字符串）\n\n这些数据放在程序的只读数据段，每个类**一份**。\n对于大量类的项目，开销会累加。',
    },
    {
      type: 'exposition',
      text: '**2. time_cost —— dynamic_cast 的效率**：\n`dynamic_cast<T*>(ptr)` 在运行时检查 ptr 是否真的是 T 类型。\n实现方式通常是：\n1. 获取 ptr 的 vtable 指针\n2. 在 vtable 关联的 type_info 链中查找 T\n3. 如果找到，返回转型后的指针；否则返回 nullptr\n\n这个过程需要遍历继承链。',
      code: 'class Base { virtual ~Base() = default; };\nclass Derived : public Base { void specific() {} };\n\nBase* b = new Derived();\n\n// dynamic_cast 运行时检查\nif (auto* d = dynamic_cast<Derived*>(b)) {\n  d->specific();  // 安全调用\n}',
    },
    {
      type: 'multiple-choice',
      question: 'dynamic_cast 的运行时开销主要来自哪里？',
      options: [
        { text: '内存分配', correct: false, explanation: 'dynamic_cast 不分配内存' },
        { text: '遍历继承链查找类型信息', correct: true, explanation: '需要在运行时检查类型是否匹配' },
        { text: '拷贝对象', correct: false, explanation: 'dynamic_cast 不拷贝对象' },
        { text: '字符串比较', correct: false, explanation: '不是字符串比较，是指针/索引比较' },
      ],
    },
    {
      type: 'exposition',
      text: '**3. RTTI 对设计的影响**：\n依赖 `dynamic_cast` 和 `typeid` 的代码**违背了开闭原则**。\n每次添加新的派生类，所有 `dynamic_cast` 检查的代码都需要修改。\n\n更好的做法：用虚函数或访问者模式替代。',
      code: '// 不好的设计：大量 dynamic_cast\n void process(Animal* a) {\n   if (auto* d = dynamic_cast<Dog*>(a)) d->bark();\n   else if (auto* c = dynamic_cast<Cat*>(a)) c->meow();\n }\n\n // 好的设计：虚函数\n class Animal {\n public:\n   virtual void speak() = 0;\n };',
    },
    {
      type: 'type-it',
      instruction: '输入一个使用 typeid 获取类型信息的例子：',
      code: '#include <iostream>\n#include <typeinfo>\nusing namespace std;\n\nclass Base { virtual ~Base() = default; };\nclass Derived : public Base {};\n\nint main() {\n  Base* b = new Derived();\n  cout << typeid(*b).name() << "\\n";\n  delete b;\n}',
      hints: [
        'typeid(*b) 获取动态类型信息',
        '.name() 返回类型名称（编译器相关）',
        '输出可能是 "7Derived"（名称修饰）',
      ],
    },
    {
      type: 'exposition',
      text: '**关闭 RTTI**：\n很多项目（尤其是游戏、嵌入式）为了性能会关闭 RTTI。\n编译选项：`-fno-rtti`（GCC/Clang）\n\n关闭后：\n- `typeid` 将无法用于多态类\n- `dynamic_cast` 将无法使用（编译器报错）\n- `static_cast` 仍然可用（但不安全）',
    },
    {
      type: 'multiple-choice',
      question: '关闭 RTTI 编译选项后，以下哪个还能正常工作？',
      options: [
        { text: 'dynamic_cast', correct: false, explanation: '关闭 RTTI 后 dynamic_cast 不可用' },
        { text: 'static_cast', correct: true, explanation: 'static_cast 是编译期转型，不依赖 RTTI' },
        { text: 'typeid', correct: false, explanation: '关闭 RTTI 后 typeid 不可用于多态类型' },
        { text: '虚函数调用', correct: true, explanation: '虚函数不依赖 RTTI，依赖 vtable' },
      ],
    },
    {
      type: 'exposition',
      text: '**dynamic_cast 和 static_cast 的对比**：\n\n| 特性 | static_cast | dynamic_cast |\n|------|-------------|-------------|\n| 时间 | 编译期，零运行时 | 运行时检查 |\n| 安全 | 不检查，可能错 | 检查，安全 |\n| 依赖 RTTI | 否 | 是 |\n| 返回 | 直接转 | 失败返回 null/抛异常 |\n\n`static_cast` 更快但不要用于多态向下转型。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪种场景最适合使用 dynamic_cast？',
      options: [
        { text: '在性能最关键的循环中使用', correct: false, explanation: 'dynamic_cast 有运行时开销，不适合热点路径' },
        { text: '从基类指针安全地向下转型到派生类指针', correct: true, explanation: '需要运行时检查的向下转型是 dynamic_cast 的正使用' },
        { text: '进行数值类型之间的转换', correct: false, explanation: '数值转换用 static_cast 就够了' },
        { text: '去掉 const 限定符', correct: false, explanation: '去掉 const 用 const_cast' },
      ],
    },
    {
      type: 'exposition',
      text: '**RTTI 开销的实际影响**：\n对于大多数桌面应用，RTTI 的开销可以忽略不计。\n但以下场景需要关注：\n\n1. **游戏引擎**：大量实体 `dynamic_cast` 检查影响帧率\n2. **嵌入式系统**：代码大小受限，RTTI 数据占空间\n3. **实时系统**：`dynamic_cast` 时间不确定（遍历时间不定）',
    },
    {
      type: 'type-it',
      instruction: '输入一个用 static_cast 替代 dynamic_cast 的例子（前提是你确定类型正确）：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n  virtual ~Base() = default;\n  virtual void who() { cout << "Base\\n"; }\n};\n\nclass Derived : public Base {\npublic:\n  void who() override { cout << "Derived\\n"; }\n  void extra() { cout << "extra\\n"; }\n};\n\nint main() {\n  Base* b = new Derived();\n  // 如果你知道 b 确实是 Derived\n  Derived* d = static_cast<Derived*>(b);\n  d->extra();\n  delete b;\n}',
      hints: [
        'static_cast 更快但不安全',
        '类型错了不会报错，导致未定义行为',
        '确定类型正确时可以用 static_cast',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 17：虚函数和 dynamic_cast 哪个成本更高？',
      options: [
        { text: '虚函数》，因为每次调用都需要查表', correct: false, explanation: '虚函数是 O(1) 查表，dynamic_cast 是 O(n) 遍历' },
        { text: 'dynamic_cast 成本更高', correct: true, explanation: 'dynamic_cast 需要遍历继承链，开销更大' },
        { text: '两者成本相同', correct: false, explanation: '虚函数调用是间接跳转，dynamic_cast 有额外类型检查' },
        { text: '取决于编译器实现', correct: false, explanation: '虚函数总是比 dynamic_cast 快' },
      ],
    },
    {
      type: 'exposition',
      text: '**替代方案**：\n如果不想用 RTTI，有几种常见替代方法：\n\n1. **虚函数**：把分支逻辑移到虚函数中\n2. **访问者模式**：双分派（double dispatch）\n3. **自定义类型标记**：每个类返回一个枚举值\n4. **std::variant + visit**：编译期多态',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是 dynamic_cast 的正确替代方案？',
      options: [
        { text: '用 void* 强制转换', correct: false, explanation: '完全不安全，是 C 风格的做法' },
        { text: '用虚函数实现多态行为', correct: true, explanation: '虚函数是 C++ 多态的标准做法' },
        { text: '用宏来处理类型判断', correct: false, explanation: '宏不处理类型' },
        { text: '用全局变量保存类型', correct: false, explanation: '不可维护且不安全' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- RTTI 提供 `typeid` 和 `dynamic_cast`，但有内存和时间开销\n- 大多数场景下开销可接受，但热点路径需谨慎\n- 关闭 RTTI 的编译选项会禁用 dynamic_cast\n- 优先用虚函数替代 dynamic_cast',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课是练习课——通过选择题和概念卡巩固内存序和 RTTI 的理解。',
    },
  ],
}

export default lesson
