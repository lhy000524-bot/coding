import { Banknote, PackageCheck, Wallet, ShieldCheck } from 'lucide-react';
import { KPI_ITEMS } from '../data/dasData';
import KpiCard from './KpiCard';

const ICONS = [Banknote, PackageCheck, Wallet, ShieldCheck];

export default function KpiSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {KPI_ITEMS.map((item, i) => (
        <KpiCard key={item.label} item={item} icon={ICONS[i]} />
      ))}
    </div>
  );
}
