# Forge (C++ Adventure) 开发日志

> 项目代号：**Forge** / 对外名称：**C++ Adventure**
> 技术栈：React 18 + TypeScript 5.6 + Vite 6 + Tailwind 3.4 + Zustand + browsercc (WASM C++ 编译器)

---

## v0.12 — 学习端体验：内容分类视觉化 + 章节折叠 + 学习仪表盘（2026-06-17）

> 从作者工具到学习者体验：ContentKind 颜色/图标/徽章三重编码、可折叠章节、学科空状态、学习分析仪表盘。

### 新架构：内容分类引擎（`src/lib/contentTaxonomy.ts`）

- **新增 `CONTENT_KIND_META` 映射表**：每种 ContentKind（lesson/practice/review/challenge）绑定 accent 色、节点圆点色、卡片边框色、徽章样式、Phosphor 图标
- **新增工具函数**：`subjectHasContent()` / `kindHasContent()` / `subjectStats()` / `kindBreakdown()`——全部基于现有课程文件自动推断，不修改课程数据
- **推断引擎不动**：`inferKind()` / `inferKnowledgePoint()` 保持原有自动推导逻辑，零改动 318 节课

### 新 UI：关卡类型视觉体系

- **关卡节点三重编码**：圆点颜色 + 卡片边框色 + 文字徽章（练习/复习/挑战），每类使用对应色系
- **`LessonPreview` 徽章**：非主线课标题旁显示 ContentKind 徽章（练习绿/复习灰/挑战金），主线课不显示
- **`LearningHubPreview` 去 reserved**：首页 4 种内容类型卡片统一使用 `CONTENT_KIND_META` 视觉体系，全部可点击；无课程类型显示「暂无课程」

### 新 UI：章节折叠

- **可折叠章节**：每个章节标题可点击折叠，折叠态呈现紧凑卡片形式（进度条 + 课程摘要 + 双线指示器）
- **条件渲染**：折叠章节 DOM 节点数为 0（`{!isCollapsed && <Content />}`），不靠 CSS 隐藏
- **性能策略**：
  - `contain: content` 隔离每个章节的布局计算
  - `content-visibility: auto` 让屏外章节不渲染
  - 展开动画延迟上限 `Math.min(idx * 30, 300)`ms，防止 318 个动画同时注册
- **全部折叠/展开**：章节数 > 1 时显示批量操作按钮，同步显示「N/M 个章节已折叠」

### 新 UI：学科切换器（`SubjectSwitcher`）

- **四种视觉状态**：激活/未激活（有内容）/未激活（无内容）/激活（无内容）
- **空学科角标**：无课程的学科显示虚线边框 + 右上「即将」角标
- **课程计数**：每个学科按钮下方显示课程数量
- `courses` prop 改为 required（用于空状态判断）

### 新 UI：学科空状态

- 中央圆形虚线图标 + 学科首字母 + `title-serif` 标题
- 「创作中 · 敬请期待」状态指示器带呼吸动画
- 给人「正在建造」的感觉，不是「坏了」

### 新 UI：学习分析仪表盘（`LearnerDashboard`）

- 文件名 `AuthorTaxonomyPanel.tsx`，组件名已重命名为 `LearnerDashboard`
- **五维完成度**：按学科 / 内容类型 / 知识点 / 认知阶段 / 误区 查看完成情况
- **联动筛选**：点击分类标签 → 下方课程列表即时过滤
- **去学习入口**：每个课程卡片带定向入口按钮
- **ContentKind 徽章**：与关卡选择页视觉一致

### 其他

- **`AuthorTaxonomyPanel.tsx` 改名**：文件路径仍为 `AuthorTaxonomyPanel.tsx`，组件导出名为 `LearnerDashboard`，等待后续物理重命名
- **`StartScreen.tsx` 适配**：SubjectSwitcher 调用传入 `courses` prop
- **`tsc --noEmit`**：零错误通过
- **`npm run build`**：Vite 构建通过

### 设计决策

- 条件渲染优于 CSS 隐藏：折叠章节不产生 DOM 节点，消除 318 节隐藏课的布局抖动
- `contain: content` 隔离：防止单个章节的折叠动画波及兄弟节点
- 动画节流：`Math.min(idx * 30, 300)`——318 课最多 300ms 动画窗，而非 9 秒
- 自动推断仅依赖文件名模式，不动 `pathway`/`hubPlacement` 元数据字段

---

## v0.13 — animated-timeline 演示引擎（2026-06-17）

