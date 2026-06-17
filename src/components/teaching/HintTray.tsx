import React, { useState } from 'react'
import { LightbulbIcon, ArrowRightIcon } from '../icons'

interface Props {
  hints?: string[];
  label?: string;
}

const HintTray: React.FC<Props> = ({ hints = [], label = '需要提示？' }) => {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(1)

  if (!hints.length) return null

  const visible = hints.slice(0, count)
  const hasMore = count < hints.length

  return (
    <div className="hint-tray">
      <button
        onClick={() => setOpen(v => !v)}
        className="btn-text"
        type="button"
      >
        <LightbulbIcon size={16} className="text-gold" />
        {open ? '收起提示' : label}
      </button>

      {open && (
        <div className="mt-3 rounded-2xl border border-gold/25 bg-gold-tint/55 px-4 py-3 animate-fade-in">
          <ol className="space-y-2">
            {visible.map((hint, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-ink-soft flex gap-2">
                <span className="font-mono text-gold font-bold">{i + 1}</span>
                <span>{hint}</span>
              </li>
            ))}
          </ol>
          {hasMore && (
            <button
              onClick={() => setCount(c => Math.min(hints.length, c + 1))}
              className="mt-3 text-xs font-semibold text-gold hover:text-ember transition-colors"
              type="button"
            >
              再给我一点提示 <ArrowRightIcon size={12} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default HintTray
