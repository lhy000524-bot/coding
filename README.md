# 주식 현황 대시보드

`public/stock_data.csv`를 기반으로 하는 인터랙티브 주식 대시보드입니다.

## 기술 스택

- React + Vite
- Tailwind CSS
- Recharts
- PapaParse

## 실행

```bash
npm install
npm run dev
```

## 데이터

`public/stock_data.csv`에는 AAPL, MSFT, GOOGL, TSLA, NVDA 5개 종목의 2025-06-01 ~
2025-06-12 일별 시세가 들어 있습니다 (컬럼: `date,ticker,name,open,high,low,close,volume`).
같은 형식이라면 다른 CSV로 교체해도 그대로 동작합니다.

## 기능

- 종목 선택, 기간 필터(1주/1개월/전체)
- 요약 카드(현재가, 전일 대비, 기간 내 최고/최저가)
- 가격 차트(5일 이동평균 토글) + 거래량 차트(날짜 축 동기화)
- 종목별 수익률 비교 차트
- 정렬/검색 가능한 일별 데이터 테이블