> 第 17 个 Block：一个跨学科通用动画逐步演示引擎，对标 Brilliant 交互 + Manim 动画 + PPT 叙述。

### 新架构

- **`src/types/animated-timeline.ts`** — 完整类型体系：Scene / 7 种 SceneElement（Code/Table/Text/Card/Highlight/Arrow/Group）/ TimelineConfig / 双模式（full/delta）/ 缓动系统
- **`src/hooks/useAnimationTimeline.ts`** — 时间线控制器：`requestAnimationFrame` 驱动的播放循环、play/pause/next/prev/seek/speed 控制、4 种缓动函数（ease-out/spring/bounce/smooth） + custom cubic-bezier、增量场景合并引擎
- **`src/hooks/useElementInterpolation.ts`** — 元素插值引擎：按 id 匹配前后两帧元素，区分 entering/exiting/stable/morphing 四种状态，返回过渡进度

### 新组件（`src/components/animation/`）

| 组件 | 渲染对象 | 动画支持 |
|------|---------|----------|
| `SceneCode` | 代码块 | 行高亮/强调/淡化/行内标记，opacity+translate 过渡 |
| `SceneTable` | 表格 | 行/列高亮/淡化/单元格强调，色阶过渡 |
| `SceneText` | 文本 | 5 种变体（title/subtitle/body/caption/label），滑入动画 |
| `SceneCard` | 卡片 | 4 种变体（default/raised/sunk/border-only），缩放淡入 |
| `SceneHighlight` | 高亮框 | box/circle/underline 形状，pulse/glow/static 效果 |
| `SceneArrow` | 箭头 | 标签 + 动画流动虚线（SVG） |
| `SceneGroup` | 组合容器 | 递归渲染子元素，flex 排列 |
| `SceneElementRenderer` | 路由分发 | 按 type 分发到对应渲染器 |
| `TimelineControls` | 导航控件 | 步进进度条 + 步进点 + 播放/暂停 + 上下步 |
| `AnimationTimelineBlock` | 主 Block | 自动布局（code+table→分栏）、旁白集成、onComplete 回调 |

### 动画系统增强

- `tailwind.config.js`：新增 3 组 keyframes（pulseRing / glow / arrowFlow）+ 3 个 animation class
- 缓动函数：`ease-out`（默认三次方减速）、`spring`（弹性）、`bounce`（弹跳）、`smooth`（线性）、`custom cubic-bezier`

### 类型系统集成

- `BlockType` 联合新增 `'animated-timeline'`
- `Block` 联合新增 `AnimatedTimelineBlock`
- `BlockRenderer` switch 注册，`onComplete` 透传

### 设计要点

- **无坐标布局**：根据元素类型自动排版（code→居中、code+table→分栏、两个 table→并排）
- **全量/增量双模**：增量场景只写变化部分，引擎自动合并前帧
- **id 驱动插值**：相同 id = morph 过渡，不同 id = 出入动画
- **作者友好**：颜色走主题 token、动画走命名预设、自动缓动

### 验证

- `tsc --noEmit`：零错误
- `npm run build`：通过（24s）

---

## v0.11 — `==highlight==` 高亮语法 + 统一 Markdown 工具（2026-06-17）

> 新增 `==highlight==` 自定义 Markdown 扩展，统一所有文本组件的 Markdown 渲染入口。

### 新功能：`==highlight==` 语法

- **新增 `==文字==` Markdown 扩展**：用 `==` 包围的文字渲染为 `<mark>` 元素，呈现暖橘色背景高亮（`#fbe9df`），适合关键概念强调阅读感受
- **设计考量**：`==` 与 `**粗体**` 正交——粗体改变文字颜色（橙色），高亮改变背景色（暖橘），作者可自由组合 `==**粗体高亮**==`
- **`===` 保护**：`===` 比较运算符不会被误识别为高亮（`start()` 函数跳过 `=== ` 开头）

### 架构改进：统一 Markdown 渲染

- **创建 `src/lib/markdown.ts`**：共享 Markdown 工具模块，暴露 `renderMarkdown()` 函数。`==highlight==` 扩展通过 `marked.use()` 在模块加载时注册一次，所有消费者自动获得
- **`MarkdownBlock.tsx` 重构**：调用 `renderMarkdown()` 替代直接 `marked.parse()`
- **`TypewriterText.tsx` / `RevealText.tsx` 重构初始版本**：调用 `renderMarkdown()` 替代直接 `marked.parse()`
- **`index.css` 新增**：`.markdown-body mark {}` 样式规则

