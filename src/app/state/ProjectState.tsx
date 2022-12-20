import { atom } from 'recoil';
import { Project, ProjectFileName } from '../../shared/dto/ProjectDto';

const projectsState = atom<Project[]>({
  key: 'projectsState',
  default: [],
});

const projectsConfigFileNameState = atom<ProjectFileName[]>({
  key: 'projectsConfigFileNameState',
  default: [],
});

export { projectsState, projectsConfigFileNameState };
