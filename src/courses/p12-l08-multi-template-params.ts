import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'multi-template-params',
    chapter: 13,
    title: '多模板参数',
    subtitle: '<typename T, typename U>',
    description: '学习函数模板和类模板中使用多个类型参数，让一个模板同时处理多种不同的类型。',
    objectives: ['能写出多个类型参数的模板', '理解多参数的场景和用法', '能区分单参数和多参数模板的用途'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有时候一个模板需要两个不同的类型——比如 Pair 类：\n第一个元素是 int，第二个是 string。\n这时就需要**多个模板参数**。',
      code: 'template<typename T, typename U>\nclass Pair {\n  T first;\n  U second;\npublic:\n  Pair(T f, U s) : first(f), second(s) {}\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '语法就是在 `<` 和 `>` 之间用逗号分隔多个参数：\n`template<typename T, typename U>`\n`template<typename T, typename U, typename V>`\n可以继续加。',
    },
    {
      type: 'concept-cards',
      instruction: '多模板参数的核心概念：',
      cards: [
        { glyph: '🔢', term: '多参数列表', meaning: '尖括号中用逗号分隔多个参数', example: 'template<typename T, typename U>' },
        { glyph: '🎯', term: '不同位置用不同参数', meaning: '成员、参数、返回值可以混用 T 和 U', example: 'T first; U second;' },
        { glyph: '🔄', term: '实例化时一一对应', meaning: '<int, string> → T=int, U=string', example: 'Pair<int, string> p;' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入多参数类模板 Pair：',
      code: 'template<typename T, typename U>\nclass Pair {\n  T first;\n  U second;\npublic:\n  Pair(T f, U s) : first(f), second(s) {}\n  T getFirst() const { return first; }\n  U getSecond() const { return second; }\n};',
      hints: [
        'template<typename T, typename U> 用逗号分隔',
        'T 和 U 可以完全不同',
        '构造函数参数类型对应 T 和 U',
      ],
    },
    {
      type: 'type-it',
      instruction: '实例化并使用 Pair：',
      code: 'Pair<int, string> student(1, "Alice");\ncout << student.getFirst() << " " << student.getSecond();',
      hints: [
        '第一个模板参数 int 对应 T',
        '第二个模板参数 string 对应 U',
        'getFirst 返回 int, getSecond 返回 string',
      ],
    },
    {
      type: 'exposition',
      text: '多参数也适用于**函数模板**：',
      code: 'template<typename T, typename U>\nvoid printPair(T a, U b) {\n  cout << a << " " << b << endl;\n}',
    },
    {
      type: 'type-it',
      instruction: '输入多参数函数模板：',
      code: 'template<typename T, typename U>\nvoid printPair(T a, U b) {\n  cout << a << " " << b << endl;\n}',
      hints: [
        '函数模板也可以有多个类型参数',
        '参数 a 和 b 可以是不同类型',
        '调用：printPair(1, "hello") 推导 T=int, U=string',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 04：函数模板调用时怎么推导多个参数？',
      options: [
        { text: '只能推导第一个参数', correct: false, explanation: '编译器推导所有参数' },
        { text: '根据所有参数自动推导每个 T/U', correct: true, explanation: '每个参数的类型独立推导' },
        { text: '需要手动指定所有参数', correct: false, explanation: '函数模板支持自动推导' },
        { text: '只能有一个参数自动推导', correct: false, explanation: '所有参数都可以自动推导' },
      ],
    },
    {
      type: 'exposition',
      text: '多参数模板的一个常见用途：**函数返回值和参数类型不同**。\n比如一个函数把值转为字符串：',
      code: 'template<typename T, typename U>\nU convert(const T& value);  // T 是源类型，U 是目标类型',
    },
    {
      type: 'concept-cards',
      instruction: '多参数的常见场景：',
      cards: [
        { glyph: '📦', term: 'Pair/KV 存储', meaning: '存储不同类型的一对数据', example: 'Pair<int, string>' },
        { glyph: '🔀', term: '类型转换', meaning: '输入类型和输出类型不同', example: 'convert<int, string>(42)' },
        { glyph: '🔗', term: '异构容器', meaning: '容器存不同类型的数据', example: 'map<string, int>' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个多参数函数，返回类型和参数类型不同：',
      code: 'template<typename T, typename U>\nU toType(const T& val) {\n  return static_cast<U>(val);\n}',
      hints: [
        'T 是源类型，U 是目标类型',
        'static_cast<U>(val) 做类型转换',
        '调用：toType<int, double>(42) 返回 42.0',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 05：类模板 `Box<int>` 和 `Box<double>` 的关系是什么？',
      options: [
        { text: '同一个类', correct: false, explanation: '每个参数生成不同的类' },
        { text: '两个独立的、不同的类', correct: true, explanation: 'Box<int> 和 Box<double> 是完全不同的类型' },
        { text: 'Box<double> 继承 Box<int>', correct: false, explanation: '不存在继承关系' },
        { text: 'Box<int> 是 Box<double> 的子集', correct: false, explanation: '两者完全独立' },
      ],
    },
    {
      type: 'exposition',
      text: '多参数的顺序很重要：\n`Pair<int, string>` 中 int 对应第一个参数 T，string 对应第二个 U。\n顺序对应——换位置就是不同意思。',
    },
    {
      type: 'type-it',
      instruction: '交换 Pair 模板参数的顺序：',
      code: 'Pair<string, int> student("Alice", 1);',
      hints: [
        '这里 T = string, U = int',
        '和 Pair<int, string> 是完全不同的类型',
        '模板参数顺序就是声明顺序',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 05：`Pair<int, string>` 和 `Pair<string, int>` 是同一个类型吗？',
      options: [
        { text: '是的，只是写法不同', correct: false, explanation: '参数顺序不同，类型就不同' },
        { text: '不是，参数顺序不同就是不同类型', correct: true, explanation: '模板参数顺序决定具体类型' },
        { text: '编译器会自动调换顺序', correct: false, explanation: '编译器不会调换参数顺序' },
        { text: '取决于 T 和 U 的名字是否相同', correct: false, explanation: '和参数名字无关，是位置决定' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：多个模板参数就像一个"参数列表"——每个位置对应一个类型。\n你想让模板处理多少种类型，就在尖括号里写多少个参数。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '写一个函数模板，用两个类型参数实现不同类型的加法：',
      code: 'template<typename T, typename U>\nauto add(T a, U b) -> decltype(a + b) {\n  return a + b;\n}',
      hints: [
        'T 和 U 可以是不同类型',
        'auto 和 decltype 推导返回类型',
        '调用：add(3, 4.5) 返回 double',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 03：实例化的本质是什么？',
      options: [
        { text: '运行时动态生成代码', correct: false, explanation: '实例化是编译期行为' },
        { text: '编译器用具体类型替换 T 生成函数/类', correct: true, explanation: '编译期生成具体版本的代码' },
        { text: '链接器合并模板', correct: false, explanation: '链接器不处理模板' },
        { text: '用户手动复制代码', correct: false, explanation: '这是编译器做的' },
      ],
    },
  ],
}

export default lesson
