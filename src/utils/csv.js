import Papa from 'papaparse'

const REQUIRED_COLUMNS = ['word', 'meaning']

export function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
      complete: (results) => {
        try {
          resolve(rowsToCards(results.data))
        } catch (err) {
          reject(err)
        }
      },
      error: (err) => reject(err),
    })
  })
}

export function parseCsvText(text) {
  const results = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  })
  return rowsToCards(results.data)
}

function rowsToCards(rows) {
  if (!rows.length) {
    throw new Error('CSV 파일에 데이터가 없습니다.')
  }

  const columns = Object.keys(rows[0])
  const missing = REQUIRED_COLUMNS.filter((c) => !columns.includes(c))
  if (missing.length) {
    throw new Error(`CSV에 필수 컬럼이 없습니다: ${missing.join(', ')}`)
  }

  const cards = rows
    .filter((row) => row.word && row.word.trim())
    .map((row, index) => ({
      id: `${row.word.trim().toLowerCase()}__${index}`,
      word: row.word.trim(),
      meaning: (row.meaning || '').trim(),
      example: (row.example || '').trim(),
      category: (row.category || '기타').trim() || '기타',
    }))

  if (!cards.length) {
    throw new Error('유효한 단어 데이터를 찾을 수 없습니다.')
  }

  return cards
}
