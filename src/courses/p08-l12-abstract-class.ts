import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'abstract-class',
    chapter: 9,
    title: '纯虚函数与抽象类',
    subtitle: '只能当爸爸',
    description: '纯虚函数让类变成抽象类，不能创建对象，只能作为基类使用。',
    objectives: ['能写出纯虚函数语法', '能解释抽象类的作用和限制'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有些类在概念上就不应该被"实例化"。\n比如"形状"——没有"形状"这种东西，只有"圆形""方形"。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: 'C++ 提供了**纯虚函数（pure virtual function）**来实现这个需求：',
      code: 'class Shape {\npublic:\n  virtual void draw() = 0;  // 纯虚函数\n};',
    },
    {
      type: 'exposition',
      text: '`= 0` 告诉编译器：这个函数没有实现，派生类**必须**提供实现。\n包含纯虚函数的类称为**抽象类**。',
    },
    {
      type: 'exposition',
      text: '抽象类的特点：\n- **不能创建对象**：`Shape s;` → 编译错误\n- **可以定义指针**：`Shape* p;` → OK\n- **派生类必须实现所有纯虚函数**，否则派生类也是抽象类',
    },
    {
      type: 'concept-cards',
      instruction: '抽象类的关键概念：',
      cards: [
        { glyph: '⬜', term: '纯虚函数', meaning: '没有实现的虚函数，=0 结尾', example: 'virtual void f() = 0;' },
        { glyph: '🏛️', term: '抽象类', meaning: '有纯虚函数的类，不能实例化', example: 'class Shape { virtual void draw()=0; };' },
        { glyph: '✅', term: '具体类', meaning: '实现了所有纯虚函数的派生类', example: 'class Circle : Shape { void draw() override {} };' },
        { glyph: '📜', term: '契约', meaning: '抽象类规定你必须做什么', example: '所有形状都必须能 draw' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个抽象类 Shape，包含纯虚函数 draw：',
      code: 'class Shape {\npublic:\n  virtual void draw() = 0;\n};',
      hints: [
        'virtual 关键字不能少',
        '= 0 表示纯虚函数',
        '纯虚函数没有函数体',
      ],
    },
    {
      type: 'exposition',
      text: '派生类必须实现所有纯虚函数：',
      code: 'class Circle : public Shape {\npublic:\n  void draw() override {\n    cout << "画圆形";\n  }\n};\n\nclass Square : public Shape {\npublic:\n  void draw() override {\n    cout << "画方形";\n  }\n};',
    },
    {
      type: 'type-it',
      instruction: '定义抽象类和实现它的派生类：',
      code: 'class Animal {\npublic:\n  virtual void sound() = 0;\n};\n\nclass Dog : public Animal {\npublic:\n  void sound() override { cout << "Woof!"; }\n};',
      hints: [
        'Animal 是抽象类，sound 是纯虚函数',
        'Dog 必须实现 sound',
        '如果 Dog 不实现 sound，Dog 也是抽象类',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：虚析构的作用是什么？',
      options: [
        { text: '加快程序运行', correct: false, explanation: '虚析构不影响运行速度' },
        { text: '确保通过基类指针删除时正确调用派生类析构', correct: true, explanation: '虚析构防止内存泄漏' },
        { text: '让类不能被继承', correct: false, explanation: '虚析构和继承限制无关' },
        { text: '自动释放内存', correct: false, explanation: '虚析构确保正确的析构顺序' },
      ],
    },
    {
      type: 'exposition',
      text: '### 抽象类的使用场景\n\n1. **定义接口**：规定子类必须实现的方法\n2. **提供通用基类**：共享成员变量和部分实现\n3. **强制统一调用方式**：基类指针调子类方法',
    },
    {
      type: 'exposition',
      text: '### 注意：抽象类可以有普通成员\n\n抽象类除了纯虚函数，也可以有普通成员变量和普通成员函数：',
      code: 'class Shape {\npublic:\n  int x, y;\n  void moveTo(int nx, int ny) { x = nx; y = ny; }\n  virtual void draw() = 0;\n};',
    },
    {
      type: 'type-it',
      instruction: '抽象类带成员变量，派生类使用：',
      code: 'class Weapon {\npublic:\n  int damage;\n  Weapon(int d) : damage(d) { }\n  virtual void attack() = 0;\n};\n\nclass Sword : public Weapon {\npublic:\n  Sword() : Weapon(10) { }\n  void attack() override { cout << "斩击!" << damage; }\n};',
      hints: [
        'Weapon 有成员 damage 和纯虚函数 attack',
        'Sword 实现 attack',
        'Weapon 不能直接创建对象',
      ],
    },
    {
      type: 'multiple-choice',
      question: '抽象类能创建对象吗？',
      options: [
        { text: '能，和普通类一样', correct: false, explanation: '抽象类不能创建对象' },
        { text: '不能，编译会报错', correct: true, explanation: '编译器禁止创建抽象类的实例' },
        { text: '能，但不能调用纯虚函数', correct: false, explanation: '抽象类根本不能实例化' },
        { text: '不能，但可以 new', correct: false, explanation: 'new 也是创建对象，同样不行' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '如果派生类没有实现基类的纯虚函数，会发生什么？',
      options: [
        { text: '派生类也变成抽象类', correct: true, explanation: '只要还有一个纯虚函数没实现，类就是抽象的' },
        { text: '编译通过，运行时崩溃', correct: false, explanation: '编译阶段就会报错' },
        { text: '基类的纯虚函数被自动调用', correct: false, explanation: '纯虚函数没有实现，不能调用' },
        { text: '编译器自动生成默认实现', correct: false, explanation: '编译器不会自动生成实现' },
      ],
    },
    {
      type: 'exposition',
      text: '### 纯虚函数可以有实现\n\n虽然纯虚函数没有函数体，但 C++ 允许给纯虚函数**单独定义实现**：',
      code: 'class Shape {\npublic:\n  virtual void draw() = 0;\n};\n\nvoid Shape::draw() {  // 纯虚函数的实现\n  cout << "默认形状";\n}',
    },
    {
      type: 'exposition',
      text: '派生类可以选择调用基类的纯虚函数实现：\n`void Circle::draw() { Shape::draw(); cout << "圆形"; }`\n\n但这属于高级用法，平时很少用到。',
    },
    {
      type: 'exposition',
      text: '### 抽象类 vs 具体类\n\n- **抽象类**：有`=0`，不能创建对象，用来定规范\n- **具体类**：所有函数都有实现，能创建对象\n\n这样的区分让设计更清晰——用户看到`Shape*`就知道：哦，这是一个抽象接口。',
    },
    {
      type: 'exposition',
      text: '总结：\n- 纯虚函数：`virtual void func() = 0;`\n- 抽象类：有纯虚函数的类，不能实例化\n- 派生类必须实现所有纯虚函数\n- 抽象类 = 契约 + 共享基础',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
