import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'shared-ptr-intro',
    chapter: 18,
    title: 'shared_ptr——共享所有权',
    subtitle: '引用计数',
    description: '学习 shared_ptr 通过引用计数实现共享所有权，最后一个销毁时自动释放。',
    objectives: ['能用 shared_ptr 管理共享动态对象', '能理解引用计数的工作原理', '能用 make_shared 创建 shared_ptr'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有时一块内存需要多个指针共享——比如多个对象引用同一个资源。这时用 `shared_ptr`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`shared_ptr` 通过**引用计数（reference count）** 跟踪所有者数量。',
      code: 'auto p = make_shared<int>(42);  // 引用计数 = 1\n{\n  auto q = p;  // 拷贝，引用计数 = 2\n} // q 销毁，引用计数 = 1\n// p 销毁，引用计数 = 0 → 释放内存',
    },
    {
      type: 'exposition',
      text: '每次拷贝 `shared_ptr`，引用计数 +1。每次销毁一个，引用计数 -1。减到 0 时自动释放内存。',
    },
    {
      type: 'concept-cards',
      instruction: '理解 shared_ptr 的核心概念：',
      cards: [
        { glyph: '📊', term: '引用计数', meaning: '跟踪有多少 shared_ptr 指向同一内存', example: 'use_count()' },
        { glyph: '📋', term: '控制块', meaning: '存储引用计数的内部数据结构', example: 'make_shared 一次分配' },
        { glyph: '📦', term: 'make_shared', meaning: '一次性分配对象+控制块，更高效', example: 'make_shared<int>(5)' },
        { glyph: '🔚', term: '自动释放', meaning: '计数归零时自动 delete', example: '无需手动释放' },
      ],
    },
    {
      type: 'exposition',
      text: '基础用法：',
      code: '#include <memory>\n\nauto p = make_shared<int>(42);\nauto q = p;  // 拷贝，引用计数+1\n\ncout << p.use_count();  // 输出 2',
    },
    {
      type: 'type-it',
      instruction: '练习创建和使用 shared_ptr：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  auto p = make_shared<int>(100);\n  cout << "计数: " << p.use_count() << endl;\n  {\n    auto q = p;\n    cout << "拷贝后: " << p.use_count() << endl;\n  }\n  cout << "离开块: " << p.use_count() << endl;\n}',
      hints: ['`use_count()` 返回当前引用计数', '拷贝构造增加引用计数', '离开作用域自动减少引用计数'],
    },
    {
      type: 'exposition',
      text: '`shared_ptr` 同样支持 `*` 解引用和 `->` 成员访问。',
    },
    {
      type: 'exposition',
      text: '警告：不要用裸指针创建多个 `shared_ptr`——会导致多个独立控制块，造成双重删除。',
      code: 'int* raw = new int(42);\nshared_ptr<int> p(raw);\nshared_ptr<int> q(raw);  // 危险！两个控制块\n// p 和 q 销毁时会 double delete',
    },
    {
      type: 'multiple-choice',
      question: '执行完 `auto q = p;`（p 是 shared_ptr）后，引用计数是多少？',
      options: [
        { text: '0', correct: false, explanation: '至少当前有 p 和 q 两个 shared_ptr' },
        { text: '1', correct: false, explanation: '拷贝后有两个所有者' },
        { text: '2', correct: true, explanation: 'p 和 q 各自持有一份所有权' },
        { text: '不确定', correct: false, explanation: '拷贝构造明确增加引用计数' },
      ],
    },
    {
      type: 'exposition',
      text: '在容器中使用 `shared_ptr`：容器中所有元素共享所有权。',
      code: 'vector<shared_ptr<int>> vec;\nauto p = make_shared<int>(42);\nvec.push_back(p);  // 不需要 move，可以拷贝\nvec.push_back(p);  // 同一个对象，多个引用',
    },
    {
      type: 'type-it',
      instruction: 'shared_ptr 在容器中的使用：',
      code: '#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<shared_ptr<int>> vec;\n  auto p = make_shared<int>(42);\n  vec.push_back(p);\n  vec.push_back(p);\n  cout << "引用计数: " << p.use_count() << endl;\n  for (const auto& v : vec) {\n    cout << *v << " ";\n  }\n}',
      hints: ['shared_ptr 可以拷贝到容器中', '每个拷贝都增加引用计数', '遍历方式和普通指针一样'],
    },
    {
      type: 'exposition',
      text: '`shared_ptr` 的线程安全：引用计数的增减是原子操作，线程安全。但指向的对象本身不是线程安全的。',
    },
    {
      type: 'multiple-choice',
      question: 'shared_ptr 的引用计数操作是线程安全的吗？',
      options: [
        { text: '不是，所有操作都不安全', correct: false, explanation: '引用计数的增减是原子的' },
        { text: '引用计数增减是安全的，指向对象的读写不安全', correct: true, explanation: '计数原子操作，对象需要额外同步' },
        { text: '完全线程安全，包括对象读写', correct: false, explanation: 'shared_ptr 只保证计数安全' },
        { text: '完全不安全，需要外部锁', correct: false, explanation: '计数操作是原子的' },
      ],
    },
    {
      type: 'exposition',
      text: '`shared_ptr` 与 `unique_ptr` 对比：',
      code: 'unique_ptr:  独占，零开销，不能拷贝\nshared_ptr:  共享，有计数开销，可以拷贝',
    },
    {
      type: 'code-runner',
      instruction: '运行并观察 shared_ptr 的引用计数变化：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  auto p = make_shared<int>(7);\n  cout << "初始: " << p.use_count() << endl;\n  auto q = p;\n  cout << "拷贝: " << p.use_count() << endl;\n  q.reset();\n  cout << "重置: " << p.use_count() << endl;\n}',
      expectedOutput: '初始: 1\n拷贝: 2\n重置: 1',
      editable: false,
    },
    {
      type: 'exposition',
      text: '只有真正需要共享所有权时才用 `shared_ptr`。默认优先用 `unique_ptr`，必要时再升级。',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：vector<unique_ptr<T>> 添加元素时为什么要用 move？',
      options: [
        { text: '为了性能优化，少拷贝一次', correct: false, explanation: '不是性能问题，而是 unique_ptr 不能拷贝' },
        { text: '因为 unique_ptr 禁止拷贝', correct: true, explanation: 'unique_ptr 独占所有权，不能拷贝' },
        { text: '因为 vector 只能存右值', correct: false, explanation: 'vector 能存左值，只要类型可拷贝' },
        { text: '因为 push_back 要求右值', correct: false, explanation: 'push_back 有左值和右值重载' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- `shared_ptr` 通过引用计数实现共享所有权\n- 用 `make_shared` 创建\n- 拷贝增加计数，销毁减少计数\n- 计数为 0 时自动释放',
    },
  ],
}

export default lesson
