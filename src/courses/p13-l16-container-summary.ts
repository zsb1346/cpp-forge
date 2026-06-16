import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'container-summary',
    chapter: 14,
    title: '容器全家福',
    subtitle: '所有容器一览',
    description: '总结所有已学的 STL 容器及其适用场景。',
    objectives: ['能说出每种容器的核心特点', '能根据场景正确选择容器'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '到此为止，我们已经学了 **8 种 STL 容器**。\n从序列容器到关联容器，从有序到无序。\n该做一个**全家福**总结了。',
    },
    {
      type: 'exposition',
      text: '**序列容器**（按顺序存数据）：\n- `vector`：动态数组，尾部快，默认首选\n- `list`：双向链表，中间插入快\n- `deque`：双端队列，头尾都快',
    },
    {
      type: 'exposition',
      text: '**容器适配器**（封装了底层容器）：\n- `stack`：后进先出（LIFO）\n- `queue`：先进先出（FIFO）\n- `priority_queue`：按优先级出队',
    },
    {
      type: 'exposition',
      text: '**关联容器**（按键访问）：\n- `set`：不重复有序集合，红黑树\n- `map`：键值对字典，红黑树\n- `unordered_set`：不重复无序集合，哈希表\n- `unordered_map`：无序字典，哈希表',
    },
    {
      type: 'concept-cards',
      instruction: '容器选择速查（按场景）：',
      cards: [
        { glyph: '📐', term: '尾部操作+下标', meaning: '选 vector', example: '默认首选' },
        { glyph: '🔗', term: '中间插入频繁', meaning: '选 list', example: '不支持 []' },
        { glyph: '📋', term: '头尾都要操作', meaning: '选 deque', example: '支持 []' },
        { glyph: '🌳', term: '需要排序/唯一', meaning: '选 set/map', example: 'O(log n)' },
        { glyph: '⚡', term: '只要速度', meaning: '选 unordered', example: '平均 O(1)' },
        { glyph: '📚', term: 'LIFO/FIFO', meaning: '选 stack/queue', example: '适配器' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '你要存一个"最近浏览的网页"列表，新浏览的加在最前面，超出 10 条删最早的。选哪个？',
      options: [
        { text: 'vector', correct: false, explanation: '头部插入太慢' },
        { text: 'deque', correct: true, explanation: 'push_front 加新记录，pop_back 删旧的，deque 最合适' },
        { text: 'set', correct: false, explanation: '网页浏览顺序不是自动排序的，set 不合适' },
        { text: 'stack', correct: false, explanation: 'stack 只从一端操作' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '你要实现一个"身份证号查人员信息"的系统，要求最快查找速度。选哪个？',
      options: [
        { text: 'map<string, Person>', correct: false, explanation: 'map 是 O(log n)，unordered_map 更快 O(1)' },
        { text: 'unordered_map<string, Person>', correct: true, explanation: '哈希表 O(1) 查找最适合快速按键查询' },
        { text: 'vector<Person>', correct: false, explanation: '线性查找 O(n)，最慢' },
        { text: 'set<string>', correct: false, explanation: 'set 只能存键不能存值，需要 map' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '你要实现"操作撤销"功能——用户每次操作压入栈，撤销时弹出最后一步。选哪个？',
      options: [
        { text: 'queue', correct: false, explanation: 'queue 是先进先出，不符合"最后一步先撤销"' },
        { text: 'stack', correct: true, explanation: 'stack 后进先出，最适合撤销功能' },
        { text: 'vector', correct: false, explanation: 'vector 可以用但 stack 封装得更好，只暴露需要的操作' },
        { text: 'set', correct: false, explanation: 'set 自动排序，无法保留操作顺序' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '你需要按字母顺序打印所有不重复的标签（可能包含重复输入）。选哪个？',
      options: [
        { text: 'unordered_set<string>', correct: false, explanation: '不排序，无法按字母顺序输出' },
        { text: 'set<string>', correct: true, explanation: '自动去重+按字典序排序，最适合' },
        { text: 'list<string>', correct: false, explanation: '需要手动去重和排序' },
        { text: 'vector<string>', correct: false, explanation: '需要手动去重和排序' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：list 和 vector 最主要的性能差异在哪里？',
      options: [
        { text: 'list 所有操作都比 vector 快', correct: false, explanation: 'list 下标访问不支持，遍历速度也慢于 vector' },
        { text: 'list 中间插入删除快，vector 尾部操作和访问快', correct: true, explanation: 'list 中间插入 O(1)，vector 中间插入 O(n)；vector 下标 O(1)，list 不支持' },
        { text: 'vector 完全没有优势', correct: false, explanation: 'vector 在尾部操作和随机访问方面远胜 list' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合练习：用 vector+set 去重并排序：',
      code: '#include <iostream>\n#include <vector>\n#include <set>\n\nint main() {\n  std::vector<int> raw = {5, 2, 8, 2, 5, 1, 9};\n  std::set<int> s(raw.begin(), raw.end());\n  std::vector<int> result(s.begin(), s.end());\n  for (int x : result) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        '用 vector 初始化 set 自动去重排序',
        '再把 set 转回 vector',
        '输出: 1 2 5 8 9',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：priority_queue 的使用场景是什么？',
      options: [
        { text: '后进先出', correct: false, explanation: '这是 stack' },
        { text: '先进先出', correct: false, explanation: '这是 queue' },
        { text: '每次取优先级最高的元素', correct: true, explanation: 'priority_queue 确保优先级最高的元素总是在队首' },
        { text: '自动去重', correct: false, explanation: '这是 set/unordered_set' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '如果你需要按键名查找值，且键名是字符串，应该选？',
      options: [
        { text: 'vector<string>', correct: false, explanation: 'vector 不能用键查找，只能按下标' },
        { text: 'map<string, int> 或 unordered_map<string, int>', correct: true, explanation: 'map/unordered_map 支持按键名查找值' },
        { text: 'set<string>', correct: false, explanation: 'set 只有键没有值' },
      ],
    },
    {
      type: 'type-it',
      instruction: '全体容器大集合——每种容器声明方式：',
      code: '#include <vector>\n#include <list>\n#include <deque>\n#include <set>\n#include <map>\n#include <unordered_set>\n#include <unordered_map>\n#include <stack>\n#include <queue>\n\nint main() {\n  std::vector<int> v;\n  std::list<int> l;\n  std::deque<int> d;\n  std::set<int> s;\n  std::map<int,int> m;\n  std::unordered_set<int> us;\n  std::unordered_map<int,int> um;\n  std::stack<int> st;\n  std::queue<int> q;\n  std::priority_queue<int> pq;\n}',
      hints: [
        '每种容器有不同的头文件',
        'vector/list/deque 是序列容器',
        'set/map/unordered 是关联容器',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'STL 的核心设计思想是什么？',
      options: [
        { text: '所有代码自己写', correct: false, explanation: 'STL 恰恰是为了不自己写重复代码' },
        { text: '泛型编程——算法和容器分离，通过迭代器连接', correct: true, explanation: 'STL 的核心设计：容器存数据，算法处理数据，迭代器连接两者' },
        { text: '面向对象编程', correct: false, explanation: 'STL 是泛型编程，不是 OOP' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：按场景选择正确的容器',
      template: '#include <____>  // 需要 FIFO 队列\n\nint main() {\n  std::____<int> q;\n  q.push(1);\n  q.push(2);\n  // front 是 1\n}',
      answers: ['queue', 'queue'],
      hints: ['第一空是头文件', '第二空是先进先出容器'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：你已经学了几个 STL 容器？',
      options: [
        { text: '3 个', correct: false, explanation: '学了 vector、list、deque、stack、queue、priority_queue、set、map、unordered_set、unordered_map 共 10 个' },
        { text: '8-10 个', correct: true, explanation: '10 个容器：3 序列 + 3 适配器 + 4 关联' },
        { text: '15 个', correct: false, explanation: '基本常用容器是 10 个左右' },
      ],
    },
    {
      type: 'exposition',
      text: 'STL 容器是 C++ 最强大的特性之一。\n你已经掌握了所有常用容器和选择策略。\n最后一节是**阶段综合复习**，检验你的掌握程度。',
    },
  ],
}

export default lesson
