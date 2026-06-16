import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'object-slicing',
    chapter: 9,
    title: '对象切割',
    subtitle: '值传递会切掉子类',
    description: '用父类值接收子类对象时，派生类部分会被"切掉"，导致数据丢失。',
    objectives: ['能解释对象切割的发生条件', '能避免对象切割的陷阱'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '对象切割（Object Slicing）是 C++ 中一个**隐蔽的坑**。\n当你用基类的**值**去接派生类对象时，派生类部分会被切掉。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 什么是切割\n\n看——这就是切割：',
      code: 'class Base {\npublic:\n  int a = 1;\n};\n\nclass Derived : public Base {\npublic:\n  int b = 2;\n};\n\nint main() {\n  Derived d;\n  Base b = d;  // 切割！b 被"切掉"了！\n  cout << b.a;  // 1（没问题）\n  // b.b         // 编译错误！b 没有 b 成员\n}',
    },
    {
      type: 'exposition',
      text: '### 切割时发生了什么？\n\n`Base b = d;` 实际上是：\n1. 创建了一个`Base`类型的对象`b`\n2. **只拷贝**`d`中的`Base`部分\n3. `Derived`部分的成员被丢弃（切掉了）\n4. 完全不可逆——切掉的数据永远丢失',
    },
    {
      type: 'exposition',
      text: '### 函数参数切割\n\n最常见的切割发生在函数参数传递时：',
      code: 'void func(Base b) {  // 值传递！\n  b.speak();  // 永远调 Base::speak()\n}\n\nDerived d;\nfunc(d);  // 切割！d 变成 Base 对象',
    },
    {
      type: 'code-runner',
      instruction: '观察对象切割的现象，对比值传递和引用传递：',
      code: `#include <iostream>
using namespace std;

class Base {
public:
  virtual void show() { cout << "Base"; }
};

class Derived : public Base {
public:
  void show() override { cout << "Derived"; }
};

void byValue(Base b) {
  b.show();
}

void byRef(Base& b) {
  b.show();
}

int main() {
  Derived d;
  cout << "值传递: ";
  byValue(d);
  cout << " 引用传递: ";
  byRef(d);
}`,
      expectedOutput: '值传递: Base 引用传递: Derived',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '看到了吗？\n- `byValue(d)`：切割了，调的是 Base 版本 — **多态失效**\n- `byRef(d)`：没有切割，调的是 Derived 版本 — **多态正常**',
    },
    {
      type: 'multiple-choice',
      question: '回顾：多态必须通过什么方式调用？',
      options: [
        { text: '值传递', correct: false, explanation: '值传递会切割，多态失效' },
        { text: '指针或引用', correct: true, explanation: '只有指针或引用才能保持多态' },
        { text: '直接调用', correct: false, explanation: '直接对象调用编译时确定函数' },
        { text: '静态方法', correct: false, explanation: '静态方法不能是虚函数' },
      ],
    },
    {
      type: 'exposition',
      text: '### 切割的后果\n\n1. **数据丢失**：派生类的成员变量全部丢失\n2. **多态失效**：切割后变成了纯基类对象，虚函数调基类版本\n3. **隐蔽 bug**：编译不报错，运行时行为不对\n4. **更难调试**：看起来一切正常，但结果就是不对',
    },
    {
      type: 'exposition',
      text: '### 如何避免切割\n\n1. **函数参数用引用/指针**：`void func(Base& b)` 或 `void func(Base* b)`\n2. **容器存指针**：`vector<Base*>` 而不是 `vector<Base>`\n3. **禁止拷贝基类**：可以`= delete`拷贝构造（高级用法）',
    },
    {
      type: 'code-runner',
      instruction: '看 vector 中的切割问题：',
      code: `#include <iostream>
#include <vector>
using namespace std;

class Base {
public:
  virtual void show() { cout << "B"; }
};

class Derived : public Base {
public:
  void show() override { cout << "D"; }
};

int main() {
  vector<Base> vec;
  vec.push_back(Derived());  // 切割！
  vec[0].show();  // 输出 B，不是 D！
  cout << " (本来是 D，被切成了 B)";
}`,
      expectedOutput: 'B (本来是 D，被切成了 B)',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'type-it',
      instruction: '正确的用法——用指针避免切割：',
      code: 'class Base {\npublic:\n  virtual void show() { cout << "B"; }\n  virtual ~Base() { }\n};\n\nclass Derived : public Base {\npublic:\n  void show() override { cout << "D"; }\n};',
      hints: [
        '基类有虚函数，所以也要虚析构',
        '用 Base* 指针指向 Derived 对象',
        '指针方式不会发生切割',
      ],
    },
    {
      type: 'exposition',
      text: '正确的容器用法：不要用 vector&lt;Base&gt; 存子类对象（会切割），要用 vector&lt;Base*&gt; 存指针。',
    },
    {
      type: 'multiple-choice',
      question: '下面哪种方式会发生对象切割？',
      options: [
        { text: 'Base& ref = derived;', correct: false, explanation: '引用不会切割' },
        { text: 'Base* ptr = &derived;', correct: false, explanation: '指针不会切割' },
        { text: 'Base b = derived;', correct: true, explanation: '按值赋值时会发生切割' },
        { text: 'void func(Base& b); func(derived);', correct: false, explanation: '引用传递不会切割' },
      ],
    },
    {
      type: 'exposition',
      text: '### 编译器无法警告\n\n切割不是语法错误，编译器不会报错。\n它只是**行为不对**。所以必须靠开发者自己注意。',
    },
    {
      type: 'multiple-choice',
      question: '切割会导致什么后果？',
      options: [
        { text: '编译错误', correct: false, explanation: '切割不是语法错误，编译能通过' },
        { text: '派生类成员丢失，多态失效', correct: true, explanation: '切割后派生类部分被切掉，调用虚函数时调的是基类版本' },
        { text: '程序崩溃', correct: false, explanation: '通常不会崩溃，只是行为不对' },
        { text: '无限循环', correct: false, explanation: '切割不会导致循环' },
      ],
    },
    {
      type: 'exposition',
      text: '### 切割的隐蔽性\n\n切割最麻烦的地方是它**不报错**。\n编译器觉得"把一个子类对象赋值给父类变量"完全合法。\n只有当你发现多态没生效、数据丢失时，才意识到问题。',
    },
    {
      type: 'exposition',
      text: '### 切割和引用的区别\n\n很多人混淆"值传递"和"引用传递"——\n- `void func(Base b)` → 值传递，**切割**\n- `void func(Base& b)` → 引用传递，**安全**\n- `void func(Base* b)` → 指针传递，**安全**\n\n区别只在于一个`&`或`*`。',
    },
    {
      type: 'exposition',
      text: '总结：\n- **值传递** → 切割（不要用！）\n- **引用/指针** → 安全（用这个！）\n- 容器也用指针：`vector<Base*>`\n- 记住口诀：**多态用引用或指针，永远不要传值**',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
