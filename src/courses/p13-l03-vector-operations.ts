import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'vector-operations',
    chapter: 14,
    title: 'vector 常用操作',
    subtitle: 'pop_back/insert/erase',
    description: '学会 vector 的更多成员函数用法。',
    objectives: ['能用 pop_back 删除尾部元素', '能用 insert 和 erase 操作中间元素'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上节课学了 `push_back` 和 `size`。\n但 vector 还有更多操作：删除尾部、中间插入、中间删除。',
    },
    {
      type: 'exposition',
      text: '`pop_back()`——**删除尾部元素**。\n没有参数，没有返回值，就是删掉最后一个。',
      code: 'std::vector<int> v = {1, 2, 3};\nv.pop_back();  // 现在 v = {1, 2}',
    },
    {
      type: 'exposition',
      text: '`insert(位置, 值)`——**在指定位置插入**。\n位置要用"迭代器"表示，比如 `v.begin() + n` 表示第 n 个位置。\n插入后，后面的元素自动后移。',
      code: 'std::vector<int> v = {1, 2, 4};\nv.insert(v.begin() + 2, 3);  // 在索引 2 处插入\n// v = {1, 2, 3, 4}',
    },
    {
      type: 'exposition',
      text: '`erase(位置)`——**删除指定位置的元素**。\n后面的元素自动前移填补空缺。',
      code: 'std::vector<int> v = {1, 2, 3, 4};\nv.erase(v.begin() + 1);  // 删除索引 1（值 2）\n// v = {1, 3, 4}',
    },
    {
      type: 'concept-cards',
      instruction: 'vector 常用操作一览：',
      cards: [
        { glyph: '➕', term: 'push_back(x)', meaning: '尾部添加元素', example: 'v.push_back(5);' },
        { glyph: '➖', term: 'pop_back()', meaning: '删除尾部元素', example: 'v.pop_back();' },
        { glyph: '📌', term: 'insert(it, x)', meaning: '在迭代器位置插入', example: 'v.insert(v.begin(), 0);' },
        { glyph: '🗑️', term: 'erase(it)', meaning: '删除迭代器位置的元素', example: 'v.erase(v.begin()+2);' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习 push_back 和 pop_back：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v;\n  v.push_back(1);\n  v.push_back(2);\n  v.push_back(3);\n  v.pop_back();\n  std::cout << v.size() << "\\n";\n  std::cout << v[0] << v[1];\n}',
      hints: [
        'push_back 三次添加 1,2,3',
        'pop_back() 删除最后一个元素 3',
        'size 应该是 2，剩下 1 和 2',
      ],
    },
    {
      type: 'type-it',
      instruction: '练习 insert 中间插入：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {10, 30, 40};\n  v.insert(v.begin() + 1, 20);\n  for (int i = 0; i < v.size(); i++) {\n    std::cout << v[i] << " ";\n  }\n}',
      hints: [
        'v.begin() + 1 表示在索引 1 处插入',
        '插入后变成 10, 20, 30, 40',
        '循环遍历输出验证结果',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：删除 vector 的第二个元素',
      template: '#include <vector>\n\nint main() {\n  std::vector<int> v = {5, 10, 15};\n  v.____(v.begin() + ____);\n  // 删除后 v = {5, 15}\n}',
      answers: ['erase', '1'],
      hints: ['第一个空是删除函数名', '第二个空是索引位置，从 0 开始'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：在 vector 尾部添加两个元素',
      template: '#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 2};\n  v.____(3);\n  v.____(4);\n  // v = {1, 2, 3, 4}\n}',
      answers: ['push_back', 'push_back'],
      hints: ['两个空都是同一个函数', '该函数在尾部添加元素'],
    },
    {
      type: 'exposition',
      text: '注意：`insert` 和 `erase` 在 vector 中间操作时比较慢——\n因为后面的元素要**整体移动**。\n所以 vector 擅长尾部操作，中间插入删除最好用 list。',
    },
    {
      type: 'multiple-choice',
      question: '`v.pop_back()` 的作用是？',
      options: [
        { text: '删除 vector 的第一个元素', correct: false, explanation: 'pop_back 删除最后一个，不是第一个' },
        { text: '删除 vector 的最后一个元素', correct: true, explanation: 'pop_back 正好删除尾部元素' },
        { text: '删除所有元素', correct: false, explanation: 'pop_back 只删一个，clear() 才清空全部' },
        { text: '返回最后一个元素然后删除', correct: false, explanation: 'pop_back 不返回任何值' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`vector<int> v = {1,2,3}; v.push_back(4);` 后 v.size() 是多少？',
      options: [
        { text: '3', correct: false, explanation: 'push_back 加了一个，size 变成 4' },
        { text: '4', correct: true, explanation: '原始 3 个，push_back 一个，共 4 个' },
        { text: '1', correct: false, explanation: 'push_back 是添加不是替换' },
        { text: '7', correct: false, explanation: 'push_back 只加一个，不会变 7' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行代码，理解 insert 的用法：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 4, 5};\n  v.insert(v.begin() + 2, 3);\n  v.pop_back();\n  for (int i = 0; i < v.size(); i++) {\n    cout << v[i] << " ";\n  }\n}',
      expectedOutput: '1 2 3 4',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '`clear()` 是另一个有用的成员函数——**清空所有元素**。\n调用后 size 变为 0，但 capacity 不变。',
      code: 'std::vector<int> v = {1, 2, 3};\nv.clear();\nstd::cout << v.size();      // 0\nstd::cout << v.capacity();  // 可能是 3',
    },
    {
      type: 'type-it',
      instruction: '练习 clear 和 empty：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 2, 3, 4, 5};\n  std::cout << v.size() << " " << v.empty() << "\\n";\n  v.clear();\n  std::cout << v.size() << " " << v.empty() << "\\n";\n}',
      hints: [
        'empty() 在 vector 为空时返回 true（即 1）',
        'clear() 后 size 为 0',
        '初始 size=5，empty=0（非空）',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`v.erase(v.begin() + 2)` 删除了 vector 中的第几个元素？',
      options: [
        { text: '第 1 个', correct: false, explanation: 'begin() + 0 才是第 1 个' },
        { text: '第 2 个', correct: false, explanation: '索引 2 是从 0 开始数的第 3 个' },
        { text: '第 3 个', correct: true, explanation: 'begin()+0=第1个，begin()+2=第3个' },
        { text: '第 4 个', correct: false, explanation: 'begin()+2 是第 3 个' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`v.push_back(5)` 之后，5 被放在了哪里？',
      options: [
        { text: 'vector 的开头', correct: false, explanation: 'push_back 添加在尾部' },
        { text: 'vector 的尾部', correct: true, explanation: 'push_back 在末尾添加' },
        { text: '中间位置', correct: false, explanation: 'push_back 只添加到尾部' },
        { text: '随机位置', correct: false, explanation: 'vector 是有序的，一定在尾部' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合练习：插入、删除、遍历：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 2, 3, 4};\n  v.pop_back();\n  v.insert(v.begin(), 0);\n  v.erase(v.begin() + 2);\n  for (int x : v) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'pop_back 删除 4',
        'insert 在最前面加 0',
        'erase 删除索引 2 的元素',
      ],
    },
    {
      type: 'exposition',
      text: '掌握了 `push_back`、`pop_back`、`insert`、`erase`，\n你已经可以灵活操作 vector 了。\n下一课我们来深入理解 vector 的"容量管理"。',
    },
  ],
}

export default lesson
