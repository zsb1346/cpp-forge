/* ============================
   useElementInterpolation
   场景元素插值引擎
   对比两个场景的元素列表，按 id 匹配，
   区分进入/离开/稳定/变形四种状态，附带过渡进度。
   ============================ */

import { useMemo } from 'react'
import type { SceneElement, InterpolatedElement } from '../types/animated-timeline'

/** 用 JSON 序列化做浅层变化检测（够用即可，后续可优化） */
function hasChanged(a: SceneElement, b: SceneElement): boolean {
  if (a.type !== b.type) return true
  // 跳过 type 和 id，只比较内容
  const { type: _ta, id: _ia, ...restA } = a as unknown as Record<string, unknown>
  const { type: _tb, id: _ib, ...restB } = b as unknown as Record<string, unknown>
  return JSON.stringify(restA) !== JSON.stringify(restB)
}

/**
 * 对两个元素列表做插值计算。
 *
 * @param from  前一场景的完整元素列表
 * @param to    当前场景的完整元素列表
 * @param progress  过渡进度 0~1
 * @returns 带过渡状态的合并元素列表
 */
export function useElementInterpolation(
  from: SceneElement[],
  to: SceneElement[],
  progress: number,
): InterpolatedElement[] {
  return useMemo(() => {
    const fromMap = new Map<string, SceneElement>()
    const toMap = new Map<string, SceneElement>()

    for (const el of from) fromMap.set(el.id, el)
    for (const el of to) toMap.set(el.id, el)

    const allIds = new Set([...fromMap.keys(), ...toMap.keys()])
    const result: InterpolatedElement[] = []

    for (const id of allIds) {
      const fromEl = fromMap.get(id)
      const toEl = toMap.get(id)

      if (fromEl && !toEl) {
        // 元素在上一帧存在，当前帧消失 → 淡出
        result.push({
          element: fromEl,
          state: 'exiting',
          morphProgress: 1 - progress,
        })
      } else if (!fromEl && toEl) {
        // 元素在当前帧新出现 → 淡入
        result.push({
          element: toEl,
          state: 'entering',
          morphProgress: progress,
        })
      } else if (fromEl && toEl) {
        const changed = hasChanged(fromEl, toEl)
        if (changed) {
          result.push({
            element: toEl, // 渲染目标状态
            state: 'morphing',
            morphProgress: progress,
          })
        } else {
          result.push({
            element: fromEl,
            state: 'stable',
            morphProgress: 1,
          })
        }
      }
    }

    return result
  }, [from, to, progress])
}
