import { atom } from 'recoil';
import AppState from '../../shared/dto/AppState';

const appLoadingState = atom<AppState>({
  key: 'appState',
  default: AppState.init,
});

export default appLoadingState;