### Bug 修复：多行文本打字动画

- **`TypewriterText.tsx` 重写**：原 CSS mask 单块覆盖导致多行文本同时出现。改为按 `\n` 拆分为独立行，每行独立渲染 Markdown + 独立 mask，已完成行全显示、当前行渐显、未来行隐藏。光标仅出现在当前行末尾。
- **`RevealText.tsx` 重写**：相同 bug 修复，`mode='word'` / `'char'` 均按行逐单元揭示。
- 两者均从 `renderMarkdown()` 切换为 `marked.parseInline()` 以避免 `<p>` 包裹破坏逐行布局。
- `tsc --noEmit` / `npm run build` 通过

### 文档更新

- **`CONTENT_GUIDE.md`**：exposition block 文档新增 Markdown 支持说明，新增「Markdown 语法速查」章节（粗体/行内代码/高亮/链接/引用），`==highlight==` 示例展示给内容作者

## v0.10 — 协议重构 + 4 种新 Block（2026-06-17）

> 本次是基础设施重构 + 内容协议扩展。

### 架构重构

- **`src/types/` 单文件拆分为 6 个模块**：原 403 行 `protocol.ts` 拆为 `shared.ts` / `curriculum.ts` / `teaching.ts` / `blocks.ts` / `progress.ts`，`protocol.ts` 降为保导出（barrel），343 处外部引用零改动
- **新增 `shared.ts`** 存放 `Subject`/`ContentKind`/`CognitiveStage` 等共享基础类型，打破循环依赖
- **`blocks.ts`** 集中管理全部 16 种 Block 接口，按教学层次组织（基础层 / 练习层 / 运行层 / 高阶层 / 场景层）
- **`courses/index.ts` 从 901 行压缩至 ~35 行**：删除 321 条手动 import，改用 Vite `import.meta.glob` 自动发现课程文件。新课程只需丢入 `courses/` 目录即自动注册
- **新增 `vite-env.d.ts`** 声明 Vite 客户端类型
- **`src/components/blocks/index.ts`** 保导出，BlockRenderer 单行导入替代 9 行 import

### 新 Block 类型（第 5 层：场景层）

| Block | 组件 | 教学用途 | 交互模式 |
|-------|------|----------|----------|
| `scene` | `SceneBlock` | 多步骤概念演示（现象→代码→内存） | 点击推进，步进器圆点 |
| `memory-visualizer` | `MemoryVisualizerBlock` | 堆/栈联动可视化（指针、动态内存） | 逐行步进，双栏内存面板 |
| `flow-visualizer` | `FlowVisualizerBlock` | 控制流追踪（分支、循环、调用栈） | 逐行步进，变量表 + stdout |
| `scroll-narrative` | `ScrollNarrativeBlock` | 长解释 + 代码滚动联动 | 滚动检测，桌面端代码面板 sticky |

### 协议增强

- **所有 Block 新增 `icon` 字段**：`BaseTeachingBlock.icon?: string`，内容作者可用 Phosphor 图标名字符串配图

---

## v0.9 — 内容创作手册重写（2026-06-16 晚间）

- **`CONTENT_GUIDE.md` 从 704 行扩展至 1196 行**：统一 16 种 Block 参考（6 层分类体系）、布局协议文档（auto 规则 / split 选项 / 移动端策略）、动画协议、图标系统（作者友好的字符串 API，非 TSX）、教学元数据逐字段指南、自查清单、完整课程演练
- **新增 5 种高阶 Block 文档**：`predict-output` / `trace-state` / `fix-code` / `choose-next-line` / `compare-snippets` 的协议 + 使用示例

---

## v0.8 — 5 种高阶 Block 实现（2026-06-16）

> 在 `src/components/blocks/` 新增 5 个高阶练习组件。

- **`PredictOutputBlock`**：先猜输出再验证，支持多选选项 + 自由输入
- **`TraceStateBlock`**：逐行追踪变量状态，支持 `step-through` / `fill-table` 模式
- **`FixCodeBlock`**：改错题，支持 `choose-fix`（选修复方案） / `edit`（直接编辑代码）
- **`ChooseNextLineBlock`**：选择题——下一行代码是什么，多步骤搭建完整函数
- **`CompareSnippetsBlock`**：对比相似代码片段，专门打击易混点
- **新增 `OutputComparison` 比对引擎**（`src/lib/compareOutput.ts`）：支持 exact / trimmed / contains / regex / none 五种模式，统一供 CodeRunnerBlock + 高阶 Block 使用

---

