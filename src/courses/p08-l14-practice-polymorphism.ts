import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-polymorphism',
    chapter: 9,
    title: '多态综合练习',
    subtitle: '巩固 07-13',
    description: '综合练习虚函数、override、抽象类、接口设计的完整运用。',
    objectives: ['能独立完成多态代码的编写', '能设计简单的接口并实现'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前面七课学了多态的方方面面。\n这节课来综合练习，把知识串起来。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 练习 1：定义接口\n\n先定义一个武器接口`IWeapon`。',
    },
    {
      type: 'type-it',
      instruction: '定义一个抽象类 IWeapon，包含纯虚函数 attack：',
      code: 'class IWeapon {\npublic:\n  virtual void attack() = 0;\n  virtual ~IWeapon() { }\n};',
      hints: [
        'IWeapon 是接口，attack 是纯虚函数',
        '= 0 表示纯虚函数',
        '接口类必须有虚析构',
      ],
    },
    {
      type: 'type-it',
      instruction: '实现 Sword 和 Bow 两个武器类：',
      code: 'class Sword : public IWeapon {\npublic:\n  void attack() override { cout << "挥剑斩击"; }\n};\n\nclass Bow : public IWeapon {\npublic:\n  void attack() override { cout << "射击弓箭"; }\n};',
      hints: [
        '两个类都继承 IWeapon',
        '都实现 attack 方法',
        '加 override 确保正确覆盖',
      ],
    },
    {
      type: 'exposition',
      text: '### 练习 2：多态调用\n\n用基类指针数组实现多态批量攻击。',
    },
    {
      type: 'code-runner',
      instruction: '用 IWeapon 指针数组实现多态攻击：',
      code: `#include <iostream>
using namespace std;

class IWeapon {
public:
  virtual void attack() = 0;
  virtual ~IWeapon() { }
};

class Sword : public IWeapon {
public:
  void attack() override { cout << "斩击"; }
};

class Bow : public IWeapon {
public:
  void attack() override { cout << "射击"; }
};

int main() {
  IWeapon* weapons[2];
  weapons[0] = new Sword();
  weapons[1] = new Bow();
  for (int i = 0; i < 2; i++) {
    weapons[i]->attack();
    cout << " ";
  }
}`,
      expectedOutput: '斩击 射击',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '### 多态 + 接口的设计模式\n\n`IWeapon*` 可以指向任何实现该接口的类。\n玩家可以随时**切换武器**，代码不用改！',
    },
    {
      type: 'exposition',
      text: '### 练习 3：英雄切换武器\n\n设计一个`Hero`类，持有`IWeapon*`成员，可以动态切换武器。',
    },
    {
      type: 'code-runner',
      instruction: '实现英雄切换武器的例子：',
      code: `#include <iostream>
using namespace std;

class IWeapon {
public:
  virtual void attack() = 0;
  virtual ~IWeapon() { }
};

class Sword : public IWeapon {
public:
  void attack() override { cout << "剑"; }
};

class Bow : public IWeapon {
public:
  void attack() override { cout << "弓"; }
};

class Hero {
public:
  IWeapon* weapon;
  Hero(IWeapon* w) : weapon(w) { }
  void changeWeapon(IWeapon* w) { weapon = w; }
  void attack() { weapon->attack(); }
};

int main() {
  Sword sword;
  Bow bow;
  Hero h(&sword);
  h.attack();
  h.changeWeapon(&bow);
  cout << "换";
  h.attack();
}`,
      expectedOutput: '剑换弓',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'multiple-choice',
      question: '回顾：包含纯虚函数的类叫什么？',
      options: [
        { text: '具体类', correct: false, explanation: '具体类实现了所有纯虚函数' },
        { text: '抽象类', correct: true, explanation: '有纯虚函数的类就是抽象类' },
        { text: '虚类', correct: false, explanation: 'C++ 没有"虚类"这个术语' },
        { text: '模板类', correct: false, explanation: '模板类是 template 相关，和纯虚函数无关' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '接口设计的好处是什么？',
      options: [
        { text: '让代码更短', correct: false, explanation: '接口会增加抽象层次，不一定更短' },
        { text: '解耦合，不依赖具体实现', correct: true, explanation: '调用方只依赖接口，替换实现不用改调用方代码' },
        { text: '自动生成文档', correct: false, explanation: '接口不自动生成文档' },
        { text: '提高运行速度', correct: false, explanation: '虚函数有动态绑定的轻微开销' },
      ],
    },
    {
      type: 'exposition',
      text: '### 练习 4：定义自己的接口\n\n尝试定义一个`IUpdatable`接口，包含 update 和 render 方法。',
    },
    {
      type: 'type-it',
      instruction: '定义一个完整的接口 IUpdatable：',
      code: 'class IUpdatable {\npublic:\n  virtual void update(float dt) = 0;\n  virtual void render() = 0;\n  virtual ~IUpdatable() { }\n};',
      hints: [
        'IUpdatable 接口有两个纯虚函数',
        'update 接收 float 参数',
        'render 没有参数',
      ],
    },
    {
      type: 'type-it',
      instruction: '实现 Player 类继承 IUpdatable：',
      code: 'class Player : public IUpdatable {\npublic:\n  void update(float dt) override {\n    cout << "更新位置";\n  }\n  void render() override {\n    cout << "渲染角色";\n  }\n};',
      hints: [
        'Player 必须实现 update 和 render',
        '两个方法都要加 override',
        'dt 是 delta time，表示时间步长',
      ],
    },
    {
      type: 'exposition',
      text: '### 什么时候用多态？\n\n当你发现代码中有"根据类型选择行为"的 if-else 或 switch 时，\n就应该考虑用多态重构。多态是消除条件分支的利器。',
    },
    {
      type: 'exposition',
      text: '### 综合练习要点回顾\n\n1. **virtual**：基类函数加 virtual 启动多态\n2. **override**：派生类加 override 确保正确\n3. **纯虚函数**：`= 0` 让类抽象化\n4. **虚析构**：有虚函数就必须有虚析构\n5. **接口**：用纯虚函数定义契约',
    },
    {
      type: 'exposition',
      text: '掌握了多态和接口，你就掌握了 C++ OOP 的核心设计能力。\n这些是 C++ 面向对象编程的精华。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 练习总结\n\n今天我们练习了：\n1. 定义接口（纯虚函数集合）\n2. 实现接口（override）\n3. 多态调用（基类指针数组）\n4. 动态切换（英雄换武器）\n5. 自定义接口（IUpdatable）',
    },
  ],
}

export default lesson
