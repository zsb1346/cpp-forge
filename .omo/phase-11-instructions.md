# 阶段 11：现代 C++ 起点——移动语义

## 课程列表（共 10 课，含 2 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | lvalue-vs-rvalue | 左值 vs 右值 | 能取地址 vs 不能 | 左值有地址/名字，右值是临时值 | 2（左值、右值） | p10-18 | exposition → concept-cards → multiple-choice |
| 02 | std-move | std::move——转成右值 | 不移动只是转换 | std::move 不移动，只是把左值变成右值引用 | 1（std::move） | 01 | exposition → multiple-choice → type-it |
| 03 | move-assignment | 移动赋值运算符 | = 的移动版本 | `operator=(ClassName&& other)` | 1（移动赋值） | p10-19, 02 | exposition → type-it → fill-in |
| 04 | rule-of-five | Rule of Five——三变五 | 析构+拷贝+移动 | 析构+拷贝构造+拷贝赋值+移动构造+移动赋值 | 0（扩展） | 03, p10-11 | exposition → concept-cards → multiple-choice |
| 05 | practice-move | 移动语义练习 | 巩固 01-04 | 综合练习移动构造/移动赋值 | 0 | 01-04 | type-it → code-runner → multiple-choice x2 |
| 06 | perfect-forwarding-motivation | 完美转发的动机 | 传递时丢失左右值 | 模板函数想转发病参数但丢失了左右值信息 | 1（动机） | 04 | exposition → multiple-choice |
| 07 | forwarding-reference | 转发引用 | T&& 不是右值引用 | `T&&` 在模板中不是右值引用而是转发引用 | 1（转发引用） | 06 | exposition → concept-cards → multiple-choice |
| 08 | std-forward | std::forward——按原样转发 | 保持左右值属性 | 用 forward 保持参数原有的左右值属性 | 1（std::forward） | 07 | exposition → type-it |
| 09 | reference-collapsing | 引用折叠 | &+&=&, &&+&&=&& | 引用折叠的四条规则 | 1（折叠规则） | 08 | exposition → concept-cards → multiple-choice |
| 10 | practice-forwarding | 完美转发练习 | 巩固 06-09 | 综合练习完美转发 | 0 | 06-09 | type-it → code-runner → multiple-choice |

### 关键教学要求
- 本阶段开始偏难，每个微课的新概念数少但理解难度高
- **01（左值/右值）**：理解后面一切的基石，单独一课
- **09（引用折叠）**：C++ 模板最难的点之一，只需理解规则不要求熟练
