/* ============================
   C++ Adventure - 共享基础类型
   被 curriculum.ts 和 teaching.ts 同时引用，用于打破循环依赖
   ============================ */

/** 学科坐标，未来可扩展为 c / dsa / unreal-cpp 等 */
export type Subject = 'cpp' | 'c' | 'dsa' | 'unreal-cpp' | string;

/** 内容层类型：主课 / 练习 / 挑战 / 复习 */
export type ContentKind = 'lesson' | 'practice' | 'challenge' | 'review' | string;

/** 认知阶段：从认出概念到迁移应用 */
export type CognitiveStage =
  | 'recognition'
  | 'meaning'
  | 'imitation'
  | 'discrimination'
  | 'recall'
  | 'production'
  | 'transfer'
  | 'predict'
  | 'trace'
  | 'repair'
  | 'compare'
  | string;

export interface KnowledgePointRef {
  /** 如 cpp.variable.assignment */
  id: string;
  label?: string;
  /** 这一内容在该知识点上的认知阶段 */
  stage?: CognitiveStage;
  /** 依赖的知识点 ID */
  prerequisites?: string[];
}

export interface MisconceptionRef {
  /** 如 confuses-assignment-with-equality */
  id: string;
  label?: string;
  feedback?: string;
}
