import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'sort',
    chapter: 15,
    title: 'sort 排序',
    subtitle: '一行搞定排序',
    description: '学会用 std::sort 对容器进行排序。',
    objectives: ['能用 sort 对 vector 排序', '能实现升序和降序排序'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`std::sort` 是 STL 最常用的算法之一。\n传入两个迭代器（起始和结束），\n范围内的元素就会排好序。',
      code: '#include <algorithm>\n\nvector<int> v = {4, 2, 5, 1, 3};\nsort(v.begin(), v.end());\n// v 变成了 {1, 2, 3, 4, 5}',
    },
    {
      type: 'exposition',
      text: '`sort` 需要**随机访问迭代器**，\n所以它只能用于 `vector`、`deque`、`array`。\n`list` 不能直接用 `sort`（但 list 有自己的 `sort` 成员函数）。',
    },
    {
      type: 'exposition',
      text: '`sort` 默认**升序**（从小到大）。\n要降序排列，传 `greater<int>()` 作为第三个参数：\n`sort(v.begin(), v.end(), greater<int>());`',
      code: 'vector<int> v = {4, 2, 5, 1, 3};\nsort(v.begin(), v.end(), greater<int>());\n// v 变成了 {5, 4, 3, 2, 1}',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`auto it = v.end();` 中 it 指向什么？',
      options: [
        { text: '最后一个元素', correct: false, explanation: 'end() 指向最后一个元素之后' },
        { text: '第一个元素', correct: false, explanation: '那是 begin() 的返回值' },
        { text: '末尾之后的标记位置', correct: true, explanation: 'end() 返回末尾之后的位置，不包含有效元素' },
        { text: '容器的中间', correct: false, explanation: 'end() 总是末尾之后，不是中间' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 sort 对 vector 升序排序：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 1, 4, 1, 5};\n  sort(v.begin(), v.end());\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'sort 需要 #include <algorithm>',
        '传 v.begin() 和 v.end() 指定范围',
        'sort 直接在原容器上修改，不返回新容器',
      ],
    },
    {
      type: 'exposition',
      text: 'C++11 引入了**范围 for**（range-based for）：\n`for (int x : v)` 自动遍历整个容器，\n不需要下标或迭代器，简洁安全。',
    },
    {
      type: 'type-it',
      instruction: '用 sort 降序排列：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 1, 4, 1, 5};\n  sort(v.begin(), v.end(), greater<int>());\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        '降序需要第三个参数 greater<int>()',
        'greater<int>() 表示大的在前',
        '输出应该是 5 4 3 1 1',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'sort 算法在哪个头文件中？',
      options: [
        { text: '#include <vector>', correct: false, explanation: 'vector 头文件只提供容器' },
        { text: '#include <algorithm>', correct: true, explanation: '所有通用算法都在 algorithm 头文件中' },
        { text: '#include <iostream>', correct: false, explanation: 'iostream 是输入输出流' },
        { text: '#include <sort>', correct: false, explanation: 'C++ 没有 sort 头文件' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：对 vector 升序排序',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {9, 3, 6};\n  std::____(v.____(), v.____());\n  // v 现在是 {3, 6, 9}\n}',
      answers: ['sort', 'begin', 'end'],
      hints: ['第一个空是排序算法名', '第二个空是起始迭代器', '第三个空是结束迭代器'],
    },
    {
      type: 'exposition',
      text: '`sort` 还可以对**局部范围**排序：\n`sort(v.begin(), v.begin() + 3);` 只排前三个元素。\n这对于只需要部分排序的场景很有用。',
      code: 'vector<int> v = {5, 3, 1, 4, 2};\nsort(v.begin(), v.begin() + 3);\n// v 变成了 {1, 3, 5, 4, 2}',
    },
    {
      type: 'type-it',
      instruction: '只排序 vector 的前半部分：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {4, 2, 5, 1, 3};\n  sort(v.begin(), v.begin() + 3);\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      hints: [
        'v.begin() + 3 表示到第三个元素结束',
        '只有前三个被排序',
        '后面的元素保持原顺序',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察 sort 的效果：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {7, 2, 9, 1, 5};\n  sort(v.begin(), v.end());\n  for (int x : v) {\n    cout << x << " ";\n  }\n}',
      expectedOutput: '1 2 5 7 9',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '`sort` 还能对字符串排序：\n按字典序（字母顺序）排列。\n`string` 本身也是容器，可以用 `sort`。',
      code: 'vector<string> names = {"Charlie", "Alice", "Bob"};\nsort(names.begin(), names.end());\n// Alice Bob Charlie',
    },
    {
      type: 'type-it',
      instruction: '对字符串 vector 排序：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> v = {"dog", "cat", "bird"};\n  sort(v.begin(), v.end());\n  for (string s : v) {\n    cout << s << " ";\n  }\n}',
      hints: [
        'string 也可以用 sort 排序',
        '默认按字母顺序排列',
        '正确输出是 bird cat dog',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：降序排序',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 5, 3};\n  std::sort(v.begin(), v.____(), std::____<int>());\n  // v 现在是 {5, 3, 1}\n}',
      answers: ['end', 'greater'],
      hints: ['第一个空是结束迭代器', '第二个空是降序比较器名'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`it != v.end()` 在迭代器循环中表示什么含义？',
      options: [
        { text: '还没到末尾，继续循环', correct: true, explanation: 'it != v.end() 表示还有元素未遍历' },
        { text: '到了末尾就继续', correct: false, explanation: '到了末尾应该停止' },
        { text: 'it 指向有效元素', correct: false, explanation: '这只是条件判断的一部分' },
        { text: 'it 指向最后一个元素', correct: false, explanation: 'it != end() 不是指向最后一个，而是没到结尾' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察 sort 的多种用法：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {4, 2, 5, 1, 3};\n  sort(nums.begin(), nums.end());\n  cout << "升序: ";\n  for (int x : nums) cout << x << " ";\n  cout << endl;\n\n  sort(nums.begin(), nums.end(), greater<int>());\n  cout << "降序: ";\n  for (int x : nums) cout << x << " ";\n  cout << endl;\n\n  vector<string> words = {"banana", "apple", "cherry"};\n  sort(words.begin(), words.end());\n  cout << "单词: ";\n  for (string s : words) cout << s << " ";\n  cout << endl;\n}',
      expectedOutput: '升序: 1 2 3 4 5 \n降序: 5 4 3 2 1 \n单词: apple banana cherry',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '`sort` 是每个 C++ 程序员最常用的算法之一。\n下一课我们学 `find`——在容器中**查找**特定元素。',
    },
  ],
}

export default lesson
