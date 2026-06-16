import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'practice-patterns',
    chapter: 20,
    title: '设计模式练习',
    subtitle: '巩固 01-04',
    description: '通过动手练习巩固单例、工厂和观察者三种设计模式。',
    objectives: ['能独立实现单例模式', '能运用工厂模式创建对象', '能实现观察者通知机制'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '前四课学了三种设计模式。现在不动手说不过去——直接开敲。',
      textAnimation: 'typewriter',
    },
    {
      type: 'type-it',
      instruction: '回顾单例模式：写一个 Database 单例：',
      code: 'class Database {\npublic:\n  static Database& getInstance() {\n    static Database instance;\n    return instance;\n  }\n  void query(string sql) {\n    cout << "查询: " << sql << endl;\n  }\nprivate:\n  Database() = default;\n};',
      hints: [
        '用 static 局部变量保存唯一实例',
        '构造函数放在 private 区',
        'getInstance 返回引用',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 01（单例模式）：为什么要将构造函数设为 private？',
      options: [
        { text: '防止编译器生成默认构造', correct: false, explanation: '这只是一个副作用' },
        { text: '禁止外部代码创建新实例', correct: true, explanation: 'private 构造确保只能内部创建' },
        { text: '让析构函数也能私有', correct: false, explanation: '构造函数私有和析构无关' },
        { text: '提高编译速度', correct: false, explanation: '访问权限不影响编译速度' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '实现一个 Logger 单例，输出日志信息：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Logger {\npublic:\n  static Logger& getInstance() {\n    static Logger instance;\n    return instance;\n  }\n  void log(string msg) {\n    cout << "[LOG] " << msg << endl;\n  }\nprivate:\n  Logger() = default;\n};\n\nint main() {\n  Logger& log = Logger::getInstance();\n  log.log("系统启动");\n  log.log("用户登录");\n  return 0;\n}',
      expectedOutput: '[LOG] 系统启动\n[LOG] 用户登录',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '### 工厂模式练习\n\n下面用工厂模式创建不同类型的游戏角色。',
    },
    {
      type: 'type-it',
      instruction: '定义角色接口和具体角色：',
      code: 'class Character {\npublic:\n  virtual void attack() = 0;\n  virtual ~Character() = default;\n};\n\nclass Warrior : public Character {\npublic:\n  void attack() { cout << "战士挥剑"; }\n};\n\nclass Mage : public Character {\npublic:\n  void attack() { cout << "法师施法"; }\n};',
      hints: [
        'Character 是抽象基类',
        'Warrior 和 Mage 都继承 Character',
        '每个子类实现自己的 attack 方式',
      ],
    },
    {
      type: 'code-runner',
      instruction: '实现 CharacterFactory 并创建角色：',
      code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Character {\npublic:\n  virtual void attack() = 0;\n  virtual ~Character() = default;\n};\n\nclass Warrior : public Character {\npublic:\n  void attack() { cout << "战士挥剑" << endl; }\n};\n\nclass Mage : public Character {\npublic:\n  void attack() { cout << "法师施法" << endl; }\n};\n\nclass CharacterFactory {\npublic:\n  static Character* create(string type) {\n    if (type == "warrior") return new Warrior();\n    if (type == "mage") return new Mage();\n    return nullptr;\n  }\n};\n\nint main() {\n  Character* c = CharacterFactory::create("warrior");\n  c->attack();\n  delete c;\n  return 0;\n}',
      expectedOutput: '战士挥剑',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'multiple-choice',
      question: '回顾 03（工厂模式）：工厂返回对象时用什么类型最合适？',
      options: [
        { text: '具体子类类型', correct: false, explanation: '用具体子类类型就失去了多态意义' },
        { text: '基类指针或引用', correct: true, explanation: '通过基类指针利用多态性' },
        { text: 'void* 指针', correct: false, explanation: 'void* 会丢失类型信息' },
        { text: '模板类型', correct: false, explanation: '工厂模式通常不用模板' },
      ],
    },
    {
      type: 'exposition',
      text: '### 观察者模式练习\n\n实现一个天气站（WeatherStation），通知多个显示面板。',
    },
    {
      type: 'type-it',
      instruction: '实现观察者接口：',
      code: 'class Observer {\npublic:\n  virtual void update(float temp) = 0;\n  virtual ~Observer() = default;\n};\n\nclass WeatherStation {\n  vector<Observer*> obs;\npublic:\n  void attach(Observer* o) { obs.push_back(o); }\n  void setTemperature(float t) {\n    temp = t;\n    notify();\n  }\n  void notify() {\n    for (auto o : obs) o->update(temp);\n  }\nprivate:\n  float temp = 0;\n};',
      hints: [
        'Observer 是抽象类',
        'WeatherStation 维护观察者列表',
        'setTemperature 时自动触发通知',
      ],
    },
    {
      type: 'exposition',
      text: '### 综合练习\n\n把三种模式结合起来：\n- 用单例管理工厂\n- 用工厂创建观察者\n- 用观察者模式通知',
    },
    {
      type: 'multiple-choice',
      question: '回顾 04（观察者模式）：Subject 和 Observer 之间的关系是？',
      options: [
        { text: '一对多', correct: true, explanation: '一个 Subject 可以通知多个 Observer' },
        { text: '一对一', correct: false, explanation: '可能只有一个观察者，但设计上是一对多' },
        { text: '多对一', correct: false, explanation: '多个 Subject 通知一个 Observer 不是标准模式' },
        { text: '多对多', correct: false, explanation: '标准观察者模式是一对多' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '实现天气站 + 两个显示面板的观察者模式：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Observer {\npublic:\n  virtual void update(float temp) = 0;\n  virtual ~Observer() = default;\n};\n\nclass PhoneDisplay : public Observer {\npublic:\n  void update(float temp) {\n    cout << "手机显示: " << temp << "°C" << endl;\n  }\n};\n\nclass WindowDisplay : public Observer {\npublic:\n  void update(float temp) {\n    cout << "窗口显示: " << temp << "°C" << endl;\n  }\n};\n\nclass WeatherStation {\n  vector<Observer*> obs;\n  float temp = 0;\npublic:\n  void attach(Observer* o) { obs.push_back(o); }\n  void setTemperature(float t) {\n    temp = t;\n    for (auto o : obs) o->update(temp);\n  }\n};\n\nint main() {\n  WeatherStation ws;\n  PhoneDisplay phone;\n  WindowDisplay window;\n  ws.attach(&phone);\n  ws.attach(&window);\n  ws.setTemperature(25.5);\n  return 0;\n}',
      expectedOutput: '手机显示: 25.5°C\n窗口显示: 25.5°C',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- 单例：唯一实例 + 全局访问点\n- 工厂：封装创建逻辑 + 解耦\n- 观察者：一对多通知 + 松耦合\n\n三种模式可以自由组合使用。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '实现单例时，用什么保证唯一实例？',
      options: [
        { text: '全局变量', correct: false, explanation: '全局变量可以被修改和复制' },
        { text: 'private 构造函数 + static 方法', correct: true, explanation: 'private 构造防止外部创建，static 方法管控唯一实例' },
        { text: 'namespace', correct: false, explanation: 'namespace 不能控制实例数量' },
        { text: 'const 关键字', correct: false, explanation: 'const 只是不能修改，不影响创建' },
      ],
    },
    {
      type: 'type-it',
      instruction: '用观察者模式实现温度变化通知：',
      code: 'class Observer {\npublic:\n  virtual void update(float temp) = 0;\n  virtual ~Observer() = default;\n};\n\nclass PhoneDisplay : public Observer {\npublic:\n  void update(float temp) {\n    cout << "手机显示 " << temp << "°C";\n  }\n};',
      hints: [
        'Observer 是抽象接口',
        'PhoneDisplay 继承 Observer',
        'update 方法处理通知内容',
      ],
    },
    {
      type: 'multiple-choice',
      question: '观察者模式中，detach 方法的作用是什么？',
      options: [
        { text: '删除观察者对象', correct: false, explanation: 'detach 只是从列表移除，不负责删除对象' },
        { text: '从通知列表中移除观察者', correct: true, explanation: 'detach 取消订阅，不再接收通知' },
        { text: '暂停通知', correct: false, explanation: 'detach 不是暂停，是永久移除' },
        { text: '清除所有观察者', correct: false, explanation: '不是清除全部，只移除指定的一个' },
      ],
    },
    {
      type: 'exposition',
      text: '记住三种模式的适用场景：只有实例→单例，创建复杂→工厂，通知广播→观察者。',
    },
  ],
}

export default lesson
