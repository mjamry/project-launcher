import { atom } from 'recoil';
import {
  AppSettings, AppTheme, DefaultAppSettings, DefaultTheme,
} from '../../shared/dto/AppSettings';

const appSettingsState = atom<AppSettings>({
  key: 'appSettings',
  default: DefaultAppSettings,
});

const appThemeState = atom<AppTheme>({
  key: 'appTheme',
  default: DefaultTheme,
});

export { appSettingsState, appThemeState };
