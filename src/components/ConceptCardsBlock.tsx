import React, { useState, useEffect } from 'react'
import type { ConceptCardsBlock as ConceptCardsBlockType } from '../types/protocol'
import { useStore } from '../store/useStore'
import { InlineCode } from './SyntaxHighlighter'
import MarkdownBlock from './MarkdownBlock'
import { ArrowRightIcon, StarIcon } from './icons'

interface Props {
  block: ConceptCardsBlockType;
}

/**
 * 概念卡：一组术语卡，逐张点开"翻面"看含义。
 * 全部看过后自动标记完成 —— 像多邻国快速建立词汇概念。
 */
const ConceptCardsBlock: React.FC<Props> = ({ block }) => {
  const [seen, setSeen] = useState<Set<number>>(new Set())
  const { setBlockCompleted } = useStore()

  useEffect(() => {
    setSeen(new Set())
  }, [block.instruction])

  const reveal = (i: number) => {
    setSeen(prev => {
      const next = new Set(prev)
      next.add(i)
      if (next.size === block.cards.length) setBlockCompleted(true)
      return next
    })
  }

  const allSeen = seen.size === block.cards.length

  return (
    <div className="block-card">
      <div className="flex items-center justify-between mb-2">
        <span className="pill-gold">概念卡</span>
        <span className="text-xs text-ink-faint font-mono">
          {seen.size}/{block.cards.length}
        </span>
      </div>

      <MarkdownBlock text={block.instruction} className="text-ink-soft text-[15px] mb-6" />

      <div className="grid sm:grid-cols-2 gap-3.5">
        {block.cards.map((card, i) => {
          const open = seen.has(i)
          return (
            <button
              key={i}
              onClick={() => reveal(i)}
              className={`group text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300
                animate-pop
                ${open
                  ? 'border-gold/40 bg-gold-tint/50 shadow-paper'
                  : 'border-paper-line bg-paper-sunk hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-paper cursor-pointer'
                }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                {card.glyph && (
                  <span className="text-2xl leading-none" aria-hidden>{card.glyph}</span>
                )}
                <code className="font-mono font-bold text-[17px] text-ember-deep">
                  {card.term}
                </code>
              </div>

              {open ? (
                <div className="animate-fade-in">
                  <MarkdownBlock text={card.meaning} className="text-sm text-ink leading-relaxed" />
                  {card.example && (
                    <div className="mt-2.5 font-mono text-[12.5px] text-ink-soft bg-paper-raised border border-paper-line rounded-lg px-2.5 py-1.5">
                      {card.example}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-ink-faint italic group-hover:text-gold transition-colors">
                   点击翻面 <ArrowRightIcon size={12} />
                </p>
              )}
            </button>
          )
        })}
      </div>

      {allSeen && (
        <p className="mt-6 text-sm text-sage font-medium flex items-center gap-2 animate-fade-in">
          <span><StarIcon size={14} filled className="text-sage" /></span> 这一组概念你已经全部认过了
        </p>
      )}
    </div>
  )
}

export default ConceptCardsBlock
