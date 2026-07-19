export function formatNumber(value, digits = 0) {
  if (value == null || Number.isNaN(value)) return '-';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatPrice(value) {
  return formatNumber(value, 2);
}

export function formatPercent(value) {
  if (value == null || Number.isNaN(value)) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${formatNumber(value, 2)}%`;
}

export function formatSignedNumber(value, digits = 2) {
  if (value == null || Number.isNaN(value)) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${formatNumber(value, digits)}`;
}

export function formatVolume(value) {
  return formatNumber(value, 0);
}

export function formatDateLabel(dateStr) {
  const [, m, d] = dateStr.split('-');
  return `${m}/${d}`;
}
