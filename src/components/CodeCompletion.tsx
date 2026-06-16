import React, { useRef, useEffect } from 'react'

/* ===== 暴露给父组件的纯函数工具 ===== */

/** 从代码中提取补全令牌（标识符/关键字，去重保留顺序） */
export function extractTokens(code: string): string[] {
  const matches = code.match(/\b[a-zA-Z_]\w*\b/g)
  if (!matches) return []
  return matches.filter((t, i) => matches.indexOf(t) === i)
}

/** 提取光标处的当前单词 */
export function getCurrentWord(text: string, pos: number): string {
  let start = pos
  while (start > 0 && /\w/.test(text[start - 1])) start--
  return text.slice(start, pos)
}

/** 根据当前单词过滤 + 排序补全列表 */
export function filterCompletions(tokens: string[], currentWord: string, max = 12): string[] {
  if (!currentWord || currentWord.length < 1) return []
  const lower = currentWord.toLowerCase()
  return tokens
    .filter(t => t.length > currentWord.length && t.toLowerCase().startsWith(lower))
    .slice(0, max)
}

/* ===== 补全下拉 UI 组件 ===== */

interface Props {
  suggestions: string[]
  selectedIndex: number
  onSelect: (text: string) => void
  onHover: (index: number) => void
  isOpen: boolean
  /** 输入框的 DOM 尺寸，用于计算弹出位置 */
  inputHeight: number
  inputWidth: number
}

const CodeCompletion: React.FC<Props> = ({
  suggestions, selectedIndex, onSelect, onHover, isOpen, inputHeight, inputWidth,
}) => {
  const listRef = useRef<HTMLDivElement>(null)

  // 滚动选中项可见
  useEffect(() => {
    if (!isOpen || !listRef.current) return
    const el = listRef.current.children[selectedIndex] as HTMLElement
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex, isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={listRef}
      style={{
        position: 'absolute',
        left: 0,
        top: inputHeight + 4,
        width: Math.min(inputWidth, 300),
        maxHeight: 260,
      }}
      className="z-50 overflow-y-auto border border-[#3a3347]
        bg-[#1a1723] shadow-xl shadow-black/50 animate-fade-in"
    >
      {suggestions.map((item, i) => (
        <button
          key={item}
          onMouseDown={(e) => { e.preventDefault(); onSelect(item) }}
          onMouseEnter={() => onHover(i)}
          className={`w-full text-left px-3.5 py-1.5 font-mono text-[13px] transition-colors
            ${i === selectedIndex
              ? 'bg-[#2a2538] text-[#ffd866]'
              : 'text-[#c0b9d4] hover:bg-[#221e2e]'
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default CodeCompletion
