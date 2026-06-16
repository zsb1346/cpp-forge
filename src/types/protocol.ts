/* ============================
   C++ Adventure - 内容协议
   所有课程内容遵循此类型定义
   ============================ */

/**
 * 单元（章节）：一组课的逻辑分组，自带标题/描述，
 * 展示在关卡选择页作为段落分隔。
 */
export interface Chapter {
  /** 唯一 ID，如 'syntax-foundation' */
  id: string;
  /** 短角标，如"学习路线"、"进阶挑战" */
  badge: string;
  /** 大标题，如"逐关锻造" */
  title: string;
  /** 描述文字，如"从变量开始，一关解锁下一关……" */
  description: string;
  /** 按顺序引用本单元的课程 ID */
  courseIds: string[];
}

export interface LessonMeta {
  id: string;
  /** 备用字段，不再作为排序依据（改用 Chapter.courseIds） */
  chapter: number;
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  estimatedMinutes: number;
}

export interface Lesson {
  meta: LessonMeta;
  blocks: Block[];
}

export type BlockType =
  | 'exposition'
  | 'concept-cards'
  | 'type-it'
  | 'multiple-choice'
  | 'match-blocks'
  | 'fill-in'
  | 'code-runner';

export interface ExpositionBlock {
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
export interface ConceptCardsBlock {
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

export interface TypeItBlock {
  type: 'type-it';
  instruction: string;
  code: string;
  hints: string[];
  /** 精确匹配还是忽略空白差异 */
  exactMatch?: boolean;
}

export interface MultipleChoiceBlock {
  type: 'multiple-choice';
  question: string;
  options: Array<{
    text: string;
    correct: boolean;
    explanation?: string;
  }>;
  /** 单选还是多选 */
  mode?: 'single' | 'multiple';
}

export interface MatchBlocksBlock {
  type: 'match-blocks';
  instruction: string;
  /** 按正确顺序排列的片段，展示时会自动打乱 */
  fragments: string[];
  /** 额外干扰项（错误选项） */
  distractors?: string[];
}

export interface FillInBlock {
  type: 'fill-in';
  prompt: string;
  /** 带空位的代码模板，用 ____ 表示填空位 */
  template: string;
  /** 每个空位的正确答案（按顺序） */
  answers: string[];
  /** 每个空位的提示 */
  hints?: string[];
}

/**
 * 代码运行器：在浏览器内编译 + 执行 C/C++ 代码，
 * 并可选地与预期输出比对。
 */
export interface CodeRunnerBlock {
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
  comparison?: 'exact' | 'trimmed' | 'contains' | 'regex' | 'none';
  /** 代码是否可编辑，默认 true */
  editable?: boolean;
  /** 编译标志，默认 ['-std=c++20', '-O2', '-fno-exceptions'] */
  flags?: string[];
}

/** 关卡完成奖励 */
export interface LessonReward {
  xp: number;
  stars: number;
  unlocksNext: boolean;
}

/** 用户进度 */
export interface UserProgress {
  completedLessons: Record<string, LessonCompletion>;
  currentLesson: string | null;
  currentBlock: number;
}

export interface LessonCompletion {
  completedAt: string;
  stars: number;
  perfect: boolean;
}

export type Block =
  | ExpositionBlock
  | ConceptCardsBlock
  | TypeItBlock
  | MultipleChoiceBlock
  | MatchBlocksBlock
  | FillInBlock
  | CodeRunnerBlock;

/** 关卡地图上的节点状态 */
export type NodeStatus = 'locked' | 'available' | 'completed' | 'perfect';
