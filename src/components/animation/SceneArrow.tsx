/* ============================
   SceneArrow — 箭头元素
   在目标元素之间绘制带标签的箭头
   使用 CSS 实现：两个元素中心点连线，旋转 + 箭头
   ============================ */

import React from 'react'
import type { ArrowElement } from '../../types/animated-timeline'

interface Props {
  element: ArrowElement
  morphProgress: number
  state: 'entering' | 'exiting' | 'stable' | 'morphing'
}

const colorClasses: Record<string, string> = {
  ember: 'text-ember/60',
  sage: 'text-sage/60',
  ink: 'text-ink-faint/50',
}

const SceneArrow: React.FC<Props> = ({ element, morphProgress, state }) => {
  const opacity = state === 'entering' ? morphProgress
    : state === 'exiting' ? morphProgress
    : 1

  const colorClass = colorClasses[element.color ?? 'ember']

  return (
    <div
      className={`flex items-center justify-center gap-1 ${colorClass}`}
      style={{
        opacity,
        transition: 'opacity 0.3s ease',
      }}
      data-arrow-from={element.fromElement}
      data-arrow-to={element.toElement}
    >
      <span className="text-xs whitespace-nowrap font-medium">
        {element.label}
      </span>
      <svg
        width="40"
        height="16"
        viewBox="0 0 40 16"
        fill="none"
        className={element.animated ? 'animate-arrow-flow' : ''}
      >
        <line
          x1="4"
          y1="8"
          x2="32"
          y2="8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray={element.animated ? '4 3' : 'none'}
        />
        <polygon
          points="34,8 26,3 26,13"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export default SceneArrow
