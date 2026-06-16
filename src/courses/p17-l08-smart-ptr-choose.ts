import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'smart-ptr-choose',
    chapter: 18,
    title: '智能指针选择策略',
    subtitle: '所有权的决策树',
    description: '学习根据所有权场景选择合适的智能指针，掌握选择策略。',
    objectives: ['能根据场景选择合适的智能指针', '能理解独占 vs 共享 vs 观察的决策逻辑', '能掌握智能指针选择的最佳实践'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '三种智能指针对应三种所有权策略：独占、共享、观察。选择正确指针和选择正确算法一样重要。',
    },
    {
      type: 'exposition',
      text: '**决策树**：\n1. 只有一个所有者？→ `unique_ptr`\n2. 需要多个所有者？→ `shared_ptr`\n3. 只需要访问不控制生命周期？→ `weak_ptr`',
    },
    {
      type: 'exposition',
      text: '**场景一**：工厂函数创建一个对象，返回给调用方。调用方是唯一所有者。',
      code: 'unique_ptr<Logger> createLogger() {\n  return make_unique<FileLogger>();\n}',
    },
    {
      type: 'multiple-choice',
      question: '场景：一个 Player 对象被多个 GameSystem 引用，所有系统都需要访问 Player，直到 Player 生命周期结束。选哪个？',
      options: [
        { text: 'unique_ptr', correct: false, explanation: 'unique_ptr 不能共享，多个系统无法同时持有' },
        { text: 'shared_ptr', correct: true, explanation: '共享所有权，多个系统可以共同持有' },
        { text: 'weak_ptr', correct: false, explanation: 'weak_ptr 不控制生命周期，无法保证对象存活' },
        { text: '裸指针', correct: false, explanation: '裸指针不管理生命周期，容易悬空' },
      ],
    },
    {
      type: 'exposition',
      text: '**场景二**：函数的参数。需要修改对象但不获取所有权——传 `T*` 或 `T&`。',
      code: 'void update(GameObject* obj) {\n  obj->tick();\n} // 只借用，不拥有',
    },
    {
      type: 'exposition',
      text: '如果函数需要获取所有权（接管生命周期），参数类型用 `unique_ptr`。',
      code: 'void takeOwnership(unique_ptr<Resource> res) {\n  // 现在 res 由我管理\n}',
    },
    {
      type: 'multiple-choice',
      question: '场景：一个类需要持有另一个对象的引用，但又不是所有者。该用什么？',
      options: [
        { text: 'unique_ptr 成员', correct: false, explanation: 'unique_ptr 表示所有权，不需要所有权就不该用' },
        { text: 'shared_ptr 成员', correct: false, explanation: 'shared_ptr 也会增加引用计数，暗示共享所有权' },
        { text: 'weak_ptr 或裸指针成员', correct: true, explanation: '不控制生命周期就 weak_ptr 或裸指针' },
        { text: 'make_shared', correct: false, explanation: 'make_shared 是创建函数，不是指针类型' },
      ],
    },
    {
      type: 'exposition',
      text: '**场景三**：容器中的多态对象。默认用 `vector<unique_ptr<Base>>`。需要共享时再改成 `shared_ptr`。',
    },
    {
      type: 'exposition',
      text: '为什么默认用 `unique_ptr`？因为性能更好、语义更清晰。从 `unique_ptr` 升级到 `shared_ptr` 容易，反过来难。',
    },
    {
      type: 'multiple-choice',
      question: '场景：多个 UI 组件需要共享同一个用户数据模型，数据模型必须保持存活直到所有组件关闭。选哪个？',
      options: [
        { text: 'unique_ptr', correct: false, explanation: '多个组件无法同时持有一个 unique_ptr' },
        { text: 'shared_ptr', correct: true, explanation: '多个组件共享所有权，计数归零时释放' },
        { text: 'weak_ptr + lock() 每次使用', correct: false, explanation: 'weak_ptr 不能保证对象存活' },
        { text: 'new/delete 手动管理', correct: false, explanation: '手动管理容易出错，不用手动' },
      ],
    },
    {
      type: 'exposition',
      text: '**场景四**：观察者模式——被观察者持有观察者的 `shared_ptr`，观察者持有被观察者的 `weak_ptr`（避免循环引用）。',
    },
    {
      type: 'exposition',
      text: '**场景五**：缓存。缓存不拥有对象，用 `weak_ptr`。缓存未命中时重新创建。',
    },
    {
      type: 'multiple-choice',
      question: '场景：一个对象池中的对象，某些对象被使用中。用哪种指针管理池中的对象？',
      options: [
        { text: 'unique_ptr，取出的对象转移所有权', correct: true, explanation: '对象池适合用 unique_ptr，取出时 move 出去' },
        { text: 'shared_ptr 给每个使用者一份', correct: false, explanation: 'shared_ptr 会让对象一直存活，无法回收' },
        { text: 'weak_ptr 给每个使用者', correct: false, explanation: '使用者需要控制对象生命周期时 weak_ptr 不够' },
        { text: '裸指针列表', correct: false, explanation: '裸指针无生命周期管理' },
      ],
    },
    {
      type: 'exposition',
      text: '最佳实践清单：\n1. 默认用 `unique_ptr`\n2. 确实需要共享时用 `shared_ptr`\n3. 需要打破循环引用或纯观察用 `weak_ptr`\n4. 函数参数用引用/裸指针表示借用',
    },
    {
      type: 'exposition',
      text: '选择流程图总结：\n\n是否唯一所有者？\n  ├─ 是 → unique_ptr\n  └─ 否 → 是否共享所有权？\n       ├─ 是 → shared_ptr\n       └─ 否 → 是否只需要观察？\n            ├─ 是 → weak_ptr\n            └─ 否 → 裸指针/引用',
    },
    {
      type: 'exposition',
      text: '常见错误：\n1. 该用 `unique_ptr` 时用了 `shared_ptr`——引入了不必要的开销\n2. 该用 `shared_ptr` 时用了裸指针——容易悬空\n3. 用裸指针表示"所有者"——语义不清晰，容易出错',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：make_shared 相比直接 new 的两个主要好处是什么？',
      options: [
        { text: '更快的运行速度和更少的内存', correct: false, explanation: '一次分配减少了分配次数' },
        { text: '一次分配和异常安全', correct: true, explanation: 'make_shared 一次分配对象+控制块，且没有泄漏窗口' },
        { text: '支持自定义删除器和对象池', correct: false, explanation: 'make_shared 不支持自定义删除器' },
        { text: '线程安全和自动加锁', correct: false, explanation: 'make_shared 不提供额外线程安全' },
      ],
    },
    {
      type: 'exposition',
      text: '记住这个原则：**尽可能明确所有权语义**。代码读起来越清楚，bug 越少。',
    },
    {
      type: 'exposition',
      text: '从下一课开始，我们进入综合练习和类型转换。先巩固智能指针，再学习安全的类型转换。',
    },
  ],
}

export default lesson
