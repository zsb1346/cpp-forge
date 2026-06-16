import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'dynamic-cast',
    chapter: 18,
    title: 'dynamic_cast——运行时检查',
    subtitle: '安全向下转型',
    description: '学习用 dynamic_cast 做运行时安全的向下转型。',
    objectives: ['能用 dynamic_cast 做安全的向下转型', '能理解运行时类型检查的必要性', '能区分 dynamic_cast 和 static_cast'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '向上转型（子→父）总是安全的。反过来——**向下转型（父→子）**——可能不安全。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '假设有一个 `Shape*` 指针，它实际指向的是 `Circle` 还是 `Square`？编译期不知道。需要在运行时检查。',
      code: 'Shape* sp = getShape();  // 实际可能是 Circle 或 Square\n// 我想调用 Circle 特有的方法？',
    },
    {
      type: 'exposition',
      text: '`dynamic_cast` 在运行时检查类型。如果转换合法就返回目标指针，否则返回 `nullptr`。',
      code: 'Shape* sp = getShape();\nCircle* cp = dynamic_cast<Circle*>(sp);\nif (cp) {\n  cp->radiusMethod();  // 安全调用\n}',
    },
    {
      type: 'type-it',
      instruction: '练习 dynamic_cast 的基本用法：',
      code: '#include <iostream>\nusing namespace std;\n\nstruct Base {\n  virtual ~Base() = default;\n};\nstruct Derived : Base {};\n\nint main() {\n  Base* bp = new Derived();\n  Derived* dp = dynamic_cast<Derived*>(bp);\n  if (dp) {\n    cout << "转型成功" << endl;\n  }\n  delete bp;\n}',
      hints: ['基类必须有虚函数（至少虚析构）', '`dynamic_cast<Derived*>(bp)` 尝试向下转型', '返回 nullptr 表示转型失败'],
    },
    {
      type: 'exposition',
      text: '**必须有虚函数**：`dynamic_cast` 需要 RTTI（运行时类型信息）。RTTI 通过虚函数表实现——没有虚函数的类没有 RTTI。',
    },
    {
      type: 'exposition',
      text: '`dynamic_cast` 也可以用于引用——但失败时不会返回空引用（C++ 没有空引用），而是抛出 `std::bad_cast` 异常。',
      code: 'Base& br = getRef();\ntry {\n  Derived& dr = dynamic_cast<Derived&>(br);\n  // 使用 dr\n} catch (const bad_cast& e) {\n  // 转型失败\n}',
    },
    {
      type: 'multiple-choice',
      question: 'dynamic_cast 在指针形式下转型失败返回什么？',
      options: [
        { text: '抛出异常', correct: false, explanation: '指针形式返回 nullptr，引用形式抛出异常' },
        { text: 'nullptr', correct: true, explanation: '指针形式的 dynamic_cast 失败返回 nullptr' },
        { text: '原指针不变', correct: false, explanation: '失败时不会返回原指针' },
        { text: '返回一个空对象指针', correct: false, explanation: '返回空指针 nullptr' },
      ],
    },
    {
      type: 'exposition',
      text: '性能代价：`dynamic_cast` 有运行时开销（查询 RTTI）。在性能关键代码中要少用。但正确性比性能重要。',
    },
    {
      type: 'exposition',
      text: '实际开发中，`dynamic_cast` 常用于：\n1. 接口多态——从基类接口获取具体实现\n2. 消息分发——根据实际类型处理不同逻辑\n3. 序列化——根据类型做不同处理',
    },
    {
      type: 'type-it',
      instruction: '练习 dynamic_cast 的实际应用：判断形状类型：',
      code: '#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nstruct Shape {\n  virtual void draw() const = 0;\n  virtual ~Shape() = default;\n};\nstruct Circle : Shape {\n  void draw() const override { cout << "Circle" << endl; }\n  void roll() { cout << "Rolling" << endl; }\n};\n\nint main() {\n  vector<unique_ptr<Shape>> shapes;\n  shapes.push_back(make_unique<Circle>());\n  for (auto& s : shapes) {\n    Circle* c = dynamic_cast<Circle*>(s.get());\n    if (c) c->roll();\n  }\n}',
      hints: ['`s.get()` 从 unique_ptr 获取裸指针', 'dynamic_cast 检查是否为 Circle 类型', '只有 Circle 才有 roll() 方法'],
    },
    {
      type: 'exposition',
      text: '`dynamic_cast` vs `static_cast` 向下转型的区别：\n- `static_cast`：编译期直接转换，不检查。如果转错了类型，结果是未定义行为。\n- `dynamic_cast`：运行时检查，转型失败安全处理。',
    },
    {
      type: 'multiple-choice',
      question: '如果用一个不安全的 static_cast 做向下转型（实际类型不匹配），会发生什么？',
      options: [
        { text: '返回 nullptr', correct: false, explanation: 'static_cast 不做运行时检查，不会返回 nullptr' },
        { text: '抛出异常', correct: false, explanation: 'static_cast 不抛异常' },
        { text: '未定义行为', correct: true, explanation: '用 static_cast 错误向下转型的结果是未定义行为' },
        { text: '编译错误', correct: false, explanation: '编译器相信你，不会报错' },
      ],
    },
    {
      type: 'exposition',
      text: '向下转型的正确策略：\n1. 尽量通过虚函数避免向下转型\n2. 必须转型时用 `dynamic_cast`\n3. 只在确保类型时用 `static_cast`（比如你知道实际类型）',
    },
    {
      type: 'exposition',
      text: 'RTTI（运行时类型信息）是 C++ 的多态能力之一。但过度使用 `dynamic_cast` 通常说明设计有问题——考虑用虚函数代替。',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：static_cast 适合哪种场景？',
      options: [
        { text: '运行时检查向下转型', correct: false, explanation: '运行时检查要用 dynamic_cast' },
        { text: '数值类型转换', correct: true, explanation: 'static_cast 适合编译期确定的转换，如数值转换' },
        { text: '去掉 const 属性', correct: false, explanation: '去掉 const 要用 const_cast' },
        { text: '完全不相关的指针转换', correct: false, explanation: '不相关的指针转换用 reinterpret_cast' },
      ],
    },
    {
      type: 'exposition',
      text: '在复杂继承体系（菱形继承）中，`dynamic_cast` 也能正确处理。这是静态转换无法做到的。',
    },
    {
      type: 'exposition',
      text: '启用 RTTI 会带来少量内存开销（每个多态类多一个指针大小的数据）。但绝大多数情况下这不是问题。',
    },
    {
      type: 'exposition',
      text: '总结：\n- `dynamic_cast` 运行时检查多态类型\n- 指针形式失败返回 `nullptr`，引用形式抛异常\n- 基类必须有虚函数\n- 优先用虚函数，避免过度使用 dynamic_cast',
    },
  ],
}

export default lesson
