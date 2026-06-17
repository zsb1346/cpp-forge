/* ============================
   TimelineControls — 时间线导航控件
   进度条 + 步进点 + 播放/暂停 + 上一步/下一步
   ============================ */

import React from 'react'

interface Props {
  currentStep: number
  totalSteps: number
  progress: number
  isPlaying: boolean
  isAtEnd: boolean
  allowSeek?: boolean
  showStepIndicator?: boolean
  onPlay: () => void
  onPause: () => void
  onNext: () => void
  onPrev: () => void
  onSeek: (p: number) => void
}

const TimelineControls: React.FC<Props> = ({
  currentStep,
  totalSteps,
  progress,
  isPlaying,
  isAtEnd,
  allowSeek = false,
  showStepIndicator = true,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onSeek,
}) => {
  // 仅在多个步骤时显示完整控件
  if (totalSteps <= 1) return null

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!allowSeek) return
    const rect = e.currentTarget.getBoundingClientRect()
    const p = (e.clientX - rect.left) / rect.width
    onSeek(p)
  }

  const stepProgress = totalSteps > 1
    ? (currentStep + progress) / (totalSteps - 1)
    : 1

  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* 进度条 */}
      <div
        className={`relative h-1.5 bg-paper-sunk rounded-full overflow-hidden cursor-pointer
          ${allowSeek ? 'group hover:h-2' : ''}`}
        onClick={handleProgressClick}
        style={{ transition: 'height 0.2s' }}
      >
        <div
          className="absolute inset-y-0 left-0 bg-ember/70 rounded-full"
          style={{
            width: `${stepProgress * 100}%`,
            transition: 'width 0.3s ease',
          }}
        />
        {/* 步进点 */}
        {showStepIndicator && totalSteps > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-0.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full border-2 transition-colors
                  ${i <= currentStep
                    ? 'border-ember bg-ember'
                    : 'border-ink-faint/20 bg-paper-sunk'
                  }`}
                style={{ transition: 'background-color 0.3s, border-color 0.3s' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 按钮 */}
      <div className="flex items-center justify-center gap-3">
        {/* 上一步 */}
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className="p-1.5 rounded-md text-ink-faint/50 hover:text-ink hover:bg-paper-sunk
            disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          aria-label="上一步"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* 播放 / 暂停 */}
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={isAtEnd}
          className="p-2 rounded-full bg-ember/10 text-ember hover:bg-ember/20
            disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          )}
        </button>

        {/* 下一步 */}
        <button
          onClick={onNext}
          disabled={isAtEnd}
          className="p-1.5 rounded-md text-ink-faint/50 hover:text-ink hover:bg-paper-sunk
            disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          aria-label="下一步"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* 步骤标签 */}
      <div className="text-center text-xs text-ink-faint/50 select-none">
        {currentStep + 1} / {totalSteps}
      </div>
    </div>
  )
}

export default TimelineControls
