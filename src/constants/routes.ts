export enum NavigationTab {
  OVERVIEW = 'overview',
  TEMPLATES = 'templates',
  QUICK_MODE = 'quick',
  CREATOR_MODE = 'creator',
  COMMUNITY = 'community',
  LYRICS = 'lyrics',
  FAQ = 'faq',
  PRICING = 'pricing',
  PROJECT = 'project',
}

const ROUTES = {
  LANDING: '/',
  DISCOVER: '/discover',
  PROFILE: '/profile',
  PRICING: `/discover?tab=${NavigationTab.PRICING}`,
  SIGN_IN: '/login',
  SIGN_UP: '/register',
  CHECKOUT: '/checkout',
  ADVANCED: '/advanced',
  LYRICS: '/lyrics',
  TEMPLATES: `/discover?tab=${NavigationTab.TEMPLATES}`,
  COMMUNITY: `/community`,
  ALPHA: '/alpha',
  EDITOR: '/editor',
  CREATIONS: '/creations',
  EXPORT: '/export',
  FAQ: `/discover?tab=${NavigationTab.FAQ}`,
  FORGOT_PASSWORD: '/forgot-password',
  TERMS_OF_SERVICE: '/terms-of-service',
  PROJECT: '/project',
  PRIVACY: '/privacy',
  CONTACT: '/contact',
  CHANGELOG: '/changelog',
  ROADMAP: '/roadmap',
  TUTORIALS: '/tutorials',
  USER: '/user',
};

export default ROUTES;
