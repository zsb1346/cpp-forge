import React, { useMemo, useState } from 'react'
import type { Block, TeachingLayoutSpec } from '../types/protocol'
import SyntaxHighlighter from './SyntaxHighlighter'

interface Props {
  block: Block;
  children: React.ReactNode;
}

function codeOf(block: Block): string | undefined {
  switch (block.type) {
    case 'exposition': return block.code
    case 'type-it': return block.code
    case 'code-runner': return block.code
    case 'predict-output': return block.code
    case 'trace-state': return block.code
    case 'fix-code': return block.buggyCode
    case 'choose-next-line': return block.context
    default: return undefined
  }
}

function titleOf(block: Block): string {
  switch (block.type) {
    case 'predict-output': return '参考代码'
    case 'trace-state': return '走读代码'
    case 'fix-code': return '带错误的代码'
    case 'choose-next-line': return '正在搭建的代码'
    case 'code-runner': return '运行代码'
    default: return '参考'
  }
}

function resolveLayout(block: Block): Required<Pick<TeachingLayoutSpec, 'mode'>> & TeachingLayoutSpec {
  const explicit = block.layout
  if (explicit?.mode && explicit.mode !== 'auto') return { ...explicit, mode: explicit.mode }

  const code = explicit?.reference?.code ?? codeOf(block) ?? ''
  const lines = code ? code.split('\n').length : 0

  if (block.type === 'trace-state') return { ...explicit, mode: 'split', mobile: explicit?.mobile ?? 'reference-first' }
  if (block.type === 'fix-code' && lines > 3) return { ...explicit, mode: 'split', mobile: explicit?.mobile ?? 'reference-first' }
  if (block.type === 'choose-next-line' && lines > 3) return { ...explicit, mode: 'split', mobile: explicit?.mobile ?? 'reference-first' }
  if (block.type === 'predict-output' && lines > 4) return { ...explicit, mode: 'split', mobile: explicit?.mobile ?? 'reference-first' }

  return { ...explicit, mode: 'stack' }
}

const TeachingLayout: React.FC<Props> = ({ block, children }) => {
  const [mobileOpen, setMobileOpen] = useState(true)
  const layout = useMemo(() => resolveLayout(block), [block])

  if (layout.mode !== 'split') {
    return <div className="max-w-3xl mx-auto">{children}</div>
  }

  const reference = layout.reference
  const refCode = reference?.code ?? codeOf(block)
  const refText = reference?.text
  const sticky = reference?.sticky ?? true
  const collapseOnMobile = reference?.collapseOnMobile ?? false
  const side = layout.split?.referenceSide ?? 'left'
  const ratio = layout.split?.referenceRatio ?? 'balanced'
  const railClass = ratio === 'wide' ? 'lg:w-[52%]' : ratio === 'narrow' ? 'lg:w-[36%]' : 'lg:w-[44%]'
  const mainClass = ratio === 'wide' ? 'lg:w-[48%]' : ratio === 'narrow' ? 'lg:w-[64%]' : 'lg:w-[56%]'

  const rail = (
    <aside className={`reference-rail ${railClass} ${sticky ? 'lg:sticky lg:top-28 self-start' : ''}`}>
      <div className="reference-card">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint">
            {reference?.title ?? titleOf(block)}
          </p>
          {collapseOnMobile && (
            <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden text-xs text-ember font-semibold" type="button">
              {mobileOpen ? '收起' : '展开'}
            </button>
          )}
        </div>
        {(!collapseOnMobile || mobileOpen) && (
          <div className="space-y-3 animate-fade-in">
            {refText && <p className="text-sm text-ink-soft leading-relaxed">{refText}</p>}
            {refCode && (
              <SyntaxHighlighter
                code={refCode}
                filename={reference?.language === 'c' ? 'main.c' : 'main.cpp'}
                chrome
                zoomable
              />
            )}
          </div>
        )}
      </div>
    </aside>
  )

  const main = <div className={`min-w-0 ${mainClass}`}>{children}</div>

  return (
    <div className="max-w-6xl mx-auto lesson-workbench-grid relative">
      <div className="absolute -top-6 left-8 right-8 copper-rule opacity-60 hidden lg:block" />
      <div className={`flex flex-col lg:flex-row gap-5 lg:gap-7 ${side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        {rail}
        {main}
      </div>
    </div>
  )
}

export default TeachingLayout
