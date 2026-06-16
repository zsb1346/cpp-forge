import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'overload-arithmetic',
    chapter: 10,
    title: '重载算术运算符',
    subtitle: '以 + 为例',
    description: '以加法运算符为例，实践如何重载算术运算符，让自定义类型支持四则运算。',
    objectives: ['能实现算术运算符重载', '能区分全局函数和成员函数形式'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你已经知道语法了。现在来实现一个完整的算术运算符重载。\n以 `Vector2D` 的加法为例，逐步构建。',
      code: 'class Vector2D {\npublic:\n  int x, y;\n  Vector2D(int a, int b) : x(a), y(b) {}\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '实现 `operator+`：把两个向量的 x 和 y 分别相加。\n我们用**全局函数**形式，这样 `v1 + v2` 和 `v2 + v1` 都合法。',
      code: 'Vector2D operator+(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}',
    },
    {
      type: 'type-it',
      instruction: '实现 operator+：',
      code: 'Vector2D operator+(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}',
      hints: [
        '全局函数形式，两个参数',
        '返回一个新的 Vector2D',
        '用 a.x + b.x 和 a.y + b.y 计算新坐标',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 12：全局函数形式的 operator+ 有几个参数？',
      options: [
        { text: '0 个', correct: false, explanation: '二元运算符需要操作数' },
        { text: '1 个', correct: false, explanation: '全局函数形式两个都是参数' },
        { text: '2 个', correct: true, explanation: '左操作数和右操作数都是参数' },
        { text: '3 个', correct: false, explanation: '二元运算符只需要两个参数' },
      ],
    },
    {
      type: 'exposition',
      text: '加上友元声明——因为 operator+ 需要访问 Vector2D 的私有成员：',
      code: 'class Vector2D {\n  int x, y;\npublic:\n  Vector2D(int a, int b) : x(a), y(b) {}\n  friend Vector2D operator+(const Vector2D& a, const Vector2D& b);\n};',
    },
    {
      type: 'type-it',
      instruction: '完整实现带友元的 operator+：',
      code: 'class Vector2D {\n  int x, y;\npublic:\n  Vector2D(int a, int b) : x(a), y(b) {}\n  friend Vector2D operator+(const Vector2D& a, const Vector2D& b);\n};\n\nVector2D operator+(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}',
      hints: [
        'friend 写在类内部声明',
        'operator+ 定义在类外面',
        '返回新对象而不是修改参数',
      ],
    },
    {
      type: 'exposition',
      text: '现在可以这样使用了：',
      code: 'Vector2D v1(1, 2), v2(3, 4);\nVector2D v3 = v1 + v2;  // v3.x = 4, v3.y = 6\nVector2D v4 = v1 + v2 + v3;  // 链式运算',
    },
    {
      type: 'code-runner',
      instruction: '运行完整的 Vector2D 加法示例：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Vector2D {\n  int x, y;\npublic:\n  Vector2D(int a, int b) : x(a), y(b) {}\n  friend Vector2D operator+(const Vector2D& a, const Vector2D& b);\n  void print() const {\n    cout << "(" << x << ", " << y << ")" << endl;\n  }\n};\n\nVector2D operator+(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}\n\nint main() {\n  Vector2D v1(1, 2), v2(3, 4);\n  Vector2D v3 = v1 + v2;\n  v3.print();\n  (v1 + v2 + v3).print();\n}',
      expectedOutput: '(4, 6)\n(8, 12)',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '同理可以实现 `operator-`、`operator*`（标量乘法）、`operator/`。\n模式完全一样：返回类型 operator符号(参数)。',
      code: 'Vector2D operator-(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x - b.x, a.y - b.y);\n}\nVector2D operator*(const Vector2D& v, int s) {\n  return Vector2D(v.x * s, v.y * s);\n}',
    },
    {
      type: 'type-it',
      instruction: '实现 operator*（标量乘法）：',
      code: 'Vector2D operator*(const Vector2D& v, int scalar) {\n  return Vector2D(v.x * scalar, v.y * scalar);\n}',
      hints: [
        '一个操作数是 Vector2D，另一个是 int',
        '返回一个新的 Vector2D',
        '需要再加一个 friend 声明',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种写法是正确的链式运算？',
      options: [
        { text: 'v1 + v2 + v3', correct: true, explanation: 'operator+ 返回 Vector2D，可以继续 +' },
        { text: 'v1 + v2 * v3', correct: false, explanation: '语法上可编译，但语义可能不对' },
        { text: 'v1 + + v2', correct: false, explanation: '一元正号需要单独重载' },
        { text: '+ v1 + v2', correct: false, explanation: '一元正号需要单独重载' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行多运算符版本：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Vector2D {\n  int x, y;\npublic:\n  Vector2D(int a, int b) : x(a), y(b) {}\n  friend Vector2D operator+(const Vector2D& a, const Vector2D& b);\n  friend Vector2D operator*(const Vector2D& v, int s);\n  void print() const {\n    cout << "(" << x << ", " << y << ")" << endl;\n  }\n};\n\nVector2D operator+(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}\n\nVector2D operator*(const Vector2D& v, int s) {\n  return Vector2D(v.x * s, v.y * s);\n}\n\nint main() {\n  Vector2D v1(1, 2);\n  Vector2D v2 = v1 * 3;\n  v2.print();\n  Vector2D v3 = v2 + Vector2D(1, 1);\n  v3.print();\n}',
      expectedOutput: '(3, 6)\n(4, 7)',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '注意 `operator*` 这里我们只定义了 `Vector2D * int`，没有定义 `int * Vector2D`。\n如果想让 `3 * v1` 也合法，需要再写一个版本。',
      code: 'Vector2D operator*(int s, const Vector2D& v) {\n  return Vector2D(v.x * s, v.y * s);  // 交换律\n}',
    },
    {
      type: 'multiple-choice',
      question: '为什么有时候需要写两个版本的 operator*？',
      options: [
        { text: '因为 C++ 语法要求必须写两个', correct: false, explanation: '不是必须的' },
        { text: '因为 3 * v 和 v * 3 参数顺序不同，是不同函数', correct: true, explanation: '参数顺序不同，需要不同的重载' },
        { text: '因为编译器不能处理乘法', correct: false, explanation: '编译器可以处理' },
        { text: '因为只能用全局函数', correct: false, explanation: '成员函数也可以' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：让 int * Vector2D 也合法。',
      template: 'Vector2D ____(int s, ____ Vector2D& v) {\n  return Vector2D(____, v.y * s);\n}',
      answers: ['operator*', 'const', 'v.x * s'],
      hints: ['第一个空：函数名', '第二个空：const 引用', '第三个空：x 乘以标量'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 12：成员函数形式的 operator+ 有几个参数？',
      options: [
        { text: '0 个', correct: false, explanation: '至少需要右操作数' },
        { text: '1 个', correct: true, explanation: '左操作数是 this，右操作数是参数' },
        { text: '2 个', correct: false, explanation: '那是全局函数形式' },
        { text: '3 个', correct: false, explanation: '不可能有 3 个' },
      ],
    },
    {
      type: 'type-it',
      instruction: '实现复合赋值运算符 +=：',
      code: 'Vector2D& operator+=(const Vector2D& other) {\n  x += other.x;\n  y += other.y;\n  return *this;\n}',
      hints: [
        '+= 修改自身，所以不返回新对象',
        '返回 *this 的引用支持链式调用',
        '通常 += 是成员函数',
      ],
    },
    {
      type: 'exposition',
      text: '总结：算术运算符重载的模式非常固定。\n1. 在类内声明 friend\n2. 定义 operatorX 全局函数\n3. 返回新对象，不修改参数\n4. 如果需要交换律，写两个版本',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson