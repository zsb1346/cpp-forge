# C++ 零基础→高阶课程体系设计 v2

> 设计依据：forge-course-team（CURRICULUM.md / PEDAGOGY.md / LESSON_AUTHORING.md / REVIEW_RUBRIC.md）
> 参考范围：6 Tier / 85 课体系，按微拆分方法论重新设计
> 目标：真正零基础 → 能读懂代码、能写简单程序 → 深入理解 C++ 设计哲学

---

## 核心设计原则（forge-course-team 方法论）

1. **一课一个核心新概念**——如果一个概念可拆为 2 个独立心智模型，就拆成 2 课
2. **识别→模仿→辨析→回忆→产出**——每课内部遵循这个递进
3. **零基础安全**——前 30 课完全不用 code-runner（认知负荷），直到学习者能稳定读懂语法
4. **概念密度控制**——每课新术语 ≤ 3 个；新符号族 ≤ 1 个
5. **错误暴露前置**——每课至少设一个「新手最容易错」的辨析点
6. **微拆分法则**——凡是 textbook 一课，拆成 2-5 节 Forge 微课

---

## 整体架构

| 阶段 | 名称 | 目标 | 微课数 |
|------|------|------|--------|
| 0 | 破冰：认识代码 | 建立"代码是可读的符号指令"的基本认知 | 4 |
| 1 | 基础积木（上）：值、变量、类型 | 能读懂并写出变量声明/赋值 | 12 |
| 2 | 基础积木（下）：运算符、I/O、流程 | 能写带输入输出和分支的简单程序 | 16 |
| 3 | 第一个分水岭：循环与数组 | 理解重复执行和数据集合 | 10 |
| 4 | 模块化思维：字符串与函数 | 理解代码组织和复用 | 14 |
| 5 | C++ 特色：引用、重载、多文件 | 进入 C++ 特有的工程世界 | 12 |
| 6 | 调试思维 | 不会调试等于不会编程 | 6 |
| 7 | OOP 地基：类与对象 | 理解面向对象的核心思想 | 16 |
| 8 | OOP 深入：继承与多态 | OOP 的灵魂 | 14 |
| 9 | C++ 黑话入门：const/static/友元/重载 | C++ 特有的语法武器 | 14 |
| 10 | 内存战争：动态内存与 RAII | 第四个分水岭 | 16 |
| 11 | 现代 C++ 起点：移动语义 | C++11 最重要的发明 | 8 |
| 12 | 泛型编程：模板基础 | 从具体类型到通用代码 | 12 |
| 13 | STL 容器：不再自己造轮子 | 第五个分水岭 | 14 |
| 14 | STL 算法：用算法替代手写循环 | 写出地道 C++ | 12 |
| 15 | 现代 C++ 特性实战 | C++17/20 日常利器 | 10 |
| 16 | 内存与你：编译/链接/内存布局 | 理解你的程序怎么变成机器码 | 14 |
| 17 | 智能指针与类型安全 | 现代 C++ 的资源管理 | 10 |
| 18 | 并发入门：线程与同步 | 第六个分水岭 | 12 |
| 19 | 工程化：设计模式/构建/测试 | 写真正能用的代码 | 14 |
| 20 | C++ 深度黑话 | 理解 C++ 为什么这么设计 | 16 |

**总计：约 230 节微课**（每课 6-12 分钟，总学时约 30-40 小时）

---

## 阶段 0：破冰——认识代码（4 课）

> 真正零基础连"代码长什么样"都不知道。先解决这个问题。

| # | 课程 ID | 标题 | 一句话目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|-----------|-------|-----------|------|
| 0.1 | what-is-program | 程序是什么 | 建立「程序=指令序列」的心智模型，用生活类比 | 1 | exposition → concept-cards | 无 |
| 0.2 | code-is-text | 代码是写给谁看的 | 理解代码同时写给人和机器读，区分源代码 vs 可执行文件 | 1 | exposition → multiple-choice | 0.1 |
| 0.3 | symbols-you-see | 代码里有哪些符号 | 认全常见符号：() {} ; = + - * / < > " ' | 1（符号族） | exposition → concept-cards → type-it | 0.2 |
| 0.4 | first-glance | 看一眼完整程序 | 把前三课串起来——看一个完整的 C++ 程序长什么样，不要求写 | 0（综合） | exposition → multiple-choice | 0.3 |

---

## 阶段 1：基础积木（上）——值、变量、类型（12 课）

> 原「变量与类型」1 课 → 拆为 12 课。每个概念独立建立。

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 1.1 | literal-values | 值——程序里的具体数据 | 认识字面量：42 / 3.14 / 'A' / "hi" / true | 1（值/字面量） | exposition → concept-cards → multiple-choice | 0.4 |
| 1.2 | naming-values | 给值取个名字 | 「变量名是值的标签」——先不写代码，只理解命名 | 1（名字概念） | exposition → multiple-choice | 1.1 |
| 1.3 | int-type | int——只能装整数的盒子 | int 的含义，认识整数类型 | 1（int） | exposition → concept-cards → type-it | 1.2 |
| 1.4 | double-type | double——能装小数的盒子 | double 的含义，与 int 的直观区别 | 1（double） | exposition → concept-cards → multiple-choice | 1.3 |
| 1.5 | char-type | char——装单个字符 | 字符用单引号，一个 char 只装一个字符 | 1（char） | exposition → concept-cards → multiple-choice → type-it | 1.4 |
| 1.6 | bool-type | bool——真与假 | 认识 true/false 两个布尔值 | 1（bool） | exposition → concept-cards → multiple-choice | 1.5 |
| 1.7 | declare-variable | 声明一个变量 | 学会 `int x;` 的语法，理解"声明=创造变量" | 1（声明语法） | exposition → type-it → match-blocks | 1.3 |
| 1.8 | assign-value | 把值放进变量 | 学会 `x = 5;` 的含义和写法 | 1（赋值语法） | exposition → type-it → multiple-choice | 1.7 |
| 1.9 | equals-is-assign | = 不是数学等于 | 破除最大误解——=是"把右边放进左边" | 1（赋值语义） | exposition → concept-cards → multiple-choice → type-it | 1.8 |
| 1.10 | semicolon | 分号 ; 为什么存在 | 分号是语句结束符，不是装饰 | 1（;） | exposition → multiple-choice → type-it | 1.9 |
| 1.11 | declare-and-init | 合二为一：声明+初始化 | `int x = 5;` = 声明+赋值在同一行 | 1（初始化语法） | exposition → type-it → match-blocks → fill-in | 1.9, 1.10 |
| 1.12 | type-mismatch | 类型不匹配会怎样 | int 装小数会截断，bool 不能装文字 | 0（纠错） | exposition → multiple-choice x2 → type-it | 1.11 |

### 🔑 教学要点
- **1.2 为什么先学"名字"再学"类型"**：零基础者容易把 `int score` 理解为一个叫做"int score"的东西。先建立"名字"概念，再说明"每个盒子有类型规定"
- **1.9 是第 1 阶段最重要一课**：`=` 的误解是初学者最顽固的错误。用盒子类比、选择题反复辨析
- **1.12 是零挫败课**：不让学习者写复杂代码，只做判断——类型混用会怎样？答对了就建立直觉

---

## 阶段 2：基础积木（下）——运算符、I/O、流程（16 课）

> 原「运算符」「条件语句」「输入输出」3 课 → 拆为 16 课。

### 子阶段 2a：算术运算符（4 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 2.1 | arithmetic-plus-minus | + 和 - | 加法减法运算，表达式产生新值 | 2（运算符、表达式） | exposition → type-it → multiple-choice | 1.11 |
| 2.2 | multiply-divide-mod | * / % | 乘法除法取模，% 是「整除取余」 | 3（* / %） | exposition → concept-cards → type-it | 2.1 |
| 2.3 | operator-precedence | 先算谁再算谁 | 乘除优先于加减，括号改变顺序 | 1（优先级） | exposition → multiple-choice → type-it → fill-in | 2.2 |
| 2.4 | integer-division-trap | int ÷ int 的陷阱 | `5/2` 等于 2 不是 2.5——整型除法的截断 | 1（截断） | exposition → multiple-choice → type-it | 2.2 |

