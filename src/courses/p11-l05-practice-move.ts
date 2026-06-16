import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-move',
    chapter: 12,
    title: '移动语义练习',
    subtitle: '巩固 01-04',
    description: '综合练习移动构造/移动赋值，巩固左值右值、std::move、移动赋值和 Rule of Five。',
    objectives: ['能熟练写出移动构造函数', '能熟练写出移动赋值运算符', '能判断何时走移动何时走拷贝'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前面四课学了移动语义的核心概念。\n现在通过练习把它们真正用起来。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '写出一个移动构造函数的签名和实现：',
      code: 'Buffer(Buffer&& other) noexcept\n  : data(other.data), size(other.size) {\n  other.data = nullptr;\n  other.size = 0;\n}',
      hints: ['参数是右值引用 T&&', 'noexcept 告诉容器可以安全移动', '记得把原对象的指针置空'],
    },
    {
      type: 'type-it',
      instruction: '写出一个移动赋值运算符的自赋值检查和释放部分：',
      code: 'if (this != &other) {\n  delete[] data;\n  data = other.data;\n  other.data = nullptr;\n}',
      hints: ['this != &other 是自赋值检查', '先释放自己的资源', '再偷对方的资源，最后置空'],
    },
    {
      type: 'code-runner',
      instruction: '补全移动构造函数，运行查看输出。预期会输出 "Moved!"。',
      code: `#include <iostream>
using namespace std;

class Buffer {
  int* data;
  int size;
public:
  Buffer(int s) : size(s) {
    data = new int[size];
    cout << "构造\\n";
  }
  ~Buffer() { delete[] data; }

  Buffer(const Buffer& other) : size(other.size) {
    data = new int[size];
    cout << "拷贝构造\\n";
  }

  // TODO: 补全移动构造函数
  Buffer(Buffer&& other) noexcept {
    // 在这里写代码
  }
};

int main() {
  Buffer a(10);
  Buffer b = move(a);
}`,
      expectedOutput: '构造\nMoved!',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '上一题中：如果没写移动构造，`Buffer b = move(a)` 会调拷贝构造（输出 "拷贝构造"）。\n写了移动构造，就走移动路径。',
    },
    {
      type: 'code-runner',
      instruction: '给这个类加上移动赋值运算符。正确的输出是 "Moved!"。',
      code: `#include <iostream>
using namespace std;

class Buffer {
  int* data;
  int size;
public:
  Buffer(int s) : size(s) {
    data = new int[size];
    cout << "构造\\n";
  }
  ~Buffer() { delete[] data; }

  Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
    other.data = nullptr;
    cout << "Moved!\\n";
  }

  // TODO: 补全移动赋值运算符
};

int main() {
  Buffer a(10);
  Buffer b(20);
  b = move(a);
}`,
      expectedOutput: '构造\n构造\nMoved!',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '下面的代码触发的是哪个函数？\n`string a = "hello";\nstring b = a;`',
      options: [
        { text: '移动构造函数', correct: false, explanation: 'a 是左值，不是右值，不会触发移动' },
        { text: '拷贝构造函数', correct: true, explanation: 'a 是左值，触发拷贝构造' },
        { text: '移动赋值运算符', correct: false, explanation: '这是构造不是赋值' },
        { text: '拷贝赋值运算符', correct: false, explanation: '= 在声明中是构造不是赋值' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '复习：为什么移动赋值需要检查自赋值（this != &other）？',
      options: [
        { text: '避免无限递归', correct: false, explanation: '赋值不会导致递归' },
        { text: '防止 delete 自己数据后又从自己偷', correct: true, explanation: '自赋值时，delete 后数据没了，再从自己偷就到空指针了' },
        { text: '为了满足 noexcept 要求', correct: false, explanation: 'noexcept 和自检查无关' },
        { text: '为了编译通过', correct: false, explanation: '编译器不要求自检查' },
      ],
    },
    {
      type: 'exposition',
      text: '区分三种"赋值"场景：',
      code: 'string a = "hello";   // 构造（不是赋值）\nstring b = a;         // 拷贝构造（a 是左值）\nstring c = move(a);   // 移动构造（move(a) 是右值）\nb = c;                // 拷贝赋值（b 已经存在）\nb = move(c);          // 移动赋值（move(c) 是右值）',
    },
    {
      type: 'type-it',
      instruction: '写出判断左值右值的表达式：',
      code: 'int x = 10;\n&x;       // 能取地址 → x 是____\n&(x + 1); // 不能取地址 → (x+1) 是____',
      hints: ['第一个空：左值的特征', '第二个空：右值的特征', '取地址是判断左右值的法宝'],
    },
    {
      type: 'multiple-choice',
      question: '复习上一课：Rule of Five 不包括以下哪个？',
      options: [
        { text: '析构函数', correct: false, explanation: '析构在 Rule of Five 中' },
        { text: '默认构造函数', correct: true, explanation: '默认构造不在五法则中，它不管理资源' },
        { text: '移动构造函数', correct: false, explanation: '移动构造是五法则新增的' },
        { text: '移动赋值运算符', correct: false, explanation: '移动赋值也是五法则的一部分' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '补全移动构造函数：',
      template: 'Buffer(Buffer&& other) ____\n  : ____(other.data), size(other.size) {\n  other.____ = nullptr;\n}',
      answers: ['noexcept', 'data', 'data'],
      hints: ['第一空是异常保证', '第二空是偷数据指针', '第三空是把对方置空'],
    },
    {
      type: 'exposition',
      text: '练习总结：\n- `move` 把左值变成右值引用\n- 移动构造/移动赋值偷资源\n- 没写移动版本就退化成拷贝\n- Rule of Five 确保资源管理正确',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '**练习场景建议**：\n每次写一个管理资源的类时，先问自己：\n1. 需要析构吗？→ 需要五法则\n2. 移动操作加 noexcept 了吗？\n3. 自赋值检查写了吗？',
    },
    {
      type: 'type-it',
      instruction: '写一个完整的移动赋值运算符（速记练习）：',
      code: 'Widget& operator=(Widget&& other) noexcept {\n  if (this != &other) {\n    delete ptr;\n    ptr = other.ptr;\n    other.ptr = nullptr;\n  }\n  return *this;\n}',
      hints: ['自赋值检查：this != &other', '释放自己：delete ptr', '偷指针并置空对方'],
    },
    {
      type: 'exposition',
      text: '移动语义练习到此结束。\n你已经掌握了左值右值、std::move、移动赋值和 Rule of Five。',
    },
    {
      type: 'exposition',
      text: '移动语义的核心思路：\n**能偷就偷，不能偷再拷贝**。\n这是现代 C++ 性能优化的基本原则之一。',
    },
    {
      type: 'exposition',
      text: '下一阶段进入完美转发——学习如何在模板中保持左右值属性。',
    },
  ],
}

export default lesson
