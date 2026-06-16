import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'overload-stream',
    chapter: 10,
    title: '重载 << 和 >>',
    subtitle: '让 cout/cin 认识你的类',
    description: '学习重载流运算符 << 和 >>，让自定义类型可以用 cout 输出、用 cin 输入。',
    objectives: ['能重载 << 输出运算符', '能重载 >> 输入运算符'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你经常写 `cout << "hello"`。\n但如果想 `cout << myVector` 呢？——默认不行。\n需要重载 `<<` 运算符。',
      code: 'Vector2D v(1, 2);\ncout << v;  // 想实现这个效果',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '流运算符重载的固定模式：\n`ostream& operator<<(ostream& os, const MyType& obj)`\n返回 `ostream&` 是为了支持链式输出。',
      code: 'ostream& operator<<(ostream& os, const Vector2D& v) {\n  os << "(" << v.x << ", " << v.y << ")";\n  return os;\n}',
    },
    {
      type: 'type-it',
      instruction: '重载 << 运算符：',
      code: 'ostream& operator<<(ostream& os, const Vector2D& v) {\n  os << "(" << v.x << ", " << v.y << ")";\n  return os;\n}',
      hints: [
        '第一个参数是 ostream&（比如 cout）',
        '第二个参数是你的自定义类型',
        '返回 ostream& 才能链式调用',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07：cout 是什么类型？',
      options: [
        { text: 'int', correct: false, explanation: 'cout 不是整数类型' },
        { text: 'string', correct: false, explanation: 'cout 不是字符串' },
        { text: 'ostream', correct: true, explanation: 'cout 是 ostream 类型的对象' },
        { text: 'istream', correct: false, explanation: 'cin 才是 istream' },
      ],
    },
    {
      type: 'exposition',
      text: '为什么返回 `ostream&`？\n因为 `cout << a << b` 等价于 `(cout << a) << b`——每次 << 返回的还是 cout，继续下一个 <<。',
    },
    {
      type: 'type-it',
      instruction: '在类中加入 friend 声明：',
      code: 'class Vector2D {\n  int x, y;\npublic:\n  Vector2D(int a, int b) : x(a), y(b) {}\n  friend ostream& operator<<(ostream& os, const Vector2D& v);\n};',
      hints: [
        'operator<< 需要访问 private 成员',
        '用 friend 授权',
        '参数顺序：ostream& 在前面',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行完整的 << 重载示例：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Vector2D {\n  int x, y;\npublic:\n  Vector2D(int a, int b) : x(a), y(b) {}\n  friend ostream& operator<<(ostream& os, const Vector2D& v);\n};\n\nostream& operator<<(ostream& os, const Vector2D& v) {\n  os << "(" << v.x << ", " << v.y << ")";\n  return os;\n}\n\nint main() {\n  Vector2D v1(1, 2), v2(3, 4);\n  cout << "v1 = " << v1 << ", v2 = " << v2 << endl;\n}',
      expectedOutput: 'v1 = (1, 2), v2 = (3, 4)',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '同理可以重载 `>>` 输入运算符：\n`istream& operator>>(istream& is, MyType& obj)`\n注意第二个参数不是 const——因为要修改它。',
      code: 'istream& operator>>(istream& is, Vector2D& v) {\n  is >> v.x >> v.y;\n  return is;\n}',
    },
    {
      type: 'type-it',
      instruction: '重载 >> 运算符：',
      code: 'istream& operator>>(istream& is, Vector2D& v) {\n  is >> v.x >> v.y;\n  return is;\n}',
      hints: [
        '第一个参数是 istream&（比如 cin）',
        '第二个参数是非常量引用，因为要修改它',
        '返回 istream& 支持链式输入',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行包含 << 和 >> 的完整示例：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Vector2D {\n  int x, y;\npublic:\n  Vector2D() : x(0), y(0) {}\n  Vector2D(int a, int b) : x(a), y(b) {}\n  friend ostream& operator<<(ostream& os, const Vector2D& v);\n  friend istream& operator>>(istream& is, Vector2D& v);\n};\n\nostream& operator<<(ostream& os, const Vector2D& v) {\n  os << "(" << v.x << ", " << v.y << ")";\n  return os;\n}\n\nistream& operator>>(istream& is, Vector2D& v) {\n  cout << "输入 x 和 y: ";\n  is >> v.x >> v.y;\n  return is;\n}\n\nint main() {\n  Vector2D v;\n  cin >> v;\n  cout << "你输入了: " << v << endl;\n}',
      expectedOutput: '',
      comparison: 'none',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '回顾 13：为什么 operator<< 返回 ostream&？',
      options: [
        { text: '为了打印多个值', correct: false, explanation: '更准确地说，是为了链式调用' },
        { text: '为了支持链式调用 cout << a << b', correct: true, explanation: '每次 << 返回 cout 的引用' },
        { text: '因为必须返回引用', correct: false, explanation: '不是必须的，但链式调用需要' },
        { text: '为了程序运行更快', correct: false, explanation: '主要是语法上支持链式' },
      ],
    },
    {
      type: 'exposition',
      text: '流运算符必须是**全局函数**，不能是成员函数。\n因为如果写成成员函数，调用方式就变成了 `v << cout`——不符合直觉。',
    },
    {
      type: 'concept-cards',
      instruction: '流运算符的核心要点：',
      cards: [
        { glyph: '📤', term: '<< 重载', meaning: '输出自定义类型到 ostream', example: 'cout << v;' },
        { glyph: '📥', term: '>> 重载', meaning: '从 istream 输入到自定义类型', example: 'cin >> v;' },
        { glyph: '🔗', term: '返回引用', meaning: '返回 ostream& / istream& 支持链式', example: 'cout << a << b;' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '流运算符为什么必须用全局函数而不是成员函数？',
      options: [
        { text: '因为编译器不支持成员函数形式', correct: false, explanation: '编译器支持，但不推荐' },
        { text: '因为成员函数形式会把左操作数作为 this，导致 cout << v 变成 v.operator<<(cout)', correct: true, explanation: '成员函数形式调用顺序是反的' },
        { text: '因为全局函数性能更好', correct: false, explanation: '性能一样' },
        { text: '因为成员函数不能返回引用', correct: false, explanation: '成员函数也可以返回引用' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 << 重载函数的参数。',
      template: '____& operator<<(____& os, const Vector2D& v) {\n  os << "(" << v.x << ", " << v.y << ")";\n  return ____;\n}',
      answers: ['ostream', 'ostream', 'os'],
      hints: ['第一个空：返回值类型', '第二个空：第一个参数类型', '第三个空：返回什么'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 13：operator+ 返回新对象，而 operator+= 返回什么？',
      options: [
        { text: 'void', correct: false, explanation: '+= 通常返回自身的引用' },
        { text: '自身的引用（*this）', correct: true, explanation: '返回 *this 支持链式调用' },
        { text: '一个新对象', correct: false, explanation: '+= 修改自身，不应该返回新对象' },
        { text: 'bool', correct: false, explanation: '+= 返回自身引用' },
      ],
    },
    {
      type: 'type-it',
      instruction: '为自定义类型重载 >> 输入运算符：',
      code: 'istream& operator>>(istream& is, Vector2D& v) {\n  is >> v.x >> v.y;\n  return is;\n}',
      hints: [
        'istream& 对应 cin',
        '第二个参数是非常量引用',
        '返回 is 支持链式 cin >> a >> b',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 << 重载的返回值。',
      template: '____& operator<<(____& os, const Point& p) {\n  os << "(" << p.x << ", " << p.y << ")";\n  return ____;\n}',
      answers: ['ostream', 'ostream', 'os'],
      hints: ['第一空：返回值类型', '第二空：参数类型', '第三空：返回什么'],
    },
    {
      type: 'exposition',
      text: '总结：`<<` 和 `>>` 重载让你自定义类型可以和内置类型一样用 cout/cin。\n记住公式：`ostream& operator<<(ostream&, const T&)`，返回值 + 第一个参数同类型。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson