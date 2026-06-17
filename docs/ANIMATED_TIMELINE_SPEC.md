# animated-timeline 演示引擎规格

> 一个 Block 取代 PPT / Brilliant 逐步展示 / Manim 动画 / 流程图解
> 跨学科通用，所有视觉类型支持，两种步进模式，作者友好。

---

## 目录

1. [设计哲学](#1-设计哲学)
2. [整体结构](#2-整体结构)
3. [场景元素体系](#3-场景元素体系)
4. [动画引擎](#4-动画引擎)
5. [作者体验](#5-作者体验)
6. [渲染架构](#6-渲染架构)
7. [实施路径](#7-实施路径)

---

## 1. 设计哲学

### 核心原则

**一个场景 = 屏幕上所有元素的一张快照。**

从一个场景过渡到下一个场景，引擎自动：

```
对比两张快照 → 识别差异 → 平滑补间 → 渲染过渡
```

### 双模式支持

| 模式 | 原理 | 适合 |
|------|------|------|
| **全量模式** | 每步描述完整状态 | 每步变化场景较大，作者想精确控制每个元素 |
| **增量模式** | 每步只写「变什么」，不变的元素继承上一步 | 单步只动 1-2 个元素，写起来省事 |

两种模式在渲染层合流——最终都变成全量快照送入插值引擎。增量模式是作者的写作便利，不是不同的渲染管线。

### 作者友好策略

```
不要让作者写坐标。元素自动布局。
不要让作者写颜色值。用主题 token。
不要让作者写动画参数。用命名的缓动预设。
```

---

## 2. 整体结构

```typescript
interface AnimatedTimelineBlock {
  type: 'animated-timeline'

  // === 全局配置 ===
  config?: {
    // 导航
    navigation: 'click' | 'auto' | 'scroll'          // 默认 click
    defaultDuration: number                            // 每步过渡时长 (ms)

    // 布局
    layout: 'full' | 'split-code' | 'split-table'
    narrationPosition: 'top' | 'bottom' | 'left' | 'right' | 'overlay'

    // 行为
    allowSeek: boolean                                 // 允许拖拽进度条
    loop: boolean                                      // 循环播放
    showStepIndicator: boolean                         // 显示步进指示点
  }

  // === 场景序列 ===
  scenes: Scene[]
}

interface Scene {
  // 旁白（可选）
  narration?: string
  narrationAnimation?: 'typewriter' | 'reveal' | 'instant'

  // 本场景元素列表（全量模式 = 完整列表，增量模式 = 只列变化/新增的元素）
  elements: SceneElement[]

  // 模式标记
  mode?: 'full' | 'delta'    // 默认 full

  // 覆盖全局时长的单步时长
  duration?: number
}
```

---

## 3. 场景元素体系

所有元素共用一个结构，通过 `type` 分发渲染：

```typescript
type SceneElement =
  | CodeElement
  | TableElement
  | TextElement
  | CardElement
  | HighlightElement
  | ArrowElement
  | GroupElement
```

### 3.1 代码元素

```typescript
interface CodeElement {
  type: 'code'
  id: string                       // 不变：跨场景保持 id 则引擎做 morph 动画
  
  code: string
  language?: 'cpp' | 'sql' | 'python' | 'text'
  
  // 行状态（支持同时使用）
  highlightedLines?: number[]     // 琥珀高亮
  emphasizedLines?: number[]      // 金色强调
  fadedLines?: number[]          // 淡化消隐
  dimmedLines?: number[]         // 灰掉（已过去不需要关注）
  
  // 行内标记（精确到单词/符号）
  inlineHighlights?: Array<{
    line: number
    startCol: number
    endCol: number
    color?: 'ember' | 'gold' | 'sage' | 'crimson'
  }>
}
```

**使用示例**——SELECT 语句逐步解读：

```
场景 1:  高亮 SELECT name, age        其余灰掉
场景 2:  高亮 FROM users              其余灰掉  
场景 3:  高亮 WHERE age > 18          其余灰掉
场景 4:  全部正常显示，行 3 金色强调
```

### 3.2 表格元素

```typescript
interface TableElement {
  type: 'table'
  id: string

  headers: string[]
  rows: (string | number)[][]

  // 行/列状态
  highlightedRows?: number[]
  fadedRows?: number[]
  dimmedRows?: number[]

  highlightedCols?: number[]
  
  // 单元格精确标记
  cellEmphasis?: Array<{
    row: number
    col: number
    color?: 'ember' | 'gold' | 'sage' | 'crimson'
    glow?: boolean
  }>
}
```

**使用示例**——WHERE 筛选前后：

```
场景 1:  users 表完整                      
         小明  20  北京  ← age > 18 的标记金色
         小红  17  上海  ← age <= 18 标记淡化

场景 2:  查询结果表出现（新增元素）
         name  age
         小明  20        ← 金色强调「这就是结果」
```

### 3.3 文本元素

```typescript
interface TextElement {
  type: 'text'
  id: string

  content: string                     // 支持 Markdown 行内语法
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'label'
  
  // 动画类型
  enterAnimation?: 'fade' | 'slide-up' | 'slide-left' | 'typewriter' | 'reveal'
  
  // 对齐
  align?: 'left' | 'center' | 'right'
}
```

### 3.4 卡片元素

```typescript
interface CardElement {
  type: 'card'
  id: string

  title?: string
  content: string
  icon?: string                     // Phosphor 图标名
  
  // 视觉风格
  variant?: 'default' | 'raised' | 'sunk' | 'border-only'
  accent?: 'ember' | 'sage' | 'gold' | 'ink'
  
  // 进入动画
  enterAnimation?: 'fade' | 'pop' | 'slide-up'
}
```

### 3.5 高亮框元素

```typescript
interface HighlightElement {
  type: 'highlight'
  id: string

  // 指向另一个元素的 id
  targetElement: string             // 高亮框会自动跟随目标元素的位置
  
  // 高亮形状
  shape?: 'box' | 'circle' | 'underline'
  
  // 效果
  effect?: 'pulse' | 'glow' | 'static'
  color?: 'ember' | 'gold' | 'sage'
  label?: string                    // 可选说明标签
}
```

### 3.6 箭头元素

```typescript
interface ArrowElement {
  type: 'arrow'
  id: string

  fromElement: string               // 起始元素 id
  toElement: string                 // 指向元素 id
  
  // 自动计算锚点位置，不用写坐标
  
  label?: string
  color?: 'ember' | 'ink' | 'sage'
  animated?: boolean                // 是否带有「流动」动画
}
```

### 3.7 组合元素

```typescript
interface GroupElement {
  type: 'group'
  id: string

  children: SceneElement[]          // 子元素列表
  
  // 整个组作为一个单元动画
  enterAnimation?: 'fade' | 'slide-up' | 'pop'
  
  // 组内元素之间的间距
  gap?: number
  direction?: 'vertical' | 'horizontal'
}
```

---

## 4. 动画引擎

### 4.1 核心循环

```
Scene N ──→ 全量快照 N ──→ 插值计算 ──→ 渲染帧
                ↑               ↑
          增量场景 → 合并前 →   对比快照 N-1 和 N
          场景数据   快照      逐元素匹配 (by id)
                              生成补间指令序列
```

### 4.2 按元素类型的插值规则

| 元素类型 | 插值行为 |
|---------|---------|
| **code** | 相同 id + 相同 code → 只过渡 highlightedLines/emphasizedLines 等的状态变化（行高亮平滑切换） |
| | 相同 id + 不同 code → 代码内容 morph（字符级别的替换动画） |
| **table** | 相同 id → 行/列状态插值（行淡出/淡入、高亮移动） |
| | 单元格内容变化 → 数字/文本 morph |
| **text** | 相同 id + 不同 content → 旧文本淡出，新文本淡入 |
| | 相同 content → 无变化，保持原位 |
| **card** | 相同 id → 平滑过渡样式变化 |
| **highlight** | 相同 id + 不同 targetElement → 高亮框从旧位置移到新位置 |
| **arrow** | 相同 id → 箭头重新指向，平滑旋转/伸缩 |
| **group** | 递归处理子元素 |

**消失/出现的规则**：

```
元素在 N 有、N+1 没有  →  淡出消失
元素在 N 没有、N+1 有  →  按照 enterAnimation 进入
元素在两帧都有         →  做属性插值
```

### 4.3 缓动系统

```typescript
type Easing =
  | 'ease-out'             // 默认，自然减速
  | 'ease-in-out'          // 平缓起止
  | 'spring'               // 弹簧弹性（适合强调）
  | 'bounce'               // 弹跳（适合庆祝）
  | 'smooth'               // 恒速
  | [number, number, number, number]  // 自定义 cubic-bezier
```

每步可设 `easing`，默认为 `'ease-out'`。

### 4.4 时间线控制（useAnimationTimeline）

```typescript
interface TimelineAPI {
  // 控制
  play(): void
  pause(): void
  next(): void
  prev(): void
  seek(progress: number): void     // 0~1 拖拽进度
  speed(multiplier: number): void  // 1x / 2x / 0.5x

  // 只读状态
  readonly currentStep: number
  readonly totalSteps: number
  readonly progress: number        // 0~1
  readonly isPlaying: boolean
  readonly isComplete: boolean

  // 事件
  onStepChange(cb: (step: number) => void): void
  onComplete(cb: () => void): void
}
```

---

## 5. 作者体验

### 5.1 最小示例——4 行代码写出逐步演示

```typescript
{
  type: 'animated-timeline',
  config: { narrationPosition: 'overlay' },
  scenes: [
    {
      narration: '第一步：我们先看 SELECT 做了什么',
      elements: [
        { type: 'code', id: 'query', code: 'SELECT name, age\nFROM users\nWHERE age > 18',
          highlightedLines: [1] }
      ]
    },
    {
      narration: '第二步：FROM 指定从哪个表查',
      elements: [
        { type: 'code', id: 'query', code: 'SELECT name, age\nFROM users\nWHERE age > 18',
          highlightedLines: [2] }
      ]
    },
    {
      narration: '第三步：WHERE 过滤条件',
      elements: [
        { type: 'code', id: 'query', code: 'SELECT name, age\nFROM users\nWHERE age > 18',
          highlightedLines: [3] }
      ]
    }
  ]
}
```

### 5.2 复杂示例——C++ 变量赋值追踪

```typescript
{
  type: 'animated-timeline',
  config: { layout: 'split-code', narrationPosition: 'top' },
  scenes: [
    // 场景 1
    {
      mode: 'full',
      narration: '我们声明一个变量 x',
      elements: [
        { type: 'code', id: 'code', code: 'int x = 42;\nint y = x + 1;',
          highlightedLines: [1] },
        { type: 'table', id: 'vars', headers: ['变量', '值', '地址'],
          rows: [['x', '42', '0x7ff...']], highlightedRows: [0] },
        { type: 'arrow', id: 'arrow1', fromElement: 'code',
          toElement: 'vars', label: '赋值', animated: true }
      ]
    },
    // 场景 2 — 增量模式
    {
      mode: 'delta',
      narration: '然后 y 被赋值为 x + 1',
      elements: [
        { type: 'code', id: 'code', highlightedLines: [2] },
        { type: 'table', id: 'vars',
          rows: [['x', '42', '0x7ff...'], ['y', '43', '0x7ff...']],
          highlightedRows: [1] }
      ]
    }
  ]
}
```

### 5.3 复杂示例——MySQL JOIN 可视化

```typescript
{
  type: 'animated-timeline',
  config: { layout: 'full', navigation: 'click' },
  scenes: [
    // 场景 1：展示两张源表
    {
      narration: '我们有 users 和 orders 两张表',
      elements: [
        { type: 'table', id: 'users',
          headers: ['id', 'name'], rows: [['1','小明'],['2','小红']] },
        { type: 'table', id: 'orders', 
          headers: ['id', 'user_id', 'item'],
          rows: [['1','1','书'],['2','1','笔'],['3','2','本子']],
          position: { right: true } }
      ]
    },
    // 场景 2：高亮匹配键
    {
      mode: 'delta',
      narration: 'users.id = orders.user_id 就是关联的桥梁',
      elements: [
        { type: 'table', id: 'users', highlightedCols: [0] },
        { type: 'table', id: 'orders', highlightedCols: [1] },
        { type: 'arrow', id: 'join-arrow',
          fromElement: 'users', toElement: 'orders',
          label: '= 匹配', color: 'gold', animated: true }
      ]
    },
    // 场景 3：展示结果表
    {
      mode: 'delta',
      narration: 'JOIN 之后，两张表合并成一张结果表',
      elements: [
        { type: 'table', id: 'result',
          headers: ['name', 'item'],
          rows: [['小明','书'],['小明','笔'],['小红','本子']],
          enterAnimation: 'slide-up' }
        // 源表自动淡出（在 N 有 N+1 没有）
      ]
    }
  ]
}
```

### 5.4 作者便利设施

**内置模板**——常用模式一键引用：

```typescript
// 代码逐行走读
scenes: timelineCodeWalk('SELECT name FROM users', [
  { line: 1, narration: 'SELECT 选择列...' },
  { line: 2, narration: 'FROM 指定表...' },
])
```

**自动布局**——不用写坐标，引擎自动排列：

- 单个 code 元素 = 居中全宽
- code + table 并存 = 左右分栏（自动 5:5 / 6:4）
- 两个 table 并存 = 左右并列
- code + table 逐步出现 = 左 code 右 table

**主题继承**——颜色自动使用 Forge 设计系统 token，不用作者指定具体色值。

---

## 6. 渲染架构

```
src/
  types/
    animated-timeline.ts          ← 上述接口定义

  hooks/
    useAnimationTimeline.ts       ← 时间线控制器
    useElementInterpolation.ts    ← 元素插值引擎

  components/
    animation/
      AnimationTimelineBlock.tsx  ← Block 入口
      TimelineScenes.tsx          ← 场景序列渲染
      TimelineControls.tsx        ← 导航控件（进度条/按钮/步进点）
      
      // 元素渲染器
      SceneCode.tsx               ← 代码元素渲染（含行高亮）
      SceneTable.tsx              ← 表格元素渲染（含行/列状态）
      SceneText.tsx               ← 文本元素渲染
      SceneCard.tsx               ← 卡片元素渲染
      SceneHighlight.tsx          ← 高亮框元素渲染
      SceneArrow.tsx              ← 箭头元素渲染
      SceneGroup.tsx              ← 组合容器渲染

      // 动画基元
      MorphText.tsx               ← 字符级文本变形
      MorphTable.tsx              ← 表格行插值过渡
      HighlightMove.tsx           ← 高亮框平滑移动
      ArrowDraw.tsx               ← 箭头绘制/重定向动画
      PulsingGlow.tsx             ← 脉冲发光效果
```

### 渲染流程

```
AnimatedTimelineBlock
  │
  ├─ useAnimationTimeline(scenes, config)
  │     ├─ 将场景解析为全量快照序列
  │     ├─ 管理当前场景索引
  │     └─ 输出 currentSnapshot + progress (0~1)
  │
  ├─ useElementInterpolation(prevSnapshot, nextSnapshot, progress)
  │     ├─ 按 id 匹配元素
  │     ├─ 计算中间插值状态
  │     └─ 输出 interpolatedElements[]
  │
  └─ TimelineScenes(interpolatedElements)
        ├─ 按 type 路由到 SceneCode / SceneTable / ...
        ├─ 缓动函数应用
        └─ 渲染 DOM 节点 + CSS transition
```

---

## 7. 实施路径

### Phase 1 — 地基

```
1. src/types/animated-timeline.ts         ← 所有接口定义
2. src/hooks/useAnimationTimeline.ts       ← 时间线控制器（核心）
3. src/hooks/useElementInterpolation.ts    ← 元素插值引擎
```

### Phase 2 — 渲染器

```
4. TimelineControls.tsx                    ← 导航控件（统一的 UI）
5. SceneCode.tsx                           ← 代码渲染（最大的视觉组件）
6. SceneText.tsx + SceneCard.tsx            ← 文本 + 卡片
7. SceneTable.tsx                          ← 表格渲染（含行状态）
8. SceneHighlight.tsx + SceneArrow.tsx     ← 高亮 + 箭头
9. SceneGroup.tsx                          ← 组合容器
```

### Phase 3 — Block 组装

```
10. AnimationTimelineBlock.tsx            ← 串联所有组件
11. BlockRenderer 注册新类型
12. 用 p00 的一节课做验证
```

### Phase 4 — 内容生产

```
13. 工具函数（timelineCodeWalk 等）        ← 作者便利设施
14. 写好一批 MySQL / C++ 课程做演示
```
