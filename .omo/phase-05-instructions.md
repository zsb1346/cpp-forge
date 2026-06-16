# 阶段 05：C++ 特色——指针、引用、重载、多文件

## 课程列表（共 15 课，含 2 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | pointer-motivation | 为什么需要地址 | 变量在内存的位置 | 引出"直接操作变量 vs 知道它在哪"的区别 | 1（地址动机） | p03-10（数组地址概念） | exposition → concept-cards |
| 02 | address-of-operator | & 运算符——取地址 | 拿到变量的地址 | `&x` 拿到 x 在内存中的地址值 | 1（&取地址） | 01 | exposition → type-it → multiple-choice |
| 03 | pointer-variable | 指针变量 | 存地址的变量 | `int* p = &x;`——指针存地址 | 2（*声明指针） | 02 | exposition → concept-cards → type-it → match-blocks |
| 04 | dereference-operator | * 解引用——从地址找值 | 顺着地址找值 | `*p`——取出 p 指向的那个值 | 1（*解引用） | 03 | exposition → type-it → multiple-choice → fill-in |
| 05 | star-two-meanings | * 的两种含义 | 声明 vs 使用不一样 | 声明时(int* p) vs 使用时(*p) 含义不同 | 0（辨析） | 04 | exposition → concept-cards → multiple-choice x2 |
| 06 | nullptr | 空指针——不指向任何东西 | 指针无目标 | 用 nullptr 表示"指针当前没目标" | 1（nullptr） | 05 | exposition → type-it → multiple-choice |
| 07 | reference-intro | 引用——变量的另一个名字 | 就是别名 | `int& r = x;`——引用就是已有的变量换个名字 | 1（引用） | 06 | exposition → concept-cards → type-it → multiple-choice |
| 08 | ref-vs-ptr | 引用 vs 指针的区别 | 不能 null、不能改指 | 引用不能 null、不能改指、用起来像值 | 0（辨析） | 07 | exposition → multiple-choice → type-it |
| 09 | pass-by-value | 值传递——函数收到副本 | 拷贝不修改原值 | 函数参数默认是拷贝，改了不影响外面 | 1（值传递） | p04-11 | exposition → code-runner → multiple-choice |
| 10 | pass-by-reference | 引用传递——操作原变量 | 不拷贝直接操作 | 用引用做参数可以不拷贝、直接修改原变量 | 1（引用参数） | 09,07 | exposition → type-it → multiple-choice → code-runner |
| 11 | function-overload | 函数重载——同名不同参 | 名字相同参数不同 | 函数名相同参数列表不同=C++ 视作不同函数 | 1（重载） | p04-12 | exposition → multiple-choice → type-it → fill-in |
| 12 | default-arguments | 默认参数——不传就用默认值 | 参数可以有默认值 | 参数从右到左依次缺省，不传参时用默认值 | 1（默认参数） | 11 | exposition → type-it → multiple-choice → fill-in |
| 13 | practice-ptr-ref | 指针与引用练习 | 巩固 01-12 | 综合练习指针、引用、参数传递 | 0 | 01-12 | type-it → code-runner → multiple-choice x2 → fill-in |
| 14 | separate-compilation | .h 和 .cpp 分工 | 声明放 .h，实现放 .cpp | 头文件放声明，源文件放实现 | 2（头文件、源文件） | p04 全部 | exposition → type-it → match-blocks |
| 15 | practice-organization | 多文件编程练习 | 巩固 14 | 综合练习拆分多文件 | 0 | 14 | type-it → code-runner → multiple-choice |

### 关键教学要求
- **01-06 指针 6 课**：指针是第三个分水岭，极度耐心
- **05（*二义性）**：必须明确列出两个含义并做辨析选择题
- **08（引用 vs 指针）**：初学者最容易混淆，用对比表格
- **09,10（值传递 vs 引用传递）**：必须用 code-runner 展示实际区别
