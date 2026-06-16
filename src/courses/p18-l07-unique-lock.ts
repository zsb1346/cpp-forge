import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'unique-lock',
    chapter: 19,
    title: 'unique_lock——更灵活',
    subtitle: '延迟加锁提前解锁',
    description: '学会用 unique_lock 灵活控制锁的生命周期，实现延迟加锁和提前解锁。',
    objectives: ['能用 unique_lock 实现延迟加锁和提前解锁', '能对比 lock_guard 和 unique_lock 的适用场景', '能理解 unique_lock 的可移动性'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`lock_guard` 简单可靠，但不灵活：\n- 不能提前 unlock\n- 不能延迟加锁\n- 不能转移所有权\n\n**`unique_lock` 提供了更多控制选项。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '```cpp\nmutex mtx;\nunique_lock<mutex> lock(mtx);  // 构造时加锁（默认行为）\n// ... 临界区\nlock.unlock();                  // 可以提前解锁\n\n// 延迟加锁：构造时不锁定\nunique_lock<mutex> lock2(mtx, defer_lock);\n// ... 做一些准备工作\nlock2.lock();  // 真正需要时才加锁\n```\n\n`unique_lock` 比 `lock_guard` 多了构造选项和成员函数。',
    },
    {
      type: 'concept-cards',
      instruction: 'unique_lock 的三种构造模式：',
      cards: [
        { glyph: '🔒', term: '默认构造', meaning: '构造时立即 lock()', example: 'unique_lock<mutex> lk(mtx)' },
        { glyph: '⏳', term: 'defer_lock', meaning: '构造时不加锁，稍后手动 lock', example: 'unique_lock<mutex> lk(mtx, defer_lock)' },
        { glyph: '🔓', term: '提前 unlock', meaning: '在析构前手动释放锁', example: 'lk.unlock() 后可以再次 lock()' },
      ],
    },
    {
      type: 'exposition',
      text: '**提前 unlock 的场景**：\n\n```cpp\nmutex mtx;\nData result;\n\nvoid process() {\n  unique_lock<mutex> lock(mtx);\n  result = shared_data;  // 在锁保护下读取\n  lock.unlock();          // 提前解锁！\n\n  // 这里不需要锁了，做耗时操作\n  save_to_disk(result);\n  render_graphics(result);\n}  // lock 析构时检查：已经 unlock 了，不再重复 unlock\n```\n\n减少临界区大小，提高并发度。这是 `lock_guard` 做不到的。',
    },
    {
      type: 'exposition',
      text: '**defer_lock 延迟加锁的场景**：\n\n```cpp\nmutex mtx;\n\nvoid transfer(Account& from, Account& to, int amount) {\n  unique_lock<mutex> lock1(from.mtx, defer_lock);\n  unique_lock<mutex> lock2(to.mtx, defer_lock);\n\n  // 先做一些准备工作\n  if (from.balance < amount) return;\n\n  // 真正需要时才加锁\n  lock(from.mtx, to.mtx);  // 批量加锁，避免死锁\n  // 或：\n  lock1.lock();\n  lock2.lock();\n\n  from.balance -= amount;\n  to.balance += amount;\n}\n```\n\n延迟加锁让你先完成准备工作再获取锁。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 unique_lock 提前解锁的例子：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <chrono>\nusing namespace std;\n\nmutex mtx;\nint data = 0;\n\nvoid work() {\n  unique_lock<mutex> lock(mtx);\n  int val = data;\n  lock.unlock();\n  this_thread::sleep_for(chrono::milliseconds(50));\n  cout << val << "\\n";\n}\n\nint main() {\n  thread t1(work);\n  thread t2(work);\n  t1.join();\n  t2.join();\n}',
      hints: ['`unique_lock<mutex> lock(mtx)` 构造时加锁', '`lock.unlock()` 提前释放锁，缩短临界区', 'sleep_for 在锁外执行，不会阻塞其他线程'],
    },
    {
      type: 'exposition',
      text: '**unique_lock 可移动**\n\n`unique_lock` 支持移动语义，但不可复制：\n\n```cpp\nunique_lock<mutex> get_lock() {\n  unique_lock<mutex> lock(mtx);\n  // ...\n  return lock;  // 移动返回\n}\n\nvoid use() {\n  auto lock = get_lock();  // 锁的所有权转移\n  // 持有锁\n}  // lock 析构，解锁\n```\n\n这在需要把锁传递给函数的场景中非常有用。\n`lock_guard` 不支持移动。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用 defer_lock 延迟加锁的例子：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx;\nint counter = 0;\n\nvoid increment() {\n  unique_lock<mutex> lock(mtx, defer_lock);\n  lock.lock();\n  counter++;\n  lock.unlock();\n}\n\nint main() {\n  thread t1(increment);\n  thread t2(increment);\n  t1.join();\n  t2.join();\n  cout << counter << "\\n";\n}',
      hints: ['`defer_lock` 告诉 unique_lock 先不加锁', '`lock.lock()` 在你准备好的时候手动加锁', '`lock.unlock()` 提前解锁'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是 `lock_guard` 能做但 `unique_lock` 不能做的？',
      options: [
        { text: '提前 unlock', correct: false, explanation: 'lock_guard 不能提前 unlock，但 unique_lock 可以' },
        { text: '延迟加锁', correct: false, explanation: 'lock_guard 不能延迟，但 unique_lock 可以' },
        { text: '移动所有权', correct: false, explanation: 'lock_guard 不能移动，但 unique_lock 可以' },
        { text: '以上都不是——unique_lock 能做 lock_guard 所有功能还更多', correct: true, explanation: 'unique_lock 是 lock_guard 的超集' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习第 06 课：`lock_guard` 的析构函数会做什么？',
      options: [
        { text: '什么都不做', correct: false, explanation: 'lock_guard 的析构会释放锁' },
        { text: '调用 mutex 的 unlock()', correct: true, explanation: 'RAII 原则——析构时释放资源' },
        { text: '销毁 mutex', correct: false, explanation: 'lock_guard 不会销毁 mutex，只是解锁' },
        { text: '通知所有等待的线程', correct: false, explanation: 'unlock 后等待的线程自然会被唤醒' },
      ],
    },
    {
      type: 'exposition',
      text: '**unique_lock vs lock_guard 选择指南**：\n\n| 场景 | 推荐 |\n|------|------|\n| 简单加锁解锁 | lock_guard |\n| 需要提前 unlock | unique_lock |\n| 需要延迟加锁 | unique_lock |\n| 需要移动所有权 | unique_lock |\n| 性能敏感 | lock_guard（更轻量） |\n\n能用 `lock_guard` 就优先用，需要灵活性才用 `unique_lock`。',
    },
    {
      type: 'exposition',
      text: '**unique_lock 的更多操作**：\n\n```cpp\nmutex mtx;\nunique_lock<mutex> lock(mtx);\n\nlock.try_lock();     // 尝试加锁，不阻塞，返回 bool\nlock.try_lock_for(chrono::seconds(1));  // 超时尝试\nlock.try_lock_until(time_point);        // 等到某个时间点\nlock.owns_lock();    // 检查是否持有锁\nlock.release();      // 释放锁所有权（不 unlock！）\nbool locked = lock.mutex();  // 获取关联的 mutex 指针\n```\n\n`unique_lock` 提供了丰富的锁管理接口。',
    },
    {
      type: 'exposition',
      text: '**unique_lock 配合条件变量**：\n\n这是 `unique_lock` 最重要的用途之一。\n`condition_variable::wait()` 只能用 `unique_lock`：\n\n```cpp\ncondition_variable cv;\nmutex mtx;\n\nvoid waiter() {\n  unique_lock<mutex> lock(mtx);\n  cv.wait(lock, []{ return ready; });\n  // wait 内部解锁→等待→重新加锁\n}\n```\n\n因为 wait 需要临时解锁和重新加锁，\n只有 `unique_lock` 提供了这个灵活性。',
    },
    {
      type: 'exposition',
      text: '**unique_lock 的 try_lock_until**：\n\n除了 `try_lock_for`（等一段时间），还有 `try_lock_until`（等到某个时刻）：\n\n```cpp\nunique_lock<mutex> lock(mtx, defer_lock);\n\nauto deadline = chrono::steady_clock::now()\n                + chrono::milliseconds(100);\n\nif (lock.try_lock_until(deadline)) {\n  // 在截止时间前拿到了锁\n} else {\n  // 到截止时间还没拿到锁\n}\n```\n\n适合有严格时间限制的任务。',
    },
    {
      type: 'exposition',
      text: '**unique_lock 所有构造模式总结**：\n\n```\nunique_lock<mutex> lk(mtx);              // 默认：立即 lock\nunique_lock<mutex> lk(mtx, defer_lock);   // 延迟加锁\nunique_lock<mutex> lk(mtx, try_to_lock);  // 尝试加锁\nunique_lock<mutex> lk(mtx, adopt_lock);   // 假设已加锁\nunique_lock<mutex> lk;                     // 空锁，稍后赋值\n```\n\n`adopt_lock` 适用于 mutex 已经 lock 的情况。\n`defer_lock` 是最常用的——配合 `std::lock` 防死锁。',
    },
    {
      type: 'exposition',
      text: '**性能差异**：\n\n`lock_guard` 是纯 RAII 封装，没有任何额外开销。\n`unique_lock` 因为支持更多功能（移动、提前 unlock 等），内部需要维护状态标记，有极小的额外开销。\n\n但对于绝大多数场景，这个开销可以忽略不计。\n优先**写对**，再考虑优化。',
    },
    {
      type: 'exposition',
      text: '**总结**：\n\n- `unique_lock` 比 `lock_guard` 更灵活\n- 支持 `defer_lock` 延迟加锁\n- 支持手动 `unlock()` 提前解锁\n- 支持移动所有权\n- 能做 `lock_guard` 的所有事，再加更多\n- 简单场景用 `lock_guard`，复杂场景用 `unique_lock`',
    },
    {
      type: 'multiple-choice',
      question: '复习第 05 课：mutex 的 lock() 在锁被占用时是什么行为？',
      options: [
        { text: '立即返回 false', correct: false, explanation: 'lock() 会阻塞等待，try_lock() 才返回 false' },
        { text: '阻塞等待直到锁可用', correct: true, explanation: 'lock() 阻塞等待直到成功获取锁' },
        { text: '抛出异常', correct: false, explanation: 'lock() 不会抛出异常' },
        { text: '原地自旋忙等', correct: false, explanation: '实现可能自旋一会儿，但标准只要求阻塞' },
      ],
    },
  ],
}

export default lesson
