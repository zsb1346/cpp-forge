import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase18-review',
    chapter: 19,
    title: '阶段 18 综合复习',
    subtitle: '并发总复习',
    description: '全面回顾阶段 18 的线程、锁、条件变量、async/future、atomic 等并发编程知识。',
    objectives: ['能串联起整个阶段 18 的知识体系', '能综合运用并发工具解决实际问题', '能自信地写出线程安全的代码'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '阶段 18 的主题是"并发入门"——从"为什么要并发"到"atomic 无锁操作"。\n**通过综合复习，把零散的知识串成完整的并发知识网络。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个选项正确地描述了并发和并行的区别？',
      options: [
        { text: '并发是逻辑上同时运行，并行是物理上同时运行', correct: true, explanation: '并发关注任务组织，并行关注实际执行' },
        { text: '并发需要多核，并行不需要', correct: false, explanation: '并发的定义不依赖多核，在单核上也能并发' },
        { text: '它们完全一样', correct: false, explanation: '两个概念有本质区别' },
        { text: '并发是编程概念，并行是硬件概念', correct: false, explanation: '两者都涉及编程和硬件层面' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '关于 `std::thread`，以下哪个说法是正确的？',
      options: [
        { text: 'thread 对象创建后需要调用 start() 才能运行', correct: false, explanation: 'thread 构造即启动，没有 start 方法' },
        { text: '不调用 join 或 detach 而销毁 thread 对象会调用 terminate', correct: true, explanation: '不可结合的 thread 析构会终止程序' },
        { text: 'detach 后的线程无法访问任何变量', correct: false, explanation: '可以访问全局变量或堆变量，但不能访问已销毁的局部变量' },
        { text: 'join() 可以让线程在后台独立运行', correct: false, explanation: 'join 是等待线程结束，detach 才是让线程独立运行' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '什么是数据竞争（Data Race）？',
      options: [
        { text: '两个线程同时读同一个变量', correct: false, explanation: '同时读是安全的' },
        { text: '两个线程同时访问同一变量，至少一个在写，没有同步', correct: true, explanation: '这是数据竞争的标准定义' },
        { text: '多个线程排队访问共享资源', correct: false, explanation: '排队访问是安全的' },
        { text: '一个线程修改变量后其他线程读取', correct: false, explanation: '如果有 join 或其他同步机制，是安全的' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个不是死锁的必要条件？',
      options: [
        { text: '互斥', correct: false, explanation: '资源只能被一个线程占用，是必要条件' },
        { text: '持有并等待', correct: false, explanation: '线程持有资源等另一个资源，是必要条件' },
        { text: '多核处理器', correct: true, explanation: '单核也会死锁，和核数无关' },
        { text: '循环等待', correct: false, explanation: '形成等待环路，是必要条件' },
      ],
    },
    {
      type: 'exposition',
      text: '**阶段 18 知识结构图**：\n\n```\n并发入门\n  ├── 为什么需要并发（动机）\n  ├── 线程基础\n  │   ├── std::thread（创建线程）\n  │   └── detach（后台运行）\n  ├── 线程安全问题\n  │   ├── 数据竞争（问题）\n  │   ├── mutex（手动锁）\n  │   ├── lock_guard（RAII 锁）\n  │   └── unique_lock（灵活锁）\n  ├── 死锁与避免\n  │   ├── 死锁（问题）\n  │   └── 固定顺序 / std::lock（方案）\n  ├── 线程间协调\n  │   └── condition_variable（等待/通知）\n  └── 高级并发\n      ├── async / future（高层抽象）\n      └── atomic（无锁原子操作）\n```',
    },
    {
      type: 'concept-cards',
      instruction: '阶段 18 核心概念一览：',
      cards: [
        { glyph: '🧵', term: 'std::thread', meaning: '创建并管理线程', example: 'thread t(func)' },
        { glyph: '🔒', term: 'mutex', meaning: '互斥锁保护共享数据', example: 'mtx.lock() / unlock()' },
        { glyph: '🛡️', term: 'lock_guard', meaning: 'RAII 自动加锁解锁', example: 'scope-based' },
        { glyph: '🔗', term: 'unique_lock', meaning: '灵活的锁，支持 defer 和提前 unlock', example: 'defer_lock' },
        { glyph: '💀', term: '死锁', meaning: '循环等待导致程序卡死', example: '固定顺序预防' },
        { glyph: '📡', term: 'condition_variable', meaning: '等待条件成立的同步机制', example: 'wait / notify_one' },
        { glyph: '🚀', term: 'async/future', meaning: '高层异步任务抽象', example: 'async(launch::async, f)' },
        { glyph: '⚛️', term: 'atomic', meaning: '无锁线程安全操作', example: 'atomic<int>' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 lock_guard 保护共享计数器。',
      template: '#include <iostream>\n#include <thread>\n#include <____>\nusing namespace std;\n\n____ mtx;\nint counter = 0;\n\nvoid add() {\n  ____<mutex> guard(mtx);\n  counter++;\n}\n\nint main() {\n  thread t1(add);\n  thread t2(add);\n  ____\n  t2.join();\n  cout << counter;\n}',
      answers: ['mutex', 'mutex', 'lock_guard', 't1.join()'],
      hints: ['头文件包含 mutex', '声明全局 mutex 对象', 'lock_guard 构造时自动 lock', '别忘了等 t1 结束'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 condition_variable 实现等待。',
      template: '____ mtx;\ncondition_variable cv;\nbool ready = false;\n\nvoid wait_func() {\n  ____<mutex> lock(mtx);\n  cv.____(lock, []{ return ready; });\n}\n\nvoid notify_func() {\n  ____<mutex> lock(mtx);\n  ready = true;\n  cv.____();\n}',
      answers: ['mutex', 'unique_lock', 'wait', 'lock_guard', 'notify_one'],
      hints: ['需要全局 mutex 对象', 'wait 需要 unique_lock', '条件变量调用 wait', 'notifier 用 lock_guard 即可', '通知叫醒等待线程'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 async 和 future 实现异步求和。',
      template: '#include <iostream>\n#include <____>\nusing namespace std;\n\nint main() {\n  ____<int> fut = ____(launch::async, []{\n    return 10 + 20;\n  });\n  cout << fut.____() << "\\n";\n}',
      answers: ['future', 'future', 'async', 'get'],
      hints: ['async 和 future 都在头文件 future 中', 'future 是模板类型', 'async 启动异步任务', 'get 获取结果'],
    },
    {
      type: 'exposition',
      text: '**阶段 18 总结**：\n\n你从零开始，学完了 C++ 并发编程的核心知识：\n\n1. **为什么需要并发**——提高利用率和响应速度\n2. **std::thread**——创建线程、join/detach\n3. **数据竞争**——多线程访问共享变量是 UB\n4. **mutex / lock_guard / unique_lock**——保护共享数据\n5. **死锁**——循环等待，需要预防\n6. **condition_variable**——等待条件满足\n7. **async / future**——高层并发的抽象\n8. **atomic**——无锁原子操作',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 atomic 声明一个线程安全的计数器类。',
      template: 'class SafeCounter {\n  ____<int> count{0};\npublic:\n  void add(int x) { count.____(x); }\n  int get() const { return count.____(); }\n};',
      answers: ['atomic', 'fetch_add', 'load'],
      hints: ['atomic 模板类型声明原子变量', 'fetch_add 原子加法并返回旧值', 'load 原子读取当前值'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 mutex 和条件变量实现一次性初始化。',
      template: '____ mtx;\ncondition_variable cv;\nbool initialized = false;\n\nvoid init() {\n  ____<mutex> lock(mtx);\n  if (!initialized) {\n    do_init();\n    initialized = true;\n  }\n  cv.____();\n}\n\nvoid wait_init() {\n  ____<mutex> lock(mtx);\n  cv.____(lock, []{ return initialized; });\n}',
      answers: ['mutex', 'lock_guard', 'notify_all', 'unique_lock', 'wait'],
      hints: ['需要全局 mutex 对象', 'init 中用 lock_guard', '初始化完成后通知所有等待者', 'wait 需要 unique_lock', '等待条件成立'],
    },
    {
      type: 'exposition',
      text: '**阶段 18 核心公式速记**：\n\n```\nthread t(func)  +  t.join()     = 线程管理\nmutex           +  lock_guard   = 安全共享\nunique_lock     +  defer_lock   = 灵活加锁\nstd::lock(m1,m2)                = 防死锁\ncv.wait + cv.notify             = 等待通知\nasync + future + get()          = 异步结果\natomic<T>       +  ++/--        = 无锁操作\n```',
    },
    {
      type: 'exposition',
      text: '**总结**：\n\n并发编程的核心公式：\n\n```\n线程安全 = 共享数据 + 正确的同步\n正确的同步 = mutex / atomic / condition_variable\n无死锁 = 固定加锁顺序 / std::lock\n高效并发 = 最小化共享 + 合适粒度\n```\n\n你已经从零学到了并发编程的完整知识体系！',
    },
    {
      type: 'exposition',
      text: '**接下来的道路**：\n\n并发是一个深广的领域，阶段 18 只是入门。\n如果想继续深入，可以学习：\n- 线程池（Thread Pool）\n- 读写锁（shared_mutex）\n- 无锁数据结构（Lock-free Data Structures）\n- C++20 的 std::latch / std::barrier / std::semaphore\n\n但你现在已经具备了写出正确、安全的多线程代码的能力。',
    },
    {
      type: 'exposition',
      text: '🎉 恭喜你完成阶段 18——并发编程入门！\n\n从"为什么需要并发"到"atomic 无锁操作"，\n你走过了完整的并发学习路径。\n继续加油，进入下一阶段！',
    },
    {
      type: 'exposition',
      text: '**阶段 18 结束了。你学会了什么？**\n\n1. 并发 ≠ 并行，但都需要正确的同步\n2. std::thread 让你创建线程\n3. 数据竞争是未定义行为，必须用锁或 atomic 防止\n4. mutex / lock_guard / unique_lock 是保护共享数据的工具\n5. 死锁可以预防——固定顺序或 std::lock\n6. condition_variable 让线程等待条件\n7. async/future 简化异步任务\n8. atomic 提供无锁原子操作\n\n你已经是一个有并发编程意识的 C++ 程序员了！',
    },
  ],
}

export default lesson
