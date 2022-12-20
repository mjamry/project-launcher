import * as fs from 'fs';

type IFileReader = {
  readFile<T>(fileName: string): T;
};

const useFileReader = () : IFileReader => {
  function readFile<T>(fileName: string): T {
    const fileContent = fs.readFileSync(fileName).toString();
    return JSON.parse(fileContent);
  }

  return {
    readFile,
  };
};

export default useFileReader;
