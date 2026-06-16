import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-raii',
    chapter: 11,
    title: 'RAII 综合练习',
    subtitle: '巩固 13-15',
    description: '综合练习 RAII 类的编写与使用，巩固构造获取、析构释放的核心思想。',
    objectives: ['能编写完整的 RAII 类', '能组合 RAII 和 Rule of Three', '能使用 RAII 管理不同资源'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '这一课我们综合练习 RAII——从简单到复杂，逐步巩固。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '敲这个简单的 RAII 类，管理堆上的 double。',
      code: '#include <iostream>\nusing namespace std;\n\nclass DoublePtr {\n  double* ptr;\npublic:\n  DoublePtr(double v) : ptr(new double(v)) {\n    cout << "构造: 分配 double" << endl;\n  }\n  ~DoublePtr() {\n    cout << "析构: 释放 double" << endl;\n    delete ptr;\n  }\n  double get() { return *ptr; }\n  void set(double v) { *ptr = v; }\n};\n\nint main() {\n  DoublePtr d(3.14);\n  cout << d.get() << endl;\n  d.set(2.718);\n  cout << d.get() << endl;\n}',
      hints: ['构造时 new 分配', '析构时 delete 释放', '用户只管 get/set，不用管释放'],
    },
    {
      type: 'exposition',
      text: '上面是最简单的 RAII 类。\n但注意：它没有拷贝构造和拷贝赋值——违反了 Rule of Three。',
    },
    {
      type: 'code-runner',
      instruction: '给 DoublePtr 添加拷贝构造和拷贝赋值，遵守 Rule of Three：',
      code: '#include <iostream>\nusing namespace std;\n\nclass DoublePtr {\n  double* ptr;\npublic:\n  DoublePtr(double v) : ptr(new double(v)) {}\n  ~DoublePtr() { delete ptr; }\n  \n  DoublePtr(const DoublePtr& other) : ptr(new double(*other.ptr)) {}\n  \n  DoublePtr& operator=(const DoublePtr& other) {\n    if (this == &other) return *this;\n    *ptr = *other.ptr;\n    return *this;\n  }\n  \n  double get() { return *ptr; }\n  void set(double v) { *ptr = v; }\n};\n\nint main() {\n  DoublePtr a(1.5);\n  DoublePtr b = a;\n  DoublePtr c(0.0);\n  c = a;\n  cout << a.get() << " " << b.get() << " " << c.get() << endl;\n}',
      expectedOutput: '1.5 1.5 1.5',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: 'RAII + Rule of Three = 安全的资源管理。\n拷贝构造和拷贝赋值确保每个对象有独立的数据。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：使用 RAII 类时，即使异常也能正确释放。',
      code: '#include <iostream>\nusing namespace std;\n\nclass Logger {\n  FILE* file;\npublic:\n  Logger(const char* name) {\n    file = fopen(name, "w");\n    cout << "打开文件" << endl;\n  }\n  ~Logger() {\n    if (file) {\n      fclose(file);\n      cout << "关闭文件" << endl;\n    }\n  }\n  void log(const char* msg) {\n    fprintf(file, "%s\\n", msg);\n  }\n};\n\nvoid test() {\n  Logger log("test.txt");\n  log.log("开始");\n  log.log("结束");\n}\n\nint main() {\n  test();\n  cout << "test 完成" << endl;\n}',
      hints: ['Logger 是 RAII 文件管理类', '构造打开，析构关闭', '不需要手动 fclose'],
    },
    {
      type: 'multiple-choice',
      question: '复习 13-15 课：RAII 的核心思想是什么？',
      options: [
        { text: '用宏定义管理资源', correct: false, explanation: 'RAII 不用宏' },
        { text: '用对象的生命周期管理资源的生命周期', correct: true, explanation: '构造获取，析构释放' },
        { text: '用指针直接操作内存', correct: false, explanation: '那是裸指针，不是 RAII' },
        { text: '用全局变量管理所有资源', correct: false, explanation: '全局变量管理资源不是 RAII' },
      ],
    },
    {
      type: 'exposition',
      text: 'RAII 的使用体验：\n你只需要构造对象，然后正常使用——\n**资源释放已经被安排好了。**',
    },
    {
      type: 'exposition',
      text: '实际开发中，标准库已经提供了 RAII 封装：\n- `std::vector`、`std::string` —— 内存管理\n- `std::ifstream`、`std::ofstream` —— 文件管理\n- `std::unique_ptr`、`std::shared_ptr` —— 智能指针',
    },
    {
      type: 'type-it',
      instruction: '敲这段：用标准库的 RAII 类。',
      code: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {10, 20, 30};\n  string name = "RAII";\n  \n  for (int n : nums) {\n    cout << n << " ";\n  }\n  cout << endl;\n  cout << name << endl;\n}',
      hints: ['vector 自动管理堆数组', 'string 自动管理字符数组', '都不需要手动 delete'],
    },
    {
      type: 'exposition',
      text: 'RAII 让你的代码更安全、更简洁。\n它是 C++ 区别于其他语言的标志性特性。',
    },
    {
      type: 'exposition',
      text: 'RAII 和 Rule of Three 一起使用时，有一个重要判断：\n**这个资源可以"拷贝"吗？**\n- 内存可以深拷贝\n- 文件不可以深拷贝（两个对象写同一个文件？混乱）',
    },
    {
      type: 'exposition',
      text: '不能拷贝的资源怎么办？\n答案是**禁用拷贝**——用 `= delete` 删除拷贝构造和拷贝赋值。\n然后只允许移动——这正是 `unique_ptr` 的做法。',
    },
    {
      type: 'exposition',
      text: '来做一个综合练习：**写一个 RAII 类管理 `FILE*`**。',
      code: 'class FileRAII {\n  FILE* fp;\npublic:\n  FileRAII(const char* name, const char* mode) {\n    fp = fopen(name, mode);\n  }\n  ~FileRAII() {\n    if (fp) fclose(fp);\n  }\n  void write(const char* s) {\n    fprintf(fp, "%s", s);\n  }\n};',
    },
    {
      type: 'exposition',
      text: '这个类有什么问题？\n它没有处理拷贝——如果拷贝了，两个对象会 `fclose` 同一个文件两次。\n需要禁用拷贝或实现深拷贝。',
    },
    {
      type: 'exposition',
      text: '最好的做法：**禁用拷贝**（因为文件不能"深拷贝"）。\n这正是 `unique_ptr` 的做法——只移动，不拷贝。',
    },
    {
      type: 'type-it',
      instruction: '敲这段：禁用拷贝的 RAII 文件类。',
      code: '#include <iostream>\n#include <cstdio>\nusing namespace std;\n\nclass FileRAII {\n  FILE* fp;\npublic:\n  FileRAII(const char* name, const char* mode) {\n    fp = fopen(name, mode);\n    cout << "打开文件" << endl;\n  }\n  ~FileRAII() {\n    if (fp) {\n      fclose(fp);\n      cout << "关闭文件" << endl;\n    }\n  }\n  FileRAII(const FileRAII&) = delete;\n  FileRAII& operator=(const FileRAII&) = delete;\n  void write(const char* s) {\n    fprintf(fp, "%s", s);\n  }\n};\n\nint main() {\n  FileRAII f("test.txt", "w");\n  f.write("Hello RAII");\n  cout << "写入完成" << endl;\n}',
      hints: ['= delete 禁用拷贝构造和拷贝赋值', '这样就不会意外拷贝了', '文件在析构时自动关闭'],
    },
    {
      type: 'exposition',
      text: '记住：\n- RAII = 构造获取、析构释放\n- RAII 类需要 Rule of Three 或禁用拷贝\n- 标准库已经提供了丰富的 RAII 类\n- 能用 RAII 就用 RAII',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