### 子阶段 2b：输入输出（4 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 2.5 | cout-basics | 让程序说话：cout | 学会输出到屏幕，<< 的方向 | 2（cout, <<） | exposition → type-it → code-runner(演示) | 1.11 |
| 2.6 | cout-multiple | 输出多个东西 | 连续用 << 输出文字+变量+换行 | 1（链式<<） | exposition → type-it → fill-in | 2.5 |
| 2.7 | cin-basics | 让程序听：cin | 学会读入，>> 的方向 | 2（cin, >>） | exposition → type-it → code-runner(演示) | 2.6 |
| 2.8 | cin-and-cout | 输入→处理→输出 | 组合 cin/cout 写完整交互 | 0（组合） | exposition → type-it → code-runner | 2.7 |

### 子阶段 2c：比较与条件（8 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 2.9 | comparison-six | 六种比较符号 | > < >= <= == != 一次认全 | 1（比较符族） | exposition → concept-cards → multiple-choice x2 | 1.6 |
| 2.10 | comparison-result | 比较的结果是布尔值 | `5 > 3` 就是 true，`2 == 3` 就是 false | 1（比较表达式） | exposition → type-it → multiple-choice | 2.9 |
| 2.11 | if-intro | if——如果……就…… | 最简单的 if 语法：if (条件) 做某事 | 1（if 语法） | exposition → type-it → match-blocks | 2.10 |
| 2.12 | if-braces | if 的花括号 | 花括号划定范围，没有花括号只控制下一行 | 1（作用域概念） | exposition → multiple-choice → type-it | 2.11 |
| 2.13 | if-else | 二选一：if-else | 两种情况时用 else | 1（else） | exposition → type-it → match-blocks → multiple-choice | 2.12 |
| 2.14 | if-else-chain | 多选一：if-else if-else | 三种以上情况 | 1（链式if） | exposition → type-it → fill-in | 2.13 |
| 2.15 | equals-vs-assign | == 和 = 是不一样的 | `if (x = 5)` 不会报错但逻辑错了 | 0（纠错） | exposition → multiple-choice x2 → type-it | 2.13, 1.9 |
| 2.16 | switch-intro | switch——多路分支 | switch 的语法结构和 break | 1（switch） | exposition → concept-cards → type-it → match-blocks | 2.14 |

### 🔑 教学要点
- **2.4 int 除法陷阱**：新手第一次遇到 `int x = 5/2;` 发现 x=2 时会很困惑。必须单独一课讲清楚
- **2.15 是必杀课**：`x = 5` vs `x == 5` 的混淆能坑人数年。专门设一课用选择题反复辨析
- **code-runner 首次出现**：2.5 和 2.7 仅作为演示（不可编辑），2.8 开始可编辑但设 expectedOutput

---

## 阶段 3：第一个分水岭——循环与数组（10 课）

> 原「循环」「数组」4 课 → 拆为 10 课。

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 3.1 | why-loops | 为什么要循环 | 用"输出 1 到 100"的复制粘贴灾难引出循环的必要性 | 1（循环动机） | exposition → multiple-choice | 2.13 |
| 3.2 | while-basics | while——重复直到不满足 | while 语法：条件为 true 就一直重复 | 2（while, 循环体） | exposition → type-it → code-runner | 3.1 |
| 3.3 | while-counter | 用 while 数数 | 计数循环模式：初值→条件→更新 | 1（计数模式） | exposition → type-it → fill-in → code-runner | 3.2 |
| 3.4 | infinite-loop | 死循环——最恐怖的 bug | 死循环是什么、怎么避免、怎么中断 | 0（安全） | exposition → multiple-choice → code-runner(演示) | 3.3 |
| 3.5 | for-basics | for——更紧凑的循环 | for 的三段式：初始化；条件；更新 | 1（for 语法） | exposition → concept-cards → type-it → match-blocks | 3.3 |
| 3.6 | for-vs-while | 什么时候用 for，什么时候用 while | 知道次数的用 for，不知道的用 while | 0（辨析） | exposition → multiple-choice → type-it | 3.5 |
| 3.7 | do-while | do-while——至少执行一次 | do-while 的语法和 while 的区别 | 1（do-while） | exposition → type-it → multiple-choice | 3.5 |
| 3.8 | array-concept | 数组是什么 | 数组是"一排同类型的格子" | 2（数组声明、元素概念） | exposition → concept-cards → multiple-choice | 1.3 |
| 3.9 | array-index | 用下标访问数组 | 下标从 0 开始，用 [n] 读写 | 1（下标语法） | exposition → type-it → multiple-choice → fill-in | 3.8 |
| 3.10 | loop-and-array | 用循环遍历数组 | for 循环 i 从 0 到 N-1 访问每个元素 | 0（组合） | exposition → type-it → fill-in → code-runner | 3.9, 3.5 |

### 🔑 教学要点
- **3.1 为何循环动机课**：没有动机直接学 while 语法，学习者不知道"为什么需要这个"。先让他们感受到复制粘贴 100 行的痛苦
- **3.4 死循环单独一课**：99% 初学者都写过死循环。与其遇到了再慌，不如专门认识它
- **3.9 数组下标单独一课**："第 1 个元素在 0 号位置"这个反直觉的事实值得一整课

---

## 阶段 4：模块化思维——字符串与函数（14 课）

### 子阶段 4a：字符串（4 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 4.1 | string-initialize | string——声明和赋值 | #include <string>，std::string 类型 | 1（string 类型） | exposition → type-it → code-runner | 1.11 |
| 4.2 | string-concat | 拼接字符串 | + 对字符串是拼接不是加法 | 1（运算符重载直觉） | exposition → type-it → multiple-choice | 4.1 |
| 4.3 | string-length-index | string 的长度和字符 | .size() 和 [下标] 访问字符 | 2（成员函数、.size） | exposition → concept-cards → type-it | 4.2, 3.9 |
| 4.4 | string-input | 读入字符串 | cin >> string 遇到空格会停，getline 读取整行 | 1（getline） | exposition → type-it → multiple-choice → code-runner | 4.3, 2.7 |

### 子阶段 4b：函数基础（7 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 4.5 | why-functions | 为什么要用函数 | 对比"没有函数的重复代码"vs"有函数的干净代码" | 1（抽象动机） | exposition → multiple-choice | 3.5 |
| 4.6 | function-definition | 定义一个函数 | 返回值类型 + 函数名 + () + {} | 1（定义语法） | exposition → concept-cards → type-it | 4.5 |
| 4.7 | function-call | 调用函数 | 函数名() 代表执行它 | 1（调用语法） | exposition → type-it → match-blocks → code-runner | 4.6 |
| 4.8 | function-return | return——返回值 | 函数可以算出一个结果还给你 | 1（return） | exposition → concept-cards → type-it → fill-in | 4.7 |
| 4.9 | void-function | void——不返回值的函数 | 有些函数只做事不还结果 | 1（void） | exposition → concept-cards → type-it | 4.8 |
| 4.10 | function-parameters | 参数——让函数更灵活 | 函数可以通过参数接收外部数据 | 1（参数概念） | exposition → type-it → multiple-choice → fill-in | 4.9 |
| 4.11 | multiple-parameters | 多个参数 | 一个函数可以有多个参数，用逗号分隔 | 0（扩展） | exposition → type-it → fill-in → code-runner | 4.10 |

