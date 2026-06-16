import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'unique-ptr-container',
    chapter: 18,
    title: 'unique_ptr 在容器里',
    subtitle: 'vector<unique_ptr<T>>',
    description: '学习在容器中存放 unique_ptr，管理多态对象集合。',
    objectives: ['能用 vector<unique_ptr<T>> 管理对象集合', '能理解向容器添加元素需要 move', '能遍历并使用容器中的 unique_ptr'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '动态创建的对象集合是常见需求。`vector<unique_ptr<T>>` 可以安全地管理它们。',
    },
    {
      type: 'exposition',
      text: '基本用法：',
      code: 'vector<unique_ptr<int>> vec;\nvec.push_back(make_unique<int>(10));\nvec.push_back(make_unique<int>(20));',
    },
    {
      type: 'exposition',
      text: '注意：`push_back` 需要 move，因为 `unique_ptr` 不能拷贝。',
      code: 'auto p = make_unique<int>(42);\nvec.push_back(move(p));  // 转移所有权到容器',
    },
    {
      type: 'type-it',
      instruction: '创建包含 unique_ptr 的 vector：',
      code: '#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<unique_ptr<int>> vec;\n  vec.push_back(make_unique<int>(10));\n  vec.push_back(make_unique<int>(20));\n  vec.push_back(make_unique<int>(30));\n  cout << vec.size() << endl;\n}',
      hints: ['`push_back(make_unique<int>(...))` 是常见写法', '不能拷贝 unique_ptr，但 make_unique 返回临时对象自动 move', '`vec.size()` 获取元素数量'],
    },
    {
      type: 'exposition',
      text: '遍历容器：用引用访问元素，避免拷贝。',
      code: 'for (const auto& ptr : vec) {\n  cout << *ptr << endl;\n} // 用 const 引用遍历',
    },
    {
      type: 'exposition',
      text: '多态对象的容器——存储派生类的 unique_ptr 到基类的 vector：',
      code: 'vector<unique_ptr<Shape>> shapes;\nshapes.push_back(make_unique<Circle>());\nshapes.push_back(make_unique<Square>());\n\nfor (auto& s : shapes) {\n  s->draw();  // 多态调用',
    },
    {
      type: 'multiple-choice',
      question: '向 vector<unique_ptr<int>> 添加元素时，为什么有时需要 move？',
      options: [
        { text: '因为 vector 要求元素可移动', correct: false, explanation: '因为 unique_ptr 不能拷贝' },
        { text: '因为 unique_ptr 不能拷贝，只能移动', correct: true, explanation: 'push_back 的参数如果是左值就需要 move' },
        { text: '因为 vector 的 push_back 只能接受右值', correct: false, explanation: 'push_back 可以接受左值，但需要可拷贝' },
        { text: '因为 unique_ptr 太大需要 move 优化', correct: false, explanation: 'unique_ptr 和裸指针一样大，不是大小问题' },
      ],
    },
    {
      type: 'exposition',
      text: '从容器中移除元素：用 `erase` 或者让 `unique_ptr` 离开作用域。',
      code: 'vec.erase(vec.begin());  // 删除第一个元素\n// 该元素对应的内存自动释放',
    },
    {
      type: 'exposition',
      text: '清空容器：`vec.clear()` 会释放所有 `unique_ptr` 指向的内存。',
    },
    {
      type: 'type-it',
      instruction: '练习使用容器的 unique_ptr 遍历和删除：',
      code: '#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<unique_ptr<int>> vec;\n  for (int i = 0; i < 3; i++) {\n    vec.push_back(make_unique<int>(i * 10));\n  }\n  for (const auto& p : vec) {\n    cout << *p << " ";\n  }\n  cout << endl;\n  vec.clear();\n  cout << "清除后: " << vec.size() << endl;\n}',
      hints: ['用 range-based for 循环遍历', '用 `const auto&` 避免拷贝', '`vec.clear()` 自动释放所有内存'],
    },
    {
      type: 'exposition',
      text: '在容器间转移元素：用 `std::move` 从容器取出。',
      code: 'auto p = move(vec[0]);  // 取出所有权\n// vec[0] 变为 nullptr',
    },
    {
      type: 'exposition',
      text: '与裸指针容器对比：裸指针容器不会自动管理生命周期，需要手动遍历 delete——容易泄漏或双重删除。',
    },
    {
      type: 'multiple-choice',
      question: '使用 vector<unique_ptr<T>> 相比 vector<T*> 的好处是什么？',
      options: [
        { text: '运行速度更快', correct: false, explanation: '性能差不多，智能指针是零成本抽象' },
        { text: '自动管理生命周期，不会泄漏', correct: true, explanation: 'unique_ptr 离开容器时自动释放内存' },
        { text: '可以直接拷贝容器', correct: false, explanation: 'unique_ptr 不能拷贝，容器也不能拷贝' },
        { text: '可以存不同类型的对象', correct: false, explanation: '两者都可以存基类指针实现多态' },
      ],
    },
    {
      type: 'exposition',
      text: '排序容器中的 `unique_ptr`：可以通过解引用比较。',
      code: 'sort(vec.begin(), vec.end(),\n  [](const auto& a, const auto& b) {\n    return *a < *b;\n  });',
    },
    {
      type: 'exposition',
      text: '实际建议：如果你要在容器中存放多态对象，`vector<unique_ptr<Base>>` 是标准做法。',
    },
    {
      type: 'code-runner',
      instruction: '运行多态对象容器的示例：',
      code: '#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\n\nstruct Animal {\n  virtual void speak() const = 0;\n  virtual ~Animal() = default;\n};\n\nstruct Dog : Animal {\n  void speak() const override { cout << "Woof!" << endl; }\n};\n\nstruct Cat : Animal {\n  void speak() const override { cout << "Meow!" << endl; }\n};\n\nint main() {\n  vector<unique_ptr<Animal>> animals;\n  animals.push_back(make_unique<Dog>());\n  animals.push_back(make_unique<Cat>());\n  for (const auto& a : animals) {\n    a->speak();\n  }\n}',
      expectedOutput: 'Woof!\nMeow!',
      editable: false,
    },
    {
      type: 'exposition',
      text: '注意：`vector<unique_ptr<T>>` 本身不可拷贝——因为 `unique_ptr` 不可拷贝。但可以移动整个容器。',
    },
    {
      type: 'exposition',
      text: '如果需要把 vector 传给函数，用引用传参避免拷贝问题。',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：std::move 对 unique_ptr 做了什么？',
      options: [
        { text: '拷贝了指针和内存', correct: false, explanation: 'move 不拷贝，只转移所有权' },
        { text: '将原指针置空，新指针获得所有权', correct: true, explanation: 'move 转移所有权，原指针变 nullptr' },
        { text: '释放了原指针的内存', correct: false, explanation: 'move 不释放内存，只是转移' },
        { text: '创建了一个共享指针', correct: false, explanation: 'move 不改变指针类型' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：`vector<unique_ptr<T>>` 让你像管理普通对象一样管理动态对象——自动释放、类型安全、零额外开销。',
    },
  ],
}

export default lesson
