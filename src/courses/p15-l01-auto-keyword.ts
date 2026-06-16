import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'auto-keyword',
    chapter: 16,
    title: 'auto 自动推导',
    subtitle: '让编译器帮你写类型',
    description: '学会用 auto 关键字让编译器自动推导变量类型，告别繁琐的类型书写。',
    objectives: ['能用 auto 声明变量', '理解 auto 的类型推导规则', '能在合适场景使用 auto'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '从 C++11 开始，有了一个很酷的关键字——`auto`。\n它的作用是：**让编译器自己推导变量的类型**。\n你只需要写 `auto`，编译器会根据初始值猜出类型。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '以前你写：\n`int x = 42;`\n`double y = 3.14;`\n现在可以简化为：',
      code: 'auto x = 42;      // 编译器推导出 int\nauto y = 3.14;    // 编译器推导出 double\nauto name = "hello"; // const char*',
    },
    {
      type: 'type-it',
      instruction: '用 auto 声明几个变量：',
      code: 'auto x = 10;\nauto y = 3.14;\nauto c = \'A\';',
      hints: [
        'auto x = 10 推导为 int',
        'auto y = 3.14 推导为 double',
        'auto c = \'A\' 推导为 char',
      ],
    },
    {
      type: 'exposition',
      text: '`auto` 并不是"无类型"或"动态类型"。\n变量一旦用 auto 声明，类型就**固定了**，只是你不需要手写而已。\n编译器在**编译期**就知道它是什么类型。',
    },
    {
      type: 'multiple-choice',
      question: '`auto x = 5.0f;` 中 x 是什么类型？',
      options: [
        { text: 'int', correct: false, explanation: '5.0f 是 float，不是 int' },
        { text: 'float', correct: true, explanation: '5.0f 后缀 f 表示 float' },
        { text: 'double', correct: false, explanation: 'double 不需要 f 后缀' },
        { text: 'auto', correct: false, explanation: 'auto 只是占位符，不是实际类型' },
      ],
    },
    {
      type: 'exposition',
      text: '`auto` 最常用的场景之一：**处理复杂的类型名**。\n想想 STL 容器的迭代器类型：\n`vector<int>::iterator it = v.begin();`\n用 auto 直接写：`auto it = v.begin();`',
      code: '#include <vector>\n\nstd::vector<int> v = {1, 2, 3};\nauto it = v.begin();  // 比 vector<int>::iterator 简洁多了',
    },
    {
      type: 'type-it',
      instruction: '用 auto 简化迭代器声明：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v = {10, 20, 30};\n  auto it = v.begin();\n  cout << *it << endl;\n}',
      hints: [
        'v.begin() 返回迭代器，auto 自动推导',
        '*it 解引用拿到当前元素 10',
        '用 auto 不用写复杂的迭代器类型',
      ],
    },
    {
      type: 'exposition',
      text: '`auto` 会**忽略引用和顶层 const**。\n意思是：如果变量原来有 `const` 或 `&`，auto 会剥掉它们。\n要保留的话，需要手动加。',
      code: 'const int x = 5;\nauto y = x;       // y 是 int，不是 const int\nauto& z = x;      // 加 & 才能保留引用语义\nauto& w = x;      // 加 & 得到 const int&（底层 const 保留）',
    },
    {
      type: 'type-it',
      instruction: '体会 auto 的 const 剥离：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  const int cx = 100;\n  auto x = cx;\n  x = 200;\n  cout << x << endl;\n}',
      hints: [
        'cx 是 const int',
        'auto x = cx 推导为 int（const 被剥离）',
        'x 可以被修改，不会报错',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p12-04 模板类型推导：auto 的推导规则和谁相同？',
      options: [
        { text: '函数模板的 T 推导', correct: true, explanation: 'auto 的推导规则和模板参数 T 完全一致' },
        { text: '函数重载决议', correct: false, explanation: '重载决议比 auto 复杂' },
        { text: '指针类型转换', correct: false, explanation: '指针转换和 auto 无关' },
        { text: '隐式类型转换', correct: false, explanation: 'auto 不允许隐式转换' },
      ],
    },
    {
      type: 'exposition',
      text: '`auto` 不能用于：\n1. 函数参数（可以用模板或 auto 参数 C++20）\n2. 类成员（C++17 起允许 inline static auto）\n3. 没有初始值的声明',
      code: 'auto x;            // ❌ 没有初始值，无法推导\nauto& r;           // ❌ 引用必须初始化\n\nint func(auto a) { // ❌ C++17 不行，C++20 可以\n  return a;\n}',
    },
    {
      type: 'type-it',
      instruction: '尝试错误的 auto 声明，看看编译器报错：',
      code: 'int main() {\n  auto x;\n  x = 42;\n}',
      hints: [
        'auto 声明时必须要有初始值',
        '没有初始值编译器无法推导类型',
        '会报 "cannot deduce auto type" 错误',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个 auto 用法是正确的？',
      options: [
        { text: 'auto x; x = 5;', correct: false, explanation: 'auto 必须有初始值' },
        { text: 'auto x = 5;', correct: true, explanation: 'auto 有初始值 5，推导为 int' },
        { text: 'auto const int x = 5;', correct: false, explanation: 'auto 和 const int 重复指定类型' },
        { text: 'auto();', correct: false, explanation: 'auto 不能单独作为函数调用' },
      ],
    },
    {
      type: 'exposition',
      text: '`auto` 配合 `const` 和 `&` 的常见写法：',
      code: 'const auto x = func();     // 想要 const 版本\nauto& r = someVar;         // 想要引用版本\nconst auto& cr = func();   // const 引用\n\n// 使用场景：遍历容器时避免拷贝\nfor (const auto& elem : vec) { ... }',
    },
    {
      type: 'type-it',
      instruction: '用 const auto& 遍历 vector，避免拷贝：',
      code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> words = {"hello", "world", "C++"};\n  for (const auto& w : words) {\n    cout << w << " ";\n  }\n}',
      hints: [
        'const auto& w 是 const 引用，不会拷贝每个元素',
        '遍历过程中不能修改 w',
        '输出结果：hello world C++',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p01-08：变量声明的基本格式是什么？',
      options: [
        { text: '类型 + 名字 + 分号', correct: true, explanation: '声明变量的基本格式' },
        { text: '名字 + 类型 + 分号', correct: false, explanation: '类型在前，名字在后' },
        { text: '类型 + 分号 + 名字', correct: false, explanation: '分号在最后' },
        { text: 'auto + 名字 + 分号', correct: false, explanation: 'auto 需要初始值' },
      ],
    },
    {
      type: 'exposition',
      text: '`auto` 的黄金法则：\n**当你写类型只是机械重复时，用 auto。**\n当你需要明确类型才能理解代码时，手写类型。\n适度的 auto 让代码更简洁、更安全。',
    },
    {
      type: 'type-it',
      instruction: '最后练习：综合使用 auto 的各种形式：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  auto num = 42;\n  auto pi = 3.14159;\n  vector<int> v = {1, 2, 3};\n  auto it = v.begin();\n  const auto& ref = v[0];\n  cout << num << " " << pi << " " << *it << " " << ref << endl;\n}',
      hints: [
        'num 是 int，pi 是 double',
        'it 是 vector<int>::iterator',
        'ref 是 const int&',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下关于 auto 的说法，哪个是正确的？',
      options: [
        { text: 'auto 是运行时动态类型', correct: false, explanation: 'auto 是编译期静态推导' },
        { text: 'auto 让代码变慢', correct: false, explanation: 'auto 不影响运行时性能' },
        { text: 'auto 让编译器帮你写类型', correct: true, explanation: 'auto 是类型推导，编译器自动完成' },
        { text: 'auto 要避免使用', correct: false, explanation: 'auto 是现代 C++ 推荐的写法' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：`auto` 是现代 C++ 最重要的关键字之一。\n它不改变代码的逻辑，只是让你少打字、少犯错。\n从今天开始，看到长长类型名时，想想能不能用 `auto`。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
