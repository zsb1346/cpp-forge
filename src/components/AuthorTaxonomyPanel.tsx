import React, { useMemo, useState } from 'react'
import type { Lesson } from '../types/protocol'
import { useStore } from '../store/useStore'
import { getLessonContentProfile, subjectLabel, CONTENT_KIND_META } from '../lib/contentTaxonomy'
import { StarIcon, ArrowRightIcon } from './icons'

interface Props {
  courses: Lesson[];
}

type FilterKind = 'all' | 'subject' | 'kind' | 'knowledge' | 'stage' | 'misconception'

interface ActiveFilter {
  kind: FilterKind;
  key: string;
  label: string;
}

interface MetricItem {
  key: string;
  label: string;
  count: number;
  completed: number;
  perfect: number;
  minutes: number;
}

const KIND_LABEL: Record<string, string> = {
  lesson: '主线课',
  practice: '练习',
  challenge: '挑战',
  review: '复习',
}

function hasFilter(course: Lesson, filter: ActiveFilter): boolean {
  if (filter.kind === 'all') return true
  const profile = getLessonContentProfile(course)

  if (filter.kind === 'subject') return String(profile.subject) === filter.key
  if (filter.kind === 'kind') return String(profile.kind) === filter.key
  if (filter.kind === 'knowledge') return profile.knowledgePoints.some(kp => kp.id === filter.key)
  if (filter.kind === 'stage') return profile.stages.includes(filter.key)
  if (filter.kind === 'misconception') return profile.misconceptions.includes(filter.key)
  return true
}

