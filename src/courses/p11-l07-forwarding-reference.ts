import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'forwarding-reference',
    chapter: 12,
    title: '转发引用',
    subtitle: 'T&& 不是右值引用',
    description: 'T&& 在模板中不是右值引用而是转发引用（forwarding reference），可以同时绑定左值和右值。',
    objectives: ['能区分右值引用和转发引用', '能理解 T&& 的双重含义', '能在模板中使用转发引用保持参数属性'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前学的 `T&&` 是右值引用，只能绑右值。\n但在模板中，`T&&` 有另一种含义——**转发引用（forwarding reference）**，\n它可以同时绑定左值和右值。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '两条规则：\n1. **非模板**中的 `T&&` → 右值引用（只能绑右值）\n2. **模板推导**中的 `T&&` → 转发引用（左右值都能绑）',
      code: '// 情况 1：非模板——右值引用\nvoid foo(int&& x);  // 只能接收右值\n\n// 情况 2：模板——转发引用\ntemplate<typename T>\nvoid bar(T&& x);    // 左右值都能接收',
    },
    {
      type: 'exposition',
      text: '转发引用的核心机制：**T 的推导结果取决于传入的参数**。\n- 传左值 → `T` 推导为 `T&` → `T& &&` 折叠为 `T&`\n- 传右值 → `T` 推导为 `T` → `T&&`',
      code: 'int a = 10;\nbar(a);   // T 推导为 int& → 参数类型是 int&\nbar(20);  // T 推导为 int  → 参数类型是 int&&',
    },
    {
      type: 'concept-cards',
      instruction: '转发引用 vs 右值引用：',
      cards: [
        { glyph: '🔗🔗', term: '右值引用 T&&', meaning: '非模板中，只能绑右值', example: 'void f(int&&);' },
        { glyph: '🔄', term: '转发引用 T&&', meaning: '模板推导中，左右皆可绑', example: 'template<typename T> void f(T&&);' },
        { glyph: '📐', term: 'T 的推导', meaning: '传左值 T 变 T&，传右值 T 不变', example: 'T&& 经过引用折叠' },
      ],
    },
    {
      type: 'exposition',
      text: '一个判断技巧：\n**转发引用必须同时满足**：\n1. 是模板（`template<typename T>`）\n2. 参数形式为 `T&&`\n3. T 由实参推导（不是调用方指定）',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是转发引用？',
      options: [
        { text: 'void func(int&& x)', correct: false, explanation: '非模板，不是转发引用，是普通的右值引用' },
        { text: 'template<typename T> void func(T&& x)', correct: true, explanation: '模板推导中的 T&& 是转发引用' },
        { text: 'template<typename T> void func(const T&& x)', correct: false, explanation: 'const T&& 是右值引用，不能绑左值' },
        { text: 'template<typename T> void func(T& x)', correct: false, explanation: 'T& 是普通的左值引用' },
      ],
    },
    {
      type: 'exposition',
      text: '转发引用在 auto 中也会出现：',
      code: 'int a = 10;\nauto&& x = a;   // auto 推导为 int& → x 是 int&\nauto&& y = 20;  // auto 推导为 int  → y 是 int&&',
    },
    {
      type: 'exposition',
      text: '`decltype` 中也会出现类似的转发引用行为：',
      code: 'int a = 10;\ndecltype(auto)&& r = a;   // 转发引用行为',
    },
    {
      type: 'exposition',
      text: '转发引用配合 `std::is_same` 验证类型：',
      code: 'template<typename T>\nvoid check(T&& x) {\n  if constexpr (is_same_v<T, int>) {\n    cout << "传了右值\\n";\n  } else {\n    cout << "传了左值\\n";\n  }\n}\n\nint a = 10;\ncheck(a);   // 传了左值\ncheck(20);  // 传了右值',
    },
    {
      type: 'concept-cards',
      instruction: '转发引用的类型推导规则：',
      cards: [
        { glyph: '⬅️', term: '传左值 int&', meaning: 'T 推导为 int&', example: 'T&& → int& && → int&' },
        { glyph: '➡️', term: '传右值 int', meaning: 'T 推导为 int', example: 'T&& → int&&' },
        { glyph: '📌', term: '传 const 左值', meaning: 'T 推导为 const int&', example: 'T&& → const int&' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：普通传参 `void wrapper(T x)` 调用 `wrapper(42)` 时，\n内部 `x` 是什么？',
      options: [
        { text: '右值', correct: false, explanation: 'x 有名字，在函数内部是左值' },
        { text: '左值', correct: true, explanation: '任何有名字的参数都是左值' },
        { text: '取决于调用方', correct: false, explanation: '调用方传的是右值，但内部参数名使其变左值' },
        { text: '转发引用', correct: false, explanation: '这不是转发引用，是传值' },
      ],
    },
    {
      type: 'exposition',
      text: '转发引用的"直觉理解"：\n`T&&` 就像一面镜子——它**反映**传入值的左右值属性。\n传左值它就变左值引用，传右值它就变右值引用。',
    },
    {
      type: 'exposition',
      text: '**重要区分**：\n转发引用虽然可以绑左值，但它不等同于 `const T&`。\n`const T&` 丢失了可修改性，而转发引用保留了 const 属性。',
      code: 'template<typename T>\nvoid f(T&& x) {\n  x = 10;  // 如果传 const int，会编译失败\n}\n\nconst int a = 5;\n// f(a);  // ❌ T 推导为 const int&，不能修改 a',
    },
    {
      type: 'exposition',
      text: '记住这个区分公式：\n- 非模板 `int&&` = **右值引用**\n- 模板 `T&&` = **转发引用**（在模板推导中）\n- `auto&&` = **转发引用**行为',
    },
    {
      type: 'exposition',
      text: '转发引用的意义：\n它为**完美转发**提供了语言基础。\n配合下一课的 `std::forward`，就能准确保持左右值属性转发给下一个函数。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '验证转发引用的类型推导：',
      code: 'template<typename T>\nvoid deduce(T&&) {\n  cout << boolalpha;\n  cout << "是左值引用? " << is_lvalue_reference_v<T> << "\\n";\n  cout << "是右值引用? " << is_rvalue_reference_v<T> << "\\n";\n}\n\nint a = 10;\ndeduce(a);   // T = int&  → 左值引用\ndeduce(20);  // T = int   → 都不是（值类型）',
    },
    {
      type: 'exposition',
      text: '转发引用有时也叫"万能引用（universal reference）"，\n但标准术语是**转发引用**。\n记住它只出现在类型推导上下文。',
    },
    {
      type: 'exposition',
      text: '练习：判断下面函数哪个是转发引用：',
      code: 'void f1(int&& x);                         // ❌ 右值引用\nvoid f2(const int&& x);                   // ❌ const 右值引用\ntemplate<typename T> void f3(T&& x);      // ✅ 转发引用\ntemplate<typename T> void f4(T& x);       // ❌ 左值引用\nauto&& x = expr;                          // ✅ 转发引用行为',
    },
  ],
}

export default lesson
