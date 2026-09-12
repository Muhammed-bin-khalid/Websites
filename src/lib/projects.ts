import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  technologies: string[];
  completionDate: string;
  createdAt: number;
}

const PROJECTS_KEY = 'projects';

export async function getAllProjects(): Promise<Project[]> {
  const projects = await redis.get<Project[]>(PROJECTS_KEY);
  return projects || [];
}

export async function getProject(id: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find(p => p.id === id) || null;
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  const projects = await getAllProjects();
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  projects.push(newProject);
  await redis.set(PROJECTS_KEY, projects);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> {
  const projects = await getAllProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updates };
  await redis.set(PROJECTS_KEY, projects);
  return projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getAllProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;
  await redis.set(PROJECTS_KEY, filtered);
  return true;
}
