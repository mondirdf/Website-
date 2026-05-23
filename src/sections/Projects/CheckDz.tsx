import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '../../components/ui/GlassCard';
import TechPill from '../../components/ui/TechPill';

gsap.registerPlugin(ScrollTrigger);

const subjects = [
  { fr: 'Mathématiques', ar: 'رياضيات', progress: 'w-4/5', coef: 7 },
  { fr: 'Physique', ar: 'فيزياء', progress: 'w-3/4', coef: 6 },
  { fr: 'SVT', ar: 'علوم الطبيعة', progress: 'w-2/3', coef: 5 },
  { fr: 'Philosophie', ar: 'فلسفة', progress: 'w-1/2', coef: 2 },
];

const stats = [
  { label: 'Viral Launch', value: 72, suffix: 'h', icon: '🔥' },
  { label: 'Users', value: 1000, suffix: '+', icon: '👥' },
  { label: 'Top Source', value: 1, suffix: '', icon: '🎵' },
];

export default function CheckDz() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.checkdz-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        }
      );

      const counters = gsap.utils.toArray<HTMLElement>('.checkdz-counter');
      counters.forEach((counter) => {
        const value = Number(counter.dataset.value ?? 0);
        const suffix = counter.dataset.suffix ?? '';
        const state = { value: 0 };
        gsap.to(state, {
          value,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
          onUpdate: () => {
            counter.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      });

      gsap.to('.checkdz-dot', {
        y: 'random(-24, 24)',
        x: 'random(-20, 20)',
        repeat: -1,
        yoyo: true,
        duration: 'random(3, 6)',
        ease: 'sine.inOut',
        stagger: 0.1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = tiltRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) * 16 - 8).toFixed(2);
    const rotateX = (8 - (y / rect.height) * 16).toFixed(2);
    target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  return (
    <section ref={sectionRef} id="check-dz" className="min-h-screen bg-[#0A0A14] px-8 py-14 text-white md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[55%_45%]">
        <div className="relative">
          <div className="absolute -left-8 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#6C63FF]/20 blur-[80px]" />
          {[...Array(12)].map((_, index) => (
            <span
              key={index}
              className="checkdz-dot absolute h-1.5 w-1.5 rounded-full bg-[#6C63FF]/40"
              style={{ left: `${(index % 4) * 22 + 8}%`, top: `${Math.floor(index / 4) * 25 + 12}%` }}
            />
          ))}

          <div
            ref={tiltRef}
            onMouseMove={handleTilt}
            onMouseLeave={() => {
              if (tiltRef.current) tiltRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }}
            className="relative rounded-3xl border border-[#6C63FF]/35 bg-[#111122] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-transform duration-200"
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-white/50">check.dz/dashboard</span>
            </div>
            <div className="grid gap-3">
              {subjects.map((subject) => (
                <GlassCard key={subject.fr} className="checkdz-card rounded-2xl p-3" hover={false}>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-white">{subject.fr}</p>
                      <p className="text-xs text-white/55">{subject.ar}</p>
                    </div>
                    <span className="rounded-full border border-[#6C63FF]/50 px-2 py-1 text-xs text-[#B7B2FF]">Coef {subject.coef}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-[#6C63FF] ${subject.progress}`} />
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="font-['Syne'] text-7xl font-extrabold leading-none text-white/15">01</p>
          <h3 className="font-['Syne'] text-5xl font-bold text-white">Check.dz</h3>
          <div className="flex flex-wrap gap-2">
            {['Baccalaureate', 'Algeria', 'EdTech'].map((tag) => (
              <span key={tag} className="rounded-full border border-[#6C63FF]/50 bg-[#6C63FF]/10 px-3 py-1 text-xs text-[#C9C5FF]">
                {tag}
              </span>
            ))}
          </div>

          <p className="max-w-xl text-2xl leading-snug text-white">The Bac Tracker Algerian Students Needed</p>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            A revision tracker built for Algerian Baccalaureate students. Launched on TikTok and went viral — hundreds
            of users in the first 72 hours.
          </p>

          <div className="flex flex-wrap gap-2">
            <TechPill label="Next.js" color="#6C63FF" />
            <TechPill label="Supabase" color="#6C63FF" />
            <TechPill label="Tailwind" color="#6C63FF" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <GlassCard key={stat.label} className="rounded-2xl p-4" accentColor="#6C63FF" hover={false}>
                <p className="text-sm text-white/70">{stat.icon} {stat.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  <span className="checkdz-counter" data-value={stat.value} data-suffix={stat.suffix}>
                    0{stat.suffix}
                  </span>
                </p>
              </GlassCard>
            ))}
          </div>

          <a href="#" className="inline-flex items-center text-[#8E87FF] underline-offset-4 transition hover:underline">
            ↗ Visit Check.dz
          </a>
        </div>
      </div>
    </section>
  );
}
