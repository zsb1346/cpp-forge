import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'make-shared',
    chapter: 18,
    title: 'make_shared 的好处',
    subtitle: '一次分配+异常安全',
    description: '了解为什么推荐用 make_shared 而不是直接 new 来创建 shared_ptr。',
    objectives: ['能说出 make_shared 的两个主要好处', '能理解一次分配的含义', '能理解异常安全性的含义'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '创建 `shared_ptr` 有两种方式：直接 `new` 和 `make_shared`。推荐用 `make_shared`。',
    },
    {
      type: 'exposition',
      text: '直接 `new` 的方式：',
      code: 'shared_ptr<int> p(new int(42));',
    },
    {
      type: 'exposition',
      text: '`make_shared` 的方式：',
      code: 'auto p = make_shared<int>(42);  // 推荐',
    },
    {
      type: 'exposition',
      text: '**好处一：一次分配**。\n直接 `new` 需要两次内存分配——一次给对象，一次给控制块（存引用计数）。\n`make_shared` 一次分配一整块，包含对象和控制块。',
    },
    {
      type: 'exposition',
      text: '内存布局对比：\n直接 new：`[对象]` + `[控制块]`（两块内存，地址不连续）\nmake_shared：`[对象|控制块]`（一块连续内存）',
    },
    {
      type: 'multiple-choice',
      question: '直接 new shared_ptr 需要几次内存分配？',
      options: [
        { text: '1 次', correct: false, explanation: '对象需要一次，控制块还需要一次' },
        { text: '2 次', correct: true, explanation: '对象一次，控制块一次，共两次' },
        { text: '3 次', correct: false, explanation: '只有对象和控制块两次分配' },
        { text: '0 次，都在栈上', correct: false, explanation: 'shared_ptr 管理堆内存，需要在堆上分配' },
      ],
    },
    {
      type: 'exposition',
      text: '**好处二：异常安全**。考虑这种情况：',
      code: 'process(shared_ptr<A>(new A), shared_ptr<B>(new B));',
    },
    {
      type: 'exposition',
      text: 'C++ 对函数参数的求值顺序未定义。可能：new A → new B → 构造 shared_ptr A → 构造 shared_ptr B。\n如果 new B 抛出异常，new A 的对象就泄漏了——因为还没构造出 shared_ptr 来管理它。',
    },
    {
      type: 'exposition',
      text: '用 `make_shared` 不会有这个问题——对象创建和 shared_ptr 构造捆绑在一起，不会中途被打断。',
      code: 'process(make_shared<A>(), make_shared<B>());  // 异常安全',
    },
    {
      type: 'multiple-choice',
      question: 'make_shared 在异常安全方面如何优于直接 new？',
      options: [
        { text: '不会抛出异常', correct: false, explanation: 'make_shared 也可能抛异常' },
        { text: '对象和 shared_ptr 同时构造，不会出现泄漏窗口', correct: true, explanation: '避免了构造之间的泄漏窗口' },
        { text: '异常会被自动捕获', correct: false, explanation: '不会自动捕获异常' },
        { text: '没有区别', correct: false, explanation: '在异常安全方面有显著区别' },
      ],
    },
    {
      type: 'exposition',
      text: '**什么时候不适合用 make_shared？**\n1. 需要自定义删除器时\n2. 对象内存非常大，且 weak_ptr 可能比 shared_ptr 存活更久时',
    },
    {
      type: 'exposition',
      text: '场景二解释：`make_shared` 把对象和控制块分配在一起。即使所有 `shared_ptr` 都销毁了，如果有 `weak_ptr` 还在，整块内存不能释放（控制块还要活着）。大对象会浪费空间。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况应该用直接 new 而非 make_shared？',
      options: [
        { text: '普通的数值类型', correct: false, explanation: '普通类型用 make_shared 更好' },
        { text: '需要自定义删除器时', correct: true, explanation: 'make_shared 不支持自定义删除器' },
        { text: '需要多线程安全时', correct: false, explanation: 'make_shared 不影响线程安全' },
        { text: '对象很小且数量少时', correct: false, explanation: '这种情况更推荐 make_shared' },
      ],
    },
    {
      type: 'exposition',
      text: '`make_unique` 和 `make_shared` 对比：\n- `make_unique`：性能与直接 new 一样，主要为了异常安全和代码简洁\n- `make_shared`：一次分配提升性能 + 异常安全',
    },
    {
      type: 'exposition',
      text: '使用 `make_shared` 时，对象和引用计数在同一块内存上。当 `shared_ptr` 全部销毁，即使 `weak_ptr` 还存在，对象部分也会析构，只是控制块内存还在。',
    },
    {
      type: 'exposition',
      text: '这意味着：用 `make_shared` 时，对象的内存会被复用（但不是释放），直到所有 `weak_ptr` 也销毁。这是与大对象场景矛盾的根源。',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：weak_ptr 如何从 shared_ptr 创建？',
      options: [
        { text: 'weak_ptr<int> wp(new int(5));', correct: false, explanation: 'weak_ptr 不能直接绑定裸指针' },
        { text: 'weak_ptr<int> wp = make_shared<int>(5);', correct: true, explanation: 'weak_ptr 从 shared_ptr 构造' },
        { text: 'weak_ptr<int> wp = new int(5);', correct: false, explanation: '不能从裸指针构造' },
        { text: 'weak_ptr<int> wp = unique_ptr<int>(new int(5));', correct: false, explanation: 'weak_ptr 只能从 shared_ptr 构造' },
      ],
    },
    {
      type: 'exposition',
      text: '最佳实践：\n- 默认用 `make_shared`\n- 需要自定义删除器时用 `shared_ptr(new T, deleter)`\n- 大对象 + 长生命周期 weak_ptr 时考虑直接 new',
    },
    {
      type: 'exposition',
      text: '总结：`make_shared` 的好处是**一次分配 + 异常安全 + 代码简洁**。除非有特殊需求，否则优先用它。',
    },
  ],
}

export default lesson