### 子阶段 4c：作用域（3 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 4.12 | what-is-scope | 作用域——变量在哪里有效 | {} 划定变量的"活动范围" | 1（作用域） | exposition → concept-cards → multiple-choice | 4.9 |
| 4.13 | local-vs-global | 局部变量 vs 全局变量 | 函数内 vs 函数外声明的变量 | 1（全局变量） | exposition → type-it → multiple-choice | 4.12 |
| 4.14 | scope-nesting | 嵌套作用域 | 内层可以访问外层，反过来不行 | 1（嵌套规则） | exposition → type-it → multiple-choice → fill-in | 4.13 |

### 🔑 教学要点
- **4.1 string 类型**：在讲完数组之后讲 string。因为 string 本质上就是字符数组，但更安全
- **4.5 函数的动机**：和 3.1（循环的动机）一样，先制造痛点再给解药
- **4.12-4.14 作用域**：这是「看不见的规则」，初学者经常踩坑。用 type-it + 可视化描述建立直觉

---

## 阶段 5：C++ 特色——引用、重载、多文件（12 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 5.1 | pointer-motivation | 什么是指针——为什么要地址 | 引出"直接操作变量 vs 知道它在哪"的区别 | 1（地址动机） | exposition → concept-cards | 3.9（数组已有地址概念） |
| 5.2 | address-of | & 运算符——取地址 | `&x` 拿到 x 在内存中的地址 | 1（&） | exposition → type-it → multiple-choice | 5.1 |
| 5.3 | pointer-variable | 指针变量 | `int* p = &x;`——指针存的是地址 | 2（*声明指针） | exposition → concept-cards → type-it → match-blocks | 5.2 |
| 5.4 | dereference | * 解引用——从地址找值 | `*p`——"帮我把 p 指向的那个值拿出来" | 1（*解引用） | exposition → type-it → multiple-choice → fill-in | 5.3 |
| 5.5 | star-is-two-things | * 的两种含义 | 声明时（int* p）vs 使用时（*p）不是同一个 * | 0（辨析） | exposition → concept-cards → multiple-choice x2 | 5.4 |
| 5.6 | nullptr | 空指针——不指向任何东西 | 用 nullptr 表示"指针当前没目标" | 1（nullptr） | exposition → type-it → multiple-choice | 5.5 |
| 5.7 | reference-intro | 引用——变量的另一个名字 | `int& r = x;`——引用就是别名 | 1（引用） | exposition → concept-cards → type-it → multiple-choice | 5.5 |
| 5.8 | ref-vs-ptr | 引用 vs 指针的区别 | 引用不能 null、不能改指、用起来像值 | 0（辨析） | exposition → multiple-choice → type-it | 5.7 |
| 5.9 | pass-by-value | 值传递——函数收到的是副本 | 函数参数默认是拷贝，改了不影响外面 | 1（值传递） | exposition → code-runner → multiple-choice | 4.10 |
| 5.10 | pass-by-reference | 引用传递——函数直接操作原变量 | 用引用做参数可以不拷贝 | 1（引用参数） | exposition → type-it → multiple-choice → code-runner | 5.9, 5.7 |
| 5.11 | function-overload | 函数重载——同名不同参 | 函数名相同参数不同=C++ 区分它们 | 1（重载） | exposition → multiple-choice → type-it → fill-in | 4.10 |
| 5.12 | default-arguments | 默认参数——不传就用默认值 | 参数可以有默认值，从右到左依次缺省 | 1（默认参数） | exposition → type-it → multiple-choice → fill-in | 5.11 |

### 🔑 教学要点
- **5.1-5.6 指针拆为 6 课**：指针是第三个分水岭，必须极度耐心。每个子概念（地址概念、&、指针变量、解引用、*二义性、nullptr）各占一课
- **5.5 是必杀课**：`*` 在声明和表达式中含义不同——这是 C++ 初学者最大的语法困惑之一
- **5.10 引用传递**：这是写高效函数的第一步。紧接在值传递之后形成对比

---

## 阶段 6：调试思维（6 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 6.1 | what-is-debugging | 调试是什么 | 调试 = 观察程序运行时内部状态 | 1（调试概念） | exposition → multiple-choice | 4.11 |
| 6.2 | reading-errors | 读懂编译错误 | 编译器报错的常见模式：没加分号、类型不匹配、未声明 | 0（技能） | exposition → multiple-choice(给错误信息选原因) | 前全部 |
| 6.3 | print-debugging | 用 cout 调试 | 在关键位置打印变量值观察变化 | 0（技能） | exposition → type-it → code-runner | 6.1 |
| 6.4 | breakpoint-concept | 断点——让程序停下来给你看 | 断点的概念、单步执行、观察变量 | 1（调试工具概念） | exposition → concept-cards | 6.3 |
| 6.5 | step-over-step-into | 单步跳过 vs 单步进入 | step over 不进入函数，step into 进入函数 | 0（技能） | exposition → multiple-choice | 6.4 |
| 6.6 | watch-variables | 观察窗口 | 程序暂停时查看所有变量的当前值 | 0（技能） | exposition → multiple-choice | 6.5 |

### 🔑 教学要点
- 不要求 / 推荐代码运行器做调试模拟（太复杂），用 exposition + 截图 + 选择题建立认知
- 重点是建立「调试不是丢脸的事，是所有程序员的日常」的心态
- 6.2 特别重要——很多初学者被编译错误吓跑，教他们读懂错误是最好的信心建立

---

## 阶段 7：OOP 地基——类与对象（16 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 7.1 | why-class | 为什么要 class——把数据和操作打包 | 从"分开的变量+函数"到"打包在一起" | 1（封装动机） | exposition → multiple-choice | 4.11 |
| 7.2 | define-class | 定义一个类 | class + 名字 + {} + ; 的基本语法 | 2（class, 成员） | exposition → concept-cards → type-it | 7.1 |
| 7.3 | create-object | 创建对象 | 用类像类型一样声明变量 | 1（对象/实例） | exposition → type-it → multiple-choice | 7.2 |
| 7.4 | member-access | 访问成员——用 . | `obj.member`——点号访问对象的成员 | 1（.） | exposition → type-it → fill-in | 7.3 |
| 7.5 | public-vs-private | public 和 private——谁能碰 | public 外部可见，private 只有内部能碰 | 2（public, private） | exposition → concept-cards → multiple-choice → type-it | 7.4 |
| 7.6 | member-functions | 成员函数——属于对象的函数 | 类里面的函数可以操作类的数据 | 1（成员函数） | exposition → type-it → fill-in | 7.5 |
| 7.7 | struct-vs-class | struct——public 默认的类 | struct 和 class 几乎一样，只有默认访问权限不同 | 0（辨析） | exposition → multiple-choice | 7.6 |
| 7.8 | constructor-intro | 构造函数——对象创建时自动执行 | 构造函数的名字和类名相同、无返回值 | 1（构造函数） | exposition → concept-cards → type-it → match-blocks | 7.6 |
| 7.9 | constructor-overload | 多个构造函数 | 构造函数可以重载，支持不同的创建方式 | 0（扩展） | exposition → type-it → multiple-choice → fill-in | 7.8 |
| 7.10 | constructor-init-list | 初始化列表——成员初始化的正确方式 | 在函数体之前用 : member(val) 初始化 | 1（初始化列表） | exposition → type-it → multiple-choice | 7.9 |
| 7.11 | initialization-order | 成员初始化顺序 | 初始化顺序按声明顺序不是列表顺序 | 0（陷阱） | exposition → multiple-choice | 7.10 |
| 7.12 | destructor-intro | 析构函数——对象销毁时自动执行 | ~类名()，资源释放的地方 | 1（析构函数） | exposition → concept-cards → type-it | 7.8 |
| 7.13 | this-pointer | this——指向对象自己的指针 | 每个成员函数里都能用 this，指向当前对象 | 1（this） | exposition → type-it → multiple-choice | 7.6 |
| 7.14 | static-members | static——属于类而不是对象的成员 | 静态成员被所有对象共享 | 1（static 成员） | exposition → concept-cards → type-it → multiple-choice | 7.6 |
| 7.15 | const-member-functions | const 成员函数——保证不修改 | 函数声明后加 const 表示不改变对象状态 | 1（const 成员函数） | exposition → multiple-choice → type-it | 7.6 |
| 7.16 | class-separation | 类的声明与定义分离 | .h 放声明，.cpp 放实现 | 1（分离） | exposition → type-it → match-blocks | 7.15 |

