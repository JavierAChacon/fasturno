'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetRevenueForCurrentMonth } from '@/queries/appointment'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const currency = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

function monthLabel(date = new Date()) {
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
}

export function RevenueThisMonthCard() {
  const { data = [], isLoading } = useGetRevenueForCurrentMonth()

  const chartData = data.map((d) => ({
    day: new Date(d.bucket).toLocaleDateString('es-ES', { day: '2-digit' }),
    revenue: Number(d.revenue) || 0
  }))

  const total = chartData.reduce((acc, d) => acc + d.revenue, 0)

  return (
    <Card className="flex flex-col border border-purple-200 shadow-sm">
      <CardHeader className="pb-1 text-center">
        <CardTitle className="text-base font-semibold text-purple-700 md:text-lg">
          Revenue de {monthLabel()}
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Suma de servicios de citas <strong>Finalizadas</strong> por día
        </p>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        {/* KPI */}
        <div className="text-center">
          <p className="text-4xl font-bold text-purple-600">{currency.format(total)}</p>
          <p className="text-muted-foreground mt-1 text-xs">Total del mes en curso</p>
        </div>

        {/* Gráfico */}
        <div className="h-64 w-full px-2 sm:px-4">
          {isLoading ? (
            <p className="text-muted-foreground mt-10 text-center text-sm">Cargando…</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis
                  tickFormatter={(v) => currency.format(v).replace('US$', '$')}
                  tick={{ fontSize: 12 }}
                  width={60} // evita que los labels se corten
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip
                  formatter={(value: any) => currency.format(Number(value)).replace('US$', '$')}
                  labelFormatter={(label) => `Día ${label}`}
                  cursor={{ fill: 'rgba(168,85,247,0.1)' }} // tono de purple transparente
                  contentStyle={{
                    borderRadius: '8px',
                    borderColor: '#d8b4fe',
                    backgroundColor: 'white'
                  }}
                />
                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#a855f7" // purple-500
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
