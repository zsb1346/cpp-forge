import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'set-vs-unordered',
    chapter: 14,
    title: 'set vs unordered_set',
    subtitle: '排序 vs 速度',
    description: '理解 set 和 unordered_set 的取舍策略。',
    objectives: ['能根据场景选择 set 或 unordered_set', '理解排序和速度的权衡'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`set` 和 `unordered_set` 都能存不重复的元素。\n关键区别：\n- set：**自动排序**，O(log n)\n- unordered_set：**更快**（O(1)），但**不排序**',
    },
    {
      type: 'exposition',
      text: '**选 set 的情况**：\n- 需要按顺序遍历元素\n- 需要范围查询（比如"找 10 到 20 之间的元素"）\n- 比较操作开销小\n- 哈希冲突严重时 unordered 可能退化',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**选 unordered_set 的情况**：\n- 只需要快速插入和查找\n- 不关心元素顺序\n- 键类型有好的哈希函数（int、string 都有默认的）\n- 内存充足',
    },
    {
      type: 'concept-cards',
      instruction: 'set vs unordered_set 对比：',
      cards: [
        { glyph: '🌳', term: 'set', meaning: '红黑树，自动排序', example: 'O(log n) 查找' },
        { glyph: '⚡', term: 'unordered_set', meaning: '哈希表，不排序', example: '平均 O(1) 查找' },
        { glyph: '📏', term: 'set 适合', meaning: '需要有序遍历、范围查询', example: '打印排序后的名单' },
        { glyph: '🚀', term: 'unordered 适合', meaning: '只要快速插入和查找', example: '检查用户名是否存在' },
      ],
    },
    {
      type: 'exposition',
      text: '**性能对比**（10 万次操作）：\n- set 插入 ≈ 慢 2-3 倍\n- set 查找 ≈ 慢 2-3 倍\n但差别在**数据量大**时才明显。\n你的数据集如果不到几百个，感受不到差别。',
    },
    {
      type: 'multiple-choice',
      question: '你的程序需要按键的字母顺序打印学生名单。选哪个？',
      options: [
        { text: 'set<string>', correct: true, explanation: '需要按字母顺序输出，set 自动排序' },
        { text: 'unordered_set<string>', correct: false, explanation: 'unordered_set 不排序，输出顺序不确定' },
        { text: 'vector<string>', correct: false, explanation: '可以用 vector 但需要手动排序' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '你的程序只需要快速检查一个 IP 地址是否在黑名单中，不关心顺序。选哪个？',
      options: [
        { text: 'set<string>', correct: false, explanation: 'set 可以但速度不如 unordered_set' },
        { text: 'unordered_set<string>', correct: true, explanation: '最快，O(1) 查找，不关心顺序' },
        { text: 'list<string>', correct: false, explanation: 'list 查找需要线性搜索，很慢' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '你需要找出两个大集合的交集，数据量百万级。哪个容器更适合？',
      options: [
        { text: 'set', correct: false, explanation: 'set 查找 O(log n)，百万级也可以但 unordered 更快' },
        { text: 'unordered_set', correct: true, explanation: 'O(1) 查找，百万级数据时优势明显' },
        { text: 'vector', correct: false, explanation: 'vector 查找 O(n)，百万级很慢' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：map 和 unordered_map 的区别和 set/unordered_set 一样吗？',
      options: [
        { text: '一样，有序 vs 无序的取舍', correct: true, explanation: 'map 和 set 一样基于红黑树，unordered 版本基于哈希表' },
        { text: '不一样，map 没有 unordered 版本', correct: false, explanation: 'unordered_map 和 unordered_set 都存在' },
        { text: '一样，但 map 不能用 []', correct: false, explanation: 'map 和 unordered_map 都支持 []' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 set 存成绩并升序输出：',
      code: '#include <iostream>\n#include <set>\n\nint main() {\n  std::set<int> scores = {88, 75, 92, 60, 85};\n  for (int s : scores) {\n    std::cout << s << " ";\n  }\n  std::cout << "\\n";\n}',
      hints: [
        'set 自动从小到大排序',
        '输出: 60 75 85 88 92',
        'vector 需要手动 sort',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 unordered_set 快速查找：',
      code: '#include <iostream>\n#include <unordered_set>\n#include <string>\n\nint main() {\n  std::unordered_set<std::string> banned = {\"spam\", \"badword\", \"ads\"};\n  std::string check = \"spam\";\n  if (banned.find(check) != banned.end()) {\n    std::cout << check << " 被屏蔽\\n";\n  }\n}',
      hints: [
        'find 返回迭代器，end 表示没找到',
        'unordered_set 查找平均 O(1)',
        'spam 在黑名单中',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：根据场景选择容器',
      template: '#include <____>  // 需要排序，用 set\n\nint main() {\n  std::____<int> data;\n  data.insert(3);\n  data.insert(1);\n  data.insert(2);\n  // 遍历时保证是 1 2 3\n}',
      answers: ['set', 'set'],
      hints: ['第一空是头文件（有序版本）', '第二空是容器名'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：根据场景选择容器',
      template: '#include <____>  // 追求速度，用 unordered_set\n\nint main() {\n  std::____<int> data;\n  data.insert(100);\n  data.insert(200);\n}',
      answers: ['unordered_set', 'unordered_set'],
      hints: ['第一空是头文件（无序版本）', '第二空是容器名'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：set 中元素可以重复吗？',
      options: [
        { text: '可以，set 不关心重复', correct: false, explanation: 'set 不允许重复元素，同一个值只能出现一次' },
        { text: '不可以，每个值唯一', correct: true, explanation: 'set 的核心特性就是不重复' },
        { text: '取决于初始化方式', correct: false, explanation: 'set 永远不允许重复' },
        { text: 'string 类型的可以', correct: false, explanation: '所有类型的 set 都不允许重复' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '什么情况下 unordered_set 可能比 set 慢？',
      options: [
        { text: '数据量小的时候', correct: false, explanation: '数据量小的时候差距不大，哈希函数也有开销' },
        { text: '哈希冲突严重的时候', correct: true, explanation: '严重哈希冲突导致查找退化为 O(n)，可能比红黑树还慢' },
        { text: '遍历的时候', correct: false, explanation: '遍历总是 O(n)，两者差别不大' },
      ],
    },
    {
      type: 'type-it',
      instruction: '场景模拟：用 set 实现"按名字顺序打印好友列表"：',
      code: '#include <iostream>\n#include <set>\n#include <string>\n\nint main() {\n  std::set<std::string> friends;\n  friends.insert("Charlie");\n  friends.insert("Alice");\n  friends.insert("Bob");\n  std::cout << "好友列表（按字母顺序）:\\n";\n  for (std::string f : friends) {\n    std::cout << f << "\\n";\n  }\n}',
      hints: [
        'set 自动按字典序排序',
        'Alice, Bob, Charlie',
        'unordered_set 不能保证这个顺序',
      ],
    },
    {
      type: 'type-it',
      instruction: '场景模拟：用 unordered_set 实现"用户名唯一性检查"：',
      code: '#include <iostream>\n#include <unordered_set>\n#include <string>\n\nint main() {\n  std::unordered_set<std::string> usernames = {"alice", "bob", "charlie"};\n  std::string newUser = "alice";\n  if (usernames.find(newUser) == usernames.end()) {\n    std::cout << newUser << " 可用\\n";\n  } else {\n    std::cout << newUser << " 已被注册\\n";\n  }\n}',
      hints: [
        'unordered_set 查找 O(1)，非常快',
        'alice 已存在',
        '适合唯一性检查场景',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：根据场景选择 set 或 unordered_set',
      template: '#include <____>\n\nint main() {\n  // 需要按顺序遍历，用 set\n  std::____<int> data = {3, 1, 2};\n  for (int x : data) {\n    // 保证输出 1 2 3\n  }\n}',
      answers: ['set', 'set'],
      hints: ['第一空是头文件', '第二空是容器名'],
    },
    {
      type: 'exposition',
      text: '**一句话原则**：\n需要顺序 → `set` / `map`\n追求速度 → `unordered_set` / `unordered_map`\n下一节是关联容器综合练习。',
    },
  ],
}

export default lesson
