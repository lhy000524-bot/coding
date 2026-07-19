export function StockCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="h-4 w-1/3 rounded bg-slate-200" />
      <div className="mt-3 h-8 w-1/2 rounded bg-slate-200" />
      <div className="mt-4 h-4 w-1/4 rounded bg-slate-200" />
    </div>
  )
}

export default function StockCard({ summary }) {
  if (!summary) return null

  const {
    title,
    stock,
    exchange,
    extracted_price: price,
    currency,
    price_movement: movement,
  } = summary

  const isUp = movement?.movement === 'Up'
  const isDown = movement?.movement === 'Down'
  const movementColor = isUp ? 'text-emerald-600' : isDown ? 'text-red-600' : 'text-slate-500'
  const sign = isUp ? '+' : isDown ? '-' : ''

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">
            {stock} · {exchange}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end gap-3">
        <span className="text-3xl font-bold tabular-nums">
          {price?.toLocaleString()} {currency}
        </span>
        {movement && (
          <span className={`text-sm font-medium tabular-nums ${movementColor}`}>
            {sign}
            {Math.abs(movement.value).toLocaleString()} ({sign}
            {Math.abs(movement.percentage).toFixed(2)}%)
          </span>
        )}
      </div>
    </div>
  )
}
