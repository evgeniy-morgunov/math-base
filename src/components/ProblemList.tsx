import React, { useState } from 'react';
import { Problem } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import styles from './ProblemList.module.css';

interface ProblemListProps {
  problems: Problem[];
  onEdit: (problem: Problem) => void;
  onDelete: (id: number) => void;
}

export const ProblemList: React.FC<ProblemListProps> = ({ problems, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number | undefined) => {
    if (id !== undefined) {
      setExpandedId(expandedId === id ? null : id);
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return styles.difficultyEasy;
      case 'medium':
        return styles.difficultyMedium;
      case 'hard':
        return styles.difficultyHard;
      default:
        return '';
    }
  };

  if (problems.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No problems found. Try adjusting your search or add a new problem!</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <h2>Problems ({problems.length})</h2>
      <div className={styles.problemsList}>
        {problems.map((problem) => (
          <div key={problem.id} className={styles.problemCard}>
            <div className={styles.cardHeader}>
              <div className={styles.titleSection}>
                <h3
                  onClick={() => toggleExpand(problem.id)}
                  className={styles.title}
                >
                  {problem.title}
                </h3>
                {problem.difficulty && (
                  <span className={`${styles.difficulty} ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                )}
              </div>
              <div className={styles.cardActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => onEdit(problem)}
                  title="Edit problem"
                >
                  ✏️
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this problem?')) {
                      onDelete(problem.id!);
                    }
                  }}
                  title="Delete problem"
                >
                  🗑️
                </button>
              </div>
            </div>

            {problem.tags.length > 0 && (
              <div className={styles.tagsSection}>
                {problem.tags.map(tag => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {expandedId === problem.id && (
              <div className={styles.cardDetails}>
                <div className={styles.section}>
                  <h4>Description</h4>
                  <div className={styles.markdown}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {problem.description}
                    </ReactMarkdown>
                  </div>
                  {problem.images && problem.images.filter(img => img.type === 'description').length > 0 && (
                    <div className={styles.imageGallery}>
                      {problem.images
                        .filter(img => img.type === 'description')
                        .map(img => (
                          <div key={img.id} className={styles.imageWrapper}>
                            <img src={img.data} alt={img.name} title={img.name} />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className={styles.section}>
                  <h4>Solution</h4>
                  <div className={styles.markdown}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {problem.solution}
                    </ReactMarkdown>
                  </div>
                  {problem.images && problem.images.filter(img => img.type === 'solution').length > 0 && (
                    <div className={styles.imageGallery}>
                      {problem.images
                        .filter(img => img.type === 'solution')
                        .map(img => (
                          <div key={img.id} className={styles.imageWrapper}>
                            <img src={img.data} alt={img.name} title={img.name} />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className={styles.meta}>
                  Created: {new Date(problem.createdAt).toLocaleDateString()}
                  {problem.updatedAt !== problem.createdAt &&
                    ` | Updated: ${new Date(problem.updatedAt).toLocaleDateString()}`}
                </div>
              </div>
            )}

            <button
              className={styles.expandBtn}
              onClick={() => toggleExpand(problem.id)}
            >
              {expandedId === problem.id ? '▼ Collapse' : '▶ View Details'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
