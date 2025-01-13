'use client'
import { memo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import RemarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@/components/ui/button'

interface MarkdownProps {
  content: string
}
function AMarkdown(params: MarkdownProps) {
  const { content } = params
  const [show, setShow] = useState<Record<string, boolean>>({})

  const handleShow = (key: string) => {
    if (typeof key !== 'string' || key.trim() === '') {
      console.warn('Invalid key provided')
      return
    }

    setShow((prevShow) => {
      const isNewKey = !(key in prevShow)
      return {
        ...prevShow,
        [key]: isNewKey ? true : !prevShow[key],
      }
    })
  }

  const base64Encode = (str: string) => {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
      })
    )
  }

  return (
    <ReactMarkdown
      remarkPlugins={[RemarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')
          const key = base64Encode(children as string).slice(0, 10)
          if (match) {
            return (
              <>
                <Button
                  onClick={() => {
                    handleShow(key)
                  }}
                >
                  {show[key] !== false ? '隐藏代码' : '显示代码'}
                </Button>
                {show[key] !== false ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={dark}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : null}
              </>
            )
          } else {
            return (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          }
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default memo(AMarkdown)
