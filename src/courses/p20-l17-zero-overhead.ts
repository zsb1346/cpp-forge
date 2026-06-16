import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'zero-overhead',
    chapter: 21,
    title: '零开销原则',
    subtitle: '不用不付钱',
    description: '理解 C++ 的核心设计哲学——你不使用的功能不需要付出任何代价。',
    objectives: ['能说出零开销原则的含义', '能举例说明 C++ 中的零开销抽象', '能理解零开销原则和 UB 的关系'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**零开销原则（Zero-Overhead Principle）**\n是 C++ 设计哲学的核心。\n由 C++ 之父 Bjarne Stroustrup 提出：\n\n**"你不需要为没有使用的特性付出任何代价。"**\n**"你使用的特性，也不能比手写代码更慢。"**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '这个原则有两层含义：\n\n1. **"不用不付钱"**：没用到的语言特性不会产生额外开销\n2. **"用多少付多少"**：用到的特性应该和手写优化的 C 代码一样快\n\n这不是"承诺"，而是 C++ 设计的**指导原则**。\n也是一个持续追求的目标。',
    },
    {
      type: 'concept-cards',
      instruction: '零开销原则的两个方面：',
      cards: [
        { glyph: '💰', term: '不用不付', meaning: '没用到的特性不产生开销', example: '没用虚函数就不需要 vtable' },
        { glyph: '⚖️', term: '用了也不亏', meaning: '和手写优化等价甚至更快', example: 'std::sort 比手写快' },
        { glyph: '🎯', term: '抽象不贵', meaning: '高级抽象可以零开销', example: '模板在编译期展开' },
      ],
    },
    {
      type: 'exposition',
      text: '**"不用不付"的例子**：\n\n- **虚函数**：没写 `virtual`，就没有 vtable，没有运行时开销\n- **异常**：不用 `try/catch`，就没有异常表的开销\n- **RTTI**：不用 `dynamic_cast`，就没有 type_info 的开销（关闭 -fno-rtti）\n- **模板**：不用就不会被实例化',
    },
    {
      type: 'exposition',
      text: '**"用了也不亏"的例子**：\n\n- `std::sort` 比手写快：因为编译器可以内联比较器\n- `std::array` 和原生数组完全一样快\n- lambda 表达式和手写函数对象一样快\n- 智能指针 `std::unique_ptr` 等于裸指针加自动 delete',
      code: '// std::sort 比手写循环快\n #include <algorithm>\n std::sort(v.begin(), v.end());  // 编译器高度优化\n\n // std::array 零开销\n std::array<int, 5> a = {1, 2, 3, 4, 5};\n // 和 int a[5] 完全相同的性能',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是"不用不付"的例子？',
      options: [
        { text: '模板代码不管用不用都会被编译', correct: false, explanation: '模板在实例化时才生成代码' },
        { text: '不写虚函数的类不会产生 vtable 开销', correct: true, explanation: '没有虚函数 → 没有 vtable → 零额外开销' },
        { text: '异常处理总是有运行时开销', correct: false, explanation: '不用异常时不需要付出异常处理的运行时开销' },
        { text: '智能指针总是比裸指针慢', correct: false, explanation: 'unique_ptr 零开销，和裸指针一样快' },
      ],
    },
    {
      type: 'exposition',
      text: '**零开销原则和 C 语言**：\n\nC++ 的一个重要目标是：\n用 C++ 写的代码不比对应的 C 代码慢。\n\n这就是为什么 C++ 保留了 C 的底层能力（指针、手动内存管理）。\n但同时也提供了更安全的抽象——\n理想情况下，这些抽象在编译后和手写 C 代码一样快。',
    },
    {
      type: 'exposition',
      text: '**零开销原则的挑战**：\n\n并非所有 C++ 特性都完美实现了零开销：\n\n- **异常**：即使不抛异常，也可能有极小开销（栈展开信息）\n- **`dynamic_cast`**：不是零开销，需要运行时检查\n- **`std::shared_ptr`**：有原子引用计数的开销\n- **虚函数**：一次间接跳转的开销（相比直接调用）',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个 C++ 特性**不**符合零开销原则？',
      options: [
        { text: 'std::unique_ptr', correct: false, explanation: 'unique_ptr 在优化后等于裸指针' },
        { text: 'std::shared_ptr', correct: true, explanation: 'shared_ptr 有原子引用计数的运行时开销' },
        { text: 'std::array', correct: false, explanation: 'array 和原生数组性能相同' },
        { text: '函数模板', correct: false, explanation: '模板实例化后和手写代码相同' },
      ],
    },
    {
      type: 'exposition',
      text: '**为什么 C++ 能实现零开销**？\n\n核心机制：**编译期计算**。\n\n- 模板在编译期实例化\n- `constexpr` 在编译期求值\n- 内联函数在编译期展开\n- lambda 在编译期生成函数对象\n\n所有这些"高级抽象"都在编译期消解为底层代码。\n运行时看到的和手写的汇编一样。',
    },
    {
      type: 'type-it',
      instruction: '输入一个代码，展示编译期计算（constexpr）如何实现零开销：',
      code: '#include <iostream>\nusing namespace std;\n\nconstexpr int square(int x) {\n  return x * x;\n}\n\nint main() {\n  constexpr int val = square(5);  // 编译期计算\n  cout << val << "\\n";\n}',
      hints: [
        'constexpr 在编译期求值',
        'square(5) 在编译期就算出 25',
        '运行时就是直接输出 25，没有函数调用',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：模板实例化在什么时候发生？',
      options: [
        { text: '运行时', correct: false, explanation: '模板是编译期机制' },
        { text: '编译期', correct: true, explanation: '模板在编译期实例化生成具体代码' },
        { text: '链接期', correct: false, explanation: '模板实例化在编译期，但特化版本也会在链接期处理' },
        { text: '预处理期', correct: false, explanation: '模板实例化发生在编译阶段，不是预处理' },
      ],
    },
    {
      type: 'exposition',
      text: '**零开销原则对 C++ 设计的影响**：\n\n1. **没有隐式的垃圾回收**——因为会带来不可预测的开销\n2. **没有隐式的边界检查**——因为每次都检查太贵\n3. **手动内存管理**——因为你可能不需要 GC\n4. **值语义**——你可以控制对象的生命周期\n\n这些不是"C++ 的缺陷"——而是**有意的设计选择**。',
    },
    {
      type: 'multiple-choice',
      question: 'C++ 为什么没有内置垃圾回收？',
      options: [
        { text: '因为 C++ 开发者不知道什么是 GC', correct: false, explanation: '这是有意的设计决策' },
        { text: '因为 GC 会违背零开销原则（不用也要付钱）', correct: true, explanation: 'GC 的运行时开销即使不分配内存也存在' },
        { text: '因为 C++ 不需要内存管理', correct: false, explanation: 'C++ 需要手动管理或 RAII' },
        { text: '因为 GC 无法实现', correct: false, explanation: 'GC 可以实现，但会违背 C++ 的设计哲学' },
      ],
    },
    {
      type: 'exposition',
      text: '**零开销原则 vs 易用性**：\n\n零开销原则有时和"易用性"冲突：\n- 没有 GC → 需要 RAII 和智能指针\n- 没有边界检查 → 可能写出 UB\n- 手动内存管理 → 可能泄漏\n\nC++ 的选择是：**把选择权交给你**。\n你可以在需要时加上安全层（如 `at()`），\n在需要性能时用零开销版本（如 `operator[]`）。',
    },
    {
      type: 'type-it',
      instruction: '输入一个代码，对比 std::array 和原生数组的性能等价性：',
      code: '#include <iostream>\n#include <array>\nusing namespace std;\n\nint main() {\n  // std::array（高级抽象）\n  array<int, 5> a = {1, 2, 3, 4, 5};\n  \n  // 原生数组（手写）\n  int b[5] = {1, 2, 3, 4, 5};\n  \n  // 两种方式生成的汇编代码相同\n  cout << a[0] << " " << b[0] << "\\n";\n}',
      hints: [
        'array 是零开销抽象',
        '和原生数组编译后代码相同',
        '但 array 提供了更安全的接口',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：内联函数如何帮助实现零开销？',
      options: [
        { text: '内联函数让代码更短', correct: false, explanation: '内联可能增加代码大小' },
        { text: '内联函数避免函数调用开销', correct: true, explanation: '函数调用在调用点展开，消除调用开销' },
        { text: '内联函数只能用于短函数', correct: false, explanation: '内联不保证一定内联，但有助于优化' },
        { text: '内联函数是运行时优化', correct: false, explanation: '内联发生在编译期' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n**零开销原则 = 不用不付钱 + 用了不亏钱**。\n\n这是 C++ 区别于其他语言的核心哲学：\n你得到的抽象能力不牺牲性能。\n\n但这个原则也有代价：\n- 语言更复杂\n- 安全需要你自己负责\n- 学习曲线更陡峭\n\n下一课我们看零开销原则的另一个角度——**"用多少付多少"**。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
