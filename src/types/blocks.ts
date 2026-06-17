/* ============================
   C++ Adventure - 所有教学 Block 类型
   包含 12 个现有 Block + 4 个新增 Block
   ============================ */

import type { BaseTeachingBlock } from './teaching'
import type { AnimatedTimelineBlock as ATBlock } from './animated-timeline'

// ─── 比对模式 ──────────────────────────────────────────
export type OutputComparison = 'exact' | 'trimmed' | 'contains' | 'regex' | 'none';

// ─── BlockType 联合 ────────────────────────────────────
export type BlockType =
  | 'exposition'
  | 'concept-cards'
  | 'type-it'
  | 'multiple-choice'
  | 'match-blocks'
  | 'fill-in'
  | 'code-runner'
  | 'predict-output'
  | 'trace-state'
  | 'fix-code'
  | 'choose-next-line'
  | 'compare-snippets'
  | 'scene'
  | 'memory-visualizer'
  | 'flow-visualizer'
  | 'scroll-narrative'
  | 'animated-timeline';

// ═══════════════════════════════════════════════════════
// 基础层（Layer 1）：知识传递
// ═══════════════════════════════════════════════════════

export interface ExpositionBlock extends BaseTeachingBlock {
  type: 'exposition';
  /** 核心讲解文本，支持用 `code` 包裹内联代码 */
  text: string;
  /** 可选展示的代码段 */
  code?: string;
  /** 代码语言提示 */
  language?: 'cpp' | 'text';
  /** 文本动画效果：typewriter（逐字打出）/ reveal（逐词淡入）。不填则无动画 */
  textAnimation?: 'typewriter' | 'reveal';
}

/**
 * 概念卡：像多邻国"单词卡"一样快速建立概念。
 * 一组短卡片，每张一个术语 + 一句人话解释（可选代码样例）。
 * 内容团队只需列出 cards 即可，无需写任何交互逻辑。
 */
export interface ConceptCardsBlock extends BaseTeachingBlock {
  type: 'concept-cards';
  /** 这组卡片的引导语，如"先认识 3 种基本类型" */
  instruction: string;
  cards: Array<{
    /** 术语本身，通常是代码标识符，如 `int` `float` */
    term: string;
    /** 一句话人话解释 */
    meaning: string;
    /** 可选：一个极短的代码样例 */
    example?: string;
    /** 可选：emoji 或单字符图标，强化记忆 */
    glyph?: string;
  }>;
}

// ═══════════════════════════════════════════════════════
// 练习层（Layer 2）：动手验证
// ═══════════════════════════════════════════════════════

export interface TypeItBlock extends BaseTeachingBlock {
  type: 'type-it';
  instruction: string;
  code: string;
  hints: string[];
  /** 精确匹配还是忽略空白差异 */
  exactMatch?: boolean;
}

export interface MultipleChoiceBlock extends BaseTeachingBlock {
  type: 'multiple-choice';
  question: string;
  options: Array<{
    text: string;
    correct: boolean;
    explanation?: string;
    misconceptionId?: string;
  }>;
  /** 单选还是多选 */
  mode?: 'single' | 'multiple';
}

export interface MatchBlocksBlock extends BaseTeachingBlock {
  type: 'match-blocks';
  instruction: string;
  /** 按正确顺序排列的片段，展示时会自动打乱 */
  fragments: string[];
  /** 额外干扰项（错误选项） */
  distractors?: string[];
}

export interface FillInBlock extends BaseTeachingBlock {
  type: 'fill-in';
  prompt: string;
  /** 带空位的代码模板，用 ____ 表示填空位 */
  template: string;
  /** 每个空位的正确答案（按顺序） */
  answers: string[];
  /** 每个空位的提示 */
  hints?: string[];
}

// ═══════════════════════════════════════════════════════
// 运行层（Layer 3）：编译执行
// ═══════════════════════════════════════════════════════

/**
 * 代码运行器：在浏览器内编译 + 执行 C/C++ 代码，
 * 并可选地与预期输出比对。
 */
export interface CodeRunnerBlock extends BaseTeachingBlock {
  type: 'code-runner';
  /** 任务描述，如"写一个函数，……" */
  instruction: string;
  /** 待编译运行的 C/C++ 代码 */
  code: string;
  /** 语言，默认 cpp */
  language?: 'cpp' | 'c';
  /** 可选：预期标准输出（用于自动比对） */
  expectedOutput?: string;
  /** 比对模式，默认 'trimmed' */
  comparison?: OutputComparison;
  /** 代码是否可编辑，默认 true */
  editable?: boolean;
  /** 编译标志，默认 ['-std=c++20', '-O2', '-fno-exceptions'] */
  flags?: string[];
}

// ═══════════════════════════════════════════════════════
// 高阶练习层（Layer 4）：心智模型构建
// ═══════════════════════════════════════════════════════

/** 先猜输出，再验证心智模型 */
export interface PredictOutputBlock extends BaseTeachingBlock {
  type: 'predict-output';
  instruction: string;
  code: string;
  expectedOutput: string;
  options?: Array<{
    text: string;
    correct: boolean;
    explanation?: string;
    misconceptionId?: string;
  }>;
  accept?: string[];
  comparison?: OutputComparison;
  hints?: string[];
}

/** 一步步追踪变量状态变化 */
export interface TraceStateBlock extends BaseTeachingBlock {
  type: 'trace-state';
  instruction: string;
  code: string;
  variables: string[];
  steps: Array<{
    line: number;
    prompt?: string;
    values: Record<string, string | number | boolean>;
    stdout?: string;
    explanation?: string;
  }>;
  mode?: 'step-through' | 'fill-table';
  hints?: string[];
}

