# 2025년도 배전자동화 성능관리 실적 대시보드

배전자동화 설비의 예방점검·고장보수 실적을 한눈에 보는 정적 웹 대시보드입니다.
백엔드 없이 모든 데이터가 코드 상수로 포함되어 있어 별도 설정 없이 바로 실행됩니다.

## 실행 방법

```bash
npm install
npm run dev
```

`npm run build` 로 프로덕션 빌드를, `npm run preview` 로 빌드 결과를 미리 볼 수 있습니다.

## 기술 스택

- Vite + React + TypeScript
- Tailwind CSS (v4)
- Recharts
- lucide-react

## 프로젝트 구조

```
src/
  data/dasData.ts        # 모든 실적 데이터 + 타입 정의
  constants/colors.ts     # 색상 상수
  components/
    Header.tsx            # 상단 타이틀 + 기준일자 + 탭
    KpiCard.tsx            # 재사용 KPI 카드
    KpiSection.tsx         # KPI 카드 4장 영역
    OverallChart.tsx       # 예방점검/고장보수 비교 막대
    EquipmentTable.tsx     # 설비별 실적 (정렬 가능)
    TerminalAnalysis.tsx   # 단말장치 고장 원인 도넛 + 기종별 보수율
    HiAnalysis.tsx         # H·I 점수 구간 분포 (65점 기준선 강조)
    AgingChart.tsx         # 노후도별 보수율 라인
    RegionChart.tsx        # 사업소별 예방점검 실적률
    InsightPanel.tsx       # 시사점 / 개선 과제 카드
  App.tsx
  main.tsx
```

## 화면 구성

상단 4개 탭으로 전환: 종합 실적 / 설비별 분석 / H·I & 노후도 / 사업소별 현황.
모든 탭 하단에 공통 인사이트 패널(시사점 3장)이 고정 표시됩니다.

## 데이터 출처

2025년도 배전자동화 성능관리 실적 보고서, 한전KDN 배전사업처, 2026.2
