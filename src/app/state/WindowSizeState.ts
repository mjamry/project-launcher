import { atom } from 'recoil';
import WindowSize from '../../shared/dto/WindowSize';

const windowSizeState = atom<WindowSize>({
  key: 'windowSizeState',
  default: undefined,
});

export default windowSizeState;
