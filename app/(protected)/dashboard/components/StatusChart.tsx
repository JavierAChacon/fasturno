'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetAppointmentStatusCounts } from '@/queries/appointment'
import clsx from 'clsx'

const COLORS: Record<string, string> = {
  Pendiente: '#FACC15', // amarillo
  Agendada: '#3B82F6', // azul
  Cancelada: '#EF4444', // rojo
  Finalizada: '#22C55E' // verde
}

export function StatusChart() {
  const { data: statusCounts = [], isLoading } = useGetAppointmentStatusCounts()

  const data = (statusCounts || []).map((d: { status: string; count: number }) => ({
    name: d.status,
    value: Number(d.count) || 0,
    fill: COLORS[d.status] ?? '#e5e7eb'
  }))

  const total = data.reduce((acc, d) => acc + d.value, 0)
  const pct = (v: number) => (total ? Math.round((v / total) * 100) : 0)

  // ordena para que el tooltip/leyenda salgan en orden consistente
  const ordered = ['Finalizada', 'Agendada', 'Pendiente', 'Cancelada']
    .map((k) => data.find((d) => d.name === k))
    .filter(Boolean) as typeof data

  return (
    <Card className="flex flex-col border border-purple-200 shadow-sm">
      <CardHeader className="pb-1">
        <CardTitle className="text-base font-semibold text-purple-700 md:text-lg">
          Status de Citas
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Distribución de estados en el período seleccionado
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-[1fr]">
        {isLoading ? (
          <p className="text-muted-foreground mt-6 text-center text-sm">Cargando…</p>
        ) : (
          <>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    formatter={(value: any, name: any) => {
                      const v = Number(value) || 0
                      return [`${v} (${pct(v)}%)`, name]
                    }}
                    cursor={{ fill: 'rgba(168,85,247,0.08)' }} // purple-500 tenue
                    contentStyle={{
                      borderRadius: 8,
                      borderColor: '#d8b4fe',
                      backgroundColor: 'white'
                    }}
                  />
                  <Pie
                    data={ordered}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={110}
                    startAngle={90}
                    endAngle={-270}
                    stroke="#fff"
                    strokeWidth={2}
                    labelLine={false}
                  >
                    {/* Centro: “Total” (arriba) */}
                    <Label
                      value="Total"
                      position="center"
                      dy={-10}
                      fill="#6b7280" // text-muted-foreground
                      fontSize={12}
                    />
                    {/* Centro: número total (abajo) */}
                    <Label
                      value={String(total)}
                      position="center"
                      dy={12}
                      fill="#a855f7" // purple-500
                      fontSize={20}
                      fontWeight="600"
                    />

                    {ordered.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Leyenda tipo pill */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ordered.map((d) => (
                <div
                  key={d.name}
                  className={clsx(
                    'flex items-center justify-center gap-2 rounded-full border px-3 py-1.5',
                    'border-purple-200 bg-white'
                  )}
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: d.fill }}
                  />
                  <span className="text-muted-foreground text-xs">{d.name}</span>
                  <span className="text-xs font-medium">{pct(d.value)}%</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
