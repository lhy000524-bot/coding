import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';
import { COLORS } from '../constants/colors';
import { OVERALL_CHART_DATA, type OverallChartDatum } from '../data/dasData';

interface RateLabelProps {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  index?: number;
}

function RateLabel(props: RateLabelProps) {
  const { x, y, width, index } = props;
  if (index === undefined || x === undefined || y === undefined || width === undefined) {
    return null;
  }
  const datum = OVERALL_CHART_DATA[index];
  const color = datum.rate < 100 ? COLORS.danger : COLORS.navy;
  return (
    <text
      x={Number(x) + Number(width) / 2}
      y={Number(y) - 8}
      textAnchor="middle"
      fill={color}
      fontSize={13}
      fontWeight={700}
    >
      {datum.rate.toLocaleString('ko-KR')}%
    </text>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-gray/20 bg-white p-3 text-xs shadow-md">
      <p className="mb-1 font-semibold text-navy">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString('ko-KR')}대
        </p>
      ))}
    </div>
  );
}

export default function OverallChart() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-navy">예방점검 · 고장보수 실적 비교</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={OVERALL_CHART_DATA as unknown as OverallChartDatum[]} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E9F0" />
          <XAxis dataKey="name" tick={{ fill: COLORS.gray, fontSize: 13 }} axisLine={{ stroke: '#E5E9F0' }} tickLine={false} />
          <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString('ko-KR')} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 13, color: COLORS.gray }} />
          <Bar dataKey="contract" name="계약수량" fill={COLORS.navyLight} radius={[4, 4, 0, 0]} isAnimationActive animationDuration={600} />
          <Bar dataKey="actual" name="실적수량" fill={COLORS.navy} radius={[4, 4, 0, 0]} isAnimationActive animationDuration={600}>
            <LabelList dataKey="actual" content={RateLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
