import React from 'react'
import { useStore } from '../store/useStore'

// C++ 关键字
const KEYWORDS = new Set([
  'auto', 'bool', 'break', 'case', 'catch', 'char', 'class', 'const',
  'constexpr', 'continue', 'default', 'delete', 'do', 'double', 'else',
  'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for',
  'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace',
  'new', 'noexcept', 'nullptr', 'operator', 'override', 'private',
  'protected', 'public', 'register', 'return', 'short', 'signed',
  'sizeof', 'static', 'struct', 'switch', 'template', 'this', 'throw',
  'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned',
  'using', 'virtual', 'void', 'volatile', 'while',
])

const UE_TYPES = new Set([
  'FString', 'TArray', 'TMap', 'TSet', 'TQueue', 'TSubclassOf',
  'UObject', 'AActor', 'APawn', 'ACharacter', 'UClass', 'UPROPERTY',
  'UFUNCTION', 'int32', 'int64', 'uint8', 'uint32', 'FName', 'FText',
  'FVector', 'FRotator', 'FTransform', 'UE_LOG',
])

const C_TYPES = new Set([
  'int', 'float', 'double', 'char', 'bool', 'void', 'long', 'short',
  'unsigned', 'signed', 'size_t', 'string', 'wchar_t',
])

interface Token { text: string; cls: string }

/** 单遍扫描分词：先抓出每个原子，再决定其后是否紧跟 '(' 以识别函数名 */
function tokenize(code: string): Token[] {
  const atoms: string[] = []
  const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\/\/[^\n]*|\/\*[\s\S]*?\*\/|#\w+|\b[\w]+\b|\s+|[^\w\s])/g
  let m: RegExpExecArray | null
  while ((m = regex.exec(code)) !== null) atoms.push(m[0])

  const tokens: Token[] = []
  for (let i = 0; i < atoms.length; i++) {
    const text = atoms[i]
    let cls = 'tok-plain'

    if (/^\s+$/.test(text)) cls = 'tok-plain'
    else if (text.startsWith('"') || text.startsWith("'")) cls = 'tok-string'
    else if (text.startsWith('//') || text.startsWith('/*')) cls = 'tok-comment'
    else if (text.startsWith('#')) cls = 'tok-keyword'
    else if (/^\d[\d.fFuUlLxXa-fA-F]*$/.test(text)) cls = 'tok-number'
    else if (UE_TYPES.has(text)) cls = 'tok-ue'
    else if (KEYWORDS.has(text)) cls = 'tok-keyword'
    else if (C_TYPES.has(text)) cls = 'tok-type'
    else if (/^[A-Za-z_]\w*$/.test(text)) {
      // 标识符：看下一个非空白原子是否为 '(' → 函数调用
      let j = i + 1
      while (j < atoms.length && /^\s+$/.test(atoms[j])) j++
      cls = atoms[j] === '(' ? 'tok-function' : 'tok-plain'
    } else {
      cls = 'tok-punct'
    }
    tokens.push({ text, cls })
  }
  return tokens
}

interface Props {
  code: string;
  className?: string;
  /** 是否显示顶部窗口栏（红黄绿点） */
  chrome?: boolean;
  /** 文件名标签 */
  filename?: string;
  /** 是否显示字体大小调节按钮 */
  zoomable?: boolean;
  /** 实时字符比对结果（用于 type-it 逐字着色） */
  charMatch?: Array<'correct' | 'incorrect' | 'pending' | 'extra'>;
}

const SyntaxHighlighter: React.FC<Props> = ({ code, className = '', chrome = true, filename, zoomable, charMatch }) => {
  const codeFontSize = useStore(s => s.codeFontSize)
  const setCodeFontSize = useStore(s => s.setCodeFontSize)

  const tokens = tokenize(code)

  /** 建立字符→语法高亮 class 的映射 */
  const charSyntaxMap: string[] = []
  for (const t of tokens) {
    for (const ch of t.text) {
      charSyntaxMap.push(t.cls)
    }
  }

  const content = charMatch
    ? code.split('').map((ch, i) => {
        const state = i < charMatch.length ? charMatch[i] : 'pending'
        const synCls = i < charSyntaxMap.length ? charSyntaxMap[i] : 'tok-plain'

        if (state === 'pending') {
          // 未打到：保留语法高亮颜色
          return <span key={i} className={synCls}>{ch}</span>
        }

        const matchCls = state === 'correct' ? 'text-[#4ade80]'     // 亮绿
          : state === 'incorrect' ? 'text-[#f87171] underline decoration-[#f87171]/60 decoration-2 underline-offset-2'  // 亮红
          : 'text-[#f87171]/50 line-through' // extra - 半透明红

        return <span key={i} className={matchCls}>{ch}</span>
      })
    : tokens.map((t, i) => (
        <span key={i} className={t.cls}>{t.text}</span>
      ))

  return (
    <div className={`gem ${className}`}>
      {chrome && (
        <div className="gem-bar">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[11px] font-mono text-[#8b8499] tracking-wide flex-1">
            {filename || 'main.cpp'}
          </span>
          {zoomable && (
            <div className="flex items-center gap-1.5 mr-1">
              <button
                onClick={() => setCodeFontSize(Math.max(9, codeFontSize - 1))}
                className="w-5 h-5 flex items-center justify-center rounded text-[11px] font-mono
                  text-[#6a6377] hover:text-[#cfc8dd] hover:bg-white/5 transition-colors"
                title="缩小"
              >−</button>
              <span className="text-[10px] font-mono text-[#6a6377] w-5 text-center">{codeFontSize}</span>
              <button
                onClick={() => setCodeFontSize(Math.min(24, codeFontSize + 1))}
                className="w-5 h-5 flex items-center justify-center rounded text-[11px] font-mono
                  text-[#6a6377] hover:text-[#cfc8dd] hover:bg-white/5 transition-colors"
                title="放大"
              >+</button>
            </div>
          )}
        </div>
      )}
      <pre className="gem-body" style={{ fontSize: `${codeFontSize}px` }}><code>{content}</code></pre>
    </div>
  )
}

export default SyntaxHighlighter

/** 内联高亮：段落中嵌入的代码片段（浅色纸面版） */
export const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="px-1.5 py-0.5 mx-0.5 rounded-md bg-ember-tint text-ember-deep font-mono text-[0.85em] font-medium">
    {children}
  </code>
)
