import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GREETINGS = ['مرحبا', 'Hello', 'Salut'];

export default function Hero() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greeting = useMemo(() => GREETINGS[greetingIndex], [greetingIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGreetingIndex((current) => (current + 1) % GREETINGS.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const layerConfigs = [
        { selector: '[data-layer="1"]', yPercent: 70 },
        { selector: '[data-layer="2"]', yPercent: 55 },
        { selector: '[data-layer="3"]', yPercent: 40 },
        { selector: '[data-layer="4"]', yPercent: 10 },
      ];

      layerConfigs.forEach(({ selector, yPercent }) => {
        gsap.to(selector, {
          yPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="hero" className="relative isolate h-screen overflow-hidden">
      <div data-layer="1" className="hero-gradient-mesh absolute inset-[-20%]" aria-hidden="true" />

      <div
        data-layer="2"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <p className="font-['Syne'] text-[22vw] font-extrabold uppercase leading-none tracking-[-0.05em] text-white/5">
          BUILDER
        </p>
      </div>

      <div data-layer="3" className="relative z-20 mx-auto flex h-full max-w-7xl flex-col px-6 pb-8 pt-8 sm:px-10 lg:px-16">
        <nav className="flex items-center justify-between">
          <span className="font-['JetBrains_Mono'] text-xs tracking-[0.3em] text-white/75">df ✦</span>
          <div className="glass flex items-center gap-2 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-2)]" />
            <span className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.18em] text-white/80">
              Available for Work
            </span>
          </div>
        </nav>

        <div className="relative z-20 mx-auto flex flex-1 flex-col items-center justify-center text-center">
          <div className="relative mb-6 h-7 overflow-hidden font-['JetBrains_Mono'] text-sm tracking-[0.32em] text-white/60">
            <AnimatePresence mode="wait">
              <motion.span
                key={greeting}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {greeting}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.h1
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="font-['Syne'] text-[20vw] font-extrabold leading-[0.8] text-white sm:text-[18vw]"
          >
            Df
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5 text-xs uppercase tracking-[0.2em] text-white/45 sm:text-base"
          >
            Product Builder · SaaS Creator · Arab Web
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } } }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            {['→  View Work', '↗  Contact'].map((cta) => (
              <motion.a
                key={cta}
                href={cta.includes('View') ? '#projects' : '#contact'}
                data-magnetic
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                className="glass group inline-flex items-center rounded-full px-7 py-3 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.16em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[color:var(--accent-1)]"
              >
                {cta}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center"
        >
          <div className="mb-2 animate-bounce font-['JetBrains_Mono'] text-lg text-white/75">↓</div>
          <p className="font-['JetBrains_Mono'] text-[0.62rem] uppercase tracking-[0.22em] text-white/45">scroll to explore</p>
        </motion.div>
      </div>

      <motion.div
        data-layer="4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { delayChildren: 0.9, staggerChildren: 0.14 } } }}
        className="pointer-events-none absolute inset-0 z-30"
      >
        {[
          { tech: 'Next.js', icon: '▲', className: 'left-[8%] top-[20%] animate-float-card' },
          { tech: 'Supabase', icon: '◉', className: 'right-[10%] top-[24%] animate-float-card-delayed' },
          { tech: 'React', icon: '◎', className: 'bottom-[18%] right-[18%] animate-float-card-slow' },
        ].map(({ tech, icon, className }) => (
          <motion.div
            key={tech}
            variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className={`glass absolute px-5 py-3 ${className}`}
          >
            <p className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.2em] text-white/85">
              <span className="mr-2 text-[var(--accent-2)]">{icon}</span>
              {tech}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
