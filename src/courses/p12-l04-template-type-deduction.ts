import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'template-type-deduction',
    chapter: 13,
    title: '类型推导',
    subtitle: '不写 <int> 也可以',
    description: '掌握编译器如何从函数参数自动推导模板类型参数，以及推导的规则和边界。',
    objectives: ['能解释编译器如何推导模板类型', '能区分自动推导和显式指定的场景', '能识别推导失败的情况'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '调用模板函数时，你可以不写 `<int>`——编译器会从参数自动推导出 T。\n这叫**模板类型推导**（template type deduction）。',
      code: 'template<typename T>\nT max(T a, T b) { return a > b ? a : b; }\n\nint main() {\n  max(3, 7);       // 自动推导 T = int\n  max(1.5, 2.5);   // 自动推导 T = double\n  max(\'a\', \'z\');   // 自动推导 T = char\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '推导规则很简单：**编译器看参数的类型，推断 T 等于什么**。\n- `max(3, 7)` → 两个 int → T = int\n- `max(3.14, 2.71)` → 两个 double → T = double\n- `max(\'a\', \'z\')` → 两个 char → T = char',
    },
    {
      type: 'type-it',
      instruction: '输入调用模板函数的代码，体验类型推导：',
      code: 'cout << max(10, 20) << endl;\ncout << max(3.14, 2.71) << endl;\ncout << max(\'X\', \'A\') << endl;',
      hints: [
        '10 和 20 是 int，T 推导为 int',
        '3.14 和 2.71 是 double，T 推导为 double',
        '\'X\' 和 \'A\' 是 char，T 推导为 char',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：显式指定模板参数怎么写？',
      options: [
        { text: 'max<int>(10, 20)', correct: true, explanation: '在函数名后尖括号中指定类型' },
        { text: 'max(10<int>, 20<int>)', correct: false, explanation: '不是这种语法' },
        { text: 'int max(10, 20)', correct: false, explanation: '这不是模板调用语法' },
        { text: 'max(10, 20).int()', correct: false, explanation: '不存在这种语法' },
      ],
    },
    {
      type: 'exposition',
      text: '**推导失败的常见情况**：参数类型不一致。\n`max(3, 3.14)` → 一个是 int 一个是 double → T 不知道推导成谁 → 编译错误。',
      code: 'max(3, 3.14);  // 错误！T 无法确定是 int 还是 double\nmax<double>(3, 3.14);  // 正确！显式指定 T = double，3 自动转换',
    },
    {
      type: 'exposition',
      text: '两个解决方法：\n1. 显式指定类型：`max<double>(3, 3.14)`\n2. 让两个参数类型一致：`max(3.0, 3.14)`（都改成 double）',
    },
    {
      type: 'type-it',
      instruction: '参数类型不一致时的处理方法：',
      code: 'double result = max<double>(3, 3.14);',
      hints: [
        '显式指定 T = double 后，int 的 3 自动转为 double',
        '这样推导错误就被绕过了',
        '或者把 3 改成 3.0 也能解决',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`max(3, 3.14)` 为什么编译错误？',
      options: [
        { text: '因为 int 和 double 不能比较', correct: false, explanation: 'int 和 double 可以比较' },
        { text: '因为 T 只能是一种类型，但参数给了两种', correct: true, explanation: '编译器推导不出 T 是 int 还是 double' },
        { text: '因为 max 参数必须是相同的类型', correct: false, explanation: '模板要求 T 一致，但这正是推导失败的原因' },
        { text: '因为 3.14 不是字面量', correct: false, explanation: '3.14 是合法的 double 字面量' },
      ],
    },
    {
      type: 'exposition',
      text: '推导还适用于引用和 const：\n- `const T&` 参数时，传 `int x` 推导出 `T = int`\n- `T&` 参数时，传 `int x` 推导出 `T = int`\n推导会根据参数声明调整规则。',
      code: 'template<typename T>\nvoid refFunc(const T& x);\n\nint a = 5;\nrefFunc(a);  // T = int, 参数实际是 const int&',
    },
    {
      type: 'type-it',
      instruction: '使用 const 引用参数的模板函数：',
      code: 'template<typename T>\nvoid show(const T& val) {\n  cout << val << endl;\n}',
      hints: [
        'const T& 保证不拷贝、不修改',
        '调用 show(42) 推导 T = int',
        '调用 show(3.14) 推导 T = double',
      ],
    },
    {
      type: 'concept-cards',
      instruction: '类型推导规则速记：',
      cards: [
        { glyph: '🔍', term: '同类型参数', meaning: '参数类型一致，T 自动推导', example: 'max(1,2) → T=int' },
        { glyph: '⚠️', term: '混搭类型', meaning: '参数类型不同，推导失败', example: 'max(1, 2.5) → 编译错误' },
        { glyph: '✋', term: '显式指定', meaning: '<int> 手动告诉编译器 T 的类型', example: 'max<int>(1, 2.5)' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p05-11：C++ 中什么时候需要类型转换？',
      options: [
        { text: '赋值时类型不匹配', correct: true, explanation: '类型不匹配时编译器可能自动转换或报错' },
        { text: '函数调用时不需要转换', correct: false, explanation: '函数调用时也会发生隐式或显式转换' },
        { text: '只有在用户手动要求时才转', correct: false, explanation: '很多隐式转换是自动发生的' },
        { text: 'C++ 不允许类型转换', correct: false, explanation: 'C++ 支持多种类型转换' },
      ],
    },
    {
      type: 'exposition',
      text: '推导的另一个规则：**数组和函数会退化为指针**。\n`T` 推导数组时，T 会变成指针类型。这被认为是"坑"之一，但了解即可。',
      code: 'template<typename T>\nvoid func(T x);\n\nint arr[5];\nfunc(arr);  // T 推导为 int*, 不是 int[5]',
    },
    {
      type: 'type-it',
      instruction: '输入一个使用数组推导的例子：',
      code: 'template<typename T>\nvoid printSize(T x) {\n  cout << sizeof(x) << endl;\n}',
      hints: [
        '给 printSize 传数组，T 会被推导为指针',
        'sizeof(指针) 和 sizeof(数组) 结果不同',
        '这是模板推导的一个知名陷阱',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况适合使用显式模板参数？',
      options: [
        { text: '两个参数类型相同时', correct: false, explanation: '类型相同时自动推导就足够了' },
        { text: '两个参数类型不同时', correct: true, explanation: '类型不同时需要显式指定来消除歧义' },
        { text: '参数是字符串时', correct: false, explanation: '字符串类型也能自动推导' },
        { text: '参数是 void 时', correct: false, explanation: 'void 不能作为模板参数' },
      ],
    },
    {
      type: 'exposition',
      text: '推导让模板用起来像普通函数一样自然——你不需要记住类型，编译器帮你搞定。\n但当推导失败时，显式指定 `<类型>` 就是你的"急救工具"。',
    },
    {
      type: 'type-it',
      instruction: '写一个混合使用推导和显式指定的 main 函数：',
      code: 'int main() {\n  cout << max(1, 2) << endl;          // 自动推导\n  cout << max<double>(1, 2.5) << endl; // 显式指定\n  return 0;\n}',
      hints: [
        'max(1, 2) 自动推导为 int',
        'max<double>(1, 2.5) 显式指定为 double',
        'int 的 1 被自动转换为 double',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：模板实例化在什么时候发生？',
      options: [
        { text: '运行时', correct: false, explanation: '实例化在编译期发生' },
        { text: '编译期', correct: true, explanation: '编译器在编译期根据调用生成代码' },
        { text: '链接期', correct: false, explanation: '链接时已经没有模板信息了' },
        { text: '编译和运行时各一次', correct: false, explanation: '只发生在编译期' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：类型推导让你写模板像写普通函数一样自然。\n记住：能推导时自动搞定，推导失败时用 `<>` 显式指定。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
