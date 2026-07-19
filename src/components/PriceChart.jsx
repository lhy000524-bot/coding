import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CHROME, SERIES } from '../lib/palette';
import { formatDateLabel, formatPrice, formatVolume } from '../lib/format';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0]?.payload;
  if (!row) return null;

  return (
    <div className="rounded-lg border border-white/10 bg-[#1a1a19] px-3 py-2 text-xs shadow-lg min-w-[160px]">
      <p className="text-[#c3c2b7] font-medium mb-1.5">{label}</p>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1">
        <dt className="text-[#898781]">시가</dt>
        <dd className="text-right text-white tabular-nums">{formatPrice(row.open)}</dd>
        <dt className="text-[#898781]">고가</dt>
        <dd className="text-right text-white tabular-nums">{formatPrice(row.high)}</dd>
        <dt className="text-[#898781]">저가</dt>
        <dd className="text-right text-white tabular-nums">{formatPrice(row.low)}</dd>
        <dt className="text-[#898781]">종가</dt>
        <dd className="text-right text-white tabular-nums font-semibold">
          {formatPrice(row.close)}
        </dd>
        {row.ma5 != null && (
          <>
            <dt className="text-[#898781]">MA5</dt>
            <dd className="text-right tabular-nums" style={{ color: SERIES.ma5 }}>
              {formatPrice(row.ma5)}
            </dd>
          </>
        )}
        <dt className="text-[#898781]">거래량</dt>
        <dd className="text-right text-[#c3c2b7] tabular-nums">{formatVolume(row.volume)}</dd>
      </dl>
    </div>
  );
}

export default function PriceChart({ data, showMA }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} syncId="stock-sync" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="closeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SERIES.close} stopOpacity={0.22} />
              <stop offset="100%" stopColor={SERIES.close} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={CHROME.grid} strokeDasharray="0" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            stroke={CHROME.baseline}
            tick={{ fill: CHROME.textMuted, fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: CHROME.baseline }}
            minTickGap={24}
          />
          <YAxis
            domain={['auto', 'auto']}
            stroke={CHROME.baseline}
            tick={{ fill: CHROME.textMuted, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatPrice(v)}
            width={64}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: CHROME.baseline }} />
          {showMA && (
            <Legend
              verticalAlign="top"
              height={28}
              wrapperStyle={{ fontSize: 12, color: CHROME.textSecondary }}
            />
          )}
          <Area
            type="monotone"
            dataKey="close"
            name="종가"
            stroke={SERIES.close}
            strokeWidth={2}
            fill="url(#closeFill)"
            dot={false}
            activeDot={{ r: 4, stroke: CHROME.surface, strokeWidth: 2 }}
            isAnimationActive={false}
          />
          {showMA && (
            <Line
              type="monotone"
              dataKey="ma5"
              name="이동평균 5일"
              stroke={SERIES.ma5}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: CHROME.surface, strokeWidth: 2 }}
              isAnimationActive={false}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
