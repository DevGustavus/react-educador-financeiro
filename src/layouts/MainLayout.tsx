import { Outlet } from 'react-router-dom'
import { Header } from '../components/layout/Header'

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 overflow-auto p-4 pt-20 lg:p-8 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
