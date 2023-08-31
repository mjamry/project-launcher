import * as fs from 'fs';

type IFileWriter = {
  writeFile<T>(
    fileName: string,
    content: T,
    error?: (error?: string) => void,
    success?: () => void): void;

  createFile<T>(
    fileName: string,
    content: T,
    error?: (error?: string) => void,
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

  function createFile<T>(
    fileName: string,
    content: T,
    error?: (error?: string) => void,
    success?: () => void,
  ): void {
    if (!fs.existsSync(fileName)) {
      writeFile(fileName, content, error, success);
    } else if (error) {
      error();
    }
  }

  return {
    writeFile,
    createFile,
  };
};

export default useFileWriter;
