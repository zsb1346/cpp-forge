import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-find-sort',
    chapter: 15,
    title: '查找排序练习',
    subtitle: '巩固 01-06',
    description: '综合练习 sort、find、count 等算法的使用。',
    objectives: ['能综合运用 sort 和 find', '能用 count 和 count_if 统计数据'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '声明 vector，排序后查找元素：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {7, 2, 9, 4, 1};\n  sort(v.begin(), v.end());\n  auto it = find(v.begin(), v.end(), 4);\n  if (it != v.end()) {\n    cout << "找到了: " << *it;\n  }\n}',
      hints: [
        '先排序再查找是常见组合',
        '排序后更容易理解数据分布',
        'find 返回迭代器，注意检查',
      ],
    },
    {
      type: 'exposition',
      text: '常见组合模式：**先排序再查找**。\n排序后可以用 `binary_search` 做**二分查找**——\n比 `find` 快得多，但要求数据已排序。',
      code: 'sort(v.begin(), v.end());\nbool found = binary_search(v.begin(), v.end(), 5);\ncout << (found ? "找到" : "没找到");',
    },
    {
      type: 'type-it',
      instruction: '用 binary_search 在排序后的 vector 中查找：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {8, 3, 6, 1, 9};\n  sort(v.begin(), v.end());\n  bool found = binary_search(v.begin(), v.end(), 6);\n  cout << (found ? "找到 6" : "没找到 6");\n}',
      hints: [
        'binary_search 要求数据已排序',
        '返回 bool 类型，不是迭代器',
        '排序后 {1, 3, 6, 8, 9}，6 在其中',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序：排序 + 统计 + 查找的组合：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};\n\n  sort(v.begin(), v.end());\n  cout << "排序后: ";\n  for (int x : v) cout << x << " ";\n  cout << endl;\n\n  int c = count(v.begin(), v.end(), 1);\n  cout << "1 出现 " << c << " 次" << endl;\n\n  bool found = binary_search(v.begin(), v.end(), 5);\n  cout << "5 " << (found ? "存在" : "不存在") << endl;\n\n  int big = count_if(v.begin(), v.end(), [](int x) {\n    return x > 3;\n  });\n  cout << "大于 3 的有 " << big << " 个" << endl;\n}',
      expectedOutput: '排序后: 1 1 2 3 4 5 6 9 \n1 出现 2 次\n5 存在\n大于 3 的有 5 个',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：`iterator` 是容器和什么之间的桥梁？',
      options: [
        { text: '容器和算法', correct: true, explanation: '迭代器是连接容器和算法的桥梁' },
        { text: '容器和容器', correct: false, explanation: '迭代器主要用于容器和算法的交互' },
        { text: '算法和算法', correct: false, explanation: '迭代器是从容器到算法的通道' },
        { text: '用户和容器', correct: false, explanation: '用户通过迭代器间接访问容器' },
      ],
    },
    {
      type: 'exposition',
      text: '**练习**：输入一组分数，统计及格（>=60）人数，\n并找出最高分。用 `count_if` 和 `max_element`。',
    },
    {
      type: 'type-it',
      instruction: '统计及格人数并找最高分：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> scores = {55, 78, 92, 48, 63, 88, 71};\n\n  int pass = count_if(scores.begin(), scores.end(), [](int x) {\n    return x >= 60;\n  });\n  cout << "及格: " << pass << " 人" << endl;\n\n  auto it = max_element(scores.begin(), scores.end());\n  cout << "最高分: " << *it << endl;\n\n  sort(scores.begin(), scores.end());\n  cout << "排序后: ";\n  for (int x : scores) cout << x << " ";\n}',
      hints: [
        'count_if 统计满足条件的元素个数',
        'max_element 返回指向最大元素的迭代器',
        'sort 排序后方便查看整体分布',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序：实战数据统计：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> data = {12, 7, 9, 12, 5, 12, 8, 3, 7};\n\n  sort(data.begin(), data.end());\n  cout << "排序: ";\n  for (int x : data) cout << x << " ";\n  cout << endl;\n\n  cout << "最小值: " << data[0] << endl;\n  cout << "最大值: " << data[data.size()-1] << endl;\n\n  int c12 = count(data.begin(), data.end(), 12);\n  cout << "12 出现 " << c12 << " 次" << endl;\n\n  int odd = count_if(data.begin(), data.end(), [](int x) {\n    return x % 2 != 0;\n  });\n  cout << "奇数个数: " << odd << endl;\n\n  bool has9 = binary_search(data.begin(), data.end(), 9);\n  cout << "9 " << (has9 ? "存在" : "不存在") << endl;\n}',
      expectedOutput: '排序: 3 5 7 7 8 9 12 12 12 \n最小值: 3\n最大值: 12\n12 出现 3 次\n奇数个数: 5\n9 存在',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：排序后查找是否存在值 7',
      template: '#include <algorithm>\n#include <vector>\n#include <iostream>\n\nint main() {\n  std::vector<int> v = {4, 7, 2, 9};\n  std::____(v.begin(), v.end());\n  bool found = std::____(v.begin(), v.end(), 7);\n  std::cout << (found ? "找到" : "没找到") << "\\n";\n}',
      answers: ['sort', 'binary_search'],
      hints: ['第一个空是先排序的算法', '第二个空是二分查找算法'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`count` 和 `count_if` 的区别是什么？',
      options: [
        { text: 'count 传值，count_if 传条件', correct: true, explanation: 'count 统计特定值的出现次数，count_if 按条件统计' },
        { text: 'count 更快', correct: false, explanation: '性能差异不大，主要是功能不同' },
        { text: 'count_if 返回迭代器', correct: false, explanation: '两者都返回整数' },
        { text: '没有区别', correct: false, explanation: '一个统计值，一个统计条件' },
      ],
    },
    {
      type: 'exposition',
      text: '**组合技巧**：\n`sort` + `unique` 可以**去重**，\n`sort` + `binary_search` 可以**快速查找**，\n`count_if` + `max_element` 可以**分析数据**。',
    },
    {
      type: 'type-it',
      instruction: '练习：sort + find + count 的组合使用：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {5, 2, 8, 2, 3, 8, 1};\n\n  int c = count(v.begin(), v.end(), 2);\n  cout << "2 出现 " << c << " 次" << endl;\n\n  sort(v.begin(), v.end());\n  auto it = find(v.begin(), v.end(), 5);\n  cout << "5 在索引 " << (it - v.begin()) << endl;\n\n  for (int x : v) cout << x << " ";\n  cout << endl;\n}',
      hints: [
        'count 统计值出现次数',
        'sort 让数据有序',
        'iterator 可以相减得到索引位置',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`binary_search` 为什么要求数据已排序？',
      options: [
        { text: '它是二分查找，必须有序', correct: true, explanation: '二分查找每次折半查找，必须有序才能工作' },
        { text: '它比 find 慢', correct: false, explanation: 'binary_search 比 find 快得多' },
        { text: '它只能用于整数', correct: false, explanation: 'binary_search 可用于任何可比较的类型' },
        { text: '它会修改数据', correct: false, explanation: 'binary_search 不修改数据，只查找' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习：统计大于平均值的元素个数：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {4, 8, 2, 9, 5};\n  int sum = 0;\n  for (int x : v) sum += x;\n  double avg = (double)sum / v.size();\n  int n = count_if(v.begin(), v.end(), [avg](int x) {\n    return x > avg;\n  });\n  cout << "大于平均: " << n;\n}',
      hints: [
        '先计算总和再求平均值',
        'count_if 配合 lambda 对比 avg',
        '平均值是 5.6，大于的有 2 个',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 count 统计特定值出现次数',
      template: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 2, 2, 3, 2};\n  int n = std::____(v.begin(), v.end(), ____);\n  std::cout << n;  // 输出 3\n}',
      answers: ['count', '2'],
      hints: ['第一个空是统计算法名', '第二个空是要统计的值'],
    },
    {
      type: 'type-it',
      instruction: '练习：find + binary_search 两种查找方式：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n  vector<int> v = {3, 8, 1, 6, 4};\n\n  auto it = find(v.begin(), v.end(), 6);\n  cout << "find: " << *it << endl;\n\n  sort(v.begin(), v.end());\n  bool found = binary_search(v.begin(), v.end(), 6);\n  cout << "binary_search: " << (found ? "找到" : "没找到");\n}',
      hints: [
        'find 不需要排序，返回迭代器',
        'binary_search 需要排序，返回 bool',
        '两种查找方式适用不同场景',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 binary_search 查找值',
      template: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {3, 1, 4};\n  std::____(v.begin(), v.end());\n  bool found = std::____(v.begin(), v.end(), 4);\n  std::cout << (found ? "找到" : "没找到");\n}',
      answers: ['sort', 'binary_search'],
      hints: ['第一个空是先排序', '第二个空是二分查找算法'],
    },
    {
      type: 'exposition',
      text: '这一课练习了 sort、find、count、count_if、\nbinary_search、max_element 的综合使用。\n下一课开始学 **Lambda 表达式**——\n让条件书写更灵活。',
    },
  ],
}

export default lesson
