// src/lib/constants.js

// Site Configuration
export const SITE_CONFIG = {
  name: 'kyyspace',
  title: 'kyyspace - Web Developer Portfolio',
  description: 'Explore my collection of web applications built with modern technologies. Each project is powered by free APIs and deployed on Vercel.',
  url: 'https://kyyspace.vercel.app',
  author: 'kyyspace',
  keywords: ['portfolio', 'web developer', 'next.js', 'vercel', 'react'],
};

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/your-username',
  instagram: 'https://instagram.com/your-username',
  email: 'your.email@example.com',
};

// Navigation Links
export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// Category Icons
export const CATEGORY_ICONS = {
  all: '🌟',
  weather: '🌤️',
  anime: '🎌',
  movie: '🎬',
  prayer: '🕌',
};

// Category Labels
export const CATEGORY_LABELS = {
  all: 'All Projects',
  weather: 'Weather',
  anime: 'Anime',
  movie: 'Movie',
  prayer: 'Prayer',
};

// API Status Config
export const API_STATUS = {
  CHECKING: 'checking',
  ONLINE: 'online',
  OFFLINE: 'offline',
  TIMEOUT: 'timeout',
  UNKNOWN: 'unknown',
};

// API Check Timeout (milliseconds)
export const API_CHECK_TIMEOUT = 5000;

// View Modes
export const VIEW_MODES = {
  GRID: 'grid',
  BENTO: 'bento',
  LIST: 'list',
};

// Animation Durations (milliseconds)
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints (pixels)
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1400,
};

// Time Greetings
export const TIME_GREETINGS = {
  MORNING: { start: 5, end: 12, text: 'Good Morning' },
  AFTERNOON: { start: 12, end: 17, text: 'Good Afternoon' },
  EVENING: { start: 17, end: 21, text: 'Good Evening' },
  NIGHT: { start: 21, end: 5, text: 'Good Night' },
};

// Scroll Offset for smooth scroll
export const SCROLL_OFFSET = 80;

// Max particles for cursor trail
export const MAX_CURSOR_PARTICLES = 50;

// Particle creation throttle (milliseconds)
export const PARTICLE_THROTTLE = 30;

// Konami Code
export const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

// Confetti Config
export const CONFETTI_CONFIG = {
  particleCount: 150,
  duration: 5000, // Auto stop after 5 seconds
  colors: [
    'rgba(232, 85, 119, 1)',   // maroon-strong
    'rgba(201, 66, 102, 1)',   // maroon
    'rgba(255, 179, 204, 1)',  // accent
    'rgba(255, 224, 235, 1)',  // accent-strong
  ],
};

// Meta Tags
export const META_TAGS = {
  themeColor: '#c94266',
  tileColor: '#0f0509',
  appleTouchIcon: '/apple-touch-icon.png',
  favicon: '/favicon.ico',
};

// Default Project Screenshot
export const DEFAULT_SCREENSHOT = '/screenshots/placeholder.png';

// API Endpoints (if you have backend)
export const API_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
};

// Feature Flags
export const FEATURES = {
  cursorTrail: true,
  easterEgg: true,
  darkMode: false, // Set true if you add dark mode toggle
  analytics: false, // Set true if you add analytics
};