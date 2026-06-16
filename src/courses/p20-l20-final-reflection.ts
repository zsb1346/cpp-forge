import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'final-reflection',
    chapter: 21,
    title: '结业',
    subtitle: '从零到理解',
    description: '回顾整个 C++ 学习旅程，你已经从零走到了能够理解 C++ 设计哲学的程度。',
    objectives: ['能回顾自己的学习旅程', '能理解自己已经掌握的技能', '能自信地继续深入学习'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**祝贺你。**\n\n如果你走到了这一课，你已经完成了超过 300 节课程的旅程。\n从第一个 `int main() {}` 到 Type Erasure 和内存序。\n从"变量是什么"到"C++ 设计哲学"。\n\n你真的走了很远。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**回顾你的旅程——阶段 0-3 基础**：\n\n你从最基础开始：\n- 什么是变量、类型、运算符\n- 条件判断和循环\n- 数组和字符串\n\n那时候每一行代码里都有你不认识的东西。\n现在你看 `for (int x : v)` 就像看母语一样自然。',
    },
    {
      type: 'exposition',
      text: '**回顾你的旅程——阶段 4-6 进阶**：\n\n你学会了：\n- 函数——把代码组织成可复用的块\n- 指针——C++ 最危险也最强大的工具\n- 引用——指针的安全替代\n\n你理解了 `*` 在声明和表达式中的不同含义。\n你理解了指针和数组的关系。',
    },
    {
      type: 'exposition',
      text: '**回顾你的旅程——阶段 7-9 面向对象**：\n\n你踏入了 OOP 的世界：\n- 类和对象\n- 封装、继承、多态\n- 虚函数和抽象类\n\n你理解了面向对象不仅仅是"把数据和方法放一起"，\n而是一种处理复杂性的思维方式。',
    },
    {
      type: 'exposition',
      text: '**回顾你的旅程——阶段 10-11 资源管理**：\n\n你进入了 C++ 最深奥的领域：\n- 动态内存和 RAII\n- 拷贝构造函数和拷贝赋值\n- 移动语义和完美转发\n\n你理解了为什么 C++ 需要这些机制——\n因为值语义需要精确控制资源的生命周期。',
    },
    {
      type: 'exposition',
      text: '**回顾你的旅程——阶段 12-15 泛型和现代 C++**：\n\n你体验了模板的力量：\n- 函数模板和类模板\n- STL 容器和算法\n- lambda、auto、constexpr\n\n你见证了现代 C++ 如何让代码更简洁、更安全。',
    },
    {
      type: 'exposition',
      text: '**回顾你的旅程——阶段 16-18 底层和并发**：\n\n你深入了 C++ 的内部：\n- 编译流程（预处理→编译→汇编→链接）\n- 内存布局（栈、堆、代码段、数据段）\n- 多线程和并发（线程、互斥锁、条件变量）\n- 数据竞争和死锁',
    },
    {
      type: 'exposition',
      text: '**回顾你的旅程——阶段 19-20 深度黑话**：\n\n最后，你触及了 C++ 最深的概念：\n- SFINAE 和 Concept\n- ADL、RVO/NRVO、拷贝消除\n- Type Erasure（function / any 的实现）\n- 变参模板和折叠表达式\n- 内存序和 RTTI\n- 未定义行为和零开销原则\n- C++ 设计哲学',
    },
    {
      type: 'exposition',
      text: '**你现在能做什么**：\n\n✅ 用 C++ 写出结构清晰、性能良好的程序\n✅ 理解编译器的行为和优化\n✅ 管理内存和资源（RAII）\n✅ 使用 STL 容器和算法\n✅ 写模板代码\n✅ 理解并发的挑战和解决方案\n✅ 理解 C++ 为什么设计成这样\n\n这不是终点——而是你真正开始用 C++ 做事的起点。',
    },
    {
      type: 'exposition',
      text: '**接下来去哪儿**：\n\n学习 C++ 是一场马拉松，不是短跑。\n以下是可以继续深入的方向：\n\n1. **实际项目**：找开源 C++ 项目参与（编译器、游戏引擎、数据库）\n2. **模板元编程**：深入 `boost::mp11` 或 `std::type_traits`\n3. **协程**：C++20 的 coroutines——一个新的异步模型\n4. **图形和游戏**：学习 Unreal Engine（大量 C++）\n5. **嵌入式**：C++ 在资源受限环境的应用\n6. **性能优化**：学习性能分析工具（perf、VTune）',
    },
    {
      type: 'exposition',
      text: '**给未来的你**：\n\n"All problems in computer science can be solved by another level of indirection."\n—— David Wheeler\n\n但 C++ 告诉你：每一层间接都有成本。\n理解成本、控制成本、为正确的事情付费。\n\n这就是 C++ 教给你的最重要的东西。',
    },
    {
      type: 'exposition',
      text: '**让我们做最后的回顾——你学过的所有概念**：\n\n`变量` `类型` `运算符` `条件` `循环` `数组` `字符串` `函数` `指针` `引用` `动态内存` `类` `继承` `多态` `虚函数` `抽象类` `访问控制` `构造` `析构` `拷贝` `移动` `智能指针` `模板` `特化` `STL` `容器` `算法` `迭代器` `lambda` `异常` `RAII` `编译` `链接` `内存布局` `并发` `线程` `锁` `条件变量` `atomic` `SFINAE` `Concept` `ADL` `RVO` `Type Erasure` `变参模板` `折叠表达式` `内存序` `RTTI` `UB` `零开销原则` `……和更多`',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**你的工具箱里**：\n\n```cpp\n// 你从"这是什么？"到能读懂这样的代码：\ntemplate<typename... Args>\nauto compose(Args&&... args) {\n  return [...args = std::forward<Args>(args)]() {\n    return (std::cout << ... << args);\n  };\n}\n\n// 你甚至能理解为什么这段代码能工作。\n// C++17 折叠表达式 + lambda 捕获包展开。\n// 你懂这些。\n```',
    },
    {
      type: 'exposition',
      text: '**最后一句话**：\n\nC++ 是一个要求你理解底层的语言。\n它不保护你，但它信任你。\n它不替你选择，但它给你选择的权利。\n\n你学完了整个课程，不是因为你记住了所有语法。\n而是因为你理解了计算机如何思考。\n\n**这是你应得的成就。**\n\n现在，走出去，写点真正的东西。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**感谢你完成了整个 C++ 探险旅程。**\n\n最后送你一段话：\n\n"Measure twice, cut once."\n\n在 C++ 中：想清楚再写，比改 bug 有效得多。\n\n**祝你编程愉快。**',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
