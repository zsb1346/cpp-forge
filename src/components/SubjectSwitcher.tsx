import React from 'react'
import type { Subject } from '../types/protocol'
import { listSubjects, subjectHasContent, filterLessonsBySubject } from '../lib/contentTaxonomy'
import type { Lesson } from '../types/protocol'

interface Props {
  value: Subject;
  onChange: (subject: Subject) => void;
  compact?: boolean;
  /** 所有课程列表，用于判断各学科是否有内容 */
  courses?: Lesson[];
}

const accentClass: Record<string, string> = {
  ember: 'bg-ember text-paper-raised border-ember',
  sage: 'bg-sage text-paper-raised border-sage',
  gold: 'bg-gold text-paper-raised border-gold',
  ink: 'bg-ink text-paper-raised border-ink',
}

const SubjectSwitcher: React.FC<Props> = ({ value, onChange, compact, courses }) => {
  const systems = listSubjects()

  return (
    <div className="rounded-2xl border border-paper-line bg-paper-sunk/80 p-1 flex items-center gap-1 overflow-x-auto" aria-label="切换学科">
      {systems.map(system => {
        const active = String(system.id) === String(value)
        const hasContent = courses ? subjectHasContent(system.id, courses) : true
        const count = courses ? filterLessonsBySubject(courses, system.id).length : 0

        return (
          <button
            key={String(system.id)}
            onClick={() => onChange(system.id)}
            className={`group relative shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200
              ${active
                ? accentClass[system.accent ?? 'ember'] ?? accentClass.ember
                : hasContent
                  ? 'border-transparent text-ink-faint hover:text-ink hover:bg-paper-raised'
                  : 'border-dashed border-paper-line text-ink-ghost hover:text-ink-faint hover:bg-paper-sunk/60'}
              ${compact ? 'sm:px-2.5 sm:py-1.5' : ''}`}
            title={system.description}
            type="button"
          >
            <span className="flex items-center gap-2">
              {system.label}
              {count > 0 && !active && (
                <span className="font-mono text-[10px] text-ink-ghost">{count}</span>
              )}
            </span>
            {!hasContent && !active && (
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-paper-raised border border-paper-line text-[8px] font-bold uppercase tracking-wider text-ink-ghost shadow-paper">
                即将
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default SubjectSwitcher
