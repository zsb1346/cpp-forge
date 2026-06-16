import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'compilation-steps',
    chapter: 17,
    title: '编译四步骤',
    subtitle: '预处理→编译→汇编→链接',
    description: '理解 C++ 源代码如何经过四步变成可执行文件，建立编译流程的整体心智模型。',
    objectives: ['能说出编译四步骤的名称和顺序', '能理解每一步对代码做了什么', '能用 g++ 命令分步观察编译过程'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你写好的 `.cpp` 文件，计算机不能直接运行。\n**中间要经过四步转换**，就像把面粉做成面包要经过好几道工序。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '这四步是：\n`预处理 → 编译 → 汇编 → 链接`\n每一步都产生一个中间文件，传给下一步。',
    },
    {
      type: 'exposition',
      text: '**第一步：预处理（Preprocessing）**\n处理所有 `#` 开头的指令：\n- `#include` → 把头文件内容粘贴进来\n- `#define` → 文本替换\n- `#ifdef / #ifndef` → 条件编译\n\n预处理后的文件还是 C++ 代码（只是变长了）。',
    },
    {
      type: 'exposition',
      text: '**第二步：编译（Compilation）**\n把 C++ 代码翻译成**汇编语言**。\n- 检查语法错误\n- 做优化\n- 输出 `.s` 文件（汇编代码）\n\n这是四步中最核心的一步。',
    },
    {
      type: 'exposition',
      text: '**第三步：汇编（Assembly）**\n把汇编代码翻译成**机器码**（0 和 1）。\n- 输出 `.o` 文件（目标文件 / Object File）\n- 里面已经是指令了，但还不能单独运行',
    },
    {
      type: 'exposition',
      text: '**第四步：链接（Linking）**\n把多个 `.o` 文件**合并**成一个可执行文件。\n- 把函数调用和定义匹配起来\n- 解析符号引用\n- 输出可执行文件（如 `a.exe` 或 `./a.out`）',
    },
    {
      type: 'concept-cards',
      instruction: '编译四步骤一览：',
      cards: [
        { glyph: '🔧', term: '预处理', meaning: '处理 # 指令，展开宏', example: '.i 文件' },
        { glyph: '⚙️', term: '编译', meaning: 'C++ → 汇编语言', example: '.s 文件' },
        { glyph: '🔩', term: '汇编', meaning: '汇编 → 机器码', example: '.o 文件' },
        { glyph: '🔗', term: '链接', meaning: '合并所有 .o 成可执行文件', example: 'a.exe' },
      ],
    },
    {
      type: 'exposition',
      text: '用 `g++` 可以分步观察这个流程：\n\n```\ng++ -E main.cpp -o main.i     # 只预处理\n g++ -S main.i -o main.s       # 编译到汇编\n g++ -c main.s -o main.o       # 汇编到目标文件\n g++ main.o -o program          # 链接成可执行\n```\n\n但更常用的是**一步完成**：`g++ main.cpp -o program`。',
    },
    {
      type: 'concept-cards',
      instruction: '文件扩展名对应的角色：',
      cards: [
        { glyph: '📄', term: '.cpp/.cxx', meaning: 'C++ 源文件，输入起点', example: '你的代码' },
        { glyph: '📋', term: '.i', meaning: '预处理后的文件', example: '头文件已展开' },
        { glyph: '📝', term: '.s', meaning: '汇编代码，人能读', example: 'mov, add 等指令' },
        { glyph: '📦', term: '.o/.obj', meaning: '目标文件，机器码', example: '还不能运行' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个步骤把 C++ 代码翻译成了汇编语言？',
      options: [
        { text: '预处理', correct: false, explanation: '预处理只处理 # 指令，不改变语言' },
        { text: '编译', correct: true, explanation: '编译步骤把 C++ 翻译成汇编' },
        { text: '汇编', correct: false, explanation: '汇编步骤把汇编翻译成机器码' },
        { text: '链接', correct: false, explanation: '链接步骤合并目标文件' },
      ],
    },
    {
      type: 'exposition',
      text: '记住一个关键区分：\n\n**编译（Compilation）** 是第二步，也叫"真正的编译"。\n**编译（广义）** 有时指整个四步流程。\n\n上下文决定了具体指哪一个。',
    },
    {
      type: 'type-it',
      instruction: '敲一条 g++ 命令，只做预处理步骤：',
      code: 'g++ -E main.cpp -o main.i',
      hints: ['`-E` 告诉 g++ 只做预处理', '`-o` 指定输出文件名', '`.i` 是预处理后的标准扩展名'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个文件**不是**编译流程中产生的中间文件格式？',
      options: [
        { text: '`.i`', correct: false, explanation: '预处理输出 .i 文件' },
        { text: '`.s`', correct: false, explanation: '编译输出 .s 汇编文件' },
        { text: '`.o`', correct: false, explanation: '汇编输出 .o 目标文件' },
        { text: '`.exe`', correct: true, explanation: '.exe 是可执行文件，是流程的最终输出' },
      ],
    },
    {
      type: 'exposition',
      text: '如果四步中任何一步出错，整个流程就会停下来：\n- **预处理错误**：头文件找不到\n- **编译错误**：语法写错了\n- **汇编错误**：极少见，通常是编译器内部问题\n- **链接错误**：函数有声明没定义',
    },
    {
      type: 'type-it',
      instruction: '敲一条 g++ 命令，一步完成完整编译（从源文件到可执行文件）：',
      code: 'g++ main.cpp -o myprogram',
      hints: ['`g++` 自动执行预处理→编译→汇编→链接', '`-o myprogram` 指定输出文件名', '不加 `-o` 默认输出 `a.exe`'],
    },
    {
      type: 'multiple-choice',
      question: '复习阶段 5：以下哪个是函数声明（不是定义）？',
      options: [
        { text: '`int add(int a, int b) { return a + b; }`', correct: false, explanation: '有花括号和函数体，是定义' },
        { text: '`int add(int, int);`', correct: true, explanation: '以分号结尾，没有花括号——这是声明' },
        { text: '`int x = 5;`', correct: false, explanation: '这是变量声明和定义' },
        { text: '`#include <iostream>`', correct: false, explanation: '这是预处理指令，不是函数声明' },
      ],
    },
    {
      type: 'exposition',
      text: '四步流程的记忆窍门：\n\n**P**reprocessing → **C**ompilation → **A**ssembly → **L**inking\n→ 记成 **PCAL** 或"拍代码"',
    },
    {
      type: 'multiple-choice',
      question: '如果 `g++ -c main.cpp` 成功运行，它生成了什么文件？',
      options: [
        { text: 'main.i（预处理文件）', correct: false, explanation: '-c 是汇编到目标文件，不是 -E' },
        { text: 'main.s（汇编文件）', correct: false, explanation: '-c 直接生成 .o，不是 .s' },
        { text: 'main.o（目标文件）', correct: true, explanation: '-c 执行前三步，生成 .o 文件' },
        { text: 'program.exe（可执行文件）', correct: false, explanation: '-c 不做链接，不生成可执行文件' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n\n`源文件(.cpp) → 预处理(.i) → 编译(.s) → 汇编(.o) → 链接(.exe)`\n\n下一课进入第一步——**预处理器**。',
    },
  ],
}

export default lesson
