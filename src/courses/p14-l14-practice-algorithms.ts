import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-algorithms',
    chapter: 15,
    title: '算法综合练习',
    subtitle: '巩固 08-13',
    description: '综合运用 Lambda、for_each、transform、copy、remove_if 和流水线。',
    objectives: ['能综合使用多种 STL 算法', '能设计算法流水线完成任务'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '用 lambda + for_each 打印每个元素及其索引：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<string> v = {"cat", "dog", "bird"};\n  int idx = 0;\n  for_each(v.begin(), v.end(), [&idx](string s) {\n    cout << idx << ": " << s << endl;\n    idx++;\n  });\n}',
      hints: [
        '[&idx] 引用捕获索引计数器',
        '每处理一个元素 idx 加 1',
        '输出每行的序号',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 transform 把所有字符串转为大写：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> v = {"hello", "world", "c++"};\n  transform(v.begin(), v.end(), v.begin(), [](string s) {\n    for (char& c : s) {\n      c = toupper(c);\n    }\n    return s;\n  });\n  for (string s : v) {\n    cout << s << " ";\n  }\n}',
      hints: [
        'transform 写回原位置',
        'toupper(c) 把字符转大写',
        '结果是 "HELLO WORLD C++"',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序：transform 实战——把分数转为等级：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> scores = {55, 82, 95, 47, 73, 68};\n  vector<string> grades;\n\n  transform(scores.begin(), scores.end(),\n            back_inserter(grades), [](int s) {\n    if (s >= 90) return "优秀";\n    if (s >= 75) return "良好";\n    if (s >= 60) return "及格";\n    return "不及格";\n  });\n\n  for (int i = 0; i < scores.size(); i++) {\n    cout << scores[i] << " -> " << grades[i] << endl;\n  }\n}',
      expectedOutput: '55 -> 不及格\n82 -> 良好\n95 -> 优秀\n47 -> 不及格\n73 -> 及格\n68 -> 及格',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '运行程序：流水线——去重 + 排序 + 变换：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {5, 2, 3, 2, 5, 1, 4};\n\n  sort(nums.begin(), nums.end());\n  auto it = unique(nums.begin(), nums.end());\n  nums.erase(it, nums.end());\n\n  vector<string> result;\n  transform(nums.begin(), nums.end(),\n            back_inserter(result), [](int x) {\n    return string(x, \'*\');\n  });\n\n  for (string s : result) {\n    cout << s << endl;\n  }\n}',
      expectedOutput: '*\n**\n***\n****\n*****',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：`unique` 配合 `erase` 的作用是什么？',
      options: [
        { text: '排序容器', correct: false, explanation: 'unique 只去重，不排序' },
        { text: '删除重复元素', correct: true, explanation: 'unique 标记重复，erase 真正删除' },
        { text: '复制容器', correct: false, explanation: 'unique 不复制，只移动元素' },
        { text: '查找元素', correct: false, explanation: 'unique 不是查找算法' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 lambda 捕获统计 for_each 中的最大值：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {4, 7, 2, 9, 5};\n  int max_val = v[0];\n  for_each(v.begin(), v.end(), [&max_val](int x) {\n    if (x > max_val) max_val = x;\n  });\n  cout << "最大值: " << max_val;\n}',
      hints: [
        '[&max_val] 引用捕获用于更新',
        '遍历每个元素，保留最大的',
        '结果应该是 9',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 copy_if 筛选出所有偶数并 transform 翻倍：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4, 5, 6};\n  vector<int> evens;\n\n  copy_if(v.begin(), v.end(), back_inserter(evens), [](int x) {\n    return x % 2 == 0;\n  });\n\n  transform(evens.begin(), evens.end(), evens.begin(), [](int x) {\n    return x * 10;\n  });\n\n  for (int x : evens) {\n    cout << x << " ";\n  }\n}',
      hints: [
        '先 copy_if 筛选出偶数',
        '再 transform 翻 10 倍',
        '结果是 {20, 40, 60}',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`remove_if` 的返回值应该传给什么？',
      options: [
        { text: 'sort', correct: false, explanation: 'remove_if 返回的是迭代器，传给 sort 没有意义' },
        { text: 'erase', correct: true, explanation: 'remove_if 返回新逻辑末尾，传给 erase 真正删除' },
        { text: 'find', correct: false, explanation: 'remove_if 的返回值是给 erase 用的' },
        { text: 'back_inserter', correct: false, explanation: 'back_inserter 是插入适配器，不是接收返回值的' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序：综合实战——数据分析流水线：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> data = {3, 8, 2, 8, 5, 3, 9, 2, 7, 5};\n  cout << "原始数据: ";\n  for (int x : data) cout << x << " ";\n  cout << endl;\n\n  sort(data.begin(), data.end());\n  auto it = unique(data.begin(), data.end());\n  data.erase(it, data.end());\n  cout << "去重后: ";\n  for (int x : data) cout << x << " ";\n  cout << endl;\n\n  int sum = 0;\n  for_each(data.begin(), data.end(), [&sum](int x) {\n    sum += x;\n  });\n  double avg = (double)sum / data.size();\n  cout << "总和: " << sum << " 平均: " << avg << endl;\n\n  vector<string> stars;\n  transform(data.begin(), data.end(),\n            back_inserter(stars), [](int x) {\n    return string(x, \'*\');\n  });\n  cout << "柱状图:\\n";\n  for (string s : stars) cout << s << endl;\n}',
      expectedOutput: '原始数据: 3 8 2 8 5 3 9 2 7 5 \n去重后: 2 3 5 7 8 9 \n总和: 34 平均: 5.66667\n柱状图:\n**\n***\n*****\n*******\n********\n*********',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：流水线——去重后复制到新容器',
      template: '#include <algorithm>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 2, 1, 3, 2};\n  std::____(v.begin(), v.end());\n  auto it = std::____(v.begin(), v.end());\n  std::vector<int> result;\n  std::____(v.begin(), it, std::back_inserter(result));\n}',
      answers: ['sort', 'unique', 'copy'],
      hints: ['第一步排序', '第二步去重', '第三步复制去重后的结果'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`transform` 和 `for_each` 都可以修改元素吗？',
      options: [
        { text: '只有 transform 可以', correct: false, explanation: 'for_each 用引用参数也可以修改' },
        { text: '只有 for_each 可以', correct: false, explanation: 'transform 也可以修改' },
        { text: '两者都可以', correct: true, explanation: 'for_each 用 int& 参数修改，transform 用返回值覆盖' },
        { text: '两者都不能', correct: false, explanation: '两者都可以修改元素' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 for_each + 引用 + 引用捕获 统计正数和负数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {-2, 3, -1, 5, 0, -4};\n  int pos = 0, neg = 0;\n  for_each(v.begin(), v.end(), [&pos, &neg](int x) {\n    if (x > 0) pos++;\n    else if (x < 0) neg++;\n  });\n  cout << "正数: " << pos << " 负数: " << neg;\n}',
      hints: [
        '引用捕获 pos 和 neg 用于统计',
        'if-else 判断正负',
        '结果是 正数: 2 负数: 3',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序：最终综合练习：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> scores = {65, 82, 55, 90, 78, 47, 88, 72};\n\n  // 1. 排序\n  sort(scores.begin(), scores.end());\n  cout << "排序: ";\n  for (int x : scores) cout << x << " ";\n  cout << endl;\n\n  // 2. 及格人数\n  int pass = count_if(scores.begin(), scores.end(), [](int x) {\n    return x >= 60;\n  });\n  cout << "及格: " << pass << " 人" << endl;\n\n  // 3. 优秀人数\n  int excellent = count_if(scores.begin(), scores.end(), [](int x) {\n    return x >= 90;\n  });\n  cout << "优秀: " << excellent << " 人" << endl;\n\n  // 4. 生成等级标签\n  vector<string> labels;\n  transform(scores.begin(), scores.end(),\n            back_inserter(labels), [](int s) {\n    if (s >= 90) return "A";\n    if (s >= 75) return "B";\n    if (s >= 60) return "C";\n    return "D";\n  });\n\n  cout << "等级: ";\n  for (string l : labels) cout << l << " ";\n  cout << endl;\n}',
      expectedOutput: '排序: 47 55 65 72 78 82 88 90 \n及格: 6 人\n优秀: 1 人\n等级: D D C C B B B A',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'type-it',
      instruction: '综合：用 for_each 统计奇数和偶数的个数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4, 5, 6};\n  int odd = 0, even = 0;\n  for_each(v.begin(), v.end(), [&odd, &even](int x) {\n    if (x % 2 == 0) even++;\n    else odd++;\n  });\n  cout << "奇数: " << odd << " 偶数: " << even;\n}',
      hints: [
        '引用捕获两个计数器',
        'x % 2 == 0 判断偶数',
        '结果应是 奇数: 3 偶数: 3',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`for_each` 和 `range-based for` 的区别？',
      options: [
        { text: 'for_each 是算法，范围 for 是语言特性', correct: true, explanation: 'for_each 在 <algorithm> 中，范围 for 是内置语法' },
        { text: '没有区别', correct: false, explanation: '有区别，但都可以遍历容器' },
        { text: '范围 for 不能修改元素', correct: false, explanation: '范围 for 用引用也可以修改' },
        { text: 'for_each 只能用于 vector', correct: false, explanation: 'for_each 可用于任何容器' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合：copy_if + transform + for_each 组合：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3, 4, 5};\n  vector<int> selected;\n\n  copy_if(v.begin(), v.end(), back_inserter(selected), [](int x) {\n    return x % 2 == 1;\n  });\n\n  transform(selected.begin(), selected.end(), selected.begin(), [](int x) {\n    return x * 10;\n  });\n\n  for_each(selected.begin(), selected.end(), [](int x) {\n    cout << x << " ";\n  });\n}',
      hints: [
        '先 copy_if 筛选奇数',
        '再 transform 翻 10 倍',
        '最后 for_each 输出结果 {10, 30, 50}',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 for_each 统计所有正数之和',
      template: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {-1, 3, -2, 5};\n  int sum = ____;\n  std::for_each(v.begin(), v.end(), [&sum](int x) {\n    if (____ > 0) sum += x;\n  });\n  std::cout << sum;  // 输出 8\n}',
      answers: ['0', 'x'],
      hints: ['第一个空是累加的初始值', '第二个空是判断正数的变量名'],
    },
    {
      type: 'exposition',
      text: '这一课综合练习了 STL 算法的各种用法。\n下一课是**阶段总复习**——\n全面回顾所有 15 课的内容。',
    },
  ],
}

export default lesson
