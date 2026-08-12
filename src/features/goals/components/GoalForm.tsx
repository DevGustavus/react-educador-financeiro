import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Modal } from '../../../components/ui/Modal'
import type { FinancialGoal } from '../../../types'

const emptyForm = {
  nome: '',
  valorAlvo: '',
  valorAtual: '',
  prazo: new Date().toISOString().slice(0, 10),
}

interface Props {
  open: boolean
  onClose: () => void
  onSave: (goal: FinancialGoal) => void
  editing?: FinancialGoal | null
}

export function GoalForm({ open, onClose, onSave, editing }: Props) {
  const [form, setForm] = useState(
    editing
      ? {
          nome: editing.nome,
          valorAlvo: String(editing.valorAlvo),
          valorAtual: String(editing.valorAtual),
          prazo: editing.prazo,
        }
      : emptyForm,
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      id: editing?.id ?? crypto.randomUUID(),
      nome: form.nome.trim(),
      valorAlvo: Number(form.valorAlvo),
      valorAtual: Number(form.valorAtual),
      prazo: form.prazo,
      criadaEm: editing?.criadaEm ?? new Date().toISOString(),
    })

    setForm(emptyForm)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? 'Editar Meta' : 'Nova Meta'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nome da Meta"
          placeholder="Ex: Comprar um carro"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <Input
          label="Valor Alvo (R$)"
          type="number"
          step="0.01"
          value={form.valorAlvo}
          onChange={(e) => setForm({ ...form, valorAlvo: e.target.value })}
        />
        <Input
          label="Valor Atual (R$)"
          type="number"
          step="0.01"
          value={form.valorAtual}
          onChange={(e) => setForm({ ...form, valorAtual: e.target.value })}
        />
        <Input
          label="Prazo"
          type="date"
          value={form.prazo}
          onChange={(e) => setForm({ ...form, prazo: e.target.value })}
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{editing ? 'Salvar' : 'Adicionar'}</Button>
        </div>
      </form>
    </Modal>
  )
}
