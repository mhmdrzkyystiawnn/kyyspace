'use client';

import styles from './Footer.module.css';
import { SOCIAL_LINKS } from '../../lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: SOCIAL_LINKS.github,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: SOCIAL_LINKS.instagram,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
          <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <h3 className={styles.logo}>kyyspace</h3>
            <p className={styles.tagline}>
              Building modern web experiences with passion & creativity.
            </p>
          </div>

          {/* Contact */}
          <div className={styles.contact}>
            <h4 className={styles.contactTitle}>Get in Touch</h4>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className={styles.email}
            >
              {SOCIAL_LINKS.email}
            </a>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} kyyspace. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with <span className={styles.heart}>♥</span> using Next.js & Vercel
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
    </footer>
  );
}