import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase16-review',
    chapter: 17,
    title: '阶段 16 综合复习',
    subtitle: '编译/链接/内存总复习',
    description: '全面回顾阶段 16 的编译流程、预处理器、声明定义、ODR、翻译单元、链接错误、内存布局、栈、堆、结构体对齐、位运算和位域。',
    objectives: ['能串联起编译全流程的知识点', '能综合运用内存布局知识', '能解决常见的位运算问题'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '阶段 16 的大主题是"编译/链接/内存布局"。\n通过综合练习，把零散的知识点串成完整的知识网络。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '编译四步骤的正确顺序是什么？',
      options: [
        { text: '链接 → 汇编 → 编译 → 预处理', correct: false, explanation: '流程是从源头到可执行文件' },
        { text: '预处理 → 编译 → 汇编 → 链接', correct: true, explanation: '这是标准的编译四步骤顺序' },
        { text: '编译 → 预处理 → 链接 → 汇编', correct: false, explanation: '预处理必须先于编译' },
        { text: '汇编 → 链接 → 预处理 → 编译', correct: false, explanation: '完全颠倒了顺序' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`#define SQUARE(x) ((x)*(x))` 为什么推荐加两层括号？',
      options: [
        { text: '为了美观', correct: false, explanation: '括号有实际功能，不只为了好看' },
        { text: '防止运算符优先级导致意外的展开结果', correct: true, explanation: 'SQUARE(1+2) 如果没有外层括号会变成 1+2*1+2' },
        { text: '为了和函数调用保持一致', correct: false, explanation: '宏不是函数，只是文本替换' },
        { text: '宏不能没有括号', correct: false, explanation: '不加括号也能编译，但结果可能不如预期' },
      ],
    },
    {
      type: 'exposition',
      text: '声明 vs 定义快速回顾：\n\n**声明** = "有这个" → 可多次出现\n**定义** = "就是它" → 只能一次（ODR）\n\n```cpp\nextern int x;        // 声明\nint x = 5;           // 定义\nint add(int, int);   // 声明\nint add(int a, int b)// 定义\n{ return a + b; }\n```',
    },
    {
      type: 'multiple-choice',
      question: '如果 `common.h` 中定义了 `int version = 1;` 且被 a.cpp 和 b.cpp 同时包含，会怎么样？',
      options: [
        { text: '编译通过，程序正常', correct: false, explanation: '两个翻译单元各自编译通过，但链接会报错' },
        { text: '编译通过，链接报 LNK2005（重复定义）', correct: true, explanation: '两个翻译单元都定义了 version，违反 ODR' },
        { text: '两个翻译单元都编译失败', correct: false, explanation: '编译器只看单个翻译单元，不会发现' },
        { text: '编译通过，但运行时报错', correct: false, explanation: '错误发生在链接阶段，不会生成可执行文件' },
      ],
    },
    {
      type: 'exposition',
      text: '**翻译单元** = .cpp 文件 + `#include` 的所有头文件展开\n\n一个项目有多少个 .cpp 文件就有多少个翻译单元。\n链接器负责合并它们。',
    },
    {
      type: 'multiple-choice',
      question: '`int* p = new int[100];`——p 和分配的内存分别在哪个区域？',
      options: [
        { text: 'p 在栈，分配的内存在栈', correct: false, explanation: 'new 分配在堆上' },
        { text: 'p 在栈，分配的内存在堆', correct: true, explanation: '指针 p 是局部变量在栈，new 分配在堆' },
        { text: 'p 在堆，分配的内存在栈', correct: false, explanation: '反了' },
        { text: 'p 在数据段，分配的内存在 BSS', correct: false, explanation: '局部变量不在数据段' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '阶段 16 核心概念总览：',
      cards: [
        { glyph: '⚙️', term: '编译四步骤', meaning: '预处理→编译→汇编→链接', example: '.i→.s→.o→.exe' },
        { glyph: '📣', term: '声明 vs 定义', meaning: '承诺 vs 实现', example: 'extern / 函数体' },
        { glyph: '1️⃣', term: 'ODR', meaning: '每个实体只能定义一次', example: '违反→LNK2005' },
        { glyph: '📦', term: '翻译单元', meaning: '.cpp + 头文件展开', example: '编译器的输入单位' },
        { glyph: '🗺️', term: '内存布局', meaning: '代码/数据/BSS/堆/栈', example: '五个区域' },
        { glyph: '🔀', term: '位运算', meaning: '& | ^ ~ << >>', example: '位掩码' },
      ],
    },
    {
      type: 'exposition',
      text: '**链接错误速记**：\n\n- `LNK2019` → 找不到（有声明没定义，或没链接）\n- `LNK2005` → 重复（违反 ODR）',
    },
    {
      type: 'fill-in',
      prompt: '补全代码：在堆上分配一个 int 数组，设置值，然后安全释放。',
      template: 'int* data = ____ int[10];\ndata[0] = 42;\n____ data;\ndata = ____;',
      answers: ['new', 'delete[]', 'nullptr'],
      hints: ['分配用 new', '数组释放用 delete[]', '释放后置空防悬空指针'],
    },
    {
      type: 'exposition',
      text: '**结构体对齐总结**：\n\n```cpp\nstruct S {\n  char c;    // 偏移 0  → +3 padding\n  int i;     // 偏移 4  → +0 padding\n  short s;   // 偏移 8  → +2 padding\n};  // sizeof(S) = 12\n```\n\n优化建议：大成员在前。',
    },
    {
      type: 'fill-in',
      prompt: '补全位域定义：描述一个 8 位的数据包头部。',
      template: 'struct PacketHeader {\n  ____ int version : 4;\n  ____ int type : 4;\n};',
      answers: ['unsigned', 'unsigned'],
      hints: ['位域通常用无符号整数', 'unsigned int 可以简写为 unsigned'],
    },
    {
      type: 'fill-in',
      prompt: '补全位运算：用按位或设置标志位的第 3 位（从 0 开始）。',
      template: 'int flags = 0;\nflags ____ (1 ____ 3);',
      answers: ['|=', '<<'],
      hints: ['用按位或赋值 |= 来设置位', '1 << 3 构造一个只在第 3 位为 1 的数'],
    },
    {
      type: 'exposition',
      text: '**预处理器回顾**：\n\n- `#define` — 文本替换（宏）\n- `#include` — 文件内容粘贴\n- `#ifndef / #define / #endif` — header guard\n- `#pragma once` — 简洁版 header guard\n\n预处理器不懂 C++ 语法，只是文本操作。',
    },
    {
      type: 'exposition',
      text: '**位域 vs 位运算**：\n\n位域让你用结构体成员名来操作位——更直观。\n位运算给你更灵活的控制——手动操作任意位。\n\n两者并不互斥，可根据场景选择。',
    },
    {
      type: 'multiple-choice',
      question: '`#pragma once` 的作用是什么？',
      options: [
        { text: '让编译器优化代码', correct: false, explanation: '它的作用和优化无关' },
        { text: '防止头文件被重复包含', correct: true, explanation: '#pragma once 是 header guard 的简洁写法' },
        { text: '把当前文件包含到其他文件', correct: false, explanation: '那是 #include 做的事' },
        { text: '定义一个宏', correct: false, explanation: '那是 #define 做的事' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '结构体 `struct S { short a; int b; };` 在默认对齐下，sizeof(S) 最可能是？',
      options: [
        { text: '6（2+4）', correct: false, explanation: 'short 在偏移 0，之后有 2 字节 padding 对齐 int 到 4' },
        { text: '8', correct: true, explanation: 'short(2)+padding(2)+int(4)=8' },
        { text: '4', correct: false, explanation: '4 不够存放 int' },
        { text: '10', correct: false, explanation: '太大了' },
      ],
    },
    {
      type: 'exposition',
      text: '阶段 16 到这里结束。\n你学会了：代码如何变成可执行文件 → 预处理器做了什么 → 声明和定义的区别 → ODR → 翻译单元 → 链接错误 → 内存布局 → 栈和堆 → 结构体对齐 → 位运算和位域。\n\n这些是 C++ 底层编程和理解编译器的关键基础！',
    },
  ],
}

export default lesson
