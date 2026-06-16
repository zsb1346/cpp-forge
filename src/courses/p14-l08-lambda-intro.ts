import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'lambda-intro',
    chapter: 15,
    title: 'Lambda 表达式',
    subtitle: '[ ](参数){ 代码 }',
    description: '理解 lambda 表达式的完整语法结构。',
    objectives: ['能写出一个简单的 lambda', '能用 lambda 作为算法参数'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '**Lambda 表达式**是 C++11 引入的特性。\n它让你在需要函数的地方**就地编写一个匿名函数**。\n前面我们用过的 `[](int x) { return x % 2 == 0; }` 就是 lambda。',
    },
    {
      type: 'exposition',
      text: 'lambda 的完整语法：\n`[捕获列表](参数列表) -> 返回类型 { 函数体 }`\n最常用的形式：`[](参数列表) { 函数体 }`。\n大部分时候 `->` 返回类型可以省略，编译器自动推断。',
      code: '// 完整写法\n[](int x, int y) -> int { return x + y; }\n\n// 省略返回类型的写法（常用）\n[](int x, int y) { return x + y; }',
    },
    {
      type: 'exposition',
      text: '**`[]`——捕获列表**：\n在最前面，决定 lambda 能访问外部哪些变量。\n空捕获 `[]` 表示不能访问外部的任何变量。\n后面会详细学各种捕获模式。',
    },
    {
      type: 'exposition',
      text: '**`()`——参数列表**：\n和普通函数一样写参数。\n`[](int x)` 接收一个 `int` 参数，\n`[ ](string s)` 接收一个 `string`，\n没有参数时 `()` 可以省略。',
    },
    {
      type: 'exposition',
      text: '**`{}`——函数体**：\n写实际要执行的代码。\n和普通函数体一样，可以有多条语句。\n如果有返回值，用 `return`。',
      code: '[](int x) {\n  cout << "值: " << x << endl;\n  return x * 2;\n}',
    },
    {
      type: 'concept-cards',
      instruction: 'Lambda 的四个部分：',
      cards: [
        { glyph: '📥', term: '[] 捕获列表', meaning: '控制能访问哪些外部变量', example: '[x] 捕获 x' },
        { glyph: '📋', term: '(参数) 形参', meaning: '和普通函数一样传参', example: '(int a, int b)' },
        { glyph: '➡️', term: '-> 返回类型', meaning: '可选，通常自动推断', example: '-> int' },
        { glyph: '📦', term: '{ 函数体 }', meaning: '实际执行的代码', example: '{ return a+b; }' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个最简单的 lambda——两个数相加：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  auto add = [](int a, int b) { return a + b; };\n  cout << add(3, 4);\n}',
      hints: [
        'auto 自动推断 lambda 类型',
        'lambda 写完后可以直接调用',
        'add(3, 4) 调用 lambda 得到 7',
      ],
    },
    {
      type: 'exposition',
      text: 'lambda 可以赋值给 `auto` 变量，\n然后像普通函数一样调用：\n`auto f = [](int x) { return x * x; };`\n`cout << f(5);` → 输出 25。',
    },
    {
      type: 'type-it',
      instruction: '用 lambda 计算平方：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  auto square = [](int x) { return x * x; };\n  cout << square(5) << " " << square(6);\n}',
      hints: [
        'lambda 赋值给 auto 变量后就可以复用',
        '函数体 { return x * x; } 返回平方',
        'square(5) = 25, square(6) = 36',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`find_if` 的第三个参数是什么？',
      options: [
        { text: '一个值', correct: false, explanation: 'find_if 接受条件谓词，不是值' },
        { text: '一个条件函数/lambda', correct: true, explanation: 'find_if 用条件判断来查找元素' },
        { text: '一个迭代器', correct: false, explanation: '前两个参数是迭代器范围，第三个是条件' },
        { text: 'bool 值', correct: false, explanation: '第三个参数是函数/lambda，不是 bool' },
      ],
    },
    {
      type: 'exposition',
      text: 'lambda 最常见的用途就是作为 STL 算法的参数：\n`find_if`、`count_if`、`sort`（自定义排序规则）、\n`for_each`、`transform` 等都需要传入"操作"。',
      code: '// lambda 作为 sort 的比较规则\nsort(v.begin(), v.end(), [](int a, int b) {\n  return a > b;  // 降序\n});\n\n// lambda 作为过滤条件\nint n = count_if(v.begin(), v.end(), [](int x) {\n  return x > 10;\n});',
    },
    {
      type: 'type-it',
      instruction: '用 lambda 自定义 sort 的排序规则：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 1, 4, 1, 5};\n  sort(v.begin(), v.end(), [](int a, int b) {\n    return a > b;\n  });\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'lambda 作为 sort 的第三个参数',
        'return a > b 表示降序排列',
        '不需要写 -> bool，编译器自动推断',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是合法的 lambda 表达式？',
      options: [
        { text: '[](int x) { return x * 2; }', correct: true, explanation: '空捕获 + int 参数 + 返回表达式' },
        { text: '[int x] { return x; }', correct: false, explanation: '捕获列表只能写变量名，不能写类型' },
        { text: '[](x) { return x; }', correct: false, explanation: '参数需要类型，不能省略' },
        { text: '[]()', correct: false, explanation: '没有函数体，语法不完整' },
      ],
    },
    {
      type: 'exposition',
      text: 'lambda 本质上是创建了一个**函数对象**（functor）。\n编译器会自动生成一个类，\n重载了 `operator()`。\n所以 lambda 和普通函数在使用上没什么区别。',
    },
    {
      type: 'type-it',
      instruction: '用 lambda 过滤出所有偶数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4, 5, 6};\n  int n = count_if(v.begin(), v.end(), [](int x) {\n    return x % 2 == 0;\n  });\n  cout << "偶数个数: " << n;\n}',
      hints: [
        'count_if + lambda 是常见组合',
        'x % 2 == 0 判断偶数',
        '结果应该是 3（2, 4, 6）',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：创建一个输出问候语的 lambda',
      template: '#include <iostream>\n\nint main() {\n  auto greet = [____]() {\n    std::cout << "你好";\n  };\n  greet();\n}',
      answers: [''],
      hints: ['不需要捕获外部变量，捕获列表写空'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`max_element` 返回的是什么？',
      options: [
        { text: '最大值（一个整数）', correct: false, explanation: 'max_element 返回迭代器，不是值' },
        { text: '指向最大元素的迭代器', correct: true, explanation: '需要 *it 来获取最大值' },
        { text: 'bool 表示是否找到', correct: false, explanation: 'max_element 返回迭代器，不是 bool' },
        { text: '最大值和最小值', correct: false, explanation: '那是 minmax_element' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，验证 lambda 作为算法参数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {4, 7, 2, 9, 3};\n\n  sort(v.begin(), v.end(), [](int a, int b) {\n    return a > b;\n  });\n  cout << "降序: ";\n  for (int x : v) cout << x << " ";\n  cout << endl;\n\n  auto it = find_if(v.begin(), v.end(), [](int x) {\n    return x < 5;\n  });\n  cout << "第一个小于 5 的: " << *it;\n}',
      expectedOutput: '降序: 9 7 4 3 2 \n第一个小于 5 的: 4',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: 'lambda 是现代 C++ 最实用的特性之一。\n下一课我们深入学**捕获模式**——\n`[=]`、`[&]`、`[x]` 的区别。',
    },
  ],
}

export default lesson
