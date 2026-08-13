export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface AIChatSession {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messages: AIMessage[]
}

export type AIChatStatus = 'idle' | 'loading' | 'error'

export interface AIChatState {
  messages: AIMessage[]
  status: AIChatStatus
  error: string | null
}
