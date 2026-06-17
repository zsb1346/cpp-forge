import React, { useEffect, useState } from 'react'
import type { PredictOutputBlock as PredictOutputBlockType } from '../../types/protocol'
import { useStore } from '../../store/useStore'
import { compareOutput } from '../../lib/compareOutput'
import FeedbackCallout from '../teaching/FeedbackCallout'
import HintTray from '../teaching/HintTray'
import OptionCard from '../teaching/OptionCard'
import SyntaxHighlighter from '../SyntaxHighlighter'
import MarkdownBlock from '../MarkdownBlock'
import { CheckIcon, IncorrectIcon } from '../icons'

interface Props {
  block: PredictOutputBlockType;
}

const PredictOutputBlock: React.FC<Props> = ({ block }) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const { setBlockFeedback, setBlockCompleted } = useStore()

  const hasOptions = !!block.options?.length
  const comparison = block.comparison ?? 'trimmed'

  useEffect(() => {
    setSelected(null)
    setAnswer('')
    setSubmitted(false)
    setCorrect(false)
    setBlockFeedback(null)
  }, [block.code, block.expectedOutput, setBlockFeedback])

  const choose = (index: number) => {
    if (submitted) return
    setSelected(index)
    setBlockFeedback(null)
  }

  const submit = () => {
    if (hasOptions && selected === null) return
    if (!hasOptions && !answer.trim()) return

    const accepted = [block.expectedOutput, ...(block.accept ?? [])]
    const ok = hasOptions
      ? !!block.options?.[selected!]?.correct
      : accepted.some(expected => compareOutput(answer, expected, comparison))

    setSubmitted(true)
    setCorrect(ok)
    setBlockFeedback(ok ? 'correct' : 'incorrect')
    if (ok) setBlockCompleted(true)
  }

  const retry = () => {
    setSelected(null)
    setAnswer('')
    setSubmitted(false)
    setCorrect(false)
    setBlockFeedback(null)
  }

  const selectedExplanation = selected !== null ? block.options?.[selected]?.explanation : undefined

  return (
    <div className="block-card lesson-workbench">
      <div className="flex items-center gap-2 mb-5">
        <span className="pill-gold">猜输出</span>
        <span className="text-[11px] text-ink-ghost font-mono">先在脑中运行</span>
      </div>

      <MarkdownBlock
        text={block.instruction}
        className="title-serif text-ink text-[18px] sm:text-[21px] font-medium leading-snug mb-3 text-balance"
      />
      <p className="text-sm text-ink-faint mb-5 leading-relaxed">
        暂时不要急着运行。先像侦探一样读代码，猜它会打印什么。
      </p>

      <div className="mb-5 lg:hidden">
        <SyntaxHighlighter code={block.code} filename="predict.cpp" chrome zoomable />
      </div>

      {hasOptions ? (
        <div className="space-y-2.5 mb-5">
          {block.options!.map((opt, i) => {
            const isSelected = selected === i
            const state = submitted
              ? opt.correct
                ? 'correct'
                : isSelected
                ? 'incorrect'
                : 'muted'
              : 'neutral'

            return (
              <OptionCard
                key={i}
                selected={isSelected}
                disabled={submitted}
                state={state}
                badge={submitted ? (opt.correct ? <CheckIcon size={12} /> : isSelected ? <IncorrectIcon size={12} /> : '') : isSelected ? <CheckIcon size={12} /> : String.fromCharCode(65 + i)}
                onClick={() => choose(i)}
              >
                <code className="font-mono text-[14px] whitespace-pre-wrap">{opt.text}</code>
              </OptionCard>
            )
          })}
        </div>
      ) : (
        <div className="mb-5">
          <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint mb-2">
            你预测的输出
          </label>
          <textarea
            value={answer}
            onChange={(e) => { setAnswer(e.target.value); setBlockFeedback(null) }}
            disabled={submitted}
            placeholder="例如：100"
            className="field min-h-[96px] resize-y"
            spellCheck={false}
          />
        </div>
      )}

      <HintTray hints={block.hints} />

      {submitted && (
        <div className="mt-5">
          {correct ? (
            <FeedbackCallout tone="correct" title="预测正确：你的脑内运行器启动了">
              {selectedExplanation || '这就是程序实际会输出的结果。'}
            </FeedbackCallout>
          ) : (
            <FeedbackCallout tone="incorrect" title="还差一点：先看变量和值怎么流动">
              {selectedExplanation || (
                <>
                  这段代码的预期输出是 <code className="font-mono text-sage">{block.expectedOutput}</code>。
                  重新从第一行读一遍，注意每一次赋值会覆盖旧值。
                </>
              )}
            </FeedbackCallout>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={hasOptions ? selected === null : !answer.trim()}
            className="btn-primary"
          >
            检查预测
          </button>
        ) : !correct ? (
          <button onClick={retry} className="btn-ghost">再猜一次</button>
        ) : null}
      </div>
    </div>
  )
}

export default PredictOutputBlock
