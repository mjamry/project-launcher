import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { AppUpdateDetails } from '../../shared/AppUpdateDetails';
import RestartAppButtons from './Snackbar/RestartAppButtons';
import useSnackbarService from '../services/SnackbarService';
import IpcChannelTypes from '../../shared/dto/IpcChannelTypes';
import useLoggerService from '../common/LoggerService';

function AppUpdate() {
  const snackbar = useSnackbarService();
  const logger = useLoggerService('appUpdate');

  useEffect(() => {
    ipcRenderer.on(IpcChannelTypes.appUpdate_newVersion, (event: any, data: AppUpdateDetails) => {
      logger.info(`New version available: ${data.version}, date: ${data.releaseDate}`);
    });

    ipcRenderer.on(
      IpcChannelTypes.appUpdate_readyToInstall,
      (event: any, data: AppUpdateDetails) => {
        logger.info(`New version ready to install: ${data.version}, date: ${data.releaseDate}`);
        snackbar.showInfoWithAction(`New app version is available: ${data.version}.\nIt will be installed after closing the app.\nDo you want to restart the app to apply changes ?`, (key) => (
          <RestartAppButtons
            snackbarKey={key}
            onClick={() => { ipcRenderer.send(IpcChannelTypes.appUpdate_install); }}
          />
        ));
      },
    );
  }, [logger, snackbar]);

  return (
    <></>
  );
}

export default AppUpdate;
