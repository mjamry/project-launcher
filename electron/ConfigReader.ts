import { dialog } from 'electron/main';
import * as fs from 'fs';
import * as path from 'path';
import { Project } from '../src/shared/dto/ProjectDto';
import useFileReader from './file/FileReader';

const ConfigFileExtension = '.prjson';

type IProjectFileConfigReader = {
  readAllFiles: () => Project[];
};

const useProjectFileConfigReader = (configPath: string): IProjectFileConfigReader => {
  const fileReader = useFileReader();
  const getAllConfigFiles = () => fs.readdirSync(configPath, { withFileTypes: true });

  const readAllFiles = (): Project[] => {
    const files = getAllConfigFiles();

    const output: Project[] = [];
    files.filter((f) => path.extname(f.name) === ConfigFileExtension).forEach((file) => {
      try {
        const config = fileReader.readFile<Project>(`${configPath}\\${file.name}`);
        output.push(config);
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
