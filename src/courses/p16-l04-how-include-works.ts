import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'how-include-works',
    chapter: 17,
    title: '#include 原理',
    subtitle: '粘贴头文件内容',
    description: '深入理解 #include 的实质——预处理器把头文件内容原样粘贴到包含点。',
    objectives: ['能解释 #include 就是文件内容粘贴', '能理解不同包含路径的搜索规则', '能避免常见的 #include 错误'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`#include` 本质上做了一件事：\n**把指定文件的内容，原封不动地粘贴到这里**。\n\n就这么简单，没有魔法。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '想象你在 `main.cpp` 里写了 `#include "helper.h"`：\n\n预处理后，`main.cpp` 就变成了这样：\n\n```cpp\n// helper.h 的内容被粘贴到这里\n#pragma once\nint add(int a, int b);\nint sub(int a, int b);\n\n// 下面是 main.cpp 原来的代码\nint main() {\n  return add(3, 4);\n}\n```',
    },
    {
      type: 'exposition',
      text: '如果 `helper.h` 里又 `#include` 了别的文件，\n那些文件也会被递归地粘贴进来。\n\n就像俄罗斯套娃——一层一层展开，最后变成一个巨大的文件。',
    },
    {
      type: 'exposition',
      text: '理解这个机制后，两个重要的推论：\n\n1. **顺序很重要**：`#include` 的位置决定了内容出现在哪里\n2. **header guard 很重要**：同一文件被粘贴两次会导致重复定义',
    },
    {
      type: 'exposition',
      text: '一个常见的错误：在 `.h` 文件中包含 `.cpp` 文件。\n\n如果 A.cpp 包含了 B.h，B.h 又包含了 C.cpp——\n那么 C.cpp 的代码会被粘贴到 A.cpp 里，\n结果 C.cpp 中的函数定义会出现在多个翻译单元中，\n导致**重复定义**链接错误。',
    },
    {
      type: 'concept-cards',
      instruction: '#include 的两种查找路径：',
      cards: [
        { glyph: '📂', term: '#include "..."', meaning: '先搜当前文件目录', example: '#include "myheader.h"' },
        { glyph: '📚', term: '#include <...>', meaning: '只搜编译器系统路径', example: '#include <iostream>' },
      ],
    },
    {
      type: 'exposition',
      text: '尖括号 `<>` 的双引号 `""` 的搜索顺序差别：\n\n**双引号** `#include "foo.h"`\n1. 先搜当前源文件所在目录\n2. 没找到 → 搜编译器指定的 `-I` 路径\n3. 没找到 → 搜系统路径\n\n**尖括号** `#include <foo>`\n1. 直接搜编译器指定的 `-I` 路径\n2. 再搜系统路径',
    },
    {
      type: 'exposition',
      text: '注意事项：\n\n- 不要在头文件里 `#include .cpp` 文件\n- 不要在头文件里写 `using namespace std;`——所有包含它的文件都会被强制引入\n- 头文件里只包含你真正需要的东西，减少"间接包含"',
    },
    {
      type: 'type-it',
      instruction: '敲一行 #include，包含同目录下的头文件 mylib.h：',
      code: '#include "mylib.h"',
      hints: ['双引号表示"先搜当前目录"', '不用写 .h 之外的路径信息', '这一行通常放在文件顶部'],
    },
    {
      type: 'exposition',
      text: '**`#include` 的顺序约定（常见代码规范）**：\n\n1. 自己的头文件（对应的 .h）\n2. 项目内其他头文件\n3. 第三方库头文件\n4. C++ 标准库\n\n每组之间空一行，按字母排序更佳。',
    },
    {
      type: 'multiple-choice',
      question: '如果你写 `#include "math.h"`，预处理器会做什么？',
      options: [
        { text: '检查 math.h 是否存在', correct: false, explanation: '预处理器不做检查，只是粘贴' },
        { text: '把 math.h 的内容原样粘贴到这一行', correct: true, explanation: '#include 就是文件内容粘贴' },
        { text: '编译 math.h 里面的代码', correct: false, explanation: '编译是下一步的事' },
        { text: '只粘贴 math.h 中的函数声明', correct: false, explanation: '是整个文件内容，不只是声明' },
      ],
    },
    {
      type: 'exposition',
      text: '一个实际例子感受展开效果：\n\n如果 `iostream` 有 5 万行（实际上更多），\n`#include <iostream>` 那一行就会变成 5 万行代码。\n\n这就是为什么头文件展开后文件会变大很多。',
    },
    {
      type: 'type-it',
      instruction: '敲一行 #include，包含 C++ 标准库中的 vector：',
      code: '#include <vector>',
      hints: ['标准库用尖括号 `<>`', '`<vector>` 不需要加 `.h` 扩展名', '标准库头文件没有 .h 后缀'],
    },
    {
      type: 'multiple-choice',
      question: '下面的代码包含了一个 .cpp 文件，放在 function.h 里。会有什么问题？\n`// function.h\n#include "implement.cpp"`',
      options: [
        { text: '没有问题，可以这样做', correct: false, explanation: '包含 .cpp 是不规范的做法' },
        { text: '编译速度会变慢', correct: false, explanation: '这确实是问题之一，但不是最严重的' },
        { text: 'implement.cpp 中的函数定义会在多个翻译单元重复', correct: true, explanation: '每个包含 function.h 的 .cpp 中都会有 implement.cpp 的代码' },
        { text: '预处理器会报错', correct: false, explanation: '预处理器不会报错，它只是粘贴' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n\n**`#include` = 文件内容的精确粘贴**。\n理解这一点，就能理解为什么要有 header guard、\n为什么包含顺序重要、为什么不能包含 .cpp。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：传统 header guard 用哪三个预处理指令？',
      options: [
        { text: '#if / #else / #endif', correct: false, explanation: '这是普通条件编译，不是 header guard' },
        { text: '#ifndef / #define / #endif', correct: true, explanation: 'header guard 的标准三件套' },
        { text: '#include / #define / #undef', correct: false, explanation: '#include 是文件包含指令' },
        { text: '#pragma once / #define / #endif', correct: false, explanation: '#pragma once 已包含保护逻辑' },
      ],
    },
    {
      type: 'exposition',
      text: '**小测验**：如果 `a.h` 包含 `b.h`，`b.h` 包含 `a.h`——\n\n这叫做**循环包含**（Circular Include）。\n\n没有 header guard 的情况下会导致无限展开，\n文件大小爆炸 → 编译错误。\n\n即使有 header guard，也要避免设计上的循环依赖。',
    },
    {
      type: 'exposition',
      text: '解决方案：\n\n1. **前向声明**（Forward Declaration）：在需要的地方声明类或函数\n2. **拆分头文件**：把循环依赖的部分拆到第三个文件\n3. **用接口隔离**：通过抽象基类减少头文件耦合\n\n这些是软件设计的范畴，但在多文件编程中非常重要。',
    },
  ],
}

export default lesson
