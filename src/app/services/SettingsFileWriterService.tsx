/* eslint-disable react/react-in-jsx-scope */
import { useRecoilState } from 'recoil';
import { SettingsFileName } from '../../shared/dto/AppSettings';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { projectsConfigFileNameState } from '../state/ProjectState';
import useLoggerService from '../common/LoggerService';
import { Project } from '../../shared/dto/ProjectDto';
import useSnackbarService from './SnackbarService';
import IpcResponseTypes from '../../shared/dto/IpcResponseTypes';

const { ipcRenderer } = window.require('electron');

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
        snackbar.showInfoWithRestartAction(message);
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
      projectsFileName.find((p: Project) => p.id === projectId)!.fileName,
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
