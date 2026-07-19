export function movingAverage(rows, field, window) {
  const result = new Array(rows.length).fill(null);
  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    sum += rows[i][field];
    if (i >= window) sum -= rows[i - window][field];
    if (i >= window - 1) result[i] = sum / window;
  }
  return result;
}

export function filterByRange(rows, range, asOfDate) {
  if (range === 'ALL' || rows.length === 0) return rows;
  const days = range === '1W' ? 7 : range === '1M' ? 30 : null;
  if (!days) return rows;
  const lastDate = new Date(asOfDate ?? rows[rows.length - 1].date);
  const cutoff = new Date(lastDate);
  cutoff.setDate(cutoff.getDate() - days);
  return rows.filter((r) => new Date(r.date) >= cutoff);
}

export function normalizeToBase(rows, base = 100) {
  if (rows.length === 0) return [];
  const startClose = rows[0].close;
  return rows.map((r) => ({
    date: r.date,
    value: (r.close / startClose) * base,
  }));
}
