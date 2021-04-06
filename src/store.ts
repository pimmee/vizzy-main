import { TypedUseSelectorHook, useSelector as useNonTypedSelector } from 'react-redux';

import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';

import { authReducer, AuthState } from 'modules/Auth';
import { projectReducer, projectSaga, ProjectState } from 'modules/Project';
import { infoReducer, InfoState } from 'modules/Info';

export const rootReducer = combineReducers({
  auth: authReducer,
  info: infoReducer,
  project: projectReducer,
});

export function* rootSaga() {
  yield all([call(projectSaga)]);
}

export type RootState = {
  auth: AuthState;
  info: InfoState;
  project: ProjectState;
};

export const useSelector: TypedUseSelectorHook<RootState> = useNonTypedSelector;
