import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'heap-deep',
    chapter: 17,
    title: '堆——动态分配',
    subtitle: '手动分配释放',
    description: '深入学习堆的工作原理——用 new/delete 手动管理内存，理解堆与栈的区别。',
    objectives: ['能用 new/delete 分配和释放堆内存', '能解释堆和栈的核心区别', '能识别内存泄漏的常见场景'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**堆（Heap）** 是程序中全局可用的大块内存。\n\n与栈不同：\n- 栈：自动分配、自动回收\n- 堆：**手动分配、手动释放**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '堆的分配方式：\n\n```cpp\nint* p = new int;         // 在堆上分配一个 int，未初始化\nint* q = new int(42);     // 分配并初始化为 42\nint* arr = new int[100];  // 分配一个数组（100 个 int）\n```\n\n`new` 返回的是**指向堆内存的指针**。',
    },
    {
      type: 'exposition',
      text: '堆的释放方式：\n\n```cpp\ndelete p;                 // 释放单个对象\ndelete[] arr;             // 释放数组\n```\n\n**必须配对使用**：`new` 配 `delete`，`new[]` 配 `delete[]`。\n混用会导致**未定义行为**。',
    },
    {
      type: 'exposition',
      text: '堆的生长方向和栈**相反**：\n- 栈：从高往低（向下生长）\n- 堆：从低往高（向上生长）\n\n```\n栈 ↓（高→低）\n============\n堆 ↑（低→高）\n代码段 / 数据段 / BSS\n```\n\n这样设计让两块空间共享可用内存。',
    },
    {
      type: 'concept-cards',
      instruction: '堆的核心操作：',
      cards: [
        { glyph: '🆕', term: 'new', meaning: '在堆上分配内存', example: 'int* p = new int;' },
        { glyph: '🗑️', term: 'delete', meaning: '释放 new 分配的内存', example: 'delete p;' },
        { glyph: '📦', term: 'new[]', meaning: '在堆上分配数组', example: 'int* arr = new int[10];' },
        { glyph: '🚮', term: 'delete[]', meaning: '释放 new[] 分配的数组', example: 'delete[] arr;' },
      ],
    },
    {
      type: 'exposition',
      text: '**内存泄漏（Memory Leak）**——\n\n分配了堆内存但忘记释放：\n\n```cpp\nvoid leak() {\n  int* p = new int(100);  // 堆上分配\n  // 忘记 delete p;\n}  // 函数结束，p 指针消失，但堆上的内存没人能访问了\n```\n\n程序不退出，这块内存就永远被占用了。',
    },
    {
      type: 'exposition',
      text: '**悬空指针（Dangling Pointer）**——\n\n释放了堆内存但指针仍然指向它：\n\n```cpp\nint* p = new int(42);\ndelete p;               // 释放\ncout << *p;             // 危险！p 指向已释放的内存\n```\n\n释放后要把指针设为 `nullptr`：`p = nullptr;`',
    },
    {
      type: 'exposition',
      text: '**双重释放（Double Free）**——\n\n对同一块内存释放两次：\n\n```cpp\nint* p = new int(10);\ndelete p;\ndelete p;               // 危险！已释放的内存再次释放\n```\n\n也会导致**未定义行为**。\n\n释放后就设 `nullptr` 可以避免：`delete nullptr;` 是安全的。',
    },
    {
      type: 'concept-cards',
      instruction: '堆的三大陷阱（必须记住）：',
      cards: [
        { glyph: '🕳️', term: '内存泄漏', meaning: '分配了忘记释放', example: '程序内存持续增长' },
        { glyph: '👻', term: '悬空指针', meaning: '释放后还继续使用', example: '释放后设为 nullptr' },
        { glyph: '🔁', term: '双重释放', meaning: '对同一内存释放两次', example: '释放后立即置空' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一段在堆上分配 int 并安全释放的完整代码：',
      code: 'int* p = new int(99);\ncout << *p << endl;\ndelete p;\np = nullptr;',
      hints: ['`new int(99)` 在堆上分配并初始化', '用完要 `delete p;`', '释放后 `p = nullptr;` 防止悬空'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪段代码会导致内存泄漏？',
      options: [
        { text: '`int* p = new int(5); delete p; p = nullptr;`', correct: false, explanation: '正确分配和释放' },
        { text: '`int* p = new int(5);` 没有 delete', correct: true, explanation: '分配了堆内存但没有释放' },
        { text: '`int x = 5;`', correct: false, explanation: '栈上的局部变量，不需要手动释放' },
        { text: '`int* p = new int[10]; delete[] p;`', correct: false, explanation: '正确分配和释放数组' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一段在堆上分配数组并释放的代码：',
      code: 'int* arr = new int[100];\narr[0] = 42;\ndelete[] arr;',
      hints: ['`new int[100]` 分配 100 个 int 的数组', '用 `arr[0]` 这样的下标访问', '数组用 `delete[]` 释放，不是 `delete`'],
    },
    {
      type: 'multiple-choice',
      question: '`new` 和 `new[]` 配对的释放方式分别是什么？',
      options: [
        { text: '`new` 配 `delete[]`，`new[]` 配 `delete`', correct: false, explanation: '刚好反了' },
        { text: '`new` 配 `delete`，`new[]` 配 `delete[]`', correct: true, explanation: '配对使用，不能混用' },
        { text: '统一用 `delete` 就可以', correct: false, explanation: '混用会导致未定义行为' },
        { text: '`new[]` 不需要释放', correct: false, explanation: '任何 new 分配的内存都需要释放' },
      ],
    },
    {
      type: 'exposition',
      text: '**堆的大小**：\n\n- 栈：通常 1-8 MB（固定）\n- 堆：可以接近物理内存上限（例如 8GB+）\n\n所以需要**大内存**时用堆，需要**快且自动管理**时用栈。',
    },
    {
      type: 'exposition',
      text: '**总结**：堆 vs 栈\n\n| 栈 | 堆 |\n|-----|-----|\n| 自动管理 | 手动管理 |\n| 小（~8MB） | 大（~GB） |\n| 快 | 慢（需要查找空闲块） |\n| 局部变量 | 动态分配的数据 |\n| 不用操心 | 必须操心 new/delete |',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：栈帧在什么时候分配和释放？',
      options: [
        { text: '程序启动时统一分配，程序结束时释放', correct: false, explanation: '栈帧是在函数调用时动态分配的' },
        { text: '函数被调用时分配，函数返回时释放', correct: true, explanation: '每次函数调用分配栈帧，返回时回收' },
        { text: '编译时分配，运行时释放', correct: false, explanation: '栈帧是运行时分配的' },
        { text: '程序员手动控制', correct: false, explanation: '栈是自动管理的' },
      ],
    },
    {
      type: 'exposition',
      text: '**实际开发建议**：\n\n1. 能用栈就用栈（更快、更安全）\n2. 需要大块数据时用堆\n3. 需要生命周期超出函数时用堆\n4. `new` 后记得 `delete`，`new[]` 后记得 `delete[]`\n5. 释放后设指针为 `nullptr`',
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况必须用堆（而不是栈）？',
      options: [
        { text: '需要存储 100 个 int', correct: false, explanation: '100 个 int 只有 400 字节，栈完全可以' },
        { text: '需要存储 100 万个 double，且要返回给调用者', correct: true, explanation: '8MB 可能超出栈容量，而且需要超出函数生命周期' },
        { text: '只需要一个 int 临时变量', correct: false, explanation: '这种情况用栈即可' },
        { text: '存储一个 char 字符', correct: false, explanation: '栈完全可以' },
      ],
    },
  ],
}

export default lesson
