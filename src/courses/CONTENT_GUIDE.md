# Forge · 内容创作手册

> 写给写课的人。你不懂 React，不懂 TypeScript，甚至不懂前端——都没关系。
> 你只需要会写 TS 结构的**纯数据**。

---

## 一、一条铁律

**永远不要改 `src/components/`、`src/store/`、`src/pages/` 里的任何文件。**

你在 `src/courses/` 里写课就够了。引擎会自动加载、自动渲染、自动帮你的人话变成漂亮的交互页面。

---

## 二、一课长什么样

每一课是一个独立的 `.ts` 文件，放在 `src/courses/` 下：

```
src/courses/
├── index.ts          ← 课程清单 + 单元定义（章节）
├── 01-variables.ts   ← 第 1 课
├── 02-data-types.ts  ← 第 2 课
├── 03-operators.ts
└── ...
```

每一课的结构如下：

```typescript
// src/courses/01-variables.ts —— 真实例子
import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: 'variables',           // 唯一 ID，不能重
    chapter: 1,                // 关卡编号，显示在圆点上
    title: '变量',              // 关卡名称
    subtitle: '给数据取个名字', // 副标题
    description: '理解变量是什么，学会声明和赋值',
    objectives: [
      '理解变量的概念',
      '学会声明 int 类型变量',
    ],
    estimatedMinutes: 8,       // 预计耗时
  },
  blocks: [                    // 核心：所有教学块
    // ...
  ],
}

export default lesson
```

### meta 字段速查

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 全项目唯一，建议英文，如 `variables` |
| `chapter` | ✅ | 关卡编号（1-99），显示在时间线圆点上 |
| `title` | ✅ | 关卡标题，2-4 个字最好 |
| `subtitle` | ✅ | 一行副标题 |
| `description` | ✅ | 1-2 句话描述 |
| `objectives` | ✅ | 学习目标数组，写 2-3 条 |
| `estimatedMinutes` | ✅ | 大概需要的分钟数 |

---

## 三、全部 Block 类型参考（17 种）

所有 17 种 Block 按教学递进分为 6 层。从认概念开始，到能跑真实代码，再到用场景容器编排复杂展示，最后用动画演示引擎制作交互式幻灯片。

---

### 第一层：认概念

建立术语直觉，不要求操作。

### 1️⃣ `exposition` —— 概念讲解

适合：**引入新概念、一句话说清楚、配例子。**

