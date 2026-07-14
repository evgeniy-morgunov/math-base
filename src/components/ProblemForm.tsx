import React, { useState } from 'react';
import { Problem, Tag } from '../types';
import styles from './ProblemForm.module.css';

interface ProblemFormProps {
  problem?: Problem;
  tags: Tag[];
  onSubmit: (problem: Omit<Problem, 'id'>) => void;
  onCancel: () => void;
}

export const ProblemForm: React.FC<ProblemFormProps> = ({ problem, tags, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(problem?.title || '');
  const [description, setDescription] = useState(problem?.description || '');
  const [solution, setSolution] = useState(problem?.solution || '');
  const [selectedTags, setSelectedTags] = useState(problem?.tags || []);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(problem?.difficulty || 'medium');

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !solution.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      title,
      description,
      solution,
      tags: selectedTags,
      difficulty,
      createdAt: problem?.createdAt || Date.now(),
      updatedAt: Date.now(),
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>{problem ? 'Edit Problem' : 'Add New Problem'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Problem title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Problem description"
            rows={5}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="solution">Solution *</label>
          <textarea
            id="solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Problem solution"
            rows={5}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Tags</label>
          <div className={styles.tagsList}>
            {tags.length > 0 ? (
              tags.map(tag => (
                <label key={tag.id} className={styles.tagCheckbox}>
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                  />
                  <span>{tag.name}</span>
                </label>
              ))
            ) : (
              <p className={styles.noTags}>No tags available. Create some first!</p>
            )}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn}>
            {problem ? 'Update' : 'Create'} Problem
          </button>
          <button type="button" onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
