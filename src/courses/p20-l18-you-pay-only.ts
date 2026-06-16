import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'you-pay-only',
    chapter: 21,
    title: '用多少付多少',
    subtitle: '抽象不是免费但可选',
    description: '深化零开销原则——C++ 让你只为你使用的抽象付费，而且付费的部分高度优化。',
    objectives: ['能解释"用多少付多少"的含义', '能区分可选的付费和强制的开销', '能理解 C++ 的设计取舍'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '零开销原则的第一部分是"不用不付"。\n第二部分是**"用多少付多少"**。\n\n意思是：如果你使用某个特性，你确实要为它"付费"。\n但这个费用和你手写优化代码一样低——\n而且**你只为你实际使用的部分付费**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**"用多少付多少"的直观例子**：\n\n- **`std::vector`**：你为动态扩容付费，但只有在扩容时才付\n- **`std::shared_ptr`**：你为引用计数付费，但只在拷贝时才增加开销\n- **虚函数**：你为动态分发付费，但只在调用虚函数时\n\n关键点：**开销和功能一起出现**，没有隐形的后台成本。',
    },
    {
      type: 'concept-cards',
      instruction: '"用多少付多少"的对比：',
      cards: [
        { glyph: '💰', term: 'std::vector', meaning: '只为动态扩容和内存管理付费', example: '扩容时才分配' },
        { glyph: '🔗', term: 'std::shared_ptr', meaning: '只为引用计数（原子操作）付费', example: '拷贝时原子递增' },
        { glyph: '🎭', term: '虚函数', meaning: '只为动态分发（间接跳转）付费', example: '调用时查 vtable' },
      ],
    },
    {
      type: 'exposition',
      text: '**和 Java 的对比**：\n\n在 Java 中：\n- 所有对象都在堆上分配（包括小对象），有 GC 开销\n- 所有方法默认是虚的（final 才不是）\n- 数组访问总做边界检查\n\n在 C++ 中：\n- 对象默认在栈上（零堆分配）\n- 方法默认非虚（零分发开销）\n- 数组访问不做边界检查\n\n这就是"用多少付多少"——默认零开销，需要时才加功能。',
    },
    {
      type: 'multiple-choice',
      question: 'C++ 中方法默认不是虚函数，这是"用多少付多少"的例子吗？',
      options: [
        { text: '不是，这只是语法设计', correct: false, explanation: '这是有意为之：不用多态就不付虚函数调用的开销' },
        { text: '是的，不需要多态时就没有 vtable 开销', correct: true, explanation: '默认非虚 = 不用不付' },
        { text: '虚函数没有开销，所以无所谓', correct: false, explanation: '虚函数有间接跳转开销和 vtable 内存开销' },
        { text: 'Java 的方法默认虚更好', correct: false, explanation: '这是设计取舍，不是好坏' },
      ],
    },
    {
      type: 'exposition',
      text: '**"可选抽象"的例子**：\n\nC++ 让你在不同抽象层次间自由切换：\n\n```\n// 层次 1：手写循环\nfor (int i = 0; i < n; ++i) sum += arr[i];\n\n// 层次 2：算法\nsum = std::accumulate(arr, arr + n, 0);\n\n// 层次 3：范围\nsum = std::ranges::fold_left(arr, 0, std::plus{});\n```\n\n三个层次的性能相同（编译器优化后）。\n区别在于**你付了多少"抽象税"**——答案是零。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个体现了"可选抽象"的设计？',
      options: [
        { text: '可以用指针、unique_ptr 或 shared_ptr 管理同一资源', correct: true, explanation: '你可以根据需要选择不同抽象级别的内存管理' },
        { text: '所有变量都必须初始化', correct: false, explanation: '这是安全性要求，不是可选抽象' },
        { text: '所有循环都必须用 for', correct: false, explanation: '循环有多种写法，但不体现可选抽象' },
        { text: '所有类型都必须指定', correct: false, explanation: 'auto 可选，但这是类型推导' },
      ],
    },
    {
      type: 'exposition',
      text: '**"用多少付多少"的负面影响**：\n\n当你**确实需要**某个功能时，费用是明确的：\n\n- 需要多态 → 加 virtual，付 vtable 开销\n- 需要共享所有权 → 用 shared_ptr，付原子计数开销\n- 需要异常安全 → 用 RAII，付析构函数调用开销\n\n这些开销是**可预测的**、**透明的**。\n不会出现"不知道为什么突然慢了"的情况。',
    },
    {
      type: 'exposition',
      text: '**"付费"不一定是坏事**：\n\n`std::shared_ptr` 确实比裸指针慢（原子操作）。\n但这是合理的"付费"——你得到的是：\n- 自动内存管理\n- 安全的共享所有权\n- 不会内存泄漏\n\n如果不需要这些，用 `unique_ptr` 或裸指针——零额外开销。',
    },
    {
      type: 'type-it',
      instruction: '输入一个对比三种指针管理方式的代码：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nstruct Widget {\n  int id;\n  Widget(int i) : id(i) {}\n};\n\nint main() {\n  // 裸指针：零开销\n  Widget* raw = new Widget(1);\n  cout << raw->id << "\\n";\n  delete raw;\n\n  // unique_ptr：零开销\n  auto uni = make_unique<Widget>(2);\n  cout << uni->id << "\\n";\n\n  // shared_ptr：有引用计数开销\n  auto sh = make_shared<Widget>(3);\n  cout << sh->id << "\\n";\n}',
      hints: [
        '裸指针和 unique_ptr 性能相同',
        'shared_ptr 有原子操作开销',
        '你选择 = 你付费',
      ],
    },
    {
      type: 'multiple-choice',
      question: '使用 shared_ptr 的"付费"具体是指什么？',
      options: [
        { text: '多写几行代码', correct: false, explanation: '这不是性能开销' },
        { text: '原子引用计数的加减操作', correct: true, explanation: '每次拷贝/销毁 shared_ptr 都涉及原子操作' },
        { text: '内存泄漏', correct: false, explanation: 'shared_ptr 防止内存泄漏' },
        { text: '编译速度变慢', correct: false, explanation: '编译速度影响存在，但"付费"主要指运行时' },
      ],
    },
    {
      type: 'exposition',
      text: '**"用多少付多少"和"0 开销"的关系**：\n\n实际上，C++ 的抽象**不是完全免费的**。\n即使是零开销抽象，也有"编译期成本"（模板实例化）和"心智成本"。\n\n真正的含义是：\n你可以**选择**是否承担这个成本。\n如果你不需要这个抽象，就不承担。',
    },
    {
      type: 'exposition',
      text: '**C++ 中的"隐藏成本"**：\n\n虽然 C++ 极力追求零开销，但有些成本确实存在：\n\n1. **编译时间**：模板、头文件、复杂类型\n2. **二进制大小**：模板实例化可能导致代码膨胀\n3. **心智负担**：需要理解底层机制\n\n这些成本在你"使用"时产生——\n符合"用多少付多少"的原则。',
    },
    {
      type: 'multiple-choice',
      question: '使用模板的主要"隐藏成本"是什么？',
      options: [
        { text: '运行时性能下降', correct: false, explanation: '模板通常不会影响运行时性能' },
        { text: '编译时间增加和二进制膨胀', correct: true, explanation: '模板实例化需要编译时间，且可能产生大量代码' },
        { text: '可执行文件无法运行', correct: false, explanation: '不会影响运行' },
        { text: '内存泄漏', correct: false, explanation: '模板不涉及内存泄漏' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个展示 C++ 不同抽象层次的代码：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 1, 4, 1, 5};\n  \n  // 层次 1：手写\n  int s1 = 0;\n  for (size_t i = 0; i < v.size(); ++i)\n    s1 += v[i];\n  \n  // 层次 2：范围 for（更高级）\n  int s2 = 0;\n  for (int x : v)\n    s2 += x;\n  \n  cout << s1 << " " << s2 << "\\n";\n}',
      hints: [
        '手写和范围 for 性能相同',
        '编译器把范围 for 转化为迭代器循环',
        '两个层次的"付费"相同',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个最准确描述 C++ 的"用多少付多少"哲学？',
      options: [
        { text: 'C++ 的所有特性都是免费的', correct: false, explanation: '不是免费的，但你能选择不用' },
        { text: '你可以精确控制使用哪些特性并承担对应的成本', correct: true, explanation: '成本透明，选择在你' },
        { text: 'C++ 不让你控制成本的产生', correct: false, explanation: 'C++ 的一大特点就是精确控制' },
        { text: '所有特性都有相同成本', correct: false, explanation: '不同特性成本不同' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n\n**零开销原则 + 用多少付多少 = C++ 的性能哲学**。\n\n- 你不用某个功能 → 不付钱\n- 你用了 → 付明确可预测的钱\n- 你选择不用 → 你可以手写优化\n\n这就是为什么 C++ 既能写出高级抽象，\n又能用于嵌入式系统和游戏引擎——\n它在每一个层面上都尊重你的选择。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课是**C++ 设计哲学回顾**——我们把整个旅程中看到的所有理念串联起来。\n这是一堂特别的课，回头看你已经走了多远。',
    },
  ],
}

export default lesson
