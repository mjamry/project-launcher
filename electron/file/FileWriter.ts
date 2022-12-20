import * as fs from 'fs';

type IFileWriter = {
  writeFile<T>(
    fileName: string,
    content: T,
    error?: (error: string) => void,
    success?: () => void): void;
};

const useFileWriter = () : IFileWriter => {
  function writeFile<T>(
    fileName: string,
    content: T,
    error?: (error: string) => void,
    success?: () => void,
  ): void {
    const fileContent = JSON.stringify(content);
    try {
      fs.writeFileSync(fileName, fileContent);
    } catch (ex: any) {
      if (error) {
        error(ex);
      }
    } finally {
      if (success) {
        success();
      }
    }
  }

  return {
    writeFile,
  };
};

export default useFileWriter;
