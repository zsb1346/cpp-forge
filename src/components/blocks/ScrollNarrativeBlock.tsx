import React, { useState, useRef, useCallback } from 'react'
import type { ScrollNarrativeBlock as ScrollNarrativeBlockType } from '../../types/protocol'
import MarkdownBlock from '../MarkdownBlock'

interface Props {
  block: ScrollNarrativeBlockType
}

const ScrollNarrativeBlock: React.FC<Props> = ({ block }) => {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const codePanelRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const offsets = sectionRefs.current.map((el) => {
      if (!el) return Infinity
      const rect = el.getBoundingClientRect()
      return Math.abs(rect.top - 100)
    })
    const closest = offsets.indexOf(Math.min(...offsets))
    if (closest >= 0) setActiveSection(closest)
  }, [])

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const activeStep = block.sections[activeSection]

  return (
    <div className="block-card">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左：叙述文本 */}
        <div className="space-y-12">
          {block.sections.map((section, i) => (
            <div
              key={i}
              ref={(el) => { sectionRefs.current[i] = el }}
              className={[
                'transition-opacity duration-300',
                i === activeSection ? 'opacity-100' : 'opacity-40',
              ].join(' ')}
            >
              {section.icon && (
                <span className="text-lg mb-2 block">{section.icon}</span>
              )}
              <MarkdownBlock
                text={section.text}
                className="text-clay leading-relaxed text-sm"
              />
            </div>
          ))}
        </div>

        {/* 右：代码代码面板（桌面 sticky） */}
        <div
          ref={codePanelRef}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          {activeStep && (
            <div className="bg-void rounded-lg p-4 text-sm text-mint overflow-x-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-stone/60">
                  第 {activeSection + 1} / {block.sections.length} 段
                </span>
              </div>
              {activeStep.code.split('\n').map((line, i) => (
                <div
                  key={i}
                  className={[
                    'py-0.5 px-2 -mx-2 rounded transition-colors',
                    activeStep.highlight &&
                    line.includes(activeStep.highlight)
                      ? 'bg-accent/15 text-accent font-medium'
                      : '',
                  ].join(' ')}
                >
                  <span className="text-stone/40 select-none mr-4 text-xs">
                    {String(i + 1).padStart(2, ' ')}
                  </span>
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScrollNarrativeBlock
