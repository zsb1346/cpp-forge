import React, { useState } from 'react'
import type { SceneBlock as SceneBlockType } from '../../types/protocol'
import MarkdownBlock from '../MarkdownBlock'

interface Props {
  block: SceneBlockType
}

const SceneBlock: React.FC<Props> = ({ block }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const step = block.steps[currentStep]
  const isLast = currentStep >= block.steps.length - 1

  const advance = () => {
    if (!isLast) setCurrentStep((s) => s + 1)
  }

  const reset = () => setCurrentStep(0)

  if (!step) {
    return (
      <div className="block-card">
        <p className="text-clay text-sm">场景无步骤数据</p>
      </div>
    )
  }

  return (
    <div className="block-card space-y-4" onClick={advance}>
      {/* 标题 */}
      {block.title && (
        <h3 className="text-lg font-bold text-ink">{block.title}</h3>
      )}

      {/* 步骤文本 */}
      {step.text && (
        <MarkdownBlock text={step.text} className="text-clay leading-relaxed" />
      )}

      {/* 代码展示 */}
      {step.code && (
        <pre className="bg-void rounded-lg p-4 text-sm text-mint overflow-x-auto">
          {step.highlight ? (
            <code
              dangerouslySetInnerHTML={{
                __html: step.code.replace(
                  step.highlight,
                  `<span class="bg-sand/20 text-sand rounded px-1">${step.highlight}</span>`,
                ),
              }}
            />
          ) : (
            <code>{step.code}</code>
          )}
        </pre>
      )}

      {/* 内存盒子可视化 */}
      {step.state?.boxes && step.state.boxes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {step.state.boxes.map((box) => (
            <div
              key={box.id}
              className={[
                'px-3 py-2 rounded border text-sm font-mono min-w-[80px]',
                box.state === 'create'
                  ? 'border-emerald/40 bg-emerald/10 text-emerald'
                  : box.state === 'update'
                    ? 'border-sky/40 bg-sky/10 text-sky'
                    : box.state === 'read'
                      ? 'border-sand/40 bg-sand/10 text-sand'
                      : box.state === 'compare'
                        ? 'border-rose/40 bg-rose/10 text-rose'
                        : 'border-stone/30 bg-void text-stone',
              ].join(' ')}
            >
              <div className="text-xs opacity-60">{box.label}</div>
              <div className="font-bold">{String(box.value ?? '?')}</div>
            </div>
          ))}
        </div>
      )}

      {/* 步骤指示器 */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-1.5">
          {block.steps.map((_, i) => (
            <span
              key={i}
              className={[
                'w-2 h-2 rounded-full transition-colors',
                i === currentStep
                  ? 'bg-accent'
                  : i < currentStep
                    ? 'bg-accent/30'
                    : 'bg-stone/20',
              ].join(' ')}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {currentStep > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentStep((s) => s - 1) }}
              className="text-xs text-clay hover:text-ink transition-colors"
            >
              上一步
            </button>
          )}
          {isLast ? (
            <button
              onClick={(e) => { e.stopPropagation(); reset() }}
              className="text-xs text-accent hover:text-accent-light transition-colors"
            >
              重新播放
            </button>
          ) : (
            <span className="text-xs text-clay">
              点击继续 ({currentStep + 1}/{block.steps.length})
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default SceneBlock
