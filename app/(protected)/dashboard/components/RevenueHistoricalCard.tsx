'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetRevenueLastMonths } from '@/queries/appointment'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

const currency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' })

/** Formato "oct", "nov", etc. */
function monthShort(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', { month: 'short' })
}

export function HistoricalRevenueCard({ months = 6 }: { months?: number }) {
  const { data = [], isLoading } = useGetRevenueLastMonths(months)

  // Normaliza y ordena por fecha por si el backend devuelve desordenado
  const chartData = [...data]
    .sort((a, b) => new Date(a.month_bucket).getTime() - new Date(b.month_bucket).getTime())
    .map((p) => ({
      month: monthShort(p.month_bucket),
      revenue: Number(p.revenue) || 0
    }))

  const thisMonth = chartData.at(-1)?.revenue ?? 0
  const prevMonth = chartData.at(-2)?.revenue ?? 0
  const delta = prevMonth ? ((thisMonth - prevMonth) / prevMonth) * 100 : 0
  const deltaLabel = `${delta >= 0 ? '↑' : '↓'} ${Math.abs(Math.round(delta))}% vs mes anterior`

  return (
    <Card className="flex flex-col border border-purple-200 shadow-sm">
      <CardHeader className="pb-1">
        <CardTitle className="text-base font-semibold text-purple-700 md:text-lg">
          Revenue últimos {months} meses
        </CardTitle>
        <p className="text-muted-foreground text-sm">Comparativo mensual</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* KPI */}
        <div className="flex items-baseline gap-3">
          <div className="text-2xl font-semibold text-purple-600">{currency.format(thisMonth)}</div>
          <div className={`text-sm ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {deltaLabel}
          </div>
        </div>

        {/* Gráfico */}
        <div className="h-64 w-full">
          {isLoading ? (
            <p className="text-muted-foreground mt-10 text-center text-sm">Cargando…</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 12, left: 12, bottom: 10 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => currency.format(Number(v)).replace('US$', '$')}
                  tick={{ fontSize: 12 }}
                  width={70}
                />
                <Tooltip
                  formatter={(v: any) => currency.format(Number(v)).replace('US$', '$')}
                  labelFormatter={(label) => `Mes: ${label}`}
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: '#d8b4fe',
                    backgroundColor: 'white'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#a855f7" // purple-500
                  fill="url(#revGrad)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
