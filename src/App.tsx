import { useEffect, useState } from 'react';
import { Problem } from './types';
import { useStore } from './store';
import { ProblemForm } from './components/ProblemForm';
import { SearchBar } from './components/SearchBar';
import { ProblemList } from './components/ProblemList';
import { TagManager } from './components/TagManager';
import styles from './App.module.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | undefined>(undefined);
  const [showTagManager, setShowTagManager] = useState(false);

  const {
    problems,
    tags,
    selectedTags,
    loadProblems,
    loadTags,
    addProblem,
    updateProblem,
    deleteProblem,
    addTag,
    deleteTag,
    setSearchText,
    setSelectedTags,
    clearFilters,
  } = useStore();

  useEffect(() => {
    loadProblems();
    loadTags();
  }, []);

  const handleAddOrUpdateProblem = async (problem: Omit<Problem, 'id'>) => {
    if (editingProblem?.id) {
      await updateProblem({ ...problem, id: editingProblem.id });
      setEditingProblem(undefined);
    } else {
      await addProblem(problem);
    }
    setShowForm(false);
  };

  const handleEditProblem = (problem: Problem) => {
    setEditingProblem(problem);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProblem(undefined);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1>📚 Math Base</h1>
            <p>Your personal olympiad mathematics problem library</p>
          </div>
          <div className={styles.headerActions}>
            <button
              className={styles.managerBtn}
              onClick={() => setShowTagManager(!showTagManager)}
            >
              🏷️ {showTagManager ? 'Hide' : 'Manage'} Tags
            </button>
            <button
              className={styles.addBtn}
              onClick={() => {
                setEditingProblem(undefined);
                setShowForm(!showForm);
              }}
            >
              {showForm ? '✕ Cancel' : '+ Add Problem'}
            </button>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        {showTagManager && (
          <TagManager
            tags={tags}
            onAddTag={addTag}
            onDeleteTag={deleteTag}
          />
        )}

        {showForm && (
          <ProblemForm
            problem={editingProblem}
            tags={tags}
            onSubmit={handleAddOrUpdateProblem}
            onCancel={handleCancelForm}
          />
        )}

        <SearchBar
          onSearch={setSearchText}
          onTagsChange={setSelectedTags}
          tags={tags}
          selectedTags={selectedTags}
          onClearFilters={clearFilters}
        />

        <ProblemList
          problems={problems}
          onEdit={handleEditProblem}
          onDelete={deleteProblem}
        />
      </main>

      <footer className={styles.footer}>
        <p>Math Base © 2026 - Keep learning, keep growing! 🚀</p>
      </footer>
    </div>
  );
}

export default App;
