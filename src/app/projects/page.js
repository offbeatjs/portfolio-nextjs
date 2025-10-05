'use client';

import React, { useState, useEffect } from 'react';
import styles from './projects.module.css';
import DarkAquamorphicBackground from '../components/DarkAquamorphicBackground';
import customProjectsData from '../data/projects.json';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  // Fetch projects from GitHub and combine with custom projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch from GitHub repos
        const [offbeatRepos, programmerOffbeatRepos] = await Promise.all([
          fetch('https://api.github.com/users/offbeatjs/repos?per_page=50&sort=updated').then(res => res.json()),
          fetch('https://api.github.com/users/programmer-offbeat/repos?per_page=50&sort=updated').then(res => res.json())
        ]);

        // Process GitHub repos
        const githubProjects = [...offbeatRepos, ...programmerOffbeatRepos]
          .filter(repo => !repo.fork && repo.description) // Filter out forks and repos without description
          .slice(0, 12) // Limit to 12 most recent
          .map((repo, index) => ({
            id: `github-${repo.id}`,
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || 'No description available',
            tech: repo.language ? [repo.language] : ['JavaScript'], // GitHub only provides primary language
            image: getProjectIcon(repo.language || 'JavaScript'),
            color: getProjectColor(index),
            github: repo.html_url,
            demo: repo.homepage || '#',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            updated: repo.updated_at,
            featured: repo.stargazers_count > 5 // Featured if has more than 5 stars
          }));

        // Combine with custom projects
        const allProjects = [
          ...customProjectsData.customProjects,
          ...githubProjects
        ];

        setProjects(allProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to custom projects only
        setProjects(customProjectsData.customProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper function to get project icon based on language
  const getProjectIcon = (language) => {
    const icons = {
      'JavaScript': '⚡',
      'TypeScript': '🔷',
      'Python': '🐍',
      'React': '⚛️',
      'Next.js': '▲',
      'Node.js': '�',
      'CSS': '🎨',
      'HTML': '🌐',
      'Vue': '💚',
      'PHP': '🐘',
      'Java': '☕',
      'C++': '⚙️',
      'Go': '🔵',
      'Rust': '🦀',
      'Swift': '🍎',
      'Kotlin': '📱',
      'default': '📦'
    };
    return icons[language] || icons.default;
  };

  // Helper function to get project color
  const getProjectColor = (index) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-purple-500 to-pink-600',
      'from-indigo-500 to-blue-600',
      'from-teal-500 to-green-600',
      'from-pink-500 to-rose-600',
      'from-cyan-500 to-blue-600'
    ];
    return colors[index % colors.length];
  };

  // Get all unique technologies
  const allTech = [...new Set(projects.flatMap(project => project.tech))];

  // Filter projects
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.tech.some(tech => tech.toLowerCase().includes(filter.toLowerCase())) ||
        project.language?.toLowerCase() === filter.toLowerCase()
      );

  return (
    <DarkAquamorphicBackground>
      <div className={styles.projects_page}>
        <div className={styles.hero_section}>
          <div className={styles.hero_content}>
            <h1 className={styles.page_title}>My Projects</h1>
            <p className={styles.page_subtitle}>
              Explore my creative journey through innovative projects from GitHub and custom builds
            </p>
          </div>
        </div>

        <div className={styles.container}>
          {/* Filter Section */}
          <div className={styles.filter_section}>
            <h3>Filter by Technology</h3>
            <div className={styles.filter_buttons}>
              <button 
                className={`${styles.filter_btn} ${filter === 'all' ? styles.active : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({projects.length})
              </button>
              {allTech.slice(0, 8).map(tech => { // Limit filter buttons
                const count = projects.filter(p => 
                  p.tech.some(t => t.toLowerCase().includes(tech.toLowerCase())) ||
                  p.language?.toLowerCase() === tech.toLowerCase()
                ).length;
                return (
                  <button 
                    key={tech}
                    className={`${styles.filter_btn} ${filter === tech ? styles.active : ''}`}
                    onClick={() => setFilter(tech)}
                  >
                    {tech} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className={styles.loading_container}>
              <div className={styles.loading_spinner}></div>
              <p>Fetching projects from GitHub...</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && (
            <div className={styles.projects_grid}>
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className={`${styles.project_card} ${project.featured ? styles.featured : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className={`${styles.card_header} bg-gradient-to-r ${project.color}`}>
                    <div className={styles.project_icon}>
                      {project.image}
                    </div>
                    {project.featured && (
                      <div className={styles.featured_badge}>Featured</div>
                    )}
                    <div className={styles.card_overlay}>
                      <div className={styles.project_links}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link_btn}>
                          <span>GitHub</span>
                        </a>
                        {project.demo !== '#' && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className={styles.link_btn}>
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.card_body}>
                    <h3 className={styles.project_title}>{project.title}</h3>
                    <p className={styles.project_description}>{project.description}</p>
                    
                    <div className={styles.tech_stack}>
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className={styles.tech_tag}
                          style={{ animationDelay: `${techIndex * 0.1}s` }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.language && !project.tech.includes(project.language) && (
                        <span className={`${styles.tech_tag} ${styles.primary_lang}`}>
                          {project.language}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.card_footer}>
                    <div className={styles.project_stats}>
                      {project.stars !== undefined && (
                        <span className={styles.stat}>
                          ⭐ {project.stars}
                        </span>
                      )}
                      {project.forks !== undefined && (
                        <span className={styles.stat}>
                          🍴 {project.forks}
                        </span>
                      )}
                      {project.updated && (
                        <span className={styles.stat}>
                          📅 {new Date(project.updated).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {hoveredProject === project.id && (
                    <div className={styles.hover_glow}></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* No projects found */}
          {!loading && filteredProjects.length === 0 && (
            <div className={styles.no_projects}>
              <p>No projects found matching your filter criteria.</p>
              <button 
                className={styles.clear_filter_btn}
                onClick={() => setFilter('all')}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </DarkAquamorphicBackground>
  );
}
