const url = require('url');
const path = require('path');
const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
  const indexPagePath = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  });

  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(indexPagePath);

  mainWindow.on('closed', () => { mainWindow = null; });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
