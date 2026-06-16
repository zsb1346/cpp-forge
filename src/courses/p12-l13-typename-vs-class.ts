import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'typename-vs-class',
    chapter: 13,
    title: 'typename vs class',
    subtitle: '完全等价但有坑',
    description: '理解 template<typename T> 和 template<class T> 的等价性，以及 typename 在嵌套依赖类型中的不可替代性。',
    objectives: ['能解释 typename 和 class 的等价关系', '理解依赖类型名必须用 typename', '能写出正确的嵌套类型访问'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在模板参数声明中，`typename` 和 `class` 完全等价：\n`template<typename T>` 和 `template<class T>` 没有任何区别。\n这只是 C++ 历史遗留问题——class 先出现，typename 后加入。',
      code: 'template<typename T> void f(T x);  // 可以\n template<class T> void g(T x);      // 等价\n // 两者效果一模一样',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '那为什么要有两个关键字？\n- C++ 早期只有 `class`（毕竟模板概念来自"类的参数化"）\n- 但 `class` 容易让人误解"只能传类类型"\n- C++98 加入 `typename`，明确表达"这是一个类型名"',
    },
    {
      type: 'concept-cards',
      instruction: 'typename vs class：',
      cards: [
        { glyph: '🔤', term: 'class', meaning: 'C++98 前只能用它，暗示"传类"', example: 'template<class T>' },
        { glyph: '📝', term: 'typename', meaning: 'C++98 加入，明确"任何类型"', example: 'template<typename T>' },
        { glyph: '✅', term: '等价', meaning: '两者声明模板参数时效果完全一样', example: 'int、double、class 都可以' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 02：函数模板中的 typename 声明的是什么？',
      options: [
        { text: '一个值参数', correct: false, explanation: 'typename 声明的是类型参数，不是值' },
        { text: '一个类型参数', correct: true, explanation: 'typename T 声明 T 是一个类型占位符' },
        { text: '一个函数名', correct: false, explanation: 'typename 不是声明函数名' },
        { text: '一个变量名', correct: false, explanation: 'typename 不是声明变量' },
      ],
    },
    {
      type: 'exposition',
      text: '虽然声明参数时两者等价，但在**嵌套依赖类型**中，**必须用 typename**。\n当你要访问一个依赖于模板参数的类型成员时，编译器不知道它是个类型还是个静态成员——需要 typename 告诉它。',
      code: 'template<typename T>\nvoid process(const T& container) {\n  typename T::iterator it = container.begin();  // 必须加 typename\n  // T::iterator 依赖于 T，称为"依赖类型"\n}',
    },
    {
      type: 'exposition',
      text: '不加 typename 会怎样？\n编译器看到 `T::iterator` 时会想：\n- 这可能是 T 的静态成员变量\n- 也可能是 T 内部定义的类型\n\n因为无法确定，编译器默认当成**不是类型**，所以你要用 typename 声明它是类型。',
      code: '// 错误：编译器不知道 T::value_type 是类型\n // T::value_type* ptr;  // 是类型？还是乘法？\n\n // 正确：加上 typename 明确告诉编译器\n typename T::value_type* ptr;  // 是指针声明',
    },
    {
      type: 'type-it',
      instruction: '输入使用了 typename 的模板函数：',
      code: 'template<typename T>\nvoid showFirst(const T& container) {\n  typename T::value_type val = container[0];\n  cout << val << endl;\n}',
      hints: [
        'T::value_type 是依赖类型，必须加 typename',
        'value_type 是容器中元素的类型',
        'vector<int>::value_type 就是 int',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 05：什么情况下需要 typename？',
      options: [
        { text: '声明模板参数时', correct: false, explanation: '声明模板参数时 typename 和 class 等价' },
        { text: '访问依赖模板参数的嵌套类型时', correct: true, explanation: '当类型名依赖于模板参数时，必须用 typename 前置声明' },
        { text: '定义函数模板时', correct: false, explanation: '定义函数模板用哪个都行' },
        { text: '实例化类模板时', correct: false, explanation: '实例化时不需要 typename' },
      ],
    },
    {
      type: 'exposition',
      text: '**黄金规则**：\n1. 声明模板参数：`typename` 和 `class` 任选，`typename` 更推荐\n2. 访问依赖类型：**必须**用 `typename`',
    },
    {
      type: 'concept-cards',
      instruction: '最重要的区分：',
      cards: [
        { glyph: '🎯', term: 'template<参数>', meaning: '这里 typename 和 class 完全等价', example: 'template<typename T>' },
        { glyph: '⚠️', term: '依赖类型名前', meaning: '这里必须用 typename，class 不行', example: 'typename T::iterator' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 03-04：模板实例化和类型推导的共同点是什么？',
      options: [
        { text: '都在运行时发生', correct: false, explanation: '都在编译期发生' },
        { text: '都在编译期发生', correct: true, explanation: '实例化和推导都是编译期行为' },
        { text: '都需要程序员手动触发', correct: false, explanation: '推导是自动的' },
        { text: '都只用于函数模板', correct: false, explanation: '类模板也有实例化' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个使用 typename 访问嵌套类型的完整例子：',
      code: 'template<typename T>\ntypename T::size_type getSize(const T& container) {\n  return container.size();\n}',
      hints: [
        '返回值是 typename T::size_type——依赖类型',
        'T::size_type 通常是 size_t',
        '调用：getSize(vector<int>{1,2,3}) 返回 3',
      ],
    },
    {
      type: 'exposition',
      text: '为什么这个细节如此重要？\n很多 C++ 初学者在写模板时，遇到 `T::iterator` 不加 typename，编译报错后一头雾水。\n记住这个规则能省很多调试时间。',
    },
    {
      type: 'type-it',
      instruction: '输入一个需要 typename 的完整函数：',
      code: 'template<typename T>\nvoid printAll(const T& container) {\n  for (typename T::const_iterator it = container.begin();\n       it != container.end(); ++it) {\n    cout << *it << " ";\n  }\n}',
      hints: [
        'T::const_iterator 是依赖类型，必须加 typename',
        'const_iterator 是容器中的常量迭代器类型',
        '不加 typename 会导致编译错误',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 05：类模板的实例化语法是？',
      options: [
        { text: 'Box<int> box;', correct: true, explanation: '类名加尖括号指定类型' },
        { text: 'Box box<int>;', correct: false, explanation: '语法顺序错误' },
        { text: 'Box<int>;', correct: false, explanation: '缺少变量名' },
        { text: 'int Box box;', correct: false, explanation: '这不是模板语法' },
      ],
    },
    {
      type: 'exposition',
      text: '一个历史趣闻：`typename` 是在 C++98 才加入标准的。\n在那之前，人们只能用 `class` 声明模板参数，导致很多人误以为模板参数"必须是类类型"。\n现在用 `typename` 更清晰——"任何类型都行"。',
    },
    {
      type: 'type-it',
      instruction: '写一个同时使用 typename 声明参数和 typename 访问依赖类型的例子：',
      code: 'template<typename Container>\ntypename Container::value_type getFirst(const Container& c) {\n  return c[0];\n}',
      hints: [
        '第一个 typename：声明模板参数',
        '第二个 typename：访问依赖类型',
        'Container::value_type 是元素类型',
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- `typename` 和 `class` 声明参数时**等价**，但推荐 `typename`\n- 在依赖类型名前**必须用 typename**，class 不行\n- 这个"坑"是 C++ 模板中最常见的困惑点之一',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
