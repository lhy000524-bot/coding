import { useCallback, useState } from 'react'

const MAX_RECENT = 5
const RECENT_KEY = 'stock-price-search:recent'

function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveRecent(list) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list))
  } catch {
    // localStorage 접근 불가(시크릿 모드 등) 시 무시
  }
}

export function useStockSearch() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recent, setRecent] = useState(loadRecent)

  const search = useCallback(async (query) => {
    if (!query || !query.trim()) {
      setError('검색할 종목을 입력해주세요.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/finance/${encodeURIComponent(query.trim())}`)
      const body = await res.json()

      if (!res.ok) {
        throw new Error(body.error || '주식 정보를 불러오지 못했습니다.')
      }

      setData(body)

      setRecent((prev) => {
        const withoutDup = prev.filter((item) => item.toUpperCase() !== query.trim().toUpperCase())
        const next = [query.trim(), ...withoutDup].slice(0, MAX_RECENT)
        saveRecent(next)
        return next
      })
    } catch (err) {
      setData(null)
      setError(err.message || '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { data, loading, error, recent, search, clearError }
}
