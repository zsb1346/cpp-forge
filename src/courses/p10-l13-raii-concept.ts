import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'raii-concept',
    chapter: 11,
    title: 'RAII 概念',
    subtitle: '资源获取即初始化',
    description: 'RAII 是 C++ 最重要的编程范式：资源在构造时获取，在析构时释放。',
    objectives: ['能解释 RAII 的含义', '能理解 RAII 如何预防泄漏', '能识别 RAII 类的特征'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'RAII——**R**esource **A**cquisition **I**s **I**nitialization。\n资源获取即初始化——这是 C++ 最核心的编程范式。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '名字很绕，但概念很简单：\n**用对象来管理资源。**\n构造时获取资源，析构时释放资源。',
    },
    {
      type: 'exposition',
      text: '前面学的 Rule of Three 就是一种 RAII 实践。\nRAII 类在构造函数中 `new`，在析构函数中 `delete`。',
    },
    {
      type: 'exposition',
      text: '看一个 RAII 类的例子：',
      code: 'class IntPtr {\n  int* ptr;\npublic:\n  IntPtr(int v) : ptr(new int(v)) {}  // 构造：获取资源\n  ~IntPtr() { delete ptr; }            // 析构：释放资源\n  int get() { return *ptr; }\n};',
    },
    {
      type: 'concept-cards',
      instruction: '认识 RAII 的核心理念：',
      cards: [
        { glyph: '🏗️', term: '构造获取', meaning: '对象创建时分配资源', example: 'new / fopen / lock' },
        { glyph: '🗑️', term: '析构释放', meaning: '对象销毁时自动释放资源', example: 'delete / fclose / unlock' },
        { glyph: '🤖', term: '自动管理', meaning: '资源随对象生命周期自动管理', example: '离开作用域 → 析构 → 释放' },
        { glyph: '🛡️', term: '异常安全', meaning: '即使抛出异常，析构函数也会执行', example: '栈展开保证' },
      ],
    },
    {
      type: 'exposition',
      text: 'RAII 的魔力在于：**离开作用域时，析构函数自动执行**。\n不管你正常返回、提前 return、还是异常——析构一定执行。',
    },
    {
      type: 'exposition',
      text: '对比两种方式：',
      code: '// ❌ 手动管理\nint* p = new int(42);\n// ... 使用 ...\ndelete p;\n\n// ✅ RAII 管理\nIntPtr p(42);\n// ... 使用 ...\n// 出作用域自动 delete',
    },
    {
      type: 'multiple-choice',
      question: 'RAII 的全称是什么？',
      options: [
        { text: 'Resource Allocation Integration Interface', correct: false, explanation: '不对' },
        { text: 'Resource Acquisition Is Initialization', correct: true, explanation: '资源获取即初始化' },
        { text: 'Return Address Is Important', correct: false, explanation: '不相关' },
        { text: 'Runtime Array Index Inspection', correct: false, explanation: '不相关' },
      ],
    },
    {
      type: 'exposition',
      text: 'RAII 的好处：\n1. **不需要手动 delete**——不会忘记\n2. **异常安全**——异常时也能正确释放\n3. **代码清晰**——资源在哪获取在哪释放，一目了然',
    },
    {
      type: 'exposition',
      text: '你其实已经用过 RAII 了：\n- `std::ifstream` 打开文件，析构时自动关闭\n- `std::lock_guard` 构造时加锁，析构时解锁\n- `std::unique_ptr` 构造时接管指针，析构时 delete',
    },
    {
      type: 'exposition',
      text: 'RAII 的核心思想：\n**把资源的生命周期绑定到对象的生命周期。**\n对象活了，资源就在；对象死了，资源自动释放。',
    },
    {
      type: 'concept-cards',
      instruction: 'RAII 管理的常见资源：',
      cards: [
        { glyph: '🧠', term: '堆内存', meaning: 'new / new[] → delete / delete[]' },
        { glyph: '📄', term: '文件句柄', meaning: 'fopen → fclose' },
        { glyph: '🔒', term: '互斥锁', meaning: 'lock → unlock' },
        { glyph: '🗄️', term: '数据库连接', meaning: 'connect → disconnect' },
      ],
    },
    {
      type: 'exposition',
      text: '**传统方式**：你手动管理生命周期，容易漏。\n**RAII 方式**：对象替你管理，不会漏。',
    },
    {
      type: 'exposition',
      text: 'RAII 是 C++ 区别于其他语言（Java、Go、Python）的关键特征。\n那些语言用 GC 自动回收，C++ 用 RAII——更可控、更高效。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：Rule of Three 和 RAII 的关系是？',
      options: [
        { text: '两者无关', correct: false, explanation: 'Rule of Three 是 RAII 的实现工具' },
        { text: 'Rule of Three 帮助实现 RAII 类', correct: true, explanation: 'RAII 类需要正确的析构+拷贝来管理资源' },
        { text: 'RAII 可以完全替代 Rule of Three', correct: false, explanation: 'RAII 类仍然需要遵守 Rule of Three' },
        { text: 'RAII 是 Rule of Three 的一部分', correct: false, explanation: 'RAII 是更大的范式' },
      ],
    },
    {
      type: 'exposition',
      text: '记住核心思想：\n**RAII = 用对象的生命周期管理资源的生命周期。**\n构造时拿，析构时还——永不忘记，永不泄漏。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '一个检验你是否理解 RAII 的问题：\n`std::vector` 是 RAII 类吗？\n答案是**是**——它构造时分配堆数组，析构时自动释放。',
    },
    {
      type: 'exposition',
      text: '`std::unique_ptr` 也是 RAII 类。\n`std::ofstream` 也是 RAII 类。\nC++ 标准库充满了 RAII 设计。',
    },
  ],
}

export default lesson
