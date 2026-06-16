import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'rule-of-five',
    chapter: 12,
    title: 'Rule of Five',
    subtitle: '析构+拷贝+移动',
    description: 'Rule of Three 变成 Rule of Five——引入移动构造和移动赋值后，需要管理的特殊成员函数从三个变成五个。',
    objectives: ['能说出 Rule of Five 的五个函数', '能在类中完整实现五法则', '能理解为什么三法则扩展到五'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前学过 **Rule of Three**：如果类需要自定义析构函数，**通常也需要**自定义拷贝构造和拷贝赋值。\n引入移动语义后，变成了 **Rule of Five**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'Rule of Five 的五个特殊成员函数：\n1. **析构函数** `~T()`\n2. **拷贝构造函数** `T(const T&)`\n3. **拷贝赋值运算符** `T& operator=(const T&)`\n4. **移动构造函数** `T(T&&)`\n5. **移动赋值运算符** `T& operator=(T&&)`',
    },
    {
      type: 'exposition',
      text: '一个完整的 Rule of Five 类：',
      code: 'class Buffer {\n  int* data;\n  size_t size;\npublic:\n  // 1. 析构函数\n  ~Buffer() { delete[] data; }\n\n  // 2. 拷贝构造\n  Buffer(const Buffer& other)\n    : size(other.size) {\n    data = new int[size];\n    copy(other.data, other.data + size, data);\n  }\n\n  // 3. 拷贝赋值\n  Buffer& operator=(const Buffer& other) {\n    if (this != &other) {\n      delete[] data;\n      size = other.size;\n      data = new int[size];\n      copy(other.data, other.data + size, data);\n    }\n    return *this;\n  }\n\n  // 4. 移动构造\n  Buffer(Buffer&& other) noexcept\n    : data(other.data), size(other.size) {\n    other.data = nullptr;\n    other.size = 0;\n  }\n\n  // 5. 移动赋值\n  Buffer& operator=(Buffer&& other) noexcept {\n    if (this != &other) {\n      delete[] data;\n      data = other.data;\n      size = other.size;\n      other.data = nullptr;\n      other.size = 0;\n    }\n    return *this;\n  }\n};',
    },
    {
      type: 'concept-cards',
      instruction: 'Rule of Five 的五个成员函数：',
      cards: [
        { glyph: '🧹', term: '析构 ~T()', meaning: '释放类管理的资源', example: 'delete[] data;' },
        { glyph: '📋', term: '拷贝构造 T(const T&)', meaning: '从另一个对象复制数据', example: '深拷贝' },
        { glyph: '✏️', term: '拷贝赋值 operator=(const T&)', meaning: '复制赋值，释放旧数据再复制', example: '深拷贝 + 自检' },
        { glyph: '🚀', term: '移动构造 T(T&&)', meaning: '偷走临时对象的资源', example: '指针交换' },
        { glyph: '⚡', term: '移动赋值 operator=(T&&)', meaning: '释放自己，偷对方的', example: '释放 + 偷 + 置空' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'Rule of Five 是在 Rule of Three 基础上增加了哪两个？',
      options: [
        { text: '默认构造和析构', correct: false, explanation: '析构原来就有' },
        { text: '移动构造和移动赋值', correct: true, explanation: '移动语义增加了这两个' },
        { text: '拷贝构造和拷贝赋值', correct: false, explanation: '这两个原来就在 Rule of Three 中' },
        { text: '析构和移动构造', correct: false, explanation: '缺了移动赋值' },
      ],
    },
    {
      type: 'exposition',
      text: '**Rule of Zero** 替代方案：\n如果类的成员都是智能指针或标准库容器（它们已经实现了五法则），\n那就不用自己写——编译器自动生成的就很完美。',
    },
    {
      type: 'exposition',
      text: '对比：Rule of Three vs Rule of Five',
      code: '// Rule of Three（C++98）\n~T();\nT(const T&);\nT& operator=(const T&);\n\n// Rule of Five（C++11 起）\n~T();\nT(const T&);\nT& operator=(const T&);\nT(T&&) noexcept;\nT& operator=(T&&) noexcept;',
    },
    {
      type: 'exposition',
      text: '**为什么三法则变成五法则？**\n——因为移动语义提供了一种更高效的资源转移方式。\n如果不写移动版本，遇到右值时就会退化成昂贵的拷贝。',
    },
    {
      type: 'concept-cards',
      instruction: '什么时候必须实现五法则？',
      cards: [
        { glyph: '🖐️', term: '需要手动管理资源', meaning: '有 raw 指针、文件句柄等', example: 'new[] / delete[]' },
        { glyph: '❌', term: '编译器生成的不正确', meaning: '浅拷贝会导致双删', example: '两个指针指向同一块内存' },
        { glyph: '⚡', term: '想优化性能', meaning: '提供移动版本避免深拷贝', example: '移动构造 O(1) 代替 O(n)' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：移动赋值中 self-assignment check 的作用是？',
      options: [
        { text: '提高代码可读性', correct: false, explanation: '这是副作用不是目的' },
        { text: '防止 delete 后再从自己偷数据', correct: true, explanation: 'a = std::move(a) 时，delete 后 source 也被删了' },
        { text: '加快运行速度', correct: false, explanation: '检查本身有开销' },
        { text: '让 noexcept 生效', correct: false, explanation: 'noexcept 和自检查无关' },
      ],
    },
    {
      type: 'exposition',
      text: '一个常见陷阱：**只写了移动构造但没写移动赋值**。\n规则：要么全写，要么让编译器默认生成（如果不管理资源）。',
    },
    {
      type: 'exposition',
      text: '检查一个类是否违反了 Rule of Five：\n**如果写了析构函数（释放资源），一定也要写移动构造和移动赋值。**\n否则移动时只会浅拷贝，导致双 delete。',
    },
    {
      type: 'exposition',
      text: '完整的 Rule of Five 实现模式：',
      code: '// 可复用的五法则骨架\nclass Resource {\n  int* data;\npublic:\n  ~Resource() { delete data; }\n\n  Resource(const Resource& other)\n    : data(new int(*other.data)) { }\n\n  Resource& operator=(const Resource& other) {\n    if (this != &other) {\n      *data = *other.data;\n    }\n    return *this;\n  }\n\n  Resource(Resource&& other) noexcept\n    : data(other.data) {\n    other.data = nullptr;\n  }\n\n  Resource& operator=(Resource&& other) noexcept {\n    if (this != &other) {\n      delete data;\n      data = other.data;\n      other.data = nullptr;\n    }\n    return *this;\n  }\n};',
    },
    {
      type: 'exposition',
      text: 'Rule of Five 的核心原则：\n**要么一个都不写（Rule of Zero），要么五个都写全。**\n只写一部分会导致资源管理错误。',
    },
    {
      type: 'exposition',
      text: 'Rule of Five 总结：\n- 三法则 → 五法则：多了移动构造和移动赋值\n- 手动管理资源时必须全写\n- 移动版本加 `noexcept` 让容器更高效\n- 用智能指针可以遵循 Rule of Zero 省事',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '默认移动操作的陷阱：\n如果类有自定义析构函数，编译器不会隐式生成移动构造和移动赋值。\n——这是为了安全，防止意外浅拷贝。',
    },
    {
      type: 'exposition',
      text: '如何强制编译器生成默认移动操作？\n用 `= default` 或者去掉自定义析构（改用智能指针）。',
      code: 'class Safe {\n  unique_ptr<int[]> data;\npublic:\n  ~Safe() = default;  // 不阻止移动操作生成\n  Safe(Safe&&) = default;  // 编译器隐式生成\n};',
    },
    {
      type: 'exposition',
      text: '练习课就要来了——把所有移动相关的知识串起来用。',
    },
  ],
}

export default lesson
