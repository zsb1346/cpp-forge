import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-oop-fund',
    chapter: 8,
    title: 'OOP 基础综合练习',
    subtitle: '整个阶段 07',
    description: '综合运用类、对象、封装、构造、析构、this、static 等全部 OOP 基础知识。',
    objectives: ['能综合运用阶段 07 所有概念', '能独立设计一个完整的类'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'code-runner',
      instruction: '实现一个 Hero 类，使用 private 成员和 public 接口：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\nprivate:\n  string name;\n  int hp;\n  int level;\n\npublic:\n  Hero(string n, int h, int l) : name(n), hp(h), level(l) {}\n\n  string getName() const { return name; }\n  int getHp() const { return hp; }\n  int getLevel() const { return level; }\n\n  void takeDamage(int d) {\n    hp -= d;\n    if (hp < 0) hp = 0;\n  }\n\n  void heal(int a) {\n    hp += a;\n    if (hp > 100) hp = 100;\n  }\n\n  void levelUp() {\n    level++;\n    hp = 100;\n  }\n\n  void show() const {\n    cout << name << " Lv." << level << " HP:" << hp << endl;\n  }\n};\n\nint main() {\n  Hero h("勇者", 100, 1);\n  h.show();\n  h.takeDamage(40);\n  h.show();\n  h.heal(20);\n  h.show();\n  h.levelUp();\n  h.show();\n}',
      expectedOutput: '勇者 Lv.1 HP:100\n勇者 Lv.1 HP:60\n勇者 Lv.1 HP:80\n勇者 Lv.2 HP:100',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '添加 static 成员统计英雄总数：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\nprivate:\n  string name;\n  int hp;\n  static int count;\n\npublic:\n  Hero(string n, int h) : name(n), hp(h) {\n    count++;\n  }\n\n  ~Hero() {\n    count--;\n  }\n\n  string getName() const { return name; }\n  int getHp() const { return hp; }\n  static int getCount() { return count; }\n\n  void show() const {\n    cout << name << " HP:" << hp << endl;\n  }\n};\n\nint Hero::count = 0;\n\nint main() {\n  cout << "当前英雄: " << Hero::getCount() << endl;\n  Hero h1("勇者", 100);\n  Hero h2("法师", 80);\n  cout << "当前英雄: " << Hero::getCount() << endl;\n  {\n    Hero h3("忍者", 60);\n    cout << "当前英雄: " << Hero::getCount() << endl;\n  }\n  cout << "当前英雄: " << Hero::getCount() << endl;\n}',
      expectedOutput: '当前英雄: 0\n当前英雄: 2\n当前英雄: 3\n当前英雄: 2',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是初始化列表的正确写法？',
      options: [
        { text: 'Hero(int h) { hp = h; }', correct: false, explanation: '这是函数体赋值，不是初始化列表' },
        { text: 'Hero(int h) : hp(h) { }', correct: true, explanation: ': hp(h) 是初始化列表的正确语法' },
        { text: 'Hero(int h) : { hp = h; }', correct: false, explanation: '冒号和花括号之间要有初始化项' },
        { text: 'Hero(int h) :: hp(h) { }', correct: false, explanation: '用单冒号不是双冒号' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面关于构造和析构顺序哪个正确？',
      options: [
        { text: '构造顺序和析构顺序相同', correct: false, explanation: '析构顺序是构造顺序的逆序' },
        { text: '先构造的对象后析构', correct: false, explanation: '后构造的先析构' },
        { text: '后构造的对象先析构', correct: true, explanation: '像堆栈一样 LIFO' },
        { text: '顺序完全随机', correct: false, explanation: '顺序是确定且可预测的' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全一个完整的 Hero 类：',
      template: 'class Hero {\n____:\n  string name;\n  int hp;\n  static int ____;\n\n____:\n  Hero(string n, int h) : ____(n), ____(h) {\n    ____++;\n  }\n\n  ____Hero() {\n    ____--;\n  }\n\n  string ____() const { return name; }\n  int ____() const { return hp; }\n  static int getCount() { return count; }\n};',
      answers: ['private', 'count', 'public', 'name', 'hp', 'count', '~', 'count', 'getName', 'getHp'],
      hints: ['第一空：成员变量权限', '第二空：static 计数变量', '第三空：接口权限', '第四五空：初始化列表', '第六空：构造时增加计数', '第七空：析构函数符号', '第八空：析构时减少计数', '第九十空：getter 函数名'],
    },
    {
      type: 'multiple-choice',
      question: 'class 和 struct 的唯一区别是什么？',
      options: [
        { text: 'class 可以有成员函数，struct 不能', correct: false, explanation: 'struct 也能有成员函数' },
        { text: '默认访问权限不同', correct: true, explanation: 'class 默认 private，struct 默认 public' },
        { text: 'struct 只能在 C 中用', correct: false, explanation: 'C++ 完全支持 struct' },
        { text: 'class 快一些', correct: false, explanation: '两者性能相同' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'this 指针指向什么？',
      options: [
        { text: '指向当前对象的指针', correct: true, explanation: 'this 在成员函数中指向调用它的对象' },
        { text: '指向类的静态数据', correct: false, explanation: '静态数据不属于单个对象' },
        { text: '指向全局变量', correct: false, explanation: 'this 是对象指针，不是全局变量' },
        { text: '指向下一个对象', correct: false, explanation: 'this 只指向当前对象' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，使用 this 区分成员和参数：',
      template: 'class Player {\nprivate:\n  string name;\n  int level;\n\npublic:\n  void setName(string ____) {\n    ____->____ = name;\n  }\n  void ____(int level) {\n    ____->____ = level;\n  }\n};',
      answers: ['name', 'this', 'name', 'setLevel', 'this', 'level'],
      hints: ['参数名和成员名相同', '用 this-> 访问成员变量', '第四空：函数名'],
    },
    {
      type: 'exposition',
      text: '综合练习的最后一个任务——把所有概念串起来。\n你已经学会了：\n- class 定义 ✅\n- public/private 封装 ✅\n- 构造函数 & 析构函数 ✅\n- 初始化列表 ✅\n- this 指针 ✅\n- static 成员 ✅\n- const 成员函数 ✅',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '写一个包含所有核心要素的类定义：',
      code: 'class Hero {\nprivate:\n  string name;\n  int hp;\n  static int count;\n\npublic:\n  Hero(string n, int h) : name(n), hp(h) {\n    count++;\n  }\n\n  ~Hero() {\n    count--;\n  }\n\n  string getName() const { return name; }\n  int getHp() const { return hp; }\n\n  void takeDamage(int d) {\n    hp -= d;\n    if (hp < 0) hp = 0;\n  }\n\n  static int getCount() { return count; }\n};',
      hints: [
        'private 成员封装数据',
        '初始化列表初始化成员',
        'static count 统计对象数',
        'const getter 保证只读',
      ],
    },
    {
      type: 'type-it',
      instruction: '用 this 区分成员和参数并实现链式调用：',
      code: 'class Player {\nprivate:\n  int hp;\npublic:\n  Player& setHp(int hp) {\n    this->hp = hp;\n    return *this;\n  }\n  Player& addHp(int a) {\n    this->hp += a;\n    return *this;\n  }\n  int getHp() const { return hp; }\n};',
      hints: [
        'this->hp 是成员变量，右边 hp 是参数',
        'return *this 返回当前对象',
        '可以链式调用：p.setHp(50).addHp(30)',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：const 成员函数中的 const 写在哪个位置？',
      options: [
        { text: '函数名前面', correct: false, explanation: '写在函数名前面是 const 返回值' },
        { text: '参数列表后面，函数体前面', correct: true, explanation: 'int get() const { } 正确语法' },
        { text: '类的名字后面', correct: false, explanation: '不是类名' },
        { text: '花括号后面', correct: false, explanation: 'const 是声明的一部分，在 {} 前面' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 this 指针的正确用法：',
      template: 'class Hero {\nprivate:\n  string name;\npublic:\n  void setName(string name) {\n    ____->____ = ____;\n  }\n  Hero& addTitle(string t) {\n    this->name += t;\n    return ____;\n  }\n};',
      answers: ['this', 'name', 'name', '*this'],
      hints: ['第一、二、三空：用 this-> 区分成员和参数', '第四空：返回当前对象实现链式调用'],
    },
    {
      type: 'exposition',
      text: '总结一下我们在这个阶段学到的全部 OOP 基础概念：\n▸ class 定义 & 对象创建\n▸ public/private 封装\n▸ 成员函数 & this 指针\n▸ 构造函数 & 析构函数\n▸ 初始化列表 & 初始化顺序\n▸ static 成员 & const 成员函数\n▸ struct vs class & 文件分离',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '综合练习：定义一个使用全部概念的类：',
      code: 'class GameChar {\nprivate:\n  string name;\n  int hp;\n  static int count;\n\npublic:\n  GameChar(string n, int h) : name(n), hp(h) {\n    count++;\n  }\n\n  ~GameChar() { count--; }\n\n  string getName() const { return name; }\n  int getHp() const { return hp; }\n\n  void takeDamage(int d) {\n    this->hp -= d;\n    if (this->hp < 0) this->hp = 0;\n  }\n\n  GameChar& heal(int a) {\n    this->hp += a;\n    return *this;\n  }\n\n  static int getCount() { return count; }\n};',
      hints: [
        '初始化列表初始化成员',
        'this 指针区分参数和成员',
        'return *this 实现链式调用',
        'static 成员统计对象数',
        'const 成员函数标记只读',
      ],
    },
    {
      type: 'multiple-choice',
      question: '整个阶段 07 中，核心思想的"封装"指的是什么？',
      options: [
        { text: '把所有代码写在一个文件里', correct: false, explanation: '封装是访问控制，不是文件组织' },
        { text: '把数据和操作打包，并用 private/public 控制访问', correct: true, explanation: '封装 = private 数据 + public 接口' },
        { text: '让代码运行得更快', correct: false, explanation: '封装和性能无关' },
        { text: '用 class 替代 struct', correct: false, explanation: 'struct 也可以封装' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全一个使用了封装、构造、static 的完整类：',
      template: '____ Hero {\n____:\n  string name;\n  ____ int hp;\n  static int ____;\n\n____:\n  ____(string n, int h) ____ name(n), hp(h) {\n    ____++;\n  }\n\n  ____Hero() { ____--; }\n\n  string ____() const { return ____; }\n  ____ int getCount() { return count; }\n};',
      answers: ['class', 'private', 'int', 'count', 'public', 'Hero', ':', 'count', '~', 'count', 'getName', 'name', 'static'],
      hints: ['第一空：关键字', '第二空：封装权限', '第五空：接口权限', '第六空：构造函数名', '第七空：初始化列表冒号', '第九空：析构波浪号', '第十一空：getter 函数名'],
    },
    {
      type: 'code-runner',
      instruction: '综合练习——完整的游戏角色管理系统：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\nprivate:\n  string name;\n  int hp;\n  int level;\n  static int totalHeroes;\n\npublic:\n  Hero(string n, int h, int l) : name(n), hp(h), level(l) {\n    totalHeroes++;\n    cout << name << " 加入战斗! 当前英雄数:" << totalHeroes << endl;\n  }\n\n  ~Hero() {\n    totalHeroes--;\n    cout << name << " 阵亡! 剩余英雄:" << totalHeroes << endl;\n  }\n\n  string getName() const { return name; }\n  int getHp() const { return hp; }\n  int getLevel() const { return level; }\n\n  void takeDamage(int d) {\n    hp -= d;\n    if (hp < 0) hp = 0;\n    cout << name << " 受到" << d << "点伤害 HP:" << hp << endl;\n  }\n\n  void levelUp() {\n    level++;\n    hp = 100;\n    cout << name << " 升级! Lv." << level << " HP回满" << endl;\n  }\n\n  static int getTotal() { return totalHeroes; }\n};\n\nint Hero::totalHeroes = 0;\n\nint main() {\n  Hero h1("勇者", 100, 1);\n  Hero h2("法师", 80, 2);\n  h1.takeDamage(50);\n  h2.takeDamage(90);\n  h1.levelUp();\n  cout << "存活英雄: " << Hero::getTotal() << endl;\n}',
      expectedOutput: '勇者 加入战斗! 当前英雄数:1\n法师 加入战斗! 当前英雄数:2\n勇者 受到50点伤害 HP:50\n法师 受到90点伤害 HP:0\n勇者 升级! Lv.2 HP回满\n存活英雄: 2\n法师 阵亡! 剩余英雄:1\n勇者 阵亡! 剩余英雄:0',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
