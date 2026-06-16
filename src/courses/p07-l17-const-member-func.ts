import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'const-member-func',
    chapter: 8,
    title: 'const 成员函数',
    subtitle: '保证不修改',
    description: '带 const 的成员函数承诺不会修改对象的成员变量。',
    objectives: ['能定义 const 成员函数', '能理解 const 成员函数的保证'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '在成员函数的 `()` 后面加 `const`，就告诉编译器：**这个函数不会修改任何成员变量**。',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  string getName() const {   // ← const 成员函数\n    return name;              // 只读，不修改\n  }\n\n  int getHp() const {        // ← const 成员函数\n    return hp;\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`const` 加在函数名和函数体之间。\n如果 const 函数里试图修改成员变量——**编译报错**。',
      code: 'void badFunc() const {\n  hp = hp + 10;   // ❌ 编译错误！const 函数不能修改成员\n}',
    },
    {
      type: 'concept-cards',
      instruction: '认识 const 成员函数：',
      cards: [
        { glyph: '🔒', term: 'const 成员函数', meaning: '承诺不修改对象的任何成员', example: 'int get() const { }' },
        { glyph: '✅', term: '只读保证', meaning: '编译器会检查是否真的没修改', example: '修改成员 → 编译错误' },
        { glyph: '📖', term: 'getter', meaning: '只读访问器，通常就是 const 的', example: 'getName() const / getHp() const' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：this 在 static 成员函数中能用吗？',
      options: [
        { text: '能用，指向当前对象', correct: false, explanation: 'static 函数没有 this' },
        { text: '不能用，static 函数没有 this', correct: true, explanation: 'static 函数不依赖对象，没有 this 指针' },
        { text: '有时能有时不能', correct: false, explanation: '明确：static 函数始终没有 this' },
        { text: 'this 是全局变量', correct: false, explanation: 'this 是指向当前对象的指针' },
      ],
    },
    {
      type: 'exposition',
      text: '为什么需要 const 成员函数？\n因为当你有一个 `const` 对象时，它只能调用 const 成员函数——保证不会被改。',
      code: 'const Hero h("勇者", 100);\nh.getName();    // ✅ const 对象只能调 const 函数\nh.takeDamage(10); // ❌ 非 const 函数可能修改对象',
    },
    {
      type: 'multiple-choice',
      question: 'const 成员函数能修改成员变量吗？',
      options: [
        { text: '可以，想怎么改都行', correct: false, explanation: 'const 就是禁止修改的' },
        { text: '不能，编译器会禁止修改操作', correct: true, explanation: 'const 成员函数中修改成员变量会编译报错' },
        { text: '可以修改 static 变量', correct: false, explanation: 'static 变量也不应该在 const 函数里改' },
        { text: '取决于成员变量是不是 private', correct: false, explanation: '跟 public/private 无关' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义 const 成员函数：',
      code: 'class Student {\nprivate:\n  string name;\n  int score;\n\npublic:\n  Student(string n, int s) : name(n), score(s) {}\n\n  string getName() const {\n    return name;\n  }\n\n  int getScore() const {\n    return score;\n  }\n};',
      hints: [
        'const 写在 ) 和 { 之间',
        'const 表示这个函数只读不写',
        'getter 函数通常都加 const',
      ],
    },
    {
      type: 'type-it',
      instruction: 'const 对象只能调用 const 函数：',
      code: 'const Student s("小明", 95);\ncout << s.getName();   // ✅ const 调 const\n// s.setScore(100);    // ❌ 非 const 函数不能调',
      hints: [
        'const Student 对象只能调 const 成员函数',
        'getName 是 const 的，可以调',
        '非 const 的 setter 不能调',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 const 成员函数的定义：',
      template: 'class Book {\npublic:\n  string ____;\n  int pages;\n\n  ____ getTitle() ____ {\n    return title;\n  }\n};',
      answers: ['title', 'string', 'const'],
      hints: ['第一空：成员变量名', '第二空：返回值类型', '第三空：const 关键字'],
    },
    {
      type: 'multiple-choice',
      question: '如果有一个 const 对象，它能调用以下哪种函数？',
      options: [
        { text: 'int getHp() const { return hp; }', correct: true, explanation: 'const 函数可以被 const 对象调用' },
        { text: 'void setHp(int h) { hp = h; }', correct: false, explanation: '非 const 函数可能会修改对象' },
        { text: 'void takeDamage(int d) { hp -= d; }', correct: false, explanation: '非 const 函数不能由 const 对象调用' },
      ],
    },
    {
      type: 'exposition',
      text: '最佳实践：\n- **只读的 getter 函数**——总是加 `const`\n- **修改数据的 setter/操作函数**——不加 `const`\n- const 对象只能调 const 函数',
      code: 'class Hero {\npublic:\n  string getName() const { return name; }\n  int getHp() const { return hp; }\n\n  void takeDamage(int d) { hp -= d; }  // 非 const\n  void heal(int a) { hp += a; }         // 非 const\n};',
    },
    {
      type: 'type-it',
      instruction: '完整的 const 和非 const 函数类：',
      code: 'class Hero {\nprivate:\n  string name;\n  int hp;\n\npublic:\n  Hero(string n, int h) : name(n), hp(h) {}\n\n  string getName() const { return name; }\n  int getHp() const { return hp; }\n\n  void takeDamage(int d) {\n    if (d > 0) hp -= d;\n    if (hp < 0) hp = 0;\n  }\n\n  void show() const {\n    cout << name << " HP:" << hp;\n  }\n};',
      hints: [
        'getName/getHp/show 是 const 的——只读',
        'takeDamage 不是 const 的——修改数据',
        'const 对象只能调 getName/getHp/show',
      ],
    },
    {
      type: 'exposition',
      text: 'const 成员函数和**重载**结合：可以同时提供 const 和非 const 版本。\nconst 对象调 const 版本，非 const 对象调非 const 版本。',
      code: 'class Hero {\npublic:\n  int& getHp() { return hp; }         // 非 const——可修改\n  const int& getHp() const { return hp; } // const——只读\n};',
    },
    {
      type: 'type-it',
      instruction: 'const 对象只能调 const 成员函数：',
      code: 'class Data {\nprivate:\n  int value;\npublic:\n  Data(int v) : value(v) {}\n\n  int get() const { return value; }\n  void set(int v) { value = v; }\n};\n\nvoid readOnly(const Data& d) {\n  cout << d.get();  // ✅ const 调 const\n  // d.set(10);     // ❌ const 不能调非 const\n}\n\nvoid readWrite(Data& d) {\n  cout << d.get();  // ✅ 非 const 也能调 const\n  d.set(10);        // ✅ 非 const 调非 const\n}',
      hints: [
        'const 对象/引用只能调 const 函数',
        '非 const 对象可以调两者',
        '这是 C++ 的 const 正确性',
      ],
    },
    {
      type: 'multiple-choice',
      question: '如果一个成员函数不修改任何成员变量，应该怎么做？',
      options: [
        { text: '不加 const，默认就行', correct: false, explanation: '不加 const 的只读函数不能让 const 对象调用' },
        { text: '加 const，表明是只读的', correct: true, explanation: 'const 函数可以被 const 和非 const 对象调用' },
        { text: '加 static', correct: false, explanation: 'static 是另一回事' },
        { text: '不需要特别处理', correct: false, explanation: '加 const 是 C++ 的最佳实践' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 const 成员函数：',
      template: 'class Hero {\nprivate:\n  string name;\npublic:\n  Hero(string n) : ____(n) {}\n  string ____() ____ { return name; }\n};',
      answers: ['name', 'getName', 'const'],
      hints: ['第一空：初始化列表', '第二空：函数名', '第三空：const 关键字'],
    },
    {
      type: 'exposition',
      text: 'const 成员函数的关键要点：\n1️⃣ 写在 `)` 和 `{` 之间\n2️⃣ 承诺不修改任何成员变量\n3️⃣ const 对象只能调 const 函数\n4️⃣ getter 永远加 const',
      textAnimation: 'typewriter',
    },
    {
      type: 'code-runner',
      instruction: '运行 const 成员函数的例子：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\nprivate:\n  string name;\n  int hp;\n\npublic:\n  Hero(string n, int h) : name(n), hp(h) {}\n\n  string getName() const { return name; }\n  int getHp() const { return hp; }\n\n  void takeDamage(int d) {\n    hp -= d;\n    if (hp < 0) hp = 0;\n  }\n};\n\nvoid printHero(const Hero& h) {\n  cout << h.getName() << " HP:" << h.getHp() << endl;\n}\n\nint main() {\n  Hero h("勇者", 100);\n  printHero(h);\n  h.takeDamage(30);\n  printHero(h);\n}',
      expectedOutput: '勇者 HP:100\n勇者 HP:70',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
