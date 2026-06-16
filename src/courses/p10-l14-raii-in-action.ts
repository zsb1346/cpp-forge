import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'raii-in-action',
    chapter: 11,
    title: 'RAII 实战',
    subtitle: '用类管理内存',
    description: '动手编写 RAII 类，用构造函数获取资源、析构函数释放资源，彻底告别手动 delete。',
    objectives: ['能编写 RAII 管理内存的类', '能理解 RAII 如何简化代码', '能应用 RAII 到实际场景'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '理论讲完了——现在动手写一个真正的 RAII 类。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '我们要写一个管理 `int` 数组的 RAII 类：\n`IntArray`。\n- 构造时：`new[]` 分配数组\n- 析构时：`delete[]` 释放数组',
    },
    {
      type: 'exposition',
      text: '类的骨架：',
      code: 'class IntArray {\n  int* data;\n  int size;\npublic:\n  IntArray(int n) : size(n), data(new int[n]) {}\n  ~IntArray() { delete[] data; }\n  int get(int i) { return data[i]; }\n  void set(int i, int v) { data[i] = v; }\n  int len() { return size; }\n};',
    },
    {
      type: 'type-it',
      instruction: '敲这段：完整的 IntArray RAII 类。',
      code: '#include <iostream>\nusing namespace std;\n\nclass IntArray {\n  int* data;\n  int size;\npublic:\n  IntArray(int n) : size(n), data(new int[n]) {\n    for (int i = 0; i < n; i++) data[i] = 0;\n  }\n  ~IntArray() { delete[] data; }\n  void set(int i, int v) { data[i] = v; }\n  int get(int i) { return data[i]; }\n  int len() { return size; }\n};\n\nint main() {\n  IntArray arr(5);\n  arr.set(0, 10);\n  arr.set(1, 20);\n  for (int i = 0; i < arr.len(); i++) {\n    cout << arr.get(i) << " ";\n  }\n}',
      hints: ['构造函数用 new[] 分配内存', '析构函数用 delete[] 释放', '用户不需要手动管理内存'],
    },
    {
      type: 'exposition',
      text: '看到 RAII 的力量了吗？\n使用 `IntArray` 时，你根本不需要考虑释放——\n离开 `main` 的作用域时，`arr` 自动析构，自动 `delete[]`。',
    },
    {
      type: 'exposition',
      text: '对比裸指针版本：',
      code: '// 裸指针：需要自己记得 delete[]\nvoid oldWay() {\n  int* data = new int[100];\n  // ... 使用 ...\n  delete[] data;  // 忘了就泄漏\n}\n\n// RAII：不用管释放\nvoid raiiWay() {\n  IntArray data(100);\n  // ... 使用 ...\n  // 自动释放\n}',
    },
    {
      type: 'type-it',
      instruction: '敲这段：在函数中使用 RAII 类，观察自动释放。',
      code: '#include <iostream>\nusing namespace std;\n\nclass IntArray {\n  int* data;\n  int size;\npublic:\n  IntArray(int n) : size(n), data(new int[n]) {\n    cout << "构造: 分配 " << n << " 个 int" << endl;\n  }\n  ~IntArray() {\n    cout << "析构: 释放 " << size << " 个 int" << endl;\n    delete[] data;\n  }\n  void set(int i, int v) { data[i] = v; }\n  int get(int i) { return data[i]; }\n};\n\nvoid process() {\n  IntArray arr(3);\n  arr.set(0, 1);\n  arr.set(1, 2);\n  arr.set(2, 3);\n  cout << "处理完成" << endl;\n}\n\nint main() {\n  process();\n  cout << "process 已返回" << endl;\n}',
      hints: ['构造函数输出分配信息', '析构函数输出释放信息', 'process 结束时 arr 自动析构'],
    },
    {
      type: 'exposition',
      text: '输出顺序：\n1. "构造: 分配 3 个 int"\n2. "处理完成"\n3. "析构: 释放 3 个 int"\n4. "process 已返回"\n\n离开函数时，析构自动执行。',
    },
    {
      type: 'code-runner',
      instruction: '修改代码，给 IntArray 添加拷贝构造和拷贝赋值，遵守 Rule of Three：',
      code: '#include <iostream>\nusing namespace std;\n\nclass IntArray {\n  int* data;\n  int size;\npublic:\n  IntArray(int n) : size(n), data(new int[n]) {\n    for (int i = 0; i < n; i++) data[i] = 0;\n  }\n  ~IntArray() { delete[] data; }\n  \n  IntArray(const IntArray& other) : size(other.size), data(new int[other.size]) {\n    for (int i = 0; i < size; i++) data[i] = other.data[i];\n  }\n  \n  IntArray& operator=(const IntArray& other) {\n    if (this == &other) return *this;\n    delete[] data;\n    size = other.size;\n    data = new int[size];\n    for (int i = 0; i < size; i++) data[i] = other.data[i];\n    return *this;\n  }\n  \n  void set(int i, int v) { data[i] = v; }\n  int get(int i) { return data[i]; }\n};\n\nint main() {\n  IntArray a(3);\n  a.set(0, 100);\n  IntArray b = a;\n  cout << b.get(0) << endl;\n}',
      expectedOutput: '100',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: 'RAII + Rule of Three = 安全的资源管理类。\n构造获取，析构释放，拷贝深拷贝——一套组合拳。',
    },
    {
      type: 'exposition',
      text: '实际工作中，你不需要每次都手写 RAII 类。\n标准库已经提供了 RAII 封装：\n- `std::vector` 替代动态数组\n- `std::string` 替代动态字符串\n- `std::unique_ptr` 替代裸指针',
    },
    {
      type: 'exposition',
      text: '看一个用 `unique_ptr` 的 RAII 例子：',
      code: '#include <memory>\n\nvoid demo() {\n  unique_ptr<int> up(new int(42));\n  cout << *up << endl;\n}  // 自动 delete，不需要写析构！',
    },
    {
      type: 'exposition',
      text: '`unique_ptr` 在析构时自动 `delete` 管理的指针。\n而且它禁用了拷贝、支持移动——比手写 RAII 更安全。',
    },
    {
      type: 'exposition',
      text: '关于 `unique_ptr` 的拷贝规则：\n- 不能拷贝（防止两个 `unique_ptr` 指向同一内存）\n- 可以移动（转移所有权）\n- 这正是 RAII + 移动语义的完美结合',
    },
    {
      type: 'exposition',
      text: '`unique_ptr` 的移动构造会把内部指针转移过去，原指针置空。\n这保证了任何时候只有一个 `unique_ptr` 拥有资源——所有权清晰。',
    },
    {
      type: 'code-runner',
      instruction: '用 unique_ptr 改写之前的 IntArray 例子：',
      code: '#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass IntArray {\n  unique_ptr<int[]> data;\n  int size;\npublic:\n  IntArray(int n) : size(n), data(make_unique<int[]>(n)) {\n    for (int i = 0; i < n; i++) data[i] = 0;\n  }\n  void set(int i, int v) { data[i] = v; }\n  int get(int i) { return data[i]; }\n  int len() { return size; }\n};\n\nint main() {\n  IntArray arr(3);\n  arr.set(0, 10);\n  arr.set(1, 20);\n  arr.set(2, 30);\n  for (int i = 0; i < arr.len(); i++) {\n    cout << arr.get(i) << " ";\n  }\n}',
      expectedOutput: '10 20 30',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: 'RAII 让你从"什么时候释放"的焦虑中解脱出来。\n你只需要关心业务逻辑，资源管理交给对象自己。',
    },
    {
      type: 'exposition',
      text: '记住：\n- RAII 类 = 构造获取 + 析构释放\n- 用户只管用，不用管释放\n- RAII + Rule of Three = 安全的资源管理\n- 优先用标准库 RAII 类，少手写',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
