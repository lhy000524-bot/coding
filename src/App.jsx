import { useEffect, useMemo, useRef, useState } from 'react'
import FlashCard from './components/FlashCard'
import ProgressBar from './components/ProgressBar'
import CategoryFilter from './components/CategoryFilter'
import UploadScreen from './components/UploadScreen'
import { parseCsvFile, parseCsvText } from './utils/csv'
import {
  loadDeck,
  saveDeck,
  loadProgress,
  saveProgress,
  loadTheme,
  saveTheme,
} from './utils/storage'
import './App.css'

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function App() {
  const [deck, setDeck] = useState(() => loadDeck())
  const [progress, setProgress] = useState(() => loadProgress())
  const [theme, setTheme] = useState(
    () => loadTheme() || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )
  const [uploadError, setUploadError] = useState('')

  const [selectedCategories, setSelectedCategories] = useState(new Set())
  const [reviewMode, setReviewMode] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [order, setOrder] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const cardsById = useMemo(() => {
    const map = new Map()
    deck.forEach((c) => map.set(c.id, c))
    return map
  }, [deck])

  const categories = useMemo(
    () => [...new Set(deck.map((c) => c.category))],
    [deck]
  )

  const categoryFilteredDeck = useMemo(() => {
    if (selectedCategories.size === 0) return deck
    return deck.filter((c) => selectedCategories.has(c.category))
  }, [deck, selectedCategories])

  const studyDeck = useMemo(() => {
    if (!reviewMode) return categoryFilteredDeck
    return categoryFilteredDeck.filter((c) => progress[c.id] === 'review')
  }, [categoryFilteredDeck, reviewMode, progress])

  // rebuild order when the underlying study set changes
  useEffect(() => {
    const ids = studyDeck.map((c) => c.id)
    setOrder((prevOrder) => {
      const prevSet = new Set(prevOrder)
      const sameSet =
        ids.length === prevOrder.length && ids.every((id) => prevSet.has(id))
      if (sameSet) return prevOrder
      return shuffle ? shuffleArray(ids) : ids
    })
    setCurrentIndex(0)
    setFlipped(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyDeck])

  useEffect(() => {
    saveDeck(deck)
  }, [deck])

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  useEffect(() => {
    saveTheme(theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const currentCard = order.length ? cardsById.get(order[currentIndex]) : null

  const goNext = () => {
    if (!order.length) return
    setFlipped(false)
    setCurrentIndex((i) => (i + 1) % order.length)
  }

  const goPrev = () => {
    if (!order.length) return
    setFlipped(false)
    setCurrentIndex((i) => (i - 1 + order.length) % order.length)
  }

  const flip = () => setFlipped((f) => !f)

  const markStatus = (status) => {
    if (!currentCard) return
    setProgress((p) => ({ ...p, [currentCard.id]: status }))
    goNext()
  }

  // keyboard controls
  const orderRef = useRef(order)
  orderRef.current = order
  useEffect(() => {
    const handler = (e) => {
      if (!orderRef.current.length) return
      if (e.code === 'Space') {
        e.preventDefault()
        flip()
      } else if (e.code === 'ArrowRight') {
        goNext()
      } else if (e.code === 'ArrowLeft') {
        goPrev()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNewDeck = (cards) => {
    setDeck(cards)
    setProgress({})
    setSelectedCategories(new Set())
    setReviewMode(false)
    setUploadError('')
  }

  const handleFileSelected = async (file) => {
    try {
      const cards = await parseCsvFile(file)
      handleNewDeck(cards)
    } catch (err) {
      setUploadError(err.message || 'CSV 파일을 읽는 중 오류가 발생했습니다.')
    }
  }

  const handleLoadSample = async () => {
    try {
      const res = await fetch('/vocab_sample.csv')
      const text = await res.text()
      const cards = parseCsvText(text)
      handleNewDeck(cards)
    } catch {
      setUploadError('샘플 데이터를 불러오지 못했습니다.')
    }
  }

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const knownCount = categoryFilteredDeck.filter((c) => progress[c.id] === 'known').length
  const reviewCount = categoryFilteredDeck.filter((c) => progress[c.id] === 'review').length

  if (!deck.length) {
    return (
      <div className="app">
        <button
          className="theme-toggle"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          aria-label="다크모드 전환"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <UploadScreen
          onFileSelected={handleFileSelected}
          onLoadSample={handleLoadSample}
          error={uploadError}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>영단어 플래시카드</h1>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label="다크모드 전환"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <label className="upload-inline">
            <input
              type="file"
              accept=".csv,text/csv"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileSelected(file)
                e.target.value = ''
              }}
            />
            <span className="btn btn-secondary btn-small">새 CSV 업로드</span>
          </label>
        </div>
      </header>

      <CategoryFilter
        categories={categories}
        selected={selectedCategories}
        onToggle={toggleCategory}
        onSelectAll={() => setSelectedCategories(new Set())}
      />

      <ProgressBar total={categoryFilteredDeck.length} knownCount={knownCount} reviewCount={reviewCount} />

      <div className="mode-controls">
        <label className="switch-label">
          <input
            type="checkbox"
            checked={reviewMode}
            onChange={(e) => setReviewMode(e.target.checked)}
          />
          복습 모드 (다시 봐야 함 {reviewCount}개)
        </label>
        <label className="switch-label">
          <input
            type="checkbox"
            checked={shuffle}
            onChange={(e) => {
              const checked = e.target.checked
              setShuffle(checked)
              setOrder((prev) => (checked ? shuffleArray(prev) : studyDeck.map((c) => c.id)))
              setCurrentIndex(0)
              setFlipped(false)
            }}
          />
          랜덤 섞기
        </label>
        {shuffle && (
          <button
            className="btn btn-tiny"
            onClick={() => {
              setOrder((prev) => shuffleArray(prev))
              setCurrentIndex(0)
              setFlipped(false)
            }}
          >
            다시 섞기
          </button>
        )}
      </div>

      {uploadError && <p className="upload-error">{uploadError}</p>}

      {currentCard ? (
        <>
          <div className="card-counter">
            {currentIndex + 1} / {order.length}
          </div>

          <FlashCard
            card={currentCard}
            flipped={flipped}
            onFlip={flip}
            status={progress[currentCard.id]}
          />

          <div className="nav-controls">
            <button className="btn btn-secondary" onClick={goPrev}>
              ← 이전
            </button>
            <button className="btn btn-secondary" onClick={goNext}>
              다음 →
            </button>
          </div>

          <div className="status-controls">
            <button className="btn btn-review" onClick={() => markStatus('review')}>
              다시 봐야 함
            </button>
            <button className="btn btn-known" onClick={() => markStatus('known')}>
              알고 있음
            </button>
          </div>
        </>
      ) : (
        <p className="empty-state">
          {reviewMode
            ? '복습할 카드가 없습니다. 잘 하고 있어요!'
            : '선택한 카테고리에 카드가 없습니다.'}
        </p>
      )}
    </div>
  )
}

export default App
