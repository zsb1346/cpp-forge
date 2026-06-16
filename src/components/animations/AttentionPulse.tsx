import React, { useState, useEffect, useRef } from 'react'

interface AttentionPulseProps {
  children: React.ReactNode
  interval?: number
  className?: string
}

/**
 * AttentionPulse — 按固定间隔对子元素施加一次柔和的发光脉冲。
 * 通过切换 shadow-ember 配合 transition 实现"呼吸"感。
 */
const AttentionPulse: React.FC<AttentionPulseProps> = ({
  children,
  interval = 3000,
  className = '',
}) => {
  const [isPulsing, setIsPulsing] = useState(false)
  const cancelledRef = useRef(false)

  useEffect(() => {
    cancelledRef.current = false

    const pulse = () => {
      if (cancelledRef.current) return
      setIsPulsing(true)
      setTimeout(() => {
        if (!cancelledRef.current) setIsPulsing(false)
      }, 1500) // 脉冲持续时长
    }

    const timer = setInterval(pulse, interval)
    return () => {
      cancelledRef.current = true
      clearInterval(timer)
    }
  }, [interval])

  return (
    <span
      className={`inline-block transition-shadow duration-700 ease-in-out ${
        isPulsing ? 'shadow-ember' : 'shadow-none'
      } ${className}`}
    >
      {children}
    </span>
  )
}

export default AttentionPulse
