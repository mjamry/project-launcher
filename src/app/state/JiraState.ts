import { atom } from 'recoil';
import { JiraUpdate } from '../../shared/dto/JiraTypes';

const jiraUpdatesState = atom<JiraUpdate[]>({
  key: 'jiraUpdate',
  default: undefined,
});

const jiraHistoryState = atom<JiraUpdate[]>({
  key: 'jiraHistory',
  default: undefined,
});

export { jiraUpdatesState, jiraHistoryState };
