import React, { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'

const StartScreen: React.FC = () => {
  const setScreen = useStore(s => s.setScreen)
  const progress = useStore(s => s.progress)
  const courses = useStore(s => s.courses)
  const resumeLesson = useStore(s => s.resumeLesson)
  const completedCount = Object.keys(progress.completedLessons).length
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // 断点续学 — 从进度中恢复中断的课程
  const resumeCourse = progress.currentLesson
    ? courses.find(c => c.meta.id === progress.currentLesson) ?? null
    : null
  const resumeBlockIndex = progress.currentBlock ?? 0
  const resumeBlocksTotal = resumeCourse?.blocks.length ?? 0

  const methods = [
    { k: '01', t: '认概念', d: '像翻单词卡一样，先认识 int、float、string 是什么' },
    { k: '02', t: '跟着敲', d: '照着范本一字一句敲出来，建立肌肉记忆' },
    { k: '03', t: '做判断', d: '选择题厘清易混点，拼装题理解语法骨架' },
    { k: '04', t: '补全它', d: '填空练习，把关键概念真正焊进脑子里' },
  ]

  return (
    <div className="min-h-screen forge-glow flex flex-col relative overflow-hidden">
      {/* 漂浮的代码符号装饰 */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        {['{', '}', ';', '()', '<>', '&', '*', '::'].map((s, i) => (
          <span
            key={i}
            className="absolute font-mono text-ember/[0.06] font-bold animate-float hidden sm:block"
            style={{
              fontSize: `${48 + (i % 4) * 28}px`,
              top: `${(i * 53) % 90}%`,
              left: `${(i * 37 + 8) % 92}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 3) * 2}s`,
            }}
          >{s}</span>
        ))}
      </div>

      {/* 顶栏 */}
      <header className={`relative z-10 px-7 sm:px-10 py-6 flex items-center justify-between
        ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="flex items-center gap-2.5">
          <ForgeMark />
          <span className="font-display font-semibold text-lg tracking-tight">Forge</span>
        </div>
        <span className="text-xs text-ink-faint font-mono">C++ · for Unreal</span>
      </header>

      {/* 主体 */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-7 sm:px-10 max-w-5xl mx-auto w-full pb-16">
        {/* 角标 */}
        <p className={`text-xs font-bold uppercase tracking-[0.3em] text-ember mb-5
          ${mounted ? 'animate-slide-in' : 'opacity-0'}`}>
          从零锻造 · 蓝图玩家专属
        </p>

        {/* 巨型衬线标题 */}
        <h1 className="title-serif font-medium leading-[0.95] text-ink mb-7
          text-[clamp(2.75rem,9vw,6rem)] text-balance">
          <span className={`block ${mounted ? 'animate-rise' : 'opacity-0'}`}>把<span className="text-ember">蓝图直觉</span></span>
          <span className={`block ${mounted ? 'animate-rise delay-2' : 'opacity-0'}`}>
            锻成 <span className="deco-underline">C++ 代码</span>
          </span>
        </h1>

        {/* 副文案 */}
        <p className={`text-ink-soft text-lg sm:text-xl max-w-xl leading-relaxed mb-10
          ${mounted ? 'animate-rise delay-3' : 'opacity-0'}`}>
          你已经懂逻辑、懂节点、懂事件。现在只差把它写成文字。
          这里不灌概念，而是像导师一样，一小步一小步带你敲到会为止。
        </p>

        {/* CTA */}
        <div className={`flex flex-wrap items-center gap-4 ${resumeCourse ? 'mb-8' : 'mb-16'} ${mounted ? 'animate-rise delay-4' : 'opacity-0'}`}>
          <button onClick={() => setScreen('level-select')} className="btn-primary text-base px-8 py-4">
            {completedCount > 0 ? '继续锻造' : '开始第一课'}
            <span className="text-lg">→</span>
          </button>
          {completedCount > 0 && (
            <span className="text-sm text-ink-faint">
              已完成 <span className="font-bold text-ink font-mono">{completedCount}</span> 关
            </span>
          )}
        </div>

        {/* 断点续学 */}
        {resumeCourse && (
          <div className={`flex items-center justify-between bg-paper-raised rounded-xl border border-paper-line px-5 py-3.5 mb-14 gap-3 ${mounted ? 'animate-rise delay-4' : 'opacity-0'}`}>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ember mb-0.5">断点续学</p>
              <h3 className="font-display font-semibold text-[15px] text-ink truncate">{resumeCourse.meta.title}</h3>
              <p className="text-xs text-ink-faint mt-0.5">
                第 <span className="font-mono font-bold text-ink">{resumeBlockIndex + 1}</span>
                /<span className="font-mono text-ink">{resumeBlocksTotal}</span> 节
              </p>
            </div>
            <button
              onClick={resumeLesson}
              className="btn-primary text-sm px-5 py-2.5 shrink-0"
            >
              继续<span className="text-base ml-1">→</span>
            </button>
          </div>
        )}

        {/* 四步方法（编辑感横排） */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-x-8 sm:gap-y-6 border-t border-paper-line pt-8
          ${mounted ? 'animate-fade-in delay-5' : 'opacity-0'}`}>
          {methods.map((m, i) => (
            <div key={i} className="group">
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="font-mono text-xs text-ember font-bold">{m.k}</span>
                <h3 className="font-display font-semibold text-[17px] text-ink">{m.t}</h3>
              </div>
              <p className="text-[13px] text-ink-faint leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

// 锻造标记：铁砧 + 火花的极简符号
const ForgeMark: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <rect x="2.5" y="2.5" width="27" height="27" rx="8" fill="#d9480f" />
    <path d="M9 18h14l-2.5 4H11.5L9 18z" fill="#fffdf8" />
    <rect x="13" y="11" width="6" height="5" rx="1" fill="#fffdf8" />
    <path d="M16 5l1.4 3.2L20.5 9l-2.4 1.8.8 3.2L16 12.4 13.1 14l.8-3.2L11.5 9l3.1-.8L16 5z" fill="#ffd866" />
  </svg>
)

export default StartScreen
