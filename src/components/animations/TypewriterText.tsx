import React, { useState, useEffect, useRef } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

/**
 * TypewriterText — 逐字打出文本，末尾带闪烁光标。
 * 打字完成后光标消失，调用 onComplete。
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

  useEffect(() => {
    // 重置状态
    setDisplayedChars(0)
    setShowCursor(true)
    cancelledRef.current = false

    // 空文本或 speed <= 0 → 立即显示全部
    if (!text || speed <= 0) {
      setDisplayedChars(text?.length ?? 0)
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

      if (charIndex < text.length) {
        const t = setTimeout(typeNext, speed)
        timers.push(t)
      } else {
        // 全部打完
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

  return (
    <span className={className} aria-live="polite">
      {text.slice(0, displayedChars)}
      {showCursor && (
        <span
          className="inline-block w-[2px] h-[1em] bg-ember animate-pulse ml-0.5 align-middle"
          aria-hidden="true"
        />
      )}
    </span>
  )
}

export default TypewriterText
