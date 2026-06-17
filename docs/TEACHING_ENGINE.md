# Forge 教学引擎底座说明

> 范围：本文档只描述引擎底座、协议、组件和扩展方式。课程资源文件 `src/courses/*.ts` 不属于本轮底座增强范围。

## 1. 项目定位

Forge 不是单纯的 C++ 课程页面，而是一个可被 AI 大规模接手内容生产的交互式教学引擎。

底座的目标是：

- 课程作者只写结构化内容；
- 引擎负责渲染、交互、反馈、布局、视觉一致性；
- AI 可以根据协议稳定生成新 lesson / practice / challenge；
- 后续能支撑几百到上千节内容，而不是靠手写页面堆功能。

## 2. 不碰课程资源的边界

当前底座增强遵守这个边界：

- 不批量修改 `src/courses/*.ts`；
- 不重写已有课程文案；
- 不重排已有课程顺序；
- 不给现有课程强行补 metadata；
- 不把已有 lesson 自动迁移成 content-pack。

允许改动的是：

- 协议：`src/types/protocol.ts`；
- 渲染器：`src/components/BlockRenderer.tsx`；
- 通用组件：`src/components/**`；
- 布局层：`src/components/TeachingLayout.tsx`；
- 引擎工具：`src/lib/**`；
- 状态/快捷键：`src/store/useStore.ts`、`src/hooks/useKeyboardShortcuts.ts`；
- 视觉底座：`src/index.css`；
- 作者文档：`src/courses/CONTENT_GUIDE.md`、`docs/**`。

## 3. 核心协议

主协议文件：

```text
src/types/protocol.ts
```

当前协议分三层：

### 3.1 课程层

- `Lesson`
- `LessonMeta`
- `Chapter`

`LessonMeta` 现在预留了：

- `pathway`：学科、知识点、内容类型、认知阶段；
- `hubPlacement`：是否进入 practice / challenge / review；
- `animation`：未来动画协议。

### 3.2 Block 层

已有基础 block：

- `exposition`
- `concept-cards`
- `type-it`
- `multiple-choice`
- `match-blocks`
- `fill-in`
- `code-runner`

新增认知型 block：

- `predict-output`
- `trace-state`
- `fix-code`
- `choose-next-line`
- `compare-snippets`

### 3.3 教学元数据

每个 block 可选：

```ts
teaching?: TeachingMeta
layout?: TeachingLayoutSpec
animation?: TeachingAnimationSpec
```

这些字段用于 AI 生成内容、教学诊断、未来 Hub 和动画播放器。

## 4. 新增认知型 Block

### `predict-output`

作用：让用户先在脑中运行代码，再看反馈。

适合：

- 输出题；
- 赋值覆盖；
- 条件分支；
- 循环次数；
- 数组索引。

组件：

```text
src/components/blocks/PredictOutputBlock.tsx
```

### `trace-state`

作用：让用户逐行追踪变量状态。

适合：

- 变量；
- 赋值；
- 循环；
- 数组；
- 指针；
- 函数调用过程。

组件：

```text
src/components/blocks/TraceStateBlock.tsx
```

### `fix-code`

作用：从“看出错误”进阶到“修正错误”。

适合：

- 忘分号；
- `=` / `==` 混淆；
- 类型不匹配；
- 变量名拼错；
- 括号/花括号错误。

组件：

```text
src/components/blocks/FixCodeBlock.tsx
```

### `choose-next-line`

作用：从抄代码过渡到自己构造代码。

适合：

- 写 `main`；
- 写 if；
- 写循环；
- 写函数骨架；
- 长代码题的分步搭建。

组件：

```text
src/components/blocks/ChooseNextLineBlock.tsx
```

### `compare-snippets`

作用：对比两段相似代码，打易混点。

适合：

- `=` vs `==`；
- 声明 vs 赋值；
- 字符串字面量 vs 标识符；
- `*` 的不同含义；
- 值传递 vs 引用传递。

组件：

```text
src/components/blocks/CompareSnippetsBlock.tsx
```

## 5. 教学布局协议

布局组件：

```text
src/components/TeachingLayout.tsx
```

支持：

- `stack`：默认单列；
- `split`：参考代码 + 交互区；
- `auto`：由 block 类型和代码长度自动决定。

布局意图：

- `read`
- `reference-and-input`
- `compare`
- `code-and-output`
- `code-and-state`

移动端策略：

- `stack`
- `tabs`
- `reference-first`
- `reference-after`

原则：

- 普通讲解保持窄宽度；
- 长代码/走读/改错用左右工作台；
- 移动端自动退化为单列；
- reference rail 桌面可 sticky，移动端不 sticky。

## 6. 知识分类底座

作者可管理的分类文件：

```text
src/knowledge/systems.ts
```

它定义 `knowledgeSystems`，每个体系包含：

- `id`：学科/体系 ID，如 `cpp`、`c`、`dsa`、`unreal-cpp`；
- `label`：界面显示名；
- `description`：作者说明；
- `accent`：展示强调色；
- `courseIds`：不改 lesson 文件时，可在这里把已有课程归入某个体系；
- `defaultForUntagged`：旧课程未标注时归入哪个体系。

