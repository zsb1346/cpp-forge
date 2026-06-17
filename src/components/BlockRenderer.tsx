import React from 'react'
import type { Block } from '../types/protocol'
import ExpositionBlock from './ExpositionBlock'
import ConceptCardsBlock from './ConceptCardsBlock'
import TypeItBlock from './TypeItBlock'
import MultipleChoiceBlock from './MultipleChoiceBlock'
import MatchBlocksBlock from './MatchBlocksBlock'
import FillInBlock from './FillInBlock'
import CodeRunnerBlock from './CodeRunnerBlock'
import {
  PredictOutputBlock,
  TraceStateBlock,
  FixCodeBlock,
  ChooseNextLineBlock,
  CompareSnippetsBlock,
  SceneBlock,
  MemoryVisualizerBlock,
  FlowVisualizerBlock,
  ScrollNarrativeBlock,
} from './blocks'
import AnimationTimelineBlock from './animation/AnimationTimelineBlock'

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
    case 'predict-output':
      return <PredictOutputBlock block={block} />
    case 'trace-state':
      return <TraceStateBlock block={block} />
    case 'fix-code':
      return <FixCodeBlock block={block} />
    case 'choose-next-line':
      return <ChooseNextLineBlock block={block} />
    case 'compare-snippets':
      return <CompareSnippetsBlock block={block} />
    case 'scene':
      return <SceneBlock block={block} />
    case 'memory-visualizer':
      return <MemoryVisualizerBlock block={block} />
    case 'flow-visualizer':
      return <FlowVisualizerBlock block={block} />
    case 'scroll-narrative':
      return <ScrollNarrativeBlock block={block} />
    case 'animated-timeline':
      return <AnimationTimelineBlock block={block} onComplete={onBlockComplete} />
    default:
      return (
        <div className="block-card">
          <p className="text-clay text-sm">未知的 Block 类型</p>
        </div>
      )
  }
}

export default BlockRenderer
