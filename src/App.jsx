import { useMemo, useState } from 'react';
import { useStockData } from './hooks/useStockData';
import { movingAverage, filterByRange, normalizeToBase } from './lib/stats';
import { colorForTickerIndex } from './lib/palette';
import Header from './components/Header';
import DateRangeFilter from './components/DateRangeFilter';
import SummaryCards from './components/SummaryCards';
import PriceChart from './components/PriceChart';
import VolumeChart from './components/VolumeChart';
import CompareChart from './components/CompareChart';
import DataTable from './components/DataTable';

function Section({ title, action, children }) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#15161c] p-4">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const { status, rows, error } = useStockData();
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [dateRange, setDateRange] = useState('1M');
  const [showMA, setShowMA] = useState(false);
  const [compareSelected, setCompareSelected] = useState([]);

  const byTicker = useMemo(() => {
    const map = new Map();
    for (const row of rows) {
      if (!map.has(row.ticker)) map.set(row.ticker, []);
      map.get(row.ticker).push(row);
    }
    return map;
  }, [rows]);

  const tickers = useMemo(() => {
    const codes = [...byTicker.keys()].sort();
    return codes.map((ticker, index) => ({
      ticker,
      name: byTicker.get(ticker)[0].name,
      index,
      color: colorForTickerIndex(index),
    }));
  }, [byTicker]);

  const activeTicker = selectedTicker ?? tickers[0]?.ticker ?? null;

  const globalMaxDate = useMemo(() => {
    if (rows.length === 0) return null;
    return rows.reduce((max, r) => (r.date > max ? r.date : max), rows[0].date);
  }, [rows]);

  const fullRowsWithMA = useMemo(() => {
    if (!activeTicker) return [];
    const tickerRows = byTicker.get(activeTicker) ?? [];
    const ma5 = movingAverage(tickerRows, 'close', 5);
    return tickerRows.map((r, i) => ({ ...r, ma5: ma5[i] }));
  }, [byTicker, activeTicker]);

  const filteredRows = useMemo(
    () => filterByRange(fullRowsWithMA, dateRange, globalMaxDate),
    [fullRowsWithMA, dateRange, globalMaxDate]
  );

  const summary = useMemo(() => {
    if (fullRowsWithMA.length === 0 || filteredRows.length === 0) return null;
    const last = fullRowsWithMA[fullRowsWithMA.length - 1];
    const prev = fullRowsWithMA[fullRowsWithMA.length - 2];
    const change = prev ? last.close - prev.close : 0;
    const changePercent = prev ? (change / prev.close) * 100 : 0;
    const periodHigh = Math.max(...filteredRows.map((r) => r.high));
    const periodLow = Math.min(...filteredRows.map((r) => r.low));
    return {
      currentPrice: last.close,
      change,
      changePercent,
      periodHigh,
      periodLow,
      latestDate: last.date,
      latestVolume: last.volume,
    };
  }, [fullRowsWithMA, filteredRows]);

  function toggleCompare(ticker) {
    setCompareSelected((prev) =>
      prev.includes(ticker) ? prev.filter((t) => t !== ticker) : [...prev, ticker]
    );
  }

  const compareData = useMemo(() => {
    if (compareSelected.length === 0 || !globalMaxDate) return { data: [], series: [] };

    const series = tickers
      .filter((t) => compareSelected.includes(t.ticker))
      .map((t) => ({ key: t.ticker, name: t.name, color: t.color }));

    const merged = new Map();
    for (const t of series) {
      const tickerRows = byTicker.get(t.key) ?? [];
      const ranged = filterByRange(tickerRows, dateRange, globalMaxDate);
      const normalized = normalizeToBase(ranged, 100);
      for (const point of normalized) {
        if (!merged.has(point.date)) merged.set(point.date, { date: point.date });
        merged.get(point.date)[t.key] = point.value;
      }
    }

    const data = [...merged.values()].sort((a, b) => (a.date < b.date ? -1 : 1));
    return { data, series };
  }, [compareSelected, tickers, byTicker, dateRange, globalMaxDate]);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {status === 'success' && (
        <Header tickers={tickers} selectedTicker={activeTicker} onSelectTicker={setSelectedTicker} />
      )}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col gap-6">
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#898781]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-blue-400" />
            <p className="text-sm">주식 데이터를 불러오는 중입니다...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 text-center">
            <p className="text-sm font-medium text-red-300">데이터를 불러오지 못했습니다</p>
            <p className="mt-1 text-xs text-[#c3c2b7]">{error}</p>
          </div>
        )}

        {status === 'success' && (
          <>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <DateRangeFilter value={dateRange} onChange={setDateRange} />
            </div>

            <SummaryCards summary={summary} />

            <Section
              title="가격 추이"
              action={
                <button
                  type="button"
                  onClick={() => setShowMA((v) => !v)}
                  aria-pressed={showMA}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    showMA
                      ? 'border-white/20 bg-white/10 text-white'
                      : 'border-white/10 text-[#c3c2b7] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  이동평균(5일) {showMA ? 'ON' : 'OFF'}
                </button>
              }
            >
              <PriceChart data={filteredRows} showMA={showMA} />
              <div className="mt-1">
                <VolumeChart data={filteredRows} />
              </div>
            </Section>

            <Section title="종목 비교 (수익률)">
              <CompareChart
                tickers={tickers}
                selected={compareSelected}
                onToggle={toggleCompare}
                data={compareData.data}
                series={compareData.series}
              />
            </Section>

            <Section title="일별 데이터">
              <DataTable rows={filteredRows} />
            </Section>
          </>
        )}
      </main>
    </div>
  );
}
