import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'linking-errors',
    chapter: 17,
    title: '链接错误解读',
    subtitle: 'LNK2019 / LNK2005',
    description: '学会识别和解决最常见的链接错误：未解析的外部符号和重复定义。',
    objectives: ['能区分编译错误和链接错误', '能识别 LNK2019 和 LNK2005 的含义', '能根据错误信息定位问题'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '链接错误和编译错误不一样——\n\n**编译错误**：语法有问题 → 报错在具体哪一行\n**链接错误**：每个翻译单元都编译通过了，但合并时出问题 → 报错不指向具体行号',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '最常见的两种链接错误：\n\n**LNK2019**（未解析的外部符号 / unresolved external symbol）\n→ "声明了但没定义" 或 "忘了链接某个 .o 文件"\n\n**LNK2005**（重复定义 / already defined）\n→ "ODR 违规：同一个东西被定义了两次"',
    },
    {
      type: 'concept-cards',
      instruction: '两种主要链接错误：',
      cards: [
        { glyph: '🔍', term: 'LNK2019', meaning: '有声明没定义，或没链接', example: 'unresolved external symbol' },
        { glyph: '🔁', term: 'LNK2005', meaning: '同一个东西定义了两次', example: 'already defined in ...' },
      ],
    },
    {
      type: 'exposition',
      text: '**LNK2019 错误**的常见原因：\n\n1️⃣ **函数声明了但没定义**——写了声明但忘了写函数体\n\n```cpp\n// main.cpp\nvoid hello();    // 声明\nint main() {\n  hello();       // 编译通过，链接时报错\n}\n// 没有定义 hello！\n```',
    },
    {
      type: 'exposition',
      text: 'LNK2019 原因 2️⃣：**忘记链接源文件**\n\n```bash\n# main.cpp 调用了 utils.cpp 里的函数\n g++ main.cpp -o program  # 报错！忘了加 utils.cpp\n\n# 正确：\n g++ main.cpp utils.cpp -o program\n```',
    },
    {
      type: 'exposition',
      text: 'LNK2019 原因 3️⃣：**函数或变量被 static 修饰了**\n\n```cpp\n// a.cpp\nstatic void secret() {}   // 仅在 a.cpp 中可见\n\n// b.cpp\nvoid secret();            // 声明\nint main() {\n  secret();               // 链接错误！a.cpp 里的 secret 是 static\n}\n```',
    },
    {
      type: 'multiple-choice',
      question: '你编译时看到 `LNK2019: unresolved external symbol "void hello()"`，以下哪个最可能是原因？',
      options: [
        { text: 'hello 函数声明了但没定义', correct: true, explanation: 'LNK2019 最常见的原因就是只声明未定义' },
        { text: 'hello 函数的参数类型写错了', correct: false, explanation: '类型错误是编译错误，不是链接错误' },
        { text: 'hello 函数里有个变量名拼错了', correct: false, explanation: '函数内部的错误是编译错误' },
        { text: 'hello 函数的名字太长了', correct: false, explanation: '名字长度不影响编译和链接' },
      ],
    },
    {
      type: 'exposition',
      text: '**LNK2005 错误**的常见原因：\n\n1️⃣ **头文件中定义了非 const 全局变量**\n\n```cpp\n// common.h\nint counter = 0;  // 定义！不是声明！\n\n// a.cpp #include "common.h"\n// b.cpp #include "common.h"\n// 两个翻译单元都有 counter 的定义 → LNK2005\n```',
    },
    {
      type: 'exposition',
      text: 'LNK2005 原因 2️⃣：**非 inline 函数定义在头文件中**\n\n```cpp\n// helper.h\nint doubleIt(int x) { return x * 2; }  // 没有 inline！\n\n// 被两个 .cpp 包含后，两个翻译单元都有定义\n```\n\n解决方案：加 `inline` 或把实现移到 `.cpp`。',
    },
    {
      type: 'multiple-choice',
      question: '你看到 `LNK2005: "int counter" already defined in a.obj`，以下哪个做法正确？',
      options: [
        { text: '在头文件里把 `int counter = 0;` 改成 `extern int counter;`，再在一个 .cpp 里定义', correct: true, explanation: '头文件放 extern 声明，.cpp 放定义' },
        { text: '删除一个包含该头文件的 .cpp 文件', correct: false, explanation: '不要删文件，应该用 extern 声明' },
        { text: '在头文件里加 #pragma once', correct: false, explanation: 'header guard 防止的是同一翻译单元内的重复包含，不是不同翻译单元的定义冲突' },
        { text: '把头文件改成 .hpp 扩展名', correct: false, explanation: '文件扩展名和链接错误无关' },
      ],
    },
    {
      type: 'exposition',
      text: 'LNK2005 原因 3️⃣：**两个 .cpp 文件里定义了同名的全局函数或变量**\n\n```cpp\n// a.cpp\nint version = 1;\n\n// b.cpp\nint version = 2;   // LNK2005！\n```\n\n区分策略：不是同一个就加 `static` 或放匿名命名空间。',
    },
    {
      type: 'multiple-choice',
      question: '一个项目中两个 .cpp 文件都有 `void logMessage(string msg) { ... }` 的完整定义，会看到什么链接错误？',
      options: [
        { text: 'LNK2019（未解析的外部符号）', correct: false, explanation: '不是找不到，是太多定义了' },
        { text: 'LNK2005（重复定义）', correct: true, explanation: '两个翻译单元都有相同函数的定义' },
        { text: '不会报错，编译器自动去重', correct: false, explanation: '编译器不自动去重，非 inline 函数只能有一个定义' },
        { text: 'LNK1120（无法解析的命令）', correct: false, explanation: 'LNK1120 是汇总信息，底层原因是 LNK2019 或 LNK2005' },
      ],
    },
    {
      type: 'exposition',
      text: '**链接错误排查步骤**：\n\n1. 看错误类型：LNK2019（找不到）还是 LNK2005（重复）\n2. 读出错信息中的符号名——哪个变量/函数出问题了\n3. 如果是 LNK2019：检查是否写了定义、是否链接了正确的 .o\n4. 如果是 LNK2005：检查是否违反 ODR、是否在头文件里写了定义',
    },
    {
      type: 'concept-cards',
      instruction: '链接错误速查表：',
      cards: [
        { glyph: '❓', term: 'LNK2019', meaning: '声明有，定义无', example: '检查定义和链接' },
        { glyph: '❌', term: 'LNK2005', meaning: '定义了两次', example: '检查 ODR 违规' },
        { glyph: '✅', term: '编译通过？', meaning: '错误在链接阶段出现', example: '不是代码风格问题' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲一个正确的多文件声明/定义组合（模拟链接成功的设置）：',
      code: '// global.h\nextern int version;\n\n// global.cpp\nint version = 2;',
      hints: ['头文件用 `extern int version;` 声明', '源文件 `int version = 2;` 定义', '其他源文件包含 global.h 即可访问 version'],
    },
    {
      type: 'exposition',
      text: '**编译错误 vs 链接错误——一句话判断**：\n\n- 错误信息带行号 → **编译错误**\n- 错误信息说"symbol"、"external"、"already defined" → **链接错误**',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：翻译单元是什么？',
      options: [
        { text: '一个 .cpp 文件本身', correct: false, explanation: '不是单独的 .cpp，而是展开之后' },
        { text: '一个 .cpp 文件 + 它包含的所有头文件展开后的结果', correct: true, explanation: '这就是翻译单元的准确定义' },
        { text: '整个项目文件夹中的所有代码', correct: false, explanation: '那是项目，不是翻译单元' },
        { text: '一个函数或变量', correct: false, explanation: '翻译单元是以文件为单位的' },
      ],
    },
    {
      type: 'exposition',
      text: '链接错误是初学者最头疼的问题——但有了上面的知识，你就能像侦探一样找到原因了。',
    },
  ],
}

export default lesson
