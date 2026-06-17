import React, { useEffect, useState } from 'react'
import type { CompareSnippetsBlock as CompareSnippetsBlockType } from '../../types/protocol'
import { useStore } from '../../store/useStore'
import FeedbackCallout from '../teaching/FeedbackCallout'
import HintTray from '../teaching/HintTray'
import SyntaxHighlighter from '../SyntaxHighlighter'
import MarkdownBlock from '../MarkdownBlock'
import { CheckIcon, IncorrectIcon } from '../icons'

interface Props {
  block: CompareSnippetsBlockType;
}

const CompareSnippetsBlock: React.FC<Props> = ({ block }) => {
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)
  const { setBlockFeedback, setBlockCompleted } = useStore()
  const isSingle = block.mode !== 'multiple'

  useEffect(() => {
    setSelected([])
    setSubmitted(false)
    setCorrect(false)
    setBlockFeedback(null)
  }, [block.question, setBlockFeedback])

  const toggle = (id: string) => {
    if (submitted) return
    setSelected(prev => isSingle
      ? [id]
      : prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
    setBlockFeedback(null)
  }

  const submit = () => {
    if (!selected.length) return
    const correctIds = block.snippets.filter(s => s.correct).map(s => s.id).sort()
    const selectedIds = [...selected].sort()
    const ok = correctIds.length === selectedIds.length && correctIds.every((id, i) => id === selectedIds[i])
    setSubmitted(true)
    setCorrect(ok)
    setBlockFeedback(ok ? 'correct' : 'incorrect')
    if (ok) setBlockCompleted(true)
  }

  const retry = () => {
    setSelected([])
    setSubmitted(false)
    setCorrect(false)
    setBlockFeedback(null)
  }

  return (
    <div className="block-card lesson-workbench">
      <div className="flex items-center gap-2 mb-5">
        <span className="pill-ink">对比</span>
        <span className="text-[11px] text-ink-ghost font-mono">{block.compareBy ?? 'meaning'}</span>
      </div>

      <MarkdownBlock
        text={block.instruction}
        className="title-serif text-ink text-[18px] sm:text-[21px] font-medium leading-snug mb-3 text-balance"
      />
      <MarkdownBlock text={block.question} className="text-sm text-ink-faint mb-5 leading-relaxed" />

      <div className="compare-grid">
        {block.snippets.map((snippet, i) => {
          const isSelected = selected.includes(snippet.id)
          const wrongPick = submitted && isSelected && !snippet.correct
          const right = submitted && snippet.correct
          return (
            <button
              key={snippet.id}
              onClick={() => toggle(snippet.id)}
              disabled={submitted}
              className={`compare-card ${isSelected ? 'compare-card-selected' : ''} ${right ? 'compare-card-correct' : ''} ${wrongPick ? 'compare-card-wrong' : ''}`}
              type="button"
            >
              <div className="flex items-center gap-2 mb-3 text-left">
                <span className={`option-stamp ${isSelected ? 'bg-ember text-paper-raised border-ember' : 'border-ink-ghost/50 text-ink-ghost'}`}>
                  {submitted ? (snippet.correct ? <CheckIcon size={12} /> : wrongPick ? <IncorrectIcon size={12} /> : '') : String.fromCharCode(65 + i)}
                </span>
                <span className="font-semibold text-ink">{snippet.title || `写法 ${String.fromCharCode(65 + i)}`}</span>
                {snippet.badge && <span className="pill-gold ml-auto normal-case tracking-normal">{snippet.badge}</span>}
              </div>
              <SyntaxHighlighter code={snippet.code} filename={`${snippet.id}.cpp`} chrome={false} />
              {submitted && snippet.explanation && (
                <p className="mt-3 text-[13px] text-ink-soft leading-relaxed text-left">{snippet.explanation}</p>
              )}
            </button>
          )
        })}
      </div>

      <HintTray hints={block.hints} />

      {submitted && (
        <div className="mt-5">
          {correct ? (
            <FeedbackCallout tone="correct" title="分清了：相似代码的差别被你抓到了">
              以后看到类似写法，先问：它们改变的是值、名字，还是判断条件？
            </FeedbackCallout>
          ) : (
            <FeedbackCallout tone="incorrect" title="它们看起来很像，但行为不一样">
              逐个看符号：一个字符的变化，可能就会让代码从“赋值”变成“比较”。
            </FeedbackCallout>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <button onClick={submit} disabled={!selected.length} className="btn-primary">提交对比</button>
        ) : !correct ? (
          <button onClick={retry} className="btn-ghost">重新判断</button>
        ) : null}
      </div>
    </div>
  )
}

export default CompareSnippetsBlock
