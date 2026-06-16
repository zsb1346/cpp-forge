import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'sfinae-concept',
    chapter: 20,
    title: 'SFINAE',
    subtitle: '匹配失败不算错',
    description: 'Substitution Failure Is Not An Error——模板替换失败时静默跳过而不是编译报错。',
    objectives: ['能理解 SFINAE 的原理', '能识别 SFINAE 的应用场景'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**SFINAE**（Substitution Failure Is Not An Error）——模板参数替换失败时，编译器不会报错，只是把这个重载从候选集中移除。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 什么是「替换失败」？\n\n当你写了一个函数模板，编译器尝试用实参类型替换模板参数。\n如果替换导致非法的类型表达式（比如 `T::value` 但 `T` 没有 `value`），这不报错——只是当这个模板不存在。',
      code: 'template <typename T>\nauto foo(T t) -> decltype(t.someMethod()) {\n  t.someMethod();\n  return 0;\n}\n\n// 如果 T 没有 someMethod，这个模板被静默移除',
    },
    {
      type: 'exposition',
      text: '### 一个直观的例子\n\n不用 SFINAE 时——编译错误：',
      code: 'struct A { int x; };\nstruct B { int y; };\n\ntemplate <typename T>\nvoid print(typename T::type val) {\n  cout << val;\n}\n\nprint<A>(42);  // A 没有 type → 编译错误（无 SFINAE）',
    },
    {
      type: 'exposition',
      text: '### 有 SFINAE 的场景\n\n利用 SFINAE 区分有特定成员和没有的类：',
      code: 'template <typename T>\nauto hasSize(T& t) -> decltype(t.size(), true_type{}) {\n  return true_type{};\n}\n\ntemplate <typename T>\nfalse_type hasSize(...) {\n  return false_type{};\n}\n\n// vector 有 size → 第一个版本\n// int 没有 size → 第二个版本（SFINAE）',
    },
    {
      type: 'exposition',
      text: '### SFINAE 的核心规律\n\n- 替换失败只发生在模板实例化的**立即上下文**中\n- 函数体内部的错误是真正的编译错误\n- 「立即上下文」指：模板参数声明、函数参数类型、返回类型等',
    },
    {
      type: 'concept-cards',
      instruction: 'SFINAE 的关键概念：',
      cards: [
        { glyph: '🧩', term: 'SFINAE', meaning: '替换失败不是错误，静默跳过重载', example: '模板被忽略' },
        { glyph: '🔍', term: '立即上下文', meaning: '模板参数/返回类型中的错误才适用', example: '非函数体内部' },
        { glyph: '⚖️', term: '重载决议', meaning: '编译器选最佳匹配，失败的移除', example: '退而求其次' },
        { glyph: '🎯', term: 'decltype 探测', meaning: '用 decltype 检测成员是否存在', example: 'decltype(t.size())' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p12-02：函数模板是如何匹配类型的？',
      options: [
        { text: '运行时决定', correct: false, explanation: '模板匹配在编译时' },
        { text: '编译器从实参推导模板参数', correct: true, explanation: '编译器根据传入的实参类型推导 T' },
        { text: '手动指定所有类型', correct: false, explanation: '可以手动指定，但编译器也能自动推导' },
        { text: '链接器决定', correct: false, explanation: '链接器不参与模板参数推导' },
      ],
    },
    {
      type: 'exposition',
      text: '### 最常见的 SFINAE：enable_if\n\n`enable_if` 利用 SFINAE 条件化启用模板——下一课专门讲。',
      code: 'template <typename T,\n          typename = enable_if_t<is_integral_v<T>>>\nvoid process(T val) {\n  cout << "整数: " << val;\n}\n\n// 只有 T 是整数类型时这个模板才存在',
    },
    {
      type: 'multiple-choice',
      question: 'SFINAE 中什么情况会导致真正的编译错误？',
      options: [
        { text: '模板参数替换失败', correct: false, explanation: '替换失败触发 SFINAE，不是错误' },
        { text: '函数体内部的语法错误', correct: true, explanation: '函数体内部的错误是真正的编译错误' },
        { text: '返回类型推导失败', correct: false, explanation: '返回类型推导失败属于 SFINAE' },
        { text: '参数类型不合法', correct: false, explanation: '参数类型的非法替换也属于 SFINAE' },
      ],
    },
    {
      type: 'exposition',
      text: '### SFINAE 的历史地位\n\n在 C++20 引入 Concepts 之前，SFINAE 是实现模板约束的唯一手段。\n现代 C++ 更推荐用 `requires` 关键字（后面讲）。\n但大量现有代码仍在使用 SFINAE——必须能看懂它。',
    },
    {
      type: 'exposition',
      text: '### 更实际的例子：检测成员函数\n\n判断一个类是否有 `reserve` 方法：',
      code: 'template <typename T>\nstruct has_reserve {\nprivate:\n  template <typename U>\n  static auto check(int)\n    -> decltype(declval<U>().reserve(0U), true_type{});\n  \n  template <typename>\n  static false_type check(...);\n\npublic:\n  static constexpr bool value = \n    decltype(check<T>(0))::value;\n};',
    },
    {
      type: 'multiple-choice',
      question: 'SFINAE 名字中的「Substitution」指的是什么？',
      options: [
        { text: '运行时替换函数实现', correct: false, explanation: '替换发生在编译时' },
        { text: '用实参类型替换模板参数', correct: true, explanation: '编译器将模板参数 T 替换为实际类型' },
        { text: '替换头文件', correct: false, explanation: '和头文件无关' },
        { text: '替换变量值', correct: false, explanation: '不涉及变量值替换' },
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- SFINAE：替换失败不是错误，只是跳过\n- 发生在模板的「立即上下文」\n- 广泛用于条件启用模板、检测类型属性\n- C++20 后的 Concepts 是更好的替代方案',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课：enable_if——把 SFINAE 用在实际条件中。',
    },
    {
      type: 'type-it',
      instruction: '用 SFINAE 实现成员检测的完整示例：',
      code: 'template <typename T>\nauto detect(T t) -> decltype(t.size(), true_type{}) {\n  return true_type{};\n}\n\nfalse_type detect(...) {\n  return false_type{};\n}',
      hints: [
        'decltype 中的逗号表达式返回最后一个类型',
        '... 参数是兜底的重载',
        'vector 调用 detect 返回 true',
      ],
    },
    {
      type: 'exposition',
      text: '### SFINAE 和重载决议\n\n编译器在重载决议时会尝试所有候选模板。\n替换失败的模板被静默移除，然后在剩下的模板中选最佳匹配。\n如果有多个匹配且同样好 → 二义性错误。',
    },
    {
      type: 'multiple-choice',
      question: 'SFINAE 中「立即上下文」指什么？',
      options: [
        { text: '函数体内的代码', correct: false, explanation: '函数体内不是立即上下文' },
        { text: '模板参数、返回类型等声明区域', correct: true, explanation: '立即上下文包括模板参数、函数参数类型、返回类型等' },
        { text: '整个翻译单元', correct: false, explanation: '范围太大了' },
        { text: '预处理阶段', correct: false, explanation: 'SFINAE 是模板实例化阶段的概念' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 enable_if 和 SFINAE 实现 is_same 检测：',
      code: 'template <typename T, typename U>\nstruct is_same_type {\n  static constexpr bool value = false;\n};\n\ntemplate <typename T>\nstruct is_same_type<T, T> {\n  static constexpr bool value = true;\n};',
      hints: [
        '偏特化匹配两个类型相同的场景',
        '主模板处理类型不同的场景',
        '编译期常量 value 用于判断',
      ],
    },
  ],
}

export default lesson
