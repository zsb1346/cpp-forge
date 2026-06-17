import React, { useState, useEffect } from 'react'
import type { MatchBlocksBlock as MatchBlocksBlockType } from '../types/protocol'
import { useStore } from '../store/useStore'
import MarkdownBlock from './MarkdownBlock'
import { CheckIcon, IncorrectIcon } from './icons'

interface Props {
  block: MatchBlocksBlockType;
}

// 可用片段带唯一 id，避免重复字符串（如两个 ';'）混淆
interface Frag { id: number; text: string }

const MatchBlocksBlock: React.FC<Props> = ({ block }) => {
  const [pool, setPool] = useState<Frag[]>([])          // 待选区
  const [slots, setSlots] = useState<(Frag | null)[]>([])// 槽位区
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const { setBlockFeedback, setBlockCompleted } = useStore()

  const seed = () => {
    const all = [...block.fragments, ...(block.distractors || [])]
      .map((text, id) => ({ id, text }))
      .sort(() => Math.random() - 0.5)
    setPool(all)
    setSlots(new Array(block.fragments.length).fill(null))
    setShowResult(false); setIsCorrect(false); setBlockFeedback(null)
  }

  useEffect(seed, [block.fragments.join('|')])

  // 点击待选片段 → 放入第一个空槽
  const place = (frag: Frag) => {
    if (showResult) return
    const empty = slots.findIndex(s => s === null)
    if (empty === -1) return
    setSlots(prev => prev.map((s, i) => i === empty ? frag : s))
    setPool(prev => prev.filter(f => f.id !== frag.id))
  }

  // 点击已填槽位 → 退回待选区
  const recall = (slotIdx: number) => {
    if (showResult) return
    const frag = slots[slotIdx]
    if (!frag) return
    setSlots(prev => prev.map((s, i) => i === slotIdx ? null : s))
    setPool(prev => [...prev, frag])
  }

  const submit = () => {
    if (slots.some(s => s === null)) return
    const ok = slots.every((s, i) => s!.text === block.fragments[i])
    setIsCorrect(ok); setShowResult(true)
    if (ok) { setBlockFeedback('correct'); setBlockCompleted(true) }
    else setBlockFeedback('incorrect')
  }

  const filled = slots.every(s => s !== null)

  return (
    <div className="block-card">
      <span className="pill-ember mb-5">拼装</span>
      <MarkdownBlock text={block.instruction} className="text-ink text-[15px] mb-6 leading-relaxed" />

      {/* 槽位区：组装成一行代码 */}
      <p className="text-[11px] text-ink-faint font-bold uppercase tracking-[0.14em] mb-2.5">
        按顺序组装
      </p>
      <div className="flex flex-wrap items-center gap-2 mb-7 p-4 rounded-2xl bg-paper-sunk border border-dashed border-paper-line min-h-[60px]">
        {slots.map((frag, i) => (
          <button
            key={i}
            onClick={() => recall(i)}
            className={`min-w-[52px] h-11 px-3.5 rounded-xl font-mono text-sm font-medium
              flex items-center justify-center transition-all duration-200
              ${frag
                ? showResult
                  ? frag.text === block.fragments[i]
                    ? 'bg-sage-tint text-sage border-2 border-sage/40'
                    : 'bg-clay-tint text-clay border-2 border-clay/40'
                  : 'bg-ember text-paper-raised shadow-ember cursor-pointer hover:bg-ember-soft'
                : 'border-2 border-dashed border-ink-ghost/40 text-ink-ghost cursor-default'
              }`}
          >
            {frag ? frag.text : i + 1}
          </button>
        ))}
      </div>

      {/* 待选片段区 */}
      <p className="text-[11px] text-ink-faint font-bold uppercase tracking-[0.14em] mb-2.5">
        可用片段
      </p>
      <div className="flex flex-wrap gap-2 min-h-[44px]">
        {pool.map(frag => (
          <button
            key={frag.id}
            onClick={() => place(frag)}
            disabled={showResult}
            className="px-3.5 h-11 rounded-xl font-mono text-sm font-medium
              bg-paper-raised border border-paper-line text-ink shadow-paper
              hover:border-ember hover:-translate-y-0.5 transition-all duration-200
              active:scale-95 animate-pop"
          >
            {frag.text}
          </button>
        ))}
        {pool.length === 0 && (
          <span className="text-xs text-ink-ghost italic self-center">片段已全部放入</span>
        )}
      </div>

      {/* 反馈 + 操作 */}
      <div className="mt-7 flex items-center gap-3">
        {!showResult ? (
          <button onClick={submit} disabled={!filled} className="btn-primary">检查顺序</button>
        ) : isCorrect ? (
          <p className="text-sm font-semibold text-sage flex items-center gap-2">
            <CheckIcon size={16} /> 语法顺序正确
          </p>
        ) : (
          <>
            <p className="text-sm text-clay flex items-center gap-2">
              <IncorrectIcon size={16} /> 顺序不对
            </p>
            <button onClick={seed} className="btn-ghost">重新排列</button>
          </>
        )}
      </div>
    </div>
  )
}

export default MatchBlocksBlock
