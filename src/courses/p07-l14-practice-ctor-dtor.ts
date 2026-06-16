import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-ctor-dtor',
    chapter: 8,
    title: '构造与析构练习',
    subtitle: '巩固 09-13',
    description: '通过练习巩固构造函数、初始化列表和析构函数的知识。',
    objectives: ['能独立运用构造和析构函数', '能理解对象的生命周期'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'type-it',
      instruction: '定义一个类，构造函数输出"创建"，析构函数输出"销毁"：',
      code: 'class Item {\npublic:\n  string name;\n\n  Item(string n) {\n    name = n;\n    cout << name << " 创建\\n";\n  }\n\n  ~Item() {\n    cout << name << " 销毁\\n";\n  }\n};',
      hints: [
        '构造函数名和类名一样：Item',
        '析构函数名是 ~Item',
        '在构造和析构中分别输出信息',
      ],
    },
    {
      type: 'type-it',
      instruction: '观察多个对象的构造析构顺序：',
      code: 'int main() {\n  Item a("A");\n  Item b("B");\n  {\n    Item c("C");\n  }\n  cout << "中间\\n";\n}\n// 输出顺序？',
      hints: [
        'A 和 B 在 main 作用域，C 在内部花括号',
        'C 在 } 时析构',
        'A 和 B 在 main 结束时析构',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全构造函数和析构函数的定义：',
      template: 'class Player {\npublic:\n  string name;\n  int hp;\n\n  ____(string n, int h) ____ name(n), ____(h) {\n    cout << name << " 创建\\n";\n  }\n\n  ____() {\n    cout << name << " 销毁\\n";\n  }\n};',
      answers: ['Player', ':', 'hp', '~Player'],
      hints: ['第一空：构造函数名', '第二空：初始化列表开始', '第三空：成员 hp 的初始化', '第四空：析构函数名'],
    },
    {
      type: 'code-runner',
      instruction: '运行并观察多个对象的生命周期：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Player {\npublic:\n  string name;\n\n  Player(string n) : name(n) {\n    cout << name << " 进入游戏\\n";\n  }\n\n  ~Player() {\n    cout << name << " 退出游戏\\n";\n  }\n};\n\nvoid battle() {\n  Player p("临时角色");\n  cout << "战斗中...\\n";\n}\n\nint main() {\n  Player p1("勇者");\n  Player p2("法师");\n  battle();\n  cout << "回城\\n";\n}',
      expectedOutput: '勇者 进入游戏\n法师 进入游戏\n临时角色 进入游戏\n战斗中...\n临时角色 退出游戏\n回城\n法师 退出游戏\n勇者 退出游戏',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'type-it',
      instruction: '练习：带初始化列表的构造函数：',
      code: 'class Book {\npublic:\n  string title;\n  int pages;\n\n  Book(string t, int p) : title(t), pages(p) {\n    cout << "《" << title << "》" << pages << "页\\n";\n  }\n};',
      hints: [
        '使用初始化列表 title(t), pages(p)',
        '构造函数体可以写额外逻辑',
        '确保初始化列表顺序和声明顺序一致',
      ],
    },
    {
      type: 'exposition',
      text: '再看一个细节：**当对象作为函数参数时**，传递过程中也会发生构造和析构（复制）：',
      code: 'void func(Hero h) {   // 传入时复制构造\n  cout << "函数内\\n";\n}                      // 函数结束时析构\n\nint main() {\n  Hero h1;            // 构造\n  func(h1);           // 复制构造一个临时对象\n  cout << "main\\n";\n}                      // h1 析构',
    },
    {
      type: 'multiple-choice',
      question: '回顾：初始化列表和普通赋值的区别是什么？',
      options: [
        { text: '没有区别', correct: false, explanation: '初始化列表直接初始化，赋值是先默认构造再赋值' },
        { text: '初始化列表直接初始化，赋值先默认构造再赋值', correct: true, explanation: '初始化列表更高效，尤其对复杂类型' },
        { text: '赋值更快', correct: false, explanation: '初始化列表通常更快' },
        { text: '初始化列表只能在 main 中使用', correct: false, explanation: '初始化列表是构造函数的一部分' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合练习：定义一个完整的类：',
      code: 'class Data {\nprivate:\n  int* value;\npublic:\n  Data(int v) : value(new int(v)) {\n    cout << "分配内存 值=" << *value << endl;\n  }\n  ~Data() {\n    cout << "释放内存 值=" << *value << endl;\n    delete value;\n  }\n  int get() const { return *value; }\n};',
      hints: [
        '构造函数分配动态内存',
        '析构函数释放内存——防止泄漏',
        '成对的 new/delete 是最佳实践',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，创建一个类并观察构造析构：',
      template: 'class Test {\npublic:\n  ____ id;\n\n  Test(int i) : ____(i) {\n    cout << "构造 " << ____ << "\\n";\n  }\n\n  ____() {\n    cout << "析构 " << ____ << "\\n";\n  }\n};',
      answers: ['int', 'id', 'id', '~Test', 'id'],
      hints: ['第一空：成员变量的类型', '第二空：初始化列表', '第四空：析构函数名'],
    },
    {
      type: 'multiple-choice',
      question: '构造函数和析构函数的共同点是什么？',
      options: [
        { text: '都没有返回值', correct: true, explanation: '构造和析构都不写返回值类型' },
        { text: '都可以重载', correct: false, explanation: '析构函数不能重载' },
        { text: '都有参数', correct: false, explanation: '析构函数没有参数' },
        { text: '函数名相同', correct: false, explanation: '构造函数名是类名，析构是 ~类名' },
      ],
    },
    {
      type: 'type-it',
      instruction: '综合练习：完整的类定义：',
      code: 'class Enemy {\nprivate:\n  string type;\n  int hp;\n\npublic:\n  Enemy(string t, int h) : type(t), hp(h) {\n    cout << type << " 出现 HP:" << hp << "\\n";\n  }\n\n  void takeDamage(int d) {\n    hp -= d;\n    cout << type << " 受到 " << d << " 点伤害\\n";\n  }\n\n  ~Enemy() {\n    cout << type << " 被击败\\n";\n  }\n};',
      hints: [
        '构造函数初始化 type 和 hp',
        'takeDamage 修改 hp',
        '析构函数输出被击败信息',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行完整例子，查看流程：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Enemy {\nprivate:\n  string type;\n  int hp;\n\npublic:\n  Enemy(string t, int h) : type(t), hp(h) {\n    cout << type << " 出现 HP:" << hp << endl;\n  }\n\n  void takeDamage(int d) {\n    hp -= d;\n    if (hp < 0) hp = 0;\n    cout << type << " 受到 " << d << " 伤害 HP:" << hp << endl;\n  }\n\n  ~Enemy() {\n    if (hp <= 0) cout << type << " 被击败!" << endl;\n    else cout << type << " 逃跑了" << endl;\n  }\n};\n\nint main() {\n  Enemy e1("史莱姆", 30);\n  Enemy e2("魔王", 500);\n  e1.takeDamage(30);\n  e2.takeDamage(100);\n  cout << "战斗结束\\n";\n}',
      expectedOutput: '史莱姆 出现 HP:30\n魔王 出现 HP:500\n史莱姆 受到 30 伤害 HP:0\n魔王 受到 100 伤害 HP:400\n战斗结束\n魔王 逃跑了\n史莱姆 被击败!',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '下面关于析构顺序的说法哪个正确？',
      options: [
        { text: '先创建的先析构', correct: false, explanation: '后创建的先析构（LIFO）' },
        { text: '后创建的先析构', correct: true, explanation: '像堆栈一样，后进先出' },
        { text: '和创建顺序无关', correct: false, explanation: '析构顺序和构造顺序相反' },
        { text: '按字母顺序析构', correct: false, explanation: '跟名字无关' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码：创建对象并观察流程：',
      template: 'int main() {\n  Enemy ____("史莱姆", 30);\n  Enemy ____("魔王", 500);\n  ____.takeDamage(30);\n}\n// 析构顺序：先 ____ 后 ____',
      answers: ['e1', 'e2', 'e1', 'e2', 'e1'],
      hints: ['前两空：对象名', '第三空：调用成员函数', '最后两空：析构顺序'],
    },
    {
      type: 'type-it',
      instruction: '用初始化列表写构造函数：',
      code: 'class Hero {\nprivate:\n  string name;\n  int hp;\npublic:\n  Hero(string n, int h) : name(n), hp(h) {\n    cout << name << " 构造\\n";\n  }\n  ~Hero() {\n    cout << name << " 析构\\n";\n  }\n  void show() const {\n    cout << name << " HP:" << hp << endl;\n  }\n};',
      hints: [
        '初始化列表 : name(n), hp(h)',
        '构造函数和析构函数都输出信息',
        '可以观察对象的生命周期',
      ],
    },
    {
      type: 'multiple-choice',
      question: '关于析构函数的调用时机，哪个说法正确？',
      options: [
        { text: '调用成员函数时触发析构', correct: false, explanation: '析构函数在对象销毁时调用' },
        { text: '局部对象在离开作用域时自动析构', correct: true, explanation: '遇到 } 时局部对象的析构函数自动执行' },
        { text: '对象创建时析构', correct: false, explanation: '创建时调构造函数' },
        { text: '析构函数需要手动调用', correct: false, explanation: '析构函数自动调用，不需要手动调' },
      ],
    },
    {
      type: 'type-it',
      instruction: '练习：观察函数参数传递时的构造析构：',
      code: 'class Test {\npublic:\n  Test() { cout << "构造\\n"; }\n  ~Test() { cout << "析构\\n"; }\n};\n\nvoid func(Test t) {\n  cout << "函数内\\n";\n}\n\nint main() {\n  Test t;\n  func(t);\n  cout << "main 结束\\n";\n}',
      hints: [
        'func(t) 会复制一个 Test 对象',
        '函数结束时会析构复制的对象',
        'main 结束时会析构原来的 t',
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行完整例子观察完整的构造析构流程：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Player {\npublic:\n  string name;\n\n  Player(string n) : name(n) {\n    cout << name << " 进入游戏\\n";\n  }\n\n  ~Player() {\n    cout << name << " 退出游戏\\n";\n  }\n};\n\nvoid battle() {\n  Player p("临时");\n  cout << "战斗中\\n";\n}\n\nint main() {\n  Player p1("勇者");\n  battle();\n  cout << "继续\\n";\n  Player p2("法师");\n}',
      expectedOutput: '勇者 进入游戏\n临时 进入游戏\n战斗中\n临时 退出游戏\n继续\n法师 进入游戏\n法师 退出游戏\n勇者 退出游戏',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
