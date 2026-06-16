import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'rule-of-three',
    chapter: 11,
    title: 'Rule of Three',
    subtitle: '三者需同时出现',
    description: '如果类需要析构函数、拷贝构造、拷贝赋值中的任何一个，就需要三个都有。这是 C++ 核心规则。',
    objectives: ['能说出 Rule of Three 的内容', '能理解为什么三者需同时出现', '能判断是否违反了 Rule of Three'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'C++ 中有一条经典规则——**Rule of Three（三法则）**。\n是每个 C++ 程序员必须掌握的。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'Rule of Three 说：\n如果一个类需要自定义**析构函数**、**拷贝构造函数**、**拷贝赋值运算符**中的任何一个，\n那么它通常三个都需要。',
    },
    {
      type: 'exposition',
      text: '为什么？因为这三者处理的是**同一件事**：资源管理。\n- 析构：释放资源\n- 拷贝构造：复制资源\n- 拷贝赋值：释放旧资源 + 复制新资源',
    },
    {
      type: 'concept-cards',
      instruction: 'Rule of Three 的三位成员：',
      cards: [
        { glyph: '🗑️', term: '析构函数', meaning: '对象销毁时释放资源', example: '~MyClass()' },
        { glyph: '📋', term: '拷贝构造函数', meaning: '用已有对象初始化新对象', example: 'MyClass(const MyClass&)' },
        { glyph: '✏️', term: '拷贝赋值运算符', meaning: '给已存在对象赋值', example: 'operator=(const MyClass&)' },
      ],
    },
    {
      type: 'exposition',
      text: '推理过程：\n1. 如果你写了析构函数 → 说明类管理着某种资源\n2. 管理资源 → 默认的浅拷贝不够用\n3. 浅拷贝不够用 → 需要自定义拷贝构造和拷贝赋值',
    },
    {
      type: 'exposition',
      text: '违反 Rule of Three 的例子：',
      code: 'class Bad {\n  int* data;\npublic:\n  Bad() { data = new int(0); }\n  ~Bad() { delete data; }       // 有析构\n  // 没有拷贝构造 ❌\n  // 没有拷贝赋值 ❌\n};\n\nBad a;\nBad b = a;  // 默认浅拷贝 → double delete',
    },
    {
      type: 'exposition',
      text: '上面的类有析构函数（管理资源），但没有拷贝构造和拷贝赋值。\n拷贝时采用浅拷贝——两个对象共享同一内存——析构时 double delete。',
    },
    {
      type: 'multiple-choice',
      question: 'Rule of Three 是哪三个？',
      options: [
        { text: '构造函数、析构函数、拷贝构造', correct: false, explanation: '不是构造函数，是拷贝赋值' },
        { text: '析构函数、拷贝构造、拷贝赋值', correct: true, explanation: '三者需要同时出现' },
        { text: 'new、delete、指针', correct: false, explanation: '那是动态内存三件套' },
        { text: '公有、私有、保护', correct: false, explanation: '那是访问权限' },
      ],
    },
    {
      type: 'exposition',
      text: '不遵守 Rule of Three 的后果：\n- **浅拷贝** → 两个对象指向同一内存\n- **double delete** → 析构时崩溃\n- **内存泄漏** → 旧资源没释放',
    },
    {
      type: 'exposition',
      text: '遵守 Rule of Three 的正确类：',
      code: 'class Good {\n  int* data;\npublic:\n  Good() { data = new int(0); }\n  ~Good() { delete data; }                    // 1. 析构\n  Good(const Good& other) {                    // 2. 拷贝构造\n    data = new int(*other.data);\n  }\n  Good& operator=(const Good& other) {         // 3. 拷贝赋值\n    if (this == &other) return *this;\n    *data = *other.data;\n    return *this;\n  }\n};',
    },
    {
      type: 'concept-cards',
      instruction: '什么时候不需要 Rule of Three？',
      cards: [
        { glyph: '✅', term: '没有资源需要管理', meaning: '没有 new/delete，没有文件句柄等', example: 'int x, double y' },
        { glyph: '✅', term: '使用智能指针', meaning: '智能指针自带资源管理，默认拷贝安全', example: 'unique_ptr / shared_ptr' },
      ],
    },
    {
      type: 'exposition',
      text: '不需要 Rule of Three 的类：\n- 所有成员都是基本类型（int、double）\n- 所有成员本身有正确的拷贝行为（如 `std::string`、`std::vector`）',
    },
    {
      type: 'exposition',
      text: '这就是为什么推荐用 `std::string` 而不是 `char*`、\n用 `std::vector` 而不是 `int*`+new——\n它们已经实现了正确的拷贝语义。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：拷贝赋值中的自赋值检查是为了什么？',
      options: [
        { text: '提高代码可读性', correct: false, explanation: '自赋值检查有实际作用' },
        { text: '防止先释放了自己的数据导致丢失', correct: true, explanation: '不检查自赋值，delete 会删自己的数据' },
        { text: '让代码跑得更快', correct: false, explanation: '反而多了一次判断' },
        { text: '编译器强制要求', correct: false, explanation: '不是强制要求，但强烈建议' },
      ],
    },
    {
      type: 'exposition',
      text: 'Rule of Three 的现代扩展——**Rule of Five**：\n在 C++11 引入移动语义后，增加了移动构造和移动赋值。\n（后面会学到）',
    },
    {
      type: 'exposition',
      text: '还有一个有趣的推论——**Rule of Zero**：\n如果可能，设计类使其不需要自定义析构/拷贝/移动。\n都用标准库组件（string、vector、智能指针）来自动管理。',
    },
    {
      type: 'exposition',
      text: 'Rule of Three 是一个**实践指南**，不是编译器强制的。\n编译器不会因为你违反了就报错——\n但违反的后果是运行时的 bug：崩溃、泄漏、数据损坏。',
    },
    {
      type: 'exposition',
      text: '总结：\n- **Rule of Three**：析构 + 拷贝构造 + 拷贝赋值\n- 有其一 → 有其三\n- 违反 → double delete 或内存泄漏\n- 最佳实践：用标准库组件 → 实现 Rule of Zero',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
