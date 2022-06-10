import { atom } from 'recoil';
import { JiraUpdate } from '../../shared/dto/JiraTypes';

const jiraUpdatesState = atom<JiraUpdate[]>({
  key: 'jiraUpdate',
  default: [],
});

export default jiraUpdatesState;
