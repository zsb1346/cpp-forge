import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'move-constructor',
    chapter: 11,
    title: '移动构造函数',
    subtitle: '偷资源不复制',
    description: '实现移动构造函数——从右值对象"偷"走资源，避免深拷贝，大幅提升性能。',
    objectives: ['能实现移动构造函数', '能理解移动后原对象的状态', '能区分移动和拷贝的适用场景'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '移动构造函数是 C++11 引入的核心特性。\n参数是**右值引用**——`ClassName(ClassName&& other)`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '移动构造做的事：\n1. **偷走** other 的资源（复制指针，不分配新内存）\n2. 把 other 置空（防止析构时 double delete）',
    },
    {
      type: 'exposition',
      text: '对比拷贝构造和移动构造：',
      code: '// 拷贝构造：深拷贝\nMyString(const MyString& other) {\n  data = new char[...];      // 分配新内存\n  strcpy(data, other.data);  // 复制数据\n}\n\n// 移动构造：偷资源\nMyString(MyString&& other) noexcept {\n  data = other.data;          // 偷指针\n  other.data = nullptr;       // 置空原对象\n}',
    },
    {
      type: 'exposition',
      text: '移动构造的 `noexcept` 关键字——告诉编译器这个函数不会抛异常。\n这样 `vector` 扩容时才能放心用移动（否则会用拷贝）。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：完整的移动构造函数。',
      code: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass MyString {\n  char* data;\npublic:\n  MyString(const char* s) {\n    data = new char[strlen(s) + 1];\n    strcpy(data, s);\n    cout << "构造: " << data << endl;\n  }\n  \n  ~MyString() {\n    cout << "析构: " << (data ? data : "null") << endl;\n    delete[] data;\n  }\n  \n  MyString(const MyString& other) {\n    data = new char[strlen(other.data) + 1];\n    strcpy(data, other.data);\n    cout << "拷贝: " << data << endl;\n  }\n  \n  MyString(MyString&& other) noexcept {\n    data = other.data;\n    other.data = nullptr;\n    cout << "移动: " << (data ? data : "null") << endl;\n  }\n  \n  void print() { cout << data << endl; }\n};',
      hints: ['移动构造参数是 MyString&&', '偷走 other.data 指针', '把 other.data 置空防止双删'],
    },
    {
      type: 'exposition',
      text: '移动构造的步骤：\n1. `data = other.data` —— 复制指针（偷资源）\n2. `other.data = nullptr` —— 原对象置空\n3. 没有 `new`，没有 `strcpy` —— 非常快',
    },
    {
      type: 'exposition',
      text: '移动后的原对象处于**"有效但未指定"**状态。\n- 它仍然可以安全地析构（`delete[] nullptr` 安全）\n- 它仍然可以重新赋值\n- 但不要再读取它的值',
    },
    {
      type: 'exposition',
      text: '什么时候调移动构造？',
      code: 'MyString a("hello");\nMyString b = a;                 // 拷贝构造（a 是左值）\nMyString c = std::move(a);     // 移动构造（std::move 转右值）\nMyString d = createString();   // 移动构造（返回值是右值）',
    },
    {
      type: 'type-it',
      instruction: '敲这段：测试移动构造。',
      code: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass MyString {\n  char* data;\npublic:\n  MyString(const char* s) {\n    data = new char[strlen(s) + 1];\n    strcpy(data, s);\n  }\n  MyString(MyString&& other) noexcept {\n    data = other.data;\n    other.data = nullptr;\n  }\n  ~MyString() { delete[] data; }\n  void print() { cout << (data ? data : "null") << endl; }\n};\n\nMyString makeString() {\n  MyString tmp("temp");\n  return tmp;\n}\n\nint main() {\n  MyString s = makeString();\n  s.print();\n}',
      hints: ['makeString 返回时自动移动', '资源从 tmp 转移到 s', '没有深拷贝'],
    },
    {
      type: 'exposition',
      text: '移动 + 拷贝 + 析构 = **Rule of Five**。\nC++11 后，Rule of Three 扩展成了 Rule of Five：\n析构、拷贝构造、拷贝赋值、**移动构造**、**移动赋值**。',
    },
    {
      type: 'fill-in',
      prompt: '补全移动构造函数的实现，从 other 偷资源：',
      template: 'MyString(MyString&& other) ____ {\n  ____ = other.data;\n  other.____ = ____;\n}',
      answers: ['noexcept', 'data', 'data', 'nullptr'],
      hints: ['第一空是 noexcept', '第二空是偷 other 的指针', '第三空和第四空是置空 other'],
    },
    {
      type: 'exposition',
      text: '**小心**：不要在移动后继续使用原对象的值。\n标准库的做法是：移动后的对象处于"空"状态——能安全析构和重新赋值。',
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：&& 是什么？',
      options: [
        { text: '逻辑与运算符', correct: false, explanation: '&& 在类型中不是逻辑与' },
        { text: '右值引用，绑定到临时对象', correct: true, explanation: '&& 是右值引用声明' },
        { text: '指针的指针', correct: false, explanation: '那是 **' },
        { text: '引用的引用', correct: false, explanation: 'C++ 不允许引用的引用' },
      ],
    },
    {
      type: 'exposition',
      text: '移动语义的最重要应用：\n- `std::unique_ptr`——只能移动不能拷贝\n- `std::thread`——只能移动不能拷贝\n- `std::fstream`——可以移动\n这些类型通过移动语义高效传递所有权。',
    },
    {
      type: 'exposition',
      text: '对比一下拷贝构造和移动构造的代码量：\n- 拷贝构造：`new` + `strcpy` — 多行代码\n- 移动构造：`data = other.data; other.data = nullptr` — 两行搞定',
    },
    {
      type: 'exposition',
      text: '正因为移动构造如此轻量，C++ 标准库的容器（`vector`、`string`）\n在可能的情况下都会优先使用移动而非拷贝。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：比较拷贝和移动的性能差异。',
      code: '#include <iostream>\n#include <vector>\n#include <chrono>\nusing namespace std;\n\nint main() {\n  vector<int> big(1000000, 42);\n  \n  auto t1 = chrono::steady_clock::now();\n  vector<int> copy = big;\n  auto t2 = chrono::steady_clock::now();\n  cout << "拷贝耗时: " << chrono::duration_cast<chrono::milliseconds>(t2 - t1).count() << "ms" << endl;\n  \n  auto t3 = chrono::steady_clock::now();\n  vector<int> moved = std::move(big);\n  auto t4 = chrono::steady_clock::now();\n  cout << "移动耗时: " << chrono::duration_cast<chrono::milliseconds>(t4 - t3).count() << "ms" << endl;\n}',
      hints: ['拷贝大 vector 需要分配和复制', '移动只交换内部指针', '差距非常明显'],
    },
    {
      type: 'exposition',
      text: '记住：\n- 移动构造：`ClassName(ClassName&& other) noexcept`\n- 步骤：偷指针 + 置空原对象\n- 移动比拷贝快得多：O(1) vs O(n)\n- Rule of Five：加上移动构造和移动赋值',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
