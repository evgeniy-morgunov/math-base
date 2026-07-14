import React, { useState } from 'react';
import { Tag } from '../types';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
  onTagsChange: (tags: string[]) => void;
  tags: Tag[];
  selectedTags: string[];
  onClearFilters: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onTagsChange,
  tags,
  selectedTags,
  onClearFilters,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text);
  };

  const handleTagToggle = (tagId: string) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter(t => t !== tagId)
      : [...selectedTags, tagId];
    onTagsChange(newTags);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search problems by title, description, or solution..."
          value={searchText}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filtersContainer}>
        <div className={styles.tagsFilter}>
          <h3>Filter by tags:</h3>
          <div className={styles.tagsList}>
            {tags.length > 0 ? (
              tags.map(tag => (
                <button
                  key={tag.id}
                  className={`${styles.tagButton} ${
                    selectedTags.includes(tag.id) ? styles.active : ''
                  }`}
                  onClick={() => handleTagToggle(tag.id)}
                >
                  {tag.name}
                </button>
              ))
            ) : (
              <p className={styles.noTags}>No tags yet</p>
            )}
          </div>
        </div>

        {(searchText || selectedTags.length > 0) && (
          <button className={styles.clearBtn} onClick={onClearFilters}>
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
};
