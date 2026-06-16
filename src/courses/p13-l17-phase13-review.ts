import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase13-review',
    chapter: 14,
    title: '阶段 13 复习',
    subtitle: 'STL 容器总复习',
    description: '全面回顾阶段 13 所有 STL 容器的知识和用法。',
    objectives: ['能独立选择和使用 STL 容器', '能写出使用多种容器的正确代码'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '下面哪个容器底层是红黑树，元素自动升序排列？',
      options: [
        { text: 'vector', correct: false, explanation: 'vector 是动态数组，不排序' },
        { text: 'unordered_set', correct: false, explanation: 'unordered_set 是哈希表，不排序' },
        { text: 'set', correct: true, explanation: 'set 基于红黑树，自动升序排列' },
        { text: 'deque', correct: false, explanation: 'deque 是双端队列，不排序' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`stack` 和 `queue` 被称为什么？',
      options: [
        { text: '序列容器', correct: false, explanation: 'vector/list/deque 是序列容器' },
        { text: '关联容器', correct: false, explanation: 'set/map 是关联容器' },
        { text: '容器适配器', correct: true, explanation: 'stack/queue 在已有容器上封装接口，叫适配器' },
        { text: '算法', correct: false, explanation: '它们是容器，不是算法' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`vector<int> v; v.reserve(100); v.size()` 一开始是多少？',
      options: [
        { text: '100', correct: false, explanation: 'reserve 改变 capacity，不是 size' },
        { text: '0', correct: true, explanation: 'reserve 只分配内存，size 仍然是 0' },
        { text: '不确定', correct: false, explanation: 'size 是 0，很确定' },
        { text: '编译错误', correct: false, explanation: 'reserve 是 vector 的合法成员函数' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '什么情况下应该用 list 而不是 vector？',
      options: [
        { text: '需要频繁随机访问元素', correct: false, explanation: 'list 不支持随机访问，这种情况应选 vector' },
        { text: '需要在中间频繁插入或删除元素', correct: true, explanation: 'list 中间插入删除 O(1)，vector 是 O(n)' },
        { text: '需要尾部快速添加元素', correct: false, explanation: 'vector 尾部添加也很快（均摊 O(1)）' },
        { text: '需要按字典序排序', correct: false, explanation: 'list 不会自动排序，应该用 set' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：声明一个存 string 的 map，键是 string，值是 int',
      template: '#include <____>\n#include <____>\n\nint main() {\n  std::____<____, ____> scores;\n  scores["Alice"] = 95;\n}',
      answers: ['map', 'string', 'map', 'string', 'int'],
      hints: ['第一空是 map 的头文件', '第二空是 string 的头文件', '第三到五空是 map 声明：容器<键类型, 值类型>'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 unordered_set 查找元素',
      template: '#include <____>\n\nint main() {\n  std::unordered_set<int> s = {10, 20, 30};\n  int target = 20;\n  if (s.____(target) != s.____()) {\n    // 找到了\n  }\n}',
      answers: ['unordered_set', 'find', 'end'],
      hints: ['第一空是头文件', '第二空是查找函数', '第三空是表示"没找到"的迭代器'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 priority_queue 实现最大堆',
      template: '#include <____>\n\nint main() {\n  std::____<int> pq;\n  pq.____(10);\n  pq.____(30);\n  pq.____(20);\n  // pq.top() 是 30\n}',
      answers: ['queue', 'priority_queue', 'push', 'push', 'push'],
      hints: ['第一空是头文件（queue 包含 priority_queue）', '第二空是容器名', '后三空是插入元素的函数'],
    },
    {
      type: 'code-runner',
      instruction: '综合题：用 map 统计单词频率，输出频率最高的词：',
      code: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n  string words[] = {"cat", "dog", "cat", "bird", "dog", "cat"};\n  map<string, int> freq;\n  for (string w : words) {\n    freq[w]++;\n  }\n  \n  string mostFreq = "";\n  int maxCount = 0;\n  for (auto& p : freq) {\n    if (p.second > maxCount) {\n      mostFreq = p.first;\n      maxCount = p.second;\n    }\n  }\n  cout << "最多: " << mostFreq << " (" << maxCount << " 次)" << endl;\n}',
      expectedOutput: '最多: cat (3 次)',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '综合题：用 vector 和 set 配合，输出排序后的不重复元素：',
      code: '#include <iostream>\n#include <vector>\n#include <set>\nusing namespace std;\n\nint main() {\n  vector<int> data = {7, 2, 7, 3, 2, 1, 5, 3};\n  set<int> unique(data.begin(), data.end());\n  \n  cout << "去重排序后: ";\n  for (int x : unique) {\n    cout << x << " ";\n  }\n  cout << endl;\n  cout << "共 " << unique.size() << " 个";\n}',
      expectedOutput: '去重排序后: 1 2 3 5 7 \n共 5 个',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '综合题：用 deque 实现双端操作并输出：',
      code: '#include <iostream>\n#include <deque>\nusing namespace std;\n\nint main() {\n  deque<int> d;\n  d.push_back(2);\n  d.push_front(1);\n  d.push_back(3);\n  d.push_front(0);\n  d.pop_back();\n  d.push_back(4);\n  \n  for (int i = 0; i < d.size(); i++) {\n    cout << d[i] << " ";\n  }\n}',
      expectedOutput: '0 1 2 4 ',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：unordered_map 的平均查找时间复杂度是多少？',
      options: [
        { text: 'O(1)', correct: true, explanation: '哈希表平均 O(1) 查找' },
        { text: 'O(log n)', correct: false, explanation: 'O(log n) 是 map（红黑树）的复杂度' },
        { text: 'O(n)', correct: false, explanation: 'O(n) 是线性查找的复杂度' },
        { text: 'O(n log n)', correct: false, explanation: '这是排序算法的典型复杂度' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个容器是"默认首选"的序列容器？',
      options: [
        { text: 'list', correct: false, explanation: 'list 只在中间插入频繁时用' },
        { text: 'vector', correct: true, explanation: 'vector 在大多数场景下性能优秀，是默认首选' },
        { text: 'deque', correct: false, explanation: 'deque 适合头尾操作的特殊场景' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：声明一个 stack，底层用 vector',
      template: '#include <____>\n#include <____>\n\nint main() {\n  std::____<int, std::____<int>> s;\n  s.push(1);\n}',
      answers: ['stack', 'vector', 'stack', 'vector'],
      hints: ['第一空是 stack 的头文件', '第二空是 vector 的头文件', '第三空是适配器名', '第四空是底层容器名'],
    },
    {
      type: 'code-runner',
      instruction: '最后练习：用多种容器处理数据——vector 输入，set 去重排序，map 统计：',
      code: '#include <iostream>\n#include <vector>\n#include <set>\n#include <map>\nusing namespace std;\n\nint main() {\n  vector<int> data = {3, 1, 4, 1, 5, 3, 2, 4};\n  \n  set<int> unique(data.begin(), data.end());\n  cout << "去重排序: ";\n  for (int x : unique) cout << x << " ";\n  cout << endl;\n  \n  map<int, int> freq;\n  for (int x : data) freq[x]++;\n  cout << "频率统计:" << endl;\n  for (auto& p : freq) {\n    cout << p.first << ": " << p.second << " 次" << endl;\n  }\n}',
      expectedOutput: '去重排序: 1 2 3 4 5 \n频率统计:\n1: 2 次\n2: 1 次\n3: 2 次\n4: 2 次\n5: 1 次',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 map 实现英译中字典',
      template: '#include <____>\n#include <____>\n\nint main() {\n  std::____<std::string, std::string> dict;\n  dict[\"cat\"] = \"猫\";\n  dict[\"dog\"] = \"狗\";\n  std::cout << dict[\"____\"] << \"\\n\";\n}',
      answers: ['map', 'string', 'map', 'cat'],
      hints: ['第一空是 map 头文件', '第二空是 string 头文件', '第三空是容器类型', '第四空是键'],
    },
    {
      type: 'multiple-choice',
      question: '你已经完成了阶段 13，接下来进入什么内容？',
      options: [
        { text: '阶段 14：STL 算法和迭代器', correct: true, explanation: 'STL 容器之后，下一阶段是 STL 算法和迭代器' },
        { text: '阶段 12：动态内存', correct: false, explanation: '那是上一阶段的内容' },
        { text: '阶段 15：文件操作', correct: false, explanation: '下一个是阶段 14，STL 算法和迭代器' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '最终挑战：用 vector 和 set 配合，找出一组数中的最大值和最小值：',
      code: '#include <iostream>\n#include <vector>\n#include <set>\nusing namespace std;\n\nint main() {\n  vector<int> data = {7, 2, 9, 3, 5, 1, 8};\n  set<int> sorted(data.begin(), data.end());\n  \n  int minVal = *sorted.begin();\n  int maxVal = *sorted.rbegin();\n  \n  cout << "最小值: " << minVal << endl;\n  cout << "最大值: " << maxVal << endl;\n  cout << "中位数: ";\n  int mid = data.size() / 2;\n  auto it = sorted.begin();\n  for (int i = 0; i < mid; i++) ++it;\n  cout << *it << endl;\n}',
      expectedOutput: '最小值: 1\n最大值: 9\n中位数: 5',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '🎉 **恭喜！你完成了阶段 13——STL 容器！**\n你已经学会了 STL 的所有常用容器。\n接下来进入**阶段 14：STL 算法和迭代器**。',
    },
  ],
}

export default lesson
