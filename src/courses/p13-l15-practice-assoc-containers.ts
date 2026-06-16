import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-assoc-containers',
    chapter: 14,
    title: '关联容器练习',
    subtitle: '巩固 11-14',
    description: '综合练习 set、map、unordered_set、unordered_map。',
    objectives: ['能熟练使用关联容器', '能根据场景正确选择容器'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '用 set 删除数组中的重复元素：',
      code: '#include <iostream>\n#include <set>\n\nint main() {\n  int arr[] = {4, 2, 4, 1, 2, 3, 1, 5};\n  std::set<int> unique;\n  for (int i = 0; i < 8; i++) {\n    unique.insert(arr[i]);\n  }\n  for (int x : unique) {\n    std::cout << x << " ";\n  }\n  std::cout << "\\n";\n}',
      hints: [
        'set 自动去重',
        'set 自动排序',
        '输出: 1 2 3 4 5',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 map 统计投票结果：',
      code: '#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n  std::map<std::string, int> votes;\n  votes["Alice"] = 5;\n  votes["Bob"] = 3;\n  votes["Alice"]++;\n  votes["Charlie"] = 2;\n  for (auto& v : votes) {\n    std::cout << v.first << ": " << v.second << "\\n";\n  }\n}',
      hints: [
        'votes["Alice"]++ 给 Alice 加一票',
        '按名字字典序自动排序',
        'Alice 最终 6 票',
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 unordered_map 统计字符出现次数：',
      code: '#include <iostream>\n#include <unordered_map>\n#include <string>\nusing namespace std;\n\nint main() {\n  string text = "hello world";\n  unordered_map<char, int> freq;\n  for (char c : text) {\n    freq[c]++;\n  }\n  for (auto& p : freq) {\n    cout << "\'" << p.first << "\': " << p.second << endl;\n  }\n}',
      comparison: 'none',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '用 set 实现两数组交集：',
      code: '#include <iostream>\n#include <set>\nusing namespace std;\n\nint main() {\n  int a[] = {1, 2, 3, 4, 5};\n  int b[] = {3, 4, 5, 6, 7};\n  set<int> setA;\n  for (int x : a) setA.insert(x);\n  \n  cout << "交集: ";\n  for (int x : b) {\n    if (setA.count(x)) {\n      cout << x << " ";\n    }\n  }\n  cout << endl;\n}',
      expectedOutput: '交集: 3 4 5 ',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '用 unordered_set 优化查找——快速检查学号是否存在：',
      code: '#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n  unordered_set<int> ids = {1001, 1002, 1003, 1004, 1005};\n  int query = 1003;\n  if (ids.find(query) != ids.end()) {\n    cout << "学号 " << query << " 存在" << endl;\n  }\n  query = 2000;\n  if (ids.find(query) == ids.end()) {\n    cout << "学号 " << query << " 不存在" << endl;\n  }\n}',
      expectedOutput: '学号 1003 存在\n学号 2000 不存在',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '你想实现一个"自动补全"功能：用户输入前缀，显示所有匹配的单词。选什么容器？',
      options: [
        { text: 'unordered_set', correct: false, explanation: 'unordered_set 不排序，无法做前缀匹配' },
        { text: 'set（按字典序）', correct: true, explanation: 'set 排序后可以找到前缀范围，遍历匹配的单词' },
        { text: 'vector', correct: false, explanation: 'vector 存也可以但需要手动排序和查找' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：priority_queue 的 pop() 删除的是哪个元素？',
      options: [
        { text: '最先插入的那个', correct: false, explanation: 'pop 删除的是优先级最高的，不是最先插入的' },
        { text: '优先级最高的那个', correct: true, explanation: 'priority_queue 总是删除 top() 元素，即优先级最高的' },
        { text: '随机一个', correct: false, explanation: '不是随机的，按优先级确定' },
        { text: '最后插入的那个', correct: false, explanation: 'stack 才删除最后插入的' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'map<string, int> 中，如果一个键不存在，用 [] 访问会怎样？',
      options: [
        { text: '编译错误', correct: false, explanation: 'map 的 [] 会自动创建键' },
        { text: '自动创建该键，值初始化为 0', correct: true, explanation: 'map 的 [] 如果键不存在，会自动创建并值初始化' },
        { text: '抛出异常', correct: false, explanation: 'map 的 [] 不会抛异常' },
        { text: '返回 nullptr', correct: false, explanation: 'map 返回的是值的引用，不会返回 nullptr' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 map 存储电话簿',
      template: '#include <iostream>\n#include <____>\n#include <string>\n\nint main() {\n  std::____<std::string, std::string> phonebook;\n  phonebook[\"Alice\"] = \"138-0001\";\n  phonebook[\"Bob\"] = \"138-0002\";\n  std::cout << phonebook[\"____\"] << \"\\n\";\n}',
      answers: ['map', 'map', 'Alice'],
      hints: ['第一空是头文件', '第二空是容器名', '第三空是键'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 unordered_set 检查是否存在',
      template: '#include <____>\n\nint main() {\n  std::unordered_set<int> s = {1, 2, 3};\n  int target = 2;\n  auto it = s.____(target);\n  if (it != s.____()) {\n    // found\n  }\n}',
      answers: ['unordered_set', 'find', 'end'],
      hints: ['第一空是头文件', '第二空是查找函数', '第三空是结束迭代器'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：map 和 unordered_map 的 [] 操作有何不同？',
      options: [
        { text: '没有不同，用法一样', correct: true, explanation: '两者 [] 用法一样，但 map 是 O(log n)，unordered_map 平均 O(1)' },
        { text: 'unordered_map 不能用 []', correct: false, explanation: 'unordered_map 支持 []' },
        { text: 'map 的 [] 返回引用，unordered_map 不返回', correct: false, explanation: '两者 [] 都返回引用' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合：用 set 去除重复并排序，再用 vector 存结果：',
      code: '#include <iostream>\n#include <vector>\n#include <set>\n\nint main() {\n  std::vector<int> raw = {5, 2, 8, 2, 5, 1, 9, 3};\n  std::set<int> unique(raw.begin(), raw.end());\n  std::vector<int> sorted(unique.begin(), unique.end());\n  for (int x : sorted) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        '用 vector 构造 set 自动去重排序',
        '再将 set 转回 vector',
        '输出: 1 2 3 5 8 9',
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 unordered_map 统计字符频率，找出出现最多的字符：',
      code: '#include <iostream>\n#include <unordered_map>\n#include <string>\nusing namespace std;\n\nint main() {\n  string text = "abracadabra";\n  unordered_map<char, int> freq;\n  for (char c : text) {\n    freq[c]++;\n  }\n  char most = text[0];\n  int maxCount = 0;\n  for (auto& p : freq) {\n    if (p.second > maxCount) {\n      most = p.first;\n      maxCount = p.second;\n    }\n  }\n  cout << most << ": " << maxCount << " 次" << endl;\n}',
      expectedOutput: 'a: 5 次',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：priority_queue 默认底层容器是？',
      options: [
        { text: 'vector', correct: false, explanation: 'priority_queue 默认底层是 deque' },
        { text: 'deque', correct: true, explanation: 'priority_queue 默认用 deque，也可以用 vector' },
        { text: 'list', correct: false, explanation: 'list 不支持随机访问迭代器' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合：统计一段文字中每个单词出现的次数：',
      code: '#include <iostream>\n#include <map>\n#include <string>\n#include <sstream>\n\nint main() {\n  std::string text = "the cat and the dog and the bird";\n  std::istringstream iss(text);\n  std::map<std::string, int> freq;\n  std::string word;\n  while (iss >> word) {\n    freq[word]++;\n  }\n  for (auto& p : freq) {\n    std::cout << p.first << ": " << p.second << "\\n";\n  }\n}',
      hints: [
        'istringstream 按空格分割字符串',
        'map 自动按键排序',
        'the 出现 3 次',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：deque 最适合的场景是什么？',
      options: [
        { text: '中间插入频繁', correct: false, explanation: 'deque 中间插入 O(n)，list 更适合' },
        { text: '头尾操作频繁且需要下标访问', correct: true, explanation: 'deque 头尾 O(1) + 支持 []，最适合滑动窗口等场景' },
        { text: '只需要尾部操作', correct: false, explanation: '这种情况 vector 更好' },
      ],
    },
    {
      type: 'exposition',
      text: '**练习核心**：\n- set → 去重 + 排序\n- map → 键值统计\n- unordered_set/map → 快速查找\n- 有排序需求 → set/map\n- 追求速度 → unordered',
    },
    {
      type: 'exposition',
      text: '关联容器你已经掌握得差不多了。\n下一课我们做一次"容器全家福"总结。',
    },
  ],
}

export default lesson
