import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'atomic-intro',
    chapter: 19,
    title: 'atomic——无锁原子操作',
    subtitle: '读写不被打断',
    description: '学会用 std::atomic 实现无锁的线程安全操作，避免数据竞争。',
    objectives: ['能用 std::atomic 定义原子变量', '能理解原子操作和互斥锁的区别', '能选择 atomic 或 mutex 的适用场景'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '互斥锁能解决数据竞争，但有性能开销。\n如果只是对一个整数做简单的增减操作呢？\n**`std::atomic`——无锁、轻量、线程安全的原子操作。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '```cpp\n#include <atomic>\n\natomic<int> counter(0);  // 原子整数\n\nvoid increment() {\n  for (int i = 0; i < 100000; i++) {\n    counter++;  // 原子自增——安全！\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter.load();  // 一定是 200000\n}\n```\n\n不用锁，没有 lock/unlock，没有死锁风险。',
    },
    {
      type: 'concept-cards',
      instruction: 'atomic 的核心概念：',
      cards: [
        { glyph: '⚛️', term: 'std::atomic<T>', meaning: '原子类型，操作不可分割', example: 'atomic<int>' },
        { glyph: '📥', term: '.load()', meaning: '原子读取当前值', example: 'int x = counter.load()' },
        { glyph: '📤', term: '.store()', meaning: '原子写入新值', example: 'counter.store(42)' },
        { glyph: '🔄', term: 'exchange()', meaning: '原子替换并返回旧值', example: 'int old = c.exchange(5)' },
      ],
    },
    {
      type: 'exposition',
      text: '**atomic 的内部原理**：\n\n普通 `int` 的 `++` 操作是三条指令：\n1. 读取内存到寄存器\n2. 寄存器加 1\n3. 寄存器写回内存\n\n原子 `atomic<int>` 的 `++` 使用特殊的 CPU 指令（如 `lock xadd`），\n**单条指令**完成读→改→写，中间不会被其他线程打断。\n\n这就是"原子"的含义——要么全部完成，要么没做。',
    },
    {
      type: 'exposition',
      text: '**atomic 支持的操作**：\n\n```cpp\natomic<int> a(10);\n\na = 5;            // store\na++;              // 前置自增\n++a;              // 后置自增\na--;              // 自减\na += 3;           // 复合赋值\na -= 2;\na = a + 1;        // ❌ 这不是原子的！\n```\n\n注意：`a = a + 1` 不是原子的！\n它拆成了 `load a → add 1 → store a`，三步又分开了。\n**必须使用 atomic 提供的运算符**。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 atomic 替代 mutex 的计数器：',
      code: '#include <iostream>\n#include <thread>\n#include <atomic>\nusing namespace std;\n\natomic<int> counter(0);\n\nvoid increment() {\n  for (int i = 0; i < 100000; i++) {\n    counter++;\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter.load() << "\\n";\n}',
      hints: ['`atomic<int> counter(0)` 声明原子变量，初始值 0', '`counter++` 是原子操作，不会数据竞争', '`counter.load()` 原子读取当前值'],
    },
    {
      type: 'exposition',
      text: '**atomic 支持的类型**：\n\n```cpp\natomic<bool> flag(false);      // 原子布尔\natomic<int> count(0);          // 原子整数\natomic<long long> big(0);      // 原子 64 位\natomic<double> value(0.0);     // 原子浮点（某些平台）\natomic<int*> ptr(nullptr);     // 原子指针\n\n// 自定义类型（必须是 trivially copyable）\natomic<MyStruct> s;\n```\n\n不是所有类型都可以原子化。\n类型必须是"可平凡复制的"（trivially copyable）。\n对于复杂类型，用 mutex。',
    },
    {
      type: 'exposition',
      text: '**atomic 内存序**（进阶）：\n\n`atomic` 支持不同的内存序（memory order）：\n\n```cpp\natomic<int> a(0);\n\na.store(42, memory_order_release);   // 释放语义\nint x = a.load(memory_order_acquire); // 获取语义\nx = a.fetch_add(1, memory_order_relaxed);  // 宽松\n```\n\n默认使用 `memory_order_seq_cst`（最严格、最安全）。\n一般用默认即可，只在性能敏感场景调内存序。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 atomic 标志控制线程停止的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <atomic>\nusing namespace std;\n\natomic<bool> running(true);\n\nvoid worker() {\n  while (running.load()) {\n    cout << "working...\\n";\n    this_thread::sleep_for(chrono::milliseconds(100));\n  }\n  cout << "stopped\\n";\n}\n\nint main() {\n  thread t(worker);\n  this_thread::sleep_for(chrono::milliseconds(250));\n  running.store(false);\n  t.join();\n}',
      hints: ['`running.load()` 原子读取标志位', '`running.store(false)` 原子设置停止标志', 'while 循环不断检查标志——线程安全且无锁'],
    },
    {
      type: 'code-runner',
      instruction: '运行以下用 atomic 的斐波那契计算：',
      code: '#include <iostream>\n#include <thread>\n#include <atomic>\nusing namespace std;\n\natomic<long long> fib1(0), fib2(1);\n\nvoid calculate() {\n  for (int i = 0; i < 10; i++) {\n    long long v1 = fib1.load();\n    long long v2 = fib2.load();\n    fib1.store(v2);\n    fib2.store(v1 + v2);\n  }\n}\n\nint main() {\n  thread t1(calculate);\n  thread t2(calculate);\n  t1.join();\n  t2.join();\n  cout << "fib1: " << fib1.load() << ", fib2: " << fib2.load() << "\\n";\n}',
      comparison: 'none',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '以下哪个操作对于 `atomic<int>` 是**原子**的？',
      options: [
        { text: 'counter = counter + 1', correct: false, explanation: '这是 load + add + store，三步不是原子的' },
        { text: 'counter++', correct: true, explanation: 'atomic 的 ++ 是原子操作' },
        { text: 'int x = counter', correct: false, explanation: '这等价于 load，是原子的，但问题特指"操作"时要注意' },
        { text: 'counter = counter * 2', correct: false, explanation: '没有提供原子乘，需要手动加锁或用 fetch_add 等' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习第 12 课：`future::get()` 的行为是什么？',
      options: [
        { text: '检查结果是否可用，不可用则返回默认值', correct: false, explanation: 'get() 会阻塞直到结果可用' },
        { text: '阻塞直到结果可用，然后返回', correct: true, explanation: 'get() 会等待异步任务完成' },
        { text: '取消异步任务并返回', correct: false, explanation: 'future 不能取消异步任务' },
        { text: '启动异步任务', correct: false, explanation: '启动任务的是 async，不是 future' },
      ],
    },
    {
      type: 'exposition',
      text: '**atomic vs mutex 选择指南**：\n\n| 场景 | 推荐 | 原因 |\n|------|------|------|\n| 简单计数、标志位 | atomic | 无锁，高性能 |\n| 复合数据结构 | mutex | atomic 不支持复杂类型 |\n| 多个变量需要一起保护 | mutex | 需要事务性更新 |\n| 高性能计数器 | atomic | 比 mutex 快 10-100 倍 |\n| 自定义类型 | mutex | 除非类型可平凡复制 |\n\n核心原则：**能 atomic 就用 atomic，需要复杂保护用 mutex。**',
    },
    {
      type: 'exposition',
      text: '**atomic 的高级操作**：\n\n除了简单的 load/store/++/--，atomic 还提供：\n\n```cpp\natomic<int> a(10);\n\nint old = a.fetch_add(5);   // a += 5，返回旧值 10\nt.exchange(20);               // 替换为 20，返回旧值\nbool ok = a.compare_exchange_weak(old_val, new_val);  // CAS\n```\n\n`compare_exchange_weak`（CAS）是实现无锁数据结构的核心操作。\n它检查当前值是否等于预期值，是则替换，否则更新预期值。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 fetch_add 的原子计数器：',
      code: '#include <iostream>\n#include <thread>\n#include <atomic>\nusing namespace std;\n\natomic<int> counter(0);\n\nvoid work() {\n  for (int i = 0; i < 10000; i++) {\n    counter.fetch_add(1);\n  }\n}\n\nint main() {\n  thread t1(work);\n  thread t2(work);\n  thread t3(work);\n  thread t4(work);\n  t1.join();\n  t2.join();\n  t3.join();\n  t4.join();\n  cout << "Counter: " << counter.load() << " (expected 40000)\\n";\n}',
      hints: ['`fetch_add(1)` 等价于 `counter++`，但返回旧值', '四个线程并发执行，结果始终正确', 'atomic 不需要锁保护——天生线程安全'],
    },
    {
      type: 'exposition',
      text: '**atomic_flag——最轻量的原子标志**：\n\n`std::atomic_flag` 是最简单的原子类型，基于布尔：\n\n```cpp\natomic_flag flag = ATOMIC_FLAG_INIT;\n\nflag.test_and_set();  // 设置标志，返回旧值\nflag.clear();          // 清除标志\n```\n\n它保证是无锁的（lock-free），常用于自旋锁：\n\n```cpp\nvoid spin_lock(atomic_flag& lock) {\n  while (lock.test_and_set(memory_order_acquire)) {\n    // 忙等\n  }\n}\n```',
    },
    {
      type: 'multiple-choice',
      question: '复习第 11 课：以下哪个方法可以唤醒所有等待条件变量的线程？',
      options: [
        { text: 'cv.wake_all()', correct: false, explanation: '条件变量没有 wake_all 方法' },
        { text: 'cv.notify_all()', correct: true, explanation: 'notify_all 唤醒所有等待线程' },
        { text: 'cv.broadcast()', correct: false, explanation: 'C++ 条件变量用 notify_all 不是 broadcast' },
        { text: 'cv.notify_one(true)', correct: false, explanation: 'notify_one 没有参数，只唤醒一个' },
      ],
    },
    {
      type: 'exposition',
      text: '**总结**：\n\n- `std::atomic<T>` 提供无锁的原子操作\n- 不用锁、不用管理生命周期、不会死锁\n- 适用于简单类型：整数、指针、布尔\n- 只使用 atomic 提供的运算符（++, --, += 等）\n- 默认内存序足够安全\n- **atomic + mutex 是 C++ 并发中最重要的两个工具**',
    },
  ],
}

export default lesson
