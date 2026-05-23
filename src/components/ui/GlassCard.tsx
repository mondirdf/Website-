import type { CSSProperties, ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  accentColor,
  hover = true,
}: GlassCardProps) {
  const style = accentColor
    ? ({ '--glass-accent': accentColor } as CSSProperties)
    : undefined;

  return (
    <div className={`glass ${hover ? 'glass-hover' : ''} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
