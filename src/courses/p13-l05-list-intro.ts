import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'list-intro',
    chapter: 14,
    title: 'list 双向链表',
    subtitle: '插入删除快但不能[]',
    description: '理解 list 的特点和基本用法。',
    objectives: ['能声明 list 并添加元素', '理解 list 与 vector 的区别'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`list` 是 C++ 的**双向链表**。\n它的结构像一节节火车车厢连在一起——\n**每个元素知道自己前面和后面是谁**。',
    },
    {
      type: 'exposition',
      text: '和 vector 最大的区别：list 的每个元素不连续存储。\n这意味着：\n✅ 中间插入/删除**非常快**（不用移动其他元素）\n❌ 不能直接用 `[]` 访问（因为没有连续内存）',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: 'list 的核心特性：',
      cards: [
        { glyph: '🔗', term: '双向链表', meaning: '每个元素有前后指针', example: 'list<int> l;' },
        { glyph: '⚡', term: '插入删除快', meaning: '中间插入不涉及元素移动', example: 'O(1) vs vector 的 O(n)' },
        { glyph: '🚫', term: '不支持 []', meaning: '不能直接用下标访问', example: '用迭代器遍历' },
        { glyph: '➡️', term: 'push_front', meaning: '头部插入，list 独有优势', example: 'l.push_front(0);' },
      ],
    },
    {
      type: 'exposition',
      text: 'list 的基本操作和 vector 差不多：\n`push_back`、`pop_back`、`size` 都一样。\nlist **额外**支持 `push_front` 和 `pop_front`——\n头部操作和尾部一样快。',
      code: '#include <list>\n\nstd::list<int> l;\nl.push_back(1);\nl.push_front(0);\nl.push_back(2);\n// l = {0, 1, 2}',
    },
    {
      type: 'type-it',
      instruction: '声明 list，在头尾添加元素：',
      code: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<int> l;\n  l.push_back(20);\n  l.push_front(10);\n  l.push_back(30);\n  for (int x : l) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'push_front 在头部添加',
        'push_back 在尾部添加',
        '范围 for 循环可以遍历 list',
      ],
    },
    {
      type: 'exposition',
      text: '遍历 list 不能用 `[]`，需要用**范围 for 循环**或**迭代器**。\n范围 for：`for (int x : myList)`\n迭代器：`for (auto it = l.begin(); it != l.end(); ++it)`',
      code: 'for (auto it = l.begin(); it != l.end(); ++it) {\n  std::cout << *it << " ";\n}',
    },
    {
      type: 'type-it',
      instruction: '用迭代器遍历 list：',
      code: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<int> l = {10, 20, 30, 40};\n  for (auto it = l.begin(); it != l.end(); ++it) {\n    std::cout << *it << " ";\n  }\n}',
      hints: [
        'begin() 返回指向第一个元素的迭代器',
        'end() 返回最后一个元素后面的位置',
        '*it 获取迭代器指向的元素值',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'list 和 vector 相比，最大的优势是什么？',
      options: [
        { text: '可以用 [] 快速访问', correct: false, explanation: '这是 vector 的优势，list 不支持 []' },
        { text: '中间插入和删除很快', correct: true, explanation: 'list 是链表结构，中间插入 O(1)，vector 需要移动元素 O(n)' },
        { text: '内存更少', correct: false, explanation: 'list 需要额外存储前后指针，内存更多' },
        { text: '自动排序', correct: false, explanation: 'list 不会自动排序，set 才会' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用范围 for 循环遍历 list：',
      code: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<std::string> names = {"Alice", "Bob", "Charlie"};\n  for (std::string name : names) {\n    std::cout << name << " ";\n  }\n}',
      hints: [
        '范围 for 更简洁，不需要下标',
        'x : names 的意思是"遍历 names 里每个 x"',
        'list<string> 存的是字符串',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个操作是 list 支持但 vector 不直接支持的？',
      options: [
        { text: 'push_back', correct: false, explanation: 'vector 和 list 都支持 push_back' },
        { text: 'push_front', correct: true, explanation: 'list 有 push_front，vector 没有（头部插入太慢）' },
        { text: 'size()', correct: false, explanation: '两个容器都有 size()' },
        { text: 'begin()', correct: false, explanation: '两个容器都有 begin()' },
      ],
    },
    {
      type: 'exposition',
      text: 'list 还有 `insert` 和 `erase`，用法和 vector 类似。\n但 list 的 insert/erase **不会让迭代器失效**（除了被删的那个）。\n这一点比 vector 更安全。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：vector 的 capacity 和 size 的关系是什么？',
      options: [
        { text: 'size >= capacity', correct: false, explanation: 'capacity >= size，容量至少和大小一样' },
        { text: 'capacity >= size', correct: true, explanation: 'capacity 是分配的内存容量，size 是实际元素数，容量至少不小于大小' },
        { text: '它们始终相等', correct: false, explanation: 'size 可能小于 capacity（预留了空间）' },
        { text: '没有关系', correct: false, explanation: '它们有关：size 不能超过 capacity' },
      ],
    },
    {
      type: 'exposition',
      text: '什么时候用 list？\n- 经常在**中间插入/删除**元素\n- 不需要随机访问（不需要 `[]`）\n- 数据量较大且插入操作频繁\n否则，默认用 vector。',
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察 list 的插入和遍历：',
      code: '#include <iostream>\n#include <list>\nusing namespace std;\n\nint main() {\n  list<int> nums;\n  nums.push_back(3);\n  nums.push_front(1);\n  nums.push_back(5);\n  nums.push_front(0);\n  \n  cout << "size: " << nums.size() << endl;\n  for (int n : nums) {\n    cout << n << " ";\n  }\n}',
      expectedOutput: 'size: 4\n0 1 3 5',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'fill-in',
      prompt: '补全代码：在 list 头部和尾部添加元素',
      template: '#include <list>\n\nint main() {\n  std::list<int> l;\n  l.____(10);   // 头部添加\n  l.____(20);   // 尾部添加\n  l.____(30);   // 尾部添加\n}',
      answers: ['push_front', 'push_back', 'push_back'],
      hints: ['第一个空是头部添加', '后两个空是尾部添加'],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：遍历 list 输出所有元素',
      template: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<int> l = {1, 2, 3};\n  for (____ x : l) {\n    std::cout << ____;\n  }\n}',
      answers: ['int', 'x'],
      hints: ['第一个空是元素类型', '第二个空是要输出的变量'],
    },
    {
      type: 'multiple-choice',
      question: 'list 遍历时使用的是什么机制？',
      options: [
        { text: '下标 []', correct: false, explanation: 'list 不支持下标访问' },
        { text: '迭代器或范围 for', correct: true, explanation: 'list 必须通过迭代器或范围 for 遍历' },
        { text: 'at() 函数', correct: false, explanation: 'list 没有 at() 函数' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：vector 的 insert 操作在中间插入时的时间复杂度是？',
      options: [
        { text: 'O(1)', correct: false, explanation: 'vector 中间插入需要移动元素，是 O(n)' },
        { text: 'O(n)', correct: true, explanation: 'insert 在 vector 中间时，后面元素全部后移，O(n)' },
        { text: 'O(log n)', correct: false, explanation: '红黑树才是 O(log n)' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'list 的 remove 函数——按值删除元素：',
      code: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<int> l = {1, 2, 3, 2, 4, 2};\n  l.remove(2);\n  for (int x : l) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'remove(2) 删除所有值为 2 的元素',
        '不是 erase，remove 按值匹配',
        '输出: 1 3 4',
      ],
    },
    {
      type: 'exposition',
      text: 'list 还有一个特有的 `sort()` 成员函数：\n`l.sort()` —— 对 list 排序。\n注意：list 的 sort 是成员函数，\n而 vector 的 sort 是全局函数 `std::sort(v.begin(), v.end())`。',
    },
    {
      type: 'type-it',
      instruction: '对 list 排序：',
      code: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<int> l = {5, 2, 8, 1, 9};\n  l.sort();\n  for (int x : l) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'list 有自己的 sort() 成员函数',
        '默认升序排列',
        '输出: 1 2 5 8 9',
      ],
    },
    {
      type: 'exposition',
      text: '下一课我们学 `deque`——结合 vector 和 list 优点的双端队列。',
    },
  ],
}

export default lesson
