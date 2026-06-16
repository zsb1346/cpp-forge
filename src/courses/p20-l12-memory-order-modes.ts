import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'memory-order-modes',
    chapter: 21,
    title: '内存序模式',
    subtitle: 'relaxed/acquire/release/seq_cst',
    description: '学习 C++ 的六种内存序模式，从最宽松到最严格。',
    objectives: ['能区分六种内存序模式', '能理解 acquire/release 配对语义', '能选择合适的内存序模式'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'C++ `<atomic>` 库定义了六种内存序模式。\n它们从最宽松到最严格排列：\n`relaxed` → `consume` → `acquire` → `release` → `acq_rel` → `seq_cst`。\n\n实际开发中最常用的是：`relaxed`、`acquire`、`release`、`seq_cst`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**1. memory_order_relaxed**（最宽松）\n- 不提供任何同步或顺序保证\n- 只保证操作本身是原子的\n- 周围的读写仍然可以自由重排\n\n适合场景：计数器（只关心最终值正确）',
      code: 'std::atomic<int> counter{0};\n\n// 多个线程同时调用\nvoid increment() {\n  counter.fetch_add(1, std::memory_order_relaxed);\n}\n// 最终 counter 的值是正确的\n// 但单个线程的增量顺序对其他线程不可见',
    },
    {
      type: 'concept-cards',
      instruction: '六种内存序的保证强度：',
      cards: [
        { glyph: '🟢', term: 'relaxed', meaning: '只保证原子性，不保证顺序', example: '计数器' },
        { glyph: '🟡', term: 'acquire', meaning: '保证之后的读写不会重排到此之前', example: '读取标志' },
        { glyph: '🟠', term: 'release', meaning: '保证之前的读写不会重排到此之后', example: '写入标志' },
        { glyph: '🔴', term: 'seq_cst', meaning: '全局一致顺序，所有线程看到相同顺序', example: '默认模式' },
      ],
    },
    {
      type: 'exposition',
      text: '**2. memory_order_acquire 和 memory_order_release**\n\n这是最常用的**配对模式**：\n- **release**：写入操作。之前的所有写入都不能被重排到 release 之后\n- **acquire**：读取操作。之后的所有读取都不能被重排到 acquire 之前\n\n配对使用：一个线程 release，另一个线程 acquire，建立**happens-before** 关系。',
      code: 'std::atomic<bool> ready{false};\nint data = 0;\n\n// 线程 1 — 生产者\ndata = 42;                         // 数据准备\nready.store(true, release);        // 发布标志\n\n// 线程 2 — 消费者\nif (ready.load(acquire)) {         // 获取标志\n  cout << data;                    // 保证看到 42\n}',
    },
    {
      type: 'multiple-choice',
      question: 'release-acquire 配对的目的是什么？',
      options: [
        { text: '让两个线程同时运行得更快', correct: false, explanation: '目的是保证顺序，不是性能' },
        { text: '一个线程的写入对另一个线程可见并保证顺序', correct: true, explanation: 'release-acquire 建立 happens-before 关系' },
        { text: '防止编译错误', correct: false, explanation: '是运行时语义，不是编译时' },
        { text: '让变量自动初始化', correct: false, explanation: '不是初始化相关' },
      ],
    },
    {
      type: 'exposition',
      text: '**release 的语义**：\n所有在 release 操作**之前**的普通写操作，\n对于执行相应 acquire 的线程是**可见**的。\n\n可以理解为：release 把之前写的内容"推出"到其他线程可见。\nacquire 把其他线程 release 的内容"拉入"当前线程可见。',
    },
    {
      type: 'exposition',
      text: '**3. memory_order_acq_rel**\n\n结合 acquire 和 release：\n- 之前的写对其他线程可见（release）\n- 其他线程的写对当前线程可见（acquire）\n\n通常用于 read-modify-write 操作（如 fetch_add、exchange）。',
    },
    {
      type: 'exposition',
      text: '**4. memory_order_seq_cst**（最严格）\n\n- 默认模式（不指定时使用）\n- 保证所有线程看到**完全相同的全局顺序**\n- 最直观但也是性能最贵的\n\n如果你的场景不确定用哪个，用 `seq_cst`——它最安全。',
      code: 'std::atomic<int> x{0}, y{0};\n\n// 线程 1\nx.store(1, seq_cst);\n\n// 线程 2\ny.store(1, seq_cst);\n\n// 线程 3\ncout << x.load(seq_cst) << y.load(seq_cst);\n\n// 线程 4\ncout << y.load(seq_cst) << x.load(seq_cst);\n\n// 所有线程看到的 x/y 写入顺序一致',
    },
    {
      type: 'multiple-choice',
      question: '不指定内存序时，std::atomic 默认使用什么模式？',
      options: [
        { text: 'relaxed', correct: false, explanation: '默认是 seq_cst' },
        { text: 'seq_cst', correct: true, explanation: '默认最严格的内存序，保证全局一致性' },
        { text: 'acquire', correct: false, explanation: '不是默认模式' },
        { text: 'release', correct: false, explanation: '不是默认模式' },
      ],
    },
    {
      type: 'exposition',
      text: '**选择内存序的指导原则**：\n\n1. 不确定时用 `seq_cst`——最安全\n2. 性能关键场景考虑降级到 `acquire/release`\n3. 只有计数器场景用 `relaxed`\n4. `consume` 很少用（目前编译器基本把它当作 acquire）',
    },
    {
      type: 'type-it',
      instruction: '输入一个使用 acquire/release 配对的例子：',
      code: '#include <atomic>\n#include <thread>\n#include <iostream>\nusing namespace std;\n\natomic<bool> ready{false};\nint value = 0;\n\nvoid producer() {\n  value = 42;\n  ready.store(true, memory_order_release);\n}\n\nvoid consumer() {\n  while (!ready.load(memory_order_acquire)) {}\n  cout << value << "\\n";\n}\n\nint main() {\n  thread t1(producer), t2(consumer);\n  t1.join(); t2.join();\n}',
      hints: [
        'producer release 发布 ready',
        'consumer acquire 等待 ready',
        'value 的写入在 ready 之前，保证可见',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下关于 relaxed 内存序的说法，哪个**正确**？',
      options: [
        { text: 'relaxed 保证所有线程看到相同的操作顺序', correct: false, explanation: 'relaxed 不提供顺序保证' },
        { text: 'relaxed 只保证原子操作本身的原子性', correct: true, explanation: 'relaxed = 原子性，无顺序保证' },
        { text: 'relaxed 比普通非原子操作还慢', correct: false, explanation: 'relaxed 几乎和普通操作一样快' },
        { text: 'relaxed 能防止编译器重排', correct: false, explanation: 'relaxed 不能防止重排' },
      ],
    },
    {
      type: 'exposition',
      text: '**example：自旋锁实现**\n\nacquire/release 最常见的应用就是实现简单锁：\n\n```\nclass SpinLock {\n  atomic<bool> locked{false};\npublic:\n  void lock() {\n    while (locked.exchange(true, acquire)) {}\n  }\n  void unlock() {\n    locked.store(false, release);\n  }\n};\n```',
    },
    {
      type: 'type-it',
      instruction: '输入一个简单的自旋锁实现：',
      code: '#include <atomic>\n#include <thread>\n#include <iostream>\nusing namespace std;\n\nclass SpinLock {\n  atomic<bool> locked{false};\npublic:\n  void lock() {\n    while (locked.exchange(true, memory_order_acquire)) {}\n  }\n  void unlock() {\n    locked.store(false, memory_order_release);\n  }\n};\n\nSpinLock spin;\nint shared = 0;\n\nvoid add() {\n  for (int i = 0; i < 1000; ++i) {\n    spin.lock();\n    ++shared;\n    spin.unlock();\n  }\n}\n\nint main() {\n  thread t1(add), t2(add);\n  t1.join(); t2.join();\n  cout << shared << "\\n";\n}',
      hints: [
        'exchange(true, acquire) 加锁',
        'store(false, release) 解锁',
        '最终 shared 应该是 2000',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 18：自旋锁和 std::mutex 相比，主要缺点是什么？',
      options: [
        { text: '自旋锁更慢', correct: false, explanation: '自旋锁在短等待时更快' },
        { text: '自旋锁忙等待消耗 CPU', correct: true, explanation: '锁等待时循环检查，不释放 CPU' },
        { text: '自旋锁不安全', correct: false, explanation: '正确实现的自旋锁是安全的' },
        { text: '自旋锁不能用于多线程', correct: false, explanation: '自旋锁正是用于多线程' },
      ],
    },
    {
      type: 'exposition',
      text: '**注意事项**：\n- 不要混合使用不同的内存序模式操作同一个变量（容易出 bug）\n- acquire/release 必须配对使用才有意义\n- relaxed 模式下的操作顺序几乎不可预测\n- seq_cst 在所有主流 CPU 上的开销并不大（x86 下基本是免费的）',
    },
    {
      type: 'multiple-choice',
      question: '在 x86 架构上，seq_cst 和 acquire/release 的性能差异通常如何？',
      options: [
        { text: 'seq_cst 比 acquire 慢 100 倍', correct: false, explanation: 'x86 有强大的内存模型，差异很小' },
        { text: '差异不大，因为 x86 本身已经提供了较强的一致性', correct: true, explanation: 'x86 的 TSO 模型让 seq_cst 几乎无额外成本' },
        { text: 'acquire 比 seq_cst 慢', correct: false, explanation: 'seq_cst 更严格，通常不会更快' },
        { text: '在 x86 上 relaxed 比普通变量慢', correct: false, explanation: 'atomic relaxed 比普通变量略慢' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n| 模式 | 保证 | 场景 |\n|------|------|------|\n| relaxed | 仅原子性 | 计数器 |\n| acquire | 读取同步 | 读取标志 |\n| release | 写入同步 | 写入标志 |\n| acq_rel | 读写同步 | RMW 操作 |\n| seq_cst | 全局一致 | 默认选择 |',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课我们看一个完全不同的主题——**RTTI 和 dynamic_cast 的成本**。\n理解运行时类型信息在性能和设计上的代价。',
    },
  ],
}

export default lesson
