/* global alert */
const electron = require('electron')
const {dialog} = electron.remote
const fs = require('fs')
const path = require('path')
let saveQuit = false
delete window.onbeforeunload

window.addEventListener('beforeunload', confirmClose)

function confirmClose (event) {
  if (document.getElementById('splashscreenlogo')) {
    return
  }

  event.returnValue = 'false'

  return new Promise((resolve, reject) => {
    dialog.showMessageBox({
      type: 'question',
      title: 'Confirm',
      buttons: ['Yes', 'No', 'Cancel'],
      message: 'Would you like to save before closing?'
    }, function (response) {
      if (response === 0) { // yes
        saveQuit = true
        saveGlyphrProjectFile()
      } else if (response === 2) { // cancel
        // do nothing
      } else {
        window.removeEventListener('beforeunload', confirmClose)
        electron.remote.app.emit('window-all-closed')
      }
    })
  })
}

saveFile = function (fname, buffer, ftype) { // eslint-disable-line
  let fblob = new Blob([buffer], {
    'type': ftype || 'text/plain;charset=utf-8',
    'endings': 'native'
  })
  let link
  let event

  if (fname.includes('SVG') || ftype === 'font/opentype') {
    link = document.createElement('a')
    window.URL = window.URL || window.webkitURL
    link.href = window.URL.createObjectURL(fblob)
    link.download = fname

    event = document.createEvent('MouseEvents')
    event.initEvent('click', true, false)
    link.dispatchEvent(event)
  } else {
    if (window.saveFileOverwrite && window.saveFileOverwriteFile) {
      fs.writeFileSync(window.saveFileOverwriteFile, buffer)
      alert('Saved to ' + window.saveFileOverwriteFile)
    } else {
      dialog.showSaveDialog({
        properties: ['openFile'],
        title: 'Choose where to save project...',
        defaultPath: path.join(process.env.HOME, '/', fname)
      }, function (destination) {
        if (destination !== undefined) {
          fs.writeFileSync(destination, buffer)
          window.saveFileOverwriteFile = destination
        }
        if (saveQuit) {
          window.removeEventListener('beforeunload', confirmClose)
          electron.remote.app.emit('window-all-closed')
        }
      })
    }
  }
}

// native save menus
electron.ipcRenderer.on('save', function (event, message) {
  saveGlyphrProjectFile(true) // overwrite file if a previously saved file exists
})

electron.ipcRenderer.on('saveas', function (event, message) {
  saveGlyphrProjectFile()
})

// hijack save button event
document.body.addEventListener('click', function () {
  // mouseover needed to outpace main project's continual redraw of the button
  document.getElementById('npSave').addEventListener('mouseover', function () {
    hijackSaveButton()
  })

  hijackSaveButton()
})

function hijackSaveButton () {
  // delay to give time for the element to render
  setTimeout(function () {
    let button = document.querySelector('[onclick="saveGlyphrProjectFile();"]')
    if (button) {
      button.removeAttribute('onclick') // gotta remove the old onclick attribute to prevent the old and new from fighting with each other
      button.onclick = function () {
        saveGlyphrProjectFile(true) // overwrite file if one exists
      }
    }
  }, 100)
}
