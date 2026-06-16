import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import type { TypeItBlock as TypeItBlockType } from '../types/protocol'
import { useStore } from '../store/useStore'
import SyntaxHighlighter from './SyntaxHighlighter'
import CodeCompletion, { extractTokens, getCurrentWord, filterCompletions } from './CodeCompletion'

interface Props {
  block: TypeItBlockType;
}

const norm = (s: string, exact?: boolean) =>
  exact ? s : s.trim().replace(/\s+/g, ' ')

/** 逐字比对：根据用户输入返回每个目标字符的状态 */
function matchChars(target: string, typed: string): Array<'correct' | 'incorrect' | 'pending' | 'extra'> {
  const len = Math.max(target.length, typed.length)
  const result: Array<'correct' | 'incorrect' | 'pending' | 'extra'> = []
  for (let i = 0; i < len; i++) {
    if (i >= target.length) {
      result.push('extra')
    } else if (i >= typed.length) {
      result.push('pending')
    } else if (target[i] === typed[i]) {
      result.push('correct')
    } else {
      result.push('incorrect')
    }
  }
  return result
}

const TypeItBlock: React.FC<Props> = ({ block }) => {
  const [input, setInput] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showHints, setShowHints] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { blockFeedback, setBlockFeedback, setBlockCompleted, codeFontSize, setCodeFontSize,
    codeCompletionEnabled, toggleCodeCompletion } = useStore()

  // 代码补全状态
  const [cursorPos, setCursorPos] = useState(0)
  const [completionDismissed, setCompletionDismissed] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const charMatch = useMemo(() => matchChars(block.code, input), [block.code, input])

  // 提取补全令牌
  const tokens = useMemo(() => extractTokens(block.code), [block.code])
  const currentWord = useMemo(() => getCurrentWord(input, cursorPos), [input, cursorPos])
  const suggestions = useMemo(
    () => codeCompletionEnabled && !completionDismissed
      ? filterCompletions(tokens, currentWord)
      : [],
    [tokens, currentWord, codeCompletionEnabled, completionDismissed]
  )

  // 重置状态（换课/换 block）
  useEffect(() => {
    setInput(''); setRevealed(false); setAttempts(0); setShowHints(false)
    setCompletionDismissed(false); setSelectedIndex(0); setCursorPos(0)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }, [block.code])

  // 判断是否完全一致
  const isExactMatch = useMemo(
    () => norm(input, block.exactMatch) === norm(block.code, block.exactMatch),
    [input, block.code, block.exactMatch]
  )

  // 补全：插入选中项
  const insertCompletion = useCallback((text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return
    const pos = textarea.selectionStart
    // 找当前单词起始
    let start = pos
    while (start > 0 && /\w/.test(input[start - 1])) start--
    const newInput = input.slice(0, start) + text + input.slice(pos)
    setInput(newInput)
    setCompletionDismissed(true)
    setSelectedIndex(0)
    // 光标移到补全末尾
    setTimeout(() => {
      const cp = start + text.length
      textarea.setSelectionRange(cp, cp)
      textarea.focus()
    }, 0)
  }, [input])

  // 补全：键盘导航
  const handleCompletionKey = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
    if (suggestions.length === 0) return false
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, suggestions.length - 1)); return true
      case 'ArrowUp':
        e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); return true
      case 'Tab':
      case 'Enter':
        if (suggestions[selectedIndex]) {
          e.preventDefault()
          insertCompletion(suggestions[selectedIndex])
          return true
        }
        return false
      case 'Escape':
        e.preventDefault()
        setCompletionDismissed(true)
        setSelectedIndex(0)
        return true
    }
    return false
  }, [suggestions, selectedIndex, insertCompletion])

  const submit = () => {
    if (!input.trim()) return
    setAttempts(a => a + 1)
    if (isExactMatch) {
      setBlockFeedback('correct'); setBlockCompleted(true)
    } else {
      setBlockFeedback('incorrect')
    }
  }

  const reveal = () => {
    setRevealed(true); setInput(block.code)
    setBlockFeedback('correct'); setBlockCompleted(true)
  }

  const done = blockFeedback === 'correct'

  return (
    <div className="block-card">
      <span className="pill-ember mb-5">跟着敲</span>
      <p className="text-ink text-[15px] mb-5 leading-relaxed">{block.instruction}</p>

      {/* 范本（深色宝石岛，带逐字着色） */}
      <SyntaxHighlighter code={block.code} filename="范本" charMatch={done ? undefined : charMatch} zoomable />

      {/* 输入区 */}
      <div className="relative" ref={containerRef}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-mono text-ink-faint">你的代码</span>
          <div className="flex items-center gap-1.5">
            {/* 代码补全开关 */}
            <span
              onClick={toggleCodeCompletion}
              className={`cursor-pointer select-none text-[10px] font-mono tracking-wider uppercase
                transition-colors ${codeCompletionEnabled
                  ? 'text-ember font-bold'
                  : 'text-ink-ghost hover:text-ink-faint'}`}
              title="代码补全"
            >
              Tab{codeCompletionEnabled ? ' ✓' : ''}
            </span>
            <span className="text-paper-line mx-0.5 select-none">|</span>
            <button
              onClick={() => setCodeFontSize(Math.max(9, codeFontSize - 1))}
              className="w-5 h-5 flex items-center justify-center rounded text-[11px] font-mono
                text-ink-ghost hover:text-ink-faint hover:bg-paper-sunk transition-colors"
              title="缩小"
            >−</button>
            <span className="text-[10px] font-mono text-ink-ghost w-5 text-center">{codeFontSize}</span>
            <button
              onClick={() => setCodeFontSize(Math.min(24, codeFontSize + 1))}
              className="w-5 h-5 flex items-center justify-center rounded text-[11px] font-mono
                text-ink-ghost hover:text-ink-faint hover:bg-paper-sunk transition-colors"
              title="放大"
            >+</button>
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={input}
          disabled={done}
          onChange={(e) => {
            setInput(e.target.value)
            setCursorPos(e.target.selectionStart)
            setCompletionDismissed(false)
            setSelectedIndex(0)
            if (blockFeedback) setBlockFeedback(null)
          }}
          onKeyDown={(e) => {
            if (handleCompletionKey(e)) return
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submit()
          }}
          placeholder="在这里把上面的代码敲一遍…"
          style={{ fontSize: `${codeFontSize}px` }}
          className={`field min-h-[96px] resize-none transition-colors
            ${blockFeedback === 'incorrect' ? 'border-clay animate-shake' : ''}
            ${done ? 'border-sage bg-sage-tint/40' : ''}`}
          spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
        />
        {/* 代码补全下拉 */}
        {!done && (
          <CodeCompletion
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSelect={insertCompletion}
            onHover={setSelectedIndex}
            isOpen={suggestions.length > 0}
            inputHeight={textareaRef.current?.offsetHeight ?? 96}
            inputWidth={textareaRef.current?.offsetWidth ?? 400}
          />
        )}
      </div>

      {/* 反馈 */}
      {done && (
        <p className="mt-4 text-sm font-semibold text-sage flex items-center gap-2 animate-fade-in">
          <span className="text-base">✓</span> 一字不差，漂亮
        </p>
      )}
      {blockFeedback === 'incorrect' && (
        <div className="mt-4 animate-fade-in">
          <p className="text-sm text-clay flex items-center gap-2">
            <span>✕</span> 还有些出入，对照范本再看看
          </p>
          {attempts >= 2 && !revealed && (
            <button onClick={reveal} className="mt-2 text-xs text-ink-faint hover:text-ember underline underline-offset-2">
              直接显示正确答案
            </button>
          )}
        </div>
      )}

      {/* 提示 */}
      {block.hints.length > 0 && (
        <div className="mt-5">
          <button onClick={() => setShowHints(v => !v)} className="btn-text">
            <span className="text-gold">💡</span>
            {showHints ? '收起提示' : '需要提示？'}
          </button>
          {showHints && (
            <ul className="mt-2.5 space-y-1.5 animate-fade-in">
              {block.hints.map((h, i) => (
                <li key={i} className="text-[13px] text-ink-soft flex gap-2">
                  <span className="text-gold mt-0.5">·</span><span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 操作 */}
      <div className="flex items-center gap-3 mt-6">
        <button onClick={submit} disabled={!input.trim() || done} className="btn-primary">
          {done ? '✓ 已通过' : '检查答案'}
        </button>
        <span className="text-xs text-ink-ghost font-mono">Ctrl + Enter</span>
      </div>
    </div>
  )
}

export default TypeItBlock
