export interface StatItemProps {
  value: string;
  label: string;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
