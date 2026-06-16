import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'static-members',
    chapter: 8,
    title: 'static 成员',
    subtitle: '属于类而不是对象',
    description: 'static 成员变量和函数属于类本身，被所有对象共享。',
    objectives: ['能定义 static 成员变量和成员函数', '能理解 static 成员被所有对象共享'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '普通的成员变量——**每个对象有一份**。\n`static` 成员变量——**所有对象共享一份**，属于类本身。',
      code: 'class Hero {\npublic:\n  string name;          // 普通——每个对象一份\n  static int count;     // static——所有对象共享\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'static 成员变量不属于某个对象，它在程序启动时就存在了。\n访问它可以用 `类名::成员名`，也可以用 `对象.成员名`。',
      code: 'int Hero::count = 0;     // static 变量需要在类外定义\n\nint main() {\n  Hero h1, h2;\n  Hero::count = 10;        // 用类名::访问\n  h1.count = 20;           // 也可以用对象访问\n  cout << h2.count;        // 也是 20——共享的\n}',
    },
    {
      type: 'concept-cards',
      instruction: '认识 static 成员：',
      cards: [
        { glyph: '🔗', term: 'static 变量', meaning: '所有对象共享，不属于单个对象', example: 'static int count;' },
        { glyph: '📢', term: '类名::', meaning: '用类名加双冒号访问 static 成员', example: 'Hero::count' },
        { glyph: '📦', term: '类外定义', meaning: 'static 成员变量需要在类外单独定义', example: 'int Hero::count = 0;' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：this 指向什么？',
      options: [
        { text: '指向当前对象的指针', correct: true, explanation: 'this 是成员函数中隐藏的指针' },
        { text: '指向类的指针', correct: false, explanation: '类是设计图，不是内存中的对象' },
        { text: '指向全局变量的指针', correct: false, explanation: 'this 指向调用成员函数的那个对象' },
        { text: '一个整数', correct: false, explanation: 'this 是指针，不是整数' },
      ],
    },
    {
      type: 'exposition',
      text: 'static **成员函数**——不依赖具体对象，只能访问 static 成员。',
      code: 'class Hero {\npublic:\n  static int count;\n\n  static int getCount() {\n    return count;         // 只能访问 static 成员\n  }\n};',
    },
    {
      type: 'type-it',
      instruction: '定义一个带 static 成员的类：',
      code: 'class Hero {\npublic:\n  string name;\n  static int count;\n\n  Hero(string n) : name(n) {\n    count++;\n  }\n\n  ~Hero() {\n    count--;\n  }\n};\n\nint Hero::count = 0;',
      hints: [
        'static int count 在类内声明',
        'int Hero::count = 0; 在类外定义',
        '每次构造时 count++，析构时 count--',
      ],
    },
    {
      type: 'type-it',
      instruction: '使用 static 成员统计对象数量：',
      code: 'int main() {\n  cout << Hero::count << endl;   // 0\n  Hero h1("勇者");\n  Hero h2("法师");\n  cout << Hero::count << endl;   // 2\n  {\n    Hero h3("忍者");\n    cout << Hero::count << endl; // 3\n  }                               // h3 析构\n  cout << Hero::count << endl;   // 2\n}',
      hints: [
        'static count 用来统计当前有多少个 Hero 对象',
        '创建时 count++，销毁时 count--',
        '所有对象访问同一个 count',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'static 成员变量在什么时候初始化？',
      options: [
        { text: '创建第一个对象时', correct: false, explanation: 'static 成员在程序启动时就已初始化好' },
        { text: '程序启动时（在 main 之前）', correct: true, explanation: 'static 成员在程序加载阶段就初始化了' },
        { text: '定义类时', correct: false, explanation: '类定义只是告诉编译器存在这个变量' },
        { text: '调用 static 函数时', correct: false, explanation: '在 main 之前就已经初始化好了' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义 static 成员函数：',
      code: 'class Config {\npublic:\n  static string version;\n  static int maxPlayers;\n\n  static void showInfo() {\n    cout << "v" << version << " 最大玩家:" << maxPlayers;\n  }\n};\n\nstring Config::version = "2.0";\nint Config::maxPlayers = 4;',
      hints: [
        'static 函数只能访问 static 成员',
        '可以用 Config::showInfo() 调用',
        '不需要创建对象就能用',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 static 成员的定义和访问：',
      template: 'class Game {\n____:\n  static int ____;\n};\n\n____ Game::score = 0;\n\nint main() {\n  Game::____ = 100;\n}',
      answers: ['public', 'score', 'int', 'score'],
      hints: ['第一空：访问权限', '第二空：static 成员名', '第三空：类外定义', '第四空：用类名::访问'],
    },
    {
      type: 'multiple-choice',
      question: 'static 成员函数能访问非 static 成员变量吗？',
      options: [
        { text: '可以，和其他成员函数一样', correct: false, explanation: 'static 函数没有 this，不能访问非 static 成员' },
        { text: '不行，因为没有 this 指针', correct: true, explanation: 'static 函数不属于某个对象，没有 this，不能访问实例成员' },
        { text: '取决于编译器', correct: false, explanation: '这是 C++ 语法规则，和编译器无关' },
        { text: '可以通过参数传入对象来访问', correct: false, explanation: '那是通过参数访问，不是直接访问' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用 static 实现全局游戏设置：',
      code: 'class GameSettings {\npublic:\n  static int volume;\n  static bool fullscreen;\n\n  static void toggleFullscreen() {\n    fullscreen = !fullscreen;\n  }\n\n  static void show() {\n    cout << "音量:" << volume << " 全屏:" << (fullscreen ? "是" : "否") << endl;\n  }\n};\n\nint GameSettings::volume = 50;\nbool GameSettings::fullscreen = false;',
      hints: [
        'static 成员适合存全局配置',
        '所有地方共享同一个配置值',
        'GameSettings::volume 直接访问',
      ],
    },
    {
      type: 'exposition',
      text: 'static 成员函数的限制：\n- 只能访问 static 成员变量\n- 只能调用其他 static 成员函数\n- **没有 this 指针**（因为不属于某个对象）',
      code: 'class Hero {\npublic:\n  static int count;\n  int id;              // 非 static\n\n  static void showCount() {\n    cout << count;      // ✅ static 成员\n    // cout << id;      // ❌ 不能访问非 static\n  }\n};',
    },
    {
      type: 'type-it',
      instruction: '用 static 函数获取全局配置：',
      code: 'class Config {\nprivate:\n  static string gameTitle;\n  static int maxPlayers;\n\npublic:\n  static string getTitle() { return gameTitle; }\n  static int getMaxPlayers() { return maxPlayers; }\n  static void setMaxPlayers(int n) { maxPlayers = n; }\n};\n\nstring Config::gameTitle = "冒险王";\nint Config::maxPlayers = 4;\n\nint main() {\n  cout << Config::getTitle();\n  Config::setMaxPlayers(8);\n}',
      hints: [
        'static 函数即使 private，类内部还是可以访问',
        '通过 Config::getTitle() 调用，不需要对象',
        'static 成员在全局存储，不占对象内存',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'static 成员变量的内存在哪里？',
      options: [
        { text: '每个对象的内存里', correct: false, explanation: 'static 成员不属于单个对象' },
        { text: '全局数据区，所有对象共享', correct: true, explanation: 'static 成员存在全局/静态存储区，不占对象空间' },
        { text: '栈上', correct: false, explanation: '栈存放局部变量' },
        { text: '堆上', correct: false, explanation: '堆上存动态分配的内存' },
      ],
    },
    {
      type: 'exposition',
      text: 'static 成员的一个实用例子——**全局唯一 ID 生成器**：',
      code: 'class IDGenerator {\nprivate:\n  static int nextId;\npublic:\n  static int getNewId() {\n    return nextId++;\n  }\n};\n\nint IDGenerator::nextId = 1000;\n// 每次调用 getNewId 返回 1000, 1001, 1002...',
    },
    {
      type: 'type-it',
      instruction: '用 static 生成唯一 ID：',
      code: 'class IDGen {\npublic:\n  static int next;\n  static int getNew() { return next++; }\n};\nint IDGen::next = 1;\n\nint main() {\n  cout << IDGen::getNew();  // 1\n  cout << IDGen::getNew();  // 2\n  cout << IDGen::getNew();  // 3\n}',
      hints: [
        'static next 在程序启动时初始化为 1',
        '每次调用 getNew 返回并递增',
        '所有地方共享同一个计数器',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全 static 成员的声明和定义：',
      template: 'class Game {\n____:\n  static int score;\n};\n\n____ Game::____ = 0;  // 类外定义',
      answers: ['public', 'int', 'score'],
      hints: ['第一空：访问权限', '第二空：类型', '第三空：static 成员名'],
    },
    {
      type: 'code-runner',
      instruction: '运行 static 成员统计对象的完整例子：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n  string name;\n  static int count;\n\n  Hero(string n) : name(n) {\n    count++;\n    cout << name << " 创建 当前:" << count << endl;\n  }\n\n  ~Hero() {\n    count--;\n    cout << name << " 销毁 当前:" << count << endl;\n  }\n};\n\nint Hero::count = 0;\n\nint main() {\n  Hero h1("勇者");\n  Hero h2("法师");\n  {\n    Hero h3("忍者");\n  }\n  cout << "最终英雄数:" << Hero::count << endl;\n}',
      expectedOutput: '勇者 创建 当前:1\n法师 创建 当前:2\n忍者 创建 当前:3\n忍者 销毁 当前:2\n最终英雄数:2',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