### 🔑 教学要点
- **7.1 OOP 动机课**：和循环、函数一样，先制造痛点再引入 class
- **7.10-7.11 初始化列表**：这是 C++ 特有的、跟其他 OOP 语言不同的机制
- **7.15 const 成员函数**：第一次遇到 const 在不同位置的用法，为后面的"const 的 6 种含义"做铺垫

---

## 阶段 8：OOP 深入——继承与多态（14 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 8.1 | why-inheritance | 为什么要继承——共享公共部分 | "多个类有相同的东西，抽出来放一起" | 1（继承动机） | exposition → multiple-choice | 7.6 |
| 8.2 | inheritance-basics | 继承的基本语法 | `class B : public A {};` B 继承 A | 1（继承语法） | exposition → type-it → match-blocks | 8.1 |
| 8.3 | protected-access | protected——给子类但不给外部 | protected 在 public/private 之间的权限 | 1（protected） | exposition → concept-cards → multiple-choice | 8.2 |
| 8.4 | inheritance-access | 三种继承方式 | public/protected/private 继承对访问权限的影响 | 0（扩展） | exposition → multiple-choice | 8.3 |
| 8.5 | construction-chain | 构造函数的调用链 | 子类构造先调用父类构造，从最基类开始 | 1（构造链） | exposition → type-it → multiple-choice | 8.4, 7.8 |
| 8.6 | why-polymorphism | 为什么要多态 | "同一个操作在不同对象上表现出不同行为" | 1（多态动机） | exposition → multiple-choice | 8.5 |
| 8.7 | virtual-function | virtual——打开多态的开关 | 父类函数加 virtual，子类 override | 2（virtual, override） | exposition → concept-cards → type-it | 8.6 |
| 8.8 | override-specifier | override——确保你写对了 | C++11 override 关键字让编译器检查是否真的覆盖了 | 1（override） | exposition → type-it → multiple-choice | 8.7 |
| 8.9 | polymorphism-in-action | 多态如何工作 | 用父类指针/引用调用子类的覆盖函数 | 0（运用） | exposition → code-runner → multiple-choice | 8.8 |
| 8.10 | virtual-destructor | 虚析构函数——安全销毁 | 有虚函数时析构函数也要 virtual | 1（虚析构） | exposition → multiple-choice → type-it | 8.9, 7.12 |
| 8.11 | abstract-class | 纯虚函数——只能当爸爸不能当儿子 | `= 0` 让类变成抽象类不能实例化 | 1（纯虚函数） | exposition → concept-cards → type-it → multiple-choice | 8.10 |
| 8.12 | interface-design | 接口设计——用抽象类定义规范 | 抽象类=契约，子类必须实现所有纯虚函数 | 0（设计） | exposition → multiple-choice → fill-in | 8.11 |
| 8.13 | object-slicing | 对象切割——值传递会切掉子类部分 | 用父类值接收子类对象，子类部分被切掉 | 1（切片） | exposition → code-runner → multiple-choice | 8.9 |
| 8.14 | diamond-problem | 菱形继承——多继承的陷阱 | 多继承可能导致的二义性，虚继承的简介 | 1（概念） | exposition → concept-cards | 8.12 |

### 🔑 教学要点
- **8.10 虚析构函数**：这是一个极其常见的内存泄漏源头——很多人写了多态但没写虚析构
- **8.13 对象切割**：C++ 特有的坑，值传递和引用传递在这个点上差异巨大
- **8.14 菱形继承**：只做概念介绍，不要求写代码。目的是遇到时能识别

---

## 阶段 9：C++ 黑话入门——const/static/友元/重载（14 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 9.1 | const-value | const 值——不变的变量 | `const int x = 5;`——声明后不能改 | 1（const） | exposition → type-it → multiple-choice | 1.8 |
| 9.2 | const-ptr | const 指针——指向不变还是值不变 | `const int*` vs `int* const` 的区别 | 2（位置含义） | exposition → concept-cards → multiple-choice → type-it | 5.5 |
| 9.3 | const-ref | const 引用——高效又安全 | `const int&`——不拷贝且保证不修改 | 1 | exposition → type-it → multiple-choice | 9.2, 5.8 |
| 9.4 | const-methods | const 成员函数回顾与深化 | const 函数内不能修改成员变量 | 0（深化） | exposition → multiple-choice → type-it | 7.15, 9.1 |
| 9.5 | const-overload | const 重载——常对象调用常版本 | 常对象只能调用 const 成员函数 | 0（活用） | exposition → multiple-choice | 9.4 |
| 9.6 | static-local | static 局部变量——函数退出不销毁 | 局部变量加 static 延长生命周期到程序结束 | 1（static 局部） | exposition → type-it → multiple-choice | 1.8 |
| 9.7 | static-in-class | 复习 static 成员 | 回顾 7.14，加深理解 | 0（巩固） | exposition → multiple-choice → fill-in | 7.14, 9.6 |
| 9.8 | friend-function | 友元函数——让外部函数访问私有成员 | friend 声明在类的内部，授予外部访问权限 | 1（friend） | exposition → concept-cards → type-it | 7.5 |
| 9.9 | friend-class | 友元类——整个类都是朋友 | 类 A 声明 friend class B，B 可以访问 A 的私有成员 | 0（扩展） | exposition → multiple-choice | 9.8 |
| 9.10 | why-operator-overload | 为什么要重载运算符 | 让自定义类型用起来像内置类型（如 string 的 +） | 1（动机） | exposition → multiple-choice | 7.6 |
| 9.11 | operator-overload-syntax | 运算符重载语法 | `返回值 operator符号(参数)` 的格式 | 1（重载语法） | exposition → concept-cards → type-it → match-blocks | 9.10 |
| 9.12 | overload-arithmetic | 重载算术运算符 | 以 + 为例实现两个对象的加法 | 0（实践） | exposition → type-it → code-runner | 9.11 |
| 9.13 | overload-stream | 重载 << 和 >> | 让 cout/cin 认识自定义类型 | 0（实践） | exposition → type-it → code-runner | 9.12 |
| 9.14 | overload-notes | 运算符重载的注意事项 | 不能发明新运算符、不能改变优先级、某些不能重载 | 0（规则） | exposition → multiple-choice | 9.13 |

### 🔑 教学要点
- **9.1-9.5 const 的 5 课**：const 在不同位置的含义是 C++ 黑话——值 const、指针 const、const 引用、const 成员函数、const 重载。每个位置都是新概念
- **9.12-9.14 运算符重载**：这是 C++ 特有的能力，Java/Rust 都没有。让学习者感受 C++ 的灵活性

---

