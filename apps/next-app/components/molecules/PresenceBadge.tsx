import { StatusDot } from "@/components/atoms/StatusDot";

export interface PresenceBadgeProps {
  count: number;
}

export function PresenceBadge({ count }: PresenceBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
      <StatusDot />
      {count.toLocaleString("pt-BR")} devs online agora
    </div>
  );
}
