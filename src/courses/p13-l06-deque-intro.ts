import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'deque-intro',
    chapter: 14,
    title: 'deque 双端队列',
    subtitle: '头尾都快',
    description: '理解 deque 的特点和基本用法。',
    objectives: ['能声明 deque 并操作', '理解 deque 和 vector、list 的区别'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`deque`（读作 "deck"）是 **double-ended queue（双端队列）**。\n它既有 vector 的优点（支持 `[]`），\n又有 list 的优点（头尾插入都快）。',
    },
    {
      type: 'exposition',
      text: 'deque 的内存结构是**分段连续**的——\n由多个连续区块组成，对外表现成一个整体。\n所以它既能下标访问，头尾操作又很快。',
    },
    {
      type: 'concept-cards',
      instruction: 'deque 的核心特性：',
      cards: [
        { glyph: '📐', term: '支持 []', meaning: '可以像 array/vector 那样下标访问', example: 'd[2] = 10;' },
        { glyph: '⚡', term: '头尾 O(1)', meaning: 'push_front/pop_front 和 push_back/pop_back 都很快', example: 'd.push_front(0);' },
        { glyph: '🏋️', term: '中间插入慢', meaning: '中间插入仍然需要移动元素', example: '不如 list 快' },
      ],
    },
    {
      type: 'exposition',
      text: 'deque 的用法和 vector 非常像：\n`push_back`、`pop_back`、`size`、`[]` 都一样。\ndeque **额外支持** `push_front` 和 `pop_front`。',
      code: '#include <deque>\n\nstd::deque<int> d;\nd.push_back(10);\nd.push_front(0);\nd.push_back(20);\nstd::cout << d[0] << d[1] << d[2];  // 0 10 20',
    },
    {
      type: 'type-it',
      instruction: '声明 deque，在头尾添加元素并访问：',
      code: '#include <iostream>\n#include <deque>\n\nint main() {\n  std::deque<int> d;\n  d.push_back(2);\n  d.push_front(1);\n  d.push_back(3);\n  d.push_front(0);\n  for (int i = 0; i < d.size(); i++) {\n    std::cout << d[i] << " ";\n  }\n}',
      hints: [
        'push_front 头部添加，push_back 尾部添加',
        '可以用 [] 下标访问，和 vector 一样',
        'for 循环按下标遍历',
      ],
    },
    {
      type: 'type-it',
      instruction: 'pop_front 删除头部元素：',
      code: '#include <iostream>\n#include <deque>\n\nint main() {\n  std::deque<int> d = {1, 2, 3, 4};\n  d.pop_front();\n  d.pop_back();\n  for (int x : d) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'pop_front 删除第一个元素',
        'pop_back 删除最后一个元素',
        'deque 头尾删除都是 O(1)',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'deque 的 push_front 操作的时间复杂度是？',
      options: [
        { text: 'O(1)——常数时间', correct: true, explanation: 'deque 的设计让头部插入也是 O(1)' },
        { text: 'O(n)——线性时间', correct: false, explanation: 'vector 的头部插入是 O(n)，deque 是 O(1)' },
        { text: 'O(log n)', correct: false, explanation: '没有容器头部插入是 O(log n)' },
        { text: '不支持 push_front', correct: false, explanation: 'deque 支持 push_front' },
      ],
    },
    {
      type: 'exposition',
      text: 'deque 还有一个特有操作：`at(i)`——安全的 `[]`。\n`at(i)` 会检查下标是否越界，越界时抛异常。\n`d[i]` 不检查，越界是未定义行为。',
      code: 'std::deque<int> d = {1, 2, 3};\nstd::cout << d.at(1);  // 2\n// d.at(5) 会抛异常 out_of_range',
    },
    {
      type: 'multiple-choice',
      question: '回顾：list 遍历时不能用什么？',
      options: [
        { text: '范围 for 循环', correct: false, explanation: 'list 支持范围 for 循环' },
        { text: '下标 []', correct: true, explanation: 'list 不支持下标访问，必须用迭代器或范围 for' },
        { text: '迭代器', correct: false, explanation: 'list 支持迭代器遍历' },
        { text: 'auto', correct: false, explanation: 'auto 可以配合迭代器使用' },
      ],
    },
    {
      type: 'exposition',
      text: '**什么时候用 deque？**\n- 需要双端操作（头尾都要频繁插入/删除）\n- 还需要下标访问\n比如：任务队列、滑动窗口。',
    },
    {
      type: 'type-it',
      instruction: '用 at() 安全访问 deque 元素：',
      code: '#include <iostream>\n#include <deque>\n\nint main() {\n  std::deque<int> d = {10, 20, 30};\n  std::cout << d.at(0) << " ";\n  std::cout << d.at(2) << "\\n";\n  std::cout << "size: " << d.size() << "\\n";\n}',
      hints: [
        'at(0) 返回第一个元素',
        'at(2) 返回第三个元素',
        'at() 会检查下标范围',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察 deque 的头尾操作：',
      code: '#include <iostream>\n#include <deque>\nusing namespace std;\n\nint main() {\n  deque<int> d;\n  d.push_back(10);\n  d.push_front(5);\n  d.push_back(15);\n  d.push_front(0);\n  \n  cout << "元素: ";\n  for (int i = 0; i < d.size(); i++) {\n    cout << d[i] << " ";\n  }\n  cout << endl;\n  cout << "size: " << d.size() << endl;\n  cout << "first: " << d.front() << endl;\n  cout << "last: " << d.back() << endl;\n}',
      expectedOutput: '元素: 0 5 10 15 \nsize: 4\nfirst: 0\nlast: 15',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: 'deque 和 vector 的共同点是什么？',
      options: [
        { text: '都支持 push_front', correct: false, explanation: 'vector 不支持 push_front' },
        { text: '都支持下标 [] 访问', correct: true, explanation: 'deque 和 vector 都支持随机访问' },
        { text: '中间插入都是 O(1)', correct: false, explanation: '两者中间插入都是 O(n)' },
        { text: '内存都连续', correct: false, explanation: 'deque 是分段连续，vector 是完全连续' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 deque 实现头尾操作',
      template: '#include <iostream>\n#include <deque>\n\nint main() {\n  std::deque<int> d;\n  d.____(1);   // 尾部添加 1\n  d.____(0);   // 头部添加 0\n  d.____(2);   // 尾部添加 2\n  std::cout << ____;  // 输出第一个元素（应是 0）\n}',
      answers: ['push_back', 'push_front', 'push_back', 'd[0]'],
      hints: ['前三个空分别是添加函数', '第四个空输出头部元素'],
    },
    {
      type: 'multiple-choice',
      question: 'deque 的全称是什么？',
      options: [
        { text: 'double-ended queue', correct: true, explanation: 'deque 是 double-ended queue 的缩写，双端队列' },
        { text: 'dequeued element', correct: false, explanation: '没有这个术语' },
        { text: 'double-element queue', correct: false, explanation: '不是，是 double-ended' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用范围 for 遍历 deque：',
      code: '#include <iostream>\n#include <deque>\n\nint main() {\n  std::deque<int> d = {10, 20, 30, 40, 50};\n  for (int x : d) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        '范围 for 可以用于 deque',
        'deque 支持迭代器遍历',
        '输出: 10 20 30 40 50',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：list 的哪个特殊函数可以按值删除所有匹配元素？',
      options: [
        { text: 'erase', correct: false, explanation: 'erase 按位置删除，不是按值' },
        { text: 'remove', correct: true, explanation: 'list 的 remove 按值删除所有匹配元素' },
        { text: 'delete', correct: false, explanation: 'C++ 中没有容器的 delete 成员函数' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：初始化 deque 并访问元素',
      template: '#include <deque>\n\nint main() {\n  std::deque<int> d = {5, 10, 15};\n  d.____(20);  // 尾部添加\n  d.____(0);   // 头部添加\n  std::cout << d.____(1) << "\\n";  // 输出第二个元素\n}',
      answers: ['push_back', 'push_front', 'at'],
      hints: ['第一个空尾部添加', '第二个空头部添加', '第三个空安全访问'],
    },
    {
      type: 'type-it',
      instruction: 'deque 的 resize 操作：',
      code: '#include <iostream>\n#include <deque>\n\nint main() {\n  std::deque<int> d = {1, 2, 3};\n  d.resize(5, 100);\n  for (int x : d) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        'resize(5, 100) 调整为 5 个元素，新增的用 100 填充',
        '输出: 1 2 3 100 100',
        'resize 可以增大或缩小',
      ],
    },
    {
      type: 'exposition',
      text: '小结：vector、list、deque 是三种序列容器。\n下一课我们学**什么时候选哪个**——容器选择策略。',
    },
  ],
}

export default lesson
