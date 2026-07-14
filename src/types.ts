export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Problem {
  id?: number;
  title: string;
  description: string;
  solution: string;
  tags: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  source?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SearchFilters {
  searchText?: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}
