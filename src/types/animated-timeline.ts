/* ============================
   animated-timeline 演示引擎类型
   一个通用跨学科的动画逐步展示 Block
   ============================ */

import type { BaseTeachingBlock } from './teaching'

// ═══════════════════════════════════════════════════════
// 配置
// ═══════════════════════════════════════════════════════

export type TimelineNavigation = 'click' | 'auto' | 'scroll'
export type TimelineLayout = 'full' | 'split-code' | 'split-table'
export type NarrationPosition = 'top' | 'bottom' | 'left' | 'right' | 'overlay'

export interface TimelineConfig {
  navigation?: TimelineNavigation
  /** 每步过渡时长，默认 500ms */
  defaultDuration?: number
  layout?: TimelineLayout
  narrationPosition?: NarrationPosition
  allowSeek?: boolean
  loop?: boolean
  showStepIndicator?: boolean
  /** 进入动画的缓动类型 */
  defaultEasing?: EasingType
}

// ═══════════════════════════════════════════════════════
// 场景 & 块接口
// ═══════════════════════════════════════════════════════

export type SceneMode = 'full' | 'delta'
export type NarrationAnimation = 'typewriter' | 'reveal' | 'instant'
export type EnterAnimation = 'fade' | 'slide-up' | 'slide-left' | 'pop' | 'typewriter' | 'reveal' | 'none'
export type EasingType = 'ease-out' | 'ease-in-out' | 'spring' | 'bounce' | 'smooth' | [number, number, number, number]

export interface Scene {
  narration?: string
  narrationAnimation?: NarrationAnimation
  /** 场景中的可视化元素 */
  elements: SceneElement[]
  /** 全量模式(默认)：elements 是完整屏幕快照。增量模式：只写变化的部分 */
  mode?: SceneMode
  /** 覆盖全局时长 */
  duration?: number
  /** 缓动覆盖 */
  easing?: EasingType
}

// ═══════════════════════════════════════════════════════
// 场景元素联合
// ═══════════════════════════════════════════════════════

export type SceneElement =
  | CodeElement
  | TableElement
  | TextElement
  | CardElement
  | HighlightElement
  | ArrowElement
  | GroupElement

// ─── 代码 ─────────────────────────────────────────────

export interface CodeElement {
  type: 'code'
  /** 跨场景保持 id 不变则引擎自动 morph 过渡 */
  id: string
  code: string
  language?: string
  highlightedLines?: number[]
  emphasizedLines?: number[]
  fadedLines?: number[]
  dimmedLines?: number[]
  inlineHighlights?: InlineHighlight[]
  enterAnimation?: EnterAnimation
}

export interface InlineHighlight {
  line: number
  startCol: number
  endCol: number
  color?: 'ember' | 'gold' | 'sage' | 'crimson'
}

// ─── 表格 ─────────────────────────────────────────────

export interface TableElement {
  type: 'table'
  id: string
  headers: string[]
  rows: (string | number)[][]
  highlightedRows?: number[]
  fadedRows?: number[]
  dimmedRows?: number[]
  highlightedCols?: number[]
  cellEmphasis?: CellEmphasis[]
  enterAnimation?: EnterAnimation
}

export interface CellEmphasis {
  row: number
  col: number
  color?: 'ember' | 'gold' | 'sage' | 'crimson'
  glow?: boolean
}

// ─── 文本 ─────────────────────────────────────────────

export interface TextElement {
  type: 'text'
  id: string
  content: string
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'label'
  enterAnimation?: EnterAnimation
  align?: 'left' | 'center' | 'right'
}

// ─── 卡片 ─────────────────────────────────────────────

export type CardVariant = 'default' | 'raised' | 'sunk' | 'border-only'
export type ThemeAccent = 'ember' | 'sage' | 'gold' | 'ink'

export interface CardElement {
  type: 'card'
  id: string
  title?: string
  content: string
  icon?: string
  variant?: CardVariant
  accent?: ThemeAccent
  enterAnimation?: EnterAnimation
}

// ─── 高亮框 ───────────────────────────────────────────

export type HighlightShape = 'box' | 'circle' | 'underline'
export type HighlightEffect = 'pulse' | 'glow' | 'static'

export interface HighlightElement {
  type: 'highlight'
  id: string
  /** 高亮框自动跟随目标元素的位置 */
  targetElement: string
  shape?: HighlightShape
  effect?: HighlightEffect
  color?: ThemeAccent
  label?: string
}

// ─── 箭头 ─────────────────────────────────────────────

export interface ArrowElement {
  type: 'arrow'
  id: string
  fromElement: string
  toElement: string
  label?: string
  color?: ThemeAccent
  /** 是否带有流动动画 */
  animated?: boolean
}

// ─── 组合容器 ─────────────────────────────────────────

export interface GroupElement {
  type: 'group'
  id: string
  children: SceneElement[]
  enterAnimation?: EnterAnimation
  gap?: number
  direction?: 'vertical' | 'horizontal'
}

// ═══════════════════════════════════════════════════════
// 插值系统中间类型
// ═══════════════════════════════════════════════════════

/** 插值引擎返回的带过渡状态的元素 */
export interface InterpolatedElement {
  element: SceneElement
  state: 'entering' | 'exiting' | 'stable' | 'morphing'
  /** 0~1 该元素当前的过渡进度 */
  morphProgress: number
}

// ═══════════════════════════════════════════════════════
// Block 接口
// ═══════════════════════════════════════════════════════

export interface AnimatedTimelineBlock extends BaseTeachingBlock {
  type: 'animated-timeline'
  config?: TimelineConfig
  scenes: Scene[]
}
