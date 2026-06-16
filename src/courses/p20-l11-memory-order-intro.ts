import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'memory-order-intro',
    chapter: 21,
    title: '内存序概念',
    subtitle: '指令可能重排',
    description: '理解为什么多线程编程需要内存序——编译器/CPU 可能重排指令。',
    objectives: ['能说出指令重排的原因', '能理解为什么需要内存序', '能区分编译器重排和 CPU 重排'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在多线程编程中，你写下的代码顺序**不一定是实际执行顺序**。\n编译器和 CPU 为了优化性能，可能会**重排指令**。\n这在单线程下没问题，但在多线程下可能导致难以发现的 bug。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '看这个例子：\n`x = 1;`\n`flag = true;`\n\n在单线程中，第二个操作在第一个之后执行。\n但在多线程中，另一个线程看到 `flag == true` 时，\n`x` 可能还是 0！因为这两行可能被重排了。',
      code: 'int x = 0;\nbool flag = false;\n\n// 线程 1\nx = 42;\nflag = true;  // 可能被重排到 x=42 之前\n\n// 线程 2\nif (flag) {\n  cout << x;  // 可能输出 0 而不是 42\n}',
    },
    {
      type: 'concept-cards',
      instruction: '为什么指令会重排？',
      cards: [
        { glyph: '⚙️', term: '编译器优化', meaning: '编译器为了流水线和寄存器使用重排指令', example: '循环展开、常量传播' },
        { glyph: '🧠', term: 'CPU 乱序执行', meaning: 'CPU 为了充分利用执行单元乱序执行指令', example: '加载、计算、存储乱序' },
        { glyph: '📦', term: '缓存一致性', meaning: 'CPU 多级缓存导致写操作对其他核不可见', example: '一个核写，另一核看不到' },
      ],
    },
    {
      type: 'exposition',
      text: '**内存序（Memory Order）** 就是控制指令重排的规则。\nC++ 的 `<atomic>` 库提供了六种内存序模式，\n让你精确控制哪些重排是允许的。\n\n最基本的原则：\n- **同一个线程内**：看起来是按顺序执行的（as-if-serial）\n- **不同线程间**：没有额外同步，就不保证任何顺序',
    },
    {
      type: 'exposition',
      text: '**数据竞争（Data Race）**：\n当两个线程同时访问同一个变量，且至少一个是写操作，\n且没有同步机制时，就发生了数据竞争。\n\nC++ 标准说：**数据竞争是未定义行为**。\n所以正确使用内存序不仅是为了性能，更是为了"正确"。',
    },
    {
      type: 'concept-cards',
      instruction: '三种关键概念：',
      cards: [
        { glyph: '🔄', term: '指令重排', meaning: '编译期/运行期改变指令执行顺序', example: 'x=1 和 flag=1 可能交换' },
        { glyph: '⚠️', term: '数据竞争', meaning: '多线程同时访问同一变量且至少一个写', example: '无同步的并发写' },
        { glyph: '🔒', term: '内存序', meaning: '控制重排的规则，提供同步保证', example: 'acquire / release 语义' },
      ],
    },
    {
      type: 'exposition',
      text: '**一个经典的内存序问题——双重检查锁定**：\n`if (!ptr) { lock; if (!ptr) { ptr = new T; } }`\n\n问题在于 `new T` 的三步可能被重排：\n1. 分配内存\n2. 初始化对象\n3. 赋值给 ptr\n\n如果 2 和 3 重排，另一个线程可能看到 ptr 非空但对象未初始化。',
      code: '// 错误版本\n Singleton* getInstance() {\n   if (!instance) {          // 第一次检查\n     lock_guard l(mutex);\n     if (!instance) {        // 第二次检查\n       instance = new T();   // 可能重排！\n     }\n   }\n   return instance;\n }',
    },
    {
      type: 'multiple-choice',
      question: '指令重排可能导致什么问题？',
      options: [
        { text: '程序编译速度变慢', correct: false, explanation: '重排是优化，通常让程序更快' },
        { text: '多线程下观察到不一致的状态', correct: true, explanation: '重排在不同线程间可能导致逻辑错误' },
        { text: '单线程程序行为异常', correct: false, explanation: '单线程保持 as-if-serial 语义' },
        { text: '程序无法链接', correct: false, explanation: '重排不影响链接' },
      ],
    },
    {
      type: 'exposition',
      text: '**防止重排的工具**：\n\n1. `std::atomic` — 原子操作，默认 `memory_order_seq_cst`\n2. `std::mutex` — 互斥锁，提供完整的同步\n3. `std::atomic_thread_fence` — 内存栅栏\n4. `volatile` — **不能**防止重排（这是常见误解）',
    },
    {
      type: 'exposition',
      text: '**为什么 volatile 不够？**\n`volatile` 告诉编译器：每次都要从内存读取，不要缓存到寄存器。但它**不能**阻止 CPU 的乱序执行。\n在 C++ 中，多线程同步必须用 `std::atomic`。\n\n`volatile` 的用途：嵌入式（内存映射 IO）、信号处理。',
    },
    {
      type: 'multiple-choice',
      question: 'volatile 关键字可以防止指令重排吗？',
      options: [
        { text: '可以，volatile 就是为并发设计的', correct: false, explanation: 'volatile 主要防止寄存器缓存，不防止 CPU 重排' },
        { text: '不能，只能防止编译器缓存到寄存器', correct: true, explanation: 'volatile 不提供内存序保证' },
        { text: '看编译器的具体实现', correct: false, explanation: 'C++ 标准未定义 volatile 的内存序语义' },
        { text: 'volatile 能同时防止编译器和 CPU 重排', correct: false, explanation: '多线程同步应该用 atomic 或 mutex' },
      ],
    },
    {
      type: 'exposition',
      text: '**std::atomic 的基本用法**：\n`std::atomic<int> x{0};`\n`x.store(42, std::memory_order_release);`\n`int v = x.load(std::memory_order_acquire);`\n\n原子操作默认使用最严格的内存序（`seq_cst`），\n保证正确但可能有性能开销。',
      code: '#include <atomic>\n\nstd::atomic<int> counter{0};\n\nvoid increment() {\n  counter.fetch_add(1);  // 原子自增\n}\n\nint main() {\n  increment();\n  cout << counter.load();  // 输出 1\n}',
    },
    {
      type: 'concept-cards',
      instruction: 'atomic 提供的关键操作：',
      cards: [
        { glyph: '💾', term: 'store', meaning: '原子写入，可指定内存序', example: 'x.store(42, release)' },
        { glyph: '📖', term: 'load', meaning: '原子读取，可指定内存序', example: 'x.load(acquire)' },
        { glyph: '🔄', term: 'exchange/ CAS', meaning: '原子交换和比较交换', example: 'x.compare_exchange_weak(old, new)' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 18：mutex 和 atomic 在同步上有什么区别？',
      options: [
        { text: 'mutex 保护临界区，atomic 保护单个变量', correct: true, explanation: 'mutex 用于复杂同步，atomic 用于简单操作' },
        { text: '它们没有区别，可以互换', correct: false, explanation: '用途不同，不能完全互换' },
        { text: 'atomic 比 mutex 慢', correct: false, explanation: 'atomic 通常比 mutex 轻量' },
        { text: 'mutex 是原子操作的基础', correct: false, explanation: '两者是独立的同步原语' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- 编译器和 CPU 为了优化会重排指令\n- 多线程下需要**内存序**来控制重排\n- `std::atomic` 是控制内存序的主要工具\n- `volatile` 不能防止重排\n- 理解内存序是写出正确并发代码的前提',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课具体学习 C++ 提供的六种内存序模式——\n从最宽松的 `relaxed` 到最严格的 `seq_cst`。',
    },
  ],
}

export default lesson
