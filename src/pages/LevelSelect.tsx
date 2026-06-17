import React, { useCallback, useState, useRef, useMemo, Suspense, lazy } from 'react'
import { useStore } from '../store/useStore'
import { chapters } from '../courses'
import { TrophyIcon, StarIcon, TargetIcon, ResetIcon, ArrowLeftIcon, CheckIcon, LockIcon, ArrowRightIcon, UnlockIcon } from '../components/icons'
import SubjectSwitcher from '../components/SubjectSwitcher'
import { filterLessonsBySubject, getLessonContentProfile, CONTENT_KIND_META, subjectLabel, subjectHasContent } from '../lib/contentTaxonomy'

const LearnerDashboard = lazy(() => import('../components/AuthorTaxonomyPanel'))



const LevelSelect: React.FC = () => {
  const courses = useStore(s => s.courses)
  const setScreen = useStore(s => s.setScreen)
  const startLesson = useStore(s => s.startLesson)
  const completedLessons = useStore(s => s.progress.completedLessons)
  const resetAllProgress = useStore(s => s.resetAllProgress)
  const debugUnlockLesson = useStore(s => s.debugUnlockLesson)
  const selectedSubject = useStore(s => s.selectedSubject)
  const setSelectedSubject = useStore(s => s.setSelectedSubject)

  const [toast, setToast] = useState<string | null>(null)
  const [view, setView] = useState<'path' | 'author'>('path')
  const [collapsedChapters, setCollapsedChapters] = useState<Set<string>>(new Set())
  const clickCountRef = useRef<Map<string, number>>(new Map())
  const clickTimerRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const toggleChapter = useCallback((chapterId: string) => {
    setCollapsedChapters(prev => {
      const next = new Set(prev)
      if (next.has(chapterId)) next.delete(chapterId)
      else next.add(chapterId)
      return next
    })
  }, [])

  // ─── 课程过滤缓存 ──────────────────────────────────
  const subjectCourses = useMemo(
    () => filterLessonsBySubject(courses, selectedSubject),
    [courses, selectedSubject],
  )
  const subjectCourseIds = useMemo(
    () => new Set(subjectCourses.map(course => course.meta.id)),
    [subjectCourses],
  )

  // ─── 统计指标缓存（含 ContentKind 分型） ─────────
  const {
    completedCount,
    totalCount,
    pct,
    perfectCount,
    totalMinutes,
    kindBreakdown,
  } = useMemo(() => {
    const comp = subjectCourses.filter(c => completedLessons[c.meta.id]).length
    const tot = subjectCourses.length
    const perf = subjectCourses.filter(c => completedLessons[c.meta.id]?.perfect).length
    const mins = subjectCourses
      .filter(c => completedLessons[c.meta.id])
      .reduce((sum, c) => sum + (c.meta.estimatedMinutes ?? 0), 0)

    const breakdown: Record<string, { total: number; completed: number }> = {}
    for (const course of subjectCourses) {
      const kind = getLessonContentProfile(course).kind
      if (!breakdown[kind]) breakdown[kind] = { total: 0, completed: 0 }
      breakdown[kind].total++
      if (completedLessons[course.meta.id]) breakdown[kind].completed++
    }

    return {
      completedCount: comp,
      totalCount: tot,
      pct: tot ? Math.round((comp / tot) * 100) : 0,
      perfectCount: perf,
      totalMinutes: mins,
      kindBreakdown: breakdown,
    }
  }, [subjectCourses, completedLessons])

  const visibleChapters = useMemo(() =>
    chapters
      .map(chapter => ({
        ...chapter,
        courseIds: chapter.courseIds.filter(courseId => subjectCourseIds.has(courseId)),
      }))
      .filter(chapter => chapter.courseIds.length > 0),
    [subjectCourseIds],
  )

  const getSubjectNodeStatus = useCallback((courseId: string) => {
    const completion = completedLessons[courseId]
    if (completion?.perfect) return 'perfect'
    if (completion) return 'completed'

    const idx = subjectCourses.findIndex(course => course.meta.id === courseId)
    if (idx === 0) return 'available'
    const prev = subjectCourses[idx - 1]
    if (prev && completedLessons[prev.meta.id]) return 'available'
    return 'locked'
  }, [completedLessons, subjectCourses])

  const handleStart = useCallback((courseId: string) => {
    if (getSubjectNodeStatus(courseId) === 'locked') return
    const course = subjectCourses.find(c => c.meta.id === courseId)
    if (course) startLesson(course)
  }, [subjectCourses, getSubjectNodeStatus, startLesson])

  const handleReset = useCallback(() => {
    if (window.confirm('确定要重置所有进度吗？')) resetAllProgress()
  }, [resetAllProgress])

  const hasContent = subjectHasContent(selectedSubject, courses)

  return (
    <div className="min-h-screen atelier-shell">
      {/* 顶栏 */}
      <header className="sticky top-0 z-20 bg-paper/72 backdrop-blur-md border-b border-paper-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <button onClick={() => setScreen('start')} className="btn-text font-medium">
            <ArrowLeftIcon size={16} /> 首页
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center rounded-xl border border-paper-line bg-paper-sunk p-1">
              <button
                onClick={() => setView('path')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${view === 'path' ? 'bg-paper-raised text-ink shadow-paper' : 'text-ink-faint hover:text-ink'}`}
              >
                学习路线
              </button>
              <button
                onClick={() => setView('author')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${view === 'author' ? 'bg-paper-raised text-ink shadow-paper' : 'text-ink-faint hover:text-ink'}`}
              >
                学习分析
              </button>
            </div>
            {hasContent && (
              <>
                <span className="text-xs text-ink-faint font-mono">{completedCount}/{totalCount}</span>
                <div className="w-20 sm:w-28 h-1.5 rounded-full bg-paper-sunk overflow-hidden">
                  <div className="h-full rounded-full bg-ember transition-all duration-700"
                    style={{ width: `${pct}%` }} />
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-5">
          <SubjectSwitcher value={selectedSubject} onChange={setSelectedSubject} courses={courses} />
        </div>
        <div className="sm:hidden mb-5 grid grid-cols-2 rounded-2xl border border-paper-line bg-paper-sunk p-1">
          <button
            onClick={() => setView('path')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${view === 'path' ? 'bg-paper-raised text-ink shadow-paper' : 'text-ink-faint'}`}
          >
            学习路线
          </button>
          <button
            onClick={() => setView('author')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${view === 'author' ? 'bg-paper-raised text-ink shadow-paper' : 'text-ink-faint'}`}
          >
            学习分析
          </button>
        </div>

        {!hasContent ? (
          /* ── 学科空状态 ────────────────────────── */
          <div className="flex flex-col items-center justify-center py-24 animate-rise">
            <div className="w-20 h-20 rounded-full bg-paper-sunk border-2 border-dashed border-paper-line flex items-center justify-center mb-6">
              <span className="font-mono text-3xl text-ink-ghost">
                {String(selectedSubject).charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="title-serif text-2xl sm:text-3xl text-ink mb-3 text-center">
              {subjectLabel(selectedSubject)} 路线筹备中
            </h2>
            <p className="text-ink-faint text-sm text-center max-w-md leading-relaxed mb-3">
              这个学科的内容正在创作中。作者团队正在编排课程体系、打磨知识点。
            </p>
            <div className="flex items-center gap-2 text-xs text-ink-ghost font-mono bg-paper-sunk rounded-xl px-4 py-2 border border-paper-line">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              创作中 · 敬请期待
            </div>
          </div>
        ) : view === 'author' ? (
          <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="w-6 h-6 rounded-full border-2 border-ember border-r-transparent animate-spin" /></div>}>
            <LearnerDashboard courses={courses} />
          </Suspense>
        ) : (
          <>
        <div className="copper-rule mb-10" />

        {/* ContentKind 分型统计行 */}
        {totalCount > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {Object.entries(kindBreakdown).map(([kind, stats]) => {
              const meta = CONTENT_KIND_META[kind]
              if (!meta) return null
              return (
                <div
                  key={kind}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${meta.badgeClass}`}
                >
                  <span className={`w-2 h-2 rounded-full ${meta.dotColor}`} />
                  {meta.label}
                  <span className="font-mono opacity-70">
                    {stats.completed}/{stats.total}
                  </span>
                </div>
              )
            })}
          </div>
        )}

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

        {/* 章节关卡列表 — 带折叠，条件渲染 + contain 隔离 */}
        {visibleChapters.length > 1 && (
          <div className="flex items-center gap-3 mb-6 text-xs text-ink-faint">
            <button
              onClick={() => {
                if (collapsedChapters.size === visibleChapters.length) {
                  setCollapsedChapters(new Set())
                } else {
                  setCollapsedChapters(new Set(visibleChapters.map(c => c.id)))
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-paper-line bg-paper-sunk hover:bg-paper-raised hover:text-ink transition-colors font-medium"
              type="button"
            >
              {collapsedChapters.size === visibleChapters.length ? '展开全部' : '折叠全部'}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${collapsedChapters.size === visibleChapters.length ? '' : 'rotate-180'}`}>
                <path d="M2 6.5L5 3.5L8 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="text-ink-ghost">
              {collapsedChapters.size}/{visibleChapters.length} 个章节已折叠
            </span>
          </div>
        )}
        {visibleChapters.map((chapter, chIdx) => {
          const isCollapsed = collapsedChapters.has(chapter.id)
          const chapterCompleted = chapter.courseIds.filter(id => completedLessons[id]).length
          const chapterTotal = chapter.courseIds.length
          const chapterPct = chapterTotal > 0 ? Math.round((chapterCompleted / chapterTotal) * 100) : 0
          const allDone = chapterTotal > 0 && chapterCompleted === chapterTotal

          // — 章节内容类型汇总 —
          const kindCounts = chapter.courseIds.reduce<Record<string, number>>((acc, id) => {
            const course = subjectCourses.find(c => c.meta.id === id)
            if (course) {
              const k = getLessonContentProfile(course).kind
              acc[k] = (acc[k] ?? 0) + 1
            }
            return acc
          }, {})
          const summaryParts = Object.entries(kindCounts)
            .filter(([k]) => k !== 'lesson')
            .map(([k, n]) => `${n}${CONTENT_KIND_META[k]?.labelShort ?? k}`)
          const summaryStr = summaryParts.length ? ` · ${summaryParts.join(' ')}` : ''

          return (
          <div key={chapter.id} style={{ contain: 'content' }} className={chIdx > 0 ? 'mt-6' : ''}>
            {chIdx > 0 && (
              <div className={`mb-6 border-t border-paper-line transition-all duration-300 ${isCollapsed ? 'opacity-25' : ''}`} />
            )}

            {/* 章节标题 — 可点击折叠 */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className={`group w-full text-left transition-all duration-300
                ${isCollapsed
                  ? 'rounded-2xl border border-paper-line bg-paper-sunk/60 hover:bg-paper-raised hover:border-ember/30 hover:shadow-paper px-5 py-4 mb-3'
                  : 'mb-6'}`}
              type="button"
            >
              <div className="flex items-center gap-4">
                {/* 左侧：缩略时间线指示器 */}
                <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
                  <span className={`block w-[3px] h-6 rounded-full transition-colors duration-300
                    ${isCollapsed ? 'bg-ember/60' : 'bg-ember'}`} />
                  <span className={`block w-[3px] h-6 rounded-full transition-colors duration-300
                    ${isCollapsed ? 'bg-paper-line' : 'bg-ember/30'}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors
                      ${isCollapsed ? 'text-ember/60' : 'text-ember'}`}>
                      {chapter.badge}
                    </span>
                    {/* 折叠状态下的紧凑进度条 */}
                    {isCollapsed && (
                      <span className="flex items-center gap-1.5 ml-auto sm:ml-0">
                        <span className="w-16 h-1.5 rounded-full bg-paper-line overflow-hidden">
                          <span className="block h-full rounded-full bg-ember transition-all duration-500"
                            style={{ width: `${chapterPct}%` }} />
                        </span>
                        <span className="font-mono text-[11px] text-ink-faint">{chapterCompleted}/{chapterTotal}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className={`font-display font-semibold text-ink transition-all duration-300
                      ${isCollapsed ? 'text-xl' : 'title-serif text-4xl sm:text-5xl font-medium'}`}>
                      {chapter.title}
                    </h2>
                    {allDone && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sage-tint border border-sage/20 text-sage text-[9px] font-bold uppercase tracking-wider shrink-0">
                        已完成
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <p className="text-ink-soft text-[15px] max-w-2xl leading-relaxed mt-2">{chapter.description}</p>
                  )}
                </div>

                {/* 右侧：箭头 + 折叠摘要 */}
                <div className="flex items-center gap-2 shrink-0">
                  {isCollapsed && (
                    <span className="hidden sm:block text-[11px] text-ink-ghost font-mono">
                      {chapterTotal} 节{summaryStr}
                    </span>
                  )}
                  {!isCollapsed && (
                    <span className="text-[11px] text-ink-faint font-mono">
                      {chapterTotal} 节{summaryStr}
                    </span>
                  )}
                  <span className={`flex-shrink-0 w-7 h-7 rounded-lg border border-paper-line bg-paper-raised flex items-center justify-center
                    transition-all duration-300 group-hover:border-ember/30
                    ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-ink-faint">
                      <path d="M3 8.5L6 5.5L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* 展开状态下的进度条 */}
              {!isCollapsed && chapterTotal > 0 && (
                <div className="flex items-center gap-3 mt-4 ml-[23px]">
                  <span className="flex-1 h-1 rounded-full bg-paper-line overflow-hidden max-w-xs">
                    <span className="block h-full rounded-full bg-ember transition-all duration-500"
                      style={{ width: `${chapterPct}%` }} />
                  </span>
                  <span className="font-mono text-[11px] text-ink-faint">{chapterCompleted}/{chapterTotal} 已完成</span>
                </div>
              )}
            </button>

            {/* 关卡列 — 条件渲染（折叠时从 DOM 移除） */}
            {!isCollapsed && (
              <div className="relative pb-4" style={{ contentVisibility: 'auto' }}>
                <div className="absolute left-[27px] top-0 bottom-4 w-px bg-paper-line" aria-hidden />

                <div className="space-y-3">
                  {chapter.courseIds.map((courseId, idx) => {
                    const course = subjectCourses.find(c => c.meta.id === courseId)
                    if (!course) return null

                    const profile = getLessonContentProfile(course)
                    const kind = profile.kind
                    const kindMeta = CONTENT_KIND_META[kind]
                    const status = getSubjectNodeStatus(course.meta.id)
                    const completion = completedLessons[course.meta.id]
                    const locked = status === 'locked'
                    const done = !!completion

                    const isPracticeOrReview = kind === 'practice' || kind === 'review' || kind === 'challenge'
                    const kindColor = kindMeta?.dotColor ?? 'bg-ember'
                    const kindBorder = kindMeta?.cardBorder ?? 'border-ember/20'

                    const delayMs = Math.min(idx * 30, 300) // cap stagger to 300ms
                    return (
                      <button
                        key={course.meta.id}
                        onClick={() => {
                          if (!locked) {
                            handleStart(course.meta.id)
                            return
                          }
                          // 快速点击 10 次解锁调试
                          const id = course.meta.id
                          const map = clickCountRef.current
                          const timerMap = clickTimerRef.current
                          const prev = map.get(id) ?? 0
                          const next = prev + 1
                          map.set(id, next)
                          const oldTimer = timerMap.get(id)
                          if (oldTimer) clearTimeout(oldTimer)
                          timerMap.set(id, setTimeout(() => { map.delete(id); timerMap.delete(id) }, 2000))
                          if (next >= 10) {
                            map.delete(id)
                            if (oldTimer) clearTimeout(timerMap.get(id))
                            timerMap.delete(id)
                            debugUnlockLesson(id)
                            setToast(course.meta.title)
                            setTimeout(() => setToast(null), 1400)
                          }
                        }}
                        style={{ animationDelay: `${delayMs}ms` }}
                        className={`group relative w-full flex items-center gap-4 pl-0 animate-rise text-left
                          cursor-pointer`}
                      >
                        {/* 节点圆点 — 按 ContentKind 着色 */}
                        <span className={`relative z-10 flex-shrink-0 w-11 sm:w-14 h-11 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center
                          font-mono font-bold text-lg transition-all duration-200
                          ${done
                            ? `${kindColor} text-paper-raised shadow-paper`
                            : locked
                            ? 'bg-paper-sunk text-ink-ghost border border-paper-line'
                            : `bg-paper-raised border-2 ${kindColor === 'bg-ember' ? 'border-ember text-ember' : kindColor === 'bg-sage' ? 'border-sage text-sage' : kindColor === 'bg-gold' ? 'border-gold text-gold' : 'border-ink text-ink'} shadow-paper group-hover:shadow-lift`
                          }`}>
                          {done ? <CheckIcon size={18} /> : locked ? <LockIcon size={18} /> : course.meta.chapter}
                        </span>

                        {/* 卡片 — 按 ContentKind 加边框色和徽章 */}
                        <span className={`flex-1 flex items-center justify-between gap-3 sm:gap-4 rounded-2xl border px-4 sm:px-5 py-3 sm:py-4
                          transition-all duration-200
                          ${locked
                            ? `border-paper-line bg-paper-raised/50 opacity-60`
                            : `${kindBorder} bg-paper-raised shadow-paper group-hover:-translate-y-0.5 group-hover:shadow-lift ${done ? '' : 'group-hover:border-ember/40'}`
                          }`}>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 mb-0.5">
                              {/* ContentKind 徽章 */}
                              {isPracticeOrReview && kindMeta && (
                                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider leading-none ${kindMeta.badgeClass}`}>
                                  {kindMeta.labelShort}
                                </span>
                              )}
                              <span className={`font-display font-semibold text-[17px] ${locked ? 'text-ink-faint' : 'text-ink'}`}>
                                {course.meta.title}
                              </span>
                              {completion?.perfect && <span className="text-gold"><StarIcon size={14} filled /></span>}
                            </span>
                            <span className={`block text-[13px] ${locked ? 'text-ink-ghost' : 'text-ink-faint'}`}>
                              {course.meta.subtitle} · ~{course.meta.estimatedMinutes} 分钟
                            </span>
                          </span>
                          <span className={`flex-shrink-0 text-sm transition-transform
                            ${locked ? 'text-ink-ghost' : 'text-ember group-hover:translate-x-1'}`}>
                            {done ? '重练' : locked ? '' : <ArrowRightIcon size={16} />}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          )
        })}
          </>
        )}
      </main>
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-sage text-paper-raised px-5 py-3 rounded-2xl shadow-lift text-sm font-semibold animate-pop flex items-center gap-2">
          <UnlockIcon size={16} /> 已解锁：{toast}
        </div>
      )}
    </div>
  )
}

export default LevelSelect