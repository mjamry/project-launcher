const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  ipcMain.on('test-channel', (e, data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const win = createWindow();

  win.webContents.on('did-finish-load', () => {
    // eslint-disable-next-line no-console
    console.log('Did-finish-load');
    win.webContents.send('test', [
      {
        id: 'a1',
        name: 'TestProj1',
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

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
