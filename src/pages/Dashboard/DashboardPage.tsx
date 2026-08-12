import { EmptyState } from '../../components/ui/EmptyState'
import { useDashboardData } from '../../features/dashboard/hooks/useDashboardData'
import { FinancialSummary } from '../../features/dashboard/components/FinancialSummary'
import { EvolutionChart } from '../../features/dashboard/components/EvolutionChart'
import { ExpenseChart } from '../../features/dashboard/components/ExpenseChart'
import { GoalsProgress } from '../../features/dashboard/components/GoalsProgress'
import { FinancialInsights } from '../../features/dashboard/components/FinancialInsights'

export function DashboardPage() {
  const {
    transactions,
    goals,
    receitaTotal,
    despesaTotal,
    saldo,
    taxaPoupanca,
    temDados,
  } = useDashboardData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visão geral da sua situação financeira.
        </p>
      </div>

      <FinancialSummary
        receita={receitaTotal}
        despesa={despesaTotal}
        saldo={saldo}
        taxaPoupanca={taxaPoupanca}
      />

      {temDados ? (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <EvolutionChart transactions={transactions} />
            <ExpenseChart transactions={transactions} />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <GoalsProgress goals={goals} />
            <FinancialInsights
              transactions={transactions}
              goals={goals}
              taxaPoupanca={taxaPoupanca}
              receitaTotal={receitaTotal}
              despesaTotal={despesaTotal}
            />
          </div>
        </>
      ) : (
        <EmptyState
          icon={
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
          title="Nenhum dado financeiro ainda"
          description="Registre suas receitas e despesas na seção de Finanças para ver seu dashboard ganhar vida."
        />
      )}
    </div>
  )
}
