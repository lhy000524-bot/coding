# 주식 가격 검색 (stock-price-search)

[SerpApi Google Finance](https://serpapi.com/google-finance-api)를 이용해 주식 시세를 검색하는 웹앱입니다.
SerpApi 호출은 반드시 백엔드(Express)를 거치도록 구성되어 있어, API 키가 브라우저에 노출되지 않고 CORS 문제도 없습니다.

## 프로젝트 구조

```
stock-price-search/
├── server/              # Node.js + Express 백엔드 (SerpApi 프록시)
│   ├── index.js
│   ├── routes/finance.js
│   └── .env.example
└── client/              # React + Vite 프론트엔드 (Tailwind CSS)
    └── src/
        ├── components/  # SearchBar, StockCard, PriceChart, RecentSearches, MarketSummary
        ├── hooks/       # useStockSearch
        └── data/        # 종목명 -> 티커:거래소 매핑 테이블
```

## 실행 방법

### 1. 백엔드

```bash
cd stock-price-search/server
npm install
cp .env.example .env   # SERPAPI_KEY 값을 채워넣으세요
npm run dev            # http://localhost:5000
```

### 2. 프론트엔드 (다른 터미널에서)

```bash
cd stock-price-search/client
npm install
npm run dev             # http://localhost:5173
```

프론트엔드 개발 서버는 `/api`로 시작하는 요청을 `vite.config.js`의 프록시 설정을 통해
백엔드(`http://localhost:5000`)로 전달합니다.

## .env 설정 방법

`server/.env.example`을 복사해 `server/.env`를 만들고 아래 값을 채워주세요.

| 변수명        | 설명                                  |
| ------------- | ------------------------------------- |
| `SERPAPI_KEY` | SerpApi API 키                        |
| `PORT`        | 백엔드 서버 포트 (선택, 기본값 5000) |

SerpApi API 키는 다음 순서로 발급받을 수 있습니다.

1. https://serpapi.com/users/sign_up 에서 회원가입
2. 로그인 후 https://serpapi.com/manage-api-key 에서 API 키 확인

`.env` 파일은 `.gitignore`에 포함되어 있어 커밋되지 않습니다. 절대 API 키를 프론트엔드 코드나
저장소에 직접 작성하지 마세요.

## 사용된 API 엔드포인트

### 백엔드 (프론트엔드가 호출)

| 메서드 | 경로                              | 설명                                                             |
| ------ | --------------------------------- | ---------------------------------------------------------------- |
| GET    | `/api/finance/:query`             | `query`(예: `AAPL:NASDAQ`, `005930:KRX`)에 대한 시세 정보 조회    |
| GET    | `/api/finance/markets?trend=...`  | 주요 지수 / 상승·하락 상위 종목 등 마켓 요약 (`trend` 파라미터)   |
| GET    | `/api/health`                     | 서버 상태 확인                                                    |

### 백엔드가 실제로 호출하는 SerpApi 엔드포인트

- `https://serpapi.com/search.json?engine=google_finance&q={티커}:{거래소}&api_key={API_KEY}`
- `https://serpapi.com/search.json?engine=google_finance_markets&trend={trend}&api_key={API_KEY}`

같은 종목/마켓 요약에 대한 반복 요청은 백엔드에서 1분(TTL) 동안 인메모리 캐시됩니다.

## 핵심 기능

- 회사명 또는 티커 검색 (매핑 테이블에 없는 종목은 `티커:거래소` 형식으로 직접 입력)
- 현재가 카드 (종목명, 티커, 거래소, 현재가, 통화, 등락률/등락폭 — 상승 초록 / 하락 빨강)
- 가격 추이 라인 차트 (recharts)
- 최근 검색 종목 최대 5개 저장 (localStorage) 및 재조회
- 로딩 스켈레톤 UI, 에러 상태 메시지 (잘못된 티커, API 실패, 요청 한도 초과 등)
- 주요 지수 마켓 요약 섹션 (`google_finance_markets` 엔진)
