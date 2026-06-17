/* ============================
   SceneText — 文本元素渲染器
   支持五种标题/正文变体，进入动画
   ============================ */

import React from 'react'
import type { TextElement } from '../../types/animated-timeline'

interface Props {
  element: TextElement
  morphProgress: number
  state: 'entering' | 'exiting' | 'stable' | 'morphing'
}

const variantClasses: Record<string, string> = {
  title: 'text-xl font-bold text-ink font-title-serif',
  subtitle: 'text-base font-semibold text-ink',
  body: 'text-sm text-ink leading-relaxed',
  caption: 'text-xs text-ink-faint',
  label: 'text-xs font-medium text-ember uppercase tracking-wider',
}

const SceneText: React.FC<Props> = ({ element, morphProgress, state }) => {
  const opacity = state === 'entering' ? morphProgress
    : state === 'exiting' ? morphProgress
    : 1

  const slideDir = state === 'entering' ? 'up'
    : state === 'exiting' ? 'down'
    : undefined

  const translateY = slideDir === 'up'
    ? (1 - morphProgress) * 12
    : slideDir === 'down'
      ? (1 - morphProgress) * -12
      : 0

  const alignClass = element.align === 'center'
    ? 'text-center'
    : element.align === 'right'
      ? 'text-right'
      : 'text-left'

  return (
    <div
      className={`${variantClasses[element.variant ?? 'body']} ${alignClass}`}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {element.content}
    </div>
  )
}

export default SceneText
