import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-compilation',
    chapter: 17,
    title: '编译与链接练习',
    subtitle: '巩固 01-07',
    description: '通过三道选择题、一道代码拼装题和一道填空题，巩固编译流程、声明定义和 ODR 的核心概念。',
    objectives: ['能准确判断编译各步骤的作用', '能分辨声明和定义', '能组织多文件程序结构'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '通过一系列练习，巩固前面 7 课学到的编译、链接、声明定义和 ODR 知识。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '编译四步骤中，哪一步负责把 `.i` 文件变成 `.s` 文件？',
      options: [
        { text: '预处理', correct: false, explanation: '预处理把 .cpp 变成 .i' },
        { text: '编译', correct: true, explanation: '编译步骤把预处理后的 C++ 代码变成汇编' },
        { text: '汇编', correct: false, explanation: '汇编把 .s 变成 .o' },
        { text: '链接', correct: false, explanation: '链接把 .o 变成可执行文件' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是合法的**声明**（不是定义）？',
      options: [
        { text: '`int x = 10;`', correct: false, explanation: '有初始化的变量声明也是定义' },
        { text: '`void func() { }`', correct: false, explanation: '有函数体花括号，是定义' },
        { text: '`extern int x;`', correct: true, explanation: 'extern 关键字明确表示这是声明' },
        { text: '`struct S { int a; };`', correct: false, explanation: 'struct 的完整定义也是定义' },
      ],
    },
    {
      type: 'exposition',
      text: 'ODR 快速回顾：**每个非 inline 实体在整个程序中只能有一个定义**。\n\n下面的 match-blocks 帮你组织一个正确的多文件程序结构。',
    },
    {
      type: 'multiple-choice',
      question: '如果 `a.cpp` 定义 `int global = 5;`，`b.cpp` 也定义 `int global = 5;`，会怎样？',
      options: [
        { text: '编译通过，程序正常运行', correct: false, explanation: '链接器会发现两个同名定义' },
        { text: '编译通过，但链接报错（ODR 违规）', correct: true, explanation: '编译器各自编译通过，链接器发现冲突' },
        { text: '两个文件都编译失败', correct: false, explanation: '编译器只看一个翻译单元，不会发现冲突' },
        { text: '程序运行时会随机使用其中一个', correct: false, explanation: '链接阶段就会报错，不会生成可执行文件' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序组织一个多文件程序：声明放在头文件，实现放在源文件。',
      fragments: ['// math.h', '#pragma once', 'int add(int a, int b);', '', '// math.cpp', '#include "math.h"', 'int add(int a, int b) { return a + b; }', '', '// main.cpp', '#include <iostream>', '#include "math.h"', 'int main() { std::cout << add(2, 3); }'],
      distractors: ['int add(int a, int b) {', 'using namespace std;'],
    },
    {
      type: 'exposition',
      text: '注意上面的结构：\n- `math.h` 只放声明（`int add(int, int);`）\n- `math.cpp` 放定义（`int add(...) { ... }`）\n- `main.cpp` 包含 `math.h` 来使用它',
    },
    {
      type: 'fill-in',
      prompt: '补全头文件声明和源文件定义，计算两个整数的乘积。',
      template: '// product.h\n#pragma once\nint ____(int a, int b);\n\n// product.cpp\n#include "____"\nint ____(int a, int b) {\n  return a * b;\n}',
      answers: ['multiply', 'product.h', 'multiply'],
      hints: ['函数名可以是 multiply', '源文件中要包含自己的头文件', '记得第三个空跟第一个空保持一致'],
    },
    {
      type: 'exposition',
      text: '链接器错误 vs 编译器错误：\n\n- **编译器错误**：语法错误、类型错误——在翻译单元内部发现\n- **链接器错误**：找不到定义、重复定义——跨翻译单元时发现',
    },
    {
      type: 'fill-in',
      prompt: '补全一个使用 extern 声明跨文件变量的例子。',
      template: '// globals.cpp\nint ____ = 100;\n\n// main.cpp\n____ int counter;\nint main() {\n  return counter;\n}',
      answers: ['counter', 'extern'],
      hints: ['变量在 globals.cpp 中定义', 'main.cpp 中用关键字声明外部变量', 'extern 后面跟类型和变量名'],
    },
    {
      type: 'exposition',
      text: '**编译命令速查**：\n\n```bash\n# 单文件\n g++ main.cpp -o program\n\n# 多文件\n g++ main.cpp math.cpp -o program\n\n# 分步编译\n g++ -c main.cpp     # 生成 main.o\n g++ -c math.cpp     # 生成 math.o\n g++ main.o math.o -o program  # 链接\n```',
    },
    {
      type: 'type-it',
      instruction: '敲一条多文件编译命令（包含 main.cpp 和 utils.cpp）：',
      code: 'g++ main.cpp utils.cpp -o program',
      hints: ['多个 .cpp 文件用空格分隔', '`-o program` 指定输出文件名为 program', 'g++ 会自动完成四步骤'],
    },
    {
      type: 'multiple-choice',
      question: '复习同阶段 05：函数声明中的参数名可以省略吗？',
      options: [
        { text: '可以省略，`int add(int, int);` 是合法的', correct: true, explanation: '编译器只检查参数类型，不检查名字' },
        { text: '不能省略，参数名必填', correct: false, explanation: '参数名对调用者没有影响，可以省略' },
        { text: '可以省略一个，不能全省略', correct: false, explanation: '所有参数名都可以省略' },
        { text: '取决于编译器', correct: false, explanation: '所有 C++ 编译器都允许省略参数名' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 inline 函数在头文件中的定义。',
      template: '____ int square(int x) { ____ x * x; }',
      answers: ['inline', 'return'],
      hints: ['inline 关键字在最前面', '函数体需要 return 语句'],
    },
    {
      type: 'exposition',
      text: '**综合案例**：给定以下文件结构，判断哪些会编译通过、哪些会链接报错。',
    },
    {
      type: 'multiple-choice',
      question: '如果 `helper.h` 有 `#pragma once`，内容为 `int version = 1;`，被 `a.cpp` 和 `b.cpp` 包含，结果是什么？',
      options: [
        { text: '正常编译和链接', correct: false, explanation: 'version 是定义，非 const 全局变量违反 ODR' },
        { text: '编译通过，链接报 LNK2005', correct: true, explanation: '#pragma once 不阻止在不同翻译单元中的重复定义' },
        { text: '编译就报错', correct: false, explanation: '编译器只看单个翻译单元，不会发现' },
        { text: '链接通过，运行时报错', correct: false, explanation: '链接阶段就会报错' },
      ],
    },
    {
      type: 'exposition',
      text: '**本课使用的技巧**：\n\n- 编译四步骤中，链接是最后一步\n- 声明可以被多个翻译单元共享\n- ODR 违反会在链接时报错\n- inline + const 可以在头文件中安全使用',
    },
    {
      type: 'exposition',
      text: '练习课结束。下面进入链接错误解读——遇到链接错误不要慌，有规律可循。',
    },
  ],
}

export default lesson
