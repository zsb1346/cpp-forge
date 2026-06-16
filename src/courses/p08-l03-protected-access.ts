import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'protected-access',
    chapter: 9,
    title: 'protected 访问权限',
    subtitle: '给子类但不给外部',
    description: 'protected 介于 public 和 private 之间：派生类能访问，外部不能。',
    objectives: ['能区分 public / private / protected 的访问范围', '能在合适的场景使用 protected'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '之前我们学了`public`和`private`。\n现在来学第三个访问权限——`protected`。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '三种访问权限的对比：',
      code: 'class Base {\npublic:      // 谁都能访问\n  int a;\nprotected:   // 派生类能访问，外部不能\n  int b;\nprivate:     // 只有自己能访问\n  int c;\n};',
    },
    {
      type: 'exposition',
      text: '`protected` 处在中间位置：\n- 对**派生类**来说像 public（可以访问）\n- 对**外部代码**来说像 private（不能访问）',
    },
    {
      type: 'concept-cards',
      instruction: '三种访问权限的区别：',
      cards: [
        { glyph: '🌍', term: 'public', meaning: '谁都能访问，包括外部代码', example: '类外部也能用' },
        { glyph: '🛡️', term: 'protected', meaning: '只有自己和派生类能访问', example: '子类能读父类的 protected 成员' },
        { glyph: '🔒', term: 'private', meaning: '只有自己能访问', example: '子类也不能访问' },
      ],
    },
    {
      type: 'exposition',
      text: '看例子——`Character`基类中用`protected`：',
      code: 'class Character {\nprotected:\n  int hp;\npublic:\n  string name;\n};',
    },
    {
      type: 'exposition',
      text: '派生类`Hero`可以直接访问`hp`，但外部代码不行：',
      code: 'class Hero : public Character {\npublic:\n  void heal(int a) {\n    hp += a;  // OK：派生类能访问 protected\n  }\n};\n\nHero h;\nh.name = "Alice";  // OK：public\nh.hp = 100;        // 错误：外部不能访问 protected',
    },
    {
      type: 'type-it',
      instruction: '定义基类，用 protected 保护血量 hp：',
      code: 'class Character {\nprotected:\n  int hp;\npublic:\n  string name;\n};',
      hints: [
        'protected: 放在 int hp; 之前',
        'public: 放在 string name; 之前',
        'protected 成员对派生类可见，外部不可见',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：上一课中，派生类通过什么语法声明继承关系？',
      options: [
        { text: 'class B extends A', correct: false, explanation: 'extends 是 Java 的语法，C++ 用冒号' },
        { text: 'class B : public A', correct: true, explanation: 'C++ 用冒号加继承方式声明继承' },
        { text: 'class B inherits A', correct: false, explanation: 'C++ 中没有 inherits 关键字' },
        { text: 'B -> A', correct: false, explanation: '-> 是指针成员访问符号，不是继承' },
      ],
    },
    {
      type: 'exposition',
      text: '什么时候用`protected`？\n当你想让派生类能直接访问某个成员，但又不希望外部代码乱改的时候。',
    },
    {
      type: 'exposition',
      text: '比如游戏中的`hp`：\n- 派生类`Hero`、`Enemy`需要能修改血量\n- 外部代码不应该直接改血量（应该通过`takeDamage`等方法）',
    },
    {
      type: 'exposition',
      text: '### protected 的黄金法则\n\n成员如果只有类内部需要 → `private`\n成员如果派生类也需要 → `protected`\n成员如果全部代码都需要 → `public`',
    },
    {
      type: 'type-it',
      instruction: '定义有 protected 基类和派生类，演示访问：',
      code: 'class Character {\nprotected:\n  int hp;\npublic:\n  Character() { hp = 100; }\n};\n\nclass Hero : public Character {\npublic:\n  void showHp() { cout << hp; }\n};',
      hints: [
        'hp 是 protected，Hero 能直接访问',
        '构造函数初始化 hp = 100',
        'showHp 方法输出 hp',
      ],
    },
    {
      type: 'multiple-choice',
      question: '外部函数`void check(Character& c)`能访问 c.hp 吗？',
      options: [
        { text: '能，只要 Character 类有 hp', correct: false, explanation: 'hp 是 protected，外部函数不能访问' },
        { text: '不能，hp 是 protected 成员', correct: true, explanation: 'protected 只允许类内部和派生类访问' },
        { text: '能，但需要加 this->', correct: false, explanation: '外部函数根本不能访问 protected 成员' },
        { text: '如果不用引用就可以', correct: false, explanation: '引用还是值传递都是外部，都不能访问' },
      ],
    },
    {
      type: 'exposition',
      text: '对比三者的访问范围：',
      code: '//            本类  派生类  外部\n// public       ✅     ✅    ✅\n// protected    ✅     ✅    ❌\n// private      ✅     ❌    ❌',
    },
    {
      type: 'concept-cards',
      instruction: '记忆口诀：',
      cards: [
        { glyph: '🌍', term: 'public', meaning: '全公开，谁都能用' },
        { glyph: '🛡️', term: 'protected', meaning: '保护级，子类可用' },
        { glyph: '🔒', term: 'private', meaning: '私有的，只有自己用' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '派生类能否访问基类的 private 成员？',
      options: [
        { text: '能，因为是子类', correct: false, explanation: '子类也不能访问父类的 private 成员' },
        { text: '不能，private 只有基类自己能访问', correct: true, explanation: 'private 是最严格的访问权限' },
        { text: '能，但要用父类::成员名', correct: false, explanation: 'private 成员不管用什么方式都不能在子类中访问' },
        { text: '如果能加 friend 就可以', correct: false, explanation: 'friend 是让外部函数访问，不是子类的机制' },
      ],
    },
    {
      type: 'exposition',
      text: '### 实际使用建议\n\n- 成员变量：推荐用 `private` 或 `protected`\n- 成员函数：公开接口用 `public`，内部用 `private`\n- 给派生类用的工具方法：`protected`',
    },
    {
      type: 'exposition',
      text: '总结：\n- 想让派生类能用 → `protected`\n- 想让外部也能用 → `public`\n- 谁都不想给 → `private`\n- **protected 不是 public 也不是 private，而是中间档**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课我们学习三种继承方式（public/protected/private 继承）如何影响权限传递。',
    },
  ],
}

export default lesson
