import { CompoundInterestCalculator } from '../../features/tools/components/CompoundInterestCalculator'
import { SimpleInterestComparator } from '../../features/tools/components/SimpleInterestComparator'
import { FinancialIndependenceSimulator } from '../../features/tools/components/FinancialIndependenceSimulator'
import { GrahamAnalysis } from '../../features/tools/components/GrahamAnalysis'
import { LynchAnalysis } from '../../features/tools/components/LynchAnalysis'
import { BazinAnalysis } from '../../features/tools/components/BazinAnalysis'

export function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ferramentas</h1>
        <p className="mt-1 text-sm text-gray-500">
          Calculadoras e simuladores para planejar seu futuro financeiro.
        </p>
      </div>

      <CompoundInterestCalculator />
      <SimpleInterestComparator />
      <FinancialIndependenceSimulator />
      <GrahamAnalysis />
      <LynchAnalysis />
      <BazinAnalysis />
    </div>
  )
}
