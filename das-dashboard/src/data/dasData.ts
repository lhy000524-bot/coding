// 2025년도 배전자동화 성능관리 실적 보고서, 한전KDN 배전사업처, 2026.2

export interface KpiItem {
  value: string;
  label: string;
  sub: string;
  variant: 'navy' | 'danger';
}

export const KPI_ITEMS: readonly KpiItem[] = [
  { value: '407.6억원', label: '총 실적금액', sub: 'VAT 별도', variant: 'navy' },
  { value: '99.2%', label: '전체 수량 실적률', sub: '계약 79,477 → 실적 78,871', variant: 'navy' },
  { value: '104.0%', label: '전체 금액 정산률', sub: '계약 391.9 → 실적 407.6억원', variant: 'navy' },
  { value: '90.3%', label: '예방점검 실적률', sub: '전년 대비 1.0%p 상승', variant: 'danger' },
] as const;

export interface OverallCategory {
  category: string;
  contractQty: number;
  actualQty: number;
  qtyRate: number;
  contractAmount: number;
  actualAmount: number;
  settlementRate: number;
}

export const OVERALL_TABLE: readonly OverallCategory[] = [
  { category: '예방점검', contractQty: 60487, actualQty: 54615, qtyRate: 90.3, contractAmount: 313.5, actualAmount: 290.2, settlementRate: 92.6 },
  { category: '고장보수', contractQty: 18668, actualQty: 23820, qtyRate: 127.6, contractAmount: 72.6, actualAmount: 109.5, settlementRate: 150.8 },
  { category: '기타 S/W', contractQty: 2, actualQty: 2, qtyRate: 100.0, contractAmount: 1.0, actualAmount: 1.3, settlementRate: 130.0 },
  { category: '전력구', contractQty: 320, actualQty: 434, qtyRate: 135.6, contractAmount: 4.8, actualAmount: 6.6, settlementRate: 137.5 },
  { category: '합계', contractQty: 79477, actualQty: 78871, qtyRate: 99.2, contractAmount: 391.9, actualAmount: 407.6, settlementRate: 104.0 },
] as const;

export interface OverallChartDatum {
  name: string;
  contract: number;
  actual: number;
  rate: number;
}

export const OVERALL_CHART_DATA: readonly OverallChartDatum[] = [
  { name: '예방점검', contract: 60487, actual: 54615, rate: 90.3 },
  { name: '고장보수', contract: 18668, actual: 23820, rate: 127.6 },
] as const;

export interface EquipmentRow {
  equipment: string;
  totalCount: number;
  repair2024: number;
  repair2025: number;
  repairRate2025: number;
  change: number;
}

export const EQUIPMENT_TABLE: readonly EquipmentRow[] = [
  { equipment: '주장치', totalCount: 1008, repair2024: 327, repair2025: 133, repairRate2025: 13.2, change: -194 },
  { equipment: '단말장치', totalCount: 151750, repair2024: 4651, repair2025: 5571, repairRate2025: 3.7, change: 920 },
  { equipment: '조작부', totalCount: 151750, repair2024: 3062, repair2025: 2812, repairRate2025: 1.9, change: -250 },
  { equipment: '축전지', totalCount: 151750, repair2024: 15549, repair2025: 15292, repairRate2025: 10.1, change: -257 },
  { equipment: '부대설비', totalCount: 887, repair2024: 92, repair2025: 12, repairRate2025: 1.4, change: -80 },
  { equipment: '전력구', totalCount: 10597, repair2024: 635, repair2025: 391, repairRate2025: 3.7, change: -244 },
] as const;

export interface TerminalFailureCause {
  cause: string;
  count: number;
  ratio: number;
}

export const TERMINAL_FAILURE_CAUSES: readonly TerminalFailureCause[] = [
  { cause: '메인보드', count: 1747, ratio: 31.4 },
  { cause: '서지보드', count: 1720, ratio: 30.9 },
  { cause: 'S/W(펌웨어)', count: 666, ratio: 12.0 },
  { cause: 'CT/PT', count: 628, ratio: 11.3 },
  { cause: 'DI/DO', count: 625, ratio: 11.2 },
  { cause: '기타', count: 185, ratio: 3.3 },
] as const;

export const TERMINAL_FAILURE_TOTAL = 5571;
export const TERMINAL_FAILURE_HW_RATIO = 88.0;

export interface TerminalModelRepairRow {
  model: string;
  totalCount: number;
  repairCount: number;
  repairRate: number;
}

export const TERMINAL_MODEL_REPAIR: readonly TerminalModelRepairRow[] = [
  { model: '가공 기본형', totalCount: 23546, repairCount: 728, repairRate: 3.1 },
  { model: '가공 다기능', totalCount: 10298, repairCount: 332, repairRate: 3.2 },
  { model: '가공 통합형', totalCount: 60115, repairCount: 2362, repairRate: 3.9 },
  { model: '지중 기본형', totalCount: 26567, repairCount: 902, repairRate: 3.4 },
  { model: '지중 다기능', totalCount: 11594, repairCount: 476, repairRate: 4.1 },
  { model: '지중 도어부착형', totalCount: 5541, repairCount: 179, repairRate: 3.2 },
  { model: '리클로져', totalCount: 9773, repairCount: 441, repairRate: 4.5 },
  { model: '다회로차단기', totalCount: 1837, repairCount: 68, repairRate: 3.7 },
  { model: 'EFI차단기', totalCount: 2349, repairCount: 80, repairRate: 3.4 },
] as const;

export const TERMINAL_MODEL_AVG_RATE = 3.7;

