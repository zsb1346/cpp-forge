import React from 'react'

interface Props {
  current: number;
  total: number;
  label?: string;
}

const CheckpointMeter: React.FC<Props> = ({ current, total, label = 'checkpoint' }) => {
  const safeTotal = Math.max(1, total)
  const clamped = Math.max(0, Math.min(current, safeTotal))

  return (
    <div className="checkpoint-meter" aria-label={`${label} ${clamped}/${safeTotal}`}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">{label}</span>
        <span className="text-[11px] font-mono text-ink-ghost">{clamped}/{safeTotal}</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: safeTotal }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < clamped ? 'bg-ember' : 'bg-paper-line'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default CheckpointMeter
