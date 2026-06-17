import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { marked } from 'marked'

interface RevealTextProps {
  text: string
  mode?: 'word' | 'char'
  delay?: number
  className?: string
  onComplete?: () => void
}

/**
 * 渲染单行 Markdown 为行内 HTML
 */
function renderInlineMarkdown(line: string): string {
  return marked.parseInline(line, { async: false }) as string
}

/**
 * RevealText — 逐行逐单元渐进揭示。
 *
 * 按换行拆分为独立行，每行独立渲染 Markdown 并应用自身的 mask，
 * 已完成的行全显示，当前行按进度 mask，未来行隐藏。
 * 这样多行文字会逐行渐进出现，而非全部一起揭示。
 *
 * mode='word' 按空格分词语，mode='char' 按单字逐个揭示。
 */
const RevealText: React.FC<RevealTextProps> = ({
  text,
  mode = 'word',
  delay = 40,
  className = '',
  onComplete,
}) => {
  const [revealedCount, setRevealedCount] = useState(0)
  const onCompleteRef = useRef(onComplete)
  const cancelledRef = useRef(false)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // 拆分行并预渲染每行 HTML
  const lines = useMemo(() => text.split('\n'), [text])
  const lineHtmls = useMemo(
    () => lines.map(line => renderInlineMarkdown(line)),
    [lines],
  )

  // 每行的单元数（word 按空格分，char 按字符分）
  const unitsPerLine = useMemo(
    () => lines.map(line => (mode === 'word' ? line.split(' ').length : line.length)),
    [lines, mode],
  )

  // 总单元数
  const totalUnits = useMemo(
    () => unitsPerLine.reduce((a, b) => a + b, 0),
    [unitsPerLine],
  )

  // 根据 revealedCount 计算每行揭示状态
  const lineStates = useMemo(() => {
    let remaining = revealedCount
    const states: { status: 'complete' | 'current' | 'future'; pct: number }[] = []

    for (let i = 0; i < unitsPerLine.length; i++) {
      if (remaining <= 0) {
        states.push({ status: 'future', pct: 0 })
      } else if (remaining >= unitsPerLine[i]) {
        remaining -= unitsPerLine[i]
        states.push({ status: 'complete', pct: 100 })
      } else {
        const pct = unitsPerLine[i] > 0 ? Math.round((remaining / unitsPerLine[i]) * 100) : 100
        remaining = 0
        states.push({ status: 'current', pct })
      }
    }

    return states
  }, [revealedCount, unitsPerLine])

  // 揭示计时器
  useEffect(() => {
    setRevealedCount(0)
    cancelledRef.current = false

    if (!text || text.trim().length === 0) {
      const t = setTimeout(() => onCompleteRef.current?.(), 0)
      return () => { clearTimeout(t); cancelledRef.current = true }
    }

    let index = 0

    const revealNext = () => {
      if (cancelledRef.current) return
      index++
      setRevealedCount(index)
      if (index < totalUnits) {
        setTimeout(revealNext, delay)
      } else {
        onCompleteRef.current?.()
      }
    }

    const timer = setTimeout(revealNext, delay)
    return () => { cancelledRef.current = true; clearTimeout(timer) }
  }, [text, mode, delay, totalUnits])

  const renderLine = useCallback(
    (html: string, state: { status: string; pct: number }, idx: number) => {
      if (state.status === 'future') {
        return <div key={idx} aria-hidden="true" style={{ height: '0', overflow: 'hidden' }} />
      }

      const maskStyle: React.CSSProperties =
        state.status === 'current'
          ? {
              WebkitMaskImage: `linear-gradient(to right, black 0%, black ${state.pct}%, transparent ${state.pct}%)`,
              maskImage: `linear-gradient(to right, black 0%, black ${state.pct}%, transparent ${state.pct}%)`,
            }
          : {}

      return (
        <div key={idx} style={maskStyle}>
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )
    },
    [],
  )

  if (!text) return null

  return (
    <div className={className} aria-live="polite">
      {lineHtmls.map((html, i) => renderLine(html, lineStates[i] ?? { status: 'future', pct: 0 }, i))}
    </div>
  )
}

export default RevealText
