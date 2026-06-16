import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'separate-compilation',
    chapter: 6,
    title: '.h 和 .cpp 分工',
    subtitle: '声明放 .h，实现放 .cpp',
    description: '学习 C++ 的多文件编程：头文件放声明，源文件放实现，以及 #include 的作用。',
    objectives: ['能区分 .h 和 .cpp 的作用', '能写出简单的多文件程序', '理解 #include 就是复制粘贴文件内容'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '到目前为止，你所有的代码都写在一个文件里。\n**但真实项目不可能只有一个文件** —— 几千行代码挤一起没法维护。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'C++ 的解决方案：**把代码拆到多个文件里**。\n两种文件分工合作：',
    },
    {
      type: 'exposition',
      text: '**`.h` 文件（头文件 / Header）**——放**声明**\n- 函数签名\n- 类的定义\n- 全局常量声明\n- 告诉编译器"有这么个东西"',
    },
    {
      type: 'exposition',
      text: '**`.cpp` 文件（源文件 / Source）**——放**实现**\n- 函数的具体代码\n- 类的成员函数实现\n- 真正的逻辑',
    },
    {
      type: 'concept-cards',
      instruction: '多文件编程的三个关键角色：',
      cards: [
        { glyph: '📋', term: '.h 头文件', meaning: '放声明，像"目录"', example: '函数的签名' },
        { glyph: '📄', term: '.cpp 源文件', meaning: '放实现，像"正文"', example: '函数的代码' },
        { glyph: '🔗', term: '#include', meaning: '把头文件内容"粘贴"进来', example: '#include "myfunc.h"' },
      ],
    },
    {
      type: 'exposition',
      text: '举个实际的例子——**拆之前**，所有代码在 `main.cpp` 里：',
      code: '// main.cpp\n#include <iostream>\nusing namespace std;\n\nvoid hello() {\n  cout << "你好！\\n";\n}\n\nint main() {\n  hello();\n}',
    },
    {
      type: 'exposition',
      text: '**拆之后**，分成两个文件：',
      code: '// hello.h —— 放声明\n#pragma once\nvoid hello();\n\n// hello.cpp —— 放实现\n#include <iostream>\nusing namespace std;\n\nvoid hello() {\n  cout << "你好！\\n";\n}\n\n// main.cpp —— 用 #include 连接\n#include "hello.h"\nint main() {\n  hello();\n}',
    },
    {
      type: 'exposition',
      text: '`#include "hello.h"` 的作用很简单：\n**把 hello.h 的内容原样粘贴到这里**。',
    },
    {
      type: 'type-it',
      instruction: '敲一个多文件程序的头文件部分（.h 文件内容）：',
      code: '#pragma once\n\nvoid greet();\nint add(int a, int b);',
      hints: ['`#pragma once` 防止头文件被重复包含', '`.h` 文件只放函数声明，不放实现', '声明以分号结尾，没有函数体'],
    },
    {
      type: 'exposition',
      text: '`#pragma once` 是一条**头文件保护符**——\n防止同一个头文件被 `#include` 多次导致重复声明错误。',
    },
    {
      type: 'exposition',
      text: '还有传统的头文件保护写法：',
      code: '#ifndef MYFUNC_H\n#define MYFUNC_H\n\nvoid greet();\n\n#endif',
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：函数重载要求参数列表什么关系？',
      options: [
        { text: '参数名必须不同', correct: false, explanation: '和参数名无关' },
        { text: '参数个数、类型或顺序必须不同', correct: true, explanation: '参数列表不同才构成重载' },
        { text: '返回值必须不同', correct: false, explanation: '仅返回值不同不能重载' },
        { text: '参数和返回值都要不同', correct: false, explanation: '返回值不参与重载判断' },
      ],
    },
    {
      type: 'exposition',
      text: '**头文件通常不放 `using namespace std;`**——\n因为其他文件 `#include` 后会被强制引入命名空间，容易冲突。',
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序把"头文件 + 源文件 + main 文件"的结构拼出来：',
      fragments: ['// math.h', '#pragma once', 'int square(int n);', '', '// math.cpp', '#include "math.h"', 'int square(int n) { return n*n; }', '', '// main.cpp', '#include "math.h"', 'int main() { square(5); }'],
      distractors: ['int square(int n) {', 'using namespace std;'],
    },
    {
      type: 'multiple-choice',
      question: '回忆阶段 4：以下是从阶段 4 学的函数，哪个是函数声明（不是定义）？',
      options: [
        { text: '`void sayHi() { cout << "Hi"; }`', correct: false, explanation: '有函数体的叫定义' },
        { text: '`int add(int, int);`', correct: true, explanation: '以分号结尾，没有函数体——这是声明' },
        { text: '`int x = 5;`', correct: false, explanation: '这是变量声明' },
        { text: '`cout << "hello";`', correct: false, explanation: '这是语句' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个完整的头文件（模拟 .h 内容）：',
      code: '#pragma once\n\nvoid showVersion();\nint calculate(int a, int b, int c);\ndouble pi = 3.14159;',
      hints: ['`#pragma once` 防止重复包含', '每个函数声明以分号结尾', '全局变量 `pi` 也可以放在头文件'],
    },
    {
      type: 'exposition',
      text: '**编译多文件程序**：',
      code: '// 命令行编译两个 .cpp 文件：\ng++ main.cpp hello.cpp -o program\n\n// 或者用 CMake——后面会学',
    },
    {
      type: 'exposition',
      text: '**为什么要拆？**\n1. **复用**——头文件写一次，到处 `#include`\n2. **编译速度**——改一个 .cpp 只重新编译那个文件\n3. **协作**——不同人写不同文件',
    },
    {
      type: 'type-it',
      instruction: '敲一个完整的 .cpp 源文件内容（模拟实现）：',
      code: '#include "myfunc.h"\n#include <iostream>\nusing namespace std;\n\nvoid showVersion() {\n  cout << "版本 1.0" << endl;\n}\n\nint calculate(int a, int b, int c) {\n  return a + b * c;\n}',
      hints: ['`#include "myfunc.h"` 引入自己的头文件', '`#include <iostream>` 引入标准库', '函数实现要用花括号 {} 包起来'],
    },
    {
      type: 'exposition',
      text: '`#include <iostream>` 用尖括号 `<>`——系统头文件\n`#include "myfunc.h"` 用双引号 `""`——自己的头文件',
    },
    {
      type: 'multiple-choice',
      question: '为什么用双引号 `""` 包含自己的头文件，用尖括号 `<>` 包含标准库？',
      options: [
        { text: '双引号先搜当前目录，尖括号搜系统路径', correct: true, explanation: '"" 优先搜项目目录，<> 搜编译器路径' },
        { text: '尖括号更快', correct: false, explanation: '速度差异可忽略，主要是搜索路径不同' },
        { text: '双引号只能用于 .h 文件', correct: false, explanation: '双引号和尖括号都可以包含任何文件' },
        { text: '没有区别，可以混用', correct: false, explanation: '有区别，搜索路径优先级不同' },
      ],
    },
    {
      type: 'exposition',
      text: '下一课：**多文件编程练习**——亲手拆一个程序。',
    },
  ],
}

export default lesson
