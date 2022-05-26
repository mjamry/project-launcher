import { atom } from 'recoil';
import { Project } from '../common/dto/ProjectDto';

const projectsState = atom<Project[]>({
  key: 'projectsState',
  default: [],
});

export default projectsState;
