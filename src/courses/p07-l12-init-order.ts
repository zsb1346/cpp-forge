import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'init-order',
    chapter: 8,
    title: '初始化顺序',
    subtitle: '按声明顺序',
    description: '成员变量按声明顺序初始化，和初始化列表中的顺序无关。',
    objectives: ['能说出成员初始化顺序由什么决定', '能避免因初始化顺序导致的坑'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '一个容易踩的坑：成员变量的初始化**顺序**和初始化列表里的顺序**无关**。\n而是按照它们在类中**声明**的顺序。',
      code: 'class Test {\n  int a;\n  int b;\npublic:\n  // 注意：先写 b 再写 a\n  Test() : b(10), a(b) {\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '上面这个代码有问题！\n虽然初始化列表先写 `b(10)` 再写 `a(b)`，\n但实际初始化顺序按声明顺序：**先 `a` 再 `b`**。\n所以 `a` 初始化时 `b` 还没初始化，`a(b)` 拿到的是垃圾值。',
      code: '// 实际执行顺序（按声明）：\n// 1. a(b) —— 此时 b 还没初始化！a 拿到垃圾值\n// 2. b(10)',
    },
    {
      type: 'concept-cards',
      instruction: '记住这条规则：',
      cards: [
        { glyph: '📋', term: '声明顺序', meaning: '成员在类中从上到下的顺序', example: 'int a; int b; → a 先于 b' },
        { glyph: '⚠️', term: '列表顺序 ≠ 执行顺序', meaning: '初始化列表的书写顺序不影响实际执行', example: 'Test() : b(10), a(b) 仍是 a 先初始化' },
        { glyph: '💡', term: '最佳实践', meaning: '让初始化列表顺序和声明顺序一致', example: 'Test() : a(0), b(10)' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：初始化列表用哪个符号开始？',
      options: [
        { text: '等号 =', correct: false, explanation: '等号不是初始化列表语法' },
        { text: '冒号 :', correct: true, explanation: '构造函数参数列表后面用冒号开始初始化列表' },
        { text: '花括号 {', correct: false, explanation: '花括号是函数体开始' },
        { text: '分号 ;', correct: false, explanation: '分号是语句结束' },
      ],
    },
    {
      type: 'exposition',
      text: '正确的做法：让初始化列表的顺序**和声明顺序一样**。',
      code: 'class Test {\n  int a;   // 第 1 个声明\n  int b;   // 第 2 个声明\npublic:\n  // 列表顺序和声明顺序一致\n  Test() : a(0), b(10) {\n  }\n};  // ✅ 安全',
    },
    {
      type: 'type-it',
      instruction: '按正确顺序写初始化列表：',
      code: 'class Hero {\npublic:\n  string name;   // 先声明\n  int hp;        // 后声明\n\n  Hero(string n, int h) : name(n), hp(h) {\n  }\n};',
      hints: [
        'name 先声明，name(n) 写在前面',
        'hp 后声明，hp(h) 写在后面',
        '声明顺序和列表顺序一致，不会出问题',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面代码的初始化顺序是？\n```cpp\nclass Test {\n  int x;\n  int y;\n  int z;\npublic:\n  Test() : z(3), y(2), x(1) {}\n};',
      options: [
        { text: 'x → y → z', correct: true, explanation: '始终按声明顺序：x 最先，y 第二，z 最后' },
        { text: 'z → y → x', correct: false, explanation: '初始化列表顺序不影响实际执行顺序' },
        { text: 'x → z → y', correct: false, explanation: '按声明顺序，不是打乱' },
        { text: 'y → x → z', correct: false, explanation: '声明顺序是 x, y, z 不是 y, x, z' },
      ],
    },
    {
      type: 'exposition',
      text: '一个实际的陷阱例子：',
      code: 'class Square {\n  int side;    // 先声明\n  int area;    // 后声明\npublic:\n  // 想用 side 初始化 area\n  Square(int s) : side(s), area(side * side) {\n  }\n}; // ✅ 安全，因为 side 先初始化',
    },
    {
      type: 'type-it',
      instruction: '避免陷阱：交换声明顺序会导致不同结果：',
      code: 'class Square {\n  int area;    // 先声明——注意顺序变了\n  int side;    // 后声明\npublic:\n  Square(int s) : side(s), area(side * side) {\n    // ⚠️ area 先初始化，此时 side 还是垃圾值\n  }\n};',
      hints: [
        '这里 area 先声明，先初始化',
        'area(side * side) 时 side 还没初始化',
        'area 会得到垃圾值！',
      ],
    },
    {
      type: 'multiple-choice',
      question: '如何避免初始化顺序导致的问题？',
      options: [
        { text: '让声明顺序和初始化列表顺序一致', correct: true, explanation: '最安全的做法——保持声明和列表顺序一致' },
        { text: '在初始化列表里全用固定值', correct: false, explanation: '固定值也解决不了跨成员依赖的问题' },
        { text: '不用初始化列表，全在函数体赋值', correct: false, explanation: '函数体赋值效率较低，且 const 成员不行' },
        { text: '给所有成员赋两次值', correct: false, explanation: '多此一举且不解决问题' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '按安全顺序补全初始化列表：',
      template: 'class Order {\n  int first;     // 先声明\n  int second;    // 后声明\npublic:\n  Order(int a, int b) : ____(a), ____(b) {\n  }\n};',
      answers: ['first', 'second'],
      hints: ['按照声明顺序写初始化列表', '先 first 后 second'],
    },
    {
      type: 'exposition',
      text: '黄金法则：\n**始终按成员变量的声明顺序写初始化列表。**\n这样既不会踩坑，代码也更易读。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '回顾：下面哪个是初始化列表的正确语法？',
      options: [
        { text: 'Hero(int h) { hp = h; }', correct: false, explanation: '这是函数体赋值' },
        { text: 'Hero(int h) : hp(h) { }', correct: true, explanation: '冒号 + 成员(值) 是初始化列表' },
        { text: 'Hero(int h) : { hp = h; }', correct: false, explanation: '冒号后必须直接跟初始化项' },
        { text: 'Hero(int h) : hp = h { }', correct: false, explanation: '初始化列表用括号不是等号' },
      ],
    },
    {
      type: 'exposition',
      text: '更安全的做法：**不要在初始化列表里用其他成员的值**。\n如果需要用其他成员的值，在构造函数体里赋值更安全：',
      code: '// 不安全的初始化列表\nclass A {\n  int x, y;\npublic:\n  A() : x(10), y(x + 5) { }  // 依赖 x 先初始化\n};\n\n// 更安全的函数体赋值\nclass B {\n  int x, y;\npublic:\n  B() : x(10) {  // x 在列表里初始化\n    y = x + 5;    // y 在函数体里赋值——此时 x 已初始化\n  }\n};',
    },
    {
      type: 'type-it',
      instruction: '安全地使用初始化列表：',
      code: 'class Order {\n  int id;\n  string name;\npublic:\n  Order(int i, string n) : id(i), name(n) {\n    // 安全：每个成员的初始值来自参数\n  }\n};',
      hints: [
        '用参数来初始化成员最安全',
        '每个成员只依赖参数，不依赖其他成员',
        '这样声明顺序怎么变都不影响',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`Test() : x(5), y(x) { }` ——如果 x 先声明，y 后声明，y 的值是？',
      options: [
        { text: '5', correct: true, explanation: 'x 先声明先初始化（x=5），y 后声明后初始化（y=x=5）' },
        { text: '垃圾值', correct: false, explanation: '因为 x 先于 y 声明，此时 x 已初始化' },
        { text: '0', correct: false, explanation: '不一定是 0' },
        { text: '取决于编译器', correct: false, explanation: '按声明顺序初始化是 C++ 标准规定的' },
      ],
    },
    {
      type: 'exposition',
      text: '一句话总结：\n**永远按成员变量的声明顺序写初始化列表。**\n这样可以避免 99% 的初始化顺序问题。',
      textAnimation: 'typewriter',
    },
    {
      type: 'code-runner',
      instruction: '运行正确和错误顺序的对比：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Correct {\n  int a;\n  int b;\npublic:\n  Correct() : a(10), b(a + 5) {}\n  void show() { cout << "a=" << a << " b=" << b << endl; }\n};\n\nclass Wrong {\n  int b;\n  int a;\npublic:\n  Wrong() : a(10), b(a + 5) {}\n  void show() { cout << "a=" << a << " b=" << b << endl; }\n};\n\nint main() {\n  Correct c;\n  c.show();\n  Wrong w;\n  w.show();\n}',
      expectedOutput: 'a=10 b=15\na=10 b=垃圾值',
      comparison: 'contains',
      editable: false,
    },
  ],
}

export default lesson
