# C++ 零基础课程体系设计

> 设计依据：forge-course-team（CURRICULUM.md / PEDAGOGY.md / LESSON_AUTHORING.md / REVIEW_RUBRIC.md）
> 目标平台：Forge C++ Adventure（src/courses/）

---

## A. 学习承诺

| 项目 | 内容 |
|------|------|
| **学习者画像** | 真正 0 基础。不知道代码是什么构成的，不熟悉符号解析，可能混淆名字/值/类型/标点 |
| **学完后能做什么** | 读懂并编写简单的 C++ 程序：声明变量、使用基本类型、输入输出、条件判断、循环、数组、字符串操作、函数封装、初步理解指针 |
| **学习旅程总览** | 识别 → 理解含义 → 模仿 → 辨析 → 引导回忆 → 独立产出 → 迁移应用 |
| **预计总学时** | ~4-6 小时（34 节微课，每课 6-10 分钟） |

---

## B. 章节地图

### 第 1 章：值、名字与类型（8 课）
> 从「不知道代码是什么」到「能读懂一行变量声明」

| 项目 | 内容 |
|------|------|
| **学习目的** | 建立「代码是由有类型的值 + 名字 + 符号」组成的心智模型 |
| **前置要求** | 无 |
| **出口能力** | 能读懂并写出 `int score = 0;` 这样的声明，理解每个部分的角色 |
| **危险点** | `=` 被理解为数学等于；分号被忽略；`int` 被当成变量名 |

### 第 2 章：更多类型与输入输出（6 课）
> 从「只会 int」到「能用多种类型 + 和程序对话」

| 项目 | 内容 |
|------|------|
| **学习目的** | 掌握 bool/double/char/string 四种新类型，学会用 cout/cin 与程序交互 |
| **前置要求** | 理解变量声明与赋值 |
| **出口能力** | 能声明多种类型的变量，能写简单的输入→处理→输出程序 |
| **危险点** | `cin >>` 的方向感混淆；string 和 char 的引号区别；类型混用时的隐式转换困惑 |

### 第 3 章：比较与判断（5 课）
> 从「顺序执行」到「让代码做决定」

| 项目 | 内容 |
|------|------|
| **学习目的** | 理解比较产生布尔值，if/else 控制程序分支 |
| **前置要求** | 理解变量和值，了解 cout |
| **出口能力** | 能写出带 if-else 的判断逻辑 |
| **危险点** | `=` 与 `==` 混淆；if 的花括号省略规则；else 的匹配歧义 |

### 第 4 章：循环（4 课）
> 从「复制粘贴」到「让代码自动重复」

| 项目 | 内容 |
|------|------|
| **学习目的** | 理解 while 和 for 两种循环机制及其适用场景 |
| **前置要求** | 比较运算符、条件判断 |
| **出口能力** | 能用 for/while 写出计数循环和条件循环 |
| **危险点** | 死循环；循环变量的作用域；for 的三个部分分别是什么 |

### 第 5 章：数组与字符串进阶（4 课）
> 从「单个数据」到「数据集合」

| 项目 | 内容 |
|------|------|
| **学习目的** | 理解数组的概念（连续的同类型数据），掌握下标访问和遍历 |
| **前置要求** | 循环 |
| **出口能力** | 能声明数组、用下标读写、用循环遍历 |
| **危险点** | 下标从 0 开始；越界访问不报错；数组名是地址 |

### 第 6 章：函数（4 课）
> 从「写长代码」到「把代码组织成积木」

| 项目 | 内容 |
|------|------|
| **学习目的** | 理解函数的声明、定义、调用、参数和返回值 |
| **前置要求** | 变量、类型、cout |
| **出口能力** | 能写出带参数和返回值的函数并调用 |
| **危险点** | 声明和定义混淆；return 的位置和作用域；void 的理解 |

### 第 7 章：指针入门（3 课）
> 从「变量盒子」到「盒子的地址」

