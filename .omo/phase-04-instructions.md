# 阶段 04：模块化思维——字符串与函数

## 课程列表（共 17 课，含 3 节练习课）

### 子阶段 4a：字符串

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | string-init | string——声明和赋值 | 字符串类型入门 | #include <string>，std::string 类型 | 1（string） | p01 全部 | exposition → type-it → code-runner |
| 02 | string-concat | 拼接字符串 | + 不是加是拼 | 字符串的 + 是拼接不是加法 | 1（运算符重载直觉） | 01 | exposition → type-it → multiple-choice |
| 03 | string-index-size | string 的长度和字符 | .size() 和 [ ] | 用 .size() 和 [下标] 操作字符串 | 2（成员函数、.size） | 02, p03-10 | exposition → concept-cards → type-it |
| 04 | string-input | 读入字符串整行 | cin 遇空格停 | cin>> 遇空格停，getline 读整行 | 1（getline） | 03 | exposition → type-it → code-runner |
| 05 | practice-string | 字符串练习 | 巩固 01-04 | 综合练习字符串操作 | 0 | 01-04 | type-it → code-runner → multiple-choice x2 |

### 子阶段 4b：函数

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 06 | why-functions | 为什么需要函数 | 告别代码重复 | 对比无函数的重复代码 vs 有函数的干净代码 | 1（抽象动机） | p03 全部 | exposition → multiple-choice |
| 07 | function-definition | 定义一个函数 | 返回值+名字+() | 返回值类型+函数名+()+\{\} 的语法 | 1（定义语法） | 06 | exposition → concept-cards → type-it |
| 08 | function-call | 函数调用 | 函数名() 执行它 | 调用函数=执行函数体的代码 | 1（调用语法） | 07 | exposition → type-it → match-blocks → code-runner |
| 09 | function-return | return——返回值 | 函数还你一个结果 | 函数可以算出一个结果用 return 返回 | 1（return） | 08 | exposition → concept-cards → type-it → fill-in |
| 10 | void-function | void——不返回值的函数 | 只做事不还结果 | 有些函数执行操作但不返回值 | 1（void） | 09 | exposition → concept-cards → type-it |
| 11 | function-parameters | 参数——让函数更灵活 | 接收外部数据 | 函数通过参数接收调用者传入的数据 | 1（参数概念） | 10 | exposition → type-it → multiple-choice → fill-in |
| 12 | multiple-parameters | 多个参数 | 逗号分隔参数列表 | 一个函数可以有多个参数 | 0（扩展） | 11 | exposition → type-it → fill-in → code-runner |
| 13 | practice-functions | 函数综合练习 | 巩固 06-12 | 综合练习定义和调用函数 | 0 | 06-12 | type-it → code-runner x2 → fill-in |

### 子阶段 4c：作用域

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 14 | what-is-scope | 作用域——变量在哪有效 | {} 划定范围 | \{\} 划定变量的"活动范围" | 1（作用域） | 10 | exposition → concept-cards → multiple-choice |
| 15 | local-vs-global | 局部 vs 全局变量 | 函数内外有别 | 函数内 vs 函数外声明的变量区别 | 1（全局变量） | 14 | exposition → type-it → multiple-choice |
| 16 | scope-nesting | 嵌套作用域 | 内层能看到外层 | 内层可以访问外层变量，外层不能访问内层 | 1（嵌套规则） | 15 | exposition → type-it → multiple-choice → fill-in |
| 17 | practice-scope | 作用域练习 | 巩固 14-16 | 综合练习作用域规则 | 0 | 14-16 | multiple-choice x3 → type-it → fill-in |

### 关键教学要求
- **01（string 类型）**：在数组之后讲 string，因为 string 本质是字符数组但更安全
- **06（函数动机）**：必须先用 exposition 展示"没有函数时代码有多重复"
- **本阶段常规使用 code-runner**，每课至少 1 个 code-runner
