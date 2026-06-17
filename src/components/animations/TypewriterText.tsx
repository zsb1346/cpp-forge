import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { marked } from 'marked'

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

/**
 * 渲染单行 Markdown 为行内 HTML（不包裹 <p> 标签）
 */
function renderInlineMarkdown(line: string): string {
  return marked.parseInline(line, { async: false }) as string
}

/**
 * TypewriterText — 逐字打出文本，末尾带闪烁光标。
 *
 * 原理：将文本按换行拆分，每行独立渲染 Markdown。
 * 用 CSS mask 逐行从左到右逐步揭示，已完成的行全显示，
 * 当前行按百分比 mask，未来行隐藏。
 * 这样多行文本会一行打完再打下一行，而非全部一起出现。
 */
const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 45,
  className = '',
  onComplete,
}) => {
  const [displayedChars, setDisplayedChars] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const onCompleteRef = useRef(onComplete)
  const cancelledRef = useRef(false)

  // 保持 ref 与最新 onComplete 同步
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // 拆分行并预渲染每行 HTML
  const lines = useMemo(() => text.split('\n'), [text])
  const lineHtmls = useMemo(
    () => lines.map(line => renderInlineMarkdown(line)),
    [lines],
  )
  const lineLengths = useMemo(
    () => lines.map(line => line.length),
    [lines],
  )

  // 根据 displayedChars 计算每行揭示状态
  const lineStates = useMemo(() => {
    let remaining = displayedChars
    const states: { status: 'complete' | 'current' | 'future'; pct: number }[] = []

    for (let i = 0; i < lineLengths.length; i++) {
      if (remaining <= 0) {
        states.push({ status: 'future', pct: 0 })
      } else if (remaining >= lineLengths[i]) {
        remaining -= lineLengths[i]
        states.push({ status: 'complete', pct: 100 })
      } else {
        const pct = lineLengths[i] > 0 ? Math.round((remaining / lineLengths[i]) * 100) : 100
        remaining = 0
        states.push({ status: 'current', pct })
      }
    }

    return states
  }, [displayedChars, lineLengths])

  // 打字计时器
  useEffect(() => {
    setDisplayedChars(0)
    setShowCursor(true)
    cancelledRef.current = false
    const totalChars = text.length

    if (!text || speed <= 0) {
      setDisplayedChars(totalChars)
      setShowCursor(false)
      const t = setTimeout(() => onCompleteRef.current?.(), 0)
      return () => { clearTimeout(t); cancelledRef.current = true }
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    let charIndex = 0

    const typeNext = () => {
      if (cancelledRef.current) return
      charIndex++
      setDisplayedChars(charIndex)
      if (charIndex < totalChars) {
        const t = setTimeout(typeNext, speed)
        timers.push(t)
      } else {
        setShowCursor(false)
        onCompleteRef.current?.()
      }
    }

    const startTimer = setTimeout(typeNext, speed)
    timers.push(startTimer)

    return () => {
      cancelledRef.current = true
      timers.forEach(clearTimeout)
    }
  }, [text, speed])

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
          {state.status === 'current' && showCursor && (
            <span
              className="inline-block w-[2px] h-[1em] bg-ember animate-pulse ml-0.5 align-middle"
              aria-hidden="true"
            />
          )}
        </div>
      )
    },
    [showCursor],
  )

  return (
    <div className={className} aria-live="polite">
      {lineHtmls.map((html, i) => renderLine(html, lineStates[i] ?? { status: 'future', pct: 0 }, i))}
    </div>
  )
}

export default TypewriterText
