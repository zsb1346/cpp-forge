# 阶段 13：STL 容器

## 课程列表（共 17 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | what-is-stl | STL 是什么 | 容器+算法+迭代器 | 标准模板库的整体心智模型 | 1（STL 概念） | p12 全部 | exposition → concept-cards |
| 02 | vector-intro | vector——动态数组 | push_back 和 size | vector 声明、添加元素、获取大小 | 2（vector, push_back） | 01 | exposition → type-it → code-runner |
| 03 | vector-operations | vector 常用操作 | pop_back/insert/erase | vector 的各种成员函数 | 0（扩展） | 02 | exposition → type-it → fill-in |
| 04 | vector-capacity | vector 的容量管理 | size vs capacity | 自动扩容机制，size 和 capacity 的区别 | 1（capacity） | 03 | exposition → multiple-choice → code-runner(演示) |
| 05 | list-intro | list——双向链表 | 插入删除快但是不能[] | list 的特点和基本用法 | 1（list） | 02 | exposition → type-it |
| 06 | deque-intro | deque——双端队列 | 头尾都快 | deque 的特点和基本用法 | 1（deque） | 05 | exposition → type-it → multiple-choice |
| 07 | container-choose | 容器选择策略 | 什么时候用什么 | vector/list/deque 的取舍决策树 | 0（策略） | 06 | exposition → multiple-choice(场景→选容器)x3 |
| 08 | practice-seq-containers | 序列容器练习 | 巩固 01-07 | 综合练习 vector/list/deque | 0 | 01-07 | type-it → code-runner → multiple-choice x2 |
| 09 | stack-queue | stack 和 queue | 容器适配器 | stack（后进先出）/queue（先进先出） | 2（适配器概念） | 07 | exposition → concept-cards → type-it → code-runner |
| 10 | priority-queue | priority_queue | 最大元素在最前 | 优先队列，自动保持最大/最小在头部 | 1（priority_queue） | 09 | exposition → type-it → code-runner |
| 11 | set-intro | set——不重复的有序集合 | 自动排序 | 自动排序、不重复、高效查找 | 1（set） | 07 | exposition → type-it → code-runner |
| 12 | map-intro | map——键值对字典 | 名字查值 | `map<string,int>`——用键查找值 | 2（map, 键值对） | 11 | exposition → concept-cards → type-it → code-runner |
| 13 | unordered-set-map | unordered_set/map | 哈希表更快 | 哈希表实现，查找 O(1) | 2（哈希概念） | 12 | exposition → multiple-choice → type-it |
| 14 | set-vs-unordered | set vs unordered_set | 排序 vs 速度 | 需要排序→set，追求速度→unordered | 0（策略） | 13 | exposition → multiple-choice |
| 15 | practice-assoc-containers | 关联容器练习 | 巩固 11-14 | map/set 使用练习 | 0 | 11-14 | type-it → code-runner x2 → multiple-choice |
| 16 | container-summary | 容器全家福 | 所有容器一览 | 总结所有容器及适用场景 | 0（总结） | 全部 | exposition → multiple-choice(场景→选容器)x4 |
| 17 | phase13-review | 阶段 13 综合复习 | STL 容器总复习 | 全面回顾 01-16 | 0 | 全部 | multiple-choice x4 → fill-in → code-runner |

### 关键教学要求
- **01（STL 概念课）**：先建立 STL 整体心智模型
- **07（容器选择策略）**：实践中最重要的问题
- **16（容器总结）**：学完所有容器后一张"决策树"