## v0.7 — 教学布局引擎（2026-06-16）

- **`TeachingLayout` 组件**：基于 `TeachingLayoutSpec` 的智能布局系统
  - `auto` / `stack` / `split` 三种模式
  - 语义布局意图（read / reference-and-input / compare / code-and-output / code-and-state）
  - 移动端自适应策略（stack / tabs / reference-first / reference-after）
- **`TeachingLayoutSpec` 协议**：新增完整布局类型定义
- **`ContentTaxonomy` 工具**（`src/lib/contentTaxonomy.ts`）：知识点分类 + 认知阶段标签，为未来 PracticeHub/ChallengeHub/ReviewHub 做准备
- **`TeachingMeta` 扩展**：`contentKind` / `knowledgePoints` / `cognitiveStage` / `misconceptions` / `estimatedSeconds` / `checkpointLevel`

---

## v0.6 — 动画系统 + 教学元数据（2026-06-16）

- **动画组件库**（`src/components/animations/`）：
  - `TypewriterText` — 逐字打出效果
  - `RevealText` — 逐词淡入效果
  - `AttentionPulse` — 脉冲高亮（引导注意）
  - `ShakeOnError` — 错误抖动画板
- **`TeachingAnimationSpec` 协议**：预设（demo-scene / state-timeline / branch-play / memory-box / spotlight / trace）+ 逐帧步进
- **`BaseTeachingBlock`**：所有 Block 的基类，统一挂载 `layout` / `teaching` / `animation`
- **`TeachingAnimationStep`**：动画帧协议（narration + line + highlight + boxes）
- **`ExpositionBlock.textAnimation`**：支持 `typewriter` / `reveal` 动力效果

---

## v0.5 — 8 个基础 Block 渲染器 + 内容编辑器（2026-06-16）

- **`BlockRenderer`**：Block 类型 → React 组件的分发中枢（switch dispatch）
- **渲染器实现（8 个组件）**：

  | 组件 | Block 类型 | 交互 |
  |------|-----------|------|
  | `ExpositionBlock` | exposition | 文字 + 代码展示，支持内联 code 标记 |
  | `ConceptCardsBlock` | concept-cards | 多邻国式单词卡，term + meaning + code |
  | `TypeItBlock` | type-it | 打字练习，精确/宽松匹配 |
  | `MultipleChoiceBlock` | multiple-choice | 单选/多选，每题可选 misconceptionId |
  | `MatchBlocksBlock` | match-blocks | 代码片段排序，自动打乱 + 干扰项 |
  | `FillInBlock` | fill-in | 填空，`____` 占位符模板 |
  | `CodeRunnerBlock` | code-runner | 浏览器内编译执行 C++，输出比对 |
  | `Celebration` | — | 完成动画（撒花效果） |

- **`TeachingLayout` 基础版本**：stack 模式统一包裹
- **`ErrorBoundary`**：Block 渲染错误的兜底 UI

---

## v0.4 — WASM C++ 运行时引擎（2026-06-16）

- **`CppRunner`**（`src/runner/`）：基于 browsercc + `@bjorn3/browser_wasi_shim` 的浏览器内 C++ 编译执行引擎
  - 编译参数：`-std=c++20 -O2 -fno-exceptions`
  - 标准输入/输出捕获
  - WASM 预加载器 + 懒加载策略
- **`runner/types.ts`**：编译结果类型（success / error / timeout）
- **`runner/preloader.ts`**：首次访问后的 WASM 缓存，降低后续启动延迟
- 集成至 CodeRunnerBlock：学员写完代码点"运行"，实时看到 stdout / 编译错误

---

## v0.3 — 课程体系 + 319 节内容（2026-06-16 下午 ~ 傍晚）

> 大规模 AI 辅助内容生产阶段。

