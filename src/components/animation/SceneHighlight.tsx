/* ============================
   SceneHighlight — 高亮框元素
   覆盖在目标元素上，跟随目标位置
   支持 pulse / glow / static 效果
   ============================ */

import React from 'react'
import type { HighlightElement } from '../../types/animated-timeline'

interface Props {
  element: HighlightElement
  morphProgress: number
  state: 'entering' | 'exiting' | 'stable' | 'morphing'
}

const colorClasses: Record<string, string> = {
  ember: 'ring-ember/40',
  sage: 'ring-sage/40',
  gold: 'ring-gold/40',
}

const colorGlow: Record<string, string> = {
  ember: 'shadow-ember/30',
  sage: 'shadow-sage/30',
  gold: 'shadow-gold/30',
}

const SceneHighlight: React.FC<Props> = ({ element, morphProgress, state }) => {
  const opacity = state === 'entering' ? morphProgress
    : state === 'exiting' ? morphProgress
    : 1

  const color = element.color ?? 'ember'
  const ringClass = colorClasses[color]
  const glowClass = colorGlow[color]

  const effectClass =
    element.effect === 'pulse'
      ? 'animate-pulse-ring'
      : element.effect === 'glow'
        ? 'animate-glow'
        : ''

  const shapeClass =
    element.shape === 'circle'
      ? 'rounded-full'
      : element.shape === 'underline'
        ? 'rounded-none border-b-2 border-b-' + color
        : 'rounded-lg'

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${ringClass} ${effectClass} ${shapeClass}
        ring-2`}
      style={{
        opacity,
        boxShadow: element.effect === 'glow'
          ? `0 0 12px 2px var(--tw-shadow-color)`
          : undefined,
        transition: 'opacity 0.4s ease, box-shadow 0.4s ease',
      }}
      data-target={element.targetElement}
      data-highlight={element.id}
    >
      {element.label && (
        <span
          className={`absolute -top-5 left-0 text-xs font-medium px-1.5 py-0.5 rounded
            bg-${color}/10 text-${color}`}
        >
          {element.label}
        </span>
      )}
    </div>
  )
}

export default SceneHighlight
