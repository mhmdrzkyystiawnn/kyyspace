'use client';

import styles from './Hero.module.css';

// Get time-based greeting
const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else if (hour >= 17 && hour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

export default function Hero() {
  const greeting = getGreeting();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Greeting */}
          <div className={styles.greeting}>
            <span className={styles.wave}>👋</span>
            <h2>{greeting}</h2>
          </div>

          {/* Main Title */}
          <h1 className={styles.title}>
            Welcome to My
            <span className={styles.highlight}> Project Showcase</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Explore my collection of web applications built with modern technologies. 
            Each project is powered by free APIs and deployed on Vercel.
          </p>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Free APIs</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>⚡</span>
              <span className={styles.statLabel}>Fast & Live</span>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <button className={styles.primaryBtn}>
              Explore Projects
              <span className={styles.arrow}>→</span>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
      </div>
    </section>
  );
}