/* ============================
   AnimationTimelineBlock
   animated-timeline 主 Block
   串联时间线控制器 + 导航控件 + 元素渲染器
   ============================ */

import React from 'react'
import type { AnimatedTimelineBlock as Block } from '../../types/animated-timeline'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'
import TimelineControls from './TimelineControls'
import SceneElementRenderer from './SceneElementRenderer'
import { TypewriterText } from '../animations'

interface Props {
  block: Block
  onComplete?: () => void
}

const NarrationText: React.FC<{ text: string; animation?: string }> = ({
  text,
  animation,
}) => {
  if (animation === 'typewriter') {
    return <TypewriterText text={text} className="text-sm text-ink/80 leading-relaxed" />
  }

  if (animation === 'reveal') {
    return (
      <div className="text-sm text-ink/80 leading-relaxed animate-fade-in">
        {text}
      </div>
    )
  }

  return <p className="text-sm text-ink/80 leading-relaxed">{text}</p>
}

const AnimationTimelineBlock: React.FC<Props> = ({ block, onComplete }) => {
  const config = block.config
  const scenes = block.scenes

  const timeline = useAnimationTimeline(scenes, config)

  // 通知外部完成
  React.useEffect(() => {
    if (timeline.isAtEnd && onComplete) {
      onComplete()
    }
  }, [timeline.isAtEnd, onComplete])

  const np = config?.narrationPosition ?? 'bottom'

  // 自动布局：单元素类型决定排版
  const currentElements = timeline.interpolated.filter(
    (ie) => ie.state !== 'exiting',
  )

  const hasCode = currentElements.some((ie) => ie.element.type === 'code')
  const hasTable = currentElements.some((ie) => ie.element.type === 'table')
  const hasTextCard = currentElements.some(
    (ie) => ie.element.type === 'text' || ie.element.type === 'card',
  )

  // 带旁白的当前场景
  const currentScene = scenes[timeline.currentStep]

  // 布局计算
  const getLayout = (): React.CSSProperties => {
    if (config?.layout === 'split-code' && hasCode && (hasTable || hasTextCard)) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
      }
    }
    if (config?.layout === 'split-table' && hasTable) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
      }
    }
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }
  }

  return (
    <div className="block-card">
      {/* 旁白 - 顶部 */}
      {(np === 'top' || np === 'overlay') && currentScene?.narration && (
        <div className="mb-4">
          <NarrationText
            text={currentScene.narration}
            animation={currentScene.narrationAnimation}
          />
        </div>
      )}

      {/* 可视化元素 */}
      <div style={getLayout()}>
        {timeline.interpolated.map((ie) => (
          <SceneElementRenderer key={ie.element.id} interpolated={ie} />
        ))}
      </div>

      {/* 旁白 - 底部 */}
      {np === 'bottom' && currentScene?.narration && (
        <div className="mt-4">
          <NarrationText
            text={currentScene.narration}
            animation={currentScene.narrationAnimation}
          />
        </div>
      )}

      {/* 导航控件 */}
      <TimelineControls
        currentStep={timeline.currentStep}
        totalSteps={timeline.totalSteps}
        progress={timeline.progress}
        isPlaying={timeline.isPlaying}
        isAtEnd={timeline.isAtEnd}
        allowSeek={config?.allowSeek}
        showStepIndicator={config?.showStepIndicator}
        onPlay={timeline.play}
        onPause={timeline.pause}
        onNext={timeline.next}
        onPrev={timeline.prev}
        onSeek={timeline.seek}
      />
    </div>
  )
}

export default AnimationTimelineBlock
