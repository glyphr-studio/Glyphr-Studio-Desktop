/* global Blob, saveGlyphrProjectFile, handleDrop, navigate, _UI */

// api provided by preload.js
const electron = window.electron
let saveQuit = false
let editor = false
let currentProjectPath = ''

// eliminate onbeforeunload trigger to prevent unexpected close behavior
delete window.onbeforeunload

// disable dev mode
_UI.devmode = false

// listen to events fired by the main process
electron.listen(async (event, message) => {
  switch (message) {
    case 'confirmClose': {
      await confirmClose()
      break
    }
    case 'save': {
      saveGlyphrProjectFile()
      break
    }
    case 'saveas': {
      currentProjectPath = ''
      saveGlyphrProjectFile()
      break
    }
    case 'saveImage': {
      saveCanvasImage()
      break
    }
  }
})

/**
 * Event handler for closing out the app
 */
async function confirmClose () {
  // if no project is open, close immediately
  if (document.getElementById('splashscreenlogo')) {
    await electron.exitApp()
  }

  // close immediately if project has no unsaved changes
  if (_UI.projectsaved) {
    await electron.exitApp()
  }

  // otherwise bring up a save confirmation dialog first
  const { response } = await electron.confirmClose(currentProjectPath)

  if (response === 0) { // yes
    saveQuit = true
    saveGlyphrProjectFile()
  } else if (response === 1) { // cancel
    saveQuit = false
    return false
  } else { // no
    await electron.exitApp()
  }
}

/**
 * Handle saving the canvas as an image
 */
async function saveCanvasImage () {
  const canvas = document.querySelector('canvas')

  await electron.saveCanvasImage(canvas.toDataURL())
}

// store references to some glyphr functions that will be overidden
const glyphrHandleDrop = handleDrop
const glyphrNavigate = navigate

// override the glyphr handleDrop event to add desktop specific functionality
handleDrop = function (evt) { // eslint-disable-line
  // logic for deriving file data duplicated from original handleDrop
  let f = evt.dataTransfer || document.getElementById('filechooser')
  f = f.files[0]

  // store context related to which project file was imported
  if (f.path.includes('txt')) {
    currentProjectPath = f.path
  }

  // call the original function
  glyphrHandleDrop(evt)
}

// override the glyphr navigation event and use it to know when a project is open
navigate = async function (oa) { // eslint-disable-line
  // call the original function
  glyphrNavigate(oa)

  // detect if we landed on the project page for the first time
  if (!editor && _UI.current_page === 'glyph edit') {
    editor = true
    await electron.enableSaveMenu()
  }
}

// override glyphr saveFile function
saveFile = async function (fname, buffer, ftype) { // eslint-disable-line
  const fblob = new Blob([buffer], {
    type: ftype || 'text/plain;charset=utf-8',
    endings: 'native'
  })
  let link
  let event

  // handle SVG export logic
  if (fname.includes('SVG')) {
    link = document.createElement('a')
    window.URL = window.URL || window.webkitURL
    link.href = window.URL.createObjectURL(fblob)
    link.download = fname

    event = document.createEvent('MouseEvents')
    event.initEvent('click', true, false)
    link.dispatchEvent(event)
  } else {
    // project file export logic
    if (currentProjectPath) {
      // overwrite project if saving one in progress
      await electron.saveProjectOverwrite(currentProjectPath, buffer)
    } else {
      // spin up save confirmation dialog for saving new project
      const destination = await electron.saveProject(fname, buffer)

      if (destination) {
        currentProjectPath = destination
      }

      if (saveQuit) {
        await electron.exitApp()
      }
    }
  }
}
