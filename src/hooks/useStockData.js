import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const NUMERIC_FIELDS = ['open', 'high', 'low', 'close', 'volume'];

export function useStockData(url = '/stock_data.csv') {
  const [state, setState] = useState({ status: 'loading', rows: [], error: null });

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`CSV를 불러오지 못했습니다 (HTTP ${res.status})`);
        return res.text();
      })
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: false,
        });

        if (parsed.errors && parsed.errors.length > 0) {
          throw new Error(`CSV 파싱 오류: ${parsed.errors[0].message}`);
        }

        const requiredColumns = ['date', 'ticker', 'name', ...NUMERIC_FIELDS];
        const fields = parsed.meta.fields || [];
        const missing = requiredColumns.filter((c) => !fields.includes(c));
        if (missing.length > 0) {
          throw new Error(`CSV에 필수 컬럼이 없습니다: ${missing.join(', ')}`);
        }

        const rows = parsed.data
          .map((row) => {
            const clean = { date: row.date, ticker: row.ticker, name: row.name };
            for (const field of NUMERIC_FIELDS) {
              const num = Number(row[field]);
              clean[field] = Number.isFinite(num) ? num : null;
            }
            return clean;
          })
          .filter((row) => row.date && row.ticker && NUMERIC_FIELDS.every((f) => row[f] != null))
          .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

        if (rows.length === 0) {
          throw new Error('CSV에 유효한 데이터 행이 없습니다.');
        }

        if (!cancelled) setState({ status: 'success', rows, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', rows: [], error: error.message });
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
