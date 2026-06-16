import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'deadlock-avoidance',
    chapter: 19,
    title: '避免死锁策略',
    subtitle: '固定顺序+std::lock',
    description: '学会用固定加锁顺序和 std::lock 批量加锁来避免死锁。',
    objectives: ['能用固定加锁顺序避免死锁', '能用 std::lock 批量加锁多个 mutex', '能分析代码中的死锁风险并提出改进方案'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '死锁很可怕，但**完全可以预防**。\n核心策略就两条：\n1. **固定加锁顺序**——所有线程按相同顺序加锁\n2. **批量加锁**——用 `std::lock` 一次锁多个 mutex',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**策略一：固定加锁顺序**\n\n死锁的根因是"循环等待"——A 锁 1 等 2，B 锁 2 等 1。\n解决方案：**所有线程永远按相同顺序加锁。**\n\n```cpp\n// 约定：总是先锁 mtx_a，再锁 mtx_b\n\nvoid thread_a() {\n  lock_guard<mutex> g1(mtx_a);  // 先锁 a\n  lock_guard<mutex> g2(mtx_b);  // 再锁 b\n}\n\nvoid thread_b() {\n  lock_guard<mutex> g1(mtx_a);  // 先锁 a（和 thread_a 一样顺序）\n  lock_guard<mutex> g2(mtx_b);  // 再锁 b\n}\n```\n\n循环等待被打破了。',
    },
    {
      type: 'exposition',
      text: '**固定顺序的实践**：\n\n在实际项目中，可以为锁定义"等级"：\n\n```cpp\n// 定义加锁顺序：账户编号小的先锁\n\nvoid transfer(Account& from, Account& to, int amount) {\n  if (from.id == to.id) return;\n\n  auto& first = (from.id < to.id) ? from : to;\n  auto& second = (from.id < to.id) ? to : from;\n\n  lock_guard<mutex> g1(first.mtx);\n  lock_guard<mutex> g2(second.mtx);\n\n  from.balance -= amount;\n  to.balance += amount;\n}\n```\n\n永远按照 ID 从小到大的顺序加锁。\n不管转账方向如何，加锁顺序不变。',
    },
    {
      type: 'exposition',
      text: '**策略二：std::lock 批量加锁**\n\n`std::lock` 可以一次性锁住多个 mutex，\n内部使用算法避免死锁：\n\n```cpp\nmutex mtx_a, mtx_b;\n\nvoid safe_function() {\n  unique_lock<mutex> lock_a(mtx_a, defer_lock);\n  unique_lock<mutex> lock_b(mtx_b, defer_lock);\n\n  lock(lock_a, lock_b);  // 批量加锁，避免死锁\n\n  // 临界区\n}  // 自动解锁\n```\n\n`std::lock` 要么一次拿到所有锁，要么一个都不拿。',
    },
    {
      type: 'concept-cards',
      instruction: '两种死锁预防策略对比：',
      cards: [
        { glyph: '📏', term: '固定顺序', meaning: '所有线程按同一顺序加锁', example: 'ID 小→大' },
        { glyph: '📦', term: 'std::lock', meaning: '一次锁多个，失败就全放弃', example: '原子性获取所有锁' },
        { glyph: '⏰', term: '超时锁 (try_lock)', meaning: '尝试加锁，超时放弃', example: 'try_lock_for()' },
        { glyph: '🔄', term: '层级锁', meaning: '给锁分配层级，禁止跨级获取', example: '从低到高' },
      ],
    },
    {
      type: 'exposition',
      text: '**std::lock 的实现原理**：\n\n`std::lock` 使用了一种叫做"**死锁避免算法**"的机制：\n1. 尝试锁住第一个 mutex\n2. 如果成功了，尝试锁住第二个\n3. 如果第二个失败，**释放第一个**，从头再来\n\n这确保不会出现"持有等另一个"的状态。\n但它可能**多次重试**，有性能开销。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用固定加锁顺序避免死锁的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx_a, mtx_b;\n\nvoid work_a() {\n  lock_guard<mutex> g1(mtx_a);\n  this_thread::sleep_for(chrono::milliseconds(10));\n  lock_guard<mutex> g2(mtx_b);\n  cout << "work_a done\\n";\n}\n\nvoid work_b() {\n  lock_guard<mutex> g1(mtx_a);\n  this_thread::sleep_for(chrono::milliseconds(10));\n  lock_guard<mutex> g2(mtx_b);\n  cout << "work_b done\\n";\n}\n\nint main() {\n  thread t1(work_a);\n  thread t2(work_b);\n  t1.join();\n  t2.join();\n  cout << "Both done\\n";\n}',
      hints: ['两个函数都先锁 mtx_a 再锁 mtx_b——顺序一致', '`sleep_for` 模拟工作，但不会导致死锁', '如果有一个先锁 b 再锁 a，就会死锁'],
    },
    {
      type: 'type-it',
      instruction: '敲一个用 std::lock 批量加锁的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex mtx_a, mtx_b;\n\nvoid safe_work() {\n  unique_lock<mutex> lock_a(mtx_a, defer_lock);\n  unique_lock<mutex> lock_b(mtx_b, defer_lock);\n  lock(lock_a, lock_b);\n  cout << "Got both locks\\n";\n}\n\nint main() {\n  thread t1(safe_work);\n  thread t2(safe_work);\n  t1.join();\n  t2.join();\n}',
      hints: ['`defer_lock` 延迟加锁，构造时不锁', '`lock(lock_a, lock_b)` 批量加锁，不会死锁', '两个 unique_lock 析构时自动解锁'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种方式**不能**避免死锁？',
      options: [
        { text: '所有线程按相同顺序加锁', correct: false, explanation: '固定顺序是最常用的死锁预防策略' },
        { text: '使用 std::lock 批量加锁', correct: false, explanation: 'std::lock 内部使用死锁避免算法' },
        { text: '让线程 A 先锁 a 再锁 b，线程 B 先锁 b 再锁 a', correct: true, explanation: '不同的加锁顺序正是死锁的成因' },
        { text: '尽量减少多锁使用场景', correct: false, explanation: '少用多锁自然少死锁风险' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习第 09 课：以下哪个是死锁的四个必要条件之一？',
      options: [
        { text: '多核处理器', correct: false, explanation: '单核也能死锁，和多核无关' },
        { text: '循环等待', correct: true, explanation: 'A 等 B、B 等 A 形成循环链条' },
        { text: '线程数量大于 2', correct: false, explanation: '两个线程就足够产生死锁' },
        { text: '共享变量', correct: false, explanation: '没有共享变量也可能死锁（只要有多把锁）' },
      ],
    },
    {
      type: 'exposition',
      text: '**其他预防策略**：\n\n**3. try_lock**\n```cpp\nmtx.try_lock();  // 不阻塞，立即返回\nif (got_lock) {\n  // 成功拿到锁\n} else {\n  // 没拿到，做其他事\n}\n```\n\n**4. 层级锁（Hierarchical Mutex）**\n- 给每个锁分配层级值\n- 只能锁更高层级的锁\n- 违反层级顺序直接报错\n\n这是一种运行时检测死锁的设计。',
    },
    {
      type: 'exposition',
      text: '**std::lock 与 unique_lock 的配合**：\n\n```cpp\nmutex mtx_a, mtx_b;\n\nvoid transfer(int amount) {\n  unique_lock<mutex> lock_a(mtx_a, defer_lock);\n  unique_lock<mutex> lock_b(mtx_b, defer_lock);\n\n  // 批量加锁——不会死锁\n  lock(lock_a, lock_b);\n\n  // 安全操作\n  balance_a -= amount;\n  balance_b += amount;\n\n  // 提前解锁\n  lock_a.unlock();\n  lock_b.unlock();\n\n  // 做不需要锁的事\n  send_notification();\n}\n```\n\n`std::lock` + `unique_lock` 是最强大的防死锁组合。',
    },
    {
      type: 'type-it',
      instruction: '敲一个用固定顺序避免转账死锁的程序：',
      code: '#include <iostream>\n#include <thread>\n#include <mutex>\n#include <chrono>\nusing namespace std;\n\nstruct Account {\n  int id;\n  int balance;\n  mutex mtx;\n};\n\nvoid transfer(Account& from, Account& to, int amount) {\n  auto& first = (from.id < to.id) ? from : to;\n  auto& second = (from.id < to.id) ? to : from;\n  lock_guard<mutex> g1(first.mtx);\n  lock_guard<mutex> g2(second.mtx);\n  from.balance -= amount;\n  to.balance += amount;\n}\n\nint main() {\n  Account a{1, 1000};\n  Account b{2, 500};\n  thread t1(transfer, ref(a), ref(b), 200);\n  thread t2(transfer, ref(b), ref(a), 100);\n  t1.join();\n  t2.join();\n  cout << "A: " << a.balance << ", B: " << b.balance << "\\n";\n}',
      hints: ['用 `id` 大小决定加锁顺序——永远先锁 id 小的', '不管转账方向如何，锁的顺序不变', '`ref()` 传递引用给 thread'],
    },
    {
      type: 'multiple-choice',
      question: '复习第 09 课：以下哪个不是死锁的四个必要条件？',
      options: [
        { text: '互斥（Mutual Exclusion）', correct: false, explanation: '这是必要条件之一' },
        { text: '持有并等待（Hold and Wait）', correct: false, explanation: '这是必要条件之一' },
        { text: '高优先级（High Priority）', correct: true, explanation: '优先级和死锁无关' },
        { text: '循环等待（Circular Wait）', correct: false, explanation: '这是必要条件之一' },
      ],
    },
    {
      type: 'exposition',
      text: '**避免死锁的编码规范**：\n\n团队项目中，可以通过编码规范预防死锁：\n\n1. **约定加锁顺序**：所有代码按同一顺序加锁\n2. **代码审查**：每次加锁操作必须 Review\n3. **锁层次**：为锁分配等级，禁止跨级获取\n4. **尽量少用多锁**：能用一把锁解决就不用两把\n5. **锁内不调外部函数**：防止回调导致的死锁',
    },
    {
      type: 'exposition',
      text: '**std::lock 的内部实现原理**：\n\n```\nstd::lock(m1, m2) 的工作原理：\n1. 尝试 lock(m1)\n2. 如果成功，尝试 lock(m2)\n3. 如果 lock(m2) 失败，unlock(m1) 并重试\n4. 重复直到全部成功\n```\n\n这确保了"要么全拿、要么全放"的原子性。\n虽然可能多次重试，但**保证不会形成死锁**。',
    },
    {
      type: 'exposition',
      text: '**总结**：\n\n- 固定加锁顺序是最简单有效的防死锁策略\n- `std::lock` 安全地一次性锁住多个 mutex\n- `try_lock` 可以避免阻塞等待\n- 层级锁在大型项目中很有用\n- 关键是：**在代码设计阶段就思考锁的顺序**',
    },
    {
      type: 'exposition',
      text: '**防死锁的黄金法则**：\n\n1. 如果只需要一把锁 → 不存在死锁问题\n2. 如果需要多把锁 → 要么固定顺序，要么用 std::lock\n3. 固定顺序 → 所有线程绝对一致\n4. std::lock → 配合 unique_lock + defer_lock\n5. 永远不要假设"这次不会有人和我抢"',
    },
  ],
}

export default lesson
