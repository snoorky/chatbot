import { useEffect, useRef, useState } from "react"
import { ChatbotIcon } from "./components/ChatbotIcon"
import { ChatMessage } from "./components/ChatMessage"
import { ChatForm } from "./components/ChatForm"
import { companyInfo } from "./companyInfo"
import { Message } from "./models/interfaces"

export default function App() {
  const [showChatbot, setShowChatbot] = useState<boolean>(false)
  const [chatHistory, setChatHistory] = useState<Message[]>([])

  const chatBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [chatHistory])

  return (
    <div className={`nyex-chatbot${showChatbot ? " show-chatbot" : ""}`}>

      <button onClick={() => setShowChatbot(prev => !prev)} className="nyex-chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className="nyex-chatbot-popup" role="complementary">

        <div className="nyex-chatbot-header">
          <div className="nyex-chatbot-info">
            <ChatbotIcon />
            <h2 className="nyex-chatbot-name">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(prev => !prev)} className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        <div ref={chatBodyRef} className="nyex-chatbot-body">
          <div className="nyex-chatbot-message nyex-chatbot-bot-message">
            <ChatbotIcon />
            <p className="nyex-chatbot-message-text">Olá! <br />Como posso te ajudar?</p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} {...chat} />
          ))}
        </div>

        <div className="nyex-chatbot-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} />
          <p className="nyex-copyright">Developed by <span>Raphael</span></p>
        </div>
      </div>
    </div>
  )
}