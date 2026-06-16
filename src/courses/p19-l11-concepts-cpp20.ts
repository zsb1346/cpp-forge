import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'concepts-cpp20',
    chapter: 20,
    title: 'Concepts(C++20)',
    subtitle: 'requires 关键字',
    description: '用 concept 和 requires 约束模板参数，取代晦涩的 SFINAE。',
    objectives: ['能定义 concept', '能用 requires 约束模板'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'SFINAE 和 `enable_if` 虽然强大，但写起来晦涩难懂。\nC++20 引入了 **Concepts**——用清晰的方式描述「模板参数必须满足什么条件」。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### concept 的定义\n\n用 `concept` 关键字定义约束条件：',
      code: 'template <typename T>\nconcept Integral = is_integral_v<T>;\n\n// 使用 concept\ntemplate <Integral T>\nvoid process(T val) {\n  cout << "整数: " << val;\n}',
    },
    {
      type: 'exposition',
      text: '### requires 表达式\n\n用 `requires` 描述更复杂的约束：',
      code: 'template <typename T>\nconcept HasSize = requires(T t) {\n  t.size();\n  t.size() -> same_as<size_t>;\n};\n\n// T 必须有 size() 方法，且返回 size_t',
    },
    {
      type: 'exposition',
      text: '### 三种使用方式\n\n1. **模板参数约束**：`template <Concept T>`\n2. **auto 占位符**：`void func(Concept auto val)`\n3. **requires 子句**：`requires Integral<T>`',
      code: '// 方式 1：模板参数约束\ntemplate <Integral T>\nvoid f(T val);\n\n// 方式 2：缩写函数模板\nvoid f(Integral auto val);\n\n// 方式 3：requires 子句\ntemplate <typename T>\nvoid f(T val) requires Integral<T>;',
    },
    {
      type: 'concept-cards',
      instruction: 'Concepts 的核心概念：',
      cards: [
        { glyph: '📐', term: 'concept 定义', meaning: '描述类型必须满足的约束', example: 'concept Integral = ...' },
        { glyph: '🔍', term: 'requires 表达式', meaning: '声明类型必须支持的操作', example: 'requires(T t) { t.f(); }' },
        { glyph: '🖊️', term: '缩写语法', meaning: 'Concept auto 简化模板声明', example: 'void f(Integral auto)' },
        { glyph: '✅', term: '编译期检查', meaning: '约束不满足时报清晰错误', example: '比 SFINAE 更友好' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个 Numeric concept：',
      code: 'template <typename T>\nconcept Numeric = is_arithmetic_v<T>;\n\ntemplate <Numeric T>\nT add(T a, T b) {\n  return a + b;\n}',
      hints: [
        'is_arithmetic_v 包括整数和浮点',
        'Numeric T 约束 T 必须是算术类型',
        '非算术类型调用会导致编译错误',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 10（enable_if）：enable_if 的缺点是什么？',
      options: [
        { text: '运行太慢', correct: false, explanation: 'enable_if 是编译期机制' },
        { text: '语法晦涩，可读性差', correct: true, explanation: 'enable_if 语法复杂，Concepts 更清晰' },
        { text: '不能用于模板', correct: false, explanation: 'enable_if 专门用于模板' },
        { text: '导致内存泄漏', correct: false, explanation: 'enable_if 不涉及内存' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义更复杂的 concept——检查类是否有 begin/end：',
      code: 'template <typename T>\nconcept Iterable = requires(T t) {\n  t.begin();\n  t.end();\n};\n\ntemplate <Iterable T>\nvoid printAll(const T& container) {\n  for (auto& item : container)\n    cout << item;\n}',
      hints: [
        'requires 声明 T 必须有 begin() 和 end()',
        'Iterable T 约束容器必须可迭代',
        'vector、list、set 都满足',
      ],
    },
    {
      type: 'exposition',
      text: '### 组合多个约束\n\n用 `&&` 和 `||` 组合：',
      code: 'template <typename T>\nconcept IntegralAndComparable =\n  Integral<T> && requires(T a, T b) {\n    a < b;\n  };',
    },
    {
      type: 'code-runner',
      instruction: '用 concept 约束模板参数：',
      code: '#include <iostream>\n#include <concepts>\nusing namespace std;\n\ntemplate <typename T>\nconcept Numeric = is_arithmetic_v<T>;\n\ntemplate <Numeric T>\nT multiply(T a, T b) {\n  return a * b;\n}\n\nint main() {\n  cout << multiply(3, 4) << endl;\n  cout << multiply(2.5, 3.0) << endl;\n  return 0;\n}',
      expectedOutput: '12\n7.5',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: 'C++20 之前，模板参数的约束靠什么实现？',
      options: [
        { text: '宏定义', correct: false, explanation: '宏不能做类型检查' },
        { text: 'SFINAE / enable_if', correct: true, explanation: 'C++20 前主要靠 SFINAE 技巧约束模板' },
        { text: '注释', correct: false, explanation: '注释没有约束力' },
        { text: '异常处理', correct: false, explanation: '异常不能约束模板参数' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 requires 子句方式写出等价约束：',
      code: 'template <typename T>\n  requires is_arithmetic_v<T>\nT add(T a, T b) {\n  return a + b;\n}',
      hints: [
        'requires 子句放在函数声明之后',
        '可以直接用类型萃取表达式',
        '条件不满足时编译报错',
      ],
    },
    {
      type: 'exposition',
      text: '### Concept 的意义\n\n- **可读性强**：`template <Integral T>` 比 `enable_if_t<is_integral_v<T>>` 清晰\n- **错误信息友好**：编译器直接告诉你「不满足什么 concept」\n- **复用性强**：concept 可以组合和嵌套\n- **标准库概念**：C++20 标准库已提供大量预定义 concept',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是 C++20 标准库提供的 concept？',
      options: [
        { text: 'is_integral', correct: false, explanation: 'is_integral 是类型萃取，不是 concept' },
        { text: 'same_as', correct: true, explanation: 'same_as<T, U> 是 C++20 的概念，判断类型是否相同' },
        { text: 'enable_if', correct: false, explanation: 'enable_if 是模板辅助工具，不是 concept' },
        { text: 'nullptr', correct: false, explanation: 'nullptr 是空指针关键字' },
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- C++20 Concepts 让模板约束变得清晰可读\n- `concept` 定义约束，`requires` 描述要求\n- 三种用法：模板参数约束、auto 缩写、requires 子句\n- 比 SFINAE 更友好，是现代 C++ 推荐做法',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课：CMake 入门——从手敲命令到现代化构建。',
    },
    {
      type: 'exposition',
      text: '### 标准库 Concepts（C++20）\n\n| Concept | 含义 |\n|---------|------|\n| `same_as<T, U>` | T 和 U 是同一类型 |\n| `derived_from<T, U>` | T 继承自 U |\n| `convertible_to<T, U>` | T 可转换为 U |\n| `integral<T>` | T 是整数类型 |\n| `floating_point<T>` | T 是浮点类型 |\n| `copyable<T>` | T 可拷贝 |\n| `range<T>` | T 是范围（可迭代） |',
    },
    {
      type: 'type-it',
      instruction: '组合 concept + requires 子句：',
      code: 'template <typename T>\nconcept IntegerOrFloat = integral<T> || floating_point<T>;\n\ntemplate <IntegerOrFloat T>\nT half(T val) {\n  return val / 2;\n}',
      hints: [
        'concept 可以用 || 和 && 组合',
        'integral 和 floating_point 是标准 concept',
        'half 函数只接受整数或浮点类型',
      ],
    },
  ],
}

export default lesson
