import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-concurrency',
    chapter: 19,
    title: '并发综合练习',
    subtitle: '巩固 01-13',
    description: '综合练习线程、锁、条件变量、async、atomic，全面巩固并发编程知识。',
    objectives: ['能综合运用 thread/mutex/atomic 解决并发问题', '能选择合适的并发工具', '能分析并发代码的正确性'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '从"为什么需要并发"到"atomic 无锁操作"，你已经学了并发编程的完整知识链。\n**现在是综合练习时间。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 mutex 保护 vector 的线程安全容器：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <vector>\nusing namespace std;\n\nmutex mtx;\nvector<int> data;\n\nvoid add(int x) {\n  lock_guard<mutex> guard(mtx);\n  data.push_back(x);\n}\n\nint main() {\n  thread t1(add, 1);\n  thread t2(add, 2);\n  thread t3(add, 3);\n  t1.join();\n  t2.join();\n  t3.join();\n  lock_guard<mutex> guard(mtx);\n  for (int v : data) cout << v << " ";\n}',
      hints: ['`push_back` 修改 vector 的内部状态，必须加锁', '遍历输出也要加锁——读也属于数据访问', 'vector 的容量变化（分配内存）尤其危险'],
    },
    {
      type: 'type-it',
      instruction: '敲一个用 condition_variable 实现的任务队列：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <condition_variable>\n#include <queue>\nusing namespace std;\n\nmutex mtx;\ncondition_variable cv;\nqueue<int> tasks;\n\nvoid worker() {\n  while (true) {\n    unique_lock<mutex> lock(mtx);\n    cv.wait(lock, []{ return !tasks.empty(); });\n    int t = tasks.front();\n    tasks.pop();\n    lock.unlock();\n    cout << "Processed: " << t << "\\n";\n    if (t == -1) break;\n  }\n}\n\nint main() {\n  thread w(worker);\n  for (int i = 1; i <= 5; i++) {\n    lock_guard<mutex> lock(mtx);\n    tasks.push(i);\n    cv.notify_one();\n  }\n  lock_guard<mutex> lock(mtx);\n  tasks.push(-1);\n  cv.notify_one();\n  w.join();\n}',
      hints: ['-1 是终止信号，worker 收到后停止循环', '`cv.notify_one()` 每次 push 后都通知', '`lock.unlock()` 提前释放锁，让 producer 可以继续 push'],
    },
    {
      type: 'code-runner',
      instruction: '用 async 实现并发求和：',
      code: '#include <iostream>\n#include <future>\n#include <vector>\nusing namespace std;\n\nint range_sum(int start, int end) {\n  int sum = 0;\n  for (int i = start; i <= end; i++) sum += i;\n  return sum;\n}\n\nint main() {\n  future<int> f1 = async(launch::async, range_sum, 1, 250);\n  future<int> f2 = async(launch::async, range_sum, 251, 500);\n  future<int> f3 = async(launch::async, range_sum, 501, 750);\n  future<int> f4 = async(launch::async, range_sum, 751, 1000);\n  int total = f1.get() + f2.get() + f3.get() + f4.get();\n  cout << "Sum 1-1000 = " << total << "\\n";\n}',
      expectedOutput: 'Sum 1-1000 = 500500',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '用 atomic 实现线程安全的计数器：',
      code: '#include <iostream>\n#include <thread>\n#include <atomic>\nusing namespace std;\n\natomic<long long> counter(0);\n\nvoid add_million() {\n  for (int i = 0; i < 1000000; i++) {\n    counter.fetch_add(1);\n  }\n}\n\nint main() {\n  thread t1(add_million);\n  thread t2(add_million);\n  thread t3(add_million);\n  thread t4(add_million);\n  t1.join();\n  t2.join();\n  t3.join();\n  t4.join();\n  cout << "Counter: " << counter.load() << " (expected 4000000)\\n";\n}',
      expectedOutput: 'Counter: 4000000 (expected 4000000)',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'exposition',
      text: '**场景选择题：选对正确的工具**\n\n以下是四种并发需求——选最适合的工具：\n\n1. 多个线程增加一个共享计数\n2. 线程需要等待某个条件满足\n3. 简单启动一个任务并取回结果\n4. 保护一个复杂数据结构',
    },
    {
      type: 'multiple-choice',
      question: '场景 1：多个线程增加一个共享计数，选哪个工具？',
      options: [
        { text: 'std::atomic<int>', correct: true, explanation: '简单计数 atomic 最合适——无锁、高性能' },
        { text: 'std::mutex', correct: false, explanation: 'mutex 也能用，但 atomic 更轻量' },
        { text: 'std::condition_variable', correct: false, explanation: '条件变量是做等待通知的，不适合计数' },
        { text: 'std::async', correct: false, explanation: 'async 启动异步任务，不适合多线程累积操作' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '场景 2：线程需要等数据准备好再处理，选哪个工具？',
      options: [
        { text: 'std::atomic<bool> 忙等', correct: false, explanation: '忙等浪费 CPU，不推荐' },
        { text: 'std::condition_variable', correct: true, explanation: '条件变量专为等待条件而设计，不消耗 CPU' },
        { text: 'std::mutex', correct: false, explanation: 'mutex 只提供互斥，不做等待通知' },
        { text: 'std::thread::detach', correct: false, explanation: 'detach 让线程独立运行，与等待条件无关' },
      ],
    },
    {
      type: 'exposition',
      text: '**并发编程的核心原则回顾**：\n\n1. **最小化共享**：能不共享就不共享\n2. **必须共享时**：用锁或 atomic 保护\n3. **锁的粒度**：只保护必要代码\n4. **死锁预防**：固定加锁顺序或用 std::lock\n5. **优先 RAII**：lock_guard / unique_lock 代替手动 lock\n6. **合适工具**：简单计数用 atomic，复杂同步用 mutex + CV\n7. **能不上锁就不上锁**：考虑 async 减少共享状态',
    },
    {
      type: 'exposition',
      text: '**代码审查练习**：\n\n检查这段代码的问题：\n\n```cpp\nmutex mtx;\nint counter = 0;\n\nvoid increment() {\n  if (counter < 100) {     // ① 检查\n    mtx.lock();\n    counter++;              // ② 操作\n    mtx.unlock();\n  }\n}\n```\n\n问题：检查和使用之间有**时间窗**——\nif 检查时 counter=99，然后另一个线程改了它到 100，\n当前线程接着加到了 101，违反了"不超过 100"的约束。',
    },
    {
      type: 'exposition',
      text: '**正确做法：把检查放到锁内**：\n\n```cpp\nvoid increment() {\n  mtx.lock();\n  if (counter < 100) {\n    counter++;\n  }\n  mtx.unlock();\n}\n\n// 或更安全：用 lock_guard\nvoid increment() {\n  lock_guard<mutex> g(mtx);\n  if (counter < 100) {\n    counter++;\n  }\n}\n```\n\n**检查和使用必须在同一锁保护之下——没有例外。**',
    },
    {
      type: 'multiple-choice',
      question: '复习第 13 课：`std::atomic` 相比 `std::mutex` 的优势是什么？',
      options: [
        { text: '能保护任意复杂的数据结构', correct: false, explanation: 'atomic 只支持简单类型' },
        { text: '无锁、不会死锁、性能更高', correct: true, explanation: 'atomic 使用 CPU 原子指令，无锁无死锁' },
        { text: '不需要头文件', correct: false, explanation: 'atomic 需要 <atomic> 头文件' },
        { text: '支持所有 C++ 类型', correct: false, explanation: 'atomic 只支持可平凡复制的类型' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 atomic_flag 实现一个自旋锁：',
      code: '#include <iostream>\n#include <thread>\n#include <atomic>\nusing namespace std;\n\natomic_flag lock_flag = ATOMIC_FLAG_INIT;\nint counter = 0;\n\nvoid increment() {\n  for (int i = 0; i < 10000; i++) {\n    while (lock_flag.test_and_set()) {}\n    counter++;\n    lock_flag.clear();\n  }\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << "Counter: " << counter << " (expected 20000)\\n";\n}',
      expectedOutput: 'Counter: 20000 (expected 20000)',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'exposition',
      text: '**并发性能考虑**：\n\n并发不是银弹——不是加越多线程越快：\n\n- 线程创建/销毁有开销\n- 锁争用会导致线程排队等待\n- 上下文切换消耗 CPU 时间\n- 多线程调试复杂度指数级上升\n\n经验法则：I/O 密集型任务可以用较多线程，\nCPU 密集型任务的线程数 ≈ CPU 核心数。',
    },
    {
      type: 'exposition',
      text: '**进度检查**：\n\n到目前，你应该能够：\n\n✅ 创建并管理 std::thread\n✅ 用 mutex 保护共享数据\n✅ 用 lock_guard / unique_lock 安全加锁\n✅ 用 condition_variable 做等待/通知\n✅ 用 async/future 简化异步任务\n✅ 用 atomic 做无锁操作\n✅ 预防和避免死锁',
    },
    {
      type: 'multiple-choice',
      question: '复习第 01 课：以下哪个是阻塞（Blocking）的例子？',
      options: [
        { text: 'int x = 5;', correct: false, explanation: '简单赋值不阻塞' },
        { text: 'cin >> x; 等待用户输入', correct: true, explanation: '等待用户输入时程序被阻塞' },
        { text: 'for (int i = 0; i < 10; i++) {}', correct: false, explanation: '循环执行不阻塞（除非有等待）' },
        { text: 'cout << "hello";', correct: false, explanation: '输出通常不阻塞（缓冲区写）' },
      ],
    },
    {
      type: 'exposition',
      text: '至此，\n\n你学会了并发编程从基础到实践的全部内容。\n下一课是阶段 18 的综合复习，把整个阶段的知识点串联起来。',
    },
    {
      type: 'exposition',
      text: '**阶段 18 路线回顾**：\n\n动机 → 线程创建 → detach → 数据竞争\n→ mutex → lock_guard → unique_lock\n→ 死锁 → 防死锁 → 条件变量\n→ async/future → atomic → 综合复习',
    },
  ],
}

export default lesson
