import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'container-choose',
    chapter: 14,
    title: '容器选择策略',
    subtitle: '什么时候用什么',
    description: '学会按场景选择合适的序列容器。',
    objectives: ['能根据场景选择 vector/list/deque', '理解各种容器的权衡'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你已经学了三种序列容器：\n- **vector**：尾部快，中间慢，支持 `[]`\n- **list**：中间快，不支持 `[]`\n- **deque**：头尾快，中间慢，支持 `[]`\n怎么选？',
    },
    {
      type: 'exposition',
      text: '**黄金法则**：\n**默认用 vector**。\nvector 在大多数场景下性能最好。\n只有在特定需求时才换 list 或 deque。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '三容器的决策速查：',
      cards: [
        { glyph: '📐', term: 'vector', meaning: '默认首选，尾部操作快，支持 []', example: '只要不频繁中间插入' },
        { glyph: '🔗', term: 'list', meaning: '中间插入/删除频繁时用', example: '不支持 []，用迭代器' },
        { glyph: '📋', term: 'deque', meaning: '头尾都要频繁操作时用', example: '支持 []，滑动窗口' },
      ],
    },
    {
      type: 'exposition',
      text: '**选容器的决策树**：\n1. 需要下标访问？→ vector 或 deque\n2. 经常中间插入删除？→ list\n3. 头尾操作频繁？→ deque\n4. 都不特别？→ vector（默认）',
    },
    {
      type: 'multiple-choice',
      question: '你要存一组学生成绩，只需要尾部添加和按下标访问。选哪个？',
      options: [
        { text: 'vector', correct: true, explanation: '尾部添加+下标访问，vector 最合适' },
        { text: 'list', correct: false, explanation: 'list 不支持 []，不适合' },
        { text: 'deque', correct: false, explanation: 'deque 也能用但没必要，vector 更轻量' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '你要实现一个"最近打开的文件"列表，需要在头部插入新文件，尾部删除旧文件。选哪个？',
      options: [
        { text: 'vector', correct: false, explanation: 'vector 头部插入太慢 O(n)' },
        { text: 'list', correct: false, explanation: 'list 可以但不需要中间操作，deque 更合适' },
        { text: 'deque', correct: true, explanation: 'deque 头尾操作都是 O(1)，最适合' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '你要实现一个文本编辑器，用户会在文档中间频繁插入和删除文字。选哪个？',
      options: [
        { text: 'vector', correct: false, explanation: '中间插入 vector 很慢 O(n)' },
        { text: 'list', correct: true, explanation: 'list 中间插入删除 O(1)，最适合' },
        { text: 'deque', correct: false, explanation: 'deque 中间插入也慢 O(n)' },
      ],
    },
    {
      type: 'exposition',
      text: '**性能对比**（大数据量时）：\n\n| 操作 | vector | list | deque |\n|------|--------|------|-------|\n| 尾部插入 | O(1)* | O(1) | O(1) |\n| 头部插入 | O(n) | O(1) | O(1) |\n| 中间插入 | O(n) | O(1) | O(n) |\n| 下标访问 | O(1) | ❌ | O(1) |\n\n*vector 尾部插入均摊 O(1)',
    },
    {
      type: 'type-it',
      instruction: '写一个程序，选择 vector 存数据：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> scores;\n  scores.push_back(85);\n  scores.push_back(92);\n  scores.push_back(78);\n  for (int i = 0; i < scores.size(); i++) {\n    std::cout << scores[i] << " ";\n  }\n}',
      hints: [
        'vector 适合尾部添加+下标访问',
        'push_back 添加元素',
        'scores[i] 按下标读取',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：list 用什么方式遍历元素？',
      options: [
        { text: '用下标 []', correct: false, explanation: 'list 不支持下标访问' },
        { text: '用迭代器或范围 for', correct: true, explanation: 'list 必须用迭代器或范围 for 遍历' },
        { text: '只能用 while 循环', correct: false, explanation: 'while 不是唯一方式，范围 for 更简洁' },
        { text: '不能用循环', correct: false, explanation: '任何容器都可以循环遍历' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 list 实现中间频繁插入的场景：',
      code: '#include <iostream>\n#include <list>\n\nint main() {\n  std::list<int> l = {1, 3, 5};\n  auto it = l.begin();\n  ++it;\n  l.insert(it, 2);\n  ++it;\n  l.insert(it, 4);\n  for (int x : l) {\n    std::cout << x << " ";\n  }\n}',
      hints: [
        '迭代器 it 指向特定位置',
        'insert 在 it 之前插入',
        '中间插入 list 比 vector 快得多',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 deque 实现双端队列：',
      code: '#include <iostream>\n#include <deque>\n\nint main() {\n  std::deque<int> d;\n  d.push_back(1);\n  d.push_front(0);\n  d.push_back(2);\n  d.push_front(-1);\n  std::cout << d[0] << d[1] << d[2] << d[3] << "\\n";\n}',
      hints: [
        'push_front 头部插入',
        'push_back 尾部插入',
        'deque 支持下标访问',
      ],
    },
    {
      type: 'multiple-choice',
      question: '如果你不确定选哪种容器，最好的默认选择是？',
      options: [
        { text: 'list', correct: false, explanation: 'list 的额外内存开销和不支持下标的局限很大' },
        { text: 'vector', correct: true, explanation: 'vector 在绝大多数场景下性能优秀，是默认首选' },
        { text: 'deque', correct: false, explanation: 'deque 适合特殊场景，不是通用默认选择' },
        { text: '不用容器，用普通数组', correct: false, explanation: '普通数组大小固定，vector 是更好的默认选择' },
      ],
    },
    {
      type: 'exposition',
      text: '除了功能，还要考虑**内存开销**：\n- vector：连续内存，开销最小\n- deque：分段连续，内存略多\n- list：每个元素多两个指针（前后指针），内存最多\n数据量大时差距明显。',
    },
    {
      type: 'type-it',
      instruction: '用 vector 做默认选择——存储 id：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> ids;\n  for (int i = 0; i < 10; i++) {\n    ids.push_back(i * 10);\n  }\n  for (int id : ids) {\n    std::cout << id << " ";\n  }\n}',
      hints: [
        'vector 是默认推荐的选择',
        '尾部添加效率高',
        '范围 for 遍历',
      ],
    },
    {
      type: 'type-it',
      instruction: '情景：游戏道具背包，需要频繁在中间添加/移除道具——用 list：',
      code: '#include <iostream>\n#include <list>\n#include <string>\n\nint main() {\n  std::list<std::string> inventory = {"sword", "shield", "potion"};\n  auto it = inventory.begin();\n  ++it;\n  inventory.insert(it, "bow");\n  inventory.remove("shield");\n  for (std::string item : inventory) {\n    std::cout << item << " ";\n  }\n}',
      hints: [
        'list 中间插入 O(1)',
        'insert 在迭代器之前插入',
        'remove 按值删除',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：deque 不支持哪个快速操作？',
      options: [
        { text: 'push_front', correct: false, explanation: 'deque 支持快速头部插入' },
        { text: '中间插入', correct: true, explanation: 'deque 中间插入是 O(n)，和 vector 一样慢' },
        { text: 'pop_back', correct: false, explanation: 'deque 支持快速尾部删除' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：根据场景选择容器',
      template: '#include <____>\n\nint main() {\n  // 需要频繁头部和尾部操作\n  std::____<int> container;\n  container.push_front(1);\n  container.push_back(2);\n}',
      answers: ['deque', 'deque'],
      hints: ['第一空是头文件', '第二空是容器名（支持 push_front 和 push_back）'],
    },
    {
      type: 'exposition',
      text: '**总结**：\n- 默认 vector\n- 中间插入多 → list\n- 头尾操作多 → deque\n- 不确定 → vector\n下一节是序列容器综合练习。',
    },
  ],
}

export default lesson
