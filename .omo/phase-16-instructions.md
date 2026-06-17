# 阶段 16：内存与你——编译/链接/内存布局

## 课程列表（共 17 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | compilation-steps | 编译四步骤 | 预处理→编译→汇编→链接 | 代码到可执行文件的完整流程 | 4（四步骤概念） | p05-14 | exposition → concept-cards → multiple-choice |
| 02 | preprocessor | 预处理器 | #define/#include/#ifndef | 编译前文本替换，文件包含 | 1（预处理器） | 01 | exposition → concept-cards → type-it |
| 03 | header-guards | 头文件卫士 | 防止重复包含 | `#ifndef #define #endif` 的 header guard | 1（header guard） | 02 | exposition → type-it → multiple-choice |
| 04 | how-include-works | #include 到底在干嘛 | 粘贴头文件内容 | #include = 把头文件内容粘贴到此 | 0（机制） | 03 | exposition → multiple-choice |
| 05 | decl-vs-defn | 声明 vs 定义 | 承诺 vs 实现 | 声明告诉"有这个东西"，定义告诉"是什么" | 2（声明、定义） | 04 | exposition → concept-cards → multiple-choice |
| 06 | one-definition-rule | ODR——C++ 最关键的规则 | 一个定义规则 | 每个实体只能在一个翻译单元中定义一次 | 1（ODR） | 05 | exposition → multiple-choice |
| 07 | translation-unit | 翻译单元 | .cpp + 所含头文件 | 编译器每次处理一个翻译单元 | 1（翻译单元） | 06 | exposition → concept-cards |
| 08 | practice-compilation | 编译与链接练习 | 巩固 01-07 | 编译流程、声明定义辨析 | 0 | 01-07 | multiple-choice x3 → match-blocks → fill-in |
| 09 | linking-errors | 链接错误解读 | LNK2019/LNK2005 | 常见链接错误的含义和解决 | 0（技能） | 08 | exposition → multiple-choice(错误→选原因)x3 |
| 10 | memory-layout | 程序内存布局 | 代码段/数据段/BSS/堆/栈 | 程序在内存中各区域排列 | 1（段概念） | 01 | exposition → concept-cards |
| 11 | stack-deep | 栈——函数调用幕后 | 每次调用分配帧 | 每次函数调用在栈上分配帧 | 0（深化） | 10 | exposition → concept-cards |
| 12 | heap-deep | 堆——动态分配区域 | 手动分配释放 | 堆在栈下面，从低到高生长 | 0（深化） | 11 | exposition → multiple-choice |
| 13 | struct-padding | 结构体对齐和 padding | sizeof 不是你以为的 | struct 大小不是成员大小简单相加 | 1（对齐） | 10 | exposition → multiple-choice → code-runner(演示) |
| 14 | practice-memory-layout | 内存布局练习 | 巩固 10-13 | 内存区域、struct sizeof 练习 | 0 | 10-13 | multiple-choice x3 → fill-in → type-it |
| 15 | bitwise-operators | 位运算 | & | ^ ~ << >> | 按位与或异或取反移位 | 1（位运算族） | p02-02 | exposition → concept-cards → type-it → fill-in |
| 16 | bit-fields | 位域 | 精确控制 bits | struct 里的 : n 语法 | 1（位域） | 15 | exposition → type-it → multiple-choice |
| 17 | phase16-review | 阶段 16 综合复习 | 编译/链接/内存总复习 | 全面回顾 01-16 | 0 | 全部 | multiple-choice x4 → concept-cards → fill-in |

### 关键教学要求
- **01（编译四步骤）**：整个阶段的地基，用概念卡建立四阶段心智模型
- **06（ODR）**：C++ 核心黑话，命名并彻底讲清
- **10-12（内存布局）**：程序内存的完整视图
