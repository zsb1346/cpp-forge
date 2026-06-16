import { create } from 'zustand'
import type { Lesson, UserProgress, Block, LessonCompletion, NodeStatus } from '../types/protocol'

interface AppState {
  // 页面导航
  screen: 'start' | 'level-select' | 'lesson';

  // 课程数据
  courses: Lesson[];
  currentLesson: Lesson | null;
  currentBlockIndex: number;

  // 用户进度
  progress: UserProgress;

  // Block 交互状态
  blockFeedback: 'correct' | 'incorrect' | null;
  blockCompleted: boolean;
  showHint: boolean;
  hintIndex: number;

  // 完成一课的庆祝弹层（null = 不显示）
  celebration: { title: string; nextTitle: string | null } | null;
  dismissCelebration: () => void;

  // 全局代码字体大小（所有代码框共享）
  codeFontSize: number;
  setCodeFontSize: (size: number) => void;
  // 代码补全开关
  codeCompletionEnabled: boolean;
  toggleCodeCompletion: () => void;

  // Actions
  setScreen: (screen: 'start' | 'level-select' | 'lesson') => void;
  loadCourses: (courses: Lesson[]) => void;
  startLesson: (lesson: Lesson) => void;
  /** 断点续学：从 progress.currentLesson 恢复上一课 */
  resumeLesson: () => void;
  /** 跳到指定 block 索引 */
  jumpToBlock: (index: number) => void;
  nextBlock: () => void;
  prevBlock: () => void;
  setBlockFeedback: (feedback: 'correct' | 'incorrect' | null) => void;
  setBlockCompleted: (completed: boolean) => void;
  completeLesson: (stars: number) => void;
  /** 完成庆祝后跳到下一课 */
  goToNextLesson: () => void;
  resetBlockState: () => void;
  toggleHint: () => void;
  nextHint: () => void;
  getNodeStatus: (lessonId: string) => NodeStatus;
  resetAllProgress: () => void;
  /** 调试用：右滑解锁某一课 */
  debugUnlockLesson: (lessonId: string) => void;
}

const STORAGE_KEY = 'cpp-adventure-progress';
const FONT_SIZE_KEY = 'forge-code-font-size';

function loadFontSize(): number {
  try {
    const saved = localStorage.getItem(FONT_SIZE_KEY);
    if (saved) return Math.max(9, Math.min(24, JSON.parse(saved)));
  } catch { /* ignore */ }
  return 14; // 默认
}

function saveFontSize(size: number) {
  try { localStorage.setItem(FONT_SIZE_KEY, JSON.stringify(size)); } catch { /* ignore */ }
}

function loadProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return { completedLessons: {}, currentLesson: null, currentBlock: 0 };
}

function saveProgress(progress: UserProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch { /* ignore */ }
}

