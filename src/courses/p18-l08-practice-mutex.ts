import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-mutex',
    chapter: 19,
    title: '互斥锁综合练习',
    subtitle: '巩固 04-07',
    description: '通过综合练习巩固数据竞争、mutex、lock_guard、unique_lock 的知识。',
    objectives: ['能独立写出用互斥锁保护共享数据的代码', '能选择合适的锁类型', '能分析并修正数据竞争问题'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前几课学了数据竞争和三种加锁方式（手动、lock_guard、unique_lock）。\n现在是**综合练习**时间——把知识用起来。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '敲一个手动 lock/unlock 保护共享数据的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint balance = 1000;\n\nvoid withdraw(int amount) {\n  mtx.lock();\n  if (balance >= amount) {\n    balance -= amount;\n  }\n  mtx.unlock();\n}\n\nint main() {\n  thread t1(withdraw, 200);\n  thread t2(withdraw, 300);\n  t1.join();\n  t2.join();\n  cout << "Balance: " << balance << "\\n";\n}',
      hints: ['`mtx.lock()` 保护余额读取和扣减', 'if 判断和扣减是一个整体逻辑，必须在一个临界区内', '`mtx.unlock()` 别忘了——否则其他线程永远等不到锁'],
    },
    {
      type: 'type-it',
      instruction: '敲一个用 lock_guard 保护银行转账的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint account = 500;\n\nvoid deposit(int amount) {\n  lock_guard<mutex> guard(mtx);\n  account += amount;\n  cout << "Deposited " << amount << ", now " << account << "\\n";\n}\n\nint main() {\n  thread t1(deposit, 100);\n  thread t2(deposit, 200);\n  t1.join();\n  t2.join();\n  cout << "Final: " << account << "\\n";\n}',
      hints: ['`lock_guard<mutex> guard(mtx)` 自动加锁', '不需要手动 unlock，guard 析构自动解锁', '两个线程各自存款，最终余额 = 500 + 100 + 200 = 800'],
    },
    {
      type: 'code-runner',
      instruction: '运行以下代码，验证 lock_guard 能正确保护共享数据：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint shared = 0;\n\nvoid add_1000() {\n  for (int i = 0; i < 1000; i++) {\n    lock_guard<mutex> guard(mtx);\n    shared++;\n  }\n}\n\nint main() {\n  thread t1(add_1000);\n  thread t2(add_1000);\n  thread t3(add_1000);\n  t1.join();\n  t2.join();\n  t3.join();\n  cout << "Result: " << shared << " (expected 3000)\\n";\n}',
      expectedOutput: 'Result: 3000 (expected 3000)',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'exposition',
      text: '**练习：分析数据竞争**\n\n看这段代码，找出问题：\n\n```cpp\nvector<int> data;\nmutex mtx;\n\nvoid add(int x) {\n  lock_guard<mutex> g(mtx);\n  data.push_back(x);\n}\n\nvoid clear_all() {\n  data.clear();   // 没有加锁！\n}\n```\n\n所有访问共享数据的操作都必须加锁，\n不能假设"只有一小部分不需要"。',
    },
    {
      type: 'code-runner',
      instruction: '用 unique_lock 实现带延迟加锁的累加器：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint sum = 0;\n\nvoid add_range(int start, int end) {\n  int local = 0;\n  for (int i = start; i <= end; i++) {\n    local += i;\n  }\n  unique_lock<mutex> lock(mtx, defer_lock);\n  lock.lock();\n  sum += local;\n  lock.unlock();\n}\n\nint main() {\n  thread t1(add_range, 1, 50);\n  thread t2(add_range, 51, 100);\n  t1.join();\n  t2.join();\n  cout << "Sum 1-100 = " << sum << "\\n";\n}',
      expectedOutput: 'Sum 1-100 = 5050',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'exposition',
      text: '**练习：检查再操作的问题**：\n\n```cpp\nmutex mtx;\nint counter = 0;\n\nvoid increment() {\n  if (counter < 100) {     // 检查\n    mtx.lock();\n    counter++;              // 操作\n    mtx.unlock();\n  }\n}\n```\n\n问题：检查和使用之间有**时间窗**。\n正确的做法：把判断和操作都放在锁内部。',
    },
    {
      type: 'type-it',
      instruction: '敲一个正确使用锁内判断的代码：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint counter = 0;\n\nvoid increment() {\n  lock_guard<mutex> g(mtx);\n  if (counter < 100) {\n    counter++;\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter << " (max 100)\\n";\n}',
      hints: ['检查和操作在同一锁保护下——没有时间窗', 'lock_guard 确保不会忘记 unlock', '最多到 100，两个线程加起来不会超过'],
    },
    {
      type: 'code-runner',
      instruction: '用 unique_lock 配合 try_lock 实现无阻塞操作：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint counter = 0;\n\nvoid try_work() {\n  unique_lock<mutex> lock(mtx, try_to_lock);\n  if (lock.owns_lock()) {\n    counter++;\n    cout << "Got lock, counter: " << counter << "\\n";\n  } else {\n    cout << "Lock busy, skipping\\n";\n  }\n}\n\nint main() {\n  thread t1(try_work);\n  thread t2(try_work);\n  thread t3(try_work);\n  t1.join();\n  t2.join();\n  t3.join();\n}',
      comparison: 'none',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '以下哪个变量在修改时**不需要**用互斥锁保护？',
      options: [
        { text: '被两个线程读写的全局 int', correct: false, explanation: '有写操作就需要保护' },
        { text: '每个线程独有的局部变量', correct: true, explanation: '局部变量不共享，不会产生数据竞争' },
        { text: '被一个线程读、另一个线程写的容器', correct: false, explanation: '只要有写且多线程访问就需要保护' },
        { text: '被多个线程写的全局标志位', correct: false, explanation: '写操作需要保护，或使用 atomic' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习第 05 课：以下哪种情况会导致 mutex 相关死锁？',
      options: [
        { text: '两个线程分别 lock 不同的 mutex', correct: false, explanation: '只要不是循环等待，不会死锁' },
        { text: 'lock() 后忘记 unlock()，其他线程永远等不到锁', correct: true, explanation: '一个线程持有锁不放，其他线程永远阻塞' },
        { text: '线程函数执行时间太长', correct: false, explanation: '时间长不会导致死锁，只是性能问题' },
        { text: 'lock() 时传入了错误参数', correct: false, explanation: 'mutex::lock() 不需要参数' },
      ],
    },
    {
      type: 'exposition',
      text: '**练习：嵌套锁的问题**：\n\n```cpp\nmutex mtx;\n\nvoid inner() {\n  lock_guard<mutex> g(mtx);\n}\n\nvoid outer() {\n  lock_guard<mutex> g(mtx);\n  inner();  // 同一线程再次 lock 同一 mutex\n}\n```\n\n普通 mutex 不允许同一线程重复加锁。\n解决方案：用 recursive_mutex 或重构。',
    },
    {
      type: 'exposition',
      text: '**练习：线程安全的日志输出器**：\n\n```cpp\n// Logger 类——所有输出加锁\nclass Logger {\n  mutex mtx;\npublic:\n  void log(const string& msg) {\n    lock_guard<mutex> g(mtx);\n    cout << \"[LOG] \" << msg << \"\\n\";\n  }\n};\n```\n\n日志是典型的"多线程写共享资源"场景。\n不加锁的话，两条日志的行内容会混在一起。',
    },
    {
      type: 'type-it',
      instruction: '敲一个线程安全的 Logger：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nclass Logger {\n  mutex mtx;\npublic:\n  void log(const string& msg) {\n    lock_guard<mutex> g(mtx);\n    cout << msg << "\\n";\n  }\n};\n\nint main() {\n  Logger logger;\n  thread t1([&]{ logger.log(\"from t1\"); });\n  thread t2([&]{ logger.log(\"from t2\"); });\n  t1.join();\n  t2.join();\n}',
      hints: ['Logger 内部持有 mutex，对外提供线程安全接口', 'lambda 捕获引用 & 访问同一个 logger 对象', '输出不会互交织'],
    },
    {
      type: 'code-runner',
      instruction: '用 lock_guard 保护多个整数的线程安全读写：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nstruct Point { int x, y; };\nPoint p = {0, 0};\n\nvoid move_by(int dx, int dy) {\n  lock_guard<mutex> g(mtx);\n  p.x += dx;\n  p.y += dy;\n}\n\nint main() {\n  thread t1(move_by, 1, 2);\n  thread t2(move_by, 3, 4);\n  t1.join();\n  t2.join();\n  lock_guard<mutex> g(mtx);\n  cout << "Point: " << p.x << ", " << p.y << "\\n";\n}',
      expectedOutput: 'Point: 4, 6',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '复习第 06 课：lock_guard 相比手动 lock/unlock 的优势是什么？',
      options: [
        { text: '让代码看起来更短', correct: false, explanation: '不仅仅是代码短，更重要的是安全' },
        { text: '自动管理锁的生命周期，异常安全', correct: true, explanation: 'RAII 确保析构时必定 unlock' },
        { text: '能避免所有死锁', correct: false, explanation: 'lock_guard 不能避免死锁' },
        { text: '性能比手动管理更好', correct: false, explanation: '性能几乎相同，lock_guard 没有额外开销' },
      ],
    },
    {
      type: 'exposition',
      text: '**练习：用 RAII 风格封装线程安全类**：\n\n把锁封装在类内部，对外只暴露安全方法。\n这是 C++ 中推荐的做法——不要暴露裸锁。',
    },
    {
      type: 'exposition',
      text: '**综合练习总结**：\n\n- 所有共享数据必须有锁保护\n- 优先用 lock_guard，需要灵活性用 unique_lock\n- 花括号控制临界区大小\n- 即使加锁了，也尽量缩小临界区\n- vector、map 等容器的修改也必须加锁\n\n下一课——死锁：锁用得不好也会带来新问题。',
    },
  ],
}

export default lesson
