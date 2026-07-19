const KEYS = {
  DECK: 'flashcards_deck_v1',
  PROGRESS: 'flashcards_progress_v1',
  THEME: 'flashcards_theme_v1',
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently
  }
}

export function loadDeck() {
  return load(KEYS.DECK, [])
}

export function saveDeck(deck) {
  save(KEYS.DECK, deck)
}

export function loadProgress() {
  return load(KEYS.PROGRESS, {})
}

export function saveProgress(progress) {
  save(KEYS.PROGRESS, progress)
}

export function loadTheme() {
  return load(KEYS.THEME, null)
}

export function saveTheme(theme) {
  save(KEYS.THEME, theme)
}
