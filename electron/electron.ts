/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import {
  app, BrowserWindow, dialog, ipcMain,
} from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import IpcChannelTypes from '../src/shared/dto/IpcChannelTypes';
import useProjectFileConfigReader from './ConfigReader';
import useAppSettingsService from './AppSettingsService';
import useRestRequestsHandler from './RestRequestsHandler';
import useFileSaveHandler from './file/FileSaveHandler';

import packageJSON from '../package.json';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    titleBarStyle: 'hidden',
  });

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    // Hot Reloading on 'node_modules/.bin/electronPath'
    // eslint-disable-next-line global-require
    require('electron-reload')(__dirname, {
      electron: path.join(
        __dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        `electron${process.platform === 'win32' ? '.cmd' : ''}`,
      ),
      forceHardReset: true,
      hardResetMethod: 'exit',
    });
  }

  return win;
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    // eslint-disable-next-line no-console
    .then((name) => console.log(`Added Extension:  ${name}`))
    // eslint-disable-next-line no-console
    .catch((err) => console.log('An error occurred: ', err));

  const win = createWindow();
  const restRequestsHandler = useRestRequestsHandler();
  const fileEditHandler = useFileSaveHandler(app.getPath('userData'));
  restRequestsHandler.init();
  fileEditHandler.init();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  win.webContents.on('did-finish-load', async () => {
    console.log('did-finish-load');

    // this is required because <App /> is rendered twice,
    // so to avoid double file load and history fetch a simple flag was used
    let isAlreadyHandled = false;

    ipcMain.on(IpcChannelTypes.appInitialized, () => {
      if (!isAlreadyHandled) {
        isAlreadyHandled = true;

        win.webContents.send(IpcChannelTypes.appDetails, {
          version: packageJSON.version,
          name: packageJSON.appName,
          copyright: packageJSON.copyright,
        });

        console.debug('Loading app settings...');
        const settingsPath = app.getPath('userData');
        console.log(settingsPath);
        const appSettingsService = useAppSettingsService(settingsPath);

        appSettingsService
          .readAppSettings()
          .then((appSettings) => {
            if (appSettings.isDevelopment) {
              win.webContents.openDevTools({ mode: 'detach' });
            }
            console.debug('App settings loaded', appSettings);
            win.webContents.send(IpcChannelTypes.appSettingsLoaded, appSettings);
          })
          .then(() => {
            console.debug('Loading projects configs...');
            const configPath = app.getPath('userData');
            const configReader = useProjectFileConfigReader(configPath);
            configReader
              .readAllFiles()
              .then((projectsConfig) => {
                console.debug(`Loaded ${projectsConfig.length} projects`);

                win.webContents.send(
                  IpcChannelTypes.projectsConfigsLoaded,
                  projectsConfig.map((p) => p.config),
                );

                win.webContents.send(
                  IpcChannelTypes.projectsFileNameLoaded,
                  projectsConfig.map((p) => p.fileName),
                );
              });
          });
      }
    });
  });

  ipcMain.on('error', (event, data) => {
    dialog.showErrorBox(IpcChannelTypes.error, data);
  });

  ipcMain.on(IpcChannelTypes.appMinimize, () => {
    win.minimize();
  });

  ipcMain.on(IpcChannelTypes.appClose, () => {
    win.close();
  });

  ipcMain.on(IpcChannelTypes.appMaximize, () => {
    win.maximize();
  });

  ipcMain.on(IpcChannelTypes.appUnMaximize, () => {
    win.unmaximize();
  });

  ipcMain.on(IpcChannelTypes.appRestart, () => {
    app.relaunch();
    app.exit();
  });
});
