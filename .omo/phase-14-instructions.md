# 阶段 14：STL 算法

## 课程列表（共 15 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | what-is-iterator | 迭代器——容器和算法的桥梁 | 像指针一样遍历 | 迭代器概念、begin/end | 2（迭代器、begin/end） | p13-02 | exposition → concept-cards → type-it |
| 02 | iterator-categories | 迭代器分类 | 输入/输出/前向/双向/随机 | 五类迭代器及能力区别 | 1（分类） | 01 | exposition → multiple-choice |
| 03 | why-algorithms | 为什么不用手写循环 | 算法更安全更清晰 | 算法比手写循环更清晰、更安全 | 1（算法动机） | 02 | exposition → multiple-choice |
| 04 | sort | sort——排序 | 一行搞定排序 | `std::sort(vec.begin(), vec.end())` | 1（sort） | 03 | exposition → type-it → code-runner |
| 05 | find | find 和 find_if——查找 | 找第一个符合条件的 | find 查找值，find_if 查找条件 | 1（find） | 04 | exposition → type-it → code-runner |
| 06 | count | count 和 count_if——计数 | 统计符合条件个数 | 统计有多少个元素满足条件 | 0（扩展） | 05 | exposition → type-it → fill-in |
| 07 | practice-find-sort | 查找与排序练习 | 巩固 01-06 | 综合练习 sort/find/count | 0 | 01-06 | type-it → code-runner x2 → multiple-choice |
| 08 | lambda-intro | Lambda 表达式 | [ ](参数){ 代码 } | lambda 的完整语法结构 | 2（lambda, 捕获） | 07 | exposition → concept-cards → type-it |
| 09 | lambda-capture | Lambda 捕获模式 | [=] [&] [x] | 值捕获、引用捕获、指定捕获的区别 | 1（捕获模式） | 08 | exposition → type-it → multiple-choice → fill-in |
| 10 | for-each | for_each——对每个元素操作 | 替代 for 循环 | for_each 遍历容器做操作 | 0（扩展） | 09 | exposition → type-it → code-runner |
| 11 | transform | transform——映射转换 | 一个序列变另一个 | 对序列每个元素做变换生成新序列 | 1（transform） | 10 | exposition → type-it → code-runner |
| 12 | copy-remove_if | copy 和 remove_if——复制和删除 | 条件删除和复制 | copy(源起,源终,目标起), remove_if 条件删除 | 2（copy, remove_if） | 11 | exposition → type-it → fill-in |
| 13 | algorithm-pipeline | 算法流水线 | sort+unique+erase | sort+unique+erase 的去重组合模式 | 0（组合） | 12 | exposition → type-it → code-runner |
| 14 | practice-algorithms | STL 算法综合练习 | 巩固 08-13 | Lambda + 算法的综合运用 | 0 | 08-13 | type-it → code-runner x2 → multiple-choice |
| 15 | phase14-review | 阶段 14 综合复习 | STL 算法总复习 | 全面回顾 01-14 | 0 | 全部 | multiple-choice x4 → code-runner → concept-cards |

### 关键教学要求
- **01（迭代器概念）**：迭代器是 STL 的胶水，必须单独学
- **03（算法动机）**：先展示手写循环的丑陋和容易出错
- **08（Lambda）**：现代 C++ 最实用特性，放在算法语境学
