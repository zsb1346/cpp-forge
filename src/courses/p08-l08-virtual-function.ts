import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'virtual-function',
    chapter: 9,
    title: 'virtual 关键字',
    subtitle: '打开多态的开关',
    description: '在基类成员函数前加 virtual，子类覆盖后通过父类指针调子类方法。',
    objectives: ['能理解 virtual 的作用', '能在基类中声明虚函数'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '要打开多态，只需要在基类的函数前加一个关键字——**`virtual`**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 没有 virtual 时\n\n没有 virtual，编译时就已经决定了调哪个函数。',
      code: 'class Base {\npublic:\n  void speak() { cout << "Base"; }\n};\n\nclass Derived : public Base {\npublic:\n  void speak() { cout << "Derived"; }\n};\n\nint main() {\n  Base* p = new Derived();\n  p->speak();  // 输出：Base（编译时决定！）\n}',
    },
    {
      type: 'exposition',
      text: '### 加上 virtual 后\n\n加 virtual 后，运行时才决定调哪个。',
      code: 'class Base {\npublic:\n  virtual void speak() { cout << "Base"; }\n};\n\nclass Derived : public Base {\npublic:\n  void speak() { cout << "Derived"; }\n};\n\nint main() {\n  Base* p = new Derived();\n  p->speak();  // 输出：Derived（多态生效了！）\n}',
    },
    {
      type: 'concept-cards',
      instruction: '理解 virtual 的机制：',
      cards: [
        { glyph: '🔌', term: 'virtual', meaning: '告诉C++这个函数需要动态绑定', example: 'virtual void speak();' },
        { glyph: '📋', term: '虚函数表 (vtable)', meaning: '编译器为每个类创建的函数指针表', example: '自动生成' },
        { glyph: '🔗', term: '动态绑定', meaning: '运行时根据实际类型决定调哪个函数', example: '不是编译时决定' },
        { glyph: '🎯', term: '覆盖 (override)', meaning: '子类重写父类的虚函数', example: '签名必须一致' },
      ],
    },
    {
      type: 'exposition',
      text: '### 虚函数表（vtable）原理\n\n- 每个有虚函数的类，编译器创建一个**虚函数表**\n- 每个对象有一个隐藏指针`vptr`指向这个表\n- 调用虚函数时，通过 vptr → vtable → 函数地址\n- 这就是"动态绑定"的底层机制',
    },
    {
      type: 'exposition',
      text: '### virtual 的规则\n\n1. 只在基类中声明一次`virtual`\n2. 派生类覆盖时可以不写`virtual`（但建议写`override`）\n3. 通过引用或指针调用才有多态效果\n4. 值传递会丢失多态（对象切割）',
    },
    {
      type: 'type-it',
      instruction: '定义一个基类 Animal 和派生类 Cat，使用 virtual：',
      code: 'class Animal {\npublic:\n  virtual void sound() {\n    cout << "......";\n  }\n};\n\nclass Cat : public Animal {\npublic:\n  void sound() {\n    cout << "Meow!";\n  }\n};',
      hints: [
        'Animal 的 sound 前加 virtual',
        'Cat 的 sound 覆盖父类版本',
        '通过 Animal* 指针调用会走多态',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：上一课中，多态解决的主要问题是什么？',
      options: [
        { text: '代码运行太慢', correct: false, explanation: '多态不解决性能问题' },
        { text: '不用 if-else 判断类型', correct: true, explanation: '多态消除了类型判断的 if-else 链' },
        { text: '让类不能继承', correct: false, explanation: '多态依赖继承' },
        { text: '隐藏成员变量', correct: false, explanation: '数据隐藏是封装的事' },
      ],
    },
    {
      type: 'type-it',
      instruction: '完整示例：使用 virtual 函数实现多态：',
      code: 'class Shape {\npublic:\n  virtual void draw() {\n    cout << "绘制形状";\n  }\n};\n\nclass Circle : public Shape {\npublic:\n  void draw() {\n    cout << "绘制圆形";\n  }\n};',
      hints: [
        'Shape 的 draw 用 virtual 声明',
        'Circle 覆盖 draw 方法',
        '通过 Shape* 指针调用 draw 会走多态',
      ],
    },
    {
      type: 'exposition',
      text: '### 构造函数不能是 virtual\n\n构造函数不能加`virtual`。\n因为构造时虚函数表还没建立好，vptr 尚未初始化。',
    },
    {
      type: 'exposition',
      text: '### static 函数不能是 virtual\n\n静态函数属于类本身，不属于对象。\n虚函数需要对象来查找 vtable。两者不兼容。',
    },
    {
      type: 'exposition',
      text: '### 纯虚函数预告\n\n有时候基类的方法"没有默认实现"，可以写成纯虚函数：\n`virtual void func() = 0;`\n这让基类变成**抽象类**（后面详细讲）。',
    },
    {
      type: 'multiple-choice',
      question: '通过什么方式调用虚函数才能触发多态？',
      options: [
        { text: '值传递（传对象副本）', correct: false, explanation: '值传递会发生切割，丢失多态' },
        { text: '指针或引用', correct: true, explanation: '只有通过指针或引用才能触发动态绑定' },
        { text: '直接调用对象的方法', correct: false, explanation: '直接调用编译时就决定好了' },
        { text: '任何方式都可以', correct: false, explanation: '只有指针/引用方式触发多态' },
      ],
    },
    {
      type: 'type-it',
      instruction: '完整的 virtual 多态例子：',
      code: 'class Base {\npublic:\n  virtual void show() {\n    cout << "Base";\n  }\n};\n\nclass Derived : public Base {\npublic:\n  void show() {\n    cout << "Derived";\n  }\n};\n\nint main() {\n  Base* p = new Derived();\n  p->show();\n}',
      hints: [
        'Base 的 show 是 virtual',
        'Derived 覆盖 show',
        'Base 指针指向 Derived 对象',
      ],
    },
    {
      type: 'exposition',
      text: '### virtual 的性能影响\n\n虚函数调用比普通函数调用多一步：查 vtable。\n但现代 CPU 的分支预测使得这个开销非常小（通常 < 5%）。\n**不要为了性能放弃多态的设计优势。**',
    },
    {
      type: 'exposition',
      text: '总结：\n- `virtual` 是 C++ 多态的"开关"\n- 通过指针/引用调用虚函数会走动态绑定\n- 编译器通过 vtable 在运行时找到正确的函数\n- 构造和 static 函数不能是 virtual',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 下一课预告\n\n`override` 关键字——确保你的覆盖真的生效了。\n没有它，签名写错了也不知道。',
    },
    {
      type: 'exposition',
      text: '记住：有 virtual → 动态绑定 → 多态。没有 virtual → 静态绑定 → 不是多态。',
    },
  ],
}

export default lesson
