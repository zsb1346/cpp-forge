import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-op-overload',
    chapter: 10,
    title: '运算符重载练习',
    subtitle: '巩固 11-15',
    description: '通过综合练习巩固运算符重载的语法、算术重载、流重载和注意事项。',
    objectives: ['能独立实现运算符重载', '能调试运算符重载的常见错误'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '定义一个 Fraction 类并重载 <<：',
      code: 'class Fraction {\n  int num, den;\npublic:\n  Fraction(int n, int d) : num(n), den(d) {}\n  friend ostream& operator<<(ostream& os, const Fraction& f);\n};\n\nostream& operator<<(ostream& os, const Fraction& f) {\n  os << f.num << "/" << f.den;\n  return os;\n}',
      hints: [
        'Fraction 有两个成员：分子 num 和分母 den',
        'operator<< 需要是友元才能访问 private',
        '输出格式为 "分子/分母"',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行 << 重载，输出分数：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Fraction {\n  int num, den;\npublic:\n  Fraction(int n, int d) : num(n), den(d) {}\n  friend ostream& operator<<(ostream& os, const Fraction& f);\n};\n\nostream& operator<<(ostream& os, const Fraction& f) {\n  os << f.num << "/" << f.den;\n  return os;\n}\n\nint main() {\n  Fraction f1(1, 2), f2(3, 4);\n  cout << f1 << " + " << f2 << endl;\n}',
      expectedOutput: '1/2 + 3/4',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '实现 Fraction 的加法并运行：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Fraction {\n  int num, den;\npublic:\n  Fraction(int n, int d) : num(n), den(d) {}\n  friend ostream& operator<<(ostream& os, const Fraction& f);\n  friend Fraction operator+(const Fraction& a, const Fraction& b);\n};\n\nostream& operator<<(ostream& os, const Fraction& f) {\n  os << f.num << "/" << f.den;\n  return os;\n}\n\n// TODO: 实现 operator+\n// 公式: a/b + c/d = (a*d + c*b) / (b*d)\n\nint main() {\n  Fraction f1(1, 2), f2(3, 4);\n  cout << f1 << " + " << f2 << " = " << (f1 + f2) << endl;\n}',
      expectedOutput: '1/2 + 3/4 = 10/8',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 15：以下哪个运算符不能重载？',
      options: [
        { text: '<<', correct: false, explanation: '<< 可以重载' },
        { text: '==', correct: false, explanation: '== 可以重载' },
        { text: '->', correct: false, explanation: '-> 可以重载（但必须为成员函数）' },
        { text: '::', correct: true, explanation: ':: 是作用域解析运算符，不能重载' },
      ],
    },
    {
      type: 'type-it',
      instruction: '重载 == 运算符比较两个 Fraction：',
      code: 'bool operator==(const Fraction& a, const Fraction& b) {\n  return a.num * b.den == b.num * a.den;\n}',
      hints: [
        'a/b == c/d 等价于 a*d == c*b',
        '返回 bool 类型',
        '通常也实现 operator!=',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行完整的 Fraction 类：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Fraction {\n  int num, den;\npublic:\n  Fraction(int n, int d) : num(n), den(d) {}\n  friend ostream& operator<<(ostream& os, const Fraction& f);\n  friend Fraction operator+(const Fraction& a, const Fraction& b);\n  friend bool operator==(const Fraction& a, const Fraction& b);\n};\n\nostream& operator<<(ostream& os, const Fraction& f) {\n  os << f.num << "/" << f.den;\n  return os;\n}\n\nFraction operator+(const Fraction& a, const Fraction& b) {\n  return Fraction(a.num * b.den + b.num * a.den, a.den * b.den);\n}\n\nbool operator==(const Fraction& a, const Fraction& b) {\n  return a.num * b.den == b.num * a.den;\n}\n\nint main() {\n  Fraction f1(1, 2), f2(1, 2), f3(2, 4);\n  cout << f1 << " + " << f2 << " = " << (f1 + f2) << endl;\n  cout << f1 << " == " << f3 << " : " << (f1 == f3) << endl;\n}',
      expectedOutput: '1/2 + 1/2 = 4/4\n1/2 == 2/4 : 1',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '回顾 14：流运算符重载必须是什么形式的函数？',
      options: [
        { text: '成员函数', correct: false, explanation: '流运算符必须是全局函数' },
        { text: '全局函数', correct: true, explanation: '否则调用顺序是反的' },
        { text: 'static 函数', correct: false, explanation: '和 static 无关' },
        { text: '内联函数', correct: false, explanation: '和 inline 无关' },
      ],
    },
    {
      type: 'type-it',
      instruction: '重载 > 和 < 运算符：',
      code: 'bool operator>(const Fraction& a, const Fraction& b) {\n  return a.num * b.den > b.num * a.den;\n}\nbool operator<(const Fraction& a, const Fraction& b) {\n  return b > a;\n}',
      hints: [
        '利用 a.num * b.den 比较大小',
        'operator< 可以复用 operator>',
        '比较运算符返回 bool',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 11：运算符重载的主要目的是什么？',
      options: [
        { text: '让代码更难懂', correct: false, explanation: '重载是为了更自然，不是更难' },
        { text: '让自定义类型使用起来像内置类型', correct: true, explanation: '让自定义类型也支持运算符' },
        { text: '为了让程序变慢', correct: false, explanation: '重载不影响性能' },
        { text: '为了让编译器报错', correct: false, explanation: '重载是为了扩展功能' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 15：以下哪个不能重载？',
      options: [
        { text: 'operator+', correct: false, explanation: '+ 可以重载' },
        { text: 'operator.', correct: true, explanation: '成员访问运算符不能重载' },
        { text: 'operator=', correct: false, explanation: '赋值运算符可以重载' },
        { text: 'operator<<', correct: false, explanation: '流运算符可以重载' },
      ],
    },
    {
      type: 'type-it',
      instruction: '重载 operator< 用于分数比较：',
      code: 'bool operator<(const Fraction& a, const Fraction& b) {\n  return a.num * b.den < b.num * a.den;\n}',
      hints: [
        '比较 a/b < c/d 等价于 a*d < c*b',
        '交叉相乘比较分数大小',
        '返回 bool 类型',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行完整的分数运算程序：',
      code: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Fraction {\n  int num, den;\npublic:\n  Fraction(int n, int d) : num(n), den(d) {}\n  friend ostream& operator<<(ostream& os, const Fraction& f);\n  friend bool operator<(const Fraction& a, const Fraction& b);\n};\n\nostream& operator<<(ostream& os, const Fraction& f) {\n  os << f.num << "/" << f.den;\n  return os;\n}\n\nbool operator<(const Fraction& a, const Fraction& b) {\n  return a.num * b.den < b.num * a.den;\n}\n\nint main() {\n  vector<Fraction> fracs = {Fraction(3,4), Fraction(1,2), Fraction(5,8)};\n  sort(fracs.begin(), fracs.end());\n  for (const auto& f : fracs) cout << f << " ";\n  cout << endl;\n}',
      expectedOutput: '1/2 5/8 3/4',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '回顾 14：为什么 operator<< 返回 ostream&？',
      options: [
        { text: '不返回会导致编译错误', correct: false, explanation: '可以返回 void，但不能链式调用' },
        { text: '为了支持链式调用 cout << a << b', correct: true, explanation: '返回 cout 的引用，继续后面 <<' },
        { text: '为了效率', correct: false, explanation: '主要是语法支持' },
        { text: '没有为什么，习惯而已', correct: false, explanation: '链式调用是设计目的' },
      ],
    },
    {
      type: 'type-it',
      instruction: '重载 operator*（标量乘法）：',
      code: 'Fraction operator*(const Fraction& f, int s) {\n  return Fraction(f.num * s, f.den);\n}\nFraction operator*(int s, const Fraction& f) {\n  return f * s;\n}',
      hints: [
        '第一个版本是 Fraction * int',
        '第二个版本是 int * Fraction（交换律）',
        '第二个版本复用了第一个',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：重载 operator==。',
      template: 'bool operator==(const Point& a, ____ Point& b) {\n  return a.x == b.x ____ a.y == b.y;\n}',
      answers: ['const', '&&'],
      hints: ['第一空：const 引用', '第二空：逻辑与运算符'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 12-15：以下哪个运算符必须重载为成员函数？',
      options: [
        { text: 'operator+', correct: false, explanation: '+ 既可以成员也可以全局' },
        { text: 'operator=', correct: true, explanation: '赋值运算符必须为成员函数' },
        { text: 'operator<<', correct: false, explanation: '<< 必须为全局函数' },
        { text: 'operator==', correct: false, explanation: '== 既可以成员也可以全局' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '本课练习的运算符重载：',
      cards: [
        { glyph: '➕', term: 'operator+', meaning: '分数加法，交叉相乘', example: 'a/b + c/d' },
        { glyph: '⚖️', term: 'operator<', meaning: '分数比较，用于排序', example: 'sort 需要 <' },
        { glyph: '✖️', term: 'operator*', meaning: '标量乘法，支持交换律', example: 'f * 2 和 2 * f' },
        { glyph: '📤', term: 'operator<<', meaning: '输出到 cout', example: 'cout << f' },
      ],
    },
    {
      type: 'exposition',
      text: '总结运算符重载的核心：\n- 语法：`返回类型 operator符号(参数)`\n- 流运算符必须全局\n- =、[]、()、-> 必须成员\n- 不能改优先级和结合性\n- 保持语义一致',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson