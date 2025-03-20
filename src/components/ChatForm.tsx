import { useRef } from "react"

interface Chat {
    role: "user" | "model";
    text: string;
    hideInChat?: boolean;
    isError?: boolean;
  }

interface ChatFormProps {
    chatHistory: Chat[]
    setChatHistory: (value: Chat[] | ((prevState: Chat[]) => Chat[])) => void;
    generateBotresponse: (messages: Chat[]) => void;
}

function ChatForm({ chatHistory, setChatHistory, generateBotresponse }: ChatFormProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const userMessage = inputRef.current?.value.trim() ?? ""

        if (!userMessage) return
        if (inputRef.current) inputRef.current.value = "";

        setChatHistory((history) => [...history, { role: "user", text: userMessage }])

        setTimeout(() => {
            setChatHistory((history) => [...history, { role: "model", text: "..." }])
            generateBotresponse([...chatHistory, {
                role: "user", text: `Usando as informações fornecidas acima, por favor, responda a esta consulta: ${userMessage}`
            }])
        }, 600)
    }

    return (
        <form action="#" className="nyex-chatbot-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" className="nyex-chatbot-input" placeholder="Mensagem..." required />
            <button className="material-symbols-rounded">arrow_upward</button>
        </form>
    )
}

export { ChatForm }