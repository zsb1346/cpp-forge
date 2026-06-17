import React, { useState, useEffect, useRef } from 'react'
import type { FillInBlock as FillInBlockType } from '../types/protocol'
import { useStore } from '../store/useStore'
import MarkdownBlock from './MarkdownBlock'
import { LightbulbIcon, CheckIcon, IncorrectIcon } from './icons'

interface Props {
  block: FillInBlockType;
}

const FillInBlock: React.FC<Props> = ({ block }) => {
  const parts = block.template.split(/(____)/g)
  const blankCount = parts.filter(p => p === '____').length

  const [answers, setAnswers] = useState<string[]>(() => new Array(blankCount).fill(''))
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { setBlockFeedback, setBlockCompleted } = useStore()

  useEffect(() => {
    setAnswers(new Array(blankCount).fill(''))
    setShowResult(false); setIsCorrect(false); setShowHints(false)
    setTimeout(() => inputRefs.current[0]?.focus(), 50)
  }, [block.template])

  const change = (i: number, v: string) => {
    if (showResult) return
    setAnswers(prev => prev.map((a, idx) => idx === i ? v : a))
  }

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'Enter') return
    if (i < blankCount - 1) inputRefs.current[i + 1]?.focus()
    else submit()
  }

  const submit = () => {
    if (answers.some(a => !a.trim())) return
    const ok = answers.every((a, i) => a.trim() === block.answers[i]?.trim())
    setIsCorrect(ok); setShowResult(true)
    if (ok) { setBlockFeedback('correct'); setBlockCompleted(true) }
    else setBlockFeedback('incorrect')
  }

  const retry = () => {
    setAnswers(new Array(blankCount).fill(''))
    setShowResult(false); setIsCorrect(false); setBlockFeedback(null)
    setTimeout(() => inputRefs.current[0]?.focus(), 50)
  }

  // 在深色宝石岛里渲染带空位的代码
  let bi = 0
  const rendered = parts.map((part, i) => {
    if (part === '____') {
      const idx = bi++
      const right = showResult && answers[idx].trim() === block.answers[idx]?.trim()
      const wrong = showResult && !right
      return (
        <input
          key={`b-${idx}`}
          ref={el => { inputRefs.current[idx] = el }}
          value={answers[idx]}
          onChange={e => change(idx, e.target.value)}
          onKeyDown={e => onKey(e, idx)}
          disabled={showResult}
          placeholder="?"
          spellCheck={false}
          autoComplete="off"
          style={{ width: `${Math.max(6, (answers[idx]?.length || 1) + 2)}ch` }}
          className={`inline-block mx-1 px-1.5 py-0.5 font-mono text-[13.5px]
            bg-slate-raised outline-none transition-all
            border-b-2 placeholder:text-[#6b6580]
            ${showResult
              ? right
                ? 'border-[#7dcfb6] text-[#7dcfb6]'
                : 'border-[#ff8585] text-[#ff8585]'
              : 'border-[#ffbd2e]/60 text-[#ffd866] focus:border-[#ffbd2e] focus:bg-slate'
            }`}
        />
      )
    }
    return <span key={`t-${i}`} className="tok-plain">{part}</span>
  })

  return (
    <div className="block-card">
      <span className="pill-sage mb-5">填空</span>
      <MarkdownBlock text={block.prompt} className="text-ink text-[15px] mb-5 leading-relaxed" />

      {/* 代码宝石岛 + 内嵌输入框 */}
      <div className="gem mb-5">
        <div className="gem-bar">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[11px] font-mono text-[#8b8499]">补全代码</span>
        </div>
        <div className="gem-body flex flex-wrap items-center leading-loose">
          {rendered}
        </div>
      </div>

      {/* 提示 */}
      {block.hints && block.hints.length > 0 && (
        <div className="mb-5">
          <button onClick={() => setShowHints(v => !v)} className="btn-text">
            <LightbulbIcon size={16} className="text-gold" />
            {showHints ? '收起提示' : '需要提示？'}
          </button>
          {showHints && (
            <ul className="mt-2.5 space-y-1.5 animate-fade-in">
              {block.hints.map((h, i) => (
                <li key={i} className="text-[13px] text-ink-soft flex gap-2">
                  <span className="text-gold mt-0.5">·</span><span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 反馈 */}
      {showResult && (
        <div className={`p-4 rounded-2xl border mb-5 animate-fade-in
          ${isCorrect ? 'bg-sage-tint border-sage/30' : 'bg-clay-tint border-clay/30'}`}>
          {isCorrect ? (
            <p className="text-sm text-sage font-medium flex items-center gap-2">
              <CheckIcon size={16} /> 全部填对了
            </p>
          ) : (
            <div>
              <p className="text-sm text-clay font-medium flex items-center gap-2 mb-2">
                <IncorrectIcon size={16} /> 有空位还不对
              </p>
              <div className="space-y-1">
                {block.answers.map((ans, i) => (
                  <div key={i} className="text-[13px] flex items-center gap-2">
                    <span className="text-ink-faint">空 {i + 1}</span>
                    <code className="font-mono text-sage">{ans}</code>
                    {answers[i]?.trim() !== ans.trim() && answers[i] && (
                      <code className="font-mono text-clay line-through opacity-70">{answers[i]}</code>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        {!showResult ? (
          <button onClick={submit} disabled={answers.some(a => !a.trim())} className="btn-primary">
            检查答案
          </button>
        ) : !isCorrect ? (
          <button onClick={retry} className="btn-ghost">重新填写</button>
        ) : null}
      </div>
    </div>
  )
}

export default FillInBlock
