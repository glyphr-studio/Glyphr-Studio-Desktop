process.once('loaded', () => {
  const { contextBridge, ipcRenderer: ipc } = require('electron')

  contextBridge.exposeInMainWorld('electron', {
    confirmClose: async (...params) => await ipc.invoke('confirmClose', ...params),
    enableSaveMenu: async (...params) => await ipc.invoke('enableSaveMenu', ...params),
    exitApp: async () => await ipc.invoke('exit'),
    listen: callback => ipc.on('ping', callback),
    saveCanvasImage: async (...params) => await ipc.invoke('saveCanvasImage', ...params),
    saveProject: async (...params) => await ipc.invoke('saveProject', ...params),
    saveProjectOverwrite: async (...params) => await ipc.invoke('saveProjectOverwrite', ...params)
  })
})
