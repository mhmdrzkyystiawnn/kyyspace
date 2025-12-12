'use client';

import styles from './ViewToggle.module.css';

export default function ViewToggle({ viewMode, setViewMode }) {
  const views = [
    {
      id: 'grid',
      label: 'Grid',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor" />
          <rect x="12" y="2" width="6" height="6" rx="1" fill="currentColor" />
          <rect x="2" y="12" width="6" height="6" rx="1" fill="currentColor" />
          <rect x="12" y="12" width="6" height="6" rx="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'bento',
      label: 'Bento',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor" />
          <rect x="12" y="2" width="6" height="16" rx="1" fill="currentColor" />
          <rect x="2" y="12" width="6" height="6" rx="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'list',
      label: 'List',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="3" width="16" height="3" rx="1" fill="currentColor" />
          <rect x="2" y="9" width="16" height="3" rx="1" fill="currentColor" />
          <rect x="2" y="15" width="16" height="3" rx="1" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <span className={styles.label}>View:</span>
      <div className={styles.toggleGroup}>
        {views.map((view) => (
          <button
            key={view.id}
            className={`${styles.toggleBtn} ${
              viewMode === view.id ? styles.active : ''
            }`}
            onClick={() => setViewMode(view.id)}
            aria-label={`${view.label} view`}
            title={`${view.label} view`}
          >
            <span className={styles.icon}>{view.icon}</span>
            <span className={styles.text}>{view.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}