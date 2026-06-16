import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'ub-not-error',
    chapter: 21,
    title: 'UB 不是错误',
    subtitle: '而是编译器的自由',
    description: '理解未定义行为在 C++ 设计中的哲学位置——UB 是"编译器可以做任何事"的自由。',
    objectives: ['能理解 UB 为什么是"自由"而非"错误"', '能区分语言限制和编译器自由', '能解释 UB 如何让优化成为可能'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课我们看到 UB 的"可怕"一面。\n但 UB 还有另一面——**它是编译器的"自由"**。\n\nC++ 标准不说"这是错误的"而是说"这里没有任何保证"。\n这一差别给了编译器巨大的优化空间。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**UB 作为"自由"的含义**：\n标准对 UB 的定义是："对该程序的行为不做任何要求"。\n\n这意味着：\n- 编译器**不需要**帮你检查这个错误\n- 编译器**可以做**任何它觉得合适的优化\n- 编译器**可以假设**这种情况永远不会发生',
    },
    {
      type: 'exposition',
      text: '**UB 让优化成为可能**的例子：\n\n`int f(int x) { return x + 1; }`\n编译器假设 x 不会等于 `INT_MAX`，所以不做溢出检查。\n如果加入检查，每次调用都有额外开销。\n\n这个假设——"程序员不会写 UB"——是 C++ 性能的基础。',
      code: '// 编译器的视角：\n // x + 1 中的 x 不会恰好是 INT_MAX\n int f(int x) {\n   return x + 1;  // 不需要生成溢出检查代码\n }\n\n // 如果必须安全（比如 Java/C#）：\n // 每次都要生成检查代码，慢了 10-30%',
    },
    {
      type: 'multiple-choice',
      question: '为什么说 UB 是"编译器的自由"？',
      options: [
        { text: '因为编译器可以自由地不编译你的代码', correct: false, explanation: '不，编译器仍会编译，只是不保证结果' },
        { text: '因为标准不做任何要求，编译器可以做任何优化', correct: true, explanation: 'UB 给了编译器最大的优化自由度' },
        { text: '因为编译器可以自由选择实现方式', correct: false, explanation: '实现定义行为才是自由选择，UB 是完全不保证' },
        { text: '因为编译器可以免费使用你的代码', correct: false, explanation: '这不合逻辑' },
      ],
    },
    {
      type: 'exposition',
      text: '**"假设程序员不写 UB"的例子**：\n\n场景：`for (int i = 0; i <= n; ++i) arr[i] = 0;`\n\n如果 `i` 正好等于 `n` 且 `arr` 只有 `n` 个元素，\n这是越界（UB）。编译器假设你不会这样写，\n所以不做边界检查。\n\n这就是为什么 `std::vector::operator[]` 比 `at()` 快——\n前者假设你传入有效索引，后者每次都检查。',
    },
    {
      type: 'exposition',
      text: '**"UB 不是错误"的另一个例子——指针别名**：\n\n`void add(int* a, int* b) { *a += *b; }`\n如果 a 和 b 指向同一个位置（别名），这不是 UB。\n但如果用了 `restrict` 告诉编译器"它们不重叠"，\n编译器假设程序员没说谎，做出更激进的优化。\n\n如果程序员说了谎，就是 UB——编译器不做检查。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个是"假设程序员不写 UB"带来的性能优势？',
      options: [
        { text: '编译器可以省略边界检查', correct: true, explanation: '信任程序员传入了有效索引，避免每次检查开销' },
        { text: '程序可以自动修复错误', correct: false, explanation: 'UB 不提供自动修复' },
        { text: '调试更容易', correct: false, explanation: '恰恰相反，UB 让调试更困难' },
        { text: '编译器可以自动加锁', correct: false, explanation: '这是不相关的' },
      ],
    },
    {
      type: 'exposition',
      text: '**其他语言的处理方式**：\n\n- **Java/C#**：每次数组访问检查越界，有符号整数溢出定义良好（wrap around）\n- **Rust**：默认检查越界（debug），release 模式也可能检查\n- **C/C++**：不检查，直接 UB\n\n每种选择都有 trade-off。C++ 选择了极致性能，把安全责任交给程序员。',
    },
    {
      type: 'exposition',
      text: '**"UB 不是错误，而是契约"**：\n\n可以这样理解：你和编译器之间有一个"隐含契约"：\n- 你承诺：不写 UB\n- 编译器承诺：生成最快的代码\n\n如果你违反了这个契约，编译器不再对你的程序行为负责。\n这就是为什么说 UB 不是"错误"而是"免责声明"。',
    },
    {
      type: 'multiple-choice',
      question: '为什么 C++ 选择用 UB 而不是异常（如 Java 的 ArrayIndexOutOfBounds）？',
      options: [
        { text: '因为 C++ 开发者没想到', correct: false, explanation: '这是有意的设计选择' },
        { text: '因为检查会导致性能开销', correct: true, explanation: '零开销原则——不为没用到的特性付费' },
        { text: '因为异常在 C++ 中不能工作', correct: false, explanation: 'C++ 有异常机制，但选择不用于边界检查' },
        { text: '因为 Java 的检查也不安全', correct: false, explanation: 'Java 的检查是安全的，但有性能成本' },
      ],
    },
    {
      type: 'exposition',
      text: '**安全版本和 UB 版本的对比**：\n\n```cpp\n// 方式 1：UB 版本（快速）\nint sum1(const vector<int>& v) {\n  int s = 0;\n  for (size_t i = 0; i < v.size(); ++i)\n    s += v[i];  // operator[] 不做检查\n  return s;\n}\n\n// 方式 2：安全版本（慢一点）\nint sum2(const vector<int>& v) {\n  int s = 0;\n  for (size_t i = 0; i < v.size(); ++i)\n    s += v.at(i);  // at() 检查越界\n  return s;\n}\n```\n\n选择权在你——C++ 给了你选择。',
    },
    {
      type: 'type-it',
      instruction: '输入一个代码，展示 operator[] 和 at() 的不同行为：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v = {1, 2, 3};\n  cout << v[10] << "\\n";     // UB：越界但可能"正常"输出\n  // cout << v.at(10) << "\\n";  // 抛异常，安全\n}',
      hints: [
        'v[10] 越界但不一定崩溃（UB）',
        'v.at(10) 会抛出 out_of_range',
        'C++ 把安全选择交给你',
      ],
    },
    {
      type: 'exposition',
      text: '**"UB 不是错误"的更深层含义**：\n\n如果编译器把 UB 当作"错误"，它就必须生成检查代码。\n但 C++ 标准给的承诺是：**"不用不付钱"**。\n\n- 你不用边界检查 → 不付开销\n- 你不写越界代码 → 没有问题\n- 你写了越界代码 → 后果自负',
    },
    {
      type: 'multiple-choice',
      question: '以下哪句话最准确描述 C++ 对 UB 的态度？',
      options: [
        { text: '"我们帮你检查所有可能的错误"', correct: false, explanation: 'C++ 不检查，这是和 Java 的重要区别' },
        { text: '"相信程序员知道自己在做什么"', correct: true, explanation: 'C++ 的设计假设是：程序员不会故意写 UB' },
        { text: '"我们只支持安全操作"', correct: false, explanation: 'C++ 支持所有操作，安全的和不安全的' },
        { text: '"错误是运行时自动处理的"', correct: false, explanation: 'UB 是未被定义的行为，不会被自动处理' },
      ],
    },
    {
      type: 'exposition',
      text: '**总结：UB 的一体两面**：\n\n| 面 | 内容 |\n|----|------|\n| 恐怖面 | 难以发现、后果不可预测、可能破坏数据 |\n| 自由面 | 让编译器做激进优化、零开销抽象、极致性能 |\n\n理解并尊重 UB，是 C++ 高手和普通用户的区别。\n不写 UB，但理解为什么 UB 存在。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**实际建议**：\n- 默认用安全写法（用 `at()` 而不是 `[]` 除非性能关键）\n- 用智能指针避免悬空指针\n- 开启编译器警告和 sanitizer\n- 理解 UB 的存在是为了性能，不是疏忽\n\n下一课进入 C++ 的核心设计哲学——**零开销原则**（Zero-Overhead Principle）。',
    },
  ],
}

export default lesson
