import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'function-implementation',
    chapter: 21,
    title: 'function 实现',
    subtitle: '小对象优化+虚函数',
    description: '深入 std::function 的完整实现——小对象优化如何避免动态内存分配。',
    objectives: ['能说出小对象优化的作用', '能理解 function 如何管理内存', '能画出 function 的内部结构'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上节课我们看了 `std::function` 的简化原理。\n但真正的 `std::function` 实现要面对一个实际问题：\n**动态内存分配是有成本的**。\n\n为此，标准库实现使用了一个技巧——**小对象优化**（SBO）。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**小对象优化（Small Buffer Optimization, SBO）**：\n如果存储的对象足够小（比如一个 lambda），\n`function` 直接把它存在栈上的缓冲区中，\n避免 `new` / `delete` 的堆分配开销。\n\n如果对象太大，才退回到堆分配。',
      code: '// function 内部大致结构\nclass function {\n  static constexpr size_t BufferSize = 32;\n  alignas(16) char buffer[BufferSize];  // 栈上缓冲区\n  Concept* ptr;  // 指向缓冲区或堆\n  bool isSmall;  // 是否用到了小对象优化\n};',
    },
    {
      type: 'concept-cards',
      instruction: 'function 的两个存储模式：',
      cards: [
        { glyph: '📦', term: '小对象优化', meaning: '对象足够小时存栈上缓冲区，避免堆分配', example: '普通 lambda（通常很小）' },
        { glyph: '🗄️', term: '堆分配', meaning: '对象太大时在堆上分配内存', example: '大 capture 的 lambda' },
        { glyph: '⚡', term: 'SBO 阈值', meaning: '缓冲区大小，通常 16-32 字节', example: '依实现而异' },
      ],
    },
    {
      type: 'exposition',
      text: '小对象优化的关键是：\n- 用一个 `alignas` 对齐的 `char[]` 数组作为缓冲区\n- 如果 T 的大小 <= 缓冲区大小，在缓冲区中原地构造\n- 如果 T 更大，则 `new Model<T>(...)` 在堆上分配\n\n这需要精确的大小判断和 placement new。',
      code: 'template<typename T>\nvoid store(T&& obj) {\n  if constexpr (sizeof(T) <= BufferSize) {\n    // 小对象 → 缓冲区\n    new (&buffer) Model<T>(std::forward<T>(obj));\n    ptr = reinterpret_cast<Concept*>(&buffer);\n    isSmall = true;\n  } else {\n    // 大对象 → 堆\n    ptr = new Model<T>(std::forward<T>(obj));\n    isSmall = false;\n  }\n}',
    },
    {
      type: 'exposition',
      text: '**完整的 function 实现要点**：\n1. 模板构造函数（接受任意可调用类型）\n2. 小对象优化（避免堆分配）\n3. 虚函数调用（invoke）\n4. 拷贝/赋值（考虑 SBO 的深拷贝）\n5. 析构（正确释放资源）',
    },
    {
      type: 'multiple-choice',
      question: '小对象优化解决了什么问题？',
      options: [
        { text: '编译速度慢的问题', correct: false, explanation: 'SBO 不涉及编译速度' },
        { text: '动态内存分配的开销问题', correct: true, explanation: '避免小对象每次使用都 new/delete' },
        { text: '类型安全的问��', correct: false, explanation: 'SBO 不影响类型安全' },
        { text: '多线程安全问题', correct: false, explanation: 'SBO 不涉及线程安全' },
      ],
    },
    {
      type: 'exposition',
      text: '**function 的析构**也需要考虑 SBO：\n- 如果是小对象 → 显式调用析构函数\n- 如果是大对象 → `delete ptr`\n\n拷贝时也需要同样的判断：\n- 小对象 → memcpy 或 placement new\n- 大对象 → new Model<T>(*other)',
      code: '~function() {\n  if (isSmall) {\n    ptr->~Concept();  // 栈上对象，只调用析构\n  } else {\n    delete ptr;  // 堆对象，delete 自动析构\n  }\n}',
    },
    {
      type: 'multiple-choice',
      question: '如果 function 存储一个 lambda 且 lambda 大小为 8 字节，会怎么分配？',
      options: [
        { text: '一定会堆分配', correct: false, explanation: '8 字节小于缓冲区（通常 32 字节），用 SBO' },
        { text: '用栈上缓冲区（SBO）', correct: true, explanation: '小对象，直接在栈上存储' },
        { text: '用全局静态区', correct: false, explanation: '不分配到静态区' },
        { text: '不分配，lambda 不能存 function', correct: false, explanation: 'lambda 可以存进 function' },
      ],
    },
    {
      type: 'exposition',
      text: '**SBO 缓冲区大小**因标准库实现而异：\n- libstdc++（GCC）：16 字节\n- libc++（Clang）：32 字节\n- Microsoft STL：32 字节\n\n所以一个常见的优化是：尽量让 lambda 的捕获列表小一点。\n如果捕获了很多变量，lambda 变大，就会退出 SBO 走堆分配。',
    },
    {
      type: 'type-it',
      instruction: '输入一个演示代码，展示 lambda 大小对 function 的影响：',
      code: '#include <functional>\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int a = 1, b = 2, c = 3;\n  // 小 lambda（捕获少量变量）\n  function<int()> f = [a] { return a; };\n  cout << "小 lambda 调用: " << f() << "\\n";\n  \n  // 大 lambda（捕获多个变量）\n  function<int()> g = [a, b, c] { return a + b + c; };\n  cout << "大 lambda 调用: " << g() << "\\n";\n}',
      hints: [
        '不同大小的 lambda 会影响 SBO 是否生效',
        '捕获的变量越多，lambda 对象越大',
        '超过缓冲区大小会退化为堆分配',
      ],
    },
    {
      type: 'exposition',
      text: '**为什么不用纯虚函数代替 SBO**？\n虚函数只解决调用问题，不解决存储问题。\n你仍然需要为 Model\<T\> 分配内存。\nSBO 正是在"存储"这一层做优化。',
    },
    {
      type: 'multiple-choice',
      question: '以下关于 SBO 的说法，哪个**错误**？',
      options: [
        { text: 'SBO 对小对象避免堆分配', correct: false, explanation: '这是 SBO 的核心目的' },
        { text: 'SBO 对任何大小的对象都生效', correct: true, explanation: 'SBO 只在对象小于缓冲区大小时生效' },
        { text: 'SBO 需要额外管理 isSmall 标记', correct: false, explanation: '确实需要一个标志位区分管理模式' },
        { text: 'SBO 的缓冲区在栈上', correct: false, explanation: '缓冲区是 function 对象的成员，在栈上' },
      ],
    },
    {
      type: 'exposition',
      text: '**总结 std::function 的完整实现层次**：\n\n1. **Concept / Model 模式**：虚函数提供类型擦除\n2. **SBO**：小对象优化避免堆分配\n3. **拷贝语义**：深拷贝时正确处理 SBO / 堆\n4. **移动语义**：转移指针或 memcpy 缓冲区\n5. **异常安全**：保证构造和赋值不泄漏',
    },
    {
      type: 'type-it',
      instruction: '输入一个测量 lambda 大小的程序：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 42;\n  auto lambda1 = [x] { return x; };\n  auto lambda2 = [x, &x] { return x; };  // 引用捕获\n\n  cout << "lambda1 大小: " << sizeof(lambda1) << "\\n";\n  cout << "lambda2 大小: " << sizeof(lambda2) << "\\n";\n  cout << "int* 大小: " << sizeof(int*) << "\\n";\n}',
      hints: [
        '值捕获按值复制变量，影响 lambda 大小',
        '引用捕获本质存指针，通常为 8 字节',
        'sizeof 可以查看 lambda 的实际大小',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：lambda 的大小由什么决定？',
      options: [
        { text: '函数体的代码数量', correct: false, explanation: '函数体是代码段，不占 lambda 对象大小' },
        { text: '捕获列表中的变量数量和类型', correct: true, explanation: '每个值捕获的变量都会成为 lambda 对象的成员' },
        { text: 'lambda 的名字长度', correct: false, explanation: '名字不影响对象大小' },
        { text: '编译器的优化等级', correct: false, explanation: '优化等级不影响对象布局大小' },
      ],
    },
    {
      type: 'exposition',
      text: '现在我们完整理解了 `std::function`：\n- 模板构造函数接收任意可调用对象\n- Concept/Model 虚函数模式做类型擦除\n- SBO 栈缓冲区避免小对象的堆分配\n- 完整的生命周期管理\n\n下一课看 `std::any`——它用类似的思路，但存的是"值"不是"调用"。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
