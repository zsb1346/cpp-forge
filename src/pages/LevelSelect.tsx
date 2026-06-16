import React, { useCallback } from 'react'
import { useStore } from '../store/useStore'
import { chapters } from '../courses'
import { TrophyIcon, StarIcon, TargetIcon, ResetIcon } from '../components/icons'

const LevelSelect: React.FC = () => {
  const courses = useStore(s => s.courses)
  const setScreen = useStore(s => s.setScreen)
  const startLesson = useStore(s => s.startLesson)
  const getNodeStatus = useStore(s => s.getNodeStatus)
  const progress = useStore(s => s.progress)
  const resetAllProgress = useStore(s => s.resetAllProgress)

  const completedCount = Object.keys(progress.completedLessons).length
  const totalCount = courses.length
  const pct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0
  const perfectCount = Object.values(progress.completedLessons).filter(c => c.perfect).length
  const totalMinutes = courses
    .filter(c => progress.completedLessons[c.meta.id])
    .reduce((sum, c) => sum + (c.meta.estimatedMinutes ?? 0), 0)

  const handleStart = useCallback((courseId: string) => {
    if (getNodeStatus(courseId) === 'locked') return
    const course = courses.find(c => c.meta.id === courseId)
    if (course) startLesson(course)
  }, [courses, getNodeStatus, startLesson])

  const handleReset = useCallback(() => {
    if (window.confirm('确定要重置所有进度吗？')) resetAllProgress()
  }, [resetAllProgress])

  return (
    <div className="min-h-screen">
      {/* 顶栏 */}
      <header className="sticky top-0 z-20 bg-paper/80 backdrop-blur-md border-b border-paper-line">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <button onClick={() => setScreen('start')} className="btn-text font-medium">
            <span className="text-base">←</span> 首页
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-faint font-mono">{completedCount}/{totalCount}</span>
            <div className="w-28 h-1.5 rounded-full bg-paper-sunk overflow-hidden">
              <div className="h-full rounded-full bg-ember transition-all duration-700"
                style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 战况统计 */}
        <div className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-2xl border border-paper-line bg-paper-raised shadow-paper p-3 sm:p-4 flex items-center gap-3 animate-rise delay-1">
              <TrophyIcon size={24} className="text-gold flex-shrink-0" />
              <div>
                <div className="text-ink text-xl font-semibold font-mono leading-none mb-1">{completedCount}/{totalCount}</div>
                <div className="text-ink-faint text-[11px] font-bold uppercase tracking-[0.12em]">已完成</div>
              </div>
            </div>
            <div className="rounded-2xl border border-paper-line bg-paper-raised shadow-paper p-3 sm:p-4 flex items-center gap-3 animate-rise delay-2">
              <StarIcon size={24} filled className="text-gold flex-shrink-0" />
              <div>
                <div className="text-ink text-xl font-semibold font-mono leading-none mb-1">{perfectCount}</div>
                <div className="text-ink-faint text-[11px] font-bold uppercase tracking-[0.12em]">满星</div>
              </div>
            </div>
            <div className="rounded-2xl border border-paper-line bg-paper-raised shadow-paper p-3 sm:p-4 flex items-center gap-3 animate-rise delay-3">
              <TargetIcon size={24} className="text-sage flex-shrink-0" />
              <div>
                <div className="text-ink text-xl font-semibold font-mono leading-none mb-1">{totalMinutes}</div>
                <div className="text-ink-faint text-[11px] font-bold uppercase tracking-[0.12em]">学时</div>
              </div>
            </div>
          </div>
          {completedCount > 0 && (
            <div className="flex justify-end mt-1.5">
              <button onClick={handleReset} className="flex items-center gap-1 text-[11px] text-ink-ghost hover:text-ember transition-colors font-medium">
                <ResetIcon size={12} /> 重置进度
              </button>
            </div>
          )}
        </div>

        {/* 章节关卡列表 */}
        {chapters.map((chapter, chIdx) => (
          <div key={chapter.id}>
            {chIdx > 0 && (
              <div className="mb-16 mt-12 pt-8 border-t border-paper-line" />
            )}

            {/* 章节标题 */}
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ember mb-3">{chapter.badge}</p>
              <h1 className="title-serif text-4xl sm:text-5xl font-medium text-ink mb-3">{chapter.title}</h1>
              <p className="text-ink-soft text-[15px]">{chapter.description}</p>
            </div>

            {/* 关卡列 */}
            <div className="relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-px bg-paper-line" aria-hidden />

              <div className="space-y-3">
                {chapter.courseIds.map((courseId, idx) => {
                  const course = courses.find(c => c.meta.id === courseId)
                  if (!course) return null

                  const status = getNodeStatus(course.meta.id)
                  const completion = progress.completedLessons[course.meta.id]
                  const locked = status === 'locked'
                  const done = !!completion

                  return (
                    <button
                      key={course.meta.id}
                      onClick={() => handleStart(course.meta.id)}
                      disabled={locked}
                      style={{ animationDelay: `${idx * 50}ms` }}
                      className={`group relative w-full flex items-center gap-4 pl-0 animate-rise text-left
                        ${locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {/* 节点圆点 */}
                      <span className={`relative z-10 flex-shrink-0 w-11 sm:w-14 h-11 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center
                        font-mono font-bold text-lg transition-all duration-200
                        ${done
                          ? 'bg-ember text-paper-raised shadow-ember'
                          : locked
                          ? 'bg-paper-sunk text-ink-ghost border border-paper-line'
                          : 'bg-paper-raised text-ember border-2 border-ember shadow-paper group-hover:shadow-ember'
                        }`}>
                        {done ? '✓' : locked ? '🔒' : course.meta.chapter}
                      </span>

                      {/* 卡片 */}
                      <span className={`flex-1 flex items-center justify-between gap-3 sm:gap-4 rounded-2xl border px-4 sm:px-5 py-3 sm:py-4
                        transition-all duration-200
                        ${locked
                          ? 'border-paper-line bg-paper-raised/50 opacity-60'
                          : 'border-paper-line bg-paper-raised shadow-paper group-hover:border-ember/40 group-hover:-translate-y-0.5 group-hover:shadow-lift'
                        }`}>
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 mb-0.5">
                            <span className={`font-display font-semibold text-[17px] ${locked ? 'text-ink-faint' : 'text-ink'}`}>
                              {course.meta.title}
                            </span>
                            {completion?.perfect && <span className="text-gold text-sm">★</span>}
                          </span>
                          <span className={`block text-[13px] ${locked ? 'text-ink-ghost' : 'text-ink-faint'}`}>
                            {course.meta.subtitle} · ~{course.meta.estimatedMinutes} 分钟
                          </span>
                        </span>
                        <span className={`flex-shrink-0 text-sm transition-transform
                          ${locked ? 'text-ink-ghost' : 'text-ember group-hover:translate-x-1'}`}>
                          {done ? '重练' : locked ? '' : '→'}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export default LevelSelect
