import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'range-for',
    chapter: 16,
    title: '范围 for',
    subtitle: '遍历最简单',
    description: '学习用范围 for 循环自动遍历容器和数组，再也不用写下标或迭代器。',
    objectives: ['能用范围 for 遍历数组和容器', '理解范围 for 的工作原理', '能在遍历中正确使用引用避免拷贝'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '传统 for 循环遍历数组需要下标：\n`for (int i = 0; i < size; i++)`\nC++11 引入了**范围 for（range-based for）**——\n你直接说"对于每个元素"就行。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '范围 for 的语法：\n`for (元素类型 变量名 : 容器) { 循环体 }`\n编译器会自动从头遍历到尾。',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int arr[] = {10, 20, 30};\n  for (int x : arr) {\n    cout << x << " ";\n  }\n  // 输出: 10 20 30\n}',
    },
    {
      type: 'type-it',
      instruction: '用范围 for 遍历数组：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int scores[] = {85, 92, 78, 90};\n  for (int s : scores) {\n    cout << s << " ";\n  }\n}',
      hints: [
        'int s : scores 表示依次取出每个元素到 s',
        's 是 scores 中元素的拷贝',
        '输出: 85 92 78 90',
      ],
    },
    {
      type: 'exposition',
      text: '范围 for 不仅可以用在数组，还可以用在所有 STL 容器上：\n`vector`、`list`、`set`、`map`……\n只要容器有 `begin()` 和 `end()` 就能用。',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<string> names = {"Alice", "Bob", "Charlie"};\n  for (string name : names) {\n    cout << name << " ";\n  }\n}',
    },
    {
      type: 'type-it',
      instruction: '用范围 for 遍历 vector：',
      code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> words = {"C++", "Python", "Java"};\n  for (string w : words) {\n    cout << w << " ";\n  }\n}',
      hints: [
        '范围 for 自动从头遍历到尾',
        'w 是每个元素的拷贝',
        '输出: C++ Python Java',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p03-05：传统 for 循环的三部分是什么？',
      options: [
        { text: '初始化、条件、更新', correct: true, explanation: 'for (初始化; 条件; 更新) 是传统 for 的三部分' },
        { text: '声明、赋值、输出', correct: false, explanation: '这不是 for 循环的组成部分' },
        { text: '类型、名字、分号', correct: false, explanation: '这是变量声明的格式' },
        { text: '条件、循环体、分号', correct: false, explanation: '结构不是这样的' },
      ],
    },
    {
      type: 'exposition',
      text: '如果你想在遍历中**修改元素**，需要用引用：\n`for (int& x : arr)` \n不写引用的话，x 是元素的拷贝，修改拷贝不影响原数组。',
      code: 'int arr[] = {1, 2, 3};\n\n// ❌ 不修改原数组\nfor (int x : arr) {\n  x *= 2;    // 只改了拷贝\n}\n// arr 仍是 {1, 2, 3}\n\n// ✅ 修改原数组\nfor (int& x : arr) {\n  x *= 2;    // 修改了原元素\n}\n// arr 变成 {2, 4, 6}',
    },
    {
      type: 'type-it',
      instruction: '用引用在遍历中修改元素：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int data[] = {1, 2, 3, 4};\n  for (int& x : data) {\n    x = x * x;\n  }\n  for (int x : data) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'int& x 是引用，修改 x 就是修改数组元素',
        '第一次遍历把每个元素变成平方',
        '第二次遍历输出结果: 1 4 9 16',
      ],
    },
    {
      type: 'exposition',
      text: '对于大型对象（如 string），用引用可以**避免拷贝**：\n`for (const auto& elem : container)`\n这是最常见的高效写法。',
      code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> words = {"apple", "banana", "cherry"};\n  \n  // 高效：不拷贝，只读遍历\n  for (const auto& w : words) {\n    cout << w << " ";\n  }\n}',
    },
    {
      type: 'type-it',
      instruction: '用 const auto& 高效遍历 vector<string>：',
      code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> fruits = {"apple", "banana", "cherry"};\n  for (const auto& f : fruits) {\n    cout << f << " ";\n  }\n}',
      hints: [
        'const auto& 自动推导类型 + 避免拷贝',
        'const 表示不修改元素',
        '输出: apple banana cherry',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-01：auto 在这里的作用是什么？\n`for (const auto& x : vec)`',
      options: [
        { text: '让类型自动推导', correct: true, explanation: 'auto 自动推导 vec 的元素类型' },
        { text: '让循环无限执行', correct: false, explanation: 'auto 和循环次数无关' },
        { text: '让 x 可变', correct: false, explanation: 'const 让 x 不可变' },
        { text: '让遍历速度变快', correct: false, explanation: 'auto 不影响运行时性能' },
      ],
    },
    {
      type: 'exposition',
      text: '用范围 for 遍历 map：\n遍历 `map` 时，每个元素是 `pair<const Key, Value>`，\n用 `auto&` 或 `const auto&` 获取。',
      code: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, int> scores;\n  scores["Alice"] = 95;\n  scores["Bob"] = 87;\n  \n  for (const auto& p : scores) {\n    cout << p.first << ": " << p.second << endl;\n  }\n}',
    },
    {
      type: 'type-it',
      instruction: '用范围 for 遍历 map：',
      code: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, int> ages = {{\"Alice\", 25}, {\"Bob\", 30}};\n  for (const auto& p : ages) {\n    cout << p.first << " is " << p.second << endl;\n  }\n}',
      hints: [
        'map 元素是 pair，p.first 是键，p.second 是值',
        'const auto& 避免拷贝，提高效率',
        '输出: Alice is 25 和 Bob is 30',
      ],
    },
    {
      type: 'multiple-choice',
      question: '范围 for 中 `for (int x : arr)` 的 x 是什么？',
      options: [
        { text: '数组元素的值拷贝', correct: true, explanation: 'x 是每个元素的拷贝，修改 x 不影响原数组' },
        { text: '数组元素的引用', correct: false, explanation: '需要写 int& x 才是引用' },
        { text: '数组下标', correct: false, explanation: 'x 是元素值，不是下标' },
        { text: '数组的迭代器', correct: false, explanation: '范围 for 隐藏了迭代器细节' },
      ],
    },
    {
      type: 'exposition',
      text: '**注意**：范围 for 不能直接获取下标索引。\n如果你需要索引（比如 `i`），仍然要用传统 for。\n或者自己维护一个计数器。',
      code: 'int arr[] = {10, 20, 30};\nint index = 0;\nfor (int x : arr) {\n  cout << "arr[" << index << "] = " << x << endl;\n  index++;\n}',
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察范围 for 遍历二维数组：',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};\n  for (auto& row : matrix) {\n    for (int x : row) {\n      cout << x << " ";\n    }\n    cout << endl;\n  }\n}',
      expectedOutput: '1 2 3 \n4 5 6 ',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 p13-02：vector 的 push_back 操作有什么效果？',
      options: [
        { text: '删除最后一个元素', correct: false, explanation: 'push_back 是添加元素' },
        { text: '在尾部添加一个元素', correct: true, explanation: 'push_back 在尾部添加元素' },
        { text: '清空所有元素', correct: false, explanation: 'clear 才清空' },
        { text: '获取元素个数', correct: false, explanation: 'size() 获取元素个数' },
      ],
    },
    {
      type: 'exposition',
      text: '范围 for 的实质：编译器将其转换为迭代器循环。\n所以任何支持 `begin()`/`end()` 的类型都能用。\nC++11 引入后，遍历再也不用手动写迭代器了。',
      code: '// 编译器把范围 for 转换成类似这样：\nfor (auto it = container.begin(); it != container.end(); ++it) {\n  元素类型 x = *it;\n  // 循环体\n}',
    },
    {
      type: 'type-it',
      instruction: '综合练习：范围 for + vector + string：',
      code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> cities = {"Beijing", "Shanghai", "Shenzhen"};\n  for (const auto& c : cities) {\n    cout << c << " (" << c.size() << " chars)" << endl;\n  }\n}',
      hints: [
        'const auto& c 推导为 const string&',
        'c.size() 返回字符串长度',
        '每个城市名后输出字符数',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，用范围 for 修改并输出 vector：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {1, 2, 3, 4, 5};\n  for (int& n : nums) {\n    n = n * 2;\n  }\n  for (int n : nums) {\n    cout << n << " ";\n  }\n  cout << endl;\n}',
      expectedOutput: '2 4 6 8 10 ',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '总结：\n- 范围 for 让遍历变得极其简单、安全\n- `for (const auto& x : container)` 是最佳实践\n- 需要修改元素时用 `auto&`\n- 需要索引时还是用传统 for',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
