import type { TransactionFormData } from '../types'

export type ValidationErrors = Partial<
  Record<keyof TransactionFormData, string>
>

export function validarTransacao(data: TransactionFormData): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.descricao.trim()) {
    errors.descricao = 'A descrição é obrigatória.'
  }

  const valor = Number.parseFloat(
    data.valor.replace(/[^\d,.-]/g, '').replace(',', '.'),
  )
  if (!data.valor || Number.isNaN(valor) || valor <= 0) {
    errors.valor = 'Informe um valor válido maior que zero.'
  }

  if (!data.categoria) {
    errors.categoria = 'Selecione uma categoria.'
  }

  if (!data.data) {
    errors.data = 'A data é obrigatória.'
  }

  return errors
}

export function temErros(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0
}
