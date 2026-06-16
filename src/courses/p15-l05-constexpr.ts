import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'constexpr',
    chapter: 16,
    title: 'constexpr 编译期求值',
    subtitle: '比 const 更强',
    description: '学习 constexpr 关键字，让计算在编译期完成，获得更好的性能和更严格的保证。',
    objectives: ['能用 constexpr 声明编译期常量', '能写 constexpr 函数', '理解 constexpr 和 const 的区别'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`const` 只是说"这个值不能改"，但不保证是编译期就知道的值。\n`constexpr` 更强——它要求值**在编译期就能算出来**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`const` 和 `constexpr` 的区别：\n```\nconst int x = 5;        // 不能改，但可以是运行时值\nconstexpr int y = 10;   // 编译期就知道的值\n\nint getVal() { return 42; }\nconst int a = getVal();      // ✅ const 可以\nconstexpr int b = getVal();  // ❌ getVal 不是 constexpr 函数\n```',
      code: 'const int runtime = rand();  // ✅ 可以\nconstexpr int compileTime = 42;  // ✅ 编译期常量\n\n// constexpr int bad = rand();   // ❌ rand() 不是编译期值',
    },
    {
      type: 'type-it',
      instruction: '声明 constexpr 常量：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  constexpr int SIZE = 100;\n  int arr[SIZE];\n  cout << sizeof(arr) / sizeof(arr[0]) << endl;\n}',
      hints: [
        'constexpr int SIZE = 100 在编译期确定',
        '数组大小必须是编译期常量',
        '输出: 100',
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'constexpr 三张概念卡：',
      cards: [
        { glyph: '🔒', term: 'const', meaning: '运行时只读，不要求编译期值', example: 'const int x = func();' },
        { glyph: '⚡', term: 'constexpr', meaning: '编译期求值，必须是编译期已知', example: 'constexpr int N = 100;' },
        { glyph: '🔧', term: 'constexpr 函数', meaning: '能在编译期执行的函数', example: 'constexpr int sq(int x) { return x*x; }' },
      ],
    },
    {
      type: 'exposition',
      text: '**constexpr 函数**：C++14 起，constexpr 函数体内可以包含循环、分支等。\n如果参数是编译期常量，函数就在编译期执行。\n如果参数是运行时值，函数就作为普通函数运行。',
      code: 'constexpr int square(int x) {\n  return x * x;\n}\n\nconstexpr int s1 = square(5);   // 编译期：s1 = 25\nint y = 10;\nint s2 = square(y);              // 运行时：普通函数',
    },
    {
      type: 'type-it',
      instruction: '写一个 constexpr 函数并在编译期使用：',
      code: '#include <iostream>\nusing namespace std;\n\nconstexpr int cube(int x) {\n  return x * x * x;\n}\n\nint main() {\n  constexpr int val = cube(3);\n  cout << val << endl;\n}',
      hints: [
        'cube 是 constexpr 函数',
        'cube(3) 在编译期就求出 27',
        'val 是编译期常量 27',
      ],
    },
    {
      type: 'exposition',
      text: 'constexpr 函数在 C++14 中可以做的事情：\n- 分支：`if`、`switch`\n- 循环：`for`、`while`\n- 局部变量\n- 递归',
      code: 'constexpr int factorial(int n) {\n  int result = 1;\n  for (int i = 2; i <= n; ++i) {\n    result *= i;\n  }\n  return result;\n}\n\nconstexpr int f5 = factorial(5);  // 编译期 120',
    },
    {
      type: 'type-it',
      instruction: '写一个 constexpr 阶乘函数：',
      code: '#include <iostream>\nusing namespace std;\n\nconstexpr int factorial(int n) {\n  int result = 1;\n  for (int i = 2; i <= n; ++i) {\n    result *= i;\n  }\n  return result;\n}\n\nint main() {\n  constexpr int f = factorial(5);\n  cout << f << endl;\n}',
      hints: [
        'constexpr 函数可以用 for 循环',
        'factorial(5) = 5! = 120',
        'f 在编译期就是 120',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p09-01：const 修饰的变量有什么特性？',
      options: [
        { text: '值不能被修改', correct: true, explanation: 'const 变量初始化后不能修改' },
        { text: '值必须在编译期确定', correct: false, explanation: 'const 不要求编译期已知' },
        { text: '必须用 constexpr 初始化', correct: false, explanation: 'const 和 constexpr 是两回事' },
        { text: '可以跳过初始化', correct: false, explanation: 'const 变量也必须初始化' },
      ],
    },
    {
      type: 'exposition',
      text: '**constexpr 和模板**一起用特别强大：\n编译期计算 + 编译期类型，可以实现很多元编程。',
      code: 'template<int N>\nstruct Array {\n  int data[N];\n};\n\nconstexpr int getSize() { return 42; }\n\nArray<getSize()> arr;  // 编译期确定数组大小',
    },
    {
      type: 'type-it',
      instruction: 'constexpr 结合模板使用：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<int N>\nstruct Factorial {\n  static constexpr int value = N * Factorial<N - 1>::value;\n};\n\ntemplate<>\nstruct Factorial<0> {\n  static constexpr int value = 1;\n};\n\nint main() {\n  cout << Factorial<5>::value << endl;\n}',
      hints: [
        '模板元编程在编译期递归求阶乘',
        'Factorial<5>::value 在编译期就是 120',
        '这是 constexpr 的经典用法',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'constexpr 函数在什么时候执行？',
      options: [
        { text: '总是编译期执行', correct: false, explanation: '取决于参数，运行时参数则运行时执行' },
        { text: '编译期参数时编译期执行，运行时参数则运行时执行', correct: true, explanation: 'constexpr 函数有两种运行方式' },
        { text: '总是运行时执行', correct: false, explanation: 'constexpr 的目的就是编译期执行' },
        { text: '在链接时执行', correct: false, explanation: '不是链接时的概念' },
      ],
    },
    {
      type: 'exposition',
      text: 'C++17 起，`if constexpr` 可以在编译期进行条件分支：\n条件必须是编译期常量，不满足的分支代码不会生成。',
      code: 'template<typename T>\nauto getValue(T t) {\n  if constexpr (is_integral_v<T>) {\n    return t + 1;\n  } else {\n    return t + 0.5;\n  }\n}',
    },
    {
      type: 'type-it',
      instruction: '用 if constexpr 做编译期分支：',
      code: '#include <iostream>\n#include <type_traits>\nusing namespace std;\n\ntemplate<typename T>\nauto process(T t) {\n  if constexpr (is_integral_v<T>) {\n    return t * 2;\n  } else {\n    return t * 2.0;\n  }\n}\n\nint main() {\n  cout << process(5) << " " << process(2.5) << endl;\n}',
      hints: [
        'if constexpr 条件必须是编译期常量',
        'is_integral_v<int> 为 true，走整数分支',
        'is_integral_v<double> 为 false，走浮点分支',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-01：auto 和 constexpr 能同时使用吗？',
      options: [
        { text: '可以，constexpr auto x = func();', correct: true, explanation: 'constexpr auto 结合使用完全合法' },
        { text: '不可以，冲突', correct: false, explanation: '两者不冲突' },
        { text: '只能选一个', correct: false, explanation: '可以同时使用' },
        { text: 'auto 不能用于 constexpr', correct: false, explanation: 'auto 推导类型不影响 constexpr 语义' },
      ],
    },
    {
      type: 'exposition',
      text: 'constexpr 的注意事项：\n1. constexpr 函数在 C++11 限制很多（只能一条 return）\n2. C++14 放宽限制，支持循环和分支\n3. C++17 加入 `if constexpr`\n4. C++20 支持 constexpr 虚函数、动态分配等',
    },
    {
      type: 'type-it',
      instruction: '用 constexpr 计算斐波那契数列：',
      code: '#include <iostream>\nusing namespace std;\n\nconstexpr int fib(int n) {\n  if (n <= 1) return n;\n  int a = 0, b = 1;\n  for (int i = 2; i <= n; ++i) {\n    int next = a + b;\n    a = b;\n    b = next;\n  }\n  return b;\n}\n\nint main() {\n  constexpr int f10 = fib(10);\n  cout << f10 << endl;\n}',
      hints: [
        'fib(10) 是斐波那契数列第 10 项',
        '编译期计算 fib(10) = 55',
        'constexpr 函数可以有局部变量和循环',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个值不能用于 constexpr 变量？',
      options: [
        { text: '42', correct: false, explanation: '字面量没问题' },
        { text: 'rand()', correct: true, explanation: 'rand() 是运行时函数，不是编译期常量' },
        { text: 'sizeof(int)', correct: false, explanation: 'sizeof 是编译期运算符' },
        { text: 'factorial(5) 如果 factorial 是 constexpr', correct: false, explanation: 'constexpr 函数可以用' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- `constexpr` 让计算在编译期完成\n- constexpr 函数根据参数不同可以编译期或运行时执行\n- `if constexpr` 实现编译期分支\n- 使用 constexpr 可以提升性能、减小二进制体积',
    },
  ],
}

export default lesson
