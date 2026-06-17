import React, { useEffect, useMemo, useState } from 'react'
import type { ChooseNextLineBlock as ChooseNextLineBlockType } from '../../types/protocol'
import { useStore } from '../../store/useStore'
import FeedbackCallout from '../teaching/FeedbackCallout'
import HintTray from '../teaching/HintTray'
import OptionCard from '../teaching/OptionCard'
import SyntaxHighlighter from '../SyntaxHighlighter'
import CheckpointMeter from '../teaching/CheckpointMeter'
import MarkdownBlock from '../MarkdownBlock'
import { CheckIcon, IncorrectIcon, ArrowRightIcon } from '../icons'

interface Props {
  block: ChooseNextLineBlockType;
}

const ChooseNextLineBlock: React.FC<Props> = ({ block }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [built, setBuilt] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [wrong, setWrong] = useState(false)
  const { setBlockFeedback, setBlockCompleted } = useStore()

  const step = block.steps[stepIndex]
  const baseLines = useMemo(() => block.context.replace(/\r\n/g, '\n').split('\n').filter(Boolean), [block.context])
  const previewCode = [...baseLines, ...built].join('\n')

  useEffect(() => {
    setStepIndex(0)
    setChosen(null)
    setBuilt([])
    setSubmitted(false)
    setWrong(false)
    setBlockFeedback(null)
  }, [block.context, setBlockFeedback])

  const choose = (index: number) => {
    if (submitted) return
    setChosen(index)
    setWrong(false)
    setBlockFeedback(null)
  }

  const submit = () => {
    if (chosen === null) return
    const option = step.options[chosen]
    if (!option.correct) {
      setSubmitted(true)
      setWrong(true)
      setBlockFeedback('incorrect')
      return
    }

    const nextBuilt = [...built, option.line]
    setBuilt(nextBuilt)
    setSubmitted(true)
    setWrong(false)
    setBlockFeedback('correct')

    if (stepIndex >= block.steps.length - 1) {
      setBlockCompleted(true)
    }
  }

  const next = () => {
    if (stepIndex < block.steps.length - 1) {
      setStepIndex(i => i + 1)
      setChosen(null)
      setSubmitted(false)
      setWrong(false)
      setBlockFeedback(null)
    }
  }

  const retry = () => {
    setChosen(null)
    setSubmitted(false)
    setWrong(false)
    setBlockFeedback(null)
  }

  const chosenExplanation = chosen !== null ? step.options[chosen]?.explanation : undefined
  const completeStepCount = built.length

  return (
    <div className="block-card lesson-workbench">
      <div className="flex items-center gap-2 mb-5">
        <span className="pill-gold">选下一行</span>
        <span className="text-[11px] text-ink-ghost font-mono">build code</span>
      </div>

      <MarkdownBlock
        text={block.instruction}
        className="title-serif text-ink text-[18px] sm:text-[21px] font-medium leading-snug mb-3 text-balance"
      />
      <p className="text-sm text-ink-faint mb-5 leading-relaxed">
        不用一下子写完整程序。每次只决定下一行，像搭积木一样把代码长出来。
      </p>

      <CheckpointMeter current={completeStepCount} total={block.steps.length} label="构造进度" />

      <div className="my-5 lg:hidden">
        <SyntaxHighlighter code={previewCode || '// 从这里开始'} filename="draft.cpp" chrome zoomable />
      </div>

      <div className="rounded-2xl border border-paper-line bg-paper-sunk px-4 py-3 mb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint mb-1">
          第 {stepIndex + 1} 步
        </p>
        <p className="text-sm text-ink-soft leading-relaxed">
          {step.prompt || '下一行应该写什么？'}
        </p>
      </div>

      <div className="space-y-2.5">
        {step.options.map((opt, i) => {
          const selected = chosen === i
          const state = submitted
            ? opt.correct
              ? 'correct'
              : selected
              ? 'incorrect'
              : 'muted'
            : 'neutral'
          return (
            <OptionCard
              key={i}
              selected={selected}
              disabled={submitted}
              state={state}
              badge={submitted ? (opt.correct ? <CheckIcon size={12} /> : selected ? <IncorrectIcon size={12} /> : '') : selected ? <CheckIcon size={12} /> : String.fromCharCode(65 + i)}
              onClick={() => choose(i)}
            >
              <code className="font-mono text-[13px] whitespace-pre-wrap">{opt.line}</code>
            </OptionCard>
          )
        })}
      </div>

      <HintTray hints={block.hints} />

      {submitted && (
        <div className="mt-5">
          {!wrong ? (
            <FeedbackCallout tone="correct" title={stepIndex >= block.steps.length - 1 ? '代码搭好了' : '这一行接得上'}>
              {chosenExplanation || '这一行让程序离目标更近一步。'}
            </FeedbackCallout>
          ) : (
            <FeedbackCallout tone="incorrect" title="这一行暂时接不上">
              {chosenExplanation || '看看已有代码：下一行通常要接着完成当前目标，而不是跳到别的任务。'}
            </FeedbackCallout>
          )}
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <button onClick={submit} disabled={chosen === null} className="btn-primary">确认这一行</button>
        ) : wrong ? (
          <button onClick={retry} className="btn-ghost">重新选择</button>
        ) : stepIndex < block.steps.length - 1 ? (
          <button onClick={next} className="btn-primary">继续选下一行 <ArrowRightIcon size={14} /></button>
        ) : null}
      </div>
    </div>
  )
}

export default ChooseNextLineBlock
