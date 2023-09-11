import { atom } from 'recoil';
import { AppDetails } from '../../shared/dto/AppDetails';

const appDetailsState = atom<AppDetails>({
  key: 'appDetails',
  default: undefined,
});

export default appDetailsState;
