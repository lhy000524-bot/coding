import { useEffect, useState } from 'react'

export default function MarketSummary() {
  const [markets, setMarkets] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/finance/markets?trend=indexes')
        const body = await res.json()
        if (!res.ok) throw new Error(body.error || '마켓 요약을 불러오지 못했습니다.')
        if (!cancelled) setMarkets(body)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-200" />
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-xs text-slate-400">마켓 요약을 불러올 수 없습니다: {error}</p>
  }

  const indexes = markets?.market_trends ?? markets?.indexes ?? []

  if (!indexes.length) return null

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-slate-500">주요 지수</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {indexes.slice(0, 8).map((idx) => {
          const isUp = idx.price_movement?.movement === 'Up'
          const isDown = idx.price_movement?.movement === 'Down'
          const color = isUp ? 'text-emerald-600' : isDown ? 'text-red-600' : 'text-slate-500'
          return (
            <div key={idx.stock ?? idx.name} className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="truncate text-xs text-slate-500">{idx.name}</p>
              <p className="mt-1 text-sm font-semibold">{idx.price?.toLocaleString?.() ?? idx.extracted_price}</p>
              {idx.price_movement && (
                <p className={`text-xs font-medium ${color}`}>
                  {isUp ? '+' : isDown ? '-' : ''}
                  {Math.abs(idx.price_movement.percentage).toFixed(2)}%
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
