# 阶段 20：C++ 深度黑话

## 课程列表（共 20 课，含 4 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | adl | ADL——参数依赖查找 | 根据参数找函数 | 编译器根据参数所在命名空间查找函数 | 1（ADL） | p16-07 | exposition → multiple-choice |
| 02 | rvo-nrvo | RVO/NRVO——返回值优化 | 编译器帮你省拷贝 | 编译器可以在 return 时省略拷贝/移动 | 2（RVO, NRVO） | p10-11 | exposition → multiple-choice |
| 03 | copy-elision-cpp17 | C++17 保证的拷贝消除 | 某些场景保证不拷贝 | C++17 在某些场景确保拷贝消除 | 0（深化） | 02 | exposition → multiple-choice |
| 04 | type-erasure | Type Erasure 原理 | std::function 是怎么工作的 | 用模板+虚函数隐藏具体类型 | 1（Type Erasure） | p08-07, p12-02 | exposition → concept-cards → multiple-choice |
| 05 | function-implementation | std::function 的实现 | 小对象优化+虚函数 | 小对象优化和虚函数擦除类型 | 0（原理） | 04 | exposition → multiple-choice |
| 06 | any-implementation | std::any 实现思路 | 存值不存调用 | 和 function 类似但存值不存调用签名 | 0（扩展） | 05 | exposition → multiple-choice |
| 07 | practice-type-erasure | Type Erasure 练习 | 巩固 04-06 | 理解 function/any 的底层原理 | 0 | 04-06 | multiple-choice x3 → concept-cards |
| 08 | variadic-templates | 变参模板 | template<typename... Args> | 接受任意数量和类型参数的模板 | 2（变参, 参数包） | p12-08 | exposition → concept-cards → type-it |
| 09 | fold-expressions | 折叠表达式 | (... + args) | C++17 展开参数包的语法 | 1（折叠） | 08 | exposition → type-it → fill-in |
| 10 | practice-variadic | 变参模板练习 | 巩固 08-09 | 变参模板和折叠表达式练习 | 0 | 08-09 | type-it → code-runner → multiple-choice |
| 11 | memory-order-intro | 为什么需要内存序 | 指令可能重排 | 编译器/CPU 可能重排指令影响并发 | 1（内存序概念） | p18-13 | exposition → concept-cards |
| 12 | memory-order-modes | 内存序模式 | relaxed/acquire/release/seq_cst | 五种内存序模式的不同保证 | 1（模式） | 11 | exposition → multiple-choice |
| 13 | rtti-cost | RTTI 和 dynamic_cast 的成本 | 运行时类型信息的代价 | typeid 和 dynamic_cast 的性能开销 | 1（RTTI） | p17-11 | exposition → multiple-choice |
| 14 | practice-advanced-concepts | 高级概念练习 | 巩固 11-13 | 内存序/RTTI 理解练习 | 0 | 11-13 | multiple-choice x3 → concept-cards |
| 15 | undefined-behavior | 未定义行为大全 | C++ 最危险的地方 | 越界/空指针/除零/悬空/数据竞争等 UB | 1（UB 概念） | 前全部 | exposition → concept-cards → multiple-choice |
| 16 | ub-not-error | UB 不是错误而是自由 | 编译器可以做任何事 | UB 的核心：编译器可以不保证结果 | 0（哲学） | 15 | exposition → multiple-choice |
| 17 | zero-overhead | 零开销原则 | 不用不付钱 | The C++ design philosophy: 不用为没用到的付钱 | 1（零开销原则） | 前全部 | exposition → multiple-choice |
| 18 | you-pay-only | 用多少付多少 | 抽象不是免费但可选 | C++ 让你只为你用的部分付钱 | 0（深化） | 17 | exposition → multiple-choice |
| 19 | cpp-philosophy-review | C++ 设计哲学回顾 | 全部串联 | 总结整个旅程——C++ 给了你什么、你付了什么 | 0（总结） | 前全部 | exposition(长篇回顾) → multiple-choice(综合)x4 |
| 20 | final-reflection | 结业：从零到理解 | 你已经走了多远 | 回顾整个 300+ 课的学习旅程，鼓励继续前进 | 0（结业） | 全部 | exposition(结语) |

### 关键教学要求
- **01（ADL）**：C++ 黑话，理解 std::swap 为什么能工作
- **02-03（RVO/NRVO/拷贝消除）**：了解编译器帮你做了什么优化
- **04-06（Type Erasure）**：理解 std::function 和 std::any 的底层
- **15-16（UB）**：知道哪些不能写比知道怎么写更重要
- **17-18（零开销原则）**：理解 C++ 的核心设计哲学
- **19（哲学回顾）**：把全部 300+ 课串联起来，回答"为什么 C++ 设计成这样"
- **20（结业）**：鼓励性结语，回顾学习旅程
