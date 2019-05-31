const electron = require('electron')
const { app, BrowserWindow, Menu } = electron
const open = require('open')
const path = require('path')

// menu template
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        enabled: false,
        click () {
          win.webContents.send('save', '')
        }
      },
      {
        label: 'Save As',
        accelerator: 'CmdOrCtrl+Shift+S',
        enabled: false,
        click () {
          win.webContents.send('saveas', '')
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () {
          electron.shell.openExternal('http://glyphrstudio.com')
        }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: 'Glyphr Studio',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })

  // Window menu
  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}

let win

function createWindow () {
  win = new BrowserWindow({
    width: 1300,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    icon: process.platform === 'linux' && path.join(__dirname, '/images/appicon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL(path.join('file://', __dirname, '/node_modules/Glyphr-Studio/dev/Glyphr_Studio_Electron.html'))

  let webContents = win.webContents

  // enable for debugging
  // win.webContents.openDevTools()

  webContents.on('new-window', (event, url) => {
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

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
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

app.on('enableSaveMenu', () => {
  let i = 0
  if (process.platform === 'darwin') {
    i = 1
  }
  template[i].submenu[0].enabled = true
  template[i].submenu[1].enabled = true
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})
