import React, { useState, useEffect } from 'react'
import type { MultipleChoiceBlock as MultipleChoiceBlockType } from '../types/protocol'
import { useStore } from '../store/useStore'

interface Props {
  block: MultipleChoiceBlockType;
}

const MultipleChoiceBlock: React.FC<Props> = ({ block }) => {
  const [selected, setSelected] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const { blockFeedback, setBlockFeedback, setBlockCompleted } = useStore()

  useEffect(() => {
    setSelected([]); setShowResult(false); setIsCorrect(false)
  }, [block.question])

  const isSingle = block.mode !== 'multiple'

  const select = (i: number) => {
    if (showResult) return
    if (blockFeedback) setBlockFeedback(null)
    setSelected(prev =>
      isSingle ? [i] : prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const submit = () => {
    if (selected.length === 0) return
    const correct = block.options.map((o, i) => o.correct ? i : -1).filter(i => i >= 0)
    const ok = selected.length === correct.length &&
      [...selected].sort().every((v, i) => v === [...correct].sort()[i])
    setIsCorrect(ok); setShowResult(true)
    if (ok) { setBlockFeedback('correct'); setBlockCompleted(true) }
    else setBlockFeedback('incorrect')
  }

  const retry = () => {
    setSelected([]); setShowResult(false); setIsCorrect(false); setBlockFeedback(null)
  }

  const correctIdx = block.options.map((o, i) => o.correct ? i : -1).filter(i => i >= 0)
  // 选中后展示的解释
  const chosenExplanation = showResult && isSingle
    ? block.options[selected[0]]?.explanation
    : undefined

  return (
    <div className="block-card">
      <div className="flex items-center gap-2 mb-5">
        <span className="pill-ink">{isSingle ? '单选题' : '多选题'}</span>
      </div>

      <h3 className="title-serif text-ink text-[17px] sm:text-[20px] font-medium leading-snug mb-5 text-balance">
        {block.question}
      </h3>

      <div className="space-y-2.5">
        {block.options.map((opt, i) => {
          const sel = selected.includes(i)
          let cls = 'border-paper-line bg-paper-sunk hover:border-ink-faint hover:bg-paper'
          let badge = 'border-ink-ghost text-transparent'

          if (showResult) {
            if (opt.correct) {
              cls = 'border-sage/50 bg-sage-tint'
              badge = 'border-sage bg-sage text-paper-raised'
            } else if (sel) {
              cls = 'border-clay/50 bg-clay-tint'
              badge = 'border-clay bg-clay text-paper-raised'
            } else {
              cls = 'border-paper-line bg-paper-sunk opacity-60'
            }
          } else if (sel) {
            cls = 'border-ember bg-ember-tint'
            badge = 'border-ember bg-ember text-paper-raised'
          }

          return (
            <button
              key={i}
              onClick={() => select(i)}
              disabled={showResult}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border-2 text-left
                transition-all duration-200 ${cls} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className={`w-6 h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold
                border-2 transition-all ${isSingle ? 'rounded-full' : 'rounded-md'} ${badge}`}>
                {showResult ? (opt.correct ? '✓' : sel ? '✕' : '') : (sel ? '✓' : '')}
              </span>
              <span className={`text-[15px] font-mono ${showResult && sel && !opt.correct ? 'text-clay' : 'text-ink'}`}>
                {opt.text}
              </span>
            </button>
          )
        })}
      </div>

      {/* 结果解释 */}
      {showResult && (
        <div className={`mt-5 p-4 rounded-2xl border animate-fade-in
          ${isCorrect ? 'bg-sage-tint border-sage/30' : 'bg-clay-tint border-clay/30'}`}>
          {isCorrect ? (
            <p className="text-sm text-sage font-medium flex items-center gap-2">
              <span>✓</span>
              <span>答对了{chosenExplanation ? `—— ${chosenExplanation}` : '！'}</span>
            </p>
          ) : (
            <div>
              <p className="text-sm text-clay font-medium flex items-center gap-2 mb-1.5">
                <span>✕</span> 再想想
              </p>
              {correctIdx.map(idx => (
                <p key={idx} className="text-[13px] text-ink-soft mt-1">
                  正确答案 <code className="font-mono text-ember-deep">{block.options[idx].text}</code>
                  {block.options[idx].explanation && ` —— ${block.options[idx].explanation}`}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        {!showResult ? (
          <button onClick={submit} disabled={selected.length === 0} className="btn-primary">
            提交答案
          </button>
        ) : !isCorrect ? (
          <button onClick={retry} className="btn-ghost">重新作答</button>
        ) : null}
      </div>
    </div>
  )
}

export default MultipleChoiceBlock
