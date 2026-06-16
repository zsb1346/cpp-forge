import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'one-definition-rule',
    chapter: 17,
    title: 'ODR——核心规则',
    subtitle: '一个定义规则',
    description: '学习 C++ 最关键的规则——ODR（One Definition Rule），每个实体在整个程序中只能有一个定义。',
    objectives: ['能说出 ODR 是什么', '能识别违反 ODR 的场景', '能使用头文件组织避免 ODR 问题'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**ODR** = One Definition Rule（单一定义规则）\n\nC++ 中最基础和最重要的规则之一——违反它会导致链接错误。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'ODR 的核心内容：\n\n1. **每个变量、函数、类、枚举等实体，在整个程序中只能有一个定义**\n2. 声明可以有多个\n3. 定义在不同翻译单元中不能重复',
    },
    {
      type: 'exposition',
      text: '违反 ODR 的典型例子 #1——**同一个函数在两个 .cpp 文件中都被定义了**：\n\n```cpp\n// a.cpp\nvoid hello() { cout << "Hello\\n"; }\n\n// b.cpp\nvoid hello() { cout << "Hello\\n"; }  // ODR 违规！\n```\n\n链接时：`LNK2005: "hello" already defined in a.obj`',
    },
    {
      type: 'exposition',
      text: '违反 ODR 的典型例子 #2——**头文件里的定义被多个 .cpp 包含**：\n\n```cpp\n// common.h\nint global = 42;  // 定义！不是声明！\n\n// a.cpp\n#include "common.h"  // 得到 global 的一个定义\n\n// b.cpp\n#include "common.h"  // 又得到 global 的一个定义 → ODR 违规\n```\n\n解决方案：头文件放声明（加 `extern`），.cpp 放定义。',
    },
    {
      type: 'concept-cards',
      instruction: 'ODR 的三个关键点：',
      cards: [
        { glyph: '1️⃣', term: '一个定义', meaning: '每个实体只能有一个定义', example: '函数/变量/类' },
        { glyph: '✅', term: '声明可多次', meaning: '声明可以重复出现', example: 'int add(int, int);' },
        { glyph: '🔗', term: '链接阶段检查', meaning: 'ODR 违规在链接时报错', example: 'LNK2005' },
      ],
    },
    {
      type: 'exposition',
      text: 'ODR 的**例外**——有些东西可以出现在多个翻译单元中：\n\n- **inline 函数**：可以在头文件中定义，被多次包含\n- **类定义**：可以在头文件中定义\n- **模板**：可以在头文件中定义\n\n编译器会自动处理这些情况。',
    },
    {
      type: 'exposition',
      text: '为什么类定义可以在头文件中？\n\n因为类定义只是告诉编译器"这个类型长什么样"，\n并没有生成实际的函数代码（除非类里的函数也是 inline 的）。\n\n真正的代码在成员函数定义时才会生成。',
    },
    {
      type: 'exposition',
      text: '**inline 函数的工作原理**：\n\n```cpp\n// math.h\ninline int square(int x) { return x * x; }\n```\n\n`inline` 告诉编译器：这个函数的定义可以出现在多个翻译单元中，\n链接器会"去重"——只保留一份。',
    },
    {
      type: 'type-it',
      instruction: '敲一个 inline 函数的定义（适合放在头文件中）：',
      code: 'inline int max(int a, int b) { return (a > b) ? a : b; }',
      hints: ['`inline` 放在函数返回值类型前面', '`inline` 允许函数定义出现在多个翻译单元', '适合简短的、频繁调用的函数'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个场景会违反 ODR？',
      options: [
        { text: '两个不同的 .cpp 文件都包含了同一个类的定义', correct: false, explanation: '类的定义是 ODR 例外，可以多次包含' },
        { text: '一个 .cpp 文件中写了同一个函数的两次声明', correct: false, explanation: '声明可以出现多次' },
        { text: '两个不同的 .cpp 文件中定义了同名同参数的非 inline 函数', correct: true, explanation: '非 inline 函数在整个程序中只能有一个定义' },
        { text: '两个 .cpp 文件都包含一个 #pragma once 的头文件', correct: false, explanation: '#pragma once 防止重复包含，不会导致 ODR 问题' },
      ],
    },
    {
      type: 'exposition',
      text: '一个微妙的例子——**头文件中的 const 变量**：\n\n```cpp\n// config.h\nconst int BUFFER_SIZE = 1024;  // const 变量默认内部链接\n```\n\n`const` 变量默认有**内部链接**（internal linkage）——\n每个包含它的 .cpp 文件得到自己的一份拷贝，\n所以不违反 ODR。',
    },
    {
      type: 'concept-cards',
      instruction: '链接类型速记：',
      cards: [
        { glyph: '🔒', term: '内部链接', meaning: '只在当前翻译单元可见', example: 'const / static' },
        { glyph: '🔓', term: '外部链接', meaning: '整个程序可见', example: '普通函数/非 const 变量' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个整型 const 变量定义（内部链接，可在头文件中安全使用）：',
      code: 'const int MAX_USERS = 100;',
      hints: ['`const` 变量默认内部链接', '可以安全地放在头文件中', '每个翻译单元得到自己的拷贝'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种写法违反了 ODR？\n```cpp\n// header.h 被 a.cpp 和 b.cpp 都包含了\nint version = 1;\n```',
      options: [
        { text: '写法正确，没有违反 ODR', correct: false, explanation: 'version 是非 const 的外部链接变量，会在两个翻译单元中定义' },
        { text: '违反 ODR，因为非 const 全局变量是外部链接', correct: true, explanation: '应该用 extern 声明 + 在一个 .cpp 中定义' },
        { text: '违反 ODR，因为头文件中不能放任何变量', correct: false, explanation: 'const 变量可以放在头文件中' },
        { text: '违反 ODR，因为没有加 #pragma once', correct: false, explanation: '即使有 header guard，被两个 .cpp 包含仍是两个定义' },
      ],
    },
    {
      type: 'exposition',
      text: '**总结**：ODR 可以这样记\n\n- 头文件：放声明、inline 函数、类定义、const 变量、模板\n- 源文件：放非 inline 函数定义、非 const 全局变量定义',
    },
    {
      type: 'exposition',
      text: '违反 ODR 的后果：\n\n**链接错误**（Linker Error），不是编译错误。\n编译器只检查单个翻译单元，链接时才合并发现冲突。\n\n这是为什么有时"编译通过了，链接报错"。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`extern int x;` 是声明还是定义？',
      options: [
        { text: '声明', correct: true, explanation: 'extern 表示告诉编译器"x 在别处定义了"' },
        { text: '定义', correct: false, explanation: 'extern 明确表示这是声明，不分配存储' },
        { text: '既是声明也是定义', correct: false, explanation: 'extern 表示只声明不定义' },
        { text: '取决于上下文', correct: false, explanation: 'extern 的语义是固定的——声明' },
      ],
    },
    {
      type: 'exposition',
      text: 'ODR 的这个特性非常重要：\n\n**声明可以多次，定义只能一次。**\n\n头文件放声明 + inline + const + 类定义。\n源文件放非 inline 函数定义 + 非 const 全局变量。\n\n记住这个分工，就掌握了多文件编程的核心。',
    },
    {
      type: 'type-it',
      instruction: '敲一段代码：在头文件中放 const 变量（安全，不会 ODR 违规）：',
      code: '#pragma once\n\nconst int TIMEOUT = 5000;\nconst int MAX_RETRY = 3;',
      hints: ['`const int` 默认内部链接', '每个翻译单元有自己的拷贝', '安全地放在头文件中'],
    },
  ],
}

export default lesson
