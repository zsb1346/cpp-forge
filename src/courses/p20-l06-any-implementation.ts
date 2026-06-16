import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'any-implementation',
    chapter: 21,
    title: 'any 实现思想',
    subtitle: '存值不存调用',
    description: '学习 std::any 如何存储任意类型的值——与 function 类似但只存值、不存调用签名。',
    objectives: ['能说出 any 和 function 的核心区别', '能理解 any 内部使用 Type Erasure 的实现', '能实现一个简化版 any'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`std::any` 是 C++17 引入的类型。\n它可以存储**任意类型**的值——整数、字符串、自定义类型……\n和 `std::function` 类似，它也使用 Type Erasure。\n但区别是：**any 只存值，不存调用签名**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '对比一下：\n`std::function<int(int)>` 要求所有存储的对象都支持"以 int 为参数、返回 int"的调用。\n`std::any` 没有任何调用要求——它只管"存进去、取出来"。\n\n所以 `any` 的 Concept 基类只需要：析构、克隆（供拷贝用）。\n不需要 `invoke` 函数。',
      code: '#include <any>\n\nstd::any a;\na = 42;          // 存 int\na = 3.14;       // 存 double\na = std::string("hello");  // 存 string\n// any 不关心你能不能"调用"它',
    },
    {
      type: 'concept-cards',
      instruction: 'any 和 function 的核心区别：',
      cards: [
        { glyph: '📞', term: 'function 存"调用"', meaning: '存可调用对象，需要 invoke 接口', example: 'int(int) 签名' },
        { glyph: '📦', term: 'any 存"值"', meaning: '只存储值，不需要调用接口', example: 'int / string / 任意类型' },
        { glyph: '🎯', term: 'any_cast 取出', meaning: '取回值时必须指定原始类型', example: 'any_cast<int>(a)' },
      ],
    },
    {
      type: 'exposition',
      text: '**any 的简化实现**：\n和 function 一样使用 Concept / Model 模式：\n\n- `Concept` 基类：虚析构、虚 clone\n- `Model<T>` 派生类：存储实际值\n- `Handler` 层：提供类型信息用于 `any_cast`',
      code: 'class any {\n  struct Concept {\n    virtual ~Concept() = default;\n    virtual Concept* clone() const = 0;\n  };\n\n  template<typename T>\n  struct Model : Concept {\n    T value;\n    Model(T v) : value(std::move(v)) {}\n    Concept* clone() const override { return new Model(*this); }\n  };\n\n  Concept* ptr;\npublic:\n  template<typename T>\n  any(T&& v) : ptr(new Model<std::decay_t<T>>(std::forward<T>(v))) {}\n  // ... 拷贝、析构、any_cast\n};',
    },
    {
      type: 'multiple-choice',
      question: 'std::any 和 std::function 的共同点是什么？',
      options: [
        { text: '都用 Type Erasure 隐藏具体类型', correct: true, explanation: '两者都使用 Concept/Model 模式做类型擦除' },
        { text: '都要求存储的对象可调用', correct: false, explanation: 'any 不要求可调用，function 才要求' },
        { text: '都只能存储基本类型', correct: false, explanation: '两者都可以存储任意类型' },
        { text: '都不支持拷贝', correct: false, explanation: '两者都支持拷贝' },
      ],
    },
    {
      type: 'exposition',
      text: '**any 的关键操作**：\n\n* `any a = value;` — 存储值\n* `any_cast<T>(a)` — 取出值（类型不匹配抛 `bad_any_cast`）\n* `a.has_value()` — 是否存有值\n* `a.type()` — 获取存储值的 `type_info`',
      code: 'std::any a = 42;\n\nif (a.has_value()) {\n  try {\n    int v = std::any_cast<int>(a);\n    cout << v;  // 42\n  } catch (const std::bad_any_cast& e) {\n    cout << "类型不匹配";\n  }\n}',
    },
    {
      type: 'multiple-choice',
      question: '从 std::any 中取出值时需要什么？',
      options: [
        { text: '直接赋值，如 int v = a;', correct: false, explanation: '不能隐式转换，必须用 any_cast' },
        { text: '用 std::any_cast<T>(a) 并指定 T', correct: true, explanation: 'any_cast 检查类型是否匹配' },
        { text: '用 a.get<int>() 方法', correct: false, explanation: 'any 没有 get 方法' },
        { text: '用 reinterpret_cast', correct: false, explanation: 'any_cast 内部做类型检查，reinterpret_cast 不安全' },
      ],
    },
    {
      type: 'exposition',
      text: '**SBO 在 any 中同样重要**。\n和 function 一样，`std::any` 也使用小对象优化。\n很多标准库实现中，`any` 的缓冲区比 function 稍大，\n因为常见的值类型（int, double, string）需要更多空间。',
    },
    {
      type: 'type-it',
      instruction: '输入一个演示 any 存储和取回不同类型值的例子：',
      code: '#include <any>\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  any a;\n  a = 42;\n  cout << any_cast<int>(a) << " ";\n  a = string("hello");\n  cout << any_cast<string>(a) << " ";\n  a = 3.14;\n  cout << any_cast<double>(a) << "\\n";\n}',
      hints: [
        '同一个 any 变量可以存储不同类型的值',
        '取回时必须用 any_cast<T> 并指定准确的类型',
        '类型不匹配会抛 bad_any_cast 异常',
      ],
    },
    {
      type: 'exposition',
      text: '**any_cast 的实现原理**：\n\n1. 检查 `a.type() == typeid(T)`\n2. 如果匹配，返回 `*static_cast<T*>(内部指针)`\n3. 如果不匹配，抛出 `bad_any_cast`\n\n所以 `any` 内部必须保存一个 `std::type_info` 引用（或类似的东西），\n用于运行时类型检查。',
      code: 'template<typename T>\nT any_cast(const any& a) {\n  if (a.type() != typeid(T)) {\n    throw bad_any_cast();\n  }\n  return *static_cast<const T*>(a.data());\n}',
    },
    {
      type: 'multiple-choice',
      question: '回顾阶段 15：`typeid` 返回的是什么？',
      options: [
        { text: '类型的大小', correct: false, explanation: 'typeid 返回 type_info，不是大小' },
        { text: 'const std::type_info&', correct: true, explanation: 'typeid 返回一个 type_info 对象的引用' },
        { text: '类型的内存地址', correct: false, explanation: 'typeid 不返回地址' },
        { text: '类型的名称字符串', correct: false, explanation: 'type_info::name() 返回名称，但 typeid 本身返回 type_info' },
      ],
    },
    {
      type: 'exposition',
      text: '**any 的局限性**：\n- 取回值必须知道准确类型（和原始类型一致，不能是基类或派生类）\n- 运行时类型检查有开销\n- 在 C++17 之前，常用 `void*` + 手工类型标记（不安全）\n\nC++17 的 `std::any` 提供了**类型安全的**类型擦除。',
    },
    {
      type: 'type-it',
      instruction: '输入一个演示 any 类型检查的例子：',
      code: '#include <any>\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n  any a = 42;\n  \n  if (a.type() == typeid(int)) {\n    cout << "存的是 int: " << any_cast<int>(a) << "\\n";\n  } else if (a.type() == typeid(string)) {\n    cout << "存的是 string\\n";\n  }\n}',
      hints: [
        'a.type() 返回 type_info，可以比较类型',
        '用 typeid(T) 和 a.type() 比较来判断存储类型',
        '这是 any_cast 内部安全的保障',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种场景最适合用 std::any？',
      options: [
        { text: '需要高性能的数值计算', correct: false, explanation: 'any 有运行时开销，不适合性能关键场景' },
        { text: '需要在一个容器中存储不同类型的值', correct: true, explanation: 'any 允许在运行时动态改变存储类型' },
        { text: '需要在编译期确定类型', correct: false, explanation: '编译期确定类型用模板就好，不需要 any' },
        { text: '需要调用对象的成员函数', correct: false, explanation: 'any 不提供成员函数调用，function 更合适' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- `std::any` 和 `std::function` 都基于 Type Erasure\n- `any` 不关心"调用"，只关心"存储"和"类型安全取回"\n- 内部使用 Concept/Model + SBO + type_info\n- Type Erasure 的三种主要应用：`function`（存调用）、`any`（存值）、`shared_ptr`（存删除器）',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课是练习课——通过多个选择题和概念卡，巩固 Type Erasure 的核心理解。',
    },
  ],
}

export default lesson
