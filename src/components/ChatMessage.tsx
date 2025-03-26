import { Message } from "../models/interfaces"
import { ChatbotIcon } from "./ChatbotIcon"

export function ChatMessage(chat: Message) {
    return (
        !chat.hideInChat && (
            <div className={`chatbot-message chatbot-${chat.role === "model" ? "bot" : "user"}-message${chat.isError ? " error" : ""}`}>
                {chat.role === "model" && <ChatbotIcon />}
                <p className="chatbot-message-text">{chat.text}</p>
            </div>
        )
    )
}