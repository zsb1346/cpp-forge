import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'create-object',
    chapter: 8,
    title: '创建对象',
    subtitle: '用类就像用类型',
    description: '学会用自定义类声明变量——也叫创建对象或实例。',
    objectives: ['能用类名声明对象变量', '能区分类和对象的概念'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '定义好类之后，它就成了一个**新的类型**。就像 `int`、`string` 一样用：',
      code: 'Hero h;        // 声明一个 Hero 类型的对象\nHero h2, h3;   // 可以声明多个',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**类**是设计图，**对象**是根据设计图造出来的实物。\n一张 Hero 设计图，可以造出无数个英雄对象。',
      code: 'Hero h1;   // 对象1\nHero h2;   // 对象2\nHero h3;   // 对象3',
    },
    {
      type: 'concept-cards',
      instruction: '区分类和对象：',
      cards: [
        { glyph: '📋', term: '类 (class)', meaning: '设计图——定义有什么数据和行为', example: 'class Hero { ... };' },
        { glyph: '🎮', term: '对象 (object)', meaning: '实物——根据类创建的具体个体', example: 'Hero h;' },
        { glyph: '🏭', term: '实例化', meaning: '从类创建对象的过程', example: 'Hero h; 就是实例化' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：定义一个类用哪个关键字？',
      options: [
        { text: 'struct', correct: false, explanation: 'struct 也可以，但这里学的是 class' },
        { text: 'class', correct: true, explanation: 'class 是定义类的关键字' },
        { text: 'object', correct: false, explanation: '没有 object 这个关键字' },
        { text: 'new', correct: false, explanation: 'new 是动态分配用的，不是定义类' },
      ],
    },
    {
      type: 'exposition',
      text: '声明对象和声明普通变量的语法**完全一样**：\n`类型 变量名;`',
      code: 'int x;        // int 类型的变量\nHero h;        // Hero 类型的变量（对象）\nstring s;      // string 类型的变量\nWeapon w;      // Weapon 类型的变量（对象）',
    },
    {
      type: 'type-it',
      instruction: '先定义一个 Hero 类，再创建两个对象：',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n};\n\nHero h1;\nHero h2;',
      hints: [
        '先写 class 定义，再写对象声明',
        'h1 和 h2 是两个独立的对象',
        'class 定义的分号不要漏',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`Hero h;` 这行代码做了什么？',
      options: [
        { text: '定义了一个叫 Hero 的类', correct: false, explanation: 'Hero 已经在前面定义好了，这里是创建对象' },
        { text: '创建了一个 Hero 类型的对象，名字叫 h', correct: true, explanation: '用类名 Hero 声明变量 h，h 就是一个 Hero 对象' },
        { text: '调用了 Hero 的函数', correct: false, explanation: '没有调用函数，只是在声明变量' },
        { text: '删除了一个叫 Hero 的东西', correct: false, explanation: '声明不会删除任何东西' },
      ],
    },
    {
      type: 'exposition',
      text: '每个对象都有自己的**独立副本**的成员变量。\n修改 h1 的 name 不会影响 h2：',
      code: 'Hero h1, h2;\nh1.name = "勇者";\nh2.name = "法师";\n// h1.name 是 "勇者"\n// h2.name 是 "法师"',
    },
    {
      type: 'type-it',
      instruction: '声明一个 Weapon 类，创建两个武器对象：',
      code: 'class Weapon {\npublic:\n  string name;\n  int damage;\n};\n\nWeapon sword;\nWeapon bow;',
      hints: [
        'Weapon 是类名，sword 和 bow 是对象名',
        '每个对象独立存储自己的 name 和 damage',
        '结尾分号不能漏',
      ],
    },
    {
      type: 'fill-in',
      prompt: '创建一个 Car 对象：',
      template: 'Car ____;',
      answers: ['myCar'],
      hints: ['用类名 Car 声明变量', '对象名可以任意取'],
    },
    {
      type: 'exposition',
      text: '对象在内存中是**真实存在的**。每个对象占据一块内存，存放它的成员变量。\n这和 `int x;` 在内存里占 4 个字节是一样的道理。',
    },
    {
      type: 'type-it',
      instruction: '定义一个简单类并创建对象数组：',
      code: 'class Item {\npublic:\n  string name;\n  int count;\n};\n\nItem items[3];',
      hints: [
        'items[3] 是包含 3 个 Item 对象的数组',
        '每个元素都是一个独立的 Item 对象',
        '类定义和普通变量声明一样放在函数外面或 main 里',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个说法是对的？',
      options: [
        { text: '一个类只能创建一个对象', correct: false, explanation: '一个类可以创建任意多个对象' },
        { text: '对象是类的具体实例', correct: true, explanation: '类是设计图，对象是根据设计图造出来的实物' },
        { text: '类存在内存里，对象存在硬盘里', correct: false, explanation: '类和对象都在内存中' },
        { text: '类和对象是同一个东西', correct: false, explanation: '类是定义，对象是实例，两个不同概念' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：定义一个 Enemy 类并创建两个对象：',
      template: '____ Enemy {\n____:\n  string ____;\n  int ____;\n};\n\nEnemy ____;\nEnemy ____;',
      answers: ['class', 'public', 'type', 'hp', 'e1', 'e2'],
      hints: ['前两行是类定义', '后两行创建两个 Enemy 对象'],
    },
    {
      type: 'exposition',
      text: '对象名和类名**不同**：\n- 类名首字母大写（`Hero`）——是类型\n- 对象名首字母小写（`h`）——是变量',
    },
    {
      type: 'type-it',
      instruction: '声明多个不同类型的对象：',
      code: 'class Player { public: string name; int level; };\nclass Enemy { public: string type; int hp; };\n\nPlayer p;\nEnemy e;',
      hints: [
        'Player 和 Enemy 是两个不同的类',
        'p 是 Player 对象，e 是 Enemy 对象',
        '每个类都有自己的成员变量',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`类名 对象名;` 中，哪个是类型，哪个是变量？',
      options: [
        { text: '类名是类型，对象名是变量', correct: true, explanation: '像 int x; 一样，类名是类型，对象名是变量名' },
        { text: '对象名是类型，类名是变量', correct: false, explanation: '搞反了，类名是类型名' },
        { text: '两个都是类型', correct: false, explanation: '对象名是变量名' },
        { text: '两个都是变量', correct: false, explanation: '类名是类型' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行看看类的定义和对象创建：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n  string name;\n  int hp;\n};\n\nint main() {\n  Hero h1;\n  Hero h2;\n  h1.name = "勇者";\n  h1.hp = 100;\n  h2.name = "法师";\n  h2.hp = 80;\n  \n  cout << h1.name << " HP:" << h1.hp << endl;\n  cout << h2.name << " HP:" << h2.hp << endl;\n}',
      expectedOutput: '勇者 HP:100\n法师 HP:80',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
