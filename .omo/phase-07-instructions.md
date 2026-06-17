# 阶段 07：OOP 地基——类与对象

## 课程列表（共 20 课，含 4 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | why-class | 为什么需要 class | 把数据和操作打包 | 从"分开变量+函数"到"打包在一起" | 1（封装动机） | p04 全部 | exposition → multiple-choice |
| 02 | define-class | 定义一个类 | class 语法 | class+名字+{}+; 的基本语法 | 2（class，成员） | 01 | exposition → concept-cards → type-it |
| 03 | create-object | 创建对象 | 用类就像用类型 | 用类像类型一样声明变量 | 1（对象/实例） | 02 | exposition → type-it → multiple-choice |
| 04 | member-access | . 号访问成员 | 对象.成员 | obj.member 访问对象的成员变量 | 1（.） | 03 | exposition → type-it → fill-in |
| 05 | public-vs-private | public 和 private | 谁能碰 | public 公开，private 只有内部能碰 | 2（public, private） | 04 | exposition → concept-cards → multiple-choice → type-it |
| 06 | member-functions | 成员函数 | 属于对象的函数 | 类内函数可操作类内数据 | 1（成员函数） | 05 | exposition → type-it → fill-in |
| 07 | practice-class | 类基础练习 | 巩固 01-06 | 综合练习类的声明、对象创建、成员访问 | 0 | 01-06 | type-it → code-runner → multiple-choice x2 |
| 08 | struct-vs-class | struct vs class | 默认权限不同 | struct 默认 public，class 默认 private | 0（辨析） | 06 | exposition → multiple-choice |
| 09 | constructor-intro | 构造函数 | 创建时自动执行 | 构造=创建对象时自动调用的函数 | 1（构造函数） | 06 | exposition → concept-cards → type-it → match-blocks |
| 10 | constructor-overload | 多个构造函数 | 重载构造函数 | 构造函数可以重载，多种创建方式 | 0（扩展） | 09 | exposition → type-it → multiple-choice → fill-in |
| 11 | init-list | 初始化列表 | 在函数体前初始化 | : member(val) 的初始化列表语法 | 1（初始化列表） | 10 | exposition → type-it → multiple-choice |
| 12 | init-order | 初始化顺序 | 按声明顺序 | 初始化按成员声明顺序，不是列表顺序 | 0（陷阱） | 11 | exposition → multiple-choice |
| 13 | destructor-intro | 析构函数 | 销毁时自动执行 | ~类名()，资源释放的地方 | 1（析构函数） | 09 | exposition → concept-cards → type-it |
| 14 | practice-ctor-dtor | 构造与析构练习 | 巩固 09-13 | 综合练习构造/析构函数 | 0 | 09-13 | type-it → code-runner → fill-in → multiple-choice |
| 15 | this-pointer | this——我自己 | 指向当前对象 | 成员函数中 this 指向调用它的对象 | 1（this） | 06 | exposition → type-it → multiple-choice |
| 16 | static-members | static 成员 | 属于类而不是对象 | 静态成员被所有对象共享 | 1（static 成员） | 06 | exposition → concept-cards → type-it → multiple-choice |
| 17 | const-member-func | const 成员函数 | 保证不修改 | 函数后加 const 表示不改变对象状态 | 1（const 成员函数） | 06 | exposition → multiple-choice → type-it |
| 18 | class-separation | 类的声明与实现分离 | .h 放声明 .cpp 放实现 | 类声明放 .h，成员函数实现放 .cpp | 1（分离） | 17, p05-14 | exposition → type-it → match-blocks |
| 19 | practice-oop-fund | OOP 基础综合练习 | 整个阶段 07 | 用完整例子综合练习类的全部特性 | 0 | 全部 | code-runner x2 → multiple-choice x2 → fill-in |
| 20 | phase7-review | 阶段 7 综合复习 | 类与对象总复习 | 全面回顾 01-19 核心概念 | 0 | 全部 | multiple-choice x4 → concept-cards → fill-in |

### 关键教学要求
- **01（OOP 动机课）**：先用 exposition 展示"没有 class 时代码有多散"
- **11,12（初始化列表+顺序）**：C++ 特有的坑，必须单独处理
- **本阶段 code-runner 正常使用**，每课至少 1 个
