import { REPORT_META, TABS, type TabName } from '../data/dasData';

interface HeaderProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-[1440px] px-6 pt-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-xl font-bold text-navy sm:text-2xl">{REPORT_META.title}</h1>
          <p className="text-sm text-gray">
            {REPORT_META.org} | 기준: {REPORT_META.baseDate}
          </p>
        </div>
        <nav className="mt-5 flex gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-navy text-navy'
                  : 'border-b-2 border-transparent text-gray hover:text-navy-mid'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
