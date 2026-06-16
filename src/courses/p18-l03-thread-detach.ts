import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'thread-detach',
    chapter: 19,
    title: 'detach——让线程独立',
    subtitle: '后台运行',
    description: '学会用 detach 让线程在后台独立运行，理解 join 和 detach 的区别。',
    objectives: ['能用 detach 让线程后台独立运行', '能区分 join 和 detach 的使用场景', '能理解可结合和不可结合线程的概念'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课我们用 `join()` 等待线程结束。\n但有时你不想等——让线程自己在后台跑完就行。\n**`detach()` 让线程脱离管理，独立运行。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '```cpp\n#include <thread>\n\nvoid background_task() {\n  // 做一些耗时但不需要结果的工作\n  save_log();\n  sync_data();\n}\n\nint main() {\n  thread t(background_task);\n  t.detach();  // 让它在后台独立运行\n  // main 继续做其他事\n  cout << "Main continues...\\n";\n}  // main 结束 → 整个进程结束 → 所有线程结束\n```\n\n`detach()` 之后，`t` 与线程的连接被切断。',
    },
    {
      type: 'concept-cards',
      instruction: 'join vs detach 对比：',
      cards: [
        { glyph: '🔗', term: 'join()', meaning: '等待线程结束，同步点', example: '等结果' },
        { glyph: '✂️', term: 'detach()', meaning: '让线程独立，不等待', example: '后台任务' },
        { glyph: '🔒', term: 'joinable()', meaning: '判断线程是否可 join/detach', example: 'true/false' },
        { glyph: '💀', term: '不可结合', meaning: '已 detach 或已 join 的线程', example: '析构不会 terminate' },
      ],
    },
    {
      type: 'exposition',
      text: '**detach 之后：**\n\n- `t` 不再代表那个线程（`t.joinable()` 返回 `false`）\n- 不能再对 `t` 调用 `join()` 或 `detach()`\n- 线程在后台继续运行\n- 如果 `main()` 先结束，整个进程结束，后台线程也被强制终止\n\n**所以 detach 适合"生死由命"的后台任务。**',
    },
    {
      type: 'exposition',
      text: '**joinable() 检查**：\n\n```cpp\nthread t(task);\nif (t.joinable()) {\n  t.detach();  // 或 t.join()\n}\n```\n\n最佳实践：调用 join 或 detach 前先检查 `joinable()`。\n这样可以防止重复 join/detach 导致的异常。',
    },
    {
      type: 'type-it',
      instruction: '敲一个 detach 后台线程的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <chrono>\nusing namespace std;\n\nvoid background() {\n  this_thread::sleep_for(chrono::seconds(1));\n  cout << "background done\\n";\n}\n\nint main() {\n  thread t(background);\n  t.detach();\n  cout << "main done\\n";\n}',
      hints: ['`t.detach()` 让线程独立，main 不等待它', '`sleep_for` 模拟耗时操作', '`"background done"` 可能在 main 结束后才输出——或者根本没机会输出'],
    },
    {
      type: 'multiple-choice',
      question: '以下关于 `detach()` 的说法，哪个是正确的？',
      options: [
        { text: 'detach 之后线程立即停止', correct: false, explanation: 'detach 只是断开连接，线程继续运行' },
        { text: 'detach 之后可以再 join', correct: false, explanation: 'detach 之后线程不可结合，不能再 join' },
        { text: 'detach 后的线程在后台独立运行，主线程不等待', correct: true, explanation: 'detach 让线程独立运行，主线程可以继续做自己的事' },
        { text: '已经 join 过的线程可以再次 detach', correct: false, explanation: '已经 join 或 detach 过的线程不能再操作' },
      ],
    },
    {
      type: 'exposition',
      text: '**detach 的典型场景**：\n\n1. **日志写入**：主线程不阻塞，日志线程慢慢写\n2. **定时同步**：定期同步数据到服务器\n3. **心跳检测**：定期检查连接状态\n4. **后台清理**：释放资源、清理缓存\n\n这些任务的特点是：**不需要结果，也不关心什么时候完成。**',
    },
    {
      type: 'exposition',
      text: '**注意：detach 后的线程不能访问已销毁的局部变量！**\n\n```cpp\nint main() {\n  int data = 42;\n  thread t([&data] {  // 捕获引用\n    this_thread::sleep_for(chrono::seconds(1));\n    cout << data;  // ❌ data 可能已经销毁！\n  });\n  t.detach();\n}  // main 结束，data 销毁\n```\n\n如果后台线程访问了已经销毁的变量，结果是**未定义行为**。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况应优先使用 `detach` 而非 `join`？',
      options: [
        { text: '需要等待线程的计算结果', correct: false, explanation: '需要结果时应该用 join，等线程算完再取值' },
        { text: '线程做后台日志写入，主线程不需要等它', correct: true, explanation: '后台任务不需要结果，适合 detach' },
        { text: '线程可能抛出异常', correct: false, explanation: '异常处理和 join/detach 的选择无关' },
        { text: '线程在 main 函数结束前必须完成', correct: false, explanation: '必须完成的任务应该用 join 等待' },
      ],
    },
    {
      type: 'exposition',
      text: '**RAII 包装线程**（最佳实践）：\n\n```cpp\nclass ThreadGuard {\n  thread& t;\npublic:\n  explicit ThreadGuard(thread& t_) : t(t_) {}\n  ~ThreadGuard() {\n    if (t.joinable()) {\n      t.join();  // 自动 join\n    }\n  }\n};\n\nvoid f() {\n  thread t(task);\n  ThreadGuard g(t);  // 离开作用域自动 join\n  // ... 即使异常退出，g 的析构也会 join\n}\n```\n\n如果没有这种包装，异常路径上容易忘记 join。',
    },
    {
      type: 'exposition',
      text: '**线程数量限制**：\n\n创建的线程不是越多越好：\n- 每个线程需要独立的栈空间（默认 1-8 MB）\n- 线程创建和切换有开销\n- 太多线程导致上下文切换频繁\n\n用 `thread::hardware_concurrency()` 查询硬件支持的线程数：\n\n```cpp\nunsigned int n = thread::hardware_concurrency();\ncout << "Support " << n << " threads\\n";\n```',
    },
    {
      type: 'exposition',
      text: '**detach 的最佳实践总结**：\n\n1. 只有后台"生死由命"的任务才 detach\n2. detach 前确保线程不会访问已销毁的局部变量\n3. 可以用 `joinable()` 检查状态再 detach\n4. 考虑用 RAII 包装 thread 自动管理\n5. 用 `hardware_concurrency()` 合理控制线程数量',
    },
    {
      type: 'exposition',
      text: '**detach 与主线程的关系**：\n\n主线程结束后，进程中的**所有线程都会被强制终止**——\n无论它们是否 join 或 detach。\n\n```cpp\nvoid background() {\n  this_thread::sleep_for(chrono::seconds(5));\n  cout << "This may never print\\n";\n}\n\nint main() {\n  thread t(background);\n  t.detach();\n  return 0;  // 进程结束，后台线程也结束\n}\n```\n\n所以 detach 适合**主线程不会很快结束**的程序。',
    },
    {
      type: 'type-it',
      instruction: '敲一个检查硬件线程数的程序：',
      code: '#include <iostream>\n#include <thread>\nusing namespace std;\n\nint main() {\n  unsigned int n = thread::hardware_concurrency();\n  cout << n << " concurrent threads supported\\n";\n}',
      hints: ['`hardware_concurrency()` 返回逻辑 CPU 核心数', '返回值可能是 0（无法检测时）', '这个程序不需要创建线程，只是查询'],
    },
    {
      type: 'multiple-choice',
      question: '复习第 02 课：创建 `thread t(func)` 后，线程什么时候开始执行？',
      options: [
        { text: '调用 t.join() 之后', correct: false, explanation: '线程在创建时就立即开始执行' },
        { text: '线程对象构造完成后立即开始', correct: true, explanation: 'std::thread 构造即启动线程' },
        { text: '需要手动调用 t.start()', correct: false, explanation: 'std::thread 没有 start() 方法' },
        { text: '在 main 函数返回之前', correct: false, explanation: '线程在创建时就开始执行了' },
      ],
    },
    {
      type: 'exposition',
      text: '**detach 与全局变量**：\n\ndetach 后的线程可以安全访问全局变量和堆变量：\n\n```cpp\natomic<bool> running(true);  // 全局\n\nvoid background() {\n  while (running.load()) {\n    check_for_updates();\n  }\n}\n\nint main() {\n  thread t(background);\n  t.detach();\n  // ... 一段时间后\n  running.store(false);  // 让后台线程停止\n}\n```\n\n注意需要**线程安全地访问全局变量**（用 atomic 或锁）。',
    },
    {
      type: 'multiple-choice',
      question: '复习第 02 课：`std::thread` 创建后如果不 join 也不 detach，销毁时会怎样？',
      options: [
        { text: '线程在后台继续运行', correct: false, explanation: '不会——不 join 不 detach 销毁会导致程序终止' },
        { text: '调用 std::terminate() 终止程序', correct: true, explanation: 'thread 析构时如果仍可结合，会调用 terminate' },
        { text: '线程自动被 detach', correct: false, explanation: '不会自动 detach，必须显式调用' },
        { text: '线程自动被 join', correct: false, explanation: '不会自动 join，必须显式调用' },
      ],
    },
  ],
}

export default lesson
