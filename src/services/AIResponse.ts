import { Message, UseCase } from "../models/interfaces"
import { ApiConfig } from "./Api"

export class AIResponseService implements UseCase {
  async generateResponse(history: Message[]): Promise<Message> {
    const formattedHistory = history.map(({ role, text }) => ({ role, parts: [{ text }] }))

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    }

    try {
      const response = await fetch(ApiConfig.API_URL, requestOptions)
      const data = await response.json()

      if (!response.ok) throw new Error(data.error?.message || "Algo deu errado!")

      const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim()
      return { role: "model", text: apiResponse }
    } catch (error) {
      return { role: "model", text: (error as Error).message, isError: true }
    }
  }
}