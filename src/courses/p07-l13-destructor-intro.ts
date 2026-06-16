import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'destructor-intro',
    chapter: 8,
    title: '析构函数',
    subtitle: '销毁时自动执行',
    description: '析构函数在对象销毁时自动执行，用于释放资源。',
    objectives: ['能定义析构函数', '理解析构函数何时自动调用'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有"生"就有"死"。析构函数就是对象**销毁时自动执行**的函数。',
      code: 'class Hero {\npublic:\n  string name;\n\n  ~Hero() {                // 析构函数：~ + 类名\n    cout << name << " 被销毁了\\n";\n  }\n};',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '析构函数的规则：\n1️⃣ 函数名是 `~类名`（波浪号 + 类名）\n2️⃣ **没有返回值，没有参数**\n3️⃣ 一个类**只能有一个**析构函数（不能重载）\n4️⃣ 对象销毁时**自动调用**',
      code: '~Hero();   // 析构函数声明：波浪号 + 类名 + ()',
    },
    {
      type: 'concept-cards',
      instruction: '认识析构函数的特征：',
      cards: [
        { glyph: '💀', term: '~类名', meaning: '析构函数的名字：波浪号+类名', example: '~Hero()' },
        { glyph: '🚫', term: '无参数', meaning: '和构造函数不同，不能传参', example: '~Hero() 不是 ~Hero(int)' },
        { glyph: '🤖', term: '自动调用', meaning: '对象离开作用域时自动执行', example: '函数结束 → 局部对象销毁' },
        { glyph: '♻️', term: '资源释放', meaning: '用来关闭文件、释放内存等', example: 'delete / close / 收尾' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：构造函数在什么时候调用？',
      options: [
        { text: '对象销毁时', correct: false, explanation: '那是析构函数' },
        { text: '对象创建时', correct: true, explanation: '对象创建时构造函数自动执行' },
        { text: '调用成员函数时', correct: false, explanation: '调用成员函数不会触发构造函数' },
        { text: '程序结束时', correct: false, explanation: '程序结束时可能调用析构函数' },
      ],
    },
    {
      type: 'exposition',
      text: '对象什么时候销毁？\n- **局部对象**：离开花括号 `}` 时销毁\n- **全局对象**：程序结束时销毁\n- **动态对象**：用 `delete` 时销毁',
      code: 'int main() {\n  Hero h;         // 构造\n  h.name = "勇者";\n  if (true) {\n    Hero h2;       // 构造\n    h2.name = "临时";\n  }                // h2 在这里销毁\n  cout << "h 还在\\n";\n  return 0;\n}                  // h 在这里销毁',
    },
    {
      type: 'type-it',
      instruction: '定义一个带析构函数的类：',
      code: 'class Player {\npublic:\n  string name;\n\n  Player(string n) {\n    name = n;\n    cout << name << " 创建\\n";\n  }\n\n  ~Player() {\n    cout << name << " 销毁\\n";\n  }\n};',
      hints: [
        '构造函数用参数初始化 name',
        '析构函数名是 ~Player',
        '析构函数没有参数和返回值',
      ],
    },
    {
      type: 'type-it',
      instruction: '观察构造和析构的顺序：',
      code: 'int main() {\n  Player p1("A");\n  Player p2("B");\n  cout << "---\\n";\n}\n// 输出:\n// A 创建\n// B 创建\n// ---\n// B 销毁  ← 注意：后创建的先销毁\n// A 销毁',
      hints: [
        '构造顺序：先 p1 后 p2',
        '析构顺序：后创建的先销毁（像堆栈）',
        '离开 main 函数的 } 时自动析构',
      ],
    },
    {
      type: 'concept-cards',
      instruction: '记住构造和析构的顺序：',
      cards: [
        { glyph: '⬆️', term: '构造顺序', meaning: '先声明先构造', example: '先 A 后 B' },
        { glyph: '⬇️', term: '析构顺序', meaning: '后构造的先析构（LIFO）', example: '先 B 后 A' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '析构函数能被重载吗（定义多个）？',
      options: [
        { text: '可以，像构造函数一样重载', correct: false, explanation: '析构函数没有参数，无法重载' },
        { text: '不行，一个类只能有一个析构函数', correct: true, explanation: '析构函数无参数，一个类只能有一个' },
        { text: '可以，通过函数名不同', correct: false, explanation: '析构函数名固定为 ~类名' },
        { text: '可以，通过返回值不同', correct: false, explanation: '析构函数没有返回值' },
      ],
    },
    {
      type: 'type-it',
      instruction: '在函数内部观察局部对象的析构：',
      code: 'class Test {\npublic:\n  string id;\n  Test(string i) : id(i) {\n    cout << id << " 构造\\n";\n  }\n  ~Test() {\n    cout << id << " 析构\\n";\n  }\n};\n\nvoid func() {\n  Test t("局部");\n  cout << "函数内部\\n";\n}\n\nint main() {\n  Test t1("main");\n  func();\n  cout << "main 继续\\n";\n}',
      hints: [
        'func 里的 t 在函数结束时就析构了',
        'main 里的 t1 在程序结束才析构',
        '可以看到局部对象的生命周期',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全析构函数的定义：',
      template: 'class Hero {\npublic:\n  string name;\n\n  ____() {\n    cout << "构造\\n";\n  }\n\n  ____() {\n    cout << "析构\\n";\n  }\n};',
      answers: ['Hero', '~Hero'],
      hints: ['第一空：构造函数名', '第二空：析构函数名，带波浪号'],
    },
    {
      type: 'multiple-choice',
      question: '析构函数最常见的用途是什么？',
      options: [
        { text: '初始化成员变量', correct: false, explanation: '那是构造函数的工作' },
        { text: '释放资源（内存、文件等）', correct: true, explanation: '析构函数用于对象销毁时的清理工作' },
        { text: '修改成员变量', correct: false, explanation: '修改变量用普通成员函数就行' },
        { text: '返回计算结果', correct: false, explanation: '析构函数没有返回值' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n1️⃣ `~类名()` 是析构函数\n2️⃣ 对象销毁时自动调用\n3️⃣ 不能重载，无参数无返回值\n4️⃣ 后构造的先析构',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '析构函数在实际中最常用的场景——**释放动态分配的内存**：',
      code: 'class Hero {\nprivate:\n  int* hp;\n\npublic:\n  Hero() {\n    hp = new int(100);  // 动态分配\n  }\n\n  ~Hero() {\n    delete hp;          // 析构时释放\n  }\n};',
    },
    {
      type: 'multiple-choice',
      question: '析构函数能调用其他成员函数吗？',
      options: [
        { text: '不能，析构时对象已经不完整了', correct: false, explanation: '析构函数执行时对象还在，可以调用其他函数' },
        { text: '可以，对象在析构函数执行期间还在', correct: true, explanation: '析构函数执行时对象还没被销毁，可以正常调用成员函数' },
        { text: '只能调用 const 函数', correct: false, explanation: '没有这个限制' },
        { text: '只能调用 static 函数', correct: false, explanation: '没有这个限制' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义带析构函数的资源管理类：',
      code: 'class Resource {\nprivate:\n  int* data;\n\npublic:\n  Resource(int value) {\n    data = new int(value);\n    cout << "分配内存\\n";\n  }\n\n  ~Resource() {\n    delete data;\n    cout << "释放内存\\n";\n  }\n\n  int get() const { return *data; }\n};',
      hints: [
        'new 在构造函数里分配内存',
        'delete 在析构函数里释放内存',
        '成对的 new/delete 防止内存泄漏',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全析构函数释放资源：',
      template: 'class Data {\nprivate:\n  int* ptr;\n\npublic:\n  Data(int v) {\n    ____ = new int(v);\n  }\n\n  ____() {\n    ____ ptr;\n  }\n};',
      answers: ['ptr', '~Data', 'delete'],
      hints: ['第一空：成员变量名', '第二空：析构函数名', '第三空：释放内存的关键字'],
    },
    {
      type: 'code-runner',
      instruction: '运行并观察构造和析构的顺序：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Hero {\npublic:\n  string name;\n\n  Hero(string n) : name(n) {\n    cout << name << " 出场!\\n";\n  }\n\n  ~Hero() {\n    cout << name << " 离开\\n";\n  }\n};\n\nint main() {\n  Hero h1("勇者");\n  Hero h2("法师");\n  cout << "战斗进行中...\\n";\n}',
      expectedOutput: '勇者 出场!\n法师 出场!\n战斗进行中...\n法师 离开\n勇者 离开',
      comparison: 'trimmed',
      editable: false,
    },
  ],
}

export default lesson