## 阶段 10：内存战争——动态内存与 RAII（16 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 10.1 | stack-vs-heap-intro | 栈和堆——两种内存 | 栈自动分配释放，堆手动分配释放 | 2（栈、堆概念） | exposition → concept-cards | 5.2 |
| 10.2 | new-delete | new 和 delete——在堆上分配 | `int* p = new int; delete p;` | 2（new, delete） | exposition → concept-cards → type-it | 10.1 |
| 10.3 | new-array-delete-array | new[] 和 delete[]——数组在堆上 | `int* arr = new int[10]; delete[] arr;` | 1（数组new/delete） | exposition → type-it → fill-in | 10.2 |
| 10.4 | memory-leak | 内存泄漏——只 new 不 delete | 分配了没释放，程序占用的内存越来越多 | 0（危害） | exposition → multiple-choice → code-runner(演示) | 10.3 |
| 10.5 | dangling-pointer | 悬空指针——指针指向已释放的内存 | delete 后指针还在，但指向的数据没了 | 1（悬空指针） | exposition → multiple-choice → type-it | 10.4 |
| 10.6 | double-delete | 重复 delete——两次释放同一块内存 | 删除已删除的指针是未定义行为 | 0（陷阱） | exposition → multiple-choice | 10.5 |
| 10.7 | deep-vs-shallow | 浅拷贝 vs 深拷贝——拷贝指针 vs 拷贝内容 | 默认拷贝构造只拷贝指针（浅），两个对象指向同一个内存 | 2（浅拷贝、深拷贝） | exposition → concept-cards → multiple-choice | 7.8 |
| 10.8 | copy-constructor | 拷贝构造函数——用同类对象初始化 | `ClassName(const ClassName& other)` | 1（拷贝构造） | exposition → type-it → match-blocks → fill-in | 10.7 |
| 10.9 | copy-assignment | 拷贝赋值运算符 | `operator=(const ClassName& other)` | 1（拷贝赋值） | exposition → type-it → match-blocks | 10.8 |
| 10.10 | rule-of-three | Rule of Three——三者需同时出现 | 析构、拷贝构造、拷贝赋值——如果需要一个，就需要三个 | 1（Rule of Three） | exposition → concept-cards → multiple-choice | 10.9 |
| 10.11 | RAII-concept | RAII——资源获取即初始化 | 资源在构造函数里获取，在析构函数里释放 | 1（RAII） | exposition → concept-cards → multiple-choice | 10.10 |
| 10.12 | RAII-in-action | RAII 实战——用类管理内存 | 写一个简单的 RAII 类，构造 new，析构 delete | 0（实践） | exposition → type-it → code-runner | 10.11 |
| 10.13 | raii-not-just-memory | RAII 不仅仅是内存 | 文件、锁、数据库连接都能用 RAII 管理 | 0（扩展） | exposition → multiple-choice | 10.12 |
| 10.14 | move-semantic-motivation | 为什么要移动语义——拷贝太贵了 | 大对象拷贝的代价，引出"偷走资源而非复制" | 1（动机） | exposition → multiple-choice | 10.13 |
| 10.15 | rvalue-reference | 右值引用 && | && 绑定到即将销毁的临时对象 | 2（右值、&&） | exposition → concept-cards → multiple-choice | 10.14 |
| 10.16 | move-constructor | 移动构造函数 | `ClassName(ClassName&& other)`——偷走 other 的资源 | 1（移动构造） | exposition → type-it → fill-in | 10.15 |

### 🔑 教学要点
- **10.1-10.6 动态内存 6 课**：堆/栈概念、new/delete 语法、new[]/delete[]、内存泄漏、悬空指针、双重删除——每个都是独立的概念和陷阱
- **10.10 Rule of Three**：这是 C++ 核心黑话。必须命名它，让学习者知道"这是有名字的规则"
- **10.11 RAII 概念**：C++ 最重要的黑话。不在基础阶段讲，而是在学完动态内存、拷贝构造之后——那时学习者才能真正理解 RAII 为什么重要

---

## 阶段 11：现代 C++ 起点——移动语义（8 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 11.1 | lvalue-vs-rvalue | 左值 vs 右值——能取地址 vs 不能 | 左值有地址/名字，右值是临时值 | 2（左值、右值） | exposition → concept-cards → multiple-choice | 10.15 |
| 11.2 | std-move | std::move——强制转成右值 | std::move 不移动任何东西，只是把左值变成右值引用 | 1（std::move） | exposition → multiple-choice → type-it | 11.1 |
| 11.3 | move-assignment | 移动赋值运算符 | `operator=(ClassName&& other)` | 1（移动赋值） | exposition → type-it → fill-in | 10.16 |
| 11.4 | rule-of-five | Rule of Five——三变五 | 析构+拷贝构造+拷贝赋值+移动构造+移动赋值 | 0（扩展） | exposition → concept-cards → multiple-choice | 11.3, 10.10 |
| 11.5 | perfect-forwarding-intro | 完美转发的动机 | 模板函数想把参数原样转发给另一个函数，但丢失了左右值信息 | 1（动机） | exposition → multiple-choice | 11.4 |
| 11.6 | forwarding-reference | 转发引用 | `T&&` 在模板中不是右值引用而是转发引用 | 1（转发引用） | exposition → concept-cards → multiple-choice | 11.5 |
| 11.7 | std-forward | std::forward——按原样转发 | 有了转发引用后，用 forward 保持左右值属性 | 1（std::forward） | exposition → type-it | 11.6 |
| 11.8 | reference-collapsing | 引用折叠 | `T& &` → `T&` 的规则（&+&=&, &&+&=&, &+&&=&, &&+&&=&&） | 1（折叠规则） | exposition → concept-cards → multiple-choice | 11.7 |

### 🔑 教学要点
- 这个阶段开始偏难。每个微课的新概念数控制得少，但理解难度高
- **11.1 左值/右值**：这是理解后面一切的基础。单独一课，多做选择题
- **11.8 引用折叠**：可以认为是 C++ 模板最难掌握的点之一。只要求理解规则，不要求熟练运用

---

## 阶段 12：泛型编程——模板基础（12 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 12.1 | why-template | 为什么要模板——告别重载重复 | 多个类型相同逻辑的函数，用模板生成 | 1（泛型动机） | exposition → multiple-choice | 5.11 |
| 12.2 | function-template | 写一个函数模板 | `template<typename T> T max(T a, T b)` | 2（template, typename） | exposition → concept-cards → type-it | 12.1 |
| 12.3 | template-instantiation | 模板实例化——编译器帮你生成代码 | 编译器根据调用自动生成 T 替换后的版本 | 1（实例化） | exposition → multiple-choice | 12.2 |
| 12.4 | template-type-deduction | 类型推导——编译器猜 T 是什么 | 调用时可以不写 <int>，编译器会推导 | 1（推导） | exposition → type-it → multiple-choice | 12.3 |
| 12.5 | class-template | 类模板——类型参数化的类 | `template<typename T> class Box { T value; };` | 1（类模板语法） | exposition → concept-cards → type-it | 12.4 |
| 12.6 | template-member-functions | 类模板的成员函数 | 在类外定义时也要带 template 声明 | 0（语法） | exposition → type-it → fill-in | 12.5 |
| 12.7 | template-multiple-params | 多模板参数 | `template<typename T, typename U>`——两个类型参数 | 0（扩展） | exposition → type-it → multiple-choice | 12.6 |
| 12.8 | non-type-template-params | 非类型模板参数 | `template<int N>`——传值不是传类型 | 1（非类型参数） | exposition → type-it → multiple-choice | 12.7 |
| 12.9 | template-specialization | 模板特化——给特定类型开小灶 | 对特定类型提供不同的实现 | 1（特化） | exposition → concept-cards → type-it | 12.8 |
| 12.10 | template-partial-specialization | 偏特化——部分参数特化 | 只特化部分模板参数，主要针对类模板 | 1（偏特化） | exposition → multiple-choice | 12.9 |
| 12.11 | typename-vs-class | typename 和 class 在模板里的区别 | 完全等价，但 typename 在嵌套依赖类型时必须用 | 0（语法细节） | exposition → multiple-choice | 12.10 |
| 12.12 | template-separate-compilation | 模板的编译模型 | 为什么模板通常写 .h 不写 .cpp——实例化时机问题 | 1（编译模型） | exposition → multiple-choice | 12.11 |

### 🔑 教学要点
- **12.12 模板编译模型**：几乎所有 C++ 开发者都被这个问题坑过。解释清楚为什么模板要写在头文件里

---

