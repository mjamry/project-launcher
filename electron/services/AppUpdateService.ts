// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow } from 'electron';
import log from 'electron-log';
import IpcChannelTypes from '../../src/shared/dto/IpcChannelTypes';

const { autoUpdater } = require('electron-updater');

interface IAppUpdater {
  init: (win: BrowserWindow) => void;
  checkForUpdate: () => void;
  install: () => void;
}

const useAppUpdater = (): IAppUpdater => {
  const init = (win: BrowserWindow) => {
    log.transports.file.level = 'debug';
    autoUpdater.logger = log;

    autoUpdater.on('update-available', (info: any) => {
      log.debug('Update available', info);
      win.webContents.send(IpcChannelTypes.autoUpdateNewVersion, {
        version: info.version,
        releaseDate: info.releaseDate,
      });
    });

    autoUpdater.on('error', (err: any) => {
      log.error('Error in auto-updater. ', err);
    });

    autoUpdater.on('update-downloaded', (info: any) => {
      log.debug('Update downloaded', info);
      win.webContents.send(IpcChannelTypes.autoUpdateDownloaded, {
        version: info.version,
        releaseDate: info.releaseDate,
      });
    });
  };

  const checkForUpdate = async () => {
    const result = await autoUpdater.checkForUpdates();
    log.debug('Check for updates', result);
  };

  const install = () => {
    autoUpdater.quitAndInstall(false, true);
  };

  return {
    init,
    checkForUpdate,
    install,
  };
};

export default useAppUpdater;
