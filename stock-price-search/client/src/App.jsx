import { useStockSearch } from './hooks/useStockSearch.js'
import SearchBar from './components/SearchBar.jsx'
import StockCard, { StockCardSkeleton } from './components/StockCard.jsx'
import PriceChart, { PriceChartSkeleton } from './components/PriceChart.jsx'
import RecentSearches from './components/RecentSearches.jsx'
import MarketSummary from './components/MarketSummary.jsx'

function App() {
  const { data, loading, error, recent, search } = useStockSearch()

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">주식 가격 검색</h1>
        <p className="mt-1 text-sm text-slate-500">SerpApi Google Finance로 실시간 주가를 확인하세요.</p>
      </header>

      <SearchBar onSearch={search} loading={loading} />
      <RecentSearches recent={recent} onSelect={search} />

      <section className="mt-8">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <>
            <StockCardSkeleton />
            <PriceChartSkeleton />
          </>
        )}

        {!loading && data?.summary && (
          <>
            <StockCard summary={data.summary} />
            <PriceChart graph={data.graph} currency={data.summary.currency} />
          </>
        )}

        {!loading && !error && !data && (
          <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-sm text-slate-400">
            종목을 검색해보세요.
          </div>
        )}
      </section>

      <section className="mt-10 border-t border-slate-200 pt-6">
        <MarketSummary />
      </section>
    </div>
  )
}

export default App
