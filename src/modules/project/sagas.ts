import { put, call, select, actionChannel, take } from 'redux-saga/effects'
import { getType, ActionType } from 'typesafe-actions'

import * as Actions from './actions'
import Firebase from 'fbase/index'
import * as InfoActions from 'modules/info/actions'
import { RootState } from 'store'

function* fetchMoreCommunityProjects(
  action: ActionType<typeof Actions.fetchMoreCommunityProjects>
) {
  const state: RootState = yield select()
  // eslint-disable-next-line prefer-const
  let { community: projects, hasMore, orderBy, lastVisible } = state.project
  if (hasMore) {
    ;({ projects, lastVisible, hasMore } = yield call(
      [Firebase.Instance, Firebase.Instance.getCommunityProjects],
      lastVisible,
      orderBy
    ))

    if (projects.length && lastVisible) {
      yield put(Actions.addCommunityProjects(projects, lastVisible, hasMore))
    }
  } else {
    yield put(InfoActions.enqueueSnackbar({ message: 'All projects loaded' }))
  }
}

// function* deleteProject(action: ActionType<typeof Actions.deleteProject>) {
//   const { projectId } = action.payload;
//   const urlProjectId = getUrlProjectId();
//   // If current project is being deleted, reset
//   if (projectId === urlProjectId) {
//     yield put(Actions.resetProject());
//   }
//   try {
//     yield call([Firebase.Instance, Firebase.Instance.deleteProject], projectId);
//     yield put(InfoActions.enqueueSnackbar({ message: 'Project deleted', variant: 'success' }));
//   } catch (message) {
//     yield put(InfoActions.enqueueSnackbar({ message, variant: 'error' }));
//   }
// }

function* searchProjects(
  action: ActionType<typeof Actions.performProjectSearch>
) {
  const { searchTerm } = action.payload
  const projects = yield call(
    [Firebase.Instance, Firebase.Instance.searchCommunityProjects],
    searchTerm
  )

  yield put(Actions.setSearchedProjects(projects))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mappedFunctions: {
  [key: string]: (action: ActionType<any>) => any
} = {
  // [getType(Actions.deleteProject)]: deleteProject,
  [getType(Actions.fetchMoreCommunityProjects)]: fetchMoreCommunityProjects,
  [getType(Actions.setCommunityOrderBy)]: fetchMoreCommunityProjects,
  [getType(Actions.performProjectSearch)]: searchProjects,
}

export default function* projectSaga() {
  const channel = yield actionChannel(Object.keys(mappedFunctions))
  while (true) {
    const { type, payload } = yield take(channel)
    yield call(mappedFunctions[type], { payload })
  }
}
