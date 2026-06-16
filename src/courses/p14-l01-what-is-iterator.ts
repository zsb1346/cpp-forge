import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'what-is-iterator',
    chapter: 15,
    title: '迭代器',
    subtitle: '容器和算法的桥梁',
    description: '理解迭代器的概念，学会用 begin/end 获取迭代器。',
    objectives: ['能说出迭代器的作用', '能用 begin 和 end 获取迭代器', '能用迭代器遍历容器'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`迭代器`（iterator）是 STL 里的**胶水**。\n容器存数据，算法处理数据——\n迭代器负责把两者连起来。',
    },
    {
      type: 'exposition',
      text: '迭代器长得**像指针**：\n用 `*` 获取它指向的元素，\n用 `++` 移到下一个元素。',
      code: 'std::vector<int> v = {10, 20, 30};\nauto it = v.begin();  // it 指向第一个元素\ncout << *it;          // 输出 10\n++it;                 // 指向下一个\ncout << *it;          // 输出 20',
    },
    {
      type: 'exposition',
      text: '每个 STL 容器都有 `begin()` 和 `end()`。\n`begin()` 返回指向**第一个元素**的迭代器，\n`end()` 返回指向**最后一个之后**的迭代器（不包含元素）。',
      code: 'vector<int> v = {1, 2, 3};\nauto first = v.begin();  // 指向 1\nauto last  = v.end();    // 指向 3 之后',
    },
    {
      type: 'concept-cards',
      instruction: '迭代器的三个核心概念：',
      cards: [
        { glyph: '🎯', term: 'iterator', meaning: '指向容器中某个位置的标记', example: 'vector<int>::iterator' },
        { glyph: '🏁', term: 'begin()', meaning: '返回指向第一个元素的迭代器', example: 'auto it = v.begin();' },
        { glyph: '🏁', term: 'end()', meaning: '返回指向末尾之后（不包含元素）的迭代器', example: 'auto it = v.end();' },
      ],
    },
    {
      type: 'exposition',
      text: '`auto` 关键字让 C++ 自动推断类型。\n写 `auto it = v.begin();` 就不用写长长的 `vector<int>::iterator` 了。',
    },
    {
      type: 'type-it',
      instruction: '获取 vector 的 begin 和 end 迭代器：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v = {5, 10, 15};\n  auto it = v.begin();\n  cout << *it << endl;\n  ++it;\n  cout << *it;\n}',
      hints: [
        'auto 自动推断迭代器类型',
        '*it 获取迭代器指向的元素',
        '++it 让迭代器指向下一个元素',
      ],
    },
    {
      type: 'exposition',
      text: '用 for 循环加迭代器可以遍历整个容器：\n从 `begin()` 走到 `end()`，\n每次 `++it` 直到不等于 `end()`。',
      code: 'for (auto it = v.begin(); it != v.end(); ++it) {\n  cout << *it << " ";\n}',
    },
    {
      type: 'type-it',
      instruction: '用迭代器遍历 vector：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v = {2, 4, 6, 8};\n  for (auto it = v.begin(); it != v.end(); ++it) {\n    cout << *it << " ";\n  }\n}',
      hints: [
        '循环从 begin() 到 end() 结束',
        'it != v.end() 是循环条件',
        '每次 ++it 移到下一个元素',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`vector<int> v = {1, 2, 3};` 中 v.end() 指向哪里？',
      options: [
        { text: '指向最后一个元素 3', correct: false, explanation: 'end() 指向最后一个元素之后，不是最后一个元素' },
        { text: '指向第一个元素 1', correct: false, explanation: '那是 begin()' },
        { text: '指向 3 之后的一个特殊标记', correct: true, explanation: 'end() 指向末尾之后，不包含有效元素' },
        { text: '指向 0', correct: false, explanation: 'end() 不指向任何有效元素' },
      ],
    },
    {
      type: 'exposition',
      text: '迭代器支持**自增**（`++`）和**解引用**（`*`）。\n`it++` 或 `++it` 移到下一个位置，\n`*it` 获取当前位置的值。',
    },
    {
      type: 'type-it',
      instruction: '练习迭代器的自增和解引用：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v = {100, 200, 300};\n  auto it = v.begin();\n  cout << *it << " ";\n  ++it;\n  cout << *it << " ";\n  ++it;\n  cout << *it << endl;\n}',
      hints: [
        'begin() 指向第一个元素 100',
        '每次 ++it 移到下一个位置',
        '*it 获取当前指向的元素值',
      ],
    },
    {
      type: 'fill-in',
      prompt: '声明一个迭代器指向 vector 的第一个元素',
      template: '#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 2, 3};\n  ____ it = ____;\n  // *it 的值是 1\n}',
      answers: ['auto', 'v.begin()'],
      hints: ['第一个空是类型推导关键字', '第二个空是获取首元素迭代器的函数'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`vector` 的 `push_back` 是做什么的？',
      options: [
        { text: '删除最后一个元素', correct: false, explanation: 'push_back 是添加，不是删除' },
        { text: '在尾部添加一个元素', correct: true, explanation: 'push_back 在尾部插入新元素，vector 自动扩容' },
        { text: '获取元素个数', correct: false, explanation: '那是 size()' },
        { text: '清空所有元素', correct: false, explanation: 'push_back 添加一个元素，不是清空' },
      ],
    },
    {
      type: 'exposition',
      text: '迭代器不止用于 vector——\n`string`、`list`、`map` 等所有 STL 容器都有 `begin()` 和 `end()`。\n学会了迭代器，就学会了访问所有容器的统一方式。',
      code: 'string s = "hello";\nauto it = s.begin();  // 指向 \'h\'\ncout << *it;         // 输出 h',
    },
    {
      type: 'type-it',
      instruction: '用迭代器遍历 string（也是容器！）：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  string s = "C++";\n  for (auto it = s.begin(); it != s.end(); ++it) {\n    cout << *it << " ";\n  }\n}',
      hints: [
        'string 也是容器，有 begin() 和 end()',
        '*it 获取当前字符',
        '循环直到 it 走到 s.end()',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，用迭代器输出 vector 的前两个元素',
      template: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {7, 8, 9};\n  auto it = v.____();\n  std::cout << *it;\n  ++____;\n  std::cout << *it << "\\n";\n}',
      answers: ['begin', 'it'],
      hints: ['第一个空是获取首元素迭代器的函数', '第二个空是迭代器变量名'],
    },
    {
      type: 'exposition',
      text: '**核心记法**：\n`begin()` 是起点，`end()` 是终点线（不包含），\n用 `*` 看指向的值，用 `++` 往前走。',
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察迭代器如何遍历容器：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 1, 4, 1, 5};\n  cout << "遍历: ";\n  for (auto it = v.begin(); it != v.end(); ++it) {\n    cout << *it << " ";\n  }\n  cout << endl;\n  cout << "第一个: " << *v.begin() << endl;\n  cout << "大小: " << v.size() << endl;\n}',
      expectedOutput: '遍历: 3 1 4 1 5 \n第一个: 3\n大小: 5',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：`vector<int> v;` 声明后，v.size() 是多少？',
      options: [
        { text: '未定义', correct: false, explanation: '默认构造的 vector 是空的，size 为 0' },
        { text: '0', correct: true, explanation: '默认构造的 vector 为空，没有元素' },
        { text: '随机值', correct: false, explanation: 'vector 默认构造不会有随机值' },
        { text: '无法确定', correct: false, explanation: 'vector 默认构造后 size 就是 0' },
      ],
    },
    {
      type: 'exposition',
      text: '迭代器是理解 STL 算法的关键。\n下一课我们学习迭代器的**五种分类**——\n不同迭代器能力不一样。',
    },
  ],
}

export default lesson
