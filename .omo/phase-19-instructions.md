# 阶段 19：工程化——设计模式/构建/测试

## 课程列表（共 17 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | singleton-pattern | 单例模式——全局唯一 | 一个类只有一个对象 | 确保一个类只创建一个实例 | 2（单例, static local线程安全） | p07-06 | exposition → type-it → code-runner |
| 02 | singleton-thread-safe | 线程安全单例 | C++11 保证 | 使用 static local + C++11 保证 | 0（深化） | 01, p18-06 | exposition → multiple-choice |
| 03 | factory-pattern | 工厂模式——按需创建 | 封装创建逻辑 | 将对象创建逻辑封装到工厂 | 1（工厂） | p08-12 | exposition → type-it → code-runner |
| 04 | observer-pattern | 观察者模式——通知 | 通知机制 | 一个对象变化通知多个观察者 | 1（观察者） | 03 | exposition → type-it → code-runner |
| 05 | practice-patterns | 设计模式练习 | 巩固 01-04 | 单例/工厂/观察者综合练习 | 0 | 01-04 | type-it → code-runner x2 → multiple-choice |
| 06 | pimpl-idiom | Pimpl——减少编译依赖 | 实现藏在指针后 | 用指针隐藏实现细节，减少编译依赖 | 1（Pimpl） | p05-03 | exposition → type-it |
| 07 | CRTP | CRTP——静态多态 | 奇怪递归模板模式 | `class B : public A<B>` 实现静态多态 | 1（CRTP） | p12-05 | exposition → type-it → code-runner |
| 08 | practice-idioms | C++ 惯用法练习 | 巩固 06-07 | Pimpl 和 CRTP 练习 | 0 | 06-07 | type-it → code-runner → multiple-choice |
| 09 | SFINAE-concept | SFINAE——匹配失败不算错 | Substitution Failure Is Not An Error | 模板替换失败时跳过而不是报错 | 1（SFINAE） | p12-02 | exposition → concept-cards → multiple-choice |
| 10 | enable-if | enable_if——按条件启用 | 条件满足模板才存在 | 用 enable_if 实现条件编译 | 1（enable_if） | 09 | exposition → type-it |
| 11 | concepts-cpp20 | Concepts(C++20) | requires 关键字 | template + requires 的优雅方案 | 2（requires, concept） | 10 | exposition → type-it → code-runner |
| 12 | cmake-basics | CMake 入门 | CMakeLists.txt | 基本 CMake 写法 | 1（CMake） | p16-07 | exposition → type-it |
| 13 | cmake-targets | CMake 目标和库 | add_executable/add_library | 目标管理和库链接 | 0（扩展） | 12 | exposition → type-it |
| 14 | why-testing | 为什么需要测试 | 没测试等于没写完 | 测试的必要性和价值 | 1（测试动机） | 13 | exposition → multiple-choice |
| 15 | gtest-basics | Google Test 入门 | TEST/EXPECT_EQ/ASSERT_EQ | gtest 的基本用法 | 1（gtest） | 14 | exposition → type-it → code-runner |
| 16 | test-organization | 测试组织 | 单元/集成/覆盖率 | 不同测试层级和覆盖率概念 | 0（策略） | 15 | exposition → multiple-choice |
| 17 | phase19-review | 阶段 19 综合复习 | 工程化总复习 | 全面回顾 01-16 | 0 | 全部 | multiple-choice x4 → concept-cards → fill-in |

### 关键教学要求
- **06（Pimpl）**：C++ 特有的减小编译依赖技巧
- **07（CRTP）**：C++ 黑话，静态多态的典型实现
- **09（SFINAE）**：C++ 模板黑话的关键起点
