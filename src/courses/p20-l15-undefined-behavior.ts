import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'undefined-behavior',
    chapter: 21,
    title: '未定义行为',
    subtitle: 'C++ 最危险的地方',
    description: '全面了解 C++ 中的未定义行为——哪些操作会导致编译器"不保证结果"。',
    objectives: ['能列举常见的 UB 场景', '能理解 UB 为什么是编译器的"自由"', '能避免在自己代码中引入 UB'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**未定义行为（Undefined Behavior, UB）**\n是 C++ 中最难调试也最重要的话题。\n当你的代码做了某些操作时，C++ 标准说：\n**"该程序的行为是不受限制的"**——\n可能崩溃、可能正常工作、可能删除你的文件。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'UB 和"编译错误"不同：\n- **编译错误**：编译器直接告诉你"不行"\n- **UB**：编译器让你通过，但运行时不保证任何结果\n\n越界访问数组：不会报编译错，运行时可能一切正常，\n也可能崩溃，也可能悄悄破坏数据。这就是 UB 的可怕之处。',
    },
    {
      type: 'concept-cards',
      instruction: 'UB 和其他状态的区别：',
      cards: [
        { glyph: '✅', term: '定义良好的行为', meaning: '标准明确规定了结果', example: 'int x = 5;' },
        { glyph: '⚠️', term: '实现定义的行为', meaning: '不同编译器行为不同，但每种都文档化', example: 'int 的大小' },
        { glyph: '💥', term: '未定义行为（UB）', meaning: '标准不做任何保证，任何事都可能发生', example: '越界访问' },
      ],
    },
    {
      type: 'exposition',
      text: '**常见的 UB 场景（上）**：\n\n1. **数组越界**：`arr[10]` 当数组只有 5 个元素\n2. **空指针解引用**：`*nullptr`\n3. **除零**：`x / 0`\n4. **悬空指针**：访问已经 delete 的内存\n5. **未初始化变量**：读没有赋值的变量',
      code: 'int arr[5];\narr[10] = 42;  // UB：越界\n\nint* p = nullptr;\n*p = 5;  // UB：空指针解引用\n\nint x;\ncout << x;  // UB：未初始化\n\nint y = 0;\nint z = 5 / y;  // UB：除零',
    },
    {
      type: 'exposition',
      text: '**常见的 UB 场景（下）**：\n\n6. **数据竞争**：多线程同时读写同一个变量\n7. **整数溢出**（有符号）：`INT_MAX + 1`\n8. **重复 delete**：`delete p; delete p;`\n9. **返回局部变量的引用**\n10. **修改字符串字面量**：`char* s = "hello"; s[0] = "H";`',
      code: 'int a = INT_MAX;\nint b = a + 1;  // UB：有符号整数溢出\n\nstring& bad() {\n  string s = "hello";\n  return s;  // UB：返回局部变量引用\n}\n\nchar* p = "fixed";\np[0] = "F";  // UB：修改字符串字面量',
    },
    {
      type: 'concept-cards',
      instruction: '五种最危险的 UB：',
      cards: [
        { glyph: '📦', term: '数组越界', meaning: '访问超出分配范围的内存', example: 'arr[100] 但只有 10 个元素' },
        { glyph: '📍', term: '空指针/悬空指针', meaning: '访问 nullptr 或已释放的内存', example: 'delete 后继续使用' },
        { glyph: '🔢', term: '整数溢出（有符号）', meaning: '超过 int 能表示的范围', example: 'INT_MAX + 1' },
        { glyph: '⚡', term: '数据竞争', meaning: '多线程无同步的并发访问', example: '两个线程同时写一个变量' },
        { glyph: '🔄', term: '多次 delete', meaning: '对同一内存释放两次', example: 'delete p; delete p;' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个操作是**未定义行为**？',
      options: [
        { text: '`int x = 5; x += 3;`', correct: false, explanation: '这是完全正常的操作' },
        { text: '`int* p = nullptr; *p = 5;`', correct: true, explanation: '解引用空指针是 UB' },
        { text: '`double d = 3.14;`', correct: false, explanation: '这是正常的变量声明' },
        { text: '`cout << "hello";`', correct: false, explanation: '正常输出' },
      ],
    },
    {
      type: 'exposition',
      text: '**为什么 C++ 有这么多 UB？**\n\n因为 C++ 的设计哲学是**"信任程序员，不给性能绑手脚"**。\n越界检查会拖慢性能（每次访问都检查一次）；\n初始化所有变量有额外成本；\n有符号整数溢出检查会生成更多指令。\n\n所以 C++ 选择：**这些检查留给程序员**。你做错了，后果自负。',
    },
    {
      type: 'exposition',
      text: '**UB 的可怕之处——时间旅行**：\n编译器看到 UB 后，可以假设"这种情况不会发生"。\n然后基于这个假设做优化。有时这导致"时间旅行"——\nUB 之前的代码也可能被优化掉！\n\n经典例子：检查 null 的代码，如果之前解引用了同一个指针，\n编译器会认为指针对非空，然后把 null 检查直接优化掉。',
      code: 'void process(int* p) {\n  int x = *p;  // 解引用\n  if (p == nullptr) {  // 编译器：p 不可能为空（刚解引用了）\n    return;           // 这行被优化掉了！\n  }\n  *p = x + 1;\n}',
    },
    {
      type: 'multiple-choice',
      question: '为什么 C++ 不强制检查数组越界？',
      options: [
        { text: '因为 C++ 设计者忘记了', correct: false, explanation: '这是有意为之的设计决策' },
        { text: '因为检查会降低性能', correct: true, explanation: '每次访问检查越界有性能成本' },
        { text: '因为编译器做不到', correct: false, explanation: '编译器可以做，但不做是为了性能' },
        { text: '因为 C++ 不支持运行时检查', correct: false, explanation: 'C++ 支持运行时检查，但选择不强制' },
      ],
    },
    {
      type: 'exposition',
      text: '**三个关键区分**：\n\n1. **未定义行为（UB）**：标准不保证，任何事可能发生\n2. **未指定行为（unspecified）**：标准列出几种可能，任选一种\n3. **实现定义行为（implementation-defined）**：标准不规定，但实现必须文档化',
      code: '// 实现定义行为：int 的大小\n cout << sizeof(int);  // 可能是 4 或 8，编译器文档会说明\n\n // 未指定行为：函数参数的求值顺序\n int i = 0;\n cout << i++ << i++;  // 可能是"0 1"或"1 0"或别的',
    },
    {
      type: 'concept-cards',
      instruction: 'UB 防御工具：',
      cards: [
        { glyph: '🔧', term: '静态分析工具', meaning: '编译器警告 + 静态分析器检测 UB', example: '-Wall -Wextra -fsanitize' },
        { glyph: '🛡️', term: 'AddressSanitizer', meaning: '运行时检测内存相关 UB', example: '-fsanitize=address' },
        { glyph: '📐', term: 'UBsanitizer', meaning: '运行时检测整数溢出等 UB', example: '-fsanitize=undefined' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'UBsanitizer（-fsanitize=undefined）能检测什么？',
      options: [
        { text: '逻辑错误', correct: false, explanation: 'UBsanitizer 检测 UB，不是逻辑错误' },
        { text: '整数溢出、除零等运行时 UB', correct: true, explanation: '可以在运行时捕捉许多常见 UB' },
        { text: '速度优化', correct: false, explanation: 'sanitizer 是调试工具，不是优化' },
        { text: '代码风格问题', correct: false, explanation: '代码风格用 clang-format' },
      ],
    },
    {
      type: 'exposition',
      text: '**如何避免 UB 的最佳实践**：\n\n1. 开启编译器警告：`-Wall -Wextra -Wpedantic`\n2. 使用 sanitizer：`-fsanitize=address,undefined`\n3. 用 `std::vector` 替代原生数组（有 at() 检查）\n4. 用智能指针替代裸指针\n5. 用 `std::optional` 处理可能为空的值\n6. 多线程中使用 `std::atomic` 或 `std::mutex`',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '总结：\n- UB 是 C++ 对性能的"妥协"——不检查，信任程序员\n- 常见 UB：越界、空指针、除零、整数溢出、数据竞争\n- UB 的后果不可预测：可能当时正常，下次崩溃\n- 用工具（sanitizer、静态分析）来防御 UB\n\n下一课我们换个角度看 UB——它不只是"错误"，更是编译器的"自由"。',
    },
  ],
}

export default lesson
