import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase15-review',
    chapter: 16,
    title: '阶段 15 复习',
    subtitle: '现代特性总复习',
    description: '全面回顾阶段 15 所有现代 C++ 特性的知识，包括 auto、decltype、范围 for、可选值和类型安全容器。',
    objectives: ['能独立使用 auto、decltype、范围 for 简化代码', '能正确使用 optional、variant、any'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '`auto x = 3.14;` 中 x 的类型是？',
      options: [
        { text: 'int', correct: false, explanation: '3.14 是浮点数，不是整数' },
        { text: 'float', correct: false, explanation: '不带 f 后缀是 double' },
        { text: 'double', correct: true, explanation: '3.14 字面量默认是 double' },
        { text: 'long double', correct: false, explanation: 'long double 需要 L 后缀' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`decltype(auto)` 的作用是什么？',
      options: [
        { text: '用 auto 的位置但按 decltype 规则推导', correct: true, explanation: 'decltype(auto) 是 C++14 引入的组合推导' },
        { text: '声明一个 auto 变量', correct: false, explanation: 'auto 就够了' },
        { text: '和 auto 完全一样', correct: false, explanation: '推导规则不同' },
        { text: '只能在模板中使用', correct: false, explanation: '任何地方都可以' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '范围 for 中 `for (const auto& x : vec)` 的 const 和 & 有什么作用？',
      options: [
        { text: 'const 禁止修改，& 避免拷贝', correct: true, explanation: '这是高效只读遍历的标准写法' },
        { text: 'const 加快速度', correct: false, explanation: 'const 不影响速度' },
        { text: '& 使 x 成为指针', correct: false, explanation: '& 是引用，不是指针' },
        { text: '两者都没有实际作用', correct: false, explanation: '两者都很重要' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-08：nullptr 的类型是什么？',
      options: [
        { text: 'int', correct: false, explanation: 'nullptr 不是整数' },
        { text: 'void*', correct: false, explanation: 'void* 是 C 的空指针方式' },
        { text: 'std::nullptr_t', correct: true, explanation: 'nullptr 有独立类型' },
        { text: 'nullopt_t', correct: false, explanation: '这是 optional 的空状态' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '综合题：用 auto、范围 for 和 constexpr 处理数据：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nconstexpr int MAX = 10;\n\nconstexpr int square(int x) {\n  return x * x;\n}\n\nint main() {\n  vector<int> nums = {1, 2, 3, 4, 5};\n  auto sum = 0;\n  for (const auto& n : nums) {\n    sum += square(n);\n  }\n  static_assert(MAX > 0, "MAX 必须大于 0");\n  cout << "平方和: " << sum << endl;\n  cout << "超过 " << MAX << " 了吗？" << (sum > MAX ? "是" : "否") << endl;\n}',
      expectedOutput: '平方和: 55\n超过 10 了吗？是',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '综合题：用 optional 实现安全的除法和查找：',
      code: '#include <iostream>\n#include <optional>\n#include <vector>\nusing namespace std;\n\noptional<int> safeDivide(int a, int b) {\n  if (b == 0) return nullopt;\n  return a / b;\n}\n\noptional<int> findValue(const vector<int>& v, int target) {\n  for (size_t i = 0; i < v.size(); ++i) {\n    if (v[i] == target) return static_cast<int>(i);\n  }\n  return nullopt;\n}\n\nint main() {\n  auto r1 = safeDivide(10, 3);\n  cout << "10/3: " << r1.value_or(-1) << endl;\n  \n  auto r2 = safeDivide(5, 0);\n  cout << "5/0: " << r2.value_or(-1) << endl;\n  \n  vector<int> data = {10, 20, 30, 40};\n  auto pos = findValue(data, 30);\n  cout << "30 的位置: " << pos.value_or(-1) << endl;\n  \n  auto pos2 = findValue(data, 99);\n  cout << "99 的位置: " << pos2.value_or(-1) << endl;\n}',
      expectedOutput: '10/3: 3\n5/0: -1\n30 的位置: 2\n99 的位置: -1',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '综合题：用 variant 和 visit 处理多种类型：',
      code: '#include <iostream>\n#include <variant>\n#include <string>\n#include <vector>\nusing namespace std;\n\nusing Data = variant<int, double, string>;\n\nint main() {\n  vector<Data> items = {42, 3.14, string("hello"), 100, 2.71};\n  \n  for (const auto& item : items) {\n    visit([](const auto& val) {\n      cout << val << " ";\n    }, item);\n  }\n  cout << endl;\n  \n  double sum = 0;\n  for (const auto& item : items) {\n    if (holds_alternative<int>(item)) {\n      sum += get<int>(item);\n    } else if (holds_alternative<double>(item)) {\n      sum += get<double>(item);\n    }\n  }\n  cout << "数值之和: " << sum << endl;\n}',
      expectedOutput: '42 3.14 hello 100 2.71 \n数值之和: 147.85',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'concept-cards',
      instruction: '阶段 15 现代 C++ 特性一览：',
      cards: [
        { glyph: '🤖', term: 'auto', meaning: '编译器自动推导变量类型', example: 'auto x = 42;' },
        { glyph: '🔍', term: 'decltype', meaning: '获取表达式的类型', example: 'decltype(x) y;' },
        { glyph: '🔄', term: '范围 for', meaning: '自动遍历容器所有元素', example: 'for (auto x : vec)' },
        { glyph: '🔗', term: '结构化绑定', meaning: '一次拆解 pair/tuple/struct', example: 'auto [a,b] = p;' },
        { glyph: '⚡', term: 'constexpr', meaning: '编译期求值，运行时无开销', example: 'constexpr int N=5;' },
        { glyph: '✅', term: 'static_assert', meaning: '编译期断言，失败即停', example: 'static_assert(N>0);' },
        { glyph: '🚫', term: 'nullptr', meaning: '类型安全的空指针', example: 'int* p = nullptr;' },
        { glyph: '❓', term: 'optional', meaning: '可能有值也可能没有', example: 'optional<int> v;' },
        { glyph: '🔀', term: 'variant', meaning: '类型安全的多选一', example: 'variant<int,str> v;' },
        { glyph: '📦', term: 'any', meaning: '存储任意可拷贝类型', example: 'any a = 42;' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-04：结构化绑定可以解构哪些类型？',
      options: [
        { text: '只有 pair', correct: false, explanation: '还有数组、tuple、struct' },
        { text: 'pair、数组、tuple、struct', correct: true, explanation: '结构化绑定支持这些类型' },
        { text: '只能解构 map', correct: false, explanation: 'map 元素是 pair，但不是仅限于 map' },
        { text: '只能用于函数返回', correct: false, explanation: '任何地方都可以' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-05：constexpr 函数在参数为运行时值时如何执行？',
      options: [
        { text: '编译期执行', correct: false, explanation: '运行时参数不能编译期执行' },
        { text: '作为普通函数运行', correct: true, explanation: '运行时参数时 constexpr 函数退化为普通函数' },
        { text: '编译报错', correct: false, explanation: '不会报错' },
        { text: '跳过执行', correct: false, explanation: '正常执行' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-06：static_assert 的条件必须是什么？',
      options: [
        { text: '编译期常量表达式', correct: true, explanation: 'static_assert 在编译期检查' },
        { text: '运行时 bool 表达式', correct: false, explanation: '运行时检查用 assert' },
        { text: '字符串', correct: false, explanation: '必须是 bool 表达式' },
        { text: '任何表达式', correct: false, explanation: '必须是编译期可求值的' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-09：std::nullopt 表示什么？',
      options: [
        { text: '空指针', correct: false, explanation: 'nullopt 不是指针' },
        { text: 'optional 中没有值', correct: true, explanation: 'nullopt 是 optional 的空状态' },
        { text: '值为 0', correct: false, explanation: 'nullopt 不是零值' },
        { text: '内存分配失败', correct: false, explanation: '和内存分配无关' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '最终挑战：用多个现代特性写一个完整程序：',
      code: '#include <iostream>\n#include <vector>\n#include <optional>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\noptional<int> findMax(const vector<int>& v) {\n  if (v.empty()) return nullopt;\n  int m = v[0];\n  for (auto x : v) {\n    if (x > m) m = x;\n  }\n  return m;\n}\n\nint main() {\n  vector<int> data = {3, 7, 2, 9, 5, 1, 8};\n  \n  auto result = findMax(data);\n  if (result) {\n    cout << "最大值: " << *result << endl;\n  }\n  \n  constexpr int THRESHOLD = 5;\n  static_assert(THRESHOLD > 0, "阈值必须大于 0");\n  \n  cout << "大于 " << THRESHOLD << " 的数: ";\n  for (const auto& x : data) {\n    if (x > THRESHOLD) cout << x << " ";\n  }\n  cout << endl;\n}',
      expectedOutput: '最大值: 9\n大于 5 的数: 7 9 8 ',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'type-it',
      instruction: '用结构化绑定遍历 pair 数组：',
      code: '#include <iostream>\n#include <utility>\n#include <string>\nusing namespace std;\n\nint main() {\n  pair<string, int> grades[] = {{\"Math\", 95}, {\"English\", 88}, {\"C++\", 92}};\n  for (const auto& [subject, score] : grades) {\n    cout << subject << ": " << score << endl;\n  }\n}',
      hints: [
        '[subject, score] 解构每个 pair',
        'const auto& 避免拷贝',
        '遍历所有科目和成绩',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-10：std::visit 的作用是什么？',
      options: [
        { text: '检查 variant 的类型', correct: false, explanation: '检查类型用 holds_alternative' },
        { text: '对 variant 中存储的值调用访问器', correct: true, explanation: 'visit 传入可调用对象，自动处理当前类型' },
        { text: '转换 variant 类型', correct: false, explanation: 'variant 类型固定' },
        { text: '删除 variant 的值', correct: false, explanation: 'visit 不删除值' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-11：any 和 variant 的关键区别是什么？',
      options: [
        { text: 'any 更快', correct: false, explanation: 'variant 通常更快' },
        { text: 'variant 类型集合编译期已知，any 运行时任意', correct: true, explanation: 'variant 编译期确定所有类型，any 运行时类型擦除' },
        { text: 'any 不能转换类型', correct: false, explanation: 'any 可以存任何类型' },
        { text: '两者没有区别', correct: false, explanation: '用途和设计不同' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 decltype(auto) 保留引用语义：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> vec = {10, 20, 30};\n  auto& ref = vec[0];\n  decltype(auto) dref = vec[1];\n  ref = 99;\n  dref = 88;\n  for (auto x : vec) cout << x << " ";\n  cout << endl;\n}',
      hints: [
        'auto& ref 和 decltype(auto) 都保留引用',
        '修改 ref 和 dref 修改了 vec 的元素',
        '输出: 99 88 30',
      ],
    },
    {
      type: 'exposition',
      text: '🎉 **恭喜你完成了阶段 15——现代 C++ 特性实战！**\n你已经掌握了 C++11/14/17 最重要的现代特性。\n接下来进入**阶段 16：文件与流操作**，\n学习如何读写文件、处理输入输出流。',
    },
  ],
}

export default lesson
