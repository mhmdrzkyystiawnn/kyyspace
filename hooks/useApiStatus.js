// src/hooks/useApiStatus.js
import { useState, useEffect } from 'react';

export const useApiStatus = (apiUrl) => {
  const [status, setStatus] = useState('checking');
  const [lastChecked, setLastChecked] = useState(null);

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
        setLastChecked(new Date());
      } catch (error) {
        if (error.name === 'AbortError') {
          setStatus('timeout');
        } else {
          setStatus('offline');
        }
        setLastChecked(new Date());
      }
    };

    checkApiStatus();
  }, [apiUrl]);

  return { status, lastChecked };
};