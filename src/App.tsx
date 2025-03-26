import { useEffect, useRef, useState } from "react"
import { ChatbotIcon } from "./components/ChatbotIcon"
import { ChatMessage } from "./components/ChatMessage"
import { ChatForm } from "./components/ChatForm"
import { companyInfo } from "./companyInfo"
import { Message } from "./models/interfaces"

export default function App() {
  const [showChatbot, setShowChatbot] = useState<boolean>(false)
  const [chatHistory, setChatHistory] = useState<Message[]>([
    // {
    //   role: "model",
    //   text: companyInfo,
    //   hideInChat: true,
    // },
  ])

  const chatBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [chatHistory])

  return (
    <div className={`chatbot${showChatbot ? " show-chatbot" : ""}`}>

      <button onClick={() => setShowChatbot(prev => !prev)} className="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className="chatbot-popup" role="complementary">

        <div className="chatbot-header">
          <div className="chatbot-info">
            <ChatbotIcon />
            <h2 className="chatbot-name">Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot(prev => !prev)} className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        <div ref={chatBodyRef} className="chatbot-body">
          <div className="chatbot-message chatbot-bot-message">
            <ChatbotIcon />
            <p className="chatbot-message-text">Olá! <br />Como posso te ajudar?</p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} {...chat} />
          ))}
        </div>

        <div className="chatbot-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} />
          <p className="copyright">Developed by <span>Raphael</span></p>
        </div>
      </div>
    </div>
  )
}