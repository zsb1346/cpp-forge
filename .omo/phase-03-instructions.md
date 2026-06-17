# 阶段 03：第一个分水岭——循环与数组

## 课程列表（共 12 课，含 2 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | why-loops | 为什么需要循环 | 告别复制粘贴 | 用"输出1到100"引出循环必要性 | 1（循环动机） | p02 全部 | exposition → multiple-choice |
| 02 | while-basics | while——重复直到不满足 | while 语法入门 | while 条件为 true 就一直重复 | 2（while, 循环体） | 01 | exposition → type-it → code-runner |
| 03 | while-counter | 用 while 数数 | 计数循环模式 | 初值→条件→更新的计数模式 | 1（计数模式） | 02 | exposition → type-it → fill-in → code-runner |
| 04 | infinite-loop | 死循环——最恐怖的 bug | 认识死循环 | 死循环是什么、怎么避免、怎么中断 | 0（安全） | 03 | exposition → multiple-choice → code-runner(演示) |
| 05 | for-basics | for——更紧凑的循环 | for 的三段式 | for(初始化;条件;更新) 的语法 | 1（for语法） | 03 | exposition → concept-cards → type-it → match-blocks |
| 06 | for-vs-while | for vs while 怎么选 | 两种循环的场景 | 知道次数→for，不知道→while | 0（辨析） | 05 | exposition → multiple-choice → type-it |
| 07 | do-while | do-while——至少执行一次 | 和 while 的区别 | do-while 的语法和执行顺序 | 1（do-while） | 06 | exposition → type-it → multiple-choice |
| 08 | practice-loops | 循环综合练习 | 巩固 01-07 | 用 for/while/do-while 解决三类问题 | 0 | 01-07 | type-it → code-runner x2 → multiple-choice |
| 09 | array-concept | 数组是什么 | 一排同类型的格子 | 数组声明、元素概念 | 2（数组声明、元素） | p01-03 | exposition → concept-cards → multiple-choice |
| 10 | array-index | 用下标访问数组 | 位置从 0 开始 | 下标从 0 开始，[n] 读写元素 | 1（下标语法） | 09 | exposition → type-it → multiple-choice → fill-in |
| 11 | loop-and-array | 用循环遍历数组 | for + 数组 = 王炸 | for 循环从 0 到 N-1 访问每个元素 | 0（组合） | 10,05 | exposition → type-it → fill-in → code-runner |
| 12 | practice-loops-arrays | 循环与数组综合练习 | 巩固 09-11 | 数组遍历、求和、查找典型操作 | 0 | 09-11 | code-runner x2 → fill-in → multiple-choice |

### 关键教学要求
- **01（循环动机）**：必须让学习者感受到"复制粘贴100次"的痛苦——用 exposition 描述这个场景
- **04（死循环）**：用演示型 code-runner 展示死循环，告诉学习者怎么中断
- **本阶段开始常规使用可编辑 code-runner**，每个 code-runner 设 expectedOutput
