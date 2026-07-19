const RANGES = [
  { key: '1W', label: '1주' },
  { key: '1M', label: '1개월' },
  { key: 'ALL', label: '전체' },
];

export default function DateRangeFilter({ value, onChange }) {
  return (
    <div
      className="inline-flex rounded-lg border border-white/10 bg-[#15161c] p-1"
      role="group"
      aria-label="기간 선택"
    >
      {RANGES.map((r) => {
        const active = r.key === value;
        return (
          <button
            key={r.key}
            type="button"
            onClick={() => onChange(r.key)}
            aria-pressed={active}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              active ? 'bg-blue-500/20 text-blue-300' : 'text-[#c3c2b7] hover:text-white'
            }`}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