- **`src/courses/` 目录框架**：21 个章节（p00-p20），319 节课程，从零基础到 C++ 深度黑话
- **`src/courses/index.ts`**：手动注册 319 个课程文件的清单 + 21 个章节定义
- **课程内容分布**：

  | 章节 | 阶段 | 节数 | 主题 |
  |------|------|------|------|
  | p00 | 破冰 | 5 | 认识程序、代码、符号 |
  | p01 | 基础（上） | 15 | 值、变量、类型、声明赋值 |
  | p02 | 基础（下） | 20 | 运算、I/O、条件判断 |
  | p03 | 分水岭 | 12 | 循环、数组 |
  | p04 | 进阶 | 17 | 字符串、函数、作用域 |
  | p05 | 进阶 | 15 | 指针、引用、重载 |
  | p06 | 技能 | 7 | 调试思维 |
  | p07 | 核心 | 20 | OOP 地基（类、构造、析构） |
  | p08 | 核心 | 17 | 继承与多态 |
  | p09 | 黑话 | 17 | const、static、友元、重载 |
  | p10 | 分水岭 | 20 | 内存战争（堆栈、RAII、移动） |
  | p11 | 现代 | 10 | 左值右值、完美转发 |
  | p12 | 进阶 | 15 | 模板泛型 |
  | p13 | 核心 | 17 | STL 容器 |
  | p14 | 核心 | 15 | STL 算法 + Lambda |
  | p15 | 现代 | 12 | auto、constexpr、optional 等 |
  | p16 | 深入 | 17 | 编译流程、内存布局、位运算 |
  | p17 | 现代 | 15 | 智能指针、类型转换 |
  | p18 | 进阶 | 15 | 并发入门 |
  | p19 | 工程 | 17 | 设计模式、CMake、测试 |
  | p20 | 大师 | 20 | ADL、类型擦除、变参、UB |

- **`CONTENT_GUIDE.md` 初版**（704 行）：12 种 Block 类型参考 + 课程结构模板 + 最佳实践

---

## v0.2 — 页面框架 + 导航（2026-06-16 中午 ~ 下午）

- **路由 / 页面**：
  - `StartScreen` — 启动页，显示学科选择（C++ / C / DSA 预留）
  - `LevelSelect` — 关卡选择页，21 章节 + 319 节点地图，锁定/可用/完美状态
  - `LessonPlayer` — 课程播放器，BlockRenderer + TeachingLayout 串联
- **全局状态管理**（`src/store/useStore.ts` — Zustand）：
  - 用户进度持久化（localStorage）
  - 当前课程/Block 索引
  - 题库完成度追踪
  - 学科切换
- **关卡选择逻辑**：
  - 按章节分组展示课程节点
  - 完成当前课解锁下一课
  - `NodeStatus`：locked / available / completed / perfect
- **`LessonPreview`** 组件：课程卡片（元数据摘要 + 进度指示）
- **快捷键系统**（`src/hooks/useKeyboardShortcuts.ts`）：左右键切换 Block，Enter 确认
- **移动端适配基础**：swipe 切换 + 响应式布局

---

## v0.1 — 项目骨架（2026-06-16 上午）

- **初始化技术栈**：
  - Vite 6 + React 18 + TypeScript 5.6
  - Tailwind CSS 3.4 + PostCSS / Autoprefixer
  - Zustand 状态管理
  - Phosphor Icons（`@phosphor-icons/react`）
  - JetBrains Mono 等宽字体
- **`src/types/protocol.ts` 初版**（403 行）：
  - `Block` 联合类型（12 种）
  - `Lesson` / `LessonMeta` / `Chapter` 课程模型
  - `UserProgress` / `LessonCompletion` 进度模型
  - `TeachingAnimationSpec` / `TeachingLayoutSpec` 协议骨架
- **UI 设计系统初版**（`src/index.css`）：
  - 深色主题（void 背景色 + 莫兰迪色调色板）
  - 自定义 utility class（`.block-card`、`.btn-primary` 等）
  - 响应式断点配置
- **`SyntaxHighlighter`** 基础组件：C++ 语法关键词高亮
- **`icons.tsx`**：Phosphor 图标包装组件
- **`LessonPlayer.tsx` 初版**：Block 顺序播放器（不含 TeachingLayout 包裹）
- **AI 创作工具链**（`AI-AGent/forge-course-team/`）：
  - `SKILL.md` — AI 写作技能定义
  - `PEDAGOGY.md` — 教学法指南
  - `CURRICULUM.md` — 课程大纲
  - `LESSON_AUTHORING.md` — 写作流程
  - `EXAMPLES.md` — 示例课程
  - `REVIEW_RUBRIC.md` — 评审标准

---

## 路线图（规划中）

| 里程碑 | 计划内容 |
|--------|----------|
| **v0.14** | 4 个新 Block 接入真实课程（p00 试用） |
| **v0.14** | PracticeHub / ChallengeHub / ReviewHub 筛选页 |
| **v0.15** | AI 动画脚本引擎（TeachingAnimationSpec → CSS 动画） |
| **v0.16** | 用户系统 + 云端进度同步 |
| **v1.0** | 完整 21 章发布 + 练习中心 + 社区挑战 |

---

*项目始于 2026-06-16，由 Sisyphus 记录。*
