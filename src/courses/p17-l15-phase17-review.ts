import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase17-review',
    chapter: 18,
    title: '阶段 17 综合复习',
    subtitle: '智能指针+类型安全总复习',
    description: '全面回顾智能指针和类型转换的所有核心概念，完成综合练习。',
    objectives: ['能综合运用智能指针和类型转换', '能根据场景选择正确的工具', '能通过综合测试检验学习成果'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '欢迎来到阶段 17 的综合复习。回顾整个阶段的内容——智能指针和类型转换。',
    },
    {
      type: 'multiple-choice',
      question: '场景：一个 Texture 资源被多个 Sprite 对象共享，所有 Sprite 销毁后 Texture 才释放。选什么？',
      options: [
        { text: 'unique_ptr<Texture>', correct: false, explanation: 'unique_ptr 独占所有权，不能共享' },
        { text: 'shared_ptr<Texture>', correct: true, explanation: 'shared_ptr 共享所有权，最后一个销毁时释放' },
        { text: 'weak_ptr<Texture>', correct: false, explanation: 'weak_ptr 不控制生命周期' },
        { text: 'Texture* 裸指针', correct: false, explanation: '裸指针不管理生命周期' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '场景：把一个 int 数组的地址按字节打印十六进制。选哪个？',
      options: [
        { text: 'static_cast<char*>(arr)', correct: false, explanation: 'static_cast 不允许 int* 到 char*' },
        { text: 'dynamic_cast<char*>(arr)', correct: false, explanation: 'dynamic_cast 需要多态类型' },
        { text: 'reinterpret_cast<char*>(arr)', correct: true, explanation: '按位重新解释内存用 reinterpret_cast' },
        { text: 'const_cast<char*>(arr)', correct: false, explanation: 'const_cast 只处理 const 属性' },
      ],
    },
    {
      type: 'exposition',
      text: '**智能指针回顾**：\n- 裸指针的三个问题：内存泄漏、悬空指针、双重删除\n- `unique_ptr`：独占所有权，不能拷贝只能移动\n- `shared_ptr`：引用计数，共享所有权\n- `weak_ptr`：弱引用，不增加计数，打破循环\n- 用 `make_unique` 和 `make_shared` 创建',
    },
    {
      type: 'multiple-choice',
      question: '以下代码中引用计数的变化是？\n{\n  auto p = make_shared<int>(1);\n  auto q = p;\n  {\n    auto r = q;\n  }\n}',
      options: [
        { text: '1 → 2 → 3 → 2 → 1 → 0', correct: true, explanation: 'p 创建计数 1，q 拷贝变成 2，r 拷贝变成 3，r 销毁变回 2，q 销毁变 1，p 销毁变 0' },
        { text: '1 → 2 → 2 → 1 → 0', correct: false, explanation: 'r 拷贝自 q，计数会增加到 3' },
        { text: '1 → 1 → 1 → 1 → 0', correct: false, explanation: '拷贝会增加引用计数' },
        { text: '1 → 2 → 3 → 3 → 3', correct: false, explanation: '离开作用域计数会减少' },
      ],
    },
    {
      type: 'exposition',
      text: '**类型转换回顾**：\n- `static_cast`：编译期数值/指针转换\n- `dynamic_cast`：运行时多态向下转型\n- `const_cast`：去 const/volatile\n- `reinterpret_cast`：按位重解释\n- **不要用 C 风格强转**',
    },
    {
      type: 'concept-cards',
      instruction: '智能指针核心概念：',
      cards: [
        { glyph: '🔑', term: 'unique_ptr', meaning: '独占所有权，不能拷贝', example: 'make_unique<T>(...)' },
        { glyph: '🔗', term: 'shared_ptr', meaning: '共享所有权，引用计数', example: 'make_shared<T>(...)' },
        { glyph: '🪶', term: 'weak_ptr', meaning: '弱引用，不增加计数', example: 'wp.lock()' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '类型转换核心概念：',
      cards: [
        { glyph: '⚡', term: 'static_cast', meaning: '编译期安全转换', example: 'static_cast<int>(d)' },
        { glyph: '🎯', term: 'dynamic_cast', meaning: '运行时多态检查', example: 'dynamic_cast<D*>(b)' },
        { glyph: '🧊', term: 'const_cast', meaning: '去掉 const 属性', example: 'const_cast<char*>(s)' },
        { glyph: '🔄', term: 'reinterpret_cast', meaning: '按位重解释内存', example: 'reinterpret_cast<char*>(p)' },
      ],
    },
    {
      type: 'exposition',
      text: '**综合编程题**：实现一个能存储多种动物的容器，每种动物能发出声音。用智能指针管理。',
    },
    {
      type: 'code-runner',
      instruction: '运行综合示例——智能指针 + 多态：',
      code: '#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\n\nstruct Animal {\n  virtual void speak() const = 0;\n  virtual ~Animal() = default;\n};\n\nstruct Dog : Animal {\n  void speak() const override { cout << "Woof!" << endl; }\n  void fetch() const { cout << "Fetching..." << endl; }\n};\n\nstruct Cat : Animal {\n  void speak() const override { cout << "Meow!" << endl; }\n};\n\nint main() {\n  vector<unique_ptr<Animal>> zoo;\n  zoo.push_back(make_unique<Dog>());\n  zoo.push_back(make_unique<Cat>());\n  for (const auto& a : zoo) {\n    a->speak();\n    Dog* d = dynamic_cast<Dog*>(a.get());\n    if (d) d->fetch();\n  }\n}',
      expectedOutput: 'Woof!\nFetching...\nMeow!',
      editable: false,
    },
    {
      type: 'exposition',
      text: '上面的代码展示了多种知识点的综合运用：\n- `unique_ptr` 管理多态对象\n- `make_unique` 创建\n- `dynamic_cast` 运行时类型检查\n- 虚函数实现多态',
    },
    {
      type: 'multiple-choice',
      question: '复习阶段 17：在代码中应该优先使用哪种智能指针作为默认选择？',
      options: [
        { text: 'shared_ptr——灵活，可拷贝', correct: false, explanation: 'shared_ptr 有额外开销，只在需要时使用' },
        { text: 'unique_ptr——零开销，语义清晰', correct: true, explanation: 'unique_ptr 是最小开销，语义最明确，需要共享时再改为 shared_ptr' },
        { text: 'weak_ptr——不增加引用计数', correct: false, explanation: 'weak_ptr 不能单独管理生命周期' },
        { text: '裸指针——最轻量', correct: false, explanation: '裸指针不管理生命周期，容易出错' },
      ],
    },
    {
      type: 'exposition',
      text: '**阶段 17 学习完成！**\n你掌握了智能指针（unique_ptr、shared_ptr、weak_ptr）和 C++ 四种类型转换（static_cast、dynamic_cast、const_cast、reinterpret_cast）。',
    },
    {
      type: 'exposition',
      text: '复习小贴士：回到前面你觉得困难的课程再看看。分布式练习（每天 15 分钟）比一次性复习效果更好。',
    },
    {
      type: 'multiple-choice',
      question: '阶段 17 的综合题：以下哪种写法是 C++ 推荐的？',
      options: [
        { text: 'int* p = (int*)malloc(sizeof(int));', correct: false, explanation: 'C 风格强转 + malloc，不推荐' },
        { text: 'auto p = make_unique<int>(42);', correct: true, explanation: 'make_unique + auto，现代 C++ 推荐的写法' },
        { text: 'int* p = new int(42);', correct: false, explanation: 'new/delete 不如智能指针安全' },
        { text: 'shared_ptr<int> p = new int(42);', correct: false, explanation: '不能直接赋值裸指针给 shared_ptr' },
      ],
    },
    {
      type: 'exposition',
      text: '阶段 17 关键法则回顾：\n1. 默认用 unique_ptr\n2. 需要共享用 shared_ptr\n3. 循环引用用 weak_ptr 打破\n4. 用 C++ 命名 cast 代替 C 风格强转',
    },
    {
      type: 'exposition',
      text: '奖励小贴士：你在阶段 17 学到的 RAII 和所有权思想，是整个 C++ 中最有价值的编程理念之一。',
    },
    {
      type: 'exposition',
      text: '下一阶段将进入并发编程——18 阶段：线程、锁、数据竞争。这是 C++ 中最具挑战性的领域之一。做好准备！',
    },
  ],
}

export default lesson
