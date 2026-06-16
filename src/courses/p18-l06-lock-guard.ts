import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'lock-guard',
    chapter: 19,
    title: 'lock_guard——RAII 锁',
    subtitle: '构造加锁析构解锁',
    description: '学会用 lock_guard 自动管理 mutex，RAII 机制确保安全解锁。',
    objectives: ['能用 lock_guard 替代手动的 lock/unlock', '能解释 RAII 在锁管理上的优势', '能写出异常安全的加锁代码'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课的手动 `lock/unlock` 有一个致命问题：**忘记 unlock**。\n如果代码中间有提前返回或抛出异常，锁就再也打不开了。\n**`lock_guard` 用 RAII 自动管理锁的生命周期。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '```cpp\n#include <mutex>\n\nmutex mtx;\n\nvoid safe_increment() {\n  lock_guard<mutex> guard(mtx);  // 构造时 lock()\n  counter++;                      // 临界区\n}  // 析构时自动 unlock()\n```\n\n`lock_guard` 构造时对 mutex 调用 `lock()`，\n析构时自动调用 `unlock()`。\n无论函数正常返回还是异常退出，析构都会执行。',
    },
    {
      type: 'exposition',
      text: '**RAII 回顾**（阶段 10 的概念）：\n\nRAII = Resource Acquisition Is Initialization\n资源获取即初始化。\n\n把资源的生命周期绑定到对象的生命周期：\n- 对象构造→获取资源（锁）\n- 对象析构→释放资源（锁）\n\n**`lock_guard` 是 RAII 在锁管理上的最佳体现。**',
    },
    {
      type: 'concept-cards',
      instruction: 'lock_guard 核心要点：',
      cards: [
        { glyph: '🛡️', term: 'lock_guard<mutex>', meaning: 'RAII 锁管理器', example: '构造加锁，析构解锁' },
        { glyph: '✅', term: '自动 unlock', meaning: '离开作用域自动释放锁', example: '包括异常退出的情况' },
        { glyph: '🔒', term: '不可复制', meaning: 'lock_guard 不能拷贝', example: '独占锁的所有权' },
        { glyph: '🎯', term: '唯一用途', meaning: '纯粹用于加锁/解锁，无额外功能', example: '对比 unique_lock' },
      ],
    },
    {
      type: 'exposition',
      text: '**对比：手动 lock vs lock_guard**\n\n```cpp\n// ❌ 手动：容易忘\nvoid bad() {\n  mtx.lock();\n  do_work();\n  if (error) return;  // 忘 unlock！\n  mtx.unlock();\n}\n\n// ✅ lock_guard：自动管理\nvoid good() {\n  lock_guard<mutex> guard(mtx);\n  do_work();\n  if (error) return;  // guard 析构自动 unlock\n}\n```\n\n手动管理时，每多一条提前返回路径，就多一个忘记 unlock 的机会。\n用 `lock_guard` 一劳永逸。',
    },
    {
      type: 'exposition',
      text: '**lock_guard 的行为**：\n\n```cpp\nvoid scope_demo() {\n  {\n    lock_guard<mutex> g1(mtx);\n    // 临界区 1——持有锁\n  }  // g1 析构，unlock\n\n  {\n    lock_guard<mutex> g2(mtx);\n    // 临界区 2——重新获取锁\n  }  // g2 析构，unlock\n}\n```\n\n可以用花括号控制锁的作用域范围。\n不需要保护的操作放在花括号外面。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 lock_guard 保护 counter 的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint counter = 0;\n\nvoid increment() {\n  lock_guard<mutex> guard(mtx);\n  counter++;\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter << "\\n";\n}',
      hints: ['`lock_guard<mutex> guard(mtx)` 构造时自动 lock', '不需要手动 unlock——析构时自动释放', '`guard` 的名字可以任意，建议用 guard 或 lock'],
    },
    {
      type: 'multiple-choice',
      question: '如果 `lock_guard` 保护的函数中途抛出了异常，会发生什么？',
      options: [
        { text: '锁永远无法释放，其他线程卡住', correct: false, explanation: 'lock_guard 的析构函数会执行，自动 unlock' },
        { text: 'lock_guard 析构时会自动 unlock，锁被释放', correct: true, explanation: '栈展开（stack unwinding）会调用所有局部对象的析构' },
        { text: '程序直接崩溃', correct: false, explanation: '异常可以正常传播，lock_guard 会正常析构' },
        { text: '锁被自动转移到异常对象中', correct: false, explanation: '没有这种机制' },
      ],
    },
    {
      type: 'exposition',
      text: '**用花括号精确控制锁的范围**：\n\n```cpp\nvoid process_data() {\n  Data result;\n\n  {  // 加锁范围开始\n    lock_guard<mutex> guard(mtx);\n    result = shared_data;\n  }  // 锁已释放\n\n  // 这里已经没有锁了，可以执行耗时操作\n  save_to_disk(result);\n  send_notification(result);\n}\n```\n\n只保护真正需要互斥的代码段，\n不保护耗时操作——提高并发性能。',
    },
    {
      type: 'type-it',
      instruction: '敲一个控制锁作用域的例子：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint data = 0;\n\nvoid update() {\n  int local;\n  {\n    lock_guard<mutex> guard(mtx);\n    local = data + 1;\n  }\n  data = local;\n  cout << "Updated to " << data << "\\n";\n}\n\nint main() {\n  thread t1(update);\n  thread t2(update);\n  t1.join();\n  t2.join();\n}',
      hints: ['花括号 { } 限定 lock_guard 的作用域', '离开花括号自动 unlock', '`local` 在锁外操作，减少临界区大小'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个关于 `lock_guard` 的说法是**错误**的？',
      options: [
        { text: 'lock_guard 构造时加锁，析构时解锁', correct: false, explanation: '这是正确的，RAII 的核心' },
        { text: 'lock_guard 可以手动调用 unlock 提前释放', correct: true, explanation: 'lock_guard 不提供 unlock 接口，要提前释放需用 unique_lock' },
        { text: 'lock_guard 可以防止忘记 unlock', correct: false, explanation: '这是正确的，自动管理避免了人为遗忘' },
        { text: 'lock_guard 是模板类，需要指定 mutex 类型', correct: false, explanation: '这是正确的，如 lock_guard<mutex>' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习第 05 课：手动 lock/unlock 时，以下哪种情况容易导致问题？',
      options: [
        { text: 'lock 和 unlock 在同一个函数中', correct: false, explanation: '在同一函数中配对使用是正确做法' },
        { text: '函数有多个 return 路径时忘记 unlock', correct: true, explanation: '每个退出路径都要 unlock，很容易遗漏' },
        { text: 'lock 后立即 unlock', correct: false, explanation: '虽然临界区太短，但不会导致问题' },
        { text: '在循环中使用 lock/unlock', correct: false, explanation: '循环中使用是合理的，只要配对正确' },
      ],
    },
    {
      type: 'exposition',
      text: '**lock_guard 在真实项目中的应用**：\n\n```cpp\nclass ThreadSafeCounter {\n  mutable mutex mtx;\n  int count = 0;\npublic:\n  void increment() {\n    lock_guard<mutex> g(mtx);\n    ++count;\n  }\n  int get() const {\n    lock_guard<mutex> g(mtx);\n    return count;\n  }\n};\n```\n\n把锁封装在类内部，对外提供线程安全的接口。\n这是 RAII + 封装的最佳实践。',
    },
    {
      type: 'exposition',
      text: '**mutable 关键字的作用**：\n\n你注意到上面代码中的 `mutable mutex mtx;` 了吗？\n\n`mutable` 允许在 `const` 成员函数中修改该成员。\n因为 `get()` 是 `const` 方法但需要加锁解锁——\n修改 mutex 不影响对象的"逻辑常量性"。\n\n这是 `mutable` 的经典用法之一。',
    },
    {
      type: 'exposition',
      text: '**lock_guard 的限制**：\n\n- 不能手动提前 unlock（想要的话用 unique_lock）\n- 不能转移锁的所有权（不能 move）\n- 不能延迟加锁（构造时就加锁）\n\n但这些限制也是设计意图：`lock_guard` 就是最简单的"加锁→解锁"工具。\n如果你需要更多灵活性，下一课的 `unique_lock` 更适合你。',
    },
    {
      type: 'type-it',
      instruction: '敲一个 lock_guard 配合花括号控制临界区的例子：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <chrono>\nusing namespace std;\n\nmutex mtx;\nstring shared_data;\n\nvoid update(string val) {\n  string local_copy;\n  {\n    lock_guard<mutex> g(mtx);\n    local_copy = val + " processed";\n  }\n  this_thread::sleep_for(chrono::milliseconds(20));\n  cout << local_copy << "\\n";\n}\n\nint main() {\n  thread t1(update, "A");\n  thread t2(update, "B");\n  t1.join();\n  t2.join();\n}',
      hints: ['花括号限定了 lock_guard 的作用域', '耗时操作（sleep_for）在锁外执行', '只把真正需要保护的代码放在锁内'],
    },
    {
      type: 'multiple-choice',
      question: '复习第 10 课 RAII 概念：RAII 的全称是什么？',
      options: [
        { text: 'Resource Allocation Is Integration', correct: false, explanation: '这不是正确的全称' },
        { text: 'Resource Acquisition Is Initialization', correct: true, explanation: '资源获取即初始化——对象的生命周期管理资源' },
        { text: 'Random Access Iterator Interface', correct: false, explanation: '这是迭代器相关，和 RAII 无关' },
        { text: 'Runtime Assertion In Inheritance', correct: false, explanation: '这是不存在的概念' },
      ],
    },
    {
      type: 'exposition',
      text: '**总结**：\n\n- `lock_guard` 用 RAII 自动管理锁\n- 构造时 `lock()`，析构时 `unlock()`\n- 异常安全——栈展开时也会解锁\n- 用花括号控制锁的作用域\n- 简单场景首选 `lock_guard`\n- 需要更灵活的控制→用 `unique_lock`（下一课）',
    },
  ],
}

export default lesson