用户可在首页和选关页切换学科。选关页会按当前学科过滤：

- 顶部完成数；
- 章节列表；
- 课程解锁顺序；
- Hub preview 统计。

工具文件：

```text
src/lib/contentTaxonomy.ts
```

提供：

- `getLessonContentProfile(lesson)`；
- `filterLessonsByKind(courses, kinds)`；
- `subjectLabel(subject)`。

它把 lesson 归类成：

- `lesson`
- `practice`
- `challenge`
- `review`

目前只是底座索引，不会修改课程内容。

首页入口预览：

```text
src/components/LearningHubPreview.tsx
```

它展示：

- 主线学习；
- 练习中心；
- 挑战中心；
- 复习中心。

其中 practice/challenge/review 当前是 reserved，不等于完整 Hub 已完成。

## 7. 动画协议底座

协议类型：

- `TeachingAnimationPreset`
- `TeachingAnimationStep`
- `TeachingAnimationSpec`

支持的预设：

- `demo-scene`
- `state-timeline`
- `branch-play`
- `memory-box`
- `spotlight`
- `trace`

动画 step 可描述：

- narration；
- line；
- highlight；
- boxes；
- value；
- pointsTo；
- state。

当前只是协议和视觉底座，真正动画播放器属于后续阶段。

## 8. 反馈与诊断底座

协议中已有：

- `misconceptionTarget`
- `misconceptions`
- `cognitiveStage`
- `checkpointLevel`

这些字段让 AI 和系统能知道：

- 题目打哪个误区；
- 题目处在哪个认知阶段；
- 是否过早要求用户产出；
- 后续该推荐什么回练。

当前尚未实现完整错因统计和回练推荐算法。

## 9. 通用教学 UI 组件

目录：

```text
src/components/teaching/
```

组件：

- `FeedbackCallout.tsx`
- `HintTray.tsx`
- `OptionCard.tsx`
- `CheckpointMeter.tsx`

这些组件保证新 block 的交互风格一致。

## 10. 稳健性修复

### 输出比对

工具：

```text
src/lib/compareOutput.ts
```

支持：

- `exact`
- `trimmed`
- `contains`
- `regex`
- `none`

`CodeRunnerBlock` 使用 fresh run result 做比对，避免 React state 旧值导致判断错误。

### 断点续学

`jumpToBlock` / `nextBlock` / `prevBlock` 会同步持久化 `progress.currentBlock`。

### 快捷键防跳题

`ArrowRight` 现在不会绕过未完成 block。

## 11. 视觉底座

样式文件：

```text
src/index.css
```

新增视觉类：

- `.lesson-workbench`
- `.reference-rail`
- `.reference-card`
- `.checkpoint-meter`
- `.option-card`
- `.state-chip`
- `.trace-row`
- `.repair-card`
- `.compare-grid`
- `.misconception-note`
- `.hub-preview`
- `.hub-card`
- `.memory-box`
- `.state-timeline`

设计方向：

- 保持 Forge 暖纸面 + ember + 深色代码 gem；
- 反馈克制，不用夸张特效；
- 视觉服务教学，不只是装饰。

## 12. 视觉审美升级边界

本轮视觉升级只动前端底座，不动课程资源。

视觉方向定为：**现代、简约、高级感的教学产品界面**。

关键词：

- 干净浅色背景，不做厚重纸纹；
- 克制暖色 accent，只用于路径、进度和关键行动；
- 深色代码 gem 保留，但减少装饰感；
- 卡片层级依靠留白、细边框、柔和阴影，而不是复杂纹理；
- 页面像现代学习产品，不像游戏化重皮肤；
- 美观必须帮助学习：层级清楚、反馈克制、代码更容易读。

允许优化的视觉层：

- 全局 token、背景、surface、按钮、标签；
- 首页 hero / hub preview；
- 选关页外壳、作者分类页；
- LessonPlayer 顶栏、进度条、底栏；
- TeachingLayout reference rail；
- 新增教学 block 的通用视觉；
- 移动端间距、触控尺寸、堆叠层级。

不允许借视觉升级改动：

- `src/courses/*.ts` 课程内容；
- 课程文案；
- 课程顺序；
- 题目答案；
- block 编排。

视觉验收标准：

- 旧课程无需修改仍能渲染；
- 页面更有品牌识别度，但不影响 0 基础用户阅读；
- 移动端不出现横向布局挤压；
- 动效可被 `prefers-reduced-motion` 降级；
- `npm run build` 通过。

## 13. 后续增强顺序

建议继续按底座优先：

1. 真正的 `PracticeHub` 页面框架；
2. 真正的 `ChallengeHub` 页面框架；
3. `TeachingAnimationPlayer` 动画播放器；
4. 用户错因聚合与回练推荐；
5. content-pack 协议；
6. AI 课程生产 Skill 与协议校验工具联动。

仍然不需要碰现有课程资源，除非明确进入“课程内容生产阶段”。
