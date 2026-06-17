import React, { useEffect, useMemo, useState } from 'react'
import type { FixCodeBlock as FixCodeBlockType } from '../../types/protocol'
import { useStore } from '../../store/useStore'
import { compareOutput, normalizeCode } from '../../lib/compareOutput'
import FeedbackCallout from '../teaching/FeedbackCallout'
import HintTray from '../teaching/HintTray'
import OptionCard from '../teaching/OptionCard'
import SyntaxHighlighter from '../SyntaxHighlighter'
import MarkdownBlock from '../MarkdownBlock'
import { CheckIcon, IncorrectIcon } from '../icons'

interface Props {
  block: FixCodeBlockType;
}

const FixCodeBlock: React.FC<Props> = ({ block }) => {
  const mode = block.mode ?? (block.fixes?.length ? 'choose-fix' : 'edit')
  const [selected, setSelected] = useState<number | null>(null)
  const [code, setCode] = useState(block.buggyCode)
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const { setBlockFeedback, setBlockCompleted } = useStore()

  const expectedLabel = useMemo(() => {
    if (block.fixedCode) return '目标：修到正确代码'
    if (block.expectedOutput) return `目标输出：${block.expectedOutput}`
    return block.goal
  }, [block.fixedCode, block.expectedOutput, block.goal])

  useEffect(() => {
    setSelected(null)
    setCode(block.buggyCode)
    setSubmitted(false)
    setCorrect(false)
    setBlockFeedback(null)
  }, [block.buggyCode, setBlockFeedback])

  const submitChoice = () => {
    if (selected === null) return
    const ok = !!block.fixes?.[selected]?.correct
    setSubmitted(true)
    setCorrect(ok)
    setBlockFeedback(ok ? 'correct' : 'incorrect')
    if (ok) setBlockCompleted(true)
  }

  const submitEdit = () => {
    const ok = block.fixedCode
      ? normalizeCode(code) === normalizeCode(block.fixedCode)
      : block.expectedOutput
      ? compareOutput(code, block.expectedOutput, block.comparison ?? 'contains')
      : code.trim() !== block.buggyCode.trim()

    setSubmitted(true)
    setCorrect(ok)
    setBlockFeedback(ok ? 'correct' : 'incorrect')
    if (ok) setBlockCompleted(true)
  }

  const retry = () => {
    setSelected(null)
    setCode(block.buggyCode)
    setSubmitted(false)
    setCorrect(false)
    setBlockFeedback(null)
  }

  const selectedExplanation = selected !== null ? block.fixes?.[selected]?.explanation : undefined

  return (
    <div className="block-card lesson-workbench">
      <div className="flex items-center gap-2 mb-5">
        <span className="pill-ember">修代码</span>
        <span className="text-[11px] text-ink-ghost font-mono">debug</span>
      </div>

      <MarkdownBlock
        text={block.instruction}
        className="title-serif text-ink text-[18px] sm:text-[21px] font-medium leading-snug mb-3 text-balance"
      />
      <div className="rounded-2xl border border-gold/25 bg-gold-tint/50 px-4 py-3 mb-5">
        <MarkdownBlock text={block.goal} className="text-sm font-semibold text-ink" />
        <p className="text-xs text-ink-faint mt-1">{expectedLabel}</p>
      </div>

      <div className="mb-5 lg:hidden">
        <SyntaxHighlighter code={block.buggyCode} filename="buggy.cpp" chrome zoomable />
      </div>

      {block.bugs?.length ? (
        <div className="mb-5 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">可能的错误点</p>
          {block.bugs.map((bug, i) => (
            <div key={i} className="repair-card">
              <span className="font-mono text-ember-deep">{bug.line ? `line ${bug.line}` : `bug ${i + 1}`}</span>
              <span className="font-semibold text-ink">{bug.label}</span>
              <span className="text-ink-faint">{bug.hint}</span>
            </div>
          ))}
        </div>
      ) : null}

      {mode === 'choose-fix' && block.fixes?.length ? (
        <div className="space-y-2.5">
          {block.fixes.map((fix, i) => {
            const isSelected = selected === i
            const state = submitted
              ? fix.correct
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
                badge={submitted ? (fix.correct ? <CheckIcon size={12} /> : isSelected ? <IncorrectIcon size={12} /> : '') : isSelected ? <CheckIcon size={12} /> : i + 1}
                onClick={() => { if (!submitted) { setSelected(i); setBlockFeedback(null) } }}
              >
                <span className="font-mono text-[13px] whitespace-pre-wrap">{fix.text}</span>
              </OptionCard>
            )
          })}
        </div>
      ) : (
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint mb-2">
            修改后的代码
          </label>
          <textarea
            value={code}
            onChange={e => { setCode(e.target.value); setBlockFeedback(null) }}
            disabled={submitted}
            className="field min-h-[220px] resize-y"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      )}

      <HintTray hints={block.hints} />

      {submitted && (
        <div className="mt-5">
          {correct ? (
            <FeedbackCallout tone="correct" title="修好了：你不是只看懂了，还能把错误改回来">
              {selectedExplanation || '这次修改让代码符合目标。'}
            </FeedbackCallout>
          ) : (
            <FeedbackCallout tone="incorrect" title="还没修到目标：先锁定最小错误">
              {selectedExplanation || '不要一次改很多地方。先问：哪一个符号、单词或顺序最可疑？'}
            </FeedbackCallout>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={mode === 'choose-fix' && block.fixes?.length ? submitChoice : submitEdit}
            disabled={mode === 'choose-fix' && block.fixes?.length ? selected === null : !code.trim()}
            className="btn-primary"
          >
            检查修复
          </button>
        ) : !correct ? (
          <button onClick={retry} className="btn-ghost">重新修一次</button>
        ) : null}
      </div>
    </div>
  )
}

export default FixCodeBlock
