// src/hooks/useTimeGreeting.js
import { useState, useEffect } from 'react';

export const useTimeGreeting = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting('Good Morning');
      } else if (hour >= 12 && hour < 17) {
        setGreeting('Good Afternoon');
      } else if (hour >= 17 && hour < 21) {
        setGreeting('Good Evening');
      } else {
        setGreeting('Good Night');
      }
    };

    updateGreeting();

    // Update every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return greeting;
};