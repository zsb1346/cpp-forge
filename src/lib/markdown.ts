import { marked } from 'marked'

/* =================================================================
   marked 扩展：==高亮== 语法
   作者在课程文本中用 ==词== 包裹，渲染为 <mark> 标签，
   配合 CSS 产生类似 WPS "突出显示"的背景涂色效果。
   ================================================================= */

const highlightExtension = {
  name: 'highlight',
  level: 'inline' as const,
  start(src: string) {
    const idx = src.indexOf('==')
    // 跳过 === （可能来自代码中的比较运算符）
    if (idx >= 0 && src[idx + 2] === '=') return -1
    return idx
  },
  tokenizer(src: string) {
    const match = src.match(/^==([^=]+?)==(?!\n)/)
    if (match) {
      return {
        type: 'highlight',
        raw: match[0],
        text: match[1],
        tokens: [],
      }
    }
  },
  renderer(token: { text: string }) {
    return `<mark>${marked.parseInline(token.text, { async: false }) as string}</mark>`
  },
}

// 注册扩展（全局生效，对所有 import 该模块的地方可见）
marked.use({ extensions: [highlightExtension] })

/* =================================================================
   共享的 Markdown 渲染函数
   所有组件统一调用此函数，确保渲染逻辑一致。
   ================================================================= */

function createRenderer() {
  const renderer = new marked.Renderer()

  // 链接在新标签页打开
  renderer.link = ({ href, title, text: linkText }) => {
    const t = title ? ` title="${title}"` : ''
    return `<a href="${href}" target="_blank" rel="noopener noreferrer"${t}>${linkText}</a>`
  }

  return renderer
}

export function renderMarkdown(text: string): string {
  return marked.parse(text, {
    async: false,
    renderer: createRenderer(),
    breaks: true,
    gfm: true,
  }) as string
}
