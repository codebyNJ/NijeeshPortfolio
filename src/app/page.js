"use client";

import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectSection';
import MyLife from '@/components/Myjourney'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <ProjectsSection />
      <Contact />
      {/* Any other sections you want to add */}
    </main>
  );
}