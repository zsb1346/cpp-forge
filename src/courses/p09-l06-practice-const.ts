import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-const',
    chapter: 10,
    title: 'const 综合练习',
    subtitle: '巩固 01-05',
    description: '通过多种题型巩固 const 在变量、指针、引用、成员函数、重载中的使用。',
    objectives: ['能辨析 const 在不同位置的含义', '能综合运用 const 相关知识'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '以下哪个声明了一个值为 3.14 的常量？',
      options: [
        { text: 'int pi = 3.14;', correct: false, explanation: 'int 会截断为 3，且不是 const' },
        { text: 'const double pi = 3.14;', correct: true, explanation: 'const double 声明了一个不可修改的浮点常量' },
        { text: 'double const pi = 3.14;', correct: true, explanation: 'const 在类型前后都可以，含义相同' },
        { text: 'const pi = 3.14;', correct: false, explanation: 'C++ 不能省略类型' },
      ],
      mode: 'multiple',
    },
    {
      type: 'multiple-choice',
      question: '回顾 01：以下哪条语句会导致编译错误？',
      options: [
        { text: 'const int a = 10;', correct: false, explanation: 'const 声明并初始化是合法的' },
        { text: 'const int b; b = 20;', correct: true, explanation: 'const 声明时必须初始化，不能分开赋值' },
        { text: 'const int c = 30; int d = c;', correct: false, explanation: '用 const 的值初始化变量是合法的' },
        { text: 'int e = 40; const int f = e;', correct: false, explanation: '可以用变量初始化 const' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`const int* p = &x;` 中，哪个操作是合法的？',
      options: [
        { text: '*p = 10;', correct: false, explanation: 'const int* 不能修改指向的值' },
        { text: 'p = &y;', correct: true, explanation: '指针本身不是 const，可以改指向' },
        { text: 'int* q = p;', correct: false, explanation: '不能将 const int* 赋给 int*（会丢失 const）' },
        { text: 'const int* const q = p;', correct: true, explanation: '将 const int* 赋给 const int* 是合法的' },
      ],
      mode: 'multiple',
    },
    {
      type: 'type-it',
      instruction: '声明一个 const 引用并尝试使用：',
      code: 'const double& ref = 3.14159;',
      hints: [
        'const double& 可以绑定到字面量',
        'ref 是只读的，不能修改',
        '这是 const 引用特有的能力',
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个含 const 成员函数的类：',
      code: 'class Circle {\n  double r;\npublic:\n  Circle(double radius) : r(radius) {}\n  double area() const { return 3.14159 * r * r; }\n  double getR() const { return r; }\n  void setR(double radius) { r = radius; }\n};',
      hints: [
        'area 和 getR 是 const 函数，不会改 r',
        'setR 不是 const，它要修改 r',
        'const 对象只能调 area() 和 getR()',
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'const 四种位置总结：',
      cards: [
        { glyph: '1️⃣', term: 'const int x = 5;', meaning: '值不能改', example: '最基本的常量' },
        { glyph: '2️⃣', term: 'const int* p;', meaning: '指向的值不能改', example: '指针可移，值只读' },
        { glyph: '3️⃣', term: 'const int& r = x;', meaning: '高效只读访问', example: '不拷贝不改值' },
        { glyph: '4️⃣', term: 'void f() const;', meaning: '成员函数不改成员', example: '只读函数' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'const 重载练习：',
      code: 'class Buffer {\n  int data[100];\npublic:\n  int& at(int i) { return data[i]; }\n  const int& at(int i) const { return data[i]; }\n};',
      hints: [
        'at 有两个版本：const 和非 const',
        '普通对象调 at 返回可修改的引用',
        'const 对象调 at 返回只读引用',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'const 引用相比普通引用多了什么能力？',
      options: [
        { text: '可以绑定临时值', correct: true, explanation: 'const int& r = 5; 是合法的' },
        { text: '可以修改原值', correct: false, explanation: 'const 引用不能修改原值' },
        { text: '可以不需要初始化', correct: false, explanation: '所有引用都必须初始化' },
        { text: '可以改变绑定对象', correct: false, explanation: '引用不能重新绑定' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：声明一个指向常量的指针，指向 const int 常量 x。',
      template: '____ ____ * ____ = ____;',
      answers: ['const', 'int', 'p', '&x'],
      hints: ['第一空：const', '第二空：类型', '第三空：指针名', '第四空：取 x 的地址'],
    },
    {
      type: 'multiple-choice',
      question: '回顾 02：`int* const p = &x;` 中，const 修饰的是？',
      options: [
        { text: 'int', correct: false, explanation: 'const 在 * 的右边，修饰的是指针本身' },
        { text: '指针 p 本身', correct: true, explanation: 'int* const 中 const 修饰指针，指向不能改' },
        { text: 'x', correct: false, explanation: 'const 只作用在指针上' },
        { text: '所有东西', correct: false, explanation: '只有指针本身被限制' },
      ],
    },
    {
      type: 'type-it',
      instruction: '完整的 const 综合练习：',
      code: 'const int MAX = 100;\nconst int* ptr = &MAX;\nconst int& ref = MAX;\ncout << *ptr << " " << ref << endl;',
      hints: [
        'MAX 是 const int 常量',
        'ptr 是指向常量的指针',
        'ref 是 const 引用',
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个是 const 成员函数的正确声明？',
      options: [
        { text: 'void func() const;', correct: true, explanation: 'const 放在函数参数列表后面' },
        { text: 'void const func();', correct: false, explanation: 'const 在返回值前表示返回值不可改' },
        { text: 'const void func();', correct: false, explanation: 'const 在返回值前表示返回值不可改' },
        { text: 'void func(const);', correct: false, explanation: '括号里是参数 const，不是成员函数 const' },
      ],
    },
    {
      type: 'type-it',
      instruction: 'const 重载练习——定义 operator[] 的两个版本：',
      code: 'class Buffer {\n  int data[10];\npublic:\n  int& operator[](int i) { return data[i]; }\n  const int& operator[](int i) const { return data[i]; }\n};',
      hints: [
        '非 const 版本返回 int&，可以修改',
        'const 版本返回 const int&，只读',
        'const 对象自动调 const 版本',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：声明一个 const 指针（指向不能改）。',
      template: '____ ____ ____ = &x;',
      answers: ['int', '*', 'const', 'p'],
      hints: ['第一空：指向的类型', '第二空：指针声明', '第三空：const 修饰指针本身', '第四空：指针名'],
    },
    {
      type: 'concept-cards',
      instruction: 'const 的常见应用场景：',
      cards: [
        { glyph: '🔒', term: '函数参数', meaning: 'const 引用传参，高效且安全', example: 'const string& s' },
        { glyph: '📤', term: '函数返回值', meaning: '返回 const 引用防止修改', example: 'const int& get() const' },
        { glyph: '🛡️', term: '成员函数', meaning: '承诺不改成员变量', example: 'int get() const' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下关于 const 的说法哪个是错的？',
      options: [
        { text: 'const int* 可以改为指向另一个变量', correct: false, explanation: '这是对的，const int* 限制值不限制指向' },
        { text: 'int* const 可以修改指向的值', correct: false, explanation: '这是对的，int* const 限制指向不限制值' },
        { text: 'const int* const 既不能改指向也不能改值', correct: false, explanation: '这是对的' },
        { text: 'const 变量可以先声明再赋值', correct: true, explanation: 'const 变量声明时必须初始化' },
      ],
    },
    {
      type: 'type-it',
      instruction: '最后的综合练习：使用 const 的完整代码：',
      code: 'const int maxScore = 100;\nint score = 85;\nconst int* ptr = &score;\nconst int& ref = score;\ncout << maxScore << " " << *ptr << " " << ref << endl;',
      hints: [
        'const int maxScore 是常量',
        'const int* ptr 可以指向 score',
        'const int& ref 是只读引用',
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：定义一个 const 引用参数。',
      template: 'void display(____ ____ ____& val) {\n  cout << val;\n}',
      answers: ['const', 'int', ''],
      hints: ['第一空：const', '第二空：类型', '第三空：参数名'],
    },
    {
      type: 'multiple-choice',
      question: 'const 最主要的价值是什么？',
      options: [
        { text: '让编译器报更多的错', correct: false, explanation: '不是为了报错，是为了安全' },
        { text: '防止值被意外修改，让代码更安全', correct: true, explanation: 'const 是 C++ 最重要的安全机制之一' },
        { text: '让程序跑得更快', correct: false, explanation: 'const 不影响性能' },
        { text: '让代码更短', correct: false, explanation: 'const 让代码稍长但更安全' },
      ],
    },
  ],
}

export default lesson