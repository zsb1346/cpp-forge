import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'structured-binding',
    chapter: 16,
    title: '结构化绑定',
    subtitle: '拆开 pair/tuple',
    description: '学习用结构化绑定语法一次性拆开 pair、tuple、struct 中的多个值。',
    objectives: ['能用结构化绑定拆开 pair', '能配合范围 for 遍历 map', '理解 auto 在结构化绑定中的作用'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'C++17 引入了**结构化绑定**（structured binding）：\n让你一次性解构数组、pair、tuple 或 struct 的多个成员。\n写起来像 Python 的拆包。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '最基本用法——解构 pair：\n`auto [键, 值] = pair对象;`\n这样就把 first 和 second 分别赋给了两个变量。',
      code: '#include <utility>\n\nstd::pair<int, double> p = {42, 3.14};\nauto [num, val] = p;\n// num = 42, val = 3.14\n\ncout << num << " " << val;',
    },
    {
      type: 'type-it',
      instruction: '用结构化绑定解构 pair：',
      code: '#include <iostream>\n#include <utility>\nusing namespace std;\n\nint main() {\n  pair<string, int> student = {"Alice", 95};\n  auto [name, score] = student;\n  cout << name << ": " << score << endl;\n}',
      hints: [
        'pair 的 first 和 second 分别绑定到 name 和 score',
        'name 是 string，score 是 int',
        '输出: Alice: 95',
      ],
    },
    {
      type: 'exposition',
      text: '结构化绑定 + 范围 for 遍历 map：\n以前要用 `p.first` 和 `p.second`，\n现在直接 `[key, value]` 就行。',
      code: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, int> scores = {{\"Alice\", 95}, {\"Bob\", 87}};\n  \n  // 以前:\n  for (const auto& p : scores) {\n    cout << p.first << ": " << p.second << endl;\n  }\n  \n  // 现在:\n  for (const auto& [name, score] : scores) {\n    cout << name << ": " << score << endl;\n  }\n}',
    },
    {
      type: 'type-it',
      instruction: '用结构化绑定遍历 map：',
      code: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, double> prices = {{\"apple\", 2.5}, {\"banana\", 1.2}};\n  for (const auto& [fruit, price] : prices) {\n    cout << fruit << ": $" << price << endl;\n  }\n}',
      hints: [
        '[fruit, price] 直接解构 map 的 pair',
        'const auto& 避免拷贝，只读遍历',
        '$2.5 会输出为 2.5',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-03：范围 for 中 `const auto&` 的作用是什么？',
      options: [
        { text: '只读引用，避免拷贝', correct: true, explanation: 'const auto& 是高效只读遍历的标准写法' },
        { text: '拷贝每个元素', correct: false, explanation: '引用不会拷贝' },
        { text: '允许修改元素', correct: false, explanation: 'const 禁止修改' },
        { text: '让循环加速', correct: false, explanation: '引用避免拷贝间接加速，但不是主要目的' },
      ],
    },
    {
      type: 'exposition',
      text: '解构数组也很方便：\n`auto [a, b, c] = arr;`\n数组元素个数必须和变量个数一致。',
      code: 'int arr[3] = {10, 20, 30};\nauto [x, y, z] = arr;\n// x=10, y=20, z=30\n\n// 也可以用于 C 风格数组\nchar chars[] = {\'A\', \'B\', \'C\'};\nauto [c1, c2, c3] = chars;',
    },
    {
      type: 'type-it',
      instruction: '用结构化绑定解构数组：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int coords[3] = {10, 20, 30};\n  auto [x, y, z] = coords;\n  cout << x + y + z << endl;\n}',
      hints: [
        '数组有 3 个元素，变量也要 3 个',
        'x=10, y=20, z=30',
        '和为 60',
      ],
    },
    {
      type: 'exposition',
      text: '解构 struct：结构化绑定可以解构所有**公开的、非静态的**数据成员。\n只要 struct 的成员变量是 public 的，就能直接拆。',
      code: 'struct Point {\n  double x;\n  double y;\n};\n\nPoint p = {3.5, 2.0};\nauto [px, py] = p;\n// px = 3.5, py = 2.0',
    },
    {
      type: 'type-it',
      instruction: '用结构化绑定解构 struct：',
      code: '#include <iostream>\nusing namespace std;\n\nstruct Point {\n  double x;\n  double y;\n};\n\nint main() {\n  Point p = {1.5, 2.5};\n  auto [a, b] = p;\n  cout << a + b << endl;\n}',
      hints: [
        'Point 有 x 和 y 两个公开成员',
        'a 绑定到 x=1.5，b 绑定到 y=2.5',
        '和为 4.0',
      ],
    },
    {
      type: 'multiple-choice',
      question: '结构化绑定可以解构哪些类型？',
      options: [
        { text: '只有 pair', correct: false, explanation: '还有数组、tuple、struct 等' },
        { text: 'pair、数组、tuple、struct', correct: true, explanation: '结构化绑定支持这几种类型' },
        { text: '只有自定义 struct', correct: false, explanation: '标准库类型也支持' },
        { text: '只能解构 map', correct: false, explanation: 'map 的元素是 pair，但绑定不限于 map' },
      ],
    },
    {
      type: 'exposition',
      text: '解构 tuple：`std::tuple` 可以装任意多个不同类型的值。\n用结构化绑定取出来最方便。',
      code: '#include <tuple>\n\nstd::tuple<int, double, string> t = {1, 2.5, "hello"};\nauto [i, d, s] = t;\n// i=1, d=2.5, s="hello"',
    },
    {
      type: 'type-it',
      instruction: '解构 tuple：',
      code: '#include <iostream>\n#include <tuple>\n#include <string>\nusing namespace std;\n\nint main() {\n  tuple<int, string, double> t = {100, "test", 9.99};\n  auto [id, label, price] = t;\n  cout << label << " #" << id << ": $" << price << endl;\n}',
      hints: [
        'tuple 可以有任意多个不同类型的成员',
        '变量数量和类型必须匹配 tuple 成员',
        '输出: test #100: $9.99',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-01：auto 在结构化绑定中的作用是什么？',
      options: [
        { text: '自动推导每个变量的类型', correct: true, explanation: 'auto 推导每个解构变量的类型' },
        { text: '让变量称为引用', correct: false, explanation: '需要写 auto& 才是引用' },
        { text: '让变量可变', correct: false, explanation: 'auto 本身不决定可变性' },
        { text: '忽略 const', correct: false, explanation: 'auto 会剥离顶层 const' },
      ],
    },
    {
      type: 'exposition',
      text: '结构化绑定可以加引用和 const：\n- `auto& [a, b] = p;` ——引用，可以修改\n- `const auto& [a, b] = p;` ——const 引用，只读',
      code: 'pair<int, int> p = {1, 2};\n\nauto& [x, y] = p;\nx = 10;  // 修改 p.first\ny = 20;  // 修改 p.second\n\n// p 变成 {10, 20}\n\nconst auto& [rx, ry] = p;\n// rx = 99;  // ❌ const 不能修改',
    },
    {
      type: 'type-it',
      instruction: '用引用修改结构化绑定的值：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  pair<int, int> p = {1, 2};\n  auto& [a, b] = p;\n  a = 10;\n  b = 20;\n  cout << p.first << " " << p.second << endl;\n}',
      hints: [
        'auto& 让 a 和 b 成为引用',
        '修改 a 等于修改 p.first',
        '输出: 10 20',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用结构化绑定遍历 map<string, int>',
      template: '#include <iostream>\n#include <____>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, int> ages = {{\"Alice\", 25}};\n  for (const auto& [____, ____] : ages) {\n    cout << name << ": " << age << endl;\n  }\n}',
      answers: ['map', 'name', 'age'],
      hints: ['第一空是 map 的头文件', '第二空绑定到键（string 类型）', '第三空绑定到值（int 类型）'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：解构返回 pair 的函数',
      template: '#include <iostream>\n#include <____>\nusing namespace std;\n\npair<int, int> getMinMax(int a, int b) {\n  if (a < b) return {a, b};\n  return {b, a};\n}\n\nint main() {\n  auto [____, ____] = getMinMax(10, 5);\n  cout << "min: " << mn << ", max: " << mx << endl;\n}',
      answers: ['utility', 'mn', 'mx'],
      hints: ['第一空是 pair 的头文件', '第二空是较小值', '第三空是较大值'],
    },
    {
      type: 'exposition',
      text: '总结：\n- 结构化绑定让解构 pair/tuple/struct 变得极其简洁\n- 配合范围 for 遍历 map 是最高频场景\n- `auto&` 可以修改原数据，`const auto&` 只读\n- C++17 最重要的语法糖之一',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
