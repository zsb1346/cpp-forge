import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'decltype',
    chapter: 16,
    title: 'decltype 类型查询',
    subtitle: '表达式的类型',
    description: '学习用 decltype 获取表达式的类型，用于模板编程和复杂类型推导。',
    objectives: ['能用 decltype 获取表达式类型', '理解 decltype 和 auto 的区别', '能在返回类型后置场景使用 decltype'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`decltype` 是 C++11 引入的关键字，作用是：**问编译器"这个表达式的类型是什么"**。\n它不会执行表达式，只查询类型。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '基本用法：\n`decltype(表达式)` 得到该表达式的类型。\n类型是在编译期确定的。',
      code: 'int x = 42;\ndecltype(x) y = 10;       // y 是 int\n\ndouble d = 3.14;\ndecltype(d + x) z;         // z 是 double（int+double→double）\n\ndecltype(5) val = 0;       // val 是 int',
    },
    {
      type: 'type-it',
      instruction: '用 decltype 获取变量类型：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 42;\n  decltype(x) y = 100;\n  cout << y << endl;\n}',
      hints: [
        'decltype(x) 得到 int',
        'y 被声明为 int 类型',
        '结果输出 100',
      ],
    },
    {
      type: 'exposition',
      text: '`decltype` 和 `auto` 的关键区别：\n- **auto**：根据初始值推导类型，会剥离引用和顶层 const\n- **decltype**：精确返回表达式的类型，**保留引用和 const**',
      code: 'int x = 5;\nint& rx = x;\n\nauto a = rx;             // int，引用被剥离\ndecltype(rx) b = x;      // int&，引用保留\n\nconst int cx = 5;\nauto ca = cx;             // int，const 被剥离\ndecltype(cx) cb = 5;      // const int，const 保留',
    },
    {
      type: 'type-it',
      instruction: '对比 auto 和 decltype 对引用的处理：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 5;\n  int& rx = x;\n  \n  auto a = rx;\n  a = 10;\n  cout << x << endl;\n  \n  decltype(rx) b = x;\n  b = 20;\n  cout << x << endl;\n}',
      hints: [
        'auto a = rx 得到 int，a 是独立拷贝',
        'decltype(rx) 得到 int&，b 是 x 的引用',
        'a = 10 不改变 x，b = 20 改变 x',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`int x = 5; int& r = x;` 之后 `decltype(r)` 是什么？',
      options: [
        { text: 'int', correct: false, explanation: 'decltype 保留引用，r 是 int&' },
        { text: 'int&', correct: true, explanation: 'decltype 精确返回表达式的引用类型' },
        { text: 'int&&', correct: false, explanation: 'int&& 是右值引用，这里不是' },
        { text: 'const int&', correct: false, explanation: 'r 不是 const 引用' },
      ],
    },
    {
      type: 'exposition',
      text: '`decltype` 的典型场景：**返回类型后置**。\n当你写模板函数时，返回类型依赖参数类型，可以用 auto + decltype。',
      code: '// 返回两个数的和，返回类型取决于参数类型\ntemplate<typename T, typename U>\nauto add(T a, U b) -> decltype(a + b) {\n  return a + b;\n}\n\n// C++14 起可以直接写 auto\n// C++11 需要 -> decltype',
    },
    {
      type: 'type-it',
      instruction: '用 decltype 后置返回类型：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename T, typename U>\nauto mul(T a, U b) -> decltype(a * b) {\n  return a * b;\n}\n\nint main() {\n  cout << mul(3, 4.5) << endl;\n}',
      hints: [
        'decltype(a * b) 推导出返回类型',
        'int * double 返回 double',
        '输出 13.5',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-01：auto 的推导和 decltype 有什么不同？',
      options: [
        { text: 'auto 剥离引用和顶层 const', correct: true, explanation: 'auto 剥离引用和顶层 const，decltype 保留' },
        { text: '没区别', correct: false, explanation: '两者推导规则不同' },
        { text: 'decltype 剥离引用', correct: false, explanation: 'decltype 保留引用' },
        { text: 'auto 保留 const', correct: false, explanation: 'auto 剥离顶层 const' },
      ],
    },
    {
      type: 'exposition',
      text: '`decltype` 对表达式的处理有三种情况：\n1. 如果是**未加括号的变量名**，返回该变量的声明类型\n2. 如果是**加括号的变量名**，返回引用类型\n3. 如果是**其他表达式**，返回表达式结果类型',
      code: 'int x = 5;\n\ndecltype(x)    a;   // int\ndecltype((x))  b = x;  // int&（括号导致引用）\n\ndecltype(42)   c;   // int（纯右值）\ndecltype(x+1)  d;   // int（表达式结果类型）',
    },
    {
      type: 'type-it',
      instruction: '体会括号对 decltype 的影响：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int x = 5;\n  decltype(x) a = x;\n  decltype((x)) b = x;\n  \n  a = 10;\n  cout << x << endl;\n  \n  b = 20;\n  cout << x << endl;\n}',
      hints: [
        'decltype(x) 得到 int，a 是独立变量',
        'decltype((x)) 得到 int&，b 是引用',
        'b = 20 会修改 x 的值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`decltype((x))` 和 `decltype(x)` 有什么区别？',
      options: [
        { text: '没有区别，结果一样', correct: false, explanation: '括号会导致引用语义' },
        { text: '括号版本总是引用类型', correct: true, explanation: '加括号后 decltype 返回引用类型' },
        { text: '括号版本总是值类型', correct: false, explanation: '相反，括号版本是引用类型' },
        { text: '括号版本会编译错误', correct: false, explanation: '这是合法的用法' },
      ],
    },
    {
      type: 'exposition',
      text: '`decltype` 在**模板元编程**中特别有用。\n比如你想声明一个和某个表达式相同类型的变量，\n但不知道具体类型时：',
      code: 'template<typename Container>\nauto getFirst(Container& c) -> decltype(c[0]) {\n  return c[0];\n}\n\n// 或者 C++14 起\ntemplate<typename Container>\ndecltype(auto) getFirst(Container& c) {\n  return c[0];\n}',
    },
    {
      type: 'exposition',
      text: 'C++14 引入了 `decltype(auto)`：\n用 auto 的位置，但使用 decltype 的推导规则。\n它在**完美转发**场景特别有用。',
      code: 'int x = 5;\nint& foo();\n\nauto ra = foo();           // int，引用被剥离\ndecltype(auto) rb = foo(); // int&，引用保留\n\n// decltype(auto) 等价于 decltype(foo())',
    },
    {
      type: 'type-it',
      instruction: '使用 decltype(auto) 保留引用语义：',
      code: '#include <iostream>\nusing namespace std;\n\nint& getRef(int& x) {\n  return x;\n}\n\nint main() {\n  int val = 42;\n  decltype(auto) r = getRef(val);\n  r = 100;\n  cout << val << endl;\n}',
      hints: [
        'getRef 返回 int&',
        'decltype(auto) 保留引用语义',
        'r 是 val 的引用，修改 r 会改 val',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p11-07：转发引用（forwarding reference）是什么形式？',
      options: [
        { text: 'T&& 在模板参数中', correct: true, explanation: 'T&& 在模板中可以是左值或右值引用' },
        { text: 'int&&', correct: false, explanation: 'int&& 是右值引用，不是转发引用' },
        { text: 'T&', correct: false, explanation: 'T& 只是左值引用' },
        { text: 'auto&&', correct: true, explanation: 'auto&& 也是转发引用' },
      ],
      mode: 'multiple',
    },
    {
      type: 'exposition',
      text: '`decltype` 和 `decltype(auto)` 的最佳实践：\n1. 模板返回类型依赖参数时用 `-> decltype(...)`\n2. 需要精确保留引用/const 时用 `decltype(auto)`\n3. 平时普通变量声明用 `auto` 就够了',
    },
    {
      type: 'type-it',
      instruction: '写一个模板函数，返回两个值的较大者：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename T, typename U>\nauto myMax(T a, U b) -> decltype(a > b ? a : b) {\n  return a > b ? a : b;\n}\n\nint main() {\n  cout << myMax(10, 20.5) << endl;\n}',
      hints: [
        '三目运算符的结果类型是 T 和 U 的共同类型',
        'int 和 double 的三目结果类型是 double',
        '输出 20.5',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`decltype` 是在什么时候确定类型的？',
      options: [
        { text: '运行时', correct: false, explanation: 'decltype 是编译期工具' },
        { text: '编译期', correct: true, explanation: 'decltype 在编译期确定类型，不影响运行时' },
        { text: '链接时', correct: false, explanation: '链接时不涉及类型推导' },
        { text: '不确定', correct: false, explanation: '编译期就能确定' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- `decltype` 查询表达式类型，不执行表达式\n- 保留引用和 const，和 auto 的剥离规则不同\n- `decltype(auto)` 组合了 auto 的简洁和 decltype 的精度\n- 主要用于模板编程和泛型代码',
    },
  ],
}

export default lesson
