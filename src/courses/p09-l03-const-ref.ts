import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'const-ref',
    chapter: 10,
    title: 'const 引用',
    subtitle: '高效又安全',
    description: '学习 const 引用——不拷贝数据，同时保证不会修改原值。',
    objectives: ['能用 const 引用传参', '理解 const 引用不拷贝、不改值的特点'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '你已经学过引用：`int& ref = x;` 相当于给变量取了个别名。\n但普通引用会允许你修改原值。',
      code: 'int x = 5;\nint& ref = x;\nref = 10;  // x 变成了 10',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '有时候你只是想**高效地读取**数据，不想拷贝一份，也不想意外修改原值。\n这时候用 `const 引用`——`const int& ref = x;`',
      code: 'int x = 5;\nconst int& ref = x;\nref = 10;  // 编译错误！const 引用不能改',
    },
    {
      type: 'type-it',
      instruction: '声明一个 const 引用：',
      code: 'const int& ref = score;',
      hints: [
        'const int& 是 const 引用的写法',
        'ref 是 score 的别名，但只读',
        '不能通过 ref 修改 score 的值',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：普通引用 `int& r = x;` 中 r 和 x 的关系是什么？',
      options: [
        { text: 'r 是 x 的拷贝', correct: false, explanation: '引用不是拷贝，是别名' },
        { text: 'r 是 x 的地址', correct: false, explanation: '地址是指针的概念' },
        { text: 'r 是 x 的另一个名字', correct: true, explanation: '引用就是别名，操作 r 就是操作 x' },
        { text: 'r 不能修改 x', correct: false, explanation: '普通引用可以修改原值' },
      ],
    },
    {
      type: 'exposition',
      text: 'const 引用最大的用处：**函数参数**。\n传引用避免了拷贝大对象的开销，const 保证了函数不会乱改你的数据。',
      code: 'void printInfo(const string& name) {\n  cout << name;  // 只读，不拷贝，安全\n}',
    },
    {
      type: 'concept-cards',
      instruction: '对比三种传参方式：',
      cards: [
        { glyph: '📋', term: '传值', meaning: '拷贝一份，修改不影响原值', example: 'void f(int x)' },
        { glyph: '🔗', term: '传引用', meaning: '不拷贝，但可以修改原值', example: 'void f(int& x)' },
        { glyph: '🔒', term: 'const 引用', meaning: '不拷贝，而且不能改原值', example: 'void f(const int& x)' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个用 const 引用传参的函数：',
      code: 'void show(const string& msg) {\n  cout << msg << endl;\n}',
      hints: [
        'const string& 避免了字符串拷贝',
        '函数内部不能修改 msg',
        '调用时直接 show("hello") 也可以',
      ],
    },
    {
      type: 'exposition',
      text: 'const 引用还有一个神奇的特性：**可以绑定临时值**。\n普通引用不能绑定临时值，但 const 引用可以。',
      code: 'int& r = 5;       // 编译错误！\nconst int& cr = 5;  // 可以！临时值被延长生命周期',
    },
    {
      type: 'multiple-choice',
      question: 'const 引用最主要的优点是什么？',
      options: [
        { text: '让代码更短', correct: false, explanation: '长度不一定是优势' },
        { text: '不拷贝数据，同时保证不修改', correct: true, explanation: '高效又安全' },
        { text: '可以修改原值', correct: false, explanation: 'const 引用不能修改原值' },
        { text: '比传值更慢', correct: false, explanation: '引用不拷贝，通常更快' },
      ],
    },
    {
      type: 'exposition',
      text: '什么时候用 const 引用：\n- 参数是大型对象（string、vector、自定义类）\n- 你只需要读取数据，不需要修改\n- 你想支持传临时值（字面量、表达式结果）',
    },
    {
      type: 'type-it',
      instruction: '遍历 vector 时用 const 引用避免拷贝：',
      code: 'for (const auto& item : items) {\n  cout << item << endl;\n}',
      hints: [
        'const auto& 是范围 for 循环的常见写法',
        '不拷贝每个元素，只读访问',
        'auto 自动推导类型',
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪个能绑定到 const int&？',
      options: [
        { text: 'int x = 5; const int& r = x;', correct: true, explanation: 'const 引用可以绑定变量' },
        { text: 'const int& r = 42;', correct: true, explanation: 'const 引用也可以绑定字面量' },
        { text: 'int& r = 42;', correct: false, explanation: '普通引用不能绑定临时值' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全函数参数——用 const 引用传一个 string。',
      template: 'void print(____ ____ ____& ____) { }',
      answers: ['const', 'std', 'string', 's'],
      hints: ['第一个空：保证不修改', '第二个空：命名空间', '第三个空：类型', '第四个空：参数名'],
    },
    {
      type: 'exposition',
      text: '总结习惯：\n- 小对象（int、char、bool）用传值\n- 大对象（string、vector、类）用 const 引用\n- 需要修改原值用普通引用',
    },
    {
      type: 'type-it',
      instruction: '更复杂的 const 引用参数：',
      code: 'double average(const vector<double>& scores) {\n  double sum = 0;\n  for (const auto& s : scores) {\n    sum += s;\n  }\n  return sum / scores.size();\n}',
      hints: [
        'vector<double>& 避免了整个数组的拷贝',
        'const 保证函数不会修改 scores',
        '循环内也用 const auto& 避免拷贝每个元素',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p05-07：引用和指针最大的区别是什么？',
      options: [
        { text: '引用不能为空，指针可以为空', correct: true, explanation: '引用必须绑定对象，指针可以是 nullptr' },
        { text: '指针不能为空，引用可以为空', correct: false, explanation: '引用不能为空' },
        { text: '它们没有任何区别', correct: false, explanation: '引用更安全，不能重新绑定' },
        { text: '引用是 C 的，指针是 C++ 的', correct: false, explanation: 'C++ 两者都有' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '以下哪种情况最适合用 const 引用？',
      options: [
        { text: '传 int 类型参数', correct: false, explanation: 'int 很小，传值更简单' },
        { text: '传大型对象且只需读取', correct: true, explanation: 'const 引用避免了拷贝，又保证不修改' },
        { text: '需要修改原值', correct: false, explanation: '修改原值用普通引用' },
        { text: '传字面量给函数', correct: false, explanation: 'const 引用可以绑定字面量，但小类型传值也可' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全：用 const 引用遍历 vector。',
      template: 'for (____ ____ ____ ____ : items) {\n  cout << item << endl;\n}',
      answers: ['const', 'auto', '&', 'item'],
      hints: ['第一空：只读', '第二空：自动推导', '第三空：引用避免拷贝', '第四空：循环变量名'],
    },
    {
      type: 'type-it',
      instruction: 'const 引用作为函数返回值：',
      code: 'const string& getName() const {\n  return name;\n}',
      hints: [
        '返回 const 引用避免拷贝',
        '调用方不能修改返回值',
        '常与 const 成员函数搭配',
      ],
    },
    {
      type: 'exposition',
      text: '记住这条黄金规则：**尽可能用 const 引用**——\n你获得了引用的效率，又有了 const 的安全，还能绑定临时值。三赢。',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson