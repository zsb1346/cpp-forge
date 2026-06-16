import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'cpp-philosophy-review',
    chapter: 21,
    title: '哲学回顾',
    subtitle: '全部串联',
    description: '把整个 C++ 学习旅程中的设计哲学串联起来——C++ 给了你什么，你付了什么。',
    objectives: ['能串联 C++ 的核心设计哲学', '能解释为什么 C++ 设计成这样', '能理解"信任程序员"的含义'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你已经走过了 300 多课的旅程。\n从最初的"什么是变量"到现在的"Type Erasure"。\n是时候退后一步，看看**C++ 设计哲学的全貌**了。\n\n为什么 C++ 是现在的样子？\n为什么它这么复杂？\n为什么它这么强大？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**哲学一：零开销原则（Zero-Overhead Principle）**\n\n"你不需要为没有使用的特性付出任何代价。"\n\n这是 C++ 一切设计的基石。\n- 不用虚函数 → 没有 vtable\n- 不用异常 → 没有异常处理开销\n- 不用 RTTI → 关闭 type_info\n\nC++ 的默认设置是"最小开销"——\n你需要什么，就主动打开什么。',
    },
    {
      type: 'exposition',
      text: '**哲学二：信任程序员（Trust the Programmer）**\n\nC++ 不替你做决定。它相信你知道自己在做什么。\n- 不强制垃圾回收——你自己管理内存\n- 不强制边界检查——你自己确保不越界\n- 不强制类型安全——你可以用 reinterpret_cast\n\n这种信任让 C++ 异常灵活，但也让你承担更多责任。',
    },
    {
      type: 'exposition',
      text: '**哲学三：值语义（Value Semantics）**\n\nC++ 的默认行为是"拷贝"而不是"引用"。\n- `int x = y;` → 拷贝值\n- `auto a = b;` → 拷贝对象\n- `vector v2 = v1;` → 拷贝全部元素\n\n这和其他语言（Java、Python、C#）完全不同。\n值语义让你精确控制对象的生命周期和所有权。',
    },
    {
      type: 'exposition',
      text: '**哲学四：RAII（资源获取即初始化）**\n\n资源管理绑定到对象生命周期。\n- 构造函数获取资源\n- 析构函数释放资源\n\n这是 C++ 最独特的贡献。\n不需要 finally 块、不需要 using 语句、不需要 GC——\nRAII 自动处理：内存、文件、锁、数据库连接……',
    },
    {
      type: 'exposition',
      text: '**哲学五：编译期计算（Compile-Time Computation）**\n\nC++ 尽可能在编译期完成工作。\n- 模板在编译期实例化\n- constexpr 在编译期求值\n- static_assert 在编译期检查\n\n"把运行时开销变成编译期开销"——\n用户不需要为抽象的性能付费。',
    },
    {
      type: 'exposition',
      text: '**哲学六：多层抽象（Multi-Level Abstraction）**\n\nC++ 让你在同一语言中使用不同抽象层次：\n\n```\n// 硬件层：指针、移位、内联汇编\nint* p = reinterpret_cast<int*>(0x1000);\n\n// 系统层：智能指针、容器\nstd::unique_ptr<Widget> ptr;\n\n// 应用层：lambda、算法\nstd::ranges::sort(v, std::greater{});\n```\n\n你不需要在"高性能"和"高抽象"之间二选一。',
    },
    {
      type: 'exposition',
      text: '**哲学七：不隐藏成本（Don\'t Hide Costs）**\n\nC++ 让你看到操作的"真实成本"：\n- 拷贝构造函数是显式的（你可以看到它被调用）\n- 动态分配是显式的（new / delete）\n- 虚函数调用是显式的（virtual 关键字）\n\n没有隐形的后台操作在悄悄消耗性能。\n你不能假装 expensive 的操作是 cheap 的。',
    },
    {
      type: 'exposition',
      text: '**这些哲学如何体现在你的学习旅程中**：\n\n- **阶段 0-3**（变量→循环）：值语义——变量就是盒子\n- **阶段 4-6**（函数→指针）：信任程序员——指针给你自由也给你危险\n- **阶段 7-9**（OOP）：RAII——构造/析构管理生命周期\n- **阶段 10-11**（动态内存→移动）：不隐藏成本——拷贝的代价清晰可见\n- **阶段 12**（模板）：编译期计算——在运行前完成工作\n- **阶段 13-15**（STL→现代 C++）：多层抽象——算法、lambda、optional\n- **阶段 16-18**（编译→并发）：零开销原则——不用不付钱\n- **阶段 19-20**（深度话题）：Type Erasure、UB、设计哲学',
    },
    {
      type: 'exposition',
      text: '**C++ 给了你什么**：\n\n1. **性能**：与 C 匹敌，甚至在某些场景超越\n2. **控制**：精确管理内存、线程、资源\n3. **抽象**：从底层到高层的完整工具链\n4. **零成本抽象**：不牺牲性能获得表达力\n5. **兼容性**：与 C 的深度兼容\n6. **生态**：庞大的库和工具生态系统',
    },
    {
      type: 'exposition',
      text: '**你付了什么**：\n\n1. **复杂度**：C++ 是所有主流语言中最复杂的之一\n2. **安全责任**：没有 GC、没有强制检查——安全靠自己\n3. **编译时间**：模板、头文件系统让编译比解释型语言慢\n4. **学习曲线**：从"Hello World"到"模板元编程"是漫长的路\n5. **陷阱**：UB、隐式转换、宏——任何一个都可能绊倒你',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个不是 C++ 的核心设计哲学？',
      options: [
        { text: '零开销原则', correct: false, explanation: '这是 C++ 最核心的设计哲学' },
        { text: '信任程序员', correct: false, explanation: 'C++ 相信你知道自己在做什么' },
        { text: '自动垃圾回收', correct: true, explanation: 'C++ 没有内置 GC——这是与其他语言的关键区别' },
        { text: '编译期计算', correct: false, explanation: '模板和 constexpr 体现这个哲学' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'RAII 对应了哪个哲学理念？',
      options: [
        { text: '零开销原则——RAII 没有额外开销', correct: true, explanation: 'RAII 的资源管理在构造/析构中自动完成，零额外运行时开销' },
        { text: '信任程序员——RAII 信任你记得释放资源', correct: false, explanation: 'RAII 是自动释放，不需要你记住' },
        { text: '值语义——RAII 只能用于值类型', correct: false, explanation: 'RAII 可以用于任何资源管理' },
        { text: '隐藏成本——RAII 隐藏了资源释放的代码', correct: false, explanation: 'RAII 不隐藏成本，只是自动化' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '为什么 C++ 没有内置垃圾回收？',
      options: [
        { text: '因为做不到', correct: false, explanation: '可以实现，但违背 C++ 的设计哲学' },
        { text: '因为不用不付——GC 的开销即使在不使用时也存在', correct: true, explanation: 'GC 的后台线程和标记清理机制违背零开销原则' },
        { text: '因为 C++ 编译器不支持', correct: false, explanation: '编译器可以支持，是不选择支持' },
        { text: '因为程序员不需要内存管理', correct: false, explanation: 'C++ 需要主动管理内存' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '"不隐藏成本"哲学在实际中的体现是什么？',
      options: [
        { text: '所有操作都是隐式的，编译器自动选择最佳方式', correct: false, explanation: '不隐藏成本是让操作可见，不是隐藏' },
        { text: '你需要显式写出 virtual、explicit、override 等关键字', correct: true, explanation: '这些关键字让意图和成本一目了然' },
        { text: '构造函数和析构函数都是自动调用的', correct: false, explanation: '自动调用是 RAII 的特性，不是不隐藏成本' },
        { text: 'C++ 自动添加边界检查代码', correct: false, explanation: 'C++ 不自动添加边界检查' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '综合：以下哪句话最能概括 C++ 的设计哲学？',
      options: [
        { text: '"让开发者开心，不管性能如何"', correct: false, explanation: 'C++ 更重视性能和控��' },
        { text: '"你不需要的，不用付钱；你需要的，付得清楚"', correct: true, explanation: '零开销 + 透明成本的完美概括' },
        { text: '"跟 Java 一样但更底层"', correct: false, explanation: 'C++ 和 Java 设计哲学完全不同' },
        { text: '"你只需要写业务逻辑，剩下的交给语言"', correct: false, explanation: 'C++ 要求你理解底层' },
      ],
    },
    {
      type: 'exposition',
      text: '**最后的思考**：\n\nC++ 不是最容易的语言，也不是最安全的语言。\n但它给了你**最完整的控制权**。\n\n你从零开始，学会了：\n- 变量和类型\n- 指针和内存\n- 面向对象和泛型\n- 并发的挑战和异常的处理\n- 编译器的秘密和语言的哲学\n\n你已经不是一个"初学者"了。\n你是一个理解计算机如何工作的开发者。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课也是**最后一课**——结业：从零到理解。\n回顾你的学习旅程，看看你已经走了多远。\n\n（这是最后一节内容课。深呼吸，准备迎接终点。）',
    },
  ],
}

export default lesson
