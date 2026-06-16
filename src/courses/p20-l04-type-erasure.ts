import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'type-erasure',
    chapter: 21,
    title: 'Type Erasure',
    subtitle: 'std::function 的原理',
    description: '理解 Type Erasure 的核心思想——用模板+虚函数隐藏具体类型，实现类型擦除。',
    objectives: ['能说出 Type Erasure 的核心思想', '能解释 std::function 是怎么工作的', '能理解模板和虚函数如何配合消除类型'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**Type Erasure（类型擦除）** 是 C++ 中一种重要的技术。\n它的核心思想是：\n**"保存不同类型的值，但对外暴露统一的接口"**。\n\n最典型的例子就是 `std::function`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`std::function` 可以存储任何可调用对象——\n函数指针、lambda、函数对象……\n但调用时统一用 `f(args)` 语法。\n\n**类型信息被"擦除"了**——你不关心它内部具体是什么类型，\n只需要知道它"可以被调用"。',
      code: '#include <functional>\n\nstd::function<int(int)> f;\n\nf = [](int x) { return x * 2; };   // lambda\nf = [](int x) { return x + 1; };   // 不同的 lambda\n// 同一类型擦除接口，存储不同的可调用对象',
    },
    {
      type: 'concept-cards',
      instruction: 'Type Erasure 的三个角色：',
      cards: [
        { glyph: '🎭', term: '外部接口', meaning: '对外暴露的统一调用方式', example: 'function<int(int)> 提供 operator()' },
        { glyph: '🔧', term: '内部存储', meaning: '用模板接受任意具体类型', example: '模板构造函数接受任何可调用对象' },
        { glyph: '🔗', term: '虚函数桥接', meaning: '通过虚函数调用实际类型的方法', example: '基类指针调用派生类的 operator()' },
      ],
    },
    {
      type: 'exposition',
      text: '**Type Erasure 的经典实现模式**：\n1. 一个**非模板基类**，定义纯虚函数\n2. 一个**模板派生类**，包装具体类型\n3. 对外类保存基类指针\n\n`std::function` 内部就是这么实现的。',
      code: 'struct Concept {          // 非模板基类\n  virtual ~Concept() = default;\n  virtual int invoke(int) = 0;\n};\n\ntemplate<typename T>       // 模板派生类\nstruct Model : Concept {\n  T obj;\n  int invoke(int x) override { return obj(x); }\n};',
    },
    {
      type: 'concept-cards',
      instruction: 'Type Erasure 的术语：',
      cards: [
        { glyph: '📐', term: 'Concept', meaning: '非模板基类，定义接口契约', example: '纯虚函数声明' },
        { glyph: '🏭', term: 'Model', meaning: '模板派生类，包装具体类型', example: 'Model<LambdaType>' },
        { glyph: '🎪', term: 'Wrapper', meaning: '对外暴露的类（如 function）', example: '持有 Concept* 指针' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'Type Erasure 中"擦除"指的是什么？',
      options: [
        { text: '删除了类型信息，不能再获取', correct: false, explanation: '类型信息存储在派生类中，只是对外不可见' },
        { text: '对外隐藏具体类型，统一接口调用', correct: true, explanation: '外部不需要知道具体类型，只需知道接口' },
        { text: '把类型信息转换为 void*', correct: false, explanation: 'void* 是类型擦除的一种形式，但不是定义' },
        { text: '在编译期删除模板代码', correct: false, explanation: '擦除指的是运行时隐藏类型' },
      ],
    },
    {
      type: 'exposition',
      text: '**std::function 的简化实现思路**：\n\n```cpp\ntemplate<typename>\nclass function;\n\ntemplate<typename Ret, typename... Args>\nclass function<Ret(Args...)> {\n  struct Concept {\n    virtual ~Concept() = default;\n    virtual Ret invoke(Args...) = 0;\n    virtual Concept* clone() const = 0;\n  };\n\n  template<typename T>\n  struct Model : Concept {\n    T obj;\n    Ret invoke(Args... args) override { return obj(args...); }\n    Concept* clone() const override { return new Model(*this); }\n  };\n\n  Concept* ptr;\npublic:\n  template<typename T>\n  function(T&& f) : ptr(new Model<T>(std::forward<T>(f))) {}\n  Ret operator()(Args... args) { return ptr->invoke(args...); }\n};',
    },
    {
      type: 'exposition',
      text: '这个实现展示了 Type Erasure 的三个核心步骤：\n1. **Concept** 基类中定义纯虚函数接口\n2. **Model\<T\>** 模板派生类为每个具体的 T 实现接口\n3. **function** 对外类在模板构造函数中创建对应的 Model\n\n调用时通过虚函数分发（virtual dispatch）到实际类型。',
    },
    {
      type: 'multiple-choice',
      question: 'std::function 内部用什么机制实现类型擦除？',
      options: [
        { text: '宏定义和预处理', correct: false, explanation: '宏在预处理阶段处理，不参与运行时类型擦除' },
        { text: '模板推导 + 虚函数', correct: true, explanation: '模板负责存储具体类型，虚函数实现多态调用' },
        { text: '重载解析', correct: false, explanation: '重载是编译期决定，不涉及类型擦除' },
        { text: 'C 风格的函数指针', correct: false, explanation: '函数指针只能存函数，不能存 lambda 或函数对象' },
      ],
    },
    {
      type: 'exposition',
      text: '**Type Erasure 的优势**：\n- 统一接口：不同类型通过相同方式使用\n- 值语义：可以拷贝、赋值\n- 灵活：可以存函数指针、lambda、函数对象\n\n**代价**：虚函数调用（运行时开销）+ 动态内存分配',
    },
    {
      type: 'type-it',
      instruction: '输入一段代码，展示 std::function 的类型擦除能力：',
      code: '#include <functional>\n#include <iostream>\nusing namespace std;\n\nint main() {\n  function<int(int)> f;\n  f = [](int x) { return x * 2; };\n  cout << f(5) << " ";\n  f = [](int x) { return x + 10; };\n  cout << f(5) << "\\n";\n}',
      hints: [
        '同一个 function 变量可以存储不同类型的可调用对象',
        '第一次是 x*2，第二次是 x+10',
        '类型信息被擦除了——外部只看到统一的调用方式',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 12：为什么会选择"模板 + 虚函数"组合实现 Type Erasure？',
      options: [
        { text: '模板负责类型灵活性，虚函数负责运行时多态', correct: true, explanation: '模板处理任意类型，虚函数提供统一调用接口' },
        { text: '虚函数比模板快', correct: false, explanation: '虚函数有运行时开销，比模板慢' },
        { text: '模板不能用在类里', correct: false, explanation: '模板完全可以用在类里' },
        { text: '虚函数可以模板化', correct: false, explanation: '虚函数不能是模板函数' },
      ],
    },
    {
      type: 'exposition',
      text: '**Type Erasure 的其他例子**：\n- `std::any`：存储任意类型的值（下一课）\n- `std::thread`：存储任何可调用对象\n- `std::shared_ptr` 的删除器\n- 各种回调系统',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**Type Erasure 和 OOP 的区别**：\n传统 OOP 需要你从基类继承——你**必须提前知道基类**。\nType Erasure 不需要——你只需要提供一个可调用对象，\n`std::function` 自动帮你包装。\n\n这是一种"非侵入式"的多态（non-intrusive polymorphism）。',
    },
    {
      type: 'multiple-choice',
      question: '为什么说 Type Erasure 是"非侵入式"多态？',
      options: [
        { text: '因为不需要被包装的类型继承自特定基类', correct: true, explanation: '任何可调用对象都可以直接使用，无需修改' },
        { text: '因为它在运行时侵入内存', correct: false, explanation: '非侵入式指不要求类型做特殊的准备工作' },
        { text: '因为它在编译期侵入代码', correct: false, explanation: '非侵入式指的是对已有类型无侵入' },
        { text: '因为它不需要任何头文件', correct: false, explanation: '这和头文件无关' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个展示 Type Erasure 非侵入式的例子：',
      code: '#include <functional>\n#include <iostream>\nusing namespace std;\n\n// 不需要继承任何类\nstruct MyCallable {\n  int operator()(int x) const { return x * x; }\n};\n\nint main() {\n  function<int(int)> f = MyCallable{};  // 直接包装\n  cout << f(7) << "\\n";\n}',
      hints: [
        'MyCallable 不需要继承自任何基类',
        '只要 operator() 签名匹配就能被包装',
        'Type Erasure 自动生成适配层',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个不是 Type Erasure 的典型应用？',
      options: [
        { text: 'std::function 存储 lambda', correct: false, explanation: '这是最典型的 Type Erasure 应用' },
        { text: 'std::vector<int> 存储整数', correct: true, explanation: 'vector 是泛型容器，不是类型擦除' },
        { text: 'std::any 存储任意类型的值', correct: false, explanation: 'any 也是 Type Erasure 的应用' },
        { text: 'std::thread 接收可调用对象', correct: false, explanation: 'thread 内部使用了类型擦除' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n**Type Erasure = 模板（灵活性） + 虚函数（统一接口）**。\n它让你写出像 C 语言一样灵活的 API，同时保持 C++ 的类型安全。\n下一课深入 `std::function` 的完整实现——包括**小对象优化**。',
    },
  ],
}

export default lesson
