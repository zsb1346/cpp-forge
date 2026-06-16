import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'singleton-pattern',
    chapter: 20,
    title: '单例模式',
    subtitle: '全局唯一',
    description: '确保一个类只有一个实例，提供全局访问点。',
    objectives: ['能实现基本单例模式', '理解 static local 的线程安全性'],
    estimatedMinutes: 10,
  },
  blocks: [
    {
      type: 'exposition',
      text: '有些对象在程序中只需要**一个**——比如日志系统、配置管理器。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '如果每次 `new` 都创建一个新对象，日志写到不同地方就乱套了。\n**单例模式（Singleton）**保证一个类只有一个实例。',
    },
    {
      type: 'exposition',
      text: '### 经典实现\n\n把构造函数设为 `private`，通过一个 `static` 方法获取唯一实例。',
      code: 'class Logger {\npublic:\n  static Logger& getInstance() {\n    static Logger instance;\n    return instance;\n  }\n  void log(string msg) { /* ... */ }\nprivate:\n  Logger() = default;\n};',
    },
    {
      type: 'exposition',
      text: '### 核心思路\n\n- 构造函数私有 → 外部不能 `new`\n- `static` 方法 → 不依赖对象就能调用\n- `static` 局部变量 → 程序启动时只初始化一次',
    },
    {
      type: 'exposition',
      text: '### C++11 之后的线程安全\n\nC++11 保证：`static` 局部变量的初始化是**线程安全**的。\n多个线程同时首次调用 `getInstance()`，只有一个会执行初始化。',
      code: 'static Logger& getInstance() {\n  static Logger instance;  // C++11: 线程安全\n  return instance;\n}',
    },
    {
      type: 'exposition',
      text: '### 经典「双重检查锁」方式\n\n在 C++11 之前，需要用互斥锁加双重检查来保证线程安全。\n现在基本不需要了——`static` 局部变量更简单。',
      code: 'class Singleton {\n  static Singleton* instance;\n  static mutex mtx;\npublic:\n  static Singleton* getInstance() {\n    lock_guard<mutex> lock(mtx);\n    if (!instance) instance = new Singleton();\n    return instance;\n  }\n};',
    },
    {
      type: 'concept-cards',
      instruction: '单例模式的关键概念：',
      cards: [
        { glyph: '🔒', term: 'private 构造', meaning: '禁止外部创建对象', example: 'private: Singleton()' },
        { glyph: '📦', term: 'static 实例', meaning: '唯一实例存在静态区', example: 'static instance' },
        { glyph: '🔑', term: 'getInstance', meaning: '全局唯一的访问入口', example: 'static getInstance()' },
        { glyph: '🛡️', term: 'static local 线程安全', meaning: 'C++11 保证初始化无竞争', example: 'static T obj;' },
      ],
    },
    {
      type: 'type-it',
      instruction: '写一个 Logger 单例类：',
      code: 'class Logger {\npublic:\n  static Logger& getInstance() {\n    static Logger instance;\n    return instance;\n  }\nprivate:\n  Logger() = default;\n};',
      hints: [
        'getInstance 返回引用，不是指针',
        'static 局部变量只初始化一次',
        '构造函数放在 private 区',
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p07-06：构造函数的作用是什么？',
      options: [
        { text: '销毁对象', correct: false, explanation: '析构函数才销毁对象' },
        { text: '初始化对象的成员', correct: true, explanation: '构造函数用于初始化新创建的对象' },
        { text: '分配内存', correct: false, explanation: '内存分配是 operator new 的事' },
        { text: '返回对象地址', correct: false, explanation: '构造函数没有返回值' },
      ],
    },
    {
      type: 'type-it',
      instruction: '实现一个 ConfigManager 单例：',
      code: 'class ConfigManager {\npublic:\n  static ConfigManager& getInstance() {\n    static ConfigManager instance;\n    return instance;\n  }\n  string get(string key) { return ""; }\nprivate:\n  ConfigManager() = default;\n};',
      hints: [
        'getInstance 内部声明 static 局部变量',
        '构造函数声明为 private',
        '返回类型用引用 &',
      ],
    },
    {
      type: 'multiple-choice',
      question: '单例模式中，getInstance 为什么要返回引用而不是对象本身？',
      options: [
        { text: '引用更安全，防止拷贝', correct: true, explanation: '返回引用避免用户拷贝单例对象' },
        { text: '引用更快', correct: false, explanation: '性能不是主要原因' },
        { text: 'C++ 不允许返回对象', correct: false, explanation: 'C++完全可以返回对象' },
        { text: '引用语法更简单', correct: false, explanation: '引用和值语法复杂度差不多' },
      ],
    },
    {
      type: 'exposition',
      text: '### 什么时候用单例？\n\n- 日志系统、配置管理、线程池\n- 程序确实只需要一个实例\n- 全局访问点设计合理',
    },
    {
      type: 'exposition',
      text: '### 什么时候别用？\n\n- 依赖隐藏，测试困难（全局状态）\n- 多线程环境共享状态复杂\n- 其实只需要普通全局函数时',
    },
    {
      type: 'type-it',
      instruction: '使用刚刚写的 Logger 单例：',
      code: 'int main() {\n  Logger& log = Logger::getInstance();\n  log.log("程序启动");\n  return 0;\n}',
      hints: [
        'getInstance 返回引用，用 & 接收',
        '不需要 delete，static 变量程序结束自动销毁',
        '所有地方调用 getInstance 得到同一个对象',
      ],
    },
    {
      type: 'multiple-choice',
      question: 'static 局部变量的初始化在 C++11 后有什么保证？',
      options: [
        { text: '可能被初始化多次', correct: false, explanation: 'static 变量只会初始化一次' },
        { text: '线程安全，多个线程不会竞争初始化', correct: true, explanation: 'C++11 保证 static 局部变量初始化是线程安全的' },
        { text: '需要手动加锁', correct: false, explanation: 'C++11 后不需要手动加锁' },
        { text: '不会自动初始化', correct: false, explanation: 'static 变量会在首次调用时自动初始化' },
      ],
    },
    {
      type: 'code-runner',
      instruction: '补全 Singleton 类：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Singleton {\npublic:\n  static Singleton& getInstance() {\n    // 在这里补全\n  }\n  void show() { cout << "Singleton works"; }\nprivate:\n  Singleton() = default;\n};\n\nint main() {\n  Singleton& s = Singleton::getInstance();\n  s.show();\n  return 0;\n}',
      expectedOutput: 'Singleton works',
      comparison: 'trimmed',
      editable: true,
    },
    {
      type: 'code-runner',
      instruction: '验证单例的唯一性：',
      code: '#include <iostream>\nusing namespace std;\n\nclass Logger {\npublic:\n  static Logger& getInstance() {\n    static Logger instance;\n    return instance;\n  }\n  void log(string msg) {\n    cout << msg << endl;\n  }\nprivate:\n  Logger() { cout << "Logger created" << endl; }\n};\n\nint main() {\n  Logger& a = Logger::getInstance();\n  Logger& b = Logger::getInstance();\n  cout << (&a == &b ? "同一个对象" : "不同对象") << endl;\n  return 0;\n}',
      expectedOutput: 'Logger created\n同一个对象',
      comparison: 'trimmed',
      editable: false,
    },
    {
      type: 'exposition',
      text: '### 总结\n\n单例模式确保一个类只有一个实例，适合全局唯一的组件。\nC++11 的 `static` 局部变量是最简单、线程安全的实现方式。',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '下一课：当单例需要支持多线程环境时，有哪些注意点？',
    },
  ],
}

export default lesson
