# 阶段 12：泛型编程——模板基础

## 课程列表（共 15 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | why-template | 为什么需要模板 | 告别重载重复 | 多个类型相同逻辑的函数用一个模板 | 1（泛型动机） | p05-11 | exposition → multiple-choice |
| 02 | function-template | 函数模板语法 | template<typename T> | `template<typename T> T max(T a, T b)` | 2（template, typename） | 01 | exposition → concept-cards → type-it |
| 03 | template-instantiation | 模板实例化 | 编译器生成代码 | 编译器根据调用自动替换 T 生成代码 | 1（实例化） | 02 | exposition → multiple-choice |
| 04 | template-type-deduction | 类型推导 | 不写 <int> 也可以 | 调用时可不写<int>，编译器推导 | 1（推导） | 03 | exposition → type-it → multiple-choice |
| 05 | class-template | 类模板 | 类型参数化的类 | `template<typename T> class Box { T val; };` | 1（类模板语法） | 04 | exposition → concept-cards → type-it |
| 06 | template-member-func | 类模板的成员函数 | 类外定义也需 template | 类外定义成员函数时也要带 template 声明 | 0（语法） | 05 | exposition → type-it → fill-in |
| 07 | practice-template-basics | 模板基础练习 | 巩固 01-06 | 综合练习函数模板/类模板 | 0 | 01-06 | type-it → code-runner → multiple-choice x2 |
| 08 | multi-template-params | 多模板参数 | <typename T, typename U> | 两个以上类型参数 | 0（扩展） | 05 | exposition → type-it → multiple-choice |
| 09 | non-type-template-params | 非类型模板参数 | <int N>——传值 | 传值不是传类型的模板参数 | 1（非类型参数） | 08 | exposition → type-it → multiple-choice |
| 10 | template-specialization | 模板特化 | 给特定类型开小灶 | 对特定类型提供不同的实现 | 1（特化） | 09 | exposition → concept-cards → type-it |
| 11 | partial-specialization | 偏特化 | 部分参数特化 | 只特化部分参数（针对类模板） | 1（偏特化） | 10 | exposition → multiple-choice |
| 12 | practice-template-advanced | 模板进阶练习 | 巩固 08-11 | 特化与偏特化练习 | 0 | 08-11 | type-it → code-runner → multiple-choice |
| 13 | typename-vs-class | typename vs class 在模板里 | 完全等价但有坑 | 在嵌套依赖类型时必需 typename | 0（语法细节） | 12 | exposition → multiple-choice |
| 14 | template-compilation-model | 模板为什么写在 .h 里 | 实例化时机问题 | 模板在编译期实例化，需要完整定义可见 | 1（编译模型） | 13 | exposition → multiple-choice |
| 15 | phase12-review | 阶段 12 综合复习 | 模板总复习 | 全面回顾 01-14 | 0 | 全部 | multiple-choice x4 → concept-cards → code-runner |

### 关键教学要求
- **01（模板动机）**：先用 exposition 展示"没有模板时重载的重复"
- **14（模板编译模型）**：几乎所有 C++ 开发者都被这个问题坑过
