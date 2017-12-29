const electron = require('electron')
const {app} = electron
const {BrowserWindow} = electron
const open = require('open')
const path = require('path')

let win

function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    icon: process.platform === 'linux' && path.join(__dirname, '/images/appicon.png')
  })
  win.loadURL(path.join('file://', __dirname, '/node_modules/Glyphr-Studio/dev/Glyphr_Studio_Electron.html'))

  let webContents = win.webContents

  // enable for debugging
  // win.webContents.openDevTools();

  webContents.on('new-window', function (event, url) {
    event.preventDefault()
    open(url)
  })

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})
