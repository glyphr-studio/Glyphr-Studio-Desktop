const electron = require('electron')
const { app, BrowserWindow, ipcMain: ipc, dialog, Menu } = electron
const contextMenu = require('electron-context-menu')
const { download } = require('electron-dl')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
const fs = require('fs-extra')

let win
let menuTemplate

/**
 * IPC Handlers
 */

// handle app exit
ipc.handle('exit', () => {
  app.exit()
})

// handle close confirmation dialog
ipc.handle('confirmClose', async (event, fileName) => {
  let name = 'your project'

  if (fileName) {
    name = path.basename(fileName)
  }

  const result = await dialog.showMessageBox({
    type: 'question',
    title: 'Confirm',
    buttons: ['Save', 'Cancel', 'Don\'t Save'],
    message: `Would you like to save the changes you made to ${name} before closing?`
  })

  return result
})

// handle saving canvas as image
ipc.handle('saveCanvasImage', async (event, data) => {
  await download(win, data, { saveAs: true })
})

// handle saving new project with confirmation dialog
ipc.handle('saveProject', async (event, fname, buffer) => {
  const { filePath } = await dialog.showSaveDialog({
    properties: ['openFile'],
    title: 'Choose where to save project...',
    defaultPath: process.env.HOME + '/' + fname
  })

  if (filePath) {
    await fs.outputFile(filePath, buffer)
  }

  return filePath
})

// handle quick overwrite save of project in progress
ipc.handle('saveProjectOverwrite', async (event, file, buffer) => {
  await fs.outputFile(file, buffer)
})

// handle enabling of save menu
ipc.handle('enableSaveMenu', () => {
  // overrride some renderer keyboard shortcuts in favor of electron accelerators
  win.webContents.on('before-input-event', (event, input) => {
    // save
    if ((input.control || input.meta) && input.key.toLowerCase() === 's') {
      event.preventDefault()
      win.webContents.send('ping', 'save')
    }

    // save as
    if ((input.control || input.meta) && input.shift && input.key.toLowerCase() === 's') {
      event.preventDefault()
      win.webContents.send('ping', 'saveas')
    }
  })

  // menu positioning differs depending on the OS
  let i = 0
  if (process.platform === 'darwin') {
    i = 1
  }

  // enable save buttons in menu template
  menuTemplate[i].submenu[0].enabled = true
  menuTemplate[i].submenu[1].enabled = true

  // rebuild updated menu
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
})

function createWindow () {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1300,
    defaultHeight: 900
  })

  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 800,
    minHeight: 640,
    icon: process.platform === 'linux' && path.join(__dirname, '/build/icon.png'),
    webPreferences: {
      preload: path.resolve(app.getAppPath(), 'preload.js'),
      contextIsolation: true,
      sandbox: true
    }
  })

  win.loadFile('node_modules/Glyphr-Studio/dev/Glyphr_Studio_Electron.html')

  // save window position/size across loads
  mainWindowState.manage(win)

  // create the menubar and get a copy of the template
  menuTemplate = require('./menu')(win)

  // set up app context menu
  contextMenu({
    prepend: (defaultActions, parameters, browserWindow) => [
      {
        label: 'Save Image As...',
        visiable: parameters.mediaType === 'canvas',
        click: () => {
          win.webContents.send('ping', 'saveImage')
        }
      }
    ]
  })

  const webContents = win.webContents

  // enable for debugging
  // win.webContents.openDevTools()

  webContents.on('new-window', async (event, url) => {
    const open = await import('open')

    event.preventDefault()
    open(url)
  })

  // inform renderer of close event
  win.on('close', event => {
    event.preventDefault()
    win.webContents.send('ping', 'confirmClose')
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
