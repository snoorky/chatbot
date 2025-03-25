import { ReactNode } from "react"
import { InteractiveTextProps } from "../models/interfaces"
import { parseInteractiveElements } from "../utils/textParser"

export function InteractiveText({ text }: InteractiveTextProps) {
  const interactiveElements = parseInteractiveElements(text)

  if (interactiveElements.length === 0) return <>{text}</>

  const elements: ReactNode[] = []
  let lastIndex = 0

  interactiveElements.forEach((element, index) => {
    if (element.index > lastIndex) {
      elements.push(<span key={index}>{text.substring(lastIndex, element.index)}</span>)
    }

    const value = element.value
    let href = ''

    switch (element.type) {
      case 'url':
        href = value
        break
      case 'email':
        href = `mailto:${value}`
        break
      case 'phone':
        href = `tel:${value.replace(/[^\d+]/g, '')}`
        break
    }

    elements.push(
      <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={`nyex-chatbot-interactive-${element.type}`}>
        <span className="nyex-chatbot-interactive-icon">{element.displayType}</span>
        <span className="nyex-chatbot-interactive-text">{value}</span>
      </a>
    )

    lastIndex = element.index + element.length
  })

  if (lastIndex < text.length) {
    elements.push(<span key="text-last">{text.substring(lastIndex)}</span>
    )
  }

  return <>{elements}</>
}