| 项目 | 内容 |
|------|------|
| **学习目的** | 建立「变量在内存中有地址」的概念，理解 & 和 * 的基本含义 |
| **前置要求** | 变量、数组 |
| **出口能力** | 能解释 & 和 * 的作用，理解指针变量存储的是地址 |
| **危险点** | `*` 的两个含义（声明指针 vs 解引用）混淆；`&` 取地址和引用的区别 |

---

## C. 课程地图（34 课）

### 第 1 章：值、名字与类型

| # | ID Slug | 标题 | 一句话目的 | 新概念数 | 推荐 Block 重点 | 前置 |
|---|---------|------|-----------|---------|----------------|------|
| 1 | what-is-value | 什么是"值" | 让学习者认识程序中的各种字面量（数字、文字、真假） | 1 | exposition → concept-cards → multiple-choice | 无 |
| 2 | what-is-name | 给值取个名字 | 建立「变量名是值的标签」的心智模型 | 1 | exposition → concept-cards → multiple-choice | 课 1 |
| 3 | int-type | int——整数的盒子 | 理解 int 类型规定"只能装整数" | 1 | exposition → concept-cards → type-it | 课 2 |
| 4 | declare-variable | 声明一个变量 | 学会写 `int x;` 语法格式 | 1 | exposition → type-it → match-blocks | 课 3 |
| 5 | assignment-meaning | = 是赋值，不是等于 | 破除「= 是数学等于」的固有认知 | 1 | exposition → concept-cards → multiple-choice → type-it | 课 4 |
| 6 | semicolon-rule | 分号 ; 为什么存在 | 理解分号是语句结束符 | 1 | exposition → multiple-choice → type-it | 课 5 |
| 7 | declare-and-init | 一口气完成：声明+赋值 | 合并上两课：`int x = 5;` | 1 | exposition → type-it → match-blocks → fill-in | 课 4,5,6 |
| 8 | common-errors | 常见新手错误 | 暴露三类典型错误：缺分号、类型放错位置、=混用 | 0（纠错） | exposition → multiple-choice x2 → type-it | 课 7 |

**拆分理由**：原「变量」一课拆为 8 课。因为 0 基础学习者需要分别建立「值」「名字」「类型」「声明」「赋值」「分号」6 个独立心智模型，任何一个没建立都会导致后续连锁困惑。

---

### 第 2 章：更多类型与输入输出

| # | ID Slug | 标题 | 一句话目的 | 新概念数 | 推荐 Block 重点 | 前置 |
|---|---------|------|-----------|---------|----------------|------|
| 9 | bool-type | bool——真与假 | 认识 true/false 两个布尔值 | 1 | exposition → concept-cards → multiple-choice | 课 7 |
| 10 | double-type | double——小数 | 学会声明和赋值小数变量 | 1 | exposition → concept-cards → type-it | 课 7 |
| 11 | char-type | char——单个字符 | 理解字符用单引号，与 string 区分 | 1 | exposition → concept-cards → multiple-choice → type-it | 课 7 |
| 12 | string-type | string——文本 | 学会用双引号声明字符串变量 | 1 | exposition → concept-cards → type-it | 课 11 |
| 13 | cout-output | cout——让程序说话 | 学会输出到屏幕 | 2（cout, <<） | exposition → type-it → code-runner（演示） | 课 7 |
| 14 | cin-input | cin——让程序听 | 学会从键盘读入 | 2（cin, >>） | exposition → type-it → code-runner（演示） | 课 13 |

**拆分理由**：原「数据类型」和「字符串」各拆为多课。因为 bool/double/char/string 各有不同的语法特征和易混淆点，合在一起会信息过载。

---

### 第 3 章：比较与判断

| # | ID Slug | 标题 | 一句话目的 | 新概念数 | 推荐 Block 重点 | 前置 |
|---|---------|------|-----------|---------|----------------|------|
| 15 | comparison-ops | 比较运算符 | 认识 > < >= <= == != 六种比较 | 1（比较符号族） | exposition → concept-cards → multiple-choice x2 | 课 9 |
| 16 | comparison-to-bool | 比较产生布尔值 | 理解比较表达式的结果是 true/false | 1 | exposition → type-it → multiple-choice | 课 15 |
| 17 | if-statement | if——如果……就…… | 学会 if 的基本结构 | 1（if 语法） | exposition → type-it → match-blocks → multiple-choice | 课 16 |
| 18 | if-else | if-else——二选一 | 学会 if-else 双向分支 | 1（else） | exposition → type-it → multiple-choice → fill-in | 课 17 |
| 19 | logical-ops | 逻辑运算符：&&、\|\|、! | 学会组合多个条件 | 3（&&, \|\|, !） | exposition → concept-cards → multiple-choice → type-it | 课 17 |

