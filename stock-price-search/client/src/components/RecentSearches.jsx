export default function RecentSearches({ recent, onSelect }) {
  if (!recent || recent.length === 0) return null

  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-medium text-slate-500">최근 검색</p>
      <div className="flex flex-wrap gap-2">
        {recent.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
