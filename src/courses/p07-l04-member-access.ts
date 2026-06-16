import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'member-access',
    chapter: 8,
    title: '. 号访问成员',
    subtitle: '对象.成员',
    description: '学会用点号 . 访问对象的成员变量和成员函数。',
    objectives: ['能用 obj.member 的方式访问成员', '能给对象的成员变量赋值和读取'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '创建对象后，用**点号 `.`** 来访问它里面的成员：',
      code: 'Hero h;\nh.name = "勇者";   // 给成员变量赋值\nh.hp = 100;\n\ncout << h.name;    // 读取成员变量的值',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '语法的格式是：`对象名.成员名`\n`.` 就像一扇门，通过它走进对象内部。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：创建一个对象用的是什么语法？',
      options: [
        { text: 'new Hero()', correct: false, explanation: 'new 是动态分配，不是基本创建方式' },
        { text: 'Hero h;', correct: true, explanation: '和声明普通变量一样：类型 + 变量名' },
        { text: 'create Hero h;', correct: false, explanation: '没有 create 这个关键字' },
        { text: 'class Hero h;', correct: false, explanation: '声明变量时不需要 class 关键字' },
      ],
    },
    {
      type: 'exposition',
      text: '`.` 的左边是对象，右边是成员：',
      code: 'h.name = "勇者";\n// ┬  ┬───\n// │  └─ 成员名\n// └──── 对象名',
    },
    {
      type: 'type-it',
      instruction: '定义类、创建对象、给成员赋值：',
      code: 'class Player {\npublic:\n  string name;\n  int level;\n};\n\nPlayer p;\np.name = "小明";\np.level = 5;',
      hints: [
        '对象 p 后面跟 . 再跟成员名',
        '给 name 赋 string 值，给 level 赋 int 值',
        '每个赋值语句结尾都要分号',
      ],
    },
    {
      type: 'multiple-choice',
      question: '`h.hp = 100;` 中的 `.` 表示什么？',
      options: [
        { text: '小数点', correct: false, explanation: '这里是 C++ 代码，不是数学' },
        { text: '连接字符串', correct: false, explanation: 'string 连接用 + 号' },
        { text: '访问 h 对象的 hp 成员', correct: true, explanation: '. 用来访问对象的成员' },
        { text: '调用函数', correct: false, explanation: 'hp 是变量不是函数，虽然调用函数也用 .' },
      ],
    },
    {
      type: 'type-it',
      instruction: '读取并输出成员的练习：',
      code: 'class ScoreCard {\npublic:\n  string playerName;\n  int score;\n};\n\nScoreCard sc;\nsc.playerName = "张三";\nsc.score = 95;\ncout << sc.playerName << ":" << sc.score;',
      hints: [
        'sc.playerName 读取名字，sc.score 读取分数',
        'cout 输出成员变量的值',
        '成员变量可以像普通变量一样读写',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，给对象成员赋值并输出：',
      template: 'Hero h;\n____.name = "勇者";\n____.hp = 100;\ncout << ____.name;',
      answers: ['h', 'h', 'h'],
      hints: ['所有空位都是同一个对象名'],
    },
    {
      type: 'exposition',
      text: '也可以一个对象多次赋值，成员的值会跟着变：',
      code: 'Player p;\np.score = 0;\ncout << p.score;  // 输出 0\n\np.score = 10;\ncout << p.score;  // 输出 10',
    },
    {
      type: 'type-it',
      instruction: '修改对象的成员变量：',
      code: 'class Counter {\npublic:\n  int count;\n};\n\nCounter c;\nc.count = 0;\nc.count = c.count + 1;\nc.count = c.count + 1;\ncout << c.count;',
      hints: [
        'c.count 可以像普通 int 变量一样运算',
        'c.count = c.count + 1 把 count 加 1',
        '最后输出结果是 2',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，把 hp 减 30：',
      template: 'Hero h;\nh.hp = 100;\n____.____ = ____.____ - 30;',
      answers: ['h', 'hp', 'h', 'hp'],
      hints: ['用 . 访问 hp 成员', '在原来值基础上减 30'],
    },
    {
      type: 'multiple-choice',
      question: '如果有两个对象 `Hero h1, h2;`，执行 `h1.hp = 50;` 后，`h2.hp` 的值是？',
      options: [
        { text: '50', correct: false, explanation: 'h1 和 h2 是独立的，修改 h1 不影响 h2' },
        { text: '不确定（未初始化）', correct: true, explanation: 'h2 的 hp 没有赋过值，是未初始化的' },
        { text: '0', correct: false, explanation: '成员变量不像全局变量会自动初始化' },
        { text: '也变成 50', correct: false, explanation: '每个对象有自己的独立副本' },
      ],
    },
    {
      type: 'exposition',
      text: '`.` 也可以访问成员函数（后面会细讲）：',
      code: 'Hero h;\nh.showStatus();   // 调用 h 的 showStatus 成员函数',
    },
    {
      type: 'type-it',
      instruction: '访问成员变量并查看结果：',
      code: 'class Animal {\npublic:\n  string type;\n  int age;\n};\n\nAnimal a;\na.type = "猫";\na.age = 3;\ncout << a.type << " " << a.age << "岁";',
      hints: [
        'a.type 存类型，a.age 存年龄',
        '用 cout 输出两个成员的值',
        '成员之间用空格隔开',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全代码，访问并输出 Car 对象的品牌：',
      template: 'Car c;\nc.____ = "Tesla";\ncout << ____.____;',
      answers: ['brand', 'c', 'brand'],
      hints: ['第一空是成员变量名', '后两空用 . 访问成员并输出'],
    },
    {
      type: 'exposition',
      text: '`.` 是成员访问运算符，它把**对象**和**成员**连接起来。\n左边必须有对象，右边必须有成员——缺一不可。',
    },
    {
      type: 'exposition',
      text: '多个对象，各自用 `.` 访问自己的成员，互不干扰：',
      code: 'Hero h1, h2;\nh1.hp = 100;\nh2.hp = 80;\n// h1.hp 是 100，h2.hp 是 80',
    },
    {
      type: 'code-runner',
      instruction: '运行完整例子，观察 . 访问成员：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n  string name;\n  int hp;\n};\n\nint main() {\n  Hero h;\n  h.name = "勇者";\n  h.hp = 100;\n  cout << "名字:" << h.name << endl;\n  cout << "血量:" << h.hp;\n}',
      expectedOutput: '名字:勇者\n血量:100',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
