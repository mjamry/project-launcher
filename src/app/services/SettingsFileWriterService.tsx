import { useRecoilState } from 'recoil';
import { SettingsFileName } from '../../shared/dto/AppSettings';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { projectsConfigFileNameState } from '../state/ProjectState';

const { ipcRenderer } = window.require('electron');

type ISettingsFileWriterService = {
  writeAppSettingsFile: (fileContent: string) => void;
  writeProjectSettingsFile: (projectId: string, fileContent: string) => void;
  createProjectSettingsFile: (fileName: string, fileContent: string) => void;
};

const useSettingsFileWriterService = (): ISettingsFileWriterService => {
  const [projectsFileName] = useRecoilState(projectsConfigFileNameState);

  const writeAppSettingsFile = (fileContent: string) => {
    ipcRenderer.invoke(
      IpcChannelTypes.saveConfigFile,
      SettingsFileName,
      JSON.parse(fileContent),
    );
  };

  const writeProjectSettingsFile = (projectId: string, fileContent: string) => {
    ipcRenderer.invoke(
      IpcChannelTypes.saveConfigFile,
      projectsFileName.find((p) => p.id === projectId)!.fileName,
      JSON.parse(fileContent),
    );
  };

  const createProjectSettingsFile = (fileName: string, fileContent: string) => {
    ipcRenderer.invoke(
      IpcChannelTypes.createConfigFile,
      fileName,
      JSON.parse(fileContent),
    );
  };

  return {
    writeAppSettingsFile,
    writeProjectSettingsFile,
    createProjectSettingsFile,
  };
};

export default useSettingsFileWriterService;
