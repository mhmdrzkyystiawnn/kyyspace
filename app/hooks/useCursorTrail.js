// src/hooks/useCursorTrail.js
import { useState, useEffect, useRef } from 'react';

export const useCursorTrail = (enabled = true) => {
  const [particles, setParticles] = useState([]);
  const lastTime = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      const now = Date.now();
      
      // Throttle particle creation (every 30ms)
      if (now - lastTime.current < 30) return;
      
      setParticles(prev => {
        const newParticles = [
          ...prev,
          {
            x: e.clientX,
            y: e.clientY,
            life: 1,
            id: now,
          }
        ];

        // Keep only recent particles (max 50)
        return newParticles.slice(-50);
      });

      lastTime.current = now;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  return particles;
};