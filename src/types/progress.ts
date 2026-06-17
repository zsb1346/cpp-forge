/* ============================
   C++ Adventure - 用户进度类型
   ============================ */

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

/** 关卡地图上的节点状态 */
export type NodeStatus = 'locked' | 'available' | 'completed' | 'perfect';
