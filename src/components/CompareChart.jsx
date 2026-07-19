import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHROME } from '../lib/palette';
import { formatDateLabel, formatSignedNumber } from '../lib/format';

function CompareTooltip({ active, payload, label, series }) {
  if (!active || !payload || payload.length === 0) return null;
  const sorted = [...payload].sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  return (
    <div className="rounded-lg border border-white/10 bg-[#1a1a19] px-3 py-2 text-xs shadow-lg min-w-[180px]">
      <p className="text-[#c3c2b7] font-medium mb-1.5">{label}</p>
      <div className="flex flex-col gap-1">
        {sorted.map((entry) => {
          const meta = series.find((s) => s.key === entry.dataKey);
          const delta = entry.value != null ? entry.value - 100 : null;
          return (
            <div key={entry.dataKey} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[#c3c2b7]">
                <span className="h-2 w-2 rounded-full" style={{ background: meta?.color }} />
                {meta?.name}
              </span>
              <span className="text-white tabular-nums">{formatSignedNumber(delta)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CompareChart({ tickers, selected, onToggle, data, series }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {tickers.map((t) => {
          const checked = selected.includes(t.ticker);
          return (
            <label
              key={t.ticker}
              className="flex items-center gap-1.5 text-xs text-[#c3c2b7] cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(t.ticker)}
                className="accent-blue-500 h-3.5 w-3.5"
              />
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: t.color, opacity: checked ? 1 : 0.4 }}
              />
              <span className={checked ? 'text-white' : ''}>{t.name}</span>
            </label>
          );
        })}
      </div>

      {series.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-sm text-[#898781]">
          비교할 종목을 선택하세요.
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
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
                domain={['auto', 'auto']}
                width={48}
              />
              <Tooltip content={<CompareTooltip series={series} />} cursor={{ stroke: CHROME.baseline }} />
              <Legend
                verticalAlign="top"
                height={28}
                wrapperStyle={{ fontSize: 12, color: CHROME.textSecondary }}
              />
              {series.map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, stroke: CHROME.surface, strokeWidth: 2 }}
                  isAnimationActive={false}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
