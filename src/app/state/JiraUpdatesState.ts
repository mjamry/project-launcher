import { atom } from 'recoil';
import { JiraUpdate } from '../../shared/dto/JiraTypes';

const jiraUpdatesState = atom<JiraUpdate[]>({
  key: 'jiraUpdate',
  default: [],
});

const jiraHistoryState = atom<JiraUpdate[]>({
  key: 'jiraHistory',
  default: [],
});

export { jiraUpdatesState, jiraHistoryState };
