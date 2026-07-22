import { MapPinned } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { COLORS } from '../constants/colors';
import { BOTTOM_REGION_NOTE, BOTTOM_REGIONS, REGION_AVG_RATE, REGION_TABLE, type RegionRow } from '../data/dasData';

function RegionTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-gray/20 bg-white p-3 text-xs shadow-md">
      <p className="mb-1 font-semibold text-navy">{label}</p>
      <p className="text-gray">예방점검 실적률: {payload[0].value.toLocaleString('ko-KR')}%</p>
    </div>
  );
}

export default function RegionChart() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-navy">사업소별 예방점검 실적률</h2>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={REGION_TABLE as unknown as RegionRow[]} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E9F0" />
            <XAxis dataKey="region" tick={{ fill: COLORS.gray, fontSize: 11 }} axisLine={{ stroke: '#E5E9F0' }} tickLine={false} interval={0} />
            <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<RegionTooltip />} />
            <ReferenceLine
              y={REGION_AVG_RATE}
              stroke={COLORS.gray}
              strokeDasharray="4 4"
              label={{ value: `평균 ${REGION_AVG_RATE}%`, position: 'insideTopRight', fill: COLORS.gray, fontSize: 11 }}
            />
            <Bar dataKey="rate" name="실적률" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={600}>
              {REGION_TABLE.map((entry) => (
                <Cell key={entry.region} fill={entry.rate < REGION_AVG_RATE ? COLORS.danger : COLORS.navy} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-navy">실적 저조 하위 3개 사업소</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {BOTTOM_REGIONS.map((r) => (
            <div key={r.region} className="rounded-lg bg-danger/5 p-4">
              <div className="flex items-center gap-2 text-danger">
                <MapPinned size={16} />
                <span className="text-sm font-medium">{r.region}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-danger">{r.rate.toLocaleString('ko-KR')}%</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray">{BOTTOM_REGION_NOTE}</p>
      </div>
    </div>
  );
}
