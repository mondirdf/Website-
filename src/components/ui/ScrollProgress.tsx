import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const setScaleX = gsap.quickSetter(barRef.current, 'scaleX');

    const updateProgress = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? window.scrollY / documentHeight : 0;
      setScaleX(gsap.utils.clamp(0, 1, progress));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[10001] h-[2px] w-full bg-transparent">
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, var(--accent-1), var(--accent-2))',
        }}
      />
    </div>
  );
}
