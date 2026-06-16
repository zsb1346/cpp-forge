import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'unique-ptr-transfer',
    chapter: 18,
    title: '转移所有权',
    subtitle: '用 std::move 转移',
    description: '学习用 std::move 转移 unique_ptr 的所有权，理解不能拷贝只能移动的设计。',
    objectives: ['能用 std::move 转移 unique_ptr 的所有权', '能理解转移后原指针为空', '能理解为什么不能拷贝'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`unique_ptr` 不能拷贝——因为独占所有权。但可以用 `std::move` **转移所有权**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '移动后，原 `unique_ptr` 被置为空（`nullptr`），新指针获得所有权。',
      code: 'auto p = make_unique<int>(42);\nauto q = move(p);   // 所有权从 p 转移到 q\n// p 现在是 nullptr\n// q 拥有 int(42)',
    },
    {
      type: 'exposition',
      text: '移动后不要再用原指针——它已经空了。用之前检查是否为 `nullptr`。',
    },
    {
      type: 'type-it',
      instruction: '练习 std::move 转移所有权：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  auto p = make_unique<int>(10);\n  auto q = move(p);\n  if (p == nullptr) {\n    cout << "p 已为空" << endl;\n  }\n  cout << *q << endl;\n}',
      hints: ['`move(p)` 将所有权转给 q', '转移后 p 为 nullptr', '用 `if (p == nullptr)` 检查是否为空'],
    },
    {
      type: 'exposition',
      text: '为什么不能拷贝？因为拷贝意味着两个 `unique_ptr` 都认为自己是所有者——销毁时会 double delete。',
    },
    {
      type: 'multiple-choice',
      question: '执行 `auto q = move(p);` 后，p 的状态是什么？',
      options: [
        { text: 'p 仍然指向原来的内存', correct: false, explanation: '转移后 p 被置为空' },
        { text: 'p 被设为 nullptr', correct: true, explanation: '移动操作将 p 置空' },
        { text: 'p 指向 q', correct: false, explanation: 'p 是 nullptr，不指向 q' },
        { text: 'p 和 q 共同拥有所有权', correct: false, explanation: 'unique_ptr 不共享所有权' },
      ],
    },
    {
      type: 'exposition',
      text: '把 `unique_ptr` 按值传给函数，也需要 move：',
      code: 'void take(unique_ptr<int> p) {\n  cout << *p << endl;\n} // take 获得所有权\n\nint main() {\n  auto p = make_unique<int>(5);\n  take(move(p));  // 转移给函数\n  // p 现在是 nullptr\n}',
    },
    {
      type: 'exposition',
      text: '函数返回 `unique_ptr` 时，编译器会自动用 move 优化——不需要手动写 move。',
      code: 'unique_ptr<int> create() {\n  auto p = make_unique<int>(42);\n  return p;  // 自动 move，不需要显式写\n}',
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况不需要显式调用 std::move？',
      options: [
        { text: '将 unique_ptr 传给按值接收的函数', correct: false, explanation: '按值传递需要显式 move' },
        { text: '从函数返回局部 unique_ptr', correct: true, explanation: '编译器自动做 move 优化' },
        { text: '将 unique_ptr 存入 vector', correct: false, explanation: 'push_back 需要 move' },
        { text: '将 unique_ptr 赋给另一个 unique_ptr 变量', correct: false, explanation: '赋值也需要 move' },
      ],
    },
    {
      type: 'exposition',
      text: '借用不转移：如果函数只需要读取 `unique_ptr` 的内容，传引用或裸指针即可。',
      code: 'void read(const unique_ptr<int>& p) {\n  cout << *p << endl;\n} // 只借用，不转移',
    },
    {
      type: 'fill-in',
      prompt: '将 unique_ptr 的所有权从 p 转移到 q：',
      template: 'auto p = make_unique<int>(42);\nauto q = ____(p);',
      answers: ['move'],
      hints: ['使用 std::move 转移所有权', '需要 #include <memory>', '转移后 p 为 nullptr'],
    },
    {
      type: 'exposition',
      text: '实际开发中的模式：工厂函数返回 `unique_ptr`，调用方获得所有权。',
      code: 'unique_ptr<Shape> createShape(string type) {\n  if (type == "circle")\n    return make_unique<Circle>();\n  return make_unique<Square>();\n}',
    },
    {
      type: 'exposition',
      text: '`unique_ptr` 的可移动不可拷贝特性，让它能安全表达"这个资源只属于你"的语义。',
    },
    {
      type: 'fill-in',
      prompt: '将 unique_ptr 按值传给函数（转移所有权）：',
      template: 'void take(unique_ptr<int> p) {}\n\nint main() {\n  auto p = make_unique<int>(5);\n  take(____(p));\n}',
      answers: ['move'],
      hints: ['按值传递 unique_ptr 需要 move', '转移后 p 在 main 中不可用', '需要 std::move'],
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：make_unique 的作用是什么？',
      options: [
        { text: '在栈上创建一个对象', correct: false, explanation: 'make_unique 在堆上创建' },
        { text: '在堆上创建对象并返回 unique_ptr', correct: true, explanation: 'make_unique 分配堆内存并封装为 unique_ptr' },
        { text: '拷贝一个已有的 unique_ptr', correct: false, explanation: 'make_unique 创建新对象，不拷贝' },
        { text: '释放 unique_ptr 的内存', correct: false, explanation: 'make_unique 是创建，不是释放' },
      ],
    },
    {
      type: 'exposition',
      text: '复习 p11-02 的 move 语义：`std::move` 不移动任何东西——它只是把左值转换成右值引用，让移动构造函数/赋值运算符有机会"偷"走资源。',
    },
    {
      type: 'type-it',
      instruction: '完整的 move 转移示例：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nvoid take(unique_ptr<int> p) {\n  cout << "拿到: " << *p << endl;\n}\n\nint main() {\n  auto p = make_unique<int>(77);\n  take(move(p));\n  if (p == nullptr) {\n    cout << "main 中的 p 已空" << endl;\n  }\n}',
      hints: ['take 获得所有权，main 释放所有权', '转移后 p 为 nullptr', '函数参数按值接收 unique_ptr'],
    },
    {
      type: 'exposition',
      text: '解引用已转移的 unique_ptr 是未定义行为——就像解引用 nullptr 一样。运行时会崩溃或出现奇怪行为。',
    },
    {
      type: 'exposition',
      text: '好习惯：转移所有权后，用 `if (ptr)` 或 `if (ptr != nullptr)` 检查后再使用。这能避免许多隐蔽的 bug。',
    },
  ],
}

export default lesson
