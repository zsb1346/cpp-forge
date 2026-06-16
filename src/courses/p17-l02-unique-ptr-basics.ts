import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'unique-ptr-basics',
    chapter: 18,
    title: 'unique_ptr——独占所有权',
    subtitle: '不能拷贝只能移动',
    description: '学习用 unique_ptr 管理独占的动态内存，用 make_unique 高效创建。',
    objectives: ['能用 unique_ptr 管理动态内存', '能理解独占所有权的含义', '能用 make_unique 创建 unique_ptr'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`unique_ptr` 是独占所有权的智能指针——一块内存同时只能被一个 `unique_ptr` 指向。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '基本语法：',
      code: '#include <memory>\n\nunique_ptr<int> p(new int(42));',
    },
    {
      type: 'exposition',
      text: '更推荐用 `make_unique`：',
      code: '#include <memory>\n\nunique_ptr<int> p = make_unique<int>(42);',
    },
    {
      type: 'type-it',
      instruction: '试着创建一个 unique_ptr：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  auto p = make_unique<int>(100);\n  cout << *p << endl;\n}',
      hints: ['`make_unique<int>(100)` 在堆上创建 int 并初始化为 100', '`*p` 解引用获取值', '不需要 delete——离开作用域自动释放'],
    },
    {
      type: 'exposition',
      text: '使用 `*p` 解引用访问值，用 `p->` 访问成员（对对象类型）。',
      code: 'auto p = make_unique<int>(42);\n*p = 100;              // 解引用赋值\ncout << *p << endl;   // 输出 100',
    },
    {
      type: 'exposition',
      text: '`unique_ptr` 离开作用域时自动调用 `delete`，不需要手动释放。',
      code: '{\n  auto p = make_unique<int>(42);\n  // 使用 p\n} // 自动 delete，不会泄漏',
    },
    {
      type: 'multiple-choice',
      question: 'unique_ptr 在什么时候释放它指向的内存？',
      options: [
        { text: '调用 release() 时', correct: false, explanation: 'release 是另一种机制' },
        { text: '程序结束时', correct: false, explanation: '离开作用域就释放，不等程序结束' },
        { text: '离开所在作用域时', correct: true, explanation: 'unique_ptr 是 RAII 对象，析构时自动释放' },
        { text: '永远不会释放', correct: false, explanation: 'unique_ptr 会管理生命周期' },
      ],
    },
    {
      type: 'exposition',
      text: '**独占所有权的含义**：不能拷贝 `unique_ptr`。',
      code: 'auto p = make_unique<int>(42);\nauto q = p;  // 编译错误！不能拷贝',
    },
    {
      type: 'exposition',
      text: '如果两个指针都指向同一块内存，都以为自己独占了——那谁是真正的所有者？拷贝被禁止，就是为了避免这种歧义。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪段代码会编译错误？',
      options: [
        { text: 'auto p = make_unique<int>(5);', correct: false, explanation: '这是正确的创建方式' },
        { text: 'auto p = make_unique<int>(5); auto q = move(p);', correct: false, explanation: 'move 是允许的' },
        { text: 'auto p = make_unique<int>(5); auto q = p;', correct: true, explanation: '拷贝 unique_ptr 被禁止' },
        { text: 'cout << *p;', correct: false, explanation: '解引用访问是合法的' },
      ],
    },
    {
      type: 'exposition',
      text: '把 `unique_ptr` 传给函数时，可以通过裸指针或引用来"借用"——不转移所有权。',
      code: 'void use(unique_ptr<int>& p) {\n  cout << *p << endl;\n} // 不转移所有权',
    },
    {
      type: 'exposition',
      text: '按值传递 `unique_ptr` 必须用 `std::move`——这表示"我把所有权交给你"。下一课详细讲。',
    },
    {
      type: 'type-it',
      instruction: '练习 unique_ptr 的创建和读取：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  auto p = make_unique<double>(3.14);\n  cout << "值: " << *p << endl;\n  *p = 2.718;\n  cout << "新值: " << *p << endl;\n}',
      hints: ['`make_unique<double>(3.14)` 创建堆上的 double', '`*p` 可以读也可以写', '不需要写 delete——自动释放'],
    },
    {
      type: 'exposition',
      text: '`unique_ptr` 的大小和裸指针一样——没有额外开销。用它的好处是零成本抽象。',
    },
    {
      type: 'exposition',
      text: '自定义删除器：默认用 `delete`，也可以指定自己的释放逻辑。不过 90% 的情况默认就好。',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：裸指针的三个问题不包括以下哪个？',
      options: [
        { text: '忘记 delete 导致内存泄漏', correct: false, explanation: '这是三个问题之一' },
        { text: 'delete 后继续使用导致悬空指针', correct: false, explanation: '这是三个问题之一' },
        { text: '初始化时未赋值', correct: true, explanation: '未初始化是另一个问题，但不是三个核心问题之一' },
        { text: '两个指针同时 delete 同块内存', correct: false, explanation: '这是三个问题之一——双重删除' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行下面的代码，观察 unique_ptr 的行为：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  auto p = make_unique<int>(42);\n  cout << *p << endl;\n  *p = 99;\n  cout << *p << endl;\n}',
      expectedOutput: '42\n99',
      editable: false,
    },
    {
      type: 'exposition',
      text: '总结：\n- `unique_ptr` 独占管理堆内存\n- 用 `make_unique` 创建\n- 不能拷贝，但可以移动\n- 离开作用域自动释放',
    },
  ],
}

export default lesson
