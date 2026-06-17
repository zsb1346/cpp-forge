# 阶段 10：内存战争——动态内存与 RAII

## 课程列表（共 20 课，含 4 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | stack-vs-heap | 栈和堆——两种内存 | 自动 vs 手动 | 栈自动分配释放，堆手动分配释放 | 2（栈、堆概念） | p05-02 | exposition → concept-cards |
| 02 | new-delete | new 和 delete——堆上分配 | 手动申请手动释放 | `int* p = new int; delete p;` | 2（new, delete） | 01 | exposition → concept-cards → type-it |
| 03 | new-array-delete-array | new[] 和 delete[] | 数组在堆上 | `int* arr = new int[10]; delete[] arr;` | 1（数组new/delete） | 02 | exposition → type-it → fill-in |
| 04 | memory-leak | 内存泄漏——只 new 不 delete | 内存只借不还 | 分配了没释放，内存越占越多 | 0（危害） | 03 | exposition → multiple-choice → code-runner(演示) |
| 05 | dangling-pointer | 悬空指针——指向已释放 | 指针还在数据没了 | delete 后指针还在但指向数据已释放 | 1（悬空指针） | 04 | exposition → multiple-choice → type-it |
| 06 | double-delete | 重复 delete | 同一内存释放两次 | 删除已删的指针是未定义行为 | 0（陷阱） | 05 | exposition → multiple-choice |
| 07 | practice-dynamic-mem | 动态内存基础练习 | 巩固 01-06 | new/delete 的各类操作练习 | 0 | 01-06 | type-it → multiple-choice x2 → fill-in |
| 08 | deep-vs-shallow | 浅拷贝 vs 深拷贝 | 拷贝指针 vs 拷贝内容 | 默认拷贝构造只拷贝指针（浅） | 2（浅拷贝、深拷贝） | p07-09 | exposition → concept-cards → multiple-choice |
| 09 | copy-constructor | 拷贝构造函数 | 用同类对象初始化 | `ClassName(const ClassName& other)` | 1（拷贝构造） | 08 | exposition → type-it → match-blocks → fill-in |
| 10 | copy-assignment | 拷贝赋值运算符 | = 的拷贝版本 | `operator=(const ClassName& other)` | 1（拷贝赋值） | 09 | exposition → type-it → match-blocks |
| 11 | rule-of-three | Rule of Three | 三者需同时出现 | 析构+拷贝构造+拷贝赋值——需要其一就需要三者 | 1（Rule of Three） | 10 | exposition → concept-cards → multiple-choice |
| 12 | practice-copy | 拷贝语义练习 | 巩固 08-11 | 综合练习深浅拷贝 | 0 | 08-11 | type-it → code-runner → multiple-choice x2 |
| 13 | raii-concept | RAII——资源获取即初始化 | C++ 最重要黑话 | 资源在构造获取，在析构释放 | 1（RAII） | 11 | exposition → concept-cards → multiple-choice |
| 14 | raii-in-action | RAII 实战 | 用类管理内存 | 写 RAII 类，构造 new，析构 delete | 0（实践） | 13 | exposition → type-it → code-runner |
| 15 | raii-beyond-memory | RAII 不限于内存 | 文件、锁、数据库 | 文件/锁/数据库连接都能用 RAII 管理 | 0（扩展） | 14 | exposition → multiple-choice |
| 16 | practice-raii | RAII 综合练习 | 巩固 13-15 | RAII 类的编写与使用 | 0 | 13-15 | type-it → code-runner → multiple-choice |
| 17 | move-motivation | 为什么需要移动语义 | 拷贝太贵了 | 大对象拷贝的代价，"偷"资源而非复制 | 1（动机） | 16 | exposition → multiple-choice |
| 18 | rvalue-reference | 右值引用 && | 绑定到临时对象 | && 绑定到即将销毁的临时对象 | 2（右值、&&） | 17 | exposition → concept-cards → multiple-choice |
| 19 | move-constructor | 移动构造函数 | 偷资源不复制 | `ClassName(ClassName&& other)`——偷走 other 资源 | 1（移动构造） | 18 | exposition → type-it → fill-in |
| 20 | phase10-review | 阶段 10 综合复习 | 动态内存总复习 | 全面回顾 01-19 | 0 | 全部 | multiple-choice x4 → concept-cards → fill-in |

### 关键教学要求
- **01-06（动态内存六课）**：堆栈概念→new/delete→new[]/delete[]→内存泄漏→悬空指针→双重删除，缺一不可
- **11（Rule of Three）**：C++ 核心黑话，必须命名
- **13（RAII 概念）**：C++ 最重要的黑话，放在动态内存之后，这时学习者才能真正理解
