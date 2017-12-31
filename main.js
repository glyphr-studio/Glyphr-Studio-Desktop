const electron = require('electron')
const {app, BrowserWindow, Menu} = electron
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
    label: 'View',
    submenu: [
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
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
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Window menu
  template[2].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

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

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})

app.on('enableSaveMenu', function () {
  let i = 0
  if (process.platform === 'darwin') {
    i = 1
  }
  template[i].submenu[0].enabled = true
  template[i].submenu[1].enabled = true
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})
