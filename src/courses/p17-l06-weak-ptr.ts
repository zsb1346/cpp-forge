import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'weak-ptr',
    chapter: 18,
    title: 'weak_ptr——打破循环引用',
    subtitle: '不增加引用计数',
    description: '学习用 weak_ptr 解决 shared_ptr 循环引用问题，理解弱引用的作用。',
    objectives: ['能识别循环引用的场景', '能用 weak_ptr 打破循环引用', '能理解 lock() 和 expired() 的用法'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`shared_ptr` 有个陷阱：循环引用——两个对象互相持有对方的 `shared_ptr`，谁都无法释放。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '循环引用示例：A 持有指向 B 的 shared_ptr，B 持有指向 A 的 shared_ptr。引用计数永远为 1，内存泄漏。',
      code: 'struct A {\n  shared_ptr<B> b_ptr;\n};\nstruct B {\n  shared_ptr<A> a_ptr;\n};\n\nauto a = make_shared<A>();\nauto b = make_shared<B>();\na->b_ptr = b;\nb->a_ptr = a;\n// 循环引用！a 和 b 都泄漏',
    },
    {
      type: 'exposition',
      text: '为什么泄漏？a 的计数 = 1（b 持有 a_ptr），b 的计数 = 1（a 持有 b_ptr）。两个计数都不为 0，谁也不会释放。',
    },
    {
      type: 'concept-cards',
      instruction: '理解 weak_ptr 的核心概念：',
      cards: [
        { glyph: '🔗', term: '循环引用', meaning: '两个对象互相持有 shared_ptr 导致无法释放', example: 'A ←→ B' },
        { glyph: '🪶', term: 'weak_ptr', meaning: '弱引用，不增加引用计数', example: 'weak_ptr<T>' },
        { glyph: '🔒', term: 'lock()', meaning: '从 weak_ptr 获取 shared_ptr，失败返回空', example: 'auto sp = wp.lock()' },
        { glyph: '✅', term: 'expired()', meaning: '检查 weak_ptr 指向的对象是否已被释放', example: 'wp.expired()' },
      ],
    },
    {
      type: 'exposition',
      text: '解决方案：把其中一个改成 `weak_ptr`。`weak_ptr` 不增加引用计数，不影响生命周期。',
      code: 'struct B {\n  weak_ptr<A> a_ptr;  // 弱引用，不增加计数\n};',
    },
    {
      type: 'exposition',
      text: '`weak_ptr` 不能直接访问对象。要通过 `lock()` 获得一个临时的 `shared_ptr`。',
      code: 'auto sp = wp.lock();\nif (sp) {\n  // 对象还在，可以安全使用\n  cout << *sp << endl;\n} else {\n  // 对象已被释放\n}',
    },
    {
      type: 'multiple-choice',
      question: 'weak_ptr 通过什么方法获取一个可用的 shared_ptr？',
      options: [
        { text: 'get()', correct: false, explanation: 'get() 返回裸指针，不是 shared_ptr' },
        { text: 'use_count()', correct: false, explanation: 'use_count() 只获取引用计数' },
        { text: 'lock()', correct: true, explanation: 'lock() 返回 shared_ptr 或空指针' },
        { text: 'shared_from_this()', correct: false, explanation: '那是 enable_shared_from_this 的方法' },
      ],
    },
    {
      type: 'exposition',
      text: '典型场景：父子结构——父节点持有子节点的 `shared_ptr`，子节点持有父节点的 `weak_ptr`。',
      code: 'struct Node {\n  int value;\n  shared_ptr<Node> child;\n  weak_ptr<Node> parent;  // 弱引用父节点\n};',
    },
    {
      type: 'exposition',
      text: '`expired()` 方法检查对象是否已被释放。比 `lock()` 更轻量，如果需要实际访问还是要用 `lock()`。',
    },
    {
      type: 'multiple-choice',
      question: '循环引用中，两个 shared_ptr 互相引用会导致什么？',
      options: [
        { text: '程序立即崩溃', correct: false, explanation: '不会立即崩溃，而是悄悄泄漏内存' },
        { text: '引用计数永远不为 0，内存泄漏', correct: true, explanation: '互相持有导致计数无法归零' },
        { text: '引用计数无限增长', correct: false, explanation: '计数不会无限增长，停留在 1' },
        { text: '编译错误', correct: false, explanation: '循环引用是运行时问题，编译器检查不到' },
      ],
    },
    {
      type: 'exposition',
      text: '`weak_ptr` 也用于缓存场景：缓存不控制对象生命周期，对象释放后缓存自动失效。',
    },
    {
      type: 'exposition',
      text: '观察者模式中：被观察者用 `shared_ptr` 列表，但观察者内部用 `weak_ptr` 引用被观察者。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个场景不适合用 weak_ptr？',
      options: [
        { text: '打破父子结构中的循环引用', correct: false, explanation: '这是典型的 weak_ptr 用法' },
        { text: '作为函数返回值传递独占所有权', correct: true, explanation: '传递独占所有权用 unique_ptr，不是 weak_ptr' },
        { text: '缓存场景中不控制生命周期', correct: false, explanation: '缓存是 weak_ptr 的好用法' },
        { text: '观察者模式中的反向引用', correct: false, explanation: '这适合用 weak_ptr' },
      ],
    },
    {
      type: 'exposition',
      text: '重要限制：`weak_ptr` 只能从 `shared_ptr` 构造。不能直接用裸指针构造。',
      code: 'auto sp = make_shared<int>(42);\nweak_ptr<int> wp = sp;  // 正确\n// weak_ptr<int> wp2(new int(5));  // 编译错误',
    },
    {
      type: 'exposition',
      text: '`weak_ptr` 不参与引用计数，所以它指向的对象可能在它不知道的情况下被释放。使用前必须用 `lock()` 检查。',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：shared_ptr 的引用计数在什么时候减 1？',
      options: [
        { text: '调用 reset() 或离开作用域析构时', correct: true, explanation: 'shared_ptr 销毁时引用计数减 1' },
        { text: '读取对象的值时', correct: false, explanation: '读取不影响引用计数' },
        { text: '调用 make_shared 时', correct: false, explanation: 'make_shared 创建时计数为 1' },
        { text: '修改对象的值时', correct: false, explanation: '修改值不影响引用计数' },
      ],
    },
    {
      type: 'exposition',
      text: '最佳实践：能用 `unique_ptr` 就不要用 `shared_ptr`。必须用 `shared_ptr` 时，警惕循环引用，用 `weak_ptr` 打破。',
    },
    {
      type: 'exposition',
      text: '总结：\n- 循环引用导致 shared_ptr 泄漏\n- `weak_ptr` 不增加引用计数\n- 用 `lock()` 获得共享访问\n- 父子关系用 weak_ptr 打破循环',
    },
  ],
}

export default lesson
