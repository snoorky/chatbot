import { ChatbotIcon } from "./ChatbotIcon"

interface ChatMessageProps {
    chat: {
        role: "user" | "model"
        text: string
        hideInChat?: boolean
        isError?: boolean
    }
}

function ChatMessage({ chat }: ChatMessageProps) {
    return (
        !chat.hideInChat && (
            <div className={`nyex-chatbot-message nyex-chatbot-${chat.role === "model" ? "bot" : "user"}-message${chat.isError ? " error" : ""}`}>
                {chat.role === "model" && <ChatbotIcon />}
                <p className="nyex-chatbot-message-text">{chat.text}</p>
            </div>
        )
    )
}

export { ChatMessage }