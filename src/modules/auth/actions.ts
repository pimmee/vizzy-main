import { createAction } from 'typesafe-actions'

import { AuthStage } from './reducer'
import { User } from 'types/user'

export const setUser = createAction('SET_USER', action => (user?: User) =>
  action({ user })
)

export const setIsLoading = createAction(
  'SET_IS_LOADING',
  action => (value: boolean) => action(value)
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setAuthUser = createAction(
  'SET_AUTH_USER',
  action => (user: any) => action({ user })
)

export const setShowAuthModal = createAction(
  'SET_SHOW_AUTH_MODAL',
  action => (show: boolean, stage?: AuthStage) => action({ show, stage })
)

export const setActiveAuthStage = createAction(
  'SET_ACTIVE_AUTH_STAGE',
  action => (activeStage: AuthStage) => action({ activeStage })
)
