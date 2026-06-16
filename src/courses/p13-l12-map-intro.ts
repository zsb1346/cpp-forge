import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'map-intro',
    chapter: 14,
    title: 'map 键值对字典',
    subtitle: '名字查值',
    description: '学会用 map 实现键值对的存储和查找。',
    objectives: ['能用 map 存储键值对', '能用 [] 和 find 查找 map 中的值'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`map` 是**键值对（key-value）字典**。\n就像一本电话簿——\n**用"名字"查到"电话号码"**。\n名字是键（key），电话号码是值（value）。',
    },
    {
      type: 'exposition',
      text: '声明 map 需要指定键和值的类型：\n`map<键类型, 值类型> 变量名;`\n比如 `map<string, int> phoneBook;`——\n用 string 查找 int。',
    },
    {
      type: 'concept-cards',
      instruction: 'map 的核心概念：',
      cards: [
        { glyph: '🔑', term: '键（key）', meaning: '用来查找的名字，唯一不重复', example: '"Alice" / "score"' },
        { glyph: '📦', term: '值（value）', meaning: '存的实际数据', example: '87 / "pass"' },
        { glyph: '📖', term: 'map<K, V>', meaning: '从 K 类型到 V 类型的映射', example: 'map<string, int> m;' },
      ],
    },
    {
      type: 'exposition',
      text: 'map 的基本操作：\n- `m[key] = value` —— 赋值/修改\n- `m[key]` —— 取值（如果 key 不存在，会自动创建）\n- `m.find(key)` —— 查找，返回迭代器\n- `m.erase(key)` —— 删除键值对',
      code: '#include <map>\n\nstd::map<std::string, int> scores;\nscores["Alice"] = 95;\nscores["Bob"] = 87;\nstd::cout << scores["Alice"];  // 95',
    },
    {
      type: 'type-it',
      instruction: '声明 map，添加键值对并访问：',
      code: '#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n  std::map<std::string, int> ages;\n  ages["Alice"] = 25;\n  ages["Bob"] = 30;\n  ages["Charlie"] = 22;\n  std::cout << "Bob 的年龄: " << ages["Bob"] << "\\n";\n}',
      hints: [
        'map<string, int> 键是 string，值是 int',
        '用 [] 可以直接存取',
        'ages["Bob"] 返回 30',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 find 安全地查找 map：',
      code: '#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n  std::map<std::string, int> scores = {{\"Alice\", 95}, {\"Bob\", 87}, {\"Charlie\", 92}};\n  auto it = scores.find(\"Bob\");\n  if (it != scores.end()) {\n    std::cout << it->first << ": " << it->second << "\\n";\n  }\n}',
      hints: [
        'find 返回迭代器，指向 pair<key, value>',
        'it->first 是键，it->second 是值',
        'end() 表示没找到',
      ],
    },
    {
      type: 'exposition',
      text: '遍历 map：每个元素是一个 `pair`，\n`.first` 是键，`.second` 是值。\n范围 for 遍历：`for (auto& p : myMap)`',
      code: 'for (auto& entry : scores) {\n  std::cout << entry.first << ": " << entry.second << "\\n";\n}',
    },
    {
      type: 'code-runner',
      instruction: '用 map 统计单词出现次数：',
      code: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, int> wordCount;\n  string words[] = {\"apple\", \"banana\", \"apple\", \"cherry\", \"banana\", \"apple\"};\n  for (string w : words) {\n    wordCount[w]++;\n  }\n  for (auto& p : wordCount) {\n    cout << p.first << ": " << p.second << endl;\n  }\n}',
      expectedOutput: 'apple: 3\nbanana: 2\ncherry: 1',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: 'map<string, int> m; m["Alice"] = 90; 之后，m["Alice"] 是？',
      options: [
        { text: '字符串 "Alice"', correct: false, explanation: '值是 int 类型，不是 string' },
        { text: '整数 90', correct: true, explanation: '键 "Alice" 对应的值是 90' },
        { text: '字符串 "90"', correct: false, explanation: '值是 int 90，不是字符串' },
        { text: '未定义', correct: false, explanation: '赋值后值是明确的 90' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'map vs set 对比：',
      cards: [
        { glyph: '📖', term: 'map', meaning: '键值对，用键查值', example: 'map<string,int>' },
        { glyph: '📦', term: 'set', meaning: '只有键（相当于只有 key 的 map）', example: 'set<string>' },
        { glyph: '🔑', term: '都自动排序', meaning: 'map 按键排序，set 按元素排序', example: '都基于红黑树' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 map 实现一个简单的成绩册：',
      code: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, double> grades;\n  grades["Alice"] = 92.5;\n  grades["Bob"] = 85.0;\n  grades["Charlie"] = 78.5;\n  \n  string name = \"Bob\";\n  if (grades.count(name)) {\n    cout << name << " 的成绩: " << grades[name] << endl;\n  }\n  \n  cout << \"平均分: \";\n  double sum = 0;\n  for (auto& g : grades) {\n    sum += g.second;\n  }\n  cout << sum / grades.size() << endl;\n}',
      expectedOutput: 'Bob 的成绩: 85\n平均分: 85.3333',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：set 和 map 的共同特点是什么？',
      options: [
        { text: '元素可以重复', correct: false, explanation: 'set 和 map 的键都是唯一的，不能重复' },
        { text: '自动按键排序', correct: true, explanation: 'set 自动排序元素，map 自动排序键' },
        { text: '支持下标访问', correct: false, explanation: 'map 支持 []，但 set 不支持' },
        { text: '插入删除都是 O(1)', correct: false, explanation: 'set 和 map 是 O(log n)，不是 O(1)' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 find 检查键是否存在：',
      code: '#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n  std::map<std::string, int> m = {{\"A\", 1}, {\"B\", 2}};\n  if (m.find(\"C\") == m.end()) {\n    std::cout << \"C 不存在\\n\";\n  }\n}',
      hints: [
        'find 返回 end() 表示没找到',
        'C 不在 map 中',
        '安全地检查键是否存在',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 map 存城市人口',
      template: '#include <____>\n#include <____>\n\nint main() {\n  std::map<std::string, int> population;\n  population[\"Shanghai\"] = 24000000;\n  population[\"Beijing\"] = 21000000;\n  std::cout << \"上海人口: \" << population[\"____\"] << \"\\n\";\n  std::cout << \"城市数: \" << population.____() << \"\\n\";\n}',
      answers: ['map', 'string', 'Shanghai', 'size'],
      hints: ['前两空是头文件', '第三空是键名', '第四空是获取大小的函数'],
    },
    {
      type: 'multiple-choice',
      question: 'map 的键（key）可以重复吗？',
      options: [
        { text: '可以，map 允许多个相同键', correct: false, explanation: 'map 的键唯一，multimap 才允许重复键' },
        { text: '不可以，每个键唯一', correct: true, explanation: 'map 中每个键只对应一个值，后插入的会覆盖之前的' },
        { text: '取决于值的类型', correct: false, explanation: '键的唯一性是 map 本身的特性，和值类型无关' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 map 的 insert 方法返回 pair 判断是否成功：',
      code: '#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n  std::map<std::string, int> scores;\n  auto result = scores.insert({"Alice", 95});\n  if (result.second) {\n    std::cout << "插入成功\\n";\n  }\n  result = scores.insert({"Alice", 100});\n  if (!result.second) {\n    std::cout << "插入失败，Alice 已存在\\n";\n  }\n}',
      hints: [
        'insert 返回 pair<iterator, bool>',
        'result.second 为 true 表示新插入',
        '重复键 insert 不会覆盖',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：set 和 map 都基于什么数据结构？',
      options: [
        { text: '哈希表', correct: false, explanation: 'unordered_set 和 unordered_map 是哈希表' },
        { text: '红黑树', correct: true, explanation: 'set 和 map 都基于红黑树，自动排序' },
        { text: '动态数组', correct: false, explanation: 'vector 是动态数组' },
      ],
    },
    {
      type: 'type-it',
      instruction: '遍历 map 的几种方式：',
      code: '#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n  std::map<std::string, int> m = {{\"A\", 1}, {\"B\", 2}, {\"C\", 3}};\n  // 方式1：范围 for\n  for (auto& p : m) {\n    std::cout << p.first << p.second << " ";\n  }\n  std::cout << "\\n";\n  // 方式2：迭代器\n  for (auto it = m.begin(); it != m.end(); ++it) {\n    std::cout << it->first << it->second << " ";\n  }\n}',
      hints: [
        '范围 for 更简洁',
        'p.first 是键，p.second 是值',
        'it->first 也是键',
      ],
    },
    {
      type: 'exposition',
      text: 'map 是实际开发中最常用的容器之一。\n"按键查值"的场景无处不在——\n配置、缓存、翻译、计数……\n下一课学更快版本的 unordered_map。',
    },
  ],
}

export default lesson
