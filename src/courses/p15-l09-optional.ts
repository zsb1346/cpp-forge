import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'optional',
    chapter: 16,
    title: 'optional 可选值',
    subtitle: '可能有值可能没有',
    description: '学习用 std::optional 安全地表示"可能有值，也可能没有"的场景。',
    objectives: ['能用 std::optional 代替哨兵值', '能用 has_value() 和 value() 安全访问', '理解 std::nullopt 的用法'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有时候函数不一定能返回有效结果。\n比如查找一个元素：找到了返回它，找不到呢？\n传统做法：返回 -1、nullptr、或者传引用参数。\n但这些做法容易出错。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`std::optional<T>` 是 C++17 引入的"可能包含值，也可能不包含"的类型。\n- `std::nullopt`——表示"没有值"\n- `.has_value()`——检查是否有值\n- `.value()`——获取值（没有值会抛异常）\n- `*opt`——解引用获取值（不检查，谨慎使用）',
      code: '#include <optional>\n\nstd::optional<int> findValue(bool found) {\n  if (found) {\n    return 42;\n  }\n  return std::nullopt;\n}',
    },
    {
      type: 'type-it',
      instruction: '用 optional 表示"可能有值"：',
      code: '#include <iostream>\n#include <optional>\nusing namespace std;\n\noptional<int> divide(int a, int b) {\n  if (b == 0) return nullopt;\n  return a / b;\n}\n\nint main() {\n  auto result = divide(10, 2);\n  if (result.has_value()) {\n    cout << result.value() << endl;\n  }\n}',
      hints: [
        'b == 0 时返回 nullopt 表示无意义',
        'has_value() 检查是否包含值',
        'value() 获取存储的值',
      ],
    },
    {
      type: 'exposition',
      text: '传统做法的问题：\n1. 返回 -1（但 -1 可能是有效值）\n2. 返回 nullptr（只能用于指针）\n3. 传引用参数（调用方要预定义变量）\n\n`optional` 清晰地表达了"可能有值"的语义。',
      code: '// ❌ 哨兵值方式\nint divide1(int a, int b) {\n  if (b == 0) return -1;  // -1 可能是有效结果吗？\n  return a / b;\n}\n\n// ✅ optional 方式\noptional<int> divide2(int a, int b) {\n  if (b == 0) return nullopt;\n  return a / b;\n}\n\n// 调用方一眼就能看出这个函数可能失败',
    },
    {
      type: 'type-it',
      instruction: '对比传统方式和 optional：',
      code: '#include <iostream>\n#include <optional>\n#include <string>\nusing namespace std;\n\noptional<int> findInArray(int arr[], int size, int target) {\n  for (int i = 0; i < size; ++i) {\n    if (arr[i] == target) {\n      return i;\n    }\n  }\n  return nullopt;\n}\n\nint main() {\n  int nums[] = {10, 20, 30, 40, 50};\n  auto pos = findInArray(nums, 5, 30);\n  if (pos) {\n    cout << "找到了，位置: " << *pos << endl;\n  } else {\n    cout << "没找到" << endl;\n  }\n}',
      hints: [
        'nullopt 表示"没找到"',
        'if (pos) 等价于 if (pos.has_value())',
        '*pos 解引用获取值（当确定有值时）',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p13-02：vector 的 size() 返回什么？',
      options: [
        { text: '数组容量', correct: false, explanation: 'size() 返回元素个数，不是容量' },
        { text: '元素个数', correct: true, explanation: 'size() 返回 vector 中的元素个数' },
        { text: '内存大小', correct: false, explanation: 'sizeof 才返回字节大小' },
        { text: '最大容量', correct: false, explanation: 'capacity() 返回容量' },
      ],
    },
    {
      type: 'exposition',
      text: '`optional` 的常用操作：\n| 操作 | 说明 |\n|------|------|\n| `opt.has_value()` | 检查是否有值 |\n| `opt.value()` | 获取值，无值时抛 `bad_optional_access` |\n| `opt.value_or(default)` | 获取值，无值时返回默认值 |\n| `*opt` | 解引用获取值（不检查） |\n| `opt->member` | 访问成员（类似指针） |\n| `opt = nullopt` | 重置为空 |',
      code: 'optional<int> opt = 42;\n\ncout << opt.value_or(0);    // 42\n\nopt = nullopt;\ncout << opt.value_or(-1);   // -1（默认值）\n\n// 安全访问\nif (opt) {\n  cout << *opt;\n}',
    },
    {
      type: 'type-it',
      instruction: '使用 value_or 提供默认值：',
      code: '#include <iostream>\n#include <optional>\nusing namespace std;\n\noptional<int> getScore(string name) {\n  if (name == "Alice") return 95;\n  if (name == "Bob") return 87;\n  return nullopt;\n}\n\nint main() {\n  int aliceScore = getScore("Alice").value_or(0);\n  int eveScore = getScore("Eve").value_or(60);\n  cout << "Alice: " << aliceScore << endl;\n  cout << "Eve: " << eveScore << endl;\n}',
      hints: [
        'value_or(0) 在有值时返回值，无值时返回 0',
        'Eve 不在名单中，返回 60（默认值）',
        '避免了对 has_value 的手动判断',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-08：nullptr 的类型是什么？',
      options: [
        { text: 'int', correct: false, explanation: 'nullptr 不是整数' },
        { text: 'std::nullptr_t', correct: true, explanation: 'nullptr 有独立类型 nullptr_t' },
        { text: 'void*', correct: false, explanation: '不同于 C 的 (void*)0' },
        { text: 'nullopt', correct: false, explanation: 'nullopt 是 optional 的空状态' },
      ],
    },
    {
      type: 'exposition',
      text: '`optional` 的实际应用场景：\n1. 查找操作（找到/找不到）\n2. 解析操作（成功/失败）\n3. 配置项（有设置/没设置）\n4. 构造可能失败的对象',
      code: '// 解析整数\noptional<int> parseInt(const string& s) {\n  try {\n    return stoi(s);\n  } catch (...) {\n    return nullopt;\n  }\n}\n\n// 使用\nauto val = parseInt("42");\nif (val) cout << *val;',
    },
    {
      type: 'type-it',
      instruction: '用 optional 解析字符串：',
      code: '#include <iostream>\n#include <optional>\n#include <string>\nusing namespace std;\n\noptional<int> safeStoi(const string& s) {\n  try {\n    return stoi(s);\n  } catch (...) {\n    return nullopt;\n  }\n}\n\nint main() {\n  auto n1 = safeStoi("123");\n  auto n2 = safeStoi("abc");\n  cout << n1.value_or(-1) << " " << n2.value_or(-1) << endl;\n}',
      hints: [
        'stoi 解析失败会抛异常',
        'try-catch 捕获异常，返回 nullopt',
        'value_or(-1) 保证始终有输出',
      ],
    },
    {
      type: 'exposition',
      text: '`optional` 的性能特点：\n- 没有堆分配——值就存储在 optional 内部\n- 额外占用约 1 字节的"是否有效"标志\n- 拷贝和移动行为和内含类型一致',
      code: '// optional 的大小 ≈ T + 1 字节（对齐后可能更多）\ncout << sizeof(optional<int>);     // 通常 8 字节\ncout << sizeof(optional<double>);  // 通常 16 字节',
    },
    {
      type: 'type-it',
      instruction: 'sizeof 检查 optional 大小：',
      code: '#include <iostream>\n#include <optional>\nusing namespace std;\n\nint main() {\n  optional<int> opt = 42;\n  optional<double> opt2 = 3.14;\n  \n  if (opt && opt2) {\n    cout << sizeof(opt) << " " << sizeof(opt2) << endl;\n  }\n}',
      hints: [
        'optional<int> 通常比 int 大一点',
        '额外的字节用于存储"是否有值"标记',
        '没有堆分配开销',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，用 optional 处理多个可能失败的操作：',
      code: '#include <iostream>\n#include <optional>\n#include <string>\nusing namespace std;\n\noptional<double> divide(double a, double b) {\n  if (b == 0.0) return nullopt;\n  return a / b;\n}\n\nint main() {\n  auto r1 = divide(10.0, 3.0);\n  auto r2 = divide(5.0, 0.0);\n  \n  cout << "r1: " << r1.value_or(-1.0) << endl;\n  cout << "r2: " << r2.value_or(-1.0) << endl;\n  \n  if (r1 && !r2) {\n    cout << "只有 r1 有效" << endl;\n  }\n}',
      expectedOutput: 'r1: 3.33333\nr2: -1\n只有 r1 有效',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: 'std::nullopt 通常表示什么含义？',
      options: [
        { text: '空指针', correct: false, explanation: 'nullopt 是 optional 的空状态，不是指针' },
        { text: 'optional 对象中没有值', correct: true, explanation: 'nullopt 表示 optional 不包含值' },
        { text: '值为 0', correct: false, explanation: 'nullopt 不是零值' },
        { text: '内存分配失败', correct: false, explanation: '和内存分配无关' },
      ],
    },
    {
      type: 'type-it',
      instruction: '链式调用 optional 的 value_or：',
      code: '#include <iostream>\n#include <optional>\n#include <string>\nusing namespace std;\n\nint main() {\n  auto getConfig = [](const string& key) -> optional<string> {\n    if (key == "host") return "localhost"s;\n    if (key == "port") return "8080"s;\n    return nullopt;\n  };\n  \n  string host = getConfig("host").value_or("default");\n  string port = getConfig("port").value_or("3000");\n  string db = getConfig("db").value_or("mydb");\n  \n  cout << host << ":" << port << " db=" << db << endl;\n}',
      hints: [
        'value_or 在无值时返回默认值',
        '链式调用让代码非常简洁',
        '每个配置项都有一个安全默认值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-03：范围 for 中 for(const auto& x : vec) 的 & 有什么作用？',
      options: [
        { text: '创建指针', correct: false, explanation: '& 是引用，不是指针' },
        { text: '避免拷贝元素', correct: true, explanation: '引用避免了每个元素的拷贝' },
        { text: '加快循环速度', correct: false, explanation: '避免拷贝间接影响性能' },
        { text: '让 x 可变', correct: false, explanation: 'const 禁止修改' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- `std::optional<T>` 类型安全地表示"可能有值" \n- 替代哨兵值和输出参数，语义更清晰\n- 用 `has_value()` 或 `if (opt)` 检查\n- 用 `value_or(default)` 安全取值\n- C++17 起可用，需要 `<optional>` 头文件',
    },
  ],
}

export default lesson
