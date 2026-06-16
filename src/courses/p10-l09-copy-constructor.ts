import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'copy-constructor',
    chapter: 11,
    title: '拷贝构造函数',
    subtitle: '用同类对象初始化',
    description: '学习如何编写拷贝构造函数，实现深拷贝，避免浅拷贝问题。',
    objectives: ['能写出拷贝构造函数的声明和定义', '能实现深拷贝的拷贝构造函数', '能理解何时会调用拷贝构造函数'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '拷贝构造函数是**用同类对象来初始化新对象**的特殊构造函数。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '声明语法：',
      code: 'class ClassName {\npublic:\n  ClassName(const ClassName& other);  // 拷贝构造\n};',
    },
    {
      type: 'exposition',
      text: '参数是**同类的 const 引用**。\n必须是引用——如果是传值，会无限递归调用自己。',
    },
    {
      type: 'exposition',
      text: '默认情况下，编译器会生成一个**浅拷贝**的拷贝构造函数。\n如果你的类有指针成员，默认版本不够用。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：声明一个带拷贝构造的类。',
      code: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass MyString {\npublic:\n  char* data;\n  int len;\n  MyString(const char* s) {\n    len = strlen(s);\n    data = new char[len + 1];\n    strcpy(data, s);\n  }\n  MyString(const MyString& other) {\n    len = other.len;\n    data = new char[len + 1];\n    strcpy(data, other.data);\n    cout << "拷贝构造: " << data << endl;\n  }\n  ~MyString() { delete[] data; }\n};',
      hints: ['拷贝构造参数是 const 引用', '内部实现深拷贝：先 new 再复制', '和构造函数一样没有返回值'],
    },
    {
      type: 'exposition',
      text: '深拷贝拷贝构造的步骤：\n1. 获取原对象的长度\n2. `new` 分配新内存\n3. `strcpy` 复制内容\n4. 现在两个对象各有一份独立数据',
    },
    {
      type: 'exposition',
      text: '**何时调用拷贝构造？**\n1. 用已有对象初始化新对象：`MyString b = a;`\n2. 函数传参（传值）：`void func(MyString s)`\n3. 函数返回（返回对象）',
    },
    {
      type: 'exposition',
      text: '最常见的是第一种：',
      code: 'MyString a("hello");\nMyString b = a;   // 调用拷贝构造\nMyString c(a);    // 也是拷贝构造（等价）',
    },
    {
      type: 'match-blocks',
      instruction: '按正确顺序排列拷贝构造函数的声明：',
      fragments: ['MyString', '(const MyString& other)', ';'],
      distractors: ['MyString& other', 'const MyString other'],
    },
    {
      type: 'exposition',
      text: '如果没写拷贝构造，编译器生成默认的——浅拷贝。\n浅拷贝的后果：两个对象的 `data` 指向同一地址，析构时 double delete。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：使用拷贝构造创建对象。',
      code: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass MyString {\npublic:\n  char* data;\n  MyString(const char* s) {\n    data = new char[strlen(s) + 1];\n    strcpy(data, s);\n  }\n  MyString(const MyString& other) {\n    data = new char[strlen(other.data) + 1];\n    strcpy(data, other.data);\n  }\n  ~MyString() { delete[] data; }\n};\n\nint main() {\n  MyString a("C++");\n  MyString b = a;\n  cout << b.data << endl;\n}',
      hints: ['MyString b = a 调用拷贝构造', '深拷贝让 b 有独立内存', '两个对象析构各自释放'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：浅拷贝有什么问题？',
      options: [
        { text: '代码写起来太复杂', correct: false, explanation: '浅拷贝简单，但危险' },
        { text: '两个指针指向同一内存，析构时 double delete', correct: true, explanation: '浅拷贝共享内存，析构双删' },
        { text: '不能复制字符串', correct: false, explanation: '浅拷贝能复制指针，只是不复制内容' },
        { text: '性能太差', correct: false, explanation: '浅拷贝快，但危险' },
      ],
    },
    {
      type: 'exposition',
      text: '**重要区别**：\n- `MyString b = a;` —— 拷贝构造（新对象）\n- `b = a;` —— 拷贝赋值（已存在的对象）\n下一课讲拷贝赋值。',
    },
    {
      type: 'fill-in',
      prompt: '补全拷贝构造函数的声明：',
      template: 'MyString(____ ____ ____ other) ____',
      answers: ['const', 'MyString&', 'other', ';'],
      hints: ['第一个空是 const 关键字', '第二个空是类型加引用符号', '第三个空是参数名', '第四个空是分号'],
    },
    {
      type: 'exposition',
      text: '记住：\n- 有指针成员的类几乎都需要自定义拷贝构造\n- 拷贝构造参数必须是 `const ClassName&`\n- 拷贝构造实现深拷贝：**new + copy**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '再看一个容易被忽略的场景：**函数传参**。',
      code: 'void func(MyString s) {  // 传值：调用拷贝构造\n  // 这里操作 s\n}  // s 析构\n\nMyString a("hello");\nfunc(a);  // a 被拷贝到参数 s',
    },
    {
      type: 'exposition',
      text: '如果 `MyString` 没有深拷贝拷贝构造——\n`func(a)` 会浅拷贝，`s` 和 `a` 共享内存。\n函数结束 `s` 析构释放内存，`a` 就悬空了。',
    },
    {
      type: 'exposition',
      text: '解决方案：\n1. 实现深拷贝拷贝构造（已经学了）\n2. 或者传引用 `const MyString&` 避免拷贝',
    },
  ],
}

export default lesson
