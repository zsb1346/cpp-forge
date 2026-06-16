import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'enable-if',
    chapter: 20,
    title: 'enable_if',
    subtitle: '按条件启用',
    description: '用 enable_if 让模板只有在条件满足时才存在——SFINAE 的实际应用。',
    objectives: ['能使用 enable_if 约束模板', '能理解 enable_if 的编译期机制'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`enable_if` 是 SFINAE 最经典的应用——让模板**只在某个编译期条件成立时**存在。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### enable_if 的原理\n\n`enable_if<bool, T>`：如果第一个参数为 `true`，定义 `type` 为 `T`；否则没有 `type`。\n没有 `type` → 模板参数替换失败 → SFINAE 移除这个模板。',
      code: 'template <bool Cond, typename T = void>\nstruct enable_if {};\n\ntemplate <typename T>\nstruct enable_if<true, T> {\n  using type = T;\n};\n\ntemplate <bool Cond, typename T = void>\nusing enable_if_t = typename enable_if<Cond, T>::type;',
    },
    {
      type: 'exposition',
      text: '### 基本用法\n\n让函数只接受整数类型：',
      code: 'template <typename T>\nauto divide(T a, T b) -> enable_if_t<is_integral_v<T>, double> {\n  return static_cast<double>(a) / b;\n}\n\n// 只有 T 是整数类型时这个模板才存在\n// 浮点数用不了',
    },
    {
      type: 'exposition',
      text: '### 用作默认模板参数\n\n更常见的写法——用第三个模板参数：',
      code: 'template <typename T,\n          typename = enable_if_t<is_integral_v<T>>>\nvoid process(T val) {\n  cout << "处理整数: " << val;\n}',
    },
    {
      type: 'concept-cards',
      instruction: 'enable_if 的核心概念：',
      cards: [
        { glyph: '🔘', term: 'enable_if', meaning: '条件 true 时定义 type 类型', example: 'enable_if_t<cond, T>' },
        { glyph: '✅', term: '类型萃取', meaning: 'is_integral 等编译期类型判断', example: 'is_integral_v<T>' },
        { glyph: '🚫', term: 'SFINAE 移除', meaning: '条件 false 时模板被静默移除', example: '无 type 定义' },
        { glyph: '📐', term: '函数重载约束', meaning: '不同条件启用不同重载版本', example: '整数/浮点各一个' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 enable_if 实现只接受整数的函数：',
      code: 'template <typename T,\n          typename = enable_if_t<is_integral_v<T>>>\nvoid printSquare(T val) {\n  cout << val * val;\n}',
      hints: [
        'is_integral_v 检查是否为整数类型',
        'enable_if_t 作为默认模板参数',
        '非整数类型调用会编译错误',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 09（SFINAE）：替换失败后编译器会怎样？',
      options: [
        { text: '报编译错误', correct: false, explanation: '替换失败不会导致编译错误' },
        { text: '静默移除该模板重载', correct: true, explanation: 'SFINAE 将失败的模板从候选集中移除' },
        { text: '运行时 crash', correct: false, explanation: '替换失败发生在编译时' },
        { text: '使用默认实现', correct: false, explanation: '没有所谓默认实现' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 enable_if 区分整数和浮点：',
      code: 'template <typename T,\n          typename = enable_if_t<is_integral_v<T>>>\nvoid printType(T) {\n  cout << "整数";\n}\n\ntemplate <typename T,\n          typename = enable_if_t<is_floating_point_v<T>>>\nvoid printType(T) {\n  cout << "浮点数";\n}',
      hints: [
        '两个模板通过不同的条件区分',
        'is_integral_v 和 is_floating_point_v 互斥',
        '同一个函数名实现重载',
      ],
    },
    {
      type: 'exposition',
      text: '### 更多类型萃取\n\n| 萃取 | 用途 |\n|------|------|\n| `is_integral_v` | 是否是整数类型 |\n| `is_floating_point_v` | 是否是浮点类型 |\n| `is_class_v` | 是否是类类型 |\n| `is_same_v<T, U>` | 两个类型是否相同 |\n| `is_pointer_v` | 是否是指针 |\n| `is_constructible_v<T, Args...>` | 能否用 Args 构造 |',
    },
    {
      type: 'exposition',
      text: '### enable_if 的常见陷阱\n\n两个模板的默认参数不同但函数签名相同 → 编译错误！\n默认模板参数不影响函数签名——不能用来区分重载。',
      code: '// 错误：两个函数签名完全相同\n// 同一个函数不能有两个定义',
    },
    {
      type: 'exposition',
      text: '### 正确区分重载的方法\n\n在返回类型或额外函数参数中使用 `enable_if`：',
      code: 'template <typename T>\nauto process(T val) -> enable_if_t<is_integral_v<T>> {\n  cout << "整数";\n}\n\ntemplate <typename T>\nauto process(T val) -> enable_if_t<is_floating_point_v<T>> {\n  cout << "浮点数";\n}',
    },
    {
      type: 'multiple-choice',
      question: 'enable_if_t<is_integral_v<T>, double> 当 T 是 int 时是什么类型？',
      options: [
        { text: 'int', correct: false, explanation: '第二个参数指定了返回类型是 double' },
        { text: 'double', correct: true, explanation: '条件为 true 时 type 就是第二个参数 double' },
        { text: 'void', correct: false, explanation: '第二个参数是 double，不是 void' },
        { text: '编译错误', correct: false, explanation: 'int 是整数类型，条件为 true' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用返回类型方式区分不同类型的重载：',
      code: 'template <typename T>\nauto describe(T val) -> enable_if_t<is_integral_v<T>> {\n  cout << val << " 是整数";\n}\n\ntemplate <typename T>\nauto describe(T val) -> enable_if_t<is_floating_point_v<T>> {\n  cout << val << " 是浮点数";\n}',
      hints: [
        'enable_if 放在返回类型位置',
        '两个模板的返回类型推导方式不同',
        '条件互斥确保只有一个被选中',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'enable_if 基于什么机制工作？',
      options: [
        { text: '运行时条件判断', correct: false, explanation: 'enable_if 是编译期机制' },
        { text: 'SFINAE 替换失败', correct: true, explanation: '条件不满足时 type 不存在，触发 SFINAE' },
        { text: '异常处理', correct: false, explanation: '和异常无关' },
        { text: '宏定义', correct: false, explanation: 'enable_if 是模板，不是宏' },
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- `enable_if` 根据编译期条件启用或禁用模板\n- 条件不满足时触发 SFINAE，模板被静默移除\n- `is_integral_v` 等类型萃取常与 `enable_if` 配合\n- C++20 的 Concepts 是更优雅的替代方案',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课：Concepts（C++20）——`requires` 关键字，更清晰地约束模板参数。',
    },
    {
      type: 'exposition',
      text: '### enable_if 实用技巧\n\n`enable_if` 的常见搭配：\n- `enable_if_t<is_same_v<T, int>>`：只允许 int\n- `enable_if_t<!is_same_v<T, double>>`：排除 double\n- `enable_if_t<is_class_v<T>>`：只允许类类型\n- `enable_if_t<is_pointer_v<T>>`：只允许指针',
    },
    {
      type: 'type-it',
      instruction: '用 enable_if 排除特定类型：',
      code: 'template <typename T,\n          typename = enable_if_t<!is_same_v<T, string>>>\nvoid print(T val) {\n  cout << val;\n}',
      hints: [
        '! 取反条件',
        'is_same_v 检查类型是否相等',
        'string 类型被排除在这个重载之外',
      ],
    },
  ],
}

export default lesson
