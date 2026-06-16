import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'inheritance-modes',
    chapter: 9,
    title: '三种继承方式',
    subtitle: 'public/protected/private',
    description: '继承方式决定了基类成员在派生类中的访问权限。',
    objectives: ['能区分三种继承方式的效果', '能说出何时用 public 继承'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '继承时除了指定基类，还要指定**继承方式**：\n`public` / `protected` / `private`',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '继承方式决定了基类成员在派生类中的**访问级别变化**。\n规则很简单：**继承方式 = 新权限上限**。',
    },
    {
      type: 'exposition',
      text: '三种继承方式一览：',
      code: 'class B : public    A { };  // 最常用\nclass B : protected A { };  // 较少用\nclass B : private   A { };  // 默认方式',
    },
    {
      type: 'exposition',
      text: '继承方式的效果表：',
      code: '基类\\继承后   public继承  protected继承  private继承\npublic       public     protected    private\nprotected    protected  protected    private\nprivate      不可见      不可见       不可见',
    },
    {
      type: 'exposition',
      text: '什么意思呢？\n- **public 继承**：基类的 public 保持 public，protected 保持 protected\n- **protected 继承**：基类的 public 和 protected 都变成 protected\n- **private 继承**：基类的 public 和 protected 都变成 private',
    },
    {
      type: 'exposition',
      text: '### public 继承（最常用）\n\n基类的 public → 派生类的 public\n基类的 protected → 派生类的 protected\n含义：**保持原有访问权限不变**。\n这保持了"is-a"关系。',
    },
    {
      type: 'exposition',
      text: '### protected 继承\n\n基类的 public → 派生类的 **protected**\n基类的 protected → 派生类的 **protected**\n含义：派生类的用户（外部）不能访问任何继承来的成员。',
    },
    {
      type: 'exposition',
      text: '### private 继承（默认）\n\n基类的 public → 派生类的 **private**\n基类的 protected → 派生类的 **private**\n含义：所有继承来的成员都变成派生类的私有成员。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：protected 访问权限允许谁访问？',
      options: [
        { text: '只有本类内部', correct: false, explanation: 'protected 还允许派生类访问' },
        { text: '本类和派生类，外部不行', correct: true, explanation: 'protected 介于 public 和 private 之间' },
        { text: '任何人，像 public 一样', correct: false, explanation: '那不是 protected' },
        { text: '任何人都不能访问', correct: false, explanation: '那是 private 的特征' },
      ],
    },
    {
      type: 'exposition',
      text: '看一个例子——不同继承方式的效果：',
      code: 'class A {\npublic: int x;\nprotected: int y;\nprivate: int z;\n};\n\nclass B : public A {\n  // x -> public,  y -> protected,  z 不可见\n};\n\nclass C : protected A {\n  // x -> protected,  y -> protected,  z 不可见\n};\n\nclass D : private A {\n  // x -> private,  y -> private,  z 不可见\n};',
    },
    {
      type: 'type-it',
      instruction: '定义一个有 public 和 protected 成员的基类并用 public 继承：',
      code: 'class Base {\npublic:\n  int a;\nprotected:\n  int b;\n};\n\nclass Derived : public Base {\n  // a 是 public, b 是 protected\n};',
      hints: [
        'Base 有 public 成员 a 和 protected 成员 b',
        'Derived 用 public 继承 Base',
        'public 继承保持原有访问权限',
      ],
    },
    {
      type: 'multiple-choice',
      question: '用 private 继承时，基类的 public 成员在派生类中变成什么？',
      options: [
        { text: 'public', correct: false, explanation: 'private 继承会降级所有成员的访问权限' },
        { text: 'protected', correct: false, explanation: 'private 继承使 public 变成 private，不是 protected' },
        { text: 'private', correct: true, explanation: 'private 继承把基类的 public 和 protected 都变成 private' },
        { text: '不可见', correct: false, explanation: '只有基类自己的 private 成员不可见' },
      ],
    },
    {
      type: 'exposition',
      text: '### 默认继承方式\n\n如果你不写继承方式，**class 默认是 private 继承**：',
      code: 'class B : A { };  // 等价于 class B : private A { };',
    },
    {
      type: 'exposition',
      text: '但`struct`的默认继承是 public：',
      code: 'struct B : A { };  // 等价于 class B : public A { };',
    },
    {
      type: 'type-it',
      instruction: '演示 protected 继承的效果：',
      code: 'class Base {\npublic:\n  int x;\n};\n\nclass Derived : protected Base {\n  // x 在 Derived 中是 protected\n};',
      hints: [
        'Base 的 x 是 public',
        'Derived 用 protected 继承',
        'x 在 Derived 中变成 protected',
      ],
    },
    {
      type: 'exposition',
      text: '### 实际开发建议\n\n**绝大多数情况下只用 public 继承**。\nprotected 和 private 继承很少用，它们把接口"藏"起来了，会让代码更难理解。',
    },
    {
      type: 'multiple-choice',
      question: '实际 C++ 开发中最常用哪种继承方式？',
      options: [
        { text: 'public 继承', correct: true, explanation: 'public 继承最常见，它保持了 is-a 关系语义' },
        { text: 'protected 继承', correct: false, explanation: 'protected 继承很少用' },
        { text: 'private 继承', correct: false, explanation: 'private 继承有特定场景但不多见' },
        { text: '随机选择', correct: false, explanation: '继承方式需要根据设计目的选择' },
      ],
    },
    {
      type: 'exposition',
      text: '总结：\n- **public 继承**：保持权限，is-a 关系 ✅ 最常用\n- **protected 继承**：降为 protected\n- **private 继承**：全部降为 private\n- **推荐**：99% 的情况用 public 继承',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '记住：继承方式的本质是**访问权限的过滤器**，它决定了基类成员在派生类中的可见性。',
    },
  ],
}

export default lesson
