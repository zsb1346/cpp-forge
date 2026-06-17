# 阶段 06：调试思维

## 课程列表（共 7 课，含 1 节练习课）

| # | ID | 标题 | 副标题 | 目的 | 新概念 | 前置 | 推荐 Block |
|---|-----|------|--------|------|-------|------|-----------|
| 01 | what-is-debugging | 调试是什么 | 观察程序内部状态 | 调试=运行中观察程序内部状态 | 1（调试概念） | p04 全部 | exposition → multiple-choice |
| 02 | reading-errors | 读懂编译错误 | 编译器在说什么 | 编译器报错的常见模式解读 | 0（技能） | p04 全部 | exposition → multiple-choice(给错误信息选原因) x3 |
| 03 | print-debugging | 用 cout 调试 | 最简调试法 | 关键位置打印变量值观察 | 0（技能） | 01 | exposition → type-it → code-runner |
| 04 | breakpoint-concept | 断点——让程序停下来 | 暂停给你看 | 断点概念、单步执行、观察变量 | 1（调试工具） | 03 | exposition → concept-cards |
| 05 | step-over-into | 跳过 vs 进入函数 | 单步的技巧 | step over 不进入函数，step into 进入 | 0（技能） | 04 | exposition → multiple-choice |
| 06 | watch-variables | 观察窗口 | 暂停时看所有变量 | 调试时查看所有变量的当前值 | 0（技能） | 05 | exposition → multiple-choice |
| 07 | practice-debugging | 调试综合练习 | 巩固 01-06 | 给含 bug 的代码，练习排查 | 0 | 01-06 | code-runner(有bug) → multiple-choice(选bug原因) → exposition(修正) |

### 关键教学要求
- 本阶段核心是建立"调试是日常，不是丢脸"的心态
- 02（读编译错误）特别重要：很多初学者被编译错误吓跑
- 07 练习课：给一段有 bug 的代码，让学习者通过 reading errors + mental debugging 找出问题
- 本阶段不要求模拟真实调试器，用 exposition + 截图描述 + 选择题建立认知
