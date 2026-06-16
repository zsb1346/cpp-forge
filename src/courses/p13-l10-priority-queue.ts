import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'priority-queue',
    chapter: 14,
    title: 'priority_queue',
    subtitle: '最大元素在最前',
    description: '学会用 priority_queue 处理优先级问题。',
    objectives: ['能用 priority_queue 实现优先队列', '理解最大元素自动到队首的原理'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`priority_queue`（优先队列）是另一种**容器适配器**。\n它和 queue 的区别是：**优先级最高的元素总是在最前面**。\n默认是最大元素在最前面。',
    },
    {
      type: 'exposition',
      text: '**核心规则**：每次 `top()` 取出的永远是当前最大元素。\n就像"VIP 通道"——谁优先级高谁先走。\n底层实现是**堆（heap）**，插入和删除都是 O(log n)。',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: 'priority_queue 的核心操作：',
      cards: [
        { glyph: '📥', term: 'push(x)', meaning: '插入元素，自动调整位置', example: 'pq.push(5);' },
        { glyph: '👁️', term: 'top()', meaning: '返回最大元素（不删除）', example: 'cout << pq.top();' },
        { glyph: '📤', term: 'pop()', meaning: '删除最大元素', example: 'pq.pop();' },
        { glyph: '📏', term: 'size()/empty()', meaning: '大小和判空，和其他容器一样', example: 'while (!pq.empty())' },
      ],
    },
    {
      type: 'type-it',
      instruction: '声明 priority_queue 并添加元素，观察 top：',
      code: '#include <iostream>\n#include <queue>\n\nint main() {\n  std::priority_queue<int> pq;\n  pq.push(30);\n  pq.push(10);\n  pq.push(50);\n  pq.push(20);\n  std::cout << pq.top() << "\\n";\n  pq.pop();\n  std::cout << pq.top() << "\\n";\n}',
      hints: [
        'priority_queue 也在 <queue> 头文件中',
        '即使插入顺序不同，top 总是最大元素',
        'push 30,10,50,20 后 top 是 50',
      ],
    },
    {
      type: 'exposition',
      text: '默认的 priority_queue 是"最大堆"——最大的在最上面。\n要改成"最小堆"，需要指定比较方式：\n`priority_queue<int, vector<int>, greater<int>> pq;`\n这样最小的元素在最前面。',
      code: '#include <queue>\n#include <vector>\n#include <functional>\n\nstd::priority_queue<int, std::vector<int>, std::greater<int>> minPq;\nminPq.push(30);\nminPq.push(10);\nminPq.push(50);\nstd::cout << minPq.top();  // 10',
    },
    {
      type: 'type-it',
      instruction: '使用最小堆 priority_queue：',
      code: '#include <iostream>\n#include <queue>\n#include <vector>\n#include <functional>\n\nint main() {\n  std::priority_queue<int, std::vector<int>, std::greater<int>> pq;\n  pq.push(30);\n  pq.push(10);\n  pq.push(50);\n  pq.push(20);\n  std::cout << pq.top() << "\\n";\n  pq.pop();\n  std::cout << pq.top() << "\\n";\n}',
      hints: [
        'greater<int> 使最小的元素在顶部',
        '尖括号里三个参数：类型、容器、比较器',
        'top 现在返回最小元素',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'priority_queue 中 top() 返回的默认是？',
      options: [
        { text: '最先插入的元素', correct: false, explanation: 'priority_queue 不按插入顺序，按优先级' },
        { text: '最大的元素', correct: true, explanation: '默认是最大堆，top() 返回最大元素' },
        { text: '最小的元素', correct: false, explanation: '最小元素需要指定 greater 比较器' },
        { text: '最后插入的元素', correct: false, explanation: '这是 stack，不是 priority_queue' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 priority_queue 模拟"紧急任务优先"调度：',
      code: '#include <iostream>\n#include <queue>\n#include <string>\nusing namespace std;\n\nint main() {\n  priority_queue<int> tasks;\n  tasks.push(3);  // 普通任务\n  tasks.push(5);  // 紧急任务\n  tasks.push(1);  // 低优先级\n  tasks.push(4);  // 较紧急\n  \n  while (!tasks.empty()) {\n    cout << "处理优先级: " << tasks.top() << endl;\n    tasks.pop();\n  }\n}',
      expectedOutput: '处理优先级: 5\n处理优先级: 4\n处理优先级: 3\n处理优先级: 1',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '用最小堆实现"先处理最小的数字"：',
      code: '#include <iostream>\n#include <queue>\n#include <vector>\n#include <functional>\nusing namespace std;\n\nint main() {\n  priority_queue<int, vector<int>, greater<int>> pq;\n  pq.push(8);\n  pq.push(3);\n  pq.push(5);\n  pq.push(1);\n  \n  while (!pq.empty()) {\n    cout << pq.top() << " ";\n    pq.pop();\n  }\n}',
      expectedOutput: '1 3 5 8',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：普通 queue 和 priority_queue 最核心的区别是什么？',
      options: [
        { text: 'queue 不能 pop', correct: false, explanation: 'queue 可以 pop' },
        { text: 'priority_queue 按优先级出队而不是按插入顺序', correct: true, explanation: 'queue 是 FIFO，priority_queue 按优先级排序' },
        { text: 'priority_queue 不能 push', correct: false, explanation: 'priority_queue 可以 push' },
        { text: 'queue 必须指定底层容器', correct: false, explanation: 'queue 默认 deque，不需要指定' },
      ],
    },
    {
      type: 'type-it',
      instruction: '比较最大堆和最小堆的输出：',
      code: '#include <iostream>\n#include <queue>\n#include <vector>\n#include <functional>\n\nint main() {\n  std::priority_queue<int> maxPq;\n  std::priority_queue<int, std::vector<int>, std::greater<int>> minPq;\n  \n  maxPq.push(7); maxPq.push(3); maxPq.push(9);\n  minPq.push(7); minPq.push(3); minPq.push(9);\n  \n  std::cout << maxPq.top() << " " << minPq.top() << "\\n";\n}',
      hints: [
        'maxPq 默认最大堆，top 是 9',
        'minPq 是最小堆，top 是 3',
        '同一个插入顺序，输出不同',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：声明最小堆 priority_queue',
      template: '#include <____>\n#include <____>\n#include <____>\n\nint main() {\n  std::priority_queue<int, std::vector<int>, std::____<int>> pq;\n}',
      answers: ['queue', 'vector', 'functional', 'greater'],
      hints: ['前三空是头文件', '第四空是比较器名称'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：stack 用哪个函数访问栈顶元素？',
      options: [
        { text: 'front()', correct: false, explanation: 'front 是 queue 的，不是 stack 的' },
        { text: 'top()', correct: true, explanation: 'stack 用 top() 访问栈顶元素' },
        { text: 'back()', correct: false, explanation: 'back 是 queue 的，不是 stack 的' },
        { text: 'peek()', correct: false, explanation: 'C++ 的 stack 没有 peek，用 top' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'priority_queue 的 emplace 用法——高效构造：',
      code: '#include <iostream>\n#include <queue>\n#include <string>\n\nstruct Task {\n  std::string name;\n  int priority;\n  Task(std::string n, int p) : name(n), priority(p) {}\n  bool operator<(const Task& o) const { return priority < o.priority; }\n};\n\nint main() {\n  std::priority_queue<Task> pq;\n  pq.emplace("紧急", 10);\n  pq.emplace("普通", 5);\n  pq.emplace("非常紧急", 20);\n  std::cout << pq.top().name << "\\n";\n}',
      hints: [
        'emplace 直接在容器中构造对象',
        '需要定义 operator< 比较优先级',
        'top 返回 priority 最高的',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'priority_queue 可以用哪种容器做底层？',
      options: [
        { text: '任何容器都可以', correct: false, explanation: '需要支持随机访问迭代器的容器' },
        { text: 'vector 或 deque', correct: true, explanation: 'priority_queue 默认 deque，也可以用 vector' },
        { text: '只有 list', correct: false, explanation: 'list 不支持随机访问迭代器' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：stack 的底层默认容器是什么？',
      options: [
        { text: 'vector', correct: false, explanation: 'stack 默认底层是 deque' },
        { text: 'deque', correct: true, explanation: 'stack 和 queue 默认底层都是 deque' },
        { text: 'list', correct: false, explanation: 'list 不是默认底层' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：priority_queue 的常见操作',
      template: '#include <queue>\n\nint main() {\n  std::priority_queue<int> pq;\n  pq.____(50);\n  pq.____(20);\n  pq.____(40);\n  int top = pq.____();  // 50\n  pq.____();  // 删除 50\n}',
      answers: ['push', 'push', 'push', 'top', 'pop'],
      hints: ['前三空插入元素', '第四空查看最大元素', '第五空删除最大元素'],
    },
    {
      type: 'exposition',
      text: 'priority_queue 适合"每次都要处理最紧急的"场景——\n任务调度、Dijkstra 算法、数据流中找最大/最小的 K 个。\n下一课我们学 `set`——不重复的有序集合。',
    },
  ],
}

export default lesson