**拆分理由**：原"条件"拆为 5 课。因为（1）比较符号多需要单独熟悉（2）if 的读法和写法本身需要练习（3）逻辑运算符是三组独立的新符号。

---

### 第 4 章：循环

| # | ID Slug | 标题 | 一句话目的 | 新概念数 | 推荐 Block 重点 | 前置 |
|---|---------|------|-----------|---------|----------------|------|
| 20 | while-loop | while 循环——重复直到 | 理解 while 循环的基本结构 | 2（while, 循环体） | exposition → type-it → code-runner | 课 17 |
| 21 | for-loop | for 循环——数着次数重复 | 理解 for 的三段式结构 | 1（for 语法） | exposition → concept-cards → type-it → fill-in | 课 20 |
| 22 | loop-patterns | 循环常见模式 | 累加、计数、遍历的典型写法 | 0（巩固） | type-it x2 → multiple-choice → fill-in | 课 21 |

**拆分理由**：原"循环"拆为 3 课。因为 while 和 for 虽然概念相通但语法不同，初学者需要分开练习。

---

### 第 5 章：数组与字符串进阶

| # | ID Slug | 标题 | 一句话目的 | 新概念数 | 推荐 Block 重点 | 前置 |
|---|---------|------|-----------|---------|----------------|------|
| 23 | what-is-array | 数组是什么 | 理解数组是"一排同类型的格子" | 2（数组声明、元素概念） | exposition → concept-cards → multiple-choice | 课 7 |
| 24 | array-index | 下标——访问特定位置 | 学会用 [下标] 读写数组元素 | 1（下标语法） | exposition → type-it → multiple-choice | 课 23 |
| 25 | iterate-array | 遍历数组 | 用循环访问数组的每个元素 | 0（组合） | exposition → type-it → fill-in → code-runner | 课 24, 21 |
| 26 | string-deeper | string 再探索 | string 的长度、拼接、下标访问 | 1-2 | exposition → type-it → code-runner | 课 12, 24 |

**拆分理由**：原"数组"+"字符串"拆为 4 课。数组声明、下标访问、遍历是三个独立技能点。

---

### 第 6 章：函数

| # | ID Slug | 标题 | 一句话目的 | 新概念数 | 推荐 Block 重点 | 前置 |
|---|---------|------|-----------|---------|----------------|------|
| 27 | what-is-function | 什么是函数 | 理解函数是"有名字的代码块" | 2（定义、调用） | exposition → concept-cards → type-it | 课 7 |
| 28 | function-return | 返回值 | 理解函数可以产生一个结果 | 1（return） | exposition → type-it → multiple-choice → fill-in | 课 27 |
| 29 | function-params | 参数——让函数更灵活 | 理解参数传递数据给函数 | 1（参数） | exposition → concept-cards → type-it → match-blocks | 课 28 |
| 30 | why-functions | 为什么要用函数 | 通过对比"有函数 vs 无函数"理解模块化 | 0（动机） | exposition → multiple-choice → code-runner | 课 29 |

**拆分理由**：原"函数"拆为 4 课。函数的定义/调用、返回值、参数是三个独立概念，加上"为什么要用"需要单独建立认知。

---

### 第 7 章：指针入门

| # | ID Slug | 标题 | 一句话目的 | 新概念数 | 推荐 Block 重点 | 前置 |
|---|---------|------|-----------|---------|----------------|------|
| 31 | memory-address | 内存中的地址 | 理解"每个变量都有一个地址" | 2（地址、&） | exposition → concept-cards → type-it | 课 7 |
| 32 | pointer-variable | 指针变量 | 理解指针存的是地址，不是值 | 2（*声明, *解引用） | exposition → concept-cards → multiple-choice → type-it | 课 31 |
| 33 | pointer-why | 指针有什么用 | 初探指针的实际用途 | 0（动机） | exposition → multiple-choice → code-runner | 课 32 |

