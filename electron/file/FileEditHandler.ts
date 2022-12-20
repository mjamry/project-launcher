// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from 'electron';
import * as path from 'path';
import IpcChannelTypes from '../../src/shared/dto/IpcChannelTypes';
import useFileWriter from './FileWriter';

type IFileEditorHandler = {
  init: () => void;
};

const useFileEditHandler = (): IFileEditorHandler => {
  const fileWriter = useFileWriter();

  const init = () => {
    ipcMain.handle(IpcChannelTypes.saveEditedConfigFile, (
      event,
      fileName: string,
      fileContent: any,
    ) => {
      fileWriter.writeFile(`${path.join('./', 'config')}\\${fileName}`, fileContent);
    });
  };

  return {
    init,
  };
};

export default useFileEditHandler;