## 阶段 13：STL 容器（14 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 13.1 | what-is-stl | STL 是什么 | 标准模板库：容器+算法+迭代器 | 1（STL 概念） | exposition → concept-cards | 12.5 |
| 13.2 | vector-intro | vector——动态数组 | `push_back`、`size`、`[]` | 2（vector, push_back） | exposition → type-it → code-runner | 13.1 |
| 13.3 | vector-operations | vector 常用操作 | pop_back, insert, erase, clear | 0（扩展） | exposition → type-it → fill-in | 13.2 |
| 13.4 | vector-capacity | vector 的容量管理 | size vs capacity，自动扩容机制 | 1（capacity） | exposition → multiple-choice → code-runner(演示) | 13.3 |
| 13.5 | list-intro | list——双向链表 | 插入删除比 vector 快，但不能用 [] | 1（list） | exposition → type-it | 13.2 |
| 13.6 | deque-intro | deque——双端队列 | 头尾插入删除都快 | 1（deque） | exposition → type-it → multiple-choice | 13.5 |
| 13.7 | container-choose | 什么时候用什么容器 | vector/list/deque 的取舍 | 0（策略） | exposition → multiple-choice | 13.6 |
| 13.8 | stack-queue | stack 和 queue——容器适配器 | stack（后进先出）/queue（先进先出） | 2（适配器概念） | exposition → concept-cards → type-it → code-runner | 13.7, 3.5 |
| 13.9 | priority-queue | priority_queue——优先队列 | 最大/最小元素总是在最前面 | 1（priority_queue） | exposition → type-it → code-runner | 13.8 |
| 13.10 | set-intro | set——不重复的有序集合 | 自动排序、不重复、查找快 | 1（set） | exposition → type-it → code-runner | 13.7 |
| 13.11 | map-intro | map——键值对字典 | `map<string, int>`——用名字查值 | 2（map, 键值对） | exposition → concept-cards → type-it → code-runner | 13.10 |
| 13.12 | unordered-set-map | unordered_set/map——更快但不排序 | 哈希表实现，查找 O(1) | 2（哈希概念） | exposition → multiple-choice → type-it | 13.11 |
| 13.13 | set-vs-unordered | set 和 unordered_set 的取舍 | 需要排序→set，追求速度→unordered | 0（策略） | exposition → multiple-choice | 13.12 |
| 13.14 | container-summary | 容器全家福 | 总结所有容器及适用场景 | 0（总结） | exposition → multiple-choice(场景→选容器) | 13.13 |

### 🔑 教学要点
- **13.1 STL 概念课**：先建立 STL 的整体心智模型
- **13.7 选容器策略**：这是实践中最常面对的问题。用选择题场景反复操练
- **13.14 容器总结**：学完所有容器后需要一张"决策树"

---

## 阶段 14：STL 算法（12 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 14.1 | what-is-iterator | 迭代器——容器和算法的桥梁 | 像指针一样遍历容器 | 2（迭代器、begin/end） | exposition → concept-cards → type-it | 13.2 |
| 14.2 | iterator-types | 迭代器分类 | 输入/输出/前向/双向/随机访问 | 1（分类） | exposition → multiple-choice | 14.1 |
| 14.3 | why-not-loop | 为什么不用手写循环 | 算法比手写循环更清晰、更安全 | 1（算法动机） | exposition → multiple-choice | 14.2 |
| 14.4 | sort | sort——排序 | `std::sort(vec.begin(), vec.end())` | 1（sort） | exposition → type-it → code-runner | 14.3 |
| 14.5 | find-find-if | find 和 find_if——查找 | 找第一个符合条件的元素 | 1（find） | exposition → type-it → code-runner | 14.4 |
| 14.6 | count-count-if | count——计数 | 统计有多少个符合条件的元素 | 0（扩展） | exposition → type-it → fill-in | 14.5 |
| 14.7 | lambda-intro | Lambda 表达式——就地写函数 | `[ ](int x){ return x > 0; }` 的语法 | 2（lambda, 捕获） | exposition → concept-cards → type-it | 14.5 |
| 14.8 | lambda-capture | 捕获——外部变量怎么传进 lambda | [=] 值捕获、[&] 引用捕获、[x] 指定捕获 | 1（捕获模式） | exposition → type-it → multiple-choice → fill-in | 14.7 |
| 14.9 | for-each | for_each——对每个元素做操作 | 替代 for 循环做遍历操作 | 0（扩展） | exposition → type-it → code-runner | 14.8 |
| 14.10 | transform | transform——映射转换 | 对一个序列每个元素做变换，生成新序列 | 1（transform） | exposition → type-it → code-runner | 14.9 |
| 14.11 | copy-remove-if | copy 和 remove_if——复制和删除 | copy(源起, 源终, 目标起)、remove_if 的条件删除 | 2（copy, remove_if） | exposition → type-it → fill-in | 14.10 |
| 14.12 | algorithm-pipeline | 算法流水线——链式操作 | sort + unique + erase 的去重模式 | 0（组合） | exposition → type-it → code-runner | 14.11 |

### 🔑 教学要点
- **14.1 迭代器概念课**：迭代器是 STL 的胶水，不单独学的话永远只是"会背 push_back"
- **14.7 Lambda**：现代 C++ 最实用的特性。放在算法语境里学，因为 lambda 最常见的用途就是传给算法

---

## 阶段 15：现代 C++ 特性实战（10 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 15.1 | auto | auto——让编译器帮你写类型 | 变量声明用 auto，编译器自动推导 | 1（auto） | exposition → type-it → multiple-choice | 前全部 |
| 15.2 | decltype | decltype——表达式的类型 | 拿到表达式的类型，用于模板/auto 帮不了的地方 | 1（decltype） | exposition → type-it → multiple-choice | 15.1 |
| 15.3 | range-for | 范围 for——遍历容器最简单方式 | `for (int x : vec)` 不需要迭代器 | 1（范围 for） | exposition → type-it → code-runner | 15.1, 13.2 |
| 15.4 | structured-binding | 结构化绑定——拆开 pair/tuple | `auto [key, value] : myMap` | 1（结构化绑定） | exposition → type-it → fill-in | 15.3 |
| 15.5 | constexpr | constexpr——编译期求值 | 编译期就知道的值，比 const 更强 | 1（constexpr） | exposition → concept-cards → type-it | 15.1 |
| 15.6 | static-assert | static_assert——编译期断言 | 条件不满足时编译失败 | 1（static_assert） | exposition → type-it → multiple-choice | 15.5 |
| 15.7 | nullptr-over-null | 为什么用 nullptr 而不是 NULL | nullptr 是类型安全的，NULL 是整数 0 | 0（技巧） | exposition → multiple-choice | 5.6 |
| 15.8 | optional | optional——可能有值也可能没有 | 替代指针/哨兵值表示"可能有值" | 2（optional, std::nullopt） | exposition → type-it → code-runner | 10.1 |
| 15.9 | variant | variant——多种类型中的一个 | 类型安全的 union | 1（variant） | exposition → type-it → code-runner | 15.8 |
| 15.10 | any | any——可以装任何类型 | 极少数场景需要 | 1（any） | exposition → multiple-choice | 15.9 |

---

