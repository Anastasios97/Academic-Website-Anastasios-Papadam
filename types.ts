export interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  abstract?: string;
  role?: 'First author' | 'Co-author';
  tags?: string[];
}

export interface Conference {
  title: string;
  authors: string;
  event: string;
  year: number;
  location: string;
}
