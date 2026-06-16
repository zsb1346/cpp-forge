import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'preprocessor',
    chapter: 17,
    title: '预处理器',
    subtitle: '#define / #include / #ifndef',
    description: '学习编译第一步"预处理"如何工作：文本替换、文件包含、条件编译。',
    objectives: ['能解释 #define 的文本替换机制', '能写出 #include 的正确用法', '能理解 #ifndef 保护的基本原理'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '编译的第一阶段——**预处理器**，在编译器真正工作之前运行。\n它只做**文本操作**，不懂 C++ 语法。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '预处理器的三个核心能力：\n1. **文件包含**（`#include`）——粘贴文件\n2. **宏定义**（`#define`）——文本替换\n3. **条件编译**（`#ifdef / #ifndef / #endif`）——有条件的保留或删除代码',
    },
    {
      type: 'exposition',
      text: '`#include` 的两种写法：\n\n```cpp\n#include <iostream>    // 尖括号——搜系统路径\n#include "myheader.h"  // 双引号——先搜当前目录\n```\n\n预处理器的任务：**把指定文件的内容原样粘贴到这里**。',
    },
    {
      type: 'exposition',
      text: '`#define` 定义一个宏，预处理器会做**纯文本替换**：\n\n```cpp\n#define MAX_SIZE 100\nint arr[MAX_SIZE];\n// 预处理后：\nint arr[100];\n```\n\n只是把 `MAX_SIZE` 换成 `100`，没有类型，没有语义。',
    },
    {
      type: 'exposition',
      text: '宏也可以带**参数**（像函数，但只是文本替换）：\n\n```cpp\n#define SQUARE(x) ((x) * (x))\nint y = SQUARE(3);\n// 预处理后：\nint y = ((3) * (3));\n```\n\n注意括号很重要！`SQUARE(1+2)` 不加括号会变成 `1+2*1+2`。',
    },
    {
      type: 'exposition',
      text: '`#ifndef` 条件编译——让一段代码只有在**没定义**某个宏时才生效：\n\n```cpp\n#ifndef DEBUG\n  cout << "正式版本";\n#endif\n```\n\n如果 `#define DEBUG` 在前面，这段代码就被跳过了。',
    },
    {
      type: 'concept-cards',
      instruction: '预处理器三大指令：',
      cards: [
        { glyph: '📎', term: '#include', meaning: '把另一个文件内容粘贴进来', example: '#include <iostream>' },
        { glyph: '🏷️', term: '#define', meaning: '定义宏，做文本替换', example: '#define PI 3.14' },
        { glyph: '🚦', term: '#ifndef', meaning: '条件编译，跳过代码段', example: '#ifndef HEADER_H' },
      ],
    },
    {
      type: 'exposition',
      text: '宏的**陷阱**——因为它不懂 C++ 语法，有时会做出奇怪的事：\n\n```cpp\n#define MULTIPLY(a, b) a * b\nint x = MULTIPLY(2 + 3, 4);\n// 展开后：int x = 2 + 3 * 4;  // 结果是 14，不是 20！\n```\n\n这就是为什么宏参数要加括号：`((a) * (b))`。',
    },
    {
      type: 'type-it',
      instruction: '敲一段预处理指令，定义宏 MAX 为 100：',
      code: '#define MAX 100',
      hints: ['`#define` 后跟宏名，再跟替换文本', '宏名通常全大写', '末尾不加分号（预处理器指令不用分号）'],
    },
    {
      type: 'concept-cards',
      instruction: '预处理与编译的关键区别：',
      cards: [
        { glyph: '📝', term: '预处理', meaning: '文本操作，不懂语法', example: '#define / #include' },
        { glyph: '⚙️', term: '编译', meaning: '语法分析，语义检查', example: 'int x = "hello"; 报错' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个带参数的宏定义（计算平方）：',
      code: '#define SQUARE(x) ((x) * (x))',
      hints: ['宏参数不需要写类型', '外层和每个参数都加括号防意外', '宏名 SQUARE 通常大写'],
    },
    {
      type: 'multiple-choice',
      question: '`#include <iostream>` 加尖括号和 `#include "my.h"` 加双引号，主要区别是什么？',
      options: [
        { text: '尖括号更快', correct: false, explanation: '速度差异可忽略' },
        { text: '尖括号搜系统路径，双引号先搜当前目录', correct: true, explanation: '这是两种写法的根本区别' },
        { text: '双引号只能包含 .h 文件', correct: false, explanation: '双引号可以包含任何文件' },
        { text: '没有区别，可以互换', correct: false, explanation: '搜索路径不同，不能互换' },
      ],
    },
    {
      type: 'exposition',
      text: '预处理指令以 `#` 开头——这个符号告诉预处理器"这一行归我管"。\n\n常见整理：\n- `#include` — 文件包含\n- `#define` — 宏定义\n- `#undef` — 取消宏定义\n- `#ifdef / #ifndef / #endif` — 条件编译\n- `#pragma` — 编译器特定指令',
    },
    {
      type: 'exposition',
      text: '**`#pragma once`** 是一个特殊指令——\n告诉编译器"这个头文件只包含一次，别重复粘贴"。\n\n下一课详细讲**头文件卫士**。',
    },
    {
      type: 'type-it',
      instruction: '敲一个 #ifndef 条件编译块：',
      code: '#ifndef DEBUG\n  cout << "release mode" << endl;\n#endif',
      hints: ['`#ifndef` 检查是否**没有**定义某个宏', '条件块以 `#endif` 结束', '满足条件时中间的代码会被保留'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：编译四步骤中，第二步（编译）的输出文件扩展名是什么？',
      options: [
        { text: '`.i`', correct: false, explanation: '.i 是预处理输出' },
        { text: '`.s`', correct: true, explanation: '编译步骤输出汇编文件 .s' },
        { text: '`.o`', correct: false, explanation: '.o 是汇编步骤的输出' },
        { text: '`.exe`', correct: false, explanation: '.exe 是链接后的最终输出' },
      ],
    },
    {
      type: 'exposition',
      text: '预处理器是编译流程的第一个阶段。\n理解它的原理——**纯文本操作**——能帮你避免很多调试时的困惑。',
    },
    {
      type: 'type-it',
      instruction: '敲一个 #undef 指令，取消之前定义的宏：',
      code: '#define TEMP 100\n#undef TEMP',
      hints: ['`#undef` 取消宏定义，让宏不再有效', '可以在定义后取消，之后再重新定义', '常用于条件编译中切换宏状态'],
    },
    {
      type: 'exposition',
      text: '记住：预处理器**不懂 C++ 语法**。\n它只是文本替换引擎——\n这既是它的力量，也是陷阱的来源。',
    },
  ],
}

export default lesson
