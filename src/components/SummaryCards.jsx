import { formatPrice, formatPercent, formatSignedNumber, formatVolume } from '../lib/format';
import { DIRECTION } from '../lib/palette';

function directionColor(delta) {
  if (delta > 0) return DIRECTION.up;
  if (delta < 0) return DIRECTION.down;
  return DIRECTION.flat;
}

function Card({ label, children, sub }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#15161c] p-4 flex flex-col gap-1.5 min-w-0">
      <span className="text-xs font-medium text-[#898781]">{label}</span>
      {children}
      {sub && <span className="text-xs text-[#898781]">{sub}</span>}
    </div>
  );
}

export default function SummaryCards({ summary }) {
  if (!summary) return null;
  const { currentPrice, change, changePercent, periodHigh, periodLow, latestDate, latestVolume } =
    summary;
  const color = directionColor(change);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <Card label="현재가" sub={latestDate}>
        <span className="text-2xl font-semibold text-white tabular-nums">
          {formatPrice(currentPrice)}
        </span>
      </Card>

      <Card label="전일 대비" sub={`거래량 ${formatVolume(latestVolume)}`}>
        <span className="text-2xl font-semibold tabular-nums" style={{ color }}>
          {formatSignedNumber(change)} ({formatPercent(changePercent)})
        </span>
      </Card>

      <Card label="기간 내 최고가">
        <span className="text-2xl font-semibold text-white tabular-nums">
          {formatPrice(periodHigh)}
        </span>
      </Card>

      <Card label="기간 내 최저가">
        <span className="text-2xl font-semibold text-white tabular-nums">
          {formatPrice(periodLow)}
        </span>
      </Card>
    </div>
  );
}
