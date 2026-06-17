# 阶段 15：现代 C++ 特性实战

## 课程列表（共 12 课，含 2 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | auto-keyword | auto——让编译器帮你写类型 | 声明时自动推导 | 变量声明用 auto，类型由编译器推导 | 1（auto） | p12 全部 | exposition → type-it → multiple-choice |
| 02 | decltype | decltype——表达式的类型 | 拿到表达式的类型 | decltype 获取表达式类型，用于模板场景 | 1（decltype） | 01 | exposition → type-it → multiple-choice |
| 03 | range-for | 范围 for——遍历最简单 | 不需要迭代器 | `for (int x : vec)` 自动遍历容器 | 1（范围 for） | 01, p13-02 | exposition → type-it → code-runner |
| 04 | structured-binding | 结构化绑定 | 拆开 pair/tuple | `auto [key, val] : myMap` 解构 | 1（结构化绑定） | 03 | exposition → type-it → fill-in |
| 05 | constexpr | constexpr——编译期求值 | 比 const 更强 | 编译期就确定值的表达式 | 1（constexpr） | 01 | exposition → concept-cards → type-it |
| 06 | static-assert | static_assert——编译期断言 | 不满足就编译失败 | 编译期检查条件 | 1（static_assert） | 05 | exposition → type-it → multiple-choice |
| 07 | practice-modern-features | 现代特性练习 | 巩固 01-06 | auto/decltype/range-for/constexpr 综合 | 0 | 01-06 | type-it → code-runner → multiple-choice x2 |
| 08 | nullptr-modern | 为什么用 nullptr 不是 NULL | nullptr 类型安全 | nullptr 是 std::nullptr_t 类型，NULL 是整数 0 | 0（技巧） | p05-06 | exposition → multiple-choice |
| 09 | optional | optional——可能有值可能没有 | 替代指针和哨兵值 | `std::optional<T>` 安全的表示"可能有值" | 2（optional, nullopt） | p13 全部 | exposition → type-it → code-runner |
| 10 | variant | variant——多种类型之一 | 类型安全的 union | `std::variant<int, string>` 安全的类型联合 | 1（variant） | 09 | exposition → type-it → code-runner |
| 11 | any | any——装任何类型 | 极少数场景需要 | `std::any` 可存储任何类型 | 1（any） | 10 | exposition → multiple-choice |
| 12 | phase15-review | 阶段 15 综合复习 | 现代特性总复习 | 全面回顾 01-11 | 0 | 全部 | multiple-choice x4 → code-runner → concept-cards |
