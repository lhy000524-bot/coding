import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export function PriceChartSkeleton() {
  return <div className="mt-6 h-64 w-full animate-pulse rounded-xl bg-slate-200" />
}

export default function PriceChart({ graph, currency }) {
  if (!graph || graph.length === 0) {
    return (
      <div className="mt-6 flex h-64 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm text-slate-400">
        차트 데이터가 없습니다.
      </div>
    )
  }

  const data = graph.map((point) => ({
    date: point.date,
    price: point.price,
  }))

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => (v ? String(v).slice(5, 16) : '')}
            minTickGap={40}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            domain={['auto', 'auto']}
            width={64}
            tickFormatter={(v) => v.toLocaleString()}
          />
          <Tooltip
            formatter={(value) => [`${value?.toLocaleString()} ${currency ?? ''}`, '가격']}
            labelFormatter={(label) => label}
          />
          <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
