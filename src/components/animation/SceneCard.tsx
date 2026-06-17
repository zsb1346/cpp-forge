/* ============================
   SceneCard — 卡片元素渲染器
   支持四种视觉变体 + accent 色
   ============================ */

import React from 'react'
import type { CardElement } from '../../types/animated-timeline'

interface Props {
  element: CardElement
  morphProgress: number
  state: 'entering' | 'exiting' | 'stable' | 'morphing'
}

const accentBorder: Record<string, string> = {
  ember: 'border-ember/20',
  sage: 'border-sage/20',
  gold: 'border-gold/20',
  ink: 'border-ink/20',
}

const accentText: Record<string, string> = {
  ember: 'text-ember',
  sage: 'text-sage',
  gold: 'text-gold',
  ink: 'text-ink',
}

const variantClasses: Record<string, string> = {
  default: 'bg-paper border border-ink-faint/10 shadow-sm',
  raised: 'bg-paper-raised border border-ink-faint/8 shadow-md',
  sunk: 'bg-paper-sunk border border-ink-faint/10',
  'border-only': 'bg-transparent border border-ink-faint/15',
}

const SceneCard: React.FC<Props> = ({ element, morphProgress, state }) => {
  const opacity = state === 'entering' ? morphProgress
    : state === 'exiting' ? morphProgress
    : 1

  const scale = state === 'entering'
    ? 0.9 + 0.1 * morphProgress
    : state === 'exiting'
      ? 0.9 + 0.1 * morphProgress
      : 1

  return (
    <div
      className={`rounded-lg p-4 ${variantClasses[element.variant ?? 'default']}
        ${element.accent ? accentBorder[element.accent] : 'border-ink-faint/10'}
      `}
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {element.title && (
        <div className="flex items-center gap-2 mb-2">
          {element.icon && (
            <span className={`text-lg ${element.accent ? accentText[element.accent] : 'text-ember'}`}>
              <i className={`ph ph-${element.icon}`} />
            </span>
          )}
          <h4 className="font-semibold text-sm text-ink">{element.title}</h4>
        </div>
      )}
      <p className="text-sm text-ink/80 leading-relaxed">{element.content}</p>
    </div>
  )
}

export default SceneCard
