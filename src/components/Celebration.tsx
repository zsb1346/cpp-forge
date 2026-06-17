import React, { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { StarIcon, ArrowRightIcon, HammerIcon } from './icons'

/** 完成一课时的庆祝弹层 —— 锻造完成、火花迸发 */
const Celebration: React.FC = () => {
  const celebration = useStore(s => s.celebration)
  const dismiss = useStore(s => s.dismissCelebration)
  const goToNext = useStore(s => s.goToNextLesson)
  const [show, setShow] = useState(false)

  useEffect(() => { setShow(true) }, [])

  if (!celebration) return null

  // 迸发的火花粒子
  const sparks = Array.from({ length: 14 }, (_, i) => i)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6
      bg-ink/40 backdrop-blur-sm animate-fade-in">
      <div className={`relative surface max-w-md w-full p-9 text-center
        ${show ? 'animate-pop' : 'opacity-0'}`}>

        {/* 火花 */}
        <div className="absolute inset-x-0 top-0 h-0 flex justify-center pointer-events-none" aria-hidden>
          {sparks.map(i => (
            <span key={i}
              className="absolute w-2 h-2 rounded-full bg-gold animate-spark"
              style={{
                left: `${50 + (i - 7) * 6}%`,
                animationDelay: `${i * 40}ms`,
                background: i % 2 ? '#d9480f' : '#ffd866',
              }} />
          ))}
        </div>

        {/* 印章式徽记 */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-3xl bg-ember shadow-ember
          flex items-center justify-center">
          <HammerIcon size={36} className="text-paper-raised" />
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember mb-2">锻造完成</p>
        <h2 className="title-serif text-3xl font-medium text-ink mb-3">
          《{celebration.title}》通关
        </h2>
        <div className="flex justify-center gap-1.5 mb-6">
          {[0, 1, 2].map(i => (
            <span key={i} className="animate-pop"
              style={{ animationDelay: `${300 + i * 120}ms` }}>
              <StarIcon size={28} filled className="text-gold" />
            </span>
          ))}
        </div>

        <p className="text-ink-soft text-sm mb-7">
          {celebration.nextTitle
            ? <>下一关 <span className="font-semibold text-ink">《{celebration.nextTitle}》</span> 已解锁</>
            : '你已经走完了全部关卡，了不起！'}
        </p>

        <div className="flex gap-3">
          <button onClick={dismiss}
            className="btn-ghost flex-1 justify-center">
            返回选关
          </button>
          {celebration.nextTitle && (
            <button onClick={goToNext}
              className="btn-primary flex-1 justify-center">
              下一课：{celebration.nextTitle} <ArrowRightIcon size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Celebration
