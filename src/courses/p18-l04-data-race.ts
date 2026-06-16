import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'data-race',
    chapter: 19,
    title: '数据竞争',
    subtitle: '同时写一个变量',
    description: '理解数据竞争的概念——两个线程同时读写同一变量是未定义行为，极其危险。',
    objectives: ['能解释什么是数据竞争', '能识别数据竞争的代码', '能理解数据竞争为什么是未定义行为'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '多个线程访问同一个变量时，如果**至少一个线程在写**且**没有同步机制**，就会发生**数据竞争**。\n数据竞争是 C++ 中最隐蔽、最难调试的 bug 之一。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '看这个程序——**它有数据竞争**：\n\n```cpp\nint counter = 0;\n\nvoid increment() {\n  for (int i = 0; i < 100000; i++) {\n    counter++;  // ❌ 两个线程同时读写 counter\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter;  // 期望 200000，实际呢？\n}\n```\n\n猜猜输出是多少？很可能不是 200000。',
    },
    {
      type: 'exposition',
      text: '**为什么结果不对？**\n\n`counter++` 在底层是三个步骤：\n1. 读取 counter 的值到寄存器\n2. 把寄存器的值加 1\n3. 把寄存器的值写回 counter\n\n两个线程同时做这件事，可能出现这种交叉：\n\n```\n线程 1: 读取 counter=0 → 加 1 → 准备写回\n线程 2:              读取 counter=0（还没被更新！）→ 加 1 → 写回=1\n线程 1:                                             → 写回=1（覆盖了！）\n```\n\n两次 increment，counter 只增加了 1！',
    },
    {
      type: 'concept-cards',
      instruction: '数据竞争的核心概念：',
      cards: [
        { glyph: '💥', term: '数据竞争 (Data Race)', meaning: '多线程同时访问同一变量，至少一个在写', example: 'counter++ 同时执行' },
        { glyph: '❓', term: '未定义行为 (UB)', meaning: 'C++ 标准不规定结果，任何情况都可能', example: '程序崩溃 / 值不对' },
        { glyph: '🔀', term: '交叉执行 (Interleaving)', meaning: '不同线程的指令交替执行', example: '读→写→读→写' },
        { glyph: '👻', term: '隐蔽性', meaning: '有时对有时错，调试时很难复现', example: 'release 才出现' },
      ],
    },
    {
      type: 'exposition',
      text: '**数据竞争的危害**：\n\n数据竞争是 **C++ 未定义行为（UB）**。\n这意味着编译器可以做**任何事情**：\n- 结果是错的\n- 不报错但结果不对\n- 程序崩溃\n- debug 模式正常，release 模式崩溃\n- 今天的运行和明天不同\n\n**极其可怕的隐蔽性。**',
    },
    {
      type: 'exposition',
      text: '**课堂演示：为什么数据竞争概率上总是错**\n\n```cpp\nint counter = 0;\n\nvoid increment() {\n  for (int i = 0; i < 100000; i++) {\n    counter++;  // 读→加→写，三步不原子\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter << " (expected 200000)\\n";\n}\n```\n\n每次运行结果都可能不同：\n- 可能 112345\n- 可能 98765\n- 可能 200000（运气好）\n- 甚至可能程序崩溃（UB 的任何可能）',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是数据竞争的定义？',
      options: [
        { text: '两个线程同时读取同一个变量', correct: false, explanation: '同时读是安全的，不会导致数据竞争' },
        { text: '两个线程同时写同一个变量，或一个写一个读，没有同步', correct: true, explanation: '至少一个线程在写，且没有同步机制' },
        { text: '一个线程写变量时分配了多余内存', correct: false, explanation: '这和内存分配无关' },
        { text: '变量在栈上被多个函数访问', correct: false, explanation: '单线程内多个函数访问同一个变量是正常的' },
      ],
    },
    {
      type: 'exposition',
      text: '**更微妙的例子——非原子操作**：\n\n不仅仅是 `++` 有问题：\n\n```cpp\nstruct Point { double x, y; };\nPoint p;\n\nvoid writer() {\n  p = {1.0, 2.0};  // 写两个 double\n}\n\nvoid reader() {\n  cout << p.x << ", " << p.y;  // 读两个 double\n}\n```\n\n可能读到 `{1.0, 0.0}`——x 被更新了但 y 还没更新！\n这种叫 **tearing**（撕裂），结构体赋值可能不是原子的。',
    },
    {
      type: 'concept-cards',
      instruction: '哪些操作容易触发数据竞争：',
      cards: [
        { glyph: '🔢', term: '自增/自减', meaning: '++/-- 不是原子操作', example: 'counter++ 是 RMW' },
        { glyph: '📦', term: '结构体赋值', meaning: '可能拆成多次内存写入', example: 'p = {1, 2} 可能撕裂' },
        { glyph: '📝', term: '复合赋值', meaning: '+= -= 等都不是原子的', example: 'x += 5 是读→加→写' },
        { glyph: '📋', term: '容器操作', meaning: 'vector::push_back 多线程调用会崩溃', example: '内存重新分配' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个场景会引发数据竞争？',
      options: [
        { text: '线程 A 读变量 x，线程 B 读变量 x', correct: false, explanation: '两个线程同时只读，是安全的' },
        { text: '线程 A 写变量 x，线程 B 写变量 x，没有锁', correct: true, explanation: '同时写同一变量，没有同步，就是数据竞争' },
        { text: '线程 A 和线程 B 各自操作不同的变量', correct: false, explanation: '不同变量互不影响' },
        { text: '线程 A 写变量 x 之后线程 B 读变量 x（有 join）', correct: false, explanation: 'join 是一种同步，线程 A 写完 B 才读' },
      ],
    },
    {
      type: 'exposition',
      text: '**如何发现和预防数据竞争？**\n\n1. **代码审查**：仔细检查所有多线程访问的共享变量\n2. **ThreadSanitizer**：编译时加 `-fsanitize=thread`，运行时检测\n3. **减少共享**：尽量让每个线程有自己的数据\n4. **使用互斥锁**：保护好共享数据（下一课的内容）\n5. **使用原子操作**：`std::atomic` 提供无锁安全操作（后面的课程）',
    },
    {
      type: 'exposition',
      text: '**C++ 内存模型和数据竞争**：\n\nC++11 引入了正式的内存模型来定义线程间如何交互。\n核心规则：\n\n- 不同线程访问同一内存位置\n- 至少一个线程是写操作\n- 没有 happens-before 关系（即没有同步）\n→ **数据竞争 = 未定义行为**\n\n这个模型让你明确知道**什么是安全的，什么不是**。',
    },
    {
      type: 'exposition',
      text: '**实际项目中数据竞争的惨痛教训**：\n\n数据竞争不是理论问题——它导致过真实世界的灾难：\n\n- 2012 年：某个交易系统因数据竞争导致订单错误匹配\n- 2018 年：某数据库因并发计数器错误导致数据丢失\n- 各浏览器引擎的并发 bug 中，数据竞争占比超过 30%\n\n这些 bug 的共同特点：**测试时没发现，上线后偶尔崩。**',
    },
    {
      type: 'type-it',
      instruction: '敲一个存在数据竞争的程序，观察结果不可预测：',
      code: '#include <iostream>\n#include <thread>\nusing namespace std;\n\nint counter = 0;\n\nvoid increment() {\n  for (int i = 0; i < 10000; i++) {\n    counter++;\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter << " (expected 20000)\\n";\n}',
      hints: ['`counter++` 是读→加→写三步——不是原子的', '两个线程同时做++会导致更新丢失', '每次运行结果都可能不同'],
    },
    {
      type: 'exposition',
      text: '**数据竞争 ≠ 竞态条件**\n\n容易混淆的两个概念：\n\n- **数据竞争 (Data Race)**：多个线程同时访问同一内存，至少一个在写——这是**内存模型层面**的问题\n- **竞态条件 (Race Condition)**：结果依赖于操作顺序——这是**逻辑层面**的问题\n\n可能有竞态条件但没有数据竞争（有锁但顺序不固定）。\n也可能有数据竞争但没有竞态条件（但仍然是 UB！）。',
    },
    {
      type: 'exposition',
      text: '**C++ 标准关于数据竞争的规定**：\n\nC++ 标准（C++11 起）明确规定：\n\n> "如果两个不同线程的两次内存访问不同步，\n> 且至少一个是写操作，那么这是数据竞争，\n> 导致未定义行为。"\n\n这意味着编译器在优化时可以假设**不存在数据竞争**。\n如果你的代码有数据竞争，编译器可能会生成**任何代码**——\n甚至删除你所有的代码！',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 volatile 的错误尝试（volatile 不能解决数据竞争）：',
      code: '#include <iostream>\n#include <thread>\nusing namespace std;\n\nvolatile int counter = 0;\n\nvoid increment() {\n  for (int i = 0; i < 10000; i++) {\n    counter++;\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter << " (probably not 20000)\\n";\n}',
      hints: ['`volatile` 告诉编译器不要优化变量，但不解决多线程同步', 'counter++ 仍然是读→加→写三步，不是原子的', 'volatile 在多线程中是没用的——用 atomic 或 mutex'],
    },
    {
      type: 'multiple-choice',
      question: '复习第 03 课：`detach()` 后的线程不能做什么？',
      options: [
        { text: '在后台运行', correct: false, explanation: 'detach 就是为了让线程在后台运行' },
        { text: '被主线程 join', correct: true, explanation: 'detach 后线程不可结合，不能再 join' },
        { text: '访问全局变量', correct: false, explanation: '访问全局变量是可以的，但要注意数据竞争' },
        { text: '调用函数', correct: false, explanation: '线程当然可以继续调用函数' },
      ],
    },
    {
      type: 'exposition',
      text: '**总结**：\n\n- 数据竞争 = 多线程同时访问同一变量，至少一个在写，没有同步\n- 数据竞争是**未定义行为**，后果不可预测\n- `++`、`+=`、结构体赋值都不是原子的\n- 两个线程同时只读是安全的\n- 解决方案：**互斥锁**（下一课）或**原子操作**\n\n记住这句忠告：\n**"线程共享数据而不加锁，就是在写 bug。"**',
    },
  ],
}

export default lesson
