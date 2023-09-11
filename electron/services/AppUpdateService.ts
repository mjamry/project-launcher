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
      log.debug('Update available', {
        version: info.version,
        tag: info.tag,
        releaseDate: info.releaseDate,
        path: info.path,
        sha512: info.sha512,
      });
      win.webContents.send(IpcChannelTypes.appUpdate_newVersion, {
        version: info.version,
        releaseDate: info.releaseDate,
      });
    });

    autoUpdater.on('error', (err: any) => {
      log.error('Error in auto-updater. ', err);
    });

    autoUpdater.on('update-downloaded', (info: any) => {
      log.debug('Update downloaded', {
        version: info.version,
        tag: info.tag,
        releaseDate: info.releaseDate,
        path: info.path,
        sha512: info.sha512,
        downloadedFile: info.downloadedFile,
      });
      win.webContents.send(IpcChannelTypes.appUpdate_readyToInstall, {
        version: info.version,
        releaseDate: info.releaseDate,
      });
    });
  };

  const checkForUpdate = () => {
    autoUpdater.checkForUpdates();
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