export interface HiDistributionRow {
  band: string;
  total: number;
  terminal: number;
  operator: number;
  designTarget: boolean;
  isBelowThreshold: boolean;
}

export const HI_DISTRIBUTION: readonly HiDistributionRow[] = [
  { band: '65점 미만', total: 94731, terminal: 6698, operator: 1112, designTarget: false, isBelowThreshold: true },
  { band: '65~69점', total: 15173, terminal: 9451, operator: 2160, designTarget: true, isBelowThreshold: false },
  { band: '70점대', total: 23099, terminal: 14304, operator: 3443, designTarget: true, isBelowThreshold: false },
  { band: '80점대', total: 13539, terminal: 8709, operator: 3142, designTarget: true, isBelowThreshold: false },
  { band: '90점대', total: 4533, terminal: 3696, operator: 1119, designTarget: true, isBelowThreshold: false },
  { band: '100점', total: 675, terminal: 569, operator: 188, designTarget: true, isBelowThreshold: false },
] as const;

export const HI_WARNING_MESSAGE =
  '설계 비대상(65점 미만) 점검 시행 — 단말장치 6,698대(15.4%), 조작부 1,112대(10.0%)';

export interface HiRepairRateRow {
  band: string;
  y2024: number;
  y2025: number;
  average: number;
}

export const HI_REPAIR_RATE: readonly HiRepairRateRow[] = [
  { band: '1~10', y2024: 0.0, y2025: 0.0, average: 0.0 },
  { band: '11~20', y2024: 2.5, y2025: 1.7, average: 2.1 },
  { band: '21~30', y2024: 1.6, y2025: 2.2, average: 1.9 },
  { band: '31~40', y2024: 1.6, y2025: 2.5, average: 2.1 },
  { band: '41~50', y2024: 2.1, y2025: 2.2, average: 2.1 },
  { band: '51~60', y2024: 1.7, y2025: 2.5, average: 2.1 },
  { band: '61~70', y2024: 2.2, y2025: 3.3, average: 2.7 },
  { band: '71~80', y2024: 3.3, y2025: 3.1, average: 3.2 },
  { band: '81~90', y2024: 3.4, y2025: 3.0, average: 3.2 },
  { band: '91~100', y2024: 4.0, y2025: 4.2, average: 4.1 },
] as const;

export const HI_REPAIR_RATE_OVERALL_AVG = 2.6;

export interface AgingRow {
  years: string;
  totalCount: number;
  terminalRate: number;
  operatorRate: number;
}

export const AGING_TABLE: readonly AgingRow[] = [
  { years: '5년 미만', totalCount: 9278, terminalRate: 1.3, operatorRate: 0.4 },
  { years: '5~7년', totalCount: 14494, terminalRate: 1.9, operatorRate: 0.8 },
  { years: '8~10년', totalCount: 15106, terminalRate: 3.5, operatorRate: 1.8 },
  { years: '11~17년', totalCount: 15489, terminalRate: 4.4, operatorRate: 2.3 },
  { years: '17년 초과', totalCount: 2652, terminalRate: 8.3, operatorRate: 7.9 },
] as const;

export const AGING_REFERENCE_RATE = 5.0;

export interface RegionRow {
  region: string;
  rate: number;
}

export const REGION_TABLE: readonly RegionRow[] = [
  { region: '서울', rate: 106.6 },
  { region: '남서울', rate: 88.2 },
  { region: '인천', rate: 91.8 },
  { region: '경기북부', rate: 99.6 },
  { region: '경기', rate: 87.4 },
  { region: '강원', rate: 101.5 },
  { region: '충북', rate: 100.6 },
  { region: '대전충남', rate: 77.1 },
  { region: '전북', rate: 95.8 },
  { region: '광주전남', rate: 84.0 },
  { region: '대구', rate: 90.9 },
  { region: '경북', rate: 98.0 },
  { region: '부산', rate: 93.8 },
  { region: '경남', rate: 96.2 },
  { region: '제주', rate: 104.4 },
] as const;

export const REGION_AVG_RATE = 90.3;

export interface BottomRegion {
  region: string;
  rate: number;
}

export const BOTTOM_REGIONS: readonly BottomRegion[] = [
  { region: '대전충남', rate: 77.1 },
  { region: '광주전남', rate: 84.0 },
  { region: '경기', rate: 87.4 },
] as const;

export const BOTTOM_REGION_NOTE =
  "예방점검 물량 증가 대비 점검 인력 부족으로 실적 저조 → '26년 현장 투입조 증설 예정";

export interface InsightItem {
  title: string;
  description: string;
  icon: 'alert' | 'shieldAlert' | 'clock';
}

export const INSIGHTS: readonly InsightItem[] = [
  {
    title: '단말장치가 최대 리스크',
    description:
      '고장보수 전년 대비 +920건(19.8%↑), 통합형·지중 다기능·리클로져 보수율이 평균 초과',
    icon: 'alert',
  },
  {
    title: 'H·I 기준 미준수',
    description: '65점 미만 설비 7,810대 점검 시행, 점검 효용성 저하',
    icon: 'shieldAlert',
  },
  {
    title: '노후 설비 집중 관리 필요',
    description: '17년 초과 설비 보수율 8.3%로 5년 미만(1.3%)의 6.4배',
    icon: 'clock',
  },
] as const;

export const REPORT_META = {
  title: '2025년도 배전자동화 성능관리 실적 대시보드',
  org: '한전KDN 배전사업처',
  baseDate: '2025.12.31',
} as const;

export const TABS = ['종합 실적', '설비별 분석', 'H·I & 노후도', '사업소별 현황'] as const;
export type TabName = (typeof TABS)[number];
