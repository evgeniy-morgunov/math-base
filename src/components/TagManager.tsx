import React, { useState } from 'react';
import { Tag } from '../types';
import styles from './TagManager.module.css';

interface TagManagerProps {
  tags: Tag[];
  onAddTag: (tag: Tag) => void;
  onDeleteTag: (id: string) => void;
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

export const TagManager: React.FC<TagManagerProps> = ({ tags, onAddTag, onDeleteTag }) => {
  const [tagName, setTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleAddTag = () => {
    if (!tagName.trim()) {
      alert('Please enter a tag name');
      return;
    }

    if (tags.some(t => t.name.toLowerCase() === tagName.toLowerCase())) {
      alert('Tag already exists');
      return;
    }

    onAddTag({
      id: `tag_${Date.now()}`,
      name: tagName.trim(),
      color: selectedColor,
    });

    setTagName('');
    setSelectedColor(COLORS[0]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <div className={styles.tagManager}>
      <h2>Tag Manager</h2>
      
      <div className={styles.addTagSection}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter new tag name..."
            className={styles.tagInput}
          />
          <div className={styles.colorPicker}>
            {COLORS.map(color => (
              <button
                key={color}
                className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={`Select color ${color}`}
              />
            ))}
          </div>
          <button onClick={handleAddTag} className={styles.addBtn}>
            + Add Tag
          </button>
        </div>
      </div>

      <div className={styles.tagsList}>
        <h3>Existing Tags ({tags.length})</h3>
        {tags.length > 0 ? (
          <div className={styles.tags}>
            {tags.map(tag => (
              <div key={tag.id} className={styles.tagItem}>
                <div className={styles.tagContent}>
                  <span
                    className={styles.tagBadge}
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Delete tag "${tag.name}"?`)) {
                      onDeleteTag(tag.id);
                    }
                  }}
                  className={styles.deleteTagBtn}
                  title="Delete tag"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noTags}>No tags yet. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};
