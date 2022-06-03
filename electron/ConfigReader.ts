import { dialog } from 'electron/main';
import * as fs from 'fs';
import { Project } from '../shared/dto/ProjectDto';

type IProjectFileConfigReader = {
  readAllFiles: () => Project[];
};

const useProjectFileConfigReader = (configPath: string): IProjectFileConfigReader => {
  const getAllConfigFiles = () => fs.readdirSync(configPath, { withFileTypes: true });

  const loadProject = (fileName: string): Project => {
    const fileContent = fs.readFileSync(`${configPath}\\${fileName}`).toString();
    return JSON.parse(fileContent);
  };

  const readAllFiles = (): Project[] => {
    const files = getAllConfigFiles();

    const output: Project[] = [];
    files.forEach((file) => {
      try {
        output.push(loadProject(file.name));
      } catch (ex: any) {
        dialog.showErrorBox('Config read error', ex);
      }
    });

    return output;
  };

  return {
    readAllFiles,
  };
};

export default useProjectFileConfigReader;
