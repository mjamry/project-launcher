import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { AppUpdateDetails } from '../../shared/AppUpdateDetails';
import RestartAppButtons from '../components/Snackbar/RestartAppButtons';
import useSnackbarService from './SnackbarService';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';

interface IAppUpdateService {
  updateAvailable: (info: AppUpdateDetails) => void;
  updateDownloaded: (info: AppUpdateDetails) => void;
}

const useAppUpdateService = (): IAppUpdateService => {
  const snackbar = useSnackbarService();

  const updateAvailable = (info: AppUpdateDetails) => {
    // eslint-disable-next-line no-console
    console.debug('update', info);
    snackbar.showInfo(`App update available.\nNew version: ${info.version}`);
  };

  const updateDownloaded = (info: AppUpdateDetails) => {
    snackbar.showInfoWithAction(`App Restart is required, to install new version ${info.version}`, (key) => (
      <RestartAppButtons
        snackbarKey={key}
        onClick={() => { ipcRenderer.send(IpcChannelTypes.autoUpdateInstall); }}
      />
    ));
  };

  return {
    updateAvailable,
    updateDownloaded,
  };
};

export default useAppUpdateService;
