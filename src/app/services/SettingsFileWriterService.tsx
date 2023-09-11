import React from 'react';
import { useRecoilState } from 'recoil';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { SettingsFileName } from '../../shared/dto/AppSettings';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { projectsConfigFileNameState } from '../state/ProjectState';
import useLoggerService from '../common/LoggerService';
import { ProjectFileName } from '../../shared/dto/ProjectDto';
import useSnackbarService from './SnackbarService';
import IpcResponseTypes from '../../shared/dto/IpcResponseTypes';
import RestartAppButtons from '../components/Snackbar/RestartAppButtons';

type ISettingsFileWriterService = {
  writeAppSettingsFile: (fileContent: string) => void;
  writeProjectSettingsFile: (projectId: string, fileContent: string) => void;
  createProjectSettingsFile: (fileName: string, fileContent: string) => void;
};

const useSettingsFileWriterService = (): ISettingsFileWriterService => {
  const [projectsFileName] = useRecoilState(projectsConfigFileNameState);
  const logger = useLoggerService('SFWS');
  const snackbar = useSnackbarService();

  const handleFileWriteResponse = (fileName: string, response: IpcResponseTypes) => {
    let message;
    switch (response) {
      case IpcResponseTypes.noError:
        message = `File "${fileName}" write success.\nDo you want to restart the app to apply changes ?`;
        logger.info(message);
        snackbar.showInfoWithAction(message, (key) => (
          <RestartAppButtons
            snackbarKey={key}
            onClick={() => { ipcRenderer.send(IpcChannelTypes.appRestart); }}
          />
        ));
        break;
      case IpcResponseTypes.fileExistsError:
        message = `File "${fileName}" already exists`;
        logger.warning(message);
        snackbar.showError(message);
        break;
      default:
        break;
    }
  };

  const invoke = (channel: string, fileName: string, content: string) => {
    try {
      ipcRenderer.invoke(
        channel,
        fileName,
        JSON.parse(content),
      ).then((result) => {
        handleFileWriteResponse(fileName, result);
      });
    } catch (ex: any) {
      const error = `${ex.message}`;
      logger.error(error);
      snackbar.showError(error);
    }
  };

  const writeAppSettingsFile = (fileContent: string) => {
    invoke(
      IpcChannelTypes.saveConfigFile,
      SettingsFileName,
      fileContent,
    );
  };

  const writeProjectSettingsFile = (projectId: string, fileContent: string) => {
    invoke(
      IpcChannelTypes.saveConfigFile,
      projectsFileName.find((p: ProjectFileName) => p.id === projectId)!.fileName,
      fileContent,
    );
  };

  const createProjectSettingsFile = (fileName: string, fileContent: string) => {
    invoke(
      IpcChannelTypes.createConfigFile,
      fileName,
      fileContent,
    );
  };

  return {
    writeAppSettingsFile,
    writeProjectSettingsFile,
    createProjectSettingsFile,
  };
};

export default useSettingsFileWriterService;
