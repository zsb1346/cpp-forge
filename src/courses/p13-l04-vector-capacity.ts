import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'vector-capacity',
    chapter: 14,
    title: 'vector 容量管理',
    subtitle: 'size vs capacity',
    description: '理解 vector 的自动扩容机制。',
    objectives: ['能区分 size 和 capacity', '理解 vector 自动扩容过程'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`size()` 是 vector 里**实际有多少个元素**。\n`capacity()` 是 vector **当前分配了多少内存**（能存多少个）。\n这两个不一样！',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '想象你一学期选课：\n选课系统给你一个 10 个格子的课表（capacity = 10）\n你实际只选了 3 门课（size = 3）\n——容量 10，实际 3。',
    },
    {
      type: 'exposition',
      text: '当 `size` 达到 `capacity` 时，vector 会自动**扩容**：\n1. 申请一块更大的新内存（通常是 2 倍）\n2. 把旧元素全部复制过去\n3. 释放旧内存\n这就是 vector 能自动增长的原因。',
    },
    {
      type: 'concept-cards',
      instruction: '理解 size 和 capacity：',
      cards: [
        { glyph: '📏', term: 'v.size()', meaning: '实际元素个数', example: 'v.size() == 3' },
        { glyph: '🏋️', term: 'v.capacity()', meaning: '已分配内存能容纳的数量', example: 'v.capacity() >= v.size()' },
        { glyph: '📊', term: 'v.reserve(n)', meaning: '提前分配 n 个元素的内存', example: 'v.reserve(100);' },
      ],
    },
    {
      type: 'type-it',
      instruction: '观察 size 和 capacity 的区别：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v;\n  std::cout << "size: " << v.size() << "\\n";\n  std::cout << "capacity: " << v.capacity() << "\\n";\n  v.push_back(1);\n  v.push_back(2);\n  v.push_back(3);\n  std::cout << "size: " << v.size() << "\\n";\n  std::cout << "capacity: " << v.capacity() << "\\n";\n}',
      hints: [
        '空 vector 的 size 为 0',
        'capacity 可能为 0 或某个初始值',
        '添加元素后 size 增加，capacity 可能不变或变大',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'vector 在什么时候会自动扩容？',
      options: [
        { text: '每次 push_back 时', correct: false, explanation: '只有当 size == capacity 时才会扩容' },
        { text: '当 size 等于 capacity 时', correct: true, explanation: '存满了才会申请更大的内存' },
        { text: '声明 vector 时', correct: false, explanation: '声明时可能只分配初始容量' },
        { text: '调用 pop_back 时', correct: false, explanation: 'pop_back 是删除元素，不会扩容' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，观察扩容过程（注意容量变化）：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v;\n  int lastCap = 0;\n  for (int i = 0; i < 10; i++) {\n    v.push_back(i);\n    if (v.capacity() != lastCap) {\n      cout << "size=" << v.size()\n           << " cap=" << v.capacity() << endl;\n      lastCap = v.capacity();\n    }\n  }\n}',
      expectedOutput: 'size=1 cap=1\nsize=2 cap=2\nsize=3 cap=4\nsize=5 cap=8\nsize=9 cap=16',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '扩容是有**代价**的：复制所有旧元素。\n如果预先知道要存 1000 个元素，\n可以用 `reserve(1000)` 提前分配好内存，\n避免多次扩容。',
      code: 'std::vector<int> v;\nv.reserve(1000);  // 提前分配 1000 个 int 的空间\nfor (int i = 0; i < 1000; i++) {\n  v.push_back(i);  // 不会触发扩容\n}',
    },
    {
      type: 'type-it',
      instruction: '用 reserve 提前分配容量：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v;\n  v.reserve(5);\n  std::cout << "capacity: " << v.capacity() << "\\n";\n  std::cout << "size: " << v.size() << "\\n";\n}',
      hints: [
        'reserve 只分配内存，不改变 size',
        'capacity 变成 5，size 仍然是 0',
        'reserve 后 push_back 不会触发扩容直到超过 5',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：`v.push_back(10)` 的作用是？',
      options: [
        { text: '把 10 插入到 vector 头部', correct: false, explanation: 'push_back 是尾部添加' },
        { text: '把 10 添加到 vector 尾部', correct: true, explanation: 'push_back 在末尾添加元素' },
        { text: '删除元素 10', correct: false, explanation: 'push_back 是添加不是删除' },
        { text: '把 vector 大小变成 10', correct: false, explanation: 'push_back 添加一个元素，size 加 1' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：用 reserve 优化 vector 插入',
      template: '#include <vector>\n\nint main() {\n  std::vector<int> v;\n  v.____(100);  // 提前分配 100 个元素的空间\n  for (int i = 0; i < 100; i++) {\n    v.____(i);\n  }\n}',
      answers: ['reserve', 'push_back'],
      hints: ['第一个空是预先分配内存的函数', '第二个空是尾部添加元素的函数'],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，比较有 reserve 和无 reserve 的 capacity 变化：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v;\n  v.reserve(10);\n  cout << "初始 capacity: " << v.capacity() << endl;\n  for (int i = 0; i < 10; i++) {\n    v.push_back(i);\n  }\n  cout << "添加后 size: " << v.size() << endl;\n  cout << "添加后 capacity: " << v.capacity() << endl;\n}',
      expectedOutput: '初始 capacity: 10\n添加后 size: 10\n添加后 capacity: 10',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'type-it',
      instruction: '对比有 reserve 和没有 reserve 的 capacity 增长：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> a;\n  std::vector<int> b;\n  b.reserve(8);\n  for (int i = 0; i < 8; i++) {\n    a.push_back(i);\n    b.push_back(i);\n  }\n  std::cout << "a cap: " << a.capacity() << "\\n";\n  std::cout << "b cap: " << b.capacity() << "\\n";\n}',
      hints: [
        'a 没有 reserve，容量可能多次增长',
        'b 提前 reserve(8)，容量一直是 8',
        '没有 reserve 可能分配更多内存',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`v.shrink_to_fit()` 的作用是什么？',
      options: [
        { text: '增大 capacity', correct: false, explanation: 'shrink_to_fit 是减小 capacity 到和 size 一样' },
        { text: '减小 capacity 到和 size 一样', correct: true, explanation: '释放多余的内存，让 capacity == size' },
        { text: '删除所有元素', correct: false, explanation: 'clear 才删除元素' },
        { text: '排序元素', correct: false, explanation: 'sort 才是排序' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：vector 的 push_back 有没有可能失败？',
      options: [
        { text: '可能，如果内存不足会抛异常', correct: true, explanation: 'push_back 如果申请内存失败，会抛 std::bad_alloc 异常' },
        { text: '不可能，永远成功', correct: false, explanation: '内存不足时可能失败' },
        { text: '只在 debug 模式失败', correct: false, explanation: '不是 debug 的问题，是内存分配的问题' },
        { text: 'push_back 不分配内存', correct: false, explanation: 'push_back 可能触发扩容，需要分配内存' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：获取 vector 的 size 和 capacity',
      template: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 2, 3, 4, 5};\n  std::cout << "size: " << v.____() << "\\n";\n  std::cout << "capacity: " << v.____() << "\\n";\n}',
      answers: ['size', 'capacity'],
      hints: ['第一个空返回实际元素个数', '第二个空返回已分配内存容量'],
    },
    {
      type: 'type-it',
      instruction: '用 shrink_to_fit 释放多余容量：',
      code: '#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> v = {1, 2, 3, 4, 5};\n  v.reserve(100);\n  std::cout << v.capacity() << " " << v.size() << "\\n";\n  v.shrink_to_fit();\n  std::cout << v.capacity() << " " << v.size() << "\\n";\n}',
      hints: [
        'reserve(100) 后 capacity 是 100',
        'shrink_to_fit 把 capacity 缩到 5',
        'size 一直是 5，不受影响',
      ],
    },
    {
      type: 'exposition',
      text: '**size vs capacity 总结**：\n- size = 你实际用了多少\n- capacity = 系统给你备了多少\n- reserve 可以预先备好，减少扩容开销\n下一课我们学另一个容器——`list`。',
    },
  ],
}

export default lesson
