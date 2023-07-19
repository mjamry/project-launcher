// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, ipcMain } from 'electron';
import IpcChannelTypes from '../../src/shared/dto/IpcChannelTypes';
import useDialogService from '../DialogService';
import useFileWriter from './FileWriter';

type IFileSaverHandler = {
  init: () => void;
};

const useFileSaveHandler = (win: BrowserWindow, filePath: string): IFileSaverHandler => {
  const fileWriter = useFileWriter();
  const dialogService = useDialogService(win);

  const init = () => {
    ipcMain.handle(IpcChannelTypes.saveConfigFile, (
      event,
      fileName: string,
      fileContent: string,
    ) => {
      fileWriter.writeFile(
        `${filePath}\\${fileName}`,
        fileContent,
        () => {},
        () => dialogService.fileSavedRestartAppQuestion(fileName),
      );
    });

    ipcMain.handle(IpcChannelTypes.createConfigFile, (
      event,
      fileName: string,
      fileContent: string,
    ) => {
      fileWriter.writeFile(
        `${filePath}\\${fileName}.prjson`,
        fileContent,
        () => {},
        () => dialogService.fileSavedRestartAppQuestion(`${fileName}.prjson`),
      );
    });
  };

  return {
    init,
  };
};

export default useFileSaveHandler;
