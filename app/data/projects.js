// src/data/projects.js

export const projects = [
  {
    id: 1,
    title: "Weather App",
    description: "Real-time weather information with forecasts, current conditions, and location-based updates using OpenWeather API.",
    category: "weather",
    icon: "🌤️",
    url: "https://your-weather-app.vercel.app",
    apiUrl: "https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=demo",
    screenshot: "/screenshots/weather-app.png",
    tech: ["Next.js", "OpenWeather API", "Tailwind CSS", "Geolocation"],
  },
  {
    id: 2,
    title: "Anime Database",
    description: "Browse and search anime with detailed information, ratings, and reviews powered by Jikan API (MyAnimeList unofficial API).",
    category: "anime",
    icon: "🎌",
    url: "https://your-anime-db.vercel.app",
    apiUrl: "https://api.jikan.moe/v4/anime",
    screenshot: "/screenshots/anime-db.png",
    tech: ["Next.js", "Jikan API", "React", "Pagination"],
  },
  {
    id: 3,
    title: "Movie Database",
    description: "Discover trending movies, search by title, and get detailed information including cast, ratings, and trailers using TMDB API.",
    category: "movie",
    icon: "🎬",
    url: "https://your-movie-db.vercel.app",
    apiUrl: "https://api.themoviedb.org/3/movie/popular",
    screenshot: "/screenshots/movie-db.png",
    tech: ["Next.js", "TMDB API", "React Hooks", "Image Optimization"],
  },
  {
    id: 4,
    title: "Prayer Times",
    description: "Get accurate Islamic prayer times based on your location with Adhan notifications and Qibla direction using Aladhan API.",
    category: "prayer",
    icon: "🕌",
    url: "https://your-prayer-times.vercel.app",
    apiUrl: "https://api.aladhan.com/v1/timingsByCity",
    screenshot: "/screenshots/prayer-times.png",
    tech: ["Next.js", "Aladhan API", "Geolocation", "Notifications"],
  },
];

// Helper function to get unique categories
export const getCategories = () => {
  return ['all', ...new Set(projects.map(p => p.category))];
};

// Helper function to filter projects by category
export const filterByCategory = (category) => {
  if (category === 'all') return projects;
  return projects.filter(p => p.category === category);
};

// Helper function to search projects
export const searchProjects = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(p => 
    p.title.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.tech.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  );
};