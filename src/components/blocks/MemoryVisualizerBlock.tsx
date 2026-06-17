import React, { useState } from 'react'
import type { MemoryVisualizerBlock as MemoryVisualizerBlockType } from '../../types/protocol'
import MarkdownBlock from '../MarkdownBlock'
import { ArrowRightIcon } from '../icons'

interface Props {
  block: MemoryVisualizerBlockType
}

const MemoryVisualizerBlock: React.FC<Props> = ({ block }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const step = block.steps[currentStep]
  const isLast = currentStep >= block.steps.length - 1

  if (!step) {
    return (
      <div className="block-card">
        <p className="text-clay text-sm">无可视化步骤</p>
      </div>
    )
  }

  return (
    <div className="block-card space-y-4">
      {/* 操作说明 */}
      <MarkdownBlock text={block.instructions} className="text-sm text-clay" />

      {/* 代码展示 + 行高亮 */}
      <pre className="bg-void rounded-lg p-4 text-sm text-mint overflow-x-auto relative">
        {block.code.split('\n').map((line, i) => (
          <div
            key={i}
            className={[
              'py-0.5 px-2 -mx-2 rounded',
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

      {/* 内存面板 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 栈 */}
        <div>
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">
            ↕ 栈
          </h4>
          {step.stack && step.stack.length > 0 ? (
            <div className="space-y-1">
              {step.stack.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center gap-2 bg-void rounded px-3 py-1.5 text-sm font-mono"
                >
                  <span className="text-stone/50 text-xs">{v.addr}</span>
                  <span className="text-ink font-medium">{v.id}</span>
                  <span className="text-clay">{':='}</span>
                  <span className="text-accent font-bold">
                    {String(v.value)}
                  </span>
                  {v.arrow && (
                    <span className="text-rose text-xs ml-1"><ArrowRightIcon size={10} /> {v.arrow}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone/50 italic">（空）</p>
          )}
        </div>

        {/* 堆 */}
        <div>
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">
            ⛰ 堆
          </h4>
          {step.heap && step.heap.length > 0 ? (
            <div className="space-y-1">
              {step.heap.map((obj) => (
                <div
                  key={obj.id}
                  className="flex items-center gap-2 bg-void rounded px-3 py-1.5 text-sm font-mono"
                >
                  <span className="text-stone/50 text-xs">{obj.addr}</span>
                  <span className="text-emerald font-medium">{obj.id}</span>
                  <span className="text-clay">{':='}</span>
                  <span className="text-ink font-bold">
                    {String(obj.value)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone/50 italic">（空）</p>
          )}
        </div>
      </div>

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

export default MemoryVisualizerBlock