## 阶段 16：内存与你——编译/链接/内存布局（14 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 16.1 | compilation-steps | 编译四步：预处理→编译→汇编→链接 | 你的代码怎么变成可执行文件 | 4（预处理/编译/汇编/链接） | exposition → concept-cards → multiple-choice | 2.0 |
| 16.2 | preprocessor | 预处理器——#define/#include/#ifndef | 编译前文本替换 | 1（预处理器） | exposition → concept-cards → type-it | 16.1 |
| 16.3 | header-guards | 头文件卫士——防止重复包含 | `#ifndef #define #endif` | 1（header guard） | exposition → type-it → multiple-choice | 16.2 |
| 16.4 | include-works | #include 到底干了什么 | 头文件内容"粘贴"到源文件 | 0（机制） | exposition → multiple-choice | 16.3 |
| 16.5 | declaration-vs-definition | 声明 vs 定义——承诺 vs 实现 | 声明告诉编译器"有这个东西"，定义告诉"是什么" | 2（声明、定义） | exposition → concept-cards → multiple-choice | 16.4 |
| 16.6 | one-definition-rule | ODR——C++ 最关键的规则 | 每个实体只能在一个翻译单元中定义一次 | 1（ODR） | exposition → multiple-choice | 16.5 |
| 16.7 | translation-unit | 翻译单元——一个 .cpp 及其包含的头文件 | 编译器每次处理一个翻译单元 | 1（翻译单元） | exposition → concept-cards | 16.6 |
| 16.8 | linking-errors | 链接错误——常见问题 | LNK2019/LNK2005 等常见链接错误的含义 | 0（技能） | exposition → multiple-choice | 16.7 |
| 16.9 | memory-layout | 程序的内存布局 | 代码段/数据段/BSS/堆/栈在内存中怎么排列 | 1（段概念） | exposition → concept-cards | 16.1 |
| 16.10 | stack-memory | 栈——函数调用的幕后 | 每次函数调用在栈上分配帧 | 0（深化） | exposition → concept-cards | 16.9 |
| 16.11 | heap-memory | 堆——动态分配的区域 | 堆在栈下面，从低地址向高地址生长 | 0（深化） | exposition → multiple-choice | 16.10 |
| 16.12 | struct-padding | 结构体对齐和 padding | struct 的大小不是成员大小的简单相加 | 1（对齐） | exposition → multiple-choice → code-runner(演示) | 16.9 |
| 16.13 | bitwise-operators | 位运算 | & | ^ ~ << >> 的运算规则 | 1（位运算） | exposition → concept-cards → type-it → fill-in | 2.2 |
| 16.14 | bit-fields | 位域——精确控制 bits | struct 里的 : n 语法 | 1（位域） | exposition → type-it → multiple-choice | 16.13 |

---

## 阶段 17：智能指针与类型安全（10 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 17.1 | unique-ptr-motivation | 为什么要 unique_ptr | 裸指针的各种问题，RAII 解决 | 1（动机） | exposition → multiple-choice | 10.11 |
| 17.2 | unique-ptr-basics | unique_ptr——独占所有权 | `std::unique_ptr<int> p = std::make_unique<int>(5);` | 2（unique_ptr, make_unique） | exposition → type-it → code-runner | 17.1 |
| 17.3 | unique-ptr-transfer | 转移所有权——std::move | unique_ptr 不能拷贝，只能移动 | 0（应用） | exposition → type-it → fill-in | 17.2, 11.2 |
| 17.4 | unique-ptr-in-container | unique_ptr 在容器中 | vector<unique_ptr<T>>——多态对象的容器 | 0（应用） | exposition → type-it → code-runner | 17.3 |
| 17.5 | shared-ptr-intro | shared_ptr——共享所有权 | 引用计数，最后一个 shared_ptr 析构时释放 | 2（shared_ptr, 引用计数） | exposition → concept-cards → type-it → code-runner | 17.4 |
| 17.6 | weak-ptr | weak_ptr——打破循环引用 | 弱引用不增加引用计数，解决循环引用问题 | 2（weak_ptr, 循环引用） | exposition → concept-cards → multiple-choice | 17.5 |
| 17.7 | make-shared | make_shared 的好处 | 一次分配 + 异常安全 | 0（技巧） | exposition → multiple-choice | 17.6 |
| 17.8 | smart-ptr-choose | 什么时候用哪种智能指针 | 所有权的决策树：独占/共享/观察 | 0（策略） | exposition → multiple-choice(场景→选指针) | 17.7 |
| 17.9 | static-cast | static_cast——编译期类型转换 | 安全的、可预期的类型转换 | 1（static_cast） | exposition → type-it → multiple-choice | 前全部 |
| 17.10 | dynamic-cast-const-cast | dynamic_cast 和 const_cast | 运行时类型检查、去掉 const | 2（dynamic_cast, const_cast） | exposition → multiple-choice → type-it | 17.9, 8.9 |
| 17.11 | reinterpret-cast | reinterpret_cast——按位重新解释 | 最危险的转换 | 1（reinterpret_cast） | exposition → multiple-choice | 17.10 |
| 17.12 | c-style-cast-problem | C 风格强转有什么问题 | (int) 可以做一切，但可能隐藏错误 | 0（警示） | exposition → multiple-choice | 17.11 |

---

## 阶段 18：并发入门（12 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 18.1 | why-concurrency | 为什么要并发 | 同时做多件事——提高利用率，响应速度 | 1（动机） | exposition → multiple-choice | 前全部 |
| 18.2 | thread-basics | std::thread——创建一个线程 | `std::thread t(function); t.join();` | 2（thread, join） | exposition → type-it → code-runner | 18.1 |
| 18.3 | thread-detach | detach——让线程独立 | detach 后线程在后台跑 | 1（detach） | exposition → type-it → multiple-choice | 18.2 |
| 18.4 | data-race | 数据竞争——两个线程同时写一个变量 | 未定义行为，结果不可预知 | 1（数据竞争） | exposition → concept-cards → multiple-choice | 18.3 |
| 18.5 | mutex-intro | mutex——互斥锁 | 一次只有一个线程能拿到锁 | 2（mutex, lock/unlock） | exposition → concept-cards → type-it → code-runner | 18.4 |
| 18.6 | lock-guard | lock_guard——RAII 锁 | 构造加锁，析构解锁，绝不忘记 unlock | 1（lock_guard） | exposition → type-it → multiple-choice | 18.5, 10.11 |
| 18.7 | unique-lock | unique_lock——比 lock_guard 灵活 | 可以延迟加锁、提前解锁 | 1（unique_lock） | exposition → type-it → multiple-choice | 18.6 |
| 18.8 | deadlock | 死锁——互相等待 | 线程 A 等 B 释放锁，B 等 A 释放锁 | 1（死锁） | exposition → concept-cards → multiple-choice | 18.7 |
| 18.9 | deadlock-avoidance | 避免死锁 | 固定加锁顺序、使用 std::lock | 0（策略） | exposition → multiple-choice | 18.8 |
| 18.10 | condition-variable | 条件变量——等待某个条件满足 | wait/notify_one/notify_all | 1（条件变量） | exposition → type-it → code-runner | 18.9 |
| 18.11 | async-future | async 和 future——更高层的并发 | `std::async` 比手写 thread 更安全 | 2（async, future） | exposition → type-it → code-runner | 18.10 |
| 18.12 | atomic-intro | atomic——无锁的原子操作 | `std::atomic<int>` 保证读取/写入不被打断 | 1（atomic） | exposition → type-it → code-runner | 18.11 |

---

