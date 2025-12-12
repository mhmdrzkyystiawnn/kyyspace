'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ProjectCard.module.css';
import StatusBadge from '../StatusBadge/StatusBadge';

export default function ProjectCard({ project, onPreview }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
      isHovered ? 'scale(1.02)' : 'scale(1)'
    }`,
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glow Effect */}
      <div className={`${styles.glow} ${isHovered ? styles.glowActive : ''}`}></div>

      {/* Status Badge */}
      <div className={styles.statusWrapper}>
        <StatusBadge apiUrl={project.apiUrl} />
      </div>

      {/* Screenshot Preview */}
      <div className={styles.imageWrapper}>
        <Image
          src={project.screenshot}
          alt={project.title}
          className={styles.screenshot}
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
  );
}