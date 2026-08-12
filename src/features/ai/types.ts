export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export type AIChatStatus = 'idle' | 'loading' | 'error'

export interface AIChatState {
  messages: AIMessage[]
  status: AIChatStatus
  error: string | null
}
