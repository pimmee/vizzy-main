import { getControllerValue } from '../value/selectors';
import { DefaultObject, VizzyItem } from 'core/types';
import { RootState } from 'store';
import { InitializableProject } from 'types/editor';

export function getProjectResolution(state: RootState) {
  const str = getControllerValue(state, DefaultObject.WEBGL_MANAGER, 'resolution', '') as string;
  const width = Number(str.split('x')[0]);
  const height = Number(str.split('x')[1]);

  return { width, height };
}

export function getProjectDuration(state: RootState): number {
  return getControllerValue(state, DefaultObject.PROJECT, 'projectDuration', 0);
}

export function projectHasSpectrumItem({ objects }: InitializableProject) {
  return Object.values(objects).some(obj => obj.type === VizzyItem.SPECTRUM);
}

export function getSpectrumFromProject({ objects }: InitializableProject) {
  return Object.values(objects).find(obj => obj.type === VizzyItem.SPECTRUM);
}

export function getProjectName(state: RootState): string {
  return getControllerValue(state, DefaultObject.PROJECT, 'projectName', '') as string;
}
