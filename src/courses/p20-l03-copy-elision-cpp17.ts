import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'copy-elision-cpp17',
    chapter: 21,
    title: '拷贝消除',
    subtitle: 'C++17 保证不拷贝',
    description: '学习 C++17 标准中保证的拷贝消除场景——编译器必须省略拷贝，不再是可选优化。',
    objectives: ['能说出 C++17 保证拷贝消除的场景', '能区分保证消除和可选优化的区别', '能理解保证消除对代码设计的影响'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上节课我们学了 RVO/NRVO——编译器"可能"帮你省略拷贝。\n但从 **C++17 开始，在某些场景下，拷贝消除不再是"可能"，\n而是"必须"**。这就是"保证的拷贝消除"（Guaranteed Copy Elision）。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'C++17 之前：\n`MyObj x = MyObj();`\n理论上有两次构造 + 一次拷贝，编译器可以优化掉拷贝。\n\nC++17 之后：\n`MyObj x = MyObj();`\n**只有一次构造**，拷贝被"保证消除"——无论编译器设置如何。',
    },
    {
      type: 'concept-cards',
      instruction: 'C++17 保证的拷贝消除：',
      cards: [
        { glyph: '✅', term: '临时对象初始化', meaning: '用临时对象初始化变量时保证消除拷贝', example: 'MyObj x = MyObj();' },
        { glyph: '✅', term: '函数返回临时对象', meaning: 'return T() 保证消除拷贝', example: 'MyObj f() { return MyObj(); }' },
        { glyph: '❌', term: '返回局部变量（NRVO）', meaning: 'C++17 仍不保证 NRVO，它仍是可选优化', example: 'return obj; （不保证）' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'C++17 保证拷贝消除和之前的 RVO 有什么关键区别？',
      options: [
        { text: 'C++17 强制编译器执行，以前只是允许', correct: true, explanation: '保证消除 = 标准要求，不是"可能做到"' },
        { text: 'C++17 完全禁止了所有拷贝操作', correct: false, explanation: '只是特定场景保证消除，不是完全禁止' },
        { text: '之前的 RVO 也同样是强制性的', correct: false, explanation: 'C++17 之前的 RVO 是可选的' },
        { text: 'C++17 只对移动操作做消除', correct: false, explanation: '保证消除针对拷贝/移动构造' },
      ],
    },
    {
      type: 'exposition',
      text: '**保证消除的核心条件**：\n当初始化表达式的值类型（value category）是**纯右值（prvalue）** 时，\n编译器必须直接在目标位置构造对象，不经过拷贝或移动。\n\n简单理解：当你写 `T x = T(...)` ，右边的 `T(...)` \n是纯右值，编译器强制在 x 的位置构造。',
    },
    {
      type: 'exposition',
      text: '**这有什么实际意义**？\n即使拷贝构造函数是 `delete` 的，以下代码在 C++17 也能编译：\n`MyObj x = MyObj();`\n\n在 C++14 中，即使优化掉了拷贝，理论上也需要拷贝构造函数可用。\nC++17 不再需要——因为标准**保证**不会有拷贝。',
      code: 'struct MyObj {\n  MyObj() {}\n  MyObj(const MyObj&) = delete;  // 禁止拷贝\n};\n\n// C++17 可以编译：\nMyObj x = MyObj();  // 保证消除拷贝',
    },
    {
      type: 'type-it',
      instruction: '输入一个 C++17 保证拷贝消除的例子：',
      code: '#include <iostream>\nusing namespace std;\n\nstruct MyObj {\n  MyObj() { cout << "构造\\n"; }\n  MyObj(const MyObj&) = delete;\n};\n\nint main() {\n  MyObj x = MyObj();  // C++17 保证消除拷贝\n  cout << "成功\\n";\n}',
      hints: [
        '拷贝构造函数被 delete 了',
        '但在 C++17 可以编译通过',
        '因为编译器保证不调用拷贝构造函数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况在 C++17 被**保证**消除拷贝？',
      options: [
        { text: '`return obj;` 其中 obj 是局部变量', correct: false, explanation: 'NRVO 在 C++17 仍然是可选优化' },
        { text: '`MyObj x = MyObj(42);`', correct: true, explanation: '纯右值初始化，保证消除拷贝' },
        { text: '`auto x = f();` 且 f 返回 MyObj', correct: false, explanation: '取决于 f 的实现，return 语句是否保证消除' },
        { text: '`MyObj x = y;` 其中 y 是左值', correct: false, explanation: '左值初始化不会触发保证消除' },
      ],
    },
    {
      type: 'exposition',
      text: '**保证拷贝消除对设计的影响**：\n以前为了绕过拷贝构造函数，常用"输出参数"模式：\n`void f(MyObj& out);`\n现在可以直接返回值：\n`MyObj f();`——C++17 确保没有拷贝。\n\n这让代码更自然、更安全。',
    },
    {
      type: 'exposition',
      text: '还有一个重要场景：**throw 和 catch**。\nC++17 也保证：`throw MyObj();` 和 `catch (MyObj e)` 的拷贝消除。\n异常对象的传递过程也享受保证了。',
      code: 'void f() {\n  throw MyObj();  // 保证消除拷贝\n}\n\nint main() {\n  try {\n    f();\n  } catch (MyObj e) {  // 保证消除拷贝\n    // ...\n  }\n}',
    },
    {
      type: 'multiple-choice',
      question: '回顾 RVO/NRVO：为什么 C++17 还要保留 NRVO 为可选优化？',
      options: [
        { text: '因为 NRVO 的实现太复杂，标准无法保证', correct: true, explanation: 'NRVO 涉及控制流分析，编译器各有不同' },
        { text: '因为 NRVO 不重要', correct: false, explanation: 'NRVO 非常重要，但实现复杂' },
        { text: '因为 C++17 废弃了 NRVO', correct: false, explanation: 'NRVO 仍然有效，只是不保证' },
        { text: '因为 NRVO 已经被移动语义替代', correct: false, explanation: '移动语义是后备，不是替代' },
      ],
    },
    {
      type: 'exposition',
      text: '**区分三种概念**：\n1. RVO（可选优化）——返回临时对象\n2. NRVO（可选优化）——返回有名字的局部变量\n3. 保证拷贝消除（C++17 强制）——纯右值初始化\n\n它们都是"拷贝消除"（Copy Elision）的不同形式。',
    },
    {
      type: 'multiple-choice',
      question: '以下关于拷贝消除的说法，哪个**正确**？',
      options: [
        { text: 'C++17 保证所有 return 语句的拷贝消除', correct: false, explanation: '只保证纯右值场景，NRVO 不保证' },
        { text: '拷贝消除的目的是避免不必要的拷贝构造函数调用', correct: true, explanation: '这就是拷贝消除的核心目的' },
        { text: '拷贝消除只在 Debug 模式下生效', correct: false, explanation: 'Debug 模式通常禁用优化' },
        { text: '拷贝消除不影响程序的任何行为', correct: false, explanation: '拷贝构造函数的副作用不会被观察到' },
      ],
    },
    {
      type: 'exposition',
      text: '**实际中的代码变化**：\nC++17 后，你可以写出更自然的工厂函数：\n\n`MyObj makeMyObj(int x) { return MyObj(x, "data"); }`\n\n调用者：`auto obj = makeMyObj(42);`\n\n无需担心拷贝——编译器保证没有。',
    },
    {
      type: 'type-it',
      instruction: '输入一个 C++17 保证消除的工厂函数：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct MyObj {\n  int id;\n  string name;\n  MyObj(int i, string n) : id(i), name(n) {}\n};\n\nMyObj create(int id) {\n  return MyObj(id, "default");  // C++17 保证消除\n}\n\nint main() {\n  auto obj = create(42);  // 没有拷贝\n  cout << obj.id << " " << obj.name;\n}',
      hints: [
        'return MyObj(...) 是纯右值',
        'C++17 保证在调用方直接构造',
        '不需要引用或指针来避免拷贝',
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习：C++17 保证拷贝消除对哪些场景**不适用**？',
      options: [
        { text: '`return MyObj(args...)` 作为函数返回值', correct: false, explanation: '这是保证消除的场景' },
        { text: '`MyObj x = MyObj(args...)` 变量初始化', correct: false, explanation: '这是保证消除的场景' },
        { text: '`throw MyObj(args...)` 抛出异常', correct: false, explanation: '这也是保证消除的场景' },
        { text: '`MyObj x = someFunction();` 函数返回局部变量', correct: true, explanation: '如果函数返回局部变量，NRVO 是可选消除' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- C++17 带来了"保证的拷贝消除"\n- 纯右值初始化场景不再需要可访问的拷贝/移动构造函数\n- 这让值语义编程更自然、更安全\n- NRVO 仍然是可选优化（编译器可以自由选择）\n\n下一课进入 Type Erasure 的世界。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
