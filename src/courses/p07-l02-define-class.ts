import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'define-class',
    chapter: 8,
    title: '定义一个类',
    subtitle: 'class 语法',
    description: '掌握 class 关键字 + 类名 + 花括号 + 分号的完整语法。',
    objectives: ['能写出 class 定义的基本语法', '能在类中声明成员变量'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '定义一个类的完整语法是：',
      code: 'class 类名 {\npublic:\n  类型 成员变量名;\n  类型 成员变量名;\n  // ...\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '来看一个真实的例子——`Hero` 类：',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n  int level;\n};',
    },
    {
      type: 'concept-cards',
      instruction: '认识 class 定义的四个部分：',
      cards: [
        { glyph: '🔤', term: 'class', meaning: '关键字，告诉编译器"我要定义一个类"', example: 'class Hero' },
        { glyph: '🏷️', term: '类名', meaning: '你取的名字，首字母通常大写', example: 'Hero / Player / Car' },
        { glyph: '📦', term: '{} 花括号', meaning: '里面放成员变量和成员函数', example: '{ string name; int hp; }' },
        { glyph: '🔚', term: '; 分号', meaning: '类定义结束必须加分号', example: '};' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：上一课我们说的"封装"是什么意思？',
      options: [
        { text: '把代码锁起来不让别人看', correct: false, explanation: '封装不是保密，是组织代码的方式' },
        { text: '把相关的数据和函数打包在一起', correct: true, explanation: '封装就是用 class 把数据和操作它函数放在一起' },
        { text: '让程序运行得更快', correct: false, explanation: '封装主要改善代码组织，不直接影响速度' },
        { text: '自动生成代码', correct: false, explanation: '封装不自动生成任何东西' },
      ],
    },
    {
      type: 'exposition',
      text: '类名的**命名规范**：\n- 首字母大写（`Hero` 而不是 `hero`）\n- 见名知意（`Player`、`Enemy`、`Weapon`）\n- 多个单词每个首字母大写（`GameCharacter`）',
    },
    {
      type: 'type-it',
      instruction: '定义一个 Enemy 类，包含类型和血量：',
      code: 'class Enemy {\npublic:\n  string type;\n  int hp;\n};',
      hints: [
        'class 关键字后面是类名 Enemy',
        'public: 后面跟成员变量',
        '别忘了结尾的分号 ;',
      ],
    },
    {
      type: 'exposition',
      text: '成员变量的声明和普通变量一样：**类型 + 变量名 + 分号**。\n只是在 class 的 `{}` 里面。',
    },
    {
      type: 'type-it',
      instruction: '定义一个 Weapon 类，包含名称和攻击力：',
      code: 'class Weapon {\npublic:\n  string name;\n  int damage;\n};',
      hints: [
        '类名 Weapon 首字母大写',
        '成员变量 string name 和 int damage',
        '结尾分号不能忘',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个类定义是正确的？',
      options: [
        { text: 'class Hero { public: string name; int hp; };', correct: true, explanation: '完整正确的 class 定义' },
        { text: 'Class Hero { public: string name; int hp; }', correct: false, explanation: 'C++ 用 class 不是 Class，且缺分号' },
        { text: 'class Hero { string name; int hp; }', correct: false, explanation: '没有 public: 和结尾分号' },
        { text: 'hero class { string name; int hp; };', correct: false, explanation: 'class 关键字必须在类名前' },
      ],
    },
    {
      type: 'exposition',
      text: '一个类可以有**任意多个成员变量**，类型可以是 `int`、`string`、`double`、`bool` 等等：',
      code: 'class Book {\npublic:\n  string title;\n  string author;\n  int pages;\n  double price;\n  bool inStock;\n};',
    },
    {
      type: 'type-it',
      instruction: '定义一个 GameSettings 类，包含三个设置项：',
      code: 'class GameSettings {\npublic:\n  int volume;\n  bool fullscreen;\n  string language;\n};',
      hints: [
        'int 类型存音量数值',
        'bool 类型存是否全屏',
        'string 类型存语言选项',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全一个 Point 类的定义：',
      template: '____ Point {\n____:\n  ____ x;\n  ____ y;\n____;',
      answers: ['class', 'public', 'int', 'int', ''],
      hints: ['第一个空是关键字', '第二个空是访问权限', '第三和第四空是坐标的类型'],
    },
    {
      type: 'multiple-choice',
      question: 'class 定义末尾的 `;` 如果漏了会怎样？',
      options: [
        { text: '编译器会报错', correct: true, explanation: 'C++ 规定 class 定义后面必须有分号，漏了编译错误' },
        { text: '程序正常运行，只是慢一点', correct: false, explanation: '编译都过不了，无法运行' },
        { text: 'class 定义无效，但后面的代码能用', correct: false, explanation: '语法错误，编译直接失败' },
        { text: '自动补全，不影响', correct: false, explanation: 'C++ 不会自动补全分号' },
      ],
    },
    {
      type: 'exposition',
      text: '定义好类之后，它就像一个新的**类型**。你可以声明这个类型的变量——这个变量就叫**对象**。',
      code: 'Hero hero1;   // 创建一个 Hero 类型的对象\nHero hero2;   // 另一个 Hero 对象',
    },
    {
      type: 'type-it',
      instruction: '定义一个类，然后创建它的对象：',
      code: 'class ScoreBoard {\npublic:\n  int score;\n  int level;\n};\n\nScoreBoard sb;',
      hints: [
        '先定义类，再用类名创建对象',
        '对象名 sb 首字母小写（变量命名习惯）',
        'class 定义的分号不能少',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全定义一个 Player 类并创建对象：',
      template: '____ Player {\n____:\n  string ____;\n  int ____;\n};\n\n____ p;',
      answers: ['class', 'public', 'name', 'hp', 'Player'],
      hints: ['第一个空是关键字', '第二个空是权限', '第三空是玩家名字', '第五空用类名创建对象'],
    },
    {
      type: 'multiple-choice',
      question: '`class` 和 `int` 有什么共同点？',
      options: [
        { text: '都是关键字，都可以用来声明变量/对象', correct: true, explanation: 'int 是内置类型，class 定义自定义类型，都能用来创建变量/对象' },
        { text: '都需要花括号', correct: false, explanation: 'int 不需要花括号' },
        { text: '后面都要加分号', correct: false, explanation: 'int 声明变量加分号，但 int 本身不加' },
        { text: '没有共同点', correct: false, explanation: '它们都是类型，都可以用来声明变量/对象' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：定义一个类的三步：\n1️⃣ `class` + 类名\n2️⃣ 花括号 `{}` 里写成员变量\n3️⃣ 末尾加分号 `;`',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
