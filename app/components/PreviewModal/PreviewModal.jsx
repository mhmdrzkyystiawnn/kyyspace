'use client';

import { useEffect, useRef } from 'react';
import styles from './PreviewModal.module.css';

export default function PreviewModal({ isOpen, onClose, project }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div ref={modalRef} className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>{project.title}</h2>
            <span className={styles.category}>{project.category}</span>
          </div>
          <button 
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Description */}
          <p className={styles.description}>{project.description}</p>

          {/* Tech Stack */}
          <div className={styles.techStack}>
            <span className={styles.techLabel}>Tech Stack:</span>
            <div className={styles.techList}>
              {project.tech.map((tech, index) => (
                <span key={index} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Preview iframe */}
          <div className={styles.previewContainer}>
            <div className={styles.browserBar}>
              <div className={styles.browserDots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.browserUrl}>{project.url}</div>
            </div>
            <iframe
              src={project.url}
              className={styles.iframe}
              title={`Preview of ${project.title}`}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visitBtn}
            >
              <span>Visit Live Site</span>
              <span className={styles.externalIcon}>↗</span>
            </a>
            <button className={styles.closeTextBtn} onClick={onClose}>
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}