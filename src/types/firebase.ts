export enum Collection {
  IMAGES = 'images',
  AUDIOS = 'audios',
  PROJECTS = 'projects_v0.91',
  USERS = 'users',
  VIDEOS = 'videos',
  CUSTOMERS = 'stripe_customers',
  EXPORTS = 'exports',
  NEXUS = 'nexus',
  TEMPLATES = 'templates',
  ITEMS = 'items',
  CONTROLLERS = 'controllers',
  FOLDERS = 'folders',
  ELEMENTS = 'elements',
  SPECTRUM_PRESETS = 'spectrum_presets',
  COMMENTS = 'comments',
  WEEKLY_SUBMISSIONS = 'weekly_submissions',
  NOTIFICATIONS = 'notifications',
  BANNED_USERS = 'banned_users',
}

export enum ProjectOrderBy {
  POPULAR = 'likes',
  RECENT = 'createdAt',
  STAFF_PICK = 'staff_pick',
  VIEWED = 'clicks',
}
