import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'singleton-thread-safe',
    chapter: 20,
    title: '线程安全单例',
    subtitle: 'C++11 保证',
    description: '深入理解 C++11 对 static 局部变量线程安全的保证，以及多线程场景下的注意事项。',
    objectives: ['能解释 static local 的线程安全机制', '能处理多线程单例的常见问题'],
    estimatedMinutes: 8,
  },
  blocks: [
    {
      type: 'exposition',
      text: '上一课用 `static` 局部变量实现了单例。\n但为什么它是线程安全的？C++11 在底层做了什么？',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### C++11 标准保证\n\nC++11 标准规定：\n> 如果多个线程同时调用一个含 `static` 局部变量的函数，**只有一个线程执行初始化**，其他线程等待。\n\n这就是「magic static」——编译器自动生成同步代码。',
      code: 'static T& getInstance() {\n  static T instance;  // 编译器自动加锁\n  return instance;\n}',
    },
    {
      type: 'exposition',
      text: '### 编译器做了什么？\n\n编译器在 `static T instance;` 周围插入了一个**布尔标志**和**互斥锁**：\n\n1. 检查标志——是否已初始化\n2. 未初始化 → 加锁 → 创建对象 → 设置标志 → 解锁\n3. 已初始化 → 直接返回\n4. 其他线程等待期间阻塞',
    },
    {
      type: 'exposition',
      text: '### 经典双重检查锁（DCLP）\n\n在 C++11 之前，开发者手动实现线程安全单例：',
      code: 'class Singleton {\n  static Singleton* instance;\n  static mutex mtx;\npublic:\n  static Singleton* getInstance() {\n    if (!instance) {\n      lock_guard<mutex> lock(mtx);\n      if (!instance) {\n        instance = new Singleton();\n      }\n    }\n    return instance;\n  }\n};',
    },
    {
      type: 'exposition',
      text: '### DCLP 的问题\n\n- 第一次检查 `if (!instance)` 没有锁 → 可能读到未完成初始化的指针\n- 需要 `atomic` + 内存序才能正确实现\n- 手动实现容易出错\n\n结论：**直接用 static 局部变量，别手写 DCLP**。',
    },
    {
      type: 'exposition',
      text: '### 真的有性能问题吗？\n\n`static` 局部变量的同步只在**初始化时**有一次开销。\n初始化完成后，后续访问没有任何锁开销——比 DCLP 更快。',
    },
    {
      type: 'exposition',
      text: '### 多线程使用单例的注意点\n\n单例本身是线程安全的，但**单例内部的数据**不一定是线程安全的。\n如果多个线程同时调用 `setConfig()`，需要加锁保护。',
      code: 'class ConfigManager {\n  map<string, string> config;\n  mutex mtx;\npublic:\n  void set(string key, string val) {\n    lock_guard<mutex> lock(mtx);\n    config[key] = val;\n  }\n};',
    },
    {
      type: 'concept-cards',
      instruction: '线程安全单例的关键保证：',
      cards: [
        { glyph: '🪄', term: 'magic static', meaning: '编译器自动为 static 局部变量加同步', example: 'static T obj;' },
        { glyph: '🔐', term: '一次初始化', meaning: '只有第一个线程执行构造', example: '标准保证' },
        { glyph: '⚠️', term: '内部数据非线程安全', meaning: '单例方法内的数据需自己加锁', example: 'mutex + lock_guard' },
        { glyph: '🚫', term: '避免手写 DCLP', meaning: 'C++11 后不需要手动双重检查锁', example: '易出错' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '回顾 p18-06：什么是数据竞争？',
      options: [
        { text: '两个线程交替执行', correct: false, explanation: '交替执行是正常的并发' },
        { text: '多个线程同时读写同一内存且至少一个是写', correct: true, explanation: '数据竞争＝未同步的并发读写' },
        { text: '程序运行速度变慢', correct: false, explanation: '性能问题不一定是数据竞争' },
        { text: '线程被操作系统挂起', correct: false, explanation: '挂起是调度行为，不是数据竞争' },
      ],
    },
    {
      type: 'exposition',
      text: '### 复习 p18-06：线程同步\n\n上一阶段学到，多个线程共享数据时需要加锁。\n单例的 `static` 初始化已经被编译器保护好了，但单例内部的成员变量仍然需要保护。',
    },
    {
      type: 'multiple-choice',
      question: 'C++11 中 static 局部变量的初始化是线程安全的，这意味着什么？',
      options: [
        { text: '所有对单例的调用都线程安全', correct: false, explanation: '只有初始化是线程安全，内部数据需要额外保护' },
        { text: '多个线程首次调用 getInstance 不会竞争', correct: true, explanation: '编译器保证只有一个线程执行初始化' },
        { text: '不需要再使用任何锁', correct: false, explanation: '单例内部数据仍可能需要锁' },
        { text: 'static 变量可以随意修改', correct: false, explanation: 'static 变量本身也需要同步保护' },
      ],
    },
    {
      type: 'exposition',
      text: '### 测试你的单例\n\n验证方式：创建多个线程，分别获取单例地址。\n所有线程返回的地址应该相同。',
      code: '#include <iostream>\n#include <thread>\nusing namespace std;\n\nvoid worker() {\n  Logger& log = Logger::getInstance();\n  cout << &log << endl;\n}\n\nint main() {\n  thread t1(worker), t2(worker);\n  t1.join(); t2.join();\n}',
    },
    {
      type: 'exposition',
      text: '### 饿汉式 vs 懒汉式\n\n- **饿汉式**：程序启动就创建（`static` 成员变量在类外初始化）\n  - 优点：访问快，无同步开销\n  - 缺点：程序启动慢，浪费资源\n\n- **懒汉式**：首次访问时创建（`static` 局部变量）\n  - 优点：按需创建，节约资源\n  - 缺点：首次访问有微小同步开销',
    },
    {
      type: 'multiple-choice',
      question: '饿汉式单例有什么缺点？',
      options: [
        { text: '线程不安全', correct: false, explanation: '程序启动时初始化，不存在竞争' },
        { text: '即使不用也会创建对象', correct: true, explanation: '程序启动就创建，可能浪费资源' },
        { text: '代码太复杂', correct: false, explanation: '饿汉式代码比懒汉式更简单' },
        { text: '不能保证唯一性', correct: false, explanation: '两者都能保证唯一性' },
      ],
    },
    {
      type: 'type-it',
      instruction: '实现一个饿汉式单例：',
      code: 'class EarlySingleton {\npublic:\n  static EarlySingleton& getInstance() {\n    return instance;\n  }\nprivate:\n  EarlySingleton() = default;\n  static EarlySingleton instance;\n};\n\nEarlySingleton EarlySingleton::instance;',
      hints: [
        'static 成员变量需要在类外定义',
        'getInstance 直接返回静态成员',
        '程序启动时 instance 自动构造',
      ],
    },
    {
      type: 'multiple-choice',
      question: '关于 static 局部变量，以下哪项正确？',
      options: [
        { text: '每次调用函数都会重新创建', correct: false, explanation: 'static 局部变量只初始化一次' },
        { text: '只在首次调用时初始化，后续复用', correct: true, explanation: 'static 局部变量具有持久性' },
        { text: '作用域是整个程序', correct: false, explanation: 'static 局部变量的作用域仍是函数内' },
        { text: '不能用于多线程', correct: false, explanation: 'C++11 保证了线程安全' },
      ],
    },
    {
      type: 'exposition',
      text: '### 总结\n\n- C++11 的 `static` 局部变量是最安全的单例实现\n- 编译器自动处理同步，初始化后零开销\n- 单例内部的数据仍然需要自己加锁\n- 能用 `static` 局部变量就别手写 DCLP',
      textAnimation: 'typewriter',
    },
    {
      type: 'exposition',
      text: '### 下一课预告\n\n工厂模式——把对象创建的复杂逻辑封装起来。',
    },
  ],
}

export default lesson
