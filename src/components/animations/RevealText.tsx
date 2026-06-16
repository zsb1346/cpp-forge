import React, { useState, useEffect, useRef } from 'react'

interface RevealTextProps {
  text: string
  mode?: 'word' | 'char'
  delay?: number
  className?: string
  onComplete?: () => void
}

/**
 * RevealText — 词/字逐单元淡入上滑。
 * - word 模式：按空格分词，逐个淡入
 * - char 模式：逐字符淡入
 * 所有单元同时渲染但通过 animation-delay 错开入场。
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

  useEffect(() => {
    setRevealedCount(0)
    cancelledRef.current = false

    if (!text) {
      const t = setTimeout(() => onCompleteRef.current?.(), 0)
      return () => { clearTimeout(t); cancelledRef.current = true }
    }

    const units = mode === 'word' ? text.split(' ') : text.split('')
    let index = 0

    const revealNext = () => {
      if (cancelledRef.current) return
      index++
      setRevealedCount(index)
      if (index < units.length) {
        setTimeout(revealNext, delay)
      } else {
        onCompleteRef.current?.()
      }
    }

    const timer = setTimeout(revealNext, delay)
    return () => { cancelledRef.current = true; clearTimeout(timer) }
  }, [text, mode, delay])

  if (!text) return null

  // 所有单元同时渲染，通过 CSS animation-delay 错开入场
  const renderUnits = () => {
    if (mode === 'word') {
      const words = text.split(' ')
      return words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            className="animate-fade-in"
            style={{ animationDelay: `${i * delay}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))
    }
    // char mode
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="animate-fade-in"
        style={{ animationDelay: `${i * delay}ms` }}
      >
        {char}
      </span>
    ))
  }

  return (
    <span className={className} aria-live="polite">
      {renderUnits()}
    </span>
  )
}

export default RevealText
