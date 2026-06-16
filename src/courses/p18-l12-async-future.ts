import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'async-future',
    chapter: 19,
    title: 'async 和 future',
    subtitle: '手写 thread 的替代',
    description: '学会用 std::async 和 std::future 简化并发编程，避免手动管理线程。',
    objectives: ['能用 std::async 启动异步任务', '能用 std::future 获取异步结果', '能区分 async 和 thread 的使用场景'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '手动管理 `std::thread` 需要处理创建、join/detach、共享数据等等。\n能不能有更简单的方式？\n**`std::async` 和 `std::future` 就是更高层的并发抽象。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '```cpp\n#include <future>\n\n// 启动异步任务，返回 future\nfuture<int> result = async(launch::async, []{\n  // 耗时计算\n  return 42;\n});\n\n// 做其他事...\n\n// 需要结果时，调用 get()——阻塞直到结果可用\nint value = result.get();  // 42\n```\n\n`async` 启动一个异步任务，`future` 用来拿结果。\n不需要手动创建 thread，不需要管理锁。',
    },
    {
      type: 'concept-cards',
      instruction: 'async 和 future 核心概念：',
      cards: [
        { glyph: '🚀', term: 'std::async', meaning: '启动异步任务，返回 future', example: 'async(launch::async, func)' },
        { glyph: '📦', term: 'std::future', meaning: '持有将来才可用的值', example: 'future<int>' },
        { glyph: '📥', term: '.get()', meaning: '获取结果，阻塞直到任务完成', example: 'int v = fut.get()' },
        { glyph: '🔍', term: 'launch 策略', meaning: '控制何时/如何执行任务', example: 'async / deferred' },
      ],
    },
    {
      type: 'exposition',
      text: '**launch 策略**：\n\n```cpp\n// 策略 1：立即在新线程中执行\nasync(launch::async, func);\n\n// 策略 2：延迟执行（get 时才执行，在调用线程中）\nasync(launch::deferred, func);\n\n// 策略 3：由系统决定（默认）\nasync(func);  // 等价于 async(launch::async | launch::deferred, func)\n```\n\n强烈建议显式指定 `launch::async`，\n否则系统可能选择 deferred 模式，行为可能不是你要的。',
    },
    {
      type: 'exposition',
      text: '**async 自动处理异常**：\n\n如果异步任务抛出异常，`get()` 会重新抛出这个异常：\n\n```cpp\nfuture<void> result = async(launch::async, []{\n  throw runtime_error(\"oops\");\n});\n\ntry {\n  result.get();  // 重新抛出异常\n} catch (const exception& e) {\n  cout << e.what();  // "oops"\n}\n```\n\n而手动 thread 管理异常要复杂得多。',
    },
    {
      type: 'exposition',
      text: '**thread vs async 对比**：\n\n```cpp\n// thread 方式\nvoid compute(int& result) { result = 42; }\nint val = 0;\nthread t(compute, ref(val));\nt.join();\ncout << val;  // 通过引用拿结果\n\n// async 方式——更简洁\nfuture<int> fut = async(launch::async, []{\n  return 42;\n});\ncout << fut.get();  // 直接返回结果\n```\n\n`async` 不需要共享变量、不需要引用传递、不需要手动 join。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 async 获取异步结果的程序：',
      code: '#include <iostream>\n#include <future>\nusing namespace std;\n\nint square(int x) {\n  return x * x;\n}\n\nint main() {\n  future<int> fut = async(launch::async, square, 5);\n  cout << "Result: " << fut.get() << "\\n";\n}',
      hints: ['`async(launch::async, square, 5)` 在新线程中执行 square(5)', '`fut.get()` 阻塞直到结果可用', '`launch::async` 确保在新线程中立即执行'],
    },
    {
      type: 'type-it',
      instruction: '敲一个用 async 并发计算两个值的程序：',
      code: '#include <iostream>\n#include <future>\nusing namespace std;\n\nint main() {\n  future<int> f1 = async(launch::async, []{ return 10 + 20; });\n  future<int> f2 = async(launch::async, []{ return 30 + 40; });\n  int sum = f1.get() + f2.get();\n  cout << sum << "\\n";\n}',
      hints: ['两个 async 任务可以并发执行', '`get()` 会等待对应任务完成', '`f1.get()` 和 `f2.get()` 的顺序不影响结果'],
    },
    {
      type: 'exposition',
      text: '**shared_future——多线程共享结果**：\n\n```cpp\nfuture<int> fut = async(launch::async, []{\n  return 42;\n});\n\nshared_future<int> sf = fut.share();\n// fut 不再可用，结果转移到 sf\n\n// 多个线程可以安全地读取同一个 shared_future\nthread t1([sf]{ cout << sf.get(); });\nthread t2([sf]{ cout << sf.get(); });\n```\n\n`future` 的 `get()` 只能调用一次。\n如果多个地方需要结果，用 `shared_future`。',
    },
    {
      type: 'multiple-choice',
      question: '`std::future::get()` 可以调用几次？',
      options: [
        { text: '没有限制', correct: false, explanation: 'future 的 get 只能调用一次' },
        { text: '只能调用一次', correct: true, explanation: 'get() 后 future 变为无效，再次调用会抛异常' },
        { text: '两次，第二次返回缓存的值', correct: false, explanation: '不能调用两次，第二次会抛 std::future_error' },
        { text: '取决于异步任务是否完成', correct: false, explanation: '不管是否完成，get 都只能调用一次' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行以下使用 async 的程序：',
      code: '#include <iostream>\n#include <future>\n#include <chrono>\nusing namespace std;\n\nint slow_add(int a, int b) {\n  this_thread::sleep_for(chrono::milliseconds(50));\n  return a + b;\n}\n\nint main() {\n  future<int> f1 = async(launch::async, slow_add, 100, 200);\n  future<int> f2 = async(launch::async, slow_add, 300, 400);\n  int result = f1.get() + f2.get();\n  cout << "Total: " << result << "\\n";\n}',
      expectedOutput: 'Total: 1000',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '复习第 11 课：`condition_variable::wait` 为什么要用 `unique_lock` 而不是 `lock_guard`？',
      options: [
        { text: '因为 unique_lock 性能更好', correct: false, explanation: '性能不是主要原因' },
        { text: '因为 wait 需要临时解锁和重新加锁，只有 unique_lock 支持', correct: true, explanation: 'wait 内部需要 unlock 和 lock，lock_guard 不提供手动 unlock' },
        { text: '因为 lock_guard 不能用在条件变量上', correct: false, explanation: '技术上讲可以用，但 wait 需要 unique_lock' },
        { text: '因为 unique_lock 可以移动', correct: false, explanation: '可移动性和条件变量的需求无关' },
      ],
    },
    {
      type: 'exposition',
      text: '**async 的适用场景**：\n\n✅ 适合 async：\n- 需要异步计算并拿结果\n- 任务相对独立，不需要精细的线程控制\n- 简单的"发起→等结果"模式\n\n❌ 不适合 async：\n- 需要长时间运行的后台任务（用 thread + detach）\n- 需要精细的线程同步（多个条件变量交互）\n- 需要线程池（考虑 `std::thread_pool` C++20 / 第三方库）',
    },
    {
      type: 'exposition',
      text: '**future 的 wait 和 wait_for**：\n\n除了 `get()`，`future` 还提供了非阻塞的等待方式：\n\n```cpp\nfuture<int> fut = async(launch::async, slow_func);\n\nfut.wait();  // 阻塞直到结果可用（但不获取）\n\nif (fut.wait_for(chrono::seconds(1))\n    == future_status::ready) {\n  cout << fut.get();  // 结果已就绪\n} else {\n  cout << \"Still waiting...\\n\";\n}\n```\n\n`wait_for` 允许设置超时，避免无限期阻塞。',
    },
    {
      type: 'exposition',
      text: '**async 的延迟求值（deferred）模式**：\n\n```cpp\nfuture<int> fut = async(launch::deferred, []{\n  cout << "Computing...\\n";\n  return 42;\n});\n\n// 此时还没有执行！\nthis_thread::sleep_for(chrono::seconds(1));\n\nint x = fut.get();  // 此时才执行——在 get() 的线程中\n```\n\n`launch::deferred` 不会创建新线程。\n任务在 `get()` 或 `wait()` 调用时**惰性执行**。\n这适合不一定要运行的任务。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 async 和 future 处理异常的示例：',
      code: '#include <iostream>\n#include <future>\n#include <stdexcept>\nusing namespace std;\n\nint risky() {\n  throw runtime_error("something went wrong");\n}\n\nint main() {\n  future<int> fut = async(launch::async, risky);\n  try {\n    int x = fut.get();\n    cout << x << "\\n";\n  } catch (const exception& e) {\n    cout << "Caught: " << e.what() << "\\n";\n  }\n}',
      hints: ['async 任务中的异常会被存储，get() 时重新抛出', '用 try-catch 包围 get() 来捕获异常', '如果没有 get()，异常会被忽略'],
    },
    {
      type: 'code-runner',
      instruction: '用 async 并发查找数组中的最大值：',
      code: '#include <iostream>\n#include <future>\n#include <vector>\nusing namespace std;\n\nint find_max(const vector<int>& v, int start, int end) {\n  int m = v[start];\n  for (int i = start + 1; i < end; i++) {\n    if (v[i] > m) m = v[i];\n  }\n  return m;\n}\n\nint main() {\n  vector<int> data = {3, 7, 1, 9, 4, 6, 8, 2, 5, 0};\n  future<int> f1 = async(launch::async, find_max, ref(data), 0, 5);\n  future<int> f2 = async(launch::async, find_max, ref(data), 5, 10);\n  int max1 = f1.get();\n  int max2 = f2.get();\n  cout << "Max: " << (max1 > max2 ? max1 : max2) << "\\n";\n}',
      expectedOutput: 'Max: 9',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'exposition',
      text: '**总结**：\n\n- `std::async` 简化异步任务启动\n- `std::future` 获取异步结果\n- `get()` 阻塞等待结果，只能调用一次\n- 建议显式指定 `launch::async`\n- 异常会通过 `get()` 重新抛出\n- 适合简单异步任务，复杂场景仍需要 thread',
    },
  ],
}

export default lesson
