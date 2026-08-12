import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { Modal } from '../../../components/ui/Modal'
import { RECEITA_CATEGORIAS, DESPESA_CATEGORIAS } from '../constants'
import { validarTransacao, temErros } from '../utils/validation'
import type { Transaction } from '../../../types'
import type { TransactionFormData } from '../types'

function formasVazias(): TransactionFormData {
  return {
    descricao: '',
    valor: '',
    tipo: 'despesa',
    categoria: 'outros',
    data: new Date().toISOString().slice(0, 10),
    observacao: '',
  }
}

interface Props {
  open: boolean
  onClose: () => void
  onSave: (t: Transaction) => void
  editing?: Transaction | null
}

export function TransactionForm({ open, onClose, onSave, editing }: Props) {
  const [form, setForm] = useState<TransactionFormData>(
    editing
      ? {
          descricao: editing.descricao,
          valor: String(editing.valor),
          tipo: editing.tipo,
          categoria: editing.categoria,
          data: editing.data,
          observacao: editing.observacao ?? '',
        }
      : formasVazias(),
  )
  const [errors, setErrors] = useState<
    Partial<Record<keyof TransactionFormData, string>>
  >({})

  const handleChange = <K extends keyof TransactionFormData>(
    key: K,
    value: TransactionFormData[K],
  ) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'tipo') {
        next.categoria = value === 'receita' ? 'salario' : 'outros'
      }
      return next
    })
    setErrors((prev) => {
      const copy = { ...prev }
      delete copy[key]
      return copy
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validarTransacao(form)
    if (temErros(errs)) {
      setErrors(errs)
      return
    }

    const valor = Number.parseFloat(
      form.valor.replace(/[^\d,.-]/g, '').replace(',', '.'),
    )

    onSave({
      id: editing?.id ?? crypto.randomUUID(),
      descricao: form.descricao.trim(),
      valor,
      tipo: form.tipo,
      categoria: form.categoria,
      data: form.data,
      observacao: form.observacao.trim() || undefined,
    })

    setForm(formasVazias())
    setErrors({})
    onClose()
  }

  const categorias =
    form.tipo === 'receita' ? RECEITA_CATEGORIAS : DESPESA_CATEGORIAS

  const categoriaOptions = Object.entries(categorias).map(([value]) => ({
    value,
    label: categorias[value as keyof typeof categorias],
  }))

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? 'Editar Transação' : 'Nova Transação'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tipo"
              value="receita"
              checked={form.tipo === 'receita'}
              onChange={() => handleChange('tipo', 'receita')}
              className="text-emerald-600"
            />
            <span className="text-sm text-gray-700">Receita</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tipo"
              value="despesa"
              checked={form.tipo === 'despesa'}
              onChange={() => handleChange('tipo', 'despesa')}
              className="text-emerald-600"
            />
            <span className="text-sm text-gray-700">Despesa</span>
          </label>
        </div>

        <Input
          id="descricao"
          label="Descrição"
          placeholder="Ex: Supermercado do mês"
          value={form.descricao}
          onChange={(e) => handleChange('descricao', e.target.value)}
          error={errors.descricao}
        />

        <Input
          id="valor"
          label="Valor"
          placeholder="0,00"
          value={form.valor}
          onChange={(e) => handleChange('valor', e.target.value)}
          error={errors.valor}
          icon={<span>R$</span>}
        />

        <Select
          id="categoria"
          label="Categoria"
          options={categoriaOptions}
          value={form.categoria}
          onChange={(e) =>
            handleChange(
              'categoria',
              e.target.value as TransactionFormData['categoria'],
            )
          }
          error={errors.categoria}
        />

        <Input
          id="data"
          label="Data"
          type="date"
          value={form.data}
          onChange={(e) => handleChange('data', e.target.value)}
          error={errors.data}
        />

        <Input
          id="observacao"
          label="Observação"
          placeholder="Opcional"
          value={form.observacao}
          onChange={(e) => handleChange('observacao', e.target.value)}
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
