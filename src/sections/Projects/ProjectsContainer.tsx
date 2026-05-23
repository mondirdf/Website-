import CheckDz from './CheckDz';
import ClassFlow from './ClassFlow';
import Rwina from './Rwina';
import InkLink from './InkLink';

const projects = [
  { id: 'check-dz', zIndex: 10, component: <CheckDz /> },
  { id: 'class-flow', zIndex: 20, component: <ClassFlow /> },
  { id: 'rwina', zIndex: 30, component: <Rwina /> },
  { id: 'ink-link', zIndex: 40, component: <InkLink /> },
];

export default function ProjectsContainer() {
  return (
    <section id="projects" className="bg-[#050508] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#00F5A0]">
            Selected Work ✦ 2024-2025
          </p>
          <h2 className="mt-4 font-['Syne'] text-5xl font-extrabold leading-none text-white md:text-7xl lg:text-[8vw]">
            Things I&apos;ve Built
          </h2>
          <p className="mt-4 text-base text-white/60 md:text-lg">Products used by real people.</p>
          <div className="mt-10 h-px w-full bg-white/10" />
        </div>

        <div className="relative">
          {projects.map((project) => (
            <section
              key={project.id}
              className="sticky top-0 min-h-screen overflow-hidden rounded-tl-3xl rounded-tr-3xl"
              style={{ zIndex: project.zIndex }}
            >
              {project.component}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
