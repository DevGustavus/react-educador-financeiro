import { Sidebar } from './Sidebar'

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 lg:px-6">
      <Sidebar />
      <div className="flex flex-1 items-center justify-end gap-4">
        <span className="text-sm text-gray-500">Educador Financeiro</span>
      </div>
    </header>
  )
}
