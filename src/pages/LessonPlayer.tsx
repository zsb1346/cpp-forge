import React, { useCallback, useState, useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'
import BlockRenderer from '../components/BlockRenderer'
import TeachingLayout from '../components/TeachingLayout'
import LessonPreview from '../components/LessonPreview'
import { KeyboardIcon, CheckIcon, ArrowLeftIcon, ArrowRightIcon } from '../components/icons'
import type { Block } from '../types/protocol'

const BLOCK_LABELS: Record<string, string> = {
  exposition: '讲解',
  'concept-cards': '概念卡',
  'type-it': '跟敲',
  'multiple-choice': '选择',
  'match-blocks': '拼装',
  'fill-in': '填空',
  'code-runner': '运行',
  'predict-output': '猜输出',
  'trace-state': '走读',
  'fix-code': '修代码',
  'choose-next-line': '选下一行',
  'compare-snippets': '对比',
}

const isPassiveBlock = (block?: Block) => block?.type === 'exposition'

const LessonPlayer: React.FC = () => {
  const currentLesson = useStore(s => s.currentLesson)
  const currentBlockIndex = useStore(s => s.currentBlockIndex)
  const nextBlock = useStore(s => s.nextBlock)
  const prevBlock = useStore(s => s.prevBlock)
  const jumpToBlock = useStore(s => s.jumpToBlock)
  const blockCompleted = useStore(s => s.blockCompleted)
  const setBlockCompleted = useStore(s => s.setBlockCompleted)
  const setScreen = useStore(s => s.setScreen)
  const completeLesson = useStore(s => s.completeLesson)

  const [showPreview, setShowPreview] = useState(true)
  const [navOpen, setNavOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭导航
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setNavOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleBlockComplete = useCallback(() => setBlockCompleted(true), [setBlockCompleted])

  const handleNext = useCallback(() => {
    if (!currentLesson) return
    if (currentBlockIndex >= currentLesson.blocks.length - 1) completeLesson(3)
    else nextBlock()
  }, [currentLesson, currentBlockIndex, nextBlock, completeLesson])

  const handleStart = useCallback(() => setShowPreview(false), [])

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-ink-faint">未选择课程</p>
      </div>
    )
  }

  // 预览模式：展示学习目标
  if (showPreview) {
    return (
      <div className="min-h-screen flex flex-col atelier-shell">
        <header className="sticky top-0 z-20 bg-paper/72 backdrop-blur-md border-b border-paper-line">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center">
            <button onClick={() => setScreen('level-select')} className="btn-text font-medium">
              <ArrowLeftIcon size={16} /> <span className="hidden sm:inline">退出</span>
            </button>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-lg w-full">
            <LessonPreview lesson={currentLesson} onStart={handleStart} />
          </div>
        </main>
      </div>
    )
  }

  // 学习模式
  const block = currentLesson.blocks[currentBlockIndex]
  const total = currentLesson.blocks.length
  const isFirst = currentBlockIndex === 0
  const isLast = currentBlockIndex === total - 1
  const passive = isPassiveBlock(block)
  const canAdvance = blockCompleted || passive
  const curType = block ? BLOCK_LABELS[block.type] ?? block.type : ''

  const handleNavSelect = (index: number) => {
    jumpToBlock(index)
    setNavOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col atelier-shell">
      {/* 顶栏 + 进度 */}
      <header className="sticky top-0 z-20 bg-paper/72 backdrop-blur-md border-b border-paper-line">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
          <button onClick={() => setScreen('level-select')} className="btn-text font-medium">
            <ArrowLeftIcon size={16} /> <span className="hidden sm:inline">退出</span>
          </button>
          <span className="font-display font-semibold text-ink truncate">
            {currentLesson.meta.title}
          </span>

          {/* Block 导航 */}
          <div className="relative flex-shrink-0" ref={navRef}>
            <button
              onClick={() => setNavOpen(o => !o)}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-ink-faint
                bg-paper-sunk hover:bg-paper-line transition-colors px-2.5 py-1.5 rounded-lg"
            >
              <span>{currentBlockIndex + 1}/{total}</span>
              <span className="text-[10px] opacity-60">▾</span>
            </button>

            {navOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-paper-line
                bg-paper-raised shadow-lift overflow-hidden z-30">
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint border-b border-paper-line">
                  课程目录
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {currentLesson.blocks.map((b, i) => {
                    const isCurrent = i === currentBlockIndex
                    const isPast = i < currentBlockIndex
                    const label = BLOCK_LABELS[b.type] ?? b.type
                    return (
                      <button
                        key={i}
                        onClick={() => handleNavSelect(i)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors
                          ${isCurrent
                            ? 'bg-ember/10 text-ink font-semibold'
                            : 'text-ink-faint hover:bg-paper-sunk'}
                        `}
                      >
                        <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold
                          ${isCurrent
                            ? 'bg-ember text-paper-raised'
                            : isPast
                            ? 'bg-ember/15 text-ember'
                            : 'bg-paper-sunk text-ink-faint'}`}
                        >
                          {i + 1}
                        </span>
                        <span className="flex-1 text-[13px]">{label}</span>
                        {isPast && <CheckIcon size={14} className="text-ember flex-shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 分段进度条 */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-3 flex gap-1.5">
          {currentLesson.blocks.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpToBlock(i)}
              className="flex-1 h-1 rounded-full bg-paper-sunk overflow-hidden transition-opacity hover:opacity-80"
              aria-label={`跳转到第 ${i + 1} 节`}
            >
              <div className={`h-full rounded-full transition-all duration-500
                ${i < currentBlockIndex ? 'bg-ember w-full'
                  : i === currentBlockIndex ? (canAdvance ? 'bg-ember w-full' : 'bg-ember/40 w-1/3')
                  : 'w-0'}`} />
            </button>
          ))}
        </div>
      </header>

      {/* 当前 block */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-10">
        {block && (
          <TeachingLayout block={block}>
            <BlockRenderer
              key={`${currentLesson.meta.id}-${currentBlockIndex}`}
              block={block}
              onBlockComplete={handleBlockComplete}
            />
          </TeachingLayout>
        )}
      </main>

      {/* 底栏 */}
      <footer className="sticky bottom-0 z-20 bg-paper/72 backdrop-blur-md border-t border-paper-line">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <button onClick={prevBlock} disabled={isFirst} className="btn-ghost">
            <ArrowLeftIcon size={16} /> <span className="hidden sm:inline">上一步</span>
          </button>

          {canAdvance ? (
            <button onClick={handleNext} className="btn-primary animate-pop">
              {isLast ? <><CheckIcon size={16} /> 完成本课</> : <>继续 <ArrowRightIcon size={16} /></>}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-ink-faint">完成上面的练习后继续 ↑</span>
              <span className="text-xs text-ink-faint/50 flex items-center gap-1">
                <KeyboardIcon size={14} /> 快捷键可用
              </span>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}

export default LessonPlayer
