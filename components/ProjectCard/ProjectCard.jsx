'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import styles from './ProjectCard.module.css';
import StatusBadge from '@/components/StatusBagde/StatusBadge';

// CometCard Wrapper Component
const CometCard = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 25, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 25, mass: 0.5 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-8px', '8px']);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ['-8px', '8px']);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [20, 80]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 40%, rgba(255, 255, 255, 0) 100%)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5);
    const yPct = (mouseY / height - 0.5);
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: '1200px' }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.03,
          transition: { 
            duration: 0.4, 
            ease: [0.25, 0.1, 0.25, 1.0],
          },
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 25,
        }}
        className={styles.cometWrapper}
      >
        {children}
        <motion.div
          className={styles.glareEffect}
          style={{
            background: glareBackground,
          }}
          transition={{ 
            duration: 0.3,
            ease: 'easeOut',
          }}
        />
      </motion.div>
    </div>
  );
};

export default function ProjectCard({ project, onPreview }) {
  return (
    <CometCard>
      <div className={styles.card}>
        {/* Glow Effect */}
        <div className={styles.glow}></div>

        {/* Status Badge */}
        <div className={styles.statusWrapper}>
          <StatusBadge apiUrl={project.apiUrl} />
        </div>

        {/* Screenshot Preview */}
        <div className={styles.imageWrapper}>
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            className={styles.screenshot}
            sizes="100vw"
          />
          <div className={styles.imageOverlay}></div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Category & Title */}
          <div className={styles.header}>
            <span className={styles.category}>
              {project.icon} {project.category}
            </span>
            <h3 className={styles.title}>{project.title}</h3>
          </div>

          {/* Description */}
          <p className={styles.description}>{project.description}</p>

          {/* Tech Stack */}
          <div className={styles.techStack}>
            {project.tech.map((tech, index) => (
              <span key={index} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={styles.previewBtn}
              onClick={() => onPreview(project)}
            >
              <span>Quick Demo</span>
              <span className={styles.icon}>👁️</span>
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visitBtn}
            >
              <span>Visit</span>
              <span className={styles.arrow}>↗</span>
            </a>
          </div>
        </div>

        {/* Shine Effect */}
        <div className={styles.shine}></div>
      </div>
    </CometCard>
  );
}