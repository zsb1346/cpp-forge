# 阶段 18：并发入门

## 课程列表（共 15 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | why-concurrency | 为什么需要并发 | 同时做多件事 | 提高利用率、响应速度 | 1（动机） | p15 全部 | exposition → multiple-choice |
| 02 | thread-basics | std::thread——创建线程 | 启动一个线程 | `std::thread t(function); t.join();` | 2（thread, join） | 01 | exposition → type-it → code-runner |
| 03 | thread-detach | detach——让线程独立 | 后台运行 | detach 后线程在后台独立运行 | 1（detach） | 02 | exposition → type-it → multiple-choice |
| 04 | data-race | 数据竞争 | 同时写一个变量 | 两个线程同时写同一变量是未定义行为 | 1（数据竞争） | 03 | exposition → concept-cards → multiple-choice |
| 05 | mutex-intro | mutex——互斥锁 | 一次一个线程访问 | mutex 加锁/解锁保护共享数据 | 2（mutex, lock/unlock） | 04 | exposition → concept-cards → type-it → code-runner |
| 06 | lock-guard | lock_guard——RAII 锁 | 构造加锁析构解锁 | lock_guard 自动管理锁的获取释放 | 1（lock_guard） | 05, p10-13 | exposition → type-it → multiple-choice |
| 07 | unique-lock | unique_lock——更灵活 | 延迟加锁提前解锁 | unique_lock 比 lock_guard 更灵活的控制 | 1（unique_lock） | 06 | exposition → type-it → multiple-choice |
| 08 | practice-mutex | 互斥锁综合练习 | 巩固 04-07 | 综合练习互斥锁保护共享数据 | 0 | 04-07 | type-it → code-runner x2 → multiple-choice |
| 09 | deadlock | 死锁——互相等待 | A 等 B，B 等 A | 死锁的产生条件 | 1（死锁） | 07 | exposition → concept-cards → multiple-choice |
| 10 | deadlock-avoidance | 避免死锁策略 | 固定顺序+std::lock | 固定加锁顺序、使用 std::lock | 0（策略） | 09 | exposition → multiple-choice |
| 11 | condition-variable | 条件变量——等条件满足 | wait/notify | condition_variable 的 wait 和 notify | 1（条件变量） | 10 | exposition → type-it → code-runner |
| 12 | async-future | async 和 future | 手写 thread 的替代 | `std::async` 更高层的并发抽象 | 2（async, future） | 11 | exposition → type-it → code-runner |
| 13 | atomic-intro | atomic——无锁原子操作 | 读写不被打断 | `std::atomic<int>` 原子操作 | 1（atomic） | 12 | exposition → type-it → code-runner |
| 14 | practice-concurrency | 并发综合练习 | 巩固 01-13 | 线程/锁/条件变量综合练习 | 0 | 01-13 | type-it → code-runner x2 → multiple-choice |
| 15 | phase18-review | 阶段 18 综合复习 | 并发总复习 | 全面回顾 01-14 | 0 | 全部 | multiple-choice x4 → concept-cards → fill-in |

### 关键教学要求
- **01（并发动机课）**：展示单线程的局限性
- **04（数据竞争课）**：必须强调并发 bug 的隐蔽性和危害
- **06（lock_guard）**：RAII 的最佳例证，回顾 p10 的 RAII 概念
