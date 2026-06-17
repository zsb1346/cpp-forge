import React, { useEffect, useMemo, useState } from 'react'
import type { TraceStateBlock as TraceStateBlockType } from '../../types/protocol'
import { useStore } from '../../store/useStore'
import CheckpointMeter from '../teaching/CheckpointMeter'
import FeedbackCallout from '../teaching/FeedbackCallout'
import HintTray from '../teaching/HintTray'
import MarkdownBlock from '../MarkdownBlock'
import { ArrowRightIcon } from '../icons'

interface Props {
  block: TraceStateBlockType;
}

function valueText(value: string | number | boolean | undefined): string {
  if (value === undefined) return ''
  return String(value)
}

function normalize(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, '')
}

const TraceStateBlock: React.FC<Props> = ({ block }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [wasWrong, setWasWrong] = useState(false)
  const { setBlockFeedback, setBlockCompleted } = useStore()

  const step = block.steps[stepIndex]
  const lines = useMemo(() => block.code.replace(/\r\n/g, '\n').split('\n'), [block.code])

  useEffect(() => {
    setStepIndex(0)
    setAnswers({})
    setChecked(false)
    setWasWrong(false)
    setBlockFeedback(null)
  }, [block.code, setBlockFeedback])

  useEffect(() => {
    setAnswers({})
    setChecked(false)
    setWasWrong(false)
    setBlockFeedback(null)
  }, [stepIndex, setBlockFeedback])

  const update = (name: string, value: string) => {
    if (checked) return
    setAnswers(prev => ({ ...prev, [name]: value }))
    setWasWrong(false)
    setBlockFeedback(null)
  }

  const submit = () => {
    const ok = block.variables.every(name =>
      normalize(answers[name] ?? '') === normalize(valueText(step.values[name]))
    )

    setChecked(true)
    setWasWrong(!ok)
    setBlockFeedback(ok ? 'correct' : 'incorrect')

    if (!ok) return

    if (stepIndex >= block.steps.length - 1) {
      setBlockCompleted(true)
    }
  }

  const next = () => {
    if (stepIndex < block.steps.length - 1) setStepIndex(i => i + 1)
  }

  const retry = () => {
    setChecked(false)
    setWasWrong(false)
    setAnswers({})
    setBlockFeedback(null)
  }

  const revealAndContinue = () => {
    const revealed = Object.fromEntries(
      block.variables.map(name => [name, valueText(step.values[name])])
    )
    setAnswers(revealed)
    setChecked(true)
    setWasWrong(false)
    setBlockFeedback('correct')
    if (stepIndex >= block.steps.length - 1) setBlockCompleted(true)
  }

  const allFilled = block.variables.every(name => answers[name]?.trim())
  const completedSteps = checked && !wasWrong ? stepIndex + 1 : stepIndex

  return (
    <div className="block-card lesson-workbench">
      <div className="flex items-center gap-2 mb-5">
        <span className="pill-sage">走读</span>
        <span className="text-[11px] text-ink-ghost font-mono">line {step.line}</span>
      </div>

      <MarkdownBlock
        text={block.instruction}
        className="title-serif text-ink text-[18px] sm:text-[21px] font-medium leading-snug mb-3 text-balance"
      />
      <p className="text-sm text-ink-faint mb-5 leading-relaxed">
        每次只看一行。先判断这一行执行后，变量盒子里分别装着什么。
      </p>

      <CheckpointMeter current={completedSteps} total={block.steps.length} label="走读进度" />

      <div className="mt-5 rounded-2xl border border-paper-line bg-paper-sunk overflow-hidden">
        <div className="px-4 py-2 border-b border-paper-line text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">
          当前代码行
        </div>
        <div className="font-mono text-[13px] overflow-x-auto">
          {lines.map((line, i) => {
            const lineNo = i + 1
            const active = lineNo === step.line
            return (
              <div key={i} className={`trace-row ${active ? 'trace-row-active' : ''}`}>
                <span className="w-8 flex-shrink-0 text-right text-ink-ghost select-none">{lineNo}</span>
                <code className="whitespace-pre text-ink">{line || ' '}</code>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint mb-2.5">
          执行后，变量盒子里是什么？
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {block.variables.map(name => {
            const expected = valueText(step.values[name])
            const right = checked && normalize(answers[name] ?? '') === normalize(expected)
            const wrong = checked && !right
            return (
              <label key={name} className={`state-chip ${right ? 'state-chip-correct' : wrong ? 'state-chip-wrong' : ''}`}>
                <span className="font-mono font-bold text-ink">{name}</span>
                <span className="text-ink-ghost">=</span>
                <input
                  value={answers[name] ?? ''}
                  onChange={e => update(name, e.target.value)}
                  disabled={checked}
                  placeholder="?"
                  className="min-w-0 flex-1 bg-transparent outline-none font-mono text-ink placeholder:text-ink-ghost"
                  spellCheck={false}
                />
              </label>
            )
          })}
        </div>
      </div>

      {step.prompt && <p className="mt-4 text-sm text-ink-soft leading-relaxed">{step.prompt}</p>}
      <HintTray hints={block.hints} />

      {checked && !wasWrong && (
        <div className="mt-5">
          <FeedbackCallout tone="correct" title={stepIndex >= block.steps.length - 1 ? '走读完成：你看见状态变化了' : '这一行读对了'}>
            {step.explanation || '继续下一行，观察变量盒子会不会被改写。'}
            {step.stdout && <div className="mt-2">此时输出：<code className="font-mono text-ember-deep">{step.stdout}</code></div>}
          </FeedbackCallout>
        </div>
      )}

      {checked && wasWrong && (
        <div className="mt-5">
          <FeedbackCallout tone="incorrect" title="先别急：这一行可能只改了部分变量">
            {step.explanation || '把注意力放在高亮行：它读了哪些变量？又写回了哪个变量？'}
          </FeedbackCallout>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!checked ? (
          <button onClick={submit} disabled={!allFilled} className="btn-primary">检查这一行</button>
        ) : wasWrong ? (
          <>
            <button onClick={retry} className="btn-ghost">重新填写</button>
            <button onClick={revealAndContinue} className="btn-text">看答案并继续</button>
          </>
        ) : stepIndex < block.steps.length - 1 ? (
          <button onClick={next} className="btn-primary">下一行 <ArrowRightIcon size={14} /></button>
        ) : null}
      </div>
    </div>
  )
}

export default TraceStateBlock
