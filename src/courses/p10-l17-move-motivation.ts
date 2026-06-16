import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'move-motivation',
    chapter: 11,
    title: '为什么需要移动语义',
    subtitle: '拷贝太贵了',
    description: '大对象拷贝开销大，移动语义允许"偷"资源而非复制，大幅提高性能。',
    objectives: ['能理解拷贝大对象的开销', '能说出移动语义要解决的问题', '能区分拷贝和移动的差异'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '拷贝语义很好——但**太贵了**。\n当对象很大时，深拷贝就是一场灾难。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '想象一个存着 100 万个 int 的 `vector`：\n拷贝它 = 分配新数组 + 复制 100 万个整数。\n很慢、很吃内存。',
    },
    {
      type: 'exposition',
      text: '看这个场景：',
      code: 'vector<int> createBig() {\n  vector<int> v(1000000);\n  // ... 填充数据 ...\n  return v;\n}\n\nint main() {\n  vector<int> data = createBig();  // 拷贝？\n}',
    },
    {
      type: 'exposition',
      text: '`createBig()` 返回一个巨大的 `vector`。\n如果每次返回都拷贝——时间和内存都浪费了。\n因为原来的 `v` 在函数结束时马上销毁。',
    },
    {
      type: 'exposition',
      text: '关键洞察：**临时对象马上要被销毁，为什么不把它的资源"偷"过来？**\n- 不用分配新内存\n- 不用复制数据\n- 把原对象的指针拿过来，把原对象置空',
    },
    {
      type: 'exposition',
      text: '这就是**移动语义**的动机：\n当一个对象即将销毁时，不要拷贝它——**移动**它。',
      code: '// 拷贝：深复制所有数据 (慢)\nvector<int> b = a;\n\n// 移动：偷走 a 的资源 (快)\nvector<int> c = std::move(a);',
    },
    {
      type: 'exposition',
      text: '`std::move` 把 `a` 标记为"可移动的右值"。\n然后移动构造函数就会"偷"走 `a` 的内部指针，而不是复制数据。',
    },
    {
      type: 'exposition',
      text: '拷贝 vs 移动的代价对比：',
      code: '// 大 vector\nvector<int> big(1000000);\n\n// 拷贝：O(n) 时间 + O(n) 内存\nauto copy = big;\n\n// 移动：O(1) 时间 + 0 额外内存\nauto moved = std::move(big);',
    },
    {
      type: 'multiple-choice',
      question: '为什么要移动语义而不是只用拷贝？',
      options: [
        { text: '拷贝总是很慢', correct: false, explanation: '小对象拷贝还行，但大对象拷贝太贵' },
        { text: '大对象拷贝开销大，移动可以偷资源', correct: true, explanation: '移动只转移指针，不复制数据' },
        { text: '拷贝是 C 语言风格的，C++ 应该用移动', correct: false, explanation: '拷贝仍然重要，只是有些场景更适合移动' },
        { text: '拷贝不安全，移动安全', correct: false, explanation: '两者都安全，场景不同' },
      ],
    },
    {
      type: 'exposition',
      text: '什么时候资源可以"偷"？\n- 对象是**临时对象**（即将销毁）\n- 你**明确表示**不再需要原对象的值（使用 `std::move`）',
    },
    {
      type: 'exposition',
      text: '函数返回值是最自然的使用场景：',
      code: 'vector<int> makeVector() {\n  vector<int> v = {1, 2, 3, 4, 5};\n  return v;  // 编译器自动用移动\n}\n\nvector<int> result = makeVector();\n// 没有拷贝！内部指针直接转移',
    },
    {
      type: 'exposition',
      text: '编译器对这种场景有优化——叫 **RVO / NRVO**（返回值优化）。\n但即使没有优化，移动也比拷贝快得多。',
    },
    {
      type: 'exposition',
      text: '另一个场景：`std::vector` 扩容时。\n当 `vector` 空间不够，需要搬到一个更大的数组：\n- 旧方式：拷贝所有元素（贵）\n- C++11 后：移动所有元素（便宜）',
    },
    {
      type: 'exposition',
      text: '移动语义对**资源管理类**特别有用：\n- `vector`、`string`、`unique_ptr`\n- 自己写的 RAII 类也可以支持移动',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：RAII 类管理资源时需要遵守什么规则？',
      options: [
        { text: 'Rule of One', correct: false, explanation: '没有 Rule of One' },
        { text: 'Rule of Three', correct: true, explanation: '有资源管理的类需要析构+拷贝构造+拷贝赋值' },
        { text: 'Rule of Zero', correct: false, explanation: '最好用标准库组件实现 Rule of Zero，但这里还在用裸指针' },
        { text: '不需要任何规则', correct: false, explanation: '资源管理类必须遵守规则' },
      ],
    },
    {
      type: 'exposition',
      text: '移动语义的核心价值：\n**把"复制数据"变成"转移所有权"。**\n- 不需要新分配内存\n- 不需要复制数据\n- 只需要复制指针并置空原对象',
    },
    {
      type: 'exposition',
      text: '换个角度想：\n假设你有一辆旧车要报废了，朋友说"我想要你的引擎"。\n你是花钱造一个新引擎给他，还是直接把你的拆给他？\n移动语义就是"拆给他"——偷资源而不是复制。',
    },
    {
      type: 'exposition',
      text: '记住：\n- 拷贝适合"我还要用原对象"的场景\n- 移动适合"原对象马上销毁"的场景\n- 移动比拷贝快得多\n- 接下来学如何实现移动——右值引用和移动构造函数',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
