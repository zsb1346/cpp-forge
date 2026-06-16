import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-class',
    chapter: 8,
    title: '类基础练习',
    subtitle: '巩固 01-06',
    description: '通过大量练习巩固类的定义、对象创建、成员访问和成员函数。',
    objectives: ['能独立定义一个完整的类', '能创建对象并访问成员'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '定义一个 Book 类，包含标题和页数：',
      code: 'class Book {\npublic:\n  string title;\n  int pages;\n};',
      hints: [
        'class 关键字开头',
        '成员变量 title 和 pages',
        '结尾分号不要漏',
      ],
    },
    {
      type: 'type-it',
      instruction: '创建 Book 对象并赋值：',
      code: 'Book b;\nb.title = "C++入门";\nb.pages = 300;',
      hints: [
        '用 Book b; 创建对象',
        'b.title 访问标题成员',
        'b.pages 访问页数成员',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全定义一个 Player 类：',
      template: '____ Player {\n____:\n  string ____;\n  int ____;\n  double ____;\n____;',
      answers: ['class', 'public', 'name', 'level', 'score', ''],
      hints: ['前两个是关键字', '中间三个是成员变量', '最后是分号'],
    },
    {
      type: 'multiple-choice',
      question: '回顾：class 定义末尾必须有？',
      options: [
        { text: '花括号 }', correct: false, explanation: '花括号是必须的，但只靠花括号不够' },
        { text: '分号 ;', correct: true, explanation: 'class 定义是一条语句，必须以分号结尾' },
        { text: '换行', correct: false, explanation: '换行不是语法要求' },
        { text: 'return 0;', correct: false, explanation: 'class 定义不需要 return' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个带成员函数的类：',
      code: 'class Circle {\npublic:\n  double radius;\n\n  double area() {\n    return 3.14 * radius * radius;\n  }\n};',
      hints: [
        'area 是成员函数，计算面积',
        'radius 是成员变量，直接在函数里用',
        '返回 double 类型',
      ],
    },
    {
      type: 'code-runner',
      instruction: '写一个完整的类并运行：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Circle {\npublic:\n  double radius;\n\n  double area() {\n    return 3.14 * radius * radius;\n  }\n};\n\nint main() {\n  Circle c;\n  c.radius = 5.0;\n  cout << "面积:" << c.area() << endl;\n  c.radius = 10.0;\n  cout << "面积:" << c.area() << endl;\n}',
      expectedOutput: '面积:78.5\n面积:314',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '如果类是设计图，对象是什么？',
      options: [
        { text: '另一张设计图', correct: false, explanation: '对象不是设计图' },
        { text: '根据设计图造出来的具体实物', correct: true, explanation: '类是蓝图，对象是根据蓝图造的具体实例' },
        { text: '设计图的名字', correct: false, explanation: '名字是标识符，不是实物' },
        { text: '编译器', correct: false, explanation: '编译器是编译代码的工具' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义 private 成员的类：',
      code: 'class Student {\nprivate:\n  int score;\n\npublic:\n  void setScore(int s) {\n    if (s >= 0 && s <= 100) score = s;\n  }\n  int getScore() { return score; }\n};',
      hints: [
        'score 是 private，外部不能直接赋值',
        'setScore 检查分数范围',
        'getScore 安全读取',
      ],
    },
    {
      type: 'fill-in',
      prompt: '创建 Student 对象并设置分数：',
      template: 'Student ____;\n____.____(95);\ncout << ____.____();',
      answers: ['s', 's', 'setScore', 's', 'getScore'],
      hints: ['第一空：对象名', '通过 setScore 设置分数', '通过 getScore 读取分数'],
    },
    {
      type: 'type-it',
      instruction: '定义一个 BankAccount 类：',
      code: 'class BankAccount {\nprivate:\n  double balance;\n\npublic:\n  void deposit(double a) { balance += a; }\n  void withdraw(double a) { if (a <= balance) balance -= a; }\n  double getBalance() { return balance; }\n};',
      hints: [
        'deposit 存款，balance 增加',
        'withdraw 取款，不能透支',
        'getBalance 查询余额',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行银行账户例子：',
      code: '#include <iostream>\nusing namespace std;\n\nclass BankAccount {\nprivate:\n  double balance;\n\npublic:\n  void deposit(double a) { balance += a; }\n  void withdraw(double a) {\n    if (a <= balance) balance -= a;\n    else cout << "余额不足!" << endl;\n  }\n  double getBalance() { return balance; }\n};\n\nint main() {\n  BankAccount acc;\n  acc.deposit(1000);\n  cout << "余额:" << acc.getBalance() << endl;\n  acc.withdraw(500);\n  cout << "余额:" << acc.getBalance() << endl;\n  acc.withdraw(600);\n  cout << "余额:" << acc.getBalance() << endl;\n}',
      expectedOutput: '余额:1000\n余额:500\n余额不足!\n余额:500',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '成员函数能直接访问 private 成员变量吗？',
      options: [
        { text: '不能，只能通过 public 函数', correct: false, explanation: '成员函数本身就是类的一部分，可以直接访问所有成员' },
        { text: '可以，成员函数属于类', correct: true, explanation: '成员函数是类内部定义的，能访问包括 private 在内的所有成员' },
        { text: '只能访问 public 的', correct: false, explanation: '成员函数能访问 private 成员' },
        { text: '需要加特殊关键字', correct: false, explanation: '不需要任何特殊关键字' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合练习：定义一个完整的 Hero 类：',
      code: 'class Hero {\nprivate:\n  string name;\n  int hp;\n  int level;\n\npublic:\n  void init(string n, int h, int l) {\n    name = n;\n    hp = h;\n    level = l;\n  }\n  void show() {\n    cout << name << " Lv." << level << " HP:" << hp;\n  }\n  void levelUp() {\n    level++;\n    hp = hp + 20;\n  }\n};',
      hints: [
        'init 一次性初始化所有成员',
        'levelUp 升级加血量',
        'show 显示角色信息',
      ],
    },
    {
      type: 'exposition',
      text: '练习课很重要——多写几遍才能把语法变成肌肉记忆。\n每次创建类都要想清楚：成员变量放哪，成员函数做什么。',
    },
    {
      type: 'type-it',
      instruction: '定义一个带 private 的完整类：',
      code: 'class Hero {\nprivate:\n  int hp;\npublic:\n  void setHp(int h) { if (h >= 0) hp = h; }\n  int getHp() const { return hp; }\n  void takeDamage(int d) {\n    hp -= d;\n    if (hp < 0) hp = 0;\n  }\n};',
      hints: [
        'private 成员变量，外部不能直接改',
        'setHp 做合法性检查',
        'takeDamage 控制血量不低于 0',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，让 Hero 掉血并升级：',
      template: 'Hero h;\nh.____("勇者", 100, 1);\nh.____();  // 升级\nh.____();  // 显示信息',
      answers: ['init', 'levelUp', 'show'],
      hints: ['第一个调用 init', '第二个调用 levelUp', '第三个调用 show'],
    },
    {
      type: 'multiple-choice',
      question: '关于 class 的定义，下面哪个是必要的？',
      options: [
        { text: '花括号 {} 和结尾分号 ;', correct: true, explanation: '花括号包住成员，分号结束定义，缺一不可' },
        { text: '至少要有一个成员函数', correct: false, explanation: '类可以只有成员变量' },
        { text: '必须有 public:', correct: false, explanation: '可以不加，默认为 private' },
        { text: '类名必须大写', correct: false, explanation: '习惯上大写，但语法上小写也可以' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个类，用成员函数控制血量：',
      code: 'class Hero {\nprivate:\n  int hp;\n  int maxHp;\n\npublic:\n  void init(int h) { hp = h; maxHp = h; }\n  int getHp() const { return hp; }\n  void takeDamage(int d) {\n    hp -= d;\n    if (hp < 0) hp = 0;\n    if (hp > maxHp) hp = maxHp;\n  }\n};',
      hints: [
        'private 成员不让外部直接访问',
        'init 初始化 hp 和 maxHp',
        'takeDamage 控制血量范围',
      ],
    },
    {
      type: 'code-runner',
      instruction: '综合练习：完整的 Hero 使用流程：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\nprivate:\n  string name;\n  int hp;\n  int level;\n\npublic:\n  void init(string n, int h, int l) {\n    name = n; hp = h; level = l;\n  }\n  void show() const {\n    cout << name << " Lv." << level << " HP:" << hp << endl;\n  }\n  void takeDamage(int d) {\n    hp -= d;\n    if (hp < 0) hp = 0;\n  }\n  void levelUp() {\n    level++;\n    hp = 100;\n  }\n};\n\nint main() {\n  Hero h;\n  h.init("勇者", 100, 1);\n  h.show();\n  h.takeDamage(40);\n  h.show();\n  h.levelUp();\n  h.show();\n}',
      expectedOutput: '勇者 Lv.1 HP:100\n勇者 Lv.1 HP:60\n勇者 Lv.2 HP:100',
      comparison: 'trimmed',
      editable: true,
    },
  ],
}

export default lesson
