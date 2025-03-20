import { useEffect, useRef, useState } from "react"
import { ChatbotIcon } from "./components/ChatbotIcon"
import { ChatMessage } from "./components/ChatMessage"
import { ChatForm } from "./components/ChatForm"
import { companyInfo } from "./companyInfo"

interface ChatMessage {
  role: "user" | "model"
  text: string
  hideInChat?: boolean
  isError?: boolean
}

function App() {
  const [showChatbot, setShowChatbot] = useState<boolean>(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "model",
      text: companyInfo,
      hideInChat: true,
    },
  ])

  const chatBodyRef = useRef<HTMLDivElement>(null)

  const generateBotResponse = async (history: ChatMessage[]) => {
    const updateHistory = (response: string, isError: boolean = false) => {
      setChatHistory(history => [...history.filter(message => message.text != "..."), { role: "model", text: response, isError }])
    }

    const formattedHistory = history.map(({ role, text }) => ({ role, parts: [{ text }] }))

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions)
      const data = await response.json()

      if (!response.ok) throw new Error(data.error?.message || "Algo deu errado!")

      const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim()
      updateHistory(apiResponse)
    } catch (error) {
      updateHistory((error as Error).message, true)
    }
  }

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
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="nyex-chatbot-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotresponse={generateBotResponse} />
          <p className="nyex-copyright">Developed by <span>Raphael</span></p>
        </div>
      </div>
    </div>
  )
}

export default App