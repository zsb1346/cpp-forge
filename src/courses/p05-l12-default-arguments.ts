import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'default-arguments',
    chapter: 6,
    title: '默认参数——不传就用默认值',
    subtitle: '参数可以有默认值',
    description: '学习函数参数的默认值，以及默认参数必须从右到左设置的规则。',
    objectives: ['能声明带默认参数的函数', '能理解默认参数从右到左的规则', '能区分重载和默认参数的场景'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有时候一个函数的大多数调用场景都用同一个参数值——\n每次都传太烦了。C++ 允许你给参数设**默认值**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '语法很简单：在参数后面加 `= 默认值`。',
      code: 'void greet(string name = "游客") {\n  cout << "你好，" << name << "！" << endl;\n}\n\ngreet("小明");  // 输出：你好，小明！\ngreet();        // 输出：你好，游客！',
    },
    {
      type: 'exposition',
      text: '调用时如果不传参，就自动用默认值。\n调用时传了参，就用传入的值。',
    },
    {
      type: 'concept-cards',
      instruction: '默认参数的关键规则：',
      cards: [
        { glyph: '🎯', term: '默认值', meaning: '不传参时自动使用的值', example: 'int x = 0' },
        { glyph: '➡️', term: '从右到左', meaning: '默认参数必须从右边开始设置', example: 'int a, int b=0 // ✅' },
        { glyph: '🚫', term: '不能跳着设', meaning: '不能左边默认右边不默认', example: 'int a=0, int b // ❌' },
        { glyph: '📋', term: '声明处设', meaning: '默认值在声明（原型）中给出', example: 'void f(int x=5);' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲这个带默认参数的函数：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid showInfo(string name, int level = 1) {\n  cout << name << " 等级: " << level << endl;\n}\n\nint main() {\n  showInfo("战士", 10);\n  showInfo("新手");\n}',
      hints: ['`int level = 1` 设默认值', '第一次调用传了 level=10', '第二次调用用默认 level=1'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：以下哪组函数是合法的重载？',
      options: [
        { text: '`int f(int)` 和 `double f(int)`', correct: false, explanation: '仅返回值不同不能重载' },
        { text: '`void f(int)` 和 `void f(double)`', correct: true, explanation: '参数类型不同可以重载' },
        { text: '`void f(int)` 和 `void f(int, int=0)`', correct: false, explanation: '这可能引起歧义' },
        { text: '`void f()` 和 `int f()`', correct: false, explanation: '仅返回值不同不能重载' },
      ],
    },
    {
      type: 'exposition',
      text: '**重要规则：默认参数必须从右到左连续设置。**',
      code: 'void f(int a, int b = 0, int c = 0);  // ✅ 正确\nvoid f(int a = 0, int b);                 // ❌ 错误\nvoid f(int a = 0, int b, int c = 0);      // ❌ 错误',
    },
    {
      type: 'exposition',
      text: '为什么？因为 C++ 按位置传参——\n如果你省略左边的参数，编译器不知道你省略了哪个。',
    },
    {
      type: 'multiple-choice',
      question: '以下哪个函数声明是合法的？',
      options: [
        { text: '`void f(int a = 0, int b, int c);`', correct: false, explanation: '默认参数必须从右到左' },
        { text: '`void f(int a, int b = 0, int c = 0);`', correct: true, explanation: '从右到左设置默认值，正确' },
        { text: '`void f(int a = 0, int b = 0, int c);`', correct: false, explanation: 'c 没有默认值但右边有默认，非法' },
        { text: '`void f(int a, int b = 0, int c);`', correct: false, explanation: '中间默认右边没有，违反从右到左规则' },
      ],
    },
    {
      type: 'type-it',
      instruction: '敲多个默认参数的函数——计算圆柱体积：',
      code: '#include <iostream>\nusing namespace std;\n\ndouble volume(double r, double h = 1.0) {\n  return 3.14159 * r * r * h;\n}\n\nint main() {\n  cout << volume(2.0, 3.0) << endl;\n  cout << volume(2.0) << endl;\n}',
      hints: ['`h = 1.0` 是默认参数', '第一次调用 h=3.0', '第二次调用 h=1.0（默认）'],
    },
    {
      type: 'exposition',
      text: '默认参数和函数重载的关系：\n有时候默认参数可以替代重载。',
      code: '// 用默认参数：\nvoid print(int x, int base = 10);\n\n// 等价于两个重载：\nvoid print(int x);          // 十进制的 print\nvoid print(int x, int base); // 指定进制',
    },
    {
      type: 'multiple-choice',
      question: '默认参数和重载可以混用，以下说法正确的是？',
      options: [
        { text: '默认参数可以随意放在任意位置', correct: false, explanation: '必须从右到左连续设置' },
        { text: '重载和默认参数可以互相替代', correct: true, explanation: '有些场景默认参数可以替代重载' },
        { text: '默认参数只能在 main 函数中使用', correct: false, explanation: '任何函数都可以有默认参数' },
        { text: '默认参数值必须是 0', correct: false, explanation: '默认值可以是任何合法值' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '声明一个函数，计算矩形的面积。如果不传高，默认为 1.0。',
      template: '____ area(____ w, double h = ____) {\n  return w * h;\n}',
      answers: ['double', 'double', '1.0'],
      hints: ['返回类型是 double', '宽度 w 的类型是 double', '高度 h 默认值为 1.0'],
    },
    {
      type: 'type-it',
      instruction: '敲一个带默认参数的问候函数，多加一个 level 参数：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid welcome(string name, int level = 1, string title = "冒险者") {\n  cout << "欢迎，" << name << "！" << endl;\n  cout << "等级 " << level << " " << title << endl;\n}\n\nint main() {\n  welcome("小智", 5, "训练师");\n  welcome("阿雅");\n}',
      hints: ['`level = 1` 和 `title = "冒险者"` 都是默认参数', '第一次调用全传', '第二次调用全部用默认值'],
    },
    {
      type: 'type-it',
      instruction: '敲这段——多个默认参数混合使用：',
      code: '#include <iostream>\nusing namespace std;\n\nvoid createWindow(int width, int height = 400, string title = "窗口") {\n  cout << title << ": " << width << "x" << height << endl;\n}\n\nint main() {\n  createWindow(800, 600, "游戏");\n  createWindow(500, 300);\n  createWindow(200);\n}',
      hints: ['第一次调用全部传参', '第二次调用省略 title，用默认值"窗口"', '第三次调用省略 height 和 title，都用默认值'],
    },
    {
      type: 'multiple-choice',
      question: '以下关于默认参数的说法哪个正确？',
      options: [
        { text: '默认参数可以从左到右随便设置', correct: false, explanation: '必须从右到左连续设置' },
        { text: '默认参数和重载可以共存', correct: true, explanation: '两者可以一起用，但要注意避免歧义' },
        { text: '默认参数不能用于 void 函数', correct: false, explanation: 'void 函数也可以有默认参数' },
        { text: '默认参数值必须是常量', correct: false, explanation: '默认值必须是编译期确定的常量表达式' },
      ],
    },
    {
      type: 'exposition',
      text: '默认参数放在声明（头文件）中，而不是定义中：',
      code: '// 头文件 .h\nvoid func(int x = 10);  // 默认值在声明中\n\n// 源文件 .cpp\nvoid func(int x) {       // 定义中不要再写 =10\n  // ...\n}',
    },
    {
      type: 'exposition',
      text: '下一课：**指针与引用练习**——把前面 12 课的知识综合练一练。',
    },
  ],
}

export default lesson
