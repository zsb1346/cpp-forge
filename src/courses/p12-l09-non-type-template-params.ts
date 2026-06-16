import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'non-type-template-params',
    chapter: 13,
    title: '非类型模板参数',
    subtitle: '<int N>——传值',
    description: '模板参数不只有类型——还可以是整数、枚举、指针等编译期常量值，让模板在编译期就"算"出结果。',
    objectives: ['能写出非类型模板参数的模板', '理解类型参数和非类型参数的区别', '能使用非类型参数定义编译期常量'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '模板参数**不一定是类型**——也可以是一个**值**。\n这叫**非类型模板参数**（non-type template parameter）。\n最常见的用法：一个整数。',
      code: 'template<typename T, int N>\nclass Array {\n  T data[N];  // N 是编译期常量\npublic:\n  int size() const { return N; }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '看到 `<int N>` 了吗？N 不是一个类型，而是一个 int 值。\n`Array<int, 5>` 生成一个能存 5 个 int 的数组。\n`Array<double, 10>` 生成一个能存 10 个 double 的数组。',
    },
    {
      type: 'concept-cards',
      instruction: '两种模板参数对比：',
      cards: [
        { glyph: '📦', term: '类型参数', meaning: 'typename T——代表一个类型', example: 'template<typename T>' },
        { glyph: '🔢', term: '非类型参数', meaning: 'int N——代表一个值', example: 'template<int N>' },
        { glyph: '🔄', term: '混用', meaning: '类型和值参数同时使用', example: 'template<typename T, int N>' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入带非类型参数的 Array 类模板：',
      code: 'template<typename T, int N>\nclass Array {\n  T data[N];\npublic:\n  int size() const { return N; }\n};',
      hints: [
        'T 是类型参数，N 是非类型（int 值）参数',
        'N 必须是编译期已知的常数',
        'data[N] 用了 N 作为数组大小',
      ],
    },
    {
      type: 'type-it',
      instruction: '实例化并使用 Array 类模板：',
      code: 'Array<int, 5> arr;\ncout << "Size: " << arr.size() << endl;',
      hints: [
        '<int, 5>：T=int, N=5',
        'data[5] 的数组在编译期就确定了',
        'arr.size() 返回 5',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 03：模板实例化发生在什么时期？',
      options: [
        { text: '运行时', correct: false, explanation: '实例化在编译期' },
        { text: '编译期', correct: true, explanation: '编译器在编译期生成具体类型的代码' },
        { text: '链接期', correct: false, explanation: '链接时已经没有模板信息' },
        { text: '编译和运行都有', correct: false, explanation: '只在编译期发生' },
      ],
    },
    {
      type: 'exposition',
      text: '非类型参数的值必须是**编译期常量**：\n- ✅ `Array<int, 5>` — 字面量 5\n- ✅ `const int size = 10; Array<int, size>` — const 常量\n- ❌ `int size = 10; Array<int, size>` — 变量不行\n- ❌ `Array<int, getSize()>` — 函数返回值不行',
    },
    {
      type: 'concept-cards',
      instruction: '非类型参数允许的类型：',
      cards: [
        { glyph: '🔢', term: '整数类型', meaning: 'int、char、bool、long 等', example: 'template<int N>' },
        { glyph: '📌', term: '枚举类型', meaning: 'enum 类型可作为参数', example: 'template<Color C>' },
        { glyph: '📎', term: '指针/引用', meaning: '指向全局变量的指针或引用', example: 'template<int* P>' },
      ],
    },
    {
      type: 'type-it',
      instruction: '使用 const 变量作为非类型参数：',
      code: 'const int SIZE = 8;\nArray<double, SIZE> arr;\ncout << arr.size() << endl;',
      hints: [
        'SIZE 用 const 声明，是编译期常量',
        '非类型参数的值必须是编译期确定的',
        '普通变量（非 const）不能作为非类型参数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 01-02：类型参数 typename T 和这里 int N 的区别是什么？',
      options: [
        { text: 'T 代表类型，N 代表值', correct: true, explanation: 'typename 声明类型，int 声明整数值' },
        { text: '没有区别，都是类型', correct: false, explanation: 'N 是值不是类型' },
        { text: 'T 是值，N 是类型', correct: false, explanation: '说反了' },
        { text: '两者都可以是类型或值', correct: false, explanation: '各自用途不同' },
      ],
    },
    {
      type: 'exposition',
      text: '非类型参数可以用于**数学计算**——比如编译期求阶乘：',
      code: 'template<int N>\nstruct Factorial {\n  static const int value = N * Factorial<N - 1>::value;\n};\n\ntemplate<>\nstruct Factorial<0> {\n  static const int value = 1;\n};',
    },
    {
      type: 'type-it',
      instruction: '输入编译期阶乘模板（非类型参数）：',
      code: 'template<int N>\nstruct Factorial {\n  static const int value = N * Factorial<N - 1>::value;\n};',
      hints: [
        'N 是 int 类型的非类型参数',
        'Factorial<5>::value 在编译期就算出 120',
        '递归终止需要特化 Factorial<0>',
      ],
    },
    {
      type: 'exposition',
      text: '非类型参数的实用场景：**固定大小的容器**。\n`std::array<T, N>` 就是标准库中非类型参数的经典例子。\n长度 N 在编译期确定，不需要动态内存。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个不能作为非类型模板参数的值？',
      options: [
        { text: '5', correct: false, explanation: '字面量是编译期常量' },
        { text: 'const int 变量', correct: false, explanation: 'const 变量是编译期常量' },
        { text: '普通 int 变量', correct: true, explanation: '普通变量的值在编译期不确定' },
        { text: '枚举值', correct: false, explanation: '枚举值是编译期常量' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个非类型参数的函数模板：',
      code: 'template<int N>\nvoid repeat(const string& msg) {\n  for (int i = 0; i < N; i++) {\n    cout << msg << endl;\n  }\n}',
      hints: [
        'N 是编译期常量，决定循环次数',
        '调用：repeat<3>("hi") 打印 3 次',
        'N 在编译期固定，不能是变量',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 08：多模板参数和这里混用类型/非类型参数有什么共同点？',
      options: [
        { text: '都是在尖括号中用逗号分隔多个参数', correct: true, explanation: '多个参数无论类型还是非类型都用逗号分隔' },
        { text: '都只能有一个参数', correct: false, explanation: '都可以有多个参数' },
        { text: '都必须全是类型或全是非类型', correct: false, explanation: '可以混合使用' },
        { text: '都只能在类模板中使用', correct: false, explanation: '函数模板也支持' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：非类型模板参数让模板从"类型参数化"升级到"值参数化"。\n类型和值都可以是模板的参数——这就是 C++ 模板的灵活之处。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '用非类型参数定义一个缓冲区模板：',
      code: 'template<typename T, int SIZE>\nclass Buffer {\n  T data[SIZE];\npublic:\n  void fill(const T& val) {\n    for (int i = 0; i < SIZE; i++) data[i] = val;\n  }\n};',
      hints: [
        'SIZE 是编译期常量，决定缓冲区大小',
        'Buffer<int, 256> 创建一个 256 个 int 的缓冲区',
        'fill 用循环填充每个元素',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 05：类模板实例化和普通类实例化（创建对象）的区别？',
      options: [
        { text: '类模板实例化是编译器生成新类', correct: true, explanation: '实例化类模板 = 创建具体的新类' },
        { text: '普通类实例化 = 创建对象', correct: true, explanation: '普通类实例化 = 创建对象' },
        { text: '两者完全一样', correct: false, explanation: '一个是生成类定义，一个是创建对象' },
        { text: '类模板实例化也是创建对象', correct: false, explanation: '先用具体类型生成类，再创建对象' },
      ],
    },
  ],
}

export default lesson
