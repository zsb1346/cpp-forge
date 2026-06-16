import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'template-instantiation',
    chapter: 13,
    title: '模板实例化',
    subtitle: '编译器生成代码',
    description: '理解模板实例化过程——编译器在编译期用具体类型替换 T，为每个使用的类型生成独立的函数代码。',
    objectives: ['能解释实例化的过程', '理解模板在编译期做什么', '能区分模板定义和实例化'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '模板本身**不是**可执行的代码。\n它是一张"蓝图"。只有当你**使用**它时，编译器才根据具体类型生成真正的代码。\n这个过程叫**实例化**。',
      code: 'template<typename T>\nT max(T a, T b) { return a > b ? a : b; }  // 只是蓝图\n\nint main() {\n  max(3, 7);     // 实例化出 int max(int, int)\n  max(1.5, 2.5); // 实例化出 double max(double, double)\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '编译器看到 `max(3, 7)` 时：\n1. 发现 T 被推导为 int\n2. 生成一份 `int max(int a, int b) { return a > b ? a : b; }`\n3. 编译这行代码\n\n看到 `max(1.5, 2.5)` 时，重复以上步骤生成 double 版本。',
    },
    {
      type: 'concept-cards',
      instruction: '实例化三要素：',
      cards: [
        { glyph: '📐', term: '模板定义', meaning: '你写的 template<...> 函数，只是蓝图', example: 'template<typename T> T max(T,T)' },
        { glyph: '🛠️', term: '实例化过程', meaning: '编译器用具体类型替换 T 生成代码', example: 'max(3,7) → 生成 int max(int,int)' },
        { glyph: '✅', term: '实例化结果', meaning: '一个真正可被调用的函数', example: 'int, double, char 等版本' },
      ],
    },
    {
      type: 'exposition',
      text: '关键认识：**如果你从不调用 `max<int>(...)` 或 `max(3,7)`，编译器不会生成任何代码**。\n模板定义只是等待实例化的"模具"。',
    },
    {
      type: 'type-it',
      instruction: '输入这段代码——注意模板本身不会出现在最终代码中：',
      code: 'template<typename T>\nT twice(T x) {\n  return x + x;\n}',
      hints: [
        'twice 只是一个模板定义',
        '只有调用 twice(5) 才会生成 int 版本',
        '调用 twice(3.0) 生成 double 版本',
      ],
    },
    {
      type: 'exposition',
      text: '实例化后的代码等价于手写的重载：\n`int max(int,int)` 和 `double max(double,double)` 是两个独立的函数。\n它们只是用模板自动生成的。',
    },
    {
      type: 'multiple-choice',
      question: '模板定义和普通函数定义的最大区别是什么？',
      options: [
        { text: '模板定义更短', correct: false, explanation: '长度不是核心区别' },
        { text: '模板定义不会生成代码，直到被调用', correct: true, explanation: '模板是蓝图，调用时才实例化' },
        { text: '模板定义不能有参数', correct: false, explanation: '模板函数可以有参数' },
        { text: '模板定义必须在 main 之前', correct: false, explanation: '位置不是关键区别' },
      ],
    },
    {
      type: 'exposition',
      text: '你还可以显式指定类型：`max<int>(3, 7)`。\n这样即使参数类型混搭，也能强制使用指定类型。',
      code: 'int a = 3;\ndouble b = 7.5;\n// max(a, b) 会编译错误（T 冲突）\n// max<int>(a, b) 可以——把 b 截断为 int',
    },
    {
      type: 'type-it',
      instruction: '显式指定模板参数的调用方式：',
      code: 'int result = max<int>(10, 20);\ndouble result2 = max<double>(1.5, 2.5);',
      hints: [
        '<int> 显式告诉编译器 T = int',
        '参数会自动转换为指定类型',
        '显式指定在某些情况下能避免推导歧义',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：template<typename T> 中的 typename 可以用什么替换？',
      options: [
        { text: 'typedef', correct: false, explanation: 'typedef 是类型别名' },
        { text: 'class', correct: true, explanation: 'template<class T> 完全等价于 template<typename T>' },
        { text: 'struct', correct: false, explanation: 'struct 不能用于声明类型参数' },
        { text: 'type', correct: false, explanation: 'C++ 没有 type 关键字' },
      ],
    },
    {
      type: 'exposition',
      text: '实例化的时机是在**编译期**，不是在运行时。\n这意味着：\n- 模板错误会在编译期暴露\n- 如果某个类型不支持模板内的操作（如 T 没有 > 运算符），实例化会失败',
    },
    {
      type: 'concept-cards',
      instruction: '实例化的关键认知：',
      cards: [
        { glyph: '⏰', term: '编译期发生', meaning: '运行前已经生成好所有版本', example: '运行时没有模板，只有函数' },
        { glyph: '⚠️', term: '类型必须匹配', meaning: 'T 必须支持模板内的操作', example: 'T 没有 > 运算符就编译失败' },
        { glyph: '📈', term: '代码膨胀', meaning: '每套类型生成一份代码', example: 'int/double/char 各一份' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '如果 T 不支持 > 运算符，会发生什么？',
      options: [
        { text: '运行时崩溃', correct: false, explanation: '编译期就会报错' },
        { text: '编译器报错，实例化失败', correct: true, explanation: '模板在实例化时检查所有操作是否合法' },
        { text: 'T 自动替换为 int', correct: false, explanation: '编译器不会自动替换' },
        { text: '跳过这个实例化', correct: false, explanation: '需要该类型实例化的地方会编译失败' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个模板函数，调用它并触发实例化：',
      code: 'template<typename T>\nT add(T a, T b) {\n  return a + b;\n}',
      hints: [
        'add 模板需要 T 支持 + 运算符',
        'int 和 double 都支持 +',
        '调用 add(1,2) 会实例化 int 版本',
      ],
    },
    {
      type: 'exposition',
      text: '实例化的结果就像编译器帮你按 Ctrl+C/V 然后改了类型。\n每套类型都是独立的函数，有独立的机器码。\n这就是模板"写一次，生成 N 份"的工作原理。',
    },
    {
      type: 'type-it',
      instruction: '输入以下代码并体会实例化：',
      code: 'string a = "hello", b = "world";\nstring s = add(a, b);  // T = string',
      hints: [
        'string 也支持 +（拼接字符串）',
        '这里 T 被推导为 string',
        '编译器生成 string add(string, string)',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾前课：使用模板时 `max(3, 7)` 和 `max<int>(3, 7)` 的区别？',
      options: [
        { text: '没有区别，完全等价', correct: false, explanation: '结果相同但过程略有不同' },
        { text: '前者自动推导 T，后者显式指定 T', correct: true, explanation: '一个靠推导，一个是显式' },
        { text: '前者更快', correct: false, explanation: '运行时没有区别' },
        { text: '后者只能用于 int', correct: false, explanation: '显式指定任何类型都可以' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：编译器就是你的"代码生成器"——你写一份模板，它帮你生成 N 份函数。\n每个调用的类型对应一份独立代码。这就是模板实例化的本质。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