const LearnerDashboard: React.FC<Props> = ({ courses }) => {
  const completedLessons = useStore(s => s.progress.completedLessons)
  const startLesson = useStore(s => s.startLesson)
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({ kind: 'all', key: 'all', label: '全部内容' })

  const data = useMemo(() => {
    const metric = (
      kind: FilterKind,
      key: string,
      label: string,
      source: Lesson[],
    ): MetricItem => {
      const completedCourses = source.filter(course => completedLessons[course.meta.id])
      return {
        key,
        label,
        count: source.length,
        completed: completedCourses.length,
        perfect: completedCourses.filter(course => completedLessons[course.meta.id]?.perfect).length,
        minutes: completedCourses.reduce((sum, course) => sum + (course.meta.estimatedMinutes ?? 0), 0),
      }
    }

    const build = (kind: Exclude<FilterKind, 'all'>, entries: Array<{ key: string; label: string }>) => entries
      .map(entry => metric(kind, entry.key, entry.label, courses.filter(course => hasFilter(course, { kind, key: entry.key, label: entry.label }))))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))

    const profiles = courses.map(course => ({ course, profile: getLessonContentProfile(course) }))
    const subjects = Array.from(new Set(profiles.map(p => String(p.profile.subject))))
      .map(key => ({ key, label: subjectLabel(key) }))
    const kinds = Array.from(new Set(profiles.map(p => String(p.profile.kind))))
      .map(key => ({ key, label: KIND_LABEL[key] ?? key }))
    const knowledgePoints = Array.from(new Map(
      profiles.flatMap(p => p.profile.knowledgePoints.map(kp => [kp.id, kp.label ?? kp.id] as const)),
    ).entries()).map(([key, label]) => ({ key, label }))
    const stages = Array.from(new Set(profiles.flatMap(p => p.profile.stages)))
      .map(key => ({ key, label: key }))
    const misconceptions = Array.from(new Set(profiles.flatMap(p => p.profile.misconceptions)))
      .map(key => ({ key, label: key }))

    const filteredCourses = courses.filter(course => hasFilter(course, activeFilter))
    const completedFiltered = filteredCourses.filter(course => completedLessons[course.meta.id])

    return {
      subjects: build('subject', subjects),
      kinds: build('kind', kinds),
      knowledgePoints: build('knowledge', knowledgePoints),
      stages: build('stage', stages),
      misconceptions: build('misconception', misconceptions),
      filteredCourses,
      filteredStats: {
        total: filteredCourses.length,
        completed: completedFiltered.length,
        perfect: completedFiltered.filter(course => completedLessons[course.meta.id]?.perfect).length,
        minutes: completedFiltered.reduce((sum, course) => sum + (course.meta.estimatedMinutes ?? 0), 0),
      },
    }
  }, [courses, completedLessons, activeFilter])

  const setFilter = (kind: FilterKind, key: string, label: string) => setActiveFilter({ kind, key, label })

  return (
    <section className="space-y-6 animate-rise">
      <div className="surface p-5 sm:p-7 hub-preview">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-ember mb-2">Learning Analytics</p>
            <h1 className="title-serif text-3xl sm:text-4xl font-medium text-ink mb-3">学习分析</h1>
            <p className="text-sm text-ink-soft leading-relaxed max-w-2xl">
              按学科、内容类型、知识点、认知阶段查看你的学习进度。
              点击任意分类查看对应的课程——找到薄弱点，然后继续学习。
            </p>
          </div>
          <button onClick={() => setFilter('all', 'all', '全部内容')} className="btn-ghost self-start lg:self-auto">
            查看全部
          </button>
        </div>
      </div>

      <div className="surface p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ember mb-2">当前筛选</p>
            <h2 className="title-serif text-2xl sm:text-3xl text-ink leading-tight">{activeFilter.label}</h2>
            <p className="text-xs text-ink-faint mt-1 font-mono">{activeFilter.kind === 'all' ? '全部课程' : `${activeFilter.kind}:${activeFilter.key}`}</p>
          </div>
          <div className="text-sm text-ink-faint">
            已完成 <span className="font-mono font-bold text-ink">{data.filteredStats.completed}</span>
            /<span className="font-mono text-ink">{data.filteredStats.total}</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-4 gap-3">
          <SummaryCard label="筛选课程" value={data.filteredStats.total} hint="当前筛选范围的课程总数" />
          <SummaryCard label="已完成" value={data.filteredStats.completed} hint="当前筛选中你完成的课程" />
          <SummaryCard label="满星" value={data.filteredStats.perfect} hint="当前筛选中满星的课程" />
          <SummaryCard label="已学时间" value={data.filteredStats.minutes} hint="当前筛选范围内的总学习分钟" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <TaxonomyBox title="学科 Subject" subtitle="点击切换到对应学科查看完成情况">
          {data.subjects.map(item => (
            <MetricRow
              key={item.key}
              item={item}
              active={activeFilter.kind === 'subject' && activeFilter.key === item.key}
              onClick={() => setFilter('subject', item.key, item.label)}
            />
          ))}
        </TaxonomyBox>

        <TaxonomyBox title="内容类型" subtitle="按主线课 / 练习 / 挑战 / 复习查看完成情况">
          {data.kinds.map(item => (
            <MetricRow
              key={item.key}
              item={item}
              active={activeFilter.kind === 'kind' && activeFilter.key === item.key}
              onClick={() => setFilter('kind', item.key, item.label)}
            />
          ))}
        </TaxonomyBox>

        <TaxonomyBox title="知识点" subtitle="查看每个知识点的掌握情况">
          {data.knowledgePoints.slice(0, 12).map(item => (
            <MetricRow
              key={item.key}
              item={item}
              active={activeFilter.kind === 'knowledge' && activeFilter.key === item.key}
              onClick={() => setFilter('knowledge', item.key, item.label)}
              mono
            />
          ))}
          {data.knowledgePoints.length > 12 && (
            <p className="text-xs text-ink-ghost pt-2">还有 {data.knowledgePoints.length - 12} 个知识点未展开显示。</p>
          )}
        </TaxonomyBox>

        <TaxonomyBox title="认知阶段" subtitle="按认知阶段了解学习深度">
          {data.stages.length ? data.stages.map(item => (
            <MetricRow
              key={item.key}
              item={item}
              active={activeFilter.kind === 'stage' && activeFilter.key === item.key}
              onClick={() => setFilter('stage', item.key, item.label)}
              mono
            />
          )) : (
            <p className="text-sm text-ink-faint leading-relaxed">
              当前课程尚未标注认知阶段。新内容将逐步增加此维度。
            </p>
          )}
          {data.misconceptions.length ? (
            <div className="mt-4 pt-4 border-t border-paper-line space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint mb-2">常见误区</p>
              {data.misconceptions.slice(0, 6).map(item => (
                <MetricRow
                  key={item.key}
                  item={item}
                  active={activeFilter.kind === 'misconception' && activeFilter.key === item.key}
                  onClick={() => setFilter('misconception', item.key, item.label)}
                  mono
                />
              ))}
            </div>
          ) : null}
        </TaxonomyBox>
      </div>

      {/* 筛选后的课程列表 — 带"去学习"入口 */}
      <div className="surface p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ember mb-1">课程列表</p>
            <h2 className="font-display font-semibold text-xl text-ink">{activeFilter.label}</h2>
          </div>
          <span className="font-mono text-xs text-ink-ghost">{data.filteredCourses.length} 个课程</span>
        </div>
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {data.filteredCourses.map(course => {
            const completion = completedLessons[course.meta.id]
            const profile = getLessonContentProfile(course)
            const kindMeta = CONTENT_KIND_META[profile.kind]
            return (
              <div key={course.meta.id} className="flex items-center justify-between gap-3 rounded-2xl border border-paper-line bg-paper-sunk px-4 py-3 hover:border-ember/30 hover:bg-paper-raised transition-all duration-200">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    {kindMeta && profile.kind !== 'lesson' && (
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider leading-none ${kindMeta.badgeClass}`}>
                        {kindMeta.labelShort}
                      </span>
                    )}
                    <p className="font-display font-semibold text-ink truncate">{course.meta.title}</p>
                  </div>
                  <p className="text-xs text-ink-faint truncate">{course.meta.subtitle} · {course.meta.id}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`font-mono text-[11px] font-bold px-2 py-1 rounded-lg ${completion ? 'bg-sage-tint text-sage' : 'bg-paper-raised text-ink-ghost'}`}>
                    {completion ? 'done' : 'todo'}
                  </span>
                  {completion?.perfect && <StarIcon size={12} filled className="text-gold" />}
                  <button
                    onClick={() => startLesson(course)}
                    className="btn-ghost text-xs px-3 py-1.5"
                    type="button"
                  >
                    去学习 <ArrowRightIcon size={12} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const SummaryCard: React.FC<{ label: string; value: number; hint: string }> = ({ label, value, hint }) => (
  <div className="rounded-2xl border border-paper-line bg-paper-raised shadow-paper p-4">
    <div className="font-mono text-2xl font-bold text-ink mb-1">{value}</div>
    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">{label}</div>
    <div className="text-xs text-ink-ghost mt-1">{hint}</div>
  </div>
)

const TaxonomyBox: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
  <div className="surface p-5">
    <h2 className="font-display font-semibold text-xl text-ink mb-1">{title}</h2>
    <p className="text-xs text-ink-faint mb-4">{subtitle}</p>
    <div className="space-y-2">{children}</div>
  </div>
)

const MetricRow: React.FC<{ item: MetricItem; active?: boolean; onClick: () => void; mono?: boolean }> = ({ item, active, onClick, mono }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-left transition-all duration-200
      ${active ? 'border-ember bg-ember-tint shadow-paper' : 'border-paper-line bg-paper-sunk hover:border-ember/40 hover:bg-paper'}`}
    type="button"
  >
    <span className={`text-sm min-w-0 truncate ${active ? 'text-ink font-semibold' : 'text-ink-soft'} ${mono ? 'font-mono text-[12px]' : ''}`}>
      {item.label}
    </span>
    <span className="flex items-center gap-1.5 shrink-0">
      <span className="font-mono text-[11px] font-bold text-sage bg-sage-tint px-2 py-1 rounded-lg">{item.completed}/{item.count}</span>
      <span className="font-mono text-[11px] font-bold text-ember bg-ember-tint px-2 py-1 rounded-lg flex items-center gap-0.5">{item.perfect}<StarIcon size={10} filled className="text-ember" /></span>
    </span>
  </button>
)

export default LearnerDashboard