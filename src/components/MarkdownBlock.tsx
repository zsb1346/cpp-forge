import React, { useMemo } from 'react'
import { renderMarkdown } from '../lib/markdown'

interface Props {
  text: string
  className?: string
}

/**
 * 将课程文本按 Markdown 渲染。
 * 支持 **粗体**、`行内代码`、==高亮==、列表、链接、段落等。
 */
const MarkdownBlock: React.FC<Props> = ({ text, className = '' }) => {
  const html = useMemo(() => renderMarkdown(text), [text])

  return (
    <div
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default MarkdownBlock
