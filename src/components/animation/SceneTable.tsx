/* ============================
   SceneTable — 表格元素渲染器
   支持行高亮/淡化/列高亮/单元格强调
   ============================ */

import React from 'react'
import type { TableElement } from '../../types/animated-timeline'

interface Props {
  element: TableElement
  morphProgress: number
  state: 'entering' | 'exiting' | 'stable' | 'morphing'
}

const SceneTable: React.FC<Props> = ({ element, morphProgress, state }) => {
  const opacity = state === 'entering' ? morphProgress
    : state === 'exiting' ? morphProgress
    : 1

  const transform =
    state === 'entering' ? `translateY(${(1 - morphProgress) * 16}px)`
    : state === 'exiting' ? `translateY(${(1 - morphProgress) * -16}px)`
    : 'translateY(0)'

  return (
    <div
      className="overflow-x-auto"
      style={{
        opacity,
        transform,
        transition: 'opacity 0.3s, transform 0.3s',
      }}
    >
      <table className="min-w-full border-collapse rounded-lg overflow-hidden text-sm">
        <thead>
          <tr>
            {element.headers.map((header, i) => {
              const isColHL = element.highlightedCols?.includes(i)
              return (
                <th
                  key={i}
                  className={`px-3 py-2 text-left font-medium border-b border-ink-faint/10
                    ${isColHL ? 'bg-ember/10 text-ember' : 'text-ink-faint bg-paper-sunk/50'}
                  `}
                >
                  {header}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {element.rows.map((row, ri) => {
            const isHL = element.highlightedRows?.includes(ri)
            const isFaded = element.fadedRows?.includes(ri)
            const isDimmed = element.dimmedRows?.includes(ri)

            return (
              <tr
                key={ri}
                style={{
                  opacity: isFaded ? 0.3 : isDimmed ? 0.55 : 1,
                  transition: 'opacity 0.4s ease, background-color 0.4s ease',
                }}
                className={`
                  border-b border-ink-faint/5 last:border-b-0
                  ${isHL ? 'bg-gold/8' : ''}
                  ${isDimmed ? 'bg-paper-sunk/30' : ''}
                  hover:bg-paper-raised/40
                `}
              >
                {row.map((cell, ci) => {
                  const cellEmphasis = element.cellEmphasis?.find(
                    (ce) => ce.row === ri && ce.col === ci,
                  )
                  return (
                    <td
                      key={ci}
                      className="px-3 py-1.5 text-ink"
                      style={
                        cellEmphasis
                          ? {
                              color:
                                cellEmphasis.color === 'gold'
                                  ? '#c8a040'
                                  : cellEmphasis.color === 'sage'
                                    ? '#6b9e6b'
                                    : cellEmphasis.color === 'crimson'
                                      ? '#b03a2e'
                                      : '#d27846',
                              fontWeight: 500,
                              textShadow: cellEmphasis.glow
                                ? '0 0 8px rgba(210, 120, 70, 0.3)'
                                : undefined,
                            }
                          : undefined
                      }
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SceneTable
