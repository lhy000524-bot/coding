# 영단어 플래시카드

CSV 파일을 업로드해서 영단어를 플래시카드로 학습하는 웹앱입니다. 백엔드 없이 브라우저(React + Vite)에서만 동작하며, 학습 진행 상황은 `localStorage`에 저장됩니다.

## 실행 방법

```bash
npm install
npm run dev
```

## CSV 파일 형식

| 컬럼      | 설명                       |
| --------- | -------------------------- |
| word      | 영단어                      |
| meaning   | 한글 뜻                     |
| example   | 예문 (영어)                 |
| category  | 카테고리 (예: 일상, 비즈니스, 시험) |

값에 쉼표(`,`)가 포함된 경우 큰따옴표로 감싸주세요. 샘플 파일: [`public/vocab_sample.csv`](./public/vocab_sample.csv)

## 주요 기능

- CSV 업로드 및 파싱 (papaparse)
- 클릭 / 스페이스바로 카드 뒤집기, 좌우 화살표로 이전·다음 카드 이동
- "알고 있음" / "다시 봐야 함" 분류 및 복습 모드
- 카테고리 필터, 진행률 표시, 랜덤 섞기
- 다크모드, localStorage를 통한 진행 상황 저장
