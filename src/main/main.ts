import {app, BrowserWindow, ipcMain, session, globalShortcut, Menu} from 'electron';
import {join} from 'path';

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 484,
    height: 115,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    resizable: false,
    fullscreenable: false
  });

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'info',
          click: ()=>{
            mainWindow.webContents.send('info', '');
          }
        },
        {
          label: 'about',
          click: ()=>{
            mainWindow.webContents.send('about', '');
          }
        },
        {
          label: 'quit',
          click: ()=>{
            mainWindow.close();
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu);

  //mainWindow.setMenu(null);

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }

  globalShortcut.register('Ctrl+num0', () => {
    mainWindow.webContents.send('0shortcut', '');
  });

  globalShortcut.register('Ctrl+num1', () => {
    mainWindow.webContents.send('1shortcut', '');
  });
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);
})