export const useStore = create<AppState>((set, get) => ({
  screen: 'start',
  courses: [],
  currentLesson: null,
  currentBlockIndex: 0,
  progress: loadProgress(),

  blockFeedback: null,
  blockCompleted: false,
  showHint: false,
  hintIndex: 0,
  celebration: null,

  codeFontSize: loadFontSize(),
  setCodeFontSize: (size) => {
    saveFontSize(size);
    set({ codeFontSize: size });
  },

  codeCompletionEnabled: true,
  toggleCodeCompletion: () => set((s) => ({ codeCompletionEnabled: !s.codeCompletionEnabled })),

  dismissCelebration: () => set({ celebration: null, screen: 'level-select', currentLesson: null, currentBlockIndex: 0 }),

  setScreen: (screen) => set({ screen }),

  loadCourses: (courses) => set({ courses }),

  startLesson: (lesson) => {
    const updatedProgress = {
      ...get().progress,
      currentLesson: lesson.meta.id,
      currentBlock: 0,
    };
    saveProgress(updatedProgress);
    set({
      screen: 'lesson',
      currentLesson: lesson,
      currentBlockIndex: 0,
      blockFeedback: null,
      blockCompleted: false,
      showHint: false,
      hintIndex: 0,
      progress: updatedProgress,
    });
  },

  resumeLesson: () => {
    const { courses, progress } = get();
    if (!progress.currentLesson) {
      // 没有中断的课，回到选关页
      set({ screen: 'level-select' });
      return;
    }
    const lesson = courses.find(c => c.meta.id === progress.currentLesson);
    if (!lesson) {
      // 课不存在，安全回退
      set({ screen: 'level-select' });
      return;
    }
    // 从上次中断的 block 继续，或从头开始
    const resumeBlock = progress.currentBlock ?? 0;
    set({
      screen: 'lesson',
      currentLesson: lesson,
      currentBlockIndex: Math.min(resumeBlock, lesson.blocks.length - 1),
      blockFeedback: null,
      blockCompleted: false,
      showHint: false,
      hintIndex: 0,
    });
  },

  jumpToBlock: (index) => {
    const { currentLesson } = get();
    if (!currentLesson || index < 0 || index >= currentLesson.blocks.length) return;
    set({
      currentBlockIndex: index,
      blockFeedback: null,
      blockCompleted: false,
      showHint: false,
      hintIndex: 0,
    });
  },

  nextBlock: () => {
    const { currentLesson, currentBlockIndex } = get();
    if (!currentLesson) return;
    const nextIndex = currentBlockIndex + 1;
    if (nextIndex < currentLesson.blocks.length) {
      set({
        currentBlockIndex: nextIndex,
        blockFeedback: null,
        blockCompleted: false,
        showHint: false,
        hintIndex: 0,
      });
    }
  },

  prevBlock: () => {
    const { currentBlockIndex } = get();
    if (currentBlockIndex > 0) {
      set({
        currentBlockIndex: currentBlockIndex - 1,
        blockFeedback: null,
        blockCompleted: false,
        showHint: false,
        hintIndex: 0,
      });
    }
  },

  setBlockFeedback: (feedback) => set({ blockFeedback: feedback }),
  setBlockCompleted: (completed) => set({ blockCompleted: completed }),

  completeLesson: (stars) => {
    const { currentLesson, progress } = get();
    if (!currentLesson) return;

    const completion: LessonCompletion = {
      completedAt: new Date().toISOString(),
      stars,
      perfect: stars === 3,
    };

    const updatedProgress: UserProgress = {
      ...progress,
      completedLessons: {
        ...progress.completedLessons,
        [currentLesson.meta.id]: completion,
      },
      currentLesson: null,
      currentBlock: 0,
    };

    saveProgress(updatedProgress);

    // 找下一关标题，用于庆祝弹层
    const { courses } = get();
    const idx = courses.findIndex(c => c.meta.id === currentLesson.meta.id);
    const nextTitle = courses[idx + 1]?.meta.title ?? null;

    set({
      progress: updatedProgress,
      celebration: { title: currentLesson.meta.title, nextTitle },
    });
  },

  goToNextLesson: () => {
    const { courses, currentLesson, celebration } = get();
    if (!currentLesson) return;
    const idx = courses.findIndex(c => c.meta.id === currentLesson.meta.id);
    const nextLesson = courses[idx + 1];
    if (nextLesson) {
      set({ celebration: null });
      get().startLesson(nextLesson);
    } else {
      // 没有下一课了，回到选关页
      set({ celebration: null, screen: 'level-select' });
    }
  },

  resetBlockState: () => set({
    blockFeedback: null,
    blockCompleted: false,
    showHint: false,
    hintIndex: 0,
  }),

  toggleHint: () => set((s) => ({ showHint: !s.showHint })),
  nextHint: () => set((s) => ({ hintIndex: s.hintIndex + 1 })),

  getNodeStatus: (lessonId) => {
    const { progress, courses } = get();
    const completion = progress.completedLessons[lessonId];
    if (completion?.perfect) return 'perfect';
    if (completion) return 'completed';

    // 找这个课程在 courses 数组中的索引
    const idx = courses.findIndex((c) => c.meta.id === lessonId);
    if (idx === 0) return 'available'; // 第一关总是可用

    // 如果前一关已完成，则此关可用
    const prevLesson = courses[idx - 1];
    if (prevLesson && progress.completedLessons[prevLesson.meta.id]) return 'available';

    return 'locked';
  },

  resetAllProgress: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      progress: { completedLessons: {}, currentLesson: null, currentBlock: 0 },
    });
  },

  /** 调试用：强制解锁某一课（标记为已完成） */
  debugUnlockLesson: (lessonId: string) => {
    const { progress } = get();
    const completion: LessonCompletion = {
      completedAt: new Date().toISOString(),
      stars: 0,
      perfect: false,
    };
    const updatedProgress: UserProgress = {
      ...progress,
      completedLessons: {
        ...progress.completedLessons,
        [lessonId]: completion,
      },
    };
    saveProgress(updatedProgress);
    set({ progress: updatedProgress });
  },
}));
