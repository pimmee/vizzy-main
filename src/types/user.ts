export type ColorType =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success '
  | 'warning'
  | 'danger'
  | 'rose'
  | 'transparent'
  | 'white'
  | 'dark';

export enum UserNotifcationType {
  NEW_PROJECT_COMMENT = 'new_project_comment',
  NEW_PROJECT_LIKE = 'new_project_like',
  ADMIN_UNPUBLISH_PROJECT = 'admin_unpublish_project',
  ADMIN_DELETE_PROJECT = 'admin_delete_project',
  ADMIN_BAN_USER = 'admin_ban_user',
}

export interface UserNotification {
  status: 'pending' | 'seen';
  type: UserNotifcationType;
  text: string;
  projectId?: string;
  commentId?: string;
  createdAt: Date;
}

export interface User {
  username: string;
  email: string;
  credits: {
    free: number;
    basic: number;
    pro: number;
  };
  showTour: boolean;
  wantNewsletter: boolean;
  customerId?: string; // Stripe customer id (e.g. cus_G40dlsqls)
  likedProjects?: string[];
  likedComments?: string[];
  dislikedComments?: string[];
  isAdmin?: boolean;
  avatar?: string;
  exportStatus?: string;
  id: string;
  achievements?: AchievementInterface[];
  notifications?: UserNotification[];
  createdAt?: Date;
  updatedAt?: Date;
  lastEdited?: Date;
  bannedUntil?: Date;
}

export enum AchievementID {
  WEEK_PROJECT = 'project_of_the_week',
}

export interface AchievementInterface {
  id: AchievementID;
  date: string;
  title?: string;
}
