import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'perfect-forwarding-motivation',
    chapter: 12,
    title: '完美转发动机',
    subtitle: '传递时丢失左右值',
    description: '模板函数想转发参数给另一个函数，但传递过程中丢失了左右值信息。',
    objectives: ['能理解参数传递时左右值信息丢失的问题', '能看出普通转发的问题所在', '能描述完美转发的需求场景'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '假设有一个包装函数，它接收参数后传给另一个函数——\n问题是：**参数在传递过程中会丢失左右值信息**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '用具体例子感受问题：',
      code: 'void process(int& x)  { cout << "左值\\n"; }\nvoid process(int&& x) { cout << "右值\\n"; }\n\ntemplate<typename T>\nvoid wrapper(T x) {\n  process(x);  // x 是左值还是右值？\n}',
    },
    {
      type: 'exposition',
      text: '调用 `wrapper(42)`，传进去的是右值 `42`。\n但 `wrapper` 内部，参数 `x` 是**一个有名字的变量**——所以 `x` 是**左值**！\n传给 `process(x)` 时始终调用左值版本。',
      code: 'wrapper(42);  // 传递右值\n// 内部 x 是左值 → 永远调左值版本 process(int&)',
    },
    {
      type: 'exposition',
      text: '这就是核心问题：**右值经过传参后变成了左值**。\n左右值属性丢失了。',
    },
    {
      type: 'concept-cards',
      instruction: '参数传递中的左右值变化：',
      cards: [
        { glyph: '➡️', term: '传入右值', meaning: '调用方传了右值，如 42', example: 'wrapper(42)' },
        { glyph: '⬅️', term: '内部变左值', meaning: '函数参数有名字，是左值', example: 'void wrapper(T x) { }' },
        { glyph: '❌', term: '转发失右值', meaning: '再转发时永远是左值', example: 'process(x) 调左值版' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '给定 `template<typename T> void wrap(T x) { process(x); }`，\n调用 `wrap(42)` 时 process 会调哪个版本？',
      options: [
        { text: 'process(int&&) 右值版本', correct: false, explanation: 'x 是参数名，在函数内部是左值' },
        { text: 'process(int&) 左值版本', correct: true, explanation: 'x 有名字，是左值，即使传入的是右值' },
        { text: '编译错误', correct: false, explanation: '代码是合法的' },
        { text: '运行时崩溃', correct: false, explanation: '只会走左值版本' },
      ],
    },
    {
      type: 'exposition',
      text: '一个实际场景：\n工厂函数 `make_shared` 需要把参数完美转发给构造函数。\n如果左右值丢失，移动构造就触发不了，导致不必要的拷贝。',
      code: 'template<typename T, typename Arg>\nshared_ptr<T> make_shared(Arg arg) {\n  return shared_ptr<T>(new T(arg));  // arg 永远是左值\n  // 即使传入的是右值，这里也走拷贝构造\n}',
    },
    {
      type: 'exposition',
      text: '用传引用的方式也不行：',
      code: '// 用左值引用\nvoid wrapper(int& x) { process(x); }\n// ❌ wrapper(42) 编译失败，int& 不能绑右值\n\n// 用 const 引用\nvoid wrapper(const int& x) { process(x); }\n// ❌ process 的左右值重载无法区分了',
    },
    {
      type: 'exposition',
      text: '传 `const T&` 虽然左右值都能绑，\n但 `process(x)` 只能调 `const int&` 版，\n右值版本无法触发。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：下面代码的输出是？\n`string a = "hello"; string b = move(a);`',
      options: [
        { text: 'b 是 "hello", a 是 "hello"', correct: false, explanation: '移动后 a 被置空或无效' },
        { text: 'b 是 "hello", a 是空', correct: true, explanation: '移动构造偷走了 a 的资源，a 被置空' },
        { text: '编译错误', correct: false, explanation: '这是合法的移动操作' },
        { text: '运行时崩溃', correct: false, explanation: 'std::move 是安全的转型' },
      ],
    },
    {
      type: 'exposition',
      text: '**完美转发**要解决的就是这个问题：\n保持参数原有的左右值属性，原样转发给下一个函数。\nC++11 通过**转发引用** + **std::forward** 来解决。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '解决思路：\n1. 用 `T&&` 作为参数（不是右值引用，而是**转发引用**）\n2. 内部用 `std::forward<T>(x)` 保持原属性\n3. 传右值时转发为右值，传左值时转发为左值',
    },
    {
      type: 'exposition',
      text: '目标效果：',
      code: 'template<typename T>\nvoid wrapper(T&& x) {           // 转发引用\n  process(std::forward<T>(x));  // 保持原样转发\n}\n\nint a = 10;\nwrapper(a);   // process(int&)  — 左值\nwrapper(20);  // process(int&&) — 右值',
    },
    {
      type: 'exposition',
      text: '下一课详细讲解 `T&&` 在模板中的特殊含义——**转发引用**。\n它是完美转发的技术基础。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '具体例子：`make_unique` 为什么要用完美转发？',
      code: 'template<typename T, typename... Args>\nunique_ptr<T> make_unique(Args&&... args) {\n  return unique_ptr<T>(new T(std::forward<Args>(args)...));\n}\n// 如果不转发，右值参数会变成左值，触发拷贝而不是移动',
    },
    {
      type: 'exposition',
      text: '可以自己尝试这个问题：\n如果不用完美转发，传右值字符串给 unique_ptr<string> 会多一次拷贝。\n——这就是"丢失左右值"的代价。',
    },
    {
      type: 'exposition',
      text: '思考题：如果没有完美转发，标准库的 `emplace_back` 会有什么问题？\n答：传右值时只能拷贝构造，丧失移动语义带来的性能优势。',
    },
    {
      type: 'exposition',
      text: '总结：\n- 普通传参让右值退化为左值\n- 传引用也无法完美转发\n- 完美转发的目标是**保持左右值属性不变**\n- 转发引用 + std::forward 是解决方案',
    },
  ],
}

export default lesson
