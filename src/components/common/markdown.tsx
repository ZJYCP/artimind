import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import RemarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownProps {
  content: string
}
function AMarkdown(params: MarkdownProps) {
  const { content } = params
  return (
    <ReactMarkdown
      remarkPlugins={[RemarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match[1]}
              style={dark}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default memo(AMarkdown)
