// 자주 검색하는 종목명 -> "티커:거래소" 매핑 테이블
// 매핑에 없는 입력은 사용자가 직접 "티커:거래소" 형식으로 입력해야 합니다. (예: TSLA:NASDAQ)
export const TICKER_MAP = {
  // 미국 빅테크
  '애플': 'AAPL:NASDAQ',
  'apple': 'AAPL:NASDAQ',
  'aapl': 'AAPL:NASDAQ',
  '구글': 'GOOGL:NASDAQ',
  '알파벳': 'GOOGL:NASDAQ',
  'google': 'GOOGL:NASDAQ',
  'googl': 'GOOGL:NASDAQ',
  '마이크로소프트': 'MSFT:NASDAQ',
  'microsoft': 'MSFT:NASDAQ',
  'msft': 'MSFT:NASDAQ',
  '아마존': 'AMZN:NASDAQ',
  'amazon': 'AMZN:NASDAQ',
  'amzn': 'AMZN:NASDAQ',
  '메타': 'META:NASDAQ',
  '페이스북': 'META:NASDAQ',
  'meta': 'META:NASDAQ',
  '테슬라': 'TSLA:NASDAQ',
  'tesla': 'TSLA:NASDAQ',
  'tsla': 'TSLA:NASDAQ',
  '엔비디아': 'NVDA:NASDAQ',
  'nvidia': 'NVDA:NASDAQ',
  'nvda': 'NVDA:NASDAQ',
  '넷플릭스': 'NFLX:NASDAQ',
  'netflix': 'NFLX:NASDAQ',
  'nflx': 'NFLX:NASDAQ',

  // 한국 대형주
  '삼성전자': '005930:KRX',
  'sk하이닉스': '000660:KRX',
  '네이버': '035420:KRX',
  'naver': '035420:KRX',
  '카카오': '035720:KRX',
  '현대차': '005380:KRX',
  '기아': '000270:KRX',
  'lg에너지솔루션': '373220:KRX',
  '셀트리온': '068270:KRX',
  '포스코홀딩스': '005490:KRX',
}

/**
 * 사용자가 입력한 텍스트를 "티커:거래소" 쿼리로 변환합니다.
 * 매핑 테이블에 없으면, 이미 "티커:거래소" 형식으로 입력되었다고 가정하고 그대로 반환합니다.
 */
export function resolveQuery(input) {
  const trimmed = input.trim()
  const normalized = trimmed.toLowerCase()
  if (TICKER_MAP[normalized]) {
    return TICKER_MAP[normalized]
  }
  return trimmed
}

export function isKnownName(input) {
  return Boolean(TICKER_MAP[input.trim().toLowerCase()])
}
