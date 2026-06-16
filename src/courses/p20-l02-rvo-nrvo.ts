import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'rvo-nrvo',
    chapter: 21,
    title: 'RVO/NRVO',
    subtitle: '编译器帮你省拷贝',
    description: '了解编译器如何通过返回值优化和具名返回值优化来省略不必要的拷贝操作。',
    objectives: ['能区分 RVO 和 NRVO', '能理解编译器省略拷贝的条件', '能识别哪些场景下拷贝消除会发生'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '当你从函数返回一个对象时，直觉上会经历"拷贝"：\n在函数内部构造对象 → 拷贝到调用方。\n但 C++ 编译器有一个"偷偷"做的优化，\n叫**RVO（Return Value Optimization）**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**RVO（返回值优化）**：\n当函数返回一个**临时对象**时，编译器可以在调用方直接构造这个对象，\n跳过中间的拷贝。\n\n看这个例子：\n`MyObj f() { return MyObj(); }`\n`MyObj x = f();` → 理论上 MyObj() 构造两次，实际**只构造一次**。',
      code: 'struct MyObj {\n  MyObj() { cout << "构造\\n"; }\n  MyObj(const MyObj&) { cout << "拷贝\\n"; }\n};\n\nMyObj f() {\n  return MyObj();  // 临时对象，触发 RVO\n}\n\nint main() {\n  MyObj x = f();  // 只输出"构造"一次\n}',
    },
    {
      type: 'exposition',
      text: '**NRVO（Named Return Value Optimization）**：\n是 RVO 的变体——即使返回的是**有名字的局部变量**，\n编译器也可能省略拷贝。\n\n`MyObj f() { MyObj obj; return obj; }`\n这种优化叫 NRVO，因为对象有名字（named）。',
      code: 'MyObj f() {\n  MyObj obj;   // 局部对象，有名字\n  return obj;  // NRVO 可能发生\n}\n\nint main() {\n  MyObj x = f();  // 可能只构造一次\n}',
    },
    {
      type: 'concept-cards',
      instruction: 'RVO 和 NRVO 的区别：',
      cards: [
        { glyph: '🚀', term: 'RVO', meaning: '返回临时对象时省略拷贝', example: 'return MyObj();' },
        { glyph: '📛', term: 'NRVO', meaning: '返回有名字的局部变量时省略拷贝', example: 'return obj;' },
        { glyph: '⚡', term: '拷贝消除', meaning: 'RVO/NRVO 的统称，编译器省略拷贝操作', example: '零拷贝返回' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况可能触发 RVO？',
      options: [
        { text: '`return MyObj();`', correct: true, explanation: '返回临时对象，编译器可以优化' },
        { text: '`return obj;` 其中 obj 是参数', correct: false, explanation: '参数不是局部变量，不能 NRVO' },
        { text: '`return x + y;`', correct: false, explanation: '这是算术表达式，不是对象构造' },
        { text: '`return *this;`', correct: false, explanation: '返回自身引用，不是临时对象' },
      ],
    },
    {
      type: 'exposition',
      text: 'RVO/NRVO 不是 C++ 标准**强制要求**的，\n而是"允许"编译器做这个优化。\n大部分现代编译器（GCC、Clang、MSVC）都会做。\n但注意：如果编译器判断 NRVO 太复杂，它可能选择不做。',
    },
    {
      type: 'exposition',
      text: '**什么时候 NRVO 可能失败**？\n- 函数有多个 return 语句返回不同对象\n- 对象有某些特殊属性\n- 编译器的优化等级不够\n\n例如：`if (cond) return a; else return b;`\n这种多路径返回往往无法 NRVO。',
      code: 'MyObj f(bool flag) {\n  MyObj a, b;\n  if (flag) return a;  // NRVO 可能失败\n  else return b;        // 因为有多个 return 目标\n}',
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况**不能**做 RVO/NRVO？',
      options: [
        { text: '`return MyObj(42);`', correct: false, explanation: '返回临时对象，可以做 RVO' },
        { text: '`return obj;` 且 obj 是唯一路径的局部变量', correct: false, explanation: '单路径返回可以做 NRVO' },
        { text: '`if (c) return a; else return b;`', correct: true, explanation: '多路径返回不同对象，NRVO 难以实现' },
        { text: '`return MyObj();`', correct: false, explanation: '经典的 RVO 场景' },
      ],
    },
    {
      type: 'exposition',
      text: '**验证 RVO/NRVO 是否生效**：\n最简单的方法是在拷贝构造函数里加打印输出。\n如果只打印了"构造"没有"拷贝"，说明优化发生了。\n\n也可以编译时加 `-fno-elide-constructors` 禁用优化，\n观察理论上的拷贝次数。',
    },
    {
      type: 'exposition',
      text: '**RVO/NRVO 的意义**：\nC++ 早期拷贝成本很高（尤其是容器类如 `vector`）。\nRVO/NRVO 让"值语义"的代码写起来自然、跑起来快。\n你不需要操心"应该返回指针还是引用"。',
    },
    {
      type: 'type-it',
      instruction: '输入一个可以验证 RVO 是否生效的程序（观察构造和拷贝的输出）：',
      code: '#include <iostream>\nusing namespace std;\n\nstruct MyObj {\n  MyObj() { cout << "构造\\n"; }\n  MyObj(const MyObj&) { cout << "拷贝\\n"; }\n};\n\nMyObj f() {\n  return MyObj();\n}\n\nint main() {\n  MyObj x = f();\n}',
      hints: [
        '构造函数的输出帮助你观察调用次数',
        '如果 RVO 生效，只会打印一次"构造"',
        '拷贝构造函数里也加了输出用于对比',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 10：为什么说 RVO/NRVO 让"值语义"更实用？',
      options: [
        { text: '因为可以不用考虑指针的内存管理', correct: true, explanation: '值语义配合 RVO 既安全又高效' },
        { text: '因为拷贝总是免费的', correct: false, explanation: '不免费，但 RVO 帮助省略了很多拷贝' },
        { text: '因为引用比指针更好用', correct: false, explanation: '这和 RVO 无直接关系' },
        { text: '因为返回值必须是指针', correct: false, explanation: '值语义可以直接返回值' },
      ],
    },
    {
      type: 'exposition',
      text: '**移动语义 vs RVO/NRVO**：\nC++11 引入了移动语义，但 RVO/NRVO 仍然是重要的优化。\n当 RVO/NRVO 不能发生时（比如条件分支），\n移动语义会作为"后备"——编译器会尝试用移动而不是拷贝。',
      code: 'MyObj f(bool flag) {\n  MyObj a, b;\n  if (flag) return a;  // 如果 NRVO 不行，尝试移动\n  else return b;\n}',
    },
    {
      type: 'type-it',
      instruction: '输入一个同时观察拷贝和移动是否发生的例子：',
      code: '#include <iostream>\nusing namespace std;\n\nstruct MyObj {\n  MyObj() {}\n  MyObj(const MyObj&) { cout << "拷贝\\n"; }\n  MyObj(MyObj&&) { cout << "移动\\n"; }\n};\n\nMyObj f(bool flag) {\n  MyObj a, b;\n  if (flag) return a;\n  else return b;\n}',
      hints: [
        '移动构造函数也有输出',
        '多路径返回时可能触发移动而不是拷贝',
        '观察输出的"移动"或"拷贝"字眼',
      ],
    },
    {
      type: 'exposition',
      text: '**关键理解**：RVO/NRVO 是"拷贝消除"的一种形式。\n它不改变程序的语义（拷贝构造函数的副作用除外）。\n从 C++17 开始，某些场景的拷贝消除从"可选"变为了**保证**。\n这也是下一课的内容。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：C++11 引入的移动语义和 RVO 是什么关系？',
      options: [
        { text: 'RVO 在移动语义之后就不再需要了', correct: false, explanation: 'RVO 仍然有效且更重要' },
        { text: 'RVO 优先，如果不行则尝试移动', correct: true, explanation: '编译器优先做拷贝消除，退而求其次用移动' },
        { text: '移动语义完全替代了 RVO', correct: false, explanation: '两者是互补关系' },
        { text: 'RVO 只能和移动语义一起工作', correct: false, explanation: 'RVO 不依赖移动语义' },
      ],
    },
    {
      type: 'exposition',
      text: '**实际应用建议**：\n1. 优先写自然的值返回代码\n2. 对于简单函数，相信编译器会做 RVO/NRVO\n3. 如果性能关键，可以用基准测试验证\n4. 对于复杂多路径返回，考虑用 `std::optional` 或重构',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是 NRVO 中的"N"代表的含义？',
      options: [
        { text: 'New（新的）', correct: false, explanation: 'N 代表 Named（有名字的）' },
        { text: 'Named（有名字的）', correct: true, explanation: 'NRVO 优化有名字的局部变量的返回值' },
        { text: 'No（没有）', correct: false, explanation: '不是这个意思' },
        { text: 'Never（从不）', correct: false, explanation: 'NRVO 的 N 不表示否定' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- **RVO**：返回值优化，返回临时对象时省拷贝\n- **NRVO**：具名返回值优化，返回局部变量时省拷贝\n- 编译器通常能做好，但复杂分支会影响优化\n- C++17 进一步保证了某些场景的拷贝消除',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
