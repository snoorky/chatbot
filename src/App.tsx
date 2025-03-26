import { useEffect, useRef, useState } from "react"
import { ChatbotIcon } from "./components/ChatbotIcon"
import { ChatMessage } from "./components/ChatMessage"
import { ChatForm } from "./components/ChatForm"
import companyInfoData from './companyInfo.json'
import { Message } from "./models/interfaces"
import ReactMarkdown from "react-markdown"
import { MessageCircle, X, ChevronDown } from "lucide-react"

export default function App() {
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const [showChatbot, setShowChatbot] = useState<boolean>(false)
  const [chatHistory, setChatHistory] = useState<Message[]>([{
    role: "model",
    text: JSON.stringify(companyInfoData),
    hideInChat: true,
  },])

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [chatHistory])

  return (
    <div className={`chatbot${showChatbot ? " show-chatbot" : ""}`}>

      <button onClick={() => setShowChatbot(prev => !prev)} className="chatbot-toggler">
        <span><MessageCircle /></span>
        <span><X /></span>
      </button>

      <div className="chatbot-popup" role="complementary">

        <div className="chatbot-header">
          <div className="chatbot-info">
            <ChatbotIcon />
            <h2 className="chatbot-name">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(prev => !prev)}><ChevronDown /></button>
        </div>

        <div ref={chatBodyRef} className="chatbot-body">
          <div className="chatbot-message chatbot-bot-message">
            <ChatbotIcon />
            <div className="chatbot-message-text">
              <ReactMarkdown>Olá! Como posso te ajudar?</ReactMarkdown>
            </div>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} {...chat} />
          ))}
        </div>

        <div className="chatbot-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} />
          <p className="copyright">Desenvolvido por <span>Raphael</span></p>
        </div>
      </div>
    </div>
  )
}