import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'this-pointer',
    chapter: 8,
    title: 'this——我自己',
    subtitle: '指向当前对象',
    description: 'this 是成员函数中指向当前对象的指针，代表"我自己"。',
    objectives: ['能理解 this 的含义', '能在成员函数中使用 this'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在成员函数内部，有一个隐藏的指针叫 `this`。\n它指向**调用这个成员函数的对象**——就是"我自己"。',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  void show() {\n    // this 指向调用 show() 的那个对象\n    cout << this->name << " HP:" << this->hp;\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`this` 是一个指针，所以用 `->` 来访问成员（等价于 `.`）。\n`this->name` 和 `name` 在成员函数里效果一样。',
      code: 'void show() {\n  cout << name;          // 编译器自动补成 this->name\n  cout << this->name;    // 显式写法，和上面一样\n}',
    },
    {
      type: 'concept-cards',
      instruction: '认识 this：',
      cards: [
        { glyph: '👈', term: 'this', meaning: '指向当前对象的指针', example: 'this->name' },
        { glyph: '🎯', term: '当前对象', meaning: '调用这个成员函数的那个对象', example: 'h.show() → this 指向 h' },
        { glyph: '🔗', term: 'this->', meaning: '等价于对象名.，只是用指针方式', example: 'this->hp 等价于 h.hp' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：指针用哪个符号访问成员？',
      options: [
        { text: '. 点号', correct: false, explanation: '点号用于对象，指针用 ->' },
        { text: '-> 箭头', correct: true, explanation: '指针用箭头 -> 访问成员' },
        { text: ':: 双冒号', correct: false, explanation: '双冒号是作用域解析' },
        { text: '* 星号', correct: false, explanation: '星号用于声明指针或解引用' },
      ],
    },
    {
      type: 'exposition',
      text: '`this` 最常用的场景：**当参数名和成员变量名相同时**，用 `this->` 区分：',
      code: 'class Hero {\nprivate:\n  string name;\n  int hp;\n\npublic:\n  void setName(string name) {\n    // 参数 name 覆盖了成员 name\n    this->name = name;   // this->name 是成员变量\n  }\n};',
    },
    {
      type: 'type-it',
      instruction: '用 this-> 区分参数和成员变量：',
      code: 'class Player {\nprivate:\n  string name;\n  int level;\n\npublic:\n  void setName(string name) {\n    this->name = name;\n  }\n\n  void setLevel(int level) {\n    this->level = level;\n  }\n};',
      hints: [
        '参数 name 和成员 name 同名',
        'this->name 明确表示成员的 name',
        '= 右边的 name 是参数',
      ],
    },
    {
      type: 'type-it',
      instruction: '另一种写法：使用不同的参数名（不用 this）：',
      code: 'class Player {\nprivate:\n  string name;\n  int level;\n\npublic:\n  void setName(string n) {\n    name = n;       // 参数名不同，不用 this\n  }\n};',
      hints: [
        '参数名 n 和成员名 name 不同',
        '这样可以直接写 name = n',
        '但有些团队风格偏好统一用 this->',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`this->name = name;` 中，左边的 name 和右边的 name 分别指？',
      options: [
        { text: '左边是成员变量，右边是参数', correct: true, explanation: 'this->name 明确指成员变量，右边的 name 是参数' },
        { text: '左边是参数，右边是成员变量', correct: false, explanation: 'this-> 前缀指明成员变量' },
        { text: '两个都是成员变量', correct: false, explanation: '右边如果是成员变量，那就是自己给自己赋值' },
        { text: '两个都是参数', correct: false, explanation: 'this-> 前缀指明成员，不是参数' },
      ],
    },
    {
      type: 'exposition',
      text: '`this` 的另一个用途：在成员函数中**返回当前对象本身**：',
      code: 'class Hero {\npublic:\n  int hp;\n\n  Hero& addHp(int h) {\n    this->hp += h;\n    return *this;       // 返回当前对象\n  }\n};\n\nHero h;\nh.addHp(10).addHp(20);  // 链式调用',
    },
    {
      type: 'type-it',
      instruction: '用 this 实现链式调用：',
      code: 'class Counter {\nprivate:\n  int count;\n\npublic:\n  Counter() : count(0) {}\n\n  Counter& add(int n) {\n    this->count += n;\n    return *this;\n  }\n\n  Counter& reset() {\n    this->count = 0;\n    return *this;\n  }\n\n  int get() { return count; }\n};',
      hints: [
        'return *this 返回当前对象本身',
        '这样就可以连续调用：c.add(5).add(3)',
        '链式调用让代码更简洁',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，用 this 区分成员和参数：',
      template: 'class Hero {\nprivate:\n  string name;\n  int hp;\n\npublic:\n  void setHp(int hp) {\n    ____->____ = hp;\n  }\n};',
      answers: ['this', 'hp'],
      hints: ['用 this-> 访问成员变量', '左边是成员，右边是参数'],
    },
    {
      type: 'multiple-choice',
      question: '在成员函数中，`this` 是什么类型的？',
      options: [
        { text: '当前对象本身', correct: false, explanation: 'this 是指针，不是对象本身' },
        { text: '指向当前对象的指针', correct: true, explanation: 'this 是 Hero* 类型的指针' },
        { text: '当前对象的引用', correct: false, explanation: 'this 是指针，不是引用' },
        { text: '全局变量', correct: false, explanation: 'this 是成员函数内部隐藏的局部指针' },
      ],
    },
    {
      type: 'type-it',
      instruction: '在成员函数中输出 this 的地址：',
      code: 'class Hero {\npublic:\n  string name;\n\n  void show() {\n    cout << name << " 的地址: " << this << endl;\n  }\n};\n\nint main() {\n  Hero h1, h2;\n  h1.show();\n  h2.show();  // 地址不同\n}',
      hints: [
        'h1 和 h2 的 this 地址不同',
        '每个对象有不同的内存地址',
        'this 里存的就是这个地址',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全链式调用的代码：',
      template: 'Counter& add(int n) {\n  this->____ += n;\n  return ____;\n}',
      answers: ['count', '*this'],
      hints: ['第一空：成员变量名', '第二空：返回当前对象本身'],
    },
    {
      type: 'exposition',
      text: 'this 指针的另一个重要用途：**在成员函数中比较两个对象是否是同一个**。',
      code: 'class Hero {\npublic:\n  string name;\n\n  bool isSame(const Hero& other) const {\n    return this == &other;  // 比较地址\n  }\n};',
    },
    {
      type: 'multiple-choice',
      question: '在 const 成员函数中，this 指针的类型是什么？',
      options: [
        { text: 'const Hero* const', correct: true, explanation: 'this 本身是 const 指针（不能改指向），且因为函数是 const 的，指向的对象也是 const 的' },
        { text: 'Hero*', correct: false, explanation: 'const 成员函数中 this 指向 const 对象' },
        { text: 'Hero&', correct: false, explanation: 'this 是指针不是引用' },
        { text: 'const Hero&', correct: false, explanation: 'this 是指针，不是引用' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 this 判断是否同一个对象：',
      code: 'class Hero {\npublic:\n  string name;\n\n  bool isMe(const Hero& other) const {\n    return this == &other;\n  }\n};\n\nHero h1, h2;\ncout << h1.isMe(h1);  // 1 (true)\ncout << h1.isMe(h2);  // 0 (false)',
      hints: [
        'this == &other 比较的是两个对象的地址',
        '同一个对象的地址必然相等',
        '不同对象的地址一定不同',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行并观察 this 的用法：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\nprivate:\n  string name;\n  int hp;\n\npublic:\n  void setName(string name) {\n    this->name = name;\n  }\n\n  Hero& addHp(int h) {\n    this->hp += h;\n    return *this;\n  }\n\n  void show() {\n    cout << name << " HP:" << hp << " (this=" << this << ")" << endl;\n  }\n};\n\nint main() {\n  Hero h;\n  h.setName("勇者");\n  h.addHp(50).addHp(30);\n  h.show();\n}',
      expectedOutput: '勇者 HP:80 (this=0x',
      comparison: 'contains',
      editable: false,
    },
  ],
}

export default lesson
