import type { ContentKind, KnowledgePointRef, Lesson, Subject } from '../types/protocol'
import { defaultKnowledgeSystemId, getKnowledgeSystem, getSubjectForCourseId, knowledgeSystems } from '../knowledge/systems'

export interface LessonContentProfile {
  subject: Subject;
  kind: ContentKind;
  knowledgePoints: KnowledgePointRef[];
  stages: string[];
  misconceptions: string[];
}

/* ─── 模块级缓存 ──────────────────────────────────────
   所有课程数据在运行时是 immutable 的，profile 只需算一次。
   使用 Map<string, LessonContentProfile> 而非 WeakMap，
   因为 course.id 是稳定字符串 key。                        */

const profileCache = new Map<string, LessonContentProfile>()

/** 清除 profile 缓存（仅在课程热更新时调用） */
export function clearProfileCache() {
  profileCache.clear()
}

function dedupe<T>(items: T[]): T[] {
  return Array.from(new Set(items))
}

function inferKind(lesson: Lesson): ContentKind {
  if (lesson.meta.hubPlacement?.challenge) return 'challenge'
  if (lesson.meta.hubPlacement?.review) return 'review'
  if (lesson.meta.hubPlacement?.practice) return 'practice'

  const kinds = lesson.meta.pathway?.contentKinds
  if (kinds?.includes('challenge')) return 'challenge'
  if (kinds?.includes('review')) return 'review'
  if (kinds?.includes('practice')) return 'practice'

  const id = lesson.meta.id.toLowerCase()
  const title = lesson.meta.title.toLowerCase()
  if (id.includes('challenge')) return 'challenge'
  if (id.includes('review') || id.includes('phase')) return 'review'
  if (id.includes('practice') || title.includes('练习')) return 'practice'
  return 'lesson'
}

function inferKnowledgePoint(lesson: Lesson): KnowledgePointRef {
  const slug = lesson.meta.id
    .replace(/^p\d+-l\d+-/, '')
    .replace(/-practice$/, '')
  return {
    id: `cpp.${slug.replace(/-/g, '.')}`,
    label: lesson.meta.subtitle || lesson.meta.title,
  }
}

/** 计算单门课的 profile（纯函数，不读写缓存） */
function computeLessonContentProfile(lesson: Lesson): LessonContentProfile {
  const blockKnowledge = lesson.blocks.flatMap(block => block.teaching?.knowledgePoints ?? [])
  const blockStages = lesson.blocks.map(block => block.teaching?.cognitiveStage).filter(Boolean) as string[]
  const blockMisconceptions = lesson.blocks.flatMap(block => [
    block.teaching?.misconceptionTarget,
    ...(block.teaching?.misconceptions?.map(m => m.id) ?? []),
  ]).filter(Boolean) as string[]

  return {
    subject: lesson.meta.pathway?.subject
      ?? lesson.blocks.find(b => b.teaching?.subject)?.teaching?.subject
      ?? getSubjectForCourseId(lesson.meta.id)
      ?? defaultKnowledgeSystemId,
    kind: inferKind(lesson),
    knowledgePoints: lesson.meta.pathway?.knowledgePoints?.length
      ? lesson.meta.pathway.knowledgePoints
      : blockKnowledge.length
      ? blockKnowledge
      : [inferKnowledgePoint(lesson)],
    stages: dedupe([
      lesson.meta.pathway?.stage,
      ...blockStages,
    ].filter(Boolean) as string[]),
    misconceptions: dedupe(blockMisconceptions),
  }
}

/**
 * 获取课程内容画像（带缓存）。
 * 课程数据在 SPA 生命周期内不变，profile 只需计算一次。
 */
export function getLessonContentProfile(lesson: Lesson): LessonContentProfile {
  const id = lesson.meta.id
  let profile = profileCache.get(id)
  if (profile === undefined) {
    profile = computeLessonContentProfile(lesson)
    profileCache.set(id, profile)
  }
  return profile
}

export function filterLessonsByKind(courses: Lesson[], kinds: ContentKind[]): Lesson[] {
  return courses.filter(lesson => kinds.includes(getLessonContentProfile(lesson).kind))
}

export const CONTENT_KIND_META: Record<string, {
  label: string;
  labelShort: string;
  description: string;
  accent: 'ember' | 'sage' | 'gold' | 'ink';
  dotColor: string;       // 节点圆点色
  cardBorder: string;     // 卡片边框色
  cardBg: string;         // 卡片背景
  badgeClass: string;     // 徽章样式
  icon: string;           // Phosphor 图标名
}> = {
  lesson: {
    label: '主线课',
    labelShort: '主线',
    description: '慢节奏引入概念，一关只咬一小口',
    accent: 'ember',
    dotColor: 'bg-ember',
    cardBorder: 'border-ember/20',
    cardBg: 'bg-paper-raised',
    badgeClass: 'bg-ember-tint text-ember border-ember/20',
    icon: 'BookOpen',
  },
  practice: {
    label: '练习课',
    labelShort: '练习',
    description: '围绕知识点回练、刷题、补薄弱点',
    accent: 'sage',
    dotColor: 'bg-sage',
    cardBorder: 'border-sage/20',
    cardBg: 'bg-paper-raised',
    badgeClass: 'bg-sage-tint text-sage border-sage/20',
    icon: 'PencilLine',
  },
  review: {
    label: '复习课',
    labelShort: '复习',
    description: '阶段回顾，把零散知识重新焊牢',
    accent: 'ink',
    dotColor: 'bg-ink',
    cardBorder: 'border-ink/15',
    cardBg: 'bg-paper-raised',
    badgeClass: 'bg-paper-sunk text-ink-faint border-paper-line',
    icon: 'ClockCounterClockwise',
  },
  challenge: {
    label: '挑战课',
    labelShort: '挑战',
    description: '综合迁移，多知识点一起通关',
    accent: 'gold',
    dotColor: 'bg-gold',
    cardBorder: 'border-gold/20',
    cardBg: 'bg-paper-raised',
    badgeClass: 'bg-gold-tint text-gold border-gold/20',
    icon: 'Lightning',
  },
}

/** 某类 ContentKind 是否有内容 */
export function kindHasContent(kind: ContentKind, courses: Lesson[]): boolean {
  return courses.some(c => getLessonContentProfile(c).kind === kind)
}

export function subjectLabel(subject: Subject): string {
  return getKnowledgeSystem(subject)?.label ?? String(subject)
}

export function listSubjects() {
  return knowledgeSystems
}

export function filterLessonsBySubject(courses: Lesson[], subject: Subject): Lesson[] {
  return courses.filter(lesson => String(getLessonContentProfile(lesson).subject) === String(subject))
}

/** 判断一个学科是否有实际课程内容 */
export function subjectHasContent(subject: Subject, courses: Lesson[]): boolean {
  return filterLessonsBySubject(courses, subject).length > 0
}

/** 学科分组统计 */
export function subjectStats(subject: Subject, courses: Lesson[]): {
  total: number;
  completed: number;
  kinds: Record<string, number>;
} {
  const subjectCourses = filterLessonsBySubject(courses, subject)
  return {
    total: subjectCourses.length,
    completed: 0, // caller 需要传入 completedLessons 来算
    kinds: subjectCourses.reduce<Record<string, number>>((acc, c) => {
      const k = getLessonContentProfile(c).kind
      acc[k] = (acc[k] ?? 0) + 1
      return acc
    }, {}),
  }
}
