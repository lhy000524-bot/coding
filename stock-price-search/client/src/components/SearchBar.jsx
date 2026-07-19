import { useState } from 'react'
import { resolveQuery, isKnownName } from '../data/tickerMap.js'

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    onSearch(resolveQuery(input))
  }

  const showGuide = input.trim() && !isKnownName(input) && !input.includes(':')

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="회사명 또는 티커:거래소 (예: 애플, AAPL:NASDAQ, 005930:KRX)"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? '검색 중...' : '검색'}
        </button>
      </div>
      {showGuide && (
        <p className="mt-2 text-xs text-amber-600">
          매핑되지 않은 종목명입니다. &quot;티커:거래소&quot; 형식으로 입력해주세요. (예: TSLA:NASDAQ, 005930:KRX)
        </p>
      )}
    </form>
  )
}
