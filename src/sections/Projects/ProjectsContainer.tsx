import CheckDz from './CheckDz';
import ClassFlow from './ClassFlow';
import Rwina from './Rwina';
import InkLink from './InkLink';

export default function ProjectsContainer() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="mb-6 text-3xl font-semibold text-white">Featured projects</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <CheckDz />
        <ClassFlow />
        <Rwina />
        <InkLink />
      </div>
    </section>
  );
}
