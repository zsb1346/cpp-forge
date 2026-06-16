import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'variadic-templates',
    chapter: 21,
    title: '变参模板',
    subtitle: 'template<typename... Args>',
    description: '学习变参模板的语法和用法，理解参数包如何展开。',
    objectives: ['能写出变参模板的定义', '能理解参数包展开的机制', '能用变参模板实现简单功能'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前面我们学的模板都有**固定数量**的参数。\n但如果需要一个函数接受**任意数量**的任意类型参数呢？\n\nC++11 引入了**变参模板（Variadic Templates）**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '变参模板的核心语法：\n`template<typename... Args>`\n这里的 `Args` 是一个**模板参数包（parameter pack）**。\n它可以代表零个或多个模板参数。',
      code: '// 接受任意数量、任意类型的参数\n template<typename... Args>\n void print(Args... args) {\n   // ...\n }\n\n print(1, 2.5, "hello", "c");  // 四个不同类型的参数',
    },
    {
      type: 'concept-cards',
      instruction: '变参模板的核心概念：',
      cards: [
        { glyph: '📦', term: '参数包', meaning: '代表零个或多个参数的集合', example: 'typename... Args' },
        { glyph: '🔀', term: '包展开', meaning: '用 ... 把包展开成单独的参数', example: 'Args... 展开为 Arg1, Arg2, ...' },
        { glyph: '🔄', term: '递归分解', meaning: '一次取一个参数，递归处理剩余', example: 'print(Arg, Rest...)' },
      ],
    },
    {
      type: 'exposition',
      text: '**参数包的两种形式**：\n\n1. **模板参数包**：`template<typename... Args>`\n   — 代表零个或多个类型\n\n2. **函数参数包**：`Args... args`\n   — 代表零个或多个函数参数\n\n两者用同一个 `...` 语法。',
    },
    {
      type: 'exposition',
      text: '**展开参数包**：\n当你需要在参数包上应用操作时，需要用 `...` 展开。\n最简单的展开方式是**递归**：\n- 定义一个接受一个参数的"终结版本"\n- 定义一个接受一个参数 + 参数包的"递归版本"',
      code: '// 终结版本——只有一个参数\n void print() {}\n\n // 递归版本——一个参数 + 剩余参数\n template<typename T, typename... Rest>\n void print(const T& first, const Rest&... rest) {\n   cout << first << " ";\n   print(rest...);  // 递归处理剩余参数\n }',
    },
    {
      type: 'type-it',
      instruction: '输入一个递归展开的变参打印函数：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid print() {}\n\ntemplate<typename T, typename... Rest>\nvoid print(const T& first, const Rest&... rest) {\n  cout << first << " ";\n  print(rest...);\n}\n\nint main() {\n  print(1, 2.5, "hello");\n}',
      hints: [
        'print() 空函数是递归终点',
        '每次递归消耗第一个参数',
        'rest... 展开剩余的模板参数',
      ],
    },
    {
      type: 'concept-cards',
      instruction: '参数包展开的常见模式：',
      cards: [
        { glyph: '📞', term: '递归展开', meaning: '依次取出第一个参数，递归处理剩下的', example: 'f(first, rest...)' },
        { glyph: '🔨', term: '逗号展开', meaning: '用逗号表达式一次展开所有参数', example: '(init, ...), (init, vals)...' },
        { glyph: '⚡', term: '折叠表达式', meaning: 'C++17 的简化语法（下一课）', example: '(... + args)' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '变参模板中 `typename... Args` 的 `...` 表示什么？',
      options: [
        { text: '表示 Args 是可变的', correct: false, explanation: '不准确，... 表示"零个或多个"' },
        { text: 'Args 是一个参数包，可以包含零个或多个类型', correct: true, explanation: '... 表示这是一个参数包' },
        { text: 'args 是一个数组', correct: false, explanation: '参数包不是数组，是编译期展开的' },
        { text: '... 表示省略代码', correct: false, explanation: '不是省略，是变参的标志' },
      ],
    },
    {
      type: 'exposition',
      text: '**参数包的大小**：可以用 `sizeof...(Args)` 获取参数包中参数的数量。\n这在编译期就知道了。',
      code: 'template<typename... Args>\nvoid count(Args... args) {\n  cout << "参数个数: " << sizeof...(Args) << "\\n";\n  cout << "参数个数: " << sizeof...(args) << "\\n";  // 也行\n}\n\ncount(1, 2, 3);  // 输出 3',
    },
    {
      type: 'type-it',
      instruction: '输入一个使用 sizeof... 获取参数包大小的例子：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename... Args>\nvoid showCount(Args... args) {\n  cout << "收到 " << sizeof...(Args) << " 个参数\\n";\n}\n\nint main() {\n  showCount(1, 2.5);\n  showCount("a", 1, 2, 3);\n}',
      hints: [
        'sizeof...(Args) 返回类型参数的数量',
        'sizeof...(args) 返回函数参数的数量',
        '两者数值相等',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 12：模板参数包和函数参数包分别在哪里声明？',
      options: [
        { text: '模板参数包在 template<> 中，函数参数包在函数参数列表中', correct: true, explanation: 'template<typename... Args> 和 Args... args' },
        { text: '都在 template<> 中', correct: false, explanation: '函数参数包在函数参数列表' },
        { text: '都在函数参数列表中', correct: false, explanation: '模板参数包在 template 声明' },
        { text: '没有区别', correct: false, explanation: '位置不同，作用不同' },
      ],
    },
    {
      type: 'exposition',
      text: '**变参模板的常见用途**：\n\n1. **可变的打印/日志函数**：printf 风格的 C++ 安全版本\n2. **类型安全的初始化**：如 `make_shared<T>(args...)`\n3. **委托/转发**：完美转发参数给另一个函数\n4. **Tuple 实现**：变参模板是 `std::tuple` 的基础',
      code: '// make_shared 使用变参模板\n template<typename T, typename... Args>\n shared_ptr<T> make_shared(Args&&... args) {\n   return shared_ptr<T>(new T(forward<Args>(args)...));\n }',
    },
    {
      type: 'exposition',
      text: '**完美转发 + 变参模板**：\n`forward<Args>(args)...` 是另一个常见的展开模式。\n它把参数包中的每个参数都做完美转发，保持左值/右值性质。\n\n要注意 `Args&&` 是转发引用（forwarding reference），\n不是右值引用。',
      code: 'template<typename... Args>\nvoid wrapper(Args&&... args) {\n  target(forward<Args>(args)...);  // 完美转发所有参数\n}',
    },
    {
      type: 'type-it',
      instruction: '输入一个使用变参模板进行完美转发的例子：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nstruct Point {\n  int x, y;\n  Point(int a, int b) : x(a), y(b) {}\n};\n\nint main() {\n  auto p = make_shared<Point>(10, 20);\n  cout << p->x << " " << p->y << "\\n";\n}',
      hints: [
        'make_shared 内部用变参模板转发参数',
        'Point(10, 20) 的参数通过 Args... 传递',
        '变参模板让 make_shared 支持任意构造函数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：转发引用 `T&&` 什么时候是右值引用，什么时候是转发引用？',
      options: [
        { text: '只在模板参数推导时是转发引用', correct: true, explanation: 'T&& 在模板推导中为转发引用，否则为右值引用' },
        { text: '永远是右值引用', correct: false, explanation: '在模板推导场景可以是转发引用' },
        { text: '永远是转发引用', correct: false, explanation: '非模板场景 T&& 是右值引用' },
        { text: '由编译器选项决定', correct: false, explanation: '由上下文决定，不是编译选项' },
      ],
    },
    {
      type: 'exposition',
      text: '**变参模板的限制**：\n- 参数包必须是模板参数列表的**最后一个**\n- 不能直接"遍历"参数包，必须用递归或折叠表达式\n- 递归可能导致大量模板实例化（深度见编译时间）',
    },
    {
      type: 'multiple-choice',
      question: '变参模板的递归展开可能导致什么问题？',
      options: [
        { text: '运行时栈溢出', correct: false, explanation: '递归在编译期，不影响运行时栈' },
        { text: '编译器实例化大量模板，增加编译时间', correct: true, explanation: '每层递归产生不同的模板实例' },
        { text: '程序链接失败', correct: false, explanation: '不会导致链接问题' },
        { text: '内存泄漏', correct: false, explanation: '编译期的模板实例化不涉及动态内存' },
      ],
    },
    {
      type: 'type-it',
      instruction: '输入一个使用变参模板创建 tuple 风格的简单例子：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename T>\nvoid printOne(const T& v) {\n  cout << v << " ";\n}\n\ntemplate<typename... Args>\nvoid printAll(const Args&... args) {\n  (printOne(args), ...);  // C++17 折叠\n}\n\nint main() {\n  printAll(1, 2.5, "hello");\n}',
      hints: [
        'C++17 的折叠表达式简化了展开',
        '(printOne(args), ...) 是逗号折叠',
        '依次对每个参数调用 printOne',
      ],
    },
    {
      type: 'exposition',
      text: '变参模板是 C++ 泛型能力的核心组件。\n它支撑了 `tuple`、`variant`、`visit`、`make_shared`、\n以及几乎所有现代 C++ 库的基础设施。\n\n下一课专门讲**折叠表达式**——C++17 提供的一种更简洁的\n参数包展开方式。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
