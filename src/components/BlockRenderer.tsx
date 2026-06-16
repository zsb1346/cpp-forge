import React from 'react'
import type { Block } from '../types/protocol'
import ExpositionBlock from './ExpositionBlock'
import ConceptCardsBlock from './ConceptCardsBlock'
import TypeItBlock from './TypeItBlock'
import MultipleChoiceBlock from './MultipleChoiceBlock'
import MatchBlocksBlock from './MatchBlocksBlock'
import FillInBlock from './FillInBlock'
import CodeRunnerBlock from './CodeRunnerBlock'

interface Props {
  block: Block;
  onBlockComplete: () => void;
}

const BlockRenderer: React.FC<Props> = ({ block, onBlockComplete }) => {
  switch (block.type) {
    case 'exposition':
      return <ExpositionBlock block={block} onComplete={onBlockComplete} />
    case 'concept-cards':
      return <ConceptCardsBlock block={block} />
    case 'type-it':
      return <TypeItBlock block={block} />
    case 'multiple-choice':
      return <MultipleChoiceBlock block={block} />
    case 'match-blocks':
      return <MatchBlocksBlock block={block} />
    case 'fill-in':
      return <FillInBlock block={block} />
    case 'code-runner':
      return <CodeRunnerBlock block={block} onComplete={onBlockComplete} />
      return (
        <div className="block-card">
          <p className="text-clay text-sm">未知的 Block 类型</p>
        </div>
      )
  }
}

export default BlockRenderer