/** 改错：从识别错误进到修正错误 */
export interface FixCodeBlock extends BaseTeachingBlock {
  type: 'fix-code';
  instruction: string;
  buggyCode: string;
  goal: string;
  fixedCode?: string;
  expectedOutput?: string;
  comparison?: OutputComparison;
  bugs?: Array<{
    line?: number;
    label: string;
    hint: string;
    fix?: string;
    misconceptionId?: string;
  }>;
  fixes?: Array<{
    text: string;
    correct: boolean;
    explanation?: string;
    patch?: string;
    misconceptionId?: string;
  }>;
  mode?: 'choose-fix' | 'edit';
  hints?: string[];
}

/** 选择下一行：从抄代码过渡到自己构造代码 */
export interface ChooseNextLineBlock extends BaseTeachingBlock {
  type: 'choose-next-line';
  instruction: string;
  context: string;
  steps: Array<{
    prompt?: string;
    options: Array<{
      line: string;
      correct: boolean;
      explanation?: string;
      misconceptionId?: string;
    }>;
  }>;
  finalCode?: string;
  hints?: string[];
}

/** 对比相似代码，专门打易混点 */
export interface CompareSnippetsBlock extends BaseTeachingBlock {
  type: 'compare-snippets';
  instruction: string;
  question: string;
  snippets: Array<{
    id: string;
    title?: string;
    code: string;
    correct?: boolean;
    explanation?: string;
    badge?: string;
  }>;
  mode?: 'single' | 'multiple';
  compareBy?: 'output' | 'compiles' | 'style' | 'meaning' | 'safety';
  hints?: string[];
}

// ═══════════════════════════════════════════════════════
// 场景层（Layer 5）：复合教学容器  [NEW]
// ═══════════════════════════════════════════════════════

/** 场景块内的一步 */
export interface SceneStep {
  text?: string;
  code?: string;
  highlight?: string;
  state?: { boxes: MemoryBox[] };
}

/** 内存盒子（用于场景步骤中的状态可视化） */
export interface MemoryBox {
  id: string;
  label: string;
  value?: string | number | boolean;
  state?: 'uninitialized' | 'create' | 'update' | 'read' | 'compare';
}

/**
 * 场景块：多步骤概念演示。
 * 适合在一页内完成"先看现象 → 再看代码 → 最后看内存变化"的完整认知链条。
 * 作者可快速组织步骤，无需关心交互实现，组件自动处理点击/滚动推进。
 */
export interface SceneBlock extends BaseTeachingBlock {
  type: 'scene';
  /** 场景标题 */
  title: string;
  /** 按顺序展示的步骤 */
  steps: SceneStep[];
  /** 推进模式（默认 click） */
  advanceMode?: 'click' | 'scroll' | 'auto';
}

/** 内存可视化步骤 */
export interface MemoryStep {
  line: number;
  highlight?: string;
  stack?: StackVar[];
  heap?: HeapVar[];
}

/** 栈帧变量 */
export interface StackVar {
  id: string;
  addr: string;
  value: string | number | boolean;
  arrow?: string;
}

/** 堆对象 */
export interface HeapVar {
  id: string;
  addr: string;
  value: string | number | boolean;
}

/**
 * 内存可视化块：堆栈联动演示。
 * 适合讲解指针、引用、动态内存分配等"看不见"的概念。
 * 组件自动为每一步（行）展示对应的堆/栈状态，可高亮关键变量。
 */
export interface MemoryVisualizerBlock extends BaseTeachingBlock {
  type: 'memory-visualizer';
  /** 展示的代码 */
  code: string;
  /** 操作说明 */
  instructions: string;
  /** 按行标记的执行步骤 */
  steps: MemoryStep[];
  /** 视图模式（默认 both） */
  viewMode?: 'stack' | 'heap' | 'both';
}

/** 流程可视化步骤 */
export interface FlowStep {
  line: number;
  vars?: Record<string, string | number | boolean>;
  condition?: string;
  stdout?: string;
}

/**
 * 流程可视化块：逐行追踪控制流。
 * 适合讲解 if 分支如何走、循环如何执行、函数调用栈如何变化。
 * 组件逐行高亮并展示变量表，让控制流"被看见"。
 */
export interface FlowVisualizerBlock extends BaseTeachingBlock {
  type: 'flow-visualizer';
  /** 展示的代码 */
  code: string;
  /** 执行步骤 */
  steps: FlowStep[];
  /** 交互模式（默认 step-through） */
  mode?: 'step-through' | 'fill-table';
}

/** 叙事段落 */
export interface NarrativeSection {
  text: string;
  code: string;
  highlight?: string;
  icon?: string;
}

/**
 * 滚动叙事块：长解释 + 代码联动。
 * 适合需要分步骤解释的复杂概念，每段讲解随滚动联动高亮对应代码行。
 * 作者只需分段，组件自动处理滚动同步。
 */
export interface ScrollNarrativeBlock extends BaseTeachingBlock {
  type: 'scroll-narrative';
  sections: NarrativeSection[];
}

// ═══════════════════════════════════════════════════════
// Block 联合类型
// ═══════════════════════════════════════════════════════

export type Block =
  | ExpositionBlock
  | ConceptCardsBlock
  | TypeItBlock
  | MultipleChoiceBlock
  | MatchBlocksBlock
  | FillInBlock
  | CodeRunnerBlock
  | PredictOutputBlock
  | TraceStateBlock
  | FixCodeBlock
  | ChooseNextLineBlock
  | CompareSnippetsBlock
  | SceneBlock
  | MemoryVisualizerBlock
  | FlowVisualizerBlock
  | ScrollNarrativeBlock
  | ATBlock;
