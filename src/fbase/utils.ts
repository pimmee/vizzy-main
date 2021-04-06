import app from 'firebase/app';

export const extractProjectMeta = (data: app.firestore.DocumentData) => ({
  id: data.id,
  name: data.name,
  userId: data.userId,
  isCommunityProject: data.isCommunityProject,
  likes: data.likes,
  clicks: data.clicks,
  comments: data.comments,
  thumbnail: data.thumbnail,
  description: data.description,
  achievements: data.achievements,
  createdAt: data.createdAt.toDate(),
  lastEdited: data.lastEdited.toDate(),
});
