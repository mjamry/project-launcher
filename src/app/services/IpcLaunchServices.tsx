const { shell } = window.require('electron');

type IIpcLaunchService = {
  launch: (location: string) => void;
};

export const useScriptLaunchService = (): IIpcLaunchService => {
  const launch = (path: string) => {
    shell.openPath(path);
  };

  return {
    launch,
  };
};

export const useLinkLaunchService = (): IIpcLaunchService => {
  const launch = (url: string) => {
    shell.openExternal(url);
  };

  return {
    launch,
  };
};
