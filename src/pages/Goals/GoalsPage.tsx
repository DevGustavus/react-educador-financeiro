import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useGoals } from '../../features/goals/hooks/useGoals'
import { GoalList } from '../../features/goals/components/GoalList'
import { GoalForm } from '../../features/goals/components/GoalForm'
import type { FinancialGoal } from '../../types'

export function GoalsPage() {
  const { goals, addGoal, updateGoal, removeGoal } = useGoals()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<FinancialGoal | null>(null)

  const handleEdit = (g: FinancialGoal) => {
    setEditing(g)
    setFormOpen(true)
  }

  const handleSave = (g: FinancialGoal) => {
    if (editing) {
      updateGoal(g)
    } else {
      addGoal(g)
    }
    setEditing(null)
  }

  const handleClose = () => {
    setFormOpen(false)
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir esta meta?')) {
      removeGoal(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Metas Financeiras
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Defina e acompanhe seus objetivos financeiros.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>Nova Meta</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Minhas Metas</CardTitle>
        </CardHeader>
        <GoalList goals={goals} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>

      <GoalForm
        key={editing?.id ?? 'novo'}
        open={formOpen}
        onClose={handleClose}
        onSave={handleSave}
        editing={editing}
      />
    </div>
  )
}
