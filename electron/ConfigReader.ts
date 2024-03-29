import { dialog } from 'electron/main';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Project, ProjectFileName } from '../src/shared/dto/ProjectDto';
import useFileReader from './file/FileReader';

const ConfigFileExtension = '.prjson';

type ProjectConfigData = {
  config: Project;
  fileName: ProjectFileName;
};

type IProjectFileConfigReader = {
  readAllFiles: () => Promise<ProjectConfigData[]>;
};

const useProjectFileConfigReader = (configPath: string): IProjectFileConfigReader => {
  const fileReader = useFileReader();
  const getAllConfigFiles = () => fs.readdir(configPath, { withFileTypes: true });

  const readAllFiles = async (): Promise<ProjectConfigData[]> => {
    const files = await getAllConfigFiles();

    const output: ProjectConfigData[] = [];
    files.filter((f) => path.extname(f.name) === ConfigFileExtension).forEach((file) => {
      try {
        const config = fileReader.readFile<Project>(`${configPath}\\${file.name}`);
        output.push({
          config,
          fileName: { id: config.id, fileName: file.name },
        });
      } catch (ex: any) {
        dialog.showErrorBox('Config read error', `Error occurred while loading file. ${file.name}\r\n ${ex}`);
      }
    });

    return output;
  };

  return {
    readAllFiles,
  };
};

export default useProjectFileConfigReader;
