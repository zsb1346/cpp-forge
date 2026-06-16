import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'observer-pattern',
    chapter: 20,
    title: '观察者模式',
    subtitle: '通知机制',
    description: '一个对象（主题）变化时，自动通知所有依赖它的对象（观察者）。',
    objectives: ['能实现观察者模式', '理解发布-订阅机制'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '当「一个对象变了，其他几个对象也要跟着变」——比如用户改了配置，所有 UI 都要刷新。\n**观察者模式（Observer）**就是解决这个问题的。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 两个角色\n\n- **Subject（主题）**：被观察的对象，维护观察者列表\n- **Observer（观察者）**：接收通知的对象',
      code: '// 观察者接口\nclass Observer {\npublic:\n  virtual void update(string msg) = 0;\n};\n\n// 主题\nclass Subject {\n  vector<Observer*> observers;\npublic:\n  void attach(Observer* o) { observers.push_back(o); }\n  void notify(string msg) {\n    for (auto o : observers) o->update(msg);\n  }\n};',
    },
    {
      type: 'exposition',
      text: '### 工作流程\n\n1. 观察者调用 `attach` 注册到主题\n2. 主题状态变化时调用 `notify`\n3. 主题遍历所有观察者，调用它们的 `update`\n4. 每个观察者根据通知做自己的事',
    },
    {
      type: 'exposition',
      text: '### 现实类比\n\n你订阅了一个 YouTube 频道（attach）。\n当 Up 主发新视频（notify），所有订阅者都会收到通知（update）。\n你不需要反复去检查有没有新视频——频道会主动告诉你。',
    },
    {
      type: 'concept-cards',
      instruction: '观察者模式的核心角色：',
      cards: [
        { glyph: '📡', term: 'Subject（主题）', meaning: '被观察者，维护观察者列表并发送通知', example: 'attach/notify' },
        { glyph: '👀', term: 'Observer（观察者）', meaning: '接收通知的对象', example: 'update()' },
        { glyph: '🔗', term: 'attach/detach', meaning: '注册/注销观察者', example: '动态管理订阅' },
        { glyph: '📢', term: 'notify', meaning: '遍历通知所有观察者', example: 'for (auto o : obs)' },
      ],
    },
    {
      type: 'type-it',
      instruction: '实现观察者接口和主题类：',
      code: 'class Observer {\npublic:\n  virtual void update(int value) = 0;\n  virtual ~Observer() = default;\n};\n\nclass Subject {\n  vector<Observer*> obs;\npublic:\n  void attach(Observer* o) { obs.push_back(o); }\n  void notify(int val) {\n    for (auto o : obs) o->update(val);\n  }\n};',
      hints: [
        'Observer 是抽象类，含纯虚函数 update',
        'Subject 用 vector 保存观察者列表',
        'notify 遍历所有观察者调用 update',
      ],
    },
    {
      type: 'exposition',
      text: '### 具体观察者示例\n\n显示面板和日志系统都注册为观察者，数据变化时各自更新。',
      code: 'class DisplayPanel : public Observer {\npublic:\n  void update(int val) {\n    cout << "面板显示: " << val << endl;\n  }\n};\n\nclass LogSystem : public Observer {\npublic:\n  void update(int val) {\n    cout << "日志记录: " << val << endl;\n  }\n};',
    },
    {
      type: 'type-it',
      instruction: '实现 DisplayPanel 和 LogSystem 观察者：',
      code: 'class DisplayPanel : public Observer {\npublic:\n  void update(int value) {\n    cout << "显示: " << value << endl;\n  }\n};\n\nclass LogSystem : public Observer {\npublic:\n  void update(int value) {\n    cout << "日志: " << value << endl;\n  }\n};',
      hints: [
        '继承 Observer 并覆盖 update',
        'update 参数类型要和 Subject 通知一致',
        '每个观察者可以执行不同的操作',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 03（工厂模式）：工厂模式的主要好处是什么？',
      options: [
        { text: '让对象创建更慢', correct: false, explanation: '工厂不涉及性能优化' },
        { text: '解耦调用者和具体类', correct: true, explanation: '调用者只通过工厂和接口使用对象' },
        { text: '防止内存泄漏', correct: false, explanation: '工厂不直接处理内存管理' },
        { text: '让代码更难理解', correct: false, explanation: '工厂模式旨在让代码更清晰' },
      ],
    },
    {
      type: 'exposition',
      text: '### 在主程序中使用\n\n将观察者注册到主题，然后触发通知。',
      code: 'int main() {\n  Subject sub;\n  DisplayPanel dp;\n  LogSystem log;\n\n  sub.attach(&dp);\n  sub.attach(&log);\n  sub.notify(42);  // 两个观察者都收到通知\n}',
    },
    {
      type: 'multiple-choice',
      question: '观察者模式中，Subject 如何知道通知哪些对象？',
      options: [
        { text: 'Subject 提前知道所有观察者的类型', correct: false, explanation: 'Subject 不依赖具体观察者类型' },
        { text: 'Subject 维护一个观察者列表', correct: true, explanation: '观察者通过 attach 注册到列表' },
        { text: '观察者主动轮询 Subject', correct: false, explanation: '不是轮询，是推送通知' },
        { text: 'Subject 通知所有类', correct: false, explanation: '只通知注册过的观察者' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '补全观察者模式并运行：',
      code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Observer {\npublic:\n  virtual void update(string msg) = 0;\n  virtual ~Observer() = default;\n};\n\nclass Subject {\n  vector<Observer*> obs;\npublic:\n  void attach(Observer* o) { obs.push_back(o); }\n  void notify(string msg) {\n    for (auto o : obs) o->update(msg);\n  }\n};\n\nclass User : public Observer {\npublic:\n  void update(string msg) {\n    cout << "用户收到: " << msg << endl;\n  }\n};\n\nint main() {\n  Subject sub;\n  User u1, u2;\n  sub.attach(&u1);\n  sub.attach(&u2);\n  sub.notify("有新消息");\n  return 0;\n}',
      expectedOutput: '用户收到: 有新消息\n用户收到: 有新消息',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'type-it',
      instruction: '完整的使用流程：',
      code: 'int main() {\n  Subject sub;\n  DisplayPanel dp;\n  LogSystem log;\n  sub.attach(&dp);\n  sub.attach(&log);\n  sub.notify(100);\n  return 0;\n}',
      hints: [
        '先创建 Subject 和 Observer 对象',
        '用 attach 注册观察者',
        '调用 notify 触发通知',
      ],
    },
    {
      type: 'multiple-choice',
      question: '观察者模式适合什么场景？',
      options: [
        { text: '一个类需要创建不同类型的对象', correct: false, explanation: '那是工厂模式的场景' },
        { text: '一个对象变化，多个对象需要响应', correct: true, explanation: '观察者模式专门处理一对多的通知' },
        { text: '一个类只能有一个实例', correct: false, explanation: '那是单例模式的场景' },
        { text: '需要隐藏对象的创建逻辑', correct: false, explanation: '那是工厂模式的场景' },
      ],
    },
    {
      type: 'exposition',
      text: '### 优缺点\n\n✅ 优点：\n- 松耦合：Subject 不关心 Observer 的具体类型\n- 支持广播通信\n- 符合开闭原则\n\n❌ 缺点：\n- Observer 过多时通知有性能开销\n- 通知顺序不可控\n- 内存泄漏风险（忘了 detach）',
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- 观察者模式实现一对多的依赖关系\n- Subject 维护观察者列表，变化时遍历通知\n- 观察者实现统一的 `update` 接口\n- 广泛应用于 GUI 事件、消息系统、配置变更等场景',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一节：设计模式练习课——动手操练单例、工厂和观察者。',
    },
    {
      type: 'exposition',
      text: '记住观察者模式的核心：Subject 不 care 谁在观察，Observer 不 care 谁在通知——各自只关心自己的接口。',
    },
  ],
}

export default lesson
