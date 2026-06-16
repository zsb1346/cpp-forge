import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase10-review',
    chapter: 11,
    title: '阶段10复习',
    subtitle: '动态内存总复习',
    description: '全面回顾阶段 10 的核心概念：new/delete、深浅拷贝、RAII、移动语义。',
    objectives: ['能总结动态内存管理的要点', '能应用 RAII 原则编写安全代码', '能理解移动语义的优势和实现'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '阶段 10 的内容很多——从 `new/delete` 到 RAII 到移动语义。\n这一课我们全面回顾所有核心概念。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: 'new 和 delete 的基本原则是什么？',
      options: [
        { text: 'new 配 free，delete 配 malloc', correct: false, explanation: '不能混用 C 和 C++ 的内存管理' },
        { text: 'new 配 delete，new[] 配 delete[]，严格配对', correct: true, explanation: '这是 C++ 动态内存的铁律' },
        { text: 'new 一次可以 delete 多次', correct: false, explanation: 'double delete 是未定义行为' },
        { text: 'new 不需要 delete，程序结束会自动回收', correct: false, explanation: '长期运行的程序会内存泄漏' },
      ],
    },
    {
      type: 'exposition',
      text: '动态内存的三大陷阱：\n1. **内存泄漏**——new 了不 delete\n2. **悬空指针**——delete 了继续用\n3. **双重删除**——delete 了又 delete\n\n统一解：delete 后置空 + RAII。',
    },
    {
      type: 'multiple-choice',
      question: '浅拷贝和深拷贝的区别是什么？',
      options: [
        { text: '浅拷贝复制内容，深拷贝复制指针', correct: false, explanation: '说反了' },
        { text: '浅拷贝复制指针，深拷贝复制内容', correct: true, explanation: '浅拷贝共享内存，深拷贝各有一份' },
        { text: '浅拷贝安全，深拷贝危险', correct: false, explanation: '深拷贝安全，浅拷贝危险' },
        { text: '浅拷贝比深拷贝慢', correct: false, explanation: '浅拷贝快（只复制地址），深拷贝慢（分配+复制）' },
      ],
    },
    {
      type: 'exposition',
      text: '当类中有指针成员管理资源时：\n- 默认拷贝构造和拷贝赋值是浅拷贝\n- 必须自己实现深拷贝\n- **Rule of Three**：析构 + 拷贝构造 + 拷贝赋值',
    },
    {
      type: 'multiple-choice',
      question: 'RAII 的核心思想是什么？',
      options: [
        { text: '用数组代替指针', correct: false, explanation: 'RAII 是资源管理范式' },
        { text: '用对象的生命周期管理资源的生命周期', correct: true, explanation: '构造获取，析构释放' },
        { text: '永远不用 new 和 delete', correct: false, explanation: 'RAII 是对 new/delete 的封装管理' },
        { text: '把代码写在一行里', correct: false, explanation: 'RAII 是资源管理范式' },
      ],
    },
    {
      type: 'exposition',
      text: 'RAII 的应用范围：\n- 堆内存：`unique_ptr`、`vector`、`string`\n- 文件：`ofstream`、`ifstream`\n- 锁：`lock_guard`\n- 数据库连接、网络 socket',
    },
    {
      type: 'multiple-choice',
      question: '移动语义为什么比拷贝快？',
      options: [
        { text: '移动不复制数据，只转移指针', correct: true, explanation: '移动是 O(1)，拷贝是 O(n)' },
        { text: '移动做了编译器优化', correct: false, explanation: '编译器优化不是主要原因' },
        { text: '移动会跳过类型检查', correct: false, explanation: '类型检查仍然进行' },
        { text: '移动只对数字类型有效', correct: false, explanation: '移动对所有资源管理类有效' },
      ],
    },
    {
      type: 'exposition',
      text: '移动语义的关键技术：\n- **右值引用 `&&`**——绑定到临时对象\n- **移动构造函数**——偷资源 + 置空原对象\n- **`std::move`**——把左值转成右值引用\n- **Rule of Five**——在 Rule of Three 基础上增加移动构造和移动赋值',
    },
    {
      type: 'concept-cards',
      instruction: '阶段 10 核心概念一览：',
      cards: [
        { glyph: '📦', term: '栈 vs 堆', meaning: '栈自动管理，堆手动管理' },
        { glyph: '🆕', term: 'new/delete', meaning: '堆内存的分配和释放，严格配对' },
        { glyph: '⚠️', term: '三大陷阱', meaning: '泄漏、悬空、双删——delete 后置空解决' },
        { glyph: '📋', term: '深拷贝', meaning: '复制内容而非指针，各有一份独立数据' },
        { glyph: '🔢', term: 'Rule of Three', meaning: '析构+拷贝构造+拷贝赋值需同时出现' },
        { glyph: '🏗️', term: 'RAII', meaning: '构造获取资源，析构释放资源' },
        { glyph: '⚡', term: '移动语义', meaning: '偷资源而非复制，大幅提升性能' },
      ],
    },
    {
      type: 'exposition',
      text: '这一阶段你学了很多 C++ 的核心知识。\n从裸指针管理到 RAII 到移动语义——\n这些是 C++ 区别于其他语言的关键特性。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个不是内存安全的最佳实践？',
      options: [
        { text: 'delete 后置空指针', correct: false, explanation: '这是好习惯' },
        { text: '用 unique_ptr 代替裸指针', correct: false, explanation: '智能指针更安全' },
        { text: 'new 了之后不 delete，等程序结束', correct: true, explanation: '长期运行的程序会耗尽内存' },
        { text: '遵守 Rule of Three', correct: false, explanation: 'Rule of Three 是正确做法' },
      ],
    },
    {
      type: 'exposition',
      text: '动态内存的核心理念可以用一句话概括：\n**管理资源的责任应该交给对象，而不是程序员。**\n这就是 RAII 的精髓。',
    },
    {
      type: 'multiple-choice',
      question: '移动构造和拷贝构造最大的区别是什么？',
      options: [
        { text: '移动更快，因为不分配新内存', correct: true, explanation: '移动只转移指针，O(1)；拷贝要分配+复制，O(n)' },
        { text: '移动更安全，拷贝有风险', correct: false, explanation: '两者都很安全，正确的场景用正确的方法' },
        { text: '移动是拷贝的别名', correct: false, explanation: '两者实现完全不同' },
        { text: '拷贝比移动快', correct: false, explanation: '拷贝通常比移动慢' },
      ],
    },
    {
      type: 'exposition',
      text: '阶段 10 的知识是一个整体：\n`new/delete` 是工具 → 三大陷阱是警示 → 深浅拷贝/Rule of Three 是安全保证\n→ RAII 是设计范式 → 移动语义是性能优化。\n每一步都建立在前面之上。',
    },
    {
      type: 'fill-in',
      prompt: '补全一个符合 Rule of Five 的类骨架：',
      template: 'class Resource {\n  int* data;\npublic:\n  Resource(int v) : data(____) {}\n  ____Resource() { ____ data; }\n  Resource(const Resource& other) : data(new int(____)) {}\n  Resource& operator=(const Resource& other) {\n    if (____ == &other) return ____;\n    *data = *other.data;\n    return *this;\n  }\n  Resource(Resource&& other) ____ : data(other.data) {\n    other.data = ____;\n  }\n};',
      answers: ['new int(v)', '~', 'delete', '*other.data', 'this', '*this', 'noexcept', 'nullptr'],
      hints: ['第一个空：构造分配堆内存', '第二、三个空：析构函数释放', '第四个空：拷贝构造用 other 的值初始化', '第五、六个空：自赋值检查', '最后两个空：移动构造标注 noexcept 并置空'],
    },
    {
      type: 'exposition',
      text: '如果你能理解上面这个类的所有部分——\n恭喜，你已经掌握了阶段 10 的核心内容。',
    },
    {
      type: 'exposition',
      text: '阶段 10 结束了。接下来你将在更复杂的项目中运用这些知识。\n记住：**RAII 是 C++ 最强大的武器**——用好它，你的代码会更安全、更高效。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
