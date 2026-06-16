import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-copy',
    chapter: 11,
    title: '拷贝语义练习',
    subtitle: '巩固 08-11',
    description: '综合练习拷贝构造、拷贝赋值和 Rule of Three，加深对深浅拷贝的理解。',
    objectives: ['能正确实现拷贝构造和拷贝赋值', '能应用 Rule of Three 编写安全类', '能识別违反 Rule of Three 的代码'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '这一课不学新概念——我们专门练习 08-11 课的内容。\n从拷贝构造到 Rule of Three。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '敲一个完整的 Rule of Three 类：',
      code: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass Word {\n  char* text;\npublic:\n  Word(const char* s) {\n    text = new char[strlen(s) + 1];\n    strcpy(text, s);\n  }\n  ~Word() { delete[] text; }\n  Word(const Word& other) {\n    text = new char[strlen(other.text) + 1];\n    strcpy(text, other.text);\n  }\n  Word& operator=(const Word& other) {\n    if (this == &other) return *this;\n    delete[] text;\n    text = new char[strlen(other.text) + 1];\n    strcpy(text, other.text);\n    return *this;\n  }\n  void print() { cout << text << endl; }\n};',
      hints: ['拷贝构造实现深拷贝', '拷贝赋值做三件事：自赋值检查、释放、复制', '析构函数释放资源'],
    },
    {
      type: 'exposition',
      text: '上面就是一个遵守 Rule of Three 的完整类。\n三个关键函数一个不少。',
    },
    {
      type: 'code-runner',
      instruction: '实现一个深拷贝的类 IntBox，使用 Rule of Three：',
      code: '#include <iostream>\nusing namespace std;\n\nclass IntBox {\n  int* value;\npublic:\n  IntBox(int v) {\n    value = new int(v);\n  }\n  ~IntBox() {\n    delete value;\n  }\n  // 在这里写拷贝构造函数\n  IntBox(const IntBox& other) {\n    value = new int(*other.value);\n  }\n  // 在这里写拷贝赋值运算符\n  IntBox& operator=(const IntBox& other) {\n    if (this == &other) return *this;\n    *value = *other.value;\n    return *this;\n  }\n  int get() { return *value; }\n};\n\nint main() {\n  IntBox a(42);\n  IntBox b = a;\n  IntBox c(0);\n  c = a;\n  cout << a.get() << " " << b.get() << " " << c.get() << endl;\n}',
      expectedOutput: '42 42 42',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '拷贝构造 `IntBox b = a` 创建新对象，拷贝赋值 `c = a` 赋值给已有对象。\n两者都实现深拷贝。',
    },
    {
      type: 'multiple-choice',
      question: '复习 08-11：浅拷贝导致什么问题？',
      options: [
        { text: '代码编译失败', correct: false, explanation: '浅拷贝能编译通过' },
        { text: '两个对象共享内存，析构时 double delete', correct: true, explanation: '浅拷贝的指针指向同一内存，双删' },
        { text: '程序运行变慢', correct: false, explanation: '浅拷贝更快，但危险' },
        { text: '无法访问指针成员', correct: false, explanation: '能访问，但会影响另一个对象' },
      ],
    },
    {
      type: 'exposition',
      text: '常见错误：写了拷贝构造但没写拷贝赋值（或反过来）。\nRule of Three 要求三个都齐。',
    },
    {
      type: 'exposition',
      text: '另一个常见错误：拷贝赋值忘了检查自赋值。\n`box = box;` 会先删除自己的数据然后读已删除的数据——未定义行为。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：测试自赋值是否安全。',
      code: '#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass Word {\n  char* text;\npublic:\n  Word(const char* s) {\n    text = new char[strlen(s) + 1];\n    strcpy(text, s);\n  }\n  ~Word() { delete[] text; }\n  Word(const Word& other) {\n    text = new char[strlen(other.text) + 1];\n    strcpy(text, other.text);\n  }\n  Word& operator=(const Word& other) {\n    if (this == &other) return *this;\n    delete[] text;\n    text = new char[strlen(other.text) + 1];\n    strcpy(text, other.text);\n    return *this;\n  }\n  void print() { cout << text << endl; }\n};\n\nint main() {\n  Word w("self");\n  w = w;\n  w.print();\n}',
      hints: ['自赋值检查防止先删后读', '没有检查的话 w = w 会崩溃', '这里因为有检查所以安全输出 self'],
    },
    {
      type: 'exposition',
      text: '练习要点总结：\n1. 有指针成员的类必须实现深拷贝\n2. 深拷贝需要拷贝构造 + 拷贝赋值 + 析构\n3. 拷贝赋值要检查自赋值\n4. Rule of Three 是不可违背的准则',
    },
    {
      type: 'multiple-choice',
      question: '下列哪种情况不需要遵守 Rule of Three？',
      options: [
        { text: '类中有 int* 成员，负责 delete', correct: false, explanation: '管理资源就需要 Rule of Three' },
        { text: '类中只有 int 和 double 成员', correct: true, explanation: '基本类型不需要特殊拷贝行为' },
        { text: '类中有 char* 成员，用 new[] 分配的', correct: false, explanation: '需要深拷贝' },
        { text: '类中有 FILE* 成员，fclose 释放', correct: false, explanation: '管理资源（文件）就需要 Rule of Three' },
      ],
    },
    {
      type: 'exposition',
      text: '还有一个实用的经验：**用标准库组件来避免手写拷贝逻辑**。\n`std::vector`、`std::string` 已经实现了正确的深拷贝和 RAII。',
    },
    {
      type: 'exposition',
      text: '`std::vector` 的拷贝构造和拷贝赋值都已经正确实现了深拷贝。\n所以你不需要再手写管理数组的 RAII 类——直接用 `vector` 就行了。',
    },
    {
      type: 'exposition',
      text: '比如用一个包含 `vector<int>` 的类，不需要手写拷贝构造：',
      code: 'class Scores {\n  vector<int> data;  // vector 自带深拷贝\npublic:\n  Scores(initializer_list<int> list) : data(list) {}\n  // 不需要写析构、拷贝构造、拷贝赋值！\n  // Rule of Zero 自动满足\n};',
    },
    {
      type: 'exposition',
      text: '这就是 **Rule of Zero**——尽量让类不需要自定义析构/拷贝/移动。\n通过使用已经管理好资源的组件来实现。',
    },
    {
      type: 'exposition',
      text: 'Rule of Zero 并不懒惰——而是聪明。\n与其手写容易出错的内存管理，不如用已经被千百万人测试过的标准库组件。',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个类不需要遵守 Rule of Three？',
      options: [
        { text: '管理 FILE* 的类', correct: false, explanation: '文件资源需要 Rule of Three' },
        { text: '成员全是 std::vector 和 std::string 的类', correct: true, explanation: '标准库组件已管理好资源，Rule of Zero' },
        { text: '管理 int* 的类', correct: false, explanation: '指针资源需要深拷贝' },
        { text: '管理 new int[] 的类', correct: false, explanation: '动态数组需要深拷贝' },
      ],
    },
    {
      type: 'exposition',
      text: '记住：\n- 资源管理 → Rule of Three\n- 拷贝构造 = 初始化时深拷贝\n- 拷贝赋值 = 赋值时深拷贝\n- 有其一必有其三\n- 能用标准库就用标准库 → Rule of Zero',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
