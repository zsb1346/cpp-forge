/* ============================
   SceneElementRenderer
   根据 SceneElement.type 分发到对应渲染组件
   ============================ */

import React from 'react'
import type { InterpolatedElement } from '../../types/animated-timeline'
import SceneCode from './SceneCode'
import SceneTable from './SceneTable'
import SceneText from './SceneText'
import SceneCard from './SceneCard'
import SceneHighlight from './SceneHighlight'
import SceneArrow from './SceneArrow'
import SceneGroup from './SceneGroup'

interface Props {
  interpolated: InterpolatedElement
}

const SceneElementRenderer: React.FC<Props> = ({ interpolated }) => {
  const { element, morphProgress, state } = interpolated

  switch (element.type) {
    case 'code':
      return <SceneCode key={element.id} element={element} morphProgress={morphProgress} state={state} />
    case 'table':
      return <SceneTable key={element.id} element={element} morphProgress={morphProgress} state={state} />
    case 'text':
      return <SceneText key={element.id} element={element} morphProgress={morphProgress} state={state} />
    case 'card':
      return <SceneCard key={element.id} element={element} morphProgress={morphProgress} state={state} />
    case 'highlight':
      return <SceneHighlight key={element.id} element={element} morphProgress={morphProgress} state={state} />
    case 'arrow':
      return <SceneArrow key={element.id} element={element} morphProgress={morphProgress} state={state} />
    case 'group':
      return <SceneGroup key={element.id} element={element} morphProgress={morphProgress} state={state} />
    default:
      return null
  }
}

export default SceneElementRenderer
