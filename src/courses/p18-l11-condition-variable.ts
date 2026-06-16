import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'condition-variable',
    chapter: 19,
    title: '条件变量——等条件满足',
    subtitle: 'wait/notify',
    description: '学会用 condition_variable 让线程等待某个条件成立，避免忙等。',
    objectives: ['能用 condition_variable 实现线程间等待通知', '能区分 wait 和 notify_one/notify_all', '能写出生产者-消费者模式'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有时候线程需要等一个"条件"成立再继续。\n比如：数据准备好了再处理，队列非空才取出。\n**条件变量（condition_variable）就是为此而生。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**忙等 vs 条件变量**：\n\n```cpp\n// ❌ 忙等——浪费 CPU\nwhile (!data_ready) {\n  // 空转，CPU 100%\n}\n\n// ✅ 条件变量——等待通知\nunique_lock<mutex> lock(mtx);\ncv.wait(lock, []{ return data_ready; });\n// 线程休眠，收到通知才醒\n```\n\n忙等让 CPU 满载空转，条件变量让线程休眠，不消耗 CPU。',
    },
    {
      type: 'exposition',
      text: '**condition_variable 的基本用法**：\n\n```cpp\n#include <condition_variable>\n\nmutex mtx;\ncondition_variable cv;\nbool ready = false;\n\n// 等待线程\nvoid waiter() {\n  unique_lock<mutex> lock(mtx);\n  cv.wait(lock, []{ return ready; });  // 等 ready 变成 true\n  cout << "Proceed!\\n";\n}\n\n// 通知线程\nvoid notifier() {\n  {\n    lock_guard<mutex> lock(mtx);\n    ready = true;\n  }\n  cv.notify_one();  // 唤醒一个等待的线程\n}\n```\n\n`wait()` 内部：解锁→等待→唤醒→重新加锁→检查条件。',
    },
    {
      type: 'concept-cards',
      instruction: '条件变量的核心概念：',
      cards: [
        { glyph: '📡', term: 'condition_variable', meaning: '等待条件成立的同步原语', example: 'cv.wait(lock, pred)' },
        { glyph: '💤', term: 'wait()', meaning: '等待通知，线程休眠', example: '等条件成立才继续' },
        { glyph: '🔔', term: 'notify_one()', meaning: '唤醒一个等待线程', example: '只唤醒一个' },
        { glyph: '📣', term: 'notify_all()', meaning: '唤醒所有等待线程', example: '广播通知' },
      ],
    },
    {
      type: 'exposition',
      text: '**wait 的详细过程**：\n\n```cpp\ncv.wait(lock, predicate);\n// 等价于：\nwhile (!predicate()) {\n  // 1. 解锁 mutex\n  // 2. 进入休眠等待通知\n  // 3. 被唤醒后重新加锁\n  // 4. 再次检查条件\n}\n```\n\n注意：\n- `wait` 的第一个参数必须是 **`unique_lock`**（不是 lock_guard）\n- 因为 wait 需要临时解锁和重新加锁\n- 第二个参数是条件判断函数（可以省略）',
    },
    {
      type: 'exposition',
      text: '**生产者-消费者模式**：\n\n```cpp\nqueue<int> q;\nmutex mtx;\ncondition_variable cv;\n\nvoid producer() {\n  for (int i = 0; i < 10; i++) {\n    {\n      lock_guard<mutex> lock(mtx);\n      q.push(i);\n    }\n    cv.notify_one();  // 通知消费者\n  }\n}\n\nvoid consumer() {\n  while (true) {\n    unique_lock<mutex> lock(mtx);\n    cv.wait(lock, []{ return !q.empty(); });\n    int val = q.front();\n    q.pop();\n    lock.unlock();\n    cout << val << \"\\n\";\n  }\n}\n```\n\n条件变量是实现生产者-消费者的标准方式。',
    },
    {
      type: 'exposition',
      text: '**虚假唤醒 (Spurious Wakeup)**：\n\n条件变量的 `wait` 有时会**在没有被通知的情况下返回**。\n这叫虚假唤醒——不是 bug，是标准允许的行为。\n\n解决方案：**永远用带谓词（predicate）的 wait**：\n\n```cpp\n// ✅ 安全——即使虚假唤醒也会检查条件\ncv.wait(lock, []{ return ready; });\n\n// ❌ 不安全——虚假唤醒就会错误继续\ncv.wait(lock);  // 需要自己在循环中检查\n```\n\n带谓词的 wait 内部自动循环检查条件。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用条件变量等待通知的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <condition_variable>\nusing namespace std;\n\nmutex mtx;\ncondition_variable cv;\nbool ready = false;\n\nvoid worker() {\n  unique_lock<mutex> lock(mtx);\n  cv.wait(lock, []{ return ready; });\n  cout << "Worker starts\\n";\n}\n\nint main() {\n  thread t(worker);\n  this_thread::sleep_for(chrono::milliseconds(100));\n  {\n    lock_guard<mutex> lock(mtx);\n    ready = true;\n  }\n  cv.notify_one();\n  t.join();\n}',
      hints: ['`cv.wait(lock, ...)` 先检查条件，不满足就休眠', '`notify_one()` 唤醒一个等待的线程', '条件 `ready` 必须在锁保护下修改'],
    },
    {
      type: 'multiple-choice',
      question: '以下关于 `condition_variable::wait` 的说法，哪个是正确的？',
      options: [
        { text: 'wait 必须在 lock_guard 保护下调用', correct: false, explanation: 'wait 需要 unique_lock，因为需要临时解锁' },
        { text: 'wait 会解锁 mutex，休眠，唤醒后重新加锁', correct: true, explanation: '这是 wait 的标准行为，让其他线程可以修改条件' },
        { text: 'wait 只接受 unique_lock，不接受 lock_guard', correct: true, explanation: 'lock_guard 不能手动 unlock，wait 需要这个能力' },
        { text: '带谓词的 wait 不需要检查虚假唤醒', correct: false, explanation: '带谓词的 wait 内部自动循环检查，正好防虚假唤醒' },
      ],
      mode: 'multiple',
    },
    {
      type: 'type-it',
      instruction: '敲一个简单的生产者-消费者模式：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <condition_variable>\n#include <queue>\nusing namespace std;\n\nmutex mtx;\ncondition_variable cv;\nqueue<int> q;\n\nvoid producer() {\n  for (int i = 1; i <= 5; i++) {\n    lock_guard<mutex> lock(mtx);\n    q.push(i);\n    cv.notify_one();\n  }\n}\n\nvoid consumer() {\n  for (int i = 1; i <= 5; i++) {\n    unique_lock<mutex> lock(mtx);\n    cv.wait(lock, []{ return !q.empty(); });\n    int val = q.front();\n    q.pop();\n    cout << val << " ";  \n  }\n}\n\nint main() {\n  thread t1(producer);\n  thread t2(consumer);\n  t1.join();\n  t2.join();\n}',
      hints: ['生产者 push 数据后 `notify_one` 通知消费者', '消费者 `wait` 直到队列非空', 'q 是共享数据，两个线程的访问都要用锁保护'],
    },
    {
      type: 'code-runner',
      instruction: '运行以下条件变量的完整示例：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <condition_variable>\nusing namespace std;\n\nmutex mtx;\ncondition_variable cv;\nint data = 0;\nbool ready = false;\n\nvoid prepare() {\n  this_thread::sleep_for(chrono::milliseconds(50));\n  lock_guard<mutex> lock(mtx);\n  data = 42;\n  ready = true;\n  cv.notify_one();\n}\n\nvoid process() {\n  unique_lock<mutex> lock(mtx);\n  cv.wait(lock, []{ return ready; });\n  cout << "Got data: " << data << "\\n";\n}\n\nint main() {\n  thread t1(prepare);\n  thread t2(process);\n  t1.join();\n  t2.join();\n}',
      expectedOutput: 'Got data: 42',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '复习第 10 课：以下哪个方法可以安全地一次锁住多个 mutex？',
      options: [
        { text: 'mutex::lock_all()', correct: false, explanation: 'mutex 没有 lock_all 方法' },
        { text: 'std::lock()', correct: true, explanation: 'std::lock 可以批量加锁多个 mutex，避免死锁' },
        { text: 'lock_guard 嵌套', correct: false, explanation: '嵌套 lock_guard 不能解决加锁顺序不同的死锁' },
        { text: 'unique_lock 默认构造', correct: false, explanation: '默认构造不锁任何 mutex' },
      ],
    },
    {
      type: 'exposition',
      text: '**notify_one vs notify_all**：\n\n```cpp\ncv.notify_one();  // 只唤醒一个等待线程\ncv.notify_all();  // 唤醒所有等待线程\n```\n\n- 如果多个线程在等待同一个条件，且条件变化只释放一个任务 → `notify_one`\n- 如果条件变化对多个等待线程都有影响 → `notify_all`\n- `notify_all` 会有"惊群效应"——很多线程被唤醒但只有一个能继续',
    },
    {
      type: 'exposition',
      text: '**条件变量与 mutex 的配合**：\n\n条件变量必须和 mutex 配合使用，原因：\n\n```cpp\n// ❌ 错误：检查和等待不是原子\nif (!ready) {\n  cv.wait(lock);  // 可能错过通知！\n}\n\n// ✅ 正确：谓词在锁保护下检查\ncv.wait(lock, []{ return ready; });\n```\n\n第二个参数（谓词）在锁保护下检查，\n确保不会错过条件变化。',
    },
    {
      type: 'exposition',
      text: '**条件变量与 unique_lock**：\n\n为什么 `wait()` 必须用 `unique_lock` 而不是 `lock_guard`？\n\n因为 `wait()` 在内部需要：\n1. **解锁** mutex（让其他线程可以修改条件）\n2. 进入休眠\n3. 被唤醒后**重新加锁**\n\n`unique_lock` 提供了 `lock()` 和 `unlock()` 接口，\n而 `lock_guard` 不提供。',
    },
    {
      type: 'exposition',
      text: '**条件变量的局限**：\n\n条件变量虽然强大，但有一些局限：\n\n1. **失忆唤醒**：如果先 notify 再 wait，会永远等不到\n2. **虚假唤醒**：必须用谓词循环检查\n3. **需要配对**：notify_one 只唤醒一个，如果多个线程等待同一条件，需要用 notify_all\n4. **复杂状态**：多个条件变量共享同一锁时，交互容易出错\n\n替代方案：C++20 提供了 `std::latch` 和 `std::barrier` 等更简单的同步原语。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 notify_all 唤醒多个线程的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <condition_variable>\nusing namespace std;\n\nmutex mtx;\ncondition_variable cv;\nbool ready = false;\n\nvoid worker(int id) {\n  unique_lock<mutex> lock(mtx);\n  cv.wait(lock, []{ return ready; });\n  cout << "Worker " << id << " starts\\n";\n}\n\nint main() {\n  thread w1(worker, 1);\n  thread w2(worker, 2);\n  thread w3(worker, 3);\n  this_thread::sleep_for(chrono::milliseconds(50));\n  {\n    lock_guard<mutex> lock(mtx);\n    ready = true;\n  }\n  cv.notify_all();\n  w1.join();\n  w2.join();\n  w3.join();\n}',
      hints: ['`notify_all()` 唤醒所有等待的线程', '三个 worker 都在等待同一个条件 ready', '所有线程被唤醒后各自继续执行'],
    },
    {
      type: 'exposition',
      text: '**条件变量总结**：\n\n- `condition_variable` 让线程等待条件成立\n- `wait(lock, predicate)` 检查→休眠→唤醒→再检查\n- `notify_one()` 唤醒一个等待线程\n- `notify_all()` 唤醒所有等待线程\n- 必须用 `unique_lock`，因为 wait 需要临时解锁\n- 带谓词的 wait 自动防虚假唤醒\n- 典型应用：生产者-消费者模式',
    },
  ],
}

export default lesson
