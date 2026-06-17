import React, { useState } from 'react'
import type { FlowVisualizerBlock as FlowVisualizerBlockType } from '../../types/protocol'

interface Props {
  block: FlowVisualizerBlockType
}

const FlowVisualizerBlock: React.FC<Props> = ({ block }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const step = block.steps[currentStep]
  const isLast = currentStep >= block.steps.length - 1

  if (!step) {
    return (
      <div className="block-card">
        <p className="text-clay text-sm">无流程步骤</p>
      </div>
    )
  }

  return (
    <div className="block-card space-y-4">
      {/* 代码 + 行高亮 */}
      <pre className="bg-void rounded-lg p-4 text-sm text-mint overflow-x-auto">
        {block.code.split('\n').map((line, i) => (
          <div
            key={i}
            className={[
              'py-0.5 px-2 -mx-2 rounded transition-colors',
              i + 1 === step.line ? 'bg-accent/15 text-accent font-medium' : '',
            ].join(' ')}
          >
            <span className="text-stone/40 select-none mr-4 text-xs">
              {String(i + 1).padStart(2, ' ')}
            </span>
            {line}
          </div>
        ))}
      </pre>

      {/* 变量表 */}
      {step.vars && Object.keys(step.vars).length > 0 && (
        <div className="bg-void rounded-lg p-3">
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">
            变量
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {Object.entries(step.vars).map(([name, value]) => (
              <div
                key={name}
                className="flex items-center gap-1.5 text-sm font-mono"
              >
                <span className="text-ink font-medium">{name}</span>
                <span className="text-clay">{'='}</span>
                <span className="text-accent font-bold">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 条件标注 */}
      {step.condition && (
        <div className="bg-sand/10 border border-sand/30 rounded-lg px-4 py-2">
          <span className="text-xs font-bold text-sand uppercase tracking-wider">
            条件判断
          </span>
          <p className="text-sm text-sand mt-1 font-mono">{step.condition}</p>
        </div>
      )}

      {/* 标准输出 */}
      {step.stdout && (
        <div className="bg-void rounded-lg p-3">
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">
            输出
          </h4>
          <pre className="text-sm text-emerald font-mono">{step.stdout}</pre>
        </div>
      )}

      {/* 导航 */}
      <div className="flex items-center justify-between pt-2 border-t border-stone/10">
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
        <div className="flex gap-2">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((s) => s - 1)}
            className="text-xs px-3 py-1 rounded bg-void text-clay hover:text-ink disabled:opacity-30 transition-colors"
          >
            上一步
          </button>
          <button
            disabled={isLast}
            onClick={() => setCurrentStep((s) => s + 1)}
            className="text-xs px-3 py-1 rounded bg-accent text-white hover:bg-accent-light disabled:opacity-30 transition-colors"
          >
            下一步
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlowVisualizerBlock
