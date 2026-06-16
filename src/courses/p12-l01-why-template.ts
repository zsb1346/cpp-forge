import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-template',
    chapter: 13,
    title: '为什么需要模板',
    subtitle: '告别重载重复',
    description: '当多个函数的逻辑完全一样、只有类型不同时，模板能让你不再重复写同样的代码。',
    objectives: ['能说出模板解决了什么问题', '能理解"类型作为参数"的基本思想'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '假设你要写一个比较大小的函数：\n`int max(int a, int b) { return a > b ? a : b; }`\n现在需要比较 double，再写一个。\n比较 char，再写一个。',
      code: 'int max(int a, int b) {\n  return a > b ? a : b;\n}\n\ndouble max(double a, double b) {\n  return a > b ? a : b;\n}\n\nchar max(char a, char b) {\n  return a > b ? a : b;\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '三个函数，**逻辑一模一样**，只是类型不同。\n这就是函数重载的痛点：重载帮你解决了同名问题，但没解决代码重复。',
    },
    {
      type: 'concept-cards',
      instruction: '模板要解决的核心概念：',
      cards: [
        { glyph: '🔄', term: '函数重载', meaning: '同名不同参数，但代码照写不误', example: '3 个 max 函数重复同样逻辑' },
        { glyph: '🧩', term: '类型参数化', meaning: '把类型也变成"参数"传进去', example: 'int/double/char 都用同一份代码' },
        { glyph: '📐', term: '模板 template', meaning: '写一次逻辑，编译器帮你生成所有版本', example: 'template<typename T> T max(T a, T b)' },
      ],
    },
    {
      type: 'exposition',
      text: '模板的直觉是：**把类型也当成参数**。\n就像函数参数是值，模板参数是类型。\n这样你只写一份逻辑，编译器帮你生成 int、double、char 等所有版本。',
    },
    {
      type: 'exposition',
      text: '用模板写 max，长这样：',
      code: 'template<typename T>\nT max(T a, T b) {\n  return a > b ? a : b;\n}',
    },
    {
      type: 'type-it',
      instruction: '输入模板版本的 max 函数：',
      code: 'template<typename T>\nT max(T a, T b) {\n  return a > b ? a : b;\n}',
      hints: [
        'template<typename T> 是模板声明头',
        'T 是类型占位符，代表"任意类型"',
        '函数体里的 T 会被具体类型替换',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p05-11：函数重载允许什么？',
      options: [
        { text: '允许函数名不同但功能相同', correct: false, explanation: '重载的函数名必须相同' },
        { text: '允许同名函数，但参数不同', correct: true, explanation: '函数重载 = 同名不同参' },
        { text: '允许函数返回不同值', correct: false, explanation: '返回值不同不算重载' },
        { text: '允许函数在不同文件', correct: false, explanation: '位置不影响重载' },
      ],
    },
    {
      type: 'exposition',
      text: '使用模板时，你不需要写 `<int>`——编译器会自动推导：\n`max(3, 7)` 自动推导 T 是 int\n`max(3.14, 2.71)` 自动推导 T 是 double',
      code: 'int main() {\n  cout << max(3, 7) << endl;        // T = int\n  cout << max(3.14, 2.71) << endl;  // T = double\n  cout << max(\'a\', \'z\') << endl;    // T = char\n}',
    },
    {
      type: 'type-it',
      instruction: '调用模板 max 函数：',
      code: 'cout << max(10, 20) << endl;\ncout << max(2.5, 1.8) << endl;',
      hints: [
        '编译器根据参数类型自动推导 T',
        '10 和 20 都是 int，所以 T = int',
        '2.5 和 1.8 都是 double，T = double',
      ],
    },
    {
      type: 'multiple-choice',
      question: '模板的核心思想是什么？',
      options: [
        { text: '把函数拆成多个小文件', correct: false, explanation: '模板和文件组织无关' },
        { text: '把类型也作为参数传入', correct: true, explanation: '类型参数化是模板的本质' },
        { text: '让代码运行得更快', correct: false, explanation: '模板不影响运行速度' },
        { text: '代替所有的函数', correct: false, explanation: '模板不能代替所有函数' },
      ],
    },
    {
      type: 'exposition',
      text: '再看一个例子——交换两个值：\n没有模板：你要为 int、double、string 各写一个 swap。\n有模板：写一次就够了。',
      code: 'template<typename T>\nvoid mySwap(T& a, T& b) {\n  T temp = a;\n  a = b;\n  b = temp;\n}',
    },
    {
      type: 'type-it',
      instruction: '输入 mySwap 模板：',
      code: 'template<typename T>\nvoid mySwap(T& a, T& b) {\n  T temp = a;\n  a = b;\n  b = temp;\n}',
      hints: [
        'T 在这里也是类型占位符',
        'T& 表示 T 类型的引用',
        'mySwap 可以交换任何类型的值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾前课：引用传递 `T& a` 的作用是什么？',
      options: [
        { text: '拷贝一份数据到函数', correct: false, explanation: '引用不拷贝' },
        { text: '让函数内部能修改外部的变量', correct: true, explanation: '引用传参 = 直接操作原变量' },
        { text: '让函数运行更快', correct: false, explanation: '引用可以避免拷贝，但主要目的是修改' },
        { text: '创建一个新变量', correct: false, explanation: '引用是别名' },
      ],
    },
    {
      type: 'exposition',
      text: '模板的好处用一句话说就是：**一份逻辑，所有类型**。\n如果有第三个类型，你不需要写第三个重载——模板自动适配。',
    },
    {
      type: 'concept-cards',
      instruction: '模板 vs 重载对比：',
      cards: [
        { glyph: '📝', term: '函数重载', meaning: '每个版本都要手写代码', example: 'int/double/char 各写一个' },
        { glyph: '⚡', term: '函数模板', meaning: '写一次，编译器自动生成', example: 'template<typename T> T max(T,T)' },
        { glyph: '🎯', term: '维护成本', meaning: '模板修改一处即可，重载要改 N 处', example: '修 bug 只需改模板' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个返回较小值的模板函数：',
      code: 'template<typename T>\nT myMin(T a, T b) {\n  return a < b ? a : b;\n}',
      hints: [
        'template<typename T> 声明类型参数',
        '返回值 T 和参数类型一致',
        '逻辑和 max 相反：a < b 时返回 a',
      ],
    },
    {
      type: 'multiple-choice',
      question: '模板不能解决以下哪个问题？',
      options: [
        { text: '不同类型使用相同逻辑', correct: false, explanation: '这正是模板擅长的' },
        { text: '不同类型使用不同逻辑', correct: true, explanation: '如果逻辑不同，需要特化，不是模板能自动解决的' },
        { text: '减少重复代码', correct: false, explanation: '模板显著减少代码重复' },
        { text: '同一个函数处理多种类型', correct: false, explanation: '模板允许函数接受多种类型' },
      ],
    },
    {
      type: 'exposition',
      text: '你可能会想："那我是不是以后写函数都要用模板？" 不是的。\n- 只有**逻辑相同、类型不同**时才适合用模板\n- 每种类型处理逻辑不同时（比如 int 用加法、string 用拼接），应该用重载',
    },
    {
      type: 'multiple-choice',
      question: '回顾 p05-11：以下哪个场景最适合用模板？',
      options: [
        { text: 'int 加法、double 加法逻辑相似但精度不同', correct: false, explanation: '精度控制需要不同逻辑，不适合模板' },
        { text: 'int/double 的 max 逻辑完全一样', correct: true, explanation: '逻辑完全相同，只类型不同——模板的最佳场景' },
        { text: 'int 转 string、string 转 int', correct: false, explanation: '不同方向转换逻辑不同' },
        { text: '不同类型的构造函数', correct: false, explanation: '构造函数一般用重载' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：模板的引入动机很纯粹——**消除重载带来的代码重复**。\n当你发现两个函数只有类型不同、逻辑完全一样时，就该用模板了。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
