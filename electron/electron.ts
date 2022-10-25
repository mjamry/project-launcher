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
import { RestClientOptions, RestMethod } from '../src/shared/dto/RestClientTypes';
import useRestClient from '../src/shared/RestClient';

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

  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
    },
  );

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        'Access-Control-Allow-Origin': ['*'],
        'Access-Control-Allow-Headers': ['*'],
        'Access-Control-Allow-Methods': ['*'],
        ...details.responseHeaders,
      },
    });
  });

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
    console.debug('Loading app settings...');
    const settingsPath = path.join('./', 'config');
    const appSettingsService = useAppSettingsService(settingsPath);
    const appSettings = appSettingsService.readAppSettings();
    console.debug('App settings loaded', appSettings);
    win.webContents.send(IpcChannelTypes.appSettingsLoaded, appSettings);

    console.debug('Loading projects configs...');
    const configPath = path.join('./', 'config');
    const configReader = useProjectFileConfigReader(configPath);
    const projectsConfig = configReader.readAllFiles();
    console.debug(`Loaded ${projectsConfig.length} projects`);
    win.webContents.send(IpcChannelTypes.projectsConfigsLoaded, [...projectsConfig]);
  });

  ipcMain.on('error', (event, data) => {
    dialog.showErrorBox(IpcChannelTypes.error, data);
  });

  ipcMain.handle(RestMethod.post, async (
    event,
    options: RestClientOptions,
    url: string,
    headers: HeadersInit,
    body: object,
  ) => {
    const restClient = useRestClient(options);

    const response = await restClient
      .post<any>(url, body, headers)
      .catch((reason) => console.log(reason));
    return response;
  });
});
