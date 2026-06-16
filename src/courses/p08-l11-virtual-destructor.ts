import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'virtual-destructor',
    chapter: 9,
    title: '虚析构函数',
    subtitle: '安全销毁',
    description: '有虚函数的类，析构函数也必须加 virtual，否则可能内存泄漏。',
    objectives: ['能解释为什么需要虚析构', '能在需要时声明虚析构函数'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前面学了虚函数。现在有一个重要的问题：**析构函数也需要是虚函数吗？**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '答案是：如果你的类有虚函数（即作为基类被多态使用），**析构函数必须加 virtual**。',
    },
    {
      type: 'exposition',
      text: '### 没有虚析构的后果\n\n看这个"bug"：',
      code: 'class Base {\npublic:\n  ~Base() { cout << "~Base "; }\n};\n\nclass Derived : public Base {\npublic:\n  int* data;\n  Derived() { data = new int[100]; }\n  ~Derived() { delete[] data; cout << "~Derived "; }\n};\n\nint main() {\n  Base* p = new Derived();\n  delete p;  // 只调了~Base()，没调~Derived()！\n}  // 输出：~Base（内存泄漏！）',
    },
    {
      type: 'exposition',
      text: '问题在于：`delete p`只知道`p`是`Base*`类型。\n如果析构不是 virtual，它只调`Base`的析构。\n**派生类的析构没有被调用**，导致资源泄漏。',
    },
    {
      type: 'exposition',
      text: '### 解决方案：虚析构\n\n把析构函数声明为 virtual：',
      code: 'class Base {\npublic:\n  virtual ~Base() { cout << "~Base "; }\n};\n\nclass Derived : public Base {\npublic:\n  int* data;\n  Derived() { data = new int[100]; }\n  ~Derived() override { delete[] data; cout << "~Derived "; }\n};\n\nint main() {\n  Base* p = new Derived();\n  delete p;\n}  // 输出：~Derived ~Base（正确！）',
    },
    {
      type: 'multiple-choice',
      question: '回顾：多态必须通过什么方式调用虚函数？',
      options: [
        { text: '值传递', correct: false, explanation: '值传递会切割对象' },
        { text: '指针或引用', correct: true, explanation: '只有指针或引用能触发多态' },
        { text: '直接对象', correct: false, explanation: '直接对象编译时确定函数地址' },
        { text: 'new 关键字', correct: false, explanation: 'new 创建对象，多态通过指针/引用调用' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义有虚析构的基类：',
      code: 'class Base {\npublic:\n  virtual ~Base() { }\n};\n\nclass Derived : public Base {\npublic:\n  ~Derived() override { }\n};',
      hints: [
        '基类析构加 virtual',
        '派生类析构加 override',
        '空实现也要写 virtual ~Base()',
      ],
    },
    {
      type: 'exposition',
      text: '### 虚析构的规则\n\n- 如果类有虚函数 → 析构一定是 virtual\n- 如果类是基类（即使没有虚函数）→ 建议加 virtual 析构\n- 如果类不被继承（`final`）→ 不需要虚析构',
    },
    {
      type: 'exposition',
      text: '### 为什么派生类的析构函数名和基类不同还能 override？\n\n这是 C++ 的特殊规则：\n**析构函数名虽然不同，但派生类析构自动覆盖基类析构。**\n每个类的析构函数编译器内部有特殊名称处理。',
    },
    {
      type: 'exposition',
      text: '### 什么时候不需要虚析构？\n\n1. 类没有被多态使用（不会被当作基类指针 delete）\n2. 类被标记为 `final`\n3. 类没有任何派生类\n\n但安全起见：**如果拿不准，就加 virtual。**',
    },
    {
      type: 'multiple-choice',
      question: '没有虚析构时，delete 基类指针会怎样？',
      options: [
        { text: '正确销毁完整对象', correct: false, explanation: '没有虚析构只会调基类析构' },
        { text: '只调基类析构，派生类资源泄漏', correct: true, explanation: '派生类析构不会被调用，动态分配的资源泄漏' },
        { text: '程序立即崩溃', correct: false, explanation: '程序可能能运行，但内存泄漏' },
        { text: '析构顺序反转', correct: false, explanation: '顺序没问题，但派生类析构根本没被调' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个完整的有虚析构的继承层次：',
      code: 'class Resource {\npublic:\n  Resource() { cout << "创建资源 "; }\n  virtual ~Resource() { cout << "销毁资源 "; }\n};\n\nclass FileResource : public Resource {\npublic:\n  FileResource() { cout << "打开文件 "; }\n  ~FileResource() override { cout << "关闭文件 "; }\n};',
      hints: [
        'Resource 有 virtual 析构',
        'FileResource 析构加 override',
        '通过 Resource* 删除时能正确调用',
      ],
    },
    {
      type: 'exposition',
      text: '### 实践建议\n\n**如果你写了一行 `virtual` 函数，请立即写上 `virtual ~ClassName()`。**\n这是 C++ 开发者的基本素养，防止未来的内存泄漏。',
    },
    {
      type: 'multiple-choice',
      question: '下面哪个类一定要有虚析构？',
      options: [
        { text: '被 final 标记的类', correct: false, explanation: 'final 类不能被继承，不需要虚析构' },
        { text: '有虚函数并作为基类使用的类', correct: true, explanation: '通过基类指针删除派生类对象时，需要虚析构才能正确销毁' },
        { text: '没有成员变量的类', correct: false, explanation: '有没有成员变量和是否需要虚析构无关' },
        { text: '只有静态成员的类', correct: false, explanation: '静态成员类通常不需要虚析构' },
      ],
    },
    {
      type: 'exposition',
      text: '### 虚析构的性能\n\n虚析构和普通虚函数一样，有查 vtable 的开销。\n但析构函数通常只调用一次（对象销毁时），性能影响可以忽略。',
    },
    {
      type: 'exposition',
      text: '### 常见误解\n\n"我的派生类没有动态分配内存，是不是就不用虚析构了？"\n\n**不是！** 即使现在没有，未来有人加了呢？\n而且 C++ 标准规定：通过基类指针删除派生类对象，如果基类没有虚析构，**行为是未定义的**——可能崩溃，可能泄漏。',
    },
    {
      type: 'exposition',
      text: '### 一句话记住\n\n**如果类有虚函数，析构一定要加 virtual。否则 delete 基类指针时派生类资源会泄漏。**',
    },
    {
      type: 'exposition',
      text: '总结：\n- 虚析构确保 `delete` 基类指针时正确调用派生类析构\n- 有虚函数的类 → 析构必须 virtual\n- 虚析构的 override 是 C++ 的特殊规则\n- **有 virtual 函数 = 有 virtual 析构**',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
