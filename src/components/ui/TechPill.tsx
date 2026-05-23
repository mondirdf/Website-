interface TechPillProps {
  label: string;
  color?: string;
}

export default function TechPill({ label, color = 'var(--accent-1)' }: TechPillProps) {
  return (
    <span
      className="glass inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-white/80"
      style={{
        borderColor: color,
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      {label}
    </span>
  );
}
