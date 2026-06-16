import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-advanced-concepts',
    chapter: 21,
    title: '高级概念练习',
    subtitle: '巩固 11-13',
    description: '通过选择题和概念卡巩固内存序和 RTTI 的高级概念。',
    objectives: ['能区分不同内存序模式的适用场景', '能理解 dynamic_cast 的成本和替代方案', '能判断哪些并发场景需要内存序'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '为什么需要内存序？',
      options: [
        { text: '为了让程序运行更快', correct: false, explanation: '内存序是为了正确性，不是性能（虽然影响性能）' },
        { text: '因为编译器和 CPU 可能重排指令，需要控制', correct: true, explanation: '内存序的核心目的是控制指令重排' },
        { text: '为了让代码更容易写', correct: false, explanation: '内存序让并发编程更复杂' },
        { text: '因为 C++ 标准要求必须指定', correct: false, explanation: '默认 seq_cst，不指定也能工作' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'memory_order_relaxed 适合以下哪个场景？',
      options: [
        { text: '保护共享数据的读写', correct: false, explanation: 'relaxed 不提供顺序保证，不能用于保护共享数据' },
        { text: '统计调用次数的计数器', correct: true, explanation: '只关心最终总和，不关心中间状态顺序' },
        { text: '实现自旋锁', correct: false, explanation: '自旋锁需要 acquire/release 语义' },
        { text: '发布标志通知其他线程', correct: false, explanation: '发布-获取模式需要 acquire/release' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪一对操作建立了 happens-before 关系？',
      options: [
        { text: '两个线程都用 relaxed 写入同一个变量', correct: false, explanation: 'relaxed 不提供 happens-before' },
        { text: '线程 A release 写入 flag，线程 B acquire 读取 flag', correct: true, explanation: 'release-acquire 配对建立 happens-before' },
        { text: '两个线程都用 seq_cst 写入同一个变量', correct: false, explanation: 'seq_cst 不自动建立 happens-before' },
        { text: '线程 A relaxed 写入，线程 B relaxed 读取', correct: false, explanation: 'relaxed 不提供任何同步' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '四种常见内存序的使用场景：',
      cards: [
        { glyph: '🔢', term: 'relaxed', meaning: '只关心原子性，不关心顺序', example: '统计计数' },
        { glyph: '🔓', term: 'release-acquire', meaning: '一个线程发布，另一个订阅', example: '数据生产-消费' },
        { glyph: '🔒', term: 'seq_cst', meaning: '需要全局一致的顺序', example: '多生产者-多消费者' },
        { glyph: '🔄', term: 'acq_rel', meaning: '同时需要发布和获取', example: '原子交换操作' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'dynamic_cast 的主要运行时开销是什么？',
      options: [
        { text: '分配额外的内存', correct: false, explanation: 'dynamic_cast 不分配内存' },
        { text: '遍历继承链检查类型', correct: true, explanation: '需要查找 vtable 关联的类型信息' },
        { text: '拷贝转型后的对象', correct: false, explanation: 'dynamic_cast 只转型指针/引用' },
        { text: '抛出异常处理失败情况', correct: false, explanation: 'dynamic_cast 返回 nullptr 或抛异常，但不是主要开销' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '关闭 RTTI 后，以下哪个功能仍然可用？',
      options: [
        { text: 'dynamic_cast', correct: false, explanation: '需要 RTTI' },
        { text: '虚函数调用', correct: true, explanation: '虚函数通过 vtable 工作，不需要 RTTI' },
        { text: 'typeid', correct: false, explanation: '需要 RTTI' },
        { text: 'catch( ... )', correct: false, explanation: '异常处理也依赖 RTTI 信息' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'RTTI 的三个关键事实：',
      cards: [
        { glyph: '💾', term: '内存', meaning: '每个多态类产生额外的 type_info 数据', example: 'vtable + 类型名称' },
        { glyph: '⏱️', term: '时间', meaning: 'dynamic_cast O(n) 时间遍历继承链', example: '深度继承影响性能' },
        { glyph: '🚫', term: '禁用', meaning: '-fno-rtti 编译选项关闭 RTTI', example: '嵌入式/游戏常用' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是避免 dynamic_cast 的最佳设计实践？',
      options: [
        { text: '把所有类放到同一个继承体系中', correct: false, explanation: '深度继承反而需要更多 dynamic_cast' },
        { text: '用虚函数实现多态行为', correct: true, explanation: '虚函数是 C++ 多态的推荐方式' },
        { text: '用 C 风格转型代替', correct: false, explanation: 'C 风格转型无类型检查，不安全' },
        { text: '只用全局函数处理所有类型', correct: false, explanation: '不符合 OOP 设计' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'volatile 能防止指令重排吗？',
      options: [
        { text: '是的，volatile 就是为并发设计的', correct: false, explanation: 'volatile 不能防止 CPU 重排' },
        { text: '不能，多线程同步需要用 std::atomic', correct: true, explanation: 'volatile 只防止编译器优化缓存，不涉及 CPU 重排' },
        { text: '部分情况下可以', correct: false, explanation: 'C++ 标准未定义 volatile 的线程语义' },
        { text: '取决于操作系统', correct: false, explanation: '不取决于操作系统，取决于语言标准' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'x86 架构上，seq_cst 和 relaxed 的性能差异大吗？',
      options: [
        { text: '差异很大，relaxed 快很多', correct: false, explanation: 'x86 的 TSO 模型让差异很小' },
        { text: '差异很小，x86 硬件已经提供了较强的一致性', correct: true, explanation: 'x86 默认的内存模型接近 seq_cst' },
        { text: 'seq_cst 比 relaxed 更快', correct: false, explanation: '更严格的模式不会更快' },
        { text: 'ARM 上差异小，x86 上差异大', correct: false, explanation: '相反——ARM 差异大，x86 差异小' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个场景需要使用 atomic 而不是 mutex？',
      options: [
        { text: '保护一个大型数据结构', correct: false, explanation: '大型数据结构应该用 mutex' },
        { text: '对单个整数做原子自增', correct: true, explanation: 'atomic 自增比 mutex 更轻量' },
        { text: '实现复杂的同步逻辑', correct: false, explanation: '复杂同步应该用 mutex + condition_variable' },
        { text: '跨进程同步', correct: false, explanation: 'std::atomic 不支持跨进程' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个关于 typeid 的说法正确？',
      options: [
        { text: 'typeid 对非多态类型也能返回动态类型', correct: false, explanation: '非多态类型，typeid 返回静态类型' },
        { text: 'typeid 返回 const std::type_info&', correct: true, explanation: 'typeid 返回 type_info 对象的引用' },
        { text: 'typeid 只能用于多态类型', correct: false, explanation: 'typeid 可用于任何类型' },
        { text: 'typeid 的 name() 返回可读的类型名', correct: false, explanation: 'name() 返回值是编译器相关且可能不可读' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'RTTI 的替代方案：',
      cards: [
        { glyph: '🎯', term: '虚函数', meaning: '多态行为通过虚函数实现，无需 RTTI', example: 'virtual void speak()' },
        { glyph: '📋', term: '访问者模式', meaning: '双分派，避免类型判断', example: 'accept(Visitor&)' },
        { glyph: '🎪', term: 'std::variant+visit', meaning: '编译期类型安全的联合体', example: 'visit(visitor, v)' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '自旋锁使用什么内存序模式？',
      options: [
        { text: 'relaxed', correct: false, explanation: '自旋锁需要同步语义' },
        { text: 'acquire 用于加锁，release 用于解锁', correct: true, explanation: '加锁是需要 acquire，解锁需要 release' },
        { text: 'seq_cst 用于加锁和解锁', correct: false, explanation: 'seq_cst 也可以但 acquire/release 更高效' },
        { text: 'acq_rel 用于所有操作', correct: false, explanation: '加锁和解锁分别需要不同的语义' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'RTTI 的内存开销主要体现在？',
      options: [
        { text: '每个对象实例都保存一份完整类型信息', correct: false, explanation: '类型信息是类级别的，不是对象级别' },
        { text: '每个多态类生成额外的 type_info 数据', correct: true, explanation: 'vtable 关联 type_info，每个类一份' },
        { text: '每次 typeid 调用都分配内存', correct: false, explanation: 'typeid 返回引用，不分配内存' },
        { text: 'dynamic_cast 分配临时对象', correct: false, explanation: 'dynamic_cast 不分配内存' },
      ],
    },
    {
      type: 'exposition',
      text: '练习完成！你巩固了内存序和 RTTI 的核心概念。\n\n下一组课程进入 C++ 最危险但也最重要的主题——**未定义行为（UB）**。\n知道哪些不能写，比知道怎么写更重要。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
