export enum CreditName {
  FREE = 'Free',
  BASIC = 'Freelancer',
  PRO = 'Unlimited',
  WEB = 'Web export',
}

export const DEFAULT_USER_VALUES = {
  credits: {
    free: 2,
    basic: 0,
    pro: 0,
  },
  showTour: true,
};
