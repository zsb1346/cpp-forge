import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'rvalue-reference',
    chapter: 11,
    title: '右值引用',
    subtitle: '绑定到临时对象',
    description: '学习 && 右值引用——它可以绑定到临时对象，是实现移动语义的基础。',
    objectives: ['能区分左值和右值', '能用 && 声明右值引用', '能理解右值引用的用途'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '移动语义的核心是**右值引用（rvalue reference）**——`&&`。\n它专门绑定到"即将销毁的临时对象"。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '先理解**左值**和**右值**：\n- **左值**：有名字、有地址、可以取地址\n- **右值**：临时的、没有名字、不能取地址',
    },
    {
      type: 'exposition',
      text: '例子：',
      code: 'int x = 10;   // x 是左值，10 是右值\nint y = x;     // y 和 x 都是左值\nint z = x + 5; // (x + 5) 是右值',
    },
    {
      type: 'concept-cards',
      instruction: '左值 vs 右值：',
      cards: [
        { glyph: '⬅️', term: '左值（lvalue）', meaning: '有名字，可取地址，能持久存在', example: 'int x; x' },
        { glyph: '➡️', term: '右值（rvalue）', meaning: '临时，没名字，不能取地址', example: '42; x + 5; func()' },
        { glyph: '🔗', term: '& 左值引用', meaning: '绑定到左值，不能绑右值', example: 'int& r = x;' },
        { glyph: '🔗🔗', term: '&& 右值引用', meaning: '绑定到右值，实现移动', example: 'int&& rr = 42;' },
      ],
    },
    {
      type: 'exposition',
      text: '`&&` 就是右值引用——它只能绑定到右值。',
      code: 'int&& rref = 42;      // ✅ 绑定到右值\nint x = 10;\nint&& rref2 = x + 5;  // ✅ x+5 是右值\n// int&& rref3 = x;   // ❌ x 是左值，绑定不了',
    },
    {
      type: 'exposition',
      text: '右值引用的作用：\n**告诉编译器"这个对象是临时的，可以偷它的资源"。**',
    },
    {
      type: 'exposition',
      text: '函数重载利用这个机制：',
      code: 'void process(const int& x) {  // 左值版本\n  cout << "左值: " << x << endl;\n}\n\nvoid process(int&& x) {       // 右值版本\n  cout << "右值: " << x << endl;\n}\n\nint a = 10;\nprocess(a);      // 调左值版本\nprocess(20);    // 调右值版本',
    },
    {
      type: 'concept-cards',
      instruction: '左右值引用的对比：',
      cards: [
        { glyph: '📌', term: 'const T&', meaning: '万能引用——左右值都能绑', example: 'const int&' },
        { glyph: '🎯', term: 'T&&', meaning: '只绑右值——临时对象专用', example: 'int&&' },
        { glyph: '🏷️', term: 'T&', meaning: '只绑左值——不能绑临时对象', example: 'int&' },
      ],
    },
    {
      type: 'exposition',
      text: '`std::move` 的作用：把左值**转成右值引用**。\n它不做任何实际工作——只是一个转型。',
      code: 'int x = 10;\n// std::move(x) 返回 int&&，可以偷 x 的资源',
    },
    {
      type: 'exposition',
      text: '注意：`std::move(x)` 之后，**不要再用 `x` 的值**。\n它的资源可能已经被偷走了。唯一安全的操作是销毁或重新赋值。',
    },
    {
      type: 'exposition',
      text: '判断左右值的一个实用方法：**能不能对表达式取地址？**\n- 能 → 左值\n- 不能 → 右值',
      code: 'int x = 10;\n&x;          // ✅ 可以，x 是左值\n&42;         // ❌ 不能取地址，42 是右值\n&(x + 5);    // ❌ 不能取地址，x+5 是右值',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是右值？',
      options: [
        { text: 'int x = 5; 中的 x', correct: false, explanation: 'x 是左值——有名字可取地址' },
        { text: 'func() 的返回值（非引用）', correct: true, explanation: '函数返回值（非引用）是临时对象，是右值' },
        { text: 'int* p = &x; 中的 p', correct: false, explanation: 'p 是左值' },
        { text: 'int& r = x; 中的 r', correct: false, explanation: 'r 是左值引用，本身是左值' },
      ],
    },
    {
      type: 'exposition',
      text: '右值引用在移动构造函数中作为参数类型：',
      code: 'class MyString {\n  char* data;\npublic:\n  // 拷贝构造（左值版本）\n  MyString(const MyString& other) { ... }\n  \n  // 移动构造（右值版本）\n  MyString(MyString&& other) noexcept {\n    data = other.data;    // 偷指针\n    other.data = nullptr; // 置空原对象\n  }\n};',
    },
    {
      type: 'exposition',
      text: '当传进来的是右值时，编译器优先调用移动构造（而不是拷贝构造）。\n这就是移动语义的实现基础。',
    },
    {
      type: 'exposition',
      text: '记住规则：\n- 左值：有名字、持久\n- 右值：临时、即将销毁\n- `&&` 绑定右值，让移动语义成为可能\n- `std::move` 把左值变成右值引用（但小心使用）',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：移动语义解决了什么问题？',
      options: [
        { text: '代码太长的问题', correct: false, explanation: '和代码长度无关' },
        { text: '大对象拷贝开销大的问题', correct: true, explanation: '移动偷资源避免深拷贝' },
        { text: '指针空悬的问题', correct: false, explanation: '那是悬空指针问题' },
        { text: '内存泄漏的问题', correct: false, explanation: '移动语义主要关注性能' },
      ],
    },
    {
      type: 'exposition',
      text: '下一个重要概念：**转发引用（forwarding reference）**。\n在模板中 `T&&` 可以绑定到左值和右值——这是另一个话题了。',
    },
    {
      type: 'exposition',
      text: '现阶段你只需要记住：\n- `&&` 声明右值引用\n- 右值引用绑定到临时对象\n- 它是实现移动语义的语言基础\n- `std::move` 将左值转为右值引用',
    },
    {
      type: 'exposition',
      text: '下一课把右值引用用起来——实现移动构造函数。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
