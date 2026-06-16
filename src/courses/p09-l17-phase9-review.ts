import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase9-review',
    chapter: 10,
    title: '阶段 9 综合复习',
    subtitle: 'const/static/friend/op总复习',
    description: '全面回顾阶段 9 的四大主题：const 常量、static 静态成员、friend 友元、运算符重载。',
    objectives: ['能综合运用 const/static/friend/运算符重载', '能辨析各概念的使用场景'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'multiple-choice',
      question: '`const int* p` 和 `int* const p` 的区别是什么？',
      options: [
        { text: '没有区别，写法不同含义相同', correct: false, explanation: '位置不同含义完全不同' },
        { text: '前者值不能改，后者指向不能改', correct: true, explanation: 'const int* 限制值，int* const 限制指向' },
        { text: '前者指向不能改，后者值不能改', correct: false, explanation: '说反了' },
        { text: '两者都不能改', correct: false, explanation: '两者各自限制不同' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'static 局部变量和普通局部变量的核心区别？',
      options: [
        { text: 'static 变量名字更长', correct: false, explanation: '和名字无关' },
        { text: 'static 变量退出函数后不销毁，保留值', correct: true, explanation: 'static 局部变量的生命周期是整个程序' },
        { text: 'static 变量外部可以访问', correct: false, explanation: 'static 局部变量作用域仍然是函数内' },
        { text: 'static 变量不能初始化', correct: false, explanation: 'static 变量必须初始化' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'friend 函数的作用是什么？',
      options: [
        { text: '让函数运行得更快', correct: false, explanation: 'friend 不影响性能' },
        { text: '授予外部函数访问类的私有成员', correct: true, explanation: 'friend 突破封装限制' },
        { text: '让类可以被继承', correct: false, explanation: 'friend 和继承无关' },
        { text: '在类内部定义函数', correct: false, explanation: 'friend 函数在类外定义' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '运算符重载中，流运算符 << 为什么必须用全局函数？',
      options: [
        { text: '因为编译器只支持全局形式', correct: false, explanation: '编译器也支持成员形式，但调用方式反了' },
        { text: '因为成员函数形式会让调用变成 v << cout', correct: true, explanation: '成员函数的左操作数是 this，不符合习惯' },
        { text: '因为全局函数性能更好', correct: false, explanation: '性能上没有区别' },
        { text: '因为成员函数不能访问私有成员', correct: false, explanation: '成员函数可以访问私有成员' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '本阶段四大概念一览：',
      cards: [
        { glyph: '🔒', term: 'const', meaning: '值/指针/引用/函数不可修改', example: 'const int x = 5;' },
        { glyph: '💾', term: 'static', meaning: '生命周期到程序结束，属于类本身', example: 'static int count;' },
        { glyph: '🤝', term: 'friend', meaning: '授权外部访问私有成员', example: 'friend class B;' },
        { glyph: '🔧', term: '运算符重载', meaning: '让自定义类型支持运算符', example: 'operator+ / operator<<' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：声明一个 const 成员函数，返回 static 成员变量。',
      template: 'class Game {\n  ____ ____ totalPlayers;\npublic:\n  ____ ____ getTotal() ____ {\n    return ____;\n  }\n};',
      answers: ['static', 'int', 'static', 'int', 'const', 'totalPlayers'],
      hints: ['第一空：属于类的成员变量', '第二空：类型', '第三空：属于类的成员函数', '第四空：返回值类型', '第五空：const 修饰', '第六空：变量名'],
    },
    {
      type: 'multiple-choice',
      question: '以下哪条关于运算符重载的规则是错误的？',
      options: [
        { text: '不能发明新运算符', correct: false, explanation: '这是正确的规则' },
        { text: '可以改变运算符的优先级', correct: true, explanation: '优先级是固定的，不能改变' },
        { text: '有些运算符不能重载', correct: false, explanation: '比如 :: . ?: 等不能重载' },
        { text: '=、[]、()、-> 必须重载为成员函数', correct: false, explanation: '这是正确的规则' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：重载 << 运算符的完整签名。',
      template: '____& operator<<(____& os, ____ MyClass& obj) {\n  os << obj.value;\n  return ____;\n}',
      answers: ['ostream', 'ostream', 'const', 'os'],
      hints: ['第一空：返回值类型', '第二空：第一个参数类型', '第三空：第二个参数的 const 修饰', '第四空：返回什么'],
    },
    {
      type: 'multiple-choice',
      question: 'const 成员函数内部可以调另一个非 const 成员函数吗？',
      options: [
        { text: '可以，没有任何限制', correct: false, explanation: 'const 函数内 this 是 const，不能调非 const 函数' },
        { text: '不可以，因为 this 是 const 指针', correct: true, explanation: 'const 成员函数中 this 是 const 的，调非 const 函数会丢失 const' },
        { text: '取决于编译器的实现', correct: false, explanation: '语言标准明确规定不可以' },
        { text: '只有 Debug 模式下不可以', correct: false, explanation: '和编译模式无关' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: 'const 四种位置：',
      cards: [
        { glyph: '1️⃣', term: 'const int x;', meaning: '变量值不能改', example: '常量' },
        { glyph: '2️⃣', term: 'const int* p;', meaning: '指向的值不能改', example: '指针可移，值只读' },
        { glyph: '3️⃣', term: 'const int& r;', meaning: '不拷贝且只读', example: '高效的只读传参' },
        { glyph: '4️⃣', term: 'void f() const;', meaning: '函数不改成员', example: 'const 成员函数' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '友元类的关系能否传递？\nA 声明 friend class B，B 声明 friend class C，C 能访问 A 的私有吗？',
      options: [
        { text: '能，友元可以传递', correct: false, explanation: 'C++ 禁止友元传递' },
        { text: '不能，友元关系是独立的', correct: true, explanation: 'C 必须被 A 显式声明为友元才能访问' },
        { text: '只有在同一个命名空间才能', correct: false, explanation: '和命名空间无关' },
        { text: '如果 A 是 public 就可以', correct: false, explanation: '和访问权限无关' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况下必须用 const 引用传参？',
      options: [
        { text: '参数是 int', correct: false, explanation: 'int 传值更方便' },
        { text: '参数是大型对象且不需要修改', correct: true, explanation: 'const 引用避免拷贝又只读' },
        { text: '参数需要被修改', correct: false, explanation: '要修改就用普通引用' },
        { text: '参数是 char', correct: false, explanation: 'char 传值更方便' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个同时用到 const、static、friend、operator 的综合例子：',
      code: 'class Counter {\n  static int count;\n  int id;\npublic:\n  Counter() : id(count++) {}\n  int getId() const { return id; }\n  static int getCount() { return count; }\n  friend ostream& operator<<(ostream& os, const Counter& c);\n};\nint Counter::count = 0;\n\nostream& operator<<(ostream& os, const Counter& c) {\n  os << "Counter #" << c.id;\n  return os;\n}',
      hints: [
        'static int count 跟踪对象总数',
        'const 成员函数 getId 只读',
        'friend 让 << 能访问 private id',
      ],
    },
    {
      type: 'multiple-choice',
      question: '运算符重载中，以下哪个是正确的？',
      options: [
        { text: '可以发明新运算符 **', correct: false, explanation: '不能发明新运算符' },
        { text: '可以改变 + 的优先级', correct: false, explanation: '优先级固定' },
        { text: '= 必须重载为成员函数', correct: true, explanation: '赋值运算符必须为成员函数' },
        { text: ':: 可以重载', correct: false, explanation: ':: 不能重载' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'static 成员函数的特点是？',
      options: [
        { text: '有 this 指针', correct: false, explanation: 'static 函数没有 this 指针' },
        { text: '只能访问 static 成员', correct: true, explanation: '没有 this 指针，不能访问非 static 成员' },
        { text: '必须通过对象调用', correct: false, explanation: '通过类名::调用' },
        { text: '可以修改任何成员变量', correct: false, explanation: '不能访问非 static 成员' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：定义并初始化一个 static 成员变量。',
      template: 'class Game {\n  ____ ____ maxPlayers;\n};\n____ ____ ____ = 10;',
      answers: ['static', 'int', 'int', 'Game', 'maxPlayers'],
      hints: ['第一空：static 关键字', '第二空：类型', '第三空：类外定义时需要类型', '第四空：类名', '第五空：变量名'],
    },
    {
      type: 'concept-cards',
      instruction: '阶段 9 核心记忆卡：',
      cards: [
        { glyph: '🔒', term: 'const', meaning: '值/指针/函数不可修改', example: 'const int* / get() const' },
        { glyph: '💾', term: 'static', meaning: '全局生命周期', example: 'static int count;' },
        { glyph: '🤝', term: 'friend', meaning: '授权外部访问 private', example: 'friend void func();' },
        { glyph: '🔧', term: 'operator overloading', meaning: '自定义类型用运算符', example: 'operator+ / operator<<' },
      ],
    },
    {
      type: 'exposition',
      text: '本阶段结束！你学会了：\n- const：值/指针/引用/成员函数四个位置的 const\n- static：局部变量的持久化，类成员的共享\n- friend：外部函数/类访问私有成员的通道\n- 运算符重载：让自定义类型像内置类型一样用运算符\n\n下一阶段将进入**动态内存**——堆、栈、new/delete。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson