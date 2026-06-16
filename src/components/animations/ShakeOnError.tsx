import React, { useState, useEffect, useRef } from 'react'

interface ShakeOnErrorProps {
  children: React.ReactNode
  trigger: boolean
  className?: string
}

/**
 * ShakeOnError — trigger 变为 true 时执行一次水平抖动动画（约 400ms），
 * 用于输入错误、校验失败等场景的即时反馈。
 */
const ShakeOnError: React.FC<ShakeOnErrorProps> = ({
  children,
  trigger,
  className = '',
}) => {
  const [shaking, setShaking] = useState(false)
  const prevTriggerRef = useRef(trigger)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // 仅在 trigger 从 false → true 时触发
    if (trigger && !prevTriggerRef.current) {
      setShaking(true)

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setShaking(false)
        timerRef.current = null
      }, 400)
    }
    prevTriggerRef.current = trigger

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [trigger])

  return (
    <span className={`${shaking ? 'animate-shake' : ''} ${className}`}>
      {children}
    </span>
  )
}

export default ShakeOnError
