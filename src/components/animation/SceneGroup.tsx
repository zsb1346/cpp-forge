/* ============================
   SceneGroup — 组合容器
   一组相关元素作为一个动画单元
   递归渲染子元素
   ============================ */

import React from 'react'
import type { GroupElement, InterpolatedElement } from '../../types/animated-timeline'
import SceneElementRenderer from './SceneElementRenderer'

interface Props {
  element: GroupElement
  morphProgress: number
  state: 'entering' | 'exiting' | 'stable' | 'morphing'
}

const SceneGroup: React.FC<Props> = ({ element, morphProgress, state }) => {
  const opacity = state === 'entering' ? morphProgress
    : state === 'exiting' ? morphProgress
    : 1

  const directionClass = element.direction === 'horizontal' ? 'flex-row' : 'flex-col'

  return (
    <div
      className={`flex ${directionClass} gap-${element.gap ?? 3}`}
      style={{
        opacity,
        transition: 'opacity 0.3s ease',
      }}
    >
      {element.children.map((child, i) => {
        const childInterpolated: InterpolatedElement = {
          element: child,
          state: state === 'entering'
            ? 'entering'
            : state === 'exiting'
              ? 'exiting'
              : 'stable',
          morphProgress,
        }
        return (
          <SceneElementRenderer
            key={child.id ?? `child-${i}`}
            interpolated={childInterpolated}
          />
        )
      })}
    </div>
  )
}

export default SceneGroup
