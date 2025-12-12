'use client';

import { useState, useEffect } from 'react';
import styles from './StatusBadge.module.css';

export default function StatusBadge({ apiUrl }) {
  const [status, setStatus] = useState('checking');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkApiStatus = async () => {
      if (!apiUrl) {
        setStatus('unknown');
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        await fetch(apiUrl, {
          method: 'HEAD',
          signal: controller.signal,
          mode: 'no-cors',
        });

        clearTimeout(timeoutId);
        setStatus('online');
      } catch (error) {
        if (error.name === 'AbortError') {
          setStatus('timeout');
        } else {
          setStatus('offline');
        }
      } finally {
        setIsVisible(true);
      }
    };

    checkApiStatus();
  }, [apiUrl]);

  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          label: 'Online',
          color: 'green',
          icon: '🟢',
        };
      case 'offline':
        return {
          label: 'Offline',
          color: 'red',
          icon: '🔴',
        };
      case 'timeout':
        return {
          label: 'Slow',
          color: 'yellow',
          icon: '🟡',
        };
      case 'checking':
        return {
          label: 'Checking',
          color: 'gray',
          icon: '⚪',
        };
      default:
        return {
          label: 'Unknown',
          color: 'gray',
          icon: '⚪',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      className={`${styles.badge} ${styles[config.color]} ${
        isVisible ? styles.visible : ''
      }`}
    >
      <span className={styles.pulse}></span>
      <span className={styles.icon}>{config.icon}</span>
      <span className={styles.label}>{config.label}</span>
    </div>
  );
}