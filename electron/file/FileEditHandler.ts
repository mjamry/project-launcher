// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import IpcChannelTypes from '../../src/shared/dto/IpcChannelTypes';
import useDialogService from '../DialogService';
import useFileWriter from './FileWriter';

type IFileEditorHandler = {
  init: () => void;
};

const useFileEditHandler = (win: BrowserWindow): IFileEditorHandler => {
  const fileWriter = useFileWriter();
  const dialogService = useDialogService(win);

  const init = () => {
    ipcMain.handle(IpcChannelTypes.saveEditedConfigFile, (
      event,
      fileName: string,
      fileContent: any,
    ) => {
      fileWriter.writeFile(
        `${path.join('./', 'config')}\\${fileName}`,
        fileContent,
        () => {},
        () => dialogService.fileSavedRestartAppQuestion(fileName),
      );
    });
  };

  return {
    init,
  };
};

export default useFileEditHandler;
