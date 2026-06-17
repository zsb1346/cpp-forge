/* ============================
   C++ Adventure - 课程体系类型
   ============================ */

import type { TeachingAnimationSpec } from './teaching'
import type { Block } from './blocks'
import type {
  Subject,
  ContentKind,
  CognitiveStage,
  KnowledgePointRef,
} from './shared'

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
  /** 未来 PracticeHub / ChallengeHub 的索引数据 */
  pathway?: {
    subject?: Subject;
    knowledgePoints?: KnowledgePointRef[];
    contentKinds?: ContentKind[];
    stage?: CognitiveStage;
  };
  /** 未来决定是否进入练习中心 / 挑战中心 / 复习中心 */
  hubPlacement?: {
    practice?: boolean;
    challenge?: boolean;
    review?: boolean;
  };
  /** 保留给未来动画协议，当前仅作为声明式提示 */
  animation?: TeachingAnimationSpec;
}

export interface Lesson {
  meta: LessonMeta;
  blocks: Block[];
}

/** 关卡完成奖励 */
export interface LessonReward {
  xp: number;
  stars: number;
  unlocksNext: boolean;
}
