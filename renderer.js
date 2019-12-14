/* global alert, Blob, saveGlyphrProjectFile, _UI */

const electron = require('electron')
const { remote, ipcRenderer } = electron
const { dialog } = electron.remote
const fs = require('fs')
let saveQuit = false
let fileName = ''

// eliminate onbeforeunload trigger to prevent unexpected close behavior
delete window.onbeforeunload

// disable dev mode
_UI.devmode = false

// listen for main process close trigger
ipcRenderer.on('ping', (event, message) => {
  if (message === 'confirmClose') {
    confirmClose()
  }
})

function confirmClose () {
  if (document.getElementById('splashscreenlogo')) {
    remote.app.exit()
  }

  dialog.showMessageBox({
    type: 'question',
    title: 'Confirm',
    buttons: ['Yes', 'No', 'Cancel'],
    message: 'Would you like to save before closing?'
  }).then(response => {
    response = response.response
    if (response === 0) { // yes
      saveQuit = true
      saveGlyphrProjectFile()
    } else if (response === 2) { // cancel
      saveQuit = false
      return false
    } else {
      remote.app.exit()
    }
  })
}

// override glyphr handleDrop function
handleDrop = function (evt) { // eslint-disable-line
  // debug('\n handleDrop - START');
  document.getElementById('openprojecttableright').innerHTML = 'Loading File...'
  // document.getElementById('openprojecttableright').style.backgroundColor = _UI.colors.gray.offwhite;

  evt.stopPropagation()
  evt.preventDefault()

  var f = evt.dataTransfer || document.getElementById('filechooser')
  f = f.files[0]
  // debug('\t filename: ' + f.name);

  fileName = f.name // new code, exclusive to electron

  var fname = f.name.split('.')
  fname = fname[fname.length - 1].toLowerCase()
  // debug('\t fname = ' + fname);

  var reader = new FileReader() // eslint-disable-line

  if (fname === 'otf' || fname === 'ttf') {
    reader.onload = function () {
      // debug('\n reader.onload::OTF or TTF - START');
      _UI.droppedFileContent = reader.result
      ioOTF_importOTFfont() // eslint-disable-line
      // debug(' reader.onload:: OTF or TTF - END\n');
    }

    reader.readAsArrayBuffer(f)
  } else if (fname === 'svg' || fname === 'txt') {
    reader.onload = function () {
      // debug('\n reader.onload::SVG or TXT - START');
      _UI.droppedFileContent = reader.result
      if (fname === 'svg') {
        // debug('\t File = .svg');
        ioSVG_importSVGfont() // eslint-disable-line
      } else if (fname === 'txt') {
        // debug('\t File = .txt');
        importGlyphrProjectFromText() // eslint-disable-line
        navigate() // eslint-disable-line
      }
      // debug(' reader.onload::SVG OR TXT - END\n');
    }

    reader.readAsText(f)
  } else {
    var con = '<h3>Unsupported file type</h3>'
    con += 'Glyphr Studio can\'t import .' + fname + ' files.<br>'
    con += 'Try loading another file.'
    document.getElementById('openprojecttableright').innerHTML = make_ImportOrCreateNew() // eslint-disable-line
    openproject_changeTab('load') // eslint-disable-line
    showErrorMessageBox(con) // eslint-disable-line
    // document.getElementById('openprojecttableright').style.backgroundColor = _UI.colors.gray.offwhite;
  }

  // debug(' handleDrop - END\n');
}

// override glyphr saveFile function
saveFile = function (fname, buffer, ftype) { // eslint-disable-line
  if (fileName) {
    fname = fileName
  }
  const fblob = new Blob([buffer], {
    type: ftype || 'text/plain;charset=utf-8',
    endings: 'native'
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
        defaultPath: process.env.HOME + '/' + fname
      }).then(destination => {
        destination = destination.filePath
        if (destination !== undefined) {
          fs.writeFileSync(destination, buffer)
          window.saveFileOverwriteFile = destination
          fileName = destination
        }
        if (saveQuit) {
          remote.app.exit()
        }
      })
    }
  }
}

// native save menus
electron.ipcRenderer.on('save', () => {
  saveGlyphrProjectFile(true) // overwrite file if a previously saved file exists
})

electron.ipcRenderer.on('saveas', () => {
  saveGlyphrProjectFile()
})

// hijack save button event
document.body.addEventListener('click', () => {
  // mouseover needed to outpace main project's continual redraw of the button
  document.getElementById('npSave').addEventListener('mouseover', hijackSaveButton)
  hijackSaveButton()
})

let saveMenuEnabled = false

function hijackSaveButton () {
  // delay to give time for the element to render
  setTimeout(function () {
    const button = document.querySelector('[onclick="saveGlyphrProjectFile();"]')
    if (button) {
      button.removeAttribute('onclick') // gotta remove the old onclick attribute to prevent the old and new from fighting with each other
      button.onclick = function () {
        saveGlyphrProjectFile(true) // overwrite file if one exists
      }
    }
    if (!saveMenuEnabled && !document.getElementById('splashscreenlogo')) {
      electron.remote.app.emit('enableSaveMenu')
      saveMenuEnabled = true
    }
  }, 100)
}

const buildEditorContextMenu = remote.require('electron-editor-context-menu')

window.addEventListener('contextmenu', event => {
  // Only show the context menu in text editors.
  if (!event.target.closest('textarea, input, [contenteditable="true"]')) return

  const menu = buildEditorContextMenu()

  // The 'contextmenu' event is emitted after 'selectionchange' has fired but possibly before the
  // visible selection has changed. Try to wait to show the menu until after that, otherwise the
  // visible selection will update after the menu dismisses and look weird.
  setTimeout(() => {
    menu.popup(remote.getCurrentWindow())
  }, 30)
})
