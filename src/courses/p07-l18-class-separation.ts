import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'class-separation',
    chapter: 8,
    title: '类的声明与实现分离',
    subtitle: '.h 放声明 .cpp 放实现',
    description: '学会把类的声明放在 .h 文件，成员函数实现放在 .cpp 文件。',
    objectives: ['能写出类的头文件和实现文件分离的代码'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '当类变大了，把所有代码写在一个文件里会很难管理。\nC++ 的惯例：**声明放 .h，实现放 .cpp**。',
      code: '// Hero.h —— 类的声明\nclass Hero {\nprivate:\n  string name;\n  int hp;\n\npublic:\n  Hero(string n, int h);\n  string getName() const;\n  void takeDamage(int d);\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '成员函数的实现放在 `.cpp` 文件，用 `类名::` 前缀表明它属于哪个类：',
      code: '// Hero.cpp —— 类的实现\n#include "Hero.h"\n\nHero::Hero(string n, int h) : name(n), hp(h) {}\n\nstring Hero::getName() const {\n  return name;\n}\n\nvoid Hero::takeDamage(int d) {\n  hp -= d;\n  if (hp < 0) hp = 0;\n}',
    },
    {
      type: 'concept-cards',
      instruction: '认识分离模式：',
      cards: [
        { glyph: '📋', term: '.h 头文件', meaning: '放类的声明——类名、成员、函数签名', example: 'class Hero { ... };' },
        { glyph: '⚙️', term: '.cpp 源文件', meaning: '放成员函数的具体实现代码', example: 'Hero::Hero() { }' },
        { glyph: '🔗', term: '类名::函数名', meaning: '实现时用 :: 表明属于哪个类', example: 'Hero::getName()' },
        { glyph: '#️⃣', term: '#include', meaning: 'cpp 文件开头包含对应的头文件', example: '#include "Hero.h"' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：const 成员函数中，const 写在哪个位置？',
      options: [
        { text: '函数名前面', correct: false, explanation: '不是在函数名前' },
        { text: '参数列表后面，函数体前面', correct: true, explanation: 'const 放在 () 和 {} 之间' },
        { text: '返回值类型前面', correct: false, explanation: '返回值前的 const 修饰返回值' },
        { text: '函数体里面', correct: false, explanation: 'const 是函数声明的一部分' },
      ],
    },
    {
      type: 'exposition',
      text: '为什么要分离？\n1️⃣ **编译更快**——改 cpp 只编译一个文件\n2️⃣ **接口清晰**——看 .h 就知道类有什么功能\n3️⃣ **代码复用**——其他人只要包含 .h 就能用',
    },
    {
      type: 'type-it',
      instruction: '写一个 .h 头文件的声明：',
      code: '// Player.h\n#ifndef PLAYER_H\n#define PLAYER_H\n\n#include <string>\nusing namespace std;\n\nclass Player {\nprivate:\n  string name;\n  int level;\n\npublic:\n  Player(string n, int l);\n  string getName() const;\n  int getLevel() const;\n  void levelUp();\n};\n\n#endif',
      hints: [
        '#ifndef / #define / #endif 是头文件保护，防止重复包含',
        '在 .h 里只放声明，不放实现',
        '函数声明后面加分号，不写 {}',
      ],
    },
    {
      type: 'type-it',
      instruction: '写对应的 .cpp 实现文件：',
      code: '// Player.cpp\n#include "Player.h"\n\nPlayer::Player(string n, int l) : name(n), level(l) {}\n\nstring Player::getName() const {\n  return name;\n}\n\nint Player::getLevel() const {\n  return level;\n}\n\nvoid Player::levelUp() {\n  level++;\n}',
      hints: [
        '#include "Player.h" 包含自己的头文件',
        '用 Player:: 前缀表明每个函数属于 Player 类',
        '构造函数也用 Player::Player()',
      ],
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序拼出头文件中的类声明：',
      fragments: ['class', 'Hero', '{', 'public:', 'Hero();', 'void show() const;', 'private:', 'int hp;', '};'],
      distractors: ['Hero::Hero() { }', 'void Hero::show() const { }'],
    },
    {
      type: 'fill-in',
      prompt: '补全 .cpp 中的成员函数实现：',
      template: '#include "Hero.h"\n\n____::____(string n, int h) : name(n), hp(h) {}\n\nvoid ____::takeDamage(int d) {\n  ____ -= d;\n  if (____ < 0) ____ = 0;\n}',
      answers: ['Hero', 'Hero', 'Hero', 'hp', 'hp', 'hp'],
      hints: ['前两个空用类名::构造函数名', '函数名前加类名::', '后面是成员变量的操作'],
    },
    {
      type: 'multiple-choice',
      question: '头文件中的 #ifndef/#define/#endif 是什么作用？',
      options: [
        { text: '让程序跑得更快', correct: false, explanation: '和性能无关' },
        { text: '防止头文件被重复包含', correct: true, explanation: '头文件保护——防止一个 .cpp 多次包含同一个 .h' },
        { text: '声明变量', correct: false, explanation: '#ifndef 是预处理指令，不是变量声明' },
        { text: '定义函数', correct: false, explanation: '这不是函数定义' },
      ],
    },
    {
      type: 'exposition',
      text: '回顾 p05-14 的函数声明与实现分离——**和类的分离完全一样**：\n- 函数声明放 .h\n- 函数实现放 .cpp，加 `类名::` 前缀',
    },
    {
      type: 'type-it',
      instruction: '写主程序文件调用类：',
      code: '// main.cpp\n#include <iostream>\n#include "Player.h"\nusing namespace std;\n\nint main() {\n  Player p("小明", 1);\n  cout << p.getName() << " Lv." << p.getLevel() << endl;\n  p.levelUp();\n  cout << p.getName() << " Lv." << p.getLevel() << endl;\n}',
      hints: [
        '#include "Player.h" 使用双引号包含自定义头文件',
        '不包含 .cpp 文件，只包含 .h',
        '链接器会自动把 .cpp 编译后链接进来',
      ],
    },
    {
      type: 'multiple-choice',
      question: '在 .cpp 中实现成员函数时，用哪个符号表示属于哪个类？',
      options: [
        { text: '. 点号', correct: false, explanation: '点号用于对象访问成员' },
        { text: ':: 双冒号', correct: true, explanation: '类名::函数名 表示这个函数属于该类' },
        { text: '-> 箭头', correct: false, explanation: '箭头用于指针访问成员' },
        { text: '不用符号，直接写函数名', correct: false, explanation: '不加类名:: 就成了普通函数定义' },
      ],
    },
    {
      type: 'exposition',
      text: '实际项目中的文件组织：',
      code: 'project/\n├── include/        # 头文件目录\n│   ├── Hero.h\n│   └── Player.h\n├── src/            # 源文件目录\n│   ├── Hero.cpp\n│   ├── Player.cpp\n│   └── main.cpp\n└── Makefile / CMakeLists.txt',
    },
    {
      type: 'type-it',
      instruction: '头文件的 #include 保护——防止重复包含：',
      code: '// Hero.h\n#ifndef HERO_H      // 如果没定义 HERO_H\n#define HERO_H      // 定义 HERO_H\n\n#include <string>\nusing namespace std;\n\nclass Hero {\npublic:\n  Hero(string n, int h);\n  void show() const;\n};\n\n#endif              // 结束保护',
      hints: [
        '#ifndef 检查宏是否已定义',
        '#define 定义宏，防止下次再进来',
        '#endif 结束条件编译块',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 .h 和 .cpp 的分离模式：',
      template: '// Hero.h\n#ifndef ____\n#define HERO_H\nclass Hero {\npublic:\n  ____(string n, int h);\n  void ____() const;\n};\n____\n\n// Hero.cpp\n#include "____"\nHero::Hero(string n, int h) ____ name(n), hp(h) {}\nvoid Hero::show() const { cout << name; }',
      answers: ['HERO_H', 'Hero', 'show', '#endif', 'Hero.h', ':'],
      hints: ['第一空：头文件保护宏名', '第二空：构造函数名', '第三空：成员函数名', '第四空：结束 #endif', '第五空：包含头文件', '第六空：初始化列表冒号'],
    },
    {
      type: 'exposition',
      text: '总结文件分离的步骤：\n1️⃣ `.h` 声明类 + 函数签名\n2️⃣ `.cpp` 包含 `.h`，用 `类名::` 实现函数\n3️⃣ `main.cpp` 包含 `.h`，使用类\n4️⃣ 头文件保护 `#ifndef/#define/#endif`',
      textAnimation: 'typewriter',
    },
    {
      type: 'code-runner',
      instruction: '运行完整分离的例子（模拟两个文件合并）：',
      code: '#include <iostream>\nusing namespace std;\n\n// === Hero.h (声明) ===\nclass Hero {\nprivate:\n  string name;\n  int hp;\npublic:\n  Hero(string n, int h);\n  string getName() const;\n  int getHp() const;\n  void takeDamage(int d);\n};\n\n// === Hero.cpp (实现) ===\nHero::Hero(string n, int h) : name(n), hp(h) {}\nstring Hero::getName() const { return name; }\nint Hero::getHp() const { return hp; }\nvoid Hero::takeDamage(int d) {\n  hp -= d;\n  if (hp < 0) hp = 0;\n}\n\n// === main.cpp ===\nint main() {\n  Hero h("勇者", 100);\n  cout << h.getName() << " HP:" << h.getHp() << endl;\n  h.takeDamage(30);\n  cout << h.getName() << " HP:" << h.getHp() << endl;\n}',
      expectedOutput: '勇者 HP:100\n勇者 HP:70',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
