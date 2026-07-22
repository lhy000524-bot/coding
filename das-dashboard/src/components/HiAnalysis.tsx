import { AlertTriangle } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { COLORS } from '../constants/colors';
import {
  HI_DISTRIBUTION,
  HI_REPAIR_RATE,
  HI_REPAIR_RATE_OVERALL_AVG,
  HI_WARNING_MESSAGE,
  type HiDistributionRow,
  type HiRepairRateRow,
} from '../data/dasData';

function DistributionTooltip({
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

function RepairRateTooltip({
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
      <p className="mb-1 font-semibold text-navy">{label}점</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString('ko-KR')}%
        </p>
      ))}
    </div>
  );
}

export default function HiAnalysis() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-navy">H·I 점수 구간별 예방점검 분포</h2>
        <div className="mb-4 flex items-start gap-2 rounded-lg bg-danger/5 p-3 text-sm text-danger">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <span>{HI_WARNING_MESSAGE}</span>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={HI_DISTRIBUTION as unknown as HiDistributionRow[]}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E9F0" />
            <XAxis dataKey="band" tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={{ stroke: '#E5E9F0' }} tickLine={false} />
            <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toLocaleString('ko-KR')} />
            <Tooltip content={<DistributionTooltip />} />
            <Legend wrapperStyle={{ fontSize: 13, color: COLORS.gray }} />
            <Bar dataKey="total" name="전체설비" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={600}>
              {HI_DISTRIBUTION.map((entry) => (
                <Cell key={entry.band} fill={entry.isBelowThreshold ? COLORS.danger : COLORS.navy} />
              ))}
            </Bar>
            <Bar dataKey="terminal" name="단말장치" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={600}>
              {HI_DISTRIBUTION.map((entry) => (
                <Cell key={entry.band} fill={entry.isBelowThreshold ? COLORS.danger : COLORS.navyMid} />
              ))}
            </Bar>
            <Bar dataKey="operator" name="조작부" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={600}>
              {HI_DISTRIBUTION.map((entry) => (
                <Cell key={entry.band} fill={entry.isBelowThreshold ? COLORS.danger : COLORS.navyLight} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-navy">H·I 점수 구간별 보수율 (2개년 비교)</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={HI_REPAIR_RATE as unknown as HiRepairRateRow[]} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E9F0" />
            <XAxis dataKey="band" tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={{ stroke: '#E5E9F0' }} tickLine={false} />
            <YAxis tick={{ fill: COLORS.gray, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<RepairRateTooltip />} />
            <Legend wrapperStyle={{ fontSize: 13, color: COLORS.gray }} />
            <ReferenceArea x1="71~80" x2="91~100" fill={COLORS.danger} fillOpacity={0.06} />
            <ReferenceLine
              y={HI_REPAIR_RATE_OVERALL_AVG}
              stroke={COLORS.gray}
              strokeDasharray="4 4"
              label={{ value: `전체평균 ${HI_REPAIR_RATE_OVERALL_AVG}%`, position: 'right', fill: COLORS.gray, fontSize: 11 }}
            />
            <Line type="monotone" dataKey="y2024" name="'24년" stroke={COLORS.navyLight} strokeWidth={2} dot={{ r: 3 }} isAnimationActive animationDuration={600} />
            <Line type="monotone" dataKey="y2025" name="'25년" stroke={COLORS.navy} strokeWidth={2} dot={{ r: 3 }} isAnimationActive animationDuration={600} />
            <Line type="monotone" dataKey="average" name="2개년평균" stroke={COLORS.danger} strokeDasharray="3 3" strokeWidth={1.5} dot={false} isAnimationActive animationDuration={600} />
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-2 text-xs text-gray">※ 음영 구간(71~100점)은 전체평균을 상회하는 고장발생구간입니다.</p>
      </div>
    </div>
  );
}