**拆分理由**：原"指针"拆为 3 课。地址概念、指针变量声明、指针用途需要分步建立。* 的两个含义（声明指针 vs 解引用）必须单独处理。

---

## D. 风险分析

| 风险点 | 位置 | 缓解措施 |
|--------|------|---------|
| **学习者可能在「赋值 =」处卡住** | 第 1 章 课 5 | 专门一课攻破；用盒子的比喻反复对比；选择题设"= 读作什么"的辨析 |
| **int / double 类型混用困惑** | 第 2 章 | 在 int 课结尾设"预告：还有别的类型"；引入 double 时做对比卡 |
| **单引号 vs 双引号混淆** | 第 2 章 课 11-12 | char 和 string 之间加 explicit 比较题：'A' vs "A" 区别 |
| **`=` 与 `==` 混淆** | 第 3 章 课 15-17 | 在比较运算符课的第一张概念卡就做辨析；if 课的 multiple-choice 包含此陷阱 |
| **数组下标从 0 开始** | 第 5 章 课 24 | 用格子编号 0/1/2 的视觉化描述；专门设置"第几个元素 vs 下标是几"的辨析题 |
| **`*` 含义混淆（声明 vs 解引用）** | 第 7 章 课 32 | 先学 & 取地址再学 *；把声明时的 `*` 和表达式中的 `*` 当作两个概念分两步教 |
| **`code-runner` 认知负荷** | 第 2 章起逐步引入 | 前 1-8 课完全不用 code-runner；9-14 课只在 exposition 中展示运行结果（不可编辑）；15 课之后才允许编辑运行 |
| **总课时 34 偏多导致疲劳** | 整体 | 每课控制在 6-10 分钟；第 1 章 8 课是打地基，最密集；后续章节密度下降 |

---

## E. 章节/单元规划（映射到 index.ts chapters）

根据以上拆分，建议在 `src/courses/index.ts` 中定义 7 个单元：

| 单元 ID | 角标 | 标题 | 包含课程 ID |
|---------|------|------|------------|
| `values-types` | 学习路线 | 值、名字与类型 | what-is-value, what-is-name, int-type, declare-variable, assignment-meaning, semicolon-rule, declare-and-init, common-errors |
| `more-types-io` | 学习路线 | 更多类型与输入输出 | bool-type, double-type, char-type, string-type, cout-output, cin-input |
| `decisions` | 进阶挑战 | 比较与判断 | comparison-ops, comparison-to-bool, if-statement, if-else, logical-ops |
| `loops` | 进阶挑战 | 循环 | while-loop, for-loop, loop-patterns |
| `collections` | 进阶挑战 | 数组与字符串 | what-is-array, array-index, iterate-array, string-deeper |
| `functions` | 进阶挑战 | 函数 | what-is-function, function-return, function-params, why-functions |
| `pointers` | 终极挑战 | 指针入门 | memory-address, pointer-variable, pointer-why |

---

## F. 实施计划

### 阶段 1：第 1 章（8 课）—— 最密集，需要最高质量
- 严格使用 exposition / concept-cards / type-it / multiple-choice
- 完全不用 code-runner 和 fill-in（fill-in 只在课 7-8 少量使用）
- 每课 6-8 个 block

### 阶段 2：第 2-3 章（11 课）
- 逐步引入 fill-in
- code-runner 以演示模式出现（不可编辑）
- 概念卡数量控制在 2-4 张

### 阶段 3：第 4-5 章（7 课）
- fill-in 常规使用
- code-runner 可编辑，设 expectedOutput 做自动比对

### 阶段 4：第 6-7 章（7 课）
- code-runner 常规使用
- 部分 fill-in 可升级为独立编写

---

> 下一步：确认本设计方案后，按阶段逐课生成 `src/courses/*.ts` 文件。
