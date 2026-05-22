import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return <div className={`glass ${className}`.trim()}>{children}</div>;
}
