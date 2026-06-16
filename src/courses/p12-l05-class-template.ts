import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'class-template',
    chapter: 13,
    title: '类模板',
    subtitle: '类型参数化的类',
    description: '学会用模板定义类——让类的成员类型也变成参数，一个类模板适配多种数据类型。',
    objectives: ['能写出类模板的定义', '理解类模板和函数模板的异同', '能实例化类模板并访问其成员'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '和函数模板一样，类也可以模板化。\n一个经典的例子：**Box 盒子类**——装什么类型由使用者决定。',
      code: 'template<typename T>\nclass Box {\n  T value;\npublic:\n  void set(T v) { value = v; }\n  T get() const { return value; }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '和函数模板的区别：\n- 类模板在使用时必须写 `<类型>`\n- 不能像函数那样自动推导类型\n- `Box<int>` 是一个具体的类，`Box<double>` 是另一个类',
      code: 'Box<int> intBox;      // 正确，必须写 <int>\nBox<double> dblBox;   // 正确\nBox box;              // 错误！没有指定类型',
    },
    {
      type: 'concept-cards',
      instruction: '类模板 vs 函数模板：',
      cards: [
        { glyph: '🔧', term: '函数模板', meaning: '调用时自动推导类型', example: 'max(1, 2) 自动 T=int' },
        { glyph: '📦', term: '类模板', meaning: '实例化时必须写 <类型>', example: 'Box<int> 而非 Box' },
        { glyph: '📐', term: 'template<typename T>', meaning: '类模板和函数模板声明头相同', example: 'template<typename T>' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个简单的 Box 类模板：',
      code: 'template<typename T>\nclass Box {\n  T value;\npublic:\n  void set(T v) { value = v; }\n  T get() const { return value; }\n};',
      hints: [
        'template<typename T> 放在 class 定义前',
        'T 可出现在成员变量、参数、返回值中',
        'Box<int> 是一个具体的类',
      ],
    },
    {
      type: 'exposition',
      text: '使用类模板就是在类型名后加 `<类型>`：\n`Box<int> intBox;` 相当于一个"int 版本"的 Box。\n`Box<string> strBox;` 相当于一个"string 版本"的 Box。',
    },
    {
      type: 'type-it',
      instruction: '实例化并使用类模板：',
      code: 'Box<int> intBox;\nintBox.set(42);\ncout << intBox.get() << endl;\n\nBox<string> strBox;\nstrBox.set("hello");\ncout << strBox.get() << endl;',
      hints: [
        'Box<int> 和 Box<string> 是两个不同的类',
        'set 和 get 的参数/返回类型对应 T',
        '类模板必须在尖括号中指定类型',
      ],
    },
    {
      type: 'concept-cards',
      instruction: '类模板的模板参数用法：',
      cards: [
        { glyph: '📥', term: '成员变量', meaning: 'T 可以作为成员变量的类型', example: 'T value;' },
        { glyph: '📤', term: '成员函数参数/返回值', meaning: 'T 出现在函数签名中', example: 'void set(T v); T get();' },
        { glyph: '🔗', term: '成员函数内部', meaning: 'T 也用于局部变量和临时值', example: 'T temp = value;' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：函数模板调用时可以不写 <int> 是因为？',
      options: [
        { text: '编译器可以自动推导类型', correct: true, explanation: '函数模板依靠参数类型自动推导 T' },
        { text: '模板会自动使用 int', correct: false, explanation: '不是自动使用 int，而是根据参数推导' },
        { text: '因为 template 关键字允许省略', correct: false, explanation: 'template 关键字不能省略' },
        { text: '因为函数模板不需要类型参数', correct: false, explanation: '函数模板也需要类型参数' },
      ],
    },
    {
      type: 'exposition',
      text: '类模板可以用在**容器**概念中：\n- `Box<int>` 装 int 的盒子\n- `Box<string>` 装 string 的盒子\n- `Box<Vector2D>` 装 Vector2D 的盒子\n这就是泛型编程的雏形。',
    },
    {
      type: 'type-it',
      instruction: '创建一个装 double 的 Box 并使用：',
      code: 'Box<double> dblBox;\ndblBox.set(3.14159);\ncout << dblBox.get() << endl;',
      hints: [
        'Box<double> 中 T 被替换为 double',
        'set 的参数变成 double',
        'get 的返回值也是 double',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是合法的类模板实例化？',
      options: [
        { text: 'Box intBox;', correct: false, explanation: '没有指定模板参数' },
        { text: 'Box<int> intBox;', correct: true, explanation: '尖括号中指定类型参数' },
        { text: 'Box<int>;', correct: false, explanation: '缺少变量名' },
        { text: 'Box<>(int) intBox;', correct: false, explanation: '语法错误' },
      ],
    },
    {
      type: 'exposition',
      text: '类模板的成员函数定义在类内部时，和普通类的写法一样。\n但当成员函数在类外定义时，需要重复 template 声明：',
      code: 'template<typename T>\nclass Box {\n  T value;\npublic:\n  void set(T v);  // 声明\n  T get() const;  // 声明\n};\n\ntemplate<typename T>\nvoid Box<T>::set(T v) {\n  value = v;\n}\n\ntemplate<typename T>\nT Box<T>::get() const {\n  return value;\n}',
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07-09：成员函数在类外定义时，需要用什么语法标识所属的类？',
      options: [
        { text: 'Box::set', correct: true, explanation: '作用域解析运算符 :: 标识所属类' },
        { text: 'Box.set', correct: false, explanation: 'C++ 用 :: 不是 .' },
        { text: 'set(Box)', correct: false, explanation: '这不是成员函数定义语法' },
        { text: 'class::set', correct: false, explanation: '需要具体类名，不是 class 关键字' },
      ],
    },
    {
      type: 'exposition',
      text: '类模板也支持**多个类型参数**：\n`template<typename T, typename U>`\n比如一个 Pair 类，存两种不同类型的值。',
      code: 'template<typename T, typename U>\nclass Pair {\n  T first;\n  U second;\npublic:\n  Pair(T f, U s) : first(f), second(s) {}\n  T getFirst() const { return first; }\n  U getSecond() const { return second; }\n};',
    },
    {
      type: 'type-it',
      instruction: '使用 Pair 类模板：',
      code: 'Pair<int, string> student(1, "Alice");\ncout << student.getFirst() << " " << student.getSecond();',
      hints: [
        'Pair<int, string> 中 T=int, U=string',
        '构造函数参数类型分别是 int 和 string',
        'getFirst 返回 int, getSecond 返回 string',
      ],
    },
    {
      type: 'multiple-choice',
      question: '类模板和函数模板的共同点是什么？',
      options: [
        { text: '都可以自动推导类型', correct: false, explanation: '类模板不能自动推导' },
        { text: '都用 template<...> 声明', correct: true, explanation: '模板声明头语法完全一致' },
        { text: '都在实例化时检查代码', correct: false, explanation: '函数模板也是实例化时检查' },
        { text: '都不能有多个参数', correct: false, explanation: '两者都可以有多个参数' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：类模板让你把"类型"也变成类的"参数"。\n`Box<int>`、`Box<double>`、`Box<string>`——一个模板，无数类型。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '输入一个类模板并实例化它：',
      code: 'template<typename T>\nclass Holder {\n  T value;\npublic:\n  Holder(T v) : value(v) {}\n  T get() const { return value; }\n};',
      hints: [
        'Holder 类封装了一个 T 类型的值',
        '构造函数和 get 都用了 T',
        'Holder<int> h(5); h.get() 返回 5',
      ],
    },
    {
      type: 'exposition',
      text: '类模板的**类型参数**可以用于：\n- 成员变量类型\n- 函数参数类型\n- 函数返回值类型\n- 函数内部的局部变量\n\n只要你想让某个地方的类型"可变"，就用 T。',
    },
    {
      type: 'multiple-choice',
      question: '回顾上一课：函数模板调用时参数类型不一致怎么办？',
      options: [
        { text: '编译器自动选择一种', correct: false, explanation: '编译器会报错' },
        { text: '显式指定模板参数 <double>', correct: true, explanation: '用显式指定消除推导歧义' },
        { text: '去掉一个参数', correct: false, explanation: '不能改参数个数' },
        { text: '重写一个普通函数', correct: false, explanation: '那就失去模板的意义了' },
      ],
    },
    {
      type: 'type-it',
      instruction: '使用 Holder 类模板存储不同类型：',
      code: 'Holder<int> h1(42);\nHolder<double> h2(3.14);\nHolder<string> h3("world");\ncout << h1.get() << " " << h2.get() << " " << h3.get();',
      hints: [
        '三个不同的 Holder 类型',
        '每个的 T 被替换为对应的类型',
        '输出：42 3.14 world',
      ],
    },
  ],
}

export default lesson
