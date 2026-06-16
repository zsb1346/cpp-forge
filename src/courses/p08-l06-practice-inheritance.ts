import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-inheritance',
    chapter: 9,
    title: '继承基础练习',
    subtitle: '巩固 01-05',
    description: '综合练习继承语法、protected 权限、构造链的运用。',
    objectives: ['能独立写出完整的继承代码', '能正确处理构造链的传参'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前面五课学了继承的基础知识。\n这节课来做练习，巩固所学。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 练习 1：继承语法\n\n定义一个基类`Item`和派生类`Weapon`。',
    },
    {
      type: 'type-it',
      instruction: '定义一个基类 Item 和派生类 Weapon：',
      code: 'class Item {\npublic:\n  string name;\n  int weight;\n};\n\nclass Weapon : public Item {\npublic:\n  int damage;\n};',
      hints: [
        'Item 是基类，有 name 和 weight',
        'Weapon 用 public 继承 Item',
        'Weapon 添加自己的 damage 成员',
      ],
    },
    {
      type: 'type-it',
      instruction: '再定义一个 Armor 派生类，添加 defense 成员：',
      code: 'class Armor : public Item {\npublic:\n  int defense;\n};',
      hints: [
        'Armor 也继承 Item',
        'Item 的 name 和 weight 被共用',
        'Armor 添加自己的 defense',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾：protected 继承时，基类的 public 成员变成什么？',
      options: [
        { text: 'public', correct: false, explanation: 'protected 继承会降级权限' },
        { text: 'protected', correct: true, explanation: '基类的 public 在 protected 继承下变成 protected' },
        { text: 'private', correct: false, explanation: '只有 private 继承才降到 private' },
        { text: '不可访问', correct: false, explanation: '不会不可访问，只是降级了' },
      ],
    },
    {
      type: 'exposition',
      text: '### 练习 2：构造链传参\n\n现在来练习带参数的构造函数继承。',
    },
    {
      type: 'type-it',
      instruction: '带构造函数的继承，通过初始化列表传参：',
      code: 'class Character {\npublic:\n  string name;\n  Character(string n) : name(n) { }\n};\n\nclass Hero : public Character {\npublic:\n  int hp;\n  Hero(string n, int h) : Character(n), hp(h) { }\n};',
      hints: [
        'Character 构造接受 name 参数',
        'Hero 在初始化列表调用 Character(n)',
        'hp 也在初始化列表中初始化',
      ],
    },
    {
      type: 'code-runner',
      instruction: '补全代码，创建 Hero 对象并调用 show 函数：',
      code: `#include <iostream>
using namespace std;

class Character {
public:
  string name;
  Character(string n) : name(n) { }
};

class Hero : public Character {
public:
  int hp;
  Hero(string n, int h) : Character(n), hp(h) { }
  void show() {
    cout << name << " HP:" << hp;
  }
};

int main() {
  // 在这里创建 Hero 对象并调用 show
  Hero h("Link", 100);
  h.show();
}`,
      expectedOutput: 'Link HP:100',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '注意观察：`Hero`对象包含 `Character`部分 + `Hero`部分。\n内存中像这样排列：`[Character成员][Hero成员]`。',
    },
    {
      type: 'exposition',
      text: '### 练习 3：构造与析构顺序\n\n运行代码观察构造和析构的调用顺序。',
    },
    {
      type: 'code-runner',
      instruction: '运行代码观察构造和析构顺序：',
      code: `#include <iostream>
using namespace std;

class Base {
public:
  Base() { cout << "1"; }
  ~Base() { cout << "4"; }
};

class Derived : public Base {
public:
  Derived() { cout << "2"; }
  ~Derived() { cout << "3"; }
};

int main() {
  Derived d;
  cout << " ";
}`,
      expectedOutput: '1 234',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '上面代码的输出"1 234"，说明了什么？',
      options: [
        { text: '先基类构造，再做其他事', correct: false, explanation: '还要注意析构顺序相反' },
        { text: '构造：基类→派生类；析构：派生类→基类', correct: true, explanation: '1(基类构造) 2(派生类构造) 3(派生类析构) 4(基类析构)' },
        { text: '构造和析构都是先基类', correct: false, explanation: '析构顺序是相反的' },
        { text: '数字是随机的', correct: false, explanation: 'C++ 保证构造和析构的严格顺序' },
      ],
    },
    {
      type: 'exposition',
      text: '### 练习 4：protected 成员使用',
    },
    {
      type: 'type-it',
      instruction: '用 protected 成员写一个完整的继承：',
      code: 'class Animal {\nprotected:\n  int age;\npublic:\n  Animal(int a) : age(a) { }\n  int getAge() { return age; }\n};\n\nclass Dog : public Animal {\npublic:\n  string breed;\n  Dog(int a, string b) : Animal(a), breed(b) { }\n  void bark() { cout << "Woof!"; }\n};',
      hints: [
        'age 是 protected，派生类可通过 getAge 访问',
        'Dog 构造传给 Animal 初始化 age',
        'breed 是 Dog 自己添加的成员',
      ],
    },
    {
      type: 'exposition',
      text: '### 常见错误提醒\n\n1. 忘记在派生类构造中调用基类构造（如果基类没有默认构造）\n2. 继承方式写错（默认是 private）\n3. protected 和 private 混淆\n4. 分号遗漏导致编译错误',
    },
    {
      type: 'multiple-choice',
      question: '如果基类没有默认构造函数，派生类必须怎么做？',
      options: [
        { text: '在基类中加一个默认构造', correct: false, explanation: '你可以改基类，但这不是派生类的义务' },
        { text: '在初始化列表中显式调用基类构造', correct: true, explanation: '派生类必须通过初始化列表调用基类的带参构造' },
        { text: '不用管，编译器会自动处理', correct: false, explanation: '没有默认构造时编译会报错' },
        { text: '把派生类的构造也删掉', correct: false, explanation: '这不是解决方案' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '`class Derived : Base { };` 默认的继承方式是什么？',
      options: [
        { text: 'public', correct: false, explanation: 'class 默认是 private 继承' },
        { text: 'protected', correct: false, explanation: '默认不是 protected，是 private' },
        { text: 'private', correct: true, explanation: '不写继承方式时，class 默认 private' },
        { text: '不继承', correct: false, explanation: '写冒号就表示继承' },
      ],
    },
    {
      type: 'exposition',
      text: '练习总结：\n- 继承语法：`class B : public A {};`\n- 访问权限：protected 给子类用\n- 构造链：先基类后派生类\n- 初始化列表：`Derived(args) : Base(args) {}`',
      textAnimation: 'typewriter',
    },
  ],
}

export default lesson
