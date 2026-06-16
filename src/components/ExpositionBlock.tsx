import React from 'react'
import type { ExpositionBlock as ExpositionBlockType } from '../types/protocol'
import SyntaxHighlighter from './SyntaxHighlighter'
import MarkdownBlock from './MarkdownBlock'
import { TypewriterText, RevealText } from './animations'

interface Props {
  block: ExpositionBlockType;
  onComplete: () => void;
}

const ExpositionBlock: React.FC<Props> = ({ block, onComplete }) => {
  /** 根据 textAnimation 选择渲染方式 */
  const renderBody = () => {
    if (block.textAnimation === 'typewriter') {
      return (
        <div className="title-serif text-ink text-[22px] sm:text-[26px] leading-[1.5] font-medium text-balance">
          <TypewriterText text={block.text} onComplete={onComplete} />
        </div>
      )
    }

    if (block.textAnimation === 'reveal') {
      return (
        <div className="title-serif text-ink text-[22px] sm:text-[26px] leading-[1.5] font-medium text-balance">
          <RevealText text={block.text} onComplete={onComplete} />
        </div>
      )
    }

    return (
      <MarkdownBlock
        text={block.text}
        className="title-serif text-ink text-[22px] sm:text-[26px] leading-[1.5] font-medium text-balance"
      />
    )
  }

  return (
    <div className="block-card">
      <span className="pill-ember mb-6">概念</span>

      {renderBody()}

      {block.code && (
        <div className="mt-7">
          <SyntaxHighlighter code={block.code} zoomable />
        </div>
      )}
    </div>
  )
}

export default ExpositionBlock
