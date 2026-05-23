import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    const dotX = gsap.quickSetter(dot, 'x', 'px');
    const dotY = gsap.quickSetter(dot, 'y', 'px');
    const ringX = gsap.quickSetter(ring, 'x', 'px');
    const ringY = gsap.quickSetter(ring, 'y', 'px');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };

    const move = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      dotX(mouse.x);
      dotY(mouse.y);
    };

    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));

    const handleMagneticMove = (element: HTMLElement) => (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);

      gsap.to(element, {
        x: relX * 0.2,
        y: relY * 0.2,
        duration: 0.25,
        ease: 'power3.out',
      });
    };

    const handleMagneticLeave = (element: HTMLElement) => () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.35, ease: 'power3.out' });
    };

    const cleanupFns: Array<() => void> = [];

    magneticElements.forEach((element) => {
      const onMove = handleMagneticMove(element);
      const onLeave = handleMagneticLeave(element);
      element.addEventListener('mousemove', onMove);
      element.addEventListener('mouseleave', onLeave);
      cleanupFns.push(() => {
        element.removeEventListener('mousemove', onMove);
        element.removeEventListener('mouseleave', onLeave);
      });
    });

    let rafId = 0;
    const animate = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;
      ringX(ringPos.x);
      ringY(ringPos.y);
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move);
    animate();

    return () => {
      window.removeEventListener('mousemove', move);
      cleanupFns.forEach((fn) => fn());
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
