import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'any',
    chapter: 16,
    title: 'any 任意类型',
    subtitle: '装任何类型',
    description: '学习用 std::any 存储任意可拷贝类型，理解极少数需要它的场景。',
    objectives: ['能用 std::any 存储任意类型', '能用 any_cast 安全取出值', '理解 any 的性能代价和适用场景'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`std::any` 是 C++17 引入的"万能容器"：\n能**存放任何可拷贝的类型**（几乎任何类型）。\n但它不是用来替代模板或 variant 的——\n它只在极少数类型完全未知的场景下使用。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`any` 和 `variant` 的区别：\n- `variant<int, double>` 明确说"只能存 int 或 double"\n- `any` 说"我什么都能存"——但失去了编译期类型检查\n- **优先用 variant，只在无法枚举所有类型时用 any**',
      code: '#include <any>\n\nstd::any a;\n\na = 42;                    // 存 int\na = 3.14;                 // 存 double\na = std::string("hello"); // 存 string\na = std::vector<int>{1,2,3}; // 存 vector',
    },
    {
      type: 'type-it',
      instruction: '用 any 存储不同类型的值：',
      code: '#include <iostream>\n#include <any>\n#include <string>\nusing namespace std;\n\nint main() {\n  any a = 42;\n  cout << any_cast<int>(a) << endl;\n  \n  a = string("hello");\n  cout << any_cast<string>(a) << endl;\n}',
      hints: [
        'any_cast<T>(a) 取出 T 类型的值',
        '如果类型不匹配，抛 bad_any_cast 异常',
        'any 可以反复存储不同类型',
      ],
    },
    {
      type: 'exposition',
      text: '`std::any` 的关键操作：\n| 操作 | 说明 |\n|------|------|\n| `a.has_value()` | 检查是否包含值 |\n| `a.type()` | 返回 `std::type_info`，检查当前类型 |\n| `any_cast<T>(a)` | 获取 T 类型值，类型不匹配抛异常 |\n| `any_cast<T>(&a)` | 返回 T* 指针，不匹配返回 nullptr |\n| `a.reset()` | 清空 any |',
      code: 'std::any a = 42;\n\nif (a.has_value()) {\n  cout << a.type().name();  // 输出类型名（实现定义）\n}\n\nif (a.type() == typeid(int)) {\n  cout << any_cast<int>(a);  // 安全：先检查类型\n}\n\n// 或使用指针版本（不抛异常）\nif (int* p = any_cast<int>(&a)) {\n  cout << *p;\n}',
    },
    {
      type: 'type-it',
      instruction: '安全地检查 any 中的类型：',
      code: '#include <iostream>\n#include <any>\n#include <string>\nusing namespace std;\n\nint main() {\n  any a = 3.14;\n  \n  if (a.type() == typeid(int)) {\n    cout << "int: " << any_cast<int>(a) << endl;\n  } else if (a.type() == typeid(double)) {\n    cout << "double: " << any_cast<double>(a) << endl;\n  } else if (a.type() == typeid(string)) {\n    cout << "string: " << any_cast<string>(a) << endl;\n  }\n}',
      hints: [
        'a.type() 返回 type_info 对象',
        'typeid(T) 获取 T 的 type_info',
        '先检查类型再 any_cast 更安全',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p15-10：variant 和 any 的主要区别是什么？',
      options: [
        { text: 'variant 列出所有可能类型，any 能存任何类型', correct: true, explanation: 'variant 编译期确定类型集合，any 运行时任意' },
        { text: 'any 需要头文件，variant 不需要', correct: false, explanation: '两者都需要头文件' },
        { text: 'any 是编译期安全的', correct: false, explanation: 'any 在编译期不知道类型，不算是类型安全的' },
        { text: 'variant 存的值更少', correct: false, explanation: 'variant 效率更高' },
      ],
    },
    {
      type: 'exposition',
      text: '`any_cast` 的指针版本不会抛异常：\n`any_cast<T>(&a)` 返回 `T*`，\n如果类型不匹配就返回 `nullptr`，\n这是更安全的访问方式。',
      code: 'std::any a = 42;\n\n// ❌ 抛异常版本\ntry {\n  double d = any_cast<double>(a);\n} catch (const bad_any_cast& e) {\n  cout << e.what();\n}\n\n// ✅ 不抛异常版本\nif (double* dp = any_cast<double>(&a)) {\n  cout << *dp;\n} else {\n  cout << "不是 double 类型";\n}',
    },
    {
      type: 'type-it',
      instruction: '用指针版本的 any_cast 安全取值：',
      code: '#include <iostream>\n#include <any>\n#include <string>\nusing namespace std;\n\nint main() {\n  any a = string("C++ any");\n  \n  if (auto* p = any_cast<string>(&a)) {\n    cout << *p << endl;\n  }\n  \n  if (auto* p = any_cast<int>(&a)) {\n    cout << *p << endl;\n  } else {\n    cout << "不是 int 类型" << endl;\n  }\n}',
      hints: [
        'any_cast<string>(&a) 返回 string*',
        '类型不匹配时返回 nullptr',
        '不需要 try-catch',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p13-17：STL 容器中哪个是"默认首选"的序列容器？',
      options: [
        { text: 'list', correct: false, explanation: 'list 只在中间插入频繁时用' },
        { text: 'vector', correct: true, explanation: 'vector 是大多数场景的默认选择' },
        { text: 'deque', correct: false, explanation: 'deque 适合头尾操作的特殊场景' },
        { text: 'map', correct: false, explanation: 'map 是关联容器，不是序列容器' },
      ],
    },
    {
      type: 'exposition',
      text: '`any` 的实际应用场景（确实极少）：\n1. 插件系统——加载的插件类型未知\n2. 属性系统——对象的任意属性值\n3. 序列化——反序列化时类型不确定\n4. 类型擦除——实现类似 `std::function` 的机制',
      code: '// 属性系统的例子\nstruct Property {\n  string name;\n  any value;\n};\n\nvector<Property> props;\nprops.push_back({"age", 25});\nprops.push_back({"name", string("Alice")});\nprops.push_back({"salary", 5000.0});\n\n// 使用时需要根据 name 做不同的 any_cast',
    },
    {
      type: 'type-it',
      instruction: '用 any 实现简单的属性系统：',
      code: '#include <iostream>\n#include <any>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<pair<string, any>> config;\n  config.push_back({"version", 1});\n  config.push_back({"debug", true});\n  config.push_back({"name", string("myapp")});\n  \n  for (const auto& [key, val] : config) {\n    cout << key << ": ";\n    if (val.type() == typeid(int)) {\n      cout << any_cast<int>(val);\n    } else if (val.type() == typeid(bool)) {\n      cout << boolalpha << any_cast<bool>(val);\n    } else if (val.type() == typeid(string)) {\n      cout << any_cast<string>(val);\n    }\n    cout << endl;\n  }\n}',
      hints: [
        'config 存任意类型的配置项',
        '用 type() 检查类型，再 any_cast',
        '结构化绑定 [key, val] 遍历',
      ],
    },
    {
      type: 'exposition',
      text: '`any` 的开销：\n1. **堆分配**——大对象会分配在堆上\n2. **类型擦除**——运行时动态分发\n3. **没有编译期检查**——类型错误在运行时暴露\n\n**所以：能用 variant 就不要用 any。**',
      code: '// any 的性能特征\nany a = 42;       // 小对象优化，可能无堆分配\nany b = BigObject();  // 大对象会有堆分配\n\n// variant 始终在栈上\nvariant<int, double, BigObject> v;  // 栈上分配',
    },
    {
      type: 'type-it',
      instruction: '观察 any 的 has_value 和 reset：',
      code: '#include <iostream>\n#include <any>\nusing namespace std;\n\nint main() {\n  any a = 42;\n  cout << "has_value: " << a.has_value() << endl;\n  \n  a.reset();\n  cout << "after reset: " << a.has_value() << endl;\n  \n  a = 3.14;\n  cout << "after assign: " << a.has_value() << endl;\n  cout << any_cast<double>(a) << endl;\n}',
      hints: [
        'has_value() 检查 any 是否包含值',
        'reset() 清空 any 中的值',
        '重新赋值后 has_value() 恢复 true',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'any_cast<int>(&a) 返回值类型是什么？',
      options: [
        { text: 'int', correct: false, explanation: '返回 int*，不是 int' },
        { text: 'int*', correct: true, explanation: '指针版本的 any_cast 返回 T*' },
        { text: 'bool', correct: false, explanation: '返回指针，不是 bool' },
        { text: 'any', correct: false, explanation: '返回类型指针' },
      ],
    },
    {
      type: 'exposition',
      text: '`any` 和 `variant` 的选择策略：\n| 场景 | 用哪个 |\n|------|--------|\n| 类型集合已知且有限 | `variant` ✅ |\n| 类型完全未知 | `any` |\n| 需要高性能 | `variant` ✅ |\n| 存储任意用户类型 | `any` |\n\n**记住：any 是最后的选择。**',
    },
    {
      type: 'multiple-choice',
      question: '以下哪一个是 std::any 的正确使用场景？',
      options: [
        { text: '函数返回 int 或 double', correct: false, explanation: '这种情况用 variant<int, double> 更好' },
        { text: '插件系统加载未知类型的配置', correct: true, explanation: '类型完全未知时 any 是合理的选择' },
        { text: '代替模板', correct: false, explanation: '模板是编译期多态，any 是运行时，不可替代' },
        { text: '存储 class 成员变量', correct: false, explanation: '成员变量应该用具体类型' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 any 存储自定义类型：',
      code: '#include <iostream>\n#include <any>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Point {\n  int x;\n  int y;\n};\n\nint main() {\n  any a = Point{10, 20};\n  \n  if (a.type() == typeid(Point)) {\n    Point p = any_cast<Point>(a);\n    cout << "Point(" << p.x << ", " << p.y << ")" << endl;\n  }\n  \n  a = vector<int>{1, 2, 3};\n  if (auto* v = any_cast<vector<int>>(&a)) {\n    cout << "vector size: " << v->size() << endl;\n  }\n}',
      hints: [
        'any 可以存自定义结构体',
        '检查 type() 确保类型匹配再 any_cast',
        '指针版本 any_cast 不抛异常',
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- `std::any` 可以存任何可拷贝类型\n- 用 `any_cast<T>(a)` 或 `any_cast<T>(&a)` 安全访问\n- 有堆分配和运行时开销\n- **优先用 variant，any 只做最后手段**\n- 需要 `<any>` 头文件，C++17 起可用',
    },
  ],
}

export default lesson
