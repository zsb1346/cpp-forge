import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'stack-queue',
    chapter: 14,
    title: 'stack 和 queue',
    subtitle: '容器适配器',
    description: '理解 stack（后进先出）和 queue（先进先出）的原理和用法。',
    objectives: ['能用 stack 实现 LIFO', '能用 queue 实现 FIFO', '理解容器适配器的概念'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`stack` 和 `queue` 不是全新的容器——它们是**容器适配器**。\n意思是在已有容器（如 deque）外面包一层，\n只暴露特定的接口。',
    },
    {
      type: 'exposition',
      text: '**stack（栈）**——后进先出（LIFO）。\n就像一摞盘子：**你最后放的盘子，最先拿起来**。\n核心操作：`push`（放入）、`pop`（取出）、`top`（看最上面）。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**queue（队列）**——先进先出（FIFO）。\n就像排队：**先排的人先被服务**。\n核心操作：`push`（入队）、`pop`（出队）、`front`（看队首）、`back`（看队尾）。',
    },
    {
      type: 'concept-cards',
      instruction: 'stack 和 queue 速览：',
      cards: [
        { glyph: '📚', term: 'stack', meaning: '后进先出，一摞书', example: 's.push(1); s.top(); s.pop();' },
        { glyph: '🚶', term: 'queue', meaning: '先进先出，排队', example: 'q.push(1); q.front(); q.pop();' },
        { glyph: '🛠️', term: '容器适配器', meaning: '在底层容器上封装特定接口', example: 'stack 底层默认是 deque' },
      ],
    },
    {
      type: 'type-it',
      instruction: '使用 stack——后进先出的例子：',
      code: '#include <iostream>\n#include <stack>\n\nint main() {\n  std::stack<int> s;\n  s.push(1);\n  s.push(2);\n  s.push(3);\n  std::cout << s.top() << "\\n";\n  s.pop();\n  std::cout << s.top() << "\\n";\n  s.pop();\n  std::cout << s.top() << "\\n";\n}',
      hints: [
        'push 把元素放在栈顶',
        'top() 返回栈顶但不删除',
        'pop() 删除栈顶但不返回',
      ],
    },
    {
      type: 'type-it',
      instruction: '使用 queue——先进先出的例子：',
      code: '#include <iostream>\n#include <queue>\n\nint main() {\n  std::queue<int> q;\n  q.push(10);\n  q.push(20);\n  q.push(30);\n  while (!q.empty()) {\n    std::cout << q.front() << " ";\n    q.pop();\n  }\n}',
      hints: [
        'push 在队尾添加元素',
        'front() 返回队首元素',
        'empty() 检查队列是否为空',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'stack 的 pop() 操作做了什么？',
      options: [
        { text: '返回栈顶元素并删除', correct: false, explanation: 'pop 删除但不返回，top 返回但不删除' },
        { text: '删除栈顶元素，不返回', correct: true, explanation: 'pop 删除栈顶，top 才能看到栈顶' },
        { text: '向栈里添加一个元素', correct: false, explanation: '这是 push 做的事' },
        { text: '清空整个栈', correct: false, explanation: 'pop 只删除一个，clear 或循环才能清空' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'stack 和 queue 的成员函数对照：',
      cards: [
        { glyph: '📥', term: 'push(x)', meaning: '添加元素，stack/queue 都有', example: 's.push(5);' },
        { glyph: '📤', term: 'pop()', meaning: '删除元素，stack/queue 都有', example: 's.pop();' },
        { glyph: '👁️', term: 'top()', meaning: '只看栈顶（仅 stack）', example: 's.top();' },
        { glyph: '👀', term: 'front()/back()', meaning: '看队首/队尾（仅 queue）', example: 'q.front(); q.back();' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'stack 的 top 和 pop 配合使用：',
      code: '#include <iostream>\n#include <stack>\n\nint main() {\n  std::stack<int> s;\n  s.push(5);\n  s.push(10);\n  s.push(15);\n  while (!s.empty()) {\n    std::cout << s.top() << " ";\n    s.pop();\n  }\n}',
      hints: [
        'top() + pop() 配合遍历 stack',
        'empty() 检查是否还有元素',
        '输出顺序是 15 10 5（后进先出）',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'stack 默认使用哪种容器作为底层实现？',
      options: [
        { text: 'vector', correct: false, explanation: 'stack 默认用 deque，不是 vector' },
        { text: 'deque', correct: true, explanation: 'stack 默认底层是 deque，也可以指定 vector 或 list' },
        { text: 'list', correct: false, explanation: 'list 可以作为底层但不是默认' },
        { text: 'array', correct: false, explanation: 'array 大小固定不适合做 stack 底层' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 stack 实现一个简单的"撤销模拟"：',
      code: '#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint main() {\n  stack<string> history;\n  history.push("输入 A");\n  history.push("输入 B");\n  history.push("输入 C");\n  \n  cout << "撤销: " << history.top() << endl;\n  history.pop();\n  cout << "现在最上面: " << history.top() << endl;\n}',
      expectedOutput: '撤销: 输入 C\n现在最上面: 输入 B',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '用 queue 模拟打印机任务队列：',
      code: '#include <iostream>\n#include <queue>\n#include <string>\nusing namespace std;\n\nint main() {\n  queue<string> printQueue;\n  printQueue.push("文档1.pdf");\n  printQueue.push("照片.jpg");\n  printQueue.push("报告.docx");\n  \n  while (!printQueue.empty()) {\n    cout << "打印: " << printQueue.front() << endl;\n    printQueue.pop();\n  }\n}',
      expectedOutput: '打印: 文档1.pdf\n打印: 照片.jpg\n打印: 报告.docx',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾：deque 的哪个特性让它成为 stack 和 queue 的默认底层容器？',
      options: [
        { text: '支持下标访问', correct: false, explanation: 'stack/queue 不需要下标访问' },
        { text: '头尾操作都是 O(1)', correct: true, explanation: 'stack 需要尾部和顶部 O(1)，queue 需要头部和尾部 O(1)，deque 都满足' },
        { text: '内存连续', correct: false, explanation: 'deque 分段连续，但这不是成为默认的关键' },
        { text: '自动排序', correct: false, explanation: 'deque 不会自动排序' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：stack 和 queue 的基本用法',
      template: '#include <____>\n#include <____>\n\nint main() {\n  std::stack<int> s;\n  s.____(1);\n  s.____(2);\n  \n  std::queue<int> q;\n  q.____(1);\n  q.____(2);\n}',
      answers: ['stack', 'queue', 'push', 'push', 'push', 'push'],
      hints: ['前两空是头文件', '后四空都是添加元素的函数'],
    },
    {
      type: 'multiple-choice',
      question: 'queue 的 front() 和 back() 分别是什么？',
      options: [
        { text: 'front 是队尾，back 是队首', correct: false, explanation: 'front 是队首（最早进来的），back 是队尾（最新进来的）' },
        { text: 'front 是队首，back 是队尾', correct: true, explanation: 'front 是下一个要出去的，back 是刚进来的' },
        { text: 'front 和 back 一样', correct: false, explanation: '队首和队尾在超过一个元素时不一样' },
      ],
    },
    {
      type: 'type-it',
      instruction: '改变 stack 的底层容器为 vector：',
      code: '#include <iostream>\n#include <stack>\n#include <vector>\n\nint main() {\n  std::stack<int, std::vector<int>> s;\n  s.push(10);\n  s.push(20);\n  s.push(30);\n  std::cout << s.top() << " " << s.size() << "\\n";\n}',
      hints: [
        'stack<int, vector<int>> 用 vector 做底层',
        '接口不变，还是 push/top/pop',
        '底层换成 vector 可能更省内存',
      ],
    },
    {
      type: 'type-it',
      instruction: 'queue 的 emplace 用法——直接构造元素：',
      code: '#include <iostream>\n#include <queue>\n#include <string>\n\nint main() {\n  std::queue<std::string> q;\n  q.emplace("直接构造");\n  q.push("普通添加");\n  std::cout << q.front() << " " << q.back() << "\\n";\n}',
      hints: [
        'emplace 直接在容器内构造元素',
        '比 push 少一次拷贝',
        'front 是第一个添加的',
      ],
    },
    {
      type: 'exposition',
      text: 'stack 和 queue 在底层用 deque 实现，但你只能通过受限的接口操作它们。\n这叫**容器适配器**——限制功能换安全。\n下一课学另一个适配器：`priority_queue`。',
    },
  ],
}

export default lesson
