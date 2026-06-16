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

## 三、七种 Block 类型

### 3.1 `exposition` —— 概念讲解

适合：**引入新概念、一句话说清楚、配例子。**

```typescript
{
  type: 'exposition',
  text: '变量就像是程序里的一个`有名字的盒子`。',
  code: 'int health = 100;',
  textAnimation: 'typewriter',   // 可选，见下方说明
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `text` | ✅ | 讲解文本，反引号 `` `code` `` 中的片段自动高亮 |
| `code` | 可选 | 展示代码，自动放入深色"宝石岛"代码块 |
| `language` | 可选 | 默认 `cpp`，一般不必填 |
| `textAnimation` | 可选 | `'typewriter'`（逐字打出）或 `'reval'`（逐词淡入） |

> **`textAnimation` 效果**：不加此字段 → 文字直接显示。`'typewriter'` → 字符一个接一个从光标打出，适合需要集中注意力的关键段落。`'reveal'` → 逐词淡入上滑，适合节奏舒缓的讲解。

> **自动继续**：exposition 是 passive block，用户读完自动可点"继续"，无需手动标记完成。

---

### 3.2 `concept-cards` —— 概念卡

适合：**快速建立一组术语概念，像多邻国翻单词卡。**

```typescript
{
  type: 'concept-cards',
  instruction: '认识 int、health、=、；四个部件：',
  cards: [
    { glyph: '📦', term: 'int',     meaning: '类型，规定只能装整数',   example: 'int / float' },
    { glyph: '🏷️', term: 'health', meaning: '变量名，你取的名字',     example: '见名知意' },
    { glyph: '✏️', term: '=',       meaning: '赋值，不是数学等于',    example: 'a = 5' },
    { glyph: '🔚', term: ';',       meaning: '分号，每条语句收尾',    example: '忘了就报错' },
  ],
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | 引导语 |
| `cards` | ✅ | 概念卡数组，建议 2-4 张 |
| `cards[].term` | ✅ | 术语本身 |
| `cards[].meaning` | ✅ | 一句人话解释，不超过 30 字 |
| `cards[].example` | 可选 | 极短代码样例 |
| `cards[].glyph` | 可选 | emoji 或符号，辅助记忆 |

---

### 3.3 `type-it` —— 跟着敲

适合：**建立肌肉记忆。**

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

> **实时反馈**：用户打字时，上方范本代码会**逐字着色**——正确字符变亮绿，错误字符变亮红+下划线，未打到部分保留语法高亮颜色。不用配任何额外数据，自动生效。

> **代码字体**：范本和输入框右上角都有 ＋/－ 按钮，调一次所有代码框一起变。设置会记住。

---

### 3.4 `multiple-choice` —— 选择题

适合：**概念辨析、易混点。**

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
| `options` | ✅ | 选项数组，2-6 个。`explanation` **必填** |
| `mode` | 可选 | `'single'`（默认）或 `'multiple'`（多选） |

---

### 3.5 `match-blocks` —— 拼装代码

适合：**理解语法顺序、排列碎片。**

```typescript
{
  type: 'match-blocks',
  instruction: '按正确顺序排列，声明变量 `damage` 并赋值为 50。',
  fragments: ['int', 'damage', '=', '50', ';'],
  distractors: ['float'],   // 可选干扰项
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `instruction` | ✅ | 引导语 |
| `fragments` | ✅ | **按正确顺序**写，展示时会自动打乱 |
| `distractors` | 可选 | 干扰项 |

---

### 3.6 `fill-in` —— 填空

适合：**挖关键词巩固语法。**

```typescript
{
  type: 'fill-in',
  prompt: '声明一个整数变量 `level` 并设为 1。',
  template: 'int ____ = ____;',
  answers: ['level', '1'],
  hints: ['第一个空是变量名', '第二个空是初始值'],
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `prompt` | ✅ | 引导语 |
| `template` | ✅ | 带 `____` 空位的模板 |
| `answers` | ✅ | 每个空位的正确答案，按顺序 |
| `hints` | 可选 | 提示数组 |

---

### 3.7 `code-runner` —— 代码运行器 🆕

适合：**让用户运行真实 C++ 代码，看输出，验证理解。**

```typescript
{
  type: 'code-runner',
  instruction: '实现一个函数，返回两个数中较大的那个。',
  code: `#include <iostream>

int max(int a, int b) {
  // 在这里写你的代码
}

int main() {
  std::cout << max(10, 20);
}`,
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
| `expectedOutput` | 可选 | 预期标准输出。**设置后自动比对**，匹配成功才算通过 |
| `comparison` | 可选 | 比对模式，默认 `'trimmed'`（见下方） |
| `editable` | 可选 | 代码是否可编辑，默认 `true` |

#### comparison 比对模式

| 值 | 规则 | 场景 |
|----|------|------|
| `'trimmed'` | 去掉首尾空白后比较 | **最常用**，忽略多余换行空格 |
| `'exact'` | 完全一致 | 严格要求输出格式 |
| `'contains'` | 实际输出包含预期串即可 | 答案不唯一时 |
| `'regex'` | 用正则匹配输出 | 复杂模式匹配 |
| `'none'` | 不比对，运行成功即通过 | 练习答案开放时 |

#### 运行流程（对用户透明）

```
用户点 [▶ 运行]
  → 浏览器中 Clang 编译 → LLD 链接 → WASI 沙箱执行
  → 输出 stdout + stderr
  → 自动比对 expectedOutput（如有）
  → 输出正确（绿）/ 错误（红）提示
```

第一次运行需要下载 **~40MB** 编译工具（Clang/LLVM WASM），会自动在后台静默预下载。之后的运行无需额外下载，秒级完成。

#### 运行能力

| 功能 | 支持 |
|------|------|
| C++17 全部语法 | ✅ 真正的 Clang 编译器 |
| 模板（template） | ✅ |
| `std::vector` / `std::string` / `std::map` | ✅ 完整 STL |
| 类 / 继承 / 多态 | ✅ |
| 输入 `std::cin` | ✅ |
| 异常 `try/catch` | ❌ WASI 限制 |
| 多线程 | ❌ WASI 限制 |

#### 写课建议

**1. 模板题留空 + expectedOutput**
```typescript
{
  instruction: '实现函数模板 max(a, b)，返回最大值。',
  code: `#include <iostream>
template<typename T>
T max(T a, T b) {
  // TODO
}
int main() {
  std::cout << max(3, 7) << " " << max(2.5, 1.8);
}`,
  expectedOutput: '7 2.5',
  comparison: 'trimmed',
}
```
用户补全函数体，运行验证。

**2. 探究题不加 expectedOutput**
```typescript
{
  instruction: '试试把整型变量初始化为浮点数，观察输出变化。',
  code: `#include <iostream>
int main() {
  int x = 3.14;
  std::cout << x;
}`,
  comparison: 'none',  // 不比对，运行成功即过
}
```

**3. 可搭配其他 block 使用**
```
exposition（讲模板语法）→ concept-cards（术语速记）→ code-runner（动手验证）→ multiple-choice（概念辨析）
```

#### 注意事项

- **代码长度**：建议 50 行以内。编译器在浏览器中运行，过长代码编译耗时增加
- **`editable: false`**：代码不可编辑时，只展示语法高亮 + 运行按钮，适合示范代码
- **异常限制**：带 `try/catch` 的代码无法通过 WASI 运行。如果后续课程涉及异常，需换用其他方案

---

## 四、单元（Chapter）系统

课程在关卡选择页是按**单元**分组的。单元定义在 `src/courses/index.ts` 的 `chapters` 数组里：

```typescript
export const chapters: Chapter[] = [
  {
    id: 'syntax-foundation',
    badge: '学习路线',        // 角标文字
    title: '逐关锻造',          // 大标题
    description: '从变量开始，一关解锁下一关，稳稳推进到指针。',  // 描述
    courseIds: ['variables', 'data-types', ...],  // 包含的课程 ID（按顺序）
  },
  // 加新单元只需在此追加：
  // {
  //   id: 'control-flow',
  //   badge: '进阶挑战',
  //   title: '掌控节奏',
  //   description: '条件、循环——让代码自己决定怎么做。',
  //   courseIds: ['conditionals', 'loops', ...],
  // },
]
```

- 每个单元的 `courseIds` 引用 `courses` 数组里的课程 `meta.id`
- 顺序即显示顺序
- 两个单元之间自动显示分隔线
- 加新单元只需在 `chapters` 数组尾部追加，不需要改引擎代码

---

## 五、写课的流程

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

## 六、写作风格指南

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

## 七、平台能力总览

写课时自动获得以下功能，无需任何额外配置：

### 动画库（src/components/animations/）

| 组件 | 效果 | 触发方式 |
|------|------|----------|
| `TypewriterText` | 字符逐字打出 + 闪烁光标 | `exposition.textAnimation: 'typewriter'` |
| `RevealText` | 逐词淡入上滑 | `exposition.textAnimation: 'reval'` |
| `AttentionPulse` | 子元素周期性脉冲高亮 | 包在组件外层（暂未开放给内容层） |
| `ShakeOnError` | 答错时水平抖动 | type-it / multiple-choice 自动触发 |

### CSS 动画（Tailwind + 自定义）

所有 block 载入时自动有 `animate-rise`（上滑浮现）。更多可用 class：`animate-fade-in`、`animate-pop`、`animate-slide-in`。`textAnimation: 'typewriter'` 自带光标闪烁。

### 交互辅助

- **键盘快捷键**：`Enter/Space` 继续、`←` `→` 上一步/下一步、`Esc` 退出、`H` 提示、`Ctrl+Enter` 运行代码
- **代码运行器**：`code-runner` block 内嵌真实 Clang 编译器，一键编译→链接→执行 C++ 代码，支持预期输出自动比对
- **代码字体调节**：所有代码框右上角 ± 按钮，调一次全局生效
- **逐字着色**：type-it 范本根据用户输入实时绿/红着色
- **断点续学**：关闭页面后回到首页自动显示"继续第 X 课"
- **学习统计**：关卡选择页显示已完成/满星/学时

### Phosphor Icons 图标库

平台使用 [Phosphor Icons](https://phosphoricons.com)（开源免费，907 个图标）。引擎组件已集成，内容创作者也可能在需要时直接使用。

**导入方式：**
```typescript
import { BookOpen, Code, Trophy } from '@phosphor-icons/react'
```

**使用方式：**
```tsx
<BookOpen size={20} weight="regular" className="text-ember" />
<Code size={24} weight="bold" />
<Trophy size={32} weight="fill" className="text-gold" />
```

**`weight` 可调参数：**

| 值 | 效果 | 适用场景 |
|----|------|----------|
| `thin` | 极细 | 装饰性 |
| `light` | 轻细 | 辅助信息 |
| `regular` | 标准 | 正文图标 |
| `bold` | 加粗 | 标题 / 强调 |
| `fill` | 实心填充 | 激活态 / 完成态 |
| `duotone` | 双色 | 装饰性 |

**注意：** 图标颜色通过 Tailwind 文本色控制，如 `className="text-ember"`、`text-sage`、`text-gold`、`text-ink`。不传则继承父元素颜色。

**在 concept-cards 中使用：**
`glyph` 字段仍用 emoji 字符串，无需导入图标组件。示例：
```typescript
cards: [
  { glyph: '📦', term: 'int', meaning: '类型，规定只能装整数' },
]
```

**引擎预置导出（`src/components/icons.tsx`）：**
Logo、Lock、Unlock、Check、Star、ArrowRight、ArrowLeft、Play、Code、Keyboard、Lightbulb、Mouse、Trophy、Target、Correct、Incorrect、Home、Reset — 均为 Phosphor 包装，可直接 import 使用。

---

## 八、常见问题

**Q: 改了一课的内容浏览器没更新？**
A: Vite 有热更新。改了 `meta.id` 需手动刷新。

**Q: 一课可以放 10 个 block 吗？** (这里只从参考就行)
A: 可以，但建议 4-7 个。10 分钟以内的课最理想。

**Q: 一课可以混用中英文吗？**
A: 可以。`text` 用中文，代码用英文。

**Q: 怎样调 block 顺序？**
A: 直接调 `blocks` 数组元素顺序。

**Q: 新单元怎么做？**
A: 在 `index.ts` 的 `chapters` 数组里追加一个 `Chapter` 对象。关卡选择页自动分组渲染。

**Q: `textAnimation` 什么时候用？**
A: 关键概念、需要吸引注意力的段落用 `'typewriter'`。节奏舒缓的段落用 `'reval'`。普通段落不加。

---

> 最后：每写完一课，打开 `npm run dev`，自己当学生走一遍。
> 如果哪个地方你需要想一下才能继续，那就是需要加 hint 或调整顺序的地方。
> 你写课，「自己走得通」是第一道质量门。
