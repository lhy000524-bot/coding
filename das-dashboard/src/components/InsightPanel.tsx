import { AlertTriangle, Clock, ShieldAlert, type LucideIcon } from 'lucide-react';
import { INSIGHTS, type InsightItem } from '../data/dasData';

const ICONS: Record<InsightItem['icon'], LucideIcon> = {
  alert: AlertTriangle,
  shieldAlert: ShieldAlert,
  clock: Clock,
};

export default function InsightPanel() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-navy">시사점 및 개선 과제</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {INSIGHTS.map((insight) => {
          const Icon = ICONS[insight.icon];
          return (
            <div key={insight.title} className="rounded-lg border border-gray/10 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/10 text-navy">
                <Icon size={18} />
              </div>
              <p className="mt-3 text-sm font-semibold text-navy">{insight.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray">{insight.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
