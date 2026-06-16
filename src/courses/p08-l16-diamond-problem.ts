import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'diamond-problem',
    chapter: 9,
    title: '菱形继承',
    subtitle: '多继承的陷阱',
    description: '多继承可能引发菱形问题，导致二义性和数据冗余，用虚继承解决。',
    objectives: ['能理解菱形继承的问题', '能说出虚继承的解决思路'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: 'C++ 允许一个类**继承多个基类**。\n但多继承可能引出一个经典问题——**菱形继承**。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 什么是菱形继承\n\n继承关系形如菱形：',
      code: '    A\n   / \\\n  B   C\n   \\ /\n    D',
    },
    {
      type: 'exposition',
      text: '代码中的菱形继承：',
      code: 'class A { public: int value; };\nclass B : public A { };\nclass C : public A { };\nclass D : public B, public C { };  // D 有两份 A！',
    },
    {
      type: 'exposition',
      text: '### 问题一：数据冗余\n\n`D` 对象中有**两份**`A`的数据：\n- 一份来自 `B` 路径\n- 一份来自 `C` 路径\n\n内存浪费，而且语义上也说不通——`D` 不应该有两份`value`。',
    },
    {
      type: 'exposition',
      text: '### 问题二：二义性\n\n`D` 对象到底用哪个 `value`？',
      code: 'D d;\nd.value = 5;        // 编译错误！从 B 来的还是 C 来的？\nd.B::value = 5;      // OK，但笨拙\nd.C::value = 5;      // 同上\n\n// 每次访问都要指定路径，非常麻烦',
    },
    {
      type: 'concept-cards',
      instruction: '菱形继承的组成：',
      cards: [
        { glyph: '🔺', term: '菱形继承', meaning: '一个类通过两条路径继承同一个基类', example: 'D <: B <: A, C <: A' },
        { glyph: '⚠️', term: '二义性', meaning: '编译器不知道用哪个路径的成员', example: 'd.value 不明确' },
        { glyph: '📦', term: '数据冗余', meaning: '基类 A 在 D 中有两份拷贝', example: '内存浪费' },
        { glyph: '🔗', term: '虚继承', meaning: '用 virtual 让 A 只有一份', example: 'class B : virtual public A' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：对象切割发生在什么情况下？',
      options: [
        { text: '用引用传参', correct: false, explanation: '引用不会切割' },
        { text: '用基类值接收派生类对象', correct: true, explanation: '值传递/赋值时发生切割' },
        { text: '用指针传参', correct: false, explanation: '指针不会切割' },
        { text: '用派生类引用接收基类对象', correct: false, explanation: '这种反向操作编译错误' },
      ],
    },
    {
      type: 'exposition',
      text: '### 解决方案：虚继承\n\n用`virtual`关键字告诉编译器：**"共享基类"**。',
      code: 'class A { public: int value; };\nclass B : virtual public A { };  // 虚继承\nclass C : virtual public A { };  // 虚继承\nclass D : public B, public C { };  // D 只有一份 A',
    },
    {
      type: 'exposition',
      text: '虚继承后：\n- `D` 只有**一份**`A`的数据\n- `d.value = 5;` 不再有二义性\n- 所有通过虚拟继承的路径共享同一个基类子对象\n- **节省内存** + **消除歧义**',
    },
    {
      type: 'type-it',
      instruction: '用虚继承解决菱形问题：',
      code: 'class A {\npublic:\n  int value;\n};\n\nclass B : virtual public A { };\nclass C : virtual public A { };\nclass D : public B, public C { };',
      hints: [
        'B 和 C 都用 virtual 继承 A',
        'virtual 写在 public 前面',
        'D 现在只有一份 A 的数据',
      ],
    },
    {
      type: 'exposition',
      text: '### 虚继承的语法\n\n`class 派生类 : virtual 继承方式 基类`\n\n- `virtual` 放在继承方式前\n- 比如：`class B : virtual public A { };`\n- 如果忘记写 virtual，再次出现菱形时就会遇到问题',
    },
    {
      type: 'multiple-choice',
      question: '菱形继承中，D 通过 B 和 C 继承 A，D 有几份 A 的数据？',
      options: [
        { text: '1 份', correct: false, explanation: '普通多继承下，D 有两份 A' },
        { text: '2 份', correct: true, explanation: 'B 有一条路径到 A，C 也有一条，D 包含两份 A' },
        { text: '3 份', correct: false, explanation: '只有两条路径，所以是两份' },
        { text: '0 份', correct: false, explanation: 'A 的数据会被包含在 D 中' },
      ],
    },
    {
      type: 'exposition',
      text: '### 实际开发建议\n\n1. **尽量少用多继承**，大多数场景单继承足够\n2. 如果真的需要多继承，考虑虚继承\n3. 优先使用**组合**而不是继承\n4. C++ 中多继承的使用场景远少于 Java/C# 的接口机制',
    },
    {
      type: 'exposition',
      text: '### 菱形继承的替代方案\n\n很多时候你不需要菱形继承：\n- 用**接口**（纯虚类）代替钻石底部的类\n- 用**组合**：`D` 包含 `B` 和 `C` 的对象，而不是继承它们\n- 用**委托**：`D` 把工作委托给 `B` 和 `C` 的实例',
    },
    {
      type: 'type-it',
      instruction: '定义一个更完整的虚继承例子：',
      code: 'class Animal {\npublic:\n  int age;\n};\n\nclass Mammal : virtual public Animal { };\nclass Bird : virtual public Animal { };\nclass Bat : public Mammal, public Bird { };',
      hints: [
        'Bat 既是哺乳动物又是鸟类（生物学例子）',
        '虚继承确保 age 只有一份',
        'Bat 的对象内存更紧凑',
      ],
    },
    {
      type: 'multiple-choice',
      question: '虚继承的关键字是什么？',
      options: [
        { text: 'virtual 放在继承方式前面', correct: true, explanation: 'class B : virtual public A 是正确语法' },
        { text: 'override', correct: false, explanation: 'override 用于标记覆盖虚函数' },
        { text: 'abstract', correct: false, explanation: 'C++ 中没有 abstract 关键字' },
        { text: 'shared', correct: false, explanation: 'C++ 中没有 shared 用于继承' },
      ],
    },
    {
      type: 'exposition',
      text: '### 虚继承的代价\n\n虚继承虽然解决了菱形问题，但它有代价：\n- 增加了内存布局的复杂性\n- 访问虚基类成员比普通成员稍慢\n- 构造函数的调用顺序更复杂',
    },
    {
      type: 'exposition',
      text: '总结：\n- 菱形继承 → 二义性 + 数据冗余\n- 虚继承 `virtual public` → 共享同一份基类\n- 实际开发：**少用多继承，多用组合**\n- 如果要用多继承，**记得加 virtual**',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
