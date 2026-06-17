import React from 'react'
import type { ContentKind, Lesson, Subject } from '../types/protocol'
import { filterLessonsByKind, getLessonContentProfile, CONTENT_KIND_META, kindHasContent } from '../lib/contentTaxonomy'

interface Props {
  courses: Lesson[];
  selectedSubject: Subject;
  onOpenMainPath: () => void;
}

const KINDS: ContentKind[] = ['lesson', 'practice', 'review', 'challenge']

const LearningHubPreview: React.FC<Props> = ({ courses, selectedSubject, onOpenMainPath }) => {
  const subjectCourses = courses.filter(course => String(getLessonContentProfile(course).subject) === String(selectedSubject))
  const counts = KINDS.map(kind => ({
    kind,
    count: filterLessonsByKind(subjectCourses, [kind]).length,
  }))

  const knowledgeCount = new Set(
    subjectCourses.flatMap(course => getLessonContentProfile(course).knowledgePoints.map(kp => kp.id)),
  ).size

  return (
    <section className="hub-preview surface p-5 sm:p-7 mb-8 animate-rise delay-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 relative z-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-ember mb-2">Knowledge Map</p>
          <h2 className="title-serif text-2xl sm:text-3xl text-ink leading-tight">学习引擎已按内容层组织</h2>
          <p className="text-sm text-ink-faint mt-2 leading-relaxed">
            现在不仅有主线课，也能按知识点派生练习、挑战和复习。
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[11px] font-mono text-ink-ghost">indexed knowledge points</p>
          <p className="font-mono text-2xl font-bold text-ink">{knowledgeCount}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {counts.map(({ kind, count }) => {
          const meta = CONTENT_KIND_META[kind]
          const isMain = kind === 'lesson'
          const hasContent = count > 0
          return (
            <button
              key={String(kind)}
              onClick={hasContent ? onOpenMainPath : undefined}
              disabled={!hasContent}
              className={`hub-card ${meta?.badgeClass ?? 'border-paper-line bg-paper-sunk'} 
                ${hasContent ? 'hover:-translate-y-1 cursor-pointer' : 'cursor-default opacity-65'}`}
              type="button"
            >
              <span className="relative z-10 font-mono text-3xl font-bold">{count}</span>
              <span className="relative z-10 font-display font-semibold text-ink">
                {meta?.label ?? kind}
              </span>
              <span className="relative z-10 text-[12px] leading-relaxed text-ink-faint">
                {meta?.description ?? ''}
              </span>
              {!hasContent && (
                <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-ghost">
                  暂无课程
                </span>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default LearningHubPreview