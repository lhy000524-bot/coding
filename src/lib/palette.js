// Categorical palette (fixed order — never cycled), validated for CVD safety.
// Source: dataviz skill reference palette, dark-mode steps (this app is dark-only).
export const CATEGORICAL = [
  '#3987e5', // 1 blue
  '#008300', // 2 green
  '#d55181', // 3 magenta
  '#c98500', // 4 yellow
  '#199e70', // 5 aqua
  '#d95926', // 6 orange
  '#9085e9', // 7 violet
  '#e66767', // 8 red
];

export const CHROME = {
  surface: '#1a1a19',
  surface2: '#15161c',
  page: '#0d0d0d',
  textPrimary: '#ffffff',
  textSecondary: '#c3c2b7',
  textMuted: '#898781',
  grid: '#2c2c2a',
  baseline: '#383835',
  border: 'rgba(255,255,255,0.10)',
};

// Korean market convention: up = red, down = blue (opposite of US convention).
export const DIRECTION = {
  up: '#e66767',
  down: '#3987e5',
  flat: CHROME.textMuted,
};

export const SERIES = {
  close: CATEGORICAL[0],
  ma5: CATEGORICAL[6],
  volume: CHROME.textMuted,
};

// Stable color assignment: index into the sorted, full ticker list (not selection order)
// so a ticker keeps its color regardless of which other tickers are toggled.
export function colorForTickerIndex(index) {
  return CATEGORICAL[index % CATEGORICAL.length];
}
