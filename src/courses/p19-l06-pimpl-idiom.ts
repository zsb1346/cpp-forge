import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'pimpl-idiom',
    chapter: 20,
    title: 'Pimpl 惯用法',
    subtitle: '实现藏在指针后',
    description: '用指针隐藏类的实现细节，减少编译依赖，提升构建速度。',
    objectives: ['能理解 Pimpl 的原理', '能实现 Pimpl 惯用法'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '项目大了之后，改一行头文件，整个项目都要重新编译——太慢了。\n**Pimpl（Pointer to Implementation）**把实现细节藏到指针后面。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 传统方式的问题\n\n头文件暴露了所有私有成员：',
      code: '// widget.h\n#include <vector>\n#include <string>\n\nclass Widget {\n  std::vector<std::string> data;\npublic:\n  void process();\n};',
    },
    {
      type: 'exposition',
      text: '### Pimpl 方式\n\n头文件只放一个指针，具体实现在 `.cpp` 里：',
      code: '// widget.h\nclass Widget {\n  struct Impl;  // 前置声明\n  Impl* pImpl;\npublic:\n  Widget();\n  ~Widget();\n  void process();\n};',
    },
    {
      type: 'exposition',
      text: '### 实现文件\n\n真正的成员放在 `Impl` 结构体中，暴露在 `.cpp` 里：',
      code: '// widget.cpp\n#include "widget.h"\n#include <vector>\n#include <string>\n\nstruct Widget::Impl {\n  std::vector<std::string> data;\n};\n\nWidget::Widget() : pImpl(new Impl) {}\nWidget::~Widget() { delete pImpl; }\n\nvoid Widget::process() {\n  // 通过 pImpl-> 访问成员\n}',
    },
    {
      type: 'exposition',
      text: '### 好处\n\n- **编译加速**：头文件不变，`.cpp` 改了只编译这一个文件\n- **二进制兼容**：Impl 结构变了，头文件不用改\n- **接口稳定**：用户看不到实现细节\n- **减少头文件依赖**：`vector`、`string` 的 `#include` 移到 `.cpp`',
    },
    {
      type: 'exposition',
      text: '### 现代 C++ 改进\n\n用 `unique_ptr` 代替原始指针，不需要手动 `delete`：',
      code: '// widget.h\n#include <memory>\n\nclass Widget {\n  struct Impl;\n  std::unique_ptr<Impl> pImpl;\npublic:\n  Widget();\n  ~Widget();\n  void process();\n};',
    },
    {
      type: 'exposition',
      text: '### unique_ptr 版本注意事项\n\n析构函数必须定义在 `.cpp` 中——因为 `~Widget()` 需要看到 `Impl` 的完整定义才能调用 `delete`。\n\n如果放在头文件里，`unique_ptr` 的析构会不完整类型错误。',
      code: '// widget.cpp\nWidget::~Widget() = default;  // 必须放在 Impl 定义之后',
    },
    {
      type: 'concept-cards',
      instruction: 'Pimpl 的核心概念：',
      cards: [
        { glyph: '🎭', term: 'Pimpl', meaning: 'Pointer to Implementation——实现隐藏在指针后', example: 'Impl* pImpl' },
        { glyph: '📄', term: '前置声明', meaning: '只声明不定义，降低头文件依赖', example: 'struct Impl;' },
        { glyph: '⚡', term: '编译防火墙', meaning: '头文件不变，避免大规模重编译', example: '改实现不改.h' },
        { glyph: '🔒', term: '接口隔离', meaning: '用户看不到私有成员和依赖', example: '只暴露 public API' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个使用 Pimpl 的 Student 类头文件：',
      code: 'class Student {\n  struct Impl;\n  Impl* pImpl;\npublic:\n  Student();\n  ~Student();\n  void setName(string name);\n  string getName() const;\n};',
      hints: [
        '前置声明 struct Impl',
        '声明一个 Impl* 指针成员',
        'public 接口不暴露任何实现细节',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p05-03：指针的主要用途是什么？',
      options: [
        { text: '存储大数字', correct: false, explanation: '指针存储地址，不是大数字' },
        { text: '间接访问内存', correct: true, explanation: '指针保存地址，通过地址访问数据' },
        { text: '加快运算速度', correct: false, explanation: '指针不直接提升运算速度' },
        { text: '替代所有变量', correct: false, explanation: '指针不能替代所有变量' },
      ],
    },
    {
      type: 'type-it',
      instruction: '实现 Student 类的 Impl 结构体：',
      code: 'struct Student::Impl {\n  string name;\n  int age;\n};\n\nStudent::Student() : pImpl(new Impl) {}\nStudent::~Student() { delete pImpl; }\n\nvoid Student::setName(string name) {\n  pImpl->name = name;\n}\n\nstring Student::getName() const {\n  return pImpl->name;\n}',
      hints: [
        'Impl 定义在 Student 命名空间内',
        '构造函数中分配 Impl 对象',
        '成员函数通过 pImpl-> 访问数据',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'Pimpl 的主要目的是什么？',
      options: [
        { text: '让代码运行更快', correct: false, explanation: 'Pimpl 增加了一层间接访问，可能稍微变慢' },
        { text: '减少编译依赖', correct: true, explanation: '将实现细节藏起来，头文件不变就无需重编译' },
        { text: '实现多态', correct: false, explanation: '多态是 virtual 函数的事' },
        { text: '节省内存', correct: false, explanation: 'Pimpl 反而多了一个指针的内存开销' },
      ],
    },
    {
      type: 'exposition',
      text: '### Pimpl 的代价\n\n- 运行时额外一次指针间接访问\n- 每个对象多一个指针的内存开销（8 字节）\n- 代码写起来麻烦一点\n\n但**编译速度的提升**通常远远超过这些代价。',
    },
    {
      type: 'type-it',
      instruction: '用 unique_ptr 实现 Pimpl：',
      code: 'class Widget {\n  struct Impl;\n  unique_ptr<Impl> pImpl;\npublic:\n  Widget();\n  ~Widget();\n  void show();\n};',
      hints: [
        'unique_ptr 需要 <memory> 头文件',
        '析构函数必须定义在 Impl 完整类型可见的地方',
        '不需要手动 delete',
      ],
    },
    {
      type: 'multiple-choice',
      question: '使用 unique_ptr 实现 Pimpl 时，析构函数为什么要在 .cpp 中定义？',
      options: [
        { text: '为了代码整洁', correct: false, explanation: '不是为了整洁，是编译要求' },
        { text: '因为 unique_ptr 的删除器需要看到完整类型', correct: true, explanation: '析构 unique_ptr 时需要知道 Impl 的完整定义才能 delete' },
        { text: '因为析构函数不能放在头文件', correct: false, explanation: '析构函数可以放头文件，但 Pimpl 场景不行' },
        { text: '因为 unique_ptr 不能放头文件', correct: false, explanation: 'unique_ptr 可以放头文件' },
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- Pimpl 把实现细节藏到指针后面\n- 减少编译依赖，提升构建速度\n- 可以用原始指针或 `unique_ptr`\n- 析构函数必须在 Impl 完整定义后实现',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课：CRTP——用模板实现静态多态，一个 C++ 特有的黑话。',
    },
    {
      type: 'exposition',
      text: 'Pimpl 的关键：头文件只放「有什么」，.cpp 才放「怎么实现」。这就是 C++ 的接口与实现分离的极致。',
    },
  ],
}

export default lesson
