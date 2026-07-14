import { create } from 'zustand';
import { Problem, Tag, SearchFilters } from './types';
import * as dbFunctions from './db';

interface AppState {
  problems: Problem[];
  tags: Tag[];
  searchFilters: SearchFilters;
  selectedTags: string[];
  
  // Problem actions
  loadProblems: () => Promise<void>;
  addProblem: (problem: Omit<Problem, 'id'>) => Promise<void>;
  updateProblem: (problem: Problem) => Promise<void>;
  deleteProblem: (id: number) => Promise<void>;
  
  // Tag actions
  loadTags: () => Promise<void>;
  addTag: (tag: Tag) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  
  // Search actions
  setSearchText: (text: string) => Promise<void>;
  setSelectedTags: (tags: string[]) => Promise<void>;
  clearFilters: () => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  problems: [],
  tags: [],
  searchFilters: {},
  selectedTags: [],

  loadProblems: async () => {
    const problems = await dbFunctions.getAllProblems();
    set({ problems });
  },

  addProblem: async (problem) => {
    await dbFunctions.addProblem({
      ...problem,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const problems = await dbFunctions.getAllProblems();
    set({ problems });
  },

  updateProblem: async (problem) => {
    await dbFunctions.updateProblem({
      ...problem,
      updatedAt: Date.now(),
    });
    const problems = await dbFunctions.getAllProblems();
    set({ problems });
  },

  deleteProblem: async (id) => {
    await dbFunctions.deleteProblem(id);
    const problems = await dbFunctions.getAllProblems();
    set({ problems });
  },

  loadTags: async () => {
    const tags = await dbFunctions.getAllTags();
    set({ tags });
  },

  addTag: async (tag) => {
    await dbFunctions.addTag(tag);
    const tags = await dbFunctions.getAllTags();
    set({ tags });
  },

  deleteTag: async (id) => {
    await dbFunctions.deleteTag(id);
    const tags = await dbFunctions.getAllTags();
    const selectedTags = useStore.getState().selectedTags.filter(t => t !== id);
    set({ tags, selectedTags });
  },

  setSearchText: async (searchText) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, searchText }
    }));
    const state = useStore.getState();
    const results = await dbFunctions.searchProblems(searchText, state.selectedTags);
    set({ problems: results });
  },

  setSelectedTags: async (selectedTags) => {
    set({ selectedTags });
    const state = useStore.getState();
    const searchText = state.searchFilters.searchText || '';
    const results = await dbFunctions.searchProblems(searchText, selectedTags);
    set({ problems: results });
  },

  clearFilters: async () => {
    set({ searchFilters: {}, selectedTags: [] });
    const problems = await dbFunctions.getAllProblems();
    set({ problems });
  },
}));
