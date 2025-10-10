// src/components/top-services-by-revenue-card.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetTopServicesByRevenueCurrentMonth } from '@/queries/appointment'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const currency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' })

function monthLabel(date = new Date()) {
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
}

export function TopServicesByRevenueCard() {
  const { data = [], isLoading } = useGetTopServicesByRevenueCurrentMonth(5)

  const chartData = data.map((d) => ({
    service: d.service_name,
    revenue: Number(d.revenue) || 0
  }))

  const total = chartData.reduce((acc, d) => acc + d.revenue, 0)
  const topName = chartData[0]?.service

  return (
    <Card className="flex flex-col border border-purple-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-purple-700 md:text-lg">
          Top servicios por revenue — {monthLabel()}
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Citas <strong>Finalizadas</strong> del mes actual
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* KPI / resumen */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-semibold text-purple-600">{currency.format(total)}</div>
            <p className="text-muted-foreground text-xs">Revenue total (top 5)</p>
          </div>
          {topName && (
            <p className="text-muted-foreground text-xs">
              ↑ Más vendido: <span className="font-medium">{topName}</span>
            </p>
          )}
        </div>

        {/* Gráfico horizontal */}
        <div className="h-64 w-full px-2 sm:px-4">
          {isLoading ? (
            <p className="text-muted-foreground mt-10 text-center text-sm">Cargando…</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 8, right: 16, left: 80, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis
                  type="number"
                  tickFormatter={(v) => currency.format(Number(v)).replace('US$', '$')}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="service"
                  width={120} // evita corte de nombres
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: any) => currency.format(Number(value)).replace('US$', '$')}
                  cursor={{ fill: 'rgba(168,85,247,0.08)' }} // purple-500 tenue
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: '#d8b4fe',
                    backgroundColor: 'white'
                  }}
                />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#a855f7" // purple-500
                  radius={[0, 6, 6, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
