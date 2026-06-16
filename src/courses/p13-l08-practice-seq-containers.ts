import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-seq-containers',
    chapter: 14,
    title: '序列容器练习',
    subtitle: '巩固 01-07',
    description: '综合练习 vector/list/deque 的使用和选择。',
    objectives: ['能熟练使用三种序列容器', '能根据场景选择合适容器'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '用 vector 存 5 个整数并求和：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> nums = {10, 20, 30, 40, 50};\n  int sum = 0;\n  for (int i = 0; i < nums.size(); i++) {\n    sum += nums[i];\n  }\n  std::cout << sum << "\\n";\n}',
      hints: [
        '循环 0 到 size()-1 累加',
        'nums[i] 访问每个元素',
        'sum 初始化为 0',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 list 存名字，中间插入一个名字：',
      code: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<std::string> names = {"Alice", "Charlie", "David"};\n  auto it = names.begin();\n  ++it;\n  names.insert(it, "Bob");\n  for (std::string n : names) {\n    std::cout << n << " ";\n  }\n}',
      hints: [
        'it 指向第二个位置（Alice 后面）',
        'insert 在迭代器前插入',
        'Bob 插入到 Alice 和 Charlie 之间',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 deque 实现"两端进，两端出"：',
      code: '#include <iostream>\n#include <deque>\n\nint main() {\n  std::deque<int> d;\n  d.push_back(1);\n  d.push_front(0);\n  d.push_front(-1);\n  d.push_back(2);\n  d.pop_front();\n  d.pop_back();\n  for (int x : d) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'push_front/push_back 添加',
        'pop_front/pop_back 删除',
        '最终剩下 {0, 1}',
      ],
    },
    {
      type: 'code-runner',
      instruction: '实现函数：用 vector 存储斐波那契数列前 10 个数：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> fib;\n  fib.push_back(1);\n  fib.push_back(1);\n  for (int i = 2; i < 10; i++) {\n    fib.push_back(fib[i-1] + fib[i-2]);\n  }\n  for (int i = 0; i < fib.size(); i++) {\n    cout << fib[i] << " ";\n  }\n}',
      expectedOutput: '1 1 2 3 5 8 13 21 34 55',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '用 deque 实现"前 5 后 5"的操作：',
      code: '#include <iostream>\n#include <deque>\nusing namespace std;\n\nint main() {\n  deque<int> d;\n  for (int i = 0; i < 5; i++) {\n    d.push_back(i + 1);\n  }\n  for (int i = 0; i < 3; i++) {\n    d.push_front(-i - 1);\n    d.pop_back();\n  }\n  for (int i = 0; i < d.size(); i++) {\n    cout << d[i] << " ";\n  }\n}',
      expectedOutput: '-2 -1 0 1 2',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '你要实现"历史记录"——新访问的网页放在最前面，超出 10 条就删最旧的。选什么容器？',
      options: [
        { text: 'vector，因为支持下标', correct: false, explanation: '头部插入 vector 太慢' },
        { text: 'deque，因为支持 front 和 back 操作', correct: true, explanation: 'push_front 新记录，pop_back 删最旧，deque 最合适' },
        { text: 'list，因为中间插入快', correct: false, explanation: '不需要中间插入，头尾操作 deque 更高效' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：vector 的 reserve() 函数的作用是什么？',
      options: [
        { text: '改变 vector 的大小', correct: false, explanation: 'reserve 改变容量 capacity，不是大小 size' },
        { text: '预先分配内存，减少扩容次数', correct: true, explanation: 'reserve 提前分配足够内存，避免多次扩容' },
        { text: '删除全部元素', correct: false, explanation: 'clear 删除元素，reserve 是预留内存' },
        { text: '排序元素', correct: false, explanation: '标准库的 sort 函数排序，reserve 不排序' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪种容器可以既支持下标访问，又支持 O(1) 头部插入？',
      options: [
        { text: 'vector', correct: false, explanation: 'vector 头部插入是 O(n)' },
        { text: 'list', correct: false, explanation: 'list 不支持下标访问' },
        { text: 'deque', correct: true, explanation: 'deque 同时支持下标访问和 O(1) 头尾操作' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：声明并初始化三种容器',
      template: '#include <____>\n#include <____>\n#include <____>\n\nint main() {\n  std::____<int> v = {1, 2, 3};\n  std::____<int> l = {1, 2, 3};\n  std::____<int> d = {1, 2, 3};\n}',
      answers: ['vector', 'list', 'deque', 'vector', 'list', 'deque'],
      hints: ['前三空是头文件名', '后三空是容器类型名'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：在 deque 头尾各添加一个元素',
      template: '#include <deque>\n\nint main() {\n  std::deque<int> d = {2, 3};\n  d.____(1);  // 头部添加 1\n  d.____(4);  // 尾部添加 4\n}',
      answers: ['push_front', 'push_back'],
      hints: ['第一个空是头部添加', '第二个空是尾部添加'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：vector 和 deque 的共同点是什么？',
      options: [
        { text: '都支持 push_front', correct: false, explanation: 'vector 不支持 push_front' },
        { text: '都支持下标 [] 访问', correct: true, explanation: 'vector 和 deque 都支持随机访问' },
        { text: '中间插入都是 O(1)', correct: false, explanation: '两者中间插入都是 O(n)' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 vector 存储自定义类型——结构体：',
      code: '#include <iostream>\n#include <vector>\n#include <string>\n\nstruct Student {\n  std::string name;\n  int score;\n};\n\nint main() {\n  std::vector<Student> students;\n  students.push_back({"Alice", 95});\n  students.push_back({"Bob", 87});\n  for (Student s : students) {\n    std::cout << s.name << ": " << s.score << "\\n";\n  }\n}',
      hints: [
        'vector 可以存自定义类型',
        'push_back 用花括号构造临时对象',
        '范围 for 遍历每个学生',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 list 实现 LRU 风格——最新在上，超出容量删除最旧：',
      code: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<int> recent;\n  int newItem = 5;\n  recent.push_front(newItem);\n  if (recent.size() > 3) {\n    recent.pop_back();\n  }\n  newItem = 6;\n  recent.push_front(newItem);\n  if (recent.size() > 3) {\n    recent.pop_back();\n  }\n  for (int x : recent) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'push_front 新元素在最前面',
        'size > 3 时 pop_back 删除最旧',
        '最终: 6 5',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：为什么默认首选是 vector？',
      options: [
        { text: '它是 STL 速度最快的容器', correct: false, explanation: 'unordered_set 查找更快，但 vector 综合最均衡' },
        { text: '它在大多数场景下性能优秀且内存开销最小', correct: true, explanation: 'vector 尾部操作 O(1)，随机访问 O(1)，内存连续缓存友好' },
        { text: '它功能最多', correct: false, explanation: '功能多少不决定默认选择' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '综合练习：输入 5 个数，用 deque 实现正序和逆序输出：',
      code: '#include <iostream>\n#include <deque>\nusing namespace std;\n\nint main() {\n  deque<int> d;\n  d.push_back(1);\n  d.push_back(2);\n  d.push_back(3);\n  d.push_back(4);\n  d.push_back(5);\n  \n  cout << "正序: ";\n  for (int i = 0; i < d.size(); i++) {\n    cout << d[i] << " ";\n  }\n  cout << endl;\n  \n  cout << "逆序: ";\n  for (int i = d.size() - 1; i >= 0; i--) {\n    cout << d[i] << " ";\n  }\n}',
      expectedOutput: '正序: 1 2 3 4 5 \n逆序: 5 4 3 2 1 ',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 vector 存储 1 到 10，然后删除所有偶数',
      template: '#include <vector>\n\nint main() {\n  std::vector<int> v;\n  for (int i = 1; i <= 10; i++) {\n    v.____(i);\n  }\n  for (int i = 0; i < v.size(); i++) {\n    if (v[i] % 2 == 0) {\n      v.____(v.begin() + i);\n      i--;\n    }\n  }\n}',
      answers: ['push_back', 'erase'],
      hints: ['第一空是尾部添加', '第二空是删除函数'],
    },
    {
      type: 'code-runner',
      instruction: '综合练习：用 list 存储书名，中间插入新书：',
      code: '#include <iostream>\n#include <list>\n#include <string>\nusing namespace std;\n\nint main() {\n  list<string> books = {"C++ Primer", "Effective C++"};\n  auto it = books.begin();\n  ++it;\n  books.insert(it, "STL 源码剖析");\n  books.push_back("深入理解计算机系统");\n  \n  for (string b : books) {\n    cout << b << endl;\n  }\n}',
      expectedOutput: 'C++ Primer\nSTL 源码剖析\nEffective C++\n深入理解计算机系统',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '练习结束！序列容器你已经掌握得差不多了。\n下一部分我们学**容器适配器**——stack 和 queue。',
    },
  ],
}

export default lesson
