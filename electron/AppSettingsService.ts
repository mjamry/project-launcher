import { dialog } from 'electron/main';
import * as fs from 'fs';
import { AppSettings, DefaultAppSettings } from '../src/shared/dto/AppSettings';

const SettingsFileName = 'appSettings.json';

type IAppSettingsService = {
  readAppSettings: () => AppSettings;
  writeAppSettings: (settings: AppSettings) => void;
};

const useAppSettingsService = (settingsFilePath: string): IAppSettingsService => {
  const readAppSettings = (): AppSettings => {
    let output: AppSettings = DefaultAppSettings;
    const files = fs.readdirSync(settingsFilePath, { withFileTypes: true });
    files.forEach((file) => {
      if (file.name === SettingsFileName) {
        try {
          const fileContent = fs.readFileSync(`${settingsFilePath}\\${file.name}`).toString();
          output = JSON.parse(fileContent);
        } catch (ex: any) {
          dialog.showErrorBox('Config read error', `Error occurred while reading app settings. ${file.name}\r\n ${ex}`);
        }
      }
    });

    return output;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const writeAppSettings = (settings: AppSettings) => {
    // TODO
  };

  return {
    readAppSettings,
    writeAppSettings,
  };
};

export default useAppSettingsService;
