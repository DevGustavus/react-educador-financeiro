import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { FinanceProvider } from './contexts/FinanceContext'
import { runMigrations } from './services/storage/migrations'

runMigrations()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </StrictMode>,
)
