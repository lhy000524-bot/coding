export const COLORS = {
  bg: '#F7F9FC',
  card: '#FFFFFF',
  navy: '#1F3A60',
  navyMid: '#34608F',
  navyLight: '#7C9BC0',
  gray: '#596571',
  danger: '#C0392B',
  dangerLight: '#F5D9D5',
  dangerBg: 'rgba(192, 57, 43, 0.08)',
} as const;

export const DONUT_COLORS = [
  COLORS.navy,
  COLORS.navyMid,
  COLORS.navyLight,
  '#A9BFD9',
  '#5C7C9F',
  COLORS.gray,
] as const;
