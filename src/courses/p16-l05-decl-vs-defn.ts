import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'decl-vs-defn',
    chapter: 17,
    title: '声明 vs 定义',
    subtitle: '承诺 vs 实现',
    description: '区分 C++ 中"声明"和"定义"两个核心概念——承诺有这个东西 vs 真正创建这个东西。',
    objectives: ['能准确区分声明和定义', '能理解为什么要有声明', '能写出函数声明和变量声明的正确语法'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在 C++ 里，每一个名字（变量、函数、类型）在使用前必须先**声明**。\n但"声明"和"定义"是两回事。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**声明（Declaration）** —— 告诉编译器"有这么个东西"。\n就像一个承诺：名字、类型、签名先告诉你，但具体内容后面再说。\n\n```cpp\nextern int x;          // 声明：有个 int 变量叫 x\nint add(int, int);     // 声明：有个函数叫 add\n```',
    },
    {
      type: 'exposition',
      text: '**定义（Definition）** —— 真正创建这个东西。\n分配内存、生成代码、建立实体。\n\n```cpp\nint x = 5;                                  // 定义：创建变量 x\nint add(int a, int b) { return a + b; }     // 定义：实现函数\n```',
    },
    {
      type: 'exposition',
      text: '关键区别：\n\n- **声明可以出现多次**：在不同文件中都可以声明同一个东西\n- **定义只能出现一次**：每个实体只能有一个定义（否则 ODR 违规）\n- **定义本身就是声明**：但声明不一定是定义',
    },
    {
      type: 'concept-cards',
      instruction: '声明 vs 定义核心对比：',
      cards: [
        { glyph: '🤝', term: '声明', meaning: '告诉编译器"有这个"', example: 'int add(int, int);' },
        { glyph: '🏗️', term: '定义', meaning: '真正创建它，分配存储', example: 'int x = 5;' },
      ],
    },
    {
      type: 'exposition',
      text: '声明和定义的语法差异：\n\n**函数**\n- 声明：`int func(int x);` — 分号结尾\n- 定义：`int func(int x) { ... }` — 花括号结尾\n\n**变量**\n- 声明：`extern int x;` — 用 `extern` 关键字\n- 定义：`int x;` 或 `int x = 5;` — 有或没有初始化',
    },
    {
      type: 'exposition',
      text: '为什么需要声明？\n\n因为 C++ 是**单遍编译**——编译器从上往下读文件。\n如果函数 A 调用了函数 B，但 B 的定义在后面——\n编译器看到 A 时还不知道 B 是什么。\n\n**解决方案**：在文件开头先声明 B。',
    },
    {
      type: 'concept-cards',
      instruction: '声明 vs 定义的例子：',
      cards: [
        { glyph: '📣', term: '函数声明', meaning: '声明有这个函数', example: 'void hello();' },
        { glyph: '📄', term: '函数定义', meaning: '写出函数体', example: 'void hello() { cout << "hi"; }' },
        { glyph: '📌', term: '变量声明', meaning: '用 extern 标识', example: 'extern int global;' },
        { glyph: '📦', term: '变量定义', meaning: '创建变量', example: 'int global = 42;' },
      ],
    },
    {
      type: 'exposition',
      text: '一个容易混淆的点——**结构体/类的定义**：\n\n```cpp\nstruct Point;              // 前置声明（声明）\nstruct Point {             // 完整定义（定义）\n  int x, y;\n};\n```\n\n`struct Point;` 只告诉编译器"有个叫 Point 的结构体"，\n但不能用它创建对象——编译器不知道它有多大。',
    },
    {
      type: 'type-it',
      instruction: '敲一个函数声明（声明一个叫 max 的函数）：',
      code: 'int max(int a, int b);',
      hints: ['函数声明以分号结尾', '声明中参数名可以省略：`int max(int, int);`', '声明没有函数体（没有花括号）'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是**函数定义**（不是声明）？',
      options: [
        { text: '`double sqrt(double x);`', correct: false, explanation: '以分号结尾，是声明' },
        { text: '`int add(int a, int b) { return a + b; }`', correct: true, explanation: '有函数体花括号，是定义' },
        { text: '`void print();`', correct: false, explanation: '只有签名，没有函数体' },
        { text: '`extern int value;`', correct: false, explanation: 'extern 是变量声明' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个变量声明（用 extern 声明全局变量 count）：',
      code: 'extern int count;',
      hints: ['`extern` 关键字表示"声明但不定义"', '声明不分配内存', '真正的定义在别的 .cpp 文件中'],
    },
    {
      type: 'exposition',
      text: '**`extern`** 关键字专门用于变量声明：\n\n```cpp\n// a.cpp\nint global = 42;         // 定义\n\n// b.cpp\nextern int global;        // 声明——告诉编译器"global 在别处定义了"\nvoid func() {\n  cout << global;        // 可以使用\n}\n```\n\n没有 `extern` 的变量定义会创建自己的存储空间。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个说法正确？',
      options: [
        { text: '声明可以出现多次，定义只能出现一次', correct: true, explanation: '这是声明和定义的核心区别' },
        { text: '定义可以出现多次，声明只能出现一次', correct: false, explanation: '反了，定义只能一次' },
        { text: '声明和定义都可以出现多次', correct: false, explanation: '定义只能一次（ODR 规则）' },
        { text: '声明和定义都只能出现一次', correct: false, explanation: '声明可以出现多次' },
      ],
    },
    {
      type: 'exposition',
      text: '总结记忆法：\n\n**声明** = 告诉编译器"有这个东西" → 写在头文件里\n**定义** = 真正创建这个东西" → 写在源文件里\n\n多文件编程的核心就是：头文件放声明，源文件放定义。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`#include <iostream>` 中的 `iostream` 有没有 `.h` 扩展名？',
      options: [
        { text: '有，必须写 `<iostream.h>`', correct: false, explanation: 'C++ 标准库头文件没有 .h' },
        { text: '没有，C++ 标准库头文件省略 .h', correct: true, explanation: '这是 C++ 标准库的命名约定' },
        { text: '有没有都可以', correct: false, explanation: '有 .h 的是旧的 C 风格头文件' },
        { text: '看编译器，不一样', correct: false, explanation: '所有 C++ 编译器都遵循这个规则' },
      ],
    },
    {
      type: 'exposition',
      text: '一个容易犯的错——**变量定义和声明的混淆**：\n\n```cpp\n// 头文件 config.h\nint timeout = 30;   // 这是定义！\n\n// 被 a.cpp 和 b.cpp 包含 → ODR 违规\n```\n\n正确的是：头文件声明，一个源文件定义。',
    },
    {
      type: 'type-it',
      instruction: '敲一个结构体的前置声明（告诉编译器"有这个结构体"）：',
      code: 'struct Point;',
      hints: ['结构体前置声明以分号结尾', '此时编译器不知道 Point 的内部结构', '只能用于声明指针或引用，不能创建对象'],
    },
    {
      type: 'exposition',
      text: '下一课——**ODR（单一定义规则）**——\nC++ 中最关键也最容易被违反的规则。',
    },
  ],
}

export default lesson
