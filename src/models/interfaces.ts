export interface Message {
    role: "user" | "model",
    text: string,
    hideInChat?: boolean,
    isError?: boolean,
}

export interface Forms {
    chatHistory: Message[]
    setChatHistory: (value: Message[] | ((prevState: Message[]) => Message[])) => void
}

export interface UseCase {
    generateResponse(chatHistory: Message[]): Promise<Message>
}

export interface InteractiveTextProps {
    text: string
}