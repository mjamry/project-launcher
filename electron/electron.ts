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
import { faker } from '@faker-js/faker';
import IpcChannelTypes from '../src/shared/dto/IpcChannelTypes';
import useProjectFileConfigReader from './ConfigReader';
import useAppSettingsService from './AppSettingsService';
import useJiraClient from './JiraClient';
import { JiraIssue, JiraUpdate } from '../src/shared/dto/JiraTypes';

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

    const jiraClient = useJiraClient(appSettings);

    const projectHistory: JiraUpdate[] = [];
    for (const project of projectsConfig) {
      if (project.jiraId) {
        const updates = await jiraClient.getHistoryForProject(project.jiraId);
        projectHistory.push(updates);
      }
    }

    win.webContents.send(IpcChannelTypes.jiraHistory, projectHistory);

    function createIssue(): JiraIssue {
      return {
        id: faker.helpers.arrayElement(['SMDXG-15', 'SMDXG-27', 'SMDXG-28', 'SMDXG-29']),
        summary: faker.hacker.phrase(),
        url: faker.internet.url(),
        assignee: faker.internet.email(),
        status: faker.helpers.arrayElement(['Open', 'Closed', 'Resolved', 'Waiting For Release']),
        description: faker.lorem.lines(2),
        updated: faker.date.recent(1),
        isNew: faker.datatype.boolean(),
        priority: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
      };
    }

    // TODO for testing purposes Only
    const jiraTestUpdates: JiraUpdate = {
      project: 'SMDXG',
      issues: [createIssue(), createIssue()],
    };

    setInterval(async () => {
      const projectUpdates: JiraUpdate[] = [];
      for (const project of projectsConfig) {
        if (project.jiraId) {
          const updates = await jiraClient.getUpdatesForProject(project.jiraId);
          if (jiraTestUpdates.project === updates.project) {
            updates.issues.push(jiraTestUpdates.issues[0]);
          }
          projectUpdates.push(updates);
        }
      }

      win.webContents.send(IpcChannelTypes.jiraUpdate, projectUpdates);
    }, 30000);
  });

  ipcMain.on('error', (event, data) => {
    dialog.showErrorBox(IpcChannelTypes.error, data);
  });
});
