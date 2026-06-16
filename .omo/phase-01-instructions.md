# 阶段 01：基础积木（上）——值、变量、类型

## 课程列表（共 15 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | what-is-value | 什么是"值" | 认识程序里的数据 | 认识字面量：42 / 3.14 / 'A' / "hi" / true | 1（字面量） | p00 全部 | exposition → concept-cards → multiple-choice |
| 02 | what-is-name | 给值取个名字 | 变量名的概念 | 理解"名字是值的标签"，先不写代码 | 1（名字） | 01 | exposition → concept-cards → multiple-choice |
| 03 | int-type | int——整数的盒子 | 认识整数类型 | int 的含义，认识整数类型 | 1（int） | 02 | exposition → concept-cards → type-it |
| 04 | double-type | double——装小数的盒子 | 认识浮点类型 | double 的含义，与 int 的区别 | 1（double） | 03 | exposition → concept-cards → multiple-choice |
| 05 | char-type | char——单个字符 | 认识字符类型 | 字符用单引号，一个 char 装一个字符 | 1（char） | 04 | exposition → concept-cards → type-it |
| 06 | bool-type | bool——真与假 | 认识布尔类型 | 认识 true/false 两个布尔值 | 1（bool） | 05 | exposition → concept-cards → multiple-choice |
| 07 | practice-types | 类型练习课 | 巩固 int/double/char/bool | 综合辨析四种类型 | 0 | 03-06 | multiple-choice x3 → concept-cards |
| 08 | declare-variable | 声明一个变量 | 学会 int x; 的语法 | 声明=创造变量，语法格式 | 1（声明） | 03 | exposition → type-it → match-blocks |
| 09 | assign-value | 把值放进变量 | 学会 x = 5; 的语法 | 赋值=把值存入变量 | 1（赋值） | 08 | exposition → type-it → multiple-choice |
| 10 | equals-is-assign | = 不是数学等于 | 破除最大误解 | =是把右边放进左边，不是等于 | 1（赋值语义） | 09 | exposition → concept-cards → multiple-choice → type-it |
| 11 | semicolon-rule | 分号 ; 为什么存在 | 语句结束符 | 分号是 C++ 每条语句的结束标记 | 1（;） | 10 | exposition → multiple-choice → type-it |
| 12 | declare-and-init | 合二为一：声明+初始化 | 一行搞定 | `int x = 5;` = 声明+赋值在一行 | 1（初始化） | 10,11 | exposition → type-it → match-blocks → fill-in |
| 13 | practice-var-declare | 声明与赋值练习 | 巩固 08-12 | 综合练习声明、赋值、初始化 | 0 | 08-12 | type-it x2 → fill-in → match-blocks |
| 14 | type-mismatch | 类型不匹配会怎样 | 类型错误初体验 | 演示 int 装小数会截断等类型问题 | 0（纠错） | 12 | exposition → multiple-choice x2 |
| 15 | phase1-review | 阶段 1 综合复习 | 值、名字、类型总复习 | 涵盖全部 14 课核心概念 | 0 | 全部 | multiple-choice x4 → match-blocks |

### 关键教学要求
- **10（=不是等于）** 是阶段 1 最重要的一课，必须有 concept-cards 辨析 + 至少 2 道选择题
- **练习课（07/13/15）** 的 multiple-choice 要覆盖前面课程的易混淆点
- 本阶段完全不用 code-runner
- 本阶段 fill-in 只在 12 和 13 课少量出现
