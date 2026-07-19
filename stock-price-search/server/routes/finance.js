import { Router } from 'express'
import axios from 'axios'

const router = Router()

const SERPAPI_URL = 'https://serpapi.com/search.json'
const CACHE_TTL_MS = 60 * 1000

const cache = new Map()

function getCached(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key)
    return null
  }
  return entry.data
}

function setCached(key, data) {
  cache.set(key, { data, timestamp: Date.now() })
}

function handleSerpApiError(err, res) {
  if (err.response) {
    const status = err.response.status
    const message =
      err.response.data?.error || err.response.data?.message || 'SerpApi 요청이 실패했습니다.'

    if (status === 401 || status === 403) {
      return res.status(401).json({ error: 'API 키가 유효하지 않습니다.' })
    }
    if (status === 429) {
      return res.status(429).json({ error: 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.' })
    }
    return res.status(status >= 400 && status < 600 ? status : 502).json({ error: message })
  }

  if (err.request) {
    return res.status(502).json({ error: 'SerpApi 서버에 연결할 수 없습니다.' })
  }

  return res.status(500).json({ error: err.message || '알 수 없는 오류가 발생했습니다.' })
}

// GET /api/finance/markets?trend=indexes
router.get('/markets', async (req, res) => {
  const apiKey = process.env.SERPAPI_KEY
  if (!apiKey) {
    return res.status(500).json({ error: '서버에 SERPAPI_KEY가 설정되지 않았습니다.' })
  }

  const trend = req.query.trend || 'indexes'
  const cacheKey = `markets:${trend}`

  const cached = getCached(cacheKey)
  if (cached) {
    return res.json({ ...cached, cached: true })
  }

  try {
    const response = await axios.get(SERPAPI_URL, {
      params: {
        engine: 'google_finance_markets',
        trend,
        api_key: apiKey,
      },
      timeout: 10000,
    })

    if (response.data?.error) {
      return res.status(400).json({ error: response.data.error })
    }

    setCached(cacheKey, response.data)
    return res.json(response.data)
  } catch (err) {
    return handleSerpApiError(err, res)
  }
})

// GET /api/finance/:query  (query 예: "AAPL:NASDAQ", "005930:KRX")
router.get('/:query', async (req, res) => {
  const apiKey = process.env.SERPAPI_KEY
  if (!apiKey) {
    return res.status(500).json({ error: '서버에 SERPAPI_KEY가 설정되지 않았습니다.' })
  }

  const query = decodeURIComponent(req.params.query || '').trim()
  if (!query) {
    return res.status(400).json({ error: '검색할 종목을 입력해주세요.' })
  }

  const cacheKey = `quote:${query.toUpperCase()}`

  const cached = getCached(cacheKey)
  if (cached) {
    return res.json({ ...cached, cached: true })
  }

  try {
    const response = await axios.get(SERPAPI_URL, {
      params: {
        engine: 'google_finance',
        q: query,
        api_key: apiKey,
      },
      timeout: 10000,
    })

    if (response.data?.error) {
      return res.status(404).json({ error: response.data.error })
    }

    if (!response.data?.summary) {
      return res.status(404).json({ error: '해당 종목 정보를 찾을 수 없습니다. "티커:거래소" 형식을 확인해주세요.' })
    }

    setCached(cacheKey, response.data)
    return res.json(response.data)
  } catch (err) {
    return handleSerpApiError(err, res)
  }
})

export default router
