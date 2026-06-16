import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'unordered-set-map',
    chapter: 14,
    title: 'unordered_set/map',
    subtitle: '哈希表更快',
    description: '理解哈希表实现的 set 和 map 的用法和优势。',
    objectives: ['能用 unordered_set 和 unordered_map', '理解哈希表的 O(1) 查找优势'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`set` 和 `map` 基于红黑树，**自动排序**但查找是 O(log n)。\n如果你**不需要排序**，只追求速度——\n用 `unordered_set` 和 `unordered_map`！',
    },
    {
      type: 'exposition',
      text: 'unordered 系列基于**哈希表（hash table）**。\n核心思想：用**哈希函数**把键直接映射到存储位置。\n插入、删除、查找**平均 O(1)**——常数时间。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: 'unordered 系列速览：',
      cards: [
        { glyph: '⚡', term: 'unordered_set', meaning: '不排序的集合，查找 O(1)', example: 'unordered_set<int> us;' },
        { glyph: '⚡', term: 'unordered_map', meaning: '不排序的字典，查找 O(1)', example: 'unordered_map<string,int> um;' },
        { glyph: '🏗️', term: '哈希表', meaning: '用哈希函数定位元素，平均 O(1)', example: '比红黑树更快' },
      ],
    },
    {
      type: 'exposition',
      text: 'unordered_set 的用法和 set **几乎一样**：\n`insert`、`erase`、`find`、`size`、`empty`——\n函数名和功能完全一样。\n唯一的区别：**元素不排序**。',
      code: '#include <unordered_set>\n\nstd::unordered_set<int> us;\nus.insert(5);\nus.insert(3);\nus.insert(8);\nfor (int x : us) {\n  std::cout << x << " ";  // 顺序不确定\n}',
    },
    {
      type: 'type-it',
      instruction: '用 unordered_set 存数据：',
      code: '#include <iostream>\n#include <unordered_set>\n\nint main() {\n  std::unordered_set<int> us;\n  us.insert(3);\n  us.insert(1);\n  us.insert(4);\n  us.insert(1);\n  for (int x : us) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'unordered_set 不会自动排序',
        '重复的 1 只保留一个',
        '每次运行输出顺序可能不同',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 unordered_map 存键值对：',
      code: '#include <iostream>\n#include <unordered_map>\n#include <string>\n\nint main() {\n  std::unordered_map<std::string, int> ages;\n  ages["Alice"] = 25;\n  ages["Bob"] = 30;\n  std::cout << ages[\"Alice\"] << " " << ages[\"Bob\"] << "\\n";\n  std::cout << ages.size() << "\\n";\n}',
      hints: [
        'unordered_map 用 [] 访问，和 map 一样',
        'size() 返回键值对个数',
        '元素不按键名排序',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'unordered_map 和 map 最主要的区别是什么？',
      options: [
        { text: 'unordered_map 不能存 string 类型的键', correct: false, explanation: 'unordered_map 可以存 string 键' },
        { text: 'unordered_map 不按键名排序', correct: true, explanation: 'map 按键排序（红黑树），unordered_map 不排序（哈希表）' },
        { text: 'unordered_map 不能使用 []', correct: false, explanation: 'unordered_map 同样支持 [] 操作' },
        { text: 'unordered_map 速度更慢', correct: false, explanation: 'unordered_map 平均更快（O(1) vs O(log n)）' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '比较 set 和 unordered_set 的输出顺序差异：',
      code: '#include <iostream>\n#include <set>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n  set<int> s = {3, 1, 4, 1, 5};\n  unordered_set<int> us = {3, 1, 4, 1, 5};\n  \n  cout << "set:          ";\n  for (int x : s) cout << x << " ";\n  cout << endl;\n  \n  cout << "unordered_set: ";\n  for (int x : us) cout << x << " ";\n  cout << endl;\n}',
      comparison: 'none',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '哈希表查找的时间复杂度平均是？',
      options: [
        { text: 'O(1) 常数时间', correct: true, explanation: '哈希表通过哈希函数直接定位，平均 O(1)' },
        { text: 'O(log n) 对数时间', correct: false, explanation: 'O(log n) 是红黑树（set/map）的时间复杂度' },
        { text: 'O(n) 线性时间', correct: false, explanation: 'O(n) 是 vector 线性查找' },
        { text: 'O(n^2)', correct: false, explanation: 'O(n^2) 是某些排序算法的时间复杂度' },
      ],
    },
    {
      type: 'exposition',
      text: 'unordered_set/map 也有代价：\n1. 内存占用更大\n2. 不排序\n3. 最坏情况下可能 O(n)（哈希冲突）\n\n**需要排序 → 用 set/map**\n**需要速度 → 用 unordered**',
    },
    {
      type: 'type-it',
      instruction: '用 unordered_map 统计单词：',
      code: '#include <iostream>\n#include <unordered_map>\n#include <string>\n\nint main() {\n  std::unordered_map<std::string, int> freq;\n  freq["hello"] = 1;\n  freq["world"] = 2;\n  freq["hello"]++;\n  std::cout << freq[\"hello\"] << " " << freq[\"world\"] << "\\n";\n}',
      hints: [
        'freq["hello"]++ 把 hello 的计数加 1',
        '输出 hello:2, world:2',
        'unordered_map 的 [] 操作会自动创建键',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：map 的底层数据结构是什么？',
      options: [
        { text: '哈希表', correct: false, explanation: 'unordered_map 用哈希表，map 用红黑树' },
        { text: '红黑树', correct: true, explanation: 'map 和 set 都基于红黑树，自动排序' },
        { text: '动态数组', correct: false, explanation: 'vector 是动态数组' },
        { text: '链表', correct: false, explanation: 'list 是链表' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：使用 unordered_set',
      template: '#include <____>\n\nint main() {\n  std::unordered_set<int> us;\n  us.____(10);\n  us.____(20);\n  if (us.____(10) != us.end()) {\n    // 找到了\n  }\n}',
      answers: ['unordered_set', 'insert', 'insert', 'find'],
      hints: ['第一空是头文件', '然后插入两个元素', '最后一空是查找函数'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：使用 unordered_map',
      template: '#include <____>\n#include <____>\n\nint main() {\n  std::unordered_map<std::string, int> m;\n  m[\"apple\"] = 5;\n  m[\"banana\"] = 3;\n  std::cout << m.____(\"apple\") << \"\\n\";\n  std::cout << m.____() << \"\\n\";\n}',
      answers: ['unordered_map', 'string', 'size'],
      hints: ['前两空是头文件名', '第三空是获取键值对数量', '注意先看需求：第二个头文件是 std::string 的'],
    },
    {
      type: 'multiple-choice',
      question: '哈希冲突会导致什么？',
      options: [
        { text: '容器崩溃', correct: false, explanation: '哈希冲突不会导致崩溃，只是性能下降' },
        { text: '查找变慢（退化到 O(n)）', correct: true, explanation: '严重哈希冲突时，多个元素在同一个桶里，需要线性查找' },
        { text: '元素自动排序', correct: false, explanation: '哈希表不会自动排序' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'unordered_map 的 bucket_count——看哈希表有多少桶：',
      code: '#include <iostream>\n#include <unordered_map>\n#include <string>\n\nint main() {\n  std::unordered_map<std::string, int> m;\n  m["a"] = 1;\n  m["b"] = 2;\n  m["c"] = 3;\n  std::cout << "桶数: " << m.bucket_count() << "\\n";\n  std::cout << "负载因子: " << m.load_factor() << "\\n";\n}',
      hints: [
        'bucket_count 是哈希表的桶数量',
        'load_factor = size / bucket_count',
        '负载因子越大，哈希冲突概率越高',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：set 的 lower_bound 返回什么？',
      options: [
        { text: '第一个大于等于给定值的元素', correct: true, explanation: 'lower_bound 返回第一个 >= x 的迭代器' },
        { text: '第一个小于等于给定值的元素', correct: false, explanation: '小于等于的是 upper_bound 的逆操作' },
        { text: '最后一个元素', correct: false, explanation: 'lower_bound 和最后一个元素无关' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'unordered_set 的 rehash——手动调整桶数：',
      code: '#include <iostream>\n#include <unordered_set>\n\nint main() {\n  std::unordered_set<int> us;\n  us.rehash(50);\n  std::cout << "桶数: " << us.bucket_count() << "\\n";\n  for (int i = 0; i < 10; i++) {\n    us.insert(i);\n  }\n  std::cout << "size: " << us.size() << "\\n";\n}',
      hints: [
        'rehash(n) 把桶数调整为至少 n',
        '提前 rehash 可以减少哈希冲突',
        'size 不受 rehash 影响',
      ],
    },
    {
      type: 'exposition',
      text: '**总结**：\n- **set/map**：红黑树，自动排序，O(log n)\n- **unordered_set/unordered_map**：哈希表，不排序，平均 O(1)\n- 需要排序→有序，追求速度→无序\n下一课专门对比 set 和 unordered_set。',
    },
  ],
}

export default lesson
