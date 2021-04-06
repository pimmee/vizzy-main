import app from 'firebase/app'
import produce from 'immer'
import { ActionType, getType } from 'typesafe-actions'

import * as Actions from './actions'
import { ProjectOrderBy } from 'types/firebase'
import { CommunityProject, Commit } from 'types/project'

export interface ProjectState {
  community: CommunityProject[]
  searchedProjects: CommunityProject[]
  isSearching: boolean
  isFetching: boolean
  hasMore: boolean
  hasSearched: boolean
  showSearchedProjects: boolean
  orderBy: ProjectOrderBy
  lastVisible?: app.firestore.QueryDocumentSnapshot<app.firestore.DocumentData>
  commits: Commit[]
  searchTerm: string
}

export const initState: ProjectState = {
  community: [],
  searchedProjects: [],
  isSearching: false,
  isFetching: false,
  hasSearched: false,
  hasMore: true,
  orderBy: ProjectOrderBy.RECENT,
  commits: [],
  searchTerm: '',
  showSearchedProjects: false,
}

type Action = ActionType<typeof Actions>

const reducer = produce((draft: ProjectState, action: Action) => {
  switch (action.type) {
    case getType(Actions.fetchMoreCommunityProjects): {
      draft.isFetching = true
      return
    }

    case getType(Actions.setCommunityOrderBy): {
      const { orderBy } = action.payload
      draft.orderBy = orderBy
      draft.hasMore = orderBy !== ProjectOrderBy.STAFF_PICK
      draft.community = []
      draft.lastVisible = undefined
      return
    }

    case getType(Actions.setProjectSearchTerm): {
      const { text } = action.payload
      draft.searchTerm = text
      draft.hasSearched = false
      if (!text) {
        draft.showSearchedProjects = false
      }

      return
    }

    case getType(Actions.addCommunityProjects): {
      const { projects, lastVisible, hasMore } = action.payload
      draft.isFetching = false
      draft.hasMore = hasMore
      draft.community.push(...projects)
      draft.lastVisible = lastVisible
      return
    }

    case getType(Actions.setIsFetchingProjects): {
      const { isFetching } = action.payload
      draft.isFetching = isFetching
      return
    }

    case getType(Actions.setHasFetchedAllProjects): {
      draft.hasMore = !action.payload
      return
    }

    case getType(Actions.setCommunityProjects): {
      const { projects } = action.payload
      draft.community = projects
      return
    }

    case getType(Actions.performProjectSearch): {
      draft.isSearching = true
      return
    }

    case getType(Actions.setSearchedProjects): {
      const { projects } = action.payload
      draft.searchedProjects = projects
      draft.isSearching = false
      draft.hasSearched = true
      draft.showSearchedProjects = true

      return
    }

    case getType(Actions._incrementProjectLike): {
      const { projectId } = action.payload
      const project = draft.community.find(p => p.id === projectId)
      if (project) {
        project.likes += 1
      }
      return
    }

    default:
      break
  }
}, initState)

export default reducer
