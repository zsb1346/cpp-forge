# 阶段 09：C++ 黑话入门——const/static/友元/重载

## 课程列表（共 17 课，含 3 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | const-value | const 值——不变的变量 | 声明后不能改 | `const int x = 5;` 声明常量 | 1（const 值） | p01 全部 | exposition → type-it → multiple-choice |
| 02 | const-ptr | const 指针 | 指向不变还是值不变 | `const int*` vs `int* const` 的区别 | 2（位置含义） | p05 全部 | exposition → concept-cards → multiple-choice → type-it |
| 03 | const-ref | const 引用 | 高效又安全 | `const int&`——不拷贝且保证不修改 | 1（const 引用） | 02, p05-07 | exposition → type-it → multiple-choice |
| 04 | const-methods | const 成员函数回顾 | 深化理解 | const 函数内不能修改成员变量 | 0（深化） | p07-17, 01 | exposition → multiple-choice → type-it |
| 05 | const-overload | const 重载 | 常对象调常版本 | 常对象只能调用 const 成员函数 | 0（活用） | 04 | exposition → multiple-choice |
| 06 | practice-const | const 综合练习 | 巩固 01-05 | const 四种位置的辨析 | 0 | 01-05 | multiple-choice x3 → type-it → concept-cards |
| 07 | static-local | static 局部变量 | 退出函数不销毁 | 局部变量加 static 生命周期到程序结束 | 1（static 局部） | p04 全部 | exposition → type-it → multiple-choice |
| 08 | static-in-class-review | static 成员回顾与深化 | 属于类的成员 | 回顾 p07-16，加深理解 | 0（巩固） | p07-16, 07 | exposition → multiple-choice → fill-in |
| 09 | friend-function | 友元函数 | 外部函数访问私有 | friend 授予外部函数访问私有成员的权限 | 1（friend 函数） | p07-05 | exposition → concept-cards → type-it |
| 10 | friend-class | 友元类 | 整个类都是朋友 | class A 声明 friend class B，B 可访问 A 私有 | 0（扩展） | 09 | exposition → multiple-choice |
| 11 | why-operator-overload | 为什么重载运算符 | 让自定义类型像内置类型 | 让自定义类型支持 + - << >> 等操作 | 1（动机） | p07 全部 | exposition → multiple-choice |
| 12 | op-overload-syntax | 运算符重载语法 | 返回值 operator 符号(参数) | 重载运算符的固定格式 | 1（重载语法） | 11 | exposition → concept-cards → type-it → match-blocks |
| 13 | overload-arithmetic | 重载算术运算符 | 以 + 为例 | 实现两个对象的加法 | 0（实践） | 12 | exposition → type-it → code-runner |
| 14 | overload-stream | 重载 << 和 >> | 让 cout/cin 认识你的类 | 流运算符重载 | 0（实践） | 13 | exposition → type-it → code-runner |
| 15 | overload-rules | 运算符重载注意事项 | 不能新造不能改优先级 | 不能发明新运算符、不能改优先级等限制 | 0（规则） | 14 | exposition → multiple-choice |
| 16 | practice-op-overload | 运算符重载练习 | 巩固 11-15 | 综合练习各类运算符重载 | 0 | 11-15 | type-it → code-runner x2 → multiple-choice |
| 17 | phase9-review | 阶段 9 综合复习 | const/static/friend/op总复习 | 全面回顾 01-16 | 0 | 全部 | multiple-choice x4 → concept-cards → fill-in |

### 关键教学要求
- **01-05（const 五课）**：const 在不同位置的含义是 C++ 核心黑话。值const→指针const→const引用→const成员函数→const重载，每个位置都是新概念
- **09,10（友元）**：C++ 独特的特性，强调"破封装但有时必须"
- **12-15（运算符重载）**：C++ 独有的能力，让学习者感受 C++ 的灵活性
