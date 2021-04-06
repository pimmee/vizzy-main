import { default as authReducer } from './auth/reducer';

export { authReducer };
export type AuthState = import('./auth/reducer').AuthState;
