import React, { useMemo } from 'react'
import { marked } from 'marked'

interface Props {
  text: string
  className?: string
}

/**
 * 将课程文本按 Markdown 渲染。
 * 支持 **粗体**、`行内代码`、列表、链接、段落等。
 */
const MarkdownBlock: React.FC<Props> = ({ text, className = '' }) => {
  const html = useMemo(() => {
    const renderer = new marked.Renderer()

    // 链接在新标签页打开
    renderer.link = ({ href, title, text: linkText }) => {
      const t = title ? ` title="${title}"` : ''
      return `<a href="${href}" target="_blank" rel="noopener noreferrer"${t}>${linkText}</a>`
    }

    return marked.parse(text, {
      async: false,
      renderer,
      breaks: true,
      gfm: true,
    }) as string
  }, [text])

  return (
    <div
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default MarkdownBlock
