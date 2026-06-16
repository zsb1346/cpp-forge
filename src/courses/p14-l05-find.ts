import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'find',
    chapter: 15,
    title: 'find 查找',
    subtitle: '找第一个符合条件的',
    description: '学会用 find 和 find_if 在容器中查找元素。',
    objectives: ['能用 find 查找指定值', '能用 find_if 按条件查找', '能处理未找到的情况'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`find` 在指定范围内查找**第一个等于某值**的元素。\n返回指向该元素的迭代器——\n如果没找到，返回 `end()`。',
      code: '#include <algorithm>\n\nvector<int> v = {10, 20, 30, 20, 40};\nauto it = find(v.begin(), v.end(), 20);\n// it 指向第一个 20\nif (it != v.end()) {\n  cout << "找到了: " << *it;\n}',
    },
    {
      type: 'exposition',
      text: '`find` 返回的是迭代器。\n一定要和 `end()` 比较来判断是否找到。\n这是 STL 的通用模式——\n几乎所有"查找"算法都这样。',
    },
    {
      type: 'type-it',
      instruction: '用 find 查找 vector 中的值：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {5, 15, 25, 35};\n  auto it = find(v.begin(), v.end(), 25);\n  if (it != v.end()) {\n    cout << "找到了: " << *it;\n  } else {\n    cout << "没找到";\n  }\n}',
      hints: [
        'find 返回的是迭代器，不是 bool',
        '判断 it != v.end() 确认是否找到',
        '*it 获取找到的元素值',
      ],
    },
    {
      type: 'exposition',
      text: '`find` 查找失败时返回 `end()`。\n如果不检查就直接用 `*it`，\n程序会**未定义行为**——可能崩溃。\n**务必**检查返回值！',
    },
    {
      type: 'multiple-choice',
      question: '回顾：`sort(v.begin(), v.end())` 中 v.begin() 和 v.end() 确定的是什么？',
      options: [
        { text: '整个容器的排序范围', correct: true, explanation: 'begin() 到 end() 确定整个容器的范围' },
        { text: '排序的起点和终点值', correct: false, explanation: '这是迭代器位置，不是元素值' },
        { text: '排序的比较方式', correct: false, explanation: '比较方式由第三个参数决定' },
        { text: '容器的最大容量', correct: false, explanation: '和容量无关' },
      ],
    },
    {
      type: 'exposition',
      text: '`find_if` 是 `find` 的升级版：\n不查找特定值，而是查找**第一个满足条件**的元素。\n条件用一个**谓词**（返回 true/false 的函数）表示。',
      code: '// 查找第一个偶数\nvector<int> v = {1, 3, 5, 6, 7};\nauto it = find_if(v.begin(), v.end(), [](int x) {\n  return x % 2 == 0;\n});\n// it 指向 6',
    },
    {
      type: 'exposition',
      text: '这个 `[](int x) { return x % 2 == 0; }`\n叫做 **lambda 表达式**，后面会专门学。\n现在先用这个模式：\n`[](参数) { return 条件; }`。',
    },
    {
      type: 'type-it',
      instruction: '用 find_if 查找第一个偶数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 3, 5, 6, 7, 9};\n  auto it = find_if(v.begin(), v.end(), [](int x) {\n    return x % 2 == 0;\n  });\n  if (it != v.end()) {\n    cout << "第一个偶数是: " << *it;\n  } else {\n    cout << "没有偶数";\n  }\n}',
      hints: [
        'find_if 的第三个参数是判断条件',
        '条件用 lambda 写: [](int x) { return 条件; }',
        '找到后 *it 获取元素值',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：查找值 42 是否存在',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {10, 42, 30};\n  auto it = std::____(v.____(), v.____(), 42);\n}',
      answers: ['find', 'begin', 'end'],
      hints: ['第一个空是查找算法名', '第二个空是起始位置', '第三个空是结束位置'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`v.end()` 指向什么？',
      options: [
        { text: '最后一个元素', correct: false, explanation: 'end() 指向最后一个元素之后' },
        { text: '开头之前的标记', correct: false, explanation: 'end() 指向末尾，不是开头' },
        { text: '末尾之后的哨兵位置', correct: true, explanation: 'end() 返回一个哨兵位置，不包含有效元素' },
        { text: '容器的最大容量位置', correct: false, explanation: 'end() 和容量无关' },
      ],
    },
    {
      type: 'exposition',
      text: '`find` 不仅适用于 `vector`——\n它可以用于任何提供**输入迭代器**的容器。\n`list`、`string`、`array` 都能用，\n接口完全一样。',
    },
    {
      type: 'type-it',
      instruction: '在字符串中查找字符：',
      code: '#include <iostream>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  string s = "hello world";\n  auto it = find(s.begin(), s.end(), \'w\');\n  if (it != s.end()) {\n    cout << "找到了: " << *it;\n  } else {\n    cout << "没找到";\n  }\n}',
      hints: [
        'string 也可以用 find 算法',
        '查找的字符用单引号',
        '返回的迭代器指向找到的字符',
      ],
    },
    {
      type: 'exposition',
      text: '`find_if` 的条件可以是更复杂的判断：\n比如找第一个**大于 10 且是偶数**的元素，\n在 lambda 里写 `x > 10 && x % 2 == 0`。',
      code: 'auto it = find_if(v.begin(), v.end(), [](int x) {\n  return x > 10 && x % 2 == 0;\n});',
    },
    {
      type: 'type-it',
      instruction: '用 find_if 查找第一个大于 10 的数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 8, 12, 5, 15};\n  auto it = find_if(v.begin(), v.end(), [](int x) {\n    return x > 10;\n  });\n  if (it != v.end()) {\n    cout << "第一个大于 10 的是: " << *it;\n  }\n}',
      hints: [
        'lambda 中写比较条件 x > 10',
        'find_if 找第一个满足条件的',
        '结果是 12',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察 find 和 find_if 的用法：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {8, 3, 12, 5, 7};\n\n  auto it1 = find(v.begin(), v.end(), 12);\n  if (it1 != v.end()) {\n    cout << "找到 12: " << *it1 << endl;\n  }\n\n  auto it2 = find_if(v.begin(), v.end(), [](int x) {\n    return x > 10;\n  });\n  if (it2 != v.end()) {\n    cout << "第一个大于 10: " << *it2 << endl;\n  }\n\n  auto it3 = find(v.begin(), v.end(), 99);\n  if (it3 == v.end()) {\n    cout << "99 没找到";\n  }\n}',
      expectedOutput: '找到 12: 12\n第一个大于 10: 12\n99 没找到',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 find_if 找第一个负数',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, -3, 5};\n  auto it = std::find_if(v.begin(), v.end(), [](int x) {\n    return ____;\n  });\n}',
      answers: ['x < 0'],
      hints: ['lambda 中判断 x 小于 0'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`list<int>` 的迭代器属于什么类型？',
      options: [
        { text: '随机访问迭代器', correct: false, explanation: 'list 不支持随机访问' },
        { text: '双向迭代器', correct: true, explanation: 'list 提供双向迭代器，支持 ++ 和 --' },
        { text: '输入迭代器', correct: false, explanation: 'list 可以多次遍历，不是输入迭代器' },
        { text: '前向迭代器', correct: false, explanation: 'list 支持双向，不仅仅是前向' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，用 find_if 查找复杂条件：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 3, 5, 8, 10, 13};\n\n  auto it = find_if(v.begin(), v.end(), [](int x) {\n    return x % 2 == 0;\n  });\n  if (it != v.end()) {\n    cout << "第一个偶数是: " << *it;\n  }\n}',
      expectedOutput: '第一个偶数是: 8',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '`find` 和 `find_if` 是查找的基础。\n下一课学 `count`——**统计**有多少元素满足条件。',
    },
  ],
}

export default lesson
