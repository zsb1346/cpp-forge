/* ============================
   C++ Adventure - 教学呈现类型
   ============================ */

import type {
  Subject,
  ContentKind,
  CognitiveStage,
  KnowledgePointRef,
  MisconceptionRef,
} from './shared'

export interface TeachingMeta {
  subject?: Subject;
  contentKind?: ContentKind;
  knowledgePoints?: KnowledgePointRef[];
  cognitiveStage?: CognitiveStage;
  misconceptions?: MisconceptionRef[];
  /** 简写：单个主要误区 */
  misconceptionTarget?: string;
  estimatedSeconds?: number;
  checkpointLevel?: 'tiny' | 'normal' | 'challenge';
}

export type TeachingAnimationPreset =
  | 'none'
  | 'demo-scene'
  | 'state-timeline'
  | 'branch-play'
  | 'memory-box'
  | 'spotlight'
  | 'trace';

export interface TeachingAnimationStep {
  narration: string;
  line?: number;
  highlight?: string;
  boxes?: Array<{
    id: string;
    label: string;
    value?: string | number | boolean;
    pointsTo?: string;
    state?: 'create' | 'update' | 'read' | 'compare';
  }>;
}

export interface TeachingAnimationSpec {
  preset?: TeachingAnimationPreset;
  emphasis?: 'low' | 'medium' | 'high';
  steps?: TeachingAnimationStep[];
}

export interface TeachingLayoutSpec {
  mode?: 'auto' | 'stack' | 'split';
  /** 语义布局意图，让 AI 不必只思考视觉 */
  intent?: 'read' | 'reference-and-input' | 'compare' | 'code-and-output' | 'code-and-state';
  split?: {
    referenceSide?: 'left' | 'right';
    referenceRatio?: 'narrow' | 'balanced' | 'wide';
  };
  reference?: {
    title?: string;
    text?: string;
    code?: string;
    language?: 'cpp' | 'c' | 'text';
    sticky?: boolean;
    collapseOnMobile?: boolean;
  };
  mobile?: 'stack' | 'tabs' | 'reference-first' | 'reference-after';
}

/**
 * 所有教学 Block 的基类。
 * - layout: 布局提示（auto / stack / split）
 * - teaching: 教学元数据（知识点、认知阶段、误区等）
 * - animation: 未来 AI 生成的动画脚本
 * - icon: Phosphor 图标名，如 'code'、'cube'、'magic-wand-bold'
 */
export interface BaseTeachingBlock {
  layout?: TeachingLayoutSpec;
  teaching?: TeachingMeta;
  /** 未来可由 AI 生成的教学动画脚本：变量盒、时间轴、分支演示等 */
  animation?: TeachingAnimationSpec;
  /** 图标：Phosphor 图标名字符串，如 'code'、'cube'、'magic-wand-bold' */
  icon?: string;
}
