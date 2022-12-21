import { useRecoilState } from 'recoil';
import { SettingsFileName } from '../../shared/dto/AppSettings';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import { projectsConfigFileNameState } from '../state/ProjectState';

const { ipcRenderer } = window.require('electron');

type ISettingsFileWriterService = {
  writeAppSettingsFile: (fileContent: string) => void;
  writeProjectSettingsFile:(projectId: string, fileContent: string) => void;
};

const useSettingsFileWriterService = (): ISettingsFileWriterService => {
  const [projectsFileName] = useRecoilState(projectsConfigFileNameState);

  const writeAppSettingsFile = (fileContent: string) => {
    ipcRenderer.invoke(
      IpcChannelTypes.saveEditedConfigFile,
      SettingsFileName,
      JSON.parse(fileContent),
    );
  };

  const writeProjectSettingsFile = (projectId: string, fileContent: string) => {
    ipcRenderer.invoke(
      IpcChannelTypes.saveEditedConfigFile,
      projectsFileName.find((p) => p.id === projectId)!.fileName,
      JSON.parse(fileContent),
    );
  };

  return {
    writeAppSettingsFile,
    writeProjectSettingsFile,
  };
};

export default useSettingsFileWriterService;
