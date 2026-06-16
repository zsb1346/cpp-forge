import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-smart-ptr',
    chapter: 18,
    title: '智能指针综合练习',
    subtitle: '巩固 01-08',
    description: '综合练习 unique_ptr、shared_ptr、weak_ptr 的使用和选择。',
    objectives: ['能正确使用三种智能指针', '能根据场景选择合适的智能指针', '能编写完整的智能指针代码'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '这个练习课不引入新概念，专门操练前面 8 课的内容。',
    },
    {
      type: 'type-it',
      instruction: '练习 1：创建 unique_ptr 并操作：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  auto p = make_unique<int>(42);\n  *p = *p + 10;\n  cout << *p << endl;\n}',
      hints: ['`make_unique<int>(42)` 创建堆上的 int', '`*p` 解引用进行读写', '不需要 delete，自动释放'],
    },
    {
      type: 'exposition',
      text: '练习 2：unique_ptr 的转移和容器。',
    },
    {
      type: 'type-it',
      instruction: '练习 2：将 unique_ptr 从容器中取出并转移：',
      code: '#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<unique_ptr<int>> vec;\n  vec.push_back(make_unique<int>(1));\n  vec.push_back(make_unique<int>(2));\n  auto p = move(vec[0]);\n  cout << *p << endl;\n  cout << (vec[0] == nullptr) << endl;\n}',
      hints: ['`move(vec[0])` 从容器取出所有权', '取出后 vec[0] 变为 nullptr', '用 `== nullptr` 检查是否为空'],
    },
    {
      type: 'code-runner',
      instruction: '练习 3：用 unique_ptr 管理多态对象，遍历容器：',
      code: '#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\n\nstruct Shape {\n  virtual void draw() const = 0;\n  virtual ~Shape() = default;\n};\n\nstruct Circle : Shape {\n  void draw() const override { cout << "Circle" << endl; }\n};\nstruct Square : Shape {\n  void draw() const override { cout << "Square" << endl; }\n};\n\nint main() {\n  vector<unique_ptr<Shape>> shapes;\n  shapes.push_back(make_unique<Circle>());\n  shapes.push_back(make_unique<Square>());\n  for (const auto& s : shapes) {\n    s->draw();\n  }\n}',
      expectedOutput: 'Circle\nSquare',
      editable: false,
    },
    {
      type: 'exposition',
      text: '练习 4：shared_ptr 的引用计数理解。',
    },
    {
      type: 'multiple-choice',
      question: '执行以下代码后，引用计数是多少？\nauto p = make_shared<int>(1);\n{\n  auto q = p;\n  auto r = q;\n  cout << p.use_count();\n}',
      options: [
        { text: '1', correct: false, explanation: '在块内 p、q、r 三个 shared_ptr 共存' },
        { text: '2', correct: false, explanation: 'q 和 r 拷贝自 p，共三个' },
        { text: '3', correct: true, explanation: 'p、q、r 三个 shared_ptr 指向同一对象' },
        { text: '0', correct: false, explanation: '对象还存在，计数不会是 0' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '练习 5：shared_ptr 综合练习，观察引用计数：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  auto p = make_shared<int>(99);\n  cout << "1: " << p.use_count() << endl;\n  auto q = p;\n  cout << "2: " << p.use_count() << endl;\n  {\n    auto r = p;\n    cout << "3: " << p.use_count() << endl;\n  }\n  cout << "4: " << p.use_count() << endl;\n}',
      expectedOutput: '1: 1\n2: 2\n3: 3\n4: 2',
      editable: false,
    },
    {
      type: 'type-it',
      instruction: '练习 6：weak_ptr 的使用——从 weak_ptr 获得 shared_ptr：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n  auto sp = make_shared<int>(42);\n  weak_ptr<int> wp = sp;\n  auto locked = wp.lock();\n  if (locked) {\n    cout << *locked << endl;\n  }\n}',
      hints: ['`weak_ptr` 从 `shared_ptr` 构造', '`lock()` 返回 shared_ptr，对象已释放则返回空', '使用前检查是否为空'],
    },
    {
      type: 'exposition',
      text: '练习 7：选择正确的智能指针。试着判断以下场景。',
    },
    {
      type: 'multiple-choice',
      question: '场景：一个 Company 拥有多个 Department，Department 被销毁时 Company 也要知道（引用回父节点但不控制生命周期）。Department 中应如何引用 Company？',
      options: [
        { text: 'shared_ptr<Company>', correct: false, explanation: '这会导致循环引用' },
        { text: 'unique_ptr<Company>', correct: false, explanation: '多个 Department 不能共享 unique_ptr' },
        { text: 'weak_ptr<Company>', correct: true, explanation: 'weak_ptr 不增加引用计数，打破循环' },
        { text: 'Company& 引用', correct: false, explanation: '引用也可以，但无法检测 Company 是否释放' },
      ],
    },
    {
      type: 'exposition',
      text: '练习 8：复习前面课程中容易混淆的概念。',
    },
    {
      type: 'multiple-choice',
      question: '复习课程 03：unique_ptr 转移所有权后，原指针的状态是什么？',
      options: [
        { text: '仍然指向原来的内存', correct: false, explanation: '移动后原指针被置空' },
        { text: '被置为 nullptr', correct: true, explanation: 'std::move 转移所有权后原指针为空' },
        { text: '指向新分配的内存', correct: false, explanation: '不指向新内存' },
        { text: '与目标指针共享所有权', correct: false, explanation: 'unique_ptr 不共享所有权' },
      ],
    },
    {
      type: 'exposition',
      text: '练习 9：复习所有权语义——unique_ptr 和 shared_ptr 的核心区别。',
    },
    {
      type: 'multiple-choice',
      question: '复习课程 05：shared_ptr 的引用计数为 0 时会发生什么？',
      options: [
        { text: '程序崩溃', correct: false, explanation: '正常行为是自动释放内存' },
        { text: '自动 delete 指向的对象，释放内存', correct: true, explanation: '计数归零时自动释放' },
        { text: 'shared_ptr 变成 nullptr', correct: false, explanation: 'shared_ptr 本身不会被置空，但对象被销毁' },
        { text: '抛出异常', correct: false, explanation: '不抛异常，是正常生命周期结束' },
      ],
    },
    {
      type: 'exposition',
      text: '练习完成！你巩固了 unique_ptr、shared_ptr 和 weak_ptr 的核心用法。',
    },
    {
      type: 'exposition',
      text: '提示：如果你对某个概念还不清楚，回到对应的课程再看一遍。打好基础再进入下一部分。',
    },
    {
      type: 'exposition',
      text: '接下来我们进入阶段 17 的第二部分：类型转换。学习 C++ 安全的四种显式转换。',
    },
  ],
}

export default lesson
