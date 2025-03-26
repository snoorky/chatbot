import { Message } from "../models/interfaces"
import { ChatbotIcon } from "./ChatbotIcon"
import ReactMarkdown from "react-markdown"

export function ChatMessage(chat: Message) {
    return (
        !chat.hideInChat && (
            <div className={`chatbot-message chatbot-${chat.role === "model" ? "bot" : "user"}-message${chat.isError ? " error" : ""}`}>
                {chat.role === "model" && <ChatbotIcon />}
                <div className="chatbot-message-text">
                    <ReactMarkdown>{chat.text}</ReactMarkdown>
                </div>
            </div>
        )
    )
}