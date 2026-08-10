import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'Get started' }),
    ).toBeInTheDocument()
  })

  it('renders the counter and increments on click', async () => {
    render(<App />)
    const buttons = screen.getAllByRole('button', { name: /Count is/ })
    expect(buttons[0]).toBeInTheDocument()

    await userEvent.click(buttons[0])
    expect(buttons[0]).toHaveTextContent('Count is 1')
  })
})
