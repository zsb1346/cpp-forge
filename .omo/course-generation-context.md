# 课程生成共享上下文

> 所有 AGent 必须读取此文件以获取完整的方法论、格式规范和生成规则。

---

## 一、通用规则

### 1.1 文件名格式

每课一个 `.ts` 文件，放在 `src/courses/` 下：

```
p{phase02d}-l{lesson02d}-{slug}.ts
```

例如：
```
p00-l01-what-is-program.ts  (阶段0, 第1课)
p01-l01-what-is-value.ts    (阶段1, 第1课)
p02-l01-arithmetic-plus.ts  (阶段2, 第1课)
```

### 1.2 每课结构

```typescript
import type { Lesson } from '../types/protocol'

const lesson: Lesson = {
  meta: {
    id: '唯一英文slug',     // 全局唯一
    chapter: 阶段编号+1,     // 用户界面显示用
    title: '2-4字标题',
    subtitle: '一行副标题',
    description: '1-2句话描述',
    objectives: ['目标1', '目标2'],
    estimatedMinutes: 8,   // 6-12分钟
  },
  blocks: [
    // 8-14 个 block
  ],
}

export default lesson
```

### 1.3 meta 字段要求

| 字段 | 要求 |
|------|------|
| `id` | 全项目唯一英文 slug，如 `what-is-value` |
| `chapter` | 阶段号（0-based）+ 1，如阶段1→chapter=2 |
| `title` | 短标题，2-4 字 |
| `subtitle` | 一行，15字以内 |
| `description` | 1-2 句 |
| `objectives` | 2-3 条，用"能……"句式 |
| `estimatedMinutes` | 6-12 |

### 1.4 写作语言

- text 用**简体中文**
- 语气：**具体、直接、情绪稳定、尊重、不居高临下、少术语、低压缩**
- 避免：教科书式抽象、堆术语的定义、"顾名思义""显然""我们知道"
- code 用英文

### 1.5 每课的 Block 推荐骨架

```
早期初学者（阶段0-3）:
  exposition → concept-cards → type-it → multiple-choice → type-it → match-blocks → multiple-choice（→ fill-in 仅当模式已熟悉）

概念辨析（阶段4-6）:
  exposition → concept-cards → multiple-choice x2-4 → type-it → fill-in

模式强化（阶段7+）:
  short exposition → type-it x2-3 → multiple-choice x2 → fill-in x1-2 → code-runner

高阶段（阶段12+）:
  exposition → type-it → code-runner → multiple-choice → fill-in
```

### 1.6 练习题和概念复习要求

每课必须包含：
1. **练习题**：至少 2 个 type-it / fill-in / match-blocks / code-runner block（阶段0-2用 type-it + multiple-choice，阶段3+加入 fill-in 和 code-runner）
2. **概念复习**：至少 1 个 multiple-choice block 复习**前一课或同阶段前几课**的核心概念（不能只考本课新内容，要主动回顾）
3. 每课 8-14 个 block（低于 8 个太短，超过 14 个太长）

### 1.7 总课程数要求

每个阶段除原计划的课程外，每 3-5 课需插入 1 节**练习课**（纯练习，几乎不引入新概念，专门操练前面几课的内容）。

练习课命名：`{prefix}-practice-{number}`（如 `p01-l13-practice-1`）

---

## 二、七种 Block 类型详解

### exposition（概念讲解）

```typescript
{
  type: 'exposition',
  text: '变量就像是程序里的一个`有名字的盒子`。',
  code: 'int health = 100;',
  textAnimation: 'typewriter',  // 可选: 'typewriter' | 'reveal'
}
```

- `text` 中用反引号包裹的代码自动高亮
- `textAnimation`：关键概念用 `'typewriter'` 吸引注意，普通段落不加

### concept-cards（概念卡）

```typescript
{
  type: 'concept-cards',
  instruction: '认识这几个部件：',
  cards: [
    { glyph: '📦', term: 'int', meaning: '类型，规定只能装整数', example: 'int / float' },
  ],
}
```

- 2-4 张卡
- `meaning` 不超过 30 字
- `glyph` 用 emoji

### type-it（跟着敲）

```typescript
{
  type: 'type-it',
  instruction: '试着输入这行代码：',
  code: 'int score = 0;',
  hints: ['提示1: 注意空格', '提示2: 别忘了分号', '提示3: 含义说明'],
}
```

- `hints` 至少 2-3 条
- 内容：一条语法格式、一条语义理解、一条常见错误

### multiple-choice（选择题）

