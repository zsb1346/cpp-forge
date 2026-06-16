import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-organization',
    chapter: 6,
    title: '多文件编程练习',
    subtitle: '巩固 14',
    description: '动手练习将单文件程序拆分成 .h 和 .cpp 的多文件结构，理解分工和编译方式。',
    objectives: ['能独立把一个函数拆到头文件和源文件', '能写出正确的 #include', '理解 #pragma once 的作用'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课学了理论——这课来动手。\n把一个**单文件程序**拆成**多文件结构**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '这是要拆的原始代码（在 `main.cpp` 里）：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid greet(string name) {\n  cout << "你好，" << name << "！\\n";\n}\n\nint main() {\n  greet("小明");\n  greet("小红");\n}',
    },
    {
      type: 'exposition',
      text: '目标：拆成三个文件——`greet.h`、`greet.cpp`、`main.cpp`。',
    },
    {
      type: 'type-it',
      instruction: '敲这段——这相当于写 greet.h 头文件内容：',
      code: '#pragma once\n#include <string>\nusing namespace std;\n\nvoid greet(string name);',
      hints: ['`#pragma once` 防止重复包含', '头文件需要包含 `string` 头', '函数声明必须加分号'],
    },
    {
      type: 'code-runner',
      instruction: '运行这段——模拟了多文件程序的效果（合在一个 code-runner 里展示）：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\n// 模拟 greet.h 中的声明\nvoid greet(string name);\n\n// 模拟 greet.cpp 中的实现\nvoid greet(string name) {\n  cout << "你好，" << name << "！" << endl;\n}\n\nint main() {\n  greet("小明");\n  greet("小红");\n}',
      expectedOutput: '你好，小明！\n你好，小红！',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'type-it',
      instruction: '敲 greet.cpp 源文件的内容——函数的实现：',
      code: '#include "greet.h"\n#include <iostream>\nusing namespace std;\n\nvoid greet(string name) {\n  cout << "你好，" << name << "！" << endl;\n}',
      hints: ['`#include "greet.h"` 引入自己的头文件', '实现用花括号 {}，不用分号了', '`<iostream>` 用于 cout'],
    },
    {
      type: 'type-it',
      instruction: '敲 main.cpp 的内容——调用刚写的函数：',
      code: '#include "greet.h"\n\nint main() {\n  greet("小明");\n  greet("小红");\n}',
      hints: ['main.cpp 只包含 greet.h 就够了', '链接时 greet.cpp 中的实现会自动连接', '不需要再 #include <iostream>'],
    },
    {
      type: 'multiple-choice',
      question: '复习前一课：`#pragma once` 的作用是什么？',
      options: [
        { text: '让编译速度更快', correct: false, explanation: '不是主要目的' },
        { text: '防止头文件被重复包含', correct: true, explanation: '防止多次 #include 同一个头文件' },
        { text: '声明一个函数', correct: false, explanation: '函数声明不需要 #pragma once' },
        { text: '标记文件为只读', correct: false, explanation: '这和文件属性无关' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行这个——把两个函数拆到单独的"文件"里(模拟)：',
      code: '#include <iostream>\nusing namespace std;\n\n// === math.h (头文件) ===\nint add(int a, int b);\nint multiply(int a, int b);\n\n// === math.cpp (实现) ===\nint add(int a, int b) {\n  return a + b;\n}\n\nint multiply(int a, int b) {\n  return a * b;\n}\n\n// === main.cpp ===\nint main() {\n  cout << "3+5=" << add(3, 5) << endl;\n  cout << "4*7=" << multiply(4, 7) << endl;\n}',
      expectedOutput: '3+5=8\n4*7=28',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 4：以下哪个是正确的函数定义？',
      options: [
        { text: '`int sum(int a, int b);`', correct: false, explanation: '这是声明，有分号不是定义' },
        { text: '`int sum(int a, int b) { return a + b; }`', correct: true, explanation: '有函数体就是定义' },
        { text: '`sum(int a, int b) { return a + b; }`', correct: false, explanation: '缺少返回类型 int' },
        { text: '`void sum(int a, int b) { return a + b; }`', correct: false, explanation: 'void 函数不能返回值' },
      ],
    },
    {
      type: 'exposition',
      text: '**常见的多文件项目结构**：',
      code: 'project/\n├── main.cpp\n├── math.h\n├── math.cpp\n├── utils.h\n├── utils.cpp\n└── player.h\n    player.cpp',
    },
    {
      type: 'type-it',
      instruction: '敲一个更完整的练习——包含计算器头文件和实现：',
      code: '#pragma once\n// calc.h\nint add(int a, int b);\nint sub(int a, int b);\nint mul(int a, int b);\ndouble div(double a, double b);',
      hints: ['`#pragma once` 开头', '每个函数声明占一行', '声明以分号 ; 结尾'],
    },
    {
      type: 'exposition',
      text: '实现文件 `calc.cpp`：',
      code: '#include "calc.h"\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\ndouble div(double a, double b) { return a / b; }',
    },
    {
      type: 'exposition',
      text: '主文件 `main.cpp`：',
      code: '#include <iostream>\n#include "calc.h"\nusing namespace std;\n\nint main() {\n  cout << add(10, 5) << endl;\n  cout << div(10.0, 3.0) << endl;\n}',
    },
    {
      type: 'type-it',
      instruction: '敲 main.cpp 使用 calc.h——调用计算器函数：',
      code: '#include <iostream>\n#include "calc.h"\nusing namespace std;\n\nint main() {\n  cout << "10 + 5 = " << add(10, 5) << endl;\n  cout << "10 - 5 = " << sub(10, 5) << endl;\n  cout << "10 * 5 = " << mul(10, 5) << endl;\n}',
      hints: ['`#include "calc.h"` 引入自定义头文件', 'add/sub/mul 的实现在 calc.cpp 中', '编译时需要同时编译 main.cpp 和 calc.cpp'],
    },
    {
      type: 'exposition',
      text: '**总结**：\n- `.h` 文件：放声明，像**目录**\n- `.cpp` 文件：放实现，像**正文**\n- `#include`：把目录贴进来\n- 编译时所有 .cpp 文件一起编译',
    },
    {
      type: 'exposition',
      text: '至此，**阶段 5：指针、引用、重载、多文件**全部完成！🎉\n你已经掌握了 C++ 最核心的几个进阶特性。',
    },
    {
      type: 'multiple-choice',
      question: '阶段 5 结束题：以下哪个是"声明指针变量"的正确写法？',
      options: [
        { text: '`int p;`', correct: false, explanation: '这是普通 int 变量，不是指针' },
        { text: '`int* p;`', correct: true, explanation: '* 表示 p 是一个 int 指针' },
        { text: '`int& p;`', correct: false, explanation: '& 是引用声明，不是指针' },
        { text: '`int p*;`', correct: false, explanation: '语法错误，* 应该在类型名后面' },
      ],
    },
  ],
}

export default lesson
