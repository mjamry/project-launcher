import * as fs from 'fs';

type IFileWriter = {
  writeFile<T>(fileName: string, content: T): void;
};

const useFileWriter = () : IFileWriter => {
  function writeFile<T>(fileName: string, content: T): void {
    const fileContent = JSON.stringify(content);
    fs.writeFileSync(fileName, fileContent);
  }

  return {
    writeFile,
  };
};

export default useFileWriter;
