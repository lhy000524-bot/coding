import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { COLORS, DONUT_COLORS } from '../constants/colors';
import {
  TERMINAL_FAILURE_CAUSES,
  TERMINAL_FAILURE_HW_RATIO,
  TERMINAL_FAILURE_TOTAL,
  TERMINAL_MODEL_AVG_RATE,
  TERMINAL_MODEL_REPAIR,
} from '../data/dasData';

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { ratio: number } }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-gray/20 bg-white p-3 text-xs shadow-md">
      <p className="font-semibold text-navy">{p.name}</p>
      <p className="text-gray">
        {p.value.toLocaleString('ko-KR')}건 ({p.payload.ratio}%)
      </p>
    </div>
  );
}

function BarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: { model: string; totalCount: number; repairCount: number; repairRate: number } }[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-gray/20 bg-white p-3 text-xs shadow-md">
      <p className="mb-1 font-semibold text-navy">{d.model}</p>
      <p className="text-gray">설비: {d.totalCount.toLocaleString('ko-KR')}대</p>
      <p className="text-gray">보수: {d.repairCount.toLocaleString('ko-KR')}건</p>
      <p className="font-medium text-navy">보수율: {d.repairRate.toLocaleString('ko-KR')}%</p>
    </div>
  );
}

export default function TerminalAnalysis() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-navy">단말장치 고장 원인</h2>
        <div className="relative">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={TERMINAL_FAILURE_CAUSES as unknown as { cause: string; count: number; ratio: number }[]}
                dataKey="count"
                nameKey="cause"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={1}
                isAnimationActive
                animationDuration={600}
              >
                {TERMINAL_FAILURE_CAUSES.map((entry, i) => (
                  <Cell key={entry.cause} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-gray">총 {TERMINAL_FAILURE_TOTAL.toLocaleString('ko-KR')}건</p>
            <p className="text-sm font-bold text-navy">H·W {TERMINAL_FAILURE_HW_RATIO}%</p>
          </div>
        </div>
        <ul className="mt-2 grid grid-cols-2 gap-y-1.5 text-xs text-gray">
          {TERMINAL_FAILURE_CAUSES.map((c, i) => (
            <li key={c.cause} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }}
              />
              {c.cause} {c.ratio}%
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-navy">단말장치 기종별 보수율</h2>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={TERMINAL_MODEL_REPAIR as unknown as { model: string; totalCount: number; repairCount: number; repairRate: number }[]}
            layout="vertical"
            margin={{ top: 24, right: 24, left: 8, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E9F0" />
            <XAxis
              type="number"
              tick={{ fill: COLORS.gray, fontSize: 12 }}
              axisLine={{ stroke: '#E5E9F0' }}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="model"
              width={110}
              tick={{ fill: COLORS.gray, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<BarTooltip />} />
            <ReferenceLine
              x={TERMINAL_MODEL_AVG_RATE}
              stroke={COLORS.gray}
              strokeDasharray="4 4"
              label={{ value: `평균 ${TERMINAL_MODEL_AVG_RATE}%`, position: 'top', fill: COLORS.gray, fontSize: 11 }}
            />
            <Bar dataKey="repairRate" radius={[0, 4, 4, 0]} isAnimationActive animationDuration={600}>
              {TERMINAL_MODEL_REPAIR.map((entry) => (
                <Cell
                  key={entry.model}
                  fill={entry.repairRate > TERMINAL_MODEL_AVG_RATE ? COLORS.danger : COLORS.navy}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
