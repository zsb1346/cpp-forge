import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'static-assert',
    chapter: 16,
    title: 'static_assert 编译期断言',
    subtitle: '不满足就编译失败',
    description: '学习用 static_assert 在编译期检查条件，提前发现错误。',
    objectives: ['能用 static_assert 做编译期断言', '理解编译期断言和运行时断言的区别', '能在模板中利用 static_assert 做约束'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`static_assert` 是 C++11 引入的编译期断言：\n**如果条件不满足，编译直接失败**。\n在编译期就发现错误，比运行时检查更早、更安全。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '基本语法：\n`static_assert(常量表达式, "错误信息");`\n条件必须是编译期能确定的常量表达式。\n条件为 false 时，编译器输出错误信息并停止编译。',
      code: 'static_assert(sizeof(int) == 4, "int 必须是 4 字节");\n\nconstexpr int SIZE = 100;\nstatic_assert(SIZE > 0, "SIZE 必须大于 0");\n\n// ✅ 编译通过：所有条件都满足',
    },
    {
      type: 'type-it',
      instruction: '用 static_assert 检查类型大小：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  static_assert(sizeof(int) >= 2, "int 至少 2 字节");\n  static_assert(sizeof(double) == 8, "double 必须是 8 字节");\n  cout << "所有断言通过！" << endl;\n}',
      hints: [
        'static_assert 在编译期检查',
        'sizeof 是编译期运算符',
        '条件为 false 时编译失败',
      ],
    },
    {
      type: 'exposition',
      text: '和运行时 `assert` 的区别：\n| 特性 | static_assert | assert |\n|------|--------------|--------|\n| 时机 | 编译期 | 运行时 |\n| 开销 | 0 开销 | 有运行时开销 |\n| 错误 | 编译失败 | 运行时崩溃 |\n| 条件 | 必须编译期常量 | 编译期/运行时都可 |',
    },
    {
      type: 'type-it',
      instruction: '用 static_assert 验证常量值：',
      code: '#include <iostream>\nusing namespace std;\n\nconstexpr int MAX_USERS = 1000;\n\nint main() {\n  static_assert(MAX_USERS > 0, "用户数必须大于 0");\n  static_assert(MAX_USERS <= 10000, "用户数不能超过 10000");\n  cout << "配置检查通过：MAX_USERS = " << MAX_USERS << endl;\n}',
      hints: [
        'static_assert 检查 constexpr 常量',
        '所有条件满足才编译通过',
        '如果 MAX_USERS 改为负数，编译失败',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-05：constexpr 和 const 的主要区别是什么？',
      options: [
        { text: 'constexpr 保证编译期值', correct: true, explanation: 'constexpr 要求在编译期确定，const 不要求' },
        { text: 'const 更严格', correct: false, explanation: 'constexpr 更严格' },
        { text: '没有区别', correct: false, explanation: '有本质区别' },
        { text: 'constexpr 只能在类中使用', correct: false, explanation: 'constexpr 可以用在任何地方' },
      ],
    },
    {
      type: 'exposition',
      text: '`static_assert` 最常见的用途——**模板约束**：\n检查模板参数是否满足某些条件。\n结合 `<type_traits>` 使用特别强大。',
      code: '#include <type_traits>\n\ntemplate<typename T>\nT divide(T a, T b) {\n  static_assert(is_integral_v<T>, "T 必须是整数类型");\n  static_assert(b != 0, "除数不能为 0");\n  return a / b;\n}',
    },
    {
      type: 'type-it',
      instruction: '用 static_assert 约束模板参数：',
      code: '#include <iostream>\n#include <type_traits>\nusing namespace std;\n\ntemplate<typename T>\nT sum(T a, T b) {\n  static_assert(is_arithmetic_v<T>, "T 必须是算术类型");\n  return a + b;\n}\n\nint main() {\n  cout << sum(3, 4) << endl;\n  cout << sum(2.5, 1.5) << endl;\n}',
      hints: [
        'is_arithmetic_v 检查 T 是否是算术类型',
        'int 和 double 都满足条件',
        '如果传 string 会编译失败',
      ],
    },
    {
      type: 'exposition',
      text: 'C++17 起 `static_assert` 可以省略第二个参数（错误信息）：\n`static_assert(条件);`\n不过建议还是加上清晰的错误信息，方便排查。',
      code: '// C++17 可以省略错误信息\nstatic_assert(sizeof(int) == 4);\n\n// 但带信息更友好\nstatic_assert(sizeof(long) >= 8, "long 需要至少 8 字节");',
    },
    {
      type: 'type-it',
      instruction: 'C++17 省略错误信息的用法：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  static_assert(2024 >= 2020);\n  static_assert(sizeof(char) == 1);\n  cout << "所有编译期检查通过" << endl;\n}',
      hints: [
        'static_assert 可以省略错误信息字符串',
        '条件必须是在编译期已知的 bool 值',
        '所有条件满足才编译通过',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'static_assert 可以在以下哪个位置使用？',
      options: [
        { text: '只能在函数体内', correct: false, explanation: '可以放在命名空间、类、函数等任何地方' },
        { text: '任何可以写声明的地方', correct: true, explanation: 'static_assert 是声明语句，几乎所有作用域都能用' },
        { text: '只能在类定义中', correct: false, explanation: '全局和函数内都可以' },
        { text: '只能在模板中', correct: false, explanation: '不限于模板' },
      ],
    },
    {
      type: 'exposition',
      text: '实战场景：**检查平台特性**。\n不同平台上 int 的大小可能不同，\n用 static_assert 确保你的假设成立。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  static_assert(sizeof(int) == 4, "此代码需要 32 位 int");\n  static_assert(sizeof(void*) == 8, "此代码需要 64 位系统");\n  static_assert(CHAR_BIT == 8, "此代码需要一个字节 8 位");\n  cout << "平台检查通过" << endl;\n}',
    },
    {
      type: 'type-it',
      instruction: '在全局作用域使用 static_assert：',
      code: '#include <iostream>\nusing namespace std;\n\nstatic_assert(1 + 1 == 2, "数学基本定律不成立");\n\nconstexpr int MIN_VALUE = 0;\n\nint main() {\n  static_assert(MIN_VALUE >= 0, "最小值不能为负");\n  cout << "所有断言通过" << endl;\n}',
      hints: [
        'static_assert 可以在全局作用域',
        'constexpr 常量和 static_assert 是绝配',
        '全局的断言在 main 之前就执行了',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是 static_assert 的正确用法？',
      options: [
        { text: 'static_assert(x > 0) 其中 x 是运行时变量', correct: false, explanation: 'static_assert 条件必须是编译期常量' },
        { text: 'static_assert(sizeof(int) > 0, "ok")', correct: true, explanation: 'sizeof 是编译期运算符，可以用' },
        { text: 'static_assert("hello")', correct: false, explanation: '条件必须是 bool 值' },
        { text: 'static_assert(0)', correct: false, explanation: '0 会编译失败，但语法没错' },
      ],
    },
    {
      type: 'exposition',
      text: '`static_assert` + `<type_traits>` 更复杂的模板约束：',
      code: '#include <type_traits>\n\ntemplate<typename T>\nclass Container {\n  static_assert(is_default_constructible_v<T>,\n    "Container 的元素必须可默认构造");\n  static_assert(is_copy_constructible_v<T>,\n    "Container 的元素必须可拷贝构造");\n  // ...\n};',
    },
    {
      type: 'type-it',
      instruction: '用 static_assert 约束类型必须可拷贝：',
      code: '#include <iostream>\n#include <type_traits>\nusing namespace std;\n\ntemplate<typename T>\nvoid mustBeCopyable(T a) {\n  static_assert(is_copy_constructible_v<T>,\n    "类型必须可拷贝构造");\n  T b = a;\n  cout << b << endl;\n}\n\nint main() {\n  mustBeCopyable(42);\n  mustBeCopyable(3.14);\n}',
      hints: [
        'is_copy_constructible_v 检查是否可拷贝',
        'int 和 double 都可拷贝，编译通过',
        '如果用 unique_ptr 作参数会编译失败',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-05：if constexpr 和 static_assert 的关系是什么？',
      options: [
        { text: 'if constexpr 是运行时，static_assert 是编译期', correct: false, explanation: '两者都是编译期的' },
        { text: 'if constexpr 选择分支，static_assert 检查条件', correct: true, explanation: '两者是不同的编译期工具，用途不同' },
        { text: '两者完全等价', correct: false, explanation: '用途不同' },
        { text: 'static_assert 是 if constexpr 的一部分', correct: false, explanation: '它们是独立的功能' },
      ],
    },
    {
      type: 'exposition',
      text: '最佳实践：\n1. 用 `static_assert` 进行前置条件检查\n2. 给每个断言配清晰的错误信息\n3. 和 `<type_traits>` 配合约束模板参数\n4. 不要用于运行时条件——那是 `assert` 的职责',
    },
    {
      type: 'type-it',
      instruction: '综合练习：用 static_assert 确保模板参数是指针：',
      code: '#include <iostream>\n#include <type_traits>\nusing namespace std;\n\ntemplate<typename T>\nvoid checkPointer(T ptr) {\n  static_assert(is_pointer_v<T>, "参数必须是指针类型");\n  if (ptr) {\n    cout << "指针有效" << endl;\n  }\n}\n\nint main() {\n  int x = 10;\n  checkPointer(&x);\n}',
      hints: [
        'is_pointer_v<T> 检查 T 是否是指针',
        '&x 的类型是 int*，是指针',
        '如果传 x（非指针）会编译失败',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'static_assert 在什么时机运行？',
      options: [
        { text: '编译期', correct: true, explanation: 'static_assert 在编译期运行' },
        { text: '运行时', correct: false, explanation: '运行时断言是 assert' },
        { text: '链接时', correct: false, explanation: '链接期不做类型检查' },
        { text: '预处理阶段', correct: false, explanation: '预处理是 #if/#endif' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- `static_assert` 是编译期的安全检查\n- 条件必须是编译期常量表达式\n- 结合 `<type_traits>` 实现模板约束\n- 比运行时 assert 更早发现错误',
    },
  ],
}

export default lesson
