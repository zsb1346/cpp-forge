import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-idioms',
    chapter: 20,
    title: 'C++ 惯用法练习',
    subtitle: '巩固 06-07',
    description: '通过动手练习巩固 Pimpl 和 CRTP 两种 C++ 惯用法。',
    objectives: ['能独立实现 Pimpl', '能独立实现 CRTP', '能区分静态多态和动态多态'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'Pimpl 和 CRTP 是 C++ 特有的技巧。光看不够——来敲吧。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '用 unique_ptr 实现 Pimpl 的 Timer 类头文件：',
      code: 'class Timer {\n  struct Impl;\n  unique_ptr<Impl> pImpl;\npublic:\n  Timer();\n  ~Timer();\n  void start();\n  void stop();\n  double elapsed() const;\n};',
      hints: [
        '前置声明 struct Impl',
        'unique_ptr 替代原始指针管理 Impl',
        '析构函数不能 inline，要放 .cpp 中',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 06（Pimpl）：为什么 Pimpl 能加速编译？',
      options: [
        { text: '因为代码变少了', correct: false, explanation: '代码总量没有减少' },
        { text: '因为头文件不再 include 实现所需的头文件', correct: true, explanation: '需要的 include 移到 .cpp，头文件不变' },
        { text: '因为编译器优化了', correct: false, explanation: '不是编译器的功劳，是头文件稳定了' },
        { text: '因为不需要链接了', correct: false, explanation: '链接步骤仍然需要' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '实现完整的 Pimpl Timer 类：',
      code: '#include <iostream>\n#include <memory>\n#include <chrono>\nusing namespace std;\nusing namespace chrono;\n\nclass Timer {\n  struct Impl {\n    high_resolution_clock::time_point start;\n    high_resolution_clock::time_point end;\n  };\n  unique_ptr<Impl> pImpl;\npublic:\n  Timer() : pImpl(make_unique<Impl>()) {}\n  ~Timer() = default;\n  void start() { pImpl->start = high_resolution_clock::now(); }\n  void stop() { pImpl->end = high_resolution_clock::now(); }\n  double elapsed() const {\n    auto dur = pImpl->end - pImpl->start;\n    return duration_cast<milliseconds>(dur).count();\n  }\n};\n\nint main() {\n  Timer t;\n  t.start();\n  for (int i = 0; i < 1000000; ++i);\n  t.stop();\n  cout << t.elapsed() << "ms";\n  return 0;\n}',
      expectedOutput: '',
      comparison: 'none',
      editable: true,
    },
    {
      type: 'exposition',
      text: '### CRTP 练习\n\n实现一个 EnableClone CRTP，让派生类自动获得 `clone()` 方法。',
    },
    {
      type: 'type-it',
      instruction: '实现 EnableClone CRTP：',
      code: 'template <typename T>\nclass EnableClone {\npublic:\n  T clone() const {\n    return static_cast<const T&>(*this);\n  }\n};\n\nclass Point : public EnableClone<Point> {\npublic:\n  int x, y;\n  Point(int a, int b) : x(a), y(b) {}\n};',
      hints: [
        'EnableClone 提供 clone 方法的实现',
        'clone 通过 static_cast 调用派生类的拷贝构造',
        '派生类继承 EnableClone<Derived>',
      ],
    },
    {
      type: 'code-runner',
      instruction: '实现 EnableClone 并测试克隆功能：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nclass EnableClone {\npublic:\n  T clone() const {\n    return static_cast<const T&>(*this);\n  }\n};\n\nclass Point : public EnableClone<Point> {\npublic:\n  int x, y;\n  Point(int a, int b) : x(a), y(b) {}\n};\n\nint main() {\n  Point p1(3, 4);\n  Point p2 = p1.clone();\n  cout << p2.x << " " << p2.y;\n  return 0;\n}',
      expectedOutput: '3 4',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 07（CRTP）：CRTP 中 base 如何知道 derived 的类型？',
      options: [
        { text: '通过 dynamic_cast', correct: false, explanation: 'CRTP 不用运行时类型转换' },
        { text: '通过模板参数 T', correct: true, explanation: '派生类把自己作为模板参数传给基类' },
        { text: '通过虚函数表 vtable', correct: false, explanation: 'CRTP 没有 vtable' },
        { text: '通过全局变量', correct: false, explanation: '不需要全局变量' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 CRTP 实现比较运算符自动生成：',
      code: 'template <typename T>\nclass Comparable {\npublic:\n  bool operator!=(const T& other) const {\n    return !static_cast<const T*>(this)->operator==(other);\n  }\n};\n\nclass Score : public Comparable<Score> {\npublic:\n  int value;\n  Score(int v) : value(v) {}\n  bool operator==(const Score& other) const {\n    return value == other.value;\n  }\n};',
      hints: [
        'Comparable 自动提供 != 运算符',
        '派生类只需要实现 == 运算符',
        '!= 通过取反 == 来实现',
      ],
    },
    {
      type: 'exposition',
      text: '### 对比总结\n\n| 惯用法 | 核心目的 | 关键技术 |\n|--------|---------|----------|\n| Pimpl | 隐藏实现，加速编译 | 前置声明 + 指针 |\n| CRTP | 静态多态，零开销 | 模板参数自引用 |',
    },
    {
      type: 'multiple-choice',
      question: 'Pimpl 和 CRTP 哪个影响程序运行性能？',
      options: [
        { text: 'Pimpl 有间接访问开销，CRTP 零开销', correct: true, explanation: 'Pimpl 多一次指针间接访问，CRTP 编译时确定' },
        { text: '两者都没有性能影响', correct: false, explanation: 'Pimpl 有微小的间接访问开销' },
        { text: '两者都有很大的性能开销', correct: false, explanation: '两者的开销都很小甚至为零（CRTP）' },
        { text: 'CRTP 有开销，Pimpl 没有', correct: false, explanation: '反过来，CRTP 零开销，Pimpl 有间接访问' },
      ],
    },
    {
      type: 'exposition',
      text: '下一课：SFINAE——C++ 模板黑话的起点。',
    },
    {
      type: 'exposition',
      text: '### Pimpl 再确认\n\n- 结构体 Impl 前置声明在头文件\n- 完整定义在 .cpp\n- `unique_ptr<Impl>` 自动管理内存\n- 析构函数放 .cpp',
    },
    {
      type: 'type-it',
      instruction: '写一个 CRTP 实现运算符重载：',
      code: 'template <typename T>\nclass Comparable {\npublic:\n  bool operator!=(const T& other) const {\n    return !static_cast<const T*>(this)->operator==(other);\n  }\n};\n\nclass Value : public Comparable<Value> {\npublic:\n  int data;\n  Value(int d) : data(d) {}\n  bool operator==(const Value& o) const {\n    return data == o.data;\n  }\n};',
      hints: [
        'Comparable 自动为派生类提供 !=',
        '派生类只需实现 ==',
        'CRTP 的关键是 static_cast 转换 this',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 07（CRTP）：static_cast<T*>(this) 中的 T 是什么？',
      options: [
        { text: '基类类型', correct: false, explanation: 'T 是派生类类型' },
        { text: '派生类类型', correct: true, explanation: 'T 是继承 Base<T> 的那个派生类' },
        { text: 'void*', correct: false, explanation: 'T 是模板参数，不是 void' },
        { text: 'int', correct: false, explanation: 'T 是派生类类型' },
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\nPimpl 是给大型项目减编译时间的利器，CRTP 是给性能敏感场景零开销抽象的利器。两者互补，一个管理物理结构，一个管理逻辑行为。',
    },
    {
      type: 'type-it',
      instruction: '写一个完整 Pimpl 的 CMake 项目结构场景：',
      code: '// timer.h\nclass Timer {\n  struct Impl;\n  unique_ptr<Impl> pImpl;\npublic:\n  Timer();\n  ~Timer();\n  void start();\n  double stop();\n};',
      hints: [
        '头文件只放接口声明',
        'Impl 结构体在 .cpp 中定义',
        'unique_ptr 自动管理内存',
      ],
    },
    {
      type: 'exposition',
      text: '学会区分：Pimpl 是物理上的隐藏（.h vs .cpp），CRTP 是逻辑上的复用（静态多态）。两者都是 C++ 工程化的精髓。',
    },
  ],
}

export default lesson
