import { AchievementInterface } from './user';

export interface ProjectMeta {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  lastEdited: Date;
  isCommunityProject: boolean;
  isTemplate: boolean;
  likes: number;
  clicks: number;
  ratings: number[];
  comments?: string[];
  thumbnail: string;
  description?: string;
  achievements?: AchievementInterface[];
}

export interface Commit {
  userId: string;
  forkedAt: Date;
  projectId?: string; // Started tracking 23 feb 2021
}

export interface UserProject {
  id: string;
  name: string;
  createdAt: Date;
  lastEdited: Date;
  thumbnail?: string;
  video?: string;
}

export interface CommunityProject extends ProjectMeta {
  username: string;
  userAvatar: string;
}
