import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'friend-function',
    chapter: 10,
    title: '友元函数',
    subtitle: '外部函数访问私有',
    description: '学习 friend 关键字——授予外部函数访问类私有成员的权限。',
    objectives: ['能声明友元函数', '理解友元函数的意义和风险'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你已经知道 private 成员外部不能访问。\n但有时候外部函数确实需要访问私有成员——比如运算符重载。\n这时候用 `friend`（友元）。',
      code: 'class Hero {\n  int hp;\npublic:\n  friend void showHP(const Hero& h); // 友元声明\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '友元函数不是类的成员函数，但它可以访问类的私有成员。\n通过在类内部声明 `friend` 来授权。',
      code: 'void showHP(const Hero& h) {\n  cout << h.hp;  // 友元，可以访问 private hp\n}',
    },
    {
      type: 'concept-cards',
      instruction: '理解友元的概念：',
      cards: [
        { glyph: '🔒', term: 'private 成员', meaning: '外部默认不能访问', example: '类外直接访问会编译错误' },
        { glyph: '🤝', term: 'friend 函数', meaning: '被授权的外部函数，可以访问 private', example: '在类内声明 friend' },
      ],
    },
    {
      type: 'type-it',
      instruction: '声明一个友元函数：',
      code: 'class Hero {\n  int hp;\npublic:\n  Hero(int h) : hp(h) {}\n  friend void printHP(const Hero& h);\n};\n\nvoid printHP(const Hero& h) {\n  cout << "HP: " << h.hp;  // 友元可以访问\n}',
      hints: [
        'friend 声明写在类内部',
        'friend 函数在类外面定义',
        'friend 函数可以访问所有成员（包括 private）',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07-05：private 成员默认不能被谁访问？',
      options: [
        { text: '类的成员函数', correct: false, explanation: '成员函数可以访问 private' },
        { text: '类外部的函数', correct: true, explanation: 'private 限制外部访问' },
        { text: '友元函数', correct: false, explanation: '友元函数被授权可以访问' },
        { text: '类内部的任何代码', correct: false, explanation: '类内部可以访问自己的 private' },
      ],
    },
    {
      type: 'exposition',
      text: '友元函数的常见用途：\n- 运算符重载（比如 `<<` 输出）\n- 两个类需要互相访问私有数据\n- 测试函数需要检查内部状态',
    },
    {
      type: 'type-it',
      instruction: '通过友元函数比较两个对象的私有值：',
      code: 'class Hero {\n  int power;\npublic:\n  Hero(int p) : power(p) {}\n  friend bool stronger(const Hero& a, const Hero& b);\n};\n\nbool stronger(const Hero& a, const Hero& b) {\n  return a.power > b.power;\n}',
      hints: [
        'stronger 不是 Hero 的成员函数',
        '但它可以访问 a.power 和 b.power',
        '友元函数参数通常包含类对象的引用',
      ],
    },
    {
      type: 'exposition',
      text: '注意：友元关系是**单向**的。\n如果 A 声明 B 是友元，B 可以访问 A 的私有，但 A 不能自动访问 B 的私有。',
    },
    {
      type: 'multiple-choice',
      question: '友元函数是类的成员函数吗？',
      options: [
        { text: '是的，它在类内部声明', correct: false, explanation: '虽然在类内声明，但它不是成员函数' },
        { text: '不是，它只是被授权的外部函数', correct: true, explanation: 'friend 函数属于外部函数，只是有特殊权限' },
        { text: '只有调用了才算是', correct: false, explanation: '声明时就决定了身份' },
        { text: '取决于它是否使用 this', correct: false, explanation: '友元函数没有 this 指针' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '友元 vs 成员函数：',
      cards: [
        { glyph: '👤', term: '成员函数', meaning: '属于类，有 this 指针', example: 'void Hero::show()' },
        { glyph: '🤝', term: '友元函数', meaning: '不属于类，但可访问 private', example: 'friend void show(Hero&)' },
      ],
    },
    {
      type: 'type-it',
      instruction: '多参数的友元函数：',
      code: 'class Vector2D {\n  int x, y;\npublic:\n  Vector2D(int a, int b) : x(a), y(b) {}\n  friend Vector2D add(const Vector2D& a, const Vector2D& b);\n};\n\nVector2D add(const Vector2D& a, const Vector2D& b) {\n  return Vector2D(a.x + b.x, a.y + b.y);\n}',
      hints: [
        'add 函数访问了两个 Vector2D 的私有成员',
        '返回一个新的 Vector2D 对象',
        '友元让外部函数能像成员函数一样访问私有数据',
      ],
    },
    {
      type: 'exposition',
      text: '友元的争议：有人觉得它破坏了封装，有人说它让某些代码更自然。\nC++ 的设计哲学是：**给你工具，你自己决定怎么用**。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个关于 friend 的说法正确？',
      options: [
        { text: '友元破坏了封装，应该永远不用', correct: false, explanation: '友元在特定场景下非常有用' },
        { text: '友元是授予外部函数访问 private 的权限', correct: true, explanation: '这是 friend 的核心作用' },
        { text: '友元函数有 this 指针', correct: false, explanation: '友元函数不是成员函数，没有 this' },
        { text: '友元关系是双向的', correct: false, explanation: '友元关系是单向的' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全友元函数声明。',
      template: 'class Account {\n  double balance;\npublic:\n  Account(double b) : ____(b) {}\n  ____ ____ void showBalance(const Account& a);\n};',
      answers: ['balance', 'friend', 'void'],
      hints: ['第一空：初始化成员变量', '第二空：友元关键字', '第三空：返回值类型'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07-05：类的 private 成员默认不能被谁访问？',
      options: [
        { text: '类的成员函数', correct: false, explanation: '成员函数可以访问 private' },
        { text: '类外部的普通函数', correct: true, explanation: 'private 限制类外访问' },
        { text: 'friend 函数', correct: false, explanation: 'friend 函数被授予访问权限' },
        { text: '类的析构函数', correct: false, explanation: '析构函数是成员函数，可以访问' },
      ],
    },
    {
      type: 'type-it',
      instruction: '友元函数访问多个类的私有成员：',
      code: 'void compare(const Player& p, const Monster& m) {\n  if (p.power > m.strength) {\n    cout << "玩家更强";\n  }\n}',
      hints: [
        '需要同时在 Player 和 Monster 中声明 friend',
        '友元函数可以访问两个类的私有成员',
        '常用于对比、计算等跨类操作',
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'friend 的最佳实践：',
      cards: [
        { glyph: '✅', term: '适合用 friend', meaning: '运算符重载、迭代器、测试', example: 'operator<< 常用 friend' },
        { glyph: '❌', term: '不适合用 friend', meaning: '能用成员函数解决的问题', example: '能加 public 接口就别用 friend' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：friend 让外部函数可以访问类的私有成员。\n用得好可以让代码更自然，用多了会让封装形同虚设——适度使用。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson