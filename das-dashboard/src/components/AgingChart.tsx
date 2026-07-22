import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { COLORS } from '../constants/colors';
import { AGING_REFERENCE_RATE, AGING_TABLE, type AgingRow } from '../data/dasData';

function AgingTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string; payload: AgingRow }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const totalCount = payload[0]?.payload.totalCount;
  return (
    <div className="rounded-lg border border-gray/20 bg-white p-3 text-xs shadow-md">
      <p className="mb-1 font-semibold text-navy">경과년수 {label}</p>
      <p className="mb-1 text-gray">대상설비: {totalCount?.toLocaleString('ko-KR')}대</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString('ko-KR')}%
        </p>
      ))}
    </div>
  );
}

function HighlightDot(props: { cx?: number; cy?: number; payload?: AgingRow }) {
  const { cx, cy, payload } = props;
  if (cx === undefined || cy === undefined || !payload) return <g />;
  if (payload.years !== '17년 초과') {
    return <circle cx={cx} cy={cy} r={3} fill={COLORS.navyMid} stroke="none" />;
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill={COLORS.danger} fillOpacity={0.15} />
      <circle cx={cx} cy={cy} r={4} fill={COLORS.danger} stroke="#fff" strokeWidth={1.5} />
    </g>
  );
}

export default function AgingChart() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-navy">노후도별 보수율</h2>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={AGING_TABLE as unknown as AgingRow[]} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E9F0" />
          <XAxis dataKey="years" tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={{ stroke: '#E5E9F0' }} tickLine={false} />
          <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <Tooltip content={<AgingTooltip />} />
          <Legend wrapperStyle={{ fontSize: 13, color: COLORS.gray }} />
          <ReferenceLine
            y={AGING_REFERENCE_RATE}
            stroke={COLORS.gray}
            strokeDasharray="4 4"
            label={{ value: `예방보수율 기준 ${AGING_REFERENCE_RATE}%`, position: 'insideTopRight', fill: COLORS.gray, fontSize: 11 }}
          />
          <Line
            type="monotone"
            dataKey="terminalRate"
            name="단말장치"
            stroke={COLORS.navy}
            strokeWidth={2}
            dot={<HighlightDot />}
            isAnimationActive
            animationDuration={600}
          />
          <Line
            type="monotone"
            dataKey="operatorRate"
            name="조작부"
            stroke={COLORS.navyLight}
            strokeWidth={2}
            dot={<HighlightDot />}
            isAnimationActive
            animationDuration={600}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
