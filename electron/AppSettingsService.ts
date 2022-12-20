import { dialog } from 'electron/main';
import * as fs from 'fs';
import { AppSettings, DefaultAppSettings, SettingsFileName } from '../src/shared/dto/AppSettings';
import useFileReader from './file/FileReader';

type IAppSettingsService = {
  readAppSettings: () => AppSettings;
};

const useAppSettingsService = (settingsFilePath: string): IAppSettingsService => {
  const fileReader = useFileReader();
  const readAppSettings = (): AppSettings => {
    let output: AppSettings = DefaultAppSettings;
    const files = fs.readdirSync(settingsFilePath, { withFileTypes: true });
    files.forEach((file) => {
      if (file.name === SettingsFileName) {
        try {
          output = fileReader.readFile<AppSettings>(`${settingsFilePath}\\${file.name}`);
        } catch (ex: any) {
          dialog.showErrorBox('Config read error', `Error occurred while reading app settings. ${file.name}\r\n ${ex}`);
        }
      }
    });

    return output;
  };

  return {
    readAppSettings,
  };
};

export default useAppSettingsService;
