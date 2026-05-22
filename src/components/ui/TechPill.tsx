interface TechPillProps {
  label: string;
  color?: string;
}

export default function TechPill({ label }: TechPillProps) {
  return <span className="glass px-3 py-1 text-xs font-mono">{label}</span>;
}
