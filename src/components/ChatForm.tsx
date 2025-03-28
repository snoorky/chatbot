import { useRef } from "react"
import { Forms } from "../models/interfaces"
import { AIResponseService } from "../services/AIResponse"
import { ArrowUp } from "lucide-react"

export function ChatForm({ chatHistory, setChatHistory }: Forms) {
    const inputRef = useRef<HTMLInputElement>(null)
    const aiResponseService = new AIResponseService()

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const userMessage = inputRef.current?.value.trim() ?? ""

        if (!userMessage) return
        if (inputRef.current) inputRef.current.value = ""

        setChatHistory((history) => [...history, { role: "user", text: userMessage }])

        setTimeout(async () => {
            setChatHistory((history) => [...history, { role: "model", text: "..." }])
            try {
                const response = await aiResponseService.generateResponse([...chatHistory, {
                    role: "user", text: `${userMessage}`
                }])
                setChatHistory(prevHistory => [...prevHistory.filter(message => message.text != "..."), response])
            } catch (error) {
                console.error("Erro ao gerar a resposta:", error)
                setChatHistory(prevHistory => [...prevHistory.filter(message => message.text != "..."), {
                    role: "model",
                    text: (error as Error).message,
                    isError: true
                }])
            }
        }, 600)
    }

    return (
        <form action="#" className="chatbot-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" className="chatbot-input" placeholder="Mensagem..." required />
            <button><ArrowUp /></button>
        </form>
    )
}