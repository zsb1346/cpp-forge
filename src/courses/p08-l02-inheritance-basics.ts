import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'inheritance-basics',
    chapter: 9,
    title: '继承语法',
    subtitle: 'class B : public A',
    description: '掌握派生类继承基类的完整语法: class B : public A {};。',
    objectives: ['能写出继承的基本语法', '能创建派生类并使用继承的成员'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '继承的完整语法是：',
      code: 'class 派生类 : 继承方式 基类 {\n  // 派生类特有的成员\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '最常见的形式是用`public`继承：',
      code: 'class Hero : public Character {\npublic:\n  void heal(int a) { hp += a; }\n};',
    },
    {
      type: 'exposition',
      text: '拆解一下：`Hero : public Character`\n- `Hero` 是派生类名\n- `:` 表示"继承自"\n- `public` 是继承方式\n- `Character` 是基类名',
    },
    {
      type: 'concept-cards',
      instruction: '拆解继承语法的几个部分：',
      cards: [
        { glyph: '🔤', term: 'class Hero :', meaning: '声明派生类，冒号表示继承自', example: 'class Derived :' },
        { glyph: '🔓', term: 'public 基类名', meaning: '继承方式和基类', example: 'public / protected / private' },
        { glyph: '➕', term: '特有成员', meaning: '派生类自己新增的成员', example: 'void heal(int);' },
        { glyph: '🔚', term: '分号结尾', meaning: '类定义结束必须有分号', example: '};' },
      ],
    },
    {
      type: 'exposition',
      text: '看完整例子——`Character`基类：',
      code: 'class Character {\npublic:\n  string name;\n  int hp;\n  void showStatus() {\n    cout << name << " HP:" << hp;\n  }\n};',
    },
    {
      type: 'exposition',
      text: '`Warrior`派生类继承它，并添加自己的成员：',
      code: 'class Warrior : public Character {\npublic:\n  int armor;\n  void defend() {\n    cout << name << " 防御! +" << armor;\n  }\n};',
    },
    {
      type: 'exposition',
      text: '现在`Warrior`的对象`w`可以访问：\n- `w.name`（继承自 Character）\n- `w.hp`（继承自 Character）\n- `w.armor`（自己添加的）',
    },
    {
      type: 'type-it',
      instruction: '定义一个基类 Entity，再定义派生类 Player 继承它：',
      code: 'class Entity {\npublic:\n  int x;\n  int y;\n};\n\nclass Player : public Entity {\npublic:\n  int hp;\n};',
      hints: [
        '基类 Entity 包含坐标 x 和 y',
        '派生类 Player 用 : public Entity 继承',
        'Player 添加自己的成员 hp',
      ],
    },
    {
      type: 'exposition',
      text: '派生类对象可以访问：\n- **继承来的**成员（来自基类）\n- **自己添加的**成员（特有部分）',
      code: 'Player p;\np.x = 10;   // 继承自 Entity\np.y = 20;   // 继承自 Entity\np.hp = 100; // 自己添加的',
    },
    {
      type: 'multiple-choice',
      question: '回顾：上一课中，为什么需要把重复代码提取到基类？',
      options: [
        { text: '为了让代码更短', correct: false, explanation: '变短是结果，根本原因是避免维护多个副本' },
        { text: '为了让派生类不能使用某些成员', correct: false, explanation: '继承恰恰是让派生类能使用基类成员' },
        { text: '为了避免重复代码导致维护困难', correct: true, explanation: '重复代码改一处漏一处，继承解决这个问题' },
        { text: '为了让程序跑得更快', correct: false, explanation: '继承对性能没有直接影响' },
      ],
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序排列一个完整的继承定义：',
      fragments: ['class', 'Warrior', ':', 'public', 'Character', '{', 'public:', 'int', 'armor', ';', '};'],
      distractors: ['private', 'double'],
    },
    {
      type: 'exposition',
      text: '注意：派生类**不能继承**基类的：\n- 构造函数\n- 析构函数\n- 友元函数\n- 赋值运算符重载',
    },
    {
      type: 'type-it',
      instruction: '定义一个 Vehicle 基类和 Car 派生类：',
      code: 'class Vehicle {\npublic:\n  int speed;\n  int capacity;\n};\n\nclass Car : public Vehicle {\npublic:\n  string brand;\n};',
      hints: [
        'Vehicle 有 speed 和 capacity',
        'Car 用 public 继承 Vehicle',
        'Car 添加自己的 brand 成员',
      ],
    },
    {
      type: 'exposition',
      text: '使用继承时，派生类对象占用的内存 = **基类成员 + 派生类成员**。\n就像搭积木，一层层叠上去。',
    },
    {
      type: 'multiple-choice',
      question: '`class B : public A {};` 中，哪个是基类？',
      options: [
        { text: 'B', correct: false, explanation: 'B 是派生类，冒号后面的是基类' },
        { text: 'A', correct: true, explanation: 'A 在冒号后面，是基类' },
        { text: 'public', correct: false, explanation: 'public 是继承方式，不是类名' },
        { text: 'class', correct: false, explanation: 'class 是关键字，不是类名' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义 Animal 基类和 Dog 派生类，Dog 添加 bark 方法：',
      code: 'class Animal {\npublic:\n  string name;\n  int age;\n};\n\nclass Dog : public Animal {\npublic:\n  void bark() { cout << "Woof!"; }\n};',
      hints: [
        '基类 Animal 有 name 和 age',
        '派生类 Dog 继承 Animal',
        'Dog 有自己的 bark 方法',
      ],
    },
    {
      type: 'multiple-choice',
      question: '派生类对象能访问基类的 public 成员吗？',
      options: [
        { text: '能，就像自己的成员一样', correct: true, explanation: 'public 继承下基类的 public 成员成为派生类的 public 成员' },
        { text: '不能，必须通过基类对象访问', correct: false, explanation: '派生类可以直接访问继承来的 public 成员' },
        { text: '只能访问不能修改', correct: false, explanation: '派生类可以完全使用继承来的 public 成员，包括修改' },
        { text: '需要加 base. 前缀', correct: false, explanation: '不需要前缀，直接访问即可' },
      ],
    },
    {
      type: 'exposition',
      text: '### 使用继承后的对象创建\n\n创建派生类对象后，可以像使用普通对象一样使用：',
      code: 'Warrior w;\nw.name = "Alex";\nw.hp = 100;\nw.armor = 50;\nw.showStatus();  // 基类方法\nw.defend();      // 派生类方法',
    },
    {
      type: 'exposition',
      text: '总结继承语法的三要素：\n1️⃣ `class 派生类名 :`\n2️⃣ `public 基类名`\n3️⃣ 花括号里写特有成员 + 分号',
      textAnimation: 'typewriter',
    },
    {
      type: 'match-blocks',
      instruction: '排列一个完整的继承定义（Car 继承 Vehicle）：',
      fragments: ['class', 'Car', ':', 'public', 'Vehicle', '{', 'string', 'model', ';', '};'],
    },
    {
      type: 'exposition',
      text: '记住：继承的关键符号是**冒号`:`**和**继承方式**。\n下一课我们学习`protected`访问权限。',
    },
  ],
}

export default lesson
