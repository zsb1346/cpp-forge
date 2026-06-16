import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'adl',
    chapter: 21,
    title: 'ADL',
    subtitle: '参数依赖查找',
    description: '理解 ADL 机制——编译器如何根据参数类型找到对应的函数。',
    objectives: ['能说出 ADL 的全称和含义', '能判断哪些场景会触发 ADL', '能解释 std::swap 为什么能工作'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '当你在代码中调用一个函数时，编译器需要找到这个函数的定义。\n通常它查找**当前作用域**和**命名空间**。\n但有一个特殊的规则——**ADL**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**ADL（Argument-Dependent Lookup）**，中文叫"参数依赖查找"。\n意思是：编译器除了在正常作用域查找外，还会**根据函数参数的类型**，\n到参数类型所属的命名空间里查找。',
    },
    {
      type: 'exposition',
      text: '看一个例子：\n`std::cout << "hello";`\n这里的 `operator<<` 其实就是一个函数。\n`cout` 的类型是 `std::ostream`，它定义在 `std` 命名空间中。\nADL 帮你在 `std` 找到了 `operator<<`。',
      code: '#include <iostream>\n\nint main() {\n  std::cout << "hello";  // ADL 找到 operator<<\n}',
    },
    {
      type: 'concept-cards',
      instruction: 'ADL 的核心概念：',
      cards: [
        { glyph: '🔍', term: 'ADL', meaning: '根据参数类型到对应命名空间找函数', example: '调用 f(x) 时查找 x 的类型所在命名空间' },
        { glyph: '🎯', term: '参数类型', meaning: '触发 ADL 的是参数的具体类型', example: 'std::string → 查找 std' },
        { glyph: '🌐', term: '命名空间', meaning: 'ADL 只查找参数类型所在的命名空间', example: 'MyNS::Type → 找 MyNS' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个场景会触发 ADL？',
      options: [
        { text: '调用全局函数 f()', correct: false, explanation: '没有参数，ADL 不会触发' },
        { text: '调用 std::swap(a, b) 且 a,b 是自定义类型', correct: true, explanation: '参数类型会触发 ADL 找到对应命名空间的 swap' },
        { text: '调用 int x = 5', correct: false, explanation: '这不是函数调用' },
        { text: '定义类 class Foo {}', correct: false, explanation: '类定义不是函数调用' },
      ],
    },
    {
      type: 'exposition',
      text: 'ADL 最有名的应用就是**`std::swap`**。\n标准库的 `swap` 在 `std` 命名空间里。\n但如果你的自定义类型在自己的命名空间里也有 `swap`，\nADL 会优先找到那个。',
      code: 'namespace MyNS {\n  struct Widget {};\n  void swap(Widget&, Widget&);  // 自定义 swap\n}\n\n// 调用时 ADL 会找到 MyNS::swap',
    },
    {
      type: 'exposition',
      text: 'C++ 标准库中大量使用了 ADL。\n例如 `std::begin(v)`、`std::end(v)`、\n`std::size(v)` 等函数都是通过 ADL 来工作的。\n这就是为什么你经常看到 `using std::swap;` 然后直接调用 `swap(a, b)`。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪段代码利用了 ADL？',
      options: [
        { text: '`std::cout << x;`', correct: true, explanation: 'operator<< 通过 cout 的类型在 std 命名空间找到' },
        { text: '`int x = 5;`', correct: false, explanation: '这是变量声明，不是函数调用' },
        { text: '`if (x > 0)`', correct: false, explanation: '这是条件判断，不是函数调用' },
        { text: '`return 0;`', correct: false, explanation: 'return 语句不涉及 ADL' },
      ],
    },
    {
      type: 'exposition',
      text: '**ADL 的查找范围**：\n对于每个参数，编译器会查看其类型的"关联命名空间"。\n包括：参数类型的本身命名空间、模板参数的命名空间、\n嵌套类型的外围命名空间等。',
    },
    {
      type: 'concept-cards',
      instruction: '哪些命名空间会被 ADL 查找？',
      cards: [
        { glyph: '📁', term: '参数类型所在命名空间', meaning: '最直接的查找目标', example: 'MyNS::Type → MyNS' },
        { glyph: '🔄', term: '模板参数命名空间', meaning: '如果参数是模板实例化，模板参数的类型也查', example: 'vector<MyNS::T> → 查 MyNS' },
        { glyph: '🔗', term: '基类命名空间', meaning: '参数类型的基类所在的命名空间', example: '派生类参数也查基类的命名空间' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 12：`std::vector<int>::iterator` 的 `operator++` 是怎么找到的？',
      options: [
        { text: '通过 ADL 在 std 命名空间找到', correct: true, explanation: 'iterator 定义在 std，ADL 帮助找到 operator++' },
        { text: '通过全局作用域找到', correct: false, explanation: '全局作用域没有定义迭代器操作' },
        { text: '通过宏展开找到', correct: false, explanation: '这和宏无关' },
        { text: '通过预处理器找到', correct: false, explanation: '预处理器不处理函数查找' },
      ],
    },
    {
      type: 'exposition',
      text: '**ADL 的一个常见陷阱**：如果你写了 `f(x)` 且 `x` 的类型在 `MyNS` 中，\nADL 会自动帮你找到 `MyNS::f(x)`。\n但如果你写 `::f(x)`（全局作用域限定），ADL 就不会触发。\n所以使用 `::` 会禁用 ADL。',
      code: 'void f(int);  // 全局\n\nnamespace MyNS {\n  struct X {};\n  void f(X);  // 自定义\n}\n\nint main() {\n  MyNS::X x;\n  f(x);     // ADL → 找到 MyNS::f\n  ::f(x);   // 全局限定 → 编译错误（类型不匹配）\n}',
    },
    {
      type: 'type-it',
      instruction: '输入一个利用 ADL 调用自定义 swap 的例子：',
      code: 'namespace MyNS {\n  struct Data {};\n  void swap(Data&, Data&) {}\n}\n\nint main() {\n  MyNS::Data a, b;\n  using std::swap;\n  swap(a, b);  // ADL 找到 MyNS::swap\n}',
      hints: [
        'using std::swap 引入标准库版本',
        'ADL 优先找到 MyNS::swap',
        '参数类型 MyNS::Data 触发在 MyNS 查找',
      ],
    },
    {
      type: 'exposition',
      text: '**ADL 与 using 声明**：\n常见的 C++ 惯用法：`using std::swap;` 然后 `swap(a, b);`。\n如果 ADL 找到了更匹配的 `swap`，就用自定义的；\n否则回退到 `std::swap`。\n这就是"Customization Point"（自定义点）的设计模式。',
    },
    {
      type: 'multiple-choice',
      question: '为什么 `using std::swap; swap(a,b)` 是推荐写法？',
      options: [
        { text: '因为 std::swap 总是最快的', correct: false, explanation: '自定义 swap 可能更高效' },
        { text: '因为 ADL 能找到自定义 swap，std::swap 作为后备', correct: true, explanation: 'ADL 优先匹配，std::swap 保底' },
        { text: '因为 using 声明比直接调用快', correct: false, explanation: '性能上没有区别' },
        { text: '为了让代码更短', correct: false, explanation: '这不是主要原因' },
      ],
    },
    {
      type: 'exposition',
      text: '**ADL 的另一个重要应用**：`std::begin`、`std::end`。\n范围 for 循环背后就用到了 ADL：\n`for (auto x : v)` 编译器会尝试通过 ADL 找到 `begin(v)` 和 `end(v)`。\n这保证了自定义容器也能用范围 for。',
    },
    {
      type: 'type-it',
      instruction: '写一个自定义容器并用范围 for 遍历（借助 ADL）：',
      code: 'namespace MyNS {\n  struct Range {\n    int* begin() { return &data[0]; }\n    int* end() { return &data[3]; }\n    int data[3] = {1, 2, 3};\n  };\n}\n\nint main() {\n  MyNS::Range r;\n  for (int x : r) {}  // ADL 找到 begin/end\n}',
      hints: [
        'begin() 和 end() 返回指针（也是迭代器）',
        '范围 for 通过 ADL 查找 begin/end',
        '指针类型 int* 支持 ++ 和 != 操作',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：范围 for 循环 `for (int x : v)` 等价于什么？',
      options: [
        { text: '`for (int i=0; i<v.size(); i++)`', correct: false, explanation: '范围 for 用迭代器，不是下标' },
        { text: '`for (auto it=v.begin(); it!=v.end(); ++it)`', correct: true, explanation: '范围 for 本质上是迭代器遍历' },
        { text: '`while (cin >> x)`', correct: false, explanation: '范围 for 不用于输入流' },
        { text: '`for_each(v.begin(), v.end(), ...)`', correct: false, explanation: '语义等价但不是完全相同的语法' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：**ADL 是 C++ 中一个看起来不起眼、但无处不在的机制**。\n它让运算符重载、swap 惯用法、范围 for 循环都能正常工作。\n理解 ADL 是进入 C++ 深度理解的门槛之一。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '以下关于 ADL 的说法，哪个是**错误的**？',
      options: [
        { text: 'ADL 会根据参数类型查找对应命名空间', correct: false, explanation: '这是 ADL 的核心机制' },
        { text: 'ADL 对基本类型（int, double）也有效', correct: true, explanation: '基本类型没有关联命名空间，不会触发 ADL' },
        { text: 'ADL 对 operator<< 非常有用', correct: false, explanation: 'ostream 的 operator<< 大量依赖 ADL' },
        { text: '使用 ::f() 会禁用 ADL', correct: false, explanation: '全局作用域限定会阻止 ADL' },
      ],
    },
    {
      type: 'exposition',
      text: '下一课我们看另一个编译器"暗中帮你"的事情——**RVO / NRVO**，\n返回值优化。编译器默默帮你省掉了一次拷贝。',
    },
  ],
}

export default lesson
