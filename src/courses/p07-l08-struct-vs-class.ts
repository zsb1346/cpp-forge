import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'struct-vs-class',
    chapter: 8,
    title: 'struct vs class',
    subtitle: '默认权限不同',
    description: '辨析 struct 和 class 的唯一区别：默认访问权限。',
    objectives: ['能说出 struct 和 class 的区别', '能根据场景选择用 struct 还是 class'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在 C++ 中，`struct` 和 `class` **几乎一样**——唯一的区别是**默认访问权限**。',
      code: 'struct Hero {        // 默认 public\n  string name;\n  int hp;\n};\n\nclass Hero2 {         // 默认 private\n  string name;\n  int hp;\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`struct` 默认所有成员是 `public`。\n`class` 默认所有成员是 `private`。\n就这么一个区别。',
      code: 'struct S { int x; };   // x 是 public\nclass C { int x; };    // x 是 private\n\nS s; s.x = 10;  // ✅\nC c; c.x = 10;  // ❌',
    },
    {
      type: 'concept-cards',
      instruction: '对比 struct 和 class：',
      cards: [
        { glyph: '📐', term: 'struct', meaning: '默认 public，通常用于纯数据组合', example: 'struct Point { int x; int y; };' },
        { glyph: '📦', term: 'class', meaning: '默认 private，通常用于封装数据+行为', example: 'class Hero { private: int hp; public: ... };' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：public 和 private 分别控制什么？',
      options: [
        { text: '代码颜色', correct: false, explanation: '和代码颜色无关' },
        { text: '谁能访问成员', correct: true, explanation: 'public 公开，private 私有' },
        { text: '变量存哪里', correct: false, explanation: '权限不影响存储位置' },
        { text: '函数能不能有参数', correct: false, explanation: '和参数无关' },
      ],
    },
    {
      type: 'exposition',
      text: '习惯用法：\n- **struct**：当这个类型只是"把几个数据捆在一起"（纯数据）\n- **class**：当这个类型有"数据+行为+封装"（有成员函数和 private）',
      code: '// struct——纯数据\nstruct Point {\n  int x, y;\n};\n\n// class——有封装和行为\nclass Rectangle {\nprivate:\n  Point topLeft, bottomRight;\npublic:\n  int area() { ... }\n};',
    },
    {
      type: 'type-it',
      instruction: '用 struct 定义一个纯数据类：',
      code: 'struct Point {\n  int x;\n  int y;\n};\n\nPoint p;\np.x = 10;\np.y = 20;',
      hints: [
        'struct 的成员默认 public，可以直接访问',
        'struct 也能有成员函数，但习惯上不放',
        'struct 定义末尾也要分号',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个说法正确？',
      options: [
        { text: 'struct 比 class 快', correct: false, explanation: '两者性能完全一样' },
        { text: 'struct 和 class 唯一区别是默认权限', correct: true, explanation: '除了默认 public/private，其他完全一样' },
        { text: 'struct 不能有成员函数', correct: false, explanation: 'struct 完全可以有成员函数' },
        { text: 'class 不能有 public 成员', correct: false, explanation: 'class 可以加 public: 标签' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 class 实现同样的结构，注意默认权限：',
      code: 'class Point {\npublic:\n  int x;\n  int y;\n};\n\nPoint p;\np.x = 10;\np.y = 20;',
      hints: [
        'class 默认 private，所以必须加 public:',
        '不加 public: 的话 p.x = 10 会报错',
        'functionally 和 struct 版本完全一样',
      ],
    },
    {
      type: 'exposition',
      text: '什么时候用 struct？什么时候用 class？\n\n**用 struct**：只是简单组合几个数据（RGB 颜色、坐标、配置项）\n**用 class**：有 private 成员、有成员函数、需要封装',
    },
    {
      type: 'multiple-choice',
      question: '对于一个 RGB 颜色类，用 struct 还是 class 更合适？',
      options: [
        { text: 'struct，因为是纯数据组合', correct: true, explanation: 'RGB 只是三个整数捆一起，没有行为，用 struct 合适' },
        { text: 'class，因为 C++ 程序员都用 class', correct: false, explanation: '纯数据用 struct 更符合习惯' },
        { text: '两个都不合适', correct: false, explanation: 'struct 非常适合这种场景' },
        { text: '必须用 struct', correct: false, explanation: 'class 也可以，但不符合习惯' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，比较 struct 和 class 的默认权限：',
      template: '____ A { int x; };  // x 是 public\n____ B { int x; };  // x 是 private\n\nA a; a.x = 1;  // ✅\nB b; ____ = 1;  // ❌',
      answers: ['struct', 'class', 'b.x'],
      hints: ['第一个关键字：默认 public', '第二个关键字：默认 private', '第三空：会编译错误的那行'],
    },
    {
      type: 'exposition',
      text: '总结：\n- `struct` ≈ `class`，只有默认权限不同\n- struct 默认 public，class 默认 private\n- 纯数据用 struct，有封装行为用 class',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '记住一句话：\n**struct = 把数据捆一起，class = 封装数据+行为。**\n技术上一模一样，但这两种用法是 C++ 社区的约定。',
    },
    {
      type: 'exposition',
      text: 'C++ 兼容 C 的 struct，所以 struct 还可以像 C 一样用：\n但 C++ 中 struct 已经扩展成了和 class 一样的功能。',
    },
    {
      type: 'type-it',
      instruction: 'struct 也可以有构造函数和成员函数：',
      code: 'struct Point {\n  int x, y;\n\n  Point(int a, int b) : x(a), y(b) {}\n\n  void show() const {\n    cout << "(" << x << "," << y << ")" << endl;\n  }\n};',
      hints: [
        'struct 和 class 一样可以有构造函数',
        'struct 默认 public，所以不需要 public:',
        'struct 也可以有成员函数',
      ],
    },
    {
      type: 'exposition',
      text: '总结对比：\n| | struct | class |\n|---|---|---|\n| 默认权限 | public | private |\n| 成员函数 | 可以 | 可以 |\n| 构造函数 | 可以 | 可以 |\n| 习惯用途 | 纯数据 | 封装+行为 |',
    },
    {
      type: 'multiple-choice',
      question: '如果一个类型只是把几个数据捆在一起（比如坐标 x, y），用哪个更符合习惯？',
      options: [
        { text: 'struct', correct: true, explanation: '纯数据组合用 struct 是 C++ 社区的惯例' },
        { text: 'class', correct: false, explanation: 'class 通常用于有封装和行为的类型' },
        { text: '两个都不合适', correct: false, explanation: 'struct 完全适合纯数据场景' },
        { text: '必须用 class', correct: false, explanation: '没有必须的规定' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行对比 struct 和 class 的代码：',
      code: '#include <iostream>\nusing namespace std;\n\nstruct Point {\n  int x, y;\n};\n\nclass PointC {\npublic:\n  int x, y;\n};\n\nint main() {\n  Point p;\n  p.x = 3; p.y = 4;\n  cout << "struct: " << p.x << "," << p.y << endl;\n  \n  PointC pc;\n  pc.x = 5; pc.y = 6;\n  cout << "class: " << pc.x << "," << pc.y << endl;\n}',
      expectedOutput: 'struct: 3,4\nclass: 5,6',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
