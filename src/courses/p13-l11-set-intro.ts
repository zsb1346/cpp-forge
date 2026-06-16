import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'set-intro',
    chapter: 14,
    title: 'set 有序集合',
    subtitle: '自动排序不重复',
    description: '理解 set 的自动排序和去重特性。',
    objectives: ['能用 set 存储不重复的有序元素', '能用 insert 和 find 操作 set'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`set` 是**不重复的有序集合**。\n它的两个核心特点：\n1. **不重复**——同一个值只能出现一次\n2. **自动排序**——元素按从小到大排列',
    },
    {
      type: 'exposition',
      text: 'set 的底层是**红黑树**（一种自平衡二叉搜索树）。\n插入、删除、查找的时间复杂度都是 **O(log n)**。\n比 vector 的线性查找快很多。',
    },
    {
      type: 'concept-cards',
      instruction: 'set 的核心操作：',
      cards: [
        { glyph: '📥', term: 's.insert(x)', meaning: '插入元素，重复的不会加入', example: 's.insert(5);' },
        { glyph: '🔍', term: 's.find(x)', meaning: '查找元素，找到返回迭代器', example: 'auto it = s.find(3);' },
        { glyph: '🗑️', term: 's.erase(x)', meaning: '删除指定值的元素', example: 's.erase(5);' },
        { glyph: '📏', term: 's.size()', meaning: '返回元素个数', example: 'cout << s.size();' },
      ],
    },
    {
      type: 'type-it',
      instruction: '声明 set，插入元素，观察自动排序和去重：',
      code: '#include <iostream>\n#include <set>\n\nint main() {\n  std::set<int> s;\n  s.insert(5);\n  s.insert(2);\n  s.insert(8);\n  s.insert(2);\n  s.insert(1);\n  for (int x : s) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'set 自动从小到大排序',
        '重复的 2 只保留一个',
        '输出应该是 1 2 5 8',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 find 查找 set 中的元素：',
      code: '#include <iostream>\n#include <set>\n\nint main() {\n  std::set<int> s = {10, 20, 30, 40};\n  auto it = s.find(20);\n  if (it != s.end()) {\n    std::cout << "找到了: " << *it << "\\n";\n  } else {\n    std::cout << "没找到\\n";\n  }\n}',
      hints: [
        'find 返回迭代器，指向找到的元素',
        '如果没找到，返回 s.end()',
        'end() 是最后一个元素后面的位置',
      ],
    },
    {
      type: 'exposition',
      text: 'set 也可以存 string——自动按字典序排序。\n`count(x)` 返回元素 x 的个数（set 中只能是 0 或 1）。\n`empty()` 判断是否为空。',
      code: 'std::set<std::string> names;\nnames.insert("Charlie");\nnames.insert("Alice");\nnames.insert("Bob");\nfor (std::string n : names) {\n  std::cout << n << " ";\n}\n// Output: Alice Bob Charlie (字典序)',
    },
    {
      type: 'code-runner',
      instruction: '用 set 统计不重复的数字：',
      code: '#include <iostream>\n#include <set>\nusing namespace std;\n\nint main() {\n  set<int> numbers;\n  int data[] = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};\n  for (int i = 0; i < 10; i++) {\n    numbers.insert(data[i]);\n  }\n  cout << "不重复的数字: ";\n  for (int x : numbers) {\n    cout << x << " ";\n  }\n  cout << endl;\n  cout << "共 " << numbers.size() << " 个";\n}',
      expectedOutput: '不重复的数字: 1 2 3 4 5 6 9 \n共 7 个',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: 'set 中的元素是如何排列的？',
      options: [
        { text: '按插入顺序', correct: false, explanation: 'set 不按插入顺序，自动排序' },
        { text: '从小到大（升序）', correct: true, explanation: 'set 默认升序排列元素' },
        { text: '从大到小（降序）', correct: false, explanation: '可以用 set<int, greater<int>> 实现降序' },
        { text: '随机排列', correct: false, explanation: 'set 是红黑树，元素有序排列' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 count 检查元素是否存在：',
      code: '#include <iostream>\n#include <set>\nusing namespace std;\n\nint main() {\n  set<string> fruits = {"apple", "banana", "cherry"};\n  string query = "banana";\n  if (fruits.count(query) > 0) {\n    cout << query << " 在集合中" << endl;\n  }\n  query = "grape";\n  if (fruits.count(query) == 0) {\n    cout << query << " 不在集合中" << endl;\n  }\n}',
      expectedOutput: 'banana 在集合中\ngrape 不在集合中',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：priority_queue 默认返回的是？',
      options: [
        { text: '最小元素', correct: false, explanation: '默认是最大堆，返回最大元素' },
        { text: '最大元素', correct: true, explanation: 'priority_queue 默认 top 是最大元素' },
        { text: '第一个插入的元素', correct: false, explanation: 'priority_queue 不按插入顺序' },
        { text: '随机元素', correct: false, explanation: 'priority_queue 总是按优先级取元素' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'set 的 erase 用法：',
      code: '#include <iostream>\n#include <set>\n\nint main() {\n  std::set<int> s = {1, 2, 3, 4, 5};\n  s.erase(3);\n  for (int x : s) {\n    std::cout << x << " ";\n  }\n  std::cout << "\\n" << s.size() << "\\n";\n}',
      hints: [
        'erase(值) 删除匹配的元素',
        '删除 3 后，剩下 1 2 4 5',
        'size 变为 4',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：set 的基本操作',
      template: '#include <____>\n\nint main() {\n  std::set<int> s;\n  s.____(10);\n  s.____(5);\n  s.____(15);\n  // 查找 10\n  auto it = s.____(10);\n  if (it != s.____()) {\n    // 找到了\n  }\n}',
      answers: ['set', 'insert', 'insert', 'insert', 'find', 'end'],
      hints: ['第一个空是头文件', '第二到四空是插入函数', '第五空是查找函数', '第六空是结束迭代器'],
    },
    {
      type: 'multiple-choice',
      question: 'set 中 insert(3) 如果 3 已存在，会怎样？',
      options: [
        { text: '覆盖原来的 3', correct: false, explanation: 'set 不覆盖，insert 在重复时什么都不做' },
        { text: '什么也不做，3 只保留一个', correct: true, explanation: 'set 不重复，insert 重复值不会改变集合' },
        { text: '报错', correct: false, explanation: 'set 不会报错，只是什么都不做' },
        { text: '删除原来的 3 再添加', correct: false, explanation: 'set 不替换元素' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'set 的 lower_bound 和 upper_bound——范围查找：',
      code: '#include <iostream>\n#include <set>\n\nint main() {\n  std::set<int> s = {10, 20, 30, 40, 50};\n  auto low = s.lower_bound(25);\n  auto up = s.upper_bound(45);\n  std::cout << *low << " " << *up << "\\n";\n}',
      hints: [
        'lower_bound 返回第一个 >= 给定值的元素',
        'upper_bound 返回第一个 > 给定值的元素',
        'low=30 (>=25), up=50 (>45)',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'set 中查找元素用哪个函数最佳？',
      options: [
        { text: 'find', correct: true, explanation: 'find(x) 返回迭代器，O(log n) 查找' },
        { text: 'search', correct: false, explanation: 'set 没有 search 成员函数' },
        { text: 'lookup', correct: false, explanation: 'set 没有 lookup 成员函数' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'set 存字符串——自动按字典序排序：',
      code: '#include <iostream>\n#include <set>\n#include <string>\n\nint main() {\n  std::set<std::string> words = {"banana", "apple", "cherry"};\n  for (std::string w : words) {\n    std::cout << w << " ";\n  }\n}',
      hints: [
        'string 在 set 中按字典序排序',
        '输出: apple banana cherry',
        'set 的排序是自动的',
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 set 实现"两数组合并去重排序"：',
      code: '#include <iostream>\n#include <set>\nusing namespace std;\n\nint main() {\n  int a[] = {3, 1, 4, 1};\n  int b[] = {5, 9, 2, 6, 5};\n  set<int> merged;\n  for (int x : a) merged.insert(x);\n  for (int x : b) merged.insert(x);\n  \n  cout << "合并去重排序: ";\n  for (int x : merged) cout << x << " ";\n  cout << endl;\n  cout << "共 " << merged.size() << " 个";\n}',
      expectedOutput: '合并去重排序: 1 2 3 4 5 6 9 \n共 7 个',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: 'set 非常适合"存不重复的值并需要快速查找"的场景。\n下一课学 `map`——比 set 更强大的键值对容器。',
    },
  ],
}

export default lesson
