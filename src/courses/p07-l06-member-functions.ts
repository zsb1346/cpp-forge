import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'member-functions',
    chapter: 8,
    title: '成员函数',
    subtitle: '属于对象的函数',
    description: '学会在类中定义和使用成员函数——属于对象的函数。',
    objectives: ['能定义成员函数', '能在成员函数中访问成员变量'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '类里不仅可以放变量，还可以放**函数**——这些函数叫**成员函数**。',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  void showStatus() {          // 成员函数\n    cout << name << " HP:" << hp;\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '成员函数可以直接使用类里的**成员变量**——不需要传参。\n因为它本来就是属于这个类的，认识自家人。',
      code: 'void showStatus() {\n  // name 和 hp 直接拿来用，不用传参\n  cout << name << " HP:" << hp;\n}',
    },
    {
      type: 'multiple-choice',
      question: '回顾：private 成员可以在哪里访问？',
      options: [
        { text: '在任何地方都可以', correct: false, explanation: 'private 限制外部访问' },
        { text: '在类的成员函数内部', correct: true, explanation: '成员函数属于类，可以访问所有成员变量' },
        { text: '只有在 main 函数里', correct: false, explanation: 'main 在外面，不能访问 private' },
        { text: '不能在任何地方访问', correct: false, explanation: '成员函数内部可以访问' },
      ],
    },
    {
      type: 'exposition',
      text: '调用成员函数也用 `.`：',
      code: 'Hero h;\nh.name = "勇者";\nh.hp = 100;\nh.showStatus();   // 输出：勇者 HP:100',
    },
    {
      type: 'type-it',
      instruction: '定义一个带成员函数的类并调用：',
      code: 'class Hero {\npublic:\n  string name;\n  int hp;\n\n  void showStatus() {\n    cout << name << " HP:" << hp << endl;\n  }\n};\n\nHero h;\nh.name = "勇者";\nh.hp = 100;\nh.showStatus();',
      hints: [
        '成员函数 showStatus 直接使用 name 和 hp',
        '调用时用 h.showStatus() 加上括号',
        '成员函数不需要传参就能访问成员变量',
      ],
    },
    {
      type: 'type-it',
      instruction: '定义成员函数来修改成员变量：',
      code: 'class Player {\npublic:\n  int score;\n\n  void addScore(int points) {\n    score = score + points;\n  }\n};\n\nPlayer p;\np.score = 0;\np.addScore(10);\ncout << p.score;',
      hints: [
        'addScore 接收一个参数 points',
        '函数内部把 points 加到成员变量 score 上',
        '调用 p.addScore(10) 给分数加 10',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全成员函数，让角色受伤：',
      template: 'class Hero {\npublic:\n  int hp;\n\n  void ____(int damage) {\n    ____ = ____ - damage;\n  }\n};',
      answers: ['takeDamage', 'hp', 'hp'],
      hints: ['第一空是函数名', '后面两空：hp 减 damage'],
    },
    {
      type: 'exposition',
      text: '成员函数可以**读写成员变量**，也可以在内部调用其他成员函数：',
      code: 'class Hero {\npublic:\n  int hp;\n  int maxHp;\n\n  void takeDamage(int d) {\n    hp = hp - d;\n    if (hp < 0) hp = 0;\n  }\n\n  void showStatus() {\n    cout << "HP:" << hp << "/" << maxHp;\n  }\n\n  void hitAndShow(int d) {\n    takeDamage(d);     // 调用另一个成员函数\n    showStatus();\n  }\n};',
    },
    {
      type: 'multiple-choice',
      question: '成员函数内部能直接使用成员变量吗？',
      options: [
        { text: '不能，必须传参', correct: false, explanation: '成员函数天然可以访问成员变量' },
        { text: '可以，成员函数属于同类，认识自家人', correct: true, explanation: '成员函数可以直接读写类的所有成员变量' },
        { text: '只能读不能写', correct: false, explanation: '读写都可以' },
        { text: '只能写不能读', correct: false, explanation: '读写都可以' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个有多个成员函数的类：',
      code: 'class Rectangle {\npublic:\n  int width;\n  int height;\n\n  int area() {\n    return width * height;\n  }\n\n  void printInfo() {\n    cout << width << "x" << height << " area=" << area();\n  }\n};',
      hints: [
        'area 函数计算面积，返回 int',
        'printInfo 内部调用了 area()',
        '成员函数之间可以互相调用',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全一个计数器类的成员函数：',
      template: 'class Counter {\n____:\n  int count;\n\n____:\n  void ____() {\n    count++;\n  }\n  void ____() {\n    count = 0;\n  }\n  int ____() {\n    return count;\n  }\n};',
      answers: ['private', 'public', 'increment', 'reset', 'getCount'],
      hints: ['第三空：增加计数', '第四空：重置为 0', '第五空：获取当前值'],
    },
    {
      type: 'multiple-choice',
      question: '下面哪种情况适合用成员函数？',
      options: [
        { text: '打印 Hello World', correct: false, explanation: '不需要类，普通函数就行' },
        { text: '操作类的内部数据', correct: true, explanation: '成员函数专门用来操作所属类的数据' },
        { text: '计算两个数相加', correct: false, explanation: '普通函数就可以，不需要类' },
        { text: '全局配置', correct: false, explanation: '全局配置通常用普通函数或静态成员' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个完整的英雄类：',
      code: 'class Hero {\nprivate:\n  int hp;\n  int maxHp;\n\npublic:\n  void init(int h) {\n    hp = h;\n    maxHp = h;\n  }\n  void takeDamage(int d) {\n    hp = hp - d;\n    if (hp < 0) hp = 0;\n  }\n  void heal(int a) {\n    hp = hp + a;\n    if (hp > maxHp) hp = maxHp;\n  }\n  void show() {\n    cout << "HP:" << hp << "/" << maxHp;\n  }\n};',
      hints: [
        'private 的 hp 和 maxHp 通过 public 函数操作',
        'heal 治疗不能超过最大血量',
        'takeDamage 保证血量不低于 0',
      ],
    },
    {
      type: 'exposition',
      text: '成员函数和普通函数的区别：\n- **成员函数**——属于类，可以直接用成员变量\n- **普通函数**——单独的，要传参或访问全局',
      code: '// 成员函数：直接用 hp\nvoid takeDamage(int d) {\n  hp = hp - d;\n}\n\n// 普通函数：需要传对象\nvoid takeDamage(Hero &h, int d) {\n  h.hp = h.hp - d;\n}',
    },
    {
      type: 'exposition',
      text: '成员函数可以在类内部连续定义，每个函数之间用不同的名字区分。\n成员函数内部可以**调用其他成员函数**。',
      code: 'class Hero {\npublic:\n  void a() { b(); }\n  void b() { cout << "B"; }\n};',
    },
    {
      type: 'type-it',
      instruction: '定义一个成员函数调用另一个成员函数：',
      code: 'class Team {\npublic:\n  void lead() {\n    cout << "队长\\n";\n    assist();\n  }\n  void assist() {\n    cout << "助攻\\n";\n  }\n};\n\nTeam t;\nt.lead();  // 输出: 队长 助攻',
      hints: [
        'lead 内部调用 assist',
        '成员函数之间直接写名字调用',
        '不用加对象名，因为是同一个对象',
      ],
    },
    {
      type: 'multiple-choice',
      question: '成员函数可以直接使用成员变量，原因是？',
      options: [
        { text: '因为成员变量是全局的', correct: false, explanation: '成员变量不是全局的' },
        { text: '因为成员函数属于同类，天然认识所有成员', correct: true, explanation: '成员函数和成员变量同属一个类，直接互通' },
        { text: '因为成员变量是 public 的', correct: false, explanation: 'private 的成员变量也能在成员函数里用' },
        { text: '因为编译器自动传参', correct: false, explanation: '编译器通过 this 指针访问，不是传参' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行完整的成员函数例子：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n  string name;\n  int hp;\n\n  void showStatus() {\n    cout << name << " HP:" << hp << endl;\n  }\n\n  void takeDamage(int d) {\n    hp = hp - d;\n    if (hp < 0) hp = 0;\n  }\n};\n\nint main() {\n  Hero h;\n  h.name = "勇者";\n  h.hp = 100;\n  h.showStatus();\n  h.takeDamage(30);\n  h.showStatus();\n  h.takeDamage(80);\n  h.showStatus();\n}',
      expectedOutput: '勇者 HP:100\n勇者 HP:70\n勇者 HP:0',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
