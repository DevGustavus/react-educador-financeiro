import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useAIChat } from '../../features/ai/hooks/useAIChat'
import { AIChatMessages } from '../../features/ai/components/AIChatMessages'
import { AIChatInput } from '../../features/ai/components/AIChatInput'

export function AIPage() {
  const { messages, status, error, sendMessage, clearChat } = useAIChat()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">IA Educadora</h1>
          <p className="mt-1 text-sm text-gray-500">
            Converse com nosso assistente financeiro para tirar dúvidas e
            receber orientações educacionais.
          </p>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" onClick={clearChat}>
            Limpar conversa
          </Button>
        )}
      </div>

      <Card className="flex min-h-[500px] flex-col">
        <div className="flex-1">
          <AIChatMessages messages={messages} loading={status === 'loading'} />
        </div>

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        <div className="mt-4 border-t border-gray-100 pt-4">
          <AIChatInput onSend={sendMessage} disabled={status === 'loading'} />
          <p className="mt-2 text-xs text-gray-400">
            As respostas são geradas com finalidade educacional. Não constituem
            consultoria financeira.
          </p>
        </div>
      </Card>
    </div>
  )
}
