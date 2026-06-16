import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'reference-collapsing',
    chapter: 12,
    title: '引用折叠',
    subtitle: '&+&=&, &&+&&=&&',
    description: '引用折叠的四条规则——C++ 不允许引用的引用，但通过折叠规则在模板中正确推导类型。',
    objectives: ['能列出四类引用折叠的结果', '能推导任意引用组合的折叠结果', '能理解折叠与转发引用的关系'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'C++ 禁止"引用的引用"：`int& &` 是不合法的。\n但在模板推导中，这种情况却可能出现——\n**引用折叠规则**解决了这个矛盾。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '引用折叠的四条规则：\n1. `T& &` → `T&`\n2. `T& &&` → `T&`\n3. `T&& &` → `T&`\n4. `T&& &&` → `T&&`',
    },
    {
      type: 'exposition',
      text: '简单记忆：**只要有一个 & 就是 &，两个 && 才是 &&**。',
      code: '// 记忆口诀：& 是"实"，&& 是"空"\n// 有"实"就折成 &，全"空"才折成 &&\n\nT& &    → T&    // 实+实 = 实\nT& &&   → T&    // 实+空 = 实\nT&& &   → T&    // 空+实 = 实\nT&& &&  → T&&   // 空+空 = 空',
    },
    {
      type: 'concept-cards',
      instruction: '引用折叠四规则速记：',
      cards: [
        { glyph: '➕', term: 'T& + & = T&', meaning: '左值+左值=左值', example: 'int& & → int&' },
        { glyph: '➕', term: 'T& + && = T&', meaning: '左值+右值=左值', example: 'int& && → int&' },
        { glyph: '➕', term: 'T&& + & = T&', meaning: '右值+左值=左值', example: 'int&& & → int&' },
        { glyph: '➕', term: 'T&& + && = T&&', meaning: '右值+右值=右值', example: 'int&& && → int&&' },
      ],
    },
    {
      type: 'exposition',
      text: '引用折叠和转发引用的关系：\n转发引用 `T&&` 能同时绑左右值，**背后的机制就是引用折叠**。',
      code: 'template<typename T>\nvoid bar(T&& x);\n\nint a = 10;\nbar(a);  // T = int& → T&& = int& && = int&  → 左值引用\nbar(5);  // T = int  → T&& = int&&           → 右值引用',
    },
    {
      type: 'exposition',
      text: '展开推导过程：',
      code: '// 传左值 a 时：\ntemplate<typename T>\nvoid bar(T&& x);\n// T = int&\n// T&& = int& && → 折叠为 int&\n// bar 的参数是 int&，能绑左值\n\n// 传右值 5 时：\ntemplate<typename T>\nvoid bar(T&& x);\n// T = int\n// T&& = int&&\n// bar 的参数是 int&&，能绑右值',
    },
    {
      type: 'multiple-choice',
      question: '`int&& &&` 折叠后是什么？',
      options: [
        { text: 'int&', correct: false, explanation: '两个 && 折叠成 &&，不是 &' },
        { text: 'int&&', correct: true, explanation: '两个都是右值引用，折叠后还是右值引用' },
        { text: 'int', correct: false, explanation: '折叠不会去掉引用' },
        { text: '编译错误', correct: false, explanation: '虽然直接写不行，但模板推导中通过折叠合法' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '引用折叠在转发引用中的效果：',
      cards: [
        { glyph: '⬅️', term: '传左值 int&', meaning: 'T = int& → T&& = int& && → int&', example: 'bar(a)' },
        { glyph: '➡️', term: '传右值 int', meaning: 'T = int → T&& = int&&', example: 'bar(5)' },
        { glyph: '📌', term: '传 const int&', meaning: 'T = const int& → const int& && → const int&', example: 'bar(c)' },
      ],
    },
    {
      type: 'exposition',
      text: '`std::forward` 的实现依赖引用折叠：',
      code: 'template<typename T>\nT&& forward(remove_reference_t<T>& x) noexcept {\n  return static_cast<T&&>(x);\n}\n\n// 当 T = int&:\n// T&& = int& && → int&  → 返回左值引用\n// 当 T = int:\n// T&& = int&&            → 返回右值引用',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：`std::forward<T>(x)` 中如果 T = int&，返回的是什么？',
      options: [
        { text: 'int&&', correct: false, explanation: 'T = int& 时，T&& = int& && → int&' },
        { text: 'int&', correct: true, explanation: '通过引用折叠得到 int&，转发为左值' },
        { text: 'int', correct: false, explanation: '返回引用类型，不是值类型' },
        { text: 'const int&', correct: false, explanation: 'T 是 int& 没有 const' },
      ],
    },
    {
      type: 'exposition',
      text: '引用折叠也出现在 `decltype` 中：',
      code: 'int a = 10;\nint& r = a;\ndecltype(r)&& x = a;  // int& && → int& → 左值引用\n\nint&& rr = 20;\ndecltype(rr)&& y = 30; // int&& && → int&& → 右值引用',
    },
    {
      type: 'exposition',
      text: '**引用折叠只在"类型推导"上下文中发生**，不能直接在代码中写 `int& &`。\n编译器只有在模板、auto、decltype 等推导场景下才会应用折叠。',
    },
    {
      type: 'exposition',
      text: '理解引用折叠有助于：\n1. 读懂模板代码\n2. 自己写泛型库\n3. 理解 std::forward 和 std::move 的实现\n4. 调试模板编译错误',
    },
    {
      type: 'exposition',
      text: '引用折叠总结：\n- 四条规则：有 & 就是 &，全 && 才是 &&\n- 引用折叠是转发引用的底层机制\n- 只出现在类型推导上下文中\n- 理解它才能真正掌握完美转发',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '`T& &&` 折叠结果是什么？',
      options: [
        { text: 'T&', correct: true, explanation: '只要有 & 参与，结果就是 &' },
        { text: 'T&&', correct: false, explanation: '两个 && 才是 &&，这里有一个 &' },
        { text: 'T', correct: false, explanation: '折叠不会去掉引用符' },
        { text: '编译错误', correct: false, explanation: '模板推导中允许引用折叠' },
      ],
    },
    {
      type: 'exposition',
      text: '记住一句话：\n**引用折叠就是——有一个左值引用掺和，结果就是左值引用。**',
    },
    {
      type: 'exposition',
      text: '引用折叠在 `auto&&` 中同样适用：',
      code: 'int a = 10;\nauto&& r1 = a;   // auto = int&  → int& && → int&\nauto&& r2 = 20;  // auto = int   → int&&',
    },
    {
      type: 'exposition',
      text: '引用折叠常见误区：\n**`T&&` 不是右值引用就是转发引用？**\n是的，关键看 T 是否由模板推导。\n非推导上下文（如类模板特化后）是右值引用。',
    },
    {
      type: 'exposition',
      text: '引用折叠是 C++ 模板元编程的基础机制之一，\n理解它就能看懂 STL 中很多"魔法"代码。',
    },
  ],
}

export default lesson
