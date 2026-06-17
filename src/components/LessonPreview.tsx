import React, { useEffect, useState } from 'react'
import type { Lesson } from '../types/protocol'
import { CheckCircle } from '@phosphor-icons/react'
import { ArrowRightIcon } from './icons'
import { getLessonContentProfile, CONTENT_KIND_META } from '../lib/contentTaxonomy'

interface Props {
  lesson: Lesson;
  onStart: () => void;
}

const BLOCK_LABELS: Record<string, string> = {
  exposition: '讲解',
  'concept-cards': '概念卡',
  'type-it': '跟敲',
  'multiple-choice': '选择',
  'match-blocks': '拼装',
  'fill-in': '填空',
}

const LessonPreview: React.FC<Props> = ({ lesson, onStart }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const blockSummary = lesson.blocks.map(b => BLOCK_LABELS[b.type] ?? b.type)
  const profile = getLessonContentProfile(lesson)
  const kindMeta = CONTENT_KIND_META[profile.kind]
  const isPracticeOrReview = profile.kind === 'practice' || profile.kind === 'review' || profile.kind === 'challenge'

  return (
    <div className="flex flex-col items-center text-center py-8 px-4">
      {/* 章节编号 + 关卡类型徽章 */}
      <div className="flex items-center gap-3 mb-4">
        <p className={`text-xs font-bold uppercase tracking-[0.3em] text-ember
          ${mounted ? 'animate-rise' : 'opacity-0'}`}>
          第 {lesson.meta.chapter} 关
        </p>
        {isPracticeOrReview && kindMeta && (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${kindMeta.badgeClass} animate-pop`}>
            {kindMeta.label}
          </span>
        )}
      </div>

      {/* 标题 */}
      <h1 className={`title-serif text-4xl sm:text-5xl font-medium text-ink leading-[1.1] mb-3
        ${mounted ? 'animate-rise delay-1' : 'opacity-0'}`}>
        {lesson.meta.title}
      </h1>

      {/* 副标题 */}
      <p className={`text-ink-soft text-lg sm:text-xl mb-8 max-w-lg
        ${mounted ? 'animate-rise delay-2' : 'opacity-0'}`}>
        {lesson.meta.subtitle}
      </p>

      {/* 学习目标 */}
      <div className={`w-full max-w-md text-left mb-8
        ${mounted ? 'animate-rise delay-3' : 'opacity-0'}`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-faint mb-4 text-center">
          你将学会
        </p>
        <ul className="space-y-3">
          {lesson.meta.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-ember/10 flex items-center justify-center">
                <CheckCircle size={12} weight="bold" className="text-ember" />
              </span>
              <span className="text-ink text-[15px] leading-snug">{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 课程概况 */}
      <div className={`flex items-center gap-6 mb-10
        ${mounted ? 'animate-rise delay-4' : 'opacity-0'}`}>
        <div className="text-center">
          <div className="text-ink text-lg font-semibold font-mono">{lesson.blocks.length}</div>
          <div className="text-ink-faint text-[11px] font-bold uppercase tracking-[0.12em] mt-0.5">环节</div>
        </div>
        <div className="w-px h-8 bg-paper-line" />
        <div className="text-center">
          <div className="text-ink text-lg font-semibold font-mono">~{lesson.meta.estimatedMinutes}</div>
          <div className="text-ink-faint text-[11px] font-bold uppercase tracking-[0.12em] mt-0.5">分钟</div>
        </div>
        <div className="w-px h-8 bg-paper-line" />
        <div className="text-center">
          <div className="flex gap-1">
            {blockSummary.map((label, i) => (
              <span key={i}
                className="block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider
                  bg-paper-sunk text-ink-faint leading-none">
                {label.slice(0, 2)}
              </span>
            ))}
          </div>
          <div className="text-ink-faint text-[11px] font-bold uppercase tracking-[0.12em] mt-0.5">类型</div>
        </div>
      </div>

      {/* 开始按钮 */}
      <button
        onClick={onStart}
        className={`btn-primary text-base px-10 py-4 ${mounted ? 'animate-pop delay-5' : 'opacity-0'}`}
      >
        开始学习 <ArrowRightIcon size={18} />
      </button>
    </div>
  )
}

export default LessonPreview
