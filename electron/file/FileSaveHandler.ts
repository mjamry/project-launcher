// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from 'electron';
import IpcChannelTypes from '../../src/shared/dto/IpcChannelTypes';
import IpcResponseTypes from '../../src/shared/dto/IpcResponseTypes';
import useFileWriter from './FileWriter';

type IFileSaverHandler = {
  init: () => void;
};

const useFileSaveHandler = (filePath: string): IFileSaverHandler => {
  const fileWriter = useFileWriter();

  const init = () => {
    ipcMain.handle(IpcChannelTypes.saveConfigFile, (
      event,
      fileName: string,
      fileContent: string,
    ) => {
      const response = IpcResponseTypes.noError;
      fileWriter.writeFile(
        `${filePath}\\${fileName}`,
        fileContent,
      );

      return response;
    });

    ipcMain.handle(IpcChannelTypes.createConfigFile, (
      event,
      fileName: string,
      fileContent: string,
    ) => {
      let response = IpcResponseTypes.noError;
      fileWriter.createFile(
        `${filePath}\\${fileName}.prjson`,
        fileContent,
        () => { response = IpcResponseTypes.fileExistsError; },
      );

      return response;
    });
  };

  return {
    init,
  };
};

export default useFileSaveHandler;
