import { useMemo, useState } from 'react';
import { formatPrice, formatVolume } from '../lib/format';

const COLUMNS = [
  { key: 'date', label: '날짜', align: 'left' },
  { key: 'open', label: '시가', align: 'right' },
  { key: 'high', label: '고가', align: 'right' },
  { key: 'low', label: '저가', align: 'right' },
  { key: 'close', label: '종가', align: 'right' },
  { key: 'volume', label: '거래량', align: 'right' },
];

export default function DataTable({ rows }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' });

  const filtered = useMemo(() => {
    const q = search.trim();
    const base = q ? rows.filter((r) => r.date.includes(q)) : rows;
    const sorted = [...base].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av < bv) return sort.dir === 'asc' ? -1 : 1;
      if (av > bv) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [rows, search, sort]);

  function toggleSort(key) {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' }
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-[#898781]">{filtered.length.toLocaleString()}개 행</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="날짜 검색 (예: 2025-06)"
          className="rounded-md border border-white/10 bg-[#0d0d0d] px-3 py-1.5 text-xs text-white placeholder:text-[#898781] outline-none focus:border-blue-500/50 w-full sm:w-56"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              {COLUMNS.map((col) => {
                const active = sort.key === col.key;
                return (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    className={`px-3 py-2 font-medium text-[#898781] cursor-pointer select-none hover:text-white whitespace-nowrap ${
                      col.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <span className={active ? 'text-white' : ''}>
                      {col.label}
                      {active ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : ''}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-3 py-6 text-center text-[#898781]">
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.date} className="border-b border-white/5 hover:bg-white/[0.03]">
                  <td className="px-3 py-1.5 text-left text-[#c3c2b7] tabular-nums whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="px-3 py-1.5 text-right text-white tabular-nums">
                    {formatPrice(row.open)}
                  </td>
                  <td className="px-3 py-1.5 text-right text-white tabular-nums">
                    {formatPrice(row.high)}
                  </td>
                  <td className="px-3 py-1.5 text-right text-white tabular-nums">
                    {formatPrice(row.low)}
                  </td>
                  <td className="px-3 py-1.5 text-right text-white tabular-nums font-medium">
                    {formatPrice(row.close)}
                  </td>
                  <td className="px-3 py-1.5 text-right text-[#c3c2b7] tabular-nums">
                    {formatVolume(row.volume)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
