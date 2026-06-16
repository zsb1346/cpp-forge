import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'function-template',
    chapter: 13,
    title: '函数模板语法',
    subtitle: 'template<typename T>',
    description: '学习函数模板的标准语法：template 关键字、typename 类型参数、以及如何在函数体中使用类型参数。',
    objectives: ['能写出正确的函数模板', '理解 typename T 的含义和位置', '能区分模板头与函数体'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '函数模板的结构很固定：\n第一行是 `template<...>`，第二行是普通函数。\n下面拆开看每个部分。',
      code: 'template<typename T>\nT max(T a, T b) {\n  return a > b ? a : b;\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '逐部分解析：\n- `template`：关键字，告诉编译器"接下来是模板"\n- `<typename T>`：尖括号里声明类型参数\n- `T`：类型占位符的名字（可以叫任何名字）\n- `T max(T a, T b)`：函数签名，T 代表传入的具体类型',
    },
    {
      type: 'concept-cards',
      instruction: '函数模板的三个组成部分：',
      cards: [
        { glyph: '🏷️', term: 'template', meaning: '声明这是模板的关键字', example: 'template<typename T>' },
        { glyph: '📦', term: '类型参数 T', meaning: '占位符，使用时被具体类型替换', example: 'T 可以是 int、double、string' },
        { glyph: '⚙️', term: '函数体', meaning: '和普通函数一样，只是用 T 代替具体类型', example: 'T max(T a, T b) { ... }' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个完整的函数模板：',
      code: 'template<typename T>\nT max(T a, T b) {\n  return a > b ? a : b;\n}',
      hints: [
        '第一行以 template< 开头，> 结尾',
        'typename 后面跟一个类型参数名（通常用 T）',
        '函数体里的 T 会在实例化时被替换',
      ],
    },
    {
      type: 'exposition',
      text: '类型参数的名字可以自己取：\n- 习惯用单个大写字母：`T`、`U`、`V`\n- 也可以用有意义的名字：`typename ElementType`\n- 两种风格都合法，但 `T` 最常见',
      code: 'template<typename ElementType>\nElementType max(ElementType a, ElementType b);',
    },
    {
      type: 'type-it',
      instruction: '参数名用 ElementType 的模板：',
      code: 'template<typename ElementType>\nElementType max(ElementType a, ElementType b) {\n  return a > b ? a : b;\n}',
      hints: [
        '类型参数名可以任意取，不只限于 T',
        'ElementType 只是名字，含义不变',
        '必须在整个函数体内一致使用同一个名字',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：以下哪个是合法的模板声明起始行？',
      options: [
        { text: 'template<class T>', correct: true, explanation: 'class 可以代替 typename，两者等价' },
        { text: 'template<T>', correct: false, explanation: '缺少 typename 或 class 关键字' },
        { text: 'template<typename>', correct: false, explanation: '类型参数缺少名字' },
        { text: 'template<type T>', correct: false, explanation: '没有 type 关键字，要用 typename 或 class' },
      ],
    },
    {
      type: 'exposition',
      text: '多个类型参数：用逗号分隔。',
      code: 'template<typename T, typename U>\nvoid display(T a, U b) {\n  cout << a << " " << b << endl;\n}',
    },
    {
      type: 'type-it',
      instruction: '输入双参数模板：',
      code: 'template<typename T, typename U>\nvoid display(T a, U b) {\n  cout << a << " " << b << endl;\n}',
      hints: [
        '两个类型参数用逗号分隔',
        'T 和 U 可以是不同的类型',
        '调用时：display(10, 3.14) 自动推导 T=int, U=double',
      ],
    },
    {
      type: 'concept-cards',
      instruction: '模板头的注意事项：',
      cards: [
        { glyph: '📐', term: 'template<...>', meaning: '紧跟在函数定义前面，中间不能有分号', example: 'template<typename T>\nT f(T x)' },
        { glyph: '🔤', term: 'typename T', meaning: '声明 T 是一个类型参数', example: 'T 代表 int、double 等' },
        { glyph: '🔗', term: 'T 的作用域', meaning: '只在当前函数模板内有效', example: 'T 在函数签名和函数体中可用' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '函数模板的 `template<typename T>` 后面必须紧跟什么？',
      options: [
        { text: '分号', correct: false, explanation: '模板头后面不能加分号' },
        { text: '函数定义或声明', correct: true, explanation: '模板头后面直接跟函数' },
        { text: '另一行 template', correct: false, explanation: '不能嵌套 template' },
        { text: 'class 定义', correct: false, explanation: '函数模板后面跟函数，不是类' },
      ],
    },
    {
      type: 'exposition',
      text: '一个常见错误：在 template 行和函数之间加分号。\n❌ 错误：`template<typename T>;`\n✅ 正确：`template<typename T>`（无分号）',
    },
    {
      type: 'type-it',
      instruction: '写一个模板函数，返回两个参数的乘积：',
      code: 'template<typename T>\nT multiply(T a, T b) {\n  return a * b;\n}',
      hints: [
        'T 必须支持 * 运算符',
        '模板函数体里不能做类型相关的特殊处理',
        '所有用到类型的地方都用 T 代替',
      ],
    },
    {
      type: 'multiple-choice',
      question: '函数模板比普通函数多了一个什么部分？',
      options: [
        { text: '大括号', correct: false, explanation: '大括号是函数体，普通函数也有' },
        { text: 'template<...> 声明头', correct: true, explanation: '函数模板必须在函数定义前加上模板声明' },
        { text: 'return 语句', correct: false, explanation: 'return 语句普通函数也有' },
        { text: '参数列表', correct: false, explanation: '参数列表普通函数也有' },
      ],
    },
    {
      type: 'exposition',
      text: '函数模板的返回值也可以是 T 或任意类型：',
      code: 'template<typename T>\nT getValue();  // 声明，可以只写 T\n\ntemplate<typename T>\nT getValue() {\n  return T();  // 值初始化\n}',
    },
    {
      type: 'type-it',
      instruction: '写一个返回 T 类型默认值的函数：',
      code: 'template<typename T>\nT makeDefault() {\n  return T();\n}',
      hints: [
        'T() 调用默认构造函数或值初始化',
        'int 的 T() 是 0，double 是 0.0',
        '这是一个无参数的模板函数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾前课："类型参数化"指什么？',
      options: [
        { text: '把函数名也参数化', correct: false, explanation: '参数化的是类型，不是名字' },
        { text: '用 typename 声明的 T 代替具体类型', correct: true, explanation: '类型参数化 = 用占位符代替硬编码的类型' },
        { text: '把变量变成全局变量', correct: false, explanation: '和变量作用域无关' },
        { text: '把函数变成宏', correct: false, explanation: '模板不是宏' },
      ],
    },
    {
      type: 'exposition',
      text: '总结函数模板语法：\n`template<typename T>` + 普通函数定义。\n记住：T 是类型的"参数"——你用在哪里，编译器就在哪里替换它。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
