import { Message } from "../models/interfaces"
import { ChatbotIcon } from "./ChatbotIcon"
import { InteractiveText } from "./InteractiveText"

export function ChatMessage(chat: Message) {
    return (
        !chat.hideInChat && (
            <div className={`nyex-chatbot-message nyex-chatbot-${chat.role === "model" ? "bot" : "user"}-message${chat.isError ? " error" : ""}`}>
                {chat.role === "model" && <ChatbotIcon />}
                <p className="nyex-chatbot-message-text"><InteractiveText text={chat.text} /></p>
            </div>
        )
    )
}