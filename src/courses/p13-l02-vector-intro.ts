import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'vector-intro',
    chapter: 14,
    title: 'vector 动态数组',
    subtitle: 'push_back 和 size',
    description: '学会用 vector 存数据并获取容器大小。',
    objectives: ['能声明 vector 并添加元素', '能用 size 获取元素个数'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`vector` 是 STL 里**最常用**的容器。\n它就是一个**能自动增长的数组**——\n不需要你管容量，往里面塞东西就行。',
    },
    {
      type: 'exposition',
      text: '声明 vector：`vector<类型> 变量名;`\n尖括号里写你要存什么类型。\n比如 `vector<int> scores;`——存整数的动态数组。',
      code: '#include <vector>\n\nstd::vector<int> scores;\nstd::vector<std::string> names;',
    },
    {
      type: 'concept-cards',
      instruction: 'vector 的三个核心操作：',
      cards: [
        { glyph: '📦', term: 'vector<int> v', meaning: '声明一个存整数的 vector', example: 'vector<double> v;' },
        { glyph: '➕', term: 'v.push_back(x)', meaning: '在尾部添加一个元素', example: 'v.push_back(42);' },
        { glyph: '📏', term: 'v.size()', meaning: '返回元素个数', example: 'cout << v.size();' },
      ],
    },
    {
      type: 'type-it',
      instruction: '声明 vector，添加两个元素：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> nums;\n  nums.push_back(10);\n  nums.push_back(20);\n  std::cout << nums.size();\n}',
      hints: [
        'push_back 是成员函数，用 . 调用',
        'push_back 的参数是要添加的元素值',
        'size() 返回元素个数，输出应该是 2',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`vector<int> v; v.push_back(5); v.push_back(3);` 之后 v.size() 是多少？',
      options: [
        { text: '2', correct: true, explanation: 'push_back 两次，size 就是 2' },
        { text: '0', correct: false, explanation: 'size 是元素个数，不是容量' },
        { text: '1', correct: false, explanation: '添加了两个元素，size 应该是 2' },
        { text: '未定义', correct: false, explanation: 'push_back 之后 size 是明确的' },
      ],
    },
    {
      type: 'exposition',
      text: '用 `[]` 可以访问 vector 中的元素，就像访问普通数组一样：\n`v[0]` 是第一个，`v[1]` 是第二个。\n**下标从 0 开始**。',
      code: '#include <vector>\n\nstd::vector<int> v = {10, 20, 30};\nstd::cout << v[1];  // 输出 20',
    },
    {
      type: 'type-it',
      instruction: '声明 vector 并初始化，然后访问元素：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {5, 10, 15};\n  std::cout << v[0] << " " << v[2];\n}',
      hints: [
        '花括号初始化可以一次性给多个元素',
        'v[0] 是第一个元素 5',
        'v[2] 是第三个元素 15',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察 vector 的 push_back 和 size：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v;\n  v.push_back(3);\n  v.push_back(7);\n  v.push_back(1);\n  cout << "size: " << v.size() << endl;\n  cout << v[0] << " " << v[1] << " " << v[2];\n}',
      expectedOutput: 'size: 3\n3 7 1',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '遍历 vector 可以用普通的 `for` 循环：\n按下标 0 到 size()-1 逐个访问。',
      code: 'for (int i = 0; i < v.size(); i++) {\n  std::cout << v[i] << " ";\n}',
    },
    {
      type: 'type-it',
      instruction: '用 for 循环遍历 vector：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {2, 4, 6, 8};\n  for (int i = 0; i < v.size(); i++) {\n    std::cout << v[i] << " ";\n  }\n}',
      hints: [
        '循环变量 i 从 0 到 v.size()-1',
        '用 v[i] 访问每个元素',
        'v.size() 返回无符号整数，放心对比',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：普通数组 `int arr[3];` 和 vector 的主要区别是什么？',
      options: [
        { text: 'vector 能自动扩大容量', correct: true, explanation: '普通数组大小固定，vector 自动扩容' },
        { text: 'vector 只能用下标访问', correct: false, explanation: '普通数组也能用下标访问' },
        { text: '普通数组不需要头文件', correct: true, explanation: '这是一个区别，但主要区别是容量固定' },
        { text: 'vector 更慢', correct: false, explanation: 'vector 和数组性能相当' },
      ],
      mode: 'multiple',
    },
    {
      type: 'code-runner',
      instruction: '运行程序，验证你学到的 vector 用法：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<string> names;\n  names.push_back("Alice");\n  names.push_back("Bob");\n  names.push_back("Charlie");\n  \n  cout << "人数: " << names.size() << endl;\n  for (int i = 0; i < names.size(); i++) {\n    cout << i + 1 << ". " << names[i] << endl;\n  }\n}',
      expectedOutput: '人数: 3\n1. Alice\n2. Bob\n3. Charlie',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：`int arr[5];` 和 `vector<int> v;` 的第一个关键区别是什么？',
      options: [
        { text: '数组用 []，vector 用 ()', correct: false, explanation: 'vector 也用 [] 访问元素' },
        { text: '数组大小固定，vector 可以自动增长', correct: true, explanation: '数组声明后不能改变大小，vector 用 push_back 自动扩容' },
        { text: '数组不能存 int', correct: false, explanation: '数组可以存任何类型' },
        { text: 'vector 不需要头文件', correct: false, explanation: 'vector 需要 #include <vector>' },
      ],
    },
    {
      type: 'type-it',
      instruction: '声明 double 类型的 vector 并遍历：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<double> prices = {1.99, 2.49, 0.99};\n  for (int i = 0; i < prices.size(); i++) {\n    std::cout << prices[i] << " ";\n  }\n}',
      hints: [
        'vector<double> 存浮点数',
        '和 int 的用法完全一样',
        'prices.size() 是 3',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：声明 vector 并添加三个元素',
      template: '#include <vector>\n\nint main() {\n  std::vector<int> v;\n  v.____(1);\n  v.____(2);\n  v.____(3);\n  // v.size() 是 3\n}',
      answers: ['push_back', 'push_back', 'push_back'],
      hints: ['三个空都是同一个尾部添加函数'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：输出 vector 的第一个和最后一个元素',
      template: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {10, 20, 30, 40};\n  std::cout << v[____] << " " << v[____] << "\\n";\n}',
      answers: ['0', '3'],
      hints: ['第一个元素的索引是 0', '最后一个元素的索引是 size()-1'],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察不同类型的 vector：',
      code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {1, 2, 3};\n  vector<string> words = {"hello", "world"};\n  cout << "nums: " << nums.size() << " words: " << words.size() << endl;\n  cout << words[0] << " " << words[1] << endl;\n}',
      expectedOutput: 'nums: 3 words: 2\nhello world',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '`vector` 是 C++ 里最实用的容器。\n下一课我们学更多的 vector 操作——`pop_back`、`insert`、`erase`。',
    },
  ],
}

export default lesson
