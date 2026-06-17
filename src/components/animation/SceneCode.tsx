/* ============================
   SceneCode — 代码元素渲染器
   支持行高亮/强调/淡化/行内标记
   ============================ */

import React from 'react'
import type { CodeElement } from '../../types/animated-timeline'

interface Props {
  element: CodeElement
  morphProgress: number
  state: 'entering' | 'exiting' | 'stable' | 'morphing'
}

const LINE_HEIGHT = 24

const SceneCode: React.FC<Props> = ({ element, morphProgress, state }) => {
  const lines = element.code.split('\n')
  const opacity = state === 'entering' ? morphProgress
    : state === 'exiting' ? morphProgress
    : 1

  const transform =
    state === 'entering' ? `translateY(${(1 - morphProgress) * 12}px)`
    : state === 'exiting' ? `translateY(${(1 - morphProgress) * -12}px)`
    : 'translateY(0)'

  return (
    <div
      className="relative font-mono text-sm leading-relaxed overflow-x-auto"
      style={{
        opacity,
        transform,
        transition: 'opacity 0.3s, transform 0.3s',
      }}
    >
      <table className="border-collapse w-full">
        <tbody>
          {lines.map((line, i) => {
            const lineNum = i + 1
            const isHighlighted = element.highlightedLines?.includes(lineNum)
            const isEmphasized = element.emphasizedLines?.includes(lineNum)
            const isFaded = element.fadedLines?.includes(lineNum)
            const isDimmed = element.dimmedLines?.includes(lineNum)

            // 行内标记
            const inlineMatch = element.inlineHighlights?.find(
              (h) => h.line === lineNum,
            )

            let displayLine = line
            if (inlineMatch) {
              const before = line.slice(0, inlineMatch.startCol)
              const highlight = line.slice(inlineMatch.startCol, inlineMatch.endCol)
              const after = line.slice(inlineMatch.endCol)
              displayLine = ''
              // 用 span 包裹 — 下面渲染
            }

            const bgClass = isHighlighted
              ? 'bg-ember/10'
              : isEmphasized
                ? 'bg-gold/10'
                : isDimmed
                  ? ''
                  : ''

            const textClass = isFaded || isDimmed
              ? 'text-ink-faint/40'
              : isEmphasized
                ? 'text-gold'
                : isHighlighted
                  ? 'text-ember'
                  : 'text-ink'

            const rowStyle: React.CSSProperties = {
              opacity: isFaded ? 0.35 : isDimmed ? 0.55 : 1,
              transition: 'opacity 0.4s ease, background-color 0.4s ease',
              backgroundColor: isHighlighted
                ? 'rgba(210, 120, 70, 0.08)'
                : isEmphasized
                  ? 'rgba(200, 160, 60, 0.08)'
                  : 'transparent',
            }

            return (
              <tr key={i} style={rowStyle}>
                <td className="select-none text-right pr-4 text-ink-faint/30 w-10 align-top text-xs">
                  {lineNum}
                </td>
                <td className={`whitespace-pre align-top ${textClass}`}>
                  {inlineMatch ? (
                    <>
                      {line.slice(0, inlineMatch.startCol)}
                      <mark
                        className={`rounded px-0.5 ${
                          inlineMatch.color === 'gold'
                            ? 'bg-gold/20 text-gold'
                            : inlineMatch.color === 'sage'
              ? 'bg-sage/20 text-sage'
                : inlineMatch.color === 'crimson'
                  ? 'bg-clay/20 text-clay'
                                : 'bg-ember/20 text-ember'
                        }`}
                      >
                        {line.slice(inlineMatch.startCol, inlineMatch.endCol)}
                      </mark>
                      {line.slice(inlineMatch.endCol)}
                    </>
                  ) : (
                    line || '\u00A0'
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SceneCode
