import React, { useState } from 'react';
import { Problem, Tag, ImageAttachment } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import styles from './ProblemForm.module.css';

interface ProblemFormProps {
  problem?: Problem;
  tags: Tag[];
  onSubmit: (problem: Omit<Problem, 'id'>) => void;
  onCancel: () => void;
}

const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const ProblemForm: React.FC<ProblemFormProps> = ({ problem, tags, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(problem?.title || '');
  const [description, setDescription] = useState(problem?.description || '');
  const [solution, setSolution] = useState(problem?.solution || '');
  const [selectedTags, setSelectedTags] = useState(problem?.tags || []);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(problem?.difficulty || 'medium');
  const [images, setImages] = useState<ImageAttachment[]>(problem?.images || []);
  const [previewMode, setPreviewMode] = useState('edit');

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'description' | 'solution') => {
    const files = e.currentTarget.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files');
        continue;
      }

      try {
        const base64 = await imageToBase64(file);
        const newImage: ImageAttachment = {
          id: `img_${Date.now()}_${i}`,
          name: file.name,
          data: base64,
          type
        };
        setImages(prev => [...prev, newImage]);
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error uploading image');
      }
    }
  };

  const handleDeleteImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
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
      images,
      createdAt: problem?.createdAt || Date.now(),
      updatedAt: Date.now(),
    });
  };

  const descImages = images.filter(img => img.type === 'description');
  const solutionImages = images.filter(img => img.type === 'solution');

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
          <div className={styles.sectionHeader}>
            <label htmlFor="description">Description * (Markdown + LaTeX)</label>
            <div className={styles.tabs}>
              <button
                type="button"
                className={`${styles.tab} ${previewMode === 'descriptionEdit' ? styles.active : ''}`}
                onClick={() => setPreviewMode('descriptionEdit')}
              >
                Edit
              </button>
              <button
                type="button"
                className={`${styles.tab} ${previewMode === 'descriptionPreview' ? styles.active : ''}`}
                onClick={() => setPreviewMode('descriptionPreview')}
              >
                Preview
              </button>
            </div>
          </div>
          
          {previewMode === 'descriptionEdit' ? (
            <>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Problem description (supports Markdown and LaTeX: $x^2 + y^2 = z^2$)"
                rows={6}
                required
              />
              <div className={styles.imageUpload}>
                <label>Add images to description:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'description')}
                  className={styles.fileInput}
                />
                {descImages.length > 0 && (
                  <div className={styles.imageGallery}>
                    {descImages.map(img => (
                      <div key={img.id} className={styles.imageItem}>
                        <img src={img.data} alt={img.name} />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img.id)}
                          className={styles.deleteImgBtn}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.preview}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {description || '*No content to preview*'}
              </ReactMarkdown>
              {descImages.length > 0 && (
                <div className={styles.imageGallery}>
                  {descImages.map(img => (
                    <img key={img.id} src={img.data} alt={img.name} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.sectionHeader}>
            <label htmlFor="solution">Solution * (Markdown + LaTeX)</label>
            <div className={styles.tabs}>
              <button
                type="button"
                className={`${styles.tab} ${previewMode === 'solutionEdit' ? styles.active : ''}`}
                onClick={() => setPreviewMode('solutionEdit')}
              >
                Edit
              </button>
              <button
                type="button"
                className={`${styles.tab} ${previewMode === 'solutionPreview' ? styles.active : ''}`}
                onClick={() => setPreviewMode('solutionPreview')}
              >
                Preview
              </button>
            </div>
          </div>

          {previewMode === 'solutionEdit' ? (
            <>
              <textarea
                id="solution"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="Problem solution (supports Markdown and LaTeX)"
                rows={6}
                required
              />
              <div className={styles.imageUpload}>
                <label>Add images to solution:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'solution')}
                  className={styles.fileInput}
                />
                {solutionImages.length > 0 && (
                  <div className={styles.imageGallery}>
                    {solutionImages.map(img => (
                      <div key={img.id} className={styles.imageItem}>
                        <img src={img.data} alt={img.name} />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img.id)}
                          className={styles.deleteImgBtn}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.preview}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {solution || '*No content to preview*'}
              </ReactMarkdown>
              {solutionImages.length > 0 && (
                <div className={styles.imageGallery}>
                  {solutionImages.map(img => (
                    <img key={img.id} src={img.data} alt={img.name} />
                  ))}
                </div>
              )}
            </div>
          )}
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
