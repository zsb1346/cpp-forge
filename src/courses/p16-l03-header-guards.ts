import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'header-guards',
    chapter: 17,
    title: '头文件卫士',
    subtitle: '防止重复包含',
    description: '学习 #ifndef / #define / #endif 构成的头文件保护机制，以及 #pragma once。',
    objectives: ['能写出完整的 header guard', '能理解为什么需要防止重复包含', '能区分两种 header guard 写法'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '如果同一个头文件被 `#include` 了两次——\n预处理器会把它的内容粘贴两次，导致**重复声明**错误。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '看这个例子，`helper.h` 定义了一个结构体：\n\n```cpp\n// helper.h\nstruct Point {\n  int x, y;\n};\n```\n\n如果 `main.cpp` 同时通过两条不同的路径包含了它两次，\n编译器会因为看到两次 `struct Point` 定义而报错。',
    },
    {
      type: 'exposition',
      text: '**头文件卫士（Header Guard）** 解决这个问题：\n\n```cpp\n// helper.h\n#ifndef HELPER_H\n#define HELPER_H\n\nstruct Point {\n  int x, y;\n};\n\n#endif\n```\n\n第一次包含时定义 `HELPER_H`，第二次再进来时 `#ifndef` 检查失败，跳过整个文件。',
    },
    {
      type: 'concept-cards',
      instruction: 'header guard 的三个部分：',
      cards: [
        { glyph: '🚪', term: '#ifndef', meaning: '检查这个宏是否没定义', example: '#ifndef HEADER_H' },
        { glyph: '🔏', term: '#define', meaning: '定义宏，标记"已包含"', example: '#define HEADER_H' },
        { glyph: '🔚', term: '#endif', meaning: '结束条件编译块', example: '#endif' },
      ],
    },
    {
      type: 'exposition',
      text: '宏的名字通常用头文件名全大写 + 下划线：\n\n- `helper.h` → `HELPER_H`\n- `my_library.h` → `MY_LIBRARY_H`\n- `utils/math.h` → `UTILS_MATH_H`\n\n这样能保证每个头文件的宏名**全局唯一**。',
    },
    {
      type: 'type-it',
      instruction: '敲一个完整的 header guard（宏名为 VECTOR_H）：',
      code: '#ifndef VECTOR_H\n#define VECTOR_H\n\n// 头文件内容\n\n#endif',
      hints: ['`#ifndef` + `#define` + `#endif` 三件套', '`#ifndef` 和最后的 `#endif` 配对', '宏名 VECTOR_H 放在 `#ifndef` 和 `#define` 后面'],
    },
    {
      type: 'exposition',
      text: '还有一种更简洁的写法——`#pragma once`：\n\n```cpp\n// helper.h\n#pragma once\n\nstruct Point {\n  int x, y;\n};\n```\n\n效果一样，但只需要**一行**。\n大多数现代编译器都支持。',
    },
    {
      type: 'exposition',
      text: '两种方法对比：\n\n| 传统 header guard | #pragma once |\n|------------------|-------------|\n| 标准 C++，全部编译器支持 | 方便简洁 |\n| 3 行代码 | 1 行代码 |\n| 宏名要保证不冲突 | 不需要宏名 |\n\n**推荐用 `#pragma once`**，更少出错。',
    },
    {
      type: 'type-it',
      instruction: '敲一行 #pragma once，是最简单的 header guard：',
      code: '#pragma once',
      hints: ['`#pragma once` 只有一行', '放在头文件的最顶部', '告诉编译器"只包含我一次"'],
    },
    {
      type: 'multiple-choice',
      question: '如果没有 header guard，下面哪个情况会导致编译错误？',
      options: [
        { text: '一个 .cpp 文件包含了标准库', correct: false, explanation: '标准库自身有 header guard' },
        { text: '同一个头文件被两个不同 .cpp 文件包含', correct: false, explanation: '不同翻译单元互不影响' },
        { text: '同一个头文件在一个 .cpp 中被间接包含了两次', correct: true, explanation: '预处理器会粘贴两次内容，导致重复定义' },
        { text: '头文件中定义了函数声明', correct: false, explanation: '函数声明可以出现多次' },
      ],
    },
    {
      type: 'exposition',
      text: '什么情况下会间接包含两次？\n\n```cpp\n// a.h\n#include "common.h"\n\n// b.h\n#include "common.h"\n\n// main.cpp\n#include "a.h"\n#include "b.h"  // common.h 被包含了两次！\n```\n\n`common.h` 如果没有 header guard，就会重复定义错误。',
    },
    {
      type: 'exposition',
      text: '重复包含的后果：\n- **变量/函数定义**：`redefinition` 错误\n- **结构体/类定义**：`redefinition of struct` 错误\n- **编译时间变长**：头文件内容被反复处理\n\n前两个是**报错**，第三个是**性能问题**。',
    },
    {
      type: 'concept-cards',
      instruction: '两种 header guard 写法速记：',
      cards: [
        { glyph: '🏛️', term: '传统 guard', meaning: '#ifndef / #define / #endif', example: '标准兼容性好' },
        { glyph: '🚀', term: '#pragma once', meaning: '一行搞定，推荐使用', example: '简洁不容易错' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是传统 header guard 的标准写法（宏名为 MYHEADER_H）？',
      options: [
        { text: '`#pragma once`', correct: false, explanation: '这不是传统写法，是 #pragma once' },
        { text: '`#ifndef MYHEADER_H\n#define MYHEADER_H\n// 内容\n#endif`', correct: true, explanation: '传统 header guard 的三件套' },
        { text: '`#define MYHEADER_H\n// 内容`', correct: false, explanation: '缺了 #ifndef 检查和 #endif 结尾' },
        { text: '`#include "MYHEADER_H"`', correct: false, explanation: '#include 是包含文件，不是 header guard' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个带函数声明的完整头文件（使用 #pragma once）：',
      code: '#pragma once\n\nvoid printInfo();\nint getValue();',
      hints: ['第一行是 `#pragma once`', '函数声明以分号结尾，没有函数体', '头文件通常只放声明，不放实现'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`#include <iostream>` 中的尖括号表示什么？',
      options: [
        { text: '尖括号比双引号速度快', correct: false, explanation: '速度差异可忽略' },
        { text: '仅在系统路径中搜索头文件', correct: true, explanation: '尖括号搜索编译器配置的路径' },
        { text: '只能包含 C++ 标准库', correct: false, explanation: '尖括号可以包含任何系统路径下的文件' },
        { text: '会自动添加 header guard', correct: false, explanation: '#include 不会自动添加 guard' },
      ],
    },
    {
      type: 'exposition',
      text: '**最佳实践**：\n\n每个头文件**必须**有 header guard（两种选一种）。\n推荐用 `#pragma once`——简单、直接、不会写错宏名。',
    },
    {
      type: 'exposition',
      text: '实际项目中常见的问题：\n\n- 忘记写 header guard → 编译报错"redefinition of class"\n- 宏名不唯一（两个头文件用了同一个宏名）→ 其中一个文件的内容被跳过\n- 在 `#ifndef` 和 `#define` 之间不小心写了代码 → 不会生效\n\n大部分情况用 `#pragma once` 就对了。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：预处理器的 `#include` 做了什么？',
      options: [
        { text: '检查文件是否存在', correct: false, explanation: '#include 不做检查，只是粘贴' },
        { text: '把指定文件内容粘贴到当前位置', correct: true, explanation: '#include 的核心机制就是文本粘贴' },
        { text: '编译指定的文件', correct: false, explanation: '编译是下一步的工作' },
        { text: '创建一个符号链接', correct: false, explanation: '#include 不创建链接' },
      ],
    },
  ],
}

export default lesson
