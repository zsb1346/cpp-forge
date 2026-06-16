import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'public-vs-private',
    chapter: 8,
    title: 'public 和 private',
    subtitle: '谁能碰',
    description: '理解 public 和 private 控制谁能访问类内部的成员。',
    objectives: ['能区分 public 和 private', '能理解封装的意义'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '类里面的成员可以加上**访问权限**标签，控制谁能碰它们：',
      code: 'class Hero {\npublic:      // 谁都能访问\n  string name;\n  int hp;\n\nprivate:     // 只有类内部能访问\n  int secretId;\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '`public` 的成员——类外面可以随便用 `.` 访问。\n`private` 的成员——类外面不能碰，编译就报错。',
      code: 'Hero h;\nh.name = "勇者";     // ✅ public，可以\nh.secretId = 123;    // ❌ private，编译错误',
    },
    {
      type: 'concept-cards',
      instruction: '认识两种访问权限：',
      cards: [
        { glyph: '🔓', term: 'public', meaning: '公开的，类外面随便访问', example: 'h.name = "勇者";' },
        { glyph: '🔒', term: 'private', meaning: '私有的，只有类内部能碰', example: '类内函数可以访问' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：访问对象的成员用哪个符号？',
      options: [
        { text: '->', correct: false, explanation: '-> 用于指针，后面学' },
        { text: '.', correct: true, explanation: '对象.成员 是标准的成员访问方式' },
        { text: '::', correct: false, explanation: ':: 是作用域解析符，用于静态成员' },
        { text: '#', correct: false, explanation: '# 是预处理指令' },
      ],
    },
    {
      type: 'exposition',
      text: '为什么要 private？\n因为**不想让别人乱改内部数据**。\n比如 Hero 的血量不应该被直接改成负数，应该通过函数来控制。',
      code: 'class Hero {\nprivate:\n  int hp;            // 不让外面直接改\n\npublic:\n  void takeDamage(int d) {\n    if (hp - d < 0) hp = 0;  // 内部控制逻辑\n    else hp = hp - d;\n  }\n};',
    },
    {
      type: 'concept-cards',
      instruction: '理解封装的用意：',
      cards: [
        { glyph: '🛡️', term: '封装', meaning: '把数据藏起来，只留安全接口', example: 'private 数据 + public 函数' },
        { glyph: '🚪', term: '接口', meaning: 'public 函数是外部访问的唯一通道', example: 'takeDamage() / getHp()' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'private 成员可以在哪里被访问？',
      options: [
        { text: '在 main 函数里', correct: false, explanation: 'main 在类外面，不能访问 private' },
        { text: '在类的成员函数内部', correct: true, explanation: 'private 成员只能在类自己的成员函数里访问' },
        { text: '在任何函数里', correct: false, explanation: '外部函数不能直接访问 private 成员' },
        { text: '在任何其他地方', correct: false, explanation: 'private 就是限制外部访问的' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个带 private 成员的类：',
      code: 'class BankAccount {\nprivate:\n  double balance;\n\npublic:\n  void deposit(double amount) {\n    balance = balance + amount;\n  }\n  double getBalance() {\n    return balance;\n  }\n};',
      hints: [
        'private 的 balance 外部不能直接访问',
        'deposit 和 getBalance 是 public 接口',
        '成员函数可以读写 private 成员',
      ],
    },
    {
      type: 'exposition',
      text: '习惯做法：**成员变量用 private，成员函数用 public**。\n这样别人只能用你给的函数来操作数据，不会乱来。',
    },
    {
      type: 'type-it',
      instruction: '定义一个 Student 类，分数用 private 保护：',
      code: 'class Student {\nprivate:\n  int score;\n\npublic:\n  void setScore(int s) {\n    if (s >= 0 && s <= 100) {\n      score = s;\n    }\n  }\n  int getScore() {\n    return score;\n  }\n};',
      hints: [
        'setScore 检查分数是否在 0-100 之间',
        '外部不能直接 score = 999，必须通过 setScore',
        'getScore 只读不写，安全返回分数',
      ],
    },
    {
      type: 'multiple-choice',
      question: '如果 balance 是 private，以下哪个会编译错误？',
      options: [
        { text: 'void BankAccount::deposit(double a) { balance += a; }', correct: false, explanation: '成员函数内部可以访问 private' },
        { text: 'int main() { BankAccount b; b.balance = 1000; }', correct: true, explanation: 'main 是外部函数，不能直接访问 private balance' },
        { text: 'double BankAccount::getBalance() { return balance; }', correct: false, explanation: '成员函数可以访问 private' },
      ],
    },
    {
      type: 'type-it',
      instruction: '观察 private 如何保护数据：',
      code: 'class Hero {\nprivate:\n  int hp;\n\npublic:\n  void setHp(int h) {\n    if (h < 0) hp = 0;\n    else hp = h;\n  }\n  int getHp() {\n    return hp;\n  }\n};\n\nHero h;\nh.setHp(-50);   // 会被 setHp 控制在 0\ncout << h.getHp(); // 输出 0',
      hints: [
        'setHp 检查了负数情况',
        'private hp 不会被直接改成 -50',
        '通过 getHp 安全读取当前值',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全一个 Timer 类：',
      template: 'class Timer {\n____:\n  int seconds;\n\n____:\n  void setSeconds(int s) {\n    if (s > 0) ____ = s;\n  }\n  ____ getSeconds() {\n    return ____;\n  }\n};',
      answers: ['private', 'public', 'seconds', 'int', 'seconds'],
      hints: ['第一个空：不让外部直接改', '第二个空：外部能调用的接口', '第三空：赋值给成员变量'],
    },
    {
      type: 'multiple-choice',
      question: '封装（private + public）的好处是什么？',
      options: [
        { text: '让代码更短', correct: false, explanation: '封装通常会让代码更长' },
        { text: '控制数据访问，防止非法修改', correct: true, explanation: '通过 public 函数控制访问，可以做合法性检查' },
        { text: '让程序跑得更快', correct: false, explanation: '封装不影响运行速度' },
        { text: '让类名更好看', correct: false, explanation: '封装跟类名没关系' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个完整的封装类：',
      code: 'class Player {\nprivate:\n  string name;\n  int level;\n\npublic:\n  void setName(string n) { name = n; }\n  string getName() { return name; }\n  void levelUp() { level++; }\n  int getLevel() { return level; }\n};',
      hints: [
        'private 成员变量，public 成员函数',
        'levelUp 把 level 加 1',
        '通过 getName / getLevel 读取值',
      ],
    },
    {
      type: 'exposition',
      text: '没有封装的时候，别人可以把 hp 改成任何值——包括 -100。\n有了封装，hp 只能通过 `setHp` 和 `takeDamage` 修改，**规则由你定**。',
    },
    {
      type: 'multiple-choice',
      question: '如果一个类的所有成员都是 public，这有什么问题？',
      options: [
        { text: '没有问题，这样更方便', correct: false, explanation: '没有封装，外部可以随意改内部数据' },
        { text: '外部可以随意修改内部数据，无法做合法性检查', correct: true, explanation: '比如 hp 可能被直接改成负数' },
        { text: '编译器会报错', correct: false, explanation: 'public 是合法的' },
        { text: '性能会下降', correct: false, explanation: '和性能无关' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行带 private 的完整例子：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\nprivate:\n  int hp;\n\npublic:\n  void setHp(int h) {\n    if (h < 0) hp = 0;\n    else hp = h;\n  }\n  int getHp() { return hp; }\n};\n\nint main() {\n  Hero h;\n  h.setHp(100);\n  cout << "HP:" << h.getHp() << endl;\n  h.setHp(-50);\n  cout << "HP:" << h.getHp() << endl;\n}',
      expectedOutput: 'HP:100\nHP:0',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
