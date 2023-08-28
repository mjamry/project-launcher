import { useRecoilState } from 'recoil';
import { SettingsFileName } from '../../shared/dto/AppSettings';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { projectsConfigFileNameState } from '../state/ProjectState';
import useLoggerService from '../common/LoggerService';
import { Project } from '../../shared/dto/ProjectDto';
import useSnackbarService from './SnackbarService';

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

  const invoke = (channel: string, filleName: string, content: string) => {
    try {
      ipcRenderer.invoke(
        channel,
        filleName,
        JSON.parse(content),
      );
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
