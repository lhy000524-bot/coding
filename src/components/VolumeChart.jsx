import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHROME, SERIES } from '../lib/palette';
import { formatDateLabel, formatVolume } from '../lib/format';

function VolumeTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#1a1a19] px-3 py-2 text-xs shadow-lg">
      <p className="text-[#c3c2b7] font-medium mb-1">{label}</p>
      <p className="text-white tabular-nums">거래량 {formatVolume(payload[0].value)}</p>
    </div>
  );
}

export default function VolumeChart({ data }) {
  return (
    <div className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} syncId="stock-sync" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
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
            stroke={CHROME.baseline}
            tick={{ fill: CHROME.textMuted, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatVolume(v)}
            width={64}
          />
          <Tooltip content={<VolumeTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="volume" name="거래량" fill={SERIES.volume} fillOpacity={0.55} radius={[2, 2, 0, 0]} maxBarSize={16} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
