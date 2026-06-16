import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'mutex-intro',
    chapter: 19,
    title: 'mutex——互斥锁',
    subtitle: '一次一个线程访问',
    description: '学会用 mutex 加锁保护共享数据，防止数据竞争。',
    objectives: ['能用 mutex 对共享数据加锁保护', '能理解 lock/unlock 的配对规则', '能写出没有数据竞争的多线程代码'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课学了数据竞争——多个线程同时操作共享变量是未定义行为。\n**解决方案：用互斥锁（mutex）保护共享数据。**\n保证**同一时间只有一个线程**能访问数据。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '想象一扇门，门上有一把锁：\n\n- 线程 A 先到→拿钥匙开门→进去操作数据→出来锁门\n- 线程 B 只能等 A 出来，拿到钥匙才能进去\n\n**mutex** 就是这把锁。\n`.lock()` 是拿钥匙，`.unlock()` 是放回钥匙。',
    },
    {
      type: 'exposition',
      text: '用 mutex 保护 counter：\n\n```cpp\n#include <mutex>\n\nint counter = 0;\nmutex mtx;  // 全局锁\n\nvoid increment() {\n  for (int i = 0; i < 100000; i++) {\n    mtx.lock();    // 请求锁\n    counter++;     // 安全操作\n    mtx.unlock();  // 释放锁\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter;  // 一定是 200000\n}\n```\n\n加了锁，结果永远正确。',
    },
    {
      type: 'concept-cards',
      instruction: '认识 mutex 的关键概念：',
      cards: [
        { glyph: '🔒', term: 'mutex', meaning: '互斥锁，保护共享数据', example: '一次只有一个线程拥有锁' },
        { glyph: '🔑', term: '.lock()', meaning: '获取锁，如果已被占用就等待', example: '阻塞直到拿到锁' },
        { glyph: '🔓', term: '.unlock()', meaning: '释放锁，让其他线程可以获取', example: '必须配对 lock' },
        { glyph: '🚧', term: '临界区 (Critical Section)', meaning: '被锁保护的代码段', example: 'lock() 和 unlock() 之间' },
      ],
    },
    {
      type: 'exposition',
      text: '**lock/unlock 必须严格配对**\n\n一个线程 `lock()` 后，必须确保在**所有路径**上都 `unlock()`。\n包括异常退出的情况：\n\n```cpp\nvoid bad() {\n  mtx.lock();\n  if (error) {\n    return;    // ❌ 忘了 unlock！\n  }\n  mtx.unlock();\n}\n```\n\n如果锁定后异常退出或提前返回，锁永远不会被释放。\n其他线程会**永远等待**——这叫死锁。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 mutex 保护共享数据的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint shared = 0;\n\nvoid add() {\n  mtx.lock();\n  shared++;\n  mtx.unlock();\n}\n\nint main() {\n  thread t1(add);\n  thread t2(add);\n  t1.join();\n  t2.join();\n  cout << shared << "\\n";\n}',
      hints: ['`mtx.lock()` 获取锁，其他线程会等待', '`shared++` 在临界区内安全操作', '`mtx.unlock()` 释放锁——别忘了！'],
    },
    {
      type: 'exposition',
      text: '**lock 阻塞行为**：\n\n- 如果锁是空闲的→`lock()` 立即返回，获得锁\n- 如果锁被其他线程持有→`lock()` 阻塞等待，直到锁被释放\n- 多个线程同时等待→只有一个能拿到锁，其他继续等待\n\n这就是**互斥**（mutual exclusion）的含义。',
    },
    {
      type: 'exposition',
      text: '**mutex 的性能影响**：\n\n加锁不是免费的：\n- 如果锁没有竞争 → 开销很小（几十纳秒）\n- 如果锁有竞争 → 线程阻塞、上下文切换（微秒级）\n- 临界区太大 → 锁争用严重，并发效率反而降低\n\n所以：**临界区要尽量小**——只放必须保护的操作。',
    },
    {
      type: 'exposition',
      text: '**mutex 的常见误区**：\n\n误区 1："我读一个变量不需要锁，因为读是安全的"\n→ 如果另一个线程同时在写，读也会是数据竞争！\n\n误区 2："我用 volatile 就能解决数据竞争"\n→ `volatile` 和线程安全完全无关！\n\n误区 3："先检查再操作，中间没有锁也能行"\n→ check-then-act 是经典的竞态条件模式',
    },
    {
      type: 'exposition',
      text: '**锁的范围要恰到好处**：\n\n- **锁太大**：临界区过长，其他线程等太久，失去并发优势\n- **锁太小**：应该保护的逻辑没保护全，仍有数据竞争\n\n```cpp\n// 锁太大\nmtx.lock();\nread_file();     // 耗时操作\nupdate_data();   // 只有这里需要保护\nmtx.unlock();\n\n// 锁正确\nread_file();     // 不需要锁\nmtx.lock();\nupdate_data();   // 只需要保护这里\nmtx.unlock();\n```\n\n只保护真正需要共享的操作。',
    },
    {
      type: 'concept-cards',
      instruction: '使用锁的注意事项：',
      cards: [
        { glyph: '🎯', term: '粒度 (Granularity)', meaning: '锁保护的代码范围，精确控制', example: '只包最小必要代码' },
        { glyph: '⚠️', term: '死锁风险', meaning: '两个互锁互相等待，永远卡住', example: 'A 等 B，B 等 A' },
        { glyph: '🔄', term: '不能递归 lock', meaning: '同一线程重复 lock 会死锁', example: '用 recursive_mutex' },
        { glyph: '🔐', term: 'RAII 锁', meaning: '构造时 lock，析构时 unlock', example: 'lock_guard（下节课）' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是 mutex 的正确用法？',
      options: [
        { text: '一个线程 lock，另一个线程 unlock', correct: false, explanation: 'lock 和 unlock 必须在同一线程配对使用' },
        { text: 'lock 后必须保证在所有路径上都 unlock', correct: true, explanation: '任何提前返回或异常退出都要确保 unlock' },
        { text: 'lock 后可以不解锁，下一个 lock 会自动替换', correct: false, explanation: 'mutex 不会自动解锁，必须手动 unlock' },
        { text: 'lock 可以同时被两个线程获取', correct: false, explanation: '互斥锁的含义就是一次只能一个线程持有' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个展示锁的阻塞行为：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\n\nvoid work(int id) {\n  mtx.lock();\n  cout << "Thread " << id << " in critical section\\n";\n  this_thread::sleep_for(chrono::milliseconds(100));\n  cout << "Thread " << id << " leaving\\n";\n  mtx.unlock();\n}\n\nint main() {\n  thread t1(work, 1);\n  thread t2(work, 2);\n  t1.join();\n  t2.join();\n}',
      hints: ['两个线程都不会被打断——锁确保互斥', '`sleep_for` 模拟耗时操作，期间锁不会被释放', '一个线程 unlock 后另一个才能进入临界区'],
    },
    {
      type: 'exposition',
      text: '**mutex 的花销**：\n\nmutex 的性能开销取决于竞争程度：\n\n- 无竞争时：非常轻量（约 25ns）\n- 轻度竞争：几十到几百纳秒\n- 重度竞争：涉及系统调用和上下文切换（微秒级）\n\n所以并不是"用了 mutex 就一定慢"，\n但**尽量减少锁的争用**是重要的优化目标。',
    },
    {
      type: 'multiple-choice',
      question: '复习第 04 课：为什么 `counter++` 在多线程下会得到错误结果？',
      options: [
        { text: '因为 ++ 运算符有 bug', correct: false, explanation: '++ 本身没有 bug，多线程下才出问题' },
        { text: '因为 ++ 是读→改→写三步，不是原子操作', correct: true, explanation: '三步可能被另一个线程插入，导致更新丢失' },
        { text: '因为 int 类型不能多线程使用', correct: false, explanation: 'int 可以用，但需要同步' },
        { text: '因为编译器不支持多线程', correct: false, explanation: '编译器支持，但++在多线程中不是安全的' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行这个用 mutex 保护 counter 的程序。',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint counter = 0;\n\nvoid increment() {\n  for (int i = 0; i < 50000; i++) {\n    mtx.lock();\n    counter++;\n    mtx.unlock();\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << "Result: " << counter << " (expected 100000)\\n";\n}',
      expectedOutput: 'Result: 100000 (expected 100000)',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'exposition',
      text: '**mutex 的 try_lock**：\n\n除了阻塞的 `lock()`，mutex 还提供非阻塞的 `try_lock()`：\n\n```cpp\nmtx.try_lock();  // 尝试获取锁\n// 返回 true 表示获取成功\n// 返回 false 表示锁被占用，不阻塞\n\nif (mtx.try_lock()) {\n  // 成功拿到锁\n  // 操作共享数据\n  mtx.unlock();\n} else {\n  // 没拿到锁，做其他事\n  do_something_else();\n}\n```\n\n适合不想被阻塞的场景。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 try_lock 避免阻塞的示例：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\n\nvoid try_work(int id) {\n  if (mtx.try_lock()) {\n    cout << "Thread " << id << " got the lock\\n";\n    this_thread::sleep_for(chrono::milliseconds(50));\n    mtx.unlock();\n  } else {\n    cout << "Thread " << id << " skipped\\n";\n  }\n}\n\nint main() {\n  thread t1(try_work, 1);\n  thread t2(try_work, 2);\n  t1.join();\n  t2.join();\n}',
      hints: ['`try_lock()` 不阻塞，立即返回', '返回 true 才操作共享数据', '没拿到锁就跳过，适合非关键任务'],
    },
  ],
}

export default lesson
