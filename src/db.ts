import Dexie from 'dexie';
import { Problem, Tag } from './types';

export class MathDatabase extends Dexie {
  problems!: Dexie.Table<Problem, number>;
  tags!: Dexie.Table<Tag, string>;

  constructor() {
    super('MathBaseDB');
    this.version(1).stores({
      problems: '++id, createdAt, &title',
      tags: '&id, name'
    });
  }
}

export const db = new MathDatabase();

// Search functions
export async function searchProblems(searchText: string, selectedTags?: string[]): Promise<Problem[]> {
  let query = db.problems.toCollection();

  if (searchText.trim()) {
    const lowerText = searchText.toLowerCase();
    return query
      .filter(problem => 
        problem.title.toLowerCase().includes(lowerText) ||
        problem.description.toLowerCase().includes(lowerText) ||
        problem.solution.toLowerCase().includes(lowerText)
      )
      .toArray()
      .then(results => {
        if (selectedTags && selectedTags.length > 0) {
          return results.filter(problem =>
            selectedTags.some(tag => problem.tags.includes(tag))
          );
        }
        return results;
      });
  }

  if (selectedTags && selectedTags.length > 0) {
    return query
      .filter(problem =>
        selectedTags.some(tag => problem.tags.includes(tag))
      )
      .toArray();
  }

  return query.toArray();
}

export async function getAllProblems(): Promise<Problem[]> {
  return db.problems.toArray();
}

export async function getProblemById(id: number): Promise<Problem | undefined> {
  return db.problems.get(id);
}

export async function addProblem(problem: Omit<Problem, 'id'>): Promise<number> {
  return db.problems.add(problem as Problem);
}

export async function updateProblem(problem: Problem): Promise<void> {
  await db.problems.update(problem.id!, problem);
}

export async function deleteProblem(id: number): Promise<void> {
  await db.problems.delete(id);
}

export async function getAllTags(): Promise<Tag[]> {
  return db.tags.toArray();
}

export async function addTag(tag: Tag): Promise<string> {
  return db.tags.add(tag);
}

export async function deleteTag(id: string): Promise<void> {
  await db.tags.delete(id);
  // Remove tag from all problems
  const problems = await db.problems.toArray();
  await Promise.all(
    problems.map(problem => {
      const updatedTags = problem.tags.filter(t => t !== id);
      if (updatedTags.length !== problem.tags.length) {
        return db.problems.update(problem.id!, { ...problem, tags: updatedTags });
      }
      return Promise.resolve();
    })
  );
}
