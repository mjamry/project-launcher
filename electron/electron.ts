/* eslint-disable import/no-extraneous-dependencies */
import {
  app, BrowserWindow, dialog, ipcMain,
} from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import IpcChannelTypes from '../src/shared/dto/IpcChannelTypes';
import useProjectFileConfigReader from './ConfigReader';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    win.webContents.openDevTools({ mode: 'detach' });

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

  win.webContents.on('did-finish-load', () => {
    const configPath = path.join('./', 'config');

    const configReader = useProjectFileConfigReader(configPath);
    const config = configReader.readAllFiles();

    win.webContents.send(IpcChannelTypes.appStarted, [...config]);
  });

  ipcMain.on('error', (event, data) => {
    dialog.showErrorBox(IpcChannelTypes.error, data);
  });
});
