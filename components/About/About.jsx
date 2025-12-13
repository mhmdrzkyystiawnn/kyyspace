'use client';

import { motion } from 'framer-motion';
import { Tooltip } from '@/components/ui/tooltip-card';
import styles from './About.module.css';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className={styles.aboutContainer}>
      <motion.div
        className={styles.content}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className={styles.header}>
          <h2 className={styles.title}>About This Space</h2>
          <div className={styles.divider}></div>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants} className={styles.mainContent}>
          <div className={styles.textContent}>
            <div className={styles.description}>
              This website is a{' '}
              <Tooltip
                containerClassName={styles.tooltipWrapper}
                content={
                  <div className={styles.tooltipCard}>
                    <p className={styles.tooltipText}>
                      a central place that connects and showcases multiple projects
                    </p>
                  </div>
                }
              >
                <span className={styles.highlight}>hub</span>
              </Tooltip>
              {' '}where I collect the various website projects I&apos;ve worked on. It shows 
              previews, short descriptions, and links that lead to each project&apos;s live site.
            </div>

            <div className={styles.description}>
              Every project here has its own story. Some started as random ideas, some came from{' '}
              <Tooltip
                containerClassName={styles.tooltipWrapper}
                content={
                  <div className={styles.tooltipCard}>
                    <p className={styles.tooltipText}>
                      projects created as part of school assignments or learning exercises
                    </p>
                  </div>
                }
              >
                <span className={styles.highlight}>school tasks</span>
              </Tooltip>
              , others were pure design exploration or technical experiments. They&apos;re not all 
              perfect, but each one represents a step in the learning process.
            </div>

            <div className={styles.description}>
              This hub exists to keep everything in one place, so these projects can be seen as a{' '}
              <Tooltip
                containerClassName={styles.tooltipWrapper}
                content={
                  <div className={styles.tooltipCard}>
                    <p className={styles.tooltipText}>
                      an ongoing process of learning, improving, and building over time
                    </p>
                  </div>
                }
              >
                <span className={styles.highlight}>continuous journey</span>
              </Tooltip>
              {' '}rather than scattered, disconnected works.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}