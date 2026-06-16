import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'memory-layout',
    chapter: 17,
    title: '程序内存布局',
    subtitle: '代码段/数据段/BSS/堆/栈',
    description: '理解程序运行时内存的五个主要区域——每个区域存放什么、怎么分配。',
    objectives: ['能说出五个内存区域的名称和顺序', '能判断变量属于哪个内存区域', '理解堆和栈的根本区别'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '程序运行时，操作系统会为它分配一块内存空间。\n这块空间被划分为**五个区域**，各有各的用途。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '从高地址到低地址，五个区域顺序：\n\n```\n高地址 ←────────── 低地址\n─────────────────────\n| 栈（Stack）      | ← 局部变量、函数调用向下生长\n| ↓                |\n|                  |\n| ↑                |\n| 堆（Heap）       | ← 动态分配向上生长\n| 数据段（Data）   | ← 已初始化的全局/静态变量\n| BSS 段           | ← 未初始化的全局/静态变量（默认 0）\n| 代码段（Text）   | ← 程序的机器指令（只读）\n─────────────────────\n```',
    },
    {
      type: 'exposition',
      text: '**代码段（Text / Code Segment）**\n- 存放程序的机器指令\n- **只读**——程序不能修改自己的代码\n- 所有函数编译后的二进制码存在这里\n- 大小在编译时就确定了',
    },
    {
      type: 'exposition',
      text: '**数据段（Data Segment）**\n- 存放**已初始化**的全局变量和静态变量\n\n```cpp\nint global = 42;           // 数据段\nstatic int count = 0;      // 数据段\n```\n\n程序启动时这些值就已经在内存里了。',
    },
    {
      type: 'exposition',
      text: '**BSS 段（Block Started by Symbol）**\n- 存放**未初始化**的全局变量和静态变量\n- 程序启动时系统自动清零\n\n```cpp\nint buffer[1000];          // BSS 段（没有初始化）\nstatic int flag;           // BSS 段（默认为 0）\n```',
    },
    {
      type: 'exposition',
      text: '**堆（Heap）**\n- 用于**动态分配**——程序运行时手动申请和释放\n- 从低地址向高地址生长\n- 需要 `new` / `delete` 或 `malloc` / `free` 来管理\n- 生命周期由程序员控制',
    },
    {
      type: 'exposition',
      text: '**栈（Stack）**\n- 存放**局部变量**和函数调用的上下文\n- 从高地址向低地址生长\n- 每次函数调用分配一个"栈帧"\n- 自动分配、自动释放（函数返回时）\n- 容量有限（通常 1-8 MB）',
    },
    {
      type: 'concept-cards',
      instruction: '五个内存区域：',
      cards: [
        { glyph: '📜', term: '代码段(Text)', meaning: '机器指令，只读', example: '编译后的代码' },
        { glyph: '📊', term: '数据段(Data)', meaning: '已初始化的全局变量', example: 'int x = 5;' },
        { glyph: '⬜', term: 'BSS 段', meaning: '未初始化的全局变量', example: 'int buf[100];' },
        { glyph: '📦', term: '堆(Heap)', meaning: '动态分配，手动管理', example: 'new / delete' },
        { glyph: '📚', term: '栈(Stack)', meaning: '局部变量，自动管理', example: '函数内的变量' },
      ],
    },
    {
      type: 'exposition',
      text: '**堆和栈的核心区别**：\n\n| 特性 | 栈 | 堆 |\n|------|-----|------|\n| 管理方式 | 自动（函数进出） | 手动（new/delete）|\n| 大小 | 小（MB 级） | 大（GB 级） |\n| 速度 | 快 | 慢 |\n| 生命周期 | 函数结束即释放 | 手动释放之前一直存在 |',
    },
    {
      type: 'type-it',
      instruction: '敲一段代码，定义一个未初始化的全局变量（放在 BSS 段）：',
      code: 'int scores[1000];',
      hints: ['全局变量定义在函数外面', '没有初始化时放在 BSS 段', 'BSS 段变量自动初始化为 0'],
    },
    {
      type: 'exposition',
      text: '在代码中判断变量在哪个区域：\n\n```cpp\nint a = 1;               // 数据段（全局，已初始化）\nint b;                   // BSS 段（全局，未初始化）\n\nvoid func() {\n  int c = 2;             // 栈（局部变量）\n  static int d = 3;      // 数据段（静态，已初始化）\n  int* p = new int(4);   // p 在栈上，*p 在堆上\n}\n```',
    },
    {
      type: 'concept-cards',
      instruction: '变量位置判断口诀：',
      cards: [
        { glyph: '🌐', term: '全局变量', meaning: '函数外面声明 → Data 或 BSS', example: '已初始化→Data，未初始化→BSS' },
        { glyph: '📋', term: '局部变量', meaning: '函数里面声明 → 栈', example: '包括 main 函数内的变量' },
        { glyph: '🏷️', term: '静态变量', meaning: 'static → Data 段', example: '无论在哪里声明' },
        { glyph: '🎯', term: '动态分配', meaning: 'new/malloc → 堆', example: '指针本身在栈上' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下变量定义在`void test() { int x = 10; }`中，x 存放在哪个内存区域？',
      options: [
        { text: '数据段（Data）', correct: false, explanation: '只有全局/静态变量才在数据段' },
        { text: '栈（Stack）', correct: true, explanation: '函数内的局部变量都在栈上' },
        { text: '堆（Heap）', correct: false, explanation: '堆用于 new 动态分配' },
        { text: '代码段（Text）', correct: false, explanation: '代码段存的是机器指令' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一段代码，在堆上分配一个 int（用 new）：',
      code: 'int* p = new int(42);',
      hints: ['`new` 在堆上分配内存', '`new` 返回地址，需要指针接收', '用完要 `delete p;` 释放'],
    },
    {
      type: 'multiple-choice',
      question: '复习第 01 课：编译四步骤中，预处理主要处理什么？',
      options: [
        { text: '检查语法错误', correct: false, explanation: '语法检查是编译步骤做的' },
        { text: '处理 # 开头的指令', correct: true, explanation: '预处理负责 #include, #define 等' },
        { text: '生成机器码', correct: false, explanation: '机器码由汇编步骤生成' },
        { text: '合并目标文件', correct: false, explanation: '合并是链接步骤的工作' },
      ],
    },
    {
      type: 'exposition',
      text: '一个直观理解五个区域的比喻：\n\n- **代码段** → 乐谱（曲子本身，只读）\n- **数据段** → 已写好字的笔记本\n- **BSS 段** → 空白笔记本（默认空白页）\n- **栈** → 便签纸（用完就撕掉）\n- **堆** → 仓库（需要钥匙进出）',
    },
    {
      type: 'multiple-choice',
      question: '`static int counter = 0;`（在函数外声明）存放在哪个区域？',
      options: [
        { text: '栈', correct: false, explanation: '静态变量不在栈上' },
        { text: '数据段', correct: true, explanation: '静态变量在数据段（已初始化）' },
        { text: 'BSS', correct: false, explanation: 'BSS 是未初始化的全局变量，counter 已初始化' },
        { text: '代码段', correct: false, explanation: '代码段只存指令' },
      ],
    },
    {
      type: 'exposition',
      text: '下一课深入**栈**——看看函数调用时栈上发生了什么。',
    },
  ],
}

export default lesson
