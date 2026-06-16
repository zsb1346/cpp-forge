import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-modern-features',
    chapter: 16,
    title: '现代特性练习',
    subtitle: '巩固 auto/decltype/constexpr',
    description: '通过练习巩固 auto、decltype、范围 for、constexpr 和 static_assert 的综合运用。',
    objectives: ['能综合运用 auto、decltype、范围 for', '能用 constexpr 和 static_assert 编写安全的代码'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '用 auto 简化迭代器声明：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> v = {10, 20, 30, 40, 50};\n  auto it = v.begin();\n  while (it != v.end()) {\n    cout << *it << " ";\n    ++it;\n  }\n}',
      hints: [
        'auto it 推导为 vector<int>::iterator',
        '*it 获取当前元素的值',
        '输出: 10 20 30 40 50',
      ],
    },
    {
      type: 'code-runner',
      instruction: '最终挑战：用学到的所有现代特性写一个程序：',
      code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nconstexpr double TAX_RATE = 0.08;\n\nstruct Item {\n  string name;\n  double price;\n};\n\nint main() {\n  vector<Item> items = {{\"apple\", 2.5}, {\"banana\", 1.2}, {\"cherry\", 3.0}};\n  double total = 0;\n  for (const auto& item : items) {\n    total += item.price;\n  }\n  double tax = total * TAX_RATE;\n  double grandTotal = total + tax;\n  static_assert(TAX_RATE > 0, "税率必须大于 0");\n  cout << "小计: $" << total << endl;\n  cout << "税费: $" << tax << endl;\n  cout << "总计: $" << grandTotal << endl;\n}',
      expectedOutput: '小计: $6.7\n税费: $0.536\n总计: $7.236',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-01：`auto x = 3.14f;` 中 x 的类型是？',
      options: [
        { text: 'double', correct: false, explanation: 'f 后缀表示 float' },
        { text: 'float', correct: true, explanation: '3.14f 是 float 字面量' },
        { text: 'int', correct: false, explanation: '3.14 不是整数' },
        { text: 'long double', correct: false, explanation: '没有 L 后缀' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-05：以下哪个不能用于 constexpr 变量？',
      options: [
        { text: 'sizeof(int)', correct: false, explanation: 'sizeof 是编译期运算符' },
        { text: '用户输入的值', correct: true, explanation: '用户输入在运行时才能确定' },
        { text: '3 + 4', correct: false, explanation: '字面量算术是编译期常量' },
        { text: 'constexpr 函数的返回值', correct: false, explanation: 'constexpr 函数可能返回编译期值' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 decltype 后置返回类型写模板函数：',
      code: '#include <iostream>\nusing namespace std;\n\ntemplate<typename T, typename U>\nauto product(T a, U b) -> decltype(a * b) {\n  return a * b;\n}\n\nint main() {\n  cout << product(5, 3.2) << endl;\n  cout << product(2.5, 4) << endl;\n}',
      hints: [
        'decltype(a * b) 推导返回类型',
        'int * double 返回 double',
        '输出: 16 和 10',
      ],
    },
    {
      type: 'code-runner',
      instruction: '用 constexpr 计算 1 到 n 的和：',
      code: '#include <iostream>\nusing namespace std;\n\nconstexpr int sumTo(int n) {\n  int s = 0;\n  for (int i = 1; i <= n; ++i) {\n    s += i;\n  }\n  return s;\n}\n\nint main() {\n  constexpr int s10 = sumTo(10);\n  static_assert(s10 == 55, "1 到 10 的和应该是 55");\n  cout << s10 << endl;\n}',
      expectedOutput: '55',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-06：static_assert 的条件必须是？',
      options: [
        { text: '编译期常量表达式', correct: true, explanation: 'static_assert 在编译期求值' },
        { text: '任何 bool 表达式', correct: false, explanation: '必须是编译期已知的' },
        { text: '字符串表达式', correct: false, explanation: '需要 bool 值' },
        { text: '浮点数比较', correct: false, explanation: '浮点数比较可能在运行时' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用范围 for + 结构化绑定遍历 map：',
      code: '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n  map<string, int> scores = {{\"Alice\", 92}, {\"Bob\", 85}, {\"Charlie\", 78}};\n  for (const auto& [name, score] : scores) {\n    cout << name << ": " << score << endl;\n  }\n}',
      hints: [
        '[name, score] 解构 map 的 pair',
        'const auto& 避免拷贝',
        'map 默认按 key 升序输出',
      ],
    },
    {
      type: 'code-runner',
      instruction: '组合练习：用 vector 存数据，范围 for 遍历，auto 简化类型：',
      code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<string> tasks = {"learn C++", "write code", "debug errors"};\n  \n  cout << "我的任务清单:" << endl;\n  int num = 1;\n  for (const auto& t : tasks) {\n    cout << num << ". " << t << endl;\n    ++num;\n  }\n  \n  cout << "共 " << tasks.size() << " 项" << endl;\n}',
      expectedOutput: '我的任务清单:\n1. learn C++\n2. write code\n3. debug errors\n共 3 项',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-04：结构化绑定可以拆分哪些类型？',
      options: [
        { text: '只能拆分 pair', correct: false, explanation: '还可以拆分 tuple、数组、struct' },
        { text: 'pair、tuple、数组、struct', correct: true, explanation: '结构化绑定支持这四种类型' },
        { text: '只能用在 range-for 中', correct: false, explanation: '任何地方都可以' },
        { text: '不能用于 const 对象', correct: false, explanation: 'const auto& 完全可以' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 auto& 在范围 for 中修改元素：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {1, 2, 3, 4, 5};\n  for (auto& n : nums) {\n    n = n * 3;\n  }\n  for (const auto& n : nums) {\n    cout << n << " ";\n  }\n  cout << endl;\n}',
      hints: [
        'auto& n 是引用，修改 n 修改原元素',
        '第一个循环将每个元素乘 3',
        '第二个循环输出: 3 6 9 12 15',
      ],
    },
    {
      type: 'code-runner',
      instruction: '综合题：用 constexpr 和 static_assert 做编译期校验：',
      code: '#include <iostream>\nusing namespace std;\n\nconstexpr int daysInMonth(int month) {\n  return (month == 2) ? 28 :\n         (month == 4 || month == 6 || month == 9 || month == 11) ? 30 : 31;\n}\n\nint main() {\n  constexpr int febDays = daysInMonth(2);\n  static_assert(febDays == 28, "二月有 28 天");\n  \n  constexpr int janDays = daysInMonth(1);\n  static_assert(janDays == 31, "一月有 31 天");\n  \n  cout << "2 月: " << febDays << " 天" << endl;\n  cout << "1 月: " << janDays << " 天" << endl;\n}',
      expectedOutput: '2 月: 28 天\n1 月: 31 天',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-02：decltype 和 auto 的关键区别是什么？',
      options: [
        { text: 'decltype 保留引用和 const，auto 剥离', correct: true, explanation: '这是两者最核心的区别' },
        { text: 'auto 更强大', correct: false, explanation: '两者各有所长' },
        { text: 'decltype 只能用于模板', correct: false, explanation: 'decltype 可以用在任何表达式上' },
        { text: '两者完全一样', correct: false, explanation: '推导规则不同' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 decltype(auto) 保留引用语义：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\ndecltype(auto) getElement(vector<int>& v, size_t i) {\n  return v[i];\n}\n\nint main() {\n  vector<int> v = {10, 20, 30};\n  decltype(auto) r = getElement(v, 1);\n  r = 99;\n  cout << v[1] << endl;\n}',
      hints: [
        'v[1] 返回 int&',
        'decltype(auto) 保留引用语义',
        'r = 99 修改了 v[1]',
      ],
    },
    {
      type: 'code-runner',
      instruction: '最终挑战：用学到的所有现代特性写一个程序：',
      code: '#include <iostream>\n#include <vector>\n#include <string>\n#include <map>\nusing namespace std;\n\nconstexpr double TAX_RATE = 0.08;\n\nstruct Item {\n  string name;\n  double price;\n};\n\nint main() {\n  vector<Item> items = {{"apple", 2.5}, {"banana", 1.2}, {"cherry", 3.0}};\n  double total = 0;\n  for (const auto& item : items) {\n    total += item.price;\n  }\n  \n  constexpr auto calcTax = [](double total) constexpr {\n    return total * TAX_RATE;\n  };\n  \n  double tax = total * TAX_RATE;\n  double grandTotal = total + tax;\n  \n  static_assert(TAX_RATE > 0, "税率必须大于 0");\n  \n  cout << "小计: $" << total << endl;\n  cout << "税费: $" << tax << endl;\n  cout << "总计: $" << grandTotal << endl;\n}',
      expectedOutput: '小计: $6.7\n税费: $0.536\n总计: $7.236',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-03：范围 for 的实质是什么？',
      options: [
        { text: '编译器转换成迭代器循环', correct: true, explanation: '范围 for 底层就是 begin() 到 end() 的迭代器循环' },
        { text: '宏展开', correct: false, explanation: '不是宏，是语言特性' },
        { text: '递归调用', correct: false, explanation: '和递归无关' },
        { text: '运行时解释执行', correct: false, explanation: '编译期就确定了' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 static_assert 检查编译期条件：',
      code: '#include <iostream>\nusing namespace std;\n\nconstexpr int VERSION = 2;\n\nint main() {\n  static_assert(VERSION >= 2, "至少需要版本 2");\n  cout << "版本 " << VERSION << " 通过检查" << endl;\n}',
      hints: [
        'static_assert 在编译期检查常量条件',
        'VERSION >= 2 为 true 才通过',
        '如果 VERSION=1 编译会失败',
      ],
    },
    {
      type: 'exposition',
      text: '🎉 **恭喜！你完成了现代特性练习课！**\n你已经掌握了 auto、decltype、范围 for、结构化绑定、\nconstexpr 和 static_assert 的综合运用。\n接下来学习 nullptr 的正确使用。',
    },
  ],
}

export default lesson
