import type { LucideIcon } from 'lucide-react';
import type { KpiItem } from '../data/dasData';

interface KpiCardProps {
  item: KpiItem;
  icon: LucideIcon;
}

export default function KpiCard({ item, icon: Icon }: KpiCardProps) {
  const isDanger = item.variant === 'danger';

  return (
    <div className="flex-1 rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-gray">{item.label}</span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            isDanger ? 'bg-danger/10 text-danger' : 'bg-navy/10 text-navy'
          }`}
        >
          <Icon size={18} />
        </span>
      </div>
      <p className={`mt-3 text-3xl font-bold ${isDanger ? 'text-danger' : 'text-navy'}`}>
        {item.value}
      </p>
      <p className="mt-1 text-xs text-gray">{item.sub}</p>
    </div>
  );
}
