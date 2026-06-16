import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'phase19-review',
    chapter: 20,
    title: '阶段 19 综合复习',
    subtitle: '工程化总复习',
    description: '全面回顾设计模式、C++ 惯用法、模板技巧、CMake 构建和测试。',
    objectives: ['能综合运用设计模式', '能理解 C++ 惯用法', '能使用 CMake 构建项目', '能编写基本测试'],
    estimatedMinutes: 12,
  },
  blocks: [
    {
      type: 'exposition',
      text: '阶段 19 覆盖了工程化的四大块：设计模式、C++ 惯用法、构建工具、测试。\n来一次全面复习。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: '单例模式中，C++11 推荐的线程安全实现方式是？',
      options: [
        { text: '双重检查锁 (DCLP)', correct: false, explanation: 'DCLP 在 C++11 前使用，易出错' },
        { text: 'static 局部变量', correct: true, explanation: 'C++11 保证 static 局部变量初始化线程安全' },
        { text: '全局变量', correct: false, explanation: '全局变量不能保证线程安全的初始化' },
        { text: 'synchronized 关键字', correct: false, explanation: 'C++ 没有 synchronized 关键字' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '工厂模式的主要作用是什么？',
      options: [
        { text: '让一个类只有一个实例', correct: false, explanation: '那是单例模式' },
        { text: '封装对象创建逻辑，解耦调用者和具体类', correct: true, explanation: '工厂将创建逻辑集中，调用者只依赖接口' },
        { text: '一个对象变化通知多个对象', correct: false, explanation: '那是观察者模式' },
        { text: '减少编译依赖', correct: false, explanation: '那是 Pimpl' },
      ],
    },
    {
      type: 'multiple-choice',
      question: '观察者模式中，Subject 负责什么？',
      options: [
        { text: '实现 update 方法', correct: false, explanation: 'Observer 才实现 update' },
        { text: '维护观察者列表并发送通知', correct: true, explanation: 'Subject 管理注册/注销，状态变化时通知' },
        { text: '创建具体的产品对象', correct: false, explanation: '那是工厂的工作' },
        { text: '保证全局唯一性', correct: false, explanation: '那是单例的工作' },
      ],
    },
    {
      type: 'multiple-choice',
      question: 'Pimpl 惯用法的核心目的是什么？',
      options: [
        { text: '实现静态多态', correct: false, explanation: '静态多态是 CRTP' },
        { text: '减少编译依赖，隐藏实现细节', correct: true, explanation: '通过前置声明 + 指针把实现藏起来' },
        { text: '让代码运行更快', correct: false, explanation: 'Pimpl 增加间接访问，可能微慢' },
        { text: '实现模板约束', correct: false, explanation: '模板约束是 enable_if 或 Concepts' },
      ],
    },
    {
      type: 'concept-cards',
      instruction: '阶段 19 核心概念总览：',
      cards: [
        { glyph: '🏗️', term: '设计模式', meaning: '可复用的架构方案：单例/工厂/观察者', example: '解决特定设计问题' },
        { glyph: '🎭', term: 'C++ 惯用法', meaning: 'C++ 特有的技巧：Pimpl / CRTP', example: '减编译依赖 / 静态多态' },
        { glyph: '🧩', term: '模板元编程', meaning: 'SFINAE / enable_if / Concepts', example: '编译期约束模板' },
        { glyph: '🔨', term: '构建与测试', meaning: 'CMake + Google Test', example: '自动化构建和验证' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '实现一个单例模式的 getInstance 方法，使用 static 局部变量。',
      template: 'static Singleton& getInstance() {\n  static ____ instance;\n  return ____;\n}',
      answers: ['Singleton', 'instance'],
      hints: ['第一个空填类型名称', '第二个空填变量名'],
    },
    {
      type: 'exposition',
      text: '### 设计模式要点\n\n**单例**：`static T& getInstance() { static T instance; return instance; }`\n**工厂**：封装创建逻辑，返回基类指针\n**观察者**：Subject 通知所有注册的 Observer',
    },
    {
      type: 'fill-in',
      prompt: '用 enable_if 约束模板只接受整数类型。',
      template: 'template <typename T,\n          ____ = enable_if_t<is_integral_v<T>>>\nvoid process(T val);',
      answers: ['typename'],
      hints: ['enable_if_t 作为默认模板参数，前面需要 typename 关键字'],
    },
    {
      type: 'exposition',
      text: '### 惯用法要点\n\n**Pimpl**：`struct Impl; unique_ptr<Impl> pImpl;`\n**CRTP**：`class D : public B<D>` + `static_cast<T*>(this)->method()`\n**SFINAE/Concepts**：编译时约束模板参数',
    },
    {
      type: 'fill-in',
      prompt: '用 CMake 创建一个可执行文件并链接库。',
      template: 'add_library(MathUtils ____ math.cpp)\nadd_executable(calc main.cpp)\ntarget_link_libraries(calc ____ MathUtils)',
      answers: ['STATIC', 'PRIVATE'],
      hints: ['第一个空填库类型（静态库）', '第二个空填链接范围'],
    },
    {
      type: 'exposition',
      text: '### CMake 和测试要点\n\n- `cmake -B build` + `cmake --build build`\n- `enable_testing()` + `add_test()`\n- `TEST(Group, Name)` + `EXPECT_EQ` / `ASSERT_EQ`\n- 测试金字塔：单元 > 集成 > 端到端',
    },
    {
      type: 'fill-in',
      prompt: '写一个 gtest 测试用例。',
      template: '____(MathTest, Add) {\n  _____EQ(add(2, 3), 5);\n}',
      answers: ['TEST', 'EXPECT'],
      hints: ['第一个空用 TEST 宏定义测试', '第二个空用 EXPECT 非致命断言'],
    },
    {
      type: 'exposition',
      text: '### 设计模式对比\n\n| 模式 | 问题 | 方案 |\n|------|------|------|\n| 单例 | 需要唯一实例 | 私有构造 + static 实例 |\n| 工厂 | 创建逻辑分散 | 集中创建，返回接口 |\n| 观察者 | 一对多通知 | Subject → Observer 列表 |',
    },
    {
      type: 'exposition',
      text: '### 进阶方向\n\n- 更多设计模式：策略、装饰器、适配器\n- C++20 更有趣的特性：ranges、coroutines\n- 更复杂的 CMake：FetchContent、CPack\n- 测试进阶：mock 对象、property-based testing',
    },
    {
      type: 'exposition',
      text: '阶段 19 完成！你已经掌握了工程化的核心技能——设计模式让代码灵活，惯用法让 C++ 发挥威力，CMake 管构建，测试保质量。',
      textAnimation: 'typewriter',
    },
    {
      type: 'multiple-choice',
      question: 'enable_if_t<is_integral_v<T>> 依赖什么机制工作？',
      options: [
        { text: '运行时类型检查', correct: false, explanation: '模板实例化是编译时行为' },
        { text: 'SFINAE 替换失败', correct: true, explanation: '条件不满足时 type 不存在，触发 SFINAE' },
        { text: '异常处理', correct: false, explanation: '和异常无关' },
        { text: '预处理宏', correct: false, explanation: 'enable_if 是模板，不是宏' },
      ],
    },
    {
      type: 'fill-in',
      prompt: '用 CRTP 实现静态多态。',
      template: 'template <typename T>\nclass Base {\n  void run() {\n    ____<T*>(this)->step();\n  }\n};',
      answers: ['static_cast'],
      hints: ['CRTP 中通过 static_cast 将 this 转为派生类指针'],
    },
  ],
}

export default lesson
