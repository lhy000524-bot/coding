import { colorForTickerIndex } from '../lib/palette';

export default function Header({ tickers, selectedTicker, onSelectTicker }) {
  return (
    <header className="border-b border-white/10 bg-[#0d0d0d]/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/15 text-blue-400 font-bold text-sm">
            S
          </span>
          <div>
            <h1 className="text-lg font-semibold text-white leading-tight">
              주식 현황 대시보드
            </h1>
            <p className="text-xs text-[#898781]">실시간 시세 · 종목 비교 · 데이터 조회</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-1.5" aria-label="종목 선택">
          {tickers.map((t) => {
            const active = t.ticker === selectedTicker;
            const color = colorForTickerIndex(t.index);
            return (
              <button
                key={t.ticker}
                type="button"
                onClick={() => onSelectTicker(t.ticker)}
                aria-pressed={active}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-white/10 text-[#c3c2b7] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: color }}
                  aria-hidden="true"
                />
                {t.name}
                <span className="text-[#898781]">{t.ticker}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
