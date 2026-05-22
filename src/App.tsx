import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './sections/Hero/Hero';
import ProjectsContainer from './sections/Projects/ProjectsContainer';
import Contact from './sections/Contact/Contact';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Hero />
      <ProjectsContainer />
      <Contact />
    </>
  );
}
