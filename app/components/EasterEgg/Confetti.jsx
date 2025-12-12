'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Confetti.module.css';

// Confetti particle class
class ConfettiParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 4;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
    this.opacity = 1;
    // Maroon color variations
    this.colors = [
      'rgba(232, 85, 119, 1)',   // maroon-strong
      'rgba(201, 66, 102, 1)',   // maroon
      'rgba(255, 179, 204, 1)',  // accent
      'rgba(255, 224, 235, 1)',  // accent-strong
    ];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    
    // Fade out as it falls
    if (this.y > this.canvas.height * 0.7) {
      this.opacity -= 0.02;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }

  isDead() {
    return this.y > this.canvas.height || this.opacity <= 0;
  }
}

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export default function Confetti() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const [isActive, setIsActive] = useState(false);
  const konamiRef = useRef([]);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const triggerConfetti = () => {
    setIsActive(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create burst of confetti
    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        particlesRef.current.push(new ConfettiParticle(canvas));
      }, i * 10);
    }

    // Auto stop after 5 seconds
    setTimeout(() => {
      setIsActive(false);
    }, 5000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Konami code listener
    const handleKeyDown = (e) => {
      konamiRef.current.push(e.key);
      konamiRef.current = konamiRef.current.slice(-10);

      if (konamiRef.current.join(',') === KONAMI_CODE.join(',')) {
        triggerConfetti();
        konamiRef.current = [];
      }
    };

    // Triple click listener (alternative trigger)
    const handleClick = () => {
      clickCountRef.current++;
      
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }

      if (clickCountRef.current === 3) {
        triggerConfetti();
        clickCountRef.current = 0;
      }

      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return !particle.isDead();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
      {isActive && (
        <div className={styles.message}>
          🎉 Easter Egg Found! 🎉
        </div>
      )}
    </>
  );
}