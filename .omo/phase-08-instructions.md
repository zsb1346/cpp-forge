# 阶段 08：OOP 深入——继承与多态

## 课程列表（共 17 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | why-inheritance | 为什么需要继承 | 共享公共部分 | 多个类有相同逻辑，抽到基类 | 1（继承动机） | p07 全部 | exposition → multiple-choice |
| 02 | inheritance-basics | 继承语法 | class B : public A | `class B : public A {};` B 继承 A | 1（继承语法） | 01 | exposition → type-it → match-blocks |
| 03 | protected-access | protected 访问权限 | 给子类但不给外部 | protected 在 public 和 private 之间 | 1（protected） | 02 | exposition → concept-cards → multiple-choice |
| 04 | inheritance-modes | 三种继承方式 | public/protected/private | 继承方式对权限的影响 | 0（扩展） | 03 | exposition → multiple-choice |
| 05 | construction-chain | 构造函数的调用链 | 从基类开始构造 | 子类构造先调父类构造 | 1（构造链） | 04 | exposition → type-it → multiple-choice |
| 06 | practice-inheritance | 继承基础练习 | 巩固 01-05 | 综合练习继承语法与构造链 | 0 | 01-05 | type-it → code-runner → multiple-choice x2 |
| 07 | why-polymorphism | 为什么需要多态 | 同一操作不同表现 | 不同子类对同一操作不同实现 | 1（多态动机） | 06 | exposition → multiple-choice |
| 08 | virtual-function | virtual 关键字 | 打开多态的开关 | 父类加 virtual，子类 override | 2（virtual, override） | 07 | exposition → concept-cards → type-it |
| 09 | override-specifier | override——确保写对了 | 编译器帮你检查 | C++11 override 确保真的覆盖了父类函数 | 1（override） | 08 | exposition → type-it → multiple-choice |
| 10 | polymorphism-in-action | 多态如何工作 | 父类指针调子类方法 | 父类指针/引用调用子类覆盖函数 | 0（运用） | 09 | exposition → code-runner → multiple-choice |
| 11 | virtual-destructor | 虚析构函数 | 安全销毁 | 有虚函数时析构也必须 virtual | 1（虚析构） | 10 | exposition → multiple-choice → type-it |
| 12 | abstract-class | 纯虚函数与抽象类 | 只能当爸爸 | =0 让类抽象，不能实例化 | 1（纯虚函数） | 11 | exposition → concept-cards → type-it → multiple-choice |
| 13 | interface-design | 接口设计 | 用抽象类定义规范 | 抽象类=契约，子类必须实现所有纯虚函数 | 0（设计） | 12 | exposition → code-runner → multiple-choice |
| 14 | practice-polymorphism | 多态综合练习 | 巩固 07-13 | 综合练习多态的完整运用 | 0 | 07-13 | type-it → code-runner x2 → multiple-choice |
| 15 | object-slicing | 对象切割 | 值传递会切掉子类 | 用父类值接收子类对象会切割 | 1（切片） | 10 | exposition → code-runner → multiple-choice |
| 16 | diamond-problem | 菱形继承 | 多继承的陷阱 | 多继承的二义性及虚继承 | 1（概念了解） | 15 | exposition → concept-cards → multiple-choice |
| 17 | phase8-review | 阶段 8 综合复习 | 继承与多态总复习 | 全面回顾 01-16 | 0 | 全部 | multiple-choice x4 → concept-cards → code-runner |

### 关键教学要求
- **01（继承动机课）**：先展示重复代码再引入继承
- **07（多态动机课）**：先展示没有多态时 if-else 层层判断的问题
- **11（虚析构）**：极其常见的内存泄漏源头，必须单独强调
- **15（对象切割）**：C++ 特有的坑，值传递和引用传递的差异巨大
