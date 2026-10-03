import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Works } from '@/components/sections/Works';
import { Product } from '@/components/sections/Product';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import projectsData from '@/data/projects.json';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Works projects={projectsData.projects} />
      <Product />
      <Skills />
      <Contact />
    </>
  );
}
