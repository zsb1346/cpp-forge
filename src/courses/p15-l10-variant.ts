import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'variant',
    chapter: 16,
    title: 'variant 类型联合',
    subtitle: '类型安全的 union',
    description: '学习用 std::variant 安全地存储多种类型中的一种，替代 C 风格的 union。',
    objectives: ['能用 std::variant 定义多类型变量', '能用 index() 和 get() 安全访问', '理解 variant 和 union 的区别'],
    estimatedMinutes: 9,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'C 语言的 `union` 可以在同一位置存储不同类型，\n但它**不知道当前存的是哪种类型**——读错类型就出 bug。\nC++17 的 `std::variant` 是**类型安全的 union**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`std::variant<int, double, string>` 表示：\n这个变量可以存 `int` **或** `double` **或** `string`，\n但**同时只能存一种**。\n而且它知道当前存的是哪一种。',
      code: '#include <variant>\n\nstd::variant<int, double, std::string> v;\n\nv = 42;                  // 现在存 int\nv = 3.14;               // 现在存 double\nv = std::string("hi");  // 现在存 string',
    },
    {
      type: 'type-it',
      instruction: '声明并使用 variant：',
      code: '#include <iostream>\n#include <variant>\n#include <string>\nusing namespace std;\n\nint main() {\n  variant<int, double, string> v;\n  v = 42;\n  cout << get<int>(v) << endl;\n  v = 3.14;\n  cout << get<double>(v) << endl;\n}',
      hints: [
        'variant<...> 尖括号内列出所有可能的类型',
        'get<int>(v) 获取 int 类型的值',
        '如果 get 的类型不对，会抛 bad_variant_access',
      ],
    },
    {
      type: 'exposition',
      text: '`std::variant` 的关键操作：\n| 操作 | 说明 |\n|------|------|\n| `v.index()` | 当前存储的类型索引（0,1,2...） |\n| `get<T>(v)` | 按类型取值，类型不匹配抛异常 |\n| `get<idx>(v)` | 按索引取值 |\n| `get_if<T>(&v)` | 返回指针，不匹配返回 nullptr |\n| `holds_alternative<T>(v)` | 检查是否存的是 T 类型 |',
      code: 'variant<int, double> v = 42;\n\ncout << v.index();               // 0（int 是第 0 个类型）\ncout << holds_alternative<int>(v);  // true\n\nif (auto* p = get_if<double>(&v)) {\n  // 只在 v 存 double 时执行\n}',
    },
    {
      type: 'type-it',
      instruction: '用 index() 和 holds_alternative 检查类型：',
      code: '#include <iostream>\n#include <variant>\n#include <string>\nusing namespace std;\n\nint main() {\n  variant<int, string> v = "hello"s;\n  cout << "index: " << v.index() << endl;\n  cout << "is int? " << holds_alternative<int>(v) << endl;\n  cout << "is string? " << holds_alternative<string>(v) << endl;\n}',
      hints: [
        'index() 返回 0 或 1（对应类型列表顺序）',
        'holds_alternative<T> 返回 bool',
        '"hello"s 是 string 字面量',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-09：optional 和 variant 的主要区别是什么？',
      options: [
        { text: 'optional 表示有/无，variant 表示多种类型之一', correct: true, explanation: 'optional 是"一个值或没有"，variant 是"多种类型之一"' },
        { text: '两者完全一样', correct: false, explanation: '用途不同' },
        { text: 'variant 是 optional 的升级版', correct: false, explanation: '不同的工具' },
        { text: 'optional 更安全', correct: false, explanation: '两者都是类型安全的' },
      ],
    },
    {
      type: 'exposition',
      text: 'C 语言的 `union` 和 `variant` 对比：',
      code: '// C union：不安全的\nunion Value {\n  int i;\n  double d;\n};\nValue v;\nv.i = 42;\ncout << v.d;  // ❌ 读错了但不会报错\n\n// C++ variant：安全的\nvariant<int, double> v = 42;\ncout << get<double>(v);  // ❌ 运行时会抛异常',
    },
    {
      type: 'type-it',
      instruction: '体会 variant 的类型安全性：',
      code: '#include <iostream>\n#include <variant>\nusing namespace std;\n\nint main() {\n  variant<int, double> v = 42;\n  \n  try {\n    double d = get<double>(v);\n    cout << d << endl;\n  } catch (const bad_variant_access& e) {\n    cout << "类型不匹配: " << e.what() << endl;\n  }\n  \n  cout << "安全地拿到了 int: " << get<int>(v) << endl;\n}',
      hints: [
        'v 存的是 int，用 get<double> 会抛异常',
        'bad_variant_access 是 variant 的异常类型',
        '用 get<int> 就能正确获取',
      ],
    },
    {
      type: 'exposition',
      text: '更优雅的处理方式——`std::visit`：\n可以传入一个**访问器**，variant 自动调用匹配的重载。\n这是 variant 最强大的用法。',
      code: '#include <variant>\n#include <iostream>\nusing namespace std;\n\nint main() {\n  variant<int, double, string> v;\n  v = 42;\n  \n  visit([](auto&& arg) {\n    cout << arg << endl;\n  }, v);\n  \n  v = 3.14;\n  visit([](auto&& arg) {\n    cout << arg << endl;\n  }, v);\n}',
    },
    {
      type: 'type-it',
      instruction: '用 std::visit 处理 variant：',
      code: '#include <iostream>\n#include <variant>\n#include <string>\nusing namespace std;\n\nint main() {\n  variant<int, double, string> v = 3.14;\n  \n  visit([](const auto& val) {\n    cout << "值是: " << val << endl;\n  }, v);\n}',
      hints: [
        'visit 自动根据当前类型调用 lambda',
        'auto 参数匹配所有可能的类型',
        '不需要手动检查 index() 或 get()',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p13-09：stack 和 queue 是什么类型的容器？',
      options: [
        { text: '序列容器', correct: false, explanation: 'vector/list/deque 是序列容器' },
        { text: '关联容器', correct: false, explanation: 'set/map 是关联容器' },
        { text: '容器适配器', correct: true, explanation: 'stack/queue 在已有容器上封装接口' },
        { text: '无序容器', correct: false, explanation: 'unordered_set 是无序容器' },
      ],
    },
    {
      type: 'exposition',
      text: '`variant` 的实际应用场景：\n1. 解析器（AST 节点可以有多种类型）\n2. 配置系统（配置值可以是 int/string/bool）\n3. 表达式求值（值可以是数字或字符串）\n4. 错误处理（返回结果或错误信息）',
      code: '// 表达式求值中的 variant\nusing Value = variant<int, double>;\n\nValue eval(Expr e) {\n  if (e.type == INT) return 42;\n  if (e.type == DOUBLE) return 3.14;\n  return 0;\n}\n\nvisit([](auto v) { cout << v; }, eval(someExpr));',
    },
    {
      type: 'type-it',
      instruction: '用 variant 实现多种返回值：',
      code: '#include <iostream>\n#include <variant>\n#include <string>\nusing namespace std;\n\nusing Result = variant<int, string>;\n\nResult parseOrError(const string& input) {\n  try {\n    return stoi(input);\n  } catch (...) {\n    return string("解析失败: ") + input;\n  }\n}\n\nint main() {\n  auto r1 = parseOrError("42");\n  auto r2 = parseOrError("abc");\n  \n  visit([](const auto& v) { cout << v << endl; }, r1);\n  visit([](const auto& v) { cout << v << endl; }, r2);\n}',
      hints: [
        'Result 可以是 int 或 string',
        '成功返回 int，失败返回错误信息',
        'visit 自动处理两种类型',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行程序，用 variant 表示形状类型：',
      code: '#include <iostream>\n#include <variant>\n#include <cmath>\nusing namespace std;\n\nstruct Circle { double radius; };\nstruct Rect { double width; double height; };\nusing Shape = variant<Circle, Rect>;\n\ndouble area(const Shape& s) {\n  return visit([](const auto& sh) {\n    if constexpr (is_same_v<decay_t<decltype(sh)>, Circle>) {\n      return M_PI * sh.radius * sh.radius;\n    } else {\n      return sh.width * sh.height;\n    }\n  }, s);\n}\n\nint main() {\n  Shape s1 = Circle{5.0};\n  Shape s2 = Rect{3.0, 4.0};\n  cout << "圆面积: " << area(s1) << endl;\n  cout << "矩形面积: " << area(s2) << endl;\n}',
      expectedOutput: '圆面积: 78.5398\n矩形面积: 12',
      comparison: 'contains',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: 'get_if<T>(&v) 返回什么？',
      options: [
        { text: 'T 类型的值', correct: false, explanation: '返回指针，不是值' },
        { text: 'T* 指针，类型不匹配返回 nullptr', correct: true, explanation: 'get_if 返回指针，安全地检查类型' },
        { text: 'bool 值', correct: false, explanation: 'holds_alternative 才返回 bool' },
        { text: '抛出异常', correct: false, explanation: 'get_if 不抛异常' },
      ],
    },
    {
      type: 'exposition',
      text: '`variant` 的注意事项：\n- variant 不能持有引用类型\n- variant 不能持有不完整类型\n- 默认构造时使用第一个类型的默认值\n- variant 的大小 ≈ 最大类型的大小 + 索引开销',
      code: 'variant<int, double> v;  // 默认构造：v 存 int(0)\ncout << get<int>(v);      // 0\n\n// 禁止引用\n// variant<int&, double> v;  ❌ 不能有引用',
    },
    {
      type: 'type-it',
      instruction: 'variant 默认构造使用第一个类型：',
      code: '#include <iostream>\n#include <variant>\nusing namespace std;\n\nint main() {\n  variant<int, string> v;\n  cout << "index: " << v.index() << endl;\n  cout << "value: " << get<int>(v) << endl;\n}',
      hints: [
        '默认构造用第一个类型的默认值',
        'int 是第一个类型，默认值为 0',
        'index() 返回 0',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'std::visit 需要什么参数？',
      options: [
        { text: '一个可调用对象和一个 variant', correct: true, explanation: 'visit(visitor, variant) 是标准用法' },
        { text: '两个 variant', correct: false, explanation: '第一个参数是访问器' },
        { text: '一个类型索引', correct: false, explanation: 'visit 不需要索引' },
        { text: '一个字符串', correct: false, explanation: 'visit 需要可调用对象' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- `std::variant` 是类型安全的 union\n- 用 `get<T>()`、`get_if<T>()`、`index()` 安全访问\n- `std::visit` 是最优雅的处理方式\n- 替代 C union，消除"读错类型"的 bug',
    },
  ],
}

export default lesson
