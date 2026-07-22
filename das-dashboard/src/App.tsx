import { useMemo, useState } from 'react';
import Header from './components/Header';
import KpiSection from './components/KpiSection';
import OverallChart from './components/OverallChart';
import EquipmentTable from './components/EquipmentTable';
import TerminalAnalysis from './components/TerminalAnalysis';
import HiAnalysis from './components/HiAnalysis';
import AgingChart from './components/AgingChart';
import RegionChart from './components/RegionChart';
import InsightPanel from './components/InsightPanel';
import { OVERALL_TABLE, TABS, type TabName } from './data/dasData';

function OverallTable() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-navy">종합 실적 테이블</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray/20 text-xs font-medium text-gray">
              <th className="py-2.5 text-left">구분</th>
              <th className="py-2.5 text-right">계약</th>
              <th className="py-2.5 text-right">실적</th>
              <th className="py-2.5 text-right">실적률</th>
              <th className="py-2.5 text-right">계약금액</th>
              <th className="py-2.5 text-right">실적금액</th>
              <th className="py-2.5 text-right">정산률</th>
            </tr>
          </thead>
          <tbody>
            {OVERALL_TABLE.map((row) => {
              const isTotal = row.category === '합계';
              const isUnder = row.qtyRate < 100;
              return (
                <tr
                  key={row.category}
                  className={`border-b border-gray/10 last:border-0 ${isTotal ? 'font-semibold' : ''}`}
                  style={isUnder ? { backgroundColor: 'rgba(192, 57, 43, 0.06)' } : undefined}
                >
                  <td className="py-2.5 text-navy">{row.category}</td>
                  <td className="py-2.5 text-right text-gray">{row.contractQty.toLocaleString('ko-KR')}</td>
                  <td className="py-2.5 text-right text-gray">{row.actualQty.toLocaleString('ko-KR')}</td>
                  <td className={`py-2.5 text-right font-medium ${isUnder ? 'text-danger' : 'text-navy'}`}>
                    {row.qtyRate.toLocaleString('ko-KR')}%
                  </td>
                  <td className="py-2.5 text-right text-gray">{row.contractAmount.toLocaleString('ko-KR')}억</td>
                  <td className="py-2.5 text-right text-gray">{row.actualAmount.toLocaleString('ko-KR')}억</td>
                  <td className="py-2.5 text-right font-medium text-navy">{row.settlementRate.toLocaleString('ko-KR')}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<TabName>(TABS[0]);

  const content = useMemo(() => {
    switch (activeTab) {
      case '종합 실적':
        return (
          <>
            <KpiSection />
            <OverallChart />
            <OverallTable />
          </>
        );
      case '설비별 분석':
        return (
          <>
            <EquipmentTable />
            <TerminalAnalysis />
          </>
        );
      case 'H·I & 노후도':
        return (
          <>
            <HiAnalysis />
            <AgingChart />
          </>
        );
      case '사업소별 현황':
        return <RegionChart />;
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-bg-page">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-6">
        {content}
        <InsightPanel />
      </main>
    </div>
  );
}

export default App;
