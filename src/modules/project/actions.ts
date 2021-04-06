import app from 'firebase/app'
import { createAction } from 'typesafe-actions'

import { Collection, ProjectOrderBy } from 'types/firebase'
import { CommunityProject, Commit } from 'types/project'

export const setCommunityProjects = createAction(
  'SET_COMMUNITY_PROJECT',
  action => (projects: CommunityProject[]) => action({ projects })
)

export const performProjectSearch = createAction(
  'PERFORM_PROJECT_SEARCH',
  action => (searchTerm: string) => action({ searchTerm })
)

// Used to update like count in UI without refetching projects
export const _incrementProjectLike = createAction(
  '_INCREMENT_PROJECT_LIKE',
  action => (projectId: string) => action({ projectId })
)

export const setSearchedProjects = createAction(
  'SET_SEARCHED_PROJECTS',
  action => (projects: CommunityProject[]) => action({ projects })
)

export const setCommunityOrderBy = createAction(
  'SET_COMMUNITY_ORDER_BY',
  action => (orderBy: ProjectOrderBy) => action({ orderBy })
)

export const setProjectSearchTerm = createAction(
  'SET_PROJECT_SEARCH_TERM',
  action => (text: string) => action({ text })
)

export const setIsFetchingProjects = createAction(
  'SET_FETCHING_COMMUNITY_PROJECTS',
  action => (isFetching = true) => action({ isFetching })
)

export const setHasFetchedAllProjects = createAction(
  'SET_HAS_FETCHED_ALL_PROJECTS',
  action => (value: boolean) => action(value)
)

export const addCommunityProjects = createAction(
  'ADD_COMMUNITY_PROJECTS',
  action => (
    projects: CommunityProject[],
    lastVisible: app.firestore.QueryDocumentSnapshot<
      app.firestore.DocumentData
    >,
    hasMore: boolean
  ) => action({ projects, lastVisible, hasMore })
)

export const deleteProject = createAction(
  'DELETE_PROJECT',
  action => (projectId: string) => action({ projectId })
)

export const fetchMoreCommunityProjects = createAction(
  'FETCH_MORE_COMMUNITY_PROJECTS',
  action => (orderBy?: ProjectOrderBy) => action({ orderBy })
)
