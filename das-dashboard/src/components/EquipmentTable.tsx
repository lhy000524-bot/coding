import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { EQUIPMENT_TABLE, type EquipmentRow } from '../data/dasData';

type SortKey = keyof EquipmentRow;

const COLUMNS: { key: SortKey; label: string; align?: 'right' }[] = [
  { key: 'equipment', label: '설비' },
  { key: 'totalCount', label: '전체설비', align: 'right' },
  { key: 'repair2024', label: "'24 고장보수", align: 'right' },
  { key: 'repair2025', label: "'25 고장보수", align: 'right' },
  { key: 'repairRate2025', label: "'25 보수율", align: 'right' },
  { key: 'change', label: '증감', align: 'right' },
];

export default function EquipmentTable() {
  const [sortKey, setSortKey] = useState<SortKey>('equipment');
  const [asc, setAsc] = useState(true);

  const sorted = useMemo(() => {
    const rows = [...EQUIPMENT_TABLE];
    rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'string' || typeof bv === 'string') {
        return String(av).localeCompare(String(bv)) * (asc ? 1 : -1);
      }
      return (Number(av) - Number(bv)) * (asc ? 1 : -1);
    });
    return rows;
  }, [sortKey, asc]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setAsc(true);
    }
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-navy">설비별 4개년 추이</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray/20">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`cursor-pointer select-none py-2.5 text-xs font-medium text-gray ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key ? (
                      asc ? <ArrowUp size={12} /> : <ArrowDown size={12} />
                    ) : (
                      <ArrowUpDown size={12} className="opacity-40" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.equipment} className="border-b border-gray/10 last:border-0">
                <td className="py-2.5 font-medium text-navy">{row.equipment}</td>
                <td className="py-2.5 text-right text-gray">{row.totalCount.toLocaleString('ko-KR')}대</td>
                <td className="py-2.5 text-right text-gray">{row.repair2024.toLocaleString('ko-KR')}건</td>
                <td className="py-2.5 text-right text-gray">{row.repair2025.toLocaleString('ko-KR')}건</td>
                <td className="py-2.5 text-right font-medium text-navy">{row.repairRate2025.toLocaleString('ko-KR')}%</td>
                <td
                  className="py-2.5 text-right font-medium"
                  style={{ color: row.change > 0 ? COLORS.danger : COLORS.gray }}
                >
                  {row.change > 0 ? '+' : ''}
                  {row.change.toLocaleString('ko-KR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