```typescript
{
  type: 'multiple-choice',
  question: '`int lives = 3;` 中，哪个是变量名？',
  options: [
    { text: 'int', correct: false, explanation: 'int 是类型关键字' },
    { text: 'lives', correct: true, explanation: 'lives 是变量名' },
  ],
  mode: 'single',
}
```

- `explanation` 必填
- 错误选项（distractors）要像新手真的会犯的错
- 概念复习题：题干引用前面课程的概念

### match-blocks（拼装代码）

```typescript
{
  type: 'match-blocks',
  instruction: '按正确顺序排列：',
  fragments: ['int', 'damage', '=', '50', ';'],
  distractors: ['float'],
}
```

- `fragments` 按正确顺序写，UI 会自动打乱

### fill-in（填空）

```typescript
{
  type: 'fill-in',
  prompt: '声明一个整数变量 level 并设为 1。',
  template: 'int ____ = ____;',
  answers: ['level', '1'],
  hints: ['第一个空是变量名', '第二个空是初始值'],
}
```

- 只用在学习者已经见过该模式多次之后（阶段0-2少用，阶段3+正常用）

### code-runner（代码运行器）

```typescript
{
  type: 'code-runner',
  instruction: '实现一个函数……',
  code: `#include <iostream>\nint main() {\n  std::cout << "hello";\n}`,
  expectedOutput: 'hello',
  comparison: 'trimmed',
  editable: true,
}
```

- **阶段0-2完全不用 editable code-runner**（阶段2末期可用不可编辑的演示）
- **阶段3-5**：editable = true 但设 expectedOutput 做比对
- **阶段6+**：可正常使用，包括无 expectedOutput 的探究题
- 代码建议 50 行以内

---

## 三、教学法规则（forge-course-team 摘要）

### 学习者画像
- 真正 0 基础
- 不知道代码由什么构成
- 不熟练解析符号
- 会混淆名字、值、类型、标点、操作
- 能模仿之后才能解释

### 教学递进（每课内部）
1. **识别** — "见过、认得出来" → exposition, concept-cards
2. **模仿** — "能照着打出来" → type-it
3. **辨析** — "能分辨哪个对、哪个错" → multiple-choice, match-blocks
4. **引导回忆** — "给框架能补出来" → fill-in
5. **产出** — "能自己写出来" → code-runner

**一课不能跳太快**：如果在做第 4 步前没有足够的 1-3 步，拆课。

### 粒度规则
- 一课超过 1 个新符号族 → 拆
- 一课超过 3 个全新术语 → 拆
- 一个错误可能来自 2+ 种不同困惑 → 提前拆

### 易混淆点（必须在课程中明确处理）
- `=` 不是数学等于
- `int` 不是变量名
- `"hello"` 和 `hello` 不同
- `true/false` 是值，不是对错的注释
- `if` 不重复，`for/while` 才重复
- `==` 提问题，`=` 执行操作
- `*` 在声明 vs 表达式中含义不同

---

## 四、各阶段分水岭前后特殊要求

| 分水岭 | 位置 | 特殊要求 |
|--------|------|---------|
| 循环（阶段3） | 3.1 动机课 + 3.4 死循环课 | 必须让学习者先感受到"复制粘贴的痛"再教循环 |
| 函数（阶段4） | 4.5 动机课 | 先展示无函数的代码重复问题 |
| 指针（阶段5） | 5.1 动机课 + 5.5 *二义性辨析课 | 地址概念要单独建立；*的两种含义必须明确辨析 |
| OOP（阶段7-8） | 7.1 动机课 | 先展示无 class 的分散代码问题 |
| 动态内存（阶段10） | 10.1-10.6 每课都是必要基础 | 堆栈概念 → new/delete → 泄漏/悬空/双删 缺一不可 |
| STL（阶段13） | 13.1 概念课 | 先建立 STL 整体心智模型 |
| 并发（阶段18） | 18.1 动机课 + 18.4 数据竞争课 | 必须强调并发bug的隐蔽性 |

---

## 五、你负责的阶段

> **重要**：首先读取你的阶段任务文件 `.omo/phase-N-instructions.md`
> 其中包含本阶段每课的完整列表、ID、标题、目的、新概念数和前置要求。
> 按本文的格式规范生成所有文件。

---

## 六、文件的生成步骤

1. 读取 `.omo/course-generation-context.md`（本文）
2. 读取 `.omo/phase-N-instructions.md`（本阶段任务）
3. 读取 `src/types/protocol.ts`（类型定义）
4. 依次生成每课的 TypeScript 文件到 `src/courses/`
5. 每课用 `Write` 工具写入 `src/courses/p{phase}-l{num}-{slug}.ts`
6. **不要修改 `src/courses/index.ts`**，最后的合并由我处理
