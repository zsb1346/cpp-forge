# 阶段 02：基础积木（下）——运算符、I/O、流程

## 课程列表（共 20 课，含 4 节练习课）

### 子阶段 2a：算术运算符

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | arithmetic-plus-minus | + 和 - 运算 | 加法与减法 | 加减运算，表达式产生新值 | 2（运算符、表达式） | p01 全部 | exposition → type-it → multiple-choice |
| 02 | multiply-divide-mod | * / % 运算 | 乘法、除法、取模 | 乘除取模，% 是整除取余 | 3（*/%） | 01 | exposition → concept-cards → type-it |
| 03 | integer-division-trap | int ÷ int 的陷阱 | 5/2 等于 2 不是 2.5 | 整型除法的截断 | 1（截断） | 02 | exposition → multiple-choice → type-it |
| 04 | operator-precedence | 先算谁再算谁 | 优先级与括号 | 乘除优先于加减，括号改变顺序 | 1（优先级） | 03 | exposition → multiple-choice → fill-in |
| 05 | practice-arithmetic | 算术运算练习 | 巩固 01-04 | 综合练习算术表达式 | 0 | 01-04 | type-it x2 → multiple-choice x2 → fill-in |

### 子阶段 2b：输入输出

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 06 | cout-basics | cout——让程序说话 | 输出到屏幕 | cout 和 << 的基本用法 | 2（cout, <<） | p01 全部 | exposition → type-it → code-runner(演示) |
| 07 | cout-multiple | 输出多个东西 | 连续 << 输出 | 链式 << 输出文字+变量+换行 | 1（链式） | 06 | exposition → type-it → fill-in |
| 08 | cin-basics | cin——让程序听 | 从键盘读入 | cin 和 >> 的基本用法 | 2（cin, >>） | 07 | exposition → type-it → code-runner(演示) |
| 09 | cin-cout-combo | 输入→处理→输出 | 完整交互 | 组合 cin/cout 写完整交互程序 | 0（组合） | 08 | exposition → type-it → code-runner(可编辑) |
| 10 | practice-io | 输入输出练习 | 巩固 06-09 | 综合练习 cin/cout 编程 | 0 | 06-09 | type-it → code-runner → multiple-choice |

### 子阶段 2c：比较与条件

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 11 | comparison-six | 六种比较符号 | > < >= <= == != | 一次认全六种比较运算符 | 1（比较符族） | p01-06 | exposition → concept-cards → multiple-choice x2 |
| 12 | comparison-result | 比较的结果是布尔值 | 5>3 就是 true | 比较表达式产生 true/false | 1（比较表达式） | 11 | exposition → type-it → multiple-choice |
| 13 | if-intro | if——如果……就…… | 简单条件分支 | 最简单的 if 语法 | 1（if 语法） | 12 | exposition → type-it → match-blocks |
| 14 | if-braces | if 的花括号 | 花括号划定范围 | {} 的作用域概念，没有{}只控制一行 | 1（作用域概念） | 13 | exposition → multiple-choice → type-it |
| 15 | if-else | 二选一：if-else | 两种情况 | else 分支的用法 | 1（else） | 14 | exposition → type-it → match-blocks → multiple-choice |
| 16 | equals-vs-assign | == 和 = 是不一样的 | 最危险的混淆 | `if (x = 5)` 不会报错但逻辑错了 | 0（纠错） | 15 | exposition → multiple-choice x2 → type-it |
| 17 | practice-conditions | 条件判断练习 | 巩固 11-16 | 综合练习 if/else 分支 | 0 | 11-16 | type-it → code-runner → multiple-choice x2 |
| 18 | practice-comprehensive | 综合练习：运算符+I/O+条件 | 全子阶段综合 | 融合算术、I/O、if/else 的综合编程 | 0 | 全部 | code-runner x2 → multiple-choice x2 |

### 关键教学要求
- **03（int 除法陷阱）**：必须让学习者亲自感受 5/2=2 的意外
- **06,08 的 code-runner 仅为演示**（editable=false），09 才开放 editable=true
- **16（== vs =）** 是必杀纠错课，选择题的 distractors 必须模仿真实初学者的思维
- 本阶段后期（09 开始）引入可编辑 code-runner，设 expectedOutput 做自动比对
