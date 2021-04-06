import produce from 'immer'
import { ActionType, getType } from 'typesafe-actions'

import * as Actions from './actions'
import { User } from 'types/user'

export enum AuthStage {
  SIGN_IN = 'sign_in',
  SIGN_UP = 'sign_up',
  FORGOT_PW = 'forgot_pw',
}

export interface AuthState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authUser: any // authUser is null if not authenticated (withAuthentication)
  loading: boolean
  user?: User
  showModal: boolean
  activeStage?: AuthStage
}

const initState: AuthState = {
  authUser: null,
  loading: false,
  showModal: false,
}

type Action = ActionType<typeof Actions>

const reducer = produce((draft, action) => {
  switch (action.type) {
    case getType(Actions.setUser): {
      const { user } = action.payload
      draft.user = user
      return
    }
    case getType(Actions.setIsLoading):
      draft.loading = action.payload
      return

    case getType(Actions.setAuthUser): {
      draft.authUser = action.payload.user
      return
    }

    case getType(Actions.setShowAuthModal):
      const { show, stage } = action.payload
      draft.showModal = show
      draft.activeStage = show ? stage || AuthStage.SIGN_IN : undefined
      return

    case getType(Actions.setActiveAuthStage):
      const { activeStage } = action.payload
      draft.activeStage = activeStage
      return

    default:
      break
  }
}, initState)

export default reducer
