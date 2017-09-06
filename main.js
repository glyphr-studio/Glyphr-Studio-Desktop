const electron = require('electron'),
      {app} = electron,
      {BrowserWindow} = electron,
      open = require('open');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    icon: process.platform === 'linux' && __dirname + '/images/appicon.png'
  });
  win.loadURL('file://' + __dirname + '/node_modules/Glyphr-Studio/dev/Glyphr_Studio_Electron.html');

  let webContents = win.webContents;

  webContents.on('new-window', function(event, url) {
    event.preventDefault();
    open(url);
  });

  // webContents.openDevTools()

  win.on('closed', function() {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (win === null) {
    createWindow();
  }
});
