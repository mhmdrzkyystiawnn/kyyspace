// src/app/page.js
'use client'; 
import AnimatedBackground from '@/components/Background/AnimatedBackground';
import CursorTrail from '@/components/CursorTrail/CursorTrail';
import Confetti from '@/components/EasterEgg/Confetti';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import ProjectGrid from '@/components/ProjectGrid/ProjectGrid';
import About from '@/components/About/About'; // Import component About
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer';
import { projects } from '@/data/projects';

export default function Home() {
  return (
    <>
      {/* Background Effects */}
      <AnimatedBackground />
      <CursorTrail />
      <Confetti />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectGrid projects={projects} />
        </section>

        {/* About Section - Sekarang menggunakan component */}
        <section id="about" className="section">
          <About />
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}