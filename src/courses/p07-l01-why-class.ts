import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'why-class',
    chapter: 8,
    title: '为什么需要 class',
    subtitle: '把数据和操作打包',
    description: '感受没有 class 时代码有多散，理解 class 解决什么问题。',
    objectives: ['能说出没有 class 时代码的问题', '能理解封装动机'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前写游戏角色，我们用了**分开的变量+分开的函数**：',
      code: 'string name = "勇者";\nint hp = 100;\nint level = 1;\n\nvoid showStatus(string n, int h, int l) {\n  cout << n << " HP:" << h << " Lv:" << l;\n}\n\nvoid takeDamage(int &h, int d) {\n  h = h - d;\n}',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '数据（`name, hp, level`）和操作它们的函数（`showStatus, takeDamage`）是**分开的**。\n代码多了就会乱——你得自己记住哪个函数操作哪些变量。',
    },
    {
      type: 'exposition',
      text: '更糟糕的是，如果你有两个角色，就要给每个角色准备一套变量：',
      code: 'string name1 = "勇者", name2 = "法师";\nint hp1 = 100, hp2 = 80;\nint level1 = 1, level2 = 2;\n\nshowStatus(name1, hp1, level1);\nshowStatus(name2, hp2, level2);',
    },
    {
      type: 'multiple-choice',
      question: '没有 class 时，要表示两个角色最麻烦的是什么？',
      options: [
        { text: '代码运行变慢', correct: false, explanation: '速度不是问题所在' },
        { text: '每个角色都要声明一套独立的变量，名字混乱', correct: true, explanation: 'name1/hp1、name2/hp2——名字越来越乱，容易写错' },
        { text: '不能写函数', correct: false, explanation: '当然可以写函数，只是要传很多参数' },
        { text: '不能用 cout 输出', correct: false, explanation: 'cout 不受影响' },
      ],
    },
    {
      type: 'exposition',
      text: 'class 就是来解决这个问题的：**把数据和操作打包在一起**，变成一张"蓝图"。',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n  int level;\n\n  void showStatus() {\n    cout << name << " HP:" << hp << " Lv:" << level;\n  }\n\n  void takeDamage(int d) {\n    hp = hp - d;\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'concept-cards',
      instruction: '认识一下 class 带来的改变：',
      cards: [
        { glyph: '📦', term: 'class', meaning: '把相关的数据和函数包在一起', example: 'class Hero { ... };' },
        { glyph: '🧩', term: '成员变量', meaning: '类里面的变量，描述属性', example: 'string name; int hp;' },
        { glyph: '🔧', term: '成员函数', meaning: '类里面的函数，操作成员变量', example: 'void showStatus()' },
        { glyph: '🏭', term: '对象', meaning: '用类创建的具体实例', example: 'Hero h;' },
      ],
    },
    {
      type: 'exposition',
      text: '有了 class，创建两个角色就变成了：',
      code: 'Hero h1, h2;\nh1.name = "勇者";\nh1.hp = 100;\nh2.name = "法师";\nh2.hp = 80;\n\nh1.showStatus();\nh2.showStatus();',
    },
    {
      type: 'type-it',
      instruction: '先体验一下 class 的基本语法：',
      code: 'class Player {\npublic:\n  string name;\n  int score;\n};',
      hints: [
        'class 关键字后面是类名，首字母通常大写',
        'public: 表示下面的成员可以被外部访问',
        '别忘了最后的分号 ;',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾函数：下面哪个定义函数的写法是正确的？',
      options: [
        { text: 'void show() { cout << "Hi"; }', correct: true, explanation: '返回值+函数名+参数+函数体，标准写法' },
        { text: 'void show() cout << "Hi";', correct: false, explanation: '函数体必须用花括号 {} 括起来' },
        { text: 'show void() { cout << "Hi"; }', correct: false, explanation: '返回值类型要在函数名前面' },
        { text: 'void { cout << "Hi"; }', correct: false, explanation: '没有函数名和括号' },
      ],
    },
    {
      type: 'exposition',
      text: '对比一下前后变化：\n**没有 class** → 变量和函数分家，传参麻烦，扩展痛苦\n**有 class** → 数据和操作在一起，用对象.成员的方式访问',
    },
    {
      type: 'type-it',
      instruction: '定义一个 Car 类，包含品牌和速度：',
      code: 'class Car {\npublic:\n  string brand;\n  int speed;\n};',
      hints: [
        '类名 Car 首字母大写',
        'public: 别忘了冒号',
        '每个成员变量声明后加分号',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'class Hero { ... }; 最后的分号是？',
      options: [
        { text: '可写可不写', correct: false, explanation: 'C++ 中 class 定义结束必须加分号' },
        { text: '必须写，因为 class 定义是一条语句', correct: true, explanation: 'class 定义结束时需要分号，跟变量声明一样' },
        { text: '写了会报错', correct: false, explanation: '不写才会报错' },
        { text: '只有带函数时才需要', correct: false, explanation: '任何时候都需要分号' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全一个 Book 类的定义：',
      template: '____ Book {\n____:\n  string title;\n  int pages;\n____;',
      answers: ['class', 'public', ''],
      hints: ['第一个空是关键字', '第二个空是访问权限', '结尾需要分号'],
    },
    {
      type: 'exposition',
      text: '一句话总结：class **把散落的数据和函数打包成一个整体**——这就是**封装**的起点。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: 'class 最主要的作用是什么？',
      options: [
        { text: '让代码颜色更好看', correct: false, explanation: '语法高亮不是 class 的目的' },
        { text: '把相关数据和操作打包在一起', correct: true, explanation: '封装——数据和操作放一起，代码更清晰' },
        { text: '让程序跑得更快', correct: false, explanation: 'class 本身不提升性能' },
        { text: '替代函数', correct: false, explanation: 'class 包含函数，但不替代函数' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个 Student 类，包含名字和分数：',
      code: 'class Student {\npublic:\n  string name;\n  int grade;\n};',
      hints: [
        '类名 Student 首字母大写，这是惯例',
        'public: 的冒号是英文冒号',
        '分号结尾不能忘',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，创建一个 Student 对象并赋值：',
      template: 'Student ____;\n____.name = "小明";\n____.grade = 90;',
      answers: ['s', 's', 's'],
      hints: ['第一个空是对象名', '用 . 号访问成员'],
    },
    {
      type: 'exposition',
      text: '到这里你已经理解了：\n1️⃣ 没有 class → 代码散乱\n2️⃣ class → 打包数据+操作\n3️⃣ 用类创建对象 → 每个对象有自己的数据',
    },
    {
      type: 'code-runner',
      instruction: '运行看看 class 的完整用法：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n  string name;\n  int hp;\n\n  void show() {\n    cout << name << " HP:" << hp << endl;\n  }\n};\n\nint main() {\n  Hero h;\n  h.name = "勇者";\n  h.hp = 100;\n  h.show();\n}',
      expectedOutput: '勇者 HP:100',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
