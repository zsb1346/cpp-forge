import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'factory-pattern',
    chapter: 20,
    title: '工厂模式',
    subtitle: '按需创建',
    description: '将对象创建逻辑封装到工厂类中，调用者不直接 new 对象。',
    objectives: ['能实现简单工厂模式', '理解工厂模式解耦的好处'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '如果你在代码里到处写 `new`，有一天要换对象类型……你得把所有 `new` 都改一遍。\n**工厂模式（Factory）**把「创建对象」的逻辑集中起来。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 没有工厂的代码\n\n到处 `new`，耦合严重：',
      code: 'int main() {\n  Car* c1 = new Car();\n  Car* c2 = new Car();\n  // 如果要换 Motorcycle... 全部要改\n}',
    },
    {
      type: 'exposition',
      text: '### 简单工厂\n\n一个工厂类，根据参数返回不同类型的对象：',
      code: 'class VehicleFactory {\npublic:\n  static Vehicle* create(string type) {\n    if (type == "car") return new Car();\n    if (type == "bike") return new Bike();\n    return nullptr;\n  }\n};',
    },
    {
      type: 'exposition',
      text: '### 使用工厂的好处\n\n- 创建逻辑集中：改创建方式只改一个地方\n- 调用者不关心具体类型：只需要知道接口\n- 新增类型方便：加一个 `if` 分支即可',
    },
    {
      type: 'concept-cards',
      instruction: '工厂模式的核心概念：',
      cards: [
        { glyph: '🏭', term: '工厂类', meaning: '负责创建对象的类', example: 'class Factory' },
        { glyph: '📋', term: '产品接口', meaning: '所有产品共有的父类', example: 'class Vehicle' },
        { glyph: '🔌', term: '解耦', meaning: '调用者不依赖具体类', example: '依赖接口而非实现' },
        { glyph: '➕', term: '扩展性', meaning: '加新产品不改调用代码', example: '开闭原则' },
      ],
    },
    {
      type: 'type-it',
      instruction: '定义一个产品接口和具体产品：',
      code: 'class Shape {\npublic:\n  virtual void draw() = 0;\n  virtual ~Shape() = default;\n};\n\nclass Circle : public Shape {\npublic:\n  void draw() { cout << "圆形"; }\n};\n\nclass Square : public Shape {\npublic:\n  void draw() { cout << "方形"; }\n};',
      hints: [
        'Shape 是抽象基类，包含纯虚函数',
        'Circle 和 Square 继承 Shape',
        '虚析构保证正确释放派生类对象',
      ],
    },
    {
      type: 'exposition',
      text: '### 工厂方法模式\n\n简单工厂的升级版：定义一个创建对象的接口，让子类决定实例化哪个类。\n每个产品对应一个工厂子类。',
      code: 'class ShapeFactory {\npublic:\n  virtual Shape* create() = 0;\n};\n\nclass CircleFactory : public ShapeFactory {\npublic:\n  Shape* create() { return new Circle(); }\n};',
    },
    {
      type: 'exposition',
      text: '### 简单工厂 vs 工厂方法\n\n| 特性 | 简单工厂 | 工厂方法 |\n|------|---------|---------|\n| 复杂度 | 低 | 中 |\n| 扩展性 | 改工厂类 | 加新子类 |\n| 场景 | 产品少且稳定 | 产品多且变化 |',
    },
    {
      type: 'type-it',
      instruction: '实现 ShapeFactory 工厂：',
      code: 'class ShapeFactory {\npublic:\n  static Shape* create(string type) {\n    if (type == "circle") return new Circle();\n    if (type == "square") return new Square();\n    return nullptr;\n  }\n};',
      hints: [
        '返回类型用 Shape* 基类指针',
        '根据字符串参数判断创建哪个子类',
        '返回 nullptr 处理未知类型',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p08-12：为什么基类指针可以指向子类对象？',
      options: [
        { text: '因为子类内存比基类小', correct: false, explanation: '子类通常比基类大' },
        { text: '因为子类 is-a 基类', correct: true, explanation: '继承关系下，子类对象可以当作基类对象使用' },
        { text: '因为 C++ 自动类型转换', correct: false, explanation: '不是自动转换，是继承关系' },
        { text: '因为基类指针可以指向任何对象', correct: false, explanation: '基类指针只能指向子类对象（有继承关系）' },
      ],
    },
    {
      type: 'type-it',
      instruction: '使用工厂创建对象：',
      code: 'int main() {\n  Shape* s = ShapeFactory::create("circle");\n  s->draw();\n  delete s;\n  return 0;\n}',
      hints: [
        '通过工厂方法创建，不直接 new',
        '用基类指针接收返回值',
        '记得 delete 释放内存',
      ],
    },
    {
      type: 'multiple-choice',
      question: '工厂模式主要的优势是什么？',
      options: [
        { text: '让代码运行更快', correct: false, explanation: '工厂模式不优化性能' },
        { text: '解耦调用者和具体类', correct: true, explanation: '调用者只依赖工厂和接口，不依赖具体类' },
        { text: '减少代码行数', correct: false, explanation: '工厂模式通常会增加代码行数' },
        { text: '让对象创建更安全', correct: false, explanation: '工厂不直接处理内存安全' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '补全 ShapeFactory 并运行：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Shape {\npublic:\n  virtual void draw() = 0;\n  virtual ~Shape() = default;\n};\n\nclass Circle : public Shape {\npublic:\n  void draw() { cout << "Circle"; }\n};\n\nclass Square : public Shape {\npublic:\n  void draw() { cout << "Square"; }\n};\n\nclass ShapeFactory {\npublic:\n  static Shape* create(string type) {\n    // 在这里补全\n  }\n};\n\nint main() {\n  Shape* s = ShapeFactory::create("circle");\n  s->draw();\n  delete s;\n  return 0;\n}',
      expectedOutput: 'Circle',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '### 工厂 + 单例\n\n工厂本身通常也做成单例——只需要一个工厂实例。\n两者经常配合使用。',
      code: 'class ShapeFactory {\npublic:\n  static ShapeFactory& getInstance() {\n    static ShapeFactory instance;\n    return instance;\n  }\n  Shape* create(string type) { /* ... */ }\nprivate:\n  ShapeFactory() = default;\n};',
    },
    {
      type: 'multiple-choice',
      question: '工厂方法模式和简单工厂模式的区别是什么？',
      options: [
        { text: '没有区别', correct: false, explanation: '两者结构和目的不同' },
        { text: '简单工厂用 if-else，工厂方法用继承', correct: true, explanation: '工厂方法将创建逻辑放到子类中' },
        { text: '工厂方法不能创建对象', correct: false, explanation: '工厂方法也能创建对象' },
        { text: '简单工厂更复杂', correct: false, explanation: '简单工厂更简单直接' },
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- 工厂模式封装了对象创建逻辑\n- 简单工厂：一个函数根据参数创建不同对象\n- 工厂方法：用继承把创建逻辑分散到子类\n- 调用者依赖接口，不依赖具体类',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '工厂 + 单例组合使用：',
      code: 'class LoggerFactory {\npublic:\n  static LoggerFactory& getInstance() {\n    static LoggerFactory instance;\n    return instance;\n  }\n  Logger* create(string type) {\n    if (type == "file") return new FileLogger();\n    return new ConsoleLogger();\n  }\nprivate:\n  LoggerFactory() = default;\n};',
      hints: [
        'getInstance 实现单例模式',
        'create 方法根据参数返回不同 Logger',
        '构造函数声明为 private',
      ],
    },
    {
      type: 'exposition',
      text: '下一课：观察者模式——当一个对象变化时，怎么通知其他对象？',
    },
  ],
}

export default lesson
