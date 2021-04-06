export interface DndItem extends DragItem {
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export interface DragItem {
  index: number;
  type: string;
}

export enum ObjectBreadcrumb {
  ROOT,
  OBJECT,
}

export interface CommunityComment extends ProjectComment {
  username?: string;
  avatar?: string;
}

export interface ProjectComment {
  id: string;
  text: string;
  userId: string;
  projectId: string;
  likes: string[]; // userIds
  dislikes: string[]; // userIds
  replies: string[];
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
}

export enum MediaType {
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
}

export interface UserMedia {
  id: string;
  url: string;
  origUrl: string;
  type: MediaType.AUDIO | MediaType.IMAGE | MediaType.VIDEO;
  duration?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  other?: any;
}
