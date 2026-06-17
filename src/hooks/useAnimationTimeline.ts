/* ============================
   useAnimationTimeline
   通用时间线控制器
   管理场景序列的播放/暂停/跳转/进度
   ============================ */

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import type { Scene, TimelineConfig, SceneElement, InterpolatedElement } from '../types/animated-timeline'
import { useElementInterpolation } from './useElementInterpolation'

/** 将增量场景合并成完整快照 */
function resolveSnapshot(scenes: Scene[], index: number): SceneElement[] {
  if (index < 0 || index >= scenes.length) return []

  const result: SceneElement[] = []

  for (let i = 0; i <= index; i++) {
    const scene = scenes[i]
    if (scene.mode === 'delta') {
      // 增量模式：用当前元素覆盖之前的同名元素
      const existingIds = new Set(scene.elements.map(e => e.id))
      // 保留上一轮不在增量中的元素
      const kept = result.filter(e => !existingIds.has(e.id))
      result.length = 0
      result.push(...kept, ...scene.elements)
    } else {
      // 全量模式（默认）：直接替换
      result.length = 0
      result.push(...scene.elements)
    }
  }

  return result
}

export interface TimelineAPI {
  currentStep: number
  progress: number
  isPlaying: boolean
  isAtEnd: boolean
  isTransitioning: boolean
  totalSteps: number

  /** 插值后的元素列表（供渲染层消费） */
  interpolated: InterpolatedElement[]

  play: () => void
  pause: () => void
  next: () => void
  prev: () => void
  seek: (p: number) => void
  setSpeed: (multiplier: number) => void
}

export function useAnimationTimeline(
  scenes: Scene[],
  config?: TimelineConfig,
): TimelineAPI {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(1) // 0~1
  const [isPlaying, setIsPlaying] = useState(false)
  const speedRef = useRef(1)
  const animRef = useRef<number>(0)
  const onCompleteRef = useRef<(() => void) | undefined>()

  const totalSteps = scenes.length
  const isAtEnd = stepIndex >= totalSteps - 1 && progress >= 1
  const isTransitioning = progress < 1

  // 预计算所有场景的完整快照
  const snapshots = useMemo(
    () => scenes.map((_, i) => resolveSnapshot(scenes, i)),
    [scenes],
  )

  // 插值的"前"状态 = 上一步完整快照，"后"状态 = 当前步完整快照
  const fromElements = useMemo(
    () => (stepIndex > 0 ? snapshots[stepIndex - 1] : []),
    [snapshots, stepIndex],
  )
  const toElements = useMemo(
    () => snapshots[stepIndex] ?? [],
    [snapshots, stepIndex],
  )

  const interpolated = useElementInterpolation(fromElements, toElements, progress)

  // ── 播放循环 ──────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || isAtEnd) {
      return
    }

    const duration =
      ((scenes[stepIndex]?.duration ?? config?.defaultDuration ?? 500) /
        speedRef.current)

    const startTime = performance.now()
    let raf: number

    function tick(now: number) {
      const elapsed = now - startTime
      const raw = elapsed / duration
      const p = Math.min(raw, 1)

      // 应用缓动
      const eased = applyEasing(p, scenes[stepIndex]?.easing ?? config?.defaultEasing ?? 'ease-out')
      setProgress(eased)

      if (raw < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        // 过渡完成
        setIsPlaying(false)
        setProgress(1)
        if (stepIndex < totalSteps - 1) {
          setStepIndex((s) => s + 1)
        } else {
          // 全部完成
          onCompleteRef.current?.()
        }
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isPlaying, stepIndex, scenes, config?.defaultDuration, totalSteps, isAtEnd])

  // ── 控制方法 ──────────────────────────────────────

  const next = useCallback(() => {
    if (isAtEnd || isTransitioning) return
    if (stepIndex < totalSteps - 1) {
      setStepIndex((s) => s + 1)
      setProgress(0)
      // 自动播放模式：进入后自动播放
      if (config?.navigation === 'auto') {
        setIsPlaying(true)
      }
    }
  }, [isAtEnd, isTransitioning, stepIndex, totalSteps, config?.navigation])

  const prev = useCallback(() => {
    if (stepIndex === 0 || isTransitioning) return
    setStepIndex((s) => s - 1)
    setProgress(0)
  }, [stepIndex, isTransitioning])

  const play = useCallback(() => {
    if (isAtEnd && config?.loop) {
      // 循环模式：回到开头
      setStepIndex(0)
      setProgress(0)
    }
    setIsPlaying(true)
  }, [isAtEnd, config?.loop])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const seek = useCallback(
    (p: number) => {
      setProgress(Math.max(0, Math.min(1, p)))
    },
    [],
  )

  const setSpeed = useCallback((multiplier: number) => {
    speedRef.current = multiplier
  }, [])

  return {
    currentStep: stepIndex,
    progress,
    isPlaying,
    isAtEnd,
    isTransitioning,
    totalSteps,
    interpolated,
    play,
    pause,
    next,
    prev,
    seek,
    setSpeed,
  }
}

// ═══════════════════════════════════════════════════════
// 缓动函数
// ═══════════════════════════════════════════════════════

function applyEasing(t: number, easing: string | [number, number, number, number]): number {
  switch (easing) {
    case 'ease-out':
      return 1 - Math.pow(1 - t, 3)
    case 'ease-in-out':
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    case 'spring':
      // 简单弹簧模拟
      return 1 - Math.pow(1 - t, 3) * Math.cos(t * Math.PI * 3)
    case 'bounce':
      // 简单弹跳
      if (t < 4 / 11) return 121 * t * t / 16
      if (t < 8 / 11) return 363 / 40 * t * t - 99 / 10 * t + 17 / 5
      if (t < 9 / 10) return 4356 / 361 * t * t - 35442 / 1805 * t + 16061 / 1805
      return 54 / 5 * t * t - 513 / 25 * t + 268 / 25
    case 'smooth':
      return t
    default:
      // custom cubic-bezier
      if (Array.isArray(easing)) {
        return cubicBezier(t, easing[0], easing[1], easing[2], easing[3])
      }
      return 1 - Math.pow(1 - t, 3)
  }
}

function cubicBezier(t: number, x1: number, y1: number, x2: number, y2: number): number {
  // 简化版：Newton-Raphson 求 t 对应的 x, 再求 y
  let guess = t
  for (let i = 0; i < 8; i++) {
    const x = 3 * (1 - guess) * (1 - guess) * guess * x1 +
              3 * (1 - guess) * guess * guess * x2 +
              guess * guess * guess
    const dx = 3 * (1 - guess) * (1 - guess) * x1 +
              6 * (1 - guess) * guess * (x2 - x1) +
              3 * guess * guess * (1 - x2)
    if (Math.abs(dx) < 1e-6) break
    guess -= (x - t) / dx
  }
  return 3 * (1 - guess) * (1 - guess) * guess * y1 +
         3 * (1 - guess) * guess * guess * y2 +
         guess * guess * guess
}
