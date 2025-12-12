'use client';

import styles from './SearchFilter.module.css';

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}) {
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      all: '🌟',
      weather: '🌤️',
      anime: '🎌',
      movie: '🎬',
      prayer: '🕌',
    };
    return icons[category] || '📁';
  };

  const getCategoryLabel = (category) => {
    if (category === 'all') return 'All Projects';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className={styles.container}>
      {/* Search Input */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchIcon}>🔍</div>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button
            className={styles.clearBtn}
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className={styles.categoryWrapper}>
        <span className={styles.categoryLabel}>Filter:</span>
        <div className={styles.categoryButtons}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryBtn} ${
                selectedCategory === category ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className={styles.categoryIcon}>
                {getCategoryIcon(category)}
              </span>
              <span className={styles.categoryText}>
                {getCategoryLabel(category)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}