```typescript
{
  type: 'exposition',
  text: '变量就像是程序里的一个`有名字的盒子`。',
  code: 'int health = 100;',
  textAnimation: 'typewriter',   // 可选
  icon: 'Lightbulb',              // 可选，见第九章
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `text` | ✅ | 讲解文本。反引号 `` `code` `` 内的代码自动语法高亮 |
| `code` | 可选 | 展示代码，自动放入深色代码块 |
| `language` | 可选 | 默认 `cpp`，一般不必填 |
| `textAnimation` | 可选 | `'typewriter'`（逐字打出 + 闪烁光标）或 `'reveal'`（逐词淡入上滑） |
| `icon` | 可选 | 左侧装饰图标，写 Phosphor 图标名即可（见第九章） |

> **textAnimation 选择**：不加 → 文字直接显示。`'typewriter'` → 字符逐字打出，适合关键概念。`'reveal'` → 逐词淡入上滑，适合节奏舒缓的讲解。
> 
> **Markdown 支持**：所有文本字段支持 `**粗体**`、`` `行内代码` ``、`==高亮==`（带背景底色的突出显示效果）。见下方语法速查。
> 
> **自动继续**：exposition 是 passive block，用户读完即可点"继续"，不需要手动标记完成。

---

### 2️⃣ `concept-cards` —— 概念卡

适合：**像多邻国翻单词卡一样，快速建立 2-4 个术语的直觉。**

```typescript
{
  type: 'concept-cards',
  instruction: '认识 int、health、=、；四个部件：',
  cards: [
    { icon: 'Package', term: 'int',     meaning: '整数类型',        example: 'int / float' },
    { icon: 'Tag',     term: 'health', meaning: '变量名，你取的',  example: '见名知意' },
    { icon: 'Equals',  term: '=',       meaning: '赋值，不是等于', example: 'a = 5' },
    { icon: 'Clock',   term: ';',       meaning: '每条语句收尾',   example: '忘了就报错' },
  ],
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | 引导语 |
| `cards[]` | ✅ | 概念卡数组，建议 2-4 张 |
| `cards[].term` | ✅ | 术语本身 |
| `cards[].meaning` | ✅ | 一句人话解释，不超过 30 字 |
| `cards[].example` | 可选 | 极短代码样例 |
| `cards[].glyph` | 可选 | emoji（兼容旧写法） |
| `cards[].icon` | 可选 | Phosphor 图标名（跟 glyph 二选一，推荐） |

> **图标**：`icon` 字段写 Phosphor 图标名即可（如 `'Package'`、`'Tag'`），引擎自动渲染。不写则无图标。见第九章完整列表。

---

### 第二层：动手练

从看变成做。不需要理解深层原理，照做就行。

### 3️⃣ `type-it` —— 跟着敲

适合：**建立肌肉记忆。键盘不熟、符号位置不记得——敲一遍就记住了。**

```
范本:  int score = 0;
输入:  int scpre = 0;
           ↑ 红色     ← 实时逐字着色
```

```typescript
{
  type: 'type-it',
  instruction: '试着输入这行代码：',
  code: 'int score = 0;',
  hints: [
    '注意 `int` 和 `score` 之间有一个空格',
    '别忘了末尾的分号 `;`',
    '`=` 是赋值符号，不是数学等于',
  ],
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | 指引文字 |
| `code` | ✅ | 需要敲的代码字面值 |
| `hints` | ✅ | 提示数组，至少 1-3 条 |
| `exactMatch` | 可选 | 默认 `false`（忽略空白差异） |

> **实时反馈**：用户打字时，范本代码会**逐字着色**——正确字符变亮绿，错误字符变亮红+下划线，未打到部分保留语法高亮颜色。不需配任何额外数据，自动生效。
> 
> **代码字体**：范本和输入框右上角都有 ＋/－ 按钮，调一次全局统一，设置会记住。

---

### 4️⃣ `match-blocks` —— 拼装

适合：**语法的"顺序"本身就是知识时——比如 `int score = 5;` 这 5 个碎片谁排谁后。**

```typescript
{
  type: 'match-blocks',
  instruction: '按正确顺序排列，声明变量 `damage` 并赋值为 50。',
  fragments: ['int', 'damage', '=', '50', ';'],
  distractors: ['float'],
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | 引导语 |
| `fragments` | ✅ | **按正确顺序**写，展示时自动打乱 |
| `distractors` | 可选 | 干扰碎片 |

---

### 第三层：选对错

打误区、做辨析。

### 5️⃣ `multiple-choice` —— 选择题

适合：**概念辨析、检查理解、打常见错误。**

```typescript
{
  type: 'multiple-choice',
  question: '`int lives = 3;` 中，哪个是变量名？',
  options: [
    { text: 'int',   correct: false, explanation: 'int 是类型关键字' },
    { text: 'lives', correct: true,  explanation: 'lives 是变量名' },
    { text: '3',     correct: false, explanation: '3 是值' },
    { text: '=',     correct: false, explanation: '= 是赋值运算符' },
  ],
  mode: 'single',
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `question` | ✅ | 题干 |
| `options[]` | ✅ | 2-6 个选项。`explanation` **必填**——说明为什么对/错 |
| `mode` | 可选 | `'single'`（默认）或 `'multiple'`（多选） |

> **核心**：干扰选项不能随便写——要针对初学者**真实常见的错误理解**。每项的 `explanation` 要说明为什么对/错。

---

### 6️⃣ `compare-snippets` —— 对比辨析

适合：**专门打易混点——`=` vs `==`、`i++` vs `++i`、传值 vs 传引用。**

```
┌───────────────────┬───────────────────┐
│   写法 A           │   写法 B           │
│                   │                   │
│   x = 5;          │   x == 5;         │
│                   │                   │
│   ← 赋值 ✓        │   ← 比较 ✗        │
└───────────────────┴───────────────────┘
```

```typescript
{
  type: 'compare-snippets',
  instruction: '哪一段是"赋值"？',
  question: '注意 = 和 == 的区别',
  snippets: [
    { id: 'a', title: '写法 A', code: 'x = 5;', correct: true, explanation: '= 把值放进去' },
    { id: 'b', title: '写法 B', code: 'x == 5;', correct: false, explanation: '== 是比较' },
  ],
  mode: 'single',
  compareBy: 'meaning',
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | |
| `question` | ✅ | 问题 |
| `snippets[]` | ✅ | 2 段代码，可标记正确/错误 |
| `mode` | 可选 | `'single'`（默认）或 `'multiple'` |
| `compareBy` | 可选 | 对比维度：`output` / `compiles` / `style` / `meaning` / `safety` |

---

### 第四层：回忆建表达

给框架补关键信息，从"我能认出来"进到"我能写出来"。

### 7️⃣ `fill-in` —— 填空

适合：**跟敲够了、选择题做了，想再难一点点——自己回忆关键词。**

```typescript
{
  type: 'fill-in',
  prompt: '声明整数变量 level 并设为 1',
  template: 'int ____ = ____;',
  answers: ['level', '1'],
  hints: ['第一个空是变量名', '第二个是初始值'],
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `prompt` | ✅ | 任务描述 |
| `template` | ✅ | 用 `____` 标记空位的模板 |
| `answers` | ✅ | 每个空的正确答案，按顺序 |
| `hints` | 可选 | 提示数组 |

> **行为**：每空独立输入，按 Enter 跳到下一空，提交后逐空标绿/红。

---

### 8️⃣ `choose-next-line` —— 搭积木

适合：**从抄代码过渡到自己组织代码的桥梁。每次只决定下一行写什么。**

```
┌───────────────────────────────────────┐
│  #include <iostream>                   │
│  int main() {                          │
│                                       │
│  下一步写什么？                    2/4 │
│                                       │
│  ○ std::cout << "hi";                 │
│  ○ return 0;                          │  ← 选错了
│  ○ }                                  │
└───────────────────────────────────────┘
```

```typescript
{
  type: 'choose-next-line',
  instruction: '一步步写出 main 函数',
  context: '#include <iostream>',
  steps: [
    {
      prompt: '第一行写什么？',
      options: [
        { line: 'int main() {', correct: true },
        { line: 'cout << 1;', correct: false, explanation: '还没进 main' },
      ],
    },
  ],
  finalCode: '#include <iostream>\nint main() { cout << "hi"; }',
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | |
| `context` | ✅ | 初始代码上下文 |
| `steps[]` | ✅ | 每步：prompt + 多个选项 |
| `finalCode` | 可选 | 全部搭完后的完整代码（展示用） |

---

### 第五层：跑起来验证

让代码真正执行，看输出、看变量、改 bug。这是 C++ 学习最核心的环节。

### 9️⃣ `predict-output` —— 先猜后跑

适合：**让用户先在脑中模拟代码执行，猜输出，再看实际结果。矫正心智模型。**

```
┌───────────────────────────────────────┐
│  int x = 3;                           │
│  x = 5;                               │
│  cout << x;                           │
│                                       │
│  输出是什么？                          │
│                                       │
│  ○ 3    × 不对，再想想                 │
│  ○ 5    ✓ 对的！                      │
└───────────────────────────────────────┘
```

```typescript
{
  type: 'predict-output',
  instruction: '这段代码输出什么？',
  code: 'int x = 3;\nx = 5;\nstd::cout << x;',
  expectedOutput: '5',
  options: [
    { text: '3', correct: false, explanation: '第二行把 x 重新赋值了' },
    { text: '5', correct: true, explanation: '最后输出 x 当前的值' },
  ],
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | |
| `code` | ✅ | 代码 |
| `expectedOutput` | ✅ | 正确输出 |
| `options[]` | 可选 | 提供选项则做选择题；不提供直接展示运行结果 |
| `accept[]` | 可选 | 多个可接受答案 |
| `comparison` | 可选 | 比对模式，默认 `'trimmed'` |
| `hints` | 可选 | |

---

### 🔟 `code-runner` —— 代码运行器

适合：**让用户跑真实 C++ 代码、看输出、自动比对结果。不要在 0 基础早期用——认知负担重。**

```
┌───────────────────────────────────────┐
│  [▶ 运行]                              │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │  #include <iostream>            │  │  ← 可编辑
│  │  int main() {                   │  │
│  │    cout << "hello";             │  │
│  │  }                              │  │
│  └─────────────────────────────────┘  │
│                                       │
│  输出: hello  ✓                       │
└───────────────────────────────────────┘
```

```typescript
{
  type: 'code-runner',
  instruction: '实现函数返回最大值',
  code: `#include <iostream>\nint max(int a, int b) { ... }`,
  expectedOutput: '20',
  comparison: 'trimmed',
  editable: true,
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | 任务描述 |
| `code` | ✅ | 待编译运行的 C/C++ 代码 |
| `language` | 可选 | `'cpp'`（默认）或 `'c'` |
| `expectedOutput` | 可选 | 预期输出，设置后**自动比对**，匹配才算通过 |
| `comparison` | 可选 | 比对模式，默认 `'trimmed'`（见下方） |
| `editable` | 可选 | 代码是否可编辑，默认 `true` |
| `flags` | 可选 | 编译标志 |

**比对模式 5 种**：

| 模式 | 规则 | 场景 |
|------|------|------|
| `'trimmed'` | 去首尾空白后比较 | 最常用，忽略多余换行空格 |
| `'exact'` | 完全一致 | 严格要求输出格式 |
| `'contains'` | 实际输出包含即可 | 答案不唯一时 |
| `'regex'` | 正则匹配 | 复杂模式 |
| `'none'` | 不比对，运行成功即过 | 开放练习 |

**运行流程**：浏览器内 Clang → LLD → WASI 沙箱执行。第一次需下载 ~40MB，之后秒级。支持 C++17、模板、STL，**不支持**异常和多线程（WASI 限制）。

**写课建议**：

```
// 模板题留空 + expectedOutput
{
  type: 'code-runner',
  code: `#include <iostream>\ntemplate<typename T>\nT max(T a, T b) { // TODO }`,
  expectedOutput: '7 2.5',
  comparison: 'trimmed',
}

// 探究题不加 expectedOutput
{
  type: 'code-runner',
  code: 'int x = 3.14; cout << x;',
  comparison: 'none',
}
```

> **课程现状**：目前在 319 课中用了 **229 次**，是最常用的高级 Block。

---

### 1️⃣1️⃣ `trace-state` —— 变量追踪

适合：**逐行执行，看每步变量值的变化。赋值覆盖、循环追踪、指针地址。**

```
┌───────┬───────────────────────────────┐
│ 代码   │  变量                          │
│       │                               │
│  int x │  ┌─────┐                     │
│  = 5;← │  │ x=5 │                     │
│       │  └─────┘                     │
│  x=x+1 │  ┌─────┐                     │
│  ;     │  │ x=6 │                     │
│       │  └─────┘                     │
└───────┴───────────────────────────────┘
```

```typescript
{
  type: 'trace-state',
  instruction: '逐行追踪变量变化',
  code: 'int hp = 10;\nhp = hp - 3;',
  variables: ['hp'],
  steps: [
    { line: 1, values: { hp: 10 }, explanation: '创建 hp，放入 10' },
    { line: 2, values: { hp: 7 }, explanation: '先读旧值 10，减 3，写回 7' },
  ],
  mode: 'step-through',
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | |
| `code` | ✅ | 待追踪的代码 |
| `variables` | ✅ | 要追踪的变量名数组 |
| `steps[]` | ✅ | 每步：行号、变量值字典、可选的 stdout/explanation |
| `mode` | 可选 | `'step-through'`（点下一步）或 `'fill-table'`（用户自己填变量值） |

---

### 1️⃣2️⃣ `fix-code` —— 改错

适合：**从"能看出错了"进到"知道怎么改"。两种模式。**

**A. `choose-fix`** —— 从修复方案中选（入门）
```typescript
{
  type: 'fix-code',
  buggyCode: 'int score = 0',
  goal: '补上分号',
  mode: 'choose-fix',
  fixes: [
    { text: '末尾加 ;', correct: true, explanation: '语句用 ; 收尾' },
    { text: '把 int 删了', correct: false, explanation: 'int 是类型不能删' },
  ],
}
```

**B. `edit`** —— 直接在编辑器里改（进阶）
```typescript
{
  type: 'fix-code',
  instruction: '修复类型不匹配',
  buggyCode: 'int x = "hello";',
  mode: 'edit',
  fixedCode: 'int x = 42;',
  comparison: 'exact',
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | |
| `buggyCode` | ✅ | 带 bug 的代码 |
| `goal` | ✅ | 修复目标 |
| `mode` | ✅ | `'choose-fix'` 或 `'edit'` |
| `fixes[]` | choose 模式 | 修复选项 |
| `fixedCode` | edit 模式 | 正确最终代码 |
| `bugs[]` | 可选 | bug 描述（行号、标签、hint、可关联误区 ID） |
| `hints` | 可选 | |

---

### 第六层：高级 Block

下面 4 种是复杂教学容器。协议和组件均已实现，适合需要多步演示、可视化追踪、长文联动的场景。

### 1️⃣3️⃣ `scene` —— 场景容器 🆕 设计

**不是交互类型，是容器。** 把多个子步骤放在同一页，解决"一个概念需要多步展示但翻页打断心流"的问题。

```
┌───────────────────────────────────────┐
│  变量赋值全过程                  2/3   │  ← 步骤指示器
│                                       │
│  上一步：int x;                        │
│                                       │
│  ▶ 当前步：x = 5;                      │  ← 代码高亮当前行
│                                       │
│  ┌── 变量状态 ──────┐                  │
│  │  x = 5          │                  │  ← 值实时变化
│  └─────────────────┘                  │
│                                       │
│          [上一步] [下一步 →]            │
└───────────────────────────────────────┘
```

适用场景：讲透"赋值覆盖"（`x = 5; x = 3;` 每一步 x 变多少）、讲解指针新建和指向、讲清楚函数调用的参数传递过程。

```typescript
{
  type: 'scene',
  title: '变量赋值全过程',
  steps: [
    {
      text: '声明 int 变量 x',
      code: 'int x;',
      highlight: { line: 1 },
      state: { boxes: [{ id: 'x', label: 'x', value: '?', state: 'uninitialized' }] },
    },
    {
      text: '把 5 赋给 x',
      code: 'x = 5;',
      state: { boxes: [{ id: 'x', label: 'x', value: '5', state: 'updated' }] },
    },
  ],
  advanceMode: 'click',     // click | scroll | auto
}
```

| 字段 | 说明 |
|------|------|
| `title` | 场景标题 |
| `steps[]` | 子步骤，每个可包含 text、code、highlight、state |
| `advanceMode` | `'click'`（点击推进）、`'scroll'`（滚动推进）、`'auto'`（自动播放） |

---

### 1️⃣4️⃣ `memory-visualizer` —— 内存可视化 🆕 设计

适合：**C++ 最核心的认知门槛——变量、指针、引用、深浅拷贝，全部用左代码右内存的方式呈现。**

```
┌─────────────────────┬─────────────────────┐
│  代码                │  内存                │
│                      │                     │
│  int x = 5;     ←    │  地址    变量  值    │
│  int* p = &x;        │  0x100   x     10   │
│  *p = 10;            │  0x108   p  ──→     │  ← 箭头指向 x
│                      └─────────────────────┘
│  [◀ 上一步] [下一步 ▶]                      │
└─────────────────────────────────────────────┘
```

适用场景：指针（p 存地址 / *p 取值）、引用（别名）、深浅拷贝、new/delete、函数调用栈。

```typescript
{
  type: 'memory-visualizer',
  code: 'int x = 5;\nint* p = &x;\n*p = 10;',
  instructions: '观察每步内存变化',
  steps: [
    { line: 1, highlight: 'x',
      stack: [{ id: 'x', addr: '0x100', value: 5 }] },
    { line: 2, highlight: 'p',
      stack: [
        { id: 'x', addr: '0x100', value: 5 },
        { id: 'p', addr: '0x108', value: '0x100', arrow: 'x' }
      ] },
  ],
  viewMode: 'stack',    // stack | heap | both
}
```

| 字段 | 说明 |
|------|------|
| `code` | 待执行的代码 |
| `steps[]` | 每步：高亮变量 + 内存状态（地址、值、箭头引用） |
| `viewMode` | `'stack'`（仅栈）、`'heap'`（仅堆）、`'both'`（双视图） |

---

### 1️⃣5️⃣ `flow-visualizer` —— 控制流可视化 🆕 设计

适合：**循环和分支在脑子里跑不清楚时——逐行高亮 + 变量当前值 + 条件判断结果。**

```
┌───────────────────────────────────────────┐
│  for (int i = 0; i < 3; i++) {       ←    │
│    cout << i;                              │
│  }                                         │
│                                           │
│  ┌── 变量 ──── 条件判断 ────────────────┐  │
│  │  i = 1      1 < 3 = true → 继续循环  │  │
│  └──────────────────────────────────────┘  │
│                                           │
│  输出: 0                                   │
└───────────────────────────────────────────┘
```

适用场景：初学 for/while 循环（i 怎么从 0 变到 n）、if/else 分支（条件为真走哪条路）、函数调用（调用栈）。

```typescript
{
  type: 'flow-visualizer',
  code: 'for (int i = 0; i < 3; i++) { cout << i; }',
  steps: [
    { line: 1, vars: { i: 0 }, condition: '0 < 3 = true' },
    { line: 2, vars: { i: 0 }, stdout: '0' },
    { line: 1, vars: { i: 1 }, condition: '1 < 3 = true' },
  ],
}
```

| 字段 | 说明 |
|------|------|
| `code` | 待执行的代码 |
| `steps[]` | 每步：当前行号、变量值、条件判断、输出 |
| `mode` | `'step-through'` 或 `'fill-table'` |

---

### 1️⃣6️⃣ `scroll-narrative` —— 滚动叙事 🆕 设计

适合：**长篇讲解需要连续感。不是翻页，是滚动时代码高亮自动切换。**

```
     ┌─────────────────────────┐
     │  先看这行代码：          │  ← 刚进入视野
     │  int x = 5;             │
     │           ↑             │  ← int 高亮
     └─────────────────────────┘

     ┌─────────────────────────┐
     │  x 是变量名，可任意取   │  ← 滚到这里自动切换
     │  int x = 5;             │
     │       ↑                 │  ← 现在 x 高亮
     └─────────────────────────┘
```

适用场景：一段代码要拆开讲解每个部分时（如 `int health = 100;` 一行讲 int / health / = / 100 / ; 五个部分）。

```typescript
{
  type: 'scroll-narrative',
  sections: [
    { text: '先看这行代码，注意 int 的位置', code: 'int x = 5;', highlight: 'int' },
    { text: 'x 是变量名，可以任意取', code: 'int x = 5;', highlight: 'x' },
    { text: '5 是赋给 x 的值', code: 'int x = 5;', highlight: '5' },
  ],
}
```

| 字段 | 说明 |
|------|------|
| `sections[]` | 每节：讲解文本 + 代码 + 高亮位置，滚动到该节时自动切换 |

---

### 1️⃣7️⃣ `animated-timeline` —— 动画演示引擎 ✅ 已实现

> 跨学科通用：C++ 走读、MySQL 查询过程、数学公式推导——任何需要"逐步展示 + 平滑动画"的教学场景。

**不是容器，也不是练习——是演示引擎。** 将一个概念拆成多个场景，每个场景是屏幕上一组元素的快照。引擎自动在两个场景之间做平滑插值过渡。

```
┌─ 旁白 ────────────────────────────────────────┐
│  第一步：SELECT 选择列                         │
├────────────────────────────────────────────────┤
│                                                │
│  ┌─ 代码 ────────────┐  ┌─ 数据表 ──────────┐ │
│  │ SELECT name, age ◄─│  │ name │ age        │ │
│  │ FROM users         │  │ 小明 │ 20         │ │
│  │ WHERE age > 18     │  │ 小红 │ 17         │ │
│  └────────────────────┘  └───────────────────┘ │
│                                                │
│            ◉──────────○─────────○               │
│             步骤 1/3                            │
└────────────────────────────────────────────────┘
```

**适合**：逐行讲解代码、执行过程可视化、前后状态对比、公式推导、概念多层揭示。

```typescript
{
  type: 'animated-timeline',

  // 全局配置（可选）
  config: {
    navigation: 'click',              // click | auto | scroll
    defaultDuration: 500,              // 每步过渡毫秒数
    narrationPosition: 'top',          // top | bottom | overlay
    showStepIndicator: true,
    allowSeek: false,                  // 允许拖拽进度条
  },

  // 场景序列
  scenes: [
    // 全量模式（默认）：每步写完整快照
    {
      narration: '第一步：SELECT 选择要显示的列',
      elements: [
        { type: 'code', id: 'query', code: 'SELECT name, age\nFROM users\nWHERE age > 18',
          language: 'sql', highlightedLines: [1] },
        { type: 'table', id: 'users', headers: ['name','age'], rows: [['小明','20'],['小红','17']] },
      ],
    },
    // 增量模式：只写变化的部分
    {
      mode: 'delta',
      narration: '第二步：WHERE 过滤出符合条件的行',
      elements: [
        { type: 'code', id: 'query', highlightedLines: [3] },
        { type: 'table', id: 'users',
          highlightedRows: [0], fadedRows: [1] },
      ],
    },
  ],
}
```

### 支持的元素类型

| 元素 | type | 主要属性 | 跨场景动画 |
|------|------|---------|-----------|
| 代码 | `code` | `code`, `language`, `highlightedLines[]`, `emphasizedLines[]`, `fadedLines[]`, `inlineHighlights[]` | 行高亮平滑切换；相同 id+不同 code 自动 morph |
| 表格 | `table` | `headers[]`, `rows[][]`, `highlightedRows[]`, `fadedRows[]`, `highlightedCols[]`, `cellEmphasis[]` | 行淡入/淡出、高亮移动、单元格色阶过渡 |
| 文本 | `text` | `content`, `variant`（title/subtitle/body/caption/label）, `align` | 滑入/滑出 |
| 卡片 | `card` | `title`, `content`, `variant`（default/raised/sunk/border-only）, `accent`（ember/sage/gold/ink） | 缩放淡入 |
| 高亮框 | `highlight` | `targetElement`, `shape`（box/circle/underline）, `effect`（pulse/glow/static） | 平滑跟随目标位置 |
| 箭头 | `arrow` | `fromElement`, `toElement`, `label`, `animated` | 自动连线，animate 开启流动虚线 |
| 组合 | `group` | `children[]`, `direction`, `gap` | 递归渲染子元素，整体动画 |

### 场景模式

| 模式 | 写法 | 适用 |
|------|------|------|
| `full`（默认） | 每步写完整元素列表 | 每步变化大、作者想精确控制 |
| `delta` | 只写变化的元素，不变的元素继承上一步 | 单步只改 1-2 个元素，省字数 |

### 动画过渡规则

```
上一步中的 id                  下一步中的 id                结果
存在                           不存在                      元素淡出消失
不存在                         存在                        元素按 enterAnimation 进入
存在（内容变了）                 存在（内容变了）              平滑变形 morph
存在（没变）                    存在（没变）                 保持原位不动
```

### 缓动预设

| 预设 | 效果 | 适合 |
|------|------|------|
| `ease-out`（默认） | 先快后慢减速 | 通用场景 |
| `ease-in-out` | 平缓起止 | 严谨/学术感 |
| `spring` | 轻轻弹一下 | 强调/惊喜 |
| `bounce` | 落地弹跳 | 庆祝/完成 |
| `smooth` | 恒速 | 数据流动 |
| `[x1,y1,x2,y2]` | 自定义 cubic-bezier | 高级控制 |

### 作者技巧

- **元素用有意义的 id**（`'query'`、`'users-table'`、`'result'`），引擎按 id 匹配过渡
- **相同 id 跨场景**= 平滑变形；不同 id = 出入动画
- **增量模式**省事：不变的元素不用重复写
- **不需要写坐标**——引擎根据元素类型自动排版（单 code 居中、code+table 并排、两 table 并列）
- **配色继承主题 token**——不用指定具体色值，写 `accent: 'ember'` 即可

### Block 选择速查

| 你的目标 | 推荐 Block 顺序 |
|----------|--------------|
| 引入全新概念 | `exposition` → `concept-cards` → `type-it` |
| 打易混点（= vs ==） | `compare-snippets` → `multiple-choice` × 2-3 → `fix-code` |
| 巩固语法模式 | `type-it` × 2-3 → `multiple-choice` × 2 → `fill-in` |
| 矫正心智模型 | `predict-output` → `trace-state` → `fix-code` |
| 从跟敲到独立写 | `type-it` → `match-blocks` → `choose-next-line` |
| 多步概念展示 | `scene` / `scroll-narrative`（同一页内连续展示） |
| 指针/内存理解 | `memory-visualizer`（左代码右内存图） |
| 循环/分支追踪 | `flow-visualizer`（逐行 + 变量 + 条件） |
| 动画逐步演示（任意学科） | `animated-timeline`（代码旁白+表格+平滑过渡） |
| 跨学科状态对比 | `animated-timeline` with 增量模式（逐帧揭示） |
| 动手验证 | `code-runner` |

> **早期阶段**优先用 Recognition / Imitation / Discrimination，不要太早要求 Production。用户是 0 基础，微成功比一次大挑战更重要。

---

## 四、教学元数据（teaching 字段）

每个 block 都可以额外写 `teaching` 字段，不写也能正常运行。写了之后，AuthorTaxonomyPanel 可以按这些维度过滤课程，分析学习缺口。

```typescript
{
  type: 'multiple-choice',
  question: '...',
  options: [...],
  teaching: {
    subject: 'cpp',
    contentKind: 'lesson',
    cognitiveStage: 'discrimination',
    knowledgePoints: [{ id: 'cpp.variable.assignment', label: '变量赋值' }],
    misconceptionTarget: 'confuses-assignment-with-equality',
    checkpointLevel: 'tiny',
  },
}
```

### 字段速查

| 字段 | 必填 | 可选值举例 | 说明 |
|------|------|-----------|------|
| `subject` | 可选 | `'cpp'` / `'dsa'` / `'unreal-cpp'` | 属于哪个学科 |
| `contentKind` | 可选 | `'lesson'` / `'practice'` / `'challenge'` / `'review'` | 内容类型 |
| `cognitiveStage` | 可选 | 见下方认知阶段表 | 这个 block 处在哪个认知阶段 |
| `knowledgePoints[]` | 可选 | `[{ id: 'cpp.variable', label: '变量' }]` | 关联的知识点 ID |
| `misconceptionTarget` | 可选 | `'confuses-assignment-with-equality'` | 这个 block 打的是哪个常见误区 |
| `checkpointLevel` | 可选 | `'tiny'` / `'normal'` / `'challenge'` | 难易程度 |

### 认知阶段表

| 阶段 | 含义 | 适合的 Block |
|------|------|-------------|
| `recognition` | 见过这个符号 | exposition, concept-cards |
| `meaning` | 知道它是干什么的 | exposition |
| `imitation` | 能照着抄 | type-it |
| `discrimination` | 能分辨对错 | multiple-choice, compare-snippets |
| `recall` | 给框架能补完 | fill-in, choose-next-line |
| `production` | 自己写出来 | code-runner |
| `transfer` | 换场景还能用 | code-runner（新例题） |
| `predict` | 先猜后验证 | predict-output |
| `trace` | 追踪状态变化 | trace-state |
| `repair` | 找到并修复错误 | fix-code |
| `compare` | 对比两段代码差异 | compare-snippets |

---

## 五、布局协议（layout 字段）

每个 block 的代码和交互区怎么排，由引擎自动决定。也可以手动覆盖。

### 自动规则

| 情况 | 引擎自动选 |
|------|-----------|
| 短代码（<=3 行） | `stack`：上下排列，窄宽度 |
| 长代码（>3 行）的 trace-state / fix-code / predict-output / choose-next-line | `split`：左右分栏，左边参考代码，右边交互区 |
| 其他 | `stack` |

作者什么也不写，引擎自己判断。

### 手动覆盖

想强制分栏、改变参考代码位置、调整比例：

```typescript
{
  type: 'code-runner',
  code: '...',
  layout: {
    mode: 'split',                      // 'stack' | 'split' | 'auto'
    intent: 'code-and-output',           // 语义意图，帮助 AI 理解
    split: {
      referenceSide: 'left',            // 参考代码放左还是右
      referenceRatio: 'balanced',       // 'narrow' | 'balanced' | 'wide'
    },
    reference: {
      title: '参考代码',
      sticky: true,                     // 滚动时固定
      collapseOnMobile: true,           // 手机上可收起
    },
    mobile: 'reference-first',          // 手机上的策略
  },
}
```

### mobile 策略

| 值 | 效果 |
|------|------|
| `'stack'` | 手机上一律上下排 |
| `'tabs'` | 参考代码和交互区切换 |
| `'reference-first'` | 先显示参考代码 |
| `'reference-after'` | 先显示交互区 |

**最佳实践**：短的代码展示用 stack，长的代码/需要反复参考的用 split。大部分情况不需要写 layout 字段。

---

## 六、动画协议（animation 字段）

协议已定义、文档已写好，但**动画播放器尚未实现**。当前 `trace-state` 的变量盒和时间线已可渲染，完整的动画播放器是后续功能。

```typescript
{
  type: 'trace-state',
  code: 'int hp = 10;\nhp = 7;',
  variables: ['hp'],
  steps: [
    { line: 1, values: { hp: 10 } },
    { line: 2, values: { hp: 7 } },
  ],
  animation: {
    preset: 'memory-box',         // 6 种预设
    emphasis: 'medium',
    steps: [
      { narration: '创建 hp 盒子', line: 1,
        boxes: [{ id: 'hp', label: 'hp', value: 10, state: 'create' }] },
    ],
  },
}
```

6 种预设：`demo-scene` / `state-timeline` / `branch-play` / `memory-box` / `spotlight` / `trace`。

现在是"先写在内容里，等播放器做好了自动生效"的阶段。

---

## 七、单元（Chapter）系统

课程在关卡选择页是按**单元**分组的。单元定义在 `src/courses/index.ts` 的 `chapters` 数组里：

```typescript
export const chapters: Chapter[] = [
  {
    id: 'syntax-foundation',
    badge: '学习路线',        // 角标文字
    title: '逐关锻造',          // 大标题
    description: '从变量开始，一关解锁下一关，稳稳推进到指针。',
    courseIds: ['variables', 'data-types', ...],  // 引用的课程 ID
  },
  // 加新单元只需在此追加
]
```

- `courseIds` 引用课程 `meta.id`
- 顺序即显示顺序
- 单元之间自动画分隔线

---

## 八、写课的流程

### 第一步：建文件

```
src/courses/11-new-lesson.ts
```

### 第二步：填 meta + blocks

参考上面各 block 类型的写法。

### 第三步：注册到 index.ts

```typescript
// src/courses/index.ts
import lesson11 from './11-new-lesson'

export const courses: Lesson[] = [
  // ... 现有课程
  lesson11,
]
```

如果是新单元，还要在 `chapters` 数组里追加。

### 第四步：预览

```bash
npm run dev
```

---

## 九、写作风格指南

### 讲人话

```
❌ "变量是内存中用于存储数据的抽象位置"
✅ "变量就是一个有名字的盒子，你可以往里面放一个值"
```

### 一节课只讲一个核心概念

一课讲透"变量是什么"就够了，别把变量 + 类型 + 运算符都塞一起。

### hint 要写够

`type-it` 的 `hints` 写 3 条以上：
1. 语法格式类（"int 和 score 之间要有空格"）
2. 语义理解类（"= 是赋值，不是数学等于"）
3. 常见错误类（"分号不能丢"）

### exposition code 精简

展示代码不超过 3-5 行，只展示核心。

### concept-cards meaning 一句话

不超过 30 字。用户是来扫读的，不是来读书的。

### 善用 textAnimation

关键概念用 `'typewriter'` 逐字打出吸引注意力，普通讲解不用动画。

---

## 十、平台能力总览

写课时自动获得以下功能，无需任何额外配置：

### 动画库

| 组件 | 效果 | 触发方式 |
|------|------|----------|
| `TypewriterText` | 字符逐字打出 + 闪烁光标 | `exposition.textAnimation: 'typewriter'` |
| `RevealText` | 逐词（或逐字）淡入上滑 | `exposition.textAnimation: 'reveal'` |
| `AttentionPulse` | 周期性脉冲高亮 | 暂未开放给内容层 |
| `ShakeOnError` | 答错时水平抖动 | type-it / multiple-choice 自动触发 |

> **多行文本行为**：两种动画均按行逐行推进。写完当前行所有字符/词后，光标（或揭示遮罩）跳到下一行。不会出现多行同时逐字揭示的混乱效果。多行文本用普通换行 `\n` 分隔即可，动画自动按行切分。

### Markdown 语法速查

所有文本字段（`text`、`instruction`、`description`、`explanation` 等）支持以下 Markdown 语法：

| 语法 | 效果 | 示例 |
|------|------|------|
| `**文字**` | **粗体** — 强调核心术语 | `**变量**是一个盒子` → **变量**是一个盒子 |
| `` `代码` `` | `行内代码` — 提及代码元素 | `` 用 `int` 声明整数 `` → 用 `int` 声明整数 |
| `==文字==` | ==高亮== — 带背景底色的突出显示 | `==重点==` → ==重点==（暖橘色背景 + 深色文字） |
| `[官网](https://...)` | 超链接，点击新窗口打开 | `[C++ 官网](https://cppreference.com)` |
| `> 引用` | 引用块，可嵌套 | `> 注意：...` |

> **注意**：`==高亮==` 内的文本支持嵌套 Markdown，例如 `==**重要**概念==` 会同时显示粗体和背景高亮。

### CSS 动画

所有 block 载入时自动有 `animate-rise`（上滑浮现）。更多可用 class：`animate-fade-in`、`animate-pop`、`animate-slide-in`。

### 交互辅助

- **键盘快捷键**：`Enter/Space` 继续、`←` `→` 上一步/下一步、`Esc` 退出、`H` 提示、`Ctrl+Enter` 运行代码
- **代码运行器**：内嵌真实 Clang 编译器，一键编译→链接→执行
- **代码字体调节**：所有代码框右上角 ± 按钮，调一次全局统一
- **逐字着色**：type-it 范本根据输入实时绿/红着色
- **断点续学**：关闭页面后回到首页自动显示"继续第 X 课"
- **学习统计**：关卡选择页显示已完成/满星/学时
- **关卡奖励**：xp + 星星 + perfect 标记

### Phosphor Icons 图标库

平台使用 [Phosphor Icons](https://phosphoricons.com)（MIT 开源，907 个图标）。作者无需写 React 代码——直接写图标名字符串，引擎自动渲染。

**在数据中使用（推荐方式）**：

```typescript
// 在 exposition 上加一个装饰图标
{
  type: 'exposition',
  text: '变量是一个有名字的盒子',
  icon: 'Lightbulb',
}

// 在 concept-cards 中做概念配图
{
  type: 'concept-cards',
  instruction: '认识四种部件：',
  cards: [
    { icon: 'Package', term: 'int', meaning: '整数类型' },
    { icon: 'Tag', term: 'health', meaning: '变量名' },
  ],
}
```

> 所有 907 个图标名见 [Phosphor Icons 官网](https://phosphoricons.com)。只需写图标名（如 `'Lightbulb'`、`'Package'`、`'Clock'`），不用写 `<BookOpen />` 这种组件语法。

**`icon` 支持两种写法**：

```typescript
// 简单写法：用 regular weight，默认颜色
icon: 'Lightbulb'

// 完整写法：指定 weight 和颜色
icon: { name: 'Lightbulb', weight: 'bold', color: 'text-amber' }
```

**weight 可选项**：`thin` / `light` / `regular` / `bold` / `fill` / `duotone`

**引擎预封装图标（直接可用的组件名）**：LogoIcon / LockIcon / UnlockIcon / CheckIcon / StarIcon / ArrowRightIcon / ArrowLeftIcon / PlayIcon / CodeIcon / KeyboardIcon / LightbulbIcon / MouseIcon / TrophyIcon / TargetIcon / CorrectIcon / IncorrectIcon / HomeIcon / ResetIcon / ChapterIcon

---

## 十一、自检清单

每写完一课，用这个清单走一遍：

### 概念检查
- [ ] 这节课是不是一口气教了好几个新概念？（一课只讲一个核心）
- [ ] 是不是假设初学者已经能流畅阅读代码了？（他们是 0 基础）
- [ ] 有没有完全没讲过的术语突然出现？（先做 concept-cards 或 exposition）
- [ ] `exposition` 的代码是否 <= 3-5 行？

### Block 选择检查
- [ ] block 类型和当前认知阶段匹配吗？（recognition 不要用 code-runner）
- [ ] 有没有直接从 exposition 跳到 production 缺少 imitation/discrimination 过渡？
- [ ] `type-it` 的 `hints` 是否 >= 3 条？
- [ ] `multiple-choice` 的干扰选项是否针对真实常见错误？
- [ ] 每个 `option` 的 `explanation` 有没有说明为什么对/错？

### 质量检查
- [ ] hint 是真正帮助恐慌的初学者，还是只是重复代码本身？
- [ ] pace 是太急还是太拖？
- [ ] 自己当学生走一遍，有没有哪个地方需要想一下才能走通？

> "自己走得通"是第一道质量门。

---

## 十二、完整一课走查

以设计"什么是变量"为例，从零到写完的完整过程。

### 1. 定目标

```
核心概念：变量是有名字的盒子，可以存一个值。
假定前提：完全不会写代码。
出口能力：能声明一个 int 变量并赋值。
```

### 2. 选 Block 序列

根据"引入全新概念"模板走：

```
1. exposition（讲"盒子"比喻）
2. concept-cards（认识 int / 变量名 / = / ;）
3. type-it（照着敲 int score = 0;）
4. multiple-choice（"int score = 5; 哪个是变量名"）
5. type-it（再敲一个 int level = 1;）
6. fill-in（补全 int ____ = ____;）
```

### 3. 写 meta

```typescript
meta: {
  id: 'what-is-variable',
  chapter: 1,
  title: '变量',
  subtitle: '给数据取个名字',
  description: '理解变量是什么，学会声明和赋值',
  objectives: ['理解变量的概念', '学会声明 int 类型变量'],
  estimatedMinutes: 8,
}
```

### 4. 写 blocks

```typescript
blocks: [
  {
    type: 'exposition',
    text: '变量就是程序里的一个`有名字的盒子`，你可以往里面放一个值。',
    code: 'int health = 100;',
    icon: 'Lightbulb',
  },
  {
    type: 'concept-cards',
    instruction: '先认识这条代码里的四个部件：',
    cards: [
      { icon: 'Package', term: 'int',     meaning: '整数类型' },
      { icon: 'Tag',     term: 'health',  meaning: '变量名，你取的名字' },
      { icon: 'Equals',  term: '=',       meaning: '赋值，不是等于' },
      { icon: 'Clock',   term: ';',       meaning: '语句结束' },
    ],
  },
  {
    type: 'type-it',
    instruction: '敲一遍变量声明：',
    code: 'int score = 0;',
    hints: [
      'int 和 score 之间要空格',
      '= 两边可以加空格，也可以不加',
      '末尾的分号 ; 不能丢',
    ],
  },
  {
    type: 'multiple-choice',
    question: '`int lives = 3;` 中，哪个是变量名？',
    options: [
      { text: 'int',   correct: false, explanation: 'int 是类型关键字' },
      { text: 'lives', correct: true,  explanation: 'lives 就是变量名' },
      { text: '3',     correct: false, explanation: '3 是值' },
      { text: '=',     correct: false, explanation: '= 是赋值运算符' },
    ],
  },
  {
    type: 'type-it',
    instruction: '再敲一个，巩固一下：',
    code: 'int level = 1;',
    hints: ['和上一行一样的结构', '试试能不能不看上面自己打出来'],
  },
  {
    type: 'fill-in',
    prompt: '声明整数变量 并赋值',
    template: 'int ____ = ____;',
    answers: ['x', '10'],
    hints: ['第一个空是变量名，可以随便取', '第二个空是一个整数'],
  },
]
```

### 5. 注册

在 `src/courses/index.ts` 中 import 并加到 `courses` 数组里。如果是新单元还要追加到 `chapters`。

### 6. 预览

```bash
npm run dev
```

自己当学生走一遍。哪里卡住了就加 hint 或调整顺序。

---

## 十三、常见问题

**Q: 改了一课的内容浏览器没更新？**
A: Vite 有热更新。改了 `meta.id` 需手动刷新。

**Q: 一课可以放 10 个 block 吗？**
A: 可以，但建议 4-7 个。10 分钟以内的课最理想。

**Q: 一课可以混用中英文吗？**
A: 可以。`text` 用中文，代码用英文。

**Q: 怎样调 block 顺序？**
A: 直接调 `blocks` 数组元素顺序。

**Q: 新单元怎么做？**
A: 在 `index.ts` 的 `chapters` 数组里追加一个 `Chapter` 对象。关卡选择页自动分组渲染。

**Q: `textAnimation` 什么时候用？**
A: 关键概念、需要吸引注意力的段落用 `'typewriter'`。节奏舒缓的段落用 `'reveal'`。普通段落不加。

**Q: 怎么知道一个图标名能不能用？**
A: 去 [Phosphor Icons 官网](https://phosphoricons.com) 搜。找到后直接用名字字符串。所有图标都支持。

---

> 最后：每写完一课，打开 `npm run dev`，自己当学生走一遍。
> 如果哪个地方你需要想一下才能继续，那就是需要加 hint 或调整顺序的地方。
> 你写课，「自己走得通」是第一道质量门。
