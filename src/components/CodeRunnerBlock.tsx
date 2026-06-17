import React, { useState, useCallback, useEffect, useRef } from 'react'
import type { CodeRunnerBlock as CodeRunnerBlockType } from '../types/protocol'
import { useStore } from '../store/useStore'
import SyntaxHighlighter from './SyntaxHighlighter'
import { preloader, getRunner } from '../runner'
import type { RunResult } from '../runner'
import { PlayIcon, CheckIcon, IncorrectIcon, WarningIcon, XCircleIcon } from './icons'
import MarkdownBlock from './MarkdownBlock'
import { compareOutput } from '../lib/compareOutput'

interface Props {
  block: CodeRunnerBlockType
  onComplete: () => void
}

type RunState = 'idle' | 'preparing' | 'compiling' | 'running' | 'done'

/** 检测代码是否包含需要标准输入的操作 */
function needsInput(code: string): boolean {
  // 跳过注释和字符串字面量中的匹配
  const clean = code
    .replace(/\/\/.*$/gm, '')       // 行注释
    .replace(/\/\*[\s\S]*?\*\//g, '') // 块注释
    .replace(/".*?"/g, '')           // 字符串
    .replace(/'.*?'/g, '')           // 字符
  return /\b(std::)?cin\b/.test(clean) ||
    /\bscanf\b/.test(clean) ||
    /\bfgets\b/.test(clean) ||
    /\bgetline\b/.test(clean) ||
    /\bgetchar\b/.test(clean) ||
    /\bgets\b/.test(clean) ||
    /\b(std::)?getline\b/.test(clean)
}

const CodeRunnerBlock: React.FC<Props> = ({ block, onComplete }) => {
  const [code, setCode] = useState(block.code)
  const [runState, setRunState] = useState<RunState>('idle')
  const [result, setResult] = useState<RunResult | null>(null)
  const [preloadProgress, setPreloadProgress] = useState(0)
  const [outputExpanded, setOutputExpanded] = useState(false)
  const [showInputModal, setShowInputModal] = useState(false)
  const [pendingInput, setPendingInput] = useState('')
  const [pendingResolver, setPendingResolver] = useState<((v: string) => void) | null>(null)
  const codeFontSize = useStore(s => s.codeFontSize)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const language = block.language ?? 'cpp'
  const comparison = block.comparison ?? 'trimmed'
  const editable = block.editable ?? true
  const showOutput = result !== null
  const codeChanged = code !== block.code

  // 重置状态（换 block 时）
  useEffect(() => {
    setCode(block.code)
    setRunState('idle')
    setResult(null)
    setOutputExpanded(false)
    setShowInputModal(false)
  }, [block.code])

  // 监听预下载进度
  useEffect(() => {
    const unsub = preloader.onProgress(setPreloadProgress)
    preloader.start()
    return unsub
  }, [])

  // 输入弹窗打开时自动聚焦
  useEffect(() => {
    if (showInputModal && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInputModal])

  // 输出比对
  const outputMatch = useCallback((): boolean => {
    if (!result || !block.expectedOutput) return true
    return compareOutput(result.stdout, block.expectedOutput, comparison)
  }, [result, block.expectedOutput, comparison])

  // 比对描述文案
  const comparisonLabel = useCallback((): string | null => {
    if (!block.expectedOutput) return null
    if (!result) return null
    if (outputMatch()) return '输出正确'
    return '输出与预期不符'
  }, [block.expectedOutput, result, outputMatch])

  /** 实际执行运行 */
  const doRun = useCallback(async (stdin: string) => {
    setRunState('preparing')
    setResult(null)
    setOutputExpanded(true)

    try {
      setRunState('compiling')
      const runner = await getRunner(language)
      const t0 = performance.now()

      setRunState('running')
      const res = await runner.run({
        code,
        stdin,
        timeout: 15_000,
      })

      res.executionTimeMs = Math.round(performance.now() - t0)
      setResult(res)
      setRunState('done')

      // 如果有 expectedOutput 且匹配成功，标记完成
      if (block.expectedOutput && block.comparison !== 'none') {
        if (res.success && compareOutput(res.stdout, block.expectedOutput, comparison)) {
          setTimeout(() => onComplete(), 800)
        }
      } else if (res.success) {
        setTimeout(() => onComplete(), 800)
      }
    } catch (err: any) {
      setResult({
        stdout: '',
        stderr: err?.message ?? String(err),
        exitCode: 1,
        success: false,
        executionTimeMs: 0,
        timedOut: false,
      })
      setRunState('done')
    }
  }, [code, language, block.expectedOutput, block.comparison, comparison, onComplete])

  /** 点击"运行"：检测是否需要输入，需要则弹窗 */
  const handleRun = useCallback(() => {
    if (needsInput(code)) {
      setPendingInput('')
      setShowInputModal(true)
    } else {
      doRun('')
    }
  }, [code, doRun])

  /** 弹窗确认输入 */
  const handleInputConfirm = useCallback(() => {
    setShowInputModal(false)
    doRun(pendingInput)
  }, [pendingInput, doRun])

  /** 弹窗取消 */
  const handleInputCancel = useCallback(() => {
    setShowInputModal(false)
  }, [])

  /** 弹窗键盘事件：Enter 确认，Esc 取消 */
  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleInputConfirm()
    } else if (e.key === 'Escape') {
      handleInputCancel()
    }
  }, [handleInputConfirm, handleInputCancel])

  /** 代码编辑区键盘事件：Tab 缩进，Ctrl+Enter 运行 */
  const handleTextareaKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter → 运行
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      if (runState === 'idle' || runState === 'done') handleRun()
      return
    }

    // Tab → 插入空格（无补全状态时）
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = e.currentTarget
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const before = code.slice(0, start)
      const after = code.slice(end)

      if (e.shiftKey) {
        // Shift+Tab：向前缩进（删除前导 2 空格）
        const lineStart = before.lastIndexOf('\n') + 1
        const line = before.slice(lineStart)
        if (line.startsWith('  ')) {
          const newBefore = before.slice(0, lineStart) + line.slice(2)
          const newCode = newBefore + after
          setCode(newCode)
          // 光标位置不变但少了 2 个字符
          requestAnimationFrame(() => {
            ta.selectionStart = ta.selectionEnd = start - 2
          })
        }
      } else {
        // Tab：插入 2 个空格
        const newCode = before + '  ' + after
        setCode(newCode)
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2
        })
      }
      setResult(null)
      setRunState('idle')
    }
  }, [code, runState, handleRun])

  const isRunning = runState === 'preparing' || runState === 'compiling' || runState === 'running'

  return (
    <div className="block-card">
      <span className="pill-gold mb-5">运行</span>
      <MarkdownBlock text={block.instruction} className="text-ink text-[15px] mb-5 leading-relaxed" />

      {/* 代码展示 / 编辑区 */}
      {editable ? (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono text-ink-faint">代码</span>
            <span className="text-[10px] font-mono text-ink-ghost">Ctrl+Enter 运行</span>
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => { setCode(e.target.value); setResult(null); setRunState('idle') }}
            onKeyDown={handleTextareaKeyDown}
            disabled={isRunning}
            style={{ fontSize: `${codeFontSize}px` }}
            className="field min-h-[120px] resize-y font-mono"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      ) : (
        <div className="mb-4">
          <SyntaxHighlighter code={code} filename={`main.${language === 'c' ? 'c' : 'cpp'}`} chrome zoomable />
        </div>
      )}

      {/* 预下载进度（仅下载中显示） */}
      {!preloader.done && (
        <div className="mb-4 p-3 rounded-xl bg-paper-sunk border border-paper-line animate-fade-in">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-ink-faint font-medium">准备 C++ 编译环境…</span>
            <span className="text-[11px] font-mono text-ink-ghost">{preloadProgress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-paper-line overflow-hidden">
            <div
              className="h-full rounded-full bg-ember transition-all duration-500"
              style={{ width: `${preloadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 运行按钮 */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleRun}
          disabled={isRunning || !code.trim()}
          className="btn-primary"
        >
          {isRunning ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-paper-raised border-t-transparent rounded-full animate-spin" />
              {runState === 'preparing' ? '准备中…' : runState === 'compiling' ? '编译中…' : '运行中…'}
            </>
          ) : (
            <>
              <PlayIcon size={18} /> 运行
            </>
          )}
        </button>
        {codeChanged && (
          <button
            onClick={() => { setCode(block.code); setResult(null); setRunState('idle') }}
            className="text-xs text-ink-faint hover:text-ember underline underline-offset-2"
          >
            重置
          </button>
        )}
      </div>

      {/* 输出区 */}
      {showOutput && result && (
        <div className="animate-fade-in">
          <button
            onClick={() => setOutputExpanded(v => !v)}
            className="flex items-center gap-2 text-sm font-semibold text-ink mb-2"
          >
                <span className={`transition-transform ${outputExpanded ? 'rotate-90' : ''}`}><PlayIcon size={10} /></span>
            输出
          </button>

          {outputExpanded && (
            <div className="space-y-3">
              {/* stdout */}
              <div className="gem">
                <div className="gem-bar">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 text-[11px] font-mono text-[#8b8499] tracking-wide">标准输出</span>
                  <span className="ml-auto text-[10px] font-mono text-[#6a6377]">{result.executionTimeMs}ms</span>
                </div>
                <pre className="gem-body" style={{ fontSize: `${codeFontSize}px` }}>
                  <code className="tok-plain">
                    {result.stdout || (result.success ? <span className="tok-comment">（无输出）</span> : '')}
                    {result.stderr && !result.success ? (
                      <span className="tok-comment">{'\n'}{result.stderr}</span>
                    ) : null}
                    {result.timedOut && <span className="text-[#ff8585]">{'\n'}<WarningIcon size={14} /> 执行超时</span>}
                  </code>
                </pre>
              </div>

              {/* 退出码 */}
              <div className="flex items-center gap-2 text-xs text-ink-faint break-all">
                退出码: <code className="font-mono text-ink">{result.exitCode}</code>
              </div>

              {/* 预期输出比对 */}
              {block.expectedOutput && block.comparison !== 'none' && (
                <div className={`p-4 rounded-2xl border ${
                  outputMatch()
                    ? 'bg-sage-tint border-sage/30'
                    : 'bg-clay-tint border-clay/30'
                }`}>
                  <p className={`text-sm font-semibold flex items-center gap-2 ${
                    outputMatch() ? 'text-sage' : 'text-clay'
                  }`}>
                    {outputMatch() ? <CheckIcon size={18} /> : <IncorrectIcon size={18} />}
                    {comparisonLabel()}
                  </p>
                  {!outputMatch() && (
                    <div className="mt-2 space-y-1 text-[13px]">
                      <div className="flex items-center gap-2">
                        <span className="text-ink-faint">期望</span>
                        <pre className="font-mono text-sage bg-sage-tint/50 px-2 py-0.5 rounded">{block.expectedOutput}</pre>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-ink-faint">实际</span>
                        <pre className="font-mono text-clay bg-clay-tint/50 px-2 py-0.5 rounded">{result.stdout || '(空)'}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========== 输入弹窗 ========== */}
      {showInputModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-paper-raised rounded-2xl shadow-2xl border border-paper-line w-full max-w-lg mx-3 sm:mx-4 overflow-hidden">
            {/* 弹窗标题 */}
            <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-2 sm:pb-3">
              <h3 className="text-sm sm:text-base font-bold text-ink">程序需要输入</h3>
              <button
                onClick={handleInputCancel}
                className="w-7 h-7 flex items-center justify-center rounded-full text-ink-faint hover:text-ink hover:bg-paper-sunk transition-colors"
              >
                <XCircleIcon size={16} />
              </button>
            </div>

            {/* 输入区 */}
            <div className="px-4 sm:px-5 pb-3 sm:pb-4">
              <textarea
                ref={inputRef}
                value={pendingInput}
                onChange={(e) => setPendingInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="在这里输入…"
                className="field font-mono text-sm w-full min-h-[80px] resize-y"
                spellCheck={false}
              />
              <p className="text-[11px] text-ink-ghost mt-1.5">
                Enter 确认 · Shift+Enter 换行 · Esc 取消
              </p>
            </div>

            {/* 按钮栏 */}
            <div className="flex items-center justify-end gap-2 px-4 sm:px-5 py-3 bg-paper-sunk border-t border-paper-line">
              <button
                onClick={handleInputCancel}
                className="px-4 py-2 text-sm font-medium text-ink-faint hover:text-ink rounded-xl hover:bg-paper-line transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleInputConfirm}
                className="btn-primary text-sm"
              >
                确认运行
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeRunnerBlock
