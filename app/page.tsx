// src/app/page.js
'use client'; 
import AnimatedBackground from '@/components/Background/AnimatedBackground';
import CursorTrail from '@/components/CursorTrail/CursorTrail';
import Confetti from '@/components/EasterEgg/Confetti';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import ProjectGrid from '@/components/ProjectGrid/ProjectGrid';
import About from '@/components/About/About'; // Import component About
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
          <div className="container">
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, var(--text-primary), var(--maroon-strong))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1.5rem',
              }}>
                Let&apos;s Connect
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--text-muted)',
                lineHeight: '1.8',
                marginBottom: '2rem',
              }}>
                I&apos;m always open to discussing new projects, creative ideas, 
                or opportunities to be part of your vision.
              </p>
              <a
                href="mailto:your.email@example.com"
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  background: 'linear-gradient(135deg, var(--maroon), var(--maroon-strong))',
                  color: 'var(--text-primary)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px var(--maroon-glow)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 30px var(--maroon-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px var(--maroon-glow)';
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}