## 阶段 19：工程化——设计模式/构建/测试（14 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 19.1 | singleton-pattern | 单例模式——全局唯一的实例 | 一个类只能创建一个对象 | 2（单例、static 局部） | exposition → type-it → code-runner | 7.6 |
| 19.2 | singleton-thread-safe | 线程安全的单例 | 双检查锁、C++11 的跨平台方案 | 0（深化） | exposition → multiple-choice | 19.1, 18.5 |
| 19.3 | factory-pattern | 工厂模式——按需创建对象 | 把对象的创建逻辑封装起来 | 1（工厂） | exposition → type-it → code-runner | 8.11 |
| 19.4 | observer-pattern | 观察者模式——通知机制 | 一个对象变化，多个观察者得到通知 | 1（观察者） | exposition → type-it → code-runner | 19.3 |
| 19.5 | pimpl-idiom | Pimpl——减少编译依赖 | 把实现藏在指针后面 | 1（Pimpl） | exposition → type-it | 5.5, 16.5 |
| 19.6 | CRTP | CRTP——静态多态 | `class B : public A<B>` 的奇技 | 1（CRTP） | exposition → type-it → code-runner | 12.5 |
| 19.7 | SFINAE-concept | SFINAE——匹配失败不算错 | 模板替换失败时跳过而不是报错 | 1（SFINAE） | exposition → concept-cards → multiple-choice | 12.2 |
| 19.8 | enable-if | enable_if——按条件启用 | 只有条件满足时，模板才存在 | 1（enable_if） | exposition → type-it | 19.7 |
| 19.9 | concepts-cpp20 | Concepts(C++20)——SFINAE 的优雅替代 | `template<typename T> requires Integral<T>` | 2（requires, concept 语法） | exposition → type-it → code-runner | 19.8 |
| 19.10 | cmake-basics | CMake 入门 | CMakeLists.txt 的基本写法 | 1（CMake） | exposition → type-it | 16.7 |
| 19.11 | cmake-targets | CMake 的目标和库 | add_executable / add_library / target_link_libraries | 0（扩展） | exposition → type-it | 19.10 |
| 19.12 | why-testing | 为什么需要测试 | 没有测试的代码等于没写完 | 1（测试动机） | exposition → multiple-choice | 19.11 |
| 19.13 | gtest-basics | Google Test 入门 | TEST / EXPECT_EQ / ASSERT_EQ | 1（gtest） | exposition → type-it → code-runner | 19.12 |
| 19.14 | test-organization | 测试组织 | 单元测试 vs 集成测试 vs 测试覆盖率 | 0（策略） | exposition → multiple-choice | 19.13 |

---

## 阶段 20：C++ 深度黑话（16 课）

| # | 课程 ID | 标题 | 目的 | 新概念 | 推荐 Block | 前置 |
|---|---------|------|------|-------|-----------|------|
| 20.1 | adl | ADL——参数依赖查找 | 编译器根据函数参数所在的命名空间查找函数 | 1（ADL） | exposition → multiple-choice | 16.7 |
| 20.2 | rvo-nrvo | RVO/NRVO——返回值优化 | 编译器省略临时对象的复制/移动 | 2（RVO, NRVO） | exposition → multiple-choice | 11.4 |
| 20.3 | copy-elision | 拷贝消除——C++17 保证 | C++17 在某些场景下保证不拷贝 | 0（深化） | exposition → multiple-choice | 20.2 |
| 20.4 | type-erasure | Type Erasure——std::function 的原理 | 用模板和虚函数隐藏具体类型 | 1（Type Erasure） | exposition → concept-cards → multiple-choice | 8.7, 12.2 |
| 20.5 | function-implementation | std::function 的实现思路 | 小对象优化 + 虚函数擦除类型 | 0（原理） | exposition → multiple-choice | 20.4 |
| 20.6 | any-implementation | std::any 的实现思路 | 和 function 类似但存值不存调用 | 0（扩展） | exposition → multiple-choice | 20.5 |
| 20.7 | variadic-templates | 变参模板——接受任意数量参数 | `template<typename... Args>` 语法 | 2（变参、参数包） | exposition → concept-cards → type-it | 12.7 |
| 20.8 | fold-expressions | 折叠表达式——C++17 的变参操作 | (... + args) 折叠参数包 | 1（折叠） | exposition → type-it → fill-in | 20.7 |
| 20.9 | memory-order-intro | 内存序——为什么需要 | 编译器/CPU 可能重排指令，影响并发 | 1（内存序概念） | exposition → concept-cards | 18.12 |
| 20.10 | memory-order-modes | 内存序模式 | relaxed/acquire/release/acq_rel/seq_cst | 1（模式） | exposition → multiple-choice | 20.9 |
| 20.11 | rtti-cost | RTTI 和 dynamic_cast 的成本 | typeid 和 dynamic_cast 依赖运行时类型信息，有性能开销 | 1（RTTI） | exposition → multiple-choice | 8.9 |
| 20.12 | undefined-behavior | 未定义行为大全 | 越界/空指针解引用/除零/悬空引用/数据竞争 | 1（UB 概念） | exposition → concept-cards → multiple-choice | 前全部 |
| 20.13 | ub-is-not-error | UB 不是错误——它是"编译器可以做任何事" | 理解 UB 的核心：编译器可以不保证结果 | 0（哲学） | exposition → multiple-choice | 20.12 |
| 20.14 | zero-overhead | C++ 的核心哲学——零开销原则 | 你不用为没有用的东西付钱 | 1（零开销原则） | exposition → multiple-choice | 前全部 |
| 20.15 | you-pay-only | 用多少付多少 | 抽象不是免费的，但 C++ 让你只为你用的部分付钱 | 0（深化） | exposition → multiple-choice | 20.14 |
| 20.16 | cpp-philosophy-review | C++ 设计哲学回顾 | 总结整个旅程：C++ 给了你什么，你付了什么 | 0（总结） | exposition | 全部 |

---

## 汇总

| 阶段 | 名称 | 课数 | 累积 | 分水岭 |
|------|------|------|------|--------|
| 0 | 破冰：认识代码 | 4 | 4 | — |
| 1 | 基础积木（上）：值、变量、类型 | 12 | 16 | — |
| 2 | 基础积木（下）：运算符、I/O、流程 | 16 | 32 | — |
| 3 | 第一个分水岭：循环与数组 | 10 | 42 | ✅ |
| 4 | 模块化思维：字符串与函数 | 14 | 56 | ✅ |
| 5 | C++ 特色：引用、重载、多文件 | 12 | 68 | ✅ 第三个分水岭（指针） |
| 6 | 调试思维 | 6 | 74 | — |
| 7 | OOP 地基：类与对象 | 16 | 90 | ✅ |
| 8 | OOP 深入：继承与多态 | 14 | 104 | ✅ |
| 9 | C++ 黑话入门：const/static/友元/重载 | 14 | 118 | — |
| 10 | 内存战争：动态内存与 RAII | 16 | 134 | ✅ 第四个分水岭 |
| 11 | 现代 C++ 起点：移动语义 | 8 | 142 | — |
| 12 | 泛型编程：模板基础 | 12 | 154 | — |
| 13 | STL 容器 | 14 | 168 | ✅ 第五个分水岭 |
| 14 | STL 算法 | 12 | 180 | — |
| 15 | 现代 C++ 特性实战 | 10 | 190 | — |
| 16 | 内存与你：编译/链接/内存布局 | 14 | 204 | — |
| 17 | 智能指针与类型安全 | 12 | 216 | — |
| 18 | 并发入门 | 12 | 228 | ✅ 第六个分水岭 |
| 19 | 工程化：设计模式/构建/测试 | 14 | 242 | — |
| 20 | C++ 深度黑话 | 16 | 258 | — |

### 关键设计决策说明

**为什么是 258 课不是 85 课？**
85 课是按传统教材粒度（一节课=一个 topic），但 forge-course-team 方法论要求**一课一个核心新概念**。例如：
- 原「变量与类型」1 课 → 拆为 12 课（值、名字、int、double、char、bool、声明、赋值、=语义、分号、初始化、类型错误）
- 原「指针基础」→ 拆为 6 课（地址动机、&、指针变量、解引用、*二义性、nullptr）
- 原「RAII」→ 放在动态内存的 16 课之后，因为不理解内存管理就无法理解 RAII 的价值

**六个分水岭的专门设计：**
每个分水岭（循环、函数、指针、OOP、动态内存、STL、并发）前都设置了动机课（为什么需要这个），后设置了巩固课（练习/纠错/综合）。

**零基础心智模型建构：**
- 阶段 0（4 课）：连代码长什么样都没见过的人先用概念卡建立认知
- 前 30 课不用 code-runner（可编辑），前 14 课甚至不用 fill-in
- 每个易混淆的点都用专门一课或一题守卫

---

> 下一步：确认本设计方案。确认后，我将按阶段生成 `src/courses/*.ts` 课程文件。
