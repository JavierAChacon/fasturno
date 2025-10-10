import { StatusChart } from './components/StatusChart'
import { RevenueThisMonthCard } from './components/Revenue'
import { TopServicesByRevenueCard } from './components/TopServices'
import { HistoricalRevenueCard } from './components/RevenueHistoricalCard'

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-purple-700">Dashboard general</h1>
        <p className="text-muted-foreground text-sm">
          Métricas clave del mes actual y distribución de citas
        </p>
      </div>

      {/* Fila superior */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatusChart />
        <RevenueThisMonthCard />
        <TopServicesByRevenueCard />
      </div>

      <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-1">
        <HistoricalRevenueCard months={6} /> {/* 👈 aquí lo llamas */}
      </div>
    </div>
  )
}
