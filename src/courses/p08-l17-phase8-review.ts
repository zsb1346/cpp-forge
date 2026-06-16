import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase8-review',
    chapter: 9,
    title: '阶段 8 综合复习',
    subtitle: '继承与多态总复习',
    description: '全面回顾继承语法、多态机制、虚函数、抽象类、接口设计等核心概念。',
    objectives: ['能综合运用继承与多态', '能避免对象切割、菱形继承等陷阱'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '这是阶段 8 的最后一课。\n我们通过选择题、概念卡和代码练习来全面回顾这一阶段的内容。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '继承语法 `class B : public A { };` 中，哪个是基类？',
      options: [
        { text: 'B', correct: false, explanation: 'B 是派生类（子类）' },
        { text: 'A', correct: true, explanation: 'A 在冒号后面，是基类（父类）' },
        { text: 'public', correct: false, explanation: 'public 是继承方式' },
        { text: 'class', correct: false, explanation: 'class 是关键字' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'protected 访问权限允许谁访问？',
      options: [
        { text: '任何代码', correct: false, explanation: '那是 public' },
        { text: '本类和派生类', correct: true, explanation: 'protected 只对本类和派生类可见' },
        { text: '只有本类', correct: false, explanation: '那是 private' },
        { text: '全局函数', correct: false, explanation: '全局函数不能直接访问 protected 成员' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '创建派生类对象时，构造函数的调用顺序是？',
      options: [
        { text: '先派生类构造，再基类构造', correct: false, explanation: '必须先构造基类部分' },
        { text: '先基类构造，再派生类构造', correct: true, explanation: '先初始化继承来的部分，再初始化自己的部分' },
        { text: '同时调用', correct: false, explanation: 'C++ 保证严格顺序' },
        { text: '只调派生类构造', correct: false, explanation: '基类构造也一定会被调用' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '虚函数用什么关键字声明？',
      options: [
        { text: 'override', correct: false, explanation: 'override 用于派生类，确保覆盖' },
        { text: 'virtual', correct: true, explanation: 'virtual 告诉编译器这个函数需要动态绑定' },
        { text: 'abstract', correct: false, explanation: 'C++ 中没有 abstract 关键字' },
        { text: 'dynamic', correct: false, explanation: 'C++ 中没有 dynamic 用于函数声明' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'override 关键字的作用是什么？',
      options: [
        { text: '声明虚函数', correct: false, explanation: '声明虚函数用 virtual，不是 override' },
        { text: '确保派生类函数真的覆盖了基类虚函数', correct: true, explanation: 'override 让编译器检查签名是否匹配' },
        { text: '禁止函数被覆盖', correct: false, explanation: '禁止覆盖用 final' },
        { text: '加快程序速度', correct: false, explanation: 'override 不影响性能' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '有虚函数的类，析构函数应该怎么做？',
      options: [
        { text: '什么都不用做', correct: false, explanation: '必须加 virtual，否则多态删除会泄漏' },
        { text: '加 virtual 关键字', correct: true, explanation: '虚析构确保通过基类指针删除时正确调用派生类析构' },
        { text: '设为 private', correct: false, explanation: '析构设为 private 不允许外部删除' },
        { text: '用 override 标记', correct: false, explanation: '派生类析构 override 基类虚析构' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '纯虚函数的语法是什么？',
      options: [
        { text: 'virtual void func() { }', correct: false, explanation: '这是普通虚函数，有实现' },
        { text: 'virtual void func() = 0;', correct: true, explanation: '= 0 表示纯虚函数，没有实现' },
        { text: 'void func() = 0;', correct: false, explanation: '纯虚函数必须有 virtual 关键字' },
        { text: 'abstract void func();', correct: false, explanation: 'C++ 用 =0，不是 abstract' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '阶段 8 核心概念速览：',
      cards: [
        { glyph: '👨‍👦', term: '继承', meaning: '派生类复用基类成员，消除重复代码', example: 'class B : public A' },
        { glyph: '🎭', term: '多态', meaning: '同一接口不同实现，基类指针调子类方法', example: 'virtual void speak()' },
        { glyph: '📋', term: '抽象类', meaning: '有纯虚函数的类，不能实例化', example: 'virtual void f() = 0' },
        { glyph: '🔌', term: '接口', meaning: '纯虚函数集合，定义契约', example: 'class IPrintable' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '对象切割发生在什么情况？',
      options: [
        { text: '用指针传递派生类对象', correct: false, explanation: '指针不会切割' },
        { text: '用基类值（而非引用/指针）接收派生类对象', correct: true, explanation: '值传递/赋值会切掉派生类部分' },
        { text: '用引用传递派生类对象', correct: false, explanation: '引用不会切割' },
        { text: '用派生类指针指向基类', correct: false, explanation: '这种操作通常不安全，但不是切割' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '菱形继承的主要问题是什么？',
      options: [
        { text: '代码太复杂', correct: false, explanation: '这不是主要的技术问题' },
        { text: '编译速度慢', correct: false, explanation: '菱形继承不影响编译速度' },
        { text: '二义性和数据冗余', correct: true, explanation: '两条继承路径导致成员不明确和数据重复' },
        { text: '运行速度慢', correct: false, explanation: '菱形继承不直接影响运行速度' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '运行综合示例，观察继承与多态的综合运用：',
      code: `#include <iostream>
using namespace std;

class Character {
public:
  string name;
  Character(string n) : name(n) { }
  virtual void action() = 0;
  virtual ~Character() { }
};

class Hero : public Character {
public:
  Hero(string n) : Character(n) { }
  void action() override {
    cout << name << " 使用技能！";
  }
};

class Enemy : public Character {
public:
  Enemy(string n) : Character(n) { }
  void action() override {
    cout << name << " 发动攻击！";
  }
};

int main() {
  Character* chars[2];
  chars[0] = new Hero("Link");
  chars[1] = new Enemy("Ganon");
  for (int i = 0; i < 2; i++) {
    chars[i]->action();
    cout << " ";
  }
}`,
      expectedOutput: 'Link 使用技能！ Ganon 发动攻击！',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '### 关键易错点总结\n\n1. 继承方式默认是 private（class）\n2. 构造顺序：基类→派生类；析构相反\n3. 有虚函数→必须有虚析构\n4. 多态必须通过指针/引用调用\n5. 值传递会切割，用引用或指针',
    },
    {
      type: 'exposition',
      text: '阶段 8 到此结束！\n你学会了：\n- **继承**：消除重复代码，提取公共基类\n- **多态**：同一操作不同表现，virtual 开关\n- **抽象类与接口**：设计与规范，契约编程\n- **陷阱预防**：虚析构、对象切割、菱形继承',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 最终提醒\n\n继承和多态是 C++ OOP 的核心。\n掌握了这些，你就可以写出具有良好架构的 C++ 程序。\n但在实际项目中，**组合优先于继承**——能用组合就别用继承。',
    },
    {
      type: 'exposition',
      text: '### 阶段 8 知识图谱\n\n继承语法 → protected 权限 → 三种继承方式 → 构造链\n→ 多态动机 → virtual 函数 → override 检查\n→ 多态使用 → 虚析构 → 抽象类 → 接口设计\n→ 对象切割 → 菱形继承',
    },
    {
      type: 'multiple-choice',
      question: '下面哪种方式能避免对象切割？',
      options: [
        { text: '用基类值传递参数', correct: false, explanation: '值传递正是切割的原因' },
        { text: '用基类引用传递参数', correct: true, explanation: '引用和指针都能避免切割' },
        { text: '用拷贝构造', correct: false, explanation: '拷贝构造也是值传递，同样切割' },
        { text: '用赋值运算符', correct: false, explanation: '赋值也会切割' },
      ],
    },
    {
      type: 'exposition',
      text: '下一阶段我们将进入**模板与泛型编程**的世界，\n学习如何写出更通用、可复用的代码。',
    },
  ],
}

export default lesson
