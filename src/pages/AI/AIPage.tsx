import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useAIChat } from '../../features/ai/hooks/useAIChat'
import { AIChatMessages } from '../../features/ai/components/AIChatMessages'
import { AIChatInput } from '../../features/ai/components/AIChatInput'
import { AIChatHistory } from '../../features/ai/components/AIChatHistory'

export function AIPage() {
  const {
    messages,
    status,
    error,
    sessions,
    sendMessage,
    newChat,
    loadSession,
    deleteSession,
  } = useAIChat()

  const loading = status === 'loading'

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir esta conversa?')) {
      deleteSession(id)
    }
  }

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
          <Button variant="ghost" onClick={newChat} disabled={loading}>
            Nova conversa
          </Button>
        )}
      </div>

      <Card className="flex min-h-[500px] flex-col">
        <div className="flex-1">
          <AIChatMessages
            messages={messages}
            loading={loading}
            onSuggestion={sendMessage}
          />
        </div>

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

        <div className="mt-4 border-t border-gray-100 pt-4">
          <AIChatInput onSend={sendMessage} disabled={loading} />
          <p className="mt-2 text-xs text-gray-400">
            As respostas são geradas com finalidade educacional. Não constituem
            consultoria financeira.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Conversas</CardTitle>
        </CardHeader>
        <AIChatHistory
          sessions={sessions}
          onLoad={loadSession}
          onDelete={handleDelete}
          disabled={loading}
        />
      </Card>
    </div>
  )
}
