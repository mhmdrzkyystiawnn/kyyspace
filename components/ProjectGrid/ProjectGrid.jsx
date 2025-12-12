'use client';

import { useState } from 'react';
import styles from './ProjectGrid.module.css';
import ProjectCard from '../ProjectCard/ProjectCard';
import PreviewModal from '../PreviewModal/PreviewModal';
import SearchFilter from '../SearchFilter/SearchFilter';
import ViewToggle from '../ViewToggle/ViewToggle';

export default function ProjectGrid({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      project.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(projects.map((p) => p.category))];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.sectionTitle}>My Projects</h2>
            <p className={styles.sectionSubtitle}>
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        {/* Search & Filter */}
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {/* Grid */}
        {filteredProjects.length > 0 ? (
          <div className={`${styles.grid} ${styles[viewMode]}`}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={styles.gridItem}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <ProjectCard
                  project={project}
                  onPreview={(proj) => setSelectedProject(proj)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>No projects found</h3>
            <p className={styles.emptyText}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
}