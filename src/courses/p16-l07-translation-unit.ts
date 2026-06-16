import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'translation-unit',
    chapter: 17,
    title: '翻译单元',
    subtitle: '.cpp + 所含头文件',
    description: '理解"翻译单元"的概念——编译器每次只处理一个翻译单元，这是编译的基本单位。',
    objectives: ['能解释什么是翻译单元', '能区分单文件和多文件翻译单元', '能理解翻译单元之间的隔离性'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**翻译单元（Translation Unit）** 是编译器一次处理的基本单位。\n\n一个翻译单元 = 一个 `.cpp` 文件 + 它所包含的所有头文件（全部展开后）。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '编译器**每次只处理一个翻译单元**。\n它看不到别的翻译单元里有什么。\n\n这意味着：\n- `a.cpp` 不知道 `b.cpp` 里有什么变量和函数\n- `a.cpp` 里声明的函数可能是在 `b.cpp` 里定义的\n- 翻译单元之间的"连接"由链接器完成',
    },
    {
      type: 'exposition',
      text: '翻译单元的形成过程：\n\n```\nmain.cpp              main.i（展开后）\n├── #include "helper.h"  →  helper.h 内容\n│   └── #include <iostream>  →  iostream 内容\n└── main.cpp 自身代码  →  原代码\n                        ↓\n                    翻译单元（传给编译器）\n```',
    },
    {
      type: 'concept-cards',
      instruction: '与翻译单元相关的概念：',
      cards: [
        { glyph: '📦', term: '翻译单元', meaning: '.cpp + 所含头文件展开后', example: '编译器的输入单位' },
        { glyph: '📄', term: '目标文件', meaning: '一个翻译单元编译后的输出', example: '.o / .obj 文件' },
        { glyph: '🔗', term: '链接器', meaning: '合并所有翻译单元的产物', example: '处理跨单元引用' },
      ],
    },
    {
      type: 'exposition',
      text: '所以，`a.cpp` 中写的 `#include "b.h"` 意思是：\n**把 b.h 的内容拉进来，和 a.cpp 一起组成一个翻译单元**。\n\n如果 `b.h` 又 `#include` 了 `c.h`，那 `c.h` 也会被拉进来。',
    },
    {
      type: 'exposition',
      text: '翻译单元的隔离性——两个重要推论：\n\n**推论 1**：`a.cpp` 里的全局变量，`b.cpp` 看不到（除非 `extern` 声明）。\n\n**推论 2**：`a.cpp` 里 `static` 函数只属于 a，`b.cpp` 里同名函数可以不同。',
    },
    {
      type: 'exposition',
      text: '`static` 关键字在翻译单元层面的作用：\n\n```cpp\n// a.cpp\nstatic int helper() { return 1; }   // 只在 a 的翻译单元可见\n\n// b.cpp\nstatic int helper() { return 2; }   // 只在 b 的翻译单元可见，不冲突\n```\n\n`static` 把函数的作用域限制在当前翻译单元。',
    },
    {
      type: 'concept-cards',
      instruction: '翻译单元之间的通信方式：',
      cards: [
        { glyph: '📣', term: '函数声明', meaning: '告诉别的翻译单元"我有这个函数"', example: 'void func();' },
        { glyph: '🔗', term: 'extern 变量', meaning: '引用别的翻译单元的变量', example: 'extern int global;' },
        { glyph: '📋', term: '头文件', meaning: '共享声明给多个翻译单元', example: '#include "shared.h"' },
      ],
    },
    {
      type: 'exposition',
      text: '一个多文件程序中的翻译单元数量：\n\n假设项目有：\n- `main.cpp`（包含 `utils.h`）→ 翻译单元 1\n- `utils.cpp`（包含 `utils.h`）→ 翻译单元 2\n- `network.cpp`（包含 `network.h`）→ 翻译单元 3\n\n总共 **3 个翻译单元**，产生 3 个 `.o` 文件。',
    },
    {
      type: 'type-it',
      instruction: '敲一个 static 函数定义（作用域限制在当前翻译单元）：',
      code: 'static int internalHelper() { return 0; }',
      hints: ['`static` 让函数只在当前翻译单元可见', '不同翻译单元可以有同名的 static 函数', 'static 函数不能被其他 .cpp 文件调用'],
    },
    {
      type: 'exposition',
      text: '理解翻译单元对调试的意义：\n\n当你遇到"函数未定义"链接错误时：\n- 函数声明了但没定义 → 检查是否有对应的定义\n- 函数定义在另一个翻译单元 → 检查链接时是否包含那个 .o\n- 函数被 `static` 修饰了 → 其他翻译单元无法访问',
    },
    {
      type: 'exposition',
      text: '**匿名命名空间（Anonymous Namespace）**——C++ 推荐的替代 `static` 的方式：\n\n```cpp\n// a.cpp\nnamespace {\n  int helper() { return 1; }   // 只在当前翻译单元可见\n}\n```\n\n效果和 `static` 一样，但更符合 C++ 风格。',
    },
    {
      type: 'type-it',
      instruction: '敲一个匿名命名空间（替代 static 的现代 C++ 写法）：',
      code: 'namespace {\n  int localHelper() { return 42; }\n}',
      hints: ['匿名命名空间用 `namespace { }` 包围', '里面的内容只在当前翻译单元可见', '这是比 `static` 更推荐的 C++ 写法'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个关于翻译单元的说法正确？',
      options: [
        { text: '一个翻译单元 = 一个 .cpp + 它包含的所有头文件展开', correct: true, explanation: '这就是翻译单元的标准定义' },
        { text: '一个翻译单元 = 一个 .h 文件', correct: false, explanation: '.h 文件不独立构成翻译单元' },
        { text: '整个项目是一个翻译单元', correct: false, explanation: '每个 .cpp 文件独立成为一个翻译单元' },
        { text: '一个翻译单元 = 一个函数', correct: false, explanation: '翻译单元以文件为单位' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：以下哪个实体的定义可以出现在头文件中，被多个翻译单元包含而不违反 ODR？',
      options: [
        { text: '非 const 全局变量', correct: false, explanation: '外部链接变量放头文件会导致 ODR 违规' },
        { text: 'inline 函数', correct: true, explanation: 'inline 函数可以出现在多个翻译单元中' },
        { text: '非 inline 函数的定义', correct: false, explanation: '普通函数定义只能出现一次' },
        { text: '全局变量的定义（无 extern）', correct: false, explanation: '每个翻译单元一个定义，违反 ODR' },
      ],
    },
    {
      type: 'exposition',
      text: '**编译速度与翻译单元**：\n\n大型项目有几百个翻译单元。\n如果只改了一个文件，只需要重新编译那一个翻译单元。\n\n其他翻译单元的目标文件（.o）可以直接拿来用，\n最后重新链接就行。\n\n这就是多文件编译**节省时间**的原因。',
    },
    {
      type: 'type-it',
      instruction: '敲一段代码：在 a.cpp 中声明一个函数，该函数在 b.cpp 中定义：',
      code: '// a.cpp\nextern void helper();\nint main() { helper(); }\n\n// b.cpp\nvoid helper() { /* 实现 */ }',
      hints: ['`extern` 告诉编译器"这个函数在其他翻译单元"', 'a.cpp 编译时只知道函数签名即可', '链接器会把 a.o 和 b.o 合并'],
    },
    {
      type: 'exposition',
      text: '翻译单元隔离性带来的好处：\n\n1. **改一个文件只重新编译那个文件**\n2. **不同人可以写不同文件**，互不影响\n3. **库可以预编译成 .o 文件**，只提供头文件\n\n这些特性让大型项目成为可能。',
    },
  ],
}

export default lesson
