/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

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
    win.webContents.send('test', [
      {
        id: 'a1',
        name: 'TestProj1',
        avatarUrl: 'data:image/jpeg;base64,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',
        jiraId: 'TST1',
        description: 'Test proj 1 descr',
        links: [
          {
            name: 'Git',
            url: 'http://github.com',
          },
          {
            name: 'Jira',
            url: 'http://jira.com',
          },
        ],
        scripts: [
          {
            name: 'Test',
            path: 'E:/Projects/GitHub/plan-your-trip/scripts/run.bat',
          },
          {
            name: 'Sln',
            path: 'E:\\Projects\\GitHub\\plan-your-trip\\src\\TripPlanner.sln',
          },
          {
            name: 'Front',
            path: 'E:/Projects/GitHub/plan-your-trip/.vscode/pyt-frontend.code-workspace',
          },
        ],
      },
      {
        id: 'a2',
        name: 'TestProj2',
        jiraId: 'TST2',
        description: 'Test proj 2 descr',
      },
    ]);
  });
});
