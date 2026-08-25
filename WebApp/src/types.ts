export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription?: string;
  challenge?: string;
  solution?: string;
  client?: string;
  role?: string;
  heroImage?: string;
  colorPalette?: { hex: string; name: string }[];
  typography?: string;
  tags: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}
