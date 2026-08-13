import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MarkdownContent } from './MarkdownContent'

describe('MarkdownContent', () => {
  it('renderiza negrito, títulos, listas e tabelas GFM', () => {
    const md = [
      '## Passos',
      '1. **Reserva** de emergência',
      '- Tesouro Selic',
      '',
      '| Tipo | Risco |',
      '| --- | --- |',
      '| CDB | Baixo |',
    ].join('\n')

    render(<MarkdownContent content={md} />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Passos',
    )
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Reserva')
    expect(screen.getByRole('strong')).toHaveTextContent('Reserva')
    expect(screen.getAllByRole('list')[1]).toHaveTextContent('Tesouro Selic')
    expect(screen.getByRole('table')).toHaveTextContent('CDB')
    expect(screen.getByRole('cell', { name: 'CDB' })).toBeInTheDocument()
  })

  it('não injeta HTML bruto', () => {
    render(<MarkdownContent content="<script>alert('xss')</script>" />)
    expect(screen.queryByRole('script')).toBeNull()
  })
})
