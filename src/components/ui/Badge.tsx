import type { ReactNode } from 'react'

export type BadgeColor =
  | 'emerald'
  | 'blue'
  | 'amber'
  | 'red'
  | 'purple'
  | 'gray'
  | 'pink'
  | 'cyan'
  | 'indigo'

interface BadgeProps {
  children: ReactNode
  color?: BadgeColor
  className?: string
}

const colorStyles: Record<BadgeColor, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  blue: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  red: 'bg-red-50 text-red-700 ring-red-600/20',
  purple: 'bg-purple-50 text-purple-700 ring-purple-600/20',
  gray: 'bg-gray-50 text-gray-600 ring-gray-500/20',
  pink: 'bg-pink-50 text-pink-700 ring-pink-600/20',
  cyan: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
}

export function Badge({
  children,
  color = 'gray',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colorStyles[color]} ${className}`}
    >
      {children}
    </span>
  )
}
