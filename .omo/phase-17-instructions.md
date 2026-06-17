# 阶段 17：智能指针与类型安全

## 课程列表（共 15 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | unique-ptr-motivation | 为什么需要 unique_ptr | 裸指针的问题 | 裸指针的种种问题、RAII 的解决方案 | 1（动机） | p10-13 | exposition → multiple-choice |
| 02 | unique-ptr-basics | unique_ptr——独占所有权 | 不能拷贝只能移动 | `std::unique_ptr<T> p = make_unique<T>(5);` | 2（unique_ptr, make_unique） | 01 | exposition → type-it → code-runner |
| 03 | unique-ptr-transfer | 转移所有权 | 用 std::move 转移 | unique_ptr 不能拷贝，只能 move | 0（应用） | 02, p11-02 | exposition → type-it → fill-in |
| 04 | unique-ptr-container | unique_ptr 在容器里 | vector<unique_ptr<T>> | 多态对象的容器管理 | 0（应用） | 03 | exposition → type-it → code-runner |
| 05 | shared-ptr-intro | shared_ptr——共享所有权 | 引用计数 | 引用计数，最后一个销毁时释放 | 2（shared_ptr, 引用计数） | 04 | exposition → concept-cards → type-it → code-runner |
| 06 | weak-ptr | weak_ptr——打破循环引用 | 不增加引用计数 | 弱引用解决 shared_ptr 循环引用问题 | 2（weak_ptr, 循环引用） | 05 | exposition → concept-cards → multiple-choice |
| 07 | make-shared | make_shared 的好处 | 一次分配+异常安全 | make_shared 一次分配控制块和对象 | 0（技巧） | 06 | exposition → multiple-choice |
| 08 | smart-ptr-choose | 智能指针选择策略 | 所有权的决策树 | 独占/共享/观察的场景决策 | 0（策略） | 07 | exposition → multiple-choice(场景→选指针)x4 |
| 09 | practice-smart-ptr | 智能指针综合练习 | 巩固 01-08 | 各类智能指针的使用练习 | 0 | 01-08 | type-it → code-runner x2 → multiple-choice |
| 10 | static-cast | static_cast——编译期转换 | 安全可预期的转换 | static_cast 的基本用法 | 1（static_cast） | p08-15 | exposition → type-it → multiple-choice |
| 11 | dynamic-cast | dynamic_cast——运行时检查 | 安全向下转型 | 运行时类型检查的 dynamic_cast | 1（dynamic_cast） | 10, p08-10 | exposition → type-it → multiple-choice |
| 12 | const-cast-reinterpret | const_cast 和 reinterpret_cast | 去 const 和位重解释 | const_cast 去掉 const 属性，reinterpret 按位重解释 | 2（const_cast, reinterpret_cast） | 11 | exposition → multiple-choice → type-it |
| 13 | c-style-cast-problem | C 风格强转的问题 | (int) 可以做一切 | C 风格强转隐藏错误，不推荐 | 0（警示） | 12 | exposition → multiple-choice |
| 14 | practice-casting | 类型转换练习 | 巩固 10-13 | 四种 C++ 转换的综合练习 | 0 | 10-13 | type-it → multiple-choice x3 → fill-in |
| 15 | phase17-review | 阶段 17 综合复习 | 智能指针+类型安全总复习 | 全面回顾 01-14 | 0 | 全部 | multiple-choice x4 → concept-cards → code-runner |

### 关键教学要求
- **01（动机课）**：先回忆裸指针的痛点再引入智能指针
- **05,06（shared_ptr/weak_ptr）**：引用计数和循环引用是理解智能指针的关键
- **10-13（四种 cast）**：每种 cast 的场景和区别
