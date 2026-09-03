import { StatItem } from "@/components/molecules/StatItem";

const STATS = [
  { value: "38k+", label: "devs ativos" },
  { value: "12k+", label: "projetos" },
  { value: "290+", label: "linguagens" },
];

export function StatsRow() {
  return (
    <div className="flex gap-8">
      {STATS.map((stat) => (
        <StatItem key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}
