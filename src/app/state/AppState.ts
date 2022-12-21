import { atom } from 'recoil';
import { AppSettings, DefaultAppSettings } from '../../shared/dto/AppSettings';

const appSettingsState = atom<AppSettings>({
  key: 'appSettings',
  default: DefaultAppSettings,
});

export default appSettingsState;
