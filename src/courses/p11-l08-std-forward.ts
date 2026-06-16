import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'std-forward',
    chapter: 12,
    title: 'std::forward',
    subtitle: '保持左右值属性',
    description: '用 forward 保持参数原有的左右值属性，实现完美转发。',
    objectives: ['能使用 std::forward 转发参数', '能理解 forward 和 move 的区别', '能实现完美转发的函数模板'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '`std::forward` 是完美转发的关键——\n**它根据模板参数 T 决定返回左值引用还是右值引用**。\n传左值时返回左值引用，传右值时返回右值引用。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '基本用法：',
      code: 'template<typename T>\nvoid wrapper(T&& x) {\n  process(std::forward<T>(x));  // 保持 x 的左右值属性\n}\n\nint a = 10;\nwrapper(a);   // forward<T>(x) → int&  → process(int&)\nwrapper(20);  // forward<T>(x) → int&& → process(int&&)',
    },
    {
      type: 'exposition',
      text: '`std::forward` 和 `std::move` 的对比：',
      code: '// move：无条件转为右值\nstring b = std::move(a);\n\n// forward：根据 T 决定（有条件）\ntemplate<typename T>\nvoid wrapper(T&& x) {\n  process(std::forward<T>(x));  // 保持原属性\n}',
    },
    {
      type: 'concept-cards',
      instruction: 'move vs forward：',
      cards: [
        { glyph: '🏃', term: 'std::move', meaning: '无条件把参数变成右值引用', example: 'move(x) → T&&' },
        { glyph: '🎯', term: 'std::forward', meaning: '根据 T 决定返回左值还是右值', example: 'forward<T>(x)' },
        { glyph: '🔑', term: '典型场景', meaning: 'move 用于移动语义，forward 用于转发', example: '各司其职' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 forward 实现完美转发：',
      code: 'template<typename T>\nvoid wrapper(T&& x) {\n  process(std::forward<T>(x));\n}',
      hints: ['T&& 是转发引用，左右值都能接', 'forward<T> 保持 x 的左右值属性', '和 move 不同，forward 有条件地转型'],
    },
    {
      type: 'exposition',
      text: '`std::forward` 的实现原理（简化）：',
      code: 'template<typename T>\nT&& forward(remove_reference_t<T>& x) noexcept {\n  return static_cast<T&&>(x);\n}\n\n// 当 T = int&  → forward 返回 int& (左值引用)\n// 当 T = int   → forward 返回 int&& (右值引用)',
    },
    {
      type: 'exposition',
      text: '完美转发的完整流程演示：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid process(int& x)  { cout << "左值: " << x << "\\n"; }\nvoid process(int&& x) { cout << "右值: " << x << "\\n"; }\n\ntemplate<typename T>\nvoid relay(T&& x) {\n  process(std::forward<T>(x));\n}\n\nint main() {\n  int a = 10;\n  relay(a);   // 左值: 10\n  relay(20);  // 右值: 20\n}',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：下面的代码中 x 是什么引用类型？\n`template<typename T> void func(T&& x)`',
      options: [
        { text: '右值引用，只能绑右值', correct: false, explanation: '模板中的 T&& 不是普通右值引用' },
        { text: '转发引用，左右值都能绑', correct: true, explanation: '模板推导中的 T&& 是转发引用' },
        { text: '左值引用，只能绑左值', correct: false, explanation: 'T&& 不是 T&' },
        { text: '万能引用，const 也可绑', correct: false, explanation: '它确实也叫万能引用，但正确术语是转发引用' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个完美转发的工厂函数：',
      code: 'template<typename T, typename Arg>\nT create(Arg&& arg) {\n  return T(std::forward<Arg>(arg));\n}',
      hints: ['Arg&& 是转发引用', 'forward<Arg> 保持左右值属性', '用于工厂函数模式'],
    },
    {
      type: 'exposition',
      text: '完美转发的实际应用场景：\n1. **工厂函数**（make_shared, make_unique）\n2. **包装器**（emplace_back）\n3. **代理模式**（将参数原样传到内部函数）',
    },
    {
      type: 'exposition',
      text: '`emplace_back` 内部就是用完美转发：',
      code: 'template<typename... Args>\nvoid vector::emplace_back(Args&&... args) {\n  // 用 forward 保持每个参数的属性\n  new (buffer) T(std::forward<Args>(args)...);\n}',
    },
    {
      type: 'multiple-choice',
      question: '`std::forward<T>(x)` 和 `std::move(x)` 的根本区别是什么？',
      options: [
        { text: '没有区别，只是名字不同', correct: false, explanation: '两者的行为有本质区别' },
        { text: 'move 无条件转右值，forward 根据 T 决定', correct: true, explanation: 'forward 有条件地保持原属性' },
        { text: 'forward 更高效', correct: false, explanation: '两者都是编译期零开销' },
        { text: 'move 只能用于左值', correct: false, explanation: 'move 可以用于任何值' },
      ],
    },
    {
      type: 'exposition',
      text: '`std::forward` 使用规则：\n- 参数必须是转发引用 `T&&`（模板推导）\n- 必须显式指定模板参数 `forward<T>`\n- 不要对 non-reference 类型用 forward',
    },
    {
      type: 'exposition',
      text: '记住：**move 用于"我想移动"，forward 用于"我想转发"。**\n前者是主动操作，后者是保持现状。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '一个容易犯的错误：\n**对非模板参数用了 `std::forward`**。\n如果参数不是转发引用（如 `int&& x`），`forward` 和 `move` 效果一样，\n但语义不对。',
      code: 'void consume(int&& x) {\n  // ❌ x 是右值引用，但不是转发引用\n  other(std::forward<int>(x));  // 等价于 move(x)\n}',
    },
    {
      type: 'exposition',
      text: '`std::forward` 使用场景总结：\n1. 模板函数中转发参数\n2. 工厂函数中保持参数属性\n3. 容器 emplace 方法内部\n4. 代理/装饰模式中',
    },
    {
      type: 'exposition',
      text: '`std::forward` 和引用折叠的关系：\n`forward` 的实现 `static_cast<T&&>(x)` 中，\n`T&&` 的展开正是利用引用折叠规则来得到准确的引用类型。',
    },
    {
      type: 'exposition',
      text: '`std::forward` 的终极记忆法：\n**forward = 根据 T 做有条件 move**。\nT 是左值引用 → forward 返回左值引用（什么都不做）\nT 是值类型 → forward 返回右值引用（相当于 move）',
    },
  ],
}

export default lesson
