import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'template-member-func',
    chapter: 13,
    title: '类模板的成员函数',
    subtitle: '类外定义也需 template',
    description: '掌握类模板成员函数在类外定义时必须重复 template 声明的语法规则。',
    objectives: ['能写出类模板成员函数的类外定义', '理解类外定义时 template 的作用', '能区分类内和类外定义的不同'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '类模板的成员函数如果定义在类内部，写法完全正常。\n但如果要在类**外部**定义，就必须重复 `template<typename T>` 声明。',
      code: 'template<typename T>\nclass Box {\n  T value;\npublic:\n  void set(T v);  // 类内声明\n  T get() const;  // 类内声明\n};\n\n// 类外定义，必须重复 template<typename T>\ntemplate<typename T>\nvoid Box<T>::set(T v) {\n  value = v;\n}\n\ntemplate<typename T>\nT Box<T>::get() const {\n  return value;\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '关键语法变化：\n1. 类名从 `Box` 变成 `Box<T>`——**带着参数**\n2. 前面加 `template<typename T>`\n3. 其他和普通成员函数定义一样\n\n如果不写 `template<typename T>`，编译器以为你在定义一个普通类的成员函数。',
    },
    {
      type: 'type-it',
      instruction: '输入类外定义的 set 成员函数：',
      code: 'template<typename T>\nvoid Box<T>::set(T v) {\n  value = v;\n}',
      hints: [
        'Box<T> 中的 T 必须和 template 头一致',
        '函数名前的 Box<T>:: 带模板参数',
        '函数体内的 value 就是 T 类型的成员变量',
      ],
    },
    {
      type: 'concept-cards',
      instruction: '类外定义的语法要素：',
      cards: [
        { glyph: '🏷️', term: 'template<typename T>', meaning: '类外定义必须重复这行头', example: '类内声明时已写一次' },
        { glyph: '📛', term: 'Box<T>::', meaning: '类名要带 <T>，不能只写 Box', example: 'Box<T>::set 而非 Box::set' },
        { glyph: '🔗', term: 'T 保持一致', meaning: '类模板参数 T 在整个定义中统一', example: 'template<typename T> + Box<T>' },
      ],
    },
    {
      type: 'exposition',
      text: '如果类模板有多个类型参数，类外定义也要全部带上：',
      code: 'template<typename T, typename U>\nclass Pair {\n  T first;\n  U second;\npublic:\n  T getFirst() const;\n};\n\ntemplate<typename T, typename U>\nT Pair<T, U>::getFirst() const {\n  return first;\n}',
    },
    {
      type: 'type-it',
      instruction: '输入双参数类模板的成员函数定义：',
      code: 'template<typename T, typename U>\nT Pair<T, U>::getFirst() const {\n  return first;\n}',
      hints: [
        'template 头要带上所有参数：T 和 U',
        'Pair<T, U> 在两个尖括号中列出',
        '返回值 T 也必须和声明一致',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：类模板实例化时，Box<int> 和 Box<double> 是什么关系？',
      options: [
        { text: '同一个类的两个对象', correct: false, explanation: '它们是两个不同的类' },
        { text: '两个完全独立的类', correct: true, explanation: '每个模板参数生成一个独立的类' },
        { text: '一个是另一个的子类', correct: false, explanation: '和继承无关' },
        { text: '一个包含另一个', correct: false, explanation: '它们是各自独立的类型' },
      ],
    },
    {
      type: 'exposition',
      text: '一个容易搞混的地方：类外定义成员函数时为什么必须再次写 template？\n因为编译器需要知道这是一个**模板**的成员函数，而不是一个普通类的成员函数。\n每次定义都要"提醒"编译器。',
    },
    {
      type: 'fill-in',
      prompt: '补全 Box 类模板的类外成员函数定义。',
      template: '____<____ T>\n____ Box<____>::set(T v) {\n  value = v;\n}',
      answers: ['template', 'typename', 'void', 'T'],
      hints: ['第一空：模板关键字', '第二空：类型参数声明关键字', '第三空：返回值类型', '第四空：模板参数名'],
    },
    {
      type: 'type-it',
      instruction: '输入一个完整的可编译程序（类模板 + 类外定义）：',
      code: 'template<typename T>\nclass Holder {\n  T data;\npublic:\n  void store(T d);\n  T retrieve() const;\n};\n\ntemplate<typename T>\nvoid Holder<T>::store(T d) {\n  data = d;\n}\n\ntemplate<typename T>\nT Holder<T>::retrieve() const {\n  return data;\n}',
      hints: [
        '类内只有声明，类外补实现',
        '每个类外函数前都要加 template<typename T>',
        'Holder<T>:: 和 template<typename T> 总是成对出现',
      ],
    },
    {
      type: 'exposition',
      text: '类内定义的成员函数会**隐式成为内联函数**（inline）。\n类外定义则不会自动内联，除非你手动加 inline 关键字。\n不过对于学习阶段，理解语法远比性能重要。',
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07-09：类内定义的成员函数有什么特点？',
      options: [
        { text: '比类外定义更慢', correct: false, explanation: '类内定义默认是内联的，通常更快' },
        { text: '默认是 inline（内联）的', correct: true, explanation: '类内实现的成员函数编译器倾向于内联展开' },
        { text: '不能在类内定义函数', correct: false, explanation: '类内完全可以定义函数' },
        { text: '类内定义必须加 inline 关键字', correct: false, explanation: '不加也默认内联' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 get 成员函数的类外定义。',
      template: '____<____ T>\nT Box<____>::____() const {\n  return value;\n}',
      answers: ['template', 'typename', 'T', 'get'],
      hints: ['第一空：模板关键字', '第二空：类型参数声明关键字', '第三空：类名后的模板参数', '第四空：函数名'],
    },
    {
      type: 'exposition',
      text: '一个需要注意的细节：类外定义的每个成员函数都要单独写 template 头。\n即使多个函数在同一文件中，每个函数的定义前都要写 `template<typename T>`。',
      code: '// 每个类外函数定义前都要加 template<typename T>\n template<typename T>\nvoid Box<T>::set(T v) { value = v; }\n\n template<typename T>\nT Box<T>::get() const { return value; }',
    },
    {
      type: 'type-it',
      instruction: '输入两个类外定义的成员函数：',
      code: 'template<typename T>\nvoid Container<T>::store(const T& val) {\n  data = val;\n}\n\ntemplate<typename T>\nT Container<T>::fetch() const {\n  return data;\n}',
      hints: [
        '每个函数前都要写 template<typename T>',
        '类名是 Container<T> 不是 Container',
        '函数体内的 T 对应模板参数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 02：template<typename T> 中 typename 的作用是什么？',
      options: [
        { text: '声明 T 是一个类型参数', correct: true, explanation: 'typename 告诉编译器 T 代表一个类型' },
        { text: '声明 T 是一个变量', correct: false, explanation: 'typename 声明的是类型参数' },
        { text: '声明 T 是一个常量', correct: false, explanation: 'typename 和常量无关' },
        { text: '声明 T 是一个函数', correct: false, explanation: 'typename 和函数无关' },
      ],
    },
    {
      type: 'exposition',
      text: '总结公式：\n类外定义成员函数 = `template<typename T>` + `返回值 Box<T>::函数名(参数) { 实现 }`\n两个 T 要一致，template 头不能省。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '最后完整输入一次类外定义模板：',
      code: 'template<typename T>\nclass Wrapper {\n  T val;\npublic:\n  void set(const T& v);\n  T get() const;\n};\n\ntemplate<typename T>\nvoid Wrapper<T>::set(const T& v) {\n  val = v;\n}\n\ntemplate<typename T>\nT Wrapper<T>::get() const {\n  return val;\n}',
      hints: [
        '类内只有两个函数的声明',
        '类外两个定义都加了 template<typename T>',
        '类名使用 Wrapper<T> 而非 Wrapper',
      ],
    },
  ],
}

export default lesson
