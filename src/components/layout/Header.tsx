interface HeaderProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onToggleMenu: () => void
}

export function Header({
  collapsed,
  onToggleCollapse,
  onToggleMenu,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 lg:px-6">
      <button
        onClick={onToggleMenu}
        className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        aria-label="Abrir menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <button
        onClick={onToggleCollapse}
        className="hidden cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:block"
        aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
      >
        <svg
          className={`h-6 w-6 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex flex-1 items-center justify-end gap-4">
        <span className="text-sm text-gray-500">Educador Financeiro</span>
      </div>
    </header>
  )
}
