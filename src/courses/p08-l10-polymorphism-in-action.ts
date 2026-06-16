import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'polymorphism-in-action',
    chapter: 9,
    title: '多态如何工作',
    subtitle: '父类指针调子类方法',
    description: '用父类指针或引用指向子类对象，调用虚函数时自动执行子类版本。',
    objectives: ['能用父类指针实现多态', '能解释动态绑定的过程'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '多态的核心操作：**用父类指针指向子类对象，调用虚函数。**',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '最基本的用法：',
      code: 'Character* c = new Hero();\nc->speak();  // 调的是 Hero::speak()',
    },
    {
      type: 'exposition',
      text: '为什么这很重要？\n因为你可以写一个函数，接受**基类指针/引用**，然后传入**任何派生类对象**。',
      code: 'void gang(Character& c) {\n  c.speak();  // 不管传入 Hero 还是 Enemy，都能正确调用\n  c.move();\n}\n\nHero h;\nEnemy e;\ngang(h);  // Hero 版 speak\ngang(e);  // Enemy 版 speak',
    },
    {
      type: 'code-runner',
      instruction: '运行此代码观察多态效果：',
      code: `#include <iostream>
using namespace std;

class Character {
public:
  virtual void speak() {
    cout << "......";
  }
};

class Hero : public Character {
public:
  void speak() override {
    cout << "我来拯救世界！";
  }
};

class Enemy : public Character {
public:
  void speak() override {
    cout << "受死吧！";
  }
};

int main() {
  Character* c1 = new Hero();
  Character* c2 = new Enemy();
  c1->speak();
  cout << " / ";
  c2->speak();
}`,
      expectedOutput: '我来拯救世界！ / 受死吧！',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '### 多态的两种调用方式\n\n1. **指针**：`Character* p = new Hero(); p->speak();`\n2. **引用**：`void func(Character& c) { c.speak(); }`\n\n两种方式都能触发多态。',
    },
    {
      type: 'multiple-choice',
      question: '回顾：override 关键字的作用是什么？',
      options: [
        { text: '让程序跑得更快', correct: false, explanation: 'override 不影响性能' },
        { text: '确保派生类正确覆盖了基类虚函数', correct: true, explanation: 'override 让编译器检查签名是否匹配' },
        { text: '声明函数为虚函数', correct: false, explanation: 'virtual 才是声明虚函数的' },
        { text: '禁止函数被覆盖', correct: false, explanation: '禁止覆盖用 final 关键字' },
      ],
    },
    {
      type: 'exposition',
      text: '### 多态的条件\n\n1. 基类函数是 **virtual**\n2. 派生类 **覆盖**（override）了该函数\n3. 通过**指针或引用**调用\n4. 派生类必须 public 继承基类\n\n这四个条件**缺一不可**。',
    },
    {
      type: 'exposition',
      text: '### 数组中的多态\n\n如果你有一个`Character*`数组，可以存放不同派生类对象：',
      code: 'Character* party[3];\nparty[0] = new Hero();\nparty[1] = new Enemy();\nparty[2] = new NPC();\n\nfor (int i = 0; i < 3; i++) {\n  party[i]->speak();  // 各自说各自的话\n}',
    },
    {
      type: 'code-runner',
      instruction: '用数组实现多态批量调用：',
      code: `#include <iostream>
using namespace std;

class Animal {
public:
  virtual void sound() {
    cout << "......";
  }
};

class Dog : public Animal {
public:
  void sound() override { cout << "Woof!"; }
};

class Cat : public Animal {
public:
  void sound() override { cout << "Meow!"; }
};

int main() {
  Animal* animals[2];
  animals[0] = new Dog();
  animals[1] = new Cat();
  for (int i = 0; i < 2; i++) {
    animals[i]->sound();
    cout << " ";
  }
}`,
      expectedOutput: 'Woof! Meow!',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '### 内存中的多态\n\n每个有虚函数的对象都有一个隐藏的`vptr`指针：\n- 对象内存：`[vptr | 成员变量]`\n- vptr 指向类的虚函数表（vtable）\n- vtable 存储了所有虚函数的地址\n- 调用时：`对象.vptr → vtable → 函数地址 → 执行`',
    },
    {
      type: 'type-it',
      instruction: '写一个完整的多态例子，包含基类指针数组：',
      code: 'class Shape {\npublic:\n  virtual void draw() { cout << "形状"; }\n};\n\nclass Circle : public Shape {\npublic:\n  void draw() override { cout << "圆形"; }\n};\n\nclass Square : public Shape {\npublic:\n  void draw() override { cout << "方形"; }\n};',
      hints: [
        'Shape 是基类，draw 是虚函数',
        'Circle 和 Square 覆盖 draw',
        '通过 Shape* 调用 draw 触发多态',
      ],
    },
    {
      type: 'exposition',
      text: '### 虚函数调用的完整流程\n\n`c->speak();` 的执行步骤：\n1. 从`c`指向的对象中取出`vptr`\n2. 通过`vptr`找到类的 vtable\n3. 在 vtable 中找到`speak`的地址\n4. 调用该地址指向的函数',
    },
    {
      type: 'multiple-choice',
      question: '多态必须通过什么方式调用？',
      options: [
        { text: '直接对象调用', correct: false, explanation: '直接对象调用在编译时就绑定了' },
        { text: '指针或引用', correct: true, explanation: '只有指针和引用能触发运行时多态' },
        { text: '静态函数', correct: false, explanation: '静态函数不能是虚函数' },
        { text: '值传递', correct: false, explanation: '值传递会发生对象切割' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '下面哪个不是多态的必要条件？',
      options: [
        { text: '基类函数是 virtual', correct: false, explanation: 'virtual 是多态的前提条件' },
        { text: '派生类覆盖了虚函数', correct: false, explanation: '不覆盖就没有多态的效果' },
        { text: '使用指针或引用调用', correct: false, explanation: '这是触发多态的方式' },
        { text: '基类有至少两个派生类', correct: false, explanation: '一个派生类也能有多态，不是必要条件' },
      ],
    },
    {
      type: 'exposition',
      text: '### 多态 vs 非多态对比\n\n| 场景 | 非多态 | 多态 |\n|------|--------|------|\n| 调用方式 | if-else 判断类型 | 直接调用虚函数 |\n| 新增类型 | 改所有判断点 | 加新类即可 |\n| 代码复杂度 | 随类型数线性增长 | 保持稳定 |',
    },
    {
      type: 'exposition',
      text: '总结：\n- 基类指针/引用 + virtual 函数 = 多态\n- 运行时根据实际对象类型决定调哪个函数\n- 派生类覆盖函数时加 override 确保正确\n- vtable 是底层的实现机制',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课将学习一个非常重要的安全知识点——**虚析构函数**。\n没有它，多态删除对象就会内存泄漏。',
    },
    {
      type: 'exposition',
      text: '### 一句话记住\n\n**父类指针指向子类对象 → 调用虚函数 → 执行子类版本。**',
    },
  ],
}

export default